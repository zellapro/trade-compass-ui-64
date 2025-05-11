
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Calendar, Clock, ExternalLink, Save } from "lucide-react";

const AdvancedFeatures: React.FC<{
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}> = ({ onSettingChange, saveResetButtons }) => {
  // Focus Mode States
  const [focusModeEnabled, setFocusModeEnabled] = useState(false);
  const [showTradingChecklist, setShowTradingChecklist] = useState(true);
  const [showTradeJournal, setShowTradeJournal] = useState(true);
  const [hidePnL, setHidePnL] = useState(false);
  const [showSessionTimer, setShowSessionTimer] = useState(true);
  const [allowNotifications, setAllowNotifications] = useState(true);

  // Market Sessions States
  const [marketSessions, setMarketSessions] = useState([
    { id: "1", market: "NSE", hours: "09:15 - 15:30", timezone: "Asia/Kolkata", tradingDays: "Mon-Fri" },
    { id: "2", market: "NYSE", hours: "09:30 - 16:00", timezone: "America/New_York", tradingDays: "Mon-Fri" },
    { id: "3", market: "Crypto", hours: "00:00 - 23:59", timezone: "UTC", tradingDays: "All Days" },
  ]);
  const [newMarketName, setNewMarketName] = useState("");
  const [newOpenTime, setNewOpenTime] = useState("");
  const [newCloseTime, setNewCloseTime] = useState("");
  const [newTimezone, setNewTimezone] = useState("UTC");
  const [newTradingDays, setNewTradingDays] = useState("");
  const [autoSyncCalendars, setAutoSyncCalendars] = useState(false);

  // External Integrations States
  const [zapierWebhookUrl, setZapierWebhookUrl] = useState("");
  const [isWebhookTesting, setIsWebhookTesting] = useState(false);

  // Event Handlers
  const saveFocusMode = () => {
    toast.success("Focus mode settings saved");
    onSettingChange();
  };

  const saveMarketSession = () => {
    if (!newMarketName || !newOpenTime || !newCloseTime || !newTradingDays) {
      toast.error("Please fill in all market session fields");
      return;
    }

    const newSession = {
      id: Date.now().toString(),
      market: newMarketName,
      hours: `${newOpenTime} - ${newCloseTime}`,
      timezone: newTimezone,
      tradingDays: newTradingDays,
    };

    setMarketSessions([...marketSessions, newSession]);
    setNewMarketName("");
    setNewOpenTime("");
    setNewCloseTime("");
    setNewTradingDays("");
    toast.success("Market session saved");
    onSettingChange();
  };

  const addHoliday = () => {
    toast.info("Holiday functionality to be implemented");
  };

  const connectCalendar = () => {
    toast.info("Google Calendar connection to be implemented");
  };

  const connectNotion = () => {
    toast.info("Notion connection to be implemented");
  };

  const testZapierConnection = () => {
    if (!zapierWebhookUrl) {
      toast.error("Please enter a Zapier webhook URL");
      return;
    }

    setIsWebhookTesting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Test connection successful");
      setIsWebhookTesting(false);
    }, 1500);
  };

  const saveZapierWebhook = () => {
    if (!zapierWebhookUrl) {
      toast.error("Please enter a Zapier webhook URL");
      return;
    }
    
    toast.success("Zapier webhook saved");
    onSettingChange();
  };

  return (
    <div className="space-y-8">
      {/* Focus Mode */}
      <Card className="border">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Focus Mode</CardTitle>
          <CardDescription>
            Streamline the interface for distraction-free trading
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable Focus Mode</p>
              <p className="text-sm text-muted-foreground">
                Hide analytics and show only essential features during active trading
              </p>
            </div>
            <Switch 
              checked={focusModeEnabled} 
              onCheckedChange={setFocusModeEnabled}
            />
          </div>

          <div className="space-y-3 mt-4">
            <h3 className="text-lg font-medium text-center">Focus Mode Settings</h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-checklist">Show trading checklist</Label>
              <Switch 
                id="show-checklist"
                checked={showTradingChecklist} 
                onCheckedChange={setShowTradingChecklist}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-journal">Show trade journal</Label>
              <Switch 
                id="show-journal"
                checked={showTradeJournal} 
                onCheckedChange={setShowTradeJournal}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="hide-pnl">Hide P&L during trading</Label>
              <Switch 
                id="hide-pnl"
                checked={hidePnL} 
                onCheckedChange={setHidePnL}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="show-timer">Show session timer</Label>
              <Switch 
                id="show-timer"
                checked={showSessionTimer} 
                onCheckedChange={setShowSessionTimer}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="allow-notifications">Allow important notifications</Label>
              <Switch 
                id="allow-notifications"
                checked={allowNotifications} 
                onCheckedChange={setAllowNotifications}
              />
            </div>
            
            <div className="flex justify-end mt-4">
              <Button onClick={saveFocusMode}>
                <Save className="mr-2 h-4 w-4" />
                Save Focus Mode Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Sessions */}
      <Card className="border">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Market Sessions</CardTitle>
          <CardDescription>
            Configure market sessions and holidays
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Market Sessions Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 text-sm font-medium">Market</th>
                  <th className="text-left p-3 text-sm font-medium">Hours</th>
                  <th className="text-left p-3 text-sm font-medium">Timezone</th>
                  <th className="text-left p-3 text-sm font-medium">Trading Days</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {marketSessions.map((session) => (
                  <tr key={session.id}>
                    <td className="p-3">{session.market}</td>
                    <td className="p-3">{session.hours}</td>
                    <td className="p-3">{session.timezone}</td>
                    <td className="p-3">{session.tradingDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Market Session */}
          <div className="pt-4">
            <h3 className="text-lg font-medium mb-4">Add Market Session</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="market-name">Market Name</Label>
                <Input 
                  id="market-name"
                  placeholder="e.g., LSE, FX Tokyo"
                  value={newMarketName}
                  onChange={(e) => setNewMarketName(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="open-time">Open Time</Label>
                  <div className="relative">
                    <Input 
                      id="open-time"
                      type="time"
                      value={newOpenTime}
                      onChange={(e) => setNewOpenTime(e.target.value)}
                    />
                    <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="close-time">Close Time</Label>
                  <div className="relative">
                    <Input 
                      id="close-time"
                      type="time"
                      value={newCloseTime}
                      onChange={(e) => setNewCloseTime(e.target.value)}
                    />
                    <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <select 
                  id="timezone"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={newTimezone}
                  onChange={(e) => setNewTimezone(e.target.value)}
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="Australia/Sydney">Australia/Sydney</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="trading-days">Trading Days</Label>
                <Input 
                  id="trading-days"
                  placeholder="e.g., Mon-Fri, All Days"
                  value={newTradingDays}
                  onChange={(e) => setNewTradingDays(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={saveMarketSession}>
                <Clock className="mr-2 h-4 w-4" />
                Save Market Session
              </Button>
            </div>
          </div>

          {/* Market Holidays */}
          <div className="pt-4 border-t mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Market Holidays</h3>
              <Button onClick={addHoliday} variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Add Holiday
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <div>
                <p className="font-medium">Auto-sync Market Calendars</p>
                <p className="text-sm text-muted-foreground">
                  Automatically synchronize market holidays and trading hours
                </p>
              </div>
              <Switch 
                checked={autoSyncCalendars} 
                onCheckedChange={setAutoSyncCalendars}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* External Integrations */}
      <Card className="border">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">External Integrations</CardTitle>
          <CardDescription>
            Connect with external services and tools
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Google Calendar */}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <h3 className="font-medium">Google Calendar</h3>
              <p className="text-sm text-muted-foreground">
                Sync trading sessions and reminders with Google Calendar
              </p>
            </div>
            <Button variant="outline" onClick={connectCalendar}>
              <Calendar className="mr-2 h-4 w-4" /> 
              Connect Calendar
            </Button>
          </div>
          
          {/* Notion */}
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <h3 className="font-medium">Notion</h3>
              <p className="text-sm text-muted-foreground">
                Sync journal entries and trading plan with Notion
              </p>
            </div>
            <Button variant="outline" onClick={connectNotion}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Connect Notion
            </Button>
          </div>
          
          {/* Zapier */}
          <div className="py-3">
            <div>
              <h3 className="font-medium mb-1">Zapier Integration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect to hundreds of apps via Zapier
              </p>
            </div>
            
            <div className="mb-1">
              <Label htmlFor="zapier-webhook">Zapier Webhook URL</Label>
            </div>
            <div className="flex gap-2 mb-1">
              <Input 
                id="zapier-webhook"
                placeholder="https://hooks.zapier.com/..."
                value={zapierWebhookUrl}
                onChange={(e) => setZapierWebhookUrl(e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Create a webhook in Zapier and paste the URL here
            </p>
            
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={testZapierConnection}
                disabled={isWebhookTesting}
              >
                {isWebhookTesting ? "Testing..." : "Test Connection"}
              </Button>
              <Button onClick={saveZapierWebhook}>
                Save Webhook
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {saveResetButtons}
    </div>
  );
};

export default AdvancedFeatures;
