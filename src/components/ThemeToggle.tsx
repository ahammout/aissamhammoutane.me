import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-9 h-9 flex items-center justify-center rounded-md">
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      className="w-9 h-9 flex items-center justify-center rounded-md bg-transparent hover:bg-transparent focus:outline-none focus-visible:outline-none transition-transform duration-200 group"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-125 group-hover:drop-shadow-[0_0_6px_hsl(var(--primary))]" />
      ) : (
        <Moon className="h-4 w-4 text-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-125 group-hover:drop-shadow-[0_0_6px_hsl(var(--primary))]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ThemeToggle;
