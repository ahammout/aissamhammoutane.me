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
      <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-xl font-bold text-gradient mb-3">Aissam Hammoutane</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t("footer.description")}</p>
            <a href="mailto:aissam.hammoutane@outlook.com" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-3.5 h-3.5" />
              aissam.hammoutane@outlook.com
            </a>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-widest mb-4">{t("footer.explore")}</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{t(link.key)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-widest mb-4">{t("footer.connect")}</h4>
            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
                    <social.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                    <span>{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status + Language */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-widest mb-4">{t("footer.status")}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span>{t("footer.location")}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-muted-foreground">{t("contact.available")}</span>
              </div>

              <a href="mailto:aissam.hammoutane@outlook.com" className="inline-flex items-center gap-2 mt-2 px-4 py-2 text-xs font-medium border border-border rounded-lg text-foreground hover:border-primary/40 hover:text-primary transition-all duration-200">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {t("contact.getintouch")}
              </a>

              {/* Language toggle in footer */}
              <div className="pt-3">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-medium">{t("footer.language")}</p>
                <div className="flex items-center border border-border rounded-lg overflow-hidden text-xs font-medium w-fit">
                  <button
                    onClick={() => setLang("en")}
                    className={`px-3 py-1.5 transition-all duration-200 ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang("fr")}
                    className={`px-3 py-1.5 transition-all duration-200 ${lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    FR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-4 border-t border-border flex items-center justify-between">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Aissam Hammoutane. {t("footer.rights")}
          </p>
          <p className="font-display text-sm font-bold text-gradient">AH</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
