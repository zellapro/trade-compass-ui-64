
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RiskMetricsPanelProps {
  timeframe: string;
}

export function RiskMetricsPanel({ timeframe }: RiskMetricsPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <CircleDollarSign className="h-5 w-5" />
          <span>Risk Management Insights</span>
        </CardTitle>
        <CardDescription>Analysis of your risk management behaviors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Average Risk per Trade</div>
            <div className="text-2xl font-bold">$124.50</div>
            <div className="text-xs text-muted-foreground">1.2% of account</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Max Risk Taken</div>
            <div className="text-2xl font-bold text-trading-red">$320.00</div>
            <div className="text-xs text-muted-foreground">3.1% of account</div>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Risk Consistency</span>
              <span className="font-medium">75%</span>
            </div>
            <Progress value={75} className="h-2" />
            <div className="text-xs text-muted-foreground mt-1">Standard deviation: $45.20</div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Risk of Ruin</span>
              <span className="font-medium">3.2%</span>
            </div>
            <Progress value={3.2} className="h-2" />
            <div className="text-xs text-muted-foreground mt-1">Based on your current win rate and position sizing</div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Kelly Criterion</span>
              <span className="font-medium">18.4%</span>
            </div>
            <Progress value={18.4} className="h-2" />
            <div className="text-xs text-muted-foreground mt-1">Recommended position size: 1.5% of account</div>
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-3 text-sm">
          <div className="font-medium mb-1">Risk Management Advice:</div>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Your risk management is generally consistent, but 3 trades exceeded your 2% risk rule</li>
            <li>Consider lowering max risk to 2.5% on volatile stocks</li>
            <li>Your win rate allows for slightly larger position sizes with low risk of ruin</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
