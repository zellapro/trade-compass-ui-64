import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  User, Settings, Upload, Clock, CreditCard, LogOut, Database, ArrowUpDown, 
  Cloud, PieChart, Moon, Sun, Bell, CheckSquare, Cpu, FileText, ShieldCheck, 
  Key, Zap, Code, UploadCloud, RefreshCcw, CheckCircle, X, Palette, Smartphone,
  ChevronDown, Bookmark, Edit, Globe, Briefcase, ChevronRight, AlertTriangle, 
  BarChart, CalendarDays, FileCheck, BellRing, Plus, Mail, Copy, Lock
} from "lucide-react";

// Profile Schema
const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  timezone: z.string().min(1, { message: "Please select a timezone" }),
  tradingTimezone: z.string().min(1, { message: "Please select a trading timezone" }),
  assetClass: z.string().min(1, { message: "Please select an asset class" }),
  accountType: z.string().min(1, { message: "Please select an account type" })
});

export default function Settings() {
  const [avatar, setAvatar] = useState("/placeholder.svg");
  const [theme, setTheme] = useState("light");
  const [accentColor, setAccentColor] = useState("blue");
  
  // Profile form
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      timezone: "UTC+5:30 (IST)",
      tradingTimezone: "UTC-5:00 (EST)",
      assetClass: "equities",
      accountType: "retail"
    }
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatar(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    // In a real app, would apply theme changes to the DOM/localStorage
  };

  const handleAccentColorChange = (value: string) => {
    setAccentColor(value);
    // In a real app, would apply accent color changes
  };

  // For demo purposes
  const isPremiumUser = true;

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences and trading journal configuration
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:flex lg:flex-wrap gap-2 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              Trading Rules
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              AI Preferences
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="developer" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Developer
            </TabsTrigger>
          </TabsList>
        
          {/* Profile Section */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="space-y-4 flex flex-col items-center">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src={avatar} alt="User avatar" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-center gap-2">
                          <Label 
                            htmlFor="avatar-upload" 
                            className="cursor-pointer text-sm px-3 py-1.5 border rounded-md hover:bg-accent"
                          >
                            Change Photo
                          </Label>
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                          />
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG or GIF. 1MB max.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={profileForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    placeholder="john.doe@example.com" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={profileForm.control}
                            name="timezone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Time Zone</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select your timezone" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="UTC+5:30 (IST)">UTC+5:30 (IST)</SelectItem>
                                    <SelectItem value="UTC-5:00 (EST)">UTC-5:00 (EST)</SelectItem>
                                    <SelectItem value="UTC-8:00 (PST)">UTC-8:00 (PST)</SelectItem>
                                    <SelectItem value="UTC+0:00 (GMT)">UTC+0:00 (GMT)</SelectItem>
                                    <SelectItem value="UTC+9:00 (JST)">UTC+9:00 (JST)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Your local time zone for app displays
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="tradingTimezone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Trading Time Zone</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select trading timezone" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="UTC+5:30 (IST)">UTC+5:30 (IST) - Indian Markets</SelectItem>
                                    <SelectItem value="UTC-5:00 (EST)">UTC-5:00 (EST) - NYSE/NASDAQ</SelectItem>
                                    <SelectItem value="UTC-8:00 (PST)">UTC-8:00 (PST) - US West Coast</SelectItem>
                                    <SelectItem value="UTC+0:00 (GMT)">UTC+0:00 (GMT) - London</SelectItem>
                                    <SelectItem value="UTC+8:00 (SGT)">UTC+8:00 (SGT) - Singapore</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  The default market timezone for trade records
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={profileForm.control}
                            name="assetClass"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Asset Class</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select asset class" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="equities">Equities</SelectItem>
                                    <SelectItem value="options">Options</SelectItem>
                                    <SelectItem value="futures">Futures</SelectItem>
                                    <SelectItem value="forex">Forex</SelectItem>
                                    <SelectItem value="crypto">Crypto</SelectItem>
                                    <SelectItem value="multiple">Multiple</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Your primary trading instruments
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="accountType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Account Type</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select account type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="retail">Retail Trader</SelectItem>
                                    <SelectItem value="prop">Prop Firm</SelectItem>
                                    <SelectItem value="funded">Funded Trader</SelectItem>
                                    <SelectItem value="institutional">Institutional</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Type of trading account you use
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">Save Profile Changes</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        
          {/* Account Management Section */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription & Billing</CardTitle>
                <CardDescription>
                  Manage your subscription, billing history, and plan options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">Current Plan</h3>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary text-primary-foreground">Pro</Badge>
                      <span className="text-muted-foreground">$29.99/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Next billing date: May 21, 2025
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Unlimited trades</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Advanced analytics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">2 broker integrations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">AI trade analysis</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between">
                    <div className="space-y-2">
                      <Button className="w-full">Upgrade to Elite</Button>
                      <Button variant="outline" className="w-full">View Billing History</Button>
                    </div>
                    <Button variant="link" className="text-muted-foreground">Cancel Subscription</Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Account Management</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Linked Devices</h4>
                        <p className="text-sm text-muted-foreground">3 devices currently using your account</p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="mt-2 md:mt-0">
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout All Devices
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Logout from all devices?</DialogTitle>
                            <DialogDescription>
                              This will end your session on all devices. You will need to log in again.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button variant="destructive">Logout All</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Data Export</h4>
                        <p className="text-sm text-muted-foreground">Download your trading data in various formats</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="mt-2 md:mt-0">
                            <Database className="h-4 w-4 mr-2" />
                            Export Data
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Export as CSV
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileCheck className="h-4 w-4 mr-2" />
                            Export as JSON
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Export as PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Data Import</h4>
                        <p className="text-sm text-muted-foreground">Import trading data from other platforms</p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="mt-2 md:mt-0">
                            <UploadCloud className="h-4 w-4 mr-2" />
                            Import Data
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Import Trading Data</DialogTitle>
                            <DialogDescription>
                              Import your data from other trading journals or platforms
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex flex-col space-y-4 py-4">
                            <div className="flex items-center space-x-4">
                              <Button variant="outline" className="w-full">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload CSV or Excel
                              </Button>
                            </div>
                            <div className="relative">
                              <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                              </div>
                              <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                  or import from
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Button variant="outline" className="justify-start">
                                <img 
                                  src="https://placekitten.com/20/20" 
                                  alt="TraderVue" 
                                  className="h-4 w-4 mr-2 rounded-sm" 
                                />
                                TraderVue
                              </Button>
                              <Button variant="outline" className="justify-start">
                                <img 
                                  src="https://placekitten.com/20/20" 
                                  alt="TraderSync" 
                                  className="h-4 w-4 mr-2 rounded-sm" 
                                />
                                TraderSync
                              </Button>
                              <Button variant="outline" className="justify-start">
                                <img 
                                  src="https://placekitten.com/20/20" 
                                  alt="Edgewonk" 
                                  className="h-4 w-4 mr-2 rounded-sm" 
                                />
                                Edgewonk
                              </Button>
                              <Button variant="outline" className="justify-start">
                                <img 
                                  src="https://placekitten.com/20/20" 
                                  alt="TradingView" 
                                  className="h-4 w-4 mr-2 rounded-sm" 
                                />
                                TradingView
                              </Button>
                            </div>
                          </div>
                          <DialogFooter className="sm:justify-start">
                            <Button type="button" variant="secondary">
                              Import
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        
          {/* Broker Integrations Section */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform & Broker Integrations</CardTitle>
                <CardDescription>
                  Connect your trading platforms for automatic trade imports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Indian Market */}
                <Collapsible className="w-full border rounded-lg">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="https://placekitten.com/30/30" 
                        alt="Indian Markets" 
                        className="rounded-md" 
                      />
                      <div>
                        <h3 className="font-medium">Indian Markets</h3>
                        <p className="text-sm text-muted-foreground">NSE, BSE & MCX Brokers</p>
                      </div>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pt-0">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="Zerodha" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">Zerodha (Kite)</h4>
                            <p className="text-xs text-muted-foreground">Connect via Kite API</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="Groww" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">Groww</h4>
                            <p className="text-xs text-muted-foreground">Via CSV import only</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Import</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="Upstox" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">Upstox</h4>
                            <p className="text-xs text-muted-foreground">API Integration</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="Angel One" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">Angel One</h4>
                            <p className="text-xs text-muted-foreground">Smart API</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="Dhan" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">Dhan</h4>
                            <p className="text-xs text-muted-foreground">API Integration</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="5paisa" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">5paisa</h4>
                            <p className="text-xs text-muted-foreground">Via report import</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Import</Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                
                {/* Crypto */}
                <Collapsible className="w-full border rounded-lg">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="https://placekitten.com/30/30" 
                        alt="Cryptocurrency" 
                        className="rounded-md" 
                      />
                      <div>
                        <h3 className="font-medium">Cryptocurrency</h3>
                        <p className="text-sm text-muted-foreground">Global & Indian exchanges</p>
                      </div>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pt-0">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="Binance" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">Binance</h4>
                            <p className="text-xs text-muted-foreground">API Integration</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="CoinDCX" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">CoinDCX</h4>
                            <p className="text-xs text-muted-foreground">API Integration</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="Coinbase" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">Coinbase</h4>
                            <p className="text-xs text-muted-foreground">API Integration</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="WazirX" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">WazirX</h4>
                            <p className="text-xs text-muted-foreground">API Integration</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                
                {/* Forex */}
                <Collapsible className="w-full border rounded-lg">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="https://placekitten.com/30/30" 
                        alt="Forex" 
                        className="rounded-md" 
                      />
                      <div>
                        <h3 className="font-medium">Forex</h3>
                        <p className="text-sm text-muted-foreground">Foreign exchange platforms</p>
                      </div>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pt-0">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="MetaTrader" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">MetaTrader 4/5</h4>
                            <p className="text-xs text-muted-foreground">Via CSV/report import</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Import</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="Exness" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">Exness</h4>
                            <p className="text-xs text-muted-foreground">Via MT5 bridge</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                
                {/* Other Platforms */}
                <Collapsible className="w-full border rounded-lg">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="https://placekitten.com/30/30" 
                        alt="Other Platforms" 
                        className="rounded-md" 
                      />
                      <div>
                        <h3 className="font-medium">Other Platforms</h3>
                        <p className="text-sm text-muted-foreground">Global brokers & trading tools</p>
                      </div>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pt-0">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="Interactive Brokers" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">Interactive Brokers</h4>
                            <p className="text-xs text-muted-foreground">IBKR API</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="TradingView" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">TradingView</h4>
                            <p className="text-xs text-muted-foreground">Via CSV export</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Import</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://placekitten.com/25/25" 
                            alt="ThinkOrSwim" 
                            className="rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">ThinkOrSwim</h4>
                            <p className="text-xs text-muted-foreground">Via CSV export</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Import</Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Auto-Import Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Synchronization Frequency</h4>
                        <p className="text-sm text-muted-foreground">How often to fetch new trades</p>
                      </div>
                      <Select defaultValue="daily">
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="manual">Manual only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Auto-tag Imported Trades</h4>
                        <p className="text-sm text-muted-foreground">Automatically tag trades based on rules</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Merge Duplicate Entries</h4>
                        <p className="text-sm text-muted-foreground">Combine partial fills into single trade</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        
          {/* Appearance Section */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance & UI Customization</CardTitle>
                <CardDescription>
                  Customize the look and feel of your trading journal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Theme</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div
                          className={`cursor-pointer p-6 rounded-lg border-2 flex flex-col items-center justify-center gap-2 ${
                            theme === "light" ? "border-primary" : "border-muted"
                          }`}
                          onClick={() => handleThemeChange("light")}
                        >
                          <Sun className="h-6 w-6" />
                          <span className="text-sm">Light</span>
                        </div>
                        
                        <div
                          className={`cursor-pointer p-6 rounded-lg border-2 flex flex-col items-center justify-center gap-2 ${
                            theme === "dark" ? "border-primary" : "border-muted"
                          } bg-muted text-muted-foreground`}
                          onClick={() => handleThemeChange("dark")}
                        >
                          <Moon className="h-6 w-6" />
                          <span className="text-sm">Dark</span>
                        </div>
                        
                        <div
                          className={`cursor-pointer p-6 rounded-lg border-2 flex flex-col items-center justify-center gap-2 ${
                            theme === "system" ? "border-primary" : "border-muted"
                          }`}
                          onClick={() => handleThemeChange("system")}
                        >
                          <Smartphone className="h-6 w-6" />
                          <span className="text-sm">System</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Accent Color</h3>
                      <div className="grid grid-cols-4 gap-4">
                        <div
                          className={`cursor-pointer h-10 rounded-md border-2 ${
                            accentColor === "blue" ? "border-black dark:border-white" : "border-transparent"
                          } bg-blue-500`}
                          onClick={() => handleAccentColorChange("blue")}
                        />
                        <div
                          className={`cursor-pointer h-10 rounded-md border-2 ${
                            accentColor === "green" ? "border-black dark:border-white" : "border-transparent"
                          } bg-green-500`}
                          onClick={() => handleAccentColorChange("green")}
                        />
                        <div
                          className={`cursor-pointer h-10 rounded-md border-2 ${
                            accentColor === "purple" ? "border-black dark:border-white" : "border-transparent"
                          } bg-purple-500`}
                          onClick={() => handleAccentColorChange("purple")}
                        />
                        <div
                          className={`cursor-pointer h-10 rounded-md border-2 ${
                            accentColor === "orange" ? "border-black dark:border-white" : "border-transparent"
                          } bg-orange-500`}
                          onClick={() => handleAccentColorChange("orange")}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Font Scaling</h3>
                      <div className="flex items-center">
                        <span className="text-sm mr-2">A</span>
                        <input 
                          type="range" 
                          min="1" 
                          max="3" 
                          step="1" 
                          defaultValue="2"
                          className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-lg ml-2">A</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Small</span>
                        <span className="text-xs text-muted-foreground">Normal</span>
                        <span className="text-xs text-muted-foreground">Large</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Layout Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Trade View</h4>
                            <p className="text-sm text-muted-foreground">Default view for trade listings</p>
                          </div>
                          <Select defaultValue="card">
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Layout style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="card">Card View</SelectItem>
                              <SelectItem value="table">Table View</SelectItem>
                              <SelectItem value="compact">Compact</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Chart Type</h4>
                            <p className="text-sm text-muted-foreground">Default chart style</p>
                          </div>
                          <Select defaultValue="candle">
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Chart style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="candle">Candlestick</SelectItem>
                              <SelectItem value="line">Line Chart</SelectItem>
                              <SelectItem value="ohlc">OHLC Bars</SelectItem>
                              <SelectItem value="area">Area Chart</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Chart Theme</h4>
                            <p className="text-sm text-muted-foreground">Default chart colors</p>
                          </div>
                          <Select defaultValue="tradingview">
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Chart theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tradingview">TradingView</SelectItem>
                              <SelectItem value="nightvision">Night Vision</SelectItem>
                              <SelectItem value="classic">Classic</SelectItem>
                              <SelectItem value="minimal">Minimal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Advanced Appearance</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Compact Navigation</h4>
                            <p className="text-sm text-muted-foreground">Reduce sidebar width</p>
                          </div>
                          <Switch />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Rounded Corners</h4>
                            <p className="text-sm text-muted-foreground">Use rounded UI elements</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Show Grid Lines</h4>
                            <p className="text-sm text-muted-foreground">In charts and tables</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button>Save Appearance Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        
          {/* Notifications Section */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications & Alerts</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications about your trades and journal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Notification Channels</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">In-App Notifications</h4>
                            <p className="text-sm text-muted-foreground">Show alerts within the app</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">Email Notifications</h4>
                            <p className="text-sm text-muted-foreground">Send alerts to john.doe@example.com</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">SMS Notifications</h4>
                            <p className="text-sm text-muted-foreground">Requires Pro/Elite subscription</p>
                          </div>
                        </div>
                        <Switch disabled={!isPremiumUser} />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <img 
                            src="https://placekitten.com/20/20" 
                            alt="Telegram" 
                            className="h-5 w-5 rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">Telegram Bot</h4>
                            <p className="text-sm text-muted-foreground">Not connected</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <img 
                            src="https://placekitten.com/20/20" 
                            alt="Discord" 
                            className="h-5 w-5 rounded-sm" 
                          />
                          <div>
                            <h4 className="font-medium">Discord Webhook</h4>
                            <p className="text-sm text-muted-foreground">Not connected</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Trade Import Results</h4>
                          <p className="text-sm text-muted-foreground">Success/failure of broker imports</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="notify-import" defaultChecked />
                          <Label htmlFor="notify-import">Enabled</Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Daily Summary</h4>
                          <p className="text-sm text-muted-foreground">Daily trading performance recap</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="notify-daily" defaultChecked />
                          <Label htmlFor="notify-daily">Enabled</Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Weekly Summary</h4>
                          <p className="text-sm text-muted-foreground">Weekly performance reports</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="notify-weekly" defaultChecked />
                          <Label htmlFor="notify-weekly">Enabled</Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Rule Break Alerts</h4>
                          <p className="text-sm text-muted-foreground">Notify when trading rules are broken</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="notify-rules" defaultChecked />
                          <Label htmlFor="notify-rules">Enabled</Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Setup Success</h4>
                          <p className="text-sm text-muted-foreground">When strategies hit target win rates</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="notify-setup" defaultChecked />
                          <Label htmlFor="notify-setup">Enabled</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Notification Schedule</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Quiet Hours</h4>
                          <p className="text-sm text-muted-foreground">Pause notifications during certain times</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="quiet-start">Start Time</Label>
                          <Select disabled defaultValue="22:00">
                            <SelectTrigger id="quiet-start">
                              <SelectValue placeholder="Start time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="22:00">10:00 PM</SelectItem>
                              <SelectItem value="23:00">11:00 PM</SelectItem>
                              <SelectItem value="00:00">12:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="quiet-end">End Time</Label>
                          <Select disabled defaultValue="07:00">
                            <SelectTrigger id="quiet-end">
                              <SelectValue placeholder="End time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="06:00">6:00 AM</SelectItem>
                              <SelectItem value="07:00">7:00 AM</SelectItem>
                              <SelectItem value="08:00">8:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Notification Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        
          {/* Trading Rules Section */}
          <TabsContent value="rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trading Rules & Checklists</CardTitle>
                <CardDescription>
                  Define your trading rules, setup checklists, and auto-tagging logic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Pre-Trade Checklist</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Checkbox id="rule-1" defaultChecked />
                        <Label htmlFor="rule-1">Market analysis completed</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="rule-2" defaultChecked />
                        <Label htmlFor="rule-2">Risk per trade calculated (1-2% max)</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="rule-3" defaultChecked />
                        <Label htmlFor="rule-3">Support/resistance levels identified</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="rule-4" defaultChecked />
                        <Label htmlFor="rule-4">Stop loss determined before entry</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="rule-5" defaultChecked />
                        <Label htmlFor="rule-5">Trading journal prepared</Label>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Input placeholder="Add new checklist item..." />
                      <Button variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Trading Rules</h3>
                    <div className="space-y-4 mb-4">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">No trading during first 30 minutes of market open</p>
                          <p className="text-sm text-muted-foreground">Avoid volatility at market open</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">Maximum loss per day: 3% of account</p>
                          <p className="text-sm text-muted-foreground">Stop trading after hitting daily loss limit</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">No revenge trading</p>
                          <p className="text-sm text-muted-foreground">Wait 1 hour after a loss before new trade</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Rule
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Auto-Tag Rules</h3>
                    <div className="space-y-4 mb-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Premarket Trades</h4>
                          <Badge>Active</Badge>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-md mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <span>IF</span>
                            <Select defaultValue="time">
                              <SelectTrigger className="h-7 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="time">Entry Time</SelectItem>
                                <SelectItem value="ticker">Ticker</SelectItem>
                                <SelectItem value="pnl">P&L</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select defaultValue="before">
                              <SelectTrigger className="h-7 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="before">before</SelectItem>
                                <SelectItem value="after">after</SelectItem>
                                <SelectItem value="equal">equal to</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input defaultValue="09:15" className="h-7 text-xs max-w-[80px]" />
                            <span>THEN</span>
                            <span>Tag as</span>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Premarket</Badge>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Duplicate</Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Oversized Loss</h4>
                          <Badge>Active</Badge>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-md mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <span>IF</span>
                            <Select defaultValue="pnl">
                              <SelectTrigger className="h-7 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="time">Entry Time</SelectItem>
                                <SelectItem value="ticker">Ticker</SelectItem>
                                <SelectItem value="pnl">P&L</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select defaultValue="less">
                              <SelectTrigger className="h-7 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="less">less than</SelectItem>
                                <SelectItem value="greater">greater than</SelectItem>
                                <SelectItem value="equal">equal to</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input defaultValue="-200" className="h-7 text-xs max-w-[80px]" />
                            <span>THEN</span>
                            <span>Tag as</span>
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Oversized</Badge>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Duplicate</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Auto-Tag Rule
                    </Button>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Rule Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        
          {/* AI Preferences Section */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Preferences & Journaling</CardTitle>
                <CardDescription>
                  Customize AI features and journaling behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">AI Features</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">AI Trade Summaries</h4>
                          <p className="text-sm text-muted-foreground">Generate automated trade insights</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Pattern Recognition</h4>
                          <p className="text-sm text-muted-foreground">Identify behavioral patterns in your trading</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Performance Forecasting</h4>
                          <p className="text-sm text-muted-foreground">Predictive analysis based on historical data</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ai-tone">AI Tone</Label>
                        <Select defaultValue="tactical">
                          <SelectTrigger id="ai-tone">
                            <SelectValue placeholder="Select AI tone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tactical">Tactical (Direct & Precise)</SelectItem>
                            <SelectItem value="friendly">Friendly (Supportive & Encouraging)</SelectItem>
                            <SelectItem value="motivational">Motivational (Challenging & Inspiring)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                          Sets the tone of AI generated insights and feedback
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Journaling Preferences</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="journal-mode">Journaling Mode</Label>
                        <Select defaultValue="guided">
                          <SelectTrigger id="journal-mode">
                            <SelectValue placeholder="Select journaling mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quick">Quick Log (Minimal fields)</SelectItem>
                            <SelectItem value="guided">Guided Prompts (Step-by-step)</SelectItem>
                            <SelectItem value="comprehensive">Comprehensive (All fields)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                          Default journaling interface style
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Voice-to-Text</h4>
                          <p className="text-sm text-muted-foreground">Enable voice dictation for journal entries</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Journal Reminders</h4>
                          <p className="text-sm text-muted-foreground">Prompt to journal after trades are detected</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Auto-Expand Screenshot Area</h4>
                          <p className="text-sm text-muted-foreground">Automatically show chart upload area</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Replay Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Enable Trade Replay</h4>
                          <p className="text-sm text-muted-foreground">Record and replay trade execution</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Auto-Capture Key Moments</h4>
                          <p className="text-sm text-muted-foreground">Record entry/exit points automatically</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Include Voice Notes</h4>
                          <p className="text-sm text-muted-foreground">Record audio during trade replay</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save AI & Journaling Preferences</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        
          {/* Reports Section */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports Preferences</CardTitle>
                <CardDescription>
                  Customize how reports are generated and displayed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Default Report Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="default-timeframe">Default Timeframe</Label>
                        <Select defaultValue="weekly">
                          <SelectTrigger id="default-timeframe">
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="ytd">Year to Date</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="comparison-basis">Compare To</Label>
                        <Select defaultValue="previous">
                          <SelectTrigger id="comparison-basis">
                            <SelectValue placeholder="Select comparison" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="previous">Previous Period</SelectItem>
                            <SelectItem value="bestWeek">Best Week</SelectItem>
                            <SelectItem value="bestMonth">Best Month</SelectItem>
                            <SelectItem value="custom">Custom Date Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Key Metrics to Highlight</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <Checkbox id="metric-pnl" defaultChecked />
                        <Label htmlFor="metric-pnl">P&L ($ and %)</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="metric-winrate" defaultChecked />
                        <Label htmlFor="metric-winrate">Win Rate</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="metric-rr" defaultChecked />
                        <Label htmlFor="metric-rr">Risk/Reward Ratio</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="metric-trades" defaultChecked />
                        <Label htmlFor="metric-trades">Number of Trades</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="metric-setup" defaultChecked />
                        <Label htmlFor="metric-setup">Best/Worst Setup</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="metric-ticker" defaultChecked />
                        <Label htmlFor="metric-ticker">Most Traded Ticker</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="metric-execution" />
                        <Label htmlFor="metric-execution">Avg Execution Score</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="metric-mistakes" />
                        <Label htmlFor="metric-mistakes">Most Frequent Mistakes</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="metric-growth" />
                        <Label htmlFor="metric-growth">Strategy with Most Growth</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="metric-emotion" />
                        <Label htmlFor="metric-emotion">Emotion Summary</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Performance Goals</h3>
                    <div className="space-y-4">
                      <div className="space-y-2 p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="font-medium">Increase win rate to {'>'}65%</span>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Achieved: 68.5%</Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            <span className="font-medium">Reduce drawdown to less than 5%</span>
                          </div>
                          <Badge variant="outline" className="bg-amber-50 text-amber-700">In Progress: 6.2%</Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <X className="h-5 w-5 text-red-500" />
                            <span className="font-medium">$1,000 weekly profit target</span>
                          </div>
                          <Badge variant="outline" className="bg-red-50 text-red-700">Not Met: $650</Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Goal
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">PDF Branding Options</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Include Logo</h4>
                          <p className="text-sm text-muted-foreground">Add your logo to exported reports</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Display Username</h4>
                          <p className="text-sm text-muted-foreground">Show your name/handle on reports</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Include Date & Time</h4>
                          <p className="text-sm text-muted-foreground">Add generation timestamp to reports</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Report Preferences</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        
          {/* Security Section */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security & Privacy</CardTitle>
                <CardDescription>
                  Manage security settings and privacy preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Account Security</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <Button variant={isPremiumUser ? "outline" : "secondary"} disabled={!isPremiumUser}>
                          {isPremiumUser ? "Enable 2FA" : "Premium Feature"}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <h4 className="font-medium">Login Alerts</h4>
                          <p className="text-sm text-muted-foreground">Notify when account is accessed from new device</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <h4 className="font-medium">Session Timeout</h4>
                          <p className="text-sm text-muted-foreground">Auto-logout after period of inactivity</p>
                        </div>
                        <Select defaultValue="60">
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Timeout" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="240">4 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Privacy Mode</h4>
                          <p className="text-sm text-muted-foreground">Blur P&L in shared views and screenshots</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sharing-pref">Trade Sharing Controls</Label>
                        <Select defaultValue="private">
                          <SelectTrigger id="sharing-pref">
                            <SelectValue placeholder="Select sharing preference" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public (Anyone can view)</SelectItem>
                            <SelectItem value="restricted">Restricted (Selected tags only)</SelectItem>
                            <SelectItem value="time-limited">Time Limited (Auto-expire)</SelectItem>
                            <SelectItem value="private">Private (Only you)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                          Default visibility for trade data
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Analytics Tracking</h4>
                          <p className="text-sm text-muted-foreground">Anonymous usage data to improve features</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Data Backup</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="backup-freq">Backup Frequency</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="backup-freq">
                            <SelectValue placeholder="Select backup frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="manual">Manual Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <h4 className="font-medium">Manual Backup</h4>
                          <p className="text-sm text-muted-foreground">Create backup of all trading data</p>
                        </div>
                        <Button variant="outline">
                          <Database className="h-4 w-4 mr-2" />
                          Backup Now
                        </Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <RefreshCcw className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium">Last Backup: April 20, 2025 (10:45 AM)</h4>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Your data is backed up to our secure cloud storage
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Save Security Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        
          {/* Developer Section */}
          <TabsContent value="developer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Developer Options</CardTitle>
                <CardDescription>
                  API access and developer-focused features for Pro/Elite users
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isPremiumUser ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">API Keys</h3>
                      <div className="p-4 border rounded-lg space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Your API Key</h4>
                            <Badge>Active</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="password" 
                              value="sk_live_TraderJournal2025APIKey" 
                              className="font-mono"
                              readOnly
                            />
                            <Button variant="outline" size="icon">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Created on: April 15, 2025 &bull; Last used: Today
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Button variant="destructive">
                            Revoke API Key
                          </Button>
                          <Button variant="outline">
                            Generate New Key
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Webhooks</h3>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Zapier Integration</h4>
                            <Badge>Active</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">
                            Connect to 3,000+ apps via Zapier
                          </p>
                          <div className="flex items-center gap-3">
                            <Input 
                              value="https://hooks.zapier.com/hooks/catch/12345/abcdef/" 
                              className="font-mono text-xs"
                              readOnly
                            />
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </div>
                        
                        <Button variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Webhook
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">MT5 Bridge Configuration</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="mt5-server">MT5 Server Address</Label>
                            <Input id="mt5-server" placeholder="e.g., mt5-demo.exness.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mt5-port">Port</Label>
                            <Input id="mt5-port" placeholder="443" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="mt5-login">Login ID</Label>
                            <Input id="mt5-login" placeholder="MT5 Account Number" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mt5-password">Password</Label>
                            <Input id="mt5-password" type="password" placeholder="•••••••••••" />
                          </div>
                        </div>
                        
                        <Button>Connect MT5</Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">API Documentation</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">REST API Documentation</h4>
                            <p className="text-sm text-muted-foreground">
                              Full API reference for building integrations
                            </p>
                          </div>
                          <Button variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            View Docs
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Schema Documentation</h4>
                            <p className="text-sm text-muted-foreground">
                              Database schema for custom reporting
                            </p>
                          </div>
                          <Button variant="outline">
                            <Database className="h-4 w-4 mr-2" />
                            View Schema
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-6">
                    <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed rounded-lg">
                      <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Developer Options Locked</h3>
                      <p className="text-muted-foreground mb-4 max-w-md">
                        API access, webhooks, and developer features are available exclusively for Pro and Elite subscribers.
                      </p>
                      <Button>
                        Upgrade to Pro
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
