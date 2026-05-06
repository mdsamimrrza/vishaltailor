import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  invert?: boolean;
}

export function SectionHeader({ title, subtitle, centered = true, invert = false }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight ${
            invert ? "text-primary-foreground" : "text-primary"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed ${
              invert ? "text-primary-foreground/80" : "text-foreground/70"
            }`}
          >
            {subtitle}
          </p>
        )}
        <div className={`w-24 h-1 bg-secondary mt-8 ${centered ? "mx-auto" : ""}`} />
      </motion.div>
    </div>
  );
}
