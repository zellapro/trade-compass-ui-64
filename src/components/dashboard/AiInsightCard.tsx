
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Lightbulb, TrendingUp, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const insights = [
  {
    icon: <TrendingUp className="h-4 w-4" />,
    title: "Your trading edge this week",
    content: "Morning Breakouts have a 78% win rate",
    color: "text-trading-blue"
  },
  {
    icon: <Calendar className="h-4 w-4" />,
    title: "Day of week analysis",
    content: "You lose most money on Fridays — consider journaling emotions",
    color: "text-trading-red"
  },
  {
    icon: <Lightbulb className="h-4 w-4" />,
    title: "Setup comparison",
    content: "You're 30% more accurate when using Setup B vs Setup A",
    color: "text-trading-green"
  },
  {
    icon: <Clock className="h-4 w-4" />,
    title: "Time management",
    content: "Your average holding time has decreased by 15% with better results",
    color: "text-trading-blue"
  }
];

export function AiInsightCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">AI Insights</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Brain className="h-3 w-3" />
            <span>AI-Powered</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex">
              <div className={`mt-0.5 mr-3 ${insight.color}`}>
                {insight.icon}
              </div>
              <div>
                <h4 className="text-sm font-medium">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.content}</p>
              </div>
            </div>
          ))}
          
          <div className="pt-2">
            <h4 className="text-sm font-medium">Improvement Tips</h4>
            <ul className="mt-1 space-y-1">
              <li className="text-xs flex items-center text-trading-green">
                <span className="mr-1.5">✓</span>
                <span>Increase position sizing on high-probability setups</span>
              </li>
              <li className="text-xs flex items-center text-trading-red">
                <span className="mr-1.5">✗</span>
                <span>Reduce trading during FOMC announcements</span>
              </li>
              <li className="text-xs flex items-center text-trading-blue">
                <span className="mr-1.5">→</span>
                <span>Consider adding stop loss to all trades</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
