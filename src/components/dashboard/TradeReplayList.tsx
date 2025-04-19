
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Sample trade data
const tradeReplays = [
  {
    id: 1,
    ticker: "AAPL",
    date: "Apr 18",
    time: "10:30 AM",
    pnl: 350,
    direction: "long",
    duration: "18m",
  },
  {
    id: 2,
    ticker: "MSFT",
    date: "Apr 17",
    time: "11:45 AM",
    pnl: -120,
    direction: "long",
    duration: "25m",
  },
  {
    id: 3,
    ticker: "AMZN",
    date: "Apr 17",
    time: "2:15 PM",
    pnl: 280,
    direction: "short",
    duration: "15m",
  }
];

export function TradeReplayList() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Trade Replay</CardTitle>
        <CardDescription>Review your recent trades</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tradeReplays.map((trade) => (
            <div 
              key={trade.id} 
              className="flex items-stretch border rounded-md overflow-hidden"
            >
              <div 
                className={cn(
                  "w-1/4 relative",
                  trade.pnl > 0 ? "bg-trading-green-light" : "bg-trading-red-light"
                )}
              >
                {/* Mini chart preview */}
                <div className="absolute inset-0 flex items-center justify-center opacity-25">
                  {trade.pnl > 0 ? (
                    <TrendingUp className="h-8 w-8 text-trading-green" />
                  ) : (
                    <TrendingDown className="h-8 w-8 text-trading-red" />
                  )}
                </div>
              </div>

              <div className="flex-1 p-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{trade.ticker}</span>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs",
                        trade.direction === "long" ? "bg-trading-green-light text-trading-green-dark" : 
                        "bg-trading-red-light text-trading-red-dark"
                      )}
                    >
                      {trade.direction === "long" ? "LONG" : "SHORT"}
                    </Badge>
                  </div>
                  <span 
                    className={cn(
                      "font-medium text-sm",
                      trade.pnl > 0 ? "text-trading-green" : "text-trading-red"
                    )}
                  >
                    {trade.pnl > 0 ? "+" : ""}{trade.pnl}$
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{trade.date} • {trade.time} • {trade.duration}</span>
                  </div>
                  <Link to={`/replay?trade=${trade.id}`}>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                      <PlayCircle className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
