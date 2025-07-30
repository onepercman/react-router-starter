import { useTheme } from "next-themes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",

      setTheme: (theme: Theme) => {
        set({ theme });
      },

      toggleTheme: () => {
        const { theme } = get();
        const newTheme: Theme =
          theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
        get().setTheme(newTheme);
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        theme: state.theme,
      }),
    }
  )
);

export const useThemeManager = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { toggleTheme } = useThemeStore();

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    useThemeStore.getState().setTheme(newTheme);
  };

  const handleToggleTheme = () => {
    toggleTheme();
    const currentTheme = useThemeStore.getState().theme;
    setTheme(currentTheme);
  };

  return {
    theme: theme as Theme,
    setTheme: handleSetTheme,
    toggleTheme: handleToggleTheme,
    isDark: resolvedTheme === "dark",
  };
};
