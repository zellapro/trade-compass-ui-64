
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BellRing, Mail, MessageSquare, MessagesSquare, Smartphone, Bot, AlertCircle, CheckCircle, ArrowUpDown, Clock, FileWarning } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NotificationSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

interface NotificationChannel {
  id: string;
  name: string;
  icon: React.ReactNode;
  enabled: boolean;
  config?: {
    email?: string;
    phone?: string;
    webhook?: string;
  };
}

interface NotificationType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: {
    inApp: boolean;
    email: boolean;
    sms: boolean;
    telegram: boolean;
    discord: boolean;
  };
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const [activeTab, setActiveTab] = useState("notifications");
  
  const [channels, setChannels] = useState<NotificationChannel[]>([
    { 
      id: "inApp", 
      name: "In-App Notifications", 
      icon: <BellRing className="h-4 w-4" />, 
      enabled: true 
    },
    { 
      id: "email", 
      name: "Email", 
      icon: <Mail className="h-4 w-4" />, 
      enabled: true,
      config: {
        email: "john@example.com"
      }
    },
    { 
      id: "sms", 
      name: "SMS", 
      icon: <Smartphone className="h-4 w-4" />, 
      enabled: false,
      config: {
        phone: ""
      }
    },
    { 
      id: "telegram", 
      name: "Telegram", 
      icon: <MessageSquare className="h-4 w-4" />, 
      enabled: false,
      config: {
        webhook: ""
      }
    },
    { 
      id: "discord", 
      name: "Discord", 
      icon: <MessagesSquare className="h-4 w-4" />, 
      enabled: false,
      config: {
        webhook: ""
      }
    },
  ]);
  
  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: "tradeImport",
      name: "Trade Import",
      description: "Get notified when trades are imported from your broker",
      icon: <CheckCircle className="h-4 w-4" />,
      enabled: {
        inApp: true,
        email: true,
        sms: false,
        telegram: false,
        discord: false
      }
    },
    {
      id: "slippage",
      name: "Slippage Alerts",
      description: "Get notified when there's significant slippage in your trades",
      icon: <ArrowUpDown className="h-4 w-4" />,
      enabled: {
        inApp: true,
        email: false,
        sms: false,
        telegram: false,
        discord: false
      }
    },
    {
      id: "weeklyRecap",
      name: "Weekly Recap",
      description: "Receive a summary of your trading performance each week",
      icon: <Clock className="h-4 w-4" />,
      enabled: {
        inApp: true,
        email: true,
        sms: false,
        telegram: false,
        discord: false
      }
    },
    {
      id: "ruleBreaks",
      name: "Rule Breaks",
      description: "Get alerted when you break your pre-defined trading rules",
      icon: <AlertCircle className="h-4 w-4" />,
      enabled: {
        inApp: true,
        email: true,
        sms: false,
        telegram: false,
        discord: false
      }
    },
    {
      id: "strategyAlerts",
      name: "Strategy Performance",
      description: "Get notified when a strategy reaches a performance threshold",
      icon: <FileWarning className="h-4 w-4" />,
      enabled: {
        inApp: true,
        email: false,
        sms: false,
        telegram: false,
        discord: false
      }
    },
  ]);
  
  const toggleChannel = (channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId ? { ...channel, enabled: !channel.enabled } : channel
    ));
    onSettingChange();
  };
  
  const updateChannelConfig = (channelId: string, key: string, value: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId ? { 
        ...channel, 
        config: { ...channel.config, [key]: value } 
      } : channel
    ));
    onSettingChange();
  };
  
  const toggleNotification = (notificationId: string, channelId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId ? {
        ...notification,
        enabled: {
          ...notification.enabled,
          [channelId]: !notification.enabled[channelId as keyof typeof notification.enabled]
        }
      } : notification
    ));
    onSettingChange();
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="notifications" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <BellRing className="h-4 w-4" />
            <span>Notification Types</span>
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Notification Channels</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Notification Types Tab */}
        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {notification.icon}
                      <h3 className="font-medium">{notification.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{notification.description}</p>
                    
                    <Separator className="my-3" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                      {channels.map((channel) => (
                        <div key={`${notification.id}-${channel.id}`} className="flex items-center justify-between border rounded-md p-2">
                          <div className="flex items-center gap-2">
                            {channel.icon}
                            <span className="text-sm">{channel.name}</span>
                          </div>
                          <Switch 
                            disabled={!channel.enabled}
                            checked={notification.enabled[channel.id as keyof typeof notification.enabled] && channel.enabled} 
                            onCheckedChange={() => toggleNotification(notification.id, channel.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Channels Tab */}
        <TabsContent value="channels" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Channels</CardTitle>
              <CardDescription>Configure where you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {channels.map((channel) => (
                  <div key={channel.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {channel.icon}
                        <h3 className="font-medium">{channel.name}</h3>
                      </div>
                      <Switch 
                        checked={channel.enabled} 
                        onCheckedChange={() => toggleChannel(channel.id)}
                      />
                    </div>
                    
                    {channel.enabled && channel.config && (
                      <div className="mt-4 space-y-3">
                        {channel.id === 'email' && (
                          <div>
                            <Label htmlFor="email-address">Email Address</Label>
                            <Input 
                              id="email-address" 
                              type="email" 
                              placeholder="your@email.com" 
                              className="mt-1"
                              value={channel.config.email}
                              onChange={(e) => updateChannelConfig(channel.id, 'email', e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Email notifications will be sent to this address
                            </p>
                          </div>
                        )}
                        
                        {channel.id === 'sms' && (
                          <div>
                            <Label htmlFor="phone-number">Phone Number</Label>
                            <Input 
                              id="phone-number" 
                              type="tel" 
                              placeholder="+1 (555) 123-4567" 
                              className="mt-1"
                              value={channel.config.phone}
                              onChange={(e) => updateChannelConfig(channel.id, 'phone', e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              SMS notifications will be sent to this number
                            </p>
                          </div>
                        )}
                        
                        {(channel.id === 'telegram' || channel.id === 'discord') && (
                          <div>
                            <Label htmlFor={`${channel.id}-webhook`}>Webhook URL</Label>
                            <Input 
                              id={`${channel.id}-webhook`}
                              type="url" 
                              placeholder="https://..." 
                              className="mt-1"
                              value={channel.config.webhook}
                              onChange={(e) => updateChannelConfig(channel.id, 'webhook', e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Notifications will be sent to this webhook URL
                            </p>
                          </div>
                        )}
                        
                        {channel.id !== 'inApp' && (
                          <div className="mt-3">
                            <Label htmlFor={`${channel.id}-frequency`}>Notification Frequency</Label>
                            <Select defaultValue="realtime">
                              <SelectTrigger id={`${channel.id}-frequency`} className="mt-1">
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="realtime">Real-time</SelectItem>
                                <SelectItem value="hourly">Hourly Digest</SelectItem>
                                <SelectItem value="daily">Daily Digest</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <h3 className="font-medium">Quiet Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Set hours when you don't want to receive notifications
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quiet-start">Start Time</Label>
                    <Select defaultValue="22:00">
                      <SelectTrigger id="quiet-start" className="mt-1">
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => (
                          <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="quiet-end">End Time</Label>
                    <Select defaultValue="07:00">
                      <SelectTrigger id="quiet-end" className="mt-1">
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => (
                          <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  <Switch id="quiet-weekends" />
                  <Label htmlFor="quiet-weekends">Enable quiet hours on weekends</Label>
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

export default NotificationSettings;
