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
    <div className="flex items-center gap-2 bg-card/80 backdrop-blur-md p-1 rounded-full border border-primary/10 shadow-sm relative z-50">
      {languages.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-300 rounded-full ${
              isActive ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-primary rounded-full"
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
