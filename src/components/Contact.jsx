import { Send, MessageCircle, Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { ui } from "../i18n/ui.js";

const WEB3FORMS_KEY = "489dc59c-252d-4dfd-8080-1f7e57748ff6";

const inputClass =
  "w-full bg-transparent border-0 border-b border-gray-700 px-0 py-3 text-white text-[17px] placeholder-gray-600 focus:outline-none focus:border-violet-400 transition-colors";

export default function Contact({ lang = "es" }) {
  const t = ui[lang].contact;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${t.subject} ${formData.name} - ICA Web`,
          from_name: formData.name,
          ...formData,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(null), 6000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const channels = [
    { href: "https://wa.me/5492942553671", icon: MessageCircle, title: "WhatsApp", hint: t.whatsappHint, external: true },
    { href: "mailto:contacto@icaweb.dev", icon: Mail, title: "contacto@icaweb.dev", hint: t.emailHint },
    { href: "tel:+542942553671", icon: Phone, title: "+54 2942 553671", hint: t.phoneHint },
    { icon: MapPin, title: "Buenos Aires, AR", hint: t.locationHint },
  ];

  return (
    <section id="contacto" className="relative pt-16 md:pt-24 pb-14 md:pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <h2 className="font-display text-gradient text-[2.6rem] sm:text-6xl lg:text-[5.2rem] max-w-[12em] [text-wrap:balance]">
          {t.title}
        </h2>
        <p className="text-gray-400 text-lg md:text-xl mt-6 max-w-xl">{t.intro}</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 mt-10 md:mt-12">
          <ul className="lg:col-span-5 space-y-7">
            {channels.map(({ href, icon: Icon, title, hint, external }) => {
              const inner = (
                <>
                  <Icon size={20} className="text-gray-500 group-hover:text-violet-400 transition-colors shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block text-white font-semibold">{title}</span>
                    <span className="block text-gray-500 text-sm">{hint}</span>
                  </span>
                </>
              );
              return (
                <li key={title}>
                  {href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-9">
            <div className="grid sm:grid-cols-2 gap-9">
              <div>
                <label className="text-sm text-gray-400 mb-2 block" htmlFor="contact-name">{t.name}</label>
                <input id="contact-name" type="text" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" className={inputClass} placeholder={t.namePlaceholder} />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block" htmlFor="contact-email">{t.email}</label>
                <input id="contact-email" type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" className={inputClass} placeholder={t.emailPlaceholder} />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block" htmlFor="contact-message">{t.message}</label>
              <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} required rows={4} className={`${inputClass} resize-none`} placeholder={t.messagePlaceholder} />
            </div>

            <div aria-live="polite">
              {status === "success" && (
                <p className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle size={16} aria-hidden="true" />
                  {t.success}
                </p>
              )}
              {status === "error" && (
                <p className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} aria-hidden="true" />
                  {t.error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-3 bg-white text-ink font-semibold px-7 py-3.5 rounded-full hover:bg-violet-400 transition-colors duration-200 text-[15px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? t.sending : t.send}
              <Send size={16} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
