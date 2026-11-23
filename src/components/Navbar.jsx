import { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react";
import { ui, paths, cvFiles } from "../i18n/ui.js";

export default function Navbar({ lang = "es" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = ui[lang].nav;

  const navLinks = [
    { href: "#servicios", label: t.services },
    { href: "#portfolio", label: t.portfolio },
    { href: "#proceso", label: t.process },
    { href: "#contacto", label: t.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LangSwitch = ({ className = "" }) => (
    <div className={`flex items-center gap-1.5 text-xs tracking-widest ${className}`}>
      {["es", "en"].map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-gray-700" aria-hidden="true">/</span>}
          {l === lang ? (
            <span className="text-white font-medium" aria-current="true">
              {l.toUpperCase()}
            </span>
          ) : (
            <a
              href={paths[l]}
              hrefLang={l}
              lang={l}
              title={t.switchTo}
              className="text-gray-500 hover:text-violet-400 transition-colors duration-200"
            >
              {l.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </div>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-black-950/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href={paths[lang]} className="flex items-center gap-2.5">
            <img src="/logo-nuevo.png" alt="ICA" className="h-8" />
            <span className="text-white text-sm font-semibold tracking-wide">ICA</span>
          </a>

          {/* Desktop — centered links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-xs text-gray-400 hover:text-white tracking-widest uppercase transition-colors duration-200 py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-violet-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop — right: CV + language */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={cvFiles[lang]}
              target="_blank"
              rel="noopener"
              title={t.cvTitle}
              className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-white border border-gray-700 hover:border-violet-400 rounded-full px-3.5 py-1.5 tracking-widest uppercase transition-colors duration-200"
            >
              <FileText size={13} aria-hidden="true" />
              {t.cv}
            </a>
            <LangSwitch />
          </div>

          {/* Mobile: language + toggle */}
          <div className="flex md:hidden items-center gap-5">
            <LangSwitch />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t.close : t.menu}
              aria-expanded={isOpen}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-gray-800/50">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm tracking-wide"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={cvFiles[lang]}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-violet-400 text-sm tracking-wide"
              >
                <FileText size={15} aria-hidden="true" />
                {t.cvTitle}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
