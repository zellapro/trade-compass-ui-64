
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, Globe, Save, Undo } from "lucide-react";
import AvatarUploader from "./AvatarUploader";
import VerificationBadge from "./VerificationBadge";
import { useToast } from "@/hooks/use-toast";

interface ProfileSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ 
  onSettingChange,
  saveResetButtons 
}) => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    mobile: "+1 (555) 123-4567",
    region: "auto",
    traderBio: "Day trader focused on SMC strategies with 3 years of experience in forex and crypto markets."
  });
  
  const [emailVerified, setEmailVerified] = useState(true);
  const [mobileVerified, setMobileVerified] = useState(false);

  const handleChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    onSettingChange();
  };

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      console.log("Avatar file selected:", file.name);
      onSettingChange();
      
      toast({
        title: "Avatar updated",
        description: "Your new profile picture has been set",
      });
    }
  };

  const handleVerify = (type: "email" | "mobile") => {
    toast({
      title: `Verification email sent`,
      description: `Please check your ${type} for a verification link`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Manage your personal information and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8">
          <AvatarUploader 
            currentAvatar="/placeholder.svg"
            onChange={handleAvatarChange}
          />
          
          <div className="space-y-4 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Full Name</span>
                </Label>
                <Input 
                  id="fullName" 
                  value={profileData.fullName} 
                  onChange={(e) => handleChange('fullName', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Username</span>
                </Label>
                <div className="flex">
                  <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                    @
                  </div>
                  <Input 
                    id="username" 
                    className="rounded-l-none"
                    value={profileData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>Email</span>
                </Label>
                <div className="flex gap-2 items-center">
                  <Input 
                    id="email" 
                    type="email" 
                    className="flex-1"
                    value={profileData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  <VerificationBadge 
                    isVerified={emailVerified} 
                    type="email" 
                    onVerify={() => handleVerify("email")}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>Mobile</span>
                </Label>
                <div className="flex gap-2 items-center">
                  <Input 
                    id="mobile" 
                    type="tel" 
                    className="flex-1"
                    value={profileData.mobile}
                    onChange={(e) => handleChange('mobile', e.target.value)}
                  />
                  <VerificationBadge 
                    isVerified={mobileVerified} 
                    type="mobile" 
                    onVerify={() => handleVerify("mobile")}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="region" className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>Region</span>
                </Label>
                <Select 
                  value={profileData.region}
                  onValueChange={(value) => handleChange('region', value)}
                >
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-Detect (India)</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="eu">Europe</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="in">India</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="sg">Singapore</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Currently auto-detected as <span className="font-medium">India</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <Label htmlFor="traderBio" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>Trader Bio</span>
            <span className="text-xs text-muted-foreground ml-auto">
              {profileData.traderBio.length}/100
            </span>
          </Label>
          <Textarea 
            id="traderBio" 
            value={profileData.traderBio}
            maxLength={100}
            onChange={(e) => handleChange('traderBio', e.target.value)}
            placeholder="Tell the community about yourself as a trader..."
            className="resize-none"
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            Your bio will be visible in community profiles and shared playbooks.
          </p>
        </div>
        
        <div className="flex justify-end">
          {saveResetButtons}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
