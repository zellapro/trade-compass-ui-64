
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Key, Eye, EyeOff, X } from "lucide-react";

interface AddIntegrationFormProps {
  type: "forex" | "crypto";
  onSubmit: (id: string, apiKey: string, apiSecret: string, region: string, connectionType: string, accountLabel?: string) => void;
  onCancel: () => void;
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

const AddIntegrationForm: React.FC<AddIntegrationFormProps> = ({
  type,
  onSubmit,
  onCancel,
}) => {
  const [brokerName, setBrokerName] = useState("");
  const [region, setRegion] = useState("global");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [connectionType, setConnectionType] = useState("rest");
  const [accountLabel, setAccountLabel] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showApiSecret, setShowApiSecret] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    const errors: Record<string, string> = {};
    if (!brokerName.trim()) errors.brokerName = "Broker name is required";
    if (!apiKey.trim()) errors.apiKey = "API key is required";
    if (!apiSecret.trim()) errors.apiSecret = "API secret is required";
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Generate a unique ID based on name for demo purposes
      const id = brokerName.toLowerCase().replace(/\s+/g, '-');
      await onSubmit(id, apiKey, apiSecret, region, connectionType, accountLabel);
      // Reset form
      setBrokerName("");
      setApiKey("");
      setApiSecret("");
      setRegion("global");
      setConnectionType("rest");
      setAccountLabel("");
      onCancel(); // Close the form after successful submission
    } catch (error) {
      console.error("Failed to connect:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Add New {type === "forex" ? "Forex" : "Crypto"} Integration</CardTitle>
            <CardDescription>Connect your {type === "forex" ? "broker" : "exchange"} securely to ZellaPro</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="broker-name">{type === "forex" ? "Broker" : "Exchange"} Name</Label>
            <Input
              id="broker-name"
              value={brokerName}
              onChange={(e) => setBrokerName(e.target.value)}
              placeholder={`Enter ${type === "forex" ? "broker" : "exchange"} name`}
              className={formErrors.brokerName ? "border-red-500" : ""}
            />
            {formErrors.brokerName && (
              <p className="text-xs text-red-500">{formErrors.brokerName}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="region">Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger id="region">
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
            <Label htmlFor="api-key">API Key</Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className={formErrors.apiKey ? "border-red-500" : ""}
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
            {formErrors.apiKey && (
              <p className="text-xs text-red-500">{formErrors.apiKey}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="api-secret">API Secret Key</Label>
            <div className="relative">
              <Input
                id="api-secret"
                type={showApiSecret ? "text" : "password"}
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                placeholder="Enter your API secret key"
                className={formErrors.apiSecret ? "border-red-500" : ""}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowApiSecret(!showApiSecret)}
              >
                {showApiSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {formErrors.apiSecret && (
              <p className="text-xs text-red-500">{formErrors.apiSecret}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="account-label">Account Label (Optional)</Label>
            <Input
              id="account-label"
              value={accountLabel}
              onChange={(e) => setAccountLabel(e.target.value)}
              placeholder="E.g. Main Account, Demo Account, etc."
            />
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="advanced">
              <AccordionTrigger className="text-sm py-2">Advanced Options</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="connection-type">Connection Type</Label>
                    <Select value={connectionType} onValueChange={setConnectionType}>
                      <SelectTrigger id="connection-type">
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Connecting..." : "Connect"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddIntegrationForm;
