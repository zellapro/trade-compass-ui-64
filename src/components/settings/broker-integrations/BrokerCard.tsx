
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, Key, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BrokerCardProps {
  id: string;
  name: string;
  type: string;
  category: string;
  connected: boolean;
  requiresSecret?: boolean;
  docsUrl?: string;
  onConnect: (id: string, apiKey: string, apiSecret: string, region: string, connectionType: string, accountLabel?: string) => void;
  onDisconnect: (id: string) => void;
}

const REGIONS = [
  { value: "usa", label: "USA" },
  { value: "eu", label: "EU" },
  { value: "australia", label: "Australia" },
  { value: "india", label: "India" },
  { value: "singapore", label: "Singapore" },
  { value: "uae", label: "UAE" },
  { value: "global", label: "Global" }
];

const CONNECTION_TYPES = [
  { value: "rest", label: "REST API" },
  { value: "fix", label: "FIX Protocol" },
  { value: "websocket", label: "WebSocket" },
  { value: "custom", label: "Custom Endpoint" }
];

const BrokerCard: React.FC<BrokerCardProps> = ({
  id,
  name,
  type,
  category,
  connected,
  requiresSecret = true,
  docsUrl,
  onConnect,
  onDisconnect,
}) => {
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [region, setRegion] = useState("global");
  const [connectionType, setConnectionType] = useState("rest");
  const [accountLabel, setAccountLabel] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleConnect = async () => {
    if (!apiKey || (requiresSecret && !secretKey)) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await onConnect(id, apiKey, secretKey, region, connectionType, accountLabel);
      setApiKey("");
      setSecretKey("");
      setRegion("global");
      setConnectionType("rest");
      setAccountLabel("");
      toast.success(`Connected to ${name} successfully`);
    } catch (error) {
      toast.error(`Failed to connect to ${name}. Please check your credentials.`);
    }
    setIsSubmitting(false);
  };

  const handleDisconnect = async () => {
    try {
      await onDisconnect(id);
      toast.success(`Disconnected from ${name}`);
    } catch (error) {
      toast.error(`Failed to disconnect from ${name}`);
    }
  };

  return (
    <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{type}</p>
            <Badge
              variant={connected ? "default" : "secondary"}
              className="mt-2"
            >
              {connected ? "Connected" : "Not Connected"}
            </Badge>
          </div>
          {docsUrl && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View API documentation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {!connected && (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor={`${id}-region`}>Region</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger id={`${id}-region`} className="w-full">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map(region => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`${id}-api-key`}>API Key</Label>
              <div className="relative">
                <Input
                  id={`${id}-api-key`}
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {requiresSecret && (
              <div className="grid gap-2">
                <Label htmlFor={`${id}-secret-key`}>Secret Key</Label>
                <div className="relative">
                  <Input
                    id={`${id}-secret-key`}
                    type={showSecretKey ? "text" : "password"}
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Enter your secret key"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowSecretKey(!showSecretKey)}
                  >
                    {showSecretKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor={`${id}-account-label`}>Account Label (Optional)</Label>
              <Input
                id={`${id}-account-label`}
                value={accountLabel}
                onChange={(e) => setAccountLabel(e.target.value)}
                placeholder="E.g. Main Account, Demo Account, etc."
              />
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="advanced">
                <AccordionTrigger className="py-2 text-sm">Advanced Options</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 py-2">
                    <div className="grid gap-2">
                      <Label htmlFor={`${id}-connection-type`}>Connection Type</Label>
                      <Select value={connectionType} onValueChange={setConnectionType}>
                        <SelectTrigger id={`${id}-connection-type`} className="w-full">
                          <SelectValue placeholder="Select connection type" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONNECTION_TYPES.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="p-3 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs text-blue-500">
              <div className="flex items-center gap-2 mb-1">
                <Key className="h-4 w-4" />
                <span className="font-medium">Security Note</span>
              </div>
              Your credentials are end-to-end encrypted using Supabase Vault. You can revoke or rotate them anytime from the panel below.
            </div>
          </div>
        )}

        <div className="mt-4">
          {connected ? (
            <Button 
              variant="destructive" 
              onClick={handleDisconnect}
              className="w-full"
            >
              Disconnect
            </Button>
          ) : (
            <Button
              onClick={handleConnect}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Connecting..." : "Connect"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BrokerCard;
