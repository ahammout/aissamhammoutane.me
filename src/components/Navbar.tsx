import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Settings, Moon, Sun, Languages } from "lucide-react";
import HeartbeatButton from "./HeartbeatButton";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "next-themes";

const navLinks = [
  { key: "nav.home", href: "#" },
  { key: "nav.about", href: "#about" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.skills", href: "#skills" },
  { key: "nav.education", href: "#education" },
  { key: "nav.contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#");
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const { t, lang, setLang } = useI18n();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isOpen) setIsOpen(false);
      const sections = ["contact", "education", "skills", "projects", "about"];
      let found = "#";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          found = `#${id}`;
          break;
        }
      }
      setActiveSection(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && !settingsOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (isOpen && menuRef.current && !menuRef.current.contains(target) && buttonRef.current && !buttonRef.current.contains(target)) {
        setIsOpen(false);
      }
      if (settingsOpen && settingsRef.current && !settingsRef.current.contains(target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, settingsOpen]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-3 flex items-center justify-between">
        <a href="#" className="font-display text-lg font-bold text-gradient">
          Aissam Hammoutane
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.key}
                href={link.href}
                className="relative text-xs font-semibold tracking-wide transition-colors duration-300 py-1 group uppercase"
              >
                <span className={isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}>
                  {t(link.key)}
                </span>
                <motion.span
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary rounded-full"
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ originX: 0.5 }}
                />
              </a>
            );
          })}
          <HeartbeatButton />

          {/* Settings dropdown */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Settings className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${settingsOpen ? "rotate-90 text-primary" : "hover:text-foreground"}`} />
            </button>
            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-card border border-border shadow-xl p-2 space-y-1"
                >
                  {/* Theme toggle */}
                  <button
                    onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                  >
                    {mounted && theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                    {mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
                  {/* Language toggle */}
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
                    <Languages className="w-3.5 h-3.5 text-muted-foreground" />
                    <div className="flex items-center border border-border rounded-md overflow-hidden text-xs font-medium flex-1">
                      <button
                        onClick={() => setLang("en")}
                        className={`flex-1 px-2 py-1 transition-all duration-200 ${
                          lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setLang("fr")}
                        className={`flex-1 px-2 py-1 transition-all duration-200 ${
                          lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        FR
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Settings icon for mobile */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-lg"
            >
              <Settings className={`h-4 w-4 transition-transform duration-300 ${settingsOpen ? "rotate-90 text-primary" : "text-foreground"}`} />
            </button>
            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-card border border-border shadow-xl p-2 space-y-1 z-50"
                >
                  <button
                    onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                  >
                    {mounted && theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                    {mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg">
                    <Languages className="w-3.5 h-3.5 text-muted-foreground" />
                    <div className="flex items-center border border-border rounded-md overflow-hidden text-xs font-medium flex-1">
                      <button
                        onClick={() => setLang("en")}
                        className={`flex-1 px-2 py-1 transition-all ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setLang("fr")}
                        className={`flex-1 px-2 py-1 transition-all ${lang === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                      >
                        FR
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            ref={buttonRef}
            className="text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-xs font-semibold uppercase tracking-wide py-2 transition-colors duration-300 border-l-2 pl-3 ${
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t(link.key)}
                  </a>
                );
              })}
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <HeartbeatButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
