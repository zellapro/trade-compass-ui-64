
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Sun, Moon, Palette, Settings, RotateCw } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface AppearanceSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [rememberTheme, setRememberTheme] = useState(true);
  const [previewTheme, setPreviewTheme] = useState(theme);
  const [changesMade, setChangesMade] = useState(false);
  
  // Update preview theme when context theme changes
  useEffect(() => {
    setPreviewTheme(theme);
  }, [theme]);
  
  const handleThemeChange = (value: string) => {
    setPreviewTheme(value as "light" | "dark" | "premium");
    setChangesMade(value !== theme);
    onSettingChange();
  };
  
  const handleApplyTheme = () => {
    setTheme(previewTheme as "light" | "dark" | "premium");
    
    // Save to localStorage if remember is enabled
    if (rememberTheme) {
      localStorage.setItem("zella-theme", previewTheme);
      
      // This would be replaced with a real API call to Supabase
      console.log("Saving theme preference to Supabase:", previewTheme);
    }
    
    toast({
      title: "Theme Applied",
      description: `${getThemeName(previewTheme)} theme has been applied successfully.`,
    });
    
    setChangesMade(false);
    onSettingChange();
  };
  
  const handleResetTheme = () => {
    const defaultTheme = "dark"; // Default theme
    setPreviewTheme(defaultTheme);
    setChangesMade(defaultTheme !== theme);
    
    toast({
      description: "Theme settings have been reset to default.",
    });
    
    onSettingChange();
  };
  
  // Helper function to get readable theme name
  const getThemeName = (themeValue: string) => {
    switch(themeValue) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'premium': return 'Premium';
      default: return 'Unknown';
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Theme Selection</CardTitle>
          <CardDescription>Choose your preferred visual theme for ZellaPro</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <RadioGroup 
            value={previewTheme} 
            onValueChange={handleThemeChange}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Light Theme */}
            <div className={`relative overflow-hidden rounded-lg border p-1 ${previewTheme === "light" ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
              <RadioGroupItem value="light" id="theme-light" className="absolute top-2 right-2 h-4 w-4" />
              <Label htmlFor="theme-light" className="cursor-pointer">
                <div className="p-3 bg-[#F8F9FA] flex flex-col gap-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Sun className="h-5 w-5 text-[#0066FF] mr-2" />
                      <span className="font-medium text-[#111111]">Light Theme</span>
                    </div>
                  </div>
                  
                  {/* Preview Card - Light Theme */}
                  <div className="rounded-md border border-gray-200 bg-white p-3 shadow-sm">
                    <div className="h-2 w-12 bg-[#0066FF] rounded mb-2"></div>
                    <div className="space-y-1">
                      <div className="h-2 w-24 bg-gray-800 rounded"></div>
                      <div className="h-2 w-16 bg-gray-400 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Chart Preview - Light Theme */}
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-1/3 bg-green-500 rounded"></div>
                    <div className="h-6 w-1/4 bg-red-500 rounded"></div>
                    <div className="h-8 w-1/5 bg-[#0066FF] rounded"></div>
                  </div>
                </div>
                <div className="p-2 text-center text-sm text-[#111111] bg-gray-100">
                  Bright layout for day usage
                </div>
              </Label>
            </div>
            
            {/* Dark Theme */}
            <div className={`relative overflow-hidden rounded-lg border p-1 ${previewTheme === "dark" ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
              <RadioGroupItem value="dark" id="theme-dark" className="absolute top-2 right-2 h-4 w-4" />
              <Label htmlFor="theme-dark" className="cursor-pointer">
                <div className="p-3 bg-[#121212] flex flex-col gap-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Moon className="h-5 w-5 text-[#00C9A7] mr-2" />
                      <span className="font-medium text-[#EAEAEA]">Dark Theme</span>
                    </div>
                  </div>
                  
                  {/* Preview Card - Dark Theme */}
                  <div className="rounded-md border border-gray-700 bg-[#1E1E1E] p-3 shadow-md">
                    <div className="h-2 w-12 bg-[#00C9A7] rounded mb-2"></div>
                    <div className="space-y-1">
                      <div className="h-2 w-24 bg-gray-200 rounded"></div>
                      <div className="h-2 w-16 bg-gray-500 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Chart Preview - Dark Theme */}
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-1/3 bg-green-500 rounded"></div>
                    <div className="h-6 w-1/4 bg-red-400 rounded"></div>
                    <div className="h-8 w-1/5 bg-[#00C9A7] rounded"></div>
                  </div>
                </div>
                <div className="p-2 text-center text-sm text-gray-200 bg-[#2A2A2A]">
                  Low-light optimized for extended sessions
                </div>
              </Label>
            </div>
            
            {/* Premium Theme */}
            <div className={`relative overflow-hidden rounded-lg border p-1 ${previewTheme === "premium" ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
              <RadioGroupItem value="premium" id="theme-premium" className="absolute top-2 right-2 h-4 w-4" />
              <Label htmlFor="theme-premium" className="cursor-pointer">
                <div className="p-3 bg-[#0E0C1F] flex flex-col gap-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Palette className="h-5 w-5 text-[#FFAE00] mr-2" />
                      <span className="font-medium text-[#F5F5F5]">Premium Theme</span>
                    </div>
                  </div>
                  
                  {/* Preview Card - Premium Theme */}
                  <div className="rounded-md border border-[#FFAE00]/20 bg-[#1A1A2E] p-3 shadow-md backdrop-blur">
                    <div className="h-2 w-12 bg-[#FFAE00] rounded mb-2"></div>
                    <div className="space-y-1">
                      <div className="h-2 w-24 bg-[#F5F5F5] rounded"></div>
                      <div className="h-2 w-16 bg-gray-500 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Chart Preview - Premium Theme */}
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-1/3 bg-green-500 rounded"></div>
                    <div className="h-6 w-1/4 bg-red-400 rounded"></div>
                    <div className="h-8 w-1/5 bg-[#FFAE00] rounded"></div>
                  </div>
                </div>
                <div className="p-2 text-center text-sm text-[#F5F5F5] bg-[#292840]">
                  Rich, premium experience with gold accents
                </div>
              </Label>
            </div>
          </RadioGroup>
          
          {/* Current Theme Layout Section - New */}
          <div className="mt-6 border rounded-lg p-4 bg-black/20">
            <h3 className="text-base font-medium mb-3 flex items-center">
              <Palette className="h-5 w-5 mr-2 text-primary" />
              Current Theme: {getThemeName(theme)}
            </h3>
            
            <div className="grid grid-cols-5 gap-2 mb-4">
              {theme === 'light' && (
                <>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#0066FF]"></div>
                    <span className="text-xs mt-1">Primary</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#F8F9FA]"></div>
                    <span className="text-xs mt-1">Background</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#FFFFFF]"></div>
                    <span className="text-xs mt-1">Card</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#111111]"></div>
                    <span className="text-xs mt-1">Text</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#E6E6E6]"></div>
                    <span className="text-xs mt-1">Tooltip</span>
                  </div>
                </>
              )}
              
              {theme === 'dark' && (
                <>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#00C9A7]"></div>
                    <span className="text-xs mt-1">Primary</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#121212]"></div>
                    <span className="text-xs mt-1">Background</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#1E1E1E]"></div>
                    <span className="text-xs mt-1">Card</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#EAEAEA]"></div>
                    <span className="text-xs mt-1">Text</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#2A2A2A]"></div>
                    <span className="text-xs mt-1">Tooltip</span>
                  </div>
                </>
              )}
              
              {theme === 'premium' && (
                <>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#FFAE00]"></div>
                    <span className="text-xs mt-1">Primary</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#0E0C1F]"></div>
                    <span className="text-xs mt-1">Background</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#1A1A2E]"></div>
                    <span className="text-xs mt-1">Card</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#F5F5F5]"></div>
                    <span className="text-xs mt-1">Text</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-[#292840]"></div>
                    <span className="text-xs mt-1">Tooltip</span>
                  </div>
                </>
              )}
            </div>
            
            <div className="text-xs text-muted-foreground bg-black/10 p-3 rounded">
              <p>{theme === 'light' 
                ? "Light theme uses a bright white background with vibrant blue accents for optimal daytime visibility."
                : theme === 'dark' 
                ? "Dark theme uses a deep charcoal background with cool aqua accents to reduce eye strain."
                : "Premium theme features a rich plum-black background with stunning gold accents and glass effects."
              }</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between space-x-2 pt-2">
            <div className="flex items-center gap-2">
              <Switch 
                id="remember-theme" 
                checked={rememberTheme}
                onCheckedChange={setRememberTheme}
              />
              <Label htmlFor="remember-theme" className="cursor-pointer">
                Remember my theme across devices
              </Label>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResetTheme}
                className="flex items-center gap-1"
              >
                <RotateCw className="h-4 w-4" />
                Reset
              </Button>
              
              <Button 
                size="sm" 
                onClick={handleApplyTheme}
                disabled={!changesMade}
                className={`flex items-center gap-1 btn-theme ${previewTheme === 'premium' ? 'btn-premium' : ''}`}
              >
                <Settings className="h-4 w-4" />
                Apply Theme
              </Button>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded">
            <div className="flex items-start gap-2">
              <Settings className="h-4 w-4 mt-0.5" />
              <p>
                Theme preferences will be synced across all devices where you're logged in. 
                Your current theme is: <span className="font-semibold">{getThemeName(theme)}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {saveResetButtons}
    </div>
  );
};

export default AppearanceSettings;
