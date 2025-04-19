
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

interface MistakeAnalyticsChartProps {
  timeframe: string;
}

// Mock data for mistake analytics
const mistakeData = [
  { name: "Chased Entry", cost: 850, frequency: 12, color: "#EF4444" },
  { name: "No Confirmation", cost: 650, frequency: 8, color: "#F97316" },
  { name: "Revenge Trade", cost: 780, frequency: 6, color: "#F59E0B" },
  { name: "Moved Stop", cost: 950, frequency: 9, color: "#EF4444" },
  { name: "Early Exit", cost: 520, frequency: 14, color: "#F97316" },
  { name: "Size Too Large", cost: 1250, frequency: 7, color: "#EF4444" }
];

export function MistakeAnalyticsChart({ timeframe }: MistakeAnalyticsChartProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Trading Mistakes Analysis</CardTitle>
        <CardDescription>Cost and frequency of common trading errors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={mistakeData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="#EF4444" 
                label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }} 
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#3B82F6" 
                label={{ value: 'Frequency', angle: 90, position: 'insideRight' }} 
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-trading-red">
                          Cost: <span className="font-mono">${payload[0].value}</span>
                        </p>
                        <p className="text-sm text-trading-blue">
                          Frequency: <span className="font-mono">{payload[1].value} times</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="cost" name="Cost Impact ($)" fill="#EF4444" />
              <Bar yAxisId="right" dataKey="frequency" name="Frequency" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-sm text-muted-foreground">Costliest Mistake</div>
              <div className="text-xl font-bold text-trading-red">Size Too Large</div>
              <div className="text-sm text-muted-foreground">$1,250 lost across 7 trades</div>
            </div>
            
            <div className="bg-card rounded-lg p-4 border">
              <div className="text-sm text-muted-foreground">Most Frequent Error</div>
              <div className="text-xl font-bold text-trading-orange">Early Exit</div>
              <div className="text-sm text-muted-foreground">14 instances, $520 cost</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">AI-Suggested Improvements:</div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100">
                Practice proper position sizing
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                Set stop and target before entry
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                Wait for confirmation signals
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
