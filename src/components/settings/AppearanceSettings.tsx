
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Sun, Moon, Monitor, RotateCw } from "lucide-react";

interface AppearanceSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const { toast } = useToast();
  const [theme, setTheme] = useState("dark");
  const [rememberTheme, setRememberTheme] = useState(true);
  const [previewTheme, setPreviewTheme] = useState("dark");
  const [changesMade, setChangesMade] = useState(false);
  
  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("zella-theme");
    if (savedTheme) {
      setTheme(savedTheme);
      setPreviewTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);
  
  const handleThemeChange = (value: string) => {
    setPreviewTheme(value);
    setChangesMade(value !== theme);
    onSettingChange();
  };
  
  const handleApplyTheme = () => {
    setTheme(previewTheme);
    
    // Update the actual theme in the DOM
    document.documentElement.classList.toggle("dark", previewTheme === "dark");
    
    // Save to localStorage if remember is enabled
    if (rememberTheme) {
      localStorage.setItem("zella-theme", previewTheme);
      
      // This would be replaced with a real API call to Supabase
      console.log("Saving theme preference to Supabase:", previewTheme);
    }
    
    toast({
      title: "Theme Applied",
      description: `${previewTheme === "dark" ? "Dark" : "Light"} theme has been applied successfully.`,
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
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className={`relative overflow-hidden rounded-lg border p-1 ${previewTheme === "light" ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
              <RadioGroupItem value="light" id="theme-light" className="absolute top-2 right-2 h-4 w-4" />
              <Label htmlFor="theme-light" className="cursor-pointer">
                <div className="p-3 bg-[#fcfcfc] flex flex-col gap-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="font-medium text-gray-900">Light Theme</span>
                    </div>
                  </div>
                  
                  {/* Preview Card - Light Theme */}
                  <div className="rounded-md border border-gray-200 bg-white p-3 shadow-sm">
                    <div className="h-2 w-12 bg-blue-500 rounded mb-2"></div>
                    <div className="space-y-1">
                      <div className="h-2 w-24 bg-gray-800 rounded"></div>
                      <div className="h-2 w-16 bg-gray-400 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Chart Preview - Light Theme */}
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-1/3 bg-green-500 rounded"></div>
                    <div className="h-6 w-1/4 bg-red-500 rounded"></div>
                    <div className="h-8 w-1/5 bg-blue-500 rounded"></div>
                  </div>
                </div>
                <div className="p-2 text-center text-sm text-gray-700 bg-gray-100">
                  Bright layout for day usage
                </div>
              </Label>
            </div>
            
            <div className={`relative overflow-hidden rounded-lg border p-1 ${previewTheme === "dark" ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
              <RadioGroupItem value="dark" id="theme-dark" className="absolute top-2 right-2 h-4 w-4" />
              <Label htmlFor="theme-dark" className="cursor-pointer">
                <div className="p-3 bg-gray-900 flex flex-col gap-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Moon className="h-5 w-5 text-blue-300 mr-2" />
                      <span className="font-medium text-gray-100">Dark Theme</span>
                    </div>
                  </div>
                  
                  {/* Preview Card - Dark Theme */}
                  <div className="rounded-md border border-gray-700 bg-gray-800 p-3 shadow-md">
                    <div className="h-2 w-12 bg-blue-500 rounded mb-2"></div>
                    <div className="space-y-1">
                      <div className="h-2 w-24 bg-gray-200 rounded"></div>
                      <div className="h-2 w-16 bg-gray-500 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Chart Preview - Dark Theme */}
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-1/3 bg-green-500 rounded"></div>
                    <div className="h-6 w-1/4 bg-red-400 rounded"></div>
                    <div className="h-8 w-1/5 bg-blue-400 rounded"></div>
                  </div>
                </div>
                <div className="p-2 text-center text-sm text-gray-200 bg-gray-800">
                  Low-light optimized for extended sessions
                </div>
              </Label>
            </div>
          </RadioGroup>
          
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
                className="flex items-center gap-1"
              >
                <Sun className={`h-4 w-4 ${previewTheme === 'dark' ? 'hidden' : 'block'}`} />
                <Moon className={`h-4 w-4 ${previewTheme === 'light' ? 'hidden' : 'block'}`} />
                Apply Theme
              </Button>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded">
            <div className="flex items-start gap-2">
              <Monitor className="h-4 w-4 mt-0.5" />
              <p>
                Theme preferences will be synced across all devices where you're logged in. 
                Your current theme is: <span className="font-semibold">{theme === "dark" ? "Dark" : "Light"}</span>
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
