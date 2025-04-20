
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const stats = [
  { 
    name: "VWAP Reclaim Win Rate", 
    value: 78, 
    benchmark: 65, 
    format: (v: number) => `${v}%`,
    comparison: "above"
  },
  { 
    name: "Average R-Multiple", 
    value: 2.77, 
    benchmark: 2.1, 
    format: (v: number) => `${v.toFixed(2)}R`,
    comparison: "above"
  },
  { 
    name: "TSLA Win Rate", 
    value: 72, 
    benchmark: 68, 
    format: (v: number) => `${v}%`,
    comparison: "above"
  },
  { 
    name: "Morning Session Win Rate", 
    value: 81, 
    benchmark: 73, 
    format: (v: number) => `${v}%`,
    comparison: "above"
  }
];

export function StatisticalSnapshot() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Statistical Snapshot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm">{stat.name}</span>
                <span className="text-sm font-medium">{stat.format(stat.value)}</span>
              </div>
              <div className="relative pt-1">
                <Progress value={stat.value} max={100} className="h-2" />
                <div 
                  className="absolute h-4 w-0.5 bg-black dark:bg-white opacity-50" 
                  style={{ left: `${stat.benchmark}%`, top: "2px" }}
                />
              </div>
              <div className="flex justify-end">
                <span className={cn(
                  "text-xs",
                  stat.comparison === "above" ? "text-green-600" : "text-amber-600"
                )}>
                  {stat.comparison === "above" ? "↑" : "↓"} vs. benchmark ({stat.format(stat.benchmark)})
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
