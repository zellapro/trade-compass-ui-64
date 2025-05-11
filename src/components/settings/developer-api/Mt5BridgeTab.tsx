
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy } from "lucide-react";

const Mt5BridgeTab: React.FC = () => {
  const [bridgeEnabled, setBridgeEnabled] = useState(true);
  const [autoImportEnabled, setAutoImportEnabled] = useState(true);
  const [serverAddress, setServerAddress] = useState("localhost");
  const [serverPort, setServerPort] = useState("9090");
  
  const mt5Script = `// MT5 Bridge Script
void OnTick()
{
  // Your EA logic here
  if(OrdersTotal() > 0)
  {
    // Send trade data to the journal
    string payload = "{\\"symbol\\":" + Symbol() + ",\\"type\\":" + 
    SendToJournal(payload);
  }
}`;
  
  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(mt5Script);
    toast.success("MT5 script copied to clipboard");
  };
  
  const saveConfiguration = () => {
    toast.success("MT5 configuration saved");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">MetaTrader 5 Bridge</h2>
        <div className="flex items-center space-x-2">
          <Switch 
            id="bridge-enabled" 
            checked={bridgeEnabled}
            onCheckedChange={setBridgeEnabled}
          />
          <Label htmlFor="bridge-enabled">
            {bridgeEnabled ? "Enabled" : "Disabled"}
          </Label>
        </div>
      </div>
      
      {bridgeEnabled && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="server-address">Server Address</Label>
              <Input
                id="server-address"
                value={serverAddress}
                onChange={(e) => setServerAddress(e.target.value)}
                placeholder="localhost"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="server-port">Port</Label>
              <Input
                id="server-port"
                value={serverPort}
                onChange={(e) => setServerPort(e.target.value)}
                placeholder="9090"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-b py-4">
            <div>
              <h3 className="font-medium">Auto Import Trades</h3>
              <p className="text-sm text-muted-foreground">
                Automatically import trades from MetaTrader 5
              </p>
            </div>
            <Switch 
              id="auto-import" 
              checked={autoImportEnabled}
              onCheckedChange={setAutoImportEnabled}
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">MetaTrader 5 Script</h3>
            <div className="relative">
              <Textarea
                className="font-mono text-sm min-h-[200px] bg-muted/20"
                value={mt5Script}
                readOnly
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-2"
                onClick={copyScriptToClipboard}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Script
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Copy this script to your MT5 EA to send trade data to your journal
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={saveConfiguration}>Save MT5 Configuration</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Mt5BridgeTab;
