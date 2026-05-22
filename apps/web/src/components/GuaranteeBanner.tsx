import { useLanguage } from "@/contexts/LanguageContext";

export function GuaranteeBanner() {
  const { language } = useLanguage();

  const text =
    language === "ne"
      ? "✂️ फिट सही नभए नि:शुल्क परिवर्तन | 📦 समयमै डेलिभरी ग्यारेन्टी | 📞 24 घण्टा सम्पर्क"
      : language === "hi"
        ? "✂️ फिट सही नहीं हो तो मुफ्त बदलाव | 📦 समय पर डिलीवरी गारंटी | 📞 24 घंटे संपर्क"
        : "✂️ Free alterations if fit isn't perfect | 📦 On-time delivery guaranteed | 📞 Always reachable";

  return (
    <div className="border-y border-[#C9A84C]/30 bg-[#C9A84C] px-4 py-3 md:py-4 text-center text-[11px] sm:text-xs md:text-sm font-bold text-[#4A0E0E] shadow-sm leading-relaxed tracking-wide">
      {text}
    </div>
  );
}