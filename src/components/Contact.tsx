import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin, Instagram, ArrowUpRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import emailjs from "emailjs-com";
import { useI18n } from "@/lib/i18n";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const { t } = useI18n();

  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { to_email: "aissam.hammoutane@outlook.com", from_name: formData.name, from_email: formData.email, message: formData.message }
      );
      toast.success(t("contact.success"));
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email error:", error);
      toast.error(t("contact.error"));
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/ahammout", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/aissam-hammoutane-9968341b8/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/aissam_hammoutane/", label: "Instagram" },
  ];

  const inputClasses = (field: string) =>
    `w-full px-3 sm:px-5 py-3 sm:py-4 rounded-xl bg-background border-2 transition-all duration-300 outline-none text-foreground placeholder:text-muted-foreground/60 text-xs sm:text-sm ${
      focused === field
        ? "border-primary/50 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.2)]"
        : "border-border hover:border-primary/20"
    }`;

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[10px] sm:text-xs font-medium text-primary tracking-wider uppercase">{t("contact.available")}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            {t("contact.title1")} <span className="text-gradient">{t("contact.title2")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-xs sm:text-sm md:text-base px-2">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-16">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4 sm:space-y-6"
          >
            <div className="text-center lg:text-left">
              <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">{t("contact.getintouch")}</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{t("contact.desc")}</p>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <motion.a
                href="mailto:aissam.hammoutane@outlook.com"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5">{t("contact.email")}</p>
                  <p className="text-xs sm:text-sm font-medium text-foreground truncate">aissam.hammoutane@outlook.com</p>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </motion.a>

              <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-card border border-border">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5">{t("contact.location")}</p>
                  <p className="text-xs sm:text-sm font-medium text-foreground">Rabat, Morocco</p>
                </div>
              </motion.div>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2.5 tracking-wider uppercase font-medium">{t("contact.connect")}</p>
              <div className="flex gap-2.5 justify-center lg:justify-start">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-3 sm:space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 text-foreground/80">{t("contact.name")}</label>
                <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} required className={inputClasses("name")} placeholder={t("contact.name.placeholder")} />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 text-foreground/80">{t("contact.email.label")}</label>
                <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} required className={inputClasses("email")} placeholder={t("contact.email.placeholder")} />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 text-foreground/80">{t("contact.message")}</label>
              <textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} required rows={5} className={`${inputClasses("message")} resize-none`} placeholder={t("contact.message.placeholder")} />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 sm:py-3.5 bg-primary text-primary-foreground text-xs sm:text-sm font-medium rounded-xl hover:opacity-90 transition-all duration-300 glow-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
              {loading ? t("contact.sending") : t("contact.send")}
            </motion.button>

            <p className="text-[10px] sm:text-xs text-center text-muted-foreground/60">{t("contact.response")}</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
