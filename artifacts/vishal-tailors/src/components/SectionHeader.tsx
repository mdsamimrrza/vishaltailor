import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${centered ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className={`w-24 h-1 bg-secondary mt-8 ${centered ? "mx-auto" : ""}`} />
      </motion.div>
    </div>
  );
}
