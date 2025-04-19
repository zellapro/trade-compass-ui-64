
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Zap, TrendingUp, TrendingDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AiInsightsPanel() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Zap className="h-5 w-5 text-trading-blue" />
          <span>AI Trading Performance Coach</span>
        </CardTitle>
        <CardDescription>Smart insights and recommendations based on your data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-2 mt-1">
                <TrendingUp className="h-4 w-4 text-trading-blue" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-trading-blue">Edge Detected</div>
                <p className="text-sm text-muted-foreground">Your Bull Flag setup has a 78% win rate with 2.1R average return. This is your most profitable pattern but only accounts for 23% of your trades.</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">High Accuracy Pattern</Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Opportunity</Badge>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>Helpful</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    <span>Not useful</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 rounded-full p-2 mt-1">
                <TrendingDown className="h-4 w-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-amber-700">Time-Based Pattern</div>
                <p className="text-sm text-muted-foreground">Your win rate drops by 22% on Fridays compared to other weekdays. The data suggests emotional trading increases before weekends.</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-amber-50 text-amber-700">Day Pattern</Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-700">Emotional Trading</Badge>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>Helpful</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    <span>Not useful</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 rounded-full p-2 mt-1">
                <Star className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-green-700">Improvement Trend</div>
                <p className="text-sm text-muted-foreground">Your average RR ratio improved from 1.1 to 2.1 over the last 8 weeks. This correlates with your focus on waiting for A+ setups.</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">Progress</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">Better Execution</Badge>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>Helpful</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    <span>Not useful</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="w-full">Show All Insights</Button>
        </div>
      </CardContent>
    </Card>
  );
}
