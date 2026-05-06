import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-8xl md:text-9xl font-bold text-primary mb-6">404</h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
          {t("error_title")}
        </h2>
        <p className="text-lg text-foreground/70 mb-12 max-w-md mx-auto">
          {t("error_desc")}
        </p>
        <Link 
          href="/" 
          className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold uppercase tracking-widest hover:bg-secondary/90 transition-colors text-sm"
        >
          {t("return_home")}
        </Link>
      </motion.div>
    </div>
  );
}
