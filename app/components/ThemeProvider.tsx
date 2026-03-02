"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const applyTheme = (theme: boolean) => {
      localStorage.setItem('darkMode', String(theme));
      if (theme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    const getInitialTheme = () => {
      const storedDarkMode = localStorage.getItem('darkMode');

      if (storedDarkMode === 'true') {
        return true;
      } else if (storedDarkMode === 'false') {
        return false;
      } else {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    };

    if (hasMounted) {
      const initialTheme = getInitialTheme();
      setIsDarkMode(initialTheme);
      applyTheme(initialTheme);
    }

    // Add listener for system theme changes
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const newTheme = event.matches;
      setIsDarkMode(newTheme);
      applyTheme(newTheme);
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Remove listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [hasMounted]);

  useEffect(() => {
    if (isDarkMode !== null && hasMounted) {
      applyTheme(isDarkMode);
    }
  }, [isDarkMode, hasMounted]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem('darkMode', String(newTheme));
      return newTheme;
    });
  };

  const applyTheme = (theme: boolean) => {
    localStorage.setItem('darkMode', String(theme));
    if (theme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode: isDarkMode === null ? false : isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};