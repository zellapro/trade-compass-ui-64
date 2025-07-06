import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, RefreshCw, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { BrokerCard } from "./BrokerCard";  // Fixed import to use named import instead of default

interface Broker {
  id: string;
  name: string;
  type: string;
  category: string;
  connected: boolean;
  requiresSecret?: boolean;
  docsUrl?: string;
  region?: string;
  lastSync?: string;
  status?: string;
}

interface BrokerCategoryProps {
  title: string;
  brokers: Broker[];
  onConnect: (id: string, apiKey: string, apiSecret: string, region: string, connectionType: string, accountLabel?: string) => void;
  onDisconnect: (id: string) => void;
  onResync: (id: string) => void;
}

const BrokerCategory: React.FC<BrokerCategoryProps> = ({
  title,
  brokers,
  onConnect,
  onDisconnect,
  onResync,
}) => {
  const connectedBrokers = brokers.filter(broker => broker.connected);
  const unconnectedBrokers = brokers.filter(broker => !broker.connected);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-600 hover:bg-green-700 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Active</Badge>;
      case "Disconnected":
        return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="h-3 w-3" /> Disconnected</Badge>;
      case "Failed":
        return <Badge variant="destructive" className="flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'short', 
        timeStyle: 'short'
      }).format(date);
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="space-y-6">
      {/* Connected Accounts Table */}
      {connectedBrokers.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Connected {title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Last Sync</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connectedBrokers.map(broker => (
                  <TableRow key={broker.id}>
                    <TableCell className="font-medium">{broker.name}</TableCell>
                    <TableCell>{broker.region || "Global"}</TableCell>
                    <TableCell>{broker.lastSync ? formatDate(broker.lastSync) : "Never"}</TableCell>
                    <TableCell>{broker.status ? getStatusBadge(broker.status) : "Unknown"}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onResync(broker.id)}
                          className="h-8 px-2 flex items-center gap-1"
                        >
                          <RefreshCw className="h-4 w-4" />
                          Sync
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 px-2 flex items-center gap-1"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onDisconnect(broker.id)}
                          className="h-8 px-2 text-red-500 flex items-center gap-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Available Integrations */}
      {unconnectedBrokers.length > 0 && (
        <Card>
          <Collapsible defaultOpen={unconnectedBrokers.length > 0}>
            <CollapsibleTrigger className="w-full">
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <CardTitle className="text-lg">Available {title} Integrations</CardTitle>
                <ChevronRight className="h-5 w-5 transform transition-all duration-200 ui-expanded:rotate-90" />
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {unconnectedBrokers.map((broker) => (
                  <BrokerCard
                    key={broker.id}
                    {...broker}
                    onConnect={onConnect}
                    onDisconnect={onDisconnect}
                  />
                ))}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      )}
    </div>
  );
};

export default BrokerCategory;
