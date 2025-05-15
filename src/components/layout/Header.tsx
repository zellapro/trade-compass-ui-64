
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import SettingsButton from "./SettingsButton";

export function Header() {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="border-b sticky top-0 z-10 bg-background">
      <div className="container flex justify-between items-center h-16">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">
            TradeVult
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <SettingsButton />
        </div>
      </div>
    </header>
  );
}
