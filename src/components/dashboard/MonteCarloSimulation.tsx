
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MonteCarloSimulation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Monte Carlo Simulation</CardTitle>
        <CardDescription>
          Run simulations based on your trading statistics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="h-[200px] bg-muted flex items-center justify-center rounded-md">
            <p className="text-sm text-muted-foreground">Simulation visualization will appear here</p>
          </div>
          <div className="flex justify-end">
            <Button size="sm">Run Simulation</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
