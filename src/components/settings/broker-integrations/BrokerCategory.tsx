
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import BrokerCard from "./BrokerCard";

interface Broker {
  id: string;
  name: string;
  type: string;
  category: string;
  connected: boolean;
  requiresSecret?: boolean;
  docsUrl?: string;
}

interface BrokerCategoryProps {
  title: string;
  brokers: Broker[];
  onConnect: (id: string, apiKey: string, secretKey?: string) => void;
  onDisconnect: (id: string) => void;
}

const BrokerCategory: React.FC<BrokerCategoryProps> = ({
  title,
  brokers,
  onConnect,
  onDisconnect,
}) => {
  return (
    <Card>
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-xl">{title}</CardTitle>
            <ChevronRight className="h-5 w-5 transform transition-all duration-200 ui-expanded:rotate-90" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {brokers.map((broker) => (
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
  );
};

export default BrokerCategory;
