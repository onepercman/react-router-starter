import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function useDarkMode() {
  const [theme, setTheme] = useState<Theme>("system");
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Function to apply theme to DOM
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove("dark", "light");

    if (newTheme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (systemPrefersDark) {
        root.classList.add("dark");
        setIsDark(true);
      } else {
        root.classList.add("light");
        setIsDark(false);
      }
    } else if (newTheme === "dark") {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.add("light");
      setIsDark(false);
    }

    console.log(
      "Applied theme:",
      newTheme,
      "isDark:",
      newTheme === "dark" ||
        (newTheme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  };

  useEffect(() => {
    setMounted(true);

    // Get saved theme from localStorage or default to system
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
    console.log("Initial theme from localStorage:", savedTheme);

    setTheme(savedTheme);
    applyTheme(savedTheme);

    // Listen for system theme changes when theme is set to system
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const currentTheme = (localStorage.getItem("theme") as Theme) || "system";
      if (currentTheme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    if (!mounted) {
      console.log("Not mounted yet, skipping toggle");
      return;
    }

    let newTheme: Theme;

    if (theme === "system") {
      // If currently system, switch to the opposite of current appearance
      newTheme = isDark ? "light" : "dark";
    } else if (theme === "light") {
      newTheme = "dark";
    } else {
      newTheme = "light";
    }

    console.log("Toggling theme from", theme, "to", newTheme);

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const setThemeMode = (newTheme: Theme) => {
    if (!mounted) {
      console.log("Not mounted yet, skipping setTheme");
      return;
    }

    console.log("Setting theme to:", newTheme);

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return {
    theme,
    isDark,
    mounted,
    toggleTheme,
    setTheme: setThemeMode,
  };
}
