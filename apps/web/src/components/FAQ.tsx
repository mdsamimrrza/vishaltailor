import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: {
      ne: "सूट बनाउन कति समय लाग्छ?",
      hi: "सूट बनाने में कितना समय लगता है?",
      en: "How long does a suit take?",
    },
    answer: {
      ne: "सूट सामान्यतया १०–१४ दिन लाग्छ। अतिरिक्त शुल्कमा ७ दिनभित्र rush order उपलब्ध छ।",
      hi: "सूट आमतौर पर 10–14 दिन में बनता है। अतिरिक्त शुल्क पर 7 दिन में rush order उपलब्ध है।",
      en: "A suit typically takes 10–14 days. Rush orders are available in 7 days for an additional charge.",
    },
  },
  {
    question: {
      ne: "के म आफ्नो कपडा ल्याउन सक्छु?",
      hi: "क्या मैं अपना कपड़ा ला सकता/सकती हूँ?",
      en: "Can I bring my own fabric?",
    },
    answer: {
      ne: "अवश्य। तपाईं आफ्नै कपडा ल्याउन सक्नुहुन्छ वा पसलको ५०+ प्रिमियम संग्रहबाट छान्न सक्नुहुन्छ।",
      hi: "बिलकुल। आप अपना कपड़ा ला सकते हैं या हमारी 50+ प्रीमियम कलेक्शन में से चुन सकते हैं।",
      en: "Absolutely. You can bring your own fabric or choose from our 50+ premium collection in store.",
    },
  },
  {
    question: {
      ne: "के तपाईं पुराना कपडामा alteration गर्नुहुन्छ?",
      hi: "क्या आप पुराने कपड़ों की alteration करते हैं?",
      en: "Do you offer alterations for existing clothes?",
    },
    answer: {
      ne: "हो, कुनै पनि टेलरबाट सिलाइएका कपडामा पनि हामी alteration गर्छौं। निःशुल्क assessment का लागि ल्याउनुहोस्।",
      hi: "हाँ, हम किसी भी टेलर के कपड़ों की alteration करते हैं। मुफ्त assessment के लिए लाएँ।",
      en: "Yes. We do alterations on garments from any tailor. Bring it in for a free assessment.",
    },
  },
  {
    question: {
      ne: "भुक्तानी प्रक्रिया के हो?",
      hi: "भुगतान प्रक्रिया क्या है?",
      en: "What is the payment process?",
    },
    answer: {
      ne: "नाप लिँदा ५०% advance र डेलिभरीमा बाँकी। नगद र mobile payment दुवै स्वीकार्छौं।",
      hi: "नाप लेते समय 50% advance और डिलीवरी पर शेष राशि। हम cash और mobile payment दोनों स्वीकार करते हैं।",
      en: "We take 50% advance at measurement and the remaining on delivery. We accept cash and mobile payment.",
    },
  },
  {
    question: {
      ne: "के जनकपुर बाहिर डेलिभरी गर्नुहुन्छ?",
      hi: "क्या जनकपुर के बाहर डिलीवरी करते हैं?",
      en: "Do you deliver outside Janakpur?",
    },
    answer: {
      ne: "नेपालभित्र courier delivery मिलाउन सक्छौं। विवरणका लागि सम्पर्क गर्नुहोस्।",
      hi: "नेपाल के भीतर courier delivery की व्यवस्था कर सकते हैं। विवरण के लिए संपर्क करें।",
      en: "We can arrange courier delivery within Nepal. Contact us for details.",
    },
  },
];

export function FAQ() {
  const { language } = useLanguage();
  const [value, setValue] = useState("item-0");

  const title = language === "ne" ? "प्रायः सोधिने प्रश्न" : language === "hi" ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions";

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-secondary text-sm tracking-widest uppercase mb-4">{title}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary">{title}</h2>
        </div>

        <Accordion type="single" collapsible value={value} onValueChange={setValue} className="rounded-2xl border border-border bg-card px-6 shadow-[0_16px_60px_rgba(0,0,0,0.08)]">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-semibold text-primary hover:no-underline">{faq.question[language]}</AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-foreground/90">{faq.answer[language]}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}