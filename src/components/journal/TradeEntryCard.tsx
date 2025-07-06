
import { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp,
  Edit, 
  BarChart, 
  Star, 
  Tag, 
  Plus, 
  BookOpen,
  Copy,
  Share2,
  Pin,
  MessageSquare,
  Image,
  FileText,
  ArrowRightLeft,
  Clock,
  BookText
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Trade } from "@/pages/Journal";
import { EnhancedTradeChart } from "./EnhancedTradeChart";
import { TradeSummaryHeader } from "./TradeSummaryHeader";
import { TagsSection } from "./TagsSection";
import { EmotionTracker } from "./EmotionTracker";
import { TradeRatingCard } from "./TradeRatingCard";
import { TradeNotesCard } from "./TradeNotesCard";
import { AiInsightCard } from "./AiInsightCard";
import { StrategySelector } from "./StrategySelector";
import { SelectedStrategy } from "./StrategySelectionModal";
import { StrategyDisplay } from "./StrategyDisplay";

interface TradeEntryCardProps {
  trade: Trade;
}

export function TradeEntryCard({ trade }: TradeEntryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(trade.pinned);
  
  const tradeStrategy: SelectedStrategy | undefined = trade.strategyCategory ? {
    categoryId: trade.strategyCategory,
    setupIds: trade.setupIds || [],
    gradeId: trade.setupGrade,
    contextTagIds: trade.contextTags || [],
    isFavorite: trade.isFavoriteStrategy || false,
    notes: trade.strategyNotes || ""
  } : undefined;

  // Example tags, would come from trade data in a real implementation
  const tradeTags = [
    ...(trade.outcome === "win" ? [{ type: "perfect" as const, label: "Perfect Setup", highlight: true }] : []),
    ...(trade.outcome === "loss" ? [{ type: "mistake" as const, label: "FOMO Entry", highlight: true }] : []),
    { type: "setup" as const, label: trade.setup, highlight: true },
    { type: "strategy" as const, label: trade.strategy, highlight: false },
    ...trade.emotionTags.map(tag => ({ type: "emotion" as const, label: tag, highlight: false })),
  ];

  const dummyPatternInsights = trade.outcome === "win" 
    ? ["You tend to exit too early on winning trades", "This setup performs better in morning sessions", "Consider scaling out in 2 parts next time"] 
    : ["Common pattern: FOMO entry on momentum tickers", "You often break your trading plan on similar setups", "Consider reducing position size on similar setups"];

  const dummySimilarTrades = [
    { id: "T1", ticker: "NVDA", date: "Apr 12", outcome: "win" },
    { id: "T2", ticker: "AAPL", date: "Apr 8", outcome: "loss" },
    { id: "T3", ticker: "MSFT", date: "Apr 5", outcome: "win" },
  ];

  return (
    <Card className={`${expanded ? "col-span-full" : ""} bg-background/95 backdrop-blur border border-border/50`}>
      <CardHeader className="pb-0 px-0 pt-0">
        <TradeSummaryHeader trade={trade} />
      </CardHeader>
      
      <CardContent className="space-y-4 pt-4">
        <TagsSection tags={tradeTags} />
        
        <div className="aspect-[16/9] max-h-[400px] overflow-hidden relative rounded-md">
          <EnhancedTradeChart trade={trade} />
        </div>
        
        {tradeStrategy && (
          <StrategyDisplay 
            strategy={tradeStrategy}
            variant="inline"
            size="sm"
          />
        )}
        
        {!tradeStrategy && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setStrategyModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-background/50 hover:bg-accent/50 border-dashed"
          >
            <Plus className="h-4 w-4" />
            Add Strategy & Setup
          </Button>
        )}
        
        {expanded && (
          <div className="space-y-4">
            <Separator />
            
            <Tabs defaultValue="review">
              <TabsList className="w-full">
                <TabsTrigger value="review" className="flex-1">Trade Review</TabsTrigger>
                <TabsTrigger value="emotions" className="flex-1">Psychology</TabsTrigger>
                <TabsTrigger value="analysis" className="flex-1">AI Analysis</TabsTrigger>
                <TabsTrigger value="attachments" className="flex-1">Attachments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="review" className="mt-4 space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <TradeNotesCard 
                      tradePlan={trade.notes} 
                      entryReason="Entry based on support level bounce with volume confirmation." 
                      exitReason="Exit at target price level with some resistance showing."
                      lessonLearned="Patience paid off - waiting for confirmation before entry was key."
                      reflection="Could have sized up given the strength of the setup. Consider adding more when plan is working."
                    />
                  </div>
                  
                  <TradeRatingCard 
                    setupQuality={8}
                    planAdherence={9}
                    executionQuality={7}
                    emotionalControl={8}
                    overallGrade="A-"
                  />
                </div>
                
                <div className="p-3 rounded-md border border-border/50 bg-background/70">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">Trade Rules Check:</span>
                      {trade.ruleChecks.map((rule, i) => (
                        <Badge
                          key={i}
                          variant={rule.passed ? "outline" : "error"}
                          className="text-xs flex items-center px-2 py-0.5"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full mr-1 ${rule.passed ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          {rule.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="emotions" className="mt-4">
                <EmotionTracker 
                  beforeEmotions={["Calm", "Focused"]} 
                  duringEmotions={["Confident"]} 
                  afterEmotions={["Excited"]} 
                />
                
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium">Psychological Markers</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="flex items-center justify-between space-x-2 rounded-md border px-3 py-2">
                      <label htmlFor="fomo" className="text-sm font-medium">FOMO Trade</label>
                      <Switch id="fomo" />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2 rounded-md border px-3 py-2">
                      <label htmlFor="revenge" className="text-sm font-medium">Revenge Trade</label>
                      <Switch id="revenge" />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2 rounded-md border px-3 py-2">
                      <label htmlFor="oversized" className="text-sm font-medium">Oversized</label>
                      <Switch id="oversized" />
                    </div>
                    
                    <div className="flex items-center justify-between space-x-2 rounded-md border px-3 py-2">
                      <label htmlFor="early-exit" className="text-sm font-medium">Early Exit</label>
                      <Switch id="early-exit" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analysis" className="mt-4">
                <AiInsightCard 
                  aiSummary={trade.aiSummary}
                  patternInsights={dummyPatternInsights}
                  similarTrades={dummySimilarTrades}
                />
              </TabsContent>
              
              <TabsContent value="attachments" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-md border p-4 space-y-3">
                    <h4 className="text-sm font-medium flex items-center">
                      <Image className="h-4 w-4 mr-1.5" />
                      Trade Screenshots
                    </h4>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="h-24 w-32 flex flex-col items-center justify-center gap-1 border-dashed">
                        <Plus className="h-5 w-5" />
                        <span className="text-xs">Add Screenshot</span>
                      </Button>
                      {/* Here would be a list of uploaded screenshots */}
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-4 space-y-3">
                    <h4 className="text-sm font-medium flex items-center">
                      <FileText className="h-4 w-4 mr-1.5" />
                      Contextual Documents
                    </h4>
                    
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start text-left">
                        <FileText className="h-4 w-4 mr-2" />
                        <div className="flex-1 truncate">
                          <span className="block text-sm">Day Plan</span>
                          <span className="block text-xs text-muted-foreground">PDF · 245KB</span>
                        </div>
                      </Button>
                      
                      <Button variant="outline" size="sm" className="w-full justify-start text-left">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        <div className="flex-1 truncate">
                          <span className="block text-sm">Discord Chat</span>
                          <span className="block text-xs text-muted-foreground">TXT · 18KB</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="py-2 px-4 flex justify-between border-t bg-muted/50">
        <div className="flex items-center -ml-2 gap-1">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Edit className="h-3.5 w-3.5 mr-1" />
            Edit
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <BarChart className="h-3.5 w-3.5 mr-1" />
            Stats
          </Button>
          
          <StrategySelector
            compact={true}
            buttonLabel="Strategy"
            currentStrategy={tradeStrategy}
            className="h-8 px-2"
            onStrategyChange={(strategy) => {
              console.log("Strategy updated:", strategy);
            }}
          />
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2"
            onClick={() => setIsPinned(!isPinned)}
          >
            <Pin className={`h-3.5 w-3.5 mr-1 ${isPinned ? 'fill-amber-400 text-amber-400' : ''}`} />
            {isPinned ? 'Pinned' : 'Pin'}
          </Button>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Copy className="h-3.5 w-3.5 mr-1" />
            Copy
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Share2 className="h-3.5 w-3.5 mr-1" />
            Share
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(prev => !prev)}
            className="h-8 px-2"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5 mr-1" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5 mr-1" />
                Expand
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
