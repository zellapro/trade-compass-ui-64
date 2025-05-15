
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrokerCard } from "./BrokerCard";
import type { BrokerAccount } from "./BrokerIntegrationPanel";

interface BrokerCategoryProps {
  title: string;
  brokers: {
    id: string;
    name: string;
    description: string;
    image: string;
    category?: string;
  }[];
}

const BrokerCategory: React.FC<BrokerCategoryProps> = ({ title, brokers }) => {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {brokers.map((broker) => (
          <BrokerCard
            key={broker.id}
            broker={{
              id: broker.id,
              name: broker.name,
              logo: broker.image,
              type: "Real", // Using allowed type value
              status: "Connected",
              lastSync: new Date().toISOString(),
              autoImport: true,
              category: broker.category || "stocks" // Providing default category
            }}
            onToggleAutoImport={() => {}}
            onDisconnect={() => {}}
            onSync={() => {}}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default BrokerCategory;
