import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

type FormValues = {
  fullName: string;
  whatsappNumber: string;
  garmentType: string;
  occasion: string;
  requiredBy: string;
  fabricPreference: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

interface EnquiryFormProps {
  variant?: "inline" | "modal";
  triggerLabel?: string;
}

const garmentTypes = ["Coat-Pant", "Casual Suit", "Shirt & Pant", "Kurta-Pajama", "Sherwani", "Bandhgala", "Other"];
const occasions = ["Wedding", "Formal/Office", "Festival", "Casual", "Other"];
const fabricPreferences = ["I'll choose from your collection", "I'll bring my own fabric", "Not sure yet"];

const initialValues: FormValues = {
  fullName: "",
  whatsappNumber: "",
  garmentType: "",
  occasion: "",
  requiredBy: "",
  fabricPreference: "",
  notes: "",
};

export function EnquiryForm({ variant = "inline", triggerLabel }: EnquiryFormProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const labels = useMemo(() => {
    if (language === "ne") {
      return {
        title: "बुकिङ / सोधपुछ",
        fullName: "पूरा नाम",
        whatsappNumber: "WhatsApp नम्बर",
        garmentType: "परिधान प्रकार",
        occasion: "अवसर",
        requiredBy: "आवश्यक मिति",
        fabricPreference: "कपडा प्राथमिकता",
        notes: "विशेष अनुरोध / नोट्स",
        submit: "पठाउनुहोस्",
        bookAppointment: "Book Appointment",
        success: "Thank you! We'll WhatsApp you within 2 hours.",
        error: "Please call us directly at +977 980-4833357",
        whatsappHint: "+977 बाट सुरु हुने नम्बर प्रयोग गर्नुहोस्",
        required: "आवश्यक छ",
        noteHint: "अधिकतम 300 अक्षर",
      };
    }

    if (language === "hi") {
      return {
        title: "बुकिंग / पूछताछ",
        fullName: "पूरा नाम",
        whatsappNumber: "WhatsApp नंबर",
        garmentType: "परिधान प्रकार",
        occasion: "अवसर",
        requiredBy: "आवश्यक तिथि",
        fabricPreference: "कपड़े की प्राथमिकता",
        notes: "विशेष अनुरोध / नोट्स",
        submit: "भेजें",
        bookAppointment: "Book Appointment",
        success: "Thank you! We'll WhatsApp you within 2 hours.",
        error: "Please call us directly at +977 980-4833357",
        whatsappHint: "+977 से शुरू होने वाला नंबर इस्तेमाल करें",
        required: "आवश्यक है",
        noteHint: "अधिकतम 300 अक्षर",
      };
    }

    return {
      title: "Booking / Enquiry",
      fullName: "Full Name",
      whatsappNumber: "WhatsApp Number",
      garmentType: "Garment Type",
      occasion: "Occasion",
      requiredBy: "Required By Date",
      fabricPreference: "Fabric Preference",
      notes: "Special Requests / Notes",
      submit: "Send Enquiry",
      bookAppointment: "Book Appointment",
      success: "Thank you! We'll WhatsApp you within 2 hours.",
      error: "Please call us directly at +977 980-4833357",
      whatsappHint: "Use a Nepal number starting with +977",
      required: "Required",
      noteHint: "Maximum 300 characters",
    };
  }, [language]);

  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().slice(0, 10);
  }, []);

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!values.fullName.trim()) nextErrors.fullName = labels.required;
    if (!values.whatsappNumber.trim()) nextErrors.whatsappNumber = labels.required;
    if (!values.garmentType) nextErrors.garmentType = labels.required;
    if (!values.occasion) nextErrors.occasion = labels.required;
    if (!values.requiredBy) nextErrors.requiredBy = labels.required;
    if (values.requiredBy && values.requiredBy < minDate) nextErrors.requiredBy = labels.required;
    if (values.notes.length > 300) nextErrors.notes = labels.noteHint;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (name: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${apiBaseUrl}/api/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setValues(initialValues);
      setStatus({ type: "success", message: labels.success });
      if (variant === "modal") {
        setIsOpen(false);
      }
    } catch {
      setStatus({ type: "error", message: labels.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={labels.fullName} error={errors.fullName}>
          <input value={values.fullName} onChange={(event) => handleChange("fullName", event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-secondary" />
        </Field>
        <Field label={labels.whatsappNumber} hint={labels.whatsappHint} error={errors.whatsappNumber}>
          <input value={values.whatsappNumber} onChange={(event) => handleChange("whatsappNumber", event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-secondary" />
        </Field>
        <Field label={labels.garmentType} error={errors.garmentType}>
          <select value={values.garmentType} onChange={(event) => handleChange("garmentType", event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-secondary">
            <option value="">{labels.garmentType}</option>
            {garmentTypes.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </Field>
        <Field label={labels.occasion} error={errors.occasion}>
          <select value={values.occasion} onChange={(event) => handleChange("occasion", event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-secondary">
            <option value="">{labels.occasion}</option>
            {occasions.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </Field>
        <Field label={labels.requiredBy} error={errors.requiredBy}>
          <input type="date" min={minDate} value={values.requiredBy} onChange={(event) => handleChange("requiredBy", event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-secondary" />
        </Field>
        <Field label={labels.fabricPreference}>
          <select value={values.fabricPreference} onChange={(event) => handleChange("fabricPreference", event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-secondary">
            <option value="">{labels.fabricPreference}</option>
            {fabricPreferences.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </Field>
      </div>

      <Field label={labels.notes} hint={labels.noteHint} error={errors.notes}>
        <textarea value={values.notes} onChange={(event) => handleChange("notes", event.target.value.slice(0, 300))} rows={4} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-secondary" />
      </Field>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-secondary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60">
          {isSubmitting ? "..." : labels.submit}
        </button>
        {status && <p className={`text-sm font-medium ${status.type === "success" ? "text-emerald-600" : "text-red-600"}`}>{status.message}</p>}
      </div>
    </form>
  );

  if (variant === "modal") {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button type="button" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-transform hover:scale-[1.02]">
            {triggerLabel ?? labels.bookAppointment}
          </button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl text-primary">{labels.title}</DialogTitle>
          </DialogHeader>
          {form}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-[0_16px_60px_rgba(0,0,0,0.08)] md:p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-primary">{labels.title}</h3>
      </div>
      {form}
    </div>
  );
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2 text-sm font-medium text-foreground">
      <span className="block text-xs uppercase tracking-widest text-foreground/70">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-foreground/60">{hint}</span> : null}
      {error ? <span className="block text-xs font-semibold text-red-600">{error}</span> : null}
    </label>
  );
}