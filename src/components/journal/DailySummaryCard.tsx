
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
export function DailySummaryCard({ summary }: { summary: any }) {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full mt-8 border border-primary/40 rounded p-4 bg-accent/30">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setShow(s => !s)}>
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary">Daily Summary — {summary.date}</span>
          <span className="text-green-700 ml-4 text-xs font-semibold">Net P&L: ${summary.netPnl}</span>
          <span className="text-blue-800 ml-3 text-xs font-semibold">Win Rate: {summary.winRate}%</span>
          <span className="text-amber-800 ml-3 text-xs font-semibold">Most-Traded: {summary.mostTraded}</span>
        </div>
        <button>
          {show ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
        </button>
      </div>
      {show && (
        <div className="py-3 mt-1">
          <div className="text-sm font-semibold mb-2">Mistakes:</div>
          <ul className="mb-2 pl-4 list-disc text-sm">
            {summary.mistakes.map((m:any, i:number)=>(
              <li key={i}>{m}</li>
            ))}
          </ul>
          <div className="text-sm font-semibold mb-2">AI Recap:</div>
          <div className="italic text-muted-foreground">{summary.aiRecap}</div>
        </div>
      )}
    </div>
  );
}
