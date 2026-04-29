import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SectionHeader } from "@/components/SectionHeader";
import {
  MapPin,
  Phone,
  Clock,
  Scissors,
  Ruler,
  Shirt,
  Hand,
  Package,
  MessageCircle,
  Quote,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

const PHONE_PRIMARY = "+977 980-4833357";
const PHONE_PRIMARY_TEL = "+9779804833357";
const PHONE_SECONDARY = "+977 981-2097433";
const PHONE_SECONDARY_TEL = "+9779812097433";

export default function Home() {
  const { t, language } = useLanguage();

  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y < 80) {
        setNavVisible(true);
      } else if (y > lastScrollY.current + 6) {
        setNavVisible(false);
        setMobileOpen(false);
      } else if (y < lastScrollY.current - 6) {
        setNavVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: "#craft", label: t("nav_craft") },
    { href: "#garments", label: t("nav_garments") },
    { href: "#fabrics", label: t("nav_fabrics") },
    { href: "#process", label: t("nav_process") },
    { href: "#visit", label: t("nav_visit") },
  ];

  const garments = [
    { key: "garments_coatpant", img: "/images/fabric.png" },
    { key: "garments_safari", img: "/images/hands.png" },
    { key: "garments_mensdress", img: "/images/fabric.png" },
    { key: "garments_pants", img: "/images/tools.png" },
    { key: "garments_jeans", img: "/images/fabric.png" },
    { key: "garments_kurta", img: "/images/hands.png" },
    { key: "garments_sherwani", img: "/images/fabric.png" },
    { key: "garments_bandi", img: "/images/tools.png" },
    { key: "garments_lehenga", img: "/images/hands.png" },
  ];

  const fabrics = [
    { titleKey: "fabric_silk_title", descKey: "fabric_silk_desc", img: "/images/fabric.png" },
    { titleKey: "fabric_cotton_title", descKey: "fabric_cotton_desc", img: "/images/hands.png" },
    { titleKey: "fabric_wool_title", descKey: "fabric_wool_desc", img: "/images/tools.png" },
  ];

  const processSteps = [
    { titleKey: "process_step1_title", descKey: "process_step1_desc", Icon: MessageCircle },
    { titleKey: "process_step2_title", descKey: "process_step2_desc", Icon: Ruler },
    { titleKey: "process_step3_title", descKey: "process_step3_desc", Icon: Shirt },
    { titleKey: "process_step4_title", descKey: "process_step4_desc", Icon: Scissors },
    { titleKey: "process_step5_title", descKey: "process_step5_desc", Icon: Hand },
    { titleKey: "process_step6_title", descKey: "process_step6_desc", Icon: Package },
  ];

  const testimonials = [
    { quoteKey: "testimonial1", authorKey: "testimonial1_author" },
    { quoteKey: "testimonial2", authorKey: "testimonial2_author" },
    { quoteKey: "testimonial3", authorKey: "testimonial3_author" },
  ];

  // Map pin uses the actual Plus Code address on Janaki Mandir Marg, Janakpur 45600.
  // The displayed address text on screen is intentionally kept as Janaki Chowk-3 (translations).
  const mapsAddr = "PWJG+2PH, Janaki Mandir Marg, Janakpur 45600, Nepal";
  const mapsLink = `https://maps.google.com/?q=${encodeURIComponent(mapsAddr)}`;
  const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(mapsAddr)}&t=&z=17&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div className="min-h-screen bg-background selection:bg-secondary selection:text-secondary-foreground">
      {/* Navbar - hides on scroll down, reappears on scroll up */}
      <motion.nav
        animate={{ y: navVisible ? 0 : -120 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-lg shadow-md border-b border-border/60"
            : "bg-gradient-to-b from-black/40 via-black/20 to-transparent"
        }`}
      >
        <div className="py-4 px-6 md:px-12 flex justify-between items-center gap-4">
          <a
            href="#"
            className={`text-base md:text-xl font-bold tracking-widest uppercase transition-colors duration-500 ${
              scrolled ? "text-primary" : "text-white drop-shadow-md"
            }`}
          >
            {t("name")}
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-widest font-semibold transition-colors duration-300 ${
                  scrolled
                    ? "text-foreground/80 hover:text-primary"
                    : "text-white/90 hover:text-secondary drop-shadow-md"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop language switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? t("menu_close") : t("menu_open")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={`md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border-2 transition-colors duration-300 ${
              scrolled
                ? "border-primary/30 text-primary bg-background/80 hover:bg-primary hover:text-primary-foreground"
                : "border-white/70 text-white bg-black/30 backdrop-blur-md hover:bg-white hover:text-primary"
            }`}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-foreground/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[82%] max-w-sm bg-background shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <span className="text-base font-bold tracking-widest uppercase text-primary">
                  {t("name")}
                </span>
                <button
                  type="button"
                  aria-label={t("menu_close")}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 text-lg font-semibold text-foreground hover:text-primary transition-colors border-b border-border/50"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <p className="text-xs uppercase tracking-widest text-foreground/75 font-semibold mb-4">
                    {t("menu_language")}
                  </p>
                  <LanguageSwitcher />
                </div>

                <div className="mt-10 pt-6 border-t border-border space-y-3">
                  <a
                    href={`tel:${PHONE_PRIMARY_TEL}`}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Phone size={16} className="text-secondary" />
                    <span className="font-medium">{PHONE_PRIMARY}</span>
                  </a>
                  <a
                    href={`tel:${PHONE_SECONDARY_TEL}`}
                    className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  >
                    <Phone size={16} className="text-secondary" />
                    <span className="font-medium">{PHONE_SECONDARY}</span>
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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

              <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <a
                  href="#visit"
                  className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-none tracking-widest hover:bg-secondary/90 transition-all uppercase text-sm border-2 border-secondary shadow-lg"
                >
                  {t("visit_title")}
                </a>
                <a
                  href="#garments"
                  className="px-8 py-4 bg-white/15 backdrop-blur-md text-white font-bold rounded-none tracking-widest hover:bg-white hover:text-primary transition-all uppercase text-sm border-2 border-white shadow-lg"
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
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
            className="relative aspect-[3/4] w-full max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 -z-10" />
            <img
              src="/images/hands.png"
              alt="Master Tailor at work"
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
              <h3 className="text-secondary text-sm tracking-widest uppercase mb-4 font-semibold">
                {t("about_eyebrow")}
              </h3>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">{t("about_title")}</h2>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
                {t("about_desc")}
              </p>
              <p className="text-lg md:text-xl italic text-primary/80 leading-relaxed border-l-2 border-secondary pl-6 mb-8">
                {t("about_quote")}
              </p>
              <div className="grid grid-cols-3 gap-6 mt-12 border-t border-border pt-8">
                <div>
                  <h4 className="text-3xl md:text-4xl font-bold text-secondary mb-2">30+</h4>
                  <p className="text-xs md:text-sm uppercase tracking-wider text-foreground/60">
                    {t("about_stat_years")}
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl md:text-4xl font-bold text-secondary mb-2">10k+</h4>
                  <p className="text-xs md:text-sm uppercase tracking-wider text-foreground/60">
                    {t("about_stat_garments")}
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl md:text-4xl font-bold text-secondary mb-2">5k+</h4>
                  <p className="text-xs md:text-sm uppercase tracking-wider text-foreground/60">
                    {t("about_stat_clients")}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Owner Portrait Section */}
      <section id="owner" className="py-24 md:py-32 px-6 md:px-12 bg-card relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-20 items-center relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`owner-text-${language}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-3 order-2 md:order-1"
            >
              <h3 className="text-secondary text-sm tracking-widest uppercase mb-4 font-semibold">
                {t("owner_section_eyebrow")}
              </h3>
              <h2 className="text-4xl md:text-6xl font-bold text-primary mb-2 leading-tight">
                {t("owner_section_title")}
              </h2>
              <p className="text-lg md:text-xl text-secondary mb-8 italic">
                {t("owner_section_subtitle")}
              </p>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-10 max-w-2xl">
                {t("owner_section_desc")}
              </p>
              <div className="flex items-center gap-4 text-foreground/60">
                <Sparkles size={20} className="text-secondary" />
                <span className="text-sm uppercase tracking-widest">{t("tagline")}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
            className="md:col-span-2 order-1 md:order-2 relative aspect-[3/4] w-full max-w-sm mx-auto"
          >
            <div className="absolute inset-0 border-2 border-secondary translate-x-5 translate-y-5" />
            <div className="absolute inset-0 bg-primary -translate-x-3 -translate-y-3 -z-10" />
            <img
              src="/images/owner.png"
              alt={t("owner_section_title")}
              className="relative w-full h-full object-cover shadow-2xl"
            />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background px-6 py-2 shadow-lg border border-border whitespace-nowrap">
              <p className="text-xs uppercase tracking-widest text-foreground/70">
                {t("owner")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Garments */}
      <section id="garments" className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/fabric.png')] bg-cover mix-blend-overlay pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`g-head-${language}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-secondary text-sm tracking-widest uppercase mb-4">
                  {t("garments_eyebrow")}
                </p>
                <SectionHeader title={t("garments_title")} centered={true} invert={true} />
                <p className="text-primary-foreground/90 text-lg mt-4 max-w-2xl mx-auto">
                  {t("garments_subtitle")}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {garments.map((garment, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
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

      {/* Fabrics */}
      <section id="fabrics" className="py-24 md:py-32 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`fab-head-${language}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-secondary text-sm tracking-widest uppercase mb-4">
                  {t("fabrics_eyebrow")}
                </p>
                <SectionHeader title={t("fabrics_title")} centered={true} />
                <p className="text-foreground/85 text-lg mt-4 max-w-2xl mx-auto">
                  {t("fabrics_desc")}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fabrics.map((fabric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-card border border-border overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={fabric.img}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`fab-${idx}-${language}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-8"
                  >
                    <h3 className="text-2xl font-bold text-primary mb-3">{t(fabric.titleKey)}</h3>
                    <p className="text-foreground/85 leading-relaxed">{t(fabric.descKey)}</p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 md:py-32 px-6 md:px-12 bg-card relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={`pr-head-${language}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-secondary text-sm tracking-widest uppercase mb-4">
                  {t("process_eyebrow")}
                </p>
                <SectionHeader title={t("process_title")} centered={true} />
                <p className="text-foreground/85 text-lg mt-4 max-w-2xl mx-auto">
                  {t("process_subtitle")}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {processSteps.map((step, idx) => {
              const Icon = step.Icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.85, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="relative bg-background p-8 border border-border hover:border-secondary transition-colors duration-500 group"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="mb-6 text-primary group-hover:text-secondary transition-colors duration-500">
                    <Icon size={36} strokeWidth={1.5} />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`pr-${idx}-${language}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className="text-xl font-bold text-primary mb-3">{t(step.titleKey)}</h3>
                      <p className="text-foreground/85 leading-relaxed">{t(step.descKey)}</p>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/images/hands.png')] bg-cover mix-blend-overlay pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`tes-head-${language}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-secondary text-sm tracking-widest uppercase mb-4">
                  {t("testimonials_eyebrow")}
                </p>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("testimonials_title")}</h2>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 p-8 hover:border-secondary/40 transition-all duration-500"
              >
                <Quote className="text-secondary mb-6" size={32} />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`tes-${idx}-${language}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-lg leading-relaxed mb-8 text-primary-foreground/90 italic">
                      {t(testimonial.quoteKey)}
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-primary-foreground/10">
                      <div className="w-1 h-8 bg-secondary" />
                      <p className="text-sm uppercase tracking-widest text-primary-foreground/70">
                        {t(testimonial.authorKey)}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section id="visit" className="py-24 md:py-32 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`vh-${language}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-secondary text-sm tracking-widest uppercase mb-4">
                  {t("visit_eyebrow")}
                </p>
                <SectionHeader title={t("visit_title")} centered={true} />
                <p className="text-foreground/85 text-lg mt-4 max-w-2xl mx-auto">
                  {t("visit_subtitle")}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3 relative"
            >
              <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 -z-10" />
              <div className="relative bg-card border border-border overflow-hidden shadow-2xl h-[500px] lg:h-full min-h-[500px]">
                <iframe
                  title={t("map_title")}
                  src={mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 500 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </motion.div>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`vd-${language}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-6 h-full"
                >
                  {/* Address */}
                  <div className="bg-card border border-border p-8 hover:border-secondary transition-colors duration-500 group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-500 shrink-0">
                        <MapPin size={22} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs uppercase tracking-widest text-foreground/60 mb-2">
                          {t("visit_location")}
                        </h4>
                        <p className="text-foreground font-medium leading-relaxed mb-4">
                          {t("address")}
                        </p>
                        <a
                          href={mapsLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block text-xs uppercase tracking-widest text-secondary border-b border-secondary/50 hover:border-secondary pb-1 transition-all"
                        >
                          {t("get_directions")}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="bg-card border border-border p-8 hover:border-secondary transition-colors duration-500 group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-500 shrink-0">
                        <Phone size={22} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs uppercase tracking-widest text-foreground/70 mb-3 font-semibold">
                          {t("visit_phone")}
                        </h4>
                        <div className="space-y-2 mb-4">
                          <a
                            href={`tel:${PHONE_PRIMARY_TEL}`}
                            className="block text-foreground font-semibold leading-relaxed hover:text-primary transition-colors"
                          >
                            {PHONE_PRIMARY}
                          </a>
                          <a
                            href={`tel:${PHONE_SECONDARY_TEL}`}
                            className="block text-foreground font-semibold leading-relaxed hover:text-primary transition-colors"
                          >
                            {PHONE_SECONDARY}
                          </a>
                        </div>
                        <a
                          href={`tel:${PHONE_PRIMARY_TEL}`}
                          className="inline-block text-xs uppercase tracking-widest text-secondary border-b border-secondary/50 hover:border-secondary pb-1 transition-all font-semibold"
                        >
                          {t("call_now")}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="bg-card border border-border p-8 hover:border-secondary transition-colors duration-500 group flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-500 shrink-0">
                        <Clock size={22} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs uppercase tracking-widest text-foreground/60 mb-3">
                          {t("visit_hours")}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-baseline gap-4">
                            <span className="text-foreground/80 text-sm">{t("hours_weekday")}</span>
                            <span className="text-foreground font-medium text-sm">
                              {t("hours_weekday_time")}
                            </span>
                          </div>
                          <div className="flex justify-between items-baseline gap-4">
                            <span className="text-foreground/80 text-sm">{t("hours_saturday")}</span>
                            <span className="text-foreground font-medium text-sm">
                              {t("hours_saturday_time")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="text-xl font-bold tracking-widest uppercase mb-4">{t("name")}</h4>
              <p className="text-background/80 leading-relaxed">{t("footer_tagline")}</p>
            </div>
            <div>
              <h5 className="text-xs uppercase tracking-widest text-secondary mb-4 font-semibold">
                {t("footer_explore")}
              </h5>
              <ul className="space-y-2">
                <li>
                  <a href="#craft" className="text-background/85 hover:text-secondary transition-colors">
                    {t("nav_craft")}
                  </a>
                </li>
                <li>
                  <a href="#garments" className="text-background/85 hover:text-secondary transition-colors">
                    {t("nav_garments")}
                  </a>
                </li>
                <li>
                  <a href="#fabrics" className="text-background/85 hover:text-secondary transition-colors">
                    {t("nav_fabrics")}
                  </a>
                </li>
                <li>
                  <a href="#process" className="text-background/85 hover:text-secondary transition-colors">
                    {t("nav_process")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs uppercase tracking-widest text-secondary mb-4 font-semibold">
                {t("footer_contact")}
              </h5>
              <p className="text-background/80 leading-relaxed mb-3">{t("address")}</p>
              <a
                href={`tel:${PHONE_PRIMARY_TEL}`}
                className="block text-background/80 hover:text-secondary transition-colors"
              >
                {PHONE_PRIMARY}
              </a>
              <a
                href={`tel:${PHONE_SECONDARY_TEL}`}
                className="block text-background/80 hover:text-secondary transition-colors"
              >
                {PHONE_SECONDARY}
              </a>
            </div>
          </div>
          <div className="border-t border-background/10 pt-8 text-center">
            <p className="text-background/50 font-light text-sm">
              &copy; {new Date().getFullYear()} {t("name")}. {t("footer_rights")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
