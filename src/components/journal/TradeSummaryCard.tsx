
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, ArrowDown, ArrowUp, Clock, DollarSign, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TradeSummaryCardProps {
  trade?: {
    id: string;
    ticker: string;
    date: string;
    time: string;
    type: 'Long' | 'Short' | 'Option' | 'Future';
    setup: string;
    strategy: string;
    entryPrice: number;
    exitPrice: number;
    size: number;
    risk: number;
    reward: number;
    pnl: number;
    pnlPercentage: number;
    rMultiple: number;
    session: 'Morning' | 'Midday' | 'Power Hour' | 'Closing';
    confidence: number;
    isWin: boolean;
  };
}

// Demo trade data
const demoTrade = {
  id: "TRD-2023-04-19-001",
  ticker: "TSLA",
  date: "2025-04-19",
  time: "10:30 AM",
  type: "Long" as const,
  setup: "Breakout",
  strategy: "VWAP Reclaim",
  entryPrice: 164.25,
  exitPrice: 168.40,
  size: 100,
  risk: 150,
  reward: 415,
  pnl: 415,
  pnlPercentage: 2.53,
  rMultiple: 2.77,
  session: "Morning" as const,
  confidence: 4,
  isWin: true
};

export function TradeSummaryCard({ trade = demoTrade }: TradeSummaryCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-xl">
            {trade.ticker}
          </CardTitle>
          <Badge variant={trade.type === "Long" ? "default" : "destructive"}>
            {trade.type}
          </Badge>
          <Badge variant="outline" className="bg-trading-blue-light text-trading-blue-dark">
            {trade.setup}
          </Badge>
        </div>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={18} 
              className={cn(
                "text-muted-foreground", 
                i < trade.confidence && "text-yellow-500 fill-yellow-500"
              )} 
            />
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Date & Time</div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-muted-foreground" />
              <span>{trade.date} {trade.time}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Strategy</div>
            <div className="flex items-center gap-2">
              <BarChart2 size={16} className="text-muted-foreground" />
              <span>{trade.strategy}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Session</div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-muted-foreground" />
              <span>{trade.session}</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-3" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-2 rounded-md border bg-accent/30">
            <div className="text-sm text-muted-foreground">Entry / Exit</div>
            <div className="flex items-center justify-between mt-1">
              <div className="font-medium">${trade.entryPrice.toFixed(2)}</div>
              <ArrowRight />
              <div className="font-medium">${trade.exitPrice.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="p-2 rounded-md border bg-accent/30">
            <div className="text-sm text-muted-foreground">Size</div>
            <div className="mt-1 font-medium">{trade.size} shares</div>
          </div>
          
          <div className="p-2 rounded-md border bg-accent/30">
            <div className="text-sm text-muted-foreground">Risk / Reward</div>
            <div className="flex items-center justify-between mt-1">
              <div className="font-medium">${trade.risk}</div>
              <ArrowRight />
              <div className="font-medium">${trade.reward}</div>
            </div>
          </div>
          
          <div className="p-2 rounded-md border bg-accent/30">
            <div className="text-sm text-muted-foreground">R-Multiple</div>
            <div className="mt-1 font-medium">{trade.rMultiple.toFixed(2)}R</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className={cn(
            "flex-1 p-3 rounded-md text-white font-medium",
            trade.isWin ? "bg-green-500" : "bg-red-500"
          )}>
            <div className="text-sm opacity-80">P&L</div>
            <div className="flex items-center gap-2 mt-1">
              <DollarSign size={18} />
              <span className="text-xl">${trade.pnl.toFixed(2)}</span>
              <span className="text-sm opacity-80">({trade.pnlPercentage.toFixed(2)}%)</span>
              {trade.isWin ? 
                <ArrowUp className="ml-auto" /> : 
                <ArrowDown className="ml-auto" />
              }
            </div>
          </div>
          
          <div className="flex-1 p-3 rounded-md border">
            <div className="text-sm text-muted-foreground">Trade ID</div>
            <div className="mt-1 font-mono">{trade.id}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
}
