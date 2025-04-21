import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  CreditCard, 
  Link, 
  Palette, 
  Bell, 
  CheckSquare, 
  Bot, 
  BarChart, 
  Shield, 
  Code
} from "lucide-react";

// Rename the imported Settings to avoid conflict
// The error was: Import declaration conflicts with local declaration of 'Settings'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-background border overflow-auto w-full flex justify-start gap-2 p-1">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <CreditCard size={16} />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Link size={16} />
            <span>Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette size={16} />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell size={16} />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="trading-rules" className="flex items-center gap-2">
            <CheckSquare size={16} />
            <span>Trading Rules</span>
          </TabsTrigger>
          <TabsTrigger value="ai-preferences" className="flex items-center gap-2">
            <Bot size={16} />
            <span>AI Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart size={16} />
            <span>Reports</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="developer" className="flex items-center gap-2">
            <Code size={16} />
            <span>Developer</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Section */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Upload Photo</Button>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Time Zone</Label>
                      <Select defaultValue="utc">
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
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="market-timezone">Default Trading Time Zone</Label>
                      <Select defaultValue="est">
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
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="asset-class">Preferred Asset Class</Label>
                    <Select defaultValue="equities">
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
                  
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="account-type">Account Type</Label>
                    <Select defaultValue="retail">
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
                  
                  <div className="pt-4">
                    <Button>Save Profile</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Section */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Current Plan</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xl font-bold">Pro</span>
                        <Badge variant="success">Active</Badge>
                      </div>
                    </div>
                    <Button variant="outline">Manage Subscription</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium">Linked Devices</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">Chrome on Windows</p>
                        <p className="text-sm text-muted-foreground">Last active: Today</p>
                      </div>
                      <Badge>Current</Badge>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">Safari on iPhone</p>
                        <p className="text-sm text-muted-foreground">Last active: Yesterday</p>
                      </div>
                      <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Logout from all devices</Button>
                </div>
                
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium">Data Management</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">Export as JSON</Button>
                    <Button variant="outline" size="sm">Export as CSV</Button>
                    <Button variant="outline" size="sm">Export as PDF</Button>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm font-medium mb-2">Import from other platforms</p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">Tradervue</Button>
                      <Button variant="outline" size="sm">TraderSync</Button>
                      <Button variant="outline" size="sm">Edgewonk</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placeholder for other tabs */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Broker & Platform Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Configure your broker integrations here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Placeholders for remaining tabs */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance & UI Customization</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Customize the app appearance here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications & Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage your notification preferences here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trading-rules">
          <Card>
            <CardHeader>
              <CardTitle>Trading Rules & Checklists</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Configure your trading rules here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-preferences">
          <Card>
            <CardHeader>
              <CardTitle>AI Preferences & Journaling Configs</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage AI behavior and journaling configurations here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Configure your reporting preferences here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security & Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage your security settings here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="developer">
          <Card>
            <CardHeader>
              <CardTitle>Developer / API Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Access developer tools and API configurations here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
