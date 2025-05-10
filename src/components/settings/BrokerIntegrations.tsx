
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Currency, Bitcoin, Shield, RefreshCcw, Edit, Trash2, PlusCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BrokerIntegrationsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const BrokerIntegrations: React.FC<BrokerIntegrationsProps> = ({
  onSettingChange,
  saveResetButtons,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("forex");
  const [isForexFormOpen, setIsForexFormOpen] = useState(false);
  const [isCryptoFormOpen, setIsCryptoFormOpen] = useState(false);
  const [forexForm, setForexForm] = useState({
    name: "",
    region: "",
    apiKey: "",
    secretKey: "",
    connectionType: "",
    label: "",
  });
  const [cryptoForm, setCryptoForm] = useState({
    name: "",
    region: "",
    apiKey: "",
    secretKey: "",
    connectionType: "",
    label: "",
  });
  const [advancedFeatures, setAdvancedFeatures] = useState(false);
  const [connectedForexBrokers, setConnectedForexBrokers] = useState([
    {
      id: "1",
      name: "ThinkorSwim",
      region: "USA",
      lastSync: "2024-05-09T14:32:00Z",
      status: "Active",
    },
    {
      id: "2",
      name: "MetaTrader 5",
      region: "Global",
      lastSync: "2024-05-09T12:15:00Z",
      status: "Disconnected",
    },
  ]);
  const [connectedCryptoBrokers, setConnectedCryptoBrokers] = useState([
    {
      id: "1",
      name: "Binance",
      region: "Global",
      lastSync: "2024-05-09T15:45:00Z",
      status: "Active",
    },
    {
      id: "2",
      name: "Coinbase Pro",
      region: "USA",
      lastSync: "2024-05-08T23:10:00Z",
      status: "Failed",
    },
  ]);

  const handleForexConnect = () => {
    // Simulate connection process
    toast({
      title: "Connecting to Forex Broker",
      description: "Establishing secure connection to " + forexForm.name,
    });
    
    setTimeout(() => {
      setConnectedForexBrokers([...connectedForexBrokers, {
        id: Math.random().toString(36).substring(7),
        name: forexForm.name,
        region: forexForm.region,
        lastSync: new Date().toISOString(),
        status: "Active",
      }]);
      
      toast({
        title: "Connection Successful",
        description: `${forexForm.name} has been successfully connected.`,
        variant: "default",
      });
      
      setForexForm({
        name: "",
        region: "",
        apiKey: "",
        secretKey: "",
        connectionType: "",
        label: "",
      });
      
      setIsForexFormOpen(false);
      onSettingChange();
    }, 1500);
  };

  const handleCryptoConnect = () => {
    // Simulate connection process
    toast({
      title: "Connecting to Crypto Exchange",
      description: "Establishing secure connection to " + cryptoForm.name,
    });
    
    setTimeout(() => {
      setConnectedCryptoBrokers([...connectedCryptoBrokers, {
        id: Math.random().toString(36).substring(7),
        name: cryptoForm.name,
        region: cryptoForm.region,
        lastSync: new Date().toISOString(),
        status: "Active",
      }]);
      
      toast({
        title: "Connection Successful",
        description: `${cryptoForm.name} has been successfully connected.`,
        variant: "default",
      });
      
      setCryptoForm({
        name: "",
        region: "",
        apiKey: "",
        secretKey: "",
        connectionType: "",
        label: "",
      });
      
      setIsCryptoFormOpen(false);
      onSettingChange();
    }, 1500);
  };

  const handleRemoveBroker = (id: string, type: "forex" | "crypto") => {
    if (type === "forex") {
      setConnectedForexBrokers(connectedForexBrokers.filter(broker => broker.id !== id));
    } else {
      setConnectedCryptoBrokers(connectedCryptoBrokers.filter(broker => broker.id !== id));
    }
    
    toast({
      title: "Integration Removed",
      description: "The integration has been successfully removed.",
      variant: "default",
    });
    
    onSettingChange();
  };

  const handleResync = (id: string, type: "forex" | "crypto") => {
    toast({
      title: "Resyncing Data",
      description: "Initiating data resync. This may take a moment.",
    });
    
    setTimeout(() => {
      toast({
        title: "Resync Complete",
        description: "All data has been successfully resynced.",
        variant: "default",
      });
      
      onSettingChange();
    }, 2000);
  };

  const ConnectionForm = ({ type }: { type: "forex" | "crypto" }) => {
    const isForex = type === "forex";
    const form = isForex ? forexForm : cryptoForm;
    const setForm = isForex ? setForexForm : setCryptoForm;
    
    return (
      <div className="space-y-4 p-4 border rounded-md bg-card/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${type}-broker-name`}>
              {isForex ? "Broker Name" : "Exchange Name"}
            </Label>
            <Input
              id={`${type}-broker-name`}
              placeholder={isForex ? "e.g. TD Ameritrade" : "e.g. Binance"}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${type}-region`}>Region</Label>
            <Select
              value={form.region}
              onValueChange={(value) => setForm({ ...form, region: value })}
            >
              <SelectTrigger id={`${type}-region`}>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="EU">EU</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="Singapore">Singapore</SelectItem>
                <SelectItem value="UAE">UAE</SelectItem>
                <SelectItem value="Global">Global</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`${type}-api-key`}>API Key</Label>
          <Input
            id={`${type}-api-key`}
            type="password"
            placeholder="Enter your API key"
            value={form.apiKey}
            onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`${type}-secret-key`}>Secret Key</Label>
          <Input
            id={`${type}-secret-key`}
            type="password"
            placeholder="Enter your secret key"
            value={form.secretKey}
            onChange={(e) => setForm({ ...form, secretKey: e.target.value })}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${type}-connection-type`}>Connection Type</Label>
            <Select
              value={form.connectionType}
              onValueChange={(value) => setForm({ ...form, connectionType: value })}
            >
              <SelectTrigger id={`${type}-connection-type`}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="REST">REST API</SelectItem>
                <SelectItem value="FIX">FIX Protocol</SelectItem>
                <SelectItem value="WebSocket">WebSocket</SelectItem>
                <SelectItem value="Custom">Custom Endpoint</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${type}-label`}>Account Label (Optional)</Label>
            <Input
              id={`${type}-label`}
              placeholder="e.g. Main Trading Account"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
            />
          </div>
        </div>
        
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="flex items-center space-x-2 cursor-pointer py-2">
              <Switch 
                checked={advancedFeatures}
                onCheckedChange={(checked) => setAdvancedFeatures(checked)}
              />
              <Label className="cursor-pointer">Enable Advanced Features</Label>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="space-y-4 mt-4 p-4 border rounded-md bg-background">
              <div className="space-y-2">
                <Label htmlFor={`${type}-auto-labeling`}>Auto-Labeling Rules</Label>
                <Input
                  id={`${type}-auto-labeling`}
                  placeholder="e.g. Apply 'Scalping' tag to trades under 5 min"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`${type}-strategy-mapping`}>Default Strategy Mapping</Label>
                <Select>
                  <SelectTrigger id={`${type}-strategy-mapping`}>
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="breakout">Breakout</SelectItem>
                    <SelectItem value="momentum">Momentum</SelectItem>
                    <SelectItem value="reversal">Reversal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`${type}-timezone`}>Timezone Override</Label>
                <Select>
                  <SelectTrigger id={`${type}-timezone`}>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-Detect</SelectItem>
                    <SelectItem value="et">Eastern Time (ET)</SelectItem>
                    <SelectItem value="pt">Pacific Time (PT)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={() => isForex ? setIsForexFormOpen(false) : setIsCryptoFormOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={isForex ? handleForexConnect : handleCryptoConnect}
            disabled={!form.name || !form.region || !form.apiKey || !form.secretKey || !form.connectionType}
          >
            Connect {isForex ? "Broker" : "Exchange"}
          </Button>
        </div>
      </div>
    );
  };

  const BenefitsPreview = ({ type }: { type: "forex" | "crypto" }) => (
    <Card className="bg-card/50 mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          {type === "forex" ? (
            <>
              <Currency className="h-5 w-5 mr-2" />
              <span>Forex Integration Benefits</span>
            </>
          ) : (
            <>
              <Bitcoin className="h-5 w-5 mr-2" />
              <span>Crypto Integration Benefits</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
            <span>Tick-by-tick trade syncing with volume data</span>
          </li>
          <li className="flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
            <span>Auto-replay with strategy-specific metrics</span>
          </li>
          <li className="flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
            <span>AI-based win/loss analysis powered by MCP</span>
          </li>
          <li className="flex items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
            <span>Trade journaling automation for each account</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );

  const ConnectedAccountsTable = ({ type, accounts }: { type: "forex" | "crypto", accounts: any[] }) => (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Region</th>
              <th className="text-left p-3 font-medium">Last Sync</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id} className="border-t hover:bg-muted/30">
                <td className="p-3">{account.name}</td>
                <td className="p-3">{account.region}</td>
                <td className="p-3">
                  {new Date(account.lastSync).toLocaleString()}
                </td>
                <td className="p-3">
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full mr-2 ${
                      account.status === "Active" ? "bg-green-500" :
                      account.status === "Disconnected" ? "bg-yellow-500" : "bg-red-500"
                    }`}></div>
                    {account.status}
                  </div>
                </td>
                <td className="p-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleResync(account.id, type)}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSettingChange()}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveBroker(account.id, type)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="forex" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="forex" className="flex items-center gap-2">
            <Currency className="h-4 w-4" />
            <span>Forex Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="crypto" className="flex items-center gap-2">
            <Bitcoin className="h-4 w-4" />
            <span>Crypto Integrations</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="forex" className="mt-4 space-y-4">
          <BenefitsPreview type="forex" />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Manage Forex Integrations</CardTitle>
              <CardDescription>Connect and manage your Forex trading accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isForexFormOpen && (
                <Button 
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => setIsForexFormOpen(true)}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Add New Forex Integration</span>
                </Button>
              )}
              
              {isForexFormOpen && <ConnectionForm type="forex" />}
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-3">Connected Forex Accounts</h4>
                {connectedForexBrokers.length > 0 ? (
                  <ConnectedAccountsTable type="forex" accounts={connectedForexBrokers} />
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No Forex brokers connected yet.
                  </div>
                )}
              </div>
              
              <div className="flex items-center p-3 bg-muted/50 rounded-md mt-4">
                <Shield className="h-5 w-5 mr-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Your credentials are end-to-end encrypted using Supabase Vault. 
                  You can revoke or rotate them anytime from the panel above.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="crypto" className="mt-4 space-y-4">
          <BenefitsPreview type="crypto" />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Manage Crypto Integrations</CardTitle>
              <CardDescription>Connect and manage your Cryptocurrency exchange accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isCryptoFormOpen && (
                <Button 
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => setIsCryptoFormOpen(true)}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Add New Crypto Integration</span>
                </Button>
              )}
              
              {isCryptoFormOpen && <ConnectionForm type="crypto" />}
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-3">Connected Crypto Exchanges</h4>
                {connectedCryptoBrokers.length > 0 ? (
                  <ConnectedAccountsTable type="crypto" accounts={connectedCryptoBrokers} />
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No Crypto exchanges connected yet.
                  </div>
                )}
              </div>
              
              <div className="flex items-center p-3 bg-muted/50 rounded-md mt-4">
                <Shield className="h-5 w-5 mr-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Your credentials are end-to-end encrypted using Supabase Vault. 
                  You can revoke or rotate them anytime from the panel above.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="pt-4">
        {saveResetButtons}
      </div>
    </div>
  );
};

export default BrokerIntegrations;
