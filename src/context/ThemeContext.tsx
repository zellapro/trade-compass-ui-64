
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'premium';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("zella-theme") as Theme | null;
    if (savedTheme && ['light', 'dark', 'premium'].includes(savedTheme)) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (selectedTheme: Theme) => {
    // Add transition class for smooth effect
    document.body.classList.add('theme-changing');
    
    // Remove previous theme classes
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-premium');
    
    // Add new theme class
    document.documentElement.classList.add(`theme-${selectedTheme}`);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.body.classList.remove('theme-changing');
    }, 200);
    
    console.log(`Theme applied: ${selectedTheme}`);
  };

  const toggleTheme = () => {
    const themeOrder: Theme[] = ['light', 'dark', 'premium'];
    const currentIndex = themeOrder.indexOf(theme);
    const newTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    
    setThemeWithSave(newTheme);
    console.log(`Theme toggled to: ${newTheme}`);
  };

  const setThemeWithSave = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("zella-theme", newTheme);
    
    // Save preference to Supabase (will be implemented with Supabase integration)
    console.log(`Theme set to: ${newTheme} (waiting for Supabase integration to save user preference)`);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeWithSave, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
