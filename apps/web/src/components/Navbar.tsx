import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Clock, Menu, Phone, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { getStatusText } from "@/utils/businessHours";

export interface NavLinkItem {
  href: string;
  label: string;
}

interface NavbarProps {
  links: NavLinkItem[];
  onNavigate: (href: string) => void;
}

const PHONE_PRIMARY = "+977 980-4833357";
const PHONE_PRIMARY_TEL = "+9779804833357";
const PHONE_SECONDARY = "+977 981-2097433";
const PHONE_SECONDARY_TEL = "+9779812097433";

export function Navbar({ links, onNavigate }: NavbarProps) {
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navbarRef = useRef<HTMLElement | null>(null);
  const [activeHash, setActiveHash] = useState("");

  const scrolled = scrollY > 80;

  useEffect(() => {
    const updateHeight = () => {
      if (!navbarRef.current) {
        return;
      }

      document.documentElement.style.setProperty("--navbar-height", `${navbarRef.current.offsetHeight}px`);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    if (navbarRef.current) {
      observer.observe(navbarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const isActive = useMemo(() => {
    return (href: string) => {
      if (location !== "/") {
        return false;
      }

      if (href === "#") {
        return activeHash === "";
      }

      return activeHash === href;
    };
  }, [activeHash, location]);

  const handleNavigate = (href: string) => {
    onNavigate(href);
    setMobileOpen(false);
  };

  return (
    <header ref={navbarRef} className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-[#4A0E0E]/95 backdrop-blur-md border-b border-[#C9A84C]/30 shadow-lg transition-all duration-300 ease-out">
        <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6 md:px-12">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              handleNavigate("#");
            }}
            className="min-w-0 flex-1 whitespace-nowrap text-[clamp(0.8rem,3.5vw,1.1rem)] font-bold leading-none tracking-[0.18em] uppercase text-[#F5E6CA] transition-colors duration-300"
          >
            {t("name")}
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavigate(link.href);
                  }}
                  className={`text-sm uppercase tracking-widest font-semibold transition-colors duration-300 ${active ? "text-[#C9A84C] underline underline-offset-8" : "text-white hover:text-[#F5E6CA]"}`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? t("menu_close") : t("menu_open")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#C9A84C]/30 bg-[#4A0E0E]/70 text-white transition-colors duration-300 hover:bg-[#C9A84C] hover:text-[#4A0E0E]"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label={t("menu_close")}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-x-0 bottom-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            style={{ top: "var(--navbar-height)" }}
          />

          <div
            className="fixed right-0 z-50 flex w-[85%] max-w-sm flex-col bg-[#1a0505] text-white shadow-2xl transition-transform duration-300 md:hidden"
            style={{ top: "var(--navbar-height)", height: "calc(100vh - var(--navbar-height))" }}
          >
            <div className="flex items-center justify-between border-b border-[#C9A84C]/20 px-6 py-4">
              <span className="text-base font-bold tracking-widest uppercase text-[#F5E6CA]">{t("name")}</span>
              <button
                type="button"
                aria-label={t("menu_close")}
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A84C]/30 text-white transition-colors hover:bg-[#C9A84C] hover:text-[#4A0E0E]"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="flex flex-col gap-1">
                {links.map((link) => {
                  const active = isActive(link.href);

                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(event) => {
                          event.preventDefault();
                          handleNavigate(link.href);
                        }}
                        className={`block border-b border-white/10 py-3 text-lg font-semibold transition-colors ${active ? "text-[#C9A84C]" : "text-white hover:text-[#F5E6CA]"}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex items-center gap-2 text-sm text-white/80">
                <Clock size={16} className="text-[#C9A84C]" />
                <span>{getStatusText(language)}</span>
              </div>

              <div className="mt-10">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">{t("menu_language")}</p>
                <LanguageSwitcher />
              </div>

              <div className="mt-10 space-y-3 border-t border-white/10 pt-6">
                <a href={`tel:${PHONE_PRIMARY_TEL}`} className="flex items-center gap-3 text-white transition-colors hover:text-[#C9A84C]">
                  <Phone size={16} className="text-[#C9A84C]" />
                  <span className="font-medium">{PHONE_PRIMARY}</span>
                </a>
                <a href={`tel:${PHONE_SECONDARY_TEL}`} className="flex items-center gap-3 text-white transition-colors hover:text-[#C9A84C]">
                  <Phone size={16} className="text-[#C9A84C]" />
                  <span className="font-medium">{PHONE_SECONDARY}</span>
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}