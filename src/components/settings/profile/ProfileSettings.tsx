
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProfileSettingsProps {
  onSave: () => void;
  onReset: () => void;
  onSettingChange: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ 
  onSave,
  onReset,
  onSettingChange
}) => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: "John Trader",
    email: "john@example.com",
    timezone: "Asia/Kolkata",
    assetClass: "equities",
    accountType: "retail"
  });
  
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    onSettingChange();
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setProfileImage(e.target.result as string);
            onSettingChange();
          }
        };
        reader.readAsDataURL(target.files[0]);
      }
    };
    input.click();
  };

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile settings have been saved successfully.",
    });
    onSave();
  };

  const handleReset = () => {
    // Reset to initial state
    setProfileData({
      name: "John Trader",
      email: "john@example.com",
      timezone: "Asia/Kolkata",
      assetClass: "equities",
      accountType: "retail"
    });
    setProfileImage(null);
    
    toast({
      title: "Profile reset",
      description: "Your profile settings have been reset to default values.",
    });
    onReset();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Profile Settings</h2>
        <p className="text-muted-foreground">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-36 h-36 border">
            <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
            <AvatarFallback>
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleImageUpload} 
            className="flex items-center gap-2 text-primary"
          >
            <Upload size={16} />
            <span>Upload photo</span>
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={profileData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={profileData.timezone}
                onValueChange={(value) => handleChange('timezone', value)}
              >
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Kolkata">India (GMT+5:30)</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time (GMT-4)</SelectItem>
                  <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
                  <SelectItem value="Australia/Sydney">Sydney (GMT+10)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Used for trade timestamps and reports
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assetClass">Preferred Asset Class</Label>
              <Select
                value={profileData.assetClass}
                onValueChange={(value) => handleChange('assetClass', value)}
              >
                <SelectTrigger id="assetClass">
                  <SelectValue placeholder="Select asset class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equities">Equities</SelectItem>
                  <SelectItem value="forex">Forex</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="options">Options</SelectItem>
                  <SelectItem value="futures">Futures</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Default view for trade analysis
              </p>
            </div>
          </div>
          
          <div className="space-y-2 max-w-md">
            <Label htmlFor="accountType">Account Type</Label>
            <Select
              value={profileData.accountType}
              onValueChange={(value) => handleChange('accountType', value)}
            >
              <SelectTrigger id="accountType">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail Trader</SelectItem>
                <SelectItem value="prop">Prop Firm</SelectItem>
                <SelectItem value="institutional">Institutional</SelectItem>
                <SelectItem value="broker">Broker</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              For reporting and statistics
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleSave}>
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
