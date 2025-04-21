
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  Sun, 
  Moon, 
  Monitor, 
  Layout, 
  LineChart, 
  BarChart, 
  CandlestickChart,
  Table,
  Grid3X3,
  Check,
  Palette
} from "lucide-react";

interface AppearanceSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const themeColors = [
  { name: "Default", value: "default", color: "#7c3aed" },
  { name: "Blue", value: "blue", color: "#3b82f6" },
  { name: "Green", value: "green", color: "#10b981" },
  { name: "Red", value: "red", color: "#ef4444" },
  { name: "Orange", value: "orange", color: "#f97316" },
  { name: "Yellow", value: "yellow", color: "#eab308" },
  { name: "Pink", value: "pink", color: "#ec4899" },
  { name: "Gray", value: "gray", color: "#6b7280" },
];

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const [theme, setTheme] = useState("dark");
  const [accentColor, setAccentColor] = useState("default");
  const [fontSize, setFontSize] = useState("default");
  const [layout, setLayout] = useState("cards");
  const [chartType, setChartType] = useState("candles");
  const [tradingViewTheme, setTradingViewTheme] = useState("dark");
  
  const handleThemeChange = (value: string) => {
    setTheme(value);
    onSettingChange();
  };
  
  const handleAccentColorChange = (value: string) => {
    setAccentColor(value);
    onSettingChange();
  };
  
  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
    onSettingChange();
  };
  
  const handleLayoutChange = (value: string) => {
    setLayout(value);
    onSettingChange();
  };
  
  const handleChartTypeChange = (value: string) => {
    setChartType(value);
    onSettingChange();
  };
  
  const handleTradingViewThemeChange = (value: string) => {
    setTradingViewTheme(value);
    onSettingChange();
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>Customize the look and feel of the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base">Color Theme</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div 
                className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/50 transition-colors ${theme === 'light' ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => handleThemeChange('light')}
              >
                <div className="w-10 h-10 bg-white rounded-full border flex items-center justify-center">
                  <Sun className="h-6 w-6 text-yellow-500" />
                </div>
                <span className="font-medium">Light</span>
                {theme === 'light' && (
                  <Badge variant="outline" className="bg-primary/90 text-white border-none text-xs">
                    <Check className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                )}
              </div>
              
              <div 
                className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/50 transition-colors ${theme === 'dark' ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => handleThemeChange('dark')}
              >
                <div className="w-10 h-10 bg-gray-900 rounded-full border flex items-center justify-center">
                  <Moon className="h-6 w-6 text-gray-100" />
                </div>
                <span className="font-medium">Dark</span>
                {theme === 'dark' && (
                  <Badge variant="outline" className="bg-primary/90 text-white border-none text-xs">
                    <Check className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                )}
              </div>
              
              <div 
                className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-primary/50 transition-colors ${theme === 'system' ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => handleThemeChange('system')}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-gray-900 to-white rounded-full border flex items-center justify-center">
                  <Monitor className="h-6 w-6" />
                </div>
                <span className="font-medium">System</span>
                {theme === 'system' && (
                  <Badge variant="outline" className="bg-primary/90 text-white border-none text-xs">
                    <Check className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-base mb-2 block">Accent Color</Label>
            <div className="grid grid-cols-4 gap-3 mt-2">
              {themeColors.map((color) => (
                <div 
                  key={color.value}
                  className={`border rounded-lg p-2 flex items-center gap-2 cursor-pointer hover:border-primary/50 transition-colors ${accentColor === color.value ? 'border-primary bg-primary/5' : ''}`}
                  onClick={() => handleAccentColorChange(color.value)}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: color.color }}>
                    {accentColor === color.value && <Check className="h-4 w-4 text-white" />}
                  </div>
                  <span className="text-sm font-medium">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-base mb-2 block">Font Size</Label>
            <RadioGroup defaultValue="default" value={fontSize} onValueChange={handleFontSizeChange}>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className={`border rounded-lg p-4 flex items-center ${fontSize === 'small' ? 'border-primary' : ''}`}>
                  <RadioGroupItem value="small" id="font-small" className="mr-2" />
                  <Label htmlFor="font-small" className="cursor-pointer flex-1">
                    <span className="font-medium text-sm">Small</span>
                    <p className="text-xs text-muted-foreground">Compact view</p>
                  </Label>
                </div>
                
                <div className={`border rounded-lg p-4 flex items-center ${fontSize === 'default' ? 'border-primary' : ''}`}>
                  <RadioGroupItem value="default" id="font-default" className="mr-2" />
                  <Label htmlFor="font-default" className="cursor-pointer flex-1">
                    <span className="font-medium">Default</span>
                    <p className="text-xs text-muted-foreground">Recommended</p>
                  </Label>
                </div>
                
                <div className={`border rounded-lg p-4 flex items-center ${fontSize === 'large' ? 'border-primary' : ''}`}>
                  <RadioGroupItem value="large" id="font-large" className="mr-2" />
                  <Label htmlFor="font-large" className="cursor-pointer flex-1">
                    <span className="font-medium text-lg">Large</span>
                    <p className="text-xs text-muted-foreground">More readable</p>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Layout & Display</CardTitle>
          <CardDescription>Configure how content is displayed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base mb-2 block">Journal Page Layout</Label>
            <RadioGroup defaultValue="cards" value={layout} onValueChange={handleLayoutChange}>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className={`border rounded-lg p-4 flex items-center ${layout === 'cards' ? 'border-primary' : ''}`}>
                  <RadioGroupItem value="cards" id="layout-cards" className="mr-2" />
                  <Label htmlFor="layout-cards" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2">
                      <Grid3X3 className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Card View</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Visual grid layout with trade cards</p>
                  </Label>
                </div>
                
                <div className={`border rounded-lg p-4 flex items-center ${layout === 'table' ? 'border-primary' : ''}`}>
                  <RadioGroupItem value="table" id="layout-table" className="mr-2" />
                  <Label htmlFor="layout-table" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2">
                      <Table className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Table View</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Compact table with sortable columns</p>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-base mb-2 block">Chart Style</Label>
            <RadioGroup defaultValue="candles" value={chartType} onValueChange={handleChartTypeChange}>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className={`border rounded-lg p-4 flex items-center ${chartType === 'line' ? 'border-primary' : ''}`}>
                  <RadioGroupItem value="line" id="chart-line" className="mr-2" />
                  <Label htmlFor="chart-line" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Line</span>
                    </div>
                  </Label>
                </div>
                
                <div className={`border rounded-lg p-4 flex items-center ${chartType === 'bars' ? 'border-primary' : ''}`}>
                  <RadioGroupItem value="bars" id="chart-bars" className="mr-2" />
                  <Label htmlFor="chart-bars" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Bars</span>
                    </div>
                  </Label>
                </div>
                
                <div className={`border rounded-lg p-4 flex items-center ${chartType === 'candles' ? 'border-primary' : ''}`}>
                  <RadioGroupItem value="candles" id="chart-candles" className="mr-2" />
                  <Label htmlFor="chart-candles" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2">
                      <CandlestickChart className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Candles</span>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-base mb-2 block">TradingView Theme</Label>
            <RadioGroup defaultValue="dark" value={tradingViewTheme} onValueChange={handleTradingViewThemeChange}>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className={`border rounded-lg p-4 flex items-center ${tradingViewTheme === 'light' ? 'border-primary' : ''}`}>
                  <RadioGroupItem value="light" id="tradingview-light" className="mr-2" />
                  <Label htmlFor="tradingview-light" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2">
                      <Sun className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Light</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Light background with dark elements</p>
                  </Label>
                </div>
                
                <div className={`border rounded-lg p-4 flex items-center ${tradingViewTheme === 'dark' ? 'border-primary' : ''}`}>
                  <RadioGroupItem value="dark" id="tradingview-dark" className="mr-2" />
                  <Label htmlFor="tradingview-dark" className="cursor-pointer flex-1">
                    <div className="flex items-center gap-2">
                      <Moon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">Dark</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Dark background with light elements</p>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-base mb-2 block">Additional Display Options</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <Label htmlFor="display-animations">Enable Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Smooth transitions and animations throughout the app
                  </p>
                </div>
                <Switch id="display-animations" defaultChecked onChange={onSettingChange} />
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-mode">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Reduce padding and spacing for more content
                  </p>
                </div>
                <Switch id="compact-mode" onChange={onSettingChange} />
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <Label htmlFor="display-tooltips">Show Tooltips</Label>
                  <p className="text-sm text-muted-foreground">
                    Display helpful tooltips for UI elements
                  </p>
                </div>
                <Switch id="display-tooltips" defaultChecked onChange={onSettingChange} />
              </div>
            </div>
          </div>
          
          {saveResetButtons}
        </CardContent>
      </Card>
    </div>
  );
};

// Add missing Badge component
const Badge = ({ children, className, variant }: { children: React.ReactNode, className?: string, variant?: "default" | "outline" }) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const variantClasses = variant === "outline" 
    ? "border border-input hover:bg-accent hover:text-accent-foreground" 
    : "bg-primary text-primary-foreground hover:bg-primary/80";
  
  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </div>
  );
};

export default AppearanceSettings;
