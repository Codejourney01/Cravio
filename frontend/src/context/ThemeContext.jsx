import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("cravio-theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return false;
  });

  useEffect(() => {
    const html = document.documentElement;

    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("cravio-theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("cravio-theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((previous) => !previous);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}