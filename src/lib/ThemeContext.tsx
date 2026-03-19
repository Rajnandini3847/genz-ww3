"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Theme = "chaos" | "military";

interface ThemeCtx {
  theme: Theme;
  toggle: () => void;
  isMil: boolean;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "chaos",
  toggle: () => {},
  isMil: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("chaos");
  const toggle = () => setTheme((t) => (t === "chaos" ? "military" : "chaos"));
  return (
    <ThemeContext.Provider value={{ theme, toggle, isMil: theme === "military" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
