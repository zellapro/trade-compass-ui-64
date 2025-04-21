
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  User, 
  CreditCard, 
  Link, 
  Palette, 
  Bell, 
  CheckSquare, 
  Bot, 
  BarChart, 
  Shield, 
  Code,
  CircleSlash,
  LucideIcon,
  Upload,
  Zap,
  Calendar,
  Save,
  RotateCcw,
  X,
  Check,
  UserCog,
  Key,
  BellDot,
  FileType,
  BellRing,
  FileCheck,
  Mail,
  FileJson,
  FileSearch,
  ExternalLink,
  UserRoundCheck,
  ShieldCheck,
  ShieldAlert,
  Upload as UploadIcon
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Import Section Components
import ProfileSettings from "@/components/settings/ProfileSettings";
import AccountManagement from "@/components/settings/AccountManagement";
import BrokerIntegrations from "@/components/settings/BrokerIntegrations";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import TradingRulesSettings from "@/components/settings/TradingRulesSettings";
import AiPreferences from "@/components/settings/AiPreferences";
import ReportSettings from "@/components/settings/ReportSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import DeveloperSettings from "@/components/settings/DeveloperSettings";
import BonusFeatures from "@/components/settings/BonusFeatures";

// Define the Section types for settings page navigation
interface SettingsSection {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState<Record<string, boolean>>({});
  
  // Define all the settings sections
  const sections: SettingsSection[] = [
    { id: "profile", name: "Profile Settings", icon: User, description: "Manage your personal information and preferences" },
    { id: "account", name: "Account Management", icon: CreditCard, description: "Subscription, billing and data management" },
    { id: "integrations", name: "Broker & Platform Integrations", icon: Link, description: "Connect your trading accounts and platforms" },
    { id: "appearance", name: "Appearance & UI", icon: Palette, description: "Customize how the application looks and feels" },
    { id: "notifications", name: "Notifications & Alerts", icon: BellRing, description: "Configure your notification preferences" },
    { id: "trading-rules", name: "Trading Rules & Checklists", icon: CheckSquare, description: "Set up rules and checklists for your trading" },
    { id: "ai-preferences", name: "AI Preferences", icon: Bot, description: "Configure AI behavior and journaling settings" },
    { id: "reports", name: "Report Settings", icon: BarChart, description: "Customize your trading reports" },
    { id: "security", name: "Security & Privacy", icon: Shield, description: "Manage security options and privacy settings" },
    { id: "developer", name: "Developer / API", icon: Code, description: "API keys and developer options" },
    { id: "bonus", name: "Additional Features", icon: Zap, description: "Focus mode, market sync and more" }
  ];

  // Track changes for save button state
  const handleSettingChange = (section: string) => {
    setUnsavedChanges({
      ...unsavedChanges,
      [section]: true
    });
  };

  // Mock save function
  const handleSave = (section: string) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setUnsavedChanges({
        ...unsavedChanges,
        [section]: false
      });
      
      toast.success("Settings saved successfully", {
        description: `Your ${sections.find(s => s.id === section)?.name.toLowerCase() || section} settings have been updated.`
      });
    }, 800);
  };

  // Mock reset function
  const handleReset = (section: string) => {
    setUnsavedChanges({
      ...unsavedChanges,
      [section]: false
    });
    
    toast.info("Settings reset to default", {
      description: `Your ${sections.find(s => s.id === section)?.name.toLowerCase() || section} settings have been reset.`
    });
  };

  // Save button component with state management
  const SaveResetButtons = ({ section }: { section: string }) => (
    <div className="flex items-center gap-2 mt-4">
      <Button 
        onClick={() => handleSave(section)} 
        disabled={!unsavedChanges[section] || isSaving}
        className="flex items-center gap-2"
      >
        {isSaving ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Save size={16} />
            <span>Save Changes</span>
          </>
        )}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={() => handleReset(section)}
        disabled={!unsavedChanges[section] || isSaving}
        className="flex items-center gap-2"
      >
        <RotateCcw size={16} />
        <span>Reset</span>
      </Button>
    </div>
  );

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your trading journal preferences and account settings
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation Sidebar */}
        <div className="w-full lg:w-1/4 space-y-2">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeTab === section.id ? "default" : "ghost"}
                    className={`w-full justify-start text-left mb-1 ${
                      activeTab === section.id ? "bg-primary text-primary-foreground" : ""
                    }`}
                    onClick={() => setActiveTab(section.id)}
                  >
                    <section.icon className="mr-2 h-4 w-4" />
                    <span>{section.name}</span>
                    {unsavedChanges[section.id] && (
                      <Badge variant="outline" className="ml-auto bg-orange-500/10 text-orange-500 border-orange-500/20">
                        Unsaved
                      </Badge>
                    )}
                  </Button>
                ))}
              </nav>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-500/10 p-2">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Settings auto-sync</p>
                  <p className="text-xs text-muted-foreground">All your settings are saved to the cloud</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Settings Content */}
        <div className="flex-1">
          <Card className="mb-4">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{sections.find(s => s.id === activeTab)?.name || "Settings"}</CardTitle>
                  <CardDescription>
                    {sections.find(s => s.id === activeTab)?.description || "Manage your account settings and preferences"}
                  </CardDescription>
                </div>
                {unsavedChanges[activeTab] && (
                  <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                    Unsaved Changes
                  </Badge>
                )}
              </div>
            </CardHeader>
          </Card>
          
          {/* Settings Content Sections */}
          <div className="space-y-4">
            {activeTab === "profile" && (
              <ProfileSettings 
                onSettingChange={() => handleSettingChange('profile')} 
                saveResetButtons={<SaveResetButtons section="profile" />}
              />
            )}
            
            {activeTab === "account" && (
              <AccountManagement 
                onSettingChange={() => handleSettingChange('account')} 
                saveResetButtons={<SaveResetButtons section="account" />}
              />
            )}
            
            {activeTab === "integrations" && (
              <BrokerIntegrations 
                onSettingChange={() => handleSettingChange('integrations')} 
                saveResetButtons={<SaveResetButtons section="integrations" />}
              />
            )}
            
            {activeTab === "appearance" && (
              <AppearanceSettings 
                onSettingChange={() => handleSettingChange('appearance')} 
                saveResetButtons={<SaveResetButtons section="appearance" />}
              />
            )}
            
            {activeTab === "notifications" && (
              <NotificationSettings 
                onSettingChange={() => handleSettingChange('notifications')} 
                saveResetButtons={<SaveResetButtons section="notifications" />}
              />
            )}
            
            {activeTab === "trading-rules" && (
              <TradingRulesSettings 
                onSettingChange={() => handleSettingChange('trading-rules')} 
                saveResetButtons={<SaveResetButtons section="trading-rules" />}
              />
            )}
            
            {activeTab === "ai-preferences" && (
              <AiPreferences 
                onSettingChange={() => handleSettingChange('ai-preferences')} 
                saveResetButtons={<SaveResetButtons section="ai-preferences" />}
              />
            )}
            
            {activeTab === "reports" && (
              <ReportSettings 
                onSettingChange={() => handleSettingChange('reports')} 
                saveResetButtons={<SaveResetButtons section="reports" />}
              />
            )}
            
            {activeTab === "security" && (
              <SecuritySettings 
                onSettingChange={() => handleSettingChange('security')} 
                saveResetButtons={<SaveResetButtons section="security" />}
              />
            )}
            
            {activeTab === "developer" && (
              <DeveloperSettings 
                onSettingChange={() => handleSettingChange('developer')} 
                saveResetButtons={<SaveResetButtons section="developer" />}
              />
            )}
            
            {activeTab === "bonus" && (
              <BonusFeatures 
                onSettingChange={() => handleSettingChange('bonus')} 
                saveResetButtons={<SaveResetButtons section="bonus" />}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
