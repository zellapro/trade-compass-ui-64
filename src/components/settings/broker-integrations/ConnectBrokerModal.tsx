
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BrokerAccount } from "./BrokerIntegrationPanel";
import { CheckCircle, Search } from "lucide-react";

interface ConnectBrokerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (broker: BrokerAccount) => void;
}

// Available broker platforms
const brokers = [
  { id: "binance", name: "Binance", category: "crypto", logo: "/binance-logo.png" },
  { id: "coinbase", name: "Coinbase", category: "crypto", logo: "/coinbase-logo.png" },
  { id: "mt4", name: "MetaTrader 4", category: "forex", logo: "/mt4-logo.png" },
  { id: "mt5", name: "MetaTrader 5", category: "forex", logo: "/mt5-logo.png" },
  { id: "tradingview", name: "TradingView", category: "stocks", logo: "/tradingview-logo.png" },
  { id: "kite", name: "Zerodha Kite", category: "stocks", logo: "/kite-logo.png" },
  { id: "upstox", name: "Upstox", category: "stocks", logo: "/upstox-logo.png" },
  { id: "thinkorswim", name: "ThinkOrSwim", category: "stocks", logo: "/tos-logo.png" },
  { id: "ibkr", name: "Interactive Brokers", category: "stocks", logo: "/ibkr-logo.png" },
  { id: "ftmo", name: "FTMO", category: "prop-firm", logo: "/ftmo-logo.png" },
  { id: "tradovate", name: "Tradovate", category: "futures", logo: "/tradovate-logo.png" },
  { id: "ninjatrader", name: "NinjaTrader", category: "futures", logo: "/ninjatrader-logo.png" },
];

export const ConnectBrokerModal: React.FC<ConnectBrokerModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [selectedBrokerId, setSelectedBrokerId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [accountType, setAccountType] = useState<'Real' | 'Demo'>('Real');
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Filter brokers based on active tab and search query
  const filteredBrokers = brokers
    .filter(broker => 
      activeTab === "all" || broker.category === activeTab
    )
    .filter(broker => 
      broker.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Handle broker selection
  const handleSelectBroker = (id: string) => {
    setSelectedBrokerId(id);
  };
  
  // Handle broker connection
  const handleConnect = () => {
    if (!selectedBrokerId || !apiKey) return;
    
    setIsConnecting(true);
    
    // Find the selected broker
    const selectedBroker = brokers.find(broker => broker.id === selectedBrokerId);
    if (!selectedBroker) return;
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsConnecting(false);
      
      // Create a new broker account object
      const newBroker: BrokerAccount = {
        id: Math.random().toString(36).substring(7),
        name: selectedBroker.name,
        logo: selectedBroker.logo,
        type: accountType,
        status: 'Connected',
        lastSync: new Date().toISOString(),
        autoImport: true,
        category: selectedBroker.category as any
      };
      
      onConnect(newBroker);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>Connect New Broker</DialogTitle>
          <DialogDescription>
            Add a new broker or trading platform to automatically import your trades
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 py-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search brokers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
              <TabsTrigger value="forex">Forex</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
              <TabsTrigger value="futures">Futures</TabsTrigger>
              <TabsTrigger value="prop-firm">Prop-firm</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-4">
              {filteredBrokers.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No brokers found matching "{searchQuery}"</p>
                </div>
              ) : (
                <ScrollArea className="h-72 pr-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredBrokers.map(broker => (
                      <div
                        key={broker.id}
                        className={`p-3 flex items-center gap-3 rounded-md cursor-pointer transition-colors ${
                          selectedBrokerId === broker.id
                            ? "bg-primary/10 border-2 border-primary"
                            : "border hover:bg-muted/50"
                        }`}
                        onClick={() => handleSelectBroker(broker.id)}
                      >
                        <div className="h-8 w-8 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                          {broker.logo ? (
                            <img 
                              src={broker.logo} 
                              alt={`${broker.name} logo`} 
                              className="h-full w-full object-cover" 
                            />
                          ) : (
                            <span className="font-semibold text-xs">{broker.name.substring(0, 2)}</span>
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">{broker.name}</p>
                        </div>
                        {selectedBrokerId === broker.id && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
          
          {selectedBrokerId && (
            <div className="mt-6 space-y-4 rounded-md border p-4 bg-muted/10">
              <h3 className="font-medium">
                {brokers.find(b => b.id === selectedBrokerId)?.name} Configuration
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <Select value={accountType} onValueChange={(value) => setAccountType(value as 'Real' | 'Demo')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Real">Real</SelectItem>
                        <SelectItem value="Demo">Demo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter API key"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-secret">API Secret</Label>
                  <Input
                    id="api-secret"
                    type="password"
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                    placeholder="Enter API secret"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="px-6 py-4 border-t">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleConnect} 
            disabled={!selectedBrokerId || !apiKey || isConnecting}
            className="min-w-[100px]"
          >
            {isConnecting ? "Connecting..." : "Connect"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
