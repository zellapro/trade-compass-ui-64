
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp, Maximize2, Edit, BarChart, Star, Tag, Plus, BookOpen } from "lucide-react";
import { TradeChart } from "./TradeChart";
import { StatisticalSnapshot } from "./StatisticalSnapshot";
import { StrategySelector } from "./StrategySelector";
import { Trade } from "@/pages/Journal";
import { StrategyDisplay } from "./StrategyDisplay";
import { SelectedStrategy } from "./StrategySelectionModal";

interface TradeEntryCardProps {
  trade: Trade;
  quickLog?: boolean;
  voiceToJournal?: boolean;
}

export function TradeEntryCard({ trade, quickLog = false, voiceToJournal = false }: TradeEntryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);
  
  const tradeStrategy: SelectedStrategy | undefined = trade.strategyCategory ? {
    categoryId: trade.strategyCategory,
    setupIds: trade.setupIds || [],
    gradeId: trade.setupGrade,
    contextTagIds: trade.contextTags || [],
    isFavorite: trade.isFavoriteStrategy || false,
    notes: trade.strategyNotes || ""
  } : undefined;

  return (
    <Card className={`${expanded ? "col-span-full" : ""} bg-background/95 backdrop-blur border border-border/50`}>
      <CardHeader className="pb-2 relative">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold tracking-tight">{trade.ticker}</h3>
              <Badge variant="outline" className="text-xs font-medium py-0.5 px-2">
                {trade.size} shares
              </Badge>
              {trade.pinned && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
              <time className="tabular-nums">{new Date(trade.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
              <span>·</span>
              <span className="font-medium">{trade.strategy}</span>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-xl font-bold tracking-tight ${trade.pnl > 0 ? 'text-green-500' : trade.pnl < 0 ? 'text-red-500' : ''}`}>
              {trade.pnl > 0 ? '+' : ''}{trade.pnl.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
            <div className="flex items-center justify-end text-sm gap-2 mt-0.5">
              <span className={`font-medium ${trade.pnlPct > 0 ? 'text-green-500' : trade.pnlPct < 0 ? 'text-red-500' : ''}`}>
                {trade.pnlPct > 0 ? '+' : ''}{trade.pnlPct}%
              </span>
              <span>·</span>
              <span className="tabular-nums font-medium">{trade.rMultiple}R</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-background/50">
            {trade.outcome === "win" ? "Win" : trade.outcome === "loss" ? "Loss" : "Break Even"}
          </Badge>
          {trade.emotionTags.map((tag, i) => (
            <Badge key={i} variant="outline" className="bg-background/50">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="aspect-[16/9] bg-muted rounded-md overflow-hidden relative">
          <TradeChart trade={trade} />
          <Button 
            variant="secondary" 
            size="sm" 
            className="absolute top-2 right-2 backdrop-blur-sm bg-background/80"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
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
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1.5">Trade Notes</h4>
                  <div className="text-sm text-muted-foreground">{trade.notes || "No notes added"}</div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1.5">AI Summary</h4>
                  <div className="text-sm text-muted-foreground">{trade.aiSummary || "No AI summary available"}</div>
                </div>
              </div>
              
              <div>
                {showStats ? (
                  <StatisticalSnapshot />
                ) : (
                  <div className="space-y-3 rounded-lg border p-4">
                    <h4 className="text-sm font-medium">Trade Rules Check</h4>
                    <ul className="space-y-2">
                      {trade.ruleChecks.map((rule, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <div className={`w-2 h-2 rounded-full mr-2 ${rule.passed ? 'bg-green-500' : 'bg-red-500'}`} />
                          <span className={rule.passed ? 'text-muted-foreground' : 'text-red-500/80'}>
                            {rule.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowStats(prev => !prev)}
                  className="w-full mt-2 text-xs"
                >
                  {showStats ? "Show Rules" : "Show Statistics"}
                </Button>
              </div>
            </div>
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
        </div>
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
      </CardFooter>
    </Card>
  );
}
