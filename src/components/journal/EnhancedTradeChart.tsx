import { useState } from "react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { Maximize, Minimize, Play } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trade } from "@/pages/Journal";

interface EnhancedTradeChartProps {
  trade: Trade;
  fullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

const generateChartData = (trade: Trade) => {
  const basePrice = trade.entryPrice;
  const priceRange = Math.abs(trade.exitPrice - trade.entryPrice);
  const timePoints = 12;
  
  return Array.from({ length: timePoints }, (_, i) => {
    const time = new Date(new Date(trade.entryTime).getTime() + i * 15 * 60 * 1000)
      .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let price;
    if (i === 0) {
      price = basePrice;
    } else if (i === timePoints - 1) {
      price = trade.exitPrice;
    } else {
      const progress = i / (timePoints - 1);
      const direction = trade.exitPrice > trade.entryPrice ? 1 : -1;
      const randomFactor = Math.random() * 0.5 - 0.25;
      price = basePrice + (priceRange * progress * direction) + (randomFactor * priceRange);
    }
    
    return {
      time,
      price,
      volume: Math.floor(Math.random() * 10000) + 5000,
      direction: Math.random() > 0.5 ? 'up' : 'down'
    };
  });
};

export function EnhancedTradeChart({ trade, fullscreen = false, onToggleFullscreen }: EnhancedTradeChartProps) {
  const [timeframe, setTimeframe] = useState('1m');
  const chartData = generateChartData(trade);
  
  const priceData = chartData.map(d => ({
    time: d.time,
    price: d.price
  }));
  
  const volumeData = chartData.map(d => ({
    time: d.time,
    volume: d.volume,
    direction: d.direction
  }));
  
  const annotations = [
    { time: priceData[0].time, price: trade.entryPrice, type: 'entry', label: 'Entry' },
    { time: priceData[priceData.length - 1].time, price: trade.exitPrice, type: 'exit', label: 'Exit' }
  ];
  
  return (
    <div className={`rounded-lg border border-border/50 bg-background/95 ${fullscreen ? "h-full" : ""}`}>
      <div className="p-4 pb-2 flex flex-row items-center justify-between border-b border-border/50">
        <div>
          <h3 className="text-lg font-semibold">{trade.ticker} - {new Date(trade.entryTime).toLocaleDateString()}</h3>
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
      </div>
      <div className="p-4">
        <div className="relative">
          <div className="absolute top-2 right-2 z-10 space-x-2">
            <Button variant="secondary" size="sm" className="gap-1 h-7">
              <Play size={14} />
              <span>Replay</span>
            </Button>
          </div>
          <div className="h-[280px] bg-accent/30 rounded-md border overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={priceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const priceValue = Number(payload[0].value);
                      return (
                        <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                          <p className="font-medium">{label}</p>
                          <p className="text-sm">
                            Price: <span className="font-mono">${priceValue.toFixed(2)}</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[80px] mt-2 bg-accent/30 rounded-md border overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={volumeData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="time" />
                <YAxis hide />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const volumeValue = Number(payload[0].value);
                      return (
                        <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                          <p className="font-medium">{label}</p>
                          <p className="text-sm">
                            Volume: <span className="font-mono">{volumeValue.toFixed(0)}</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="volume" 
                  fill="#8884d8" 
                >
                  {volumeData.map((entry, index) => (
                    <Cell 
                      key={`volume-${index}`} 
                      fill={entry.direction === 'up' ? '#22C55E' : '#EF4444'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
