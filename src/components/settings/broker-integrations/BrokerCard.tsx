
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  onConnect: (id: string, apiKey: string, secretKey?: string) => void;
  onDisconnect: (id: string) => void;
}

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
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConnect = async () => {
    if (!apiKey || (requiresSecret && !secretKey)) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await onConnect(id, apiKey, secretKey);
      setApiKey("");
      setSecretKey("");
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
    <Card>
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
