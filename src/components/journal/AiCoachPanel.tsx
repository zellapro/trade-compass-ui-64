
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, LightbulbIcon, AlertTriangle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample AI insights
const insights = [
  {
    id: 1,
    type: "pattern",
    icon: TrendingUp,
    content: "This VWAP Reclaim setup has a 78% win rate for you in the morning session. Your average R-multiple is 2.3 when entry is within 5 minutes of VWAP cross.",
    iconColor: "text-blue-500"
  },
  {
    id: 2,
    type: "improvement",
    icon: LightbulbIcon,
    content: "Your position size (100 shares) represents 1.5% account risk, which is optimal based on historical performance. Trades above 2% risk have shown a 30% lower win rate.",
    iconColor: "text-amber-500"
  },
  {
    id: 3,
    type: "warning",
    icon: AlertTriangle,
    content: "You've had 3 consecutive wins trading TSLA. Historical data shows your win rate drops by 15% after win streaks of 3 or more. Consider tighter risk management.",
    iconColor: "text-red-500"
  }
];

export function AiCoachPanel() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">AI Coach Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="bg-accent/30 p-3 rounded-md">
              <div className="flex gap-3">
                <div className={cn("mt-0.5", insight.iconColor)}>
                  <insight.icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{insight.content}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="ghost" size="sm" className="h-7 gap-1.5">
                      <ThumbsUp size={14} />
                      <span className="text-xs">Helpful</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 gap-1.5">
                      <ThumbsDown size={14} />
                      <span className="text-xs">Not Helpful</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" size="sm" className="w-full mt-3">
          Generate More Insights
        </Button>
      </CardContent>
    </Card>
  );
}
