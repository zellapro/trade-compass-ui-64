
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface StrategyTableProps {
  timeframe: string;
}

// Mock data for strategy table
const strategyData = [
  {
    id: 1,
    name: "Bull Flag",
    trades: 23,
    winRate: 78,
    avgRR: 2.1,
    profit: 2850,
    profitFactor: 3.2,
    expectancy: 1.5,
    maxDrawdown: 450,
    isTop: true,
  },
  {
    id: 2,
    name: "VWAP Bounce",
    trades: 17,
    winRate: 65,
    avgRR: 1.8,
    profit: 1450,
    profitFactor: 2.4,
    expectancy: 0.9,
    maxDrawdown: 380,
    isTop: true,
  },
  {
    id: 3,
    name: "Reversal",
    trades: 14,
    winRate: 62,
    avgRR: 1.5,
    profit: 920,
    profitFactor: 1.9,
    expectancy: 0.7,
    maxDrawdown: 320,
    isTop: false,
  },
  {
    id: 4,
    name: "Breakout",
    trades: 29,
    winRate: 70,
    avgRR: 1.9,
    profit: 2120,
    profitFactor: 2.8,
    expectancy: 1.2,
    maxDrawdown: 520,
    isTop: true,
  },
  {
    id: 5,
    name: "VWAP Rejection",
    trades: 12,
    winRate: 55,
    avgRR: 1.2,
    profit: 480,
    profitFactor: 1.4,
    expectancy: 0.5,
    maxDrawdown: 290,
    isTop: false,
  }
];

export function StrategyTable({ timeframe }: StrategyTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Strategy</TableHead>
            <TableHead className="text-right">Trades</TableHead>
            <TableHead className="text-right">Win Rate</TableHead>
            <TableHead className="text-right">Avg RR</TableHead>
            <TableHead className="text-right">Profit</TableHead>
            <TableHead className="text-right">Profit Factor</TableHead>
            <TableHead className="text-right">Expectancy</TableHead>
            <TableHead className="text-right">Max Drawdown</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {strategyData.map((strategy) => (
            <TableRow key={strategy.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <span>{strategy.name}</span>
                  {strategy.isTop && (
                    <Badge variant="outline" className="bg-trading-blue-light text-trading-blue-dark">
                      Top
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">{strategy.trades}</TableCell>
              <TableCell className="text-right font-medium">{strategy.winRate}%</TableCell>
              <TableCell className="text-right font-medium">{strategy.avgRR}R</TableCell>
              <TableCell className="text-right font-medium text-trading-green">${strategy.profit}</TableCell>
              <TableCell className="text-right">{strategy.profitFactor}</TableCell>
              <TableCell className="text-right">{strategy.expectancy}</TableCell>
              <TableCell className="text-right font-medium text-trading-red">${strategy.maxDrawdown}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
