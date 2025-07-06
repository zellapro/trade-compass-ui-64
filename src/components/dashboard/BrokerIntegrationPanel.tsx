
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function BrokerIntegrationPanel() {
  return (
    <Card className="border-dashed border-2 border-muted">
      <CardHeader>
        <CardTitle className="text-lg">Broker Integration</CardTitle>
        <CardDescription>
          Connect your brokerage account to import trades automatically
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className="rounded-full bg-muted p-3">
            <PlusCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium">Connect Your Broker</h3>
            <p className="text-sm text-muted-foreground">
              Import your trades automatically from your broker
            </p>
          </div>
          <Button>Connect Broker</Button>
        </div>
      </CardContent>
    </Card>
  );
}
