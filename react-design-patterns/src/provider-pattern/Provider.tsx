import React, { createContext, useState, ReactNode, useContext } from "react";
import List from "./List";
import Toggle from "./Toggle";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: { background: string; color: string };
  toggleTheme: () => void;
};

// Defining theme styles
const themes: Record<Theme, { background: string; color: string }> = {
  light: { background: "#fff", color: "#000" },
  dark: { background: "#000", color: "#fff" },
};

// Providing a default value for the context
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

// custom hook: Instead of having to import useContext and the Context in each component, we can use a hook that returns the context we need.
export function useThemeContext() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useThemeContent must be used within Provider");
  }
  return theme;
}

export function Provider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  const providerTheme = { theme: themes[theme], toggleTheme };
  // Instead of wrapping the components directly with
  // the ThemeContext.Provider component, we can create a HOC that wraps
  // this component to provide its values. This way, we can separate the context
  // logic from the rendering components, which improves the reusability of the
  // provider
  return (
    <ThemeContext.Provider value={providerTheme}>
      {children}
    </ThemeContext.Provider>
  );
}
export default function ToggleTheme() {
  return (
    <div>
      <Provider>
        <Toggle />
        <List />
      </Provider>
    </div>
  );
}
