
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Shield, Eye, Clock, Bell, Smartphone, LogOut, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SecuritySettingsProps {
  onSettingChange: () => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ onSettingChange }) => {
  const [activeTab, setActiveTab] = useState<string>("authentication");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState<boolean>(true);
  const [privacyModeEnabled, setPrivacyModeEnabled] = useState<boolean>(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(true);
  const [sharingDefault, setSharingDefault] = useState<string>("private");
  const [backupFrequency, setBackupFrequency] = useState<string>("weekly");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    onSettingChange();
  };

  const handleEmailAlertsToggle = () => {
    setEmailAlertsEnabled(!emailAlertsEnabled);
    onSettingChange();
  };

  const handlePrivacyModeToggle = () => {
    setPrivacyModeEnabled(!privacyModeEnabled);
    onSettingChange();
  };

  const handleAnalyticsToggle = () => {
    setAnalyticsEnabled(!analyticsEnabled);
    onSettingChange();
  };

  const handleSharingChange = (value: string) => {
    setSharingDefault(value);
    onSettingChange();
  };

  const handleBackupFrequencyChange = (value: string) => {
    setBackupFrequency(value);
    onSettingChange();
  };

  const handleDeleteData = () => {
    if (window.confirm("Are you sure you want to delete all your data? This action cannot be undone.")) {
      console.log("Deleting all user data");
      onSettingChange();
    }
  };

  const handleLogoutAll = () => {
    console.log("Logging out from all devices");
    onSettingChange();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Security & Privacy</h2>
        <p className="text-muted-foreground mb-6">
          Manage your account security settings and privacy preferences.
        </p>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="bg-muted/30 dark:bg-muted/20 mb-6">
            <TabsTrigger value="authentication" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Authentication</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Backup</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="authentication" className="space-y-6">
            {/* Two-Factor Authentication */}
            <Card className="bg-card dark:bg-card">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-medium">Two-Factor Authentication</h3>
                <p className="text-muted-foreground">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Protect your account with an authenticator app.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!twoFactorEnabled && <span className="text-sm text-muted-foreground">Disabled</span>}
                    <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Login Alerts */}
            <Card className="bg-card dark:bg-card">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-medium">Login Alerts</h3>
                <p className="text-muted-foreground">
                  Get notified when someone logs into your account from a new device or location.
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Login Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive an email when a new login is detected.
                    </p>
                  </div>
                  <Switch checked={emailAlertsEnabled} onCheckedChange={handleEmailAlertsToggle} />
                </div>
              </CardContent>
            </Card>

            {/* Login Sessions */}
            <Card className="bg-card dark:bg-card">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-medium">Login Sessions</h3>
                <p className="text-muted-foreground">
                  Manage your active login sessions on different devices.
                </p>
                
                <div className="border rounded-md p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-blue-500" />
                    <div>
                      <h4 className="font-medium">Current Device</h4>
                      <p className="text-xs text-muted-foreground">Web Browser • Last active now</p>
                    </div>
                  </div>
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">Current</span>
                </div>
                
                <div className="border rounded-md p-3 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-blue-500" />
                    <div>
                      <h4 className="font-medium">iPhone 14 Pro</h4>
                      <p className="text-xs text-muted-foreground">iOS App • Last active 2 days ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button variant="outline" className="w-full" onClick={handleLogoutAll}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out From All Devices
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            {/* Privacy Settings */}
            <Card className="bg-card dark:bg-card">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-medium">Privacy Settings</h3>
                <p className="text-muted-foreground">
                  Control what information is visible to others in your trading journal.
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Privacy Mode</h4>
                    <p className="text-sm text-muted-foreground">
                      Hide your P&L values when sharing your trading journal with others.
                    </p>
                  </div>
                  <Switch checked={privacyModeEnabled} onCheckedChange={handlePrivacyModeToggle} />
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Trade Sharing Default</h4>
                  <ToggleGroup 
                    type="single" 
                    value={sharingDefault} 
                    onValueChange={(value) => value && handleSharingChange(value)}
                    className="grid grid-cols-2 gap-2"
                  >
                    <ToggleGroupItem value="private" className="w-full">Private</ToggleGroupItem>
                    <ToggleGroupItem value="public" className="w-full">Public</ToggleGroupItem>
                  </ToggleGroup>
                  <p className="text-xs text-muted-foreground mt-1">
                    This setting will be applied to all new trades you create.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Privacy */}
            <Card className="bg-card dark:bg-card">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-medium">Data Privacy</h3>
                <p className="text-muted-foreground">
                  Manage how your data is stored and processed.
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Analytics Collection</h4>
                    <p className="text-sm text-muted-foreground">
                      Allow us to collect anonymous usage data to improve the platform.
                    </p>
                  </div>
                  <Switch checked={analyticsEnabled} onCheckedChange={handleAnalyticsToggle} />
                </div>
                
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={handleDeleteData}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete All My Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup" className="space-y-6">
            {/* Automatic Backups */}
            <Card className="bg-card dark:bg-card">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-medium">Automatic Backups</h3>
                <p className="text-muted-foreground">
                  Configure how often your trading data is automatically backed up.
                </p>
                
                <div>
                  <h4 className="font-medium mb-2">Backup Frequency</h4>
                  <ToggleGroup 
                    type="single" 
                    value={backupFrequency} 
                    onValueChange={(value) => value && handleBackupFrequencyChange(value)}
                    className="grid grid-cols-3 gap-2"
                  >
                    <ToggleGroupItem value="daily" className="w-full">Daily</ToggleGroupItem>
                    <ToggleGroupItem value="weekly" className="w-full">Weekly</ToggleGroupItem>
                    <ToggleGroupItem value="monthly" className="w-full">Monthly</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardContent>
            </Card>

            {/* Export Your Data */}
            <Card className="bg-card dark:bg-card">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-medium">Export Your Data</h3>
                <p className="text-muted-foreground">
                  Download your trading data in different formats.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">
                    Download JSON
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecuritySettings;
