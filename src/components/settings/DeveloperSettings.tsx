
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DatePickerWithRange 
} from "@/components/ui/date-range-picker";
import {
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Key, 
  KeyRound, 
  Webhook, 
  FileJson, 
  FileCode, 
  LinkIcon, 
  BarChart, 
  Zap,
  Copy, 
  Trash2, 
  Plus, 
  RefreshCcw, 
  Filter, 
  ExternalLink,
  Lock
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface DeveloperSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

// Mock data for API keys
const mockApiKeys = [
  { 
    id: "1", 
    name: "Trading Bot", 
    key: "sk_live_TradeJournalAPI_9f8d3a2e71b54c8",
    created: "2023-12-15", 
    permissions: ["read", "write"],
    status: "active"
  },
  { 
    id: "2", 
    name: "Analytics Dashboard", 
    key: "sk_live_TradeJournalAPI_7e5d1b8f32a61d9",
    created: "2024-03-22", 
    permissions: ["read", "analytics"],
    status: "active"
  },
  { 
    id: "3", 
    name: "Mobile App", 
    key: "sk_live_TradeJournalAPI_4c8b2e9a76d53f1",
    created: "2024-04-10", 
    permissions: ["read", "write", "analytics"],
    status: "active"
  }
];

// Mock data for webhooks
const mockWebhooks = [
  {
    id: "1",
    name: "Trade Notification",
    url: "https://myapp.com/webhooks/trades",
    events: ["trade_created", "trade_updated"],
    status: "active"
  },
  {
    id: "2",
    name: "Journal Entry Webhook",
    url: "https://myapp.com/webhooks/journal",
    events: ["journal_entry_added"],
    status: "active"
  }
];

// Mock data for API activity logs
const mockApiLogs = [
  {
    id: "1",
    timestamp: "2024-05-10 09:15:22",
    endpoint: "/api/v1/trades",
    method: "GET",
    apiKey: "Trading Bot",
    status: 200
  },
  {
    id: "2",
    timestamp: "2024-05-10 09:16:05",
    endpoint: "/api/v1/trades/123",
    method: "PUT",
    apiKey: "Trading Bot",
    status: 200
  },
  {
    id: "3",
    timestamp: "2024-05-10 09:18:42",
    endpoint: "/api/v1/analytics/summary",
    method: "GET",
    apiKey: "Analytics Dashboard",
    status: 200
  },
  {
    id: "4",
    timestamp: "2024-05-10 09:20:18",
    endpoint: "/api/v1/trades/bulk",
    method: "POST",
    apiKey: "Mobile App",
    status: 201
  },
  {
    id: "5",
    timestamp: "2024-05-10 09:22:33",
    endpoint: "/api/v1/webhooks/test",
    method: "POST",
    apiKey: "Trading Bot",
    status: 400
  }
];

const permissions = [
  { value: "read", label: "Read Access" },
  { value: "write", label: "Write Access" },
  { value: "analytics", label: "Analytics Access" },
  { value: "admin", label: "Admin Access" }
];

const DeveloperSettings: React.FC<DeveloperSettingsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("api-keys");
  
  // API Keys
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>(["read"]);
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [showNewKey, setShowNewKey] = useState(false);
  const [newGeneratedKey, setNewGeneratedKey] = useState("");
  
  // Webhooks
  const [newWebhookName, setNewWebhookName] = useState("");
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [newWebhookEvents, setNewWebhookEvents] = useState<string[]>([]);
  const [showNewWebhookForm, setShowNewWebhookForm] = useState(false);
  
  // Logs filtering
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [methodFilter, setMethodFilter] = useState<string | null>(null);
  const [apiKeyFilter, setApiKeyFilter] = useState<string | null>(null);
  
  // Usage counters
  const dailyLimit = 10000;
  const currentUsage = 1523;
  const usagePercentage = (currentUsage / dailyLimit) * 100;
  
  const generateNewApiKey = () => {
    if (!newKeyName) {
      toast.error("Please enter a name for your API key");
      return;
    }
    
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let newKey = "sk_live_TradeJournalAPI_";
    
    for (let i = 0; i < 16; i++) {
      newKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    setNewGeneratedKey(newKey);
    setShowNewKey(true);
    onSettingChange();
    
    toast.success("New API key generated", {
      description: "Make sure to copy your key now. You won't be able to see it again."
    });
  };
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(message);
    });
  };
  
  const revokeApiKey = (keyId: string) => {
    toast.success("API key revoked", {
      description: "The API key has been successfully revoked"
    });
    onSettingChange();
  };
  
  const createWebhook = () => {
    if (!newWebhookName || !newWebhookUrl || newWebhookEvents.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Webhook created", {
      description: "Your new webhook has been created successfully"
    });
    
    setNewWebhookName("");
    setNewWebhookUrl("");
    setNewWebhookEvents([]);
    setShowNewWebhookForm(false);
    onSettingChange();
  };
  
  const deleteWebhook = (webhookId: string) => {
    toast.success("Webhook deleted", {
      description: "The webhook has been successfully deleted"
    });
    onSettingChange();
  };
  
  const toggleWebhookEvent = (event: string) => {
    if (newWebhookEvents.includes(event)) {
      setNewWebhookEvents(newWebhookEvents.filter(e => e !== event));
    } else {
      setNewWebhookEvents([...newWebhookEvents, event]);
    }
  };
  
  const resetFilters = () => {
    setDateRange({ from: new Date(), to: new Date() });
    setMethodFilter(null);
    setApiKeyFilter(null);
  };
  
  const getStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) {
      return <Badge variant="success" className="bg-green-500 text-white">Success</Badge>;
    } else if (status >= 400 && status < 500) {
      return <Badge variant="warning" className="bg-yellow-500 text-white">Client Error</Badge>;
    } else if (status >= 500) {
      return <Badge variant="destructive">Server Error</Badge>;
    } else {
      return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getMethodBadge = (method: string) => {
    switch (method) {
      case "GET":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{method}</Badge>;
      case "POST":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{method}</Badge>;
      case "PUT":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">{method}</Badge>;
      case "DELETE":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">{method}</Badge>;
      default:
        return <Badge variant="outline">{method}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="api-keys" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            <span>Webhooks</span>
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            <span>Usage</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <FileJson className="h-4 w-4" />
            <span>Activity Logs</span>
          </TabsTrigger>
        </TabsList>
        
        {/* API KEYS TAB */}
        <TabsContent value="api-keys" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Create and manage API keys for accessing ZellaPro API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!showNewKeyForm && !showNewKey && (
                <Button 
                  onClick={() => setShowNewKeyForm(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create New API Key
                </Button>
              )}
              
              {showNewKeyForm && !showNewKey && (
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium text-lg">Create New API Key</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="key-name">Key Name</Label>
                    <Input
                      id="key-name"
                      placeholder="e.g. Trading Bot"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      A descriptive name to help you identify this key
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {permissions.map((perm) => (
                        <div key={perm.value} className="flex items-center space-x-2">
                          <Switch
                            id={`perm-${perm.value}`}
                            checked={newKeyPermissions.includes(perm.value)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewKeyPermissions([...newKeyPermissions, perm.value]);
                              } else {
                                setNewKeyPermissions(newKeyPermissions.filter(p => p !== perm.value));
                              }
                            }}
                          />
                          <Label htmlFor={`perm-${perm.value}`}>{perm.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNewKeyForm(false);
                        setNewKeyName("");
                        setNewKeyPermissions(["read"]);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={generateNewApiKey}>Generate Key</Button>
                  </div>
                </div>
              )}
              
              {showNewKey && (
                <div className="border border-green-500 dark:border-green-700 rounded-lg p-4 space-y-4 bg-green-50 dark:bg-green-950/20">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg flex items-center gap-2">
                      <KeyRound className="h-5 w-5 text-green-500" />
                      <span>Your New API Key</span>
                    </h3>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      New
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm mb-2">
                      This is the only time you'll see this key. Make sure to copy it now.
                    </p>
                    <div className="relative">
                      <Input
                        value={newGeneratedKey}
                        readOnly
                        className="pr-24 font-mono text-sm bg-white dark:bg-gray-900"
                      />
                      <div className="absolute right-1 top-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyToClipboard(newGeneratedKey, "API key copied to clipboard")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700
                      dark:text-green-400 dark:border-green-400 dark:hover:bg-green-950"
                      onClick={() => copyToClipboard(newGeneratedKey, "API key copied to clipboard")}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Key
                    </Button>
                    <Button
                      onClick={() => {
                        setShowNewKey(false);
                        setNewGeneratedKey("");
                        setNewKeyName("");
                      }}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockApiKeys.map((apiKey) => (
                      <TableRow key={apiKey.id}>
                        <TableCell className="font-medium">{apiKey.name}</TableCell>
                        <TableCell>{apiKey.created}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {apiKey.permissions.map((perm) => (
                              <Badge key={perm} variant="outline" className="text-xs">
                                {perm}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => revokeApiKey(apiKey.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50
                            dark:text-red-400 dark:hover:bg-red-950/30"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Revoke
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">API Security Best Practices</h3>
                <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-5">
                  <li>Never expose API keys in client-side code</li>
                  <li>Rotate keys regularly (every 90 days)</li>
                  <li>Use the minimum required permissions for each application</li>
                  <li>Consider IP restrictions for added security</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* WEBHOOKS TAB */}
        <TabsContent value="webhooks" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>
                Configure webhooks to receive real-time updates from ZellaPro
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!showNewWebhookForm && (
                <Button 
                  onClick={() => setShowNewWebhookForm(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create New Webhook
                </Button>
              )}
              
              {showNewWebhookForm && (
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-medium text-lg">Create New Webhook</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhook-name">Webhook Name</Label>
                    <Input
                      id="webhook-name"
                      placeholder="e.g. Trade Notification Service"
                      value={newWebhookName}
                      onChange={(e) => setNewWebhookName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input
                      id="webhook-url"
                      placeholder="https://"
                      value={newWebhookUrl}
                      onChange={(e) => setNewWebhookUrl(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      The URL that will receive webhook events via HTTP POST
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Events to Trigger</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="event-trade-created"
                          checked={newWebhookEvents.includes("trade_created")}
                          onCheckedChange={() => toggleWebhookEvent("trade_created")}
                        />
                        <Label htmlFor="event-trade-created">Trade Created</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="event-trade-updated"
                          checked={newWebhookEvents.includes("trade_updated")}
                          onCheckedChange={() => toggleWebhookEvent("trade_updated")}
                        />
                        <Label htmlFor="event-trade-updated">Trade Updated</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="event-journal-entry"
                          checked={newWebhookEvents.includes("journal_entry_added")}
                          onCheckedChange={() => toggleWebhookEvent("journal_entry_added")}
                        />
                        <Label htmlFor="event-journal-entry">Journal Entry Added</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="event-report-generated"
                          checked={newWebhookEvents.includes("report_generated")}
                          onCheckedChange={() => toggleWebhookEvent("report_generated")}
                        />
                        <Label htmlFor="event-report-generated">Report Generated</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNewWebhookForm(false);
                        setNewWebhookName("");
                        setNewWebhookUrl("");
                        setNewWebhookEvents([]);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={createWebhook}>Create Webhook</Button>
                  </div>
                </div>
              )}
              
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Events</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockWebhooks.map((webhook) => (
                      <TableRow key={webhook.id}>
                        <TableCell className="font-medium">{webhook.name}</TableCell>
                        <TableCell className="font-mono text-xs truncate max-w-[200px]">
                          {webhook.url}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {webhook.events.map((event) => (
                              <Badge key={event} variant="outline" className="text-xs">
                                {event.replace("_", " ")}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              Test
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteWebhook(webhook.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50
                              dark:text-red-400 dark:hover:bg-red-950/30"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Webhook Format</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  All webhook events are sent as HTTP POST requests with the following JSON format:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-xs overflow-x-auto">
                  {`{
  "event": "trade_created",
  "timestamp": "2024-05-10T12:34:56Z",
  "data": {
    // Event specific data
  }
}`}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* USAGE TAB */}
        <TabsContent value="usage" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Usage</CardTitle>
              <CardDescription>
                Monitor your API usage and limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-bold">Professional Plan</h3>
                  <p className="text-sm text-muted-foreground">
                    Your current plan includes 10,000 API requests per day
                  </p>
                </div>
                <Button className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Upgrade Plan
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">Daily API Usage</h3>
                    <span className="text-sm">
                      {currentUsage} / {dailyLimit} requests
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${usagePercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Usage resets at midnight UTC
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="text-sm font-medium">Rate Limit</h4>
                      <Badge variant="outline">Current</Badge>
                    </div>
                    <p className="text-2xl font-bold">100</p>
                    <p className="text-xs text-muted-foreground">requests per minute</p>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="text-sm font-medium">Data Transfer</h4>
                      <Badge variant="outline">Current</Badge>
                    </div>
                    <p className="text-2xl font-bold">4.2 GB</p>
                    <p className="text-xs text-muted-foreground">of 10 GB monthly</p>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between mb-2">
                      <h4 className="text-sm font-medium">Concurrent Requests</h4>
                      <Badge variant="outline">Current</Badge>
                    </div>
                    <p className="text-2xl font-bold">10</p>
                    <p className="text-xs text-muted-foreground">simultaneous connections</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Usage by Endpoint</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>/api/v1/trades</span>
                      <span>742 requests</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 dark:bg-blue-600" style={{ width: "48%" }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>/api/v1/analytics</span>
                      <span>456 requests</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 dark:bg-green-600" style={{ width: "30%" }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>/api/v1/journal</span>
                      <span>325 requests</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 dark:bg-purple-600" style={{ width: "21%" }} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border p-4 bg-gray-50 dark:bg-gray-900">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Need Higher Limits?</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enterprise plans include custom rate limits, dedicated support, and more
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Contact Sales
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* LOGS TAB */}
        <TabsContent value="logs" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Activity Logs</CardTitle>
              <CardDescription>
                Monitor and filter activity across your API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="space-y-2 flex-1">
                  <Label>Date Range</Label>
                  <DatePickerWithRange date={dateRange} setDate={setDateRange} />
                </div>
                
                <div className="space-y-2 flex-1">
                  <Label htmlFor="api-key-filter">API Key</Label>
                  <Select 
                    value={apiKeyFilter || ""} 
                    onValueChange={(value) => setApiKeyFilter(value || null)}
                  >
                    <SelectTrigger id="api-key-filter">
                      <SelectValue placeholder="All API Keys" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All API Keys</SelectItem>
                      {mockApiKeys.map((key) => (
                        <SelectItem key={key.id} value={key.name}>
                          {key.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 flex-1">
                  <Label htmlFor="method-filter">Method</Label>
                  <Select 
                    value={methodFilter || ""} 
                    onValueChange={(value) => setMethodFilter(value || null)}
                  >
                    <SelectTrigger id="method-filter">
                      <SelectValue placeholder="All Methods" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Methods</SelectItem>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button variant="outline" className="flex items-center gap-2" onClick={resetFilters}>
                    <Filter className="h-4 w-4" />
                    Reset Filters
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>API Key</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockApiLogs
                      .filter(log => {
                        if (methodFilter && log.method !== methodFilter) return false;
                        if (apiKeyFilter && log.apiKey !== apiKeyFilter) return false;
                        return true;
                      })
                      .map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-xs">{log.timestamp}</TableCell>
                          <TableCell className="font-mono text-xs">{log.endpoint}</TableCell>
                          <TableCell>{getMethodBadge(log.method)}</TableCell>
                          <TableCell>{log.apiKey}</TableCell>
                          <TableCell>{getStatusBadge(log.status)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <FileCode className="h-4 w-4" />
                  Export Logs
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">Developer Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto py-3 justify-start">
                    <div className="flex flex-col items-start">
                      <span className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4" />
                        API Documentation
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Explore the ZellaPro API
                      </span>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto py-3 justify-start">
                    <div className="flex flex-col items-start">
                      <span className="flex items-center gap-2">
                        <FileCode className="h-4 w-4" />
                        Code Samples
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Example code in multiple languages
                      </span>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto py-3 justify-start">
                    <div className="flex flex-col items-start">
                      <span className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Security Guidelines
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Best practices for API security
                      </span>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {saveResetButtons}
    </div>
  );
};

export default DeveloperSettings;
