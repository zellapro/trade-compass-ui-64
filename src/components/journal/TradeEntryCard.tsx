import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp, Maximize2, Edit, BarChart, Star, Flag, Tag, Plus, BookOpen } from "lucide-react";
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
    <Card className={expanded ? "col-span-full" : ""}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-lg font-bold">{trade.ticker}</h3>
              {trade.pinned && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
              <Badge variant={trade.outcome === "win" ? "success" : trade.outcome === "loss" ? "destructive" : "outline"}>
                {trade.outcome === "win" ? "WIN" : trade.outcome === "loss" ? "LOSS" : "BE"}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1.5 mt-0.5">
              {new Date(trade.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
              {new Date(trade.exitTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              <span>·</span>
              <span className="font-medium">{trade.strategy}</span>
              <span>·</span>
              <span>{trade.size} shares</span>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold ${trade.pnl > 0 ? 'text-trading-green' : trade.pnl < 0 ? 'text-trading-red' : ''}`}>
              {trade.pnl > 0 ? '+' : ''}{trade.pnl.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </div>
            <div className="flex items-center justify-end text-sm gap-2 mt-0.5">
              <span className={`${trade.pnlPct > 0 ? 'text-trading-green' : trade.pnlPct < 0 ? 'text-trading-red' : ''}`}>
                {trade.pnlPct > 0 ? '+' : ''}{trade.pnlPct}%
              </span>
              <span>·</span>
              <span>{trade.rMultiple}R</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="grid gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {trade.emotionTags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="bg-muted mt-1 rounded-md aspect-video relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-muted-foreground text-sm">Chart Placeholder</div>
              <Button variant="secondary" size="sm" className="absolute top-2 right-2">
                <Maximize2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          
          {tradeStrategy && (
            <div className="mt-2">
              <StrategyDisplay 
                strategy={tradeStrategy}
                variant="inline"
                size="sm"
              />
            </div>
          )}
          
          {!tradeStrategy && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setStrategyModalOpen(true)}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-background/50 hover:bg-accent/50 border-dashed"
            >
              <Plus className="h-4 w-4" />
              Add Strategy & Setup
            </Button>
          )}
          
          {expanded && (
            <div className="mt-3 space-y-4">
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Trade Notes</h4>
                    <div className="text-sm">{trade.notes}</div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">AI Summary</h4>
                    <div className="text-sm">{trade.aiSummary}</div>
                  </div>
                </div>
                
                <div className="md:col-span-5">
                  {showStats ? (
                    <StatisticalSnapshot />
                  ) : (
                    <div className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium mb-2">Rule Checks</h4>
                      <ul className="space-y-1.5">
                        {trade.ruleChecks.map((rule, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <span className={`w-4 h-4 rounded-full mr-2 ${rule.passed ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {rule.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex justify-end mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowStats(prev => !prev)}
                      className="text-xs"
                    >
                      {showStats ? "Show Rules" : "Show Statistics"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between py-2">
        <div className="flex items-center gap-1">
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
