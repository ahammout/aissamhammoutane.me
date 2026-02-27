import { useI18n } from "@/lib/i18n";

const LanguageToggle = () => {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center border border-border rounded-lg overflow-hidden text-xs font-medium">
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 transition-all duration-200 ${
          lang === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("fr")}
        className={`px-3 py-1.5 transition-all duration-200 ${
          lang === "fr"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageToggle;
