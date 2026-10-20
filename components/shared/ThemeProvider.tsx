'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type ThemeMode = 'light' | 'system' | 'dark';
export type AccentHue = 'yellow' | 'amber' | 'mint' | 'pink' | 'blue';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  accent: AccentHue;
  setTheme: (mode: ThemeMode) => void;
  setAccent: (hue: AccentHue) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('light');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [accent, setAccentState] = useState<AccentHue>('yellow');
  const [mounted, setMounted] = useState(false);

  // Sync with DOM & localStorage on mount
  useEffect(() => {
    try {
      const storedTheme = (localStorage.getItem('creator_flow_theme') as ThemeMode) || 'light';
      let storedAccent = (localStorage.getItem('creator_flow_accent') as AccentHue) || 'yellow';
      if (storedAccent === 'amber') storedAccent = 'yellow';
      
      setThemeState(storedTheme);
      setAccentState(storedAccent);
      setMounted(true);
    } catch {
      setMounted(true);
    }
  }, []);

  const applyThemeAndAccent = useCallback((mode: ThemeMode, hue: AccentHue) => {
    let resolved: 'light' | 'dark' = 'light';
    if (mode === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolved = mode;
    }

    setResolvedTheme(resolved);
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.setAttribute('data-accent', hue);
  }, []);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('creator_flow_theme', newTheme);
    } catch {}
    applyThemeAndAccent(newTheme, accent);
  }, [accent, applyThemeAndAccent]);

  const setAccent = useCallback((newAccent: AccentHue) => {
    setAccentState(newAccent);
    try {
      localStorage.setItem('creator_flow_accent', newAccent);
    } catch {}
    applyThemeAndAccent(theme, newAccent);
  }, [theme, applyThemeAndAccent]);

  // Live listener for OS preference when in "system" mode
  useEffect(() => {
    if (!mounted) return;
    applyThemeAndAccent(theme, accent);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        applyThemeAndAccent('system', accent);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, accent, mounted, applyThemeAndAccent]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, accent, setTheme, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
