
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, RefreshCw, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { BrokerCard, type BrokerAccount } from "./BrokerCard";

interface Broker {
  id: string;
  name: string;
  logoUrl?: string;
  region: string;
  apiKey: string;
  apiSecret: string;
  status: 'Connected' | 'Disconnected' | 'Error';
  lastSync?: string;
  autoSync: boolean;
  connectionType: string;
  accountLabel?: string;
}

interface BrokerCategoryProps {
  title: string;
  description: string;
  brokers: Broker[];
  onConnect: (
    id: string,
    apiKey: string, 
    apiSecret: string, 
    region: string,
    connectionType: string,
    accountLabel?: string
  ) => void;
  onDisconnect: (id: string) => void;
  onToggleSync: (id: string, enabled: boolean) => void;
  onEdit: (id: string) => void;
  onSync: (id: string) => void;
  isLoading?: boolean;
}

const BrokerCategory: React.FC<BrokerCategoryProps> = ({
  title,
  description,
  brokers,
  onConnect,
  onDisconnect,
  onToggleSync,
  onEdit,
  onSync,
  isLoading = false
}) => {
  const convertToBrokerAccount = (broker: Broker): BrokerAccount => {
    return {
      id: broker.id,
      name: broker.name,
      logo: broker.logoUrl || "",
      type: "Real", // You might want to make this dynamic based on your data
      status: broker.status === "Connected" ? "Connected" : 
             broker.status === "Error" ? "Error" : "Expired",
      lastSync: broker.lastSync || new Date().toISOString(),
      autoImport: broker.autoSync,
      category: "forex" // You might want to make this dynamic based on your data
    };
  };

  const handleSyncNow = (brokerAccount: BrokerAccount) => {
    onSync(brokerAccount.id);
  };

  // If you want to display in a grid for more modern look
  const renderModernLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {brokers.map((broker) => (
        <BrokerCard
          key={broker.id}
          broker={convertToBrokerAccount(broker)}
          onDisconnect={onDisconnect}
          onToggleAutoImport={(id, newValue) => onToggleSync(id, newValue)}
          onSync={handleSyncNow}
          isLoading={isLoading}
        />
      ))}
    </div>
  );

  // If you want to display in a table for more data-dense view
  const renderTableLayout = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Sync</TableHead>
          <TableHead>Auto Sync</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brokers.map((broker) => (
          <TableRow key={broker.id}>
            <TableCell className="font-medium">{broker.name}</TableCell>
            <TableCell>
              {broker.status === 'Connected' && (
                <Badge variant="success" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Connected
                </Badge>
              )}
              {broker.status === 'Disconnected' && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <XCircle className="h-3 w-3" /> Disconnected
                </Badge>
              )}
              {broker.status === 'Error' && (
                <Badge variant="error" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> Error
                </Badge>
              )}
            </TableCell>
            <TableCell>{broker.lastSync || 'Never'}</TableCell>
            <TableCell>
              <Switch 
                checked={broker.autoSync} 
                onCheckedChange={(checked) => onToggleSync(broker.id, checked)}
                disabled={broker.status !== 'Connected'}
              />
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={broker.status !== 'Connected' || isLoading}
                  onClick={() => onSync(broker.id)}
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onEdit(broker.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onDisconnect(broker.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        {brokers.length === 0 ? (
          <div className="text-center py-8 bg-muted/30 rounded-md">
            <p className="text-muted-foreground">No brokers connected yet</p>
            <Button 
              variant="link" 
              className="mt-2"
              onClick={() => {
                // This is a placeholder since we're not implementing the full connection flow
                // In a real implementation, you'd open a modal or navigate to a connection page
                console.log('Connect new broker clicked');
              }}
            >
              Connect a broker <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        ) : (
          renderModernLayout()
        )}
      </CardContent>
    </Card>
  );
};

export default BrokerCategory;
