
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RefreshCw, Trash2, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export interface BrokerAccount {
  id: string;
  name: string;
  logo: string;
  type: 'Real' | 'Demo';
  status: 'Connected' | 'Error' | 'Expired';
  lastSync: string;
  autoImport: boolean;
  category: 'crypto' | 'forex' | 'stocks' | 'futures';
}

export interface BrokerCardProps {
  broker: BrokerAccount;
  onToggleAutoImport: (id: string, newValue: boolean) => void;
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
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, yyyy 'at' h:mm a");
    } catch (e) {
      return "Unknown date";
    }
  };
  
  return (
    <Card className="p-4 shadow-sm hover:shadow transition-shadow duration-200">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-3">
          <div className="bg-muted/50 rounded-md h-10 w-10 flex items-center justify-center">
            {broker.logo ? (
              <img 
                src={broker.logo} 
                alt={`${broker.name} logo`}
                className="max-h-8 max-w-8 object-contain"
              />
            ) : (
              <span className="font-medium text-lg">{broker.name.substring(0, 2)}</span>
            )}
          </div>
          <div>
            <div className="font-medium">{broker.name}</div>
            <div className="text-xs text-muted-foreground flex items-center">
              <Badge 
                variant={broker.type === 'Real' ? 'success' : 'outline'} 
                className="text-[10px] px-1 py-0 h-4"
              >
                {broker.type}
              </Badge>
              <span className="mx-1">•</span>
              <span>{broker.category.charAt(0).toUpperCase() + broker.category.slice(1)}</span>
            </div>
          </div>
        </div>
        
        <Badge 
          variant={
            broker.status === 'Connected' ? 'success' : 
            broker.status === 'Error' ? 'error' : 'warning'
          }
          className="text-xs"
        >
          {broker.status}
        </Badge>
      </div>
      
      <div className="text-xs text-muted-foreground mb-3">
        Last sync: {formatDate(broker.lastSync)}
        {broker.status === 'Error' && (
          <div className="flex items-center mt-1 text-red-500">
            <AlertCircle className="h-3 w-3 mr-1" />
            <span>Connection error. Please reconnect.</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between border-t pt-3">
        <div className="flex items-center space-x-2">
          <Switch
            checked={broker.autoImport}
            onCheckedChange={(checked) => onToggleAutoImport(broker.id, checked)}
            disabled={broker.status !== 'Connected'}
          />
          <span className="text-xs">Auto-import</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2"
            onClick={() => onSync(broker)}
            disabled={isLoading}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="ml-1 text-xs">Sync</span>
          </Button>
          
          <Button
            variant="outline" 
            size="sm"
            className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDisconnect(broker.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="sr-only">Disconnect</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
