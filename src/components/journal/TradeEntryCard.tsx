
import { useState } from "react";
import { Star, Check, X, Edit, Trash2, ChevronDown, ChevronUp, FileText, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Trade } from "@/pages/Journal";

const emojis = {
  Confident: "😌",
  Hesitation: "😕",
  FOMO: "😨",
  Calm: "😀",
  Focused: "🧠",
  Neutral: "😐"
};

export function TradeEntryCard({
  trade,
  quickLog,
  voiceToJournal,
}: {
  trade: Trade;
  quickLog: boolean;
  voiceToJournal: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  
  // Get emoji for the first emotion tag
  const getEmoji = (emotionTags: string[]) => {
    if (emotionTags.length === 0) return "";
    const emotion = emotionTags[0];
    return emojis[emotion as keyof typeof emojis] || "";
  };

  return (
    <Card className={cn(
      "hover:shadow-md transition-all duration-300 overflow-hidden",
      trade.pinned && "ring-2 ring-primary ring-opacity-50"
    )}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xl font-bold">{trade.ticker}</span>
            {trade.pinned && (
              <Badge variant="secondary" className="bg-primary text-white">📌 Pinned</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={trade.outcome === "win" ? "success" : trade.outcome === "loss" ? "error" : "warning"} 
              className="text-xs font-medium"
            >
              {trade.outcome === "win" ? "Win" : trade.outcome === "loss" ? "Loss" : "BE"}
            </Badge>
            <span className="text-lg font-semibold">
              {trade.pnl > 0 ? "+" : ""}{trade.pnl.toFixed(2)}
            </span>
            <span className={cn(
              "text-xs font-bold",
              trade.pnl > 0 ? "text-green-700" : trade.pnl < 0 ? "text-red-700" : "text-muted-foreground"
            )}>
              {trade.pnlPct.toFixed(1)}%
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="flex flex-col gap-3">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 gap-2 mt-1">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Setup</span>
              <span className="text-sm font-medium">{trade.setup}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Time</span>
              <span className="text-sm font-medium">{formatTime(trade.entryTime)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">R-Multiple</span>
              <span className="text-sm font-medium">{trade.rMultiple.toFixed(1)}R</span>
            </div>
          </div>
          
          {/* Tags and Emotions */}
          <div className="flex flex-wrap gap-1.5 mt-1">
            <Badge variant="outline" className="text-xs">
              {trade.strategy}
            </Badge>
            
            {trade.emotionTags.map(emotion => (
              <Badge 
                key={emotion} 
                variant="outline" 
                className="text-xs bg-amber-50"
              >
                {emojis[emotion as keyof typeof emojis] || ""} {emotion}
              </Badge>
            ))}
            
            {trade.flagged.map(flag => (
              <Badge 
                key={flag}
                variant={flag === "A+ Setup" ? "success" : "error"}
                className="text-xs"
              >
                {flag}
              </Badge>
            ))}
            
            <Badge variant="outline" className="text-xs bg-blue-50">
              {trade.grade}
            </Badge>
          </div>
          
          {/* Trade Score Visualization */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">Execution:</span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={cn(
                    i < trade.rating 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-muted-foreground"
                  )} 
                />
              ))}
            </div>
          </div>
          
          {/* AI Summary Preview */}
          <div className="text-xs line-clamp-2 italic text-muted-foreground mt-1">
            {trade.aiSummary}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2 mt-2">
            <div className="flex gap-1">
              {trade.replay && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 gap-1 text-xs"
                >
                  <Play size={12} /> Replay
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 gap-1 text-xs"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Less" : "More"} {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 gap-1 text-xs"
            >
              <ExternalLink size={12} /> Journal
            </Button>
          </div>
          
          {/* Expanded Content */}
          {expanded && (
            <div className="mt-3 space-y-4 animate-fade-in border-t pt-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <div className="flex gap-2 text-xs">
                    <span className="font-semibold">Entry:</span>
                    <span className="font-mono">${trade.entryPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="font-semibold">Exit:</span>
                    <span className="font-mono">${trade.exitPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="font-semibold">Size:</span>
                    <span className="font-mono">{trade.size} shares</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs font-semibold">Rule Compliance:</div>
                  <div className="flex flex-wrap gap-1">
                    {trade.ruleChecks.map((rule, idx) => (
                      <Badge 
                        key={idx}
                        variant={rule.passed ? "success" : "error"}
                        className="text-xs flex items-center gap-1"
                      >
                        {rule.passed ? <Check size={10} /> : <X size={10} />}
                        {rule.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* AI Summary */}
              <div className="bg-cyan-50 rounded-md p-2 border border-cyan-200">
                <div className="flex gap-1 items-center text-xs font-semibold text-cyan-800">
                  <FileText size={12} />
                  AI Trade Analysis
                </div>
                <p className="text-xs mt-1">{trade.aiSummary}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 mt-1 text-xs text-cyan-800"
                >
                  🧠 Improve Me
                </Button>
              </div>
              
              {/* Notes Section */}
              <div>
                <span className="text-xs font-semibold">Notes:</span>
                <p className="text-xs mt-1">{trade.notes}</p>
              </div>
              
              {/* Actions */}
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                  <Edit size={12} /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-destructive">
                  <Trash2 size={12} /> Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
