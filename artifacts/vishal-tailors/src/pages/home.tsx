import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SectionHeader } from "@/components/SectionHeader";
import { Scissors, MapPin, Phone, Clock, Ruler, Needle } from "lucide-react";

export default function Home() {
  const { t, language } = useLanguage();

  const garments = [
    { key: "garments_safari", img: "/images/fabric.png" },
    { key: "garments_sherwani", img: "/images/hands.png" },
    { key: "garments_lehenga", img: "/images/fabric.png" },
    { key: "garments_kurta", img: "/images/hands.png" },
    { key: "garments_pants", img: "/images/fabric.png" },
    { key: "garments_bandi", img: "/images/tools.png" },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-secondary selection:text-secondary-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 flex justify-between items-center mix-blend-difference text-primary-foreground">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-bold tracking-widest uppercase"
        >
          {t("name")}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block mix-blend-normal"
        >
          <LanguageSwitcher />
        </motion.div>
      </nav>

      {/* Mobile Lang Switcher */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden mix-blend-normal shadow-lg rounded-full">
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full"
          >
            <img 
              src="/images/hero.png" 
              alt="Atelier Interior" 
              className="w-full h-full object-cover opacity-80"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-black/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-secondary text-lg md:text-2xl mb-4 tracking-[0.2em] uppercase">
                {t("tagline")}
              </h2>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-primary-foreground mb-8 drop-shadow-lg leading-tight">
                {t("name")}
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                {t("description")}
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="#visit" 
                  className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-none tracking-widest hover:bg-secondary/90 transition-all uppercase text-sm border border-secondary"
                >
                  {t("visit_title")}
                </a>
                <a 
                  href="#garments" 
                  className="px-8 py-4 bg-transparent text-primary-foreground font-semibold rounded-none tracking-widest hover:bg-primary-foreground/10 transition-all uppercase text-sm border border-primary-foreground backdrop-blur-sm"
                >
                  {t("nav_garments")}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* About Master */}
      <section id="craft" className="py-24 md:py-32 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative aspect-[3/4] w-full max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 -z-10" />
            <img 
              src="/images/hands.png" 
              alt="Master Tailor" 
              className="w-full h-full object-cover shadow-2xl"
            />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-secondary text-sm tracking-widest uppercase mb-4 font-semibold">{t("owner")}</h3>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">{t("about_title")}</h2>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
                {t("about_desc")}
              </p>
              <div className="grid grid-cols-2 gap-8 mt-12 border-t border-border pt-8">
                <div>
                  <h4 className="text-4xl font-bold text-secondary mb-2">30+</h4>
                  <p className="text-sm uppercase tracking-wider text-foreground/60">Years of Heritage</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-secondary mb-2">10k+</h4>
                  <p className="text-sm uppercase tracking-wider text-foreground/60">Garments Crafted</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Garments Marquee / Grid */}
      <section id="garments" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/fabric.png')] bg-cover mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <SectionHeader title={t("garments_title")} centered={true} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {garments.map((garment, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative overflow-hidden aspect-square cursor-pointer"
              >
                <img 
                  src={garment.img} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                  <AnimatePresence mode="wait">
                    <motion.h3 
                      key={language}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-2xl md:text-3xl font-bold text-white drop-shadow-md"
                    >
                      {t(garment.key)}
                    </motion.h3>
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section id="visit" className="py-24 md:py-32 px-6 md:px-12 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader title={t("visit_title")} />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-background p-12 shadow-2xl border border-border relative overflow-hidden mt-12"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <MapPin size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Location</h4>
                  <p className="text-foreground/70">{t("address")}</p>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent("Janaki Chowk-3, Janakpur Dham, Dhanusha, Nepal")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors uppercase tracking-widest text-xs"
                  >
                    {t("get_directions")}
                  </a>
                </div>

                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <Phone size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Contact</h4>
                  <p className="text-foreground/70">+977 980-0000000</p>
                  <a 
                    href="tel:+9779800000000"
                    className="mt-6 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors uppercase tracking-widest text-xs"
                  >
                    {t("call_now")}
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-6 md:px-12 text-center">
        <p className="text-background/60 font-light">
          &copy; {new Date().getFullYear()} {t("name")}. {t("footer_rights")}
        </p>
      </footer>
    </div>
  );
}
