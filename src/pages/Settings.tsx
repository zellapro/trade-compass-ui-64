
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  CreditCard, 
  Link, 
  Palette, 
  Bell, 
  Bot, 
  BarChart, 
  Shield, 
  Code,
  Zap,
  Calendar,
  Save,
  Undo,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import AccountManagement from "@/components/settings/AccountManagement";
import BrokerIntegrations from "@/components/settings/BrokerIntegrations";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import AiPreferences from "@/components/settings/AiPreferences";
import SecuritySettings from "@/components/settings/SecuritySettings";
import DeveloperSettings from "@/components/settings/DeveloperSettings";
import BonusFeatures from "@/components/settings/BonusFeatures";

interface SettingsCategory {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [changesMade, setChangesMade] = useState<Record<string, boolean>>({});
  const [isResetModalOpen, setResetModalOpen] = useState(false);
  const [resetSection, setResetSection] = useState("");

  const settingsCategories: SettingsCategory[] = [
    { id: "account", name: "Account Management", icon: User, description: "Manage your profile and account settings" },
    { id: "integrations", name: "Broker & Platform Integrations", icon: Link, description: "Connect your trading accounts and platforms" },
    { id: "appearance", name: "Appearance & UI", icon: Palette, description: "Customize how the application looks and feels" },
    { id: "notifications", name: "Notifications & Alerts", icon: Bell, description: "Configure your notification preferences" },
    { id: "ai-preferences", name: "AI Preferences", icon: Bot, description: "Configure AI behavior and journaling settings" },
    { id: "security", name: "Security & Privacy", icon: Shield, description: "Manage security options and privacy settings" },
    { id: "developer", name: "Developer / API", icon: Code, description: "API keys and developer options" },
    { id: "bonus", name: "Additional Features", icon: Zap, description: "Focus mode, market sync and more" }
  ];

  // Effect to handle tab change from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get("tab");
    if (tabParam && settingsCategories.some(cat => cat.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);
  
  // Effect to update URL when tab changes
  useEffect(() => {
    const url = new URL(window.location.toString());
    url.searchParams.set("tab", activeTab);
    window.history.replaceState({}, "", url);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleSettingChange = (section: string) => {
    setChangesMade(prev => ({ ...prev, [section]: true }));
  };

  const handleSave = (section: string) => {
    setChangesMade(prev => ({ ...prev, [section]: false }));
    // Here you would actually save the changes to the backend
    console.log(`Saving changes for ${section}`);
  };

  const handleReset = (section: string) => {
    setResetSection(section);
    setResetModalOpen(true);
  };

  const confirmReset = () => {
    setChangesMade(prev => ({ ...prev, [resetSection]: false }));
    setResetModalOpen(false);
    // Here you would actually reset the settings for this section
    console.log(`Resetting settings for ${resetSection}`);
  };

  const SaveResetButtons = ({ section }: { section: string }) => (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => handleReset(section)}
        disabled={!changesMade[section]}
      >
        <Undo className="mr-1 h-4 w-4" />
        Reset
      </Button>
      <Button 
        size="sm" 
        onClick={() => handleSave(section)}
        disabled={!changesMade[section]}
      >
        <Save className="mr-1 h-4 w-4" />
        Save Changes
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        
        <Tabs 
          defaultValue="account" 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <TabsList className="flex flex-col h-auto justify-start space-y-1 lg:w-1/5">
              {settingsCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="w-full flex justify-start px-3 py-2 h-9"
                >
                  <div className="flex items-center">
                    <category.icon className="mr-2 h-4 w-4" />
                    <span>{category.name}</span>
                    {changesMade[category.id] && (
                      <Badge variant="outline" className="ml-2 h-5 px-1">Modified</Badge>
                    )}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="flex-1 lg:w-4/5">
              <Card>
                <CardHeader className="p-6">
                  <CardTitle>
                    {settingsCategories.find(cat => cat.id === activeTab)?.name}
                  </CardTitle>
                  <CardDescription>
                    {settingsCategories.find(cat => cat.id === activeTab)?.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-6 pt-0">
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
                  
                  {activeTab === "ai-preferences" && (
                    <AiPreferences 
                      onSettingChange={() => handleSettingChange('ai-preferences')} 
                      saveResetButtons={<SaveResetButtons section="ai-preferences" />}
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
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
      
      <AlertDialog open={isResetModalOpen} onOpenChange={setResetModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Settings</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all changes you've made to the {
                settingsCategories.find(cat => cat.id === resetSection)?.name
              } settings. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReset}>Reset Settings</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
