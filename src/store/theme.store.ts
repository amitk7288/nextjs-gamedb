import {create} from "zustand";
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
        set({ theme: newTheme });
      },
    }),
    {
      name: "theme",
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.setAttribute("data-mode", state.theme);
          document.documentElement.classList.toggle("dark", state.theme === "dark");
        }
      },
    }
  )
);

export const useTheme = () => useStore((state) => state.theme);
export const useSetTheme = () => useStore((state) => state.setTheme);

export default useStore;
