
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Link,
  CheckCircle,
  XCircle,
  Lock,
  Bell,
  Shield,
  EyeOff,
} from "lucide-react";

interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  username?: string;
}

interface SocialConnectionsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const SocialConnections: React.FC<SocialConnectionsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const { toast } = useToast();
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    {
      id: "telegram",
      name: "Telegram",
      icon: <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">T</div>,
      connected: true,
      username: "@trader_john"
    },
    {
      id: "discord",
      name: "Discord",
      icon: <div className="h-8 w-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">D</div>,
      connected: true,
      username: "trader_john#1234"
    },
    {
      id: "slack",
      name: "Slack",
      icon: <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">S</div>,
      connected: false
    },
    {
      id: "twitter",
      name: "Twitter (X)",
      icon: <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center text-white font-bold">X</div>,
      connected: false
    },
    {
      id: "reddit",
      name: "Reddit",
      icon: <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">R</div>,
      connected: false
    },
    {
      id: "tradingview",
      name: "TradingView",
      icon: <div className="h-8 w-8 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">TV</div>,
      connected: false
    }
  ]);
  
  const [privacySettings, setPrivacySettings] = useState({
    hidePnl: true,
    redactName: false,
    hideScreenshots: true
  });

  const handleConnect = (platformId: string) => {
    setPlatforms(platforms.map(platform => {
      if (platform.id === platformId) {
        // In a real app, this would trigger OAuth or API connection flow
        const connected = !platform.connected;
        toast({
          title: connected ? `Connected to ${platform.name}` : `Disconnected from ${platform.name}`,
          description: connected ? "Your account has been successfully linked" : "Your account has been unlinked",
        });
        return { ...platform, connected, username: connected ? `@trader_john_${platform.id}` : undefined };
      }
      return platform;
    }));
    onSettingChange();
  };
  
  const handlePrivacyChange = (setting: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: value }));
    onSettingChange();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Connections</CardTitle>
        <CardDescription>
          Connect your social media accounts for alerts and sharing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Connected Platforms</h3>
          <div className="space-y-3">
            {platforms.map((platform) => (
              <div 
                key={platform.id}
                className={`border rounded-lg p-4 ${platform.connected ? "border-green-500/30 bg-green-500/5" : ""}`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {platform.icon}
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        {platform.name}
                        {platform.connected && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </h4>
                      {platform.username && (
                        <p className="text-sm text-muted-foreground">
                          {platform.username}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant={platform.connected ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleConnect(platform.id)}
                  >
                    {platform.connected ? "Disconnect" : "Connect"}
                  </Button>
                </div>
                
                {platform.connected && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id={`daily-${platform.id}`} />
                        <Label htmlFor={`daily-${platform.id}`} className="text-sm">
                          Daily Summary
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id={`alerts-${platform.id}`} />
                        <Label htmlFor={`alerts-${platform.id}`} className="text-sm">
                          Trade Alerts
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id={`mistakes-${platform.id}`} />
                        <Label htmlFor={`mistakes-${platform.id}`} className="text-sm">
                          Mistake Alerts
                        </Label>
                      </div>
                    </div>
                    
                    {platform.id === "telegram" && (
                      <div className="mt-3">
                        <Input
                          placeholder="Telegram Bot API Token (optional)"
                          className="text-xs"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          For advanced users who want to use their own Telegram bot
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Privacy Settings
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <Label className="font-medium">Hide PnL when sharing</Label>
                <p className="text-sm text-muted-foreground">
                  Removes profit/loss values from shared trades
                </p>
              </div>
              <Switch
                checked={privacySettings.hidePnl}
                onCheckedChange={(checked) => handlePrivacyChange('hidePnl', checked)}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <Label className="font-medium">Redact trader name</Label>
                <p className="text-sm text-muted-foreground">
                  Anonymizes your identity in shared content
                </p>
              </div>
              <Switch 
                checked={privacySettings.redactName}
                onCheckedChange={(checked) => handlePrivacyChange('redactName', checked)}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <Label className="font-medium">Hide screenshots</Label>
                <p className="text-sm text-muted-foreground">
                  Excludes chart screenshots from shared trades
                </p>
              </div>
              <Switch 
                checked={privacySettings.hideScreenshots}
                onCheckedChange={(checked) => handlePrivacyChange('hideScreenshots', checked)}
              />
            </div>
          </div>
        </div>
        
        <div className="p-3 border rounded-lg bg-amber-500/10 border-amber-500/30">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <h4 className="font-medium">Data Sharing Notice</h4>
              <p className="text-sm mt-1">
                When connecting social media accounts, ZellaPro only shares data you explicitly choose to share. We never post without your permission or access your contacts.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          {saveResetButtons}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialConnections;
