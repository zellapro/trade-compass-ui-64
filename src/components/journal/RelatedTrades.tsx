
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

// Sample data for related trades
const relatedTrades = [
  { id: "TRD-2025-04-18-003", date: "Apr 18", ticker: "TSLA", setup: "Breakout", pnl: 345, isWin: true },
  { id: "TRD-2025-04-15-002", date: "Apr 15", ticker: "TSLA", setup: "VWAP Reclaim", pnl: -120, isWin: false },
  { id: "TRD-2025-04-12-001", date: "Apr 12", ticker: "TSLA", setup: "Morning Gap", pnl: 210, isWin: true },
  { id: "TRD-2025-04-05-004", date: "Apr 05", ticker: "TSLA", setup: "Breakout", pnl: 180, isWin: true },
  { id: "TRD-2025-03-28-006", date: "Mar 28", ticker: "AAPL", setup: "VWAP Reclaim", pnl: 95, isWin: true }
];

export function RelatedTrades() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Related Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Ticker</TableHead>
              <TableHead>Setup</TableHead>
              <TableHead className="text-right">P&L</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {relatedTrades.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell className="font-medium">{trade.date}</TableCell>
                <TableCell>{trade.ticker}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {trade.setup}
                  </Badge>
                </TableCell>
                <TableCell className={cn(
                  "text-right font-medium",
                  trade.isWin ? "text-green-600" : "text-red-600"
                )}>
                  {trade.isWin ? "+" : ""}{trade.pnl}
                </TableCell>
                <TableCell>
                  <ExternalLink size={14} className="cursor-pointer text-muted-foreground hover:text-foreground" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
