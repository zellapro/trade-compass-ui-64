
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationPreferencesProps {
  onSettingChange: () => void;
}

const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({ onSettingChange }) => {
  const { toast } = useToast();
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [telegramBotToken, setTelegramBotToken] = useState("");
  const [telegramChatId, setTelegramChatId] = useState("");
  
  // Notification types state
  const [notificationTypes, setNotificationTypes] = useState({
    tradeImport: { inApp: true, email: true, telegram: false },
    slippageAlerts: { inApp: true, email: true, telegram: false },
    weeklyRecap: { inApp: true, email: true, telegram: false },
    tradingRuleBreaks: { inApp: true, email: true, telegram: false },
    strategyAlerts: { inApp: false, email: false, telegram: false },
    securityAlerts: { inApp: true, email: true, telegram: false },
  });

  const handleSave = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated successfully."
    });
    onSettingChange();
  };

  const handleConnectTelegram = () => {
    if (!telegramBotToken || !telegramChatId) {
      toast({
        title: "Missing information",
        description: "Please provide both Bot Token and Chat ID",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Telegram connected",
      description: "Your Telegram bot has been successfully connected."
    });
    onSettingChange();
  };

  const handleDiscordSetup = () => {
    toast({
      title: "Discord setup initiated",
      description: "Please follow the instructions to set up Discord notifications."
    });
    onSettingChange();
  };

  const toggleNotificationType = (type: keyof typeof notificationTypes, channel: keyof typeof notificationTypes.tradeImport) => {
    setNotificationTypes(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [channel]: !prev[type][channel]
      }
    }));
    onSettingChange();
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-center">Notification Preferences</CardTitle>
        <CardDescription className="text-center">
          Control what notifications you receive and how they are delivered
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Basic Notification Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">In-App Notifications</h3>
              <p className="text-sm text-muted-foreground">Notifications shown within the application</p>
            </div>
            <Switch 
              checked={inAppNotifications} 
              onCheckedChange={(checked) => {
                setInAppNotifications(checked);
                onSettingChange();
              }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch 
              checked={emailNotifications} 
              onCheckedChange={(checked) => {
                setEmailNotifications(checked);
                onSettingChange();
              }}
            />
          </div>
        </div>

        {/* Notification Channels */}
        <div>
          <h3 className="text-lg font-medium text-center mb-4">Notification Channels</h3>
          
          {/* Telegram */}
          <div className="border rounded-md p-4 mb-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Telegram</h4>
                <p className="text-sm text-muted-foreground">Receive notifications via Telegram bot</p>
              </div>
              <Button 
                onClick={handleConnectTelegram}
                className="bg-[#1eaedb] hover:bg-[#1eaedb]/90 text-white"
              >
                Connect
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm mb-1">Bot Token</p>
                <Input 
                  value={telegramBotToken} 
                  onChange={(e) => setTelegramBotToken(e.target.value)}
                  placeholder="Enter your Telegram bot token"
                />
              </div>
              <div>
                <p className="text-sm mb-1">Chat ID</p>
                <Input 
                  value={telegramChatId} 
                  onChange={(e) => setTelegramChatId(e.target.value)}
                  placeholder="Enter your Telegram chat ID"
                />
              </div>
            </div>
            
            <p className="text-sm text-blue-500 mt-2 cursor-pointer hover:underline">
              Learn how to create a Telegram bot and get your Chat ID
            </p>
          </div>
          
          {/* Discord */}
          <div className="border rounded-md p-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-2 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Discord</h4>
                <p className="text-sm text-muted-foreground">Send notifications to Discord via webhook</p>
              </div>
              <Button 
                onClick={handleDiscordSetup}
                variant="outline"
              >
                Set Up
              </Button>
            </div>
          </div>
        </div>
        
        {/* Notification Types */}
        <div>
          <h3 className="text-lg font-medium text-center mb-4">Notification Types</h3>
          
          <div className="grid grid-cols-3 gap-2 mb-2 text-center border-b pb-2">
            <div>Type</div>
            <div>In-App</div>
            <div>Email</div>
          </div>
          
          {/* Trade Import */}
          <div className="grid grid-cols-3 gap-2 items-center py-2 border-b">
            <div>
              <p className="font-medium">Trade Import</p>
              <p className="text-xs text-muted-foreground">Notifications about successful or failed trade imports</p>
            </div>
            <div className="flex justify-center">
              <Switch 
                checked={notificationTypes.tradeImport.inApp} 
                onCheckedChange={() => toggleNotificationType('tradeImport', 'inApp')}
              />
            </div>
            <div className="flex justify-center">
              <Switch 
                checked={notificationTypes.tradeImport.email} 
                onCheckedChange={() => toggleNotificationType('tradeImport', 'email')}
              />
            </div>
          </div>
          
          {/* Slippage Alerts */}
          <div className="grid grid-cols-3 gap-2 items-center py-2 border-b">
            <div>
              <p className="font-medium">Slippage Alerts</p>
              <p className="text-xs text-muted-foreground">Alerts when there is significant slippage or execution issues</p>
            </div>
            <div className="flex justify-center">
              <Switch 
                checked={notificationTypes.slippageAlerts.inApp} 
                onCheckedChange={() => toggleNotificationType('slippageAlerts', 'inApp')}
              />
            </div>
            <div className="flex justify-center">
              <Switch 
                checked={notificationTypes.slippageAlerts.email} 
                onCheckedChange={() => toggleNotificationType('slippageAlerts', 'email')}
              />
            </div>
          </div>
          
          {/* Weekly Recap */}
          <div className="grid grid-cols-3 gap-2 items-center py-2 border-b">
            <div>
              <p className="font-medium">Weekly Recap</p>
              <p className="text-xs text-muted-foreground">Weekly summary of your trading performance</p>
            </div>
            <div className="flex justify-center">
              <Switch 
                checked={notificationTypes.weeklyRecap.inApp} 
                onCheckedChange={() => toggleNotificationType('weeklyRecap', 'inApp')}
              />
            </div>
            <div className="flex justify-center">
              <Switch 
                checked={notificationTypes.weeklyRecap.email} 
                onCheckedChange={() => toggleNotificationType('weeklyRecap', 'email')}
              />
            </div>
          </div>
          
          {/* Trading Rule Breaks */}
          <div className="grid grid-cols-3 gap-2 items-center py-2 border-b">
            <div>
              <p className="font-medium">Trading Rule Breaks</p>
              <p className="text-xs text-muted-foreground">Alerts when your trades break predefined rules</p>
            </div>
            <div className="flex justify-center">
              <Switch 
                checked={notificationTypes.tradingRuleBreaks.inApp} 
                onCheckedChange={() => toggleNotificationType('tradingRuleBreaks', 'inApp')}
              />
            </div>
            <div className="flex justify-center">
              <Switch 
                checked={notificationTypes.tradingRuleBreaks.email} 
                onCheckedChange={() => toggleNotificationType('tradingRuleBreaks', 'email')}
              />
            </div>
          </div>
          
          {/* Strategy Alerts */}
          <div className="grid grid-cols-3 gap-2 items-center py-2 border-b">
            <div>
              <p className="font-medium">Strategy Alerts</p>
              <p className="text-xs text-muted-foreground">Notifications about strategy performance changes</p>
            </div>
            <div className="flex justify-center">
              <Switch 
                checked={notificationTypes.strategyAlerts.inApp} 
                onCheckedChange={() => toggleNotificationType('strategyAlerts', 'inApp')}
              />
            </div>
            <div className="flex justify-center">
              <Switch 
                checked={notificationTypes.strategyAlerts.email} 
                onCheckedChange={() => toggleNotificationType('strategyAlerts', 'email')}
              />
            </div>
          </div>
          
          {/* Security Alerts */}
          <div className="grid grid-cols-3 gap-2 items-center py-2">
            <div>
              <p className="font-medium">Security Alerts</p>
              <p className="text-xs text-muted-foreground">Login attempts and security-related notifications</p>
            </div>
            <div className="flex justify-center">
              <Switch 
                checked={notificationTypes.securityAlerts.inApp} 
                onCheckedChange={() => toggleNotificationType('securityAlerts', 'inApp')}
              />
            </div>
            <div className="flex justify-center">
              <Switch 
                checked={notificationTypes.securityAlerts.email} 
                onCheckedChange={() => toggleNotificationType('securityAlerts', 'email')}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <Button 
            onClick={handleSave} 
            className="bg-[#1eaedb] hover:bg-[#1eaedb]/90 text-white"
          >
            <Bell className="mr-2 h-4 w-4" />
            Save Notification Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPreferences;
