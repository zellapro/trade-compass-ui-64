
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, Link as LinkIcon, Plus, Check, AlertCircle, Clock, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface BrokerIntegrationsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

interface BrokerConnection {
  id: string;
  name: string;
  type: string;
  category: string;
  connected: boolean;
  lastSync?: string;
  status?: "success" | "warning" | "error";
  accountNickname?: string;
}

const BrokerIntegrations: React.FC<BrokerIntegrationsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [connections, setConnections] = useState<BrokerConnection[]>([
    { id: "zerodha", name: "Zerodha", type: "Indian Markets", category: "indian", connected: true, lastSync: "10 minutes ago", status: "success", accountNickname: "Main Account" },
    { id: "groww", name: "Groww", type: "Indian Markets", category: "indian", connected: false },
    { id: "upstox", name: "Upstox", type: "Indian Markets", category: "indian", connected: false },
    { id: "angelone", name: "Angel One", type: "Indian Markets", category: "indian", connected: false },
    { id: "dhan", name: "Dhan", type: "Indian Markets", category: "indian", connected: false },
    { id: "binance", name: "Binance", type: "Crypto", category: "crypto", connected: true, lastSync: "3 hours ago", status: "warning", accountNickname: "Crypto Trading" },
    { id: "coindcx", name: "CoinDCX", type: "Crypto", category: "crypto", connected: false },
    { id: "wazirx", name: "WazirX", type: "Crypto", category: "crypto", connected: false },
    { id: "coinbase", name: "Coinbase", type: "Crypto", category: "crypto", connected: false },
    { id: "exness", name: "Exness", type: "Forex", category: "forex", connected: false },
    { id: "metatrader4", name: "MetaTrader 4", type: "Forex", category: "forex", connected: true, lastSync: "1 day ago", status: "error", accountNickname: "FX Demo" },
    { id: "metatrader5", name: "MetaTrader 5", type: "Forex", category: "forex", connected: false },
    { id: "tradingview", name: "TradingView", type: "Global", category: "global", connected: false },
    { id: "thinkorswim", name: "ThinkOrSwim", type: "Global", category: "global", connected: false },
    { id: "interactivebrokers", name: "Interactive Brokers", type: "Global", category: "global", connected: false },
  ]);

  const filteredConnections = selectedCategory === "all" 
    ? connections 
    : connections.filter(conn => conn.category === selectedCategory);
  
  const connectedCount = connections.filter(conn => conn.connected).length;
  
  const toggleConnection = (id: string) => {
    setConnections(prev => prev.map(conn => 
      conn.id === id ? { ...conn, connected: !conn.connected } : conn
    ));
    onSettingChange();
    
    // Find the connection
    const connection = connections.find(conn => conn.id === id);
    
    if (connection) {
      if (!connection.connected) {
        // Simulating connection success
        toast.success(`Connected to ${connection.name}`, {
          description: "Your trading data will sync automatically",
        });
      } else {
        // Simulating disconnection
        toast.info(`Disconnected from ${connection.name}`, {
          description: "Your connection has been removed",
        });
      }
    }
  };
  
  const handleSync = (id: string) => {
    // Find the connection
    const connection = connections.find(conn => conn.id === id);
    
    if (connection && connection.connected) {
      toast.success(`Syncing data from ${connection.name}`, {
        description: "This may take a few minutes",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Broker Connections</CardTitle>
              <CardDescription>Connect your trading accounts to auto-sync your trades</CardDescription>
            </div>
            <Badge className="bg-primary">{connectedCount} Connected</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Button 
              variant={selectedCategory === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            <Button 
              variant={selectedCategory === "indian" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory("indian")}
            >
              Indian Markets
            </Button>
            <Button 
              variant={selectedCategory === "crypto" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory("crypto")}
            >
              Crypto
            </Button>
            <Button 
              variant={selectedCategory === "forex" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory("forex")}
            >
              Forex
            </Button>
            <Button 
              variant={selectedCategory === "global" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory("global")}
            >
              Global
            </Button>
          </div>
          
          <div className="space-y-4">
            {filteredConnections.map((connection) => (
              <div key={connection.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <ExternalLink className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{connection.name}</h3>
                      <p className="text-sm text-muted-foreground">{connection.type}</p>
                      
                      {connection.connected && connection.accountNickname && (
                        <div className="mt-1">
                          <Badge variant="outline" className="font-normal">
                            {connection.accountNickname}
                          </Badge>
                        </div>
                      )}
                      
                      {connection.connected && connection.lastSync && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Last synced: {connection.lastSync}</span>
                          
                          {connection.status === "success" && (
                            <Badge className="ml-1 h-5 bg-green-500 text-white">Synced</Badge>
                          )}
                          
                          {connection.status === "warning" && (
                            <Badge className="ml-1 h-5 bg-yellow-500 text-white">Pending</Badge>
                          )}
                          
                          {connection.status === "error" && (
                            <Badge className="ml-1 h-5 bg-red-500 text-white">Failed</Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {connection.connected && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleSync(connection.id)}
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>Sync</span>
                      </Button>
                    )}
                    
                    <div className="flex items-center space-x-1">
                      <Switch 
                        checked={connection.connected} 
                        onCheckedChange={() => toggleConnection(connection.id)}
                      />
                      <span className="text-sm font-medium">
                        {connection.connected ? "Connected" : "Connect"}
                      </span>
                    </div>
                  </div>
                </div>
                
                {connection.connected && (
                  <>
                    <Separator className="my-4" />
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`nickname-${connection.id}`}>Account Nickname</Label>
                        <Input 
                          id={`nickname-${connection.id}`} 
                          value={connection.accountNickname || ""} 
                          placeholder="Enter a nickname for this account"
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <Label htmlFor={`sync-${connection.id}`}>Sync Frequency</Label>
                          <Select defaultValue="realtime">
                            <SelectTrigger id={`sync-${connection.id}`} className="mt-1">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manual">Manual Only</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="realtime">Real-time</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex-1">
                          <Label htmlFor={`sync-data-${connection.id}`}>Sync Data</Label>
                          <Select defaultValue="all">
                            <SelectTrigger id={`sync-data-${connection.id}`} className="mt-1">
                              <SelectValue placeholder="Select data" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Data</SelectItem>
                              <SelectItem value="trades">Trades Only</SelectItem>
                              <SelectItem value="positions">Open Positions</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id={`auto-tag-${connection.id}`} defaultChecked={true} />
                        <Label htmlFor={`auto-tag-${connection.id}`}>Auto-tag trades from this broker</Label>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 border rounded-lg border-dashed p-4 text-center">
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Custom Connection</span>
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Can't find your broker? Add a custom connection for manual imports.
            </p>
          </div>
          
          {saveResetButtons}
        </CardContent>
      </Card>
    </div>
  );
};

export default BrokerIntegrations;
