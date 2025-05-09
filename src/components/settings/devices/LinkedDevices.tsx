
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Laptop, Smartphone, Tablet, Shield, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Device {
  id: string;
  name: string;
  os: string;
  browser: string;
  isCurrentDevice: boolean;
  lastLogin: string;
  ip: string;
  location: string;
  icon: "laptop" | "smartphone" | "tablet";
}

interface LinkedDevicesProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const LinkedDevices: React.FC<LinkedDevicesProps> = ({ 
  onSettingChange,
  saveResetButtons
}) => {
  const { toast } = useToast();
  const [showIp, setShowIp] = useState(false);
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "device1",
      name: "MacBook Pro 16\"",
      os: "macOS 13.1",
      browser: "Chrome 111",
      isCurrentDevice: true,
      lastLogin: "Now",
      ip: "103.91.156.XX",
      location: "Mumbai, India",
      icon: "laptop"
    },
    {
      id: "device2",
      name: "iPhone 15 Pro",
      os: "iOS 17.4",
      browser: "Safari Mobile",
      isCurrentDevice: false,
      lastLogin: "2 hours ago",
      ip: "103.91.156.XX",
      location: "Mumbai, India",
      icon: "smartphone"
    },
    {
      id: "device3",
      name: "Windows PC",
      os: "Windows 11",
      browser: "Edge 111",
      isCurrentDevice: false,
      lastLogin: "Yesterday",
      ip: "49.35.12.XX",
      location: "Delhi, India",
      icon: "laptop"
    },
    {
      id: "device4",
      name: "iPad Pro",
      os: "iPadOS 17.3",
      browser: "Safari",
      isCurrentDevice: false,
      lastLogin: "3 days ago",
      ip: "157.45.139.XX",
      location: "Bangalore, India",
      icon: "tablet"
    }
  ]);

  const handleRevokeDevice = (deviceId: string) => {
    setDevices(devices.filter(device => device.id !== deviceId));
    toast({
      title: "Device revoked",
      description: "This device will no longer have access to your account.",
      variant: "default",
    });
    onSettingChange();
  };
  
  const getDeviceIcon = (icon: string) => {
    switch (icon) {
      case "laptop": return <Laptop className="h-5 w-5" />;
      case "smartphone": return <Smartphone className="h-5 w-5" />;
      case "tablet": return <Tablet className="h-5 w-5" />;
      default: return <Laptop className="h-5 w-5" />;
    }
  };

  const toggleIpVisibility = () => {
    setShowIp(!showIp);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Linked Devices</CardTitle>
            <CardDescription>
              Manage devices that are currently signed in to your account
            </CardDescription>
          </div>
          <Button variant="outline" onClick={toggleIpVisibility} size="sm" className="flex gap-1 items-center">
            {showIp ? (
              <>
                <EyeOff className="h-4 w-4" />
                Hide IPs
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Show IPs
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {devices.map((device) => (
            <div 
              key={device.id} 
              className={`border rounded-lg p-4 ${device.isCurrentDevice ? "border-primary/50 bg-primary/5" : ""}`}
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    {getDeviceIcon(device.icon)}
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {device.name}
                      {device.isCurrentDevice && (
                        <Badge variant="outline" className="text-xs text-primary border-primary">
                          Current Device
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {device.os} • {device.browser}
                    </div>
                  </div>
                </div>
                
                {!device.isCurrentDevice && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRevokeDevice(device.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    Revoke
                  </Button>
                )}
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between text-sm">
                <div className="space-y-1">
                  <div className="text-muted-foreground">Last Login</div>
                  <div>{device.lastLogin}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Location</div>
                  <div>{device.location}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">IP Address</div>
                  <div>{showIp ? device.ip.replace("XX", "234") : device.ip}</div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Your account is currently signed in on {devices.length} devices</span>
            </div>
            <Button variant="destructive" size="sm">Revoke All Devices</Button>
          </div>
          
          <div className="flex justify-end mt-4">
            {saveResetButtons}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkedDevices;
