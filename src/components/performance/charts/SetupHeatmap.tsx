
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";

interface SetupHeatmapProps {
  timeframe: string;
}

// Mock data for setup heatmap
const setupData = [
  {
    setup: "Bull Flag",
    winRate: 78,
    avgRR: 2.1,
    profitFactor: 3.2,
    expectancy: 1.5,
    tradesPerDay: 2.3
  },
  {
    setup: "VWAP Bounce",
    winRate: 65,
    avgRR: 1.8,
    profitFactor: 2.4,
    expectancy: 0.9,
    tradesPerDay: 1.8
  },
  {
    setup: "Reversal",
    winRate: 62,
    avgRR: 1.5,
    profitFactor: 1.9,
    expectancy: 0.7,
    tradesPerDay: 1.5
  },
  {
    setup: "Breakout",
    winRate: 70,
    avgRR: 1.9,
    profitFactor: 2.8,
    expectancy: 1.2,
    tradesPerDay: 1.2
  },
  {
    setup: "VWAP Rejection",
    winRate: 55,
    avgRR: 1.2,
    profitFactor: 1.4,
    expectancy: 0.5,
    tradesPerDay: 0.9
  }
];

// Helper function to determine cell background color based on value
const getCellColor = (value: number, metric: string) => {
  const thresholds = {
    winRate: { poor: 55, average: 65, good: 75 },
    avgRR: { poor: 1, average: 1.5, good: 2 },
    profitFactor: { poor: 1.5, average: 2.2, good: 3 },
    expectancy: { poor: 0.5, average: 1, good: 1.5 },
    tradesPerDay: { poor: 1, average: 1.5, good: 2 }
  };

  const metricThresholds = thresholds[metric as keyof typeof thresholds];
  
  if (value >= metricThresholds.good) {
    return "bg-green-50 text-green-700"; // Good
  } else if (value >= metricThresholds.average) {
    return "bg-blue-50 text-blue-700"; // Average
  } else if (value >= metricThresholds.poor) {
    return "bg-yellow-50 text-yellow-700"; // Below average
  } else {
    return "bg-red-50 text-red-700"; // Poor
  }
};

export function SetupHeatmap({ timeframe }: SetupHeatmapProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Setup</TableHead>
            <TableHead className="text-center">Win Rate</TableHead>
            <TableHead className="text-center">Avg R-Multiple</TableHead>
            <TableHead className="text-center">Profit Factor</TableHead>
            <TableHead className="text-center">Expectancy</TableHead>
            <TableHead className="text-center">Trades/Day</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {setupData.map((row) => (
            <TableRow key={row.setup}>
              <TableCell className="font-medium">{row.setup}</TableCell>
              <TableCell className={`text-center ${getCellColor(row.winRate, "winRate")}`}>
                {row.winRate}%
              </TableCell>
              <TableCell className={`text-center ${getCellColor(row.avgRR, "avgRR")}`}>
                {row.avgRR}R
              </TableCell>
              <TableCell className={`text-center ${getCellColor(row.profitFactor, "profitFactor")}`}>
                {row.profitFactor}
              </TableCell>
              <TableCell className={`text-center ${getCellColor(row.expectancy, "expectancy")}`}>
                {row.expectancy}
              </TableCell>
              <TableCell className={`text-center ${getCellColor(row.tradesPerDay, "tradesPerDay")}`}>
                {row.tradesPerDay}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
