
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, DownloadCloud, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface BrokerIntegrationsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const BrokerIntegrations: React.FC<BrokerIntegrationsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("indian");
  const [platformName, setPlatformName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [syncFrequency, setSyncFrequency] = useState("daily");
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    if (!platformName.trim() || !apiKey.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both platform name and API key",
        variant: "destructive"
      });
      return;
    }

    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      toast({
        title: "Connection successful",
        description: `${platformName} has been connected successfully.`,
      });
      
      // Reset form
      setPlatformName("");
      setApiKey("");
      setSyncFrequency("daily");
      
      // Notify parent about change
      onSettingChange();
    }, 1500);
  };
  
  const handleDownloadTemplate = () => {
    toast({
      title: "Template downloaded",
      description: "CSV template has been downloaded to your device.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="text-xl">Broker Integrations</CardTitle>
          <CardDescription>Connect your trading accounts for automatic trade import and analysis</CardDescription>
        </CardHeader>
        <CardContent className="px-0 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="indian">Indian Markets</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
              <TabsTrigger value="forex">Forex</TabsTrigger>
              <TabsTrigger value="global">Global</TabsTrigger>
            </TabsList>
            
            {/* Common content for all tabs */}
            {["indian", "crypto", "forex", "global"].map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="border p-4">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-lg">Connect Platform</CardTitle>
                      <CardDescription>
                        Enter your platform details to connect
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="platform">Platform Name</Label>
                        <Input 
                          id="platform" 
                          placeholder="Enter platform name" 
                          value={platformName}
                          onChange={(e) => setPlatformName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="apiKey">API Key</Label>
                        <Input 
                          id="apiKey" 
                          placeholder="Enter your API key" 
                          type="password"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="syncFrequency">Sync Frequency</Label>
                        <Select 
                          value={syncFrequency} 
                          onValueChange={setSyncFrequency}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">Real-time</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        className="w-full mt-4" 
                        onClick={handleConnect}
                        disabled={connecting}
                      >
                        {connecting ? "Connecting..." : "Connect Platform"}
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border p-4">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-lg">Manual Data Import</CardTitle>
                      <CardDescription>
                        Upload trade data from CSV or spreadsheets
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Import trades manually if your broker isn't supported for direct integration
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="flex gap-2 items-center">
                          <PlusCircle className="h-4 w-4" />
                          Import from CSV
                        </Button>
                        <Button variant="outline" className="flex gap-2 items-center">
                          <ArrowRight className="h-4 w-4" />
                          Import from Excel
                        </Button>
                      </div>
                      
                      <div className="pt-2">
                        <Button 
                          variant="link" 
                          className="flex items-center gap-1 p-0 h-auto text-blue-500"
                          onClick={handleDownloadTemplate}
                        >
                          <DownloadCloud className="h-4 w-4" />
                          Download CSV template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end">
                  {saveResetButtons}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrokerIntegrations;
