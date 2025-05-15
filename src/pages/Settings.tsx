import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";
import ProfileSettings from "@/components/settings/profile/ProfileSettings";
import AccountManagement from "@/components/settings/AccountManagement";
import BrokerIntegrations from "@/components/settings/broker-integrations/BrokerIntegrations";
import NotificationSettings from "@/components/settings/NotificationSettings";
import EnhancedAppearanceSettings from "@/components/settings/EnhancedAppearanceSettings";
import TradingRules from "@/components/settings/TradingRules";
import ReportSettings from "@/components/settings/reports/ReportSettings";
import ChartSettings from "@/components/settings/charts/ChartSettings";
import SecuritySettings from "@/components/settings/security/SecuritySettings";
import DeveloperSettings from "@/components/settings/DeveloperSettings";
import AdvancedFeatures from "@/components/settings/AdvancedFeatures";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  User, Shield, Database, Bell, Palette, LineChart, 
  FileText, BarChart, Lock, Code, Zap, Link 
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [changesMade, setChangesMade] = useState<Record<string, boolean>>({});
  const { theme } = useTheme();

  // Configuration for sidebar menu items
  const settingsSections = [
    { id: 'profile', name: 'Profile Settings', icon: User },
    { id: 'account', name: 'Account Management', icon: Shield },
    { id: 'broker', name: 'Broker Integrations', icon: Link, badge: 'New' },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance & UI', icon: Palette },
    { id: 'trading', name: 'Trading Rules', icon: LineChart },
    { id: 'reports', name: 'Report Settings', icon: FileText },
    { id: 'charts', name: 'Chart Settings', icon: BarChart },
    { id: 'security', name: 'Security & Privacy', icon: Lock },
    { id: 'developer', name: 'Developer / API', icon: Code },
    { id: 'advanced', name: 'Advanced Features', icon: Zap }
  ];

  // Effect to handle tab change from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
      // Show toast when navigating directly to a settings section
      toast({
        title: "Settings Navigation",
        description: `Viewing ${tabParam.charAt(0).toUpperCase() + tabParam.slice(1)} settings`,
      });
    }
  }, []);
  
  // Effect to update URL when tab changes
  useEffect(() => {
    const url = new URL(window.location.toString());
    url.searchParams.set("tab", activeTab);
    window.history.replaceState({}, "", url);
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSettingChange = (section: string) => {
    setChangesMade(prev => ({ ...prev, [section]: true }));
    // Here you would actually save the changes to the backend
    console.log(`Setting changed for ${section}`);
  };

  const handleSave = (section: string) => {
    setChangesMade(prev => ({ ...prev, [section]: false }));
    // Here you would actually save the changes to the backend
    console.log(`Saving changes for ${section}`);
  };

  const handleReset = (section: string) => {
    setChangesMade(prev => ({ ...prev, [section]: false }));
    // Here you would actually reset the settings for this section
    console.log(`Resetting settings for ${section}`);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <Card className={`${theme === 'dark' ? 'bg-sidebar border-gray-800' : 'bg-card'}`}>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleTabChange(section.id)}
                    className={`p-4 text-left flex items-center justify-between ${
                      activeTab === section.id 
                        ? 'bg-accent/10 border-l-4 border-primary' 
                        : 'border-l-4 border-transparent'
                    }`}
                  >
                    <span className="flex items-center">
                      <section.icon className="mr-2 h-4 w-4" />
                      {section.name}
                    </span>
                    {section.badge && (
                      <Badge variant="outline" className="ml-2 bg-primary/20 text-primary text-xs">
                        {section.badge}
                      </Badge>
                    )}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <div className="mt-4 hidden lg:block">
            <Button 
              variant="outline" 
              className="w-full justify-start mb-2"
              onClick={() => {
                toast({
                  title: "Export Settings",
                  description: "Your settings have been exported",
                });
              }}
            >
              <FileText className="mr-2 h-4 w-4" /> Export All Settings
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => {
                toast({
                  title: "Help Center",
                  description: "Opening settings documentation",
                });
              }}
            >
              <Database className="mr-2 h-4 w-4" /> Backup & Restore
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-3/4">
          <Card>
            <CardContent className="p-6">
              {activeTab === 'profile' && (
                <ProfileSettings 
                  onSave={() => handleSave('profile')} 
                  onReset={() => handleReset('profile')} 
                  onSettingChange={() => handleSettingChange('profile')}
                />
              )}
              
              {activeTab === 'account' && (
                <AccountManagement
                  onSettingChange={() => handleSettingChange('account')}
                />
              )}

              {activeTab === 'broker' && (
                <BrokerIntegrations
                  onSettingChange={() => handleSettingChange('broker')}
                  saveResetButtons={
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Reset
                      </button>
                      <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
                        Save Changes
                      </button>
                    </div>
                  }
                />
              )}

              {activeTab === 'notifications' && (
                <NotificationSettings
                  onSettingChange={() => handleSettingChange('notifications')}
                  saveResetButtons={
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleReset('notifications')}
                        className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Reset
                      </button>
                      <button 
                        onClick={() => handleSave('notifications')}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
                        Save Changes
                      </button>
                    </div>
                  }
                />
              )}
              
              {activeTab === 'appearance' && (
                <EnhancedAppearanceSettings
                  onSettingChange={() => handleSettingChange('appearance')}
                  saveResetButtons={
                    <div className="flex gap-2 mt-4 justify-end">
                      <button 
                        onClick={() => handleReset('appearance')}
                        className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Reset All UI Settings
                      </button>
                      <button 
                        onClick={() => handleSave('appearance')}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
                        Save All Changes
                      </button>
                    </div>
                  }
                />
              )}
              
              {activeTab === 'trading' && (
                <TradingRules
                  onSettingChange={() => handleSettingChange('trading')}
                  saveResetButtons={
                    <div className="flex gap-2 mt-4 justify-end">
                      <button 
                        onClick={() => handleReset('trading')}
                        className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Reset Rules
                      </button>
                      <button 
                        onClick={() => handleSave('trading')}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
                        Save Trading Rules
                      </button>
                    </div>
                  }
                />
              )}
              
              {activeTab === 'reports' && (
                <ReportSettings 
                  onSettingChange={() => handleSettingChange('reports')} 
                />
              )}
              
              {activeTab === 'charts' && (
                <ChartSettings
                  onSettingChange={() => handleSettingChange('charts')} 
                />
              )}
              
              {activeTab === 'security' && (
                <SecuritySettings
                  onSettingChange={() => handleSettingChange('security')}
                />
              )}
              
              {activeTab === 'developer' && (
                <DeveloperSettings
                  onSettingChange={() => handleSettingChange('developer')}
                  saveResetButtons={
                    <div className="flex gap-2 mt-4 justify-end">
                      <button 
                        onClick={() => handleReset('developer')}
                        className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Reset
                      </button>
                      <button 
                        onClick={() => handleSave('developer')}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
                        Save Changes
                      </button>
                    </div>
                  }
                />
              )}
              
              {activeTab === 'advanced' && (
                <AdvancedFeatures
                  onSettingChange={() => handleSettingChange('advanced')}
                  saveResetButtons={
                    <div className="flex gap-2 mt-4 justify-end">
                      <button 
                        onClick={() => handleReset('advanced')}
                        className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Reset Settings
                      </button>
                      <button 
                        onClick={() => handleSave('advanced')}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
                        Save Changes
                      </button>
                    </div>
                  }
                />
              )}
              
              {!['profile', 'account', 'broker', 'notifications', 'appearance', 'trading', 'reports', 'charts', 'security', 'developer', 'advanced'].includes(activeTab) && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-semibold mb-4">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
                  </h2>
                  <p className="text-muted-foreground">
                    This panel is not yet implemented. Please check back later.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
