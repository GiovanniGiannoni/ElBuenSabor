import { create } from "zustand";

type ThemeState = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggleTheme: () =>
    set((state) => {
      const newTheme = !state.isDark;

      localStorage.setItem("theme", newTheme ? "dark" : "light");

      return { isDark: newTheme };
    }),
}));
