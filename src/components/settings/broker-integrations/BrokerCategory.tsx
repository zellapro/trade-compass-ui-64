
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BrokerCard } from './BrokerCard';

type BrokerType = "Real" | "Demo";
type AssetClass = "stocks" | "crypto" | "forex" | "futures";

interface Broker {
  id: string;
  name: string;
  logo: string;
  connected: boolean;
  accountType: BrokerType;
  assetClasses: AssetClass[];
  apiSupport: boolean;
  importSupport: boolean;
  verificationLevel: number;
}

interface BrokerCategoryProps {
  title: string;
  brokers: Broker[];
}

const BrokerCategory: React.FC<BrokerCategoryProps> = ({ title, brokers }) => {
  // Filter out duplicates by name for display
  const uniqueBrokers = brokers.reduce((acc: Broker[], current) => {
    const x = acc.find(item => item.name === current.name);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {uniqueBrokers.map((broker) => (
          <BrokerCard 
            key={broker.id}
            broker={{
              ...broker,
              accountType: broker.accountType as BrokerType,
              assetClasses: broker.assetClasses as AssetClass[]
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BrokerCategory;
