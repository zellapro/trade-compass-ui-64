
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SetupPerformancePanelProps {
  timeframe?: string;
}

// Setup performance data
const setupPerformanceData = [
  {
    name: "Order Blocks",
    category: "SMC/ICT",
    winRate: 78,
    profit: 2580,
    avgRR: 2.4,
    trades: 35,
    grade: { aPlus: 45, a: 30, b: 15, c: 10 },
    bestTrade: "$650 (2.8R)",
    worstTrade: "-$180 (-0.8R)",
  },
  {
    name: "Break of Structure",
    category: "SMC/ICT",
    winRate: 72,
    profit: 1950,
    avgRR: 2.1,
    trades: 28,
    grade: { aPlus: 40, a: 32, b: 18, c: 10 },
    bestTrade: "$520 (2.6R)",
    worstTrade: "-$210 (-1.0R)",
  },
  {
    name: "Pin Bar / Rejection",
    category: "Price Action",
    winRate: 68,
    profit: 1830,
    avgRR: 1.9,
    trades: 32,
    grade: { aPlus: 35, a: 33, b: 22, c: 10 },
    bestTrade: "$480 (2.4R)",
    worstTrade: "-$190 (-0.9R)",
  },
  {
    name: "VWAP Bounce/Rejection",
    category: "Indicator",
    winRate: 70,
    profit: 1760,
    avgRR: 2.0,
    trades: 25,
    grade: { aPlus: 38, a: 32, b: 20, c: 10 },
    bestTrade: "$510 (2.5R)",
    worstTrade: "-$200 (-1.0R)",
  },
  {
    name: "Fibonacci Retracement",
    category: "Fibonacci",
    winRate: 65,
    profit: 1420,
    avgRR: 1.8,
    trades: 22,
    grade: { aPlus: 30, a: 35, b: 20, c: 15 },
    bestTrade: "$450 (2.2R)",
    worstTrade: "-$220 (-1.1R)",
  },
  {
    name: "Trend Pullback",
    category: "Trend",
    winRate: 75,
    profit: 2240,
    avgRR: 2.2,
    trades: 30,
    grade: { aPlus: 42, a: 33, b: 15, c: 10 },
    bestTrade: "$580 (2.7R)",
    worstTrade: "-$190 (-0.9R)",
  },
  {
    name: "Gap Fill",
    category: "Gap/News",
    winRate: 62,
    profit: 1280,
    avgRR: 1.7,
    trades: 18,
    grade: { aPlus: 28, a: 34, b: 25, c: 13 },
    bestTrade: "$420 (2.1R)",
    worstTrade: "-$230 (-1.2R)",
  },
  {
    name: "Opening Range Breakout",
    category: "Intraday",
    winRate: 73,
    profit: 2180,
    avgRR: 2.1,
    trades: 29,
    grade: { aPlus: 40, a: 35, b: 15, c: 10 },
    bestTrade: "$540 (2.6R)",
    worstTrade: "-$200 (-1.0R)",
  }
];

export function SetupPerformancePanel({ timeframe = "all" }: SetupPerformancePanelProps) {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Setup Performance</CardTitle>
            <CardDescription>Detailed analysis of individual trading setups</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="smc">SMC/ICT</SelectItem>
                <SelectItem value="price-action">Price Action</SelectItem>
                <SelectItem value="indicator">Indicator-Based</SelectItem>
                <SelectItem value="pattern">Pattern-Based</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="winrate">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="winrate">Win Rate</SelectItem>
                <SelectItem value="profit">Total Profit</SelectItem>
                <SelectItem value="rr">Avg R:R</SelectItem>
                <SelectItem value="trades">Trade Count</SelectItem>
                <SelectItem value="grade">Best Grade %</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Setup</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Win Rate</TableHead>
                <TableHead className="text-right">Net P&L</TableHead>
                <TableHead className="text-right">Avg R:R</TableHead>
                <TableHead className="text-right">Trades</TableHead>
                <TableHead>Grade Distribution</TableHead>
                <TableHead className="text-right">Best / Worst</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {setupPerformanceData.map((setup, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{setup.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {setup.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{setup.winRate}%</TableCell>
                  <TableCell className="text-right font-medium text-trading-green">${setup.profit}</TableCell>
                  <TableCell className="text-right">{setup.avgRR}R</TableCell>
                  <TableCell className="text-right">{setup.trades}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-xs">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        A+: {setup.grade.aPlus}%
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        A/B: {setup.grade.a + setup.grade.b}%
                      </Badge>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        C/D: {setup.grade.c}%
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-xs">
                    <div className="flex flex-col">
                      <span className="text-trading-green">{setup.bestTrade}</span>
                      <span className="text-trading-red">{setup.worstTrade}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
