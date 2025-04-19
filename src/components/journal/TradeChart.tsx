
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MarkerType,
  AreaSeries,
  BarSeries,
  CandlestickSeries,
  Chart,
  LineSeries,
  TimeAxis,
  ValueAxis,
  Annotation,
  ZoomButtons
} from "recharts";
import { Button } from "@/components/ui/button";
import { Play, Maximize, Minimize } from "lucide-react";
import { useState } from "react";

// Mock data for a candlestick chart
const candlestickData = [
  { time: '09:30', open: 163.55, high: 165.20, low: 163.10, close: 164.25 },
  { time: '09:45', open: 164.25, high: 164.80, low: 163.80, close: 164.35 },
  { time: '10:00', open: 164.35, high: 164.90, low: 164.10, close: 164.40 },
  { time: '10:15', open: 164.40, high: 165.30, low: 164.20, close: 164.75 },
  { time: '10:30', open: 164.75, high: 166.20, low: 164.60, close: 166.00 },
  { time: '10:45', open: 166.00, high: 166.80, low: 165.70, close: 166.60 },
  { time: '11:00', open: 166.60, high: 167.10, low: 166.20, close: 166.40 },
  { time: '11:15', open: 166.40, high: 166.70, low: 165.90, close: 166.10 },
  { time: '11:30', open: 166.10, high: 167.40, low: 166.00, close: 167.20 },
  { time: '11:45', open: 167.20, high: 167.90, low: 167.00, close: 167.55 },
  { time: '12:00', open: 167.55, high: 168.00, low: 167.30, close: 167.80 },
  { time: '12:15', open: 167.80, high: 168.50, low: 167.70, close: 168.40 }
];

// Mock volume data
const volumeData = candlestickData.map(d => ({
  time: d.time,
  volume: Math.floor(Math.random() * 10000) + 5000,
  direction: d.close > d.open ? 'up' : 'down'
}));

// Mock annotations (entries, exits, etc.)
const annotations = [
  { time: '10:30', value: 164.75, type: 'entry', label: 'Entry' },
  { time: '12:15', value: 168.40, type: 'exit', label: 'Exit' },
  { time: '10:30', value: 163.50, type: 'stop', label: 'Stop' }
];

interface TradeChartProps {
  fullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export function TradeChart({ fullscreen = false, onToggleFullscreen }: TradeChartProps) {
  const [timeframe, setTimeframe] = useState('1m');
  
  return (
    <Card className={fullscreen ? "h-full" : ""}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">TSLA - April 19, 2025</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="1m" className="h-8">
            <TabsList className="h-8">
              <TabsTrigger value="1m" className="h-7 px-2" onClick={() => setTimeframe('1m')}>1m</TabsTrigger>
              <TabsTrigger value="5m" className="h-7 px-2" onClick={() => setTimeframe('5m')}>5m</TabsTrigger>
              <TabsTrigger value="15m" className="h-7 px-2" onClick={() => setTimeframe('15m')}>15m</TabsTrigger>
              <TabsTrigger value="1D" className="h-7 px-2" onClick={() => setTimeframe('1D')}>1D</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="ghost" size="icon" onClick={onToggleFullscreen}>
            {fullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute top-2 right-2 z-10 space-x-2">
            <Button variant="secondary" size="sm" className="gap-1 h-7">
              <Play size={14} />
              <span>Replay</span>
            </Button>
          </div>
          <div className="h-[400px] bg-accent/30 flex items-center justify-center rounded-md border overflow-hidden">
            <div className="text-muted-foreground">
              The interactive chart will be displayed here, showing TSLA price action with your entry and exit points.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
