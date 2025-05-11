
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Session {
  id: string;
  deviceName: string;
  lastActive: string;
  isCurrent: boolean;
}

interface ActiveSessionsPanelProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const ActiveSessionsPanel: React.FC<ActiveSessionsPanelProps> = ({ 
  onSettingChange,
  saveResetButtons
}) => {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "session1",
      deviceName: "Chrome on Windows",
      lastActive: "Just now",
      isCurrent: true
    },
    {
      id: "session2",
      deviceName: "Safari on MacBook Pro",
      lastActive: "2 days ago",
      isCurrent: false
    },
    {
      id: "session3",
      deviceName: "iPhone App",
      lastActive: "1 week ago",
      isCurrent: false
    }
  ]);

  const handleLogout = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      if (session.isCurrent) {
        toast({
          title: "Cannot log out current session",
          description: "You are currently using this device.",
          variant: "destructive"
        });
        return;
      }
      
      setSessions(sessions.filter(s => s.id !== sessionId));
      toast({
        title: "Session terminated",
        description: `Successfully logged out of ${session.deviceName}.`
      });
      onSettingChange();
    }
  };

  const handleLogoutAll = () => {
    const otherSessions = sessions.filter(s => !s.isCurrent);
    if (otherSessions.length === 0) {
      toast({
        title: "No other sessions",
        description: "There are no other active sessions to log out from.",
      });
      return;
    }
    
    setSessions(sessions.filter(s => s.isCurrent));
    toast({
      title: "All other sessions terminated",
      description: "Successfully logged out from all other devices."
    });
    onSettingChange();
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle>Active Sessions</CardTitle>
        <CardDescription>Manage your connected devices and sessions</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        {sessions.map((session) => (
          <div 
            key={session.id}
            className={`border rounded-lg p-4 ${session.isCurrent ? 'border-green-500/50 bg-green-500/5 dark:bg-green-500/10' : ''}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{session.deviceName}</h3>
                  {session.isCurrent && (
                    <span className="bg-green-600/20 text-green-600 text-xs px-2 py-0.5 rounded">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Last active: {session.lastActive}</p>
              </div>
              
              {!session.isCurrent && (
                <Button variant="outline" onClick={() => handleLogout(session.id)}>
                  Logout
                </Button>
              )}
            </div>
          </div>
        ))}
        
        <div className="flex justify-end mt-6">
          <Button 
            variant="destructive" 
            onClick={handleLogoutAll}
            disabled={sessions.filter(s => !s.isCurrent).length === 0}
          >
            Logout All Other Devices
          </Button>
        </div>
        
        <div className="flex justify-end">
          {saveResetButtons}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveSessionsPanel;
