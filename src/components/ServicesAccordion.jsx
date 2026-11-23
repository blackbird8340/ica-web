import { useState } from "react";
import { ChevronDown, Layout, Globe, Settings, Wrench } from "lucide-react";

import { ui } from "../i18n/ui.js";

const icons = [Layout, Globe, Settings, Wrench];

export default function ServicesAccordion({ lang = "es" }) {
  const t = ui[lang].services;
  const services = t.items.map((item, i) => ({ ...item, icon: icons[i] }));
  const [activeIndex, setActiveIndex] = useState(0);

  const ActiveIcon = services[activeIndex >= 0 ? activeIndex : 0].icon;

  return (
    <section id="servicios" className="py-32 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-reveal className="mb-20">
          <p className="text-xs text-gray-500 tracking-widest uppercase mb-4">
            {t.label}
          </p>
          <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight">
            {t.title1}{" "}
            <span className="font-serif italic font-normal">{t.title2}</span>
          </h2>
          <p className="text-gray-400 font-light mt-4 max-w-2xl">
            {t.intro}
          </p>
        </div>

        <div data-reveal className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Accordion */}
          <div className="space-y-0">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="border-t border-gray-800/50 last:border-b"
                >
                  <button
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? -1 : index)
                    }
                    className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
                    aria-expanded={activeIndex === index}
                  >
                    <div className="flex items-center gap-4">
                      <Icon
                        size={20}
                        className={`transition-colors duration-200 ${
                          activeIndex === index
                            ? "text-violet-400"
                            : "text-gray-600 group-hover:text-violet-400"
                        }`}
                        strokeWidth={1.5}
                      />
                      <h3
                        className={`text-lg md:text-xl font-medium transition-colors duration-200 ${
                          activeIndex === index
                            ? "text-violet-400"
                            : "text-white group-hover:text-violet-400"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-gray-500 transition-transform duration-300 ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeIndex === index ? "max-h-40 pb-6" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-400 font-light text-sm leading-relaxed pl-9 pr-8">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Icon panel (desktop only) */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="sticky top-32 w-full aspect-square max-w-[320px] rounded-2xl border border-gray-800/50 bg-black-800/30 flex items-center justify-center">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                      activeIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Icon
                      size={80}
                      className="text-violet-500/30"
                      strokeWidth={1}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
