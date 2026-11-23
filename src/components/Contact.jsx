import {
  Send,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { ui } from "../i18n/ui.js";

const WEB3FORMS_KEY = "489dc59c-252d-4dfd-8080-1f7e57748ff6";

export default function Contact({ lang = "es" }) {
  const t = ui[lang].contact;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
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
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contacto" className="py-32 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div className="space-y-8 flex flex-col justify-center">
            <a
              href="https://wa.me/5492942553671"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              <MessageCircle size={20} className="text-gray-500 group-hover:text-green-400 transition-colors" />
              <div>
                <div className="text-white font-medium text-sm">WhatsApp</div>
                <div className="text-gray-500 text-xs font-light">{t.whatsappHint}</div>
              </div>
            </a>

            <a
              href="mailto:contacto@icaweb.dev"
              className="flex items-center gap-4 group"
            >
              <Mail size={20} className="text-gray-500 group-hover:text-violet-400 transition-colors" />
              <div>
                <div className="text-white font-medium text-sm">contacto@icaweb.dev</div>
                <div className="text-gray-500 text-xs font-light">{t.emailHint}</div>
              </div>
            </a>

            <a
              href="tel:+542942553671"
              className="flex items-center gap-4 group"
            >
              <Phone size={20} className="text-gray-500 group-hover:text-violet-400 transition-colors" />
              <div>
                <div className="text-white font-medium text-sm">+54 2942 553671</div>
                <div className="text-gray-500 text-xs font-light">{t.phoneHint}</div>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <MapPin size={20} className="text-gray-500" />
              <div>
                <div className="text-white font-medium text-sm">Buenos Aires, AR</div>
                <div className="text-gray-500 text-xs font-light">{t.locationHint}</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="text-xs text-gray-500 tracking-wide mb-3 block font-light" htmlFor="contact-name">{t.name}</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-0 border-b border-gray-800 px-0 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors font-light"
                placeholder={t.namePlaceholder}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 tracking-wide mb-3 block font-light" htmlFor="contact-email">{t.email}</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-0 border-b border-gray-800 px-0 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors font-light"
                placeholder={t.emailPlaceholder}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 tracking-wide mb-3 block font-light" htmlFor="contact-message">
                {t.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border-0 border-b border-gray-800 px-0 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors resize-none font-light"
                placeholder={t.messagePlaceholder}
              />
            </div>

            {/* Status messages */}
            {status === "success" && (
              <div className="flex items-center gap-2 text-green-400 text-sm font-light">
                <CheckCircle size={16} />
                <span>{t.success}</span>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-sm font-light">
                <AlertCircle size={16} />
                <span>{t.error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="group flex items-center gap-2 text-white font-medium border-b border-white/60 hover:border-violet-400 pb-1 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? t.sending : t.send}
              <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
