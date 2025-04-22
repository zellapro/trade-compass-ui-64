import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Copy, RefreshCcw, FileCog, LinkIcon, Webhook, BookOpen, Lock, KeyRound, Key, FileJson } from "lucide-react";
import { toast } from "sonner";

interface DeveloperSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const DeveloperSettings: React.FC<DeveloperSettingsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const [activeTab, setActiveTab] = useState("api-keys");
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("sk_live_TradeJournalAPI_9f8d3a2e71b54c8");
  
  const generateNewApiKey = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let newKey = "sk_live_TradeJournalAPI_";
    
    for (let i = 0; i < 16; i++) {
      newKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    setApiKey(newKey);
    onSettingChange();
    
    toast.success("New API key generated", {
      description: "Your old API key has been revoked"
    });
  };
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(message);
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="api-keys" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            <span>Webhooks</span>
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>Integration</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="api-keys" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for external services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <Key className="h-5 w-5 text-muted-foreground" />
                      <span>Your API Key</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Use this key to authenticate your requests to our API
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={generateNewApiKey}
                  >
                    <RefreshCcw className="h-4 w-4" />
                    <span>Regenerate</span>
                  </Button>
                </div>
                
                <div className="relative">
                  <Input
                    value={showApiKey ? apiKey : "•".repeat(apiKey.length)}
                    readOnly
                    className="pr-24 font-mono text-sm"
                  />
                  <div className="absolute right-1 top-1 flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <Lock className="h-4 w-4" /> : <KeyRound className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard(apiKey, "API key copied to clipboard")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="read-access">Read Access</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow reading trade data
                      </p>
                    </div>
                    <Switch id="read-access" defaultChecked onChange={onSettingChange} />
                  </div>
                  
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="write-access">Write Access</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow creating and updating trades
                      </p>
                    </div>
                    <Switch id="write-access" defaultChecked onChange={onSettingChange} />
                  </div>
                  
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="analytics-access">Analytics Access</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow fetching analytics and metrics
                      </p>
                    </div>
                    <Switch id="analytics-access" defaultChecked onChange={onSettingChange} />
                  </div>
                  
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="admin-access">Admin Access</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow account management operations
                      </p>
                    </div>
                    <Switch id="admin-access" onChange={onSettingChange} />
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <FileCog className="h-5 w-5 text-muted-foreground" />
                  <span>API Usage Limits</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <h4 className="text-sm font-medium">Rate Limit</h4>
                    <p className="text-2xl font-bold mt-2">100</p>
                    <p className="text-xs text-muted-foreground">requests per minute</p>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <h4 className="text-sm font-medium">Data Limit</h4>
                    <p className="text-2xl font-bold mt-2">50 MB</p>
                    <p className="text-xs text-muted-foreground">per request</p>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <h4 className="text-sm font-medium">Concurrent Requests</h4>
                    <p className="text-2xl font-bold mt-2">10</p>
                    <p className="text-xs text-muted-foreground">simultaneous connections</p>
                  </div>
                </div>
                
                <Button variant="outline" className="flex items-center gap-2 w-full mt-4">
                  <LinkIcon className="h-4 w-4" />
                  <span>Upgrade for Higher Limits</span>
                </Button>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-4">
                <div>
                  <h3 className="font-medium">API Activity Logs</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Monitor all API requests and responses
                  </p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileJson className="h-4 w-4" />
                  <span>View Logs</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="webhooks" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>Configure webhooks to receive real-time updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Active Webhooks</h3>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Trades Webhook</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          https://example.com/webhook/trades
                        </p>
                      </div>
                      <Switch defaultChecked onChange={onSettingChange} />
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="event-trade-created" defaultChecked onChange={onSettingChange} />
                        <Label htmlFor="event-trade-created" className="text-sm">Trade Created</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="event-trade-updated" defaultChecked onChange={onSettingChange} />
                        <Label htmlFor="event-trade-updated" className="text-sm">Trade Updated</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="event-trade-deleted" onChange={onSettingChange} />
                        <Label htmlFor="event-trade-deleted" className="text-sm">Trade Deleted</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="event-trade-import" defaultChecked onChange={onSettingChange} />
                        <Label htmlFor="event-trade-import" className="text-sm">Trade Import</Label>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Delete</Button>
                      <Button variant="outline" size="sm" className="ml-auto">Test</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Zapier Integration</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          https://hooks.zapier.com/hooks/catch/123456/abcdef
                        </p>
                      </div>
                      <Switch defaultChecked onChange={onSettingChange} />
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="event-journal-entry" defaultChecked onChange={onSettingChange} />
                        <Label htmlFor="event-journal-entry" className="text-sm">Journal Entry</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="event-report-generation" defaultChecked onChange={onSettingChange} />
                        <Label htmlFor="event-report-generation" className="text-sm">Report Generation</Label>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Delete</Button>
                      <Button variant="outline" size="sm" className="ml-auto">Test</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 border-dashed">
                <h3 className="font-medium mb-4">Create New Webhook</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="webhook-name">Webhook Name</Label>
                    <Input id="webhook-name" placeholder="e.g., Trade Analysis Bot" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input id="webhook-url" placeholder="https://" className="mt-1" />
                    <p className="text-xs text-muted-foreground mt-1">
                      The URL where webhook events will be sent
                    </p>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Events to Send</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="new-webhook-trade-created" defaultChecked onChange={onSettingChange} />
                        <Label htmlFor="new-webhook-trade-created" className="text-sm">Trade Created</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="new-webhook-trade-updated" defaultChecked onChange={onSettingChange} />
                        <Label htmlFor="new-webhook-trade-updated" className="text-sm">Trade Updated</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="new-webhook-journal-entry" onChange={onSettingChange} />
                        <Label htmlFor="new-webhook-journal-entry" className="text-sm">Journal Entry</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="new-webhook-report" onChange={onSettingChange} />
                        <Label htmlFor="new-webhook-report" className="text-sm">Report Generation</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button className="mr-2">Create Webhook</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-4">
                <div>
                  <h3 className="font-medium">Webhook Security</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add a signing secret to verify webhook authenticity
                  </p>
                </div>
                <Switch defaultChecked onChange={onSettingChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integration" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Developer Integration</CardTitle>
              <CardDescription>Tools for custom integrations and external platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">MetaTrader Integration</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mt-bridge-host">MT5 Bridge Host</Label>
                    <Input id="mt-bridge-host" defaultValue="127.0.0.1" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="mt-bridge-port">MT5 Bridge Port</Label>
                    <Input id="mt-bridge-port" defaultValue="8222" className="mt-1" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="mt-bridge-enabled">Enable MT5 Bridge</Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Connect to MetaTrader 5 for real-time trade syncing
                      </p>
                    </div>
                    <Switch id="mt-bridge-enabled" onChange={onSettingChange} />
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Custom Data Integration</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="import-schema">Data Import Schema</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger id="import-schema" className="mt-1">
                        <SelectValue placeholder="Select schema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Schema</SelectItem>
                        <SelectItem value="tradervue">Tradervue Compatible</SelectItem>
                        <SelectItem value="tradingview">TradingView Export</SelectItem>
                        <SelectItem value="custom">Custom Schema</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Define how external data is mapped to your journal
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="export-format">Export Format</Label>
                    <Select defaultValue="json">
                      <SelectTrigger id="export-format" className="mt-1">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-import">Automatic Import</Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Automatically import data when available from external sources
                      </p>
                    </div>
                    <Switch id="auto-import" defaultChecked onChange={onSettingChange} />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => copyToClipboard("https://app.tradejournal.com/docs/api", "Docs URL copied to clipboard")}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>API Documentation</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => copyToClipboard("https://app.tradejournal.com/docs/examples", "Examples URL copied to clipboard")}
                >
                  <Code className="h-4 w-4" />
                  <span>Code Examples</span>
                </Button>
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
