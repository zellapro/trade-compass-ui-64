
import { Trade } from "@/pages/Journal";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Clock } from "lucide-react";

interface TradeSummaryHeaderProps {
  trade: Trade;
}

export function TradeSummaryHeader({ trade }: TradeSummaryHeaderProps) {
  const entryDate = new Date(trade.entryTime);
  const exitDate = new Date(trade.exitTime);
  
  // Calculate time in trade
  const timeInTradeMs = exitDate.getTime() - entryDate.getTime();
  const hours = Math.floor(timeInTradeMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeInTradeMs % (1000 * 60 * 60)) / (1000 * 60));
  const timeInTradeFormatted = hours > 0 
    ? `${hours}h ${minutes}m` 
    : `${minutes}m`;
  
  // Determine trade direction
  const isLong = trade.exitPrice > trade.entryPrice;
  
  // Determine trade session
  const getTradeSession = (date: Date) => {
    const hours = date.getHours();
    if (hours < 9.5) return "Pre-Market";
    if (hours >= 16) return "After-Hours";
    return "Regular";
  };
  
  const session = getTradeSession(entryDate);
  
  return (
    <div className="p-4 rounded-lg border border-border/50 bg-background/95 backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">{trade.ticker}</h2>
            <Badge 
              variant={isLong ? "success" : "error"}
              className="flex items-center gap-1 px-2"
            >
              {isLong ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {isLong ? "Long" : "Short"}
            </Badge>
            <Badge variant="outline" className="text-xs font-medium">
              <Clock className="h-3 w-3 mr-1" />
              {session}
            </Badge>
          </div>
          
          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-3 mt-1.5">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Entry:</span>
              <span className="font-medium">${trade.entryPrice.toFixed(2)}</span>
              <span className="text-xs">@ {entryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Exit:</span>
              <span className="font-medium">${trade.exitPrice.toFixed(2)}</span>
              <span className="text-xs">@ {exitDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{timeInTradeFormatted}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Size:</span>
              <span className="font-medium">{trade.size.toLocaleString()} shares</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-xl font-bold tracking-tight ${trade.pnl > 0 ? 'text-green-500' : trade.pnl < 0 ? 'text-red-500' : ''}`}>
            {trade.pnl > 0 ? '+' : ''}{trade.pnl.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </div>
          <div className="flex items-center justify-end text-sm gap-2 mt-0.5">
            <span className={`font-medium ${trade.pnlPct > 0 ? 'text-green-500' : trade.pnlPct < 0 ? 'text-red-500' : ''}`}>
              {trade.pnlPct > 0 ? '+' : ''}{trade.pnlPct}%
            </span>
            <span className="text-muted-foreground">·</span>
            <span className={`tabular-nums font-medium ${trade.rMultiple >= 1 ? 'text-green-500' : trade.rMultiple < 0 ? 'text-red-500' : 'text-yellow-500'}`}>
              {trade.rMultiple}R
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
