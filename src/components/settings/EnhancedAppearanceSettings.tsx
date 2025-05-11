
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sun, Moon, Monitor, RotateCw, ChevronDown, ChevronUp, Palette, Settings } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface AppearanceSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const EnhancedAppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [rememberTheme, setRememberTheme] = useState(true);
  const [previewTheme, setPreviewTheme] = useState(theme);
  const [changesMade, setChangesMade] = useState(false);
  
  // UI Preferences
  const [chartTimeframe, setChartTimeframe] = useState("day");
  const [defaultView, setDefaultView] = useState("summary");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [colorTheme, setColorTheme] = useState("blue");
  const [densityMode, setDensityMode] = useState("comfortable");
  const [fontPreference, setFontPreference] = useState("inter");

  // Advanced preferences
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  // Update preview theme when context theme changes
  useEffect(() => {
    setPreviewTheme(theme);
  }, [theme]);
  
  const handleThemeChange = (value: string) => {
    setPreviewTheme(value as "light" | "dark");
    setChangesMade(value !== theme);
    onSettingChange();
  };
  
  const handleApplyTheme = () => {
    setTheme(previewTheme as "light" | "dark");
    
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

  const handleSaveUIPreferences = () => {
    toast({
      title: "UI Preferences Saved",
      description: "Your interface preferences have been updated successfully.",
    });
    
    // This would be replaced with a real API call to Supabase
    console.log("Saving UI preferences to Supabase:", {
      colorTheme,
      densityMode,
      enableAnimations,
      defaultView,
      chartTimeframe,
      fontPreference
    });
    
    onSettingChange();
  };
  
  return (
    <div className="space-y-6">
      {/* Theme Selection */}
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
        </CardContent>
      </Card>

      {/* Interface Preferences */}
      <Card className="border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Interface Preferences</CardTitle>
          <CardDescription>Customize how the application looks and behaves</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Tabs defaultValue="layout">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="text">Typography</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
            </TabsList>
            
            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Interface Density</h3>
                <ToggleGroup 
                  type="single" 
                  value={densityMode}
                  onValueChange={(value) => {
                    if (value) setDensityMode(value);
                  }}
                  className="justify-start"
                >
                  <ToggleGroupItem value="comfortable">Comfortable</ToggleGroupItem>
                  <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
                  <ToggleGroupItem value="spacious">Spacious</ToggleGroupItem>
                </ToggleGroup>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Default View</h3>
                <ToggleGroup 
                  type="single" 
                  value={defaultView}
                  onValueChange={(value) => {
                    if (value) setDefaultView(value);
                  }}
                  className="justify-start"
                >
                  <ToggleGroupItem value="summary">Summary</ToggleGroupItem>
                  <ToggleGroupItem value="detailed">Detailed</ToggleGroupItem>
                  <ToggleGroupItem value="compact">Compact</ToggleGroupItem>
                </ToggleGroup>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Enable Animations</h3>
                  <p className="text-xs text-muted-foreground">Show smooth transitions between screens</p>
                </div>
                <Switch 
                  checked={enableAnimations}
                  onCheckedChange={setEnableAnimations}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Collapse Sidebar by Default</h3>
                  <p className="text-xs text-muted-foreground">Start with a minimized sidebar to maximize content space</p>
                </div>
                <Switch 
                  checked={sidebarCollapsed}
                  onCheckedChange={setSidebarCollapsed}
                />
              </div>
            </TabsContent>
            
            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Accent Color</h3>
                <div className="grid grid-cols-5 gap-2">
                  {["blue", "teal", "purple", "orange", "green"].map((color) => (
                    <div 
                      key={color}
                      className={`h-10 rounded-md cursor-pointer transition-all ${colorTheme === color ? 'ring-2 ring-offset-2 ring-primary' : 'hover:opacity-90'}`}
                      style={{ backgroundColor: getColorForTheme(color) }}
                      onClick={() => setColorTheme(color)}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Chart Color Scheme</h3>
                <div className="grid grid-cols-3 gap-4">
                  {["default", "monochrome", "vivid"].map((scheme) => (
                    <div 
                      key={scheme}
                      className={`cursor-pointer border rounded-md p-2 ${scheme === 'default' ? 'ring-2 ring-primary' : ''}`}
                    >
                      <div className="flex space-x-1 mb-2">
                        {renderSchemePreview(scheme)}
                      </div>
                      <p className="text-xs text-center capitalize">{scheme}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Typography Tab */}
            <TabsContent value="text" className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Font Family</h3>
                <ToggleGroup 
                  type="single" 
                  value={fontPreference}
                  onValueChange={(value) => {
                    if (value) setFontPreference(value);
                  }}
                  className="justify-start"
                >
                  <ToggleGroupItem value="inter" className="font-sans">Inter</ToggleGroupItem>
                  <ToggleGroupItem value="roboto" style={{ fontFamily: 'Roboto' }}>Roboto</ToggleGroupItem>
                  <ToggleGroupItem value="system" className="font-mono">System</ToggleGroupItem>
                </ToggleGroup>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Text Preview</h3>
                <div className={`p-3 border rounded-md ${fontPreference === 'inter' ? 'font-sans' : 
                                fontPreference === 'roboto' ? 'font-sans' : 'font-mono'}`}>
                  <p className="text-lg font-bold">Heading Example</p>
                  <p className="text-sm">This is how your text will appear throughout the application.</p>
                  <p className="text-xs text-muted-foreground mt-2">Small text for details and metadata</p>
                </div>
              </div>
            </TabsContent>
            
            {/* Charts Tab */}
            <TabsContent value="charts" className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Default Chart Timeframe</h3>
                <ToggleGroup 
                  type="single" 
                  value={chartTimeframe}
                  onValueChange={(value) => {
                    if (value) setChartTimeframe(value);
                  }}
                  className="justify-start"
                >
                  <ToggleGroupItem value="day">Day</ToggleGroupItem>
                  <ToggleGroupItem value="week">Week</ToggleGroupItem>
                  <ToggleGroupItem value="month">Month</ToggleGroupItem>
                  <ToggleGroupItem value="quarter">Quarter</ToggleGroupItem>
                  <ToggleGroupItem value="year">Year</ToggleGroupItem>
                </ToggleGroup>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Profit Color</h3>
                  <div className="h-10 bg-green-500 rounded-md"></div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Loss Color</h3>
                  <div className="h-10 bg-red-500 rounded-md"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Show Data Points</h3>
                  <p className="text-xs text-muted-foreground">Display individual data points on charts</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Enable Chart Animations</h3>
                  <p className="text-xs text-muted-foreground">Animate chart transitions and interactions</p>
                </div>
                <Switch defaultChecked />
              </div>
            </TabsContent>
          </Tabs>

          <Button 
            onClick={handleSaveUIPreferences}
            className="w-full"
          >
            <Palette className="mr-2 h-4 w-4" />
            Save Interface Preferences
          </Button>
        </CardContent>
      </Card>
      
      {/* Advanced Preferences */}
      <Card className="border">
        <CardHeader className="pb-3 cursor-pointer" onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Advanced Preferences</CardTitle>
            {isAdvancedOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
          <CardDescription>Configure advanced UI settings and performance options</CardDescription>
        </CardHeader>
        
        <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
          <CollapsibleContent>
            <CardContent className="space-y-4 pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Minimize CPU Usage</h3>
                  <p className="text-xs text-muted-foreground">Disable heavy animations when on battery</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Enable Developer Tools</h3>
                  <p className="text-xs text-muted-foreground">Show additional debug information</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Experimental Features</h3>
                  <p className="text-xs text-muted-foreground">Enable beta functionality</p>
                </div>
                <Switch />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Custom CSS</h3>
                <textarea 
                  className="w-full h-24 text-xs font-mono p-2 border rounded-md"
                  placeholder="/* Add custom CSS overrides here */"
                ></textarea>
              </div>
              
              <div className="flex justify-end pt-2">
                <Button variant="outline">Reset to Defaults</Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
      
      {saveResetButtons}
    </div>
  );
};

// Helper function to get color for theme
function getColorForTheme(color: string): string {
  const colors = {
    blue: "#1eaedb",
    teal: "#14b8a6",
    purple: "#8b5cf6",
    orange: "#f97316",
    green: "#22c55e"
  };
  return colors[color as keyof typeof colors] || colors.blue;
}

// Helper function to render chart scheme preview
function renderSchemePreview(scheme: string) {
  if (scheme === 'default') {
    return (
      <>
        <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
        <div className="h-4 w-4 bg-green-500 rounded-full"></div>
        <div className="h-4 w-4 bg-orange-500 rounded-full"></div>
        <div className="h-4 w-4 bg-purple-500 rounded-full"></div>
      </>
    );
  } else if (scheme === 'monochrome') {
    return (
      <>
        <div className="h-4 w-4 bg-gray-900 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-700 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-500 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
      </>
    );
  } else {
    return (
      <>
        <div className="h-4 w-4 bg-pink-500 rounded-full"></div>
        <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>
        <div className="h-4 w-4 bg-cyan-500 rounded-full"></div>
        <div className="h-4 w-4 bg-lime-500 rounded-full"></div>
      </>
    );
  }
}

export default EnhancedAppearanceSettings;
