
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data - in a real app, this would come from an API
const trades = [
  {
    id: "TR-7234",
    symbol: "AAPL",
    type: "Buy",
    entry: "$187.25",
    exit: "$189.50",
    pnl: "+$225.00",
    date: "2024-04-18",
    status: "win",
  },
  {
    id: "TR-7233",
    symbol: "MSFT",
    type: "Sell",
    entry: "$414.75",
    exit: "$412.30",
    pnl: "+$245.00",
    date: "2024-04-18",
    status: "win",
  },
  {
    id: "TR-7232",
    symbol: "TSLA",
    type: "Buy",
    entry: "$166.40",
    exit: "$165.10",
    pnl: "-$130.00",
    date: "2024-04-17",
    status: "loss",
  },
  {
    id: "TR-7231",
    symbol: "NVDA",
    type: "Buy",
    entry: "$825.50",
    exit: "$836.00",
    pnl: "+$525.00",
    date: "2024-04-17",
    status: "win",
  },
  {
    id: "TR-7230",
    symbol: "AMZN",
    type: "Sell",
    entry: "$183.50",
    exit: "$180.25",
    pnl: "+$325.00",
    date: "2024-04-16",
    status: "win",
  },
];

export function RecentTrades() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Entry</TableHead>
              <TableHead>Exit</TableHead>
              <TableHead>P&L</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell className="font-medium">{trade.id}</TableCell>
                <TableCell className="font-medium">{trade.symbol}</TableCell>
                <TableCell>{trade.type}</TableCell>
                <TableCell>{trade.entry}</TableCell>
                <TableCell>{trade.exit}</TableCell>
                <TableCell
                  className={
                    trade.pnl.startsWith("+")
                      ? "text-trading-green"
                      : "text-trading-red"
                  }
                >
                  {trade.pnl}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      trade.status === "win"
                        ? "border-trading-green text-trading-green"
                        : "border-trading-red text-trading-red"
                    }
                  >
                    {trade.status === "win" ? "Win" : "Loss"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
