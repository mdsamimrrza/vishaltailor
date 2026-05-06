import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";
import { EnquiryRequest, EnquiryResponse, type EnquiryRequestType } from "@workspace/shared/api";
import { logger } from "../lib/logger";

const router: IRouter = Router();
const enquiries: EnquiryRequestType[] = [];

router.post("/enquiry", async (req, res) => {
  const parsed = EnquiryRequest.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid enquiry payload" });
  }

  enquiries.push(parsed.data);

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const ownerEmail = process.env.OWNER_EMAIL ?? user;

  if (host && user && pass && ownerEmail) {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    try {
      await transporter.sendMail({
        from: user,
        to: ownerEmail,
        subject: `New enquiry from ${parsed.data.fullName}`,
        text: JSON.stringify(parsed.data, null, 2),
      });
    } catch (error) {
      logger.error({ error }, "Failed to send enquiry email");
    }
  }

  const data = EnquiryResponse.parse({ status: "ok" });
  return res.status(201).json(data);
});

export default router;
