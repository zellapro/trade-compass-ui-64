
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Laptop, Smartphone, Clock, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LinkedDevicesProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

interface Device {
  id: string;
  name: string;
  type: "desktop" | "mobile" | "tablet";
  lastLogin: string;
  ip: string;
  trusted: boolean;
  note: string;
  isCurrentDevice: boolean;
}

const LinkedDevices: React.FC<LinkedDevicesProps> = ({
  onSettingChange,
  saveResetButtons,
}) => {
  const { toast } = useToast();
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "device1",
      name: "Windows 10 / Chrome",
      type: "desktop",
      lastLogin: "2025-05-10T08:30:00",
      ip: "192.168.1.1",
      trusted: true,
      note: "Main work laptop",
      isCurrentDevice: true,
    },
    {
      id: "device2",
      name: "iPhone 15 / Safari",
      type: "mobile",
      lastLogin: "2025-05-09T14:22:00",
      ip: "172.16.0.1",
      trusted: false,
      note: "",
      isCurrentDevice: false,
    },
    {
      id: "device3",
      name: "MacBook Pro / Firefox",
      type: "desktop",
      lastLogin: "2025-05-08T11:15:00",
      ip: "10.0.0.1",
      trusted: true,
      note: "Home MacBook",
      isCurrentDevice: false,
    }
  ]);

  const [showIPs, setShowIPs] = useState(false);
  const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState("");

  const handleToggleTrusted = (deviceId: string) => {
    const updatedDevices = devices.map(device => 
      device.id === deviceId 
        ? { ...device, trusted: !device.trusted } 
        : device
    );
    setDevices(updatedDevices);
    onSettingChange();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium', 
      timeStyle: 'short'
    }).format(date);
  };

  const handleRevokeDevice = (deviceId: string) => {
    const deviceToRevoke = devices.find(device => device.id === deviceId);
    if (!deviceToRevoke) return;

    if (deviceToRevoke.isCurrentDevice) {
      toast({
        title: "Cannot revoke current device",
        description: "You cannot revoke the device you're currently using.",
        variant: "destructive"
      });
      return;
    }

    const updatedDevices = devices.filter(device => device.id !== deviceId);
    setDevices(updatedDevices);
    toast({
      title: "Device revoked",
      description: `Access revoked for ${deviceToRevoke.name}`,
    });
    onSettingChange();
  };

  const startEditNote = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    if (device) {
      setEditNote(device.note);
      setEditingDeviceId(deviceId);
    }
  };

  const saveNote = () => {
    if (!editingDeviceId) return;
    
    const updatedDevices = devices.map(device =>
      device.id === editingDeviceId
        ? { ...device, note: editNote }
        : device
    );
    
    setDevices(updatedDevices);
    setEditingDeviceId(null);
    setEditNote("");
    toast({
      title: "Note updated",
      description: "Device note has been updated successfully",
    });
    onSettingChange();
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "desktop":
        return <Laptop className="h-4 w-4" />;
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Laptop className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Connected Devices</CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="show-ip" className="text-sm">Show IP Addresses</Label>
              <Switch
                id="show-ip"
                checked={showIPs}
                onCheckedChange={setShowIPs}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Device</TableHead>
                  <TableHead className="w-[180px]">Last Login</TableHead>
                  <TableHead className="w-[150px]">IP Address</TableHead>
                  <TableHead className="w-[100px]">Trusted</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {getDeviceIcon(device.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            {device.name}
                            {device.isCurrentDevice && (
                              <span className="bg-green-600/20 text-green-600 text-[10px] px-1 py-0.5 rounded">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {device.type.charAt(0).toUpperCase() + device.type.slice(1)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(device.lastLogin)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {showIPs ? device.ip : "•••.•••.•.•"}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={device.trusted}
                        onCheckedChange={() => handleToggleTrusted(device.id)}
                      />
                    </TableCell>
                    <TableCell>
                      {editingDeviceId === device.id ? (
                        <div className="flex gap-2">
                          <Input
                            value={editNote}
                            onChange={(e) => setEditNote(e.target.value)}
                            placeholder="Add note for this device"
                            className="h-8"
                          />
                          <Button size="sm" onClick={saveNote} variant="outline" className="h-8">
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-sm">
                            {device.note || <span className="text-muted-foreground italic">No note</span>}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => startEditNote(device.id)} 
                            className="h-7 px-2"
                          >
                            Edit
                          </Button>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRevokeDevice(device.id)}
                        disabled={device.isCurrentDevice}
                      >
                        Revoke
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {saveResetButtons}
    </div>
  );
};

export default LinkedDevices;
