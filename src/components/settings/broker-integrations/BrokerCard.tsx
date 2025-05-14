
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RefreshCw, Trash2, HelpCircle, ExternalLink, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BrokerAccount } from "./BrokerIntegrationPanel";
import { formatDistanceToNow } from "date-fns";

interface BrokerCardProps {
  broker: BrokerAccount;
  onToggleAutoImport: (id: string, value: boolean) => void;
  onDisconnect: (id: string) => void;
  onSync: (broker: BrokerAccount) => void;
  isLoading?: boolean;
}

export const BrokerCard: React.FC<BrokerCardProps> = ({
  broker,
  onToggleAutoImport,
  onDisconnect,
  onSync,
  isLoading = false
}) => {
  // Status badge styling based on connection status
  const getStatusBadge = () => {
    switch (broker.status) {
      case "Connected":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case "Error":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        );
      case "Expired":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Unknown
          </Badge>
        );
    }
  };

  // Format the last sync time
  const formatLastSync = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `Last sync: ${formatDistanceToNow(date, { addSuffix: true })}`;
    } catch (e) {
      return "Last sync: Unknown";
    }
  };

  // Get tooltip help content based on broker name
  const getHelpContent = () => {
    switch(broker.name) {
      case 'Binance':
        return "Connect to Binance using API keys with read-only trade permissions";
      case 'MetaTrader 5':
        return "Use your MT5 investor password or connect via our MT5 Bridge tool";
      case 'Kite':
        return "Generate an API key from your Kite dashboard and ensure it has trade data permissions";
      case 'TradingView':
        return "Export your trades from TradingView and import them manually";
      default:
        return `How to connect ${broker.name}`;
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md",
      broker.status === "Error" ? "border-red-500/30" : 
      broker.status === "Expired" ? "border-amber-500/30" : "border-border"
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Broker Logo (placeholder) */}
            <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center overflow-hidden">
              {broker.logo ? (
                <img 
                  src={broker.logo} 
                  alt={`${broker.name} logo`}
                  className="h-full w-full object-cover" 
                />
              ) : (
                <span className="font-semibold text-xs">{broker.name.substring(0, 2)}</span>
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{broker.name}</h3>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                      <HelpCircle className="h-3.5 w-3.5" />
                      <span className="sr-only">Help</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{getHelpContent()}</p>
                    <Button size="sm" variant="link" className="p-0 h-auto flex items-center gap-1">
                      View setup guide
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-xs">
                  {broker.type}
                </Badge>
                {getStatusBadge()}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => onDisconnect(broker.id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove broker</span>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-4 pt-4 border-t">
          <div className="text-xs text-muted-foreground">
            {formatLastSync(broker.lastSync)}
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <Switch
                id={`auto-import-${broker.id}`}
                checked={broker.autoImport}
                onCheckedChange={(checked) => onToggleAutoImport(broker.id, checked)}
                className="data-[state=checked]:bg-primary"
              />
              <Label 
                htmlFor={`auto-import-${broker.id}`} 
                className="text-sm font-normal cursor-pointer"
              >
                Auto-Import
              </Label>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => onSync(broker)}
              disabled={isLoading}
            >
              <RefreshCw className={cn("h-3 w-3", isLoading && "animate-spin")} />
              <span>{isLoading ? "Syncing..." : "Sync Now"}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
