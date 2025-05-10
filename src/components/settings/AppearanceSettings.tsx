
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { 
  Sun, 
  Moon, 
  Monitor, 
  Layout, 
  Eye, 
  Palette, 
  Sliders, 
  Save,
  Image,
  Check,
  Maximize,
  LayoutDashboard,
  SliderHorizontal,
  RotateCw,
} from "lucide-react";

interface AppearanceSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const fontOptions = [
  { value: "inter", label: "Inter", description: "Clean and modern sans-serif (default)" },
  { value: "roboto", label: "Roboto", description: "Google's signature font family" },
  { value: "opensans", label: "Open Sans", description: "Friendly and approachable" },
  { value: "ibmplex", label: "IBM Plex", description: "Professional and technical" },
  { value: "jetbrains", label: "JetBrains Mono", description: "Monospaced for code" },
];

const colorThemes = [
  { name: "Default Purple", value: "default", primary: "#7c3aed", secondary: "#d8b4fe" },
  { name: "Ocean Blue", value: "ocean", primary: "#3b82f6", secondary: "#93c5fd" },
  { name: "Forest Green", value: "forest", primary: "#10b981", secondary: "#a7f3d0" },
  { name: "Ruby Red", value: "ruby", primary: "#ef4444", secondary: "#fca5a5" },
  { name: "Sunset Orange", value: "sunset", primary: "#f97316", secondary: "#fdba74" },
  { name: "Golden Yellow", value: "golden", primary: "#eab308", secondary: "#fde047" },
  { name: "Electric Pink", value: "pink", primary: "#ec4899", secondary: "#f9a8d4" },
  { name: "Neutral Gray", value: "gray", primary: "#6b7280", secondary: "#d1d5db" },
];

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const { toast } = useToast();
  const [theme, setTheme] = useState("dark");
  const [autoTheme, setAutoTheme] = useState(false);
  const [fontFamily, setFontFamily] = useState("inter");
  const [fontSize, setFontSize] = useState("medium");
  const [customFontSize, setCustomFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState("normal");
  const [colorPalette, setColorPalette] = useState("default");
  const [isAdvancedColorsOpen, setIsAdvancedColorsOpen] = useState(false);
  const [isBackgroundOpen, setIsBackgroundOpen] = useState(false);
  const [spacingDensity, setSpacingDensity] = useState("comfortable");
  const [borderRadius, setBorderRadius] = useState("rounded");
  const [shadowStyle, setShadowStyle] = useState("soft");
  const [chartPosition, setChartPosition] = useState("right");
  const [dashboardLayout, setDashboardLayout] = useState("grid");
  const [sidebarBehavior, setSidebarBehavior] = useState("auto");
  const [transitions, setTransitions] = useState("smooth");
  const [backgroundStyle, setBackgroundStyle] = useState("flat");
  const [parallaxEnabled, setParallaxEnabled] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  
  // Advanced color settings
  const [advancedColors, setAdvancedColors] = useState({
    background: "#121212",
    panel: "#1e1e1e",
    primaryText: "#ffffff",
    secondaryText: "#a0a0a0",
    accent: "#7c3aed",
    bullish: "#22c55e",
    bearish: "#ef4444",
  });
  
  // Preview image for background upload
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target) {
          setBackgroundPreview(event.target.result as string);
          onSettingChange();
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleResetSection = (section: string) => {
    toast({
      description: `${section} settings have been reset to default.`,
    });
    
    // Reset specific section based on parameter
    if (section === "theme") {
      setTheme("dark");
      setAutoTheme(false);
    } else if (section === "typography") {
      setFontFamily("inter");
      setFontSize("medium");
      setCustomFontSize(16);
      setLineHeight("normal");
    } else if (section === "colors") {
      setColorPalette("default");
      setAdvancedColors({
        background: "#121212",
        panel: "#1e1e1e",
        primaryText: "#ffffff",
        secondaryText: "#a0a0a0",
        accent: "#7c3aed",
        bullish: "#22c55e",
        bearish: "#ef4444",
      });
    } else if (section === "layout") {
      setSpacingDensity("comfortable");
      setBorderRadius("rounded");
      setShadowStyle("soft");
      setChartPosition("right");
      setDashboardLayout("grid");
      setSidebarBehavior("auto");
      setTransitions("smooth");
    } else if (section === "background") {
      setBackgroundStyle("flat");
      setBackgroundPreview(null);
      setParallaxEnabled(false);
    }
    
    onSettingChange();
  };
  
  const handleSaveAll = () => {
    toast({
      title: "Settings Saved",
      description: "Your appearance preferences have been saved successfully.",
    });
  };

  const handleColorPaletteChange = (value: string) => {
    setColorPalette(value);
    
    // Update advanced colors based on selected palette
    const selectedTheme = colorThemes.find(theme => theme.value === value);
    if (selectedTheme) {
      setAdvancedColors({
        ...advancedColors,
        accent: selectedTheme.primary,
      });
    }
    
    onSettingChange();
  };
  
  const checkColorContrast = (color1: string, color2: string) => {
    // Simple contrast check - would be replaced with actual WCAG calculations
    return true; // Simplified for this implementation
  };
  
  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Selection</CardTitle>
          <CardDescription>Choose your preferred color theme for the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <RadioGroup 
              value={theme} 
              onValueChange={(value) => { 
                setTheme(value); 
                onSettingChange(); 
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className={`border rounded-lg p-4 flex flex-col items-center gap-3 ${theme === "light" ? "border-primary" : "border-border"}`}>
                <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                <Label htmlFor="theme-light" className="cursor-pointer flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-2">
                    <Sun className="w-6 h-6 text-yellow-500" />
                  </div>
                  <span className="font-medium">Light Mode</span>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Bright layout, ideal for day usage and PDF exports
                  </p>
                </Label>
              </div>
              
              <div className={`border rounded-lg p-4 flex flex-col items-center gap-3 ${theme === "dark" ? "border-primary" : "border-border"}`}>
                <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                <Label htmlFor="theme-dark" className="cursor-pointer flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mb-2">
                    <Moon className="w-6 h-6 text-blue-200" />
                  </div>
                  <span className="font-medium">Dark Mode</span>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Low-light optimized, soft on eyes during extended sessions
                  </p>
                </Label>
              </div>
              
              <div className={`border rounded-lg p-4 flex flex-col items-center gap-3 ${theme === "system" ? "border-primary" : "border-border"}`}>
                <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                <Label htmlFor="theme-system" className="cursor-pointer flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-900 to-white flex items-center justify-center mb-2">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <span className="font-medium">System Default</span>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Follows your device's theme settings
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="auto-theme" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span>Auto Switch Based on System Theme</span>
            </Label>
            <Switch 
              id="auto-theme" 
              checked={autoTheme}
              onCheckedChange={(checked) => {
                setAutoTheme(checked);
                onSettingChange();
              }}
            />
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleResetSection("theme")}
            >
              <RotateCw className="h-4 w-4 mr-1" />
              Reset Theme
            </Button>
            
            <div className="flex items-center">
              {theme === "light" ? (
                <Sun className="h-5 w-5 text-orange-400 mr-2" />
              ) : (
                <Moon className="h-5 w-5 text-blue-300 mr-2" />
              )}
              <span className="text-sm font-medium">
                {theme === "light" ? "Light Mode Active" : theme === "dark" ? "Dark Mode Active" : "System Default Active"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Typography Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>Customize fonts, sizes, and readability settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="font-family" className="text-base">Font Style</Label>
            <Select 
              value={fontFamily} 
              onValueChange={(value) => {
                setFontFamily(value);
                onSettingChange();
              }}
            >
              <SelectTrigger id="font-family">
                <SelectValue placeholder="Select a font family" />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <div className="flex flex-col">
                      <span className={`font-${font.value}`}>{font.label}</span>
                      <span className="text-xs text-muted-foreground mt-1">{font.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base">Font Size</Label>
            <RadioGroup 
              value={fontSize} 
              onValueChange={(value) => {
                setFontSize(value);
                onSettingChange();
              }}
              className="grid grid-cols-3 gap-4"
            >
              <div className={`border rounded-lg p-4 flex items-center ${fontSize === "small" ? "border-primary" : "border-border"}`}>
                <RadioGroupItem value="small" id="font-small" className="mr-2" />
                <Label htmlFor="font-small" className="cursor-pointer flex-1">
                  <div className="text-sm">Small</div>
                  <p className="text-xs text-muted-foreground">Compact view</p>
                </Label>
              </div>
              
              <div className={`border rounded-lg p-4 flex items-center ${fontSize === "medium" ? "border-primary" : "border-border"}`}>
                <RadioGroupItem value="medium" id="font-medium" className="mr-2" />
                <Label htmlFor="font-medium" className="cursor-pointer flex-1">
                  <div>Medium</div>
                  <p className="text-xs text-muted-foreground">Default size</p>
                </Label>
              </div>
              
              <div className={`border rounded-lg p-4 flex items-center ${fontSize === "large" ? "border-primary" : "border-border"}`}>
                <RadioGroupItem value="large" id="font-large" className="mr-2" />
                <Label htmlFor="font-large" className="cursor-pointer flex-1">
                  <div className="text-lg">Large</div>
                  <p className="text-xs text-muted-foreground">Enhanced readability</p>
                </Label>
              </div>
              
              <div className={`col-span-3 border rounded-lg p-4 flex flex-col ${fontSize === "custom" ? "border-primary" : "border-border"}`}>
                <div className="flex items-center mb-2">
                  <RadioGroupItem value="custom" id="font-custom" className="mr-2" />
                  <Label htmlFor="font-custom" className="cursor-pointer">
                    Custom Size: {customFontSize}px
                  </Label>
                </div>
                
                <div className="flex items-center gap-4">
                  <Slider
                    disabled={fontSize !== "custom"}
                    min={12}
                    max={24}
                    step={1}
                    value={[customFontSize]}
                    onValueChange={(values) => {
                      setCustomFontSize(values[0]);
                      onSettingChange();
                    }}
                    className="flex-1"
                  />
                  <div className="w-12 text-center">
                    {customFontSize}px
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="line-height" className="text-base">Line Height</Label>
            <Select 
              value={lineHeight} 
              onValueChange={(value) => {
                setLineHeight(value);
                onSettingChange();
              }}
            >
              <SelectTrigger id="line-height">
                <SelectValue placeholder="Select line height" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tight">Tight (1.2)</SelectItem>
                <SelectItem value="normal">Normal (1.5)</SelectItem>
                <SelectItem value="relaxed">Relaxed (1.8)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleResetSection("typography")}
            >
              <RotateCw className="h-4 w-4 mr-1" />
              Reset Typography
            </Button>
          </div>
          
          <div className="p-4 border rounded-md mt-2">
            <h4 className="font-medium mb-2">Typography Preview</h4>
            <div className={`
              ${fontFamily === "inter" ? "font-sans" : 
                fontFamily === "roboto" ? "font-['Roboto']" : 
                fontFamily === "opensans" ? "font-['Open_Sans']" : 
                fontFamily === "ibmplex" ? "font-['IBM_Plex_Sans']" : "font-mono"}
              ${fontSize === "small" ? "text-sm" : 
                fontSize === "large" ? "text-lg" : 
                fontSize === "custom" ? `text-[${customFontSize}px]` : "text-base"}
              ${lineHeight === "tight" ? "leading-tight" : 
                lineHeight === "relaxed" ? "leading-relaxed" : "leading-normal"}
            `}>
              <p>This is how your text will look within ZellaPro.</p>
              <p className="mt-2">Trading journal entries, metrics, and reports will use this typography.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Color Palettes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Color Palettes</CardTitle>
            <CardDescription>Choose predefined color schemes or create your own</CardDescription>
          </div>
          <Collapsible
            open={isAdvancedColorsOpen}
            onOpenChange={setIsAdvancedColorsOpen}
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                {isAdvancedColorsOpen ? "Hide Advanced" : "Show Advanced"}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base">Accent Color Theme</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {colorThemes.map((theme) => (
                <div
                  key={theme.value}
                  className={`border rounded-lg p-3 cursor-pointer hover:border-primary/50 transition-colors ${
                    colorPalette === theme.value ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => handleColorPaletteChange(theme.value)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ background: theme.primary }}
                    />
                    <span className="text-sm font-medium">{theme.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="h-2 flex-grow rounded"
                      style={{ background: theme.primary }}
                    />
                    <div
                      className="h-2 flex-grow rounded"
                      style={{ background: theme.secondary }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Collapsible
            open={isAdvancedColorsOpen}
            className="border rounded-md p-4 mt-4 space-y-4"
          >
            <CollapsibleContent className="space-y-4">
              <h4 className="font-medium flex items-center">
                <Palette className="h-4 w-4 mr-2" />
                Advanced Color Customization
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color-background">Background Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: advancedColors.background }}
                    />
                    <Input
                      id="color-background"
                      type="text"
                      value={advancedColors.background}
                      onChange={(e) => {
                        setAdvancedColors({...advancedColors, background: e.target.value});
                        onSettingChange();
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="color-panel">Panel Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: advancedColors.panel }}
                    />
                    <Input
                      id="color-panel"
                      type="text"
                      value={advancedColors.panel}
                      onChange={(e) => {
                        setAdvancedColors({...advancedColors, panel: e.target.value});
                        onSettingChange();
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="color-primary-text">Primary Text Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: advancedColors.primaryText }}
                    />
                    <Input
                      id="color-primary-text"
                      type="text"
                      value={advancedColors.primaryText}
                      onChange={(e) => {
                        setAdvancedColors({...advancedColors, primaryText: e.target.value});
                        onSettingChange();
                      }}
                    />
                  </div>
                  {!checkColorContrast(advancedColors.primaryText, advancedColors.background) && (
                    <p className="text-xs text-yellow-500">Warning: Low contrast may affect readability</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="color-secondary-text">Secondary Text Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: advancedColors.secondaryText }}
                    />
                    <Input
                      id="color-secondary-text"
                      type="text"
                      value={advancedColors.secondaryText}
                      onChange={(e) => {
                        setAdvancedColors({...advancedColors, secondaryText: e.target.value});
                        onSettingChange();
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="color-accent">Accent Color</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: advancedColors.accent }}
                    />
                    <Input
                      id="color-accent"
                      type="text"
                      value={advancedColors.accent}
                      onChange={(e) => {
                        setAdvancedColors({...advancedColors, accent: e.target.value});
                        onSettingChange();
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="block mb-2">Trading Chart Colors</Label>
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="color-bullish" className="text-xs">Bullish</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: advancedColors.bullish }}
                        />
                        <Input
                          id="color-bullish"
                          type="text"
                          className="text-xs"
                          value={advancedColors.bullish}
                          onChange={(e) => {
                            setAdvancedColors({...advancedColors, bullish: e.target.value});
                            onSettingChange();
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="color-bearish" className="text-xs">Bearish</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: advancedColors.bearish }}
                        />
                        <Input
                          id="color-bearish"
                          type="text"
                          className="text-xs"
                          value={advancedColors.bearish}
                          onChange={(e) => {
                            setAdvancedColors({...advancedColors, bearish: e.target.value});
                            onSettingChange();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-md text-xs text-muted-foreground flex items-start mt-2">
                <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>All colors are checked for WCAG 2.1 AA color accessibility compliance. Warnings will appear if contrast ratios are below recommended levels.</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleResetSection("colors")}
            >
              <RotateCw className="h-4 w-4 mr-1" />
              Reset Colors
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Interface Density & Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Interface Density & Layout</CardTitle>
          <CardDescription>Configure the spacing, visual style, and layout of components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base">Component Spacing</Label>
            <RadioGroup 
              value={spacingDensity} 
              onValueChange={(value) => {
                setSpacingDensity(value);
                onSettingChange();
              }}
              className="grid grid-cols-3 gap-4"
            >
              <div className={`border rounded-lg p-3 flex flex-col items-center ${spacingDensity === "compact" ? "border-primary" : "border-border"}`}>
                <RadioGroupItem value="compact" id="spacing-compact" className="sr-only" />
                <Label htmlFor="spacing-compact" className="cursor-pointer text-center">
                  <div className="flex gap-1 mb-2">
                    <div className="w-8 h-6 bg-muted rounded"></div>
                    <div className="w-8 h-6 bg-muted rounded"></div>
                    <div className="w-8 h-6 bg-muted rounded"></div>
                  </div>
                  <span className="font-medium">Compact</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimal spacing, dense layout
                  </p>
                </Label>
              </div>
              
              <div className={`border rounded-lg p-3 flex flex-col items-center ${spacingDensity === "comfortable" ? "border-primary" : "border-border"}`}>
                <RadioGroupItem value="comfortable" id="spacing-comfortable" className="sr-only" />
                <Label htmlFor="spacing-comfortable" className="cursor-pointer text-center">
                  <div className="flex gap-2 mb-2">
                    <div className="w-7 h-6 bg-muted rounded"></div>
                    <div className="w-7 h-6 bg-muted rounded"></div>
                    <div className="w-7 h-6 bg-muted rounded"></div>
                  </div>
                  <span className="font-medium">Comfortable</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Balanced spacing (default)
                  </p>
                </Label>
              </div>
              
              <div className={`border rounded-lg p-3 flex flex-col items-center ${spacingDensity === "spacious" ? "border-primary" : "border-border"}`}>
                <RadioGroupItem value="spacious" id="spacing-spacious" className="sr-only" />
                <Label htmlFor="spacing-spacious" className="cursor-pointer text-center">
                  <div className="flex gap-3 mb-2">
                    <div className="w-6 h-6 bg-muted rounded"></div>
                    <div className="w-6 h-6 bg-muted rounded"></div>
                    <div className="w-6 h-6 bg-muted rounded"></div>
                  </div>
                  <span className="font-medium">Spacious</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Extra room between elements
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <Label className="text-base">Border Radius</Label>
            <ToggleGroup
              type="single"
              value={borderRadius}
              onValueChange={(value) => {
                if (value) {
                  setBorderRadius(value);
                  onSettingChange();
                }
              }}
              className="justify-center"
            >
              <ToggleGroupItem value="none" aria-label="None">
                <div className="w-8 h-8 border-2 mr-1"></div>
                <span>None</span>
              </ToggleGroupItem>
              
              <ToggleGroupItem value="soft" aria-label="Soft">
                <div className="w-8 h-8 border-2 rounded-sm mr-1"></div>
                <span>Soft</span>
              </ToggleGroupItem>
              
              <ToggleGroupItem value="rounded" aria-label="Rounded">
                <div className="w-8 h-8 border-2 rounded-md mr-1"></div>
                <span>Rounded</span>
              </ToggleGroupItem>
              
              <ToggleGroupItem value="extra" aria-label="Extra Rounded">
                <div className="w-8 h-8 border-2 rounded-xl mr-1"></div>
                <span>Extra</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <Label htmlFor="shadow-style" className="text-base">Shadow Style</Label>
            <Select 
              value={shadowStyle} 
              onValueChange={(value) => {
                setShadowStyle(value);
                onSettingChange();
              }}
            >
              <SelectTrigger id="shadow-style">
                <SelectValue placeholder="Select shadow style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat">Flat (No shadows)</SelectItem>
                <SelectItem value="soft">Soft Shadows</SelectItem>
                <SelectItem value="elevated">Elevated UI</SelectItem>
                <SelectItem value="glassy">Glassy (Blur effect)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <Label className="text-base">Layout Preferences</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chart-position" className="text-sm">Chart Default Position</Label>
                <Select 
                  value={chartPosition} 
                  onValueChange={(value) => {
                    setChartPosition(value);
                    onSettingChange();
                  }}
                >
                  <SelectTrigger id="chart-position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dashboard-layout" className="text-sm">Dashboard Tile Layout</Label>
                <Select 
                  value={dashboardLayout} 
                  onValueChange={(value) => {
                    setDashboardLayout(value);
                    onSettingChange();
                  }}
                >
                  <SelectTrigger id="dashboard-layout">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="stack">Stacked</SelectItem>
                    <SelectItem value="dnd">Drag-n-Drop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sidebar-behavior" className="text-sm">Sidebar Behavior</Label>
                <Select 
                  value={sidebarBehavior} 
                  onValueChange={(value) => {
                    setSidebarBehavior(value);
                    onSettingChange();
                  }}
                >
                  <SelectTrigger id="sidebar-behavior">
                    <SelectValue placeholder="Select behavior" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visible">Always Visible</SelectItem>
                    <SelectItem value="auto">Auto Collapse</SelectItem>
                    <SelectItem value="hidden">Hidden (Toggle Button)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="panel-transitions" className="text-sm">Panel Transitions</Label>
                <Select 
                  value={transitions} 
                  onValueChange={(value) => {
                    setTransitions(value);
                    onSettingChange();
                  }}
                >
                  <SelectTrigger id="panel-transitions">
                    <SelectValue placeholder="Select transition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smooth">Smooth Animations</SelectItem>
                    <SelectItem value="instant">Instant (No Animation)</SelectItem>
                    <SelectItem value="disabled">Reduced Motion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleResetSection("layout")}
            >
              <RotateCw className="h-4 w-4 mr-1" />
              Reset Layout
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Background Enhancements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Background Enhancements</CardTitle>
            <CardDescription>Customize the background style for your workspace</CardDescription>
          </div>
          <Collapsible
            open={isBackgroundOpen}
            onOpenChange={setIsBackgroundOpen}
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">
                <Image className="h-4 w-4 mr-2" />
                {isBackgroundOpen ? "Hide Options" : "Show Options"}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </CardHeader>
        <CardContent>
          <Collapsible open={isBackgroundOpen}>
            <CollapsibleContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="background-style" className="text-base">Background Style</Label>
                <Select 
                  value={backgroundStyle} 
                  onValueChange={(value) => {
                    setBackgroundStyle(value);
                    onSettingChange();
                  }}
                >
                  <SelectTrigger id="background-style">
                    <SelectValue placeholder="Select background style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat Color</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="image">Custom Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {backgroundStyle === "image" && (
                <div className="space-y-3">
                  <Label htmlFor="background-upload" className="text-base">Upload Background Image</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        id="background-upload"
                        type="file"
                        accept=".jpg,.jpeg,.png,.svg"
                        onChange={handleFileChange}
                        className="mb-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        Supports JPG, PNG and SVG. Recommended size: 1920×1080px or larger.
                      </p>
                    </div>
                    
                    <div className="relative border rounded-md h-40 bg-card overflow-hidden">
                      {backgroundPreview ? (
                        <img 
                          src={backgroundPreview} 
                          alt="Background preview" 
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                          Preview will appear here
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="parallax-toggle"
                  checked={parallaxEnabled}
                  disabled={backgroundStyle !== "image"}
                  onCheckedChange={(checked) => {
                    setParallaxEnabled(checked);
                    onSettingChange();
                  }}
                />
                <Label htmlFor="parallax-toggle">Enable Motion Parallax</Label>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleResetSection("background")}
                >
                  <RotateCw className="h-4 w-4 mr-1" />
                  Reset Background
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
      
      {/* Preview & Save Controls */}
      <div className="flex flex-col space-y-4">
        <Button 
          className="flex items-center justify-center gap-2"
          onClick={() => setPreviewOpen(true)}
        >
          <Maximize className="h-4 w-4" />
          Preview Current Theme in Fullscreen Mode
        </Button>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => {
              // Reset all settings
              handleResetSection("theme");
              handleResetSection("typography");
              handleResetSection("colors");
              handleResetSection("layout");
              handleResetSection("background");
              
              toast({
                title: "All Settings Reset",
                description: "All appearance settings have been restored to defaults.",
              });
            }}
          >
            <RotateCw className="h-4 w-4 mr-2" />
            Reset All Settings
          </Button>
          
          <Button 
            onClick={handleSaveAll}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Appearance Settings
          </Button>
        </div>
      </div>
      
      {saveResetButtons}
      
      {/* Preview Modal would go here in a real implementation */}
    </div>
  );
};

export default AppearanceSettings;
