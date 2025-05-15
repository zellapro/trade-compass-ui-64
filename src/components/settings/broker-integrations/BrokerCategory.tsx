
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrokerCard } from "./BrokerCard";

interface BrokerCategoryProps {
  title: string;
  description: string;
  brokers: {
    id: string;
    name: string;
    description: string;
    image: string;
  }[];
}

export const BrokerCategory: React.FC<BrokerCategoryProps> = ({ title, description, brokers }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {brokers.map((broker) => (
          <BrokerCard
            key={broker.id}
            broker={{
              id: broker.id,
              name: broker.name,
              description: broker.description,
              image: broker.image,
              logo: broker.image,
              type: "Real", // Changed from "Standard" to "Real" to match the allowed type
              status: "Connected",
              lastSync: new Date().toISOString(),
              autoImport: true,
              category: "stocks" // Adding required category field
            }}
            onToggleAutoImport={() => {}}
            onDisconnect={() => {}}
            onSync={() => {}}
            isLoading={false} // Adding required isLoading prop
          />
        ))}
      </CardContent>
    </Card>
  );
};
