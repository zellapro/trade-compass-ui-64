
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function GoalProgressTracker() {
  // Sample goals data
  const goals = [
    { name: "Win Rate", current: 62, target: 65, progress: 95 },
    { name: "Monthly Profit", current: 2100, target: 3000, progress: 70 },
    { name: "Max Drawdown", current: 12, target: 10, progress: 83 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Goal Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{goal.name}</span>
                <span className="text-sm text-muted-foreground">
                  {goal.current} / {goal.target}
                </span>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
