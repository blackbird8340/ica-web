import { useState, useEffect, useRef, useCallback } from "react";
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

  // Sección en pantalla (para marcarla en el menú) y la píldora que se desliza
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });
  const linksRef = useRef(null);
  const itemRefs = useRef({});

  useEffect(() => {
    const ids = ["servicios", "portfolio", "proceso", "contacto"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  const target = hovered ?? active;
  const movePill = useCallback(() => {
    const el = target && itemRefs.current[target];
    const box = linksRef.current;
    if (!el || !box) return setPill((p) => ({ ...p, visible: false }));
    const a = el.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    setPill({ left: a.left - b.left, width: a.width, visible: true });
  }, [target]);

  useEffect(() => {
    movePill();
    window.addEventListener("resize", movePill);
    return () => window.removeEventListener("resize", movePill);
  }, [movePill]);

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

          <div
            ref={linksRef}
            onMouseLeave={() => setHovered(null)}
            className="hidden md:flex items-center gap-1 relative"
          >
            {/* Píldora que sigue al mouse y, si no, marca la sección en pantalla */}
            <span
              aria-hidden="true"
              className={`absolute top-1/2 -translate-y-1/2 h-9 rounded-full transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none ${
                solid ? "bg-petal/60" : "bg-white/18"
              } ${pill.visible ? "opacity-100" : "opacity-0"}`}
              style={{ left: pill.left, width: pill.width }}
            />
            {navLinks.map((link) => {
              const on = target === link.href;
              return (
                <a
                  key={link.href}
                  ref={(el) => (itemRefs.current[link.href] = el)}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  onFocus={() => setHovered(link.href)}
                  onBlur={() => setHovered(null)}
                  aria-current={active === link.href ? "location" : undefined}
                  className={`relative z-10 px-4 py-2 rounded-full text-[15px] font-medium transition-colors duration-200 ${
                    on ? (solid ? "text-fucsia-deep" : "text-white") : solid ? "text-muted hover:text-ink" : "text-white/80"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
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
                  aria-current={active === link.href ? "location" : undefined}
                  className={`text-lg font-medium py-3 px-3 -mx-3 rounded-xl transition-colors active:bg-petal/60 ${
                    active === link.href ? "text-fucsia-deep bg-petal/40" : "text-ink"
                  }`}
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
