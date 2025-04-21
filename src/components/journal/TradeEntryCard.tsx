
import { useState } from "react";
import { Star, Check, X, Edit, Trash2, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Trade = {
  id: string;
  ticker: string;
  entryTime: string;
  exitTime: string;
  entryPrice: number;
  exitPrice: number;
  size: number;
  pnl: number;
  pnlPct: number;
  rMultiple: number;
  setup: string;
  strategy: string;
  outcome: "win" | "loss" | "be";
  emotionTags: string[];
  flagged: string[];
  ruleChecks: { name: string, passed: boolean }[];
  grade: string;
  rating: number;
  notes: string;
  aiSummary: string;
  attachments: { type: string; url: string }[];
  replay: boolean;
  pinned: boolean;
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

  return (
    <div className={cn(
        "border rounded-lg bg-card shadow-sm transition ring-1 ring-inset ring-muted/10 relative overflow-hidden",
        trade.pinned && "border-primary shadow-lg"
      )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 hover:bg-accent/30 cursor-pointer" onClick={() => setExpanded(e => !e)}>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold">{trade.ticker}</span>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded bg-muted",
            trade.outcome === "win" && "bg-green-100 text-green-700",
            trade.outcome === "loss" && "bg-red-100 text-red-700",
            trade.outcome === "be" && "bg-amber-100 text-amber-700"
          )}>
            {trade.outcome === "win" ? "Win" : trade.outcome === "loss" ? "Loss" : "BE"}
          </span>
          {trade.pinned && (
            <span className="text-white bg-primary rounded px-1.5 text-xs">Pinned</span>
          )}
          {trade.flagged.map(f => (
            <span key={f} className={cn(
                "rounded px-1.5 py-0.5 text-xs ml-1",
                f === "Mistake" && "bg-red-100 text-red-700",
                f === "Rule Break" && "bg-yellow-100 text-yellow-700",
                f === "A+ Setup" && "bg-green-100 text-green-700"
              )}>{f}</span>
          ))}
          <span className="ml-2 text-xs text-muted-foreground">{trade.setup}</span>
          <span className="ml-1 text-xs text-muted-foreground">{trade.strategy}</span>
          <div className="flex ml-2">
            {trade.emotionTags.map(et => (
              <span className="bg-accent text-xs rounded px-1 ml-1" key={et}>{et}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-1 text-lg">{trade.pnl > 0 ? "+" : ""}{trade.pnl}</span>
          <span className={cn(
            "ml-1 text-xs font-bold",
            trade.pnl > 0 ? "text-green-700" : trade.pnl < 0 ? "text-red-700" : "text-muted-foreground"
          )}>{trade.pnlPct}%</span>
          <span className="ml-1 text-xs text-muted-foreground">{trade.rMultiple}R</span>
          {expanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
        </div>
      </div>
      {/* Expanded Content */}
      {expanded && (
        <div className="border-t bg-muted/10 px-4 py-4 animate-fade-in space-y-4">
          <div className="grid md:grid-cols-2 gap-4 mb-2">
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <span className="text-xs font-semibold">Entry</span>
                <span className="text-xs font-mono">{formatTime(trade.entryTime)}</span>
                <span className="ml-2 text-xs font-semibold">at</span>
                <span className="font-mono">${trade.entryPrice.toFixed(2)}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs font-semibold">Exit</span>
                <span className="text-xs font-mono">{formatTime(trade.exitTime)}</span>
                <span className="ml-2 text-xs font-semibold">at</span>
                <span className="font-mono">${trade.exitPrice.toFixed(2)}</span>
              </div>
              <div className="flex gap-2 items-center text-xs mt-2">
                Size: <span className="font-mono">{trade.size}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Self-rating: </span>
              <div className="flex">
                {Array.from({length: 5}).map((_, i) => (
                  <Star key={i} size={16} className={i < trade.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"} />
                ))}
              </div>
              <span className="ml-4 text-xs font-medium">Grade:</span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded",
                trade.grade === "A+" && "bg-green-100 text-green-700",
                trade.grade === "C" && "bg-amber-100 text-amber-700"
              )}>{trade.grade}</span>
              <span className="ml-4 text-muted-foreground">R-multiple: {trade.rMultiple}</span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold">Rule Compliance</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {trade.ruleChecks.map((rc, idx) => (
                <span key={idx} className={cn(
                  "text-xs px-2 py-0.5 rounded flex items-center gap-1",
                  rc.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>{rc.passed ? <Check size={12}/> : <X size={12}/>} {rc.name}</span>
              ))}
            </div>
          </div>
          {/* AI Summary + Improve */}
          <div className="bg-cyan-50 border rounded p-2 flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <FileText size={16} className="text-blue-400" />
              <span className="font-semibold text-sm">AI Summary</span>
            </div>
            <p className="text-sm italic">{trade.aiSummary}</p>
            <Button size="sm" variant="outline" className="w-fit text-xs">🧠 Improve Me</Button>
          </div>
          {/* Attachments, Replay */}
          <div className="flex gap-2 items-center flex-wrap">
            {trade.attachments.length > 0 && (
              <Button variant="outline" size="sm" className="text-xs">📎 View Attachments</Button>
            )}
            {trade.replay && (
              <Button variant="outline" size="sm" className="text-xs">🎥 Watch Replay</Button>
            )}
          </div>
          <div>
            <span className="text-xs font-semibold">Quick Notes</span>
            <textarea
              className="mt-1 w-full px-2 py-1 rounded border text-xs"
              defaultValue={trade.notes}
              placeholder="Add your notes here..."
              rows={quickLog ? 2 : 3}
              disabled={voiceToJournal}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" size="sm" className="gap-1 text-xs"><Edit size={14}/>Edit</Button>
            <Button variant="destructive" size="sm" className="gap-1 text-xs"><Trash2 size={14}/>Delete</Button>
            <Button variant="outline" size="sm" className="gap-1 text-xs">📌 Pin</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
