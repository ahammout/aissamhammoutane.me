import { Github, Linkedin, Instagram, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const Footer = () => {
  const { t, lang, setLang } = useI18n();

  const navLinks = [
    { key: "nav.home", href: "#" },
    { key: "nav.about", href: "#about" },
    { key: "nav.projects", href: "#projects" },
    { key: "nav.skills", href: "#skills" },
    { key: "nav.education", href: "#education" },
    { key: "nav.contact", href: "#contact" },
    { key: "footer.blog", href: "/blog" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/ahammout", label: "GitHub", handle: "ahammout" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/aissam-hammoutane-9968341b8/", label: "LinkedIn", handle: "Aissam Hammoutane" },
    { icon: Instagram, href: "https://www.instagram.com/aissam_hammoutane/", label: "Instagram", handle: "@aissam_hammoutane" },
  ];

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <p className="font-display text-base sm:text-xl font-bold text-gradient mb-2 sm:mb-3">Aissam Hammoutane</p>
            <p className="text-[11px] sm:text-sm text-muted-foreground leading-relaxed mb-3">{t("footer.description")}</p>
            <a href="mailto:aissam.hammoutane@outlook.com" className="inline-flex items-center gap-1.5 text-[11px] sm:text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              aissam.hammoutane@outlook.com
            </a>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display text-xs sm:text-sm font-semibold text-foreground uppercase tracking-widest mb-3 sm:mb-4">{t("footer.explore")}</h4>
            <ul className="space-y-1.5 sm:space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="text-[11px] sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{t(link.key)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-xs sm:text-sm font-semibold text-foreground uppercase tracking-widest mb-3 sm:mb-4">{t("footer.connect")}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] sm:text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <social.icon className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
                    <span className="truncate">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status + Language */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-display text-xs sm:text-sm font-semibold text-foreground uppercase tracking-widest mb-3 sm:mb-4">{t("footer.status")}</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-sm text-muted-foreground">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>{t("footer.location")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-sm">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-muted-foreground">{t("contact.available")}</span>
              </div>

              <a href="mailto:aissam.hammoutane@outlook.com" className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 text-[10px] sm:text-xs font-medium border border-border rounded-lg text-foreground hover:border-primary/40 hover:text-primary transition-all duration-200">
                <ArrowUpRight className="w-3 h-3" />
                {t("contact.getintouch")}
              </a>

              {/* Language toggle */}
              <div className="pt-2">
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 uppercase tracking-wider font-medium">{t("footer.language")}</p>
                <div className="flex items-center border border-border rounded-lg overflow-hidden text-[10px] sm:text-xs font-medium w-fit">
                  <button
                    onClick={() => setLang("en")}
                    className={`px-2.5 py-1 sm:px-3 sm:py-1.5 transition-all duration-200 ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang("fr")}
                    className={`px-2.5 py-1 sm:px-3 sm:py-1.5 transition-all duration-200 ${lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    FR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-border flex items-center justify-between">
          <p className="text-muted-foreground text-[10px] sm:text-xs">
            © {new Date().getFullYear()} Aissam Hammoutane. {t("footer.rights")}
          </p>
          <p className="font-display text-xs sm:text-sm font-bold text-gradient">AH</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
