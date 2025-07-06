
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trade } from "@/pages/Journal";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, BarChart, Calendar, Clock, DollarSign } from "lucide-react";

interface TradeStatsModalProps {
  trade: Trade;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TradeStatsModal({ trade, open, onOpenChange }: TradeStatsModalProps) {
  // Calculate overall trade statistics
  const riskAmount = trade.size * Math.abs(trade.entryPrice - trade.exitPrice) * 0.5; // Simplified calculation
  const rewardAmount = trade.pnl;
  const riskRewardRatio = (rewardAmount / riskAmount).toFixed(2);
  const holdTimeInMinutes = Math.round((new Date(trade.exitTime).getTime() - new Date(trade.entryTime).getTime()) / 60000);
  const fees = Math.round(trade.size * 0.001 * trade.entryPrice) + Math.round(trade.size * 0.001 * trade.exitPrice);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Trade Statistics: {trade.ticker}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-medium">{trade.ticker} {trade.outcome === "win" ? "Win" : trade.outcome === "loss" ? "Loss" : "Breakeven"}</h3>
              <p className="text-xs text-muted-foreground">
                {new Date(trade.entryTime).toLocaleString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
            
            <div className={`text-xl font-bold ${trade.pnl >= 0 ? 'text-trading-green' : 'text-trading-red'}`}>
              {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Position Size</p>
                    <p className="font-medium">{trade.size} shares</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">R-Multiple</p>
                    <p className="font-medium">{trade.rMultiple}R</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Risk/Reward</p>
                    <p className="font-medium">1:{riskRewardRatio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Hold Time</p>
                    <p className="font-medium">{holdTimeInMinutes} mins</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Trade Details</h4>
            
            <div className="grid grid-cols-2 gap-y-2 rounded-md border p-3 text-sm">
              <div className="font-medium">Entry Price</div>
              <div className="text-right">${trade.entryPrice.toFixed(2)}</div>
              
              <div className="font-medium">Exit Price</div>
              <div className="text-right">${trade.exitPrice.toFixed(2)}</div>
              
              <div className="font-medium">Fees (est.)</div>
              <div className="text-right">${fees.toFixed(2)}</div>
              
              <div className="font-medium">Net P&L</div>
              <div className={`text-right font-medium ${trade.pnl >= 0 ? 'text-trading-green' : 'text-trading-red'}`}>
                ${trade.pnl.toFixed(2)} ({trade.pnlPct.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
