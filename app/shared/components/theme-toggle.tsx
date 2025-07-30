import { useTheme } from "next-themes";
import { Button } from "./button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      shape="square"
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-background border border-border hover:bg-muted transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5">
        <svg
          className={`absolute inset-0 w-5 h-5 text-warning transition-all duration-300 transform ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        <svg
          className={`absolute inset-0 w-5 h-5 text-accent transition-all duration-300 transform ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </div>

      <div className="absolute inset-0 rounded-lg bg-primary-muted scale-0 transition-transform duration-200 group-active:scale-100"></div>
    </Button>
  );
}
