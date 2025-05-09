
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { 
  User,
  CreditCard, 
  FileText, 
  ShieldCheck, 
  Upload, 
  Download, 
  FileJson, 
  ExternalLink, 
  Info,
  X,
  Camera,
  Check,
  Mail,
  Phone,
  Shield,
  MapPin,
  Calendar,
  RefreshCw,
  ChevronDown,
  Globe,
  CircleUser,
  Bookmark,
  BarChart,
  Clock,
  Lock,
  Zap
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

interface AccountManagementProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const AccountManagement: React.FC<AccountManagementProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const { toast } = useToast();
  const [subscriptionPlan, setSubscriptionPlan] = useState("pro");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    profile: true,
    subscription: true,
    devices: true,
    data: true,
    social: true
  });
  
  // Profile data states
  const [profileData, setProfileData] = useState({
    fullName: "Rahul Sharma",
    username: "tradezella",
    email: "rahul@example.com",
    emailVerified: true,
    phone: "+91 98765 43210",
    phoneVerified: false,
    timezone: "Asia/Kolkata",
    assetClass: "crypto",
    region: "India",
    language: "en",
    defaultWorkspace: "dashboard",
    traderBio: "Crypto trader specializing in Order Block and Breaker patterns. 3 years experience with scalping strategies."
  });
  
  // Subscription data
  const [billingFrequency, setBillingFrequency] = useState("monthly");
  
  // Device data
  const [devices, setDevices] = useState([
    { 
      id: 1,
      name: "Chrome on Windows",
      lastLogin: "Today, 10:23 AM",
      ipAddress: "182.76.XX.XX",
      trusted: true,
      current: true,
      note: "",
      alertEnabled: true
    },
    { 
      id: 2,
      name: "Safari on iPhone",
      lastLogin: "Yesterday, 3:45 PM",
      ipAddress: "103.68.XX.XX",
      trusted: false,
      current: false,
      note: "Personal phone",
      alertEnabled: false
    },
    { 
      id: 3,
      name: "Firefox on MacBook",
      lastLogin: "3 days ago",
      ipAddress: "157.34.XX.XX",
      trusted: true,
      current: false,
      note: "Office laptop",
      alertEnabled: true
    }
  ]);
  
  // Export data
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [exportFormat, setExportFormat] = useState("json");
  const [exportOptions, setExportOptions] = useState({
    anonymize: false,
    autoBackup: false,
    autoSyncGDrive: false,
    autoSyncDropbox: false,
    autoSyncOneDrive: false
  });
  
  // Social connections
  const [socialConnections, setSocialConnections] = useState({
    telegram: false,
    discord: true,
    slack: false,
    twitter: true,
    reddit: false
  });
  
  const [socialSettings, setSocialSettings] = useState({
    dailySummary: true,
    missedSetupAlerts: true,
    autoPostTrades: false,
    generateTweetDrafts: false,
    hidePnl: true,
    communityMode: false
  });
  
  // Handler functions
  const toggleCardExpansion = (card: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [card]: !prev[card]
    }));
  };
  
  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };
  
  const handleDeviceRemoval = (id: number) => {
    setDevices(prevDevices => prevDevices.filter(device => device.id !== id));
    toast({
      title: "Device Removed",
      description: "The device has been removed from your account.",
    });
  };
  
  const handleToggleTrusted = (id: number) => {
    setDevices(prevDevices => prevDevices.map(device => {
      if (device.id === id) {
        return { ...device, trusted: !device.trusted };
      }
      return device;
    }));
    toast({
      title: "Device Updated",
      description: "Trust settings updated successfully.",
    });
  };
  
  const handleConnect = (platform: string) => {
    setSocialConnections(prev => ({
      ...prev,
      [platform]: true
    }));
    toast({
      title: `Connected to ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
      description: `Your ${platform} account has been connected successfully.`,
    });
  };
  
  const handleDisconnect = (platform: string) => {
    setSocialConnections(prev => ({
      ...prev,
      [platform]: false
    }));
    toast({
      title: `Disconnected from ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
      description: `Your ${platform} account has been disconnected.`,
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Profile Settings Card */}
      <Collapsible 
        open={expandedCards.profile} 
        onOpenChange={() => toggleCardExpansion('profile')}
        className="border rounded-lg overflow-hidden bg-card"
      >
        <CollapsibleTrigger className="w-full">
          <div className="flex justify-between items-center p-5">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Profile Settings</h3>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedCards.profile ? 'transform rotate-180' : ''}`} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-5 pt-0 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Avatar column */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-2 border-primary/30">
                    <AvatarImage src="https://github.com/shadcn.png" alt={profileData.fullName} />
                    <AvatarFallback className="text-2xl">{profileData.fullName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                    onClick={() => toast({
                      title: "Upload Feature",
                      description: "Avatar upload functionality would be implemented here.",
                    })}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-center space-y-1">
                  <h3 className="font-medium">{profileData.fullName}</h3>
                  <p className="text-sm text-muted-foreground">@{profileData.username}</p>
                  
                  <div className="flex items-center justify-center mt-2">
                    <Badge variant={subscriptionPlan === "free" ? "outline" : subscriptionPlan === "pro" ? "default" : "warning"} className="text-xs">
                      {subscriptionPlan.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-4 w-full space-y-2">
                  <div className="p-3 rounded-md border border-dashed text-xs text-center bg-blue-500/5">
                    <p className="text-blue-500">
                      <Info className="h-3 w-3 inline-block mr-1" />
                      <span>Based on your trading, we've detected you're mostly using <strong>Crypto Swing</strong> strategies.</span>
                    </p>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Public Profile
                  </Button>
                </div>
              </div>
              
              {/* Basic Info column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={profileData.fullName} 
                    onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                      @
                    </div>
                    <Input 
                      id="username" 
                      className="rounded-l-none"
                      value={profileData.username} 
                      onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email">Email Address</Label>
                      {profileData.emailVerified ? (
                        <Badge variant="success" className="text-xs bg-green-500">Verified</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">Unverified</Badge>
                      )}
                    </div>
                    <div className="flex">
                      <Input 
                        id="email" 
                        type="email"
                        className="rounded-r-none"
                        value={profileData.email} 
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-l-none border-l-0"
                        onClick={() => toast({
                          title: profileData.emailVerified ? "Email Verified" : "Verification Sent",
                          description: profileData.emailVerified 
                            ? "Your email is already verified." 
                            : "A verification link has been sent to your email.",
                        })}
                      >
                        {profileData.emailVerified ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Mail className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="phone">Mobile Number</Label>
                      {profileData.phoneVerified ? (
                        <Badge variant="success" className="text-xs bg-green-500">Verified</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">Unverified</Badge>
                      )}
                    </div>
                    <div className="flex">
                      <Input 
                        id="phone" 
                        type="tel"
                        className="rounded-r-none"
                        value={profileData.phone} 
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-l-none border-l-0"
                        onClick={() => toast({
                          title: profileData.phoneVerified ? "Phone Verified" : "Verification Sent",
                          description: profileData.phoneVerified 
                            ? "Your phone number is already verified." 
                            : "A verification code has been sent to your phone.",
                        })}
                      >
                        {profileData.phoneVerified ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Phone className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="traderBio">Trader Bio (280 chars max)</Label>
                  <Textarea 
                    id="traderBio" 
                    placeholder="Tell other traders about your style and experience..."
                    className="resize-none"
                    value={profileData.traderBio} 
                    onChange={(e) => setProfileData({...profileData, traderBio: e.target.value})}
                    maxLength={280}
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {profileData.traderBio.length}/280
                  </div>
                </div>
              </div>
              
              {/* Preferences column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={profileData.timezone}
                    onValueChange={(value) => setProfileData({...profileData, timezone: value})}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select your timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">(GMT+5:30) India Standard Time</SelectItem>
                      <SelectItem value="America/New_York">(GMT-4:00) Eastern Time</SelectItem>
                      <SelectItem value="Europe/London">(GMT+0:00) London</SelectItem>
                      <SelectItem value="Asia/Singapore">(GMT+8:00) Singapore</SelectItem>
                      <SelectItem value="Australia/Sydney">(GMT+10:00) Sydney</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assetClass">Preferred Asset Class</Label>
                  <Select 
                    value={profileData.assetClass}
                    onValueChange={(value) => setProfileData({...profileData, assetClass: value})}
                  >
                    <SelectTrigger id="assetClass">
                      <SelectValue placeholder="Select asset class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equities">Equities</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      <SelectItem value="forex">Forex</SelectItem>
                      <SelectItem value="futures">Futures</SelectItem>
                      <SelectItem value="options">Options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="region">Trading Region</Label>
                  <Select 
                    value={profileData.region}
                    onValueChange={(value) => setProfileData({...profileData, region: value})}
                  >
                    <SelectTrigger id="region" className="flex gap-2">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="India">
                        <div className="flex items-center gap-2">
                          <span>🇮🇳</span>
                          <span>India</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="US">
                        <div className="flex items-center gap-2">
                          <span>🇺🇸</span>
                          <span>United States</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="UK">
                        <div className="flex items-center gap-2">
                          <span>🇬🇧</span>
                          <span>United Kingdom</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Singapore">
                        <div className="flex items-center gap-2">
                          <span>🇸🇬</span>
                          <span>Singapore</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Australia">
                        <div className="flex items-center gap-2">
                          <span>🇦🇺</span>
                          <span>Australia</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={profileData.language}
                    onValueChange={(value) => setProfileData({...profileData, language: value})}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">
                        <div className="flex items-center gap-2">
                          <span>🇬🇧</span>
                          <span>English</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="hi">
                        <div className="flex items-center gap-2">
                          <span>🇮🇳</span>
                          <span>Hindi</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="es">
                        <div className="flex items-center gap-2">
                          <span>🇪🇸</span>
                          <span>Spanish</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultWorkspace">Default Workspace</Label>
                  <Select 
                    value={profileData.defaultWorkspace}
                    onValueChange={(value) => setProfileData({...profileData, defaultWorkspace: value})}
                  >
                    <SelectTrigger id="defaultWorkspace">
                      <SelectValue placeholder="Select default page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="journal">Journal</SelectItem>
                      <SelectItem value="replay">Replay</SelectItem>
                      <SelectItem value="reports">Reports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Profile Reset",
                    description: "Your profile has been reset to default values.",
                  });
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
              
              <Button onClick={handleProfileUpdate}>
                <Check className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Subscription Plans Card */}
      <Collapsible 
        open={expandedCards.subscription} 
        onOpenChange={() => toggleCardExpansion('subscription')}
        className="border rounded-lg overflow-hidden bg-card"
      >
        <CollapsibleTrigger className="w-full">
          <div className="flex justify-between items-center p-5">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Subscription Plan</h3>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedCards.subscription ? 'transform rotate-180' : ''}`} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-5 pt-0 border-t">
            <div className="border rounded-lg p-4 mb-6 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h3 className="font-medium">Current Plan</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {subscriptionPlan === "pro" ? (
                      <>
                        <span className="text-xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Pro Plan</span>
                        <Badge className="bg-blue-500 text-white hover:bg-blue-600">Active</Badge>
                      </>
                    ) : subscriptionPlan === "elite" ? (
                      <>
                        <span className="text-xl font-bold capitalize bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">Elite Plan</span>
                        <Badge className="bg-orange-500 text-white hover:bg-orange-600">Active</Badge>
                      </>
                    ) : (
                      <>
                        <span className="text-xl font-bold capitalize">Free Plan</span>
                        <Badge variant="outline">Active</Badge>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Next billing: May 21, 2025
                    </span>
                    <span className="flex items-center">
                      <CreditCard className="h-3 w-3 mr-1" />
                      Visa ending in 4242
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Update Payment</span>
                  </Button>
                  <Button variant="default" className="flex items-center gap-2">
                    <span>Compare Plans</span>
                  </Button>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="relative">
                  <div className="absolute top-2 left-2">
                    <Badge variant="outline" className="bg-background border-primary/30 text-xs">Current</Badge>
                  </div>
                  <div className={`border rounded-md p-3 flex flex-col h-full ${subscriptionPlan === "pro" ? 'bg-primary/5 border-primary/30 shadow-[0_0_10px_rgba(24,113,248,0.2)]' : 'hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer'}`}>
                    <div className="flex flex-col items-center text-center mb-auto">
                      <span className="text-lg font-medium">Pro</span>
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold">$29</span>
                        <span className="text-muted-foreground text-sm">/ month</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{billingFrequency === "yearly" ? "Billed yearly ($290)" : "Billed monthly"}</span>
                    </div>
                    <ul className="text-xs text-left mt-4 space-y-2 mb-4">
                      <li className="flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span>Advanced Analytics</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span>5 Broker Connections</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span>Unlimited Trades</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span>AI Assistant</span>
                      </li>
                    </ul>
                    <Button 
                      variant={subscriptionPlan === "pro" ? "secondary" : "outline"} 
                      size="sm" 
                      className="mt-auto w-full"
                      disabled={subscriptionPlan === "pro"}
                    >
                      {subscriptionPlan === "pro" ? "Current Plan" : "Switch to Pro"}
                    </Button>
                  </div>
                </div>
                
                <div className="relative col-span-2">
                  <div className="absolute top-2 left-2 z-10">
                    <Badge className="bg-orange-500 text-white hover:bg-orange-600">Popular</Badge>
                  </div>
                  <div className={`border rounded-md p-4 flex flex-col h-full ${subscriptionPlan === "elite" ? 'bg-primary/5 border-primary/30 shadow-[0_0_10px_rgba(24,113,248,0.2)]' : 'border border-orange-400/30 shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:border-orange-400/50 transition-colors cursor-pointer'}`}>
                    <div className="flex flex-col items-center text-center mb-auto">
                      <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">Elite</span>
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold">$49</span>
                        <span className="text-muted-foreground text-sm">/ month</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{billingFrequency === "yearly" ? "Billed yearly ($490)" : "Billed monthly"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
                      <ul className="text-xs text-left space-y-2">
                        <li className="flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3 text-orange-500 flex-shrink-0" />
                          <span>All Pro Features</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3 text-orange-500 flex-shrink-0" />
                          <span>Unlimited Connections</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3 text-orange-500 flex-shrink-0" />
                          <span>Advanced Rule Engine</span>
                        </li>
                      </ul>
                      <ul className="text-xs text-left space-y-2">
                        <li className="flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3 text-orange-500 flex-shrink-0" />
                          <span>Priority Support</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3 text-orange-500 flex-shrink-0" />
                          <span>Unlimited AI Feedback</span>
                        </li>
                        <li className="flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3 text-orange-500 flex-shrink-0" />
                          <span>Strategy Synchronization</span>
                        </li>
                      </ul>
                    </div>
                    <Button 
                      variant={subscriptionPlan === "elite" ? "secondary" : "default"} 
                      size="sm" 
                      className={`mt-auto w-full ${subscriptionPlan !== "elite" ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                      disabled={subscriptionPlan === "elite"}
                    >
                      {subscriptionPlan === "elite" ? "Current Plan" : "Upgrade to Elite"}
                    </Button>
                  </div>
                </div>
                
                <div className="relative">
                  <div className={`border rounded-md p-3 flex flex-col h-full ${subscriptionPlan === "free" ? 'bg-primary/5 border-primary/30 shadow-[0_0_10px_rgba(24,113,248,0.2)]' : 'hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer'}`}>
                    <div className="flex flex-col items-center text-center mb-auto">
                      <span className="text-lg font-medium">Free</span>
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold">$0</span>
                        <span className="text-muted-foreground text-sm">/ month</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">Limited features</span>
                    </div>
                    <ul className="text-xs text-left mt-4 space-y-2 mb-4">
                      <li className="flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span>Basic Journal</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span>1 Broker Connection</span>
                      </li>
                      <li className="flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-green-500 flex-shrink-0" />
                        <span>100 Trades/Month</span>
                      </li>
                    </ul>
                    <Button 
                      variant={subscriptionPlan === "free" ? "secondary" : "outline"} 
                      size="sm" 
                      className="mt-auto w-full"
                      disabled={subscriptionPlan === "free"}
                    >
                      {subscriptionPlan === "free" ? "Current Plan" : "Downgrade"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <h4 className="font-medium mb-3">Billing Options</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="billingFrequency">Billing Frequency</Label>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${billingFrequency === "monthly" ? "font-medium" : "text-muted-foreground"}`}>Monthly</span>
                      <Switch
                        id="billingFrequency"
                        checked={billingFrequency === "yearly"}
                        onCheckedChange={(checked) => {
                          setBillingFrequency(checked ? "yearly" : "monthly");
                          toast({
                            title: "Billing Frequency Updated",
                            description: `Your billing frequency has been updated to ${checked ? "yearly" : "monthly"}.`,
                          });
                        }}
                      />
                      <span className={`text-sm flex items-center ${billingFrequency === "yearly" ? "font-medium" : "text-muted-foreground"}`}>
                        Yearly
                        <Badge variant="outline" className="ml-2 text-xs bg-green-100 text-green-800">Save 20%</Badge>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Label htmlFor="autoPause">Auto-Pause Subscription</Label>
                    <Switch
                      id="autoPause"
                      onCheckedChange={(checked) => {
                        toast({
                          title: checked ? "Auto-Pause Enabled" : "Auto-Pause Disabled",
                          description: checked 
                            ? "Your subscription will auto-pause during inactivity." 
                            : "Auto-pause feature has been disabled.",
                        });
                      }}
                    />
                  </div>
                  
                  <div className="p-3 rounded-md border border-dashed text-xs bg-muted/50">
                    <div className="flex items-start">
                      <Info className="h-4 w-4 mr-2 mt-0.5" />
                      <p>
                        Auto-Pause temporarily freezes your subscription during vacations or extended inactivity (14+ days), preserving your credits and subscription benefits without billing.
                      </p>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-medium mt-6 mb-3">Payment Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border rounded-md p-3">
                    <div className="flex items-center">
                      <div className="h-8 w-12 bg-muted rounded flex items-center justify-center mr-3">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Visa ending in 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 04/26</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="mr-2 h-4 w-4" />
                      Billing Address
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <h4 className="font-medium mb-3">Usage Summary</h4>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">Replay Sessions</Label>
                      <Badge variant="outline" className="text-xs">45 / 50 remaining</Badge>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: '90%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">Resets on May 21, 2025</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">API Usage</Label>
                      <Badge variant="outline" className="text-xs">64%</Badge>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm">AI Feedback Credits</Label>
                      <Badge variant="outline" className="text-xs">32 / 100 used</Badge>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-medium mt-6 mb-3">Invoice History</h4>
                <div className="border rounded-md overflow-hidden">
                  <div className="max-h-[200px] overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50 border-b">
                        <tr>
                          <th className="text-xs font-medium text-left p-3">Date</th>
                          <th className="text-xs font-medium text-left p-3">Amount</th>
                          <th className="text-xs font-medium text-left p-3">Status</th>
                          <th className="text-xs font-medium text-right p-3">Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="text-xs p-3">Apr 21, 2025</td>
                          <td className="text-xs p-3">$29.00</td>
                          <td className="text-xs p-3">
                            <Badge variant="success" className="text-xs bg-green-500">Paid</Badge>
                          </td>
                          <td className="text-xs p-3 text-right">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Download className="h-3 w-3" />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-xs p-3">Mar 21, 2025</td>
                          <td className="text-xs p-3">$29.00</td>
                          <td className="text-xs p-3">
                            <Badge variant="success" className="text-xs bg-green-500">Paid</Badge>
                          </td>
                          <td className="text-xs p-3 text-right">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Download className="h-3 w-3" />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-xs p-3">Feb 21, 2025</td>
                          <td className="text-xs p-3">$29.00</td>
                          <td className="text-xs p-3">
                            <Badge variant="success" className="text-xs bg-green-500">Paid</Badge>
                          </td>
                          <td className="text-xs p-3 text-right">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Download className="h-3 w-3" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <Button variant="link" size="sm" className="text-xs h-auto p-0">
                    View all invoices
                  </Button>
                  <Button variant="link" size="sm" className="text-xs h-auto p-0">
                    Request invoice correction
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
              <Button>
                <Check className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Linked Devices Card */}
      <Collapsible 
        open={expandedCards.devices} 
        onOpenChange={() => toggleCardExpansion('devices')}
        className="border rounded-lg overflow-hidden bg-card"
      >
        <CollapsibleTrigger className="w-full">
          <div className="flex justify-between items-center p-5">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Linked Devices</h3>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedCards.devices ? 'transform rotate-180' : ''}`} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-5 pt-0 border-t">
            <div className="border rounded-lg p-4 space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <h4 className="font-medium flex items-center">
                        {device.name} {device.current && <Badge className="ml-2 text-xs">Current</Badge>}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Last active: {device.lastLogin}</p>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>IP: {device.ipAddress}</span>
                      </div>
                      {device.note && (
                        <div className="flex items-center">
                          <Bookmark className="h-3 w-3 mr-1" />
                          <span>{device.note}</span>
                        </div>
                      )}
                      {device.trusted && (
                        <Badge variant="outline" className="text-xs bg-green-100 text-green-800">Trusted</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-5 mt-2">
                      <div className="flex items-center">
                        <Label htmlFor={`trusted-${device.id}`} className="text-xs mr-2">Trusted Device</Label>
                        <Switch 
                          id={`trusted-${device.id}`} 
                          checked={device.trusted} 
                          onCheckedChange={() => handleToggleTrusted(device.id)}
                          disabled={device.current}
                        />
                      </div>
                      <div className="flex items-center">
                        <Label htmlFor={`alerts-${device.id}`} className="text-xs mr-2">Login Alerts</Label>
                        <Switch 
                          id={`alerts-${device.id}`} 
                          checked={device.alertEnabled}
                          onCheckedChange={(checked) => {
                            setDevices(devices.map(d => d.id === device.id ? { ...d, alertEnabled: checked } : d));
                            toast({
                              title: checked ? "Login Alerts Enabled" : "Login Alerts Disabled",
                              description: `Login alerts for ${device.name} have been ${checked ? "enabled" : "disabled"}.`,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 self-end md:self-center mt-2 md:mt-0">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => {
                            const newNote = prompt("Add a note for this device:", device.note);
                            if (newNote !== null) {
                              setDevices(devices.map(d => d.id === device.id ? { ...d, note: newNote } : d));
                            }
                          }}>
                            Add Note
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add a note to identify this device</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {!device.current && (
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDeviceRemoval(device.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-4">
              <Button variant="outline" onClick={() => {
                toast({
                  title: "Security Alert",
                  description: "All devices except this one have been logged out.",
                });
              }}>
                <Lock className="mr-2 h-4 w-4" />
                Log out from all other devices
              </Button>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
              <Button>
                <Check className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Data Management Card */}
      <Collapsible 
        open={expandedCards.data} 
        onOpenChange={() => toggleCardExpansion('data')}
        className="border rounded-lg overflow-hidden bg-card"
      >
        <CollapsibleTrigger className="w-full">
          <div className="flex justify-between items-center p-5">
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Data Management</h3>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedCards.data ? 'transform rotate-180' : ''}`} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-5 pt-0 border-t">
            <div className="border rounded-lg p-4 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Export Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="mb-2 block">Date Range</Label>
                      <DatePickerWithRange
                        date={date}
                        setDate={setDate}
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Filters</Label>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">All Trades</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Winning Trades</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Losing Trades</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Setup: OB</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Tag: Overtrading</Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Format</Label>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant={exportFormat === "json" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setExportFormat("json")}
                          className="flex items-center gap-2"
                        >
                          <FileJson className="h-4 w-4" />
                          JSON
                        </Button>
                        <Button 
                          variant={exportFormat === "csv" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setExportFormat("csv")}
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          CSV
                        </Button>
                        <Button 
                          variant={exportFormat === "pdf" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setExportFormat("pdf")}
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          PDF
                        </Button>
                        <Button 
                          variant={exportFormat === "zip" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setExportFormat("zip")}
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          ZIP Bundle
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Switch
                        id="anonymizeData"
                        checked={exportOptions.anonymize}
                        onCheckedChange={(checked) => {
                          setExportOptions({...exportOptions, anonymize: checked});
                        }}
                      />
                      <Label htmlFor="anonymizeData" className="ml-2">
                        Anonymize before export
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-[200px]">
                              Removes personal information like name, account numbers, and specific trade amounts,
                              making the data suitable for sharing.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Auto-Sync Options</h4>
                      <div className="space-y-3 border rounded-md p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-3 h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
                              <ExternalLink className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Google Drive</p>
                              <p className="text-xs text-muted-foreground">Auto-sync to your Drive</p>
                            </div>
                          </div>
                          <Switch
                            id="gdriveSync"
                            checked={exportOptions.autoSyncGDrive}
                            onCheckedChange={(checked) => {
                              setExportOptions({...exportOptions, autoSyncGDrive: checked});
                              if (checked) {
                                toast({
                                  title: "Google Drive Connected",
                                  description: "Your data will now be automatically backed up to Google Drive.",
                                });
                              }
                            }}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-3 h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
                              <ExternalLink className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Dropbox</p>
                              <p className="text-xs text-muted-foreground">Auto-sync to your Dropbox</p>
                            </div>
                          </div>
                          <Switch
                            id="dropboxSync"
                            checked={exportOptions.autoSyncDropbox}
                            onCheckedChange={(checked) => {
                              setExportOptions({...exportOptions, autoSyncDropbox: checked});
                              if (checked) {
                                toast({
                                  title: "Dropbox Connected",
                                  description: "Your data will now be automatically backed up to Dropbox.",
                                });
                              }
                            }}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-3 h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
                              <ExternalLink className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">OneDrive</p>
                              <p className="text-xs text-muted-foreground">Auto-sync to OneDrive</p>
                            </div>
                          </div>
                          <Switch
                            id="onedriveSync"
                            checked={exportOptions.autoSyncOneDrive}
                            onCheckedChange={(checked) => {
                              setExportOptions({...exportOptions, autoSyncOneDrive: checked});
                              if (checked) {
                                toast({
                                  title: "OneDrive Connected",
                                  description: "Your data will now be automatically backed up to OneDrive.",
                                });
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Backup Settings</h4>
                      <div className="border rounded-md p-3 space-y-3">
                        <div className="flex items-center">
                          <Switch
                            id="autoBackup"
                            checked={exportOptions.autoBackup}
                            onCheckedChange={(checked) => {
                              setExportOptions({...exportOptions, autoBackup: checked});
                            }}
                          />
                          <Label htmlFor="autoBackup" className="ml-2">
                            Auto Backup after each Journal/Replay
                          </Label>
                        </div>
                        
                        <div className="pt-2 border-t">
                          <Label className="text-xs text-muted-foreground block mb-1">Last 5 successful backups</Label>
                          <div className="text-xs space-y-1">
                            <div className="flex justify-between">
                              <span>Google Drive</span>
                              <span className="text-muted-foreground">Today, 10:23 AM</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Google Drive</span>
                              <span className="text-muted-foreground">Yesterday, 8:14 PM</span>
                            </div>
                            <div className="flex justify-between">
                              <span>OneDrive</span>
                              <span className="text-muted-foreground">May 7, 2025, 3:30 PM</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full">
                          <Upload className="mr-2 h-4 w-4" />
                          Manual Backup Now
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Import from other platforms</h4>
                      <div className="border rounded-md border-dashed p-3">
                        <div className="flex items-center">
                          <Zap className="mr-2 h-4 w-4 text-amber-500" />
                          <p className="text-sm">Coming Soon</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Import from TradeZella, Edgewonk, TradingVue, and other platforms.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
              <Button>
                <Check className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Social Media Connections Card */}
      <Collapsible 
        open={expandedCards.social} 
        onOpenChange={() => toggleCardExpansion('social')}
        className="border rounded-lg overflow-hidden bg-card"
      >
        <CollapsibleTrigger className="w-full">
          <div className="flex justify-between items-center p-5">
            <div className="flex items-center gap-2">
              <CircleUser className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Social Media Connections</h3>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform ${expandedCards.social ? 'transform rotate-180' : ''}`} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-5 pt-0 border-t">
            <div className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Connected Platforms</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border rounded-md p-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                          <ExternalLink className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Telegram</p>
                          <p className="text-xs text-muted-foreground">Connect for trading alerts</p>
                        </div>
                      </div>
                      {socialConnections.telegram ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDisconnect('telegram')}
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleConnect('telegram')}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between border rounded-md p-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-indigo-100 rounded flex items-center justify-center mr-3">
                          <ExternalLink className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Discord</p>
                          <p className="text-xs text-muted-foreground">
                            {socialConnections.discord ? 'Connected as @trader123' : 'Connect to Discord server'}
                          </p>
                        </div>
                      </div>
                      {socialConnections.discord ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDisconnect('discord')}
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleConnect('discord')}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between border rounded-md p-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-green-100 rounded flex items-center justify-center mr-3">
                          <ExternalLink className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Slack</p>
                          <p className="text-xs text-muted-foreground">Get trade summaries in Slack</p>
                        </div>
                      </div>
                      {socialConnections.slack ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDisconnect('slack')}
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleConnect('slack')}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between border rounded-md p-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-neutral-100 rounded flex items-center justify-center mr-3">
                          <ExternalLink className="h-4 w-4 text-neutral-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Twitter (X)</p>
                          <p className="text-xs text-muted-foreground">
                            {socialConnections.twitter ? 'Connected as @traderXYZ' : 'Share trading milestones'}
                          </p>
                        </div>
                      </div>
                      {socialConnections.twitter ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDisconnect('twitter')}
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleConnect('twitter')}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between border rounded-md p-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-red-100 rounded flex items-center justify-center mr-3">
                          <ExternalLink className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Reddit</p>
                          <p className="text-xs text-muted-foreground">Follow trading subreddits</p>
                        </div>
                      </div>
                      {socialConnections.reddit ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDisconnect('reddit')}
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleConnect('reddit')}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Integration Settings</h4>
                  
                  <div className="space-y-3">
                    <div className="border rounded-md p-3 space-y-3">
                      <h5 className="text-sm font-medium">Feature Toggles</h5>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="dailySummary" className="text-sm flex-1">Daily Summary Bot</Label>
                          <Switch 
                            id="dailySummary" 
                            checked={socialSettings.dailySummary}
                            onCheckedChange={(checked) => {
                              setSocialSettings({...socialSettings, dailySummary: checked});
                            }}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Label htmlFor="missedSetupAlerts" className="text-sm flex-1">Missed Setup Alerts</Label>
                          <Switch 
                            id="missedSetupAlerts" 
                            checked={socialSettings.missedSetupAlerts}
                            onCheckedChange={(checked) => {
                              setSocialSettings({...socialSettings, missedSetupAlerts: checked});
                            }}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Label htmlFor="autoPostTrades" className="text-sm flex-1">Auto-post Journals/Trades</Label>
                          <Switch 
                            id="autoPostTrades" 
                            checked={socialSettings.autoPostTrades}
                            onCheckedChange={(checked) => {
                              setSocialSettings({...socialSettings, autoPostTrades: checked});
                            }}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Label htmlFor="generateTweetDrafts" className="text-sm flex-1">AI-generated Tweet drafts</Label>
                          <Switch 
                            id="generateTweetDrafts" 
                            checked={socialSettings.generateTweetDrafts}
                            onCheckedChange={(checked) => {
                              setSocialSettings({...socialSettings, generateTweetDrafts: checked});
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3 space-y-3">
                      <h5 className="text-sm font-medium">Notification Preferences</h5>
                      
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs block mb-2">Trigger Events</Label>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Trade entry</Badge>
                            <Badge variant="outline" className="cursor-pointer bg-primary/10">Mistake</Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">AI Report</Badge>
                            <Badge variant="outline" className="cursor-pointer bg-primary/10">Milestone</Badge>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-xs block mb-2">Frequency</Label>
                          <div>
                            <Tabs defaultValue="instant" className="w-full">
                              <TabsList className="grid grid-cols-3 h-8 w-full">
                                <TabsTrigger value="instant" className="text-xs">Instant</TabsTrigger>
                                <TabsTrigger value="daily" className="text-xs">Daily Digest</TabsTrigger>
                                <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
                              </TabsList>
                            </Tabs>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3 space-y-3">
                      <h5 className="text-sm font-medium">Privacy Settings</h5>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="hidePnl" className="text-sm flex-1">Hide PnL when sharing</Label>
                          <Switch 
                            id="hidePnl" 
                            checked={socialSettings.hidePnl}
                            onCheckedChange={(checked) => {
                              setSocialSettings({...socialSettings, hidePnl: checked});
                            }}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <Label htmlFor="communityMode" className="text-sm block">Community Mode</Label>
                            <p className="text-xs text-muted-foreground">Share anonymized trades with ZellaPublic for peer benchmarking</p>
                          </div>
                          <Switch 
                            id="communityMode" 
                            checked={socialSettings.communityMode}
                            onCheckedChange={(checked) => {
                              setSocialSettings({...socialSettings, communityMode: checked});
                              if (checked) {
                                toast({
                                  title: "Community Mode Enabled",
                                  description: "Your anonymized trades will be shared with the community for benchmarking.",
                                });
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3 border-dashed">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-sm font-medium">Advanced: Webhook URL</h5>
                          <p className="text-xs text-muted-foreground">For Slack/Discord custom integration</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({
                            title: "Webhook Setup",
                            description: "Webhook settings would be accessible here for advanced integrations.",
                          });
                        }}>
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {saveResetButtons}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AccountManagement;

