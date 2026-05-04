import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const { t, language } = useLanguage();

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('/images/hands.png')] bg-cover mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-secondary text-sm tracking-widest uppercase mb-4">{t("testimonials_eyebrow")}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("testimonials_title")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="group rounded-2xl border border-white/10 bg-primary-foreground/5 p-8 shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border border-secondary/30 ring-2 ring-secondary/10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground font-bold">{testimonial.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-primary-foreground/70">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-secondary" aria-label={`${testimonial.rating} star rating`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className={index < testimonial.rating ? "fill-current" : "opacity-35"} size={16} />
                  ))}
                </div>
              </div>

              <p className="text-base leading-relaxed text-primary-foreground/90 italic">{testimonial.text[language]}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.18em] text-primary-foreground/70">
                <span>{testimonial.date}</span>
                <span>Ordered: {testimonial.garmentOrdered}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}