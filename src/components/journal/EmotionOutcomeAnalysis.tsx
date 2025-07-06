
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function EmotionOutcomeAnalysis() {
  // Sample emotion data
  const emotionsData = [
    { emotion: "Confidence", winRate: 68, count: 24 },
    { emotion: "FOMO", winRate: 32, count: 18 },
    { emotion: "Patience", winRate: 75, count: 16 },
    { emotion: "Frustration", winRate: 25, count: 12 },
    { emotion: "Calm", winRate: 82, count: 22 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Emotion & Outcome Analysis</CardTitle>
        <CardDescription>
          How your emotional state correlates with trade outcomes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-2">
            {emotionsData.map((item) => (
              <div key={item.emotion} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={item.winRate > 50 ? "default" : "outline"} className="text-xs">
                    {item.emotion}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {item.count} trades
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-2 w-24 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`${item.winRate > 50 ? "bg-green-500" : "bg-red-500"}`}
                      style={{ width: `${item.winRate}%` }}
                    />
                  </div>
                  <span className={`text-xs ${item.winRate > 50 ? "text-green-500" : "text-red-500"}`}>
                    {item.winRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Insights</h4>
            <p className="text-sm text-muted-foreground">
              Trades executed with "Calm" and "Patience" show significantly better outcomes. 
              Consider practicing mindfulness before trading sessions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
