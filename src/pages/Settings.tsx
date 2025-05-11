
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

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [changesMade, setChangesMade] = useState<Record<string, boolean>>({});
  const { theme } = useTheme();

  // Effect to handle tab change from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
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
                <button
                  onClick={() => handleTabChange('profile')}
                  className={`p-4 text-left ${activeTab === 'profile' 
                    ? 'bg-accent/10 border-l-4 border-primary' 
                    : 'border-l-4 border-transparent'}`}
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => handleTabChange('account')}
                  className={`p-4 text-left ${activeTab === 'account' 
                    ? 'bg-accent/10 border-l-4 border-primary' 
                    : 'border-l-4 border-transparent'}`}
                >
                  Account Management
                </button>
                <button
                  onClick={() => handleTabChange('broker')}
                  className={`p-4 text-left ${activeTab === 'broker' 
                    ? 'bg-accent/10 border-l-4 border-primary' 
                    : 'border-l-4 border-transparent'}`}
                >
                  Broker Integrations
                </button>
                <button
                  onClick={() => handleTabChange('notifications')}
                  className={`p-4 text-left ${activeTab === 'notifications' 
                    ? 'bg-accent/10 border-l-4 border-primary' 
                    : 'border-l-4 border-transparent'}`}
                >
                  Notifications
                </button>
                <button
                  onClick={() => handleTabChange('appearance')}
                  className={`p-4 text-left ${activeTab === 'appearance' 
                    ? 'bg-accent/10 border-l-4 border-primary' 
                    : 'border-l-4 border-transparent'}`}
                >
                  Appearance & UI
                </button>
                <button
                  onClick={() => handleTabChange('trading')}
                  className={`p-4 text-left ${activeTab === 'trading' 
                    ? 'bg-accent/10 border-l-4 border-primary' 
                    : 'border-l-4 border-transparent'}`}
                >
                  Trading Rules
                </button>
                <button
                  onClick={() => handleTabChange('reports')}
                  className={`p-4 text-left ${activeTab === 'reports' 
                    ? 'bg-accent/10 border-l-4 border-primary' 
                    : 'border-l-4 border-transparent'}`}
                >
                  Report Settings
                </button>
                <button
                  onClick={() => handleTabChange('charts')}
                  className={`p-4 text-left ${activeTab === 'charts' 
                    ? 'bg-accent/10 border-l-4 border-primary' 
                    : 'border-l-4 border-transparent'}`}
                >
                  Chart Settings
                </button>
                <button
                  onClick={() => handleTabChange('security')}
                  className={`p-4 text-left ${activeTab === 'security' 
                    ? 'bg-accent/10 border-l-4 border-primary' 
                    : 'border-l-4 border-transparent'}`}
                >
                  Security & Privacy
                </button>
                <button
                  onClick={() => handleTabChange('developer')}
                  className={`p-4 text-left ${activeTab === 'developer' 
                    ? 'bg-accent/10 border-l-4 border-primary' 
                    : 'border-l-4 border-transparent'}`}
                >
                  Developer / API
                </button>
                <button
                  onClick={() => handleTabChange('advanced')}
                  className={`p-4 text-left ${activeTab === 'advanced' 
                    ? 'bg-accent/10 border-l-4 border-primary' 
                    : 'border-l-4 border-transparent'}`}
                >
                  Advanced Features
                </button>
              </nav>
            </CardContent>
          </Card>
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
              
              {!['profile', 'account', 'broker', 'notifications', 'appearance', 'trading', 'reports', 'charts', 'security', 'developer'].includes(activeTab) && (
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
