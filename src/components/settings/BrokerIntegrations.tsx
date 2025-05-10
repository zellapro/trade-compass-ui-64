
import React, { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BrokerCategory from "./broker-integrations/BrokerCategory";
import AddIntegrationForm from "./broker-integrations/AddIntegrationForm";
import { currency, bitcoin } from "lucide-react";

interface BrokerIntegrationsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

// Mock data for brokers
const BROKERS = {
  forex: [
    { id: "exness", name: "Exness", type: "Forex", category: "forex", connected: true, region: "Global", lastSync: "2025-05-09T14:32:00", status: "Active" },
    { id: "mt4", name: "MetaTrader 4", type: "Forex", category: "forex", connected: false, requiresSecret: true },
    { id: "mt5", name: "MetaTrader 5", type: "Forex", category: "forex", connected: true, region: "EU", lastSync: "2025-05-08T09:12:00", status: "Active" },
    { id: "icmarkets", name: "IC Markets", type: "Forex", category: "forex", connected: false, requiresSecret: true },
    { id: "fxtm", name: "FXTM", type: "Forex", category: "forex", connected: false, requiresSecret: true },
    { id: "pepperstone", name: "Pepperstone", type: "Forex", category: "forex", connected: false, requiresSecret: true },
  ],
  crypto: [
    { id: "binance", name: "Binance", type: "Crypto", category: "crypto", connected: true, region: "Global", lastSync: "2025-05-10T08:45:00", status: "Active", docsUrl: "https://binance-docs.github.io/apidocs/" },
    { id: "coindcx", name: "CoinDCX", type: "Crypto", category: "crypto", connected: false, requiresSecret: true },
    { id: "wazirx", name: "WazirX", type: "Crypto", category: "crypto", connected: false, requiresSecret: true },
    { id: "coinbase", name: "Coinbase", type: "Crypto", category: "crypto", connected: true, region: "USA", lastSync: "2025-05-07T16:20:00", status: "Disconnected" },
    { id: "bybit", name: "Bybit", type: "Crypto", category: "crypto", connected: false, requiresSecret: true },
    { id: "okx", name: "OKX", type: "Crypto", category: "crypto", connected: false, requiresSecret: true },
  ],
};

const BrokerIntegrations: React.FC<BrokerIntegrationsProps> = ({
  onSettingChange,
  saveResetButtons,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>("forex");
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const handleConnect = async (id: string, apiKey: string, apiSecret: string, region: string, connectionType: string, accountLabel?: string) => {
    // In a real app, this would make an API call to store the credentials securely
    console.log(`Connecting to ${id} with API key`);
    toast.success(`Successfully connected to ${id}`);
    onSettingChange();
  };

  const handleDisconnect = async (id: string) => {
    // In a real app, this would make an API call to remove the stored credentials
    console.log(`Disconnecting from ${id}`);
    toast.success(`Successfully disconnected from ${id}`);
    onSettingChange();
  };

  const handleResync = async (id: string) => {
    // In a real app, this would make an API call to refresh the connection
    console.log(`Resyncing ${id}`);
    toast.success(`Resyncing data from ${id}`);
  };

  return (
    <div className="space-y-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="forex" className="flex items-center gap-2">
            <currency className="h-4 w-4" />
            Forex Integrations
          </TabsTrigger>
          <TabsTrigger value="crypto" className="flex items-center gap-2">
            <bitcoin className="h-4 w-4" />
            Crypto Integrations
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="forex" className="space-y-6">
          <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Benefits of Forex Integration</CardTitle>
              <CardDescription>Connect your forex brokers to enhance your trading experience</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">✓</div>
                  <span>Tick-by-tick trade syncing with volume data</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">✓</div>
                  <span>Auto-replay with strategy-specific metrics</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">✓</div>
                  <span>AI-based win/loss analysis powered by MCP</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">✓</div>
                  <span>Trade journaling automation for each account</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {showAddForm && selectedTab === "forex" ? (
            <AddIntegrationForm 
              type="forex"
              onSubmit={handleConnect}
              onCancel={() => setShowAddForm(false)}
            />
          ) : (
            <div className="text-center py-2">
              <button 
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                + Add New Forex Integration
              </button>
            </div>
          )}
          
          <BrokerCategory
            title="Forex Brokers"
            brokers={BROKERS.forex}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onResync={handleResync}
          />
        </TabsContent>
        
        <TabsContent value="crypto" className="space-y-6">
          <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Benefits of Crypto Integration</CardTitle>
              <CardDescription>Connect your crypto exchanges to enhance your trading experience</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">✓</div>
                  <span>Tick-by-tick trade syncing with volume data</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">✓</div>
                  <span>Auto-replay with strategy-specific metrics</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">✓</div>
                  <span>AI-based win/loss analysis powered by MCP</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">✓</div>
                  <span>Trade journaling automation for each account</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {showAddForm && selectedTab === "crypto" ? (
            <AddIntegrationForm 
              type="crypto"
              onSubmit={handleConnect}
              onCancel={() => setShowAddForm(false)}
            />
          ) : (
            <div className="text-center py-2">
              <button 
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                + Add New Crypto Integration
              </button>
            </div>
          )}
          
          <BrokerCategory
            title="Crypto Exchanges"
            brokers={BROKERS.crypto}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onResync={handleResync}
          />
        </TabsContent>
      </Tabs>
      
      <div className="pt-4 border-t border-border/30">
        {saveResetButtons}
      </div>
    </div>
  );
};

export default BrokerIntegrations;
