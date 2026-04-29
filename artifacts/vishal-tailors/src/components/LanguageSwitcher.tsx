import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translations";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: "ne", label: "नेपाली" },
    { code: "hi", label: "हिन्दी" },
    { code: "en", label: "English" },
  ];

  return (
    <div className="flex items-center gap-1 bg-background/95 backdrop-blur-md p-1.5 rounded-full border border-primary/30 shadow-lg relative z-50">
      {languages.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full whitespace-nowrap ${
              isActive
                ? "text-primary-foreground"
                : "text-foreground hover:text-primary"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-primary rounded-full shadow-md"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{lang.label}</span>
          </button>
        );
      })}
    </div>
  );
}
