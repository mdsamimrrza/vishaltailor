import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionHeader } from "@/components/SectionHeader";
import { Navbar } from "@/components/Navbar";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { EnquiryForm } from "@/components/EnquiryForm";
import { OptimizedImage } from "@/components/OptimizedImage";
import { getStatusText, isOpenNow } from "@/utils/businessHours";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Scissors,
  Ruler,
  Shirt,
  Hand,
  Package,
  MessageCircle,
  Sparkles,
} from "lucide-react";

const PHONE_PRIMARY = "+977 980-4833357";
const PHONE_PRIMARY_TEL = "+9779804833357";
const PHONE_SECONDARY = "+977 981-2097433";
const PHONE_SECONDARY_TEL = "+9779812097433";

type ImagePreview = {
  src: string;
  alt: string;
};

type GarmentVariant = {
  labelKey: string;
  image: string;
  priceKey: string;
  deliveryKey: string;
  descKey: string;
};

type GarmentGroup = {
  titleKey: string;
  variants: GarmentVariant[];
};

export default function Home() {
  const { t, language } = useLanguage();

  const [activeImage, setActiveImage] = useState<ImagePreview | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<Record<string, number>>({});

  useEffect(() => {
    document.body.style.overflow = activeImage ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  useEffect(() => {
    if (!activeImage) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage]);

  const scrollToSection = (href: string) => {
    if (!href.startsWith("#")) {
      return;
    }

    const id = href.slice(1);
    const target = id ? document.getElementById(id) : document.body;

    if (!target) {
      return;
    }

    window.history.replaceState(null, "", href);
    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { href: "#craft", label: t("nav_craft") },
    { href: "#garments", label: t("nav_garments") },
    { href: "#fabrics", label: t("nav_fabrics") },
    { href: "#process", label: t("nav_process") },
    { href: "#visit", label: t("nav_visit") },
  ];

  const garments: GarmentGroup[] = [
    {
      titleKey: "garments_coatpant",
      variants: [
        {
          labelKey: "garments_coatpant",
          image: "/images/coatpant.png",
          priceKey: "garments_coatpant_price",
          deliveryKey: "garments_coatpant_delivery",
          descKey: "garments_coatpant_desc",
        },
      ],
    },
    {
      titleKey: "garments_safari",
      variants: [
        {
          labelKey: "garments_safari",
          image: "/images/Safari Suits.png",
          priceKey: "garments_safari_price",
          deliveryKey: "garments_safari_delivery",
          descKey: "garments_safari_desc",
        },
      ],
    },
    {
      titleKey: "garments_pants",
      variants: [
        {
          labelKey: "garments_pants",
          image: "/images/Shirts & Pants.png",
          priceKey: "garments_pants_price",
          deliveryKey: "garments_pants_delivery",
          descKey: "garments_pants_desc",
        },
      ],
    },
    {
      titleKey: "garments_kurta",
      variants: [
        {
          labelKey: "garments_kurta",
          image: "/images/Kurta-Pajama.png",
          priceKey: "garments_kurta_price",
          deliveryKey: "garments_kurta_delivery",
          descKey: "garments_kurta_desc",
        },
      ],
    },
    {
      titleKey: "garments_sherwani",
      variants: [
        {
          labelKey: "garments_sherwani",
          image: "/images/Sherwani.png",
          priceKey: "garments_sherwani_price",
          deliveryKey: "garments_sherwani_delivery",
          descKey: "garments_sherwani_desc",
        },
      ],
    },
    {
      titleKey: "garments_bandi",
      variants: [
        {
          labelKey: "garments_bandi",
          image: "/images/Bandi.png",
          priceKey: "garments_bandi_price",
          deliveryKey: "garments_bandi_delivery",
          descKey: "garments_bandi_desc",
        },
      ],
    },
  ];

  const fabrics = [
    { titleKey: "fabric_silk_title", descKey: "fabric_silk_desc", img: "/images/Premium Suiting.png" },
    { titleKey: "fabric_cotton_title", descKey: "fabric_cotton_desc", img: "/images/Shirting Cotton.png" },
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

  // The displayed address text on screen is intentionally kept from the translations,
  // but the embedded map uses the exact coordinates provided by the user.
  const mapsAddr = "26.730175, 85.926883";
  const mapsLink = "https://maps.google.com/?q=Janaki+Chowk,Janakpur+Dham,Nepal";
  const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(mapsAddr)}&t=&z=17&ie=UTF8&iwloc=B&output=embed`;
  const openNow = isOpenNow();
  const businessStatusText = getStatusText(language);

  const openImage = (src: string, alt: string) => {
    setActiveImage({ src, alt });
  };

  const closeImage = () => setActiveImage(null);

  const getQuoteLink = (garmentName: string) => {
    const message = `Hi, I'm interested in a ${garmentName}. Can you share more details?`;
    return `https://wa.me/9779804833357?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-background selection:bg-secondary selection:text-secondary-foreground">
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md px-4 py-6 md:px-8 md:py-8"
          >
            <button
              type="button"
              onClick={closeImage}
              className="relative z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-primary"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <button
              type="button"
              aria-label="Close full screen image"
              onClick={closeImage}
              className="absolute inset-0 z-0 cursor-zoom-out"
            />

            <div className="pointer-events-none absolute inset-x-4 top-24 bottom-6 z-10 flex items-center justify-center md:inset-x-8 md:top-28 md:bottom-8">
              <motion.img
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                src={activeImage.src}
                alt={activeImage.alt}
                className="pointer-events-auto max-h-full max-w-full object-contain shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
                width={900}
                height={1200}
                loading="eager"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar links={navLinks} onNavigate={scrollToSection} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#3b0c0c]">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full"
          >
            <button
              type="button"
              onClick={() => openImage(window.innerWidth < 768 ? "/images/hero-mobile.png" : "/images/hero.png", t("hero_image_alt"))}
              aria-label={`Open full screen ${t("hero_image_alt")}`}
              className="block h-full w-full cursor-zoom-in"
            >
              <OptimizedImage
                src="/images/hero.png"
                webpSrc="/images/hero.webp"
                placeholderSrc="/images/hero.png"
                alt={t("hero_image_alt")}
                className="hidden md:block h-full w-full object-cover opacity-85"
                width={1600}
                height={900}
                loading="eager"
                fetchPriority="high"
              />
              <OptimizedImage
                src="/images/hero-mobile.png"
                alt={t("hero_image_alt")}
                className="md:hidden h-full w-full object-cover opacity-85"
                width={900}
                height={1600}
                loading="eager"
                fetchPriority="high"
              />
            </button>
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-[#3b0c0c]/90 via-[#3b0c0c]/45 to-black/55" />
          <div className="absolute inset-0 bg-radial-[at_50%_35%] from-transparent via-transparent to-black/35" />
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
              <p className="text-xl md:text-2xl text-primary-foreground font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                {t("description")}
              </p>

              <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <a
                  href="#visit"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection("#visit");
                  }}
                  className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-none tracking-widest hover:bg-secondary/90 transition-all uppercase text-sm border-2 border-secondary shadow-lg"
                >
                  {t("visit_title")}
                </a>
                <a
                  href="#garments"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection("#garments");
                  }}
                  className="px-8 py-4 bg-[#f1d8a7]/95 text-[#3b0c0c] font-bold rounded-none tracking-widest hover:bg-secondary hover:text-secondary-foreground transition-all uppercase text-sm border-2 border-[#f1d8a7]/80 shadow-lg backdrop-blur-sm"
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
            className="relative aspect-3/4 w-full max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 -z-10" />
            <img
              src="/images/hands.png"
              alt={t("master_work_image_alt")}
              className="w-full h-full object-cover shadow-2xl"
              width={800}
              height={1067}
              loading="lazy"
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
              <h3 className="text-secondary text-sm tracking-widest uppercase mb-4 font-bold">
                {t("about_eyebrow")}
              </h3>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-8">{t("about_title")}</h2>
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
                {t("about_desc")}
              </p>
              <p className="text-lg md:text-xl italic text-primary/80 leading-relaxed border-l-2 border-secondary pl-6 mb-8">
                {t("about_quote")}
              </p>
              <div className="grid grid-cols-3 gap-6 mt-12 border-t border-border pt-8">
                <div>
                  <h4 className="text-3xl md:text-5xl font-black text-secondary mb-2">30+</h4>
                  <p className="text-xs md:text-sm uppercase tracking-wider text-foreground/80 font-bold">
                    {t("about_stat_years")}
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl md:text-5xl font-black text-secondary mb-2">10k+</h4>
                  <p className="text-xs md:text-sm uppercase tracking-wider text-foreground/80 font-bold">
                    {t("about_stat_garments")}
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl md:text-5xl font-black text-secondary mb-2">5k+</h4>
                  <p className="text-xs md:text-sm uppercase tracking-wider text-foreground/80 font-bold">
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
              <h3 className="text-secondary text-sm tracking-widest uppercase mb-4 font-bold">
                {t("owner_section_eyebrow")}
              </h3>
              <h2 className="text-4xl md:text-6xl font-extrabold text-primary mb-2 leading-tight">
                {t("owner_section_title")}
              </h2>
              <p className="text-lg md:text-xl text-secondary mb-8 italic">
                {t("owner_section_subtitle")}
              </p>
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-10 max-w-2xl">
                {t("owner_section_desc")}
              </p>
              <div className="flex items-center gap-4 text-foreground/80">
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
            className="md:col-span-2 order-1 md:order-2 relative w-full max-w-sm mx-auto pb-14"
          >
            <div className="relative aspect-3/4 w-full">
              <div className="absolute inset-0 border-2 border-secondary translate-x-5 translate-y-5" />
              <div className="absolute inset-0 bg-primary -translate-x-3 -translate-y-3 -z-10" />
              <button
                type="button"
                onClick={() => openImage("/images/molbi_nadaf.png", t("owner_section_title"))}
                className="group relative block h-full w-full overflow-hidden shadow-2xl"
                aria-label="Open full screen portrait"
              >
                <img
                  src="/images/molbi_nadaf.png"
                  alt={t("owner_section_title")}
                  className="relative w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-x-0 bottom-0 flex justify-center bg-linear-to-t from-black/75 via-black/20 to-transparent px-5 pb-6 pt-10">
                  <span className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-primary">
                    View Full Screen
                  </span>
                </div>
              </button>
            </div>
            <div className="absolute bottom-0 left-1/2 z-10 w-[calc(100%-2rem)] -translate-x-1/2 md:w-auto">
              <div className="mx-auto flex justify-center bg-primary px-7 py-3 shadow-xl border border-secondary/40 whitespace-nowrap">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-center text-primary-foreground">
                  {t("owner")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <WhyChooseUs />

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
                <p className="text-primary-foreground text-lg mt-4 max-w-2xl mx-auto">
                  {t("garments_subtitle")}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {garments.map((garment, idx) => {
              const selectedIndex = selectedVariantIndex[garment.titleKey] ?? 0;
              const selectedVariant = garment.variants[selectedIndex];

              return (
                <motion.div
                  key={garment.titleKey}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.9, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden bg-[#2d0707] border border-white/10 shadow-2xl"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <button
                      type="button"
                      onClick={() => openImage(selectedVariant.image, t(selectedVariant.labelKey))}
                      aria-label={`Open full screen ${t(garment.titleKey)}`}
                      className="group block h-full w-full cursor-zoom-in"
                    >
                      <img
                        src={selectedVariant.image}
                        alt={t(garment.titleKey)}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        width={1000}
                        height={1000}
                        loading="lazy"
                      />
                    </button>
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                  </div>

                  <div className="p-6 md:p-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${garment.titleKey}-${language}-${selectedIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full"
                      >
                        <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                          {t(garment.titleKey)}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-secondary">
                          {t(selectedVariant.priceKey)}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/80">
                          {t(selectedVariant.deliveryKey)}
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-white/85">
                          {t(selectedVariant.descKey)}
                        </p>
                        <a
                          href={getQuoteLink(t(garment.titleKey))}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-foreground transition-transform duration-300 hover:scale-[1.03]"
                        >
                          Get Quote
                        </a>

                        {garment.variants.length > 1 && (
                          <div className="mt-6 flex flex-wrap gap-3">
                            {garment.variants.map((variant, variantIndex) => {
                              const isSelected = variantIndex === selectedIndex;

                              return (
                                <button
                                  key={variant.image}
                                  type="button"
                                  onClick={() => setSelectedVariantIndex((current) => ({ ...current, [garment.titleKey]: variantIndex }))}
                                  className={`overflow-hidden rounded-xl border transition-all duration-300 ${isSelected ? "border-secondary ring-2 ring-secondary/50" : "border-white/15 hover:border-secondary/50"}`}
                                  aria-label={`Select ${t(variant.labelKey)}`}
                                >
                                  <img
                                    src={variant.image}
                                    alt={t(variant.labelKey)}
                                    className="h-16 w-16 object-cover"
                                    width={128}
                                    height={128}
                                    loading="lazy"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
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
                <p className="text-foreground text-lg mt-4 max-w-2xl mx-auto">
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
                <div className="aspect-4/3 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => openImage(fabric.img, t(fabric.titleKey))}
                    aria-label={`Open full screen ${t(fabric.titleKey)}`}
                    className="block h-full w-full cursor-zoom-in"
                  >
                    <img
                      src={fabric.img}
                      alt={t(fabric.titleKey)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      width={1200}
                      height={800}
                      loading="lazy"
                    />
                  </button>
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
                    <p className="text-foreground/90 leading-relaxed">{t(fabric.descKey)}</p>
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
                <p className="text-foreground text-lg mt-4 max-w-2xl mx-auto">
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
                      <p className="text-foreground/90 leading-relaxed">{t(step.descKey)}</p>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Testimonials />

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
                <p className="text-foreground text-lg mt-4 max-w-2xl mx-auto">
                  {t("visit_subtitle")}
                </p>
                <div className="mt-8 flex justify-center">
                  <EnquiryForm variant="modal" triggerLabel={language === "ne" ? "अपोइन्टमेन्ट बुक गर्नुहोस्" : language === "hi" ? "अपॉइंटमेंट बुक करें" : "Book Appointment"} />
                </div>
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
              <div className="relative bg-card border border-border overflow-hidden shadow-2xl h-125 lg:h-full min-h-125">
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
                        <h4 className="text-xs uppercase tracking-widest text-foreground/80 mb-2">
                          {t("visit_location")}
                        </h4>
                        <a
                          href={mapsLink}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-foreground font-medium leading-relaxed mb-4 hover:text-primary transition-colors"
                        >
                          {t("address")}
                        </a>
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
                        <h4 className="text-xs uppercase tracking-widest text-foreground/85 mb-3 font-semibold">
                          {t("visit_phone")}
                        </h4>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between gap-3">
                            <a href={`tel:${PHONE_PRIMARY_TEL}`} className="block text-foreground font-semibold font-sans tracking-wide leading-relaxed hover:text-primary transition-colors">{PHONE_PRIMARY}</a>
                            <a href="https://wa.me/9779804833357" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-300 hover:scale-110">
                              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M20.52 3.48A11.58 11.58 0 0 0 12.07 0C5.41 0 .02 5.39.01 12.05c0 2.12.56 4.2 1.62 6.02L0 24l6.1-1.6a11.94 11.94 0 0 0 5.95 1.52h.01c6.66 0 12.05-5.39 12.05-12.05 0-3.23-1.26-6.26-3.59-8.39Zm-8.45 18.5h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.62.95.97-3.53-.23-.36a9.86 9.86 0 0 1-1.52-5.23C2.25 6.62 6.78 2.1 12.06 2.1c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.98c0 5.28-4.53 10-10.88 10Zm5.96-7.76c-.34-.17-2.02-1-2.33-1.12-.31-.11-.53-.17-.75.17-.22.34-.86 1.12-1.05 1.35-.19.22-.39.25-.73.08-.34-.17-1.43-.53-2.72-1.69-1-.89-1.68-1.99-1.88-2.33-.2-.34-.02-.52.15-.69.16-.16.34-.41.51-.61.17-.2.23-.34.34-.57.11-.22.06-.42-.03-.59-.09-.17-.75-1.81-1.03-2.48-.27-.65-.55-.56-.75-.57h-.64c-.22 0-.59.08-.9.42s-1.18 1.15-1.18 2.79 1.2 3.22 1.36 3.44c.17.22 2.36 3.6 5.72 5.05.8.35 1.42.56 1.91.72.8.25 1.53.21 2.11.13.64-.1 2.02-.83 2.31-1.64.29-.8.29-1.48.2-1.64-.08-.16-.31-.25-.65-.42Z" /></svg>
                            </a>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <a href={`tel:${PHONE_SECONDARY_TEL}`} className="block text-foreground font-semibold font-sans tracking-wide leading-relaxed hover:text-primary transition-colors">{PHONE_SECONDARY}</a>
                            <a href="https://wa.me/9779812097433" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-300 hover:scale-110">
                              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M20.52 3.48A11.58 11.58 0 0 0 12.07 0C5.41 0 .02 5.39.01 12.05c0 2.12.56 4.2 1.62 6.02L0 24l6.1-1.6a11.94 11.94 0 0 0 5.95 1.52h.01c6.66 0 12.05-5.39 12.05-12.05 0-3.23-1.26-6.26-3.59-8.39Zm-8.45 18.5h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.62.95.97-3.53-.23-.36a9.86 9.86 0 0 1-1.52-5.23C2.25 6.62 6.78 2.1 12.06 2.1c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.98c0 5.28-4.53 10-10.88 10Zm5.96-7.76c-.34-.17-2.02-1-2.33-1.12-.31-.11-.53-.17-.75.17-.22.34-.86 1.12-1.05 1.35-.19.22-.39.25-.73.08-.34-.17-1.43-.53-2.72-1.69-1-.89-1.68-1.99-1.88-2.33-.2-.34-.02-.52.15-.69.16-.16.34-.41.51-.61.17-.2.23-.34.34-.57.11-.22.06-.42-.03-.59-.09-.17-.75-1.81-1.03-2.48-.27-.65-.55-.56-.75-.57h-.64c-.22 0-.59.08-.9.42s-1.18 1.15-1.18 2.79 1.2 3.22 1.36 3.44c.17.22 2.36 3.6 5.72 5.05.8.35 1.42.56 1.91.72.8.25 1.53.21 2.11.13.64-.1 2.02-.83 2.31-1.64.29-.8.29-1.48.2-1.64-.08-.16-.31-.25-.65-.42Z" /></svg>
                            </a>
                          </div>
                        </div>
                        <a
                          href={`tel:${PHONE_PRIMARY_TEL}`}
                          className="inline-block text-xs uppercase tracking-widest text-secondary border-b border-secondary/50 hover:border-secondary pb-1 transition-all font-semibold"
                        >
                          {t("call_now")}
                        </a>
                        <a href="https://wa.me/9779804833357" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]">
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M20.52 3.48A11.58 11.58 0 0 0 12.07 0C5.41 0 .02 5.39.01 12.05c0 2.12.56 4.2 1.62 6.02L0 24l6.1-1.6a11.94 11.94 0 0 0 5.95 1.52h.01c6.66 0 12.05-5.39 12.05-12.05 0-3.23-1.26-6.26-3.59-8.39Zm-8.45 18.5h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.62.95.97-3.53-.23-.36a9.86 9.86 0 0 1-1.52-5.23C2.25 6.62 6.78 2.1 12.06 2.1c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.98c0 5.28-4.53 10-10.88 10Zm5.96-7.76c-.34-.17-2.02-1-2.33-1.12-.31-.11-.53-.17-.75.17-.22.34-.86 1.12-1.05 1.35-.19.22-.39.25-.73.08-.34-.17-1.43-.53-2.72-1.69-1-.89-1.68-1.99-1.88-2.33-.2-.34-.02-.52.15-.69.16-.16.34-.41.51-.61.17-.2.23-.34.34-.57.11-.22.06-.42-.03-.59-.09-.17-.75-1.81-1.03-2.48-.27-.65-.55-.56-.75-.57h-.64c-.22 0-.59.08-.9.42s-1.18 1.15-1.18 2.79 1.2 3.22 1.36 3.44c.17.22 2.36 3.6 5.72 5.05.8.35 1.42.56 1.91.72.8.25 1.53.21 2.11.13.64-.1 2.02-.83 2.31-1.64.29-.8.29-1.48.2-1.64-.08-.16-.31-.25-.65-.42Z" /></svg>
                          Send WhatsApp Message
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
                        <h4 className="text-xs uppercase tracking-widest text-foreground/80 mb-3">
                          {t("visit_hours")}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-baseline gap-4">
                            <span className="text-foreground text-sm font-medium">{t("hours_weekday")}</span>
                            <span className="text-foreground font-medium text-sm">
                              {t("hours_weekday_time")}
                            </span>
                          </div>
                          <div className="flex justify-between items-baseline gap-4">
                            <span className="text-foreground text-sm font-medium">{t("hours_saturday")}</span>
                            <span className="text-foreground font-medium text-sm">
                              {t("hours_saturday_time")}
                            </span>
                          </div>
                          <div className="pt-2 flex items-center gap-2 text-sm font-semibold">
                            <span className={`inline-flex h-2.5 w-2.5 rounded-full ${openNow ? "bg-emerald-500" : "bg-red-500"}`} />
                            <span className={openNow ? "text-emerald-600" : "text-red-600"}>{businessStatusText}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div className="lg:col-span-5">
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <EnquiryForm variant="inline" />
                <FAQ />
              </div>
            </div>
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
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <a href={`tel:${PHONE_PRIMARY_TEL}`} className="block text-background/80 hover:text-secondary transition-colors">{PHONE_PRIMARY}</a>
                  <a href="https://wa.me/9779804833357" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-300 hover:scale-110">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M20.52 3.48A11.58 11.58 0 0 0 12.07 0C5.41 0 .02 5.39.01 12.05c0 2.12.56 4.2 1.62 6.02L0 24l6.1-1.6a11.94 11.94 0 0 0 5.95 1.52h.01c6.66 0 12.05-5.39 12.05-12.05 0-3.23-1.26-6.26-3.59-8.39Zm-8.45 18.5h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.62.95.97-3.53-.23-.36a9.86 9.86 0 0 1-1.52-5.23C2.25 6.62 6.78 2.1 12.06 2.1c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.98c0 5.28-4.53 10-10.88 10Zm5.96-7.76c-.34-.17-2.02-1-2.33-1.12-.31-.11-.53-.17-.75.17-.22.34-.86 1.12-1.05 1.35-.19.22-.39.25-.73.08-.34-.17-1.43-.53-2.72-1.69-1-.89-1.68-1.99-1.88-2.33-.2-.34-.02-.52.15-.69.16-.16.34-.41.51-.61.17-.2.23-.34.34-.57.11-.22.06-.42-.03-.59-.09-.17-.75-1.81-1.03-2.48-.27-.65-.55-.56-.75-.57h-.64c-.22 0-.59.08-.9.42s-1.18 1.15-1.18 2.79 1.2 3.22 1.36 3.44c.17.22 2.36 3.6 5.72 5.05.8.35 1.42.56 1.91.72.8.25 1.53.21 2.11.13.64-.1 2.02-.83 2.31-1.64.29-.8.29-1.48.2-1.64-.08-.16-.31-.25-.65-.42Z" /></svg>
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <a href={`tel:${PHONE_SECONDARY_TEL}`} className="block text-background/80 hover:text-secondary transition-colors">{PHONE_SECONDARY}</a>
                  <a href="https://wa.me/9779812097433" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform duration-300 hover:scale-110">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><path d="M20.52 3.48A11.58 11.58 0 0 0 12.07 0C5.41 0 .02 5.39.01 12.05c0 2.12.56 4.2 1.62 6.02L0 24l6.1-1.6a11.94 11.94 0 0 0 5.95 1.52h.01c6.66 0 12.05-5.39 12.05-12.05 0-3.23-1.26-6.26-3.59-8.39Zm-8.45 18.5h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.62.95.97-3.53-.23-.36a9.86 9.86 0 0 1-1.52-5.23C2.25 6.62 6.78 2.1 12.06 2.1c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.98c0 5.28-4.53 10-10.88 10Zm5.96-7.76c-.34-.17-2.02-1-2.33-1.12-.31-.11-.53-.17-.75.17-.22.34-.86 1.12-1.05 1.35-.19.22-.39.25-.73.08-.34-.17-1.43-.53-2.72-1.69-1-.89-1.68-1.99-1.88-2.33-.2-.34-.02-.52.15-.69.16-.16.34-.41.51-.61.17-.2.23-.34.34-.57.11-.22.06-.42-.03-.59-.09-.17-.75-1.81-1.03-2.48-.27-.65-.55-.56-.75-.57h-.64c-.22 0-.59.08-.9.42s-1.18 1.15-1.18 2.79 1.2 3.22 1.36 3.44c.17.22 2.36 3.6 5.72 5.05.8.35 1.42.56 1.91.72.8.25 1.53.21 2.11.13.64-.1 2.02-.83 2.31-1.64.29-.8.29-1.48.2-1.64-.08-.16-.31-.25-.65-.42Z" /></svg>
                  </a>
                </div>
              </div>
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
