
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, User, Mail, Clock, BarChart4, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProfileSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ 
  onSettingChange,
  saveResetButtons 
}) => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    timezone: "utc",
    marketTimezone: "est",
    assetClass: "equities",
    accountType: "retail"
  });

  const handleChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    onSettingChange();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your profile information and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                <AvatarFallback className="text-2xl">{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Upload size={16} />
                <span>Upload Photo</span>
              </Button>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Name</span>
                  </Label>
                  <Input 
                    id="name" 
                    value={profileData.name} 
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>Email</span>
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Trading Preferences</CardTitle>
          <CardDescription>Configure your preferred time zones and asset classes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Time Zone</span>
              </Label>
              <Select 
                value={profileData.timezone}
                onValueChange={(value) => handleChange('timezone', value)}
              >
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC (GMT)</SelectItem>
                  <SelectItem value="est">Eastern Time (EST/EDT)</SelectItem>
                  <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                  <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
                  <SelectItem value="pst">Pacific Time (PST/PDT)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                This affects how dates and times are displayed throughout the app
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="market-timezone" className="flex items-center gap-2">
                <BarChart4 className="h-4 w-4 text-muted-foreground" />
                <span>Default Trading Time Zone</span>
              </Label>
              <Select 
                value={profileData.marketTimezone}
                onValueChange={(value) => handleChange('marketTimezone', value)}
              >
                <SelectTrigger id="market-timezone">
                  <SelectValue placeholder="Select market timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="est">Eastern Time (NYSE/NASDAQ)</SelectItem>
                  <SelectItem value="ist">India Standard Time (NSE/BSE)</SelectItem>
                  <SelectItem value="utc">UTC (Crypto)</SelectItem>
                  <SelectItem value="jst">Japan Standard Time (TSE)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Used for market session calculations and trade timing
              </p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="asset-class" className="flex items-center gap-2">
                <BarChart4 className="h-4 w-4 text-muted-foreground" />
                <span>Preferred Asset Class</span>
              </Label>
              <Select 
                value={profileData.assetClass}
                onValueChange={(value) => handleChange('assetClass', value)}
              >
                <SelectTrigger id="asset-class">
                  <SelectValue placeholder="Select asset class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equities">Equities</SelectItem>
                  <SelectItem value="options">Options</SelectItem>
                  <SelectItem value="futures">Futures</SelectItem>
                  <SelectItem value="forex">Forex</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="account-type" className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Account Type</span>
              </Label>
              <Select 
                value={profileData.accountType}
                onValueChange={(value) => handleChange('accountType', value)}
              >
                <SelectTrigger id="account-type">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail Trader</SelectItem>
                  <SelectItem value="prop">Prop Firm</SelectItem>
                  <SelectItem value="funded">Funded Trader</SelectItem>
                  <SelectItem value="institutional">Institutional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {saveResetButtons}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
