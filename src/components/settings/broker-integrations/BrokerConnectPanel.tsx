
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clipboard, CheckCircle2, AlertCircle, ArrowRight, RefreshCcw, Key, Shield, Database } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const platformCategories = {
  stocks: [
    { id: "tradingview", name: "TradingView", logoUrl: "/tradingview-logo.png" },
    { id: "thinkorswim", name: "ThinkOrSwim", logoUrl: "/thinkorswim-logo.png" },
    { id: "zerodha", name: "Zerodha Kite", logoUrl: "/zerodha-logo.png" },
    { id: "ibkr", name: "Interactive Brokers", logoUrl: "/ibkr-logo.png" }
  ],
  forex: [
    { id: "mt4", name: "MetaTrader 4", logoUrl: "/mt4-logo.png" },
    { id: "mt5", name: "MetaTrader 5", logoUrl: "/mt5-logo.png" },
    { id: "ctrader", name: "cTrader", logoUrl: "/ctrader-logo.png" },
    { id: "oanda", name: "Oanda", logoUrl: "/oanda-logo.png" }
  ],
  crypto: [
    { id: "binance", name: "Binance", logoUrl: "/binance-logo.png" },
    { id: "coinbase", name: "Coinbase Pro", logoUrl: "/coinbase-logo.png" },
    { id: "ftx", name: "FTX", logoUrl: "/ftx-logo.png" },
    { id: "kraken", name: "Kraken", logoUrl: "/kraken-logo.png" }
  ],
  futures: [
    { id: "tradovate", name: "Tradovate", logoUrl: "/tradovate-logo.png" },
    { id: "ninjatrader", name: "NinjaTrader", logoUrl: "/ninjatrader-logo.png" },
    { id: "sierra", name: "Sierra Chart", logoUrl: "/sierra-logo.png" }
  ],
  propfirm: [
    { id: "ftmo", name: "FTMO", logoUrl: "/ftmo-logo.png" },
    { id: "fundednext", name: "FundedNext", logoUrl: "/fundednext-logo.png" },
    { id: "topsteptrader", name: "TopstepTrader", logoUrl: "/topstep-logo.png" }
  ]
};

interface BrokerConnectPanelProps {
  onConnect?: (platform: string, apiKey: string, secretKey: string) => void;
}

export const BrokerConnectPanel: React.FC<BrokerConnectPanelProps> = ({ onConnect }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("stocks");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const platforms = platformCategories[activeTab as keyof typeof platformCategories] || [];

  const handleConnect = () => {
    if (!selectedPlatform) {
      toast({
        title: "Platform required",
        description: "Please select a platform to connect",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey) {
      toast({
        title: "API Key required",
        description: "Please enter your API Key",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsConnecting(false);
      
      toast({
        title: "Connection successful",
        description: `Your ${platforms.find(p => p.id === selectedPlatform)?.name || selectedPlatform} account has been connected successfully.`,
      });
      
      if (onConnect) {
        onConnect(selectedPlatform, apiKey, secretKey);
      }
      
      // Reset form
      setSelectedPlatform("");
      setApiKey("");
      setSecretKey("");
    }, 1500);
  };

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(null), 3000);
      
      toast({
        title: "Copied to clipboard",
        description: `${type} has been copied to your clipboard.`,
        variant: "default",
      });
    });
  };

  const handlePlatformChange = (platformId: string) => {
    setSelectedPlatform(platformId);
  };

  return (
    <Card className="border shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Connect Trading Platform</CardTitle>
        <CardDescription>
          Securely connect your trading platforms to TradeVult for automatic trade synchronization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="futures">Futures</TabsTrigger>
            <TabsTrigger value="propfirm">Prop Firms</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="pt-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  onClick={() => handlePlatformChange(platform.id)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center justify-center ${
                    selectedPlatform === platform.id
                      ? "ring-2 ring-primary border-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="h-12 w-12 bg-muted/30 rounded-md flex items-center justify-center mb-2">
                    {platform.logoUrl ? (
                      <img src={platform.logoUrl} alt={platform.name} className="h-8 w-8 object-contain" />
                    ) : (
                      <div className="text-xl font-bold">{platform.name.substring(0, 2)}</div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-center">{platform.name}</span>
                  {selectedPlatform === platform.id && (
                    <CheckCircle2 className="h-5 w-5 text-primary mt-2" />
                  )}
                </div>
              ))}
            </div>

            {selectedPlatform && (
              <div className="space-y-4 rounded-lg border p-4 mt-4 bg-card/50 animate-fade-in">
                <h3 className="text-lg font-medium">
                  Connect {platforms.find(p => p.id === selectedPlatform)?.name || selectedPlatform}
                </h3>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="accountType">Account Type</Label>
                    <Select defaultValue="real">
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="real">Real Account</SelectItem>
                        <SelectItem value="demo">Demo Account</SelectItem>
                        {activeTab === "propfirm" && (
                          <>
                            <SelectItem value="challenge">Challenge Account</SelectItem>
                            <SelectItem value="verification">Verification Account</SelectItem>
                            <SelectItem value="funded">Funded Account</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <Label htmlFor="apiKey">API Key</Label>
                      {apiKey && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => handleCopyToClipboard(apiKey, "API Key")}
                        >
                          {copySuccess === "API Key" ? (
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                          ) : (
                            <Clipboard className="h-3 w-3 mr-1" />
                          )}
                          Copy
                        </Button>
                      )}
                    </div>
                    <div className="relative">
                      <Input
                        id="apiKey"
                        type={showSensitiveData ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your API Key"
                        className="pr-10"
                      />
                      <Key className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <Label htmlFor="secretKey">Secret Key / API Secret</Label>
                      {secretKey && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => handleCopyToClipboard(secretKey, "Secret Key")}
                        >
                          {copySuccess === "Secret Key" ? (
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                          ) : (
                            <Clipboard className="h-3 w-3 mr-1" />
                          )}
                          Copy
                        </Button>
                      )}
                    </div>
                    <div className="relative">
                      <Input
                        id="secretKey"
                        type={showSensitiveData ? "text" : "password"}
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        placeholder="Enter your Secret Key / API Secret"
                        className="pr-10"
                      />
                      <Key className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="showKeys"
                      checked={showSensitiveData}
                      onCheckedChange={setShowSensitiveData}
                    />
                    <Label htmlFor="showKeys" className="cursor-pointer">Show sensitive data</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="autoSync"
                      checked={autoSync}
                      onCheckedChange={setAutoSync}
                    />
                    <Label htmlFor="autoSync" className="cursor-pointer">Auto-sync trades (recommended)</Label>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button
                    onClick={handleConnect}
                    disabled={isConnecting || !apiKey}
                    className="w-full"
                  >
                    {isConnecting ? (
                      <>
                        <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Connect Platform
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="flex items-center p-3 bg-muted/30 rounded-md border text-sm text-muted-foreground">
                  <Shield className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p>
                    Your API keys are encrypted and stored securely. TradeVult uses read-only access when possible.
                  </p>
                </div>
              </div>
            )}
            
            {!selectedPlatform && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Database className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Select a platform to connect</h3>
                <p className="text-muted-foreground max-w-md mt-2">
                  Choose from the platforms above to connect your trading account and automatically sync your trades
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 bg-muted/10 flex-col space-y-2">
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Having trouble? <Button variant="link" className="h-auto p-0 text-xs">View our API connection guide</Button>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
