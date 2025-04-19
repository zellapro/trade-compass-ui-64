
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

interface ConsistencyTrackerProps {
  timeframe: string;
}

// Mock data for consistency tracker
const consistencyData = [
  { week: "Week 1", winRate: 56, avgRR: 1.1, execScore: 6.5 },
  { week: "Week 2", winRate: 58, avgRR: 1.2, execScore: 6.8 },
  { week: "Week 3", winRate: 54, avgRR: 1.0, execScore: 6.2 },
  { week: "Week 4", winRate: 60, avgRR: 1.3, execScore: 7.0 },
  { week: "Week 5", winRate: 65, avgRR: 1.5, execScore: 7.4 },
  { week: "Week 6", winRate: 62, avgRR: 1.4, execScore: 7.2 },
  { week: "Week 7", winRate: 68, avgRR: 1.6, execScore: 7.8 },
  { week: "Week 8", winRate: 72, avgRR: 1.9, execScore: 8.1 },
  { week: "Week 9", winRate: 70, avgRR: 1.8, execScore: 8.0 },
  { week: "Week 10", winRate: 75, avgRR: 2.1, execScore: 8.5 }
];

export function ConsistencyTracker({ timeframe }: ConsistencyTrackerProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Consistency & Progress Tracker</CardTitle>
        <CardDescription>Tracking your key metrics over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={consistencyData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="week" tick={{ fontSize: 10 }} />
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              domain={[50, 80]} 
              label={{ value: 'Win Rate (%)', angle: -90, position: 'insideLeft' }} 
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              domain={[0, 3]} 
              label={{ value: 'R-Multiple', angle: 90, position: 'insideRight' }} 
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                      <p className="font-medium">{label}</p>
                      <p className="text-sm" style={{ color: "#3B82F6" }}>
                        Win Rate: <span className="font-mono">{payload[0].value}%</span>
                      </p>
                      <p className="text-sm" style={{ color: "#10B981" }}>
                        Avg R-Multiple: <span className="font-mono">{payload[1].value}R</span>
                      </p>
                      <p className="text-sm" style={{ color: "#8B5CF6" }}>
                        Execution Score: <span className="font-mono">{payload[2].value}/10</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <ReferenceLine yAxisId="left" y={65} stroke="#64748B" strokeDasharray="3 3" label="Target Win Rate" />
            <ReferenceLine yAxisId="right" y={1.5} stroke="#64748B" strokeDasharray="3 3" label="Target RR" />
            <Line yAxisId="left" type="monotone" dataKey="winRate" stroke="#3B82F6" activeDot={{ r: 8 }} name="Win Rate (%)" />
            <Line yAxisId="right" type="monotone" dataKey="avgRR" stroke="#10B981" name="Avg R-Multiple" />
            <Line yAxisId="left" type="monotone" dataKey="execScore" stroke="#8B5CF6" name="Execution Score" />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-sm text-muted-foreground">Win Rate Trend</div>
            <div className="text-xl font-bold text-trading-blue">↗ Improving</div>
            <div className="text-sm text-trading-blue">+19% over period</div>
          </div>
          
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-sm text-muted-foreground">R-Multiple Trend</div>
            <div className="text-xl font-bold text-trading-green">↗ Improving</div>
            <div className="text-sm text-trading-green">+1.0R over period</div>
          </div>
          
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-sm text-muted-foreground">Execution Quality</div>
            <div className="text-xl font-bold text-trading-purple">↗ Improving</div>
            <div className="text-sm text-trading-purple">+2.0 points over period</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
