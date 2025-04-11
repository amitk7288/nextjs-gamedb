import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: () => void;
}

const useStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      setTheme: () => {
        const newTheme = get().theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-mode", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        set({ theme: newTheme });
      },
    }),
    {
      name: "theme",
    }
  )
);

export const useTheme = () => useStore((state) => state.theme);
export const useSetTheme = () => useStore((state) => state.setTheme);
