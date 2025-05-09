
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Zap, AlertTriangle, Star, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

interface PlaybookAICompanionProps {
  activeTab: string;
}

export const PlaybookAICompanion: React.FC<PlaybookAICompanionProps> = ({ activeTab }) => {
  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Bot className="mr-2 h-5 w-5" />
          Playbook AI Companion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-muted">
            <Zap className="mr-1 h-3 w-3 text-amber-400" />
            AI Insights
          </Badge>
          <span className="text-xs text-muted-foreground">Updated 12 min ago</span>
        </div>
        
        {activeTab === "strategies" && (
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex gap-2">
                <Star className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Best Performing Strategy</h3>
                  <p className="text-sm text-muted-foreground">
                    Your OB Sweep strategy has maintained a 68% win rate over 47 trades. 
                    Consider focusing more on this setup.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex gap-2">
                <TrendingDown className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Decaying Strategy Alert</h3>
                  <p className="text-sm text-muted-foreground">
                    Your FVG Pullback strategy is showing reduced effectiveness (win rate dropped 12% in the last month).
                    Consider reviewing and optimizing its rules.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Execution Insight</h3>
                  <p className="text-sm text-muted-foreground">
                    You consistently take profits too early on BOS Retest setups (avg. 72% of target).
                    Consider using partial scaling on these trades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "blueprint" && (
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex gap-2">
                <TrendingUp className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Strategy Recommendation</h3>
                  <p className="text-sm text-muted-foreground">
                    Based on your trading history, a Momentum Breakout strategy would 
                    align well with your strengths. Try incorporating volume confirmation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Rule Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    When creating new strategies, include specific invalidation criteria. 
                    This was missing in 4 of your last 5 strategy blueprints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "missed" && (
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Missed Trade Pattern</h3>
                  <p className="text-sm text-muted-foreground">
                    You've missed 7 trades after experiencing losses, suggesting 
                    heightened risk aversion. Consider implementing a "reset routine" after losses.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex gap-2">
                <RefreshCw className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Time-Based Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    67% of your missed trades occur between 2:00-3:30 PM. 
                    Consider scheduling breaks or switching to reviewing mode during this period.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "shared" && (
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex gap-2">
                <TrendingUp className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Trending Strategies</h3>
                  <p className="text-sm text-muted-foreground">
                    Order Block based strategies are trending in the community this month.
                    The "Smart Money ICT Setup" has received high ratings.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex gap-2">
                <Star className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Strategy Compatibility</h3>
                  <p className="text-sm text-muted-foreground">
                    The "FVG Reversal Strategy" aligns with your trading style and 
                    could complement your existing OB Sweep setup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <Separator />
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Bot className="mr-2 h-4 w-4" />
              Ask AI
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
