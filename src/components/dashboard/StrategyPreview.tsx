
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Sample strategy data
const strategies = [
  {
    id: 1,
    name: "Bull Flag",
    winRate: 78,
    avgRR: 2.1,
    tradeCount: 23,
    isTop: true,
  },
  {
    id: 2,
    name: "VWAP Bounce",
    winRate: 65,
    avgRR: 1.8,
    tradeCount: 17,
    isTop: true,
  },
  {
    id: 3,
    name: "Breakout",
    winRate: 62,
    avgRR: 1.5,
    tradeCount: 29,
    isTop: true,
  }
];

export function StrategyPreview() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Top Strategies</CardTitle>
            <CardDescription>Your best performing setups</CardDescription>
          </div>
          <Link to="/performance">
            <Button variant="ghost" size="sm" className="gap-1">
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{strategy.name}</span>
                  {strategy.isTop && (
                    <Badge variant="outline" className="bg-trading-blue-light text-trading-blue-dark">
                      Top
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{strategy.tradeCount} trades</span>
                  <span className="flex items-center gap-1">
                    <span className={cn(
                      strategy.winRate > 70 ? "text-trading-green" : 
                      strategy.winRate > 60 ? "text-trading-blue" : 
                      "text-muted-foreground"
                    )}>
                      {strategy.winRate}% win rate
                    </span>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{strategy.avgRR}R</div>
                <div className="text-xs text-muted-foreground">avg return</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
