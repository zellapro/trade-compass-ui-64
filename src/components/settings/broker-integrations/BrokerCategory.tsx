
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrokerCard } from "./BrokerCard";

interface BrokerCategoryProps {
  title: string;
  brokers: {
    id: string;
    name: string;
    description: string;
    image: string;
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
              description: broker.description,
              image: broker.image,
              logo: broker.image,
              type: "Real", // Changed from "Standard" to "Real" to match expected type
              status: "Connected",
              lastSync: new Date().toISOString(),
              autoImport: true
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
