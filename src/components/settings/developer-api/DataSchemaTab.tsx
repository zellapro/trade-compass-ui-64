
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Download } from "lucide-react";

const DataSchemaTab: React.FC = () => {
  const [externalDbEnabled, setExternalDbEnabled] = useState(false);
  const [dbType, setDbType] = useState("mysql");
  const [dbHost, setDbHost] = useState("localhost");
  const [dbName, setDbName] = useState("trading_journal");
  const [dbUsername, setDbUsername] = useState("username");
  
  const schemaJson = `{
  "tradingJournal": {
    "trades": [
      {
        "id": "string",
        "symbol": "string",
        "entry_time": "datetime",
        "exit_time": "datetime",
        "entry_price": "number",
        "exit_price": "number",
        "position_size": "number",
        "direction": "string",
        "profit_loss": "number",
        "commission": "number",
        "strategy_id": "string",
        "notes": "string"
      }
    ],
    "journals": [
      {
        "id": "string",
        "date": "datetime",
        "content": "string",
        "mood": "string",
        "trade_ids": ["string"]
      }
    ]
  }
}`;
  
  const downloadSchema = () => {
    const blob = new Blob([schemaJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trade_data_schema.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Schema downloaded successfully");
  };
  
  const saveDbSettings = () => {
    toast.success("Database settings saved");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Data Schema</h2>
        <p className="text-muted-foreground text-sm">
          Use this schema to integrate with external business intelligence tools
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-3">Trade Data Schema</h3>
          <div className="relative">
            <Textarea
              className="font-mono text-xs min-h-[300px] bg-muted/20"
              value={schemaJson}
              readOnly
            />
          </div>
        </div>
        
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This schema defines the structure of your trading data. You can use this
              to integrate with business intelligence tools or create custom reports.
            </p>
            
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={downloadSchema}
            >
              <Download className="h-4 w-4" />
              Download JSON Schema
            </Button>
          </div>
          
          <div className="space-y-4 mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">External Database Connection</h3>
                <p className="text-sm text-muted-foreground">
                  Connect to an external database to sync your trading data
                </p>
              </div>
              <Switch 
                id="external-db" 
                checked={externalDbEnabled}
                onCheckedChange={setExternalDbEnabled}
              />
            </div>
            
            {externalDbEnabled && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-type">Database Type</Label>
                    <Select value={dbType} onValueChange={setDbType}>
                      <SelectTrigger id="db-type">
                        <SelectValue placeholder="Select database type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mysql">MySQL</SelectItem>
                        <SelectItem value="postgresql">PostgreSQL</SelectItem>
                        <SelectItem value="mongodb">MongoDB</SelectItem>
                        <SelectItem value="sqlserver">SQL Server</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-host">Host</Label>
                    <Input
                      id="db-host"
                      value={dbHost}
                      onChange={(e) => setDbHost(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-name">Database Name</Label>
                    <Input
                      id="db-name"
                      value={dbName}
                      onChange={(e) => setDbName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-username">Username</Label>
                    <Input
                      id="db-username"
                      value={dbUsername}
                      onChange={(e) => setDbUsername(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="db-password">Password</Label>
                  <Input
                    id="db-password"
                    type="password"
                    placeholder="Enter database password"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={saveDbSettings}>Save Connection</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSchemaTab;
