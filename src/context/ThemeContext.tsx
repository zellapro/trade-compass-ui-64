
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'premium';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isGlassmorphismEnabled: boolean;
  toggleGlassmorphism: () => void;
  isAnimationsEnabled: boolean;
  toggleAnimations: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isGlassmorphismEnabled, setIsGlassmorphismEnabled] = useState<boolean>(true);
  const [isAnimationsEnabled, setIsAnimationsEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Load theme preferences from localStorage on mount
    const savedTheme = localStorage.getItem("zella-theme") as Theme | null;
    const savedGlassmorphism = localStorage.getItem("zella-glassmorphism");
    const savedAnimations = localStorage.getItem("zella-animations");
    
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to ZellaPro theme (dark with premium styling)
      setTheme('premium');
      applyTheme('premium');
    }
    
    if (savedGlassmorphism !== null) {
      setIsGlassmorphismEnabled(savedGlassmorphism === "true");
    }
    
    if (savedAnimations !== null) {
      setIsAnimationsEnabled(savedAnimations === "true");
    }
  }, []);

  const applyTheme = (selectedTheme: Theme) => {
    document.documentElement.classList.remove("light", "dark", "premium");
    
    if (selectedTheme === "light") {
      document.documentElement.classList.add("light");
    } else if (selectedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (selectedTheme === "premium") {
      document.documentElement.classList.add("premium");
    }
  };

  const toggleTheme = () => {
    const themeOrder: Theme[] = ['light', 'dark', 'premium'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const newTheme = themeOrder[nextIndex];
    
    setThemeWithSave(newTheme);
    console.log(`Theme toggled to: ${newTheme}`);
  };
  
  const toggleGlassmorphism = () => {
    const newValue = !isGlassmorphismEnabled;
    setIsGlassmorphismEnabled(newValue);
    localStorage.setItem("zella-glassmorphism", String(newValue));
    console.log(`Glassmorphism ${newValue ? 'enabled' : 'disabled'}`);
  };
  
  const toggleAnimations = () => {
    const newValue = !isAnimationsEnabled;
    setIsAnimationsEnabled(newValue);
    localStorage.setItem("zella-animations", String(newValue));
    console.log(`Animations ${newValue ? 'enabled' : 'disabled'}`);
  };

  const setThemeWithSave = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("zella-theme", newTheme);
    
    // This would be replaced with a real API call to Supabase
    console.log(`Saving theme preference to database: ${newTheme}`);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme: setThemeWithSave, 
        toggleTheme, 
        isGlassmorphismEnabled, 
        toggleGlassmorphism, 
        isAnimationsEnabled, 
        toggleAnimations 
      }}
    >
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
