
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Timeline } from "@/components/settings/broker-integrations/Timeline";
import { ConnectBrokerModal } from "@/components/settings/broker-integrations/ConnectBrokerModal";
import { ManualImportModal } from "@/components/settings/broker-integrations/ManualImportModal";
import { ErrorLogPanel } from "@/components/settings/broker-integrations/ErrorLogPanel";
import { BrokerCard } from "@/components/settings/broker-integrations/BrokerCard";
import { Filter, FileUp, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

// Types
export interface BrokerAccount {
  id: string;
  name: string;
  logo: string;
  type: 'Real' | 'Demo';
  status: 'Connected' | 'Error' | 'Expired';
  lastSync: string;
  autoImport: boolean;
  category: 'crypto' | 'forex' | 'stocks' | 'futures';
}

interface ImportEvent {
  id: string;
  date: string;
  status: 'success' | 'error' | 'pending';
  details: string;
  broker: string;
}

interface ErrorLog {
  id: string;
  timestamp: string;
  broker: string;
  message: string;
  suggestion: string;
  severity: 'high' | 'medium' | 'low';
}

interface BrokerIntegrationPanelProps {
  onSettingChange?: () => void;
}

export const BrokerIntegrationPanel: React.FC<BrokerIntegrationPanelProps> = ({ 
  onSettingChange
}) => {
  // State
  const [activeTab, setActiveTab] = useState("connected");
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Sample data - in a real app, this would come from an API
  const [connectedBrokers, setConnectedBrokers] = useState<BrokerAccount[]>([
    {
      id: "1",
      name: "Binance",
      logo: "/binance-logo.png", 
      type: "Real",
      status: "Connected",
      lastSync: "2025-05-13T14:32:00Z",
      autoImport: true,
      category: "crypto"
    },
    {
      id: "2",
      name: "MetaTrader 5",
      logo: "/mt5-logo.png",
      type: "Demo",
      status: "Connected",
      lastSync: "2025-05-13T12:15:00Z",
      autoImport: true,
      category: "forex"
    },
    {
      id: "3",
      name: "Kite",
      logo: "/kite-logo.png",
      type: "Real",
      status: "Error",
      lastSync: "2025-05-12T08:45:00Z",
      autoImport: false,
      category: "stocks"
    },
    {
      id: "4",
      name: "TradingView",
      logo: "/tradingview-logo.png",
      type: "Demo",
      status: "Expired",
      lastSync: "2025-05-10T16:20:00Z",
      autoImport: false,
      category: "stocks"
    }
  ]);

  const [importHistory, setImportHistory] = useState<ImportEvent[]>([
    {
      id: "i1",
      date: "2025-05-13T14:32:00Z",
      status: "success",
      details: "Imported 37 trades from Binance",
      broker: "Binance"
    },
    {
      id: "i2",
      date: "2025-05-13T12:15:00Z",
      status: "success",
      details: "Imported 12 trades from MetaTrader 5",
      broker: "MetaTrader 5"
    },
    {
      id: "i3",
      date: "2025-05-12T08:45:00Z",
      status: "error",
      details: "Failed to import trades from Kite - Authentication failed",
      broker: "Kite"
    },
    {
      id: "i4",
      date: "2025-05-11T19:10:00Z",
      status: "success",
      details: "Imported 8 trades from Binance",
      broker: "Binance"
    },
    {
      id: "i5",
      date: "2025-05-10T16:20:00Z",
      status: "pending",
      details: "Import in progress from TradingView",
      broker: "TradingView"
    }
  ]);

  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([
    {
      id: "e1",
      timestamp: "2025-05-12T08:45:00Z",
      broker: "Kite",
      message: "Authentication token expired",
      suggestion: "Reconnect your Kite account with fresh API keys",
      severity: "high"
    },
    {
      id: "e2",
      timestamp: "2025-05-10T16:20:00Z",
      broker: "TradingView",
      message: "API rate limit exceeded",
      suggestion: "Wait 30 minutes before retrying or upgrade your API tier",
      severity: "medium"
    },
    {
      id: "e3",
      timestamp: "2025-05-09T11:30:00Z",
      broker: "Binance",
      message: "Insufficient permissions for trade history",
      suggestion: "Update API key permissions to include trade history access",
      severity: "high"
    }
  ]);

  // Handle toggle for auto import
  const handleAutoImportToggle = (brokerId: string, newValue: boolean) => {
    setConnectedBrokers(prev => prev.map(broker => 
      broker.id === brokerId ? { ...broker, autoImport: newValue } : broker
    ));
    
    toast({
      title: newValue ? "Auto-import enabled" : "Auto-import disabled",
      description: `${connectedBrokers.find(b => b.id === brokerId)?.name} will ${newValue ? 'now' : 'no longer'} sync automatically`,
    });
    
    if (onSettingChange) {
      onSettingChange();
    }
  };

  // Handle broker disconnect
  const handleDisconnectBroker = (brokerId: string) => {
    setConnectedBrokers(prev => prev.filter(broker => broker.id !== brokerId));
    
    toast({
      title: "Broker disconnected",
      description: "The broker has been disconnected successfully",
      variant: "default",
    });
    
    if (onSettingChange) {
      onSettingChange();
    }
  };

  // Handle manual sync
  const handleSyncNow = (broker: BrokerAccount) => {
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      
      const updatedBrokers = connectedBrokers.map(b => 
        b.id === broker.id 
          ? { ...b, lastSync: new Date().toISOString(), status: 'Connected' as const } 
          : b
      );
      
      setConnectedBrokers(updatedBrokers);
      
      // Add to import history
      const newImport: ImportEvent = {
        id: `i${Math.random().toString(36).substr(2, 9)}`,
        date: new Date().toISOString(),
        status: 'success',
        details: `Manual import from ${broker.name} completed`,
        broker: broker.name
      };
      
      setImportHistory(prev => [newImport, ...prev]);
      
      toast({
        title: "Sync completed",
        description: `${broker.name} has been synced successfully`,
        variant: "default",
      });
      
      if (onSettingChange) {
        onSettingChange();
      }
    }, 1500);
  };

  // Filter brokers based on selected type
  const filteredBrokers = filterType === "all" 
    ? connectedBrokers 
    : connectedBrokers.filter(broker => 
        filterType === "real" ? broker.type === "Real" : 
        filterType === "demo" ? broker.type === "Demo" : 
        broker.category === filterType
      );

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
            <div>
              <CardTitle className="text-xl">Broker & Platform Integrations</CardTitle>
              <CardDescription>Connect your trading accounts for automatic trade import and analysis</CardDescription>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <Button 
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setShowImportModal(true)}
              >
                <FileUp className="h-4 w-4" />
                <span>Manual Import</span>
              </Button>
              <Button 
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setShowConnectModal(true)}
              >
                <span>Connect New Broker</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="px-0 space-y-6">
          <Tabs defaultValue="connected" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="connected">Connected Brokers</TabsTrigger>
              <TabsTrigger value="history">Import History</TabsTrigger>
              <TabsTrigger value="errors">Error Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="connected" className="space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="mr-2 flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Filter:</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  <Badge 
                    variant={filterType === "all" ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={() => setFilterType("all")}
                  >
                    All
                  </Badge>
                  <Badge 
                    variant={filterType === "real" ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={() => setFilterType("real")}
                  >
                    Real Accounts
                  </Badge>
                  <Badge 
                    variant={filterType === "demo" ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={() => setFilterType("demo")}
                  >
                    Demo Accounts
                  </Badge>
                  <Badge 
                    variant={filterType === "crypto" ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={() => setFilterType("crypto")}
                  >
                    Crypto
                  </Badge>
                  <Badge 
                    variant={filterType === "forex" ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={() => setFilterType("forex")}
                  >
                    Forex
                  </Badge>
                  <Badge 
                    variant={filterType === "stocks" ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={() => setFilterType("stocks")}
                  >
                    Stocks
                  </Badge>
                </div>
              </div>
              
              {/* Broker Cards */}
              <AnimatePresence>
                {filteredBrokers.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center py-12 bg-muted/20 rounded-lg"
                  >
                    <p className="text-muted-foreground">No brokers found with the selected filter.</p>
                    <Button
                      variant="link"
                      onClick={() => setFilterType("all")}
                    >
                      View all brokers
                    </Button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredBrokers.map((broker, index) => (
                      <motion.div
                        key={broker.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <BrokerCard
                          broker={broker}
                          onToggleAutoImport={handleAutoImportToggle}
                          onDisconnect={handleDisconnectBroker}
                          onSync={handleSyncNow}
                          isLoading={isLoading}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
              
              {connectedBrokers.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No brokers connected yet</h3>
                  <p className="text-muted-foreground mb-4">Connect your trading platforms to import your trades automatically</p>
                  <Button onClick={() => setShowConnectModal(true)}>Connect New Broker</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Import History</CardTitle>
                  <CardDescription>Recent trade imports from your connected accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <Timeline events={importHistory} />
                    
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowImportModal(true)}
                        className="flex items-center gap-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span>Import More Trades</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="errors">
              <ErrorLogPanel errors={errorLogs} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Modals */}
      {showConnectModal && (
        <ConnectBrokerModal
          isOpen={showConnectModal}
          onClose={() => setShowConnectModal(false)}
          onConnect={(newBroker) => {
            // Add the new broker to the list
            setConnectedBrokers(prev => [...prev, newBroker]);
            setShowConnectModal(false);
            
            toast({
              title: "Broker connected",
              description: `${newBroker.name} has been successfully connected`,
              variant: "default",
            });
            
            if (onSettingChange) {
              onSettingChange();
            }
          }}
        />
      )}
      
      {showImportModal && (
        <ManualImportModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImport={(result) => {
            // Add the import result to history
            const newImport: ImportEvent = {
              id: `i${Math.random().toString(36).substr(2, 9)}`,
              date: new Date().toISOString(),
              status: 'success',
              details: `Manually imported ${result.tradeCount} trades from ${result.source}`,
              broker: result.source
            };
            
            setImportHistory(prev => [newImport, ...prev]);
            setShowImportModal(false);
            
            toast({
              title: "Import successful",
              description: `${result.tradeCount} trades imported from ${result.source}`,
              variant: "default",
            });
            
            if (onSettingChange) {
              onSettingChange();
            }
          }}
        />
      )}
    </div>
  );
};
