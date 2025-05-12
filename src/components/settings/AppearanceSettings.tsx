
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Sun, Moon, Monitor, RotateCw, Sparkles, FileCode } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AppearanceSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const { toast } = useToast();
  const { 
    theme, 
    setTheme, 
    isGlassmorphismEnabled, 
    toggleGlassmorphism, 
    isAnimationsEnabled, 
    toggleAnimations 
  } = useTheme();
  
  const [rememberTheme, setRememberTheme] = useState(true);
  const [previewTheme, setPreviewTheme] = useState(theme);
  const [activeTab, setActiveTab] = useState("themes");
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
  
  const getThemeName = (theme: string) => {
    switch(theme) {
      case "light": return "Light";
      case "dark": return "Dark";
      case "premium": return "Premium";
      default: return "Custom";
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="themes" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="themes">Themes</TabsTrigger>
          <TabsTrigger value="effects">Effects & Animations</TabsTrigger>
          <TabsTrigger value="playbook">Playbook™ Theme</TabsTrigger>
        </TabsList>
        
        <TabsContent value="themes" className="mt-4">
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
                
                {/* Dark Theme */}
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
                
                {/* Premium Theme */}
                <div className={`relative overflow-hidden rounded-lg border p-1 ${previewTheme === "premium" ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
                  <RadioGroupItem value="premium" id="theme-premium" className="absolute top-2 right-2 h-4 w-4" />
                  <Label htmlFor="theme-premium" className="cursor-pointer">
                    <div className="p-3 bg-[#0E0C1F] flex flex-col gap-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Sparkles className="h-5 w-5 text-amber-400 mr-2" />
                          <span className="font-medium text-amber-50">Premium Theme</span>
                        </div>
                      </div>
                      
                      {/* Preview Card - Premium Theme */}
                      <div className="rounded-md border border-indigo-900/70 bg-[#1A1A2E] p-3 shadow-md">
                        <div className="h-2 w-12 bg-amber-500 rounded mb-2"></div>
                        <div className="space-y-1">
                          <div className="h-2 w-24 bg-gray-200 rounded"></div>
                          <div className="h-2 w-16 bg-gray-500 rounded"></div>
                        </div>
                      </div>
                      
                      {/* Chart Preview - Premium Theme */}
                      <div className="flex items-center justify-between">
                        <div className="h-10 w-1/3 bg-green-500 rounded"></div>
                        <div className="h-6 w-1/4 bg-red-400 rounded"></div>
                        <div className="h-8 w-1/5 bg-amber-400 rounded"></div>
                      </div>
                    </div>
                    <div className="p-2 text-center text-sm text-amber-100 bg-indigo-900">
                      Rich velvet with golden accents
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
                    {previewTheme === 'light' && <Sun className="h-4 w-4" />}
                    {previewTheme === 'dark' && <Moon className="h-4 w-4" />}
                    {previewTheme === 'premium' && <Sparkles className="h-4 w-4" />}
                    Apply Theme
                  </Button>
                </div>
              </div>
              
              <div className="mt-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                <div className="flex items-start gap-2">
                  <Monitor className="h-4 w-4 mt-0.5" />
                  <p>
                    Theme preferences will be synced across all devices where you're logged in. 
                    Your current theme is: <span className="font-semibold">{getThemeName(theme)}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="effects" className="mt-4">
          <Card className="overflow-hidden border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Visual Effects & Animations</CardTitle>
              <CardDescription>Customize the look and feel of your interface</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="glassmorphism">Glassmorphism Effects</Label>
                    <p className="text-muted-foreground text-sm">
                      Applies blur and transparency to UI elements
                    </p>
                  </div>
                  <Switch 
                    id="glassmorphism" 
                    checked={isGlassmorphismEnabled}
                    onCheckedChange={toggleGlassmorphism}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">UI Animations</Label>
                    <p className="text-muted-foreground text-sm">
                      Transitions and motion effects for UI elements
                    </p>
                  </div>
                  <Switch 
                    id="animations" 
                    checked={isAnimationsEnabled}
                    onCheckedChange={toggleAnimations}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="neon">Neon Accents</Label>
                    <p className="text-muted-foreground text-sm">
                      Highlight interactive elements with subtle glow
                    </p>
                  </div>
                  <Switch 
                    id="neon" 
                    defaultChecked={true}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reduced-motion">Reduced Motion</Label>
                    <p className="text-muted-foreground text-sm">
                      Respect system preference for reduced motion
                    </p>
                  </div>
                  <Switch 
                    id="reduced-motion" 
                    defaultChecked={false}
                  />
                </div>
              </div>
              
              <div className="mt-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                <div className="flex items-start gap-2">
                  <Monitor className="h-4 w-4 mt-0.5" />
                  <p>
                    These settings affect the visual presentation of the app. You can toggle them
                    anytime without affecting your data or functionality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="playbook" className="mt-4">
          <Card className="overflow-hidden border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Playbook™ Theme</CardTitle>
              <CardDescription>Special settings for the Playbook module</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="rounded-lg border bg-black/40 backdrop-blur-sm overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-gradient-to-r from-indigo-950/30 to-violet-950/30">
                  <div className="flex items-center gap-2">
                    <FileCode className="h-5 w-5 text-cyan-400" />
                    <h3 className="text-sm font-medium">Playbook™ UI Theme Showcase</h3>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    The Playbook module uses a specialized theme designed for cognitive focus and trader psychology.
                    Its distinctive appearance includes:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-indigo-600"></div>
                        <span className="text-sm">Indigo primary accent</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-violet-600"></div>
                        <span className="text-sm">Violet secondary accent</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-cyan-600"></div>
                        <span className="text-sm">Cyan highlights</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="h-6 w-full rounded-md bg-black/40 backdrop-blur-sm border border-white/10">
                        <div className="h-full w-1/2 rounded-md bg-gradient-to-r from-indigo-600/80 to-violet-600/80"></div>
                      </div>
                      <p className="text-xs text-muted-foreground">Glassmorphism UI elements</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 shadow shadow-indigo-500/50"></div>
                        <span className="text-xs">Subtle neon glow effects</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 rounded-md bg-black/20 border border-white/10">
                    <p className="text-xs text-muted-foreground">
                      The Playbook™ theme is designed to reduce cognitive load and enhance focus during
                      strategic analysis and psychological profiling sessions. It uses darker backgrounds
                      with higher contrast elements to prevent eye strain during extended sessions.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enhanced-backdrop">Enhanced Backdrops</Label>
                    <p className="text-muted-foreground text-sm">
                      Show gradient nebula backgrounds in Playbook
                    </p>
                  </div>
                  <Switch 
                    id="enhanced-backdrop" 
                    defaultChecked={true}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="neon-highlights">Neon Highlights</Label>
                    <p className="text-muted-foreground text-sm">
                      Apply glowing edges to interactive elements
                    </p>
                  </div>
                  <Switch 
                    id="neon-highlights" 
                    defaultChecked={true}
                  />
                </div>
              </div>
              
              <div className="mt-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                <div className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 mt-0.5 text-indigo-400" />
                  <p>
                    The Playbook™ module maintains its specialized theme independent of your global theme selection
                    to ensure optimal psychological focus during edge development sessions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {saveResetButtons}
    </div>
  );
};

export default AppearanceSettings;
