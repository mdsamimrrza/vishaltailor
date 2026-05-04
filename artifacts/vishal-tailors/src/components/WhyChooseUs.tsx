import { Award, Clock, Scissors, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const features = [
  {
    icon: Scissors,
    title: { ne: "Perfect Fit Guaranteed", hi: "Perfect Fit Guaranteed", en: "Perfect Fit Guaranteed" },
    description: {
      ne: "फिट सही नभए हामी निःशुल्क परिवर्तन गर्छौं।",
      hi: "फिट सही नहीं हो तो हम मुफ्त में बदलाव करते हैं।",
      en: "If the fit isn't perfect, we alter it for free. No questions asked.",
    },
  },
  {
    icon: Sparkles,
    title: { ne: "50+ Premium Fabrics", hi: "50+ Premium Fabrics", en: "50+ Premium Fabrics" },
    description: {
      ne: "हाम्रो छानिएको कपडा संग्रहबाट छान्नुहोस् वा आफ्नो कपडा ल्याउनुहोस्।",
      hi: "हमारे चुने हुए कपड़ों में से चुनें या अपना कपड़ा लाएँ।",
      en: "Choose from our curated collection or bring your own fabric.",
    },
  },
  {
    icon: Award,
    title: { ne: "30+ Years of Expertise", hi: "30+ Years of Expertise", en: "30+ Years of Expertise" },
    description: {
      ne: "मौलबी मन्सुरीको ३ दशकभन्दा बढी अनुभवले प्रत्येक सिलाइलाई उत्कृष्ट बनाउँछ।",
      hi: "मौलवी मंसूरी के 3 दशकों से अधिक अनुभव से हर सिलाई श्रेष्ठ बनती है।",
      en: "Every stitch by our master tailor Maulvi Mansuri, trained over 3 decades.",
    },
  },
  {
    icon: Clock,
    title: { ne: "On-Time, Every Time", hi: "On-Time, Every Time", en: "On-Time, Every Time" },
    description: {
      ne: "हामी डेलिभरी मितिमा अडिग रहन्छौं र त्यो वाचा पूरा गर्छौं।",
      hi: "हम डिलीवरी तिथि का पालन करते हैं और उस वादे को निभाते हैं।",
      en: "We commit to delivery dates and keep that promise.",
    },
  },
];

export function WhyChooseUs() {
  const { language } = useLanguage();
  const title = language === "ne" ? "हामीलाई किन छान्नुहोस्?" : language === "hi" ? "हमें क्यों चुनें?" : "Why Choose Us?";

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-secondary text-sm tracking-widest uppercase mb-4">{title}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article key={feature.title.en} className="group rounded-2xl border border-primary/20 bg-primary/95 p-7 text-primary-foreground shadow-[0_16px_50px_rgba(74,14,14,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-[0_22px_70px_rgba(74,14,14,0.24)]">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/15 text-secondary">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-semibold">{feature.title[language]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">{feature.description[language]}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}