
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { 
  findCategoryById, 
  strategyCategories, 
  setupGrades 
} from "@/data/strategyData";

interface StrategyTableProps {
  timeframe: string;
}

// Enhanced mock data for strategy table
const strategyData = [
  {
    id: "smc",
    name: "Smart Money Concepts (SMC/ICT)",
    trades: 42,
    winRate: 72,
    avgRR: 2.4,
    profit: 3850,
    profitFactor: 3.5,
    expectancy: 1.7,
    maxDrawdown: 520,
    bestSetup: "Order Blocks",
    setupGrades: { aPlus: 40, a: 35, b: 15, c: 10 },
    isTop: true,
  },
  {
    id: "price-action",
    name: "Price Action-Based",
    trades: 38,
    winRate: 68,
    avgRR: 1.9,
    profit: 2450,
    profitFactor: 2.8,
    expectancy: 1.3,
    maxDrawdown: 410,
    bestSetup: "Pin Bar / Rejection",
    setupGrades: { aPlus: 30, a: 40, b: 20, c: 10 },
    isTop: true,
  },
  {
    id: "pattern",
    name: "Pattern-Based",
    trades: 25,
    winRate: 60,
    avgRR: 1.7,
    profit: 1650,
    profitFactor: 2.2,
    expectancy: 1.0,
    maxDrawdown: 380,
    bestSetup: "Bull/Bear Flag",
    setupGrades: { aPlus: 25, a: 35, b: 30, c: 10 },
    isTop: false,
  },
  {
    id: "fibonacci",
    name: "Fibonacci-Based",
    trades: 18,
    winRate: 56,
    avgRR: 2.1,
    profit: 1120,
    profitFactor: 1.9,
    expectancy: 0.8,
    maxDrawdown: 340,
    bestSetup: "Fibonacci Retracement",
    setupGrades: { aPlus: 22, a: 33, b: 28, c: 17 },
    isTop: false,
  },
  {
    id: "indicator",
    name: "Indicator-Based",
    trades: 35,
    winRate: 63,
    avgRR: 1.8,
    profit: 1920,
    profitFactor: 2.4,
    expectancy: 1.1,
    maxDrawdown: 430,
    bestSetup: "VWAP Bounce/Rejection",
    setupGrades: { aPlus: 28, a: 32, b: 25, c: 15 },
    isTop: true,
  },
  {
    id: "breakout",
    name: "Breakout-Based",
    trades: 30,
    winRate: 65,
    avgRR: 1.6,
    profit: 1580,
    profitFactor: 2.1,
    expectancy: 0.9,
    maxDrawdown: 360,
    bestSetup: "Range Breakout",
    setupGrades: { aPlus: 26, a: 34, b: 28, c: 12 },
    isTop: false,
  },
  {
    id: "volume",
    name: "Volume-Based",
    trades: 20,
    winRate: 58,
    avgRR: 1.9,
    profit: 980,
    profitFactor: 1.8,
    expectancy: 0.7,
    maxDrawdown: 320,
    bestSetup: "Volume Climax",
    setupGrades: { aPlus: 20, a: 35, b: 30, c: 15 },
    isTop: false,
  },
  {
    id: "trend",
    name: "Trend Continuation & Reversal",
    trades: 33,
    winRate: 67,
    avgRR: 2.0,
    profit: 2150,
    profitFactor: 2.6,
    expectancy: 1.2,
    maxDrawdown: 390,
    bestSetup: "Trend Pullback",
    setupGrades: { aPlus: 32, a: 38, b: 20, c: 10 },
    isTop: true,
  },
  {
    id: "gap",
    name: "Gap and News-Based",
    trades: 22,
    winRate: 59,
    avgRR: 2.2,
    profit: 1280,
    profitFactor: 2.0,
    expectancy: 0.9,
    maxDrawdown: 350,
    bestSetup: "Gap Fill",
    setupGrades: { aPlus: 24, a: 36, b: 27, c: 13 },
    isTop: false,
  },
  {
    id: "intraday",
    name: "Intraday & Scalping",
    trades: 48,
    winRate: 70,
    avgRR: 1.5,
    profit: 2580,
    profitFactor: 2.9,
    expectancy: 1.4,
    maxDrawdown: 440,
    bestSetup: "Opening Range Breakout",
    setupGrades: { aPlus: 35, a: 40, b: 18, c: 7 },
    isTop: true,
  },
  {
    id: "options",
    name: "Options & Derivatives",
    trades: 15,
    winRate: 52,
    avgRR: 2.3,
    profit: 820,
    profitFactor: 1.6,
    expectancy: 0.6,
    maxDrawdown: 310,
    bestSetup: "Premium Decay",
    setupGrades: { aPlus: 18, a: 30, b: 32, c: 20 },
    isTop: false,
  },
  {
    id: "algo",
    name: "Algo / Quant-Based",
    trades: 12,
    winRate: 54,
    avgRR: 1.7,
    profit: 620,
    profitFactor: 1.5,
    expectancy: 0.5,
    maxDrawdown: 280,
    bestSetup: "Mean Reversion Algo",
    setupGrades: { aPlus: 16, a: 32, b: 34, c: 18 },
    isTop: false,
  },
  {
    id: "market-specific",
    name: "Market-Specific Variants",
    trades: 28,
    winRate: 62,
    avgRR: 1.8,
    profit: 1480,
    profitFactor: 2.2,
    expectancy: 1.0,
    maxDrawdown: 370,
    bestSetup: "Forex London Breakout",
    setupGrades: { aPlus: 24, a: 36, b: 25, c: 15 },
    isTop: false,
  }
];

export function StrategyTable({ timeframe }: StrategyTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Strategy Category</TableHead>
            <TableHead className="text-right">Trades</TableHead>
            <TableHead className="text-right">Win Rate</TableHead>
            <TableHead className="text-right">Avg RR</TableHead>
            <TableHead className="text-right">Net P&L</TableHead>
            <TableHead>Best Setup</TableHead>
            <TableHead>Grade Distribution</TableHead>
            <TableHead className="text-right">Action</TableHead>
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
              <TableCell>{strategy.bestSetup}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    A+: {strategy.setupGrades.aPlus}%
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    A/B: {strategy.setupGrades.a + strategy.setupGrades.b}%
                  </Badge>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    C/D: {strategy.setupGrades.c}%
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  View Trades
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
