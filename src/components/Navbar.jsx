import { useState, useEffect } from "react";
import { Menu, X, FileText } from "lucide-react";
import { ui, paths, cvFiles } from "../i18n/ui.js";

// Molinete chico del logo (mismo dibujo que Molinete.astro), en currentColor
const BLADE = "M0 0 L0 -100 A50 50 0 0 1 0 0 Z";
function MiniMolinete({ className }) {
  const aspas = (op, rot, sc) => (
    <g transform={`rotate(${rot}) scale(${sc})`} opacity={op}>
      {[0, 90, 180, 270].map((r) => (
        <path key={r} d={BLADE} transform={`rotate(${r})`} />
      ))}
    </g>
  );
  return (
    <svg viewBox="-110 -110 220 220" fill="currentColor" className={className} aria-hidden="true">
      <g transform="rotate(45)">
        {aspas(0.45, 22, 0.95)}
        {aspas(1, 0, 1)}
      </g>
    </svg>
  );
}

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
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Arriba de todo el menú va blanco sobre el fucsia; al bajar, fondo blanco y texto oscuro.
  const solid = scrolled || isOpen;
  const text = solid ? "text-ink" : "text-white";
  const soft = solid ? "text-muted hover:text-ink" : "text-white/80 hover:text-white";

  const LangSwitch = () => (
    <div className="flex items-center gap-1.5 text-[13px] font-medium">
      {["es", "en"].map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span className={solid ? "text-line" : "text-white/40"} aria-hidden="true">/</span>}
          {l === lang ? (
            <span className={text} aria-current="true">{l.toUpperCase()}</span>
          ) : (
            <a href={paths[l]} hrefLang={l} lang={l} title={t.switchTo} className={`${soft} transition-colors`}>
              {l.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </div>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white/90 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          <a href={paths[lang]} aria-label={t.home} className={`flex items-center gap-2.5 ${text}`}>
            <MiniMolinete className={`h-7 w-7 ${solid ? "text-fucsia" : "text-white"}`} />
            <span className="font-display text-lg leading-none">ICA</span>
          </a>

          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={`text-[15px] font-medium ${soft} transition-colors duration-200`}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href={cvFiles[lang]}
              target="_blank"
              rel="noopener"
              title={t.cvTitle}
              className={`inline-flex items-center gap-1.5 text-[13px] font-semibold rounded-full px-4 py-1.5 border transition-colors duration-200 ${
                solid ? "border-line text-ink hover:border-fucsia hover:text-fucsia-deep" : "border-white/50 text-white hover:bg-white hover:text-fucsia-deep"
              }`}
            >
              <FileText size={14} aria-hidden="true" />
              {t.cv}
            </a>
            <LangSwitch />
          </div>

          <div className="flex md:hidden items-center gap-5">
            <LangSwitch />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t.close : t.menu}
              aria-expanded={isOpen}
              className={text}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-6">
            <div className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-ink text-lg font-medium py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={cvFiles[lang]}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-fucsia-deep text-lg font-medium py-2"
              >
                <FileText size={17} aria-hidden="true" />
                {t.cvTitle}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
