
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LockKeyhole, ShieldCheck, KeyRound, Fingerprint, BellRing, ShieldAlert, EyeOff, Eye, FileKey, Clock, Lock } from "lucide-react";

interface SecuritySettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    onSettingChange();
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>Manage your password and authentication settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <LockKeyhole className="h-5 w-5 text-muted-foreground" />
              <span>Password Management</span>
            </h3>
            
            <div className="grid gap-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter a new password"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                  />
                </div>
              </div>
              
              <Button onClick={onSettingChange} className="w-fit">Update Password</Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <span>Two-Factor Authentication (2FA)</span>
            </h3>
            
            <div className="flex justify-between items-start border rounded-lg p-4">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={toggleTwoFactor} />
            </div>
            
            {twoFactorEnabled && (
              <div className="border rounded-lg p-4 space-y-4">
                <div>
                  <Label htmlFor="2fa-method">Authentication Method</Label>
                  <Select defaultValue="authenticator">
                    <SelectTrigger id="2fa-method" className="mt-1">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="authenticator">
                        <div className="flex items-center gap-2">
                          <KeyRound className="h-4 w-4" />
                          <span>Authenticator App</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="email">
                        <div className="flex items-center gap-2">
                          <FileKey className="h-4 w-4" />
                          <span>Email Code</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="sms">
                        <div className="flex items-center gap-2">
                          <Fingerprint className="h-4 w-4" />
                          <span>SMS Code</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h4 className="font-medium">Setup Instructions</h4>
                  <ol className="list-decimal list-inside text-sm space-y-2 mt-2">
                    <li>Download an authenticator app like Google Authenticator or Authy</li>
                    <li>Scan the QR code below with your authenticator app</li>
                    <li>Enter the 6-digit code from your app to verify</li>
                  </ol>
                  
                  <div className="mt-4 bg-white p-4 w-fit mx-auto rounded-lg border">
                    <div className="w-32 h-32 bg-muted rounded flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">QR Code Placeholder</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Label htmlFor="verification-code">Verification Code</Label>
                    <div className="flex gap-2 mt-1">
                      <Input id="verification-code" placeholder="Enter 6-digit code" maxLength={6} />
                      <Button>Verify</Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="remember-device">Remember this device</Label>
                    <p className="text-sm text-muted-foreground">
                      Don't ask for 2FA on this device for 30 days
                    </p>
                  </div>
                  <Switch id="remember-device" onChange={onSettingChange} />
                </div>
              </div>
            )}
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <BellRing className="h-5 w-5 text-muted-foreground" />
              <span>Login Alerts</span>
            </h3>
            
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <h4 className="font-medium">New Device Login Alerts</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Get notified when your account is accessed from a new device
                </p>
              </div>
              <Switch defaultChecked onChange={onSettingChange} />
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Alert Methods</h4>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="alert-email" defaultChecked onChange={onSettingChange} />
                  <Label htmlFor="alert-email">Email Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="alert-sms" onChange={onSettingChange} />
                  <Label htmlFor="alert-sms">SMS Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="alert-app" defaultChecked onChange={onSettingChange} />
                  <Label htmlFor="alert-app">In-App Alerts</Label>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-muted-foreground" />
              <span>Privacy Settings</span>
            </h3>
            
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <h4 className="font-medium">Privacy Mode</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Blur sensitive information like P&L in shared views
                </p>
              </div>
              <Switch onChange={onSettingChange} />
            </div>
            
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <h4 className="font-medium">Trade Sharing</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Control how your trades can be shared
                </p>
              </div>
              <Select defaultValue="private">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private Only</SelectItem>
                  <SelectItem value="shared">Selective Sharing</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <h4 className="font-medium">Auto-Backup Frequency</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  How often your data is automatically backed up
                </p>
              </div>
              <Select defaultValue="daily">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>Session Security</span>
            </h3>
            
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <h4 className="font-medium">Auto-Logout After Inactivity</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Automatically log out after a period of inactivity
                </p>
              </div>
              <Select defaultValue="30">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <h4 className="font-medium">Session Lock</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Require password re-entry for sensitive actions
                </p>
              </div>
              <Switch defaultChecked onChange={onSettingChange} />
            </div>
          </div>
          
          <Separator />
          
          <div className="border rounded-lg p-4 border-red-200 bg-red-50 space-y-4">
            <h3 className="font-medium text-red-600 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              <span>Danger Zone</span>
            </h3>
            
            <p className="text-sm text-red-600">
              These actions are irreversible and should be used with caution
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                Delete All Trades
              </Button>
              
              <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                Delete Account
              </Button>
            </div>
          </div>
          
          {saveResetButtons}
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
