import { z } from "zod";

export const EnquiryRequest = z.object({
  fullName: z.string().min(1),
  whatsappNumber: z.string().min(1),
  garmentType: z.string().min(1),
  occasion: z.string().min(1),
  requiredBy: z.string().min(1),
  fabricPreference: z.string().optional().default(""),
  notes: z.string().max(300).optional().default(""),
});

export const EnquiryResponse = z.object({
  status: z.literal("ok"),
});

export type EnquiryRequestType = z.infer<typeof EnquiryRequest>;