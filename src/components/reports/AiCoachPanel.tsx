
import { useState } from "react";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  ChevronDown, 
  Calendar, 
  AlertTriangle, 
  TrendingUp,
  Star,
  Clock,
  Zap,
  Shield
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AiCoachPanelProps {
  timeframe?: string;
}

export function AiCoachPanel({ timeframe = "30d" }: AiCoachPanelProps) {
  const [cardsExpanded, setCardsExpanded] = useState<Record<string, boolean>>({
    card1: false,
    card2: false,
    card3: false,
    card4: false
  });

  const toggleCard = (cardId: string) => {
    setCardsExpanded(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="insights">Key Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        </TabsList>
        
        {/* Key Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          {/* Insight Card 1 */}
          <Card className="border border-blue-500/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-blue-500/10 text-blue-400 mr-3">
                    <Lightbulb size={18} />
                  </div>
                  <h3 className="font-medium">Setup Performance Pattern</h3>
                </div>
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-800">
                  High Confidence
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                You are most profitable when you follow your morning plan and execute OB setups with RR &gt; 2.
                These trades have 76% win rate and 2.4x average RR.
              </p>
              <Collapsible open={cardsExpanded.card1}>
                <CollapsibleTrigger 
                  onClick={() => toggleCard('card1')}
                  className="flex items-center text-xs text-muted-foreground hover:text-foreground cursor-pointer mt-1"
                >
                  <span>{cardsExpanded.card1 ? 'Show Less' : 'Show Details'}</span>
                  <ChevronDown size={14} className={`ml-1 transition-transform ${cardsExpanded.card1 ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-2 text-sm">
                  <div className="p-2 border border-border/50 rounded-md bg-muted/5">
                    <p className="text-muted-foreground">
                      When combining Order Block setups with pre-planned entries and clear RR targets above 2.0, 
                      your win rate increases by 18% compared to your average.
                    </p>
                  </div>
                  <div className="p-2 border border-border/50 rounded-md bg-muted/5">
                    <p className="text-muted-foreground">
                      You've taken 35 trades with this approach, generating $3,850 in profits (42% of total P&L).
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-1">
                    View Related Trades
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
          
          {/* Insight Card 2 */}
          <Card className="border border-amber-500/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-amber-500/10 text-amber-400 mr-3">
                    <AlertTriangle size={18} />
                  </div>
                  <h3 className="font-medium">News Volatility Impact</h3>
                </div>
                <Badge className="bg-amber-500/10 text-amber-400 border-amber-800">
                  Medium Confidence
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Setup success drops significantly when entering trades during high news volatility.
                Win rate decreases from 68% to 42% during news events.
              </p>
              <Collapsible open={cardsExpanded.card2}>
                <CollapsibleTrigger 
                  onClick={() => toggleCard('card2')}
                  className="flex items-center text-xs text-muted-foreground hover:text-foreground cursor-pointer mt-1"
                >
                  <span>{cardsExpanded.card2 ? 'Show Less' : 'Show Details'}</span>
                  <ChevronDown size={14} className={`ml-1 transition-transform ${cardsExpanded.card2 ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-2 text-sm">
                  <div className="p-2 border border-border/50 rounded-md bg-muted/5">
                    <p className="text-muted-foreground">
                      You've taken 18 trades during major news events (FOMC, CPI, NFP) with only 7 winners.
                      Average RR on these trades is 0.9 versus your overall average of 2.1.
                    </p>
                  </div>
                  <div className="p-2 border border-border/50 rounded-md bg-muted/5">
                    <p className="text-muted-foreground">
                      Consider implementing a "news blackout" rule for 30 minutes before and after major economic announcements.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-1">
                    View Event Calendar
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
          
          {/* Insight Card 3 */}
          <Card className="border border-red-500/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-red-500/10 text-red-400 mr-3">
                    <AlertTriangle size={18} />
                  </div>
                  <h3 className="font-medium">Discipline Breakdown Detection</h3>
                </div>
                <Badge className="bg-red-500/10 text-red-400 border-red-800">
                  High Confidence
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Mindset journaling skipped in last 4 trades — discipline breakdown detected.
                Non-journaled trades show 35% lower win rate.
              </p>
              <Collapsible open={cardsExpanded.card3}>
                <CollapsibleTrigger 
                  onClick={() => toggleCard('card3')}
                  className="flex items-center text-xs text-muted-foreground hover:text-foreground cursor-pointer mt-1"
                >
                  <span>{cardsExpanded.card3 ? 'Show Less' : 'Show Details'}</span>
                  <ChevronDown size={14} className={`ml-1 transition-transform ${cardsExpanded.card3 ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-2 text-sm">
                  <div className="p-2 border border-border/50 rounded-md bg-muted/5">
                    <p className="text-muted-foreground">
                      Your last 4 trades lacked pre-trade planning and post-trade analysis documentation.
                      These trades resulted in a combined loss of $650.
                    </p>
                  </div>
                  <div className="p-2 border border-border/50 rounded-md bg-muted/5">
                    <p className="text-muted-foreground">
                      Historical pattern: when you skip journaling for 3+ consecutive trades, win rate drops from
                      68% to 45% and average RR drops from 2.1 to 1.2.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-1">
                    Resume Journaling
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          {/* Recommendation Card 1 */}
          <Card className="border border-emerald-500/20 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400 mr-3">
                    <Calendar size={18} />
                  </div>
                  <h3 className="font-medium">Calendar Optimization</h3>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-800">
                  High Impact
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Reduce Wednesday exposure — overtrading detected with 42% lower win rate 
                compared to your Tuesday/Friday performance.
              </p>
              <Collapsible open={cardsExpanded.card4}>
                <CollapsibleTrigger 
                  onClick={() => toggleCard('card4')}
                  className="flex items-center text-xs text-muted-foreground hover:text-foreground cursor-pointer mt-1"
                >
                  <span>{cardsExpanded.card4 ? 'Show Less' : 'Show Details'}</span>
                  <ChevronDown size={14} className={`ml-1 transition-transform ${cardsExpanded.card4 ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-2 text-sm">
                  <div className="p-2 border border-border/50 rounded-md bg-muted/5">
                    <p className="text-muted-foreground">
                      Your win rate on Wednesdays is 58% compared to 78% on Tuesdays and 75% on Fridays.
                      Additionally, your average RR on Wednesdays is 1.2 versus 2.3 on Tuesdays.
                    </p>
                  </div>
                  <div className="p-2 border border-border/50 rounded-md bg-muted/5">
                    <p className="text-muted-foreground">
                      Consider using Wednesdays for practice trades, research, or taking fewer high-conviction trades
                      rather than your current high-volume approach.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-1">
                    Adjust Trading Calendar
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
          
          {/* More recommendation cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-blue-500/20 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="p-2 rounded-md bg-blue-500/10 text-blue-400 mr-3">
                    <Clock size={18} />
                  </div>
                  <h3 className="font-medium">Entry Timing</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add delay entry filter near NYSE open — win rate drops sharply in first 15 minutes.
                  Consider waiting until 9:45 AM for higher probability setups.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-blue-500/20 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="p-2 rounded-md bg-blue-500/10 text-blue-400 mr-3">
                    <TrendingUp size={18} />
                  </div>
                  <h3 className="font-medium">Position Sizing</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Consider increasing size on OB setups with structure + FVG confluence.
                  These setups have 82% win rate with 2.5+ RR.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-blue-500/20 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="p-2 rounded-md bg-blue-500/10 text-blue-400 mr-3">
                    <Shield size={18} />
                  </div>
                  <h3 className="font-medium">Emotional Management</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your most consistent emotional state: Calm + Pre-planned = 2.5x RR.
                  Implement pre-trade breathing routine to maintain optimal state.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border border-blue-500/20 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="p-2 rounded-md bg-blue-500/10 text-blue-400 mr-3">
                    <Star size={18} />
                  </div>
                  <h3 className="font-medium">Learning Focus</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Review your emotional control techniques — this area scores lowest (58/100) on your trader identity profile.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Progress Tracking Tab */}
        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Current Focus Areas</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Emotional Control</span>
                      <span className="text-sm text-muted-foreground">58/100</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: "58%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Scaling Out Technique</span>
                      <span className="text-sm text-muted-foreground">62/100</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: "62%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Consistency in Journaling</span>
                      <span className="text-sm text-muted-foreground">65/100</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Avoiding FOMO Entries</span>
                      <span className="text-sm text-muted-foreground">72/100</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "72%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Coaching Plan</h3>
                <div className="space-y-2">
                  <div className="p-2 border border-border/50 bg-muted/5 rounded-md flex items-center">
                    <div className="p-1 mr-2 rounded-full bg-blue-500/20 text-blue-400">
                      <Zap size={14} />
                    </div>
                    <span className="text-sm">Review emotional trading module</span>
                  </div>
                  
                  <div className="p-2 border border-border/50 bg-muted/5 rounded-md flex items-center">
                    <div className="p-1 mr-2 rounded-full bg-blue-500/20 text-blue-400">
                      <Zap size={14} />
                    </div>
                    <span className="text-sm">Practice scaling technique drills</span>
                  </div>
                  
                  <div className="p-2 border border-border/50 bg-muted/5 rounded-md flex items-center">
                    <div className="p-1 mr-2 rounded-full bg-blue-500/20 text-blue-400">
                      <Zap size={14} />
                    </div>
                    <span className="text-sm">Complete daily trading journal</span>
                  </div>
                  
                  <div className="p-2 border border-border/50 bg-muted/5 rounded-md flex items-center">
                    <div className="p-1 mr-2 rounded-full bg-blue-500/20 text-blue-400">
                      <Zap size={14} />
                    </div>
                    <span className="text-sm">Weekly review with mentor</span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full mt-1">
                    View Full Coaching Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Recent Improvements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Win Rate</h4>
                    <Badge className="bg-emerald-500/10 text-emerald-400">+8%</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Increased from 60% to 68% over last 30 days
                  </p>
                </div>
                
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Avg R:R</h4>
                    <Badge className="bg-emerald-500/10 text-emerald-400">+0.3</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Improved from 1.8 to 2.1 over last 30 days
                  </p>
                </div>
                
                <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Plan Adherence</h4>
                    <Badge className="bg-emerald-500/10 text-emerald-400">+12%</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Increased from 75% to 87% plan following
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
