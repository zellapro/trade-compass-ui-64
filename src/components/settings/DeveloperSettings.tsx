
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";
import ApiKeysTab from "./developer-api/ApiKeysTab";
import WebhooksTab from "./developer-api/WebhooksTab";
import Mt5BridgeTab from "./developer-api/Mt5BridgeTab";
import DataSchemaTab from "./developer-api/DataSchemaTab";

interface DeveloperSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const DeveloperSettings: React.FC<DeveloperSettingsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const [activeTab, setActiveTab] = useState("api-keys");
  
  // Notify parent component when any setting changes
  const handleSettingChange = () => {
    onSettingChange();
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Developer Settings</h2>
        <p className="text-muted-foreground">
          Manage API keys, webhooks, and other developer tools
        </p>
      </div>
      
      <Tabs defaultValue="api-keys" value={activeTab} onValueChange={setActiveTab}>
        <Card>
          <CardHeader className="p-4 border-b">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="api-keys">API Keys</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="mt5-bridge">MT5 Bridge</TabsTrigger>
              <TabsTrigger value="data-schema">Data Schema</TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <CardContent className="p-6">
            <TabsContent value="api-keys" className="mt-0">
              <ApiKeysTab />
            </TabsContent>
            
            <TabsContent value="webhooks" className="mt-0">
              <WebhooksTab />
            </TabsContent>
            
            <TabsContent value="mt5-bridge" className="mt-0">
              <Mt5BridgeTab />
            </TabsContent>
            
            <TabsContent value="data-schema" className="mt-0">
              <DataSchemaTab />
            </TabsContent>
          </CardContent>
          
          <div className="p-4 border-t">
            {saveResetButtons}
          </div>
        </Card>
      </Tabs>
    </div>
  );
};

export default DeveloperSettings;
