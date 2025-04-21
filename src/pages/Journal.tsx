
import { useState } from "react";
import { Calendar, RefreshCw, LayoutGrid, Table as TableIcon } from "lucide-react";
import { TradeFilterBar } from "@/components/journal/TradeFilterBar";
import { MiniAnalyticsPanel } from "@/components/journal/MiniAnalyticsPanel";
import { TradeEntryCard } from "@/components/journal/TradeEntryCard";
import { DailySummaryCard } from "@/components/journal/DailySummaryCard";
import { JournalExportModal } from "@/components/journal/JournalExportModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TradeTable } from "@/components/journal/TradeTable";
import { cn } from "@/lib/utils";

// Define the Trade type to be used throughout the Journal page
export type Trade = {
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
  ruleChecks: { name: string; passed: boolean }[];
  grade: string;
  rating: number;
  notes: string;
  aiSummary: string;
  attachments: { type: string; url: string }[];
  replay: boolean;
  pinned: boolean;
};

// Define sync status type
type SyncStatus = "synced" | "pending" | "failed";

export default function Journal() {
  // For demo, static trades and summaries
  const [showExport, setShowExport] = useState(false);
  const [voiceToJournal, setVoiceToJournal] = useState(false);
  const [quickLog, setQuickLog] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("synced");

  // Sample trades per day
  const trades: Trade[] = [
    {
      id: "T-001",
      ticker: "TSLA",
      entryTime: "2025-04-21T09:15:00Z",
      exitTime: "2025-04-21T10:40:00Z",
      entryPrice: 152.7,
      exitPrice: 161.1,
      size: 100,
      pnl: 840,
      pnlPct: 5.6,
      rMultiple: 2.2,
      setup: "VWAP Fade",
      strategy: "Premarket",
      outcome: "win",
      emotionTags: ["Confident"],
      flagged: ["A+ Setup"],
      ruleChecks: [
        {name: "Premarket Entry", passed: true},
        {name: "Position Sizing", passed: true},
        {name: "No FOMO", passed: true},
      ],
      grade: "A+",
      rating: 5,
      notes: "Good execution, trailed my stop well.",
      aiSummary: "Excellent VWAP Fade timing, strong adherence to plan. Consider scaling out next time for even better R.",
      attachments: [{type: "image", url: ""}],
      replay: true,
      pinned: true,
    },
    {
      id: "T-002",
      ticker: "AAPL",
      entryTime: "2025-04-21T13:40:00Z",
      exitTime: "2025-04-21T14:21:00Z",
      entryPrice: 187.7,
      exitPrice: 186.15,
      size: 50,
      pnl: -77.5,
      pnlPct: -0.8,
      rMultiple: -0.5,
      setup: "Breakout",
      strategy: "Trend",
      outcome: "loss",
      emotionTags: ["Hesitation", "FOMO"],
      flagged: ["Mistake", "Rule Break"],
      ruleChecks: [
        {name: "Trend Confirmed", passed: false},
        {name: "Waited for Pullback", passed: false},
      ],
      grade: "C",
      rating: 2,
      notes: "Chased late. Did not wait for setup. Slippage.",
      aiSummary: "Too much hesitation entering late. FOMO detected. Loss controlled by stop. Next time, wait for confirmation.",
      attachments: [],
      replay: false,
      pinned: false,
    },
    {
      id: "T-003", 
      ticker: "NVDA",
      entryTime: "2025-04-21T11:10:00Z",
      exitTime: "2025-04-21T11:45:00Z",
      entryPrice: 93.25,
      exitPrice: 95.75,
      size: 200,
      pnl: 500,
      pnlPct: 2.68,
      rMultiple: 1.8,
      setup: "Support Bounce",
      strategy: "Reversal",
      outcome: "win",
      emotionTags: ["Calm", "Focused"],
      flagged: [],
      ruleChecks: [
        {name: "Key Level Identified", passed: true},
        {name: "Volume Confirmation", passed: true},
      ],
      grade: "B+",
      rating: 4,
      notes: "Waited for confirmation at support level, good entry.",
      aiSummary: "Solid reversal trade with proper risk management. Entry timing was good with volume confirmation. Could have held longer for 3R.",
      attachments: [{type: "image", url: ""}],
      replay: true,
      pinned: false,
    },
    {
      id: "T-004",
      ticker: "META",
      entryTime: "2025-04-21T14:30:00Z",
      exitTime: "2025-04-21T15:15:00Z",
      entryPrice: 421.50,
      exitPrice: 419.25,
      size: 30,
      pnl: -67.5,
      pnlPct: -0.53,
      rMultiple: -0.8,
      setup: "Trend Continuation",
      strategy: "Pullback",
      outcome: "loss",
      emotionTags: ["Neutral"],
      flagged: [],
      ruleChecks: [
        {name: "Trend Direction", passed: true},
        {name: "Risk Control", passed: true},
      ],
      grade: "B",
      rating: 3,
      notes: "Valid setup, just didn't work out. Stopped out according to plan.",
      aiSummary: "Good risk management with proper stop placement. Setup was valid but market shifted direction. This is a 'good' loss.",
      attachments: [],
      replay: false,
      pinned: false,
    }
    // Add more trades as needed
  ];

  // Demo daily summary
  const dailySummary = {
    date: "2025-04-21",
    netPnl: 1195, // Updated sum of all trades
    winRate: 50,
    mistakes: ["Late entry on AAPL, FOMO"],
    mostTraded: "TSLA",
    aiRecap: "Solid discipline on TSLA. Main miss was late AAPL entry. Focus on pre-entry criteria to boost win rate."
  };

  const handleSyncClick = () => {
    setSyncStatus("pending");
    setTimeout(() => {
      setSyncStatus("synced");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trade Journal</h1>
          <p className="text-muted-foreground">All trades are automatically synced from your connected brokers.</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2">
            <Badge 
              variant={syncStatus === "synced" ? "success" : syncStatus === "pending" ? "warning" : "error"} 
              className="px-3 py-1 text-xs font-medium"
            >
              {syncStatus === "synced" ? "✅ Synced" : syncStatus === "pending" ? "⏳ Syncing..." : "❌ Sync Failed"}
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleSyncClick}
              disabled={syncStatus === "pending"}
            >
              <RefreshCw size={14} className={syncStatus === "pending" ? "animate-spin" : ""} />
              <span>Refresh Journal</span>
            </Button>
          </div>
          <div className="h-6 border-l border-muted mx-1"></div>
          <div className="flex items-center gap-1">
            <Button
              variant={viewMode === "card" ? "default" : "outline"}
              size="sm"
              className="px-3"
              onClick={() => setViewMode("card")}
            >
              <LayoutGrid size={16} />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              className="px-3"
              onClick={() => setViewMode("table")}
            >
              <TableIcon size={16} />
            </Button>
          </div>
          <div className="h-6 border-l border-muted mx-1"></div>
          <div className="flex flex-wrap gap-2">
            <Button
              className={`px-3 py-2 rounded-md text-xs font-medium ${voiceToJournal ? "bg-primary text-white" : "bg-background"} transition`}
              onClick={() => setVoiceToJournal(v => !v)}
            >
              🎤 {voiceToJournal ? "Voice-to-Journal: ON" : "Voice-to-Journal"}
            </Button>
            <Button
              className={`px-3 py-2 rounded-md text-xs font-medium ${quickLog ? "bg-primary text-white" : "bg-background"} transition`}
              onClick={() => setQuickLog(l => !l)}
            >
              ⚡ {quickLog ? "Quick Log: ON" : "Quick Log"}
            </Button>
            <Button
              className="px-3 py-2 rounded-md text-xs font-medium hover:bg-accent transition"
              onClick={() => setShowExport(true)}
            >
              📤 Export
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-4">
          <TradeFilterBar />
          <MiniAnalyticsPanel />
          
          {/* Card/Table View Toggle */}
          <div className={cn("grid gap-4", viewMode === "card" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "")}>
            {viewMode === "card" ? (
              <>
                {trades.map((trade) => (
                  <TradeEntryCard key={trade.id} trade={trade} quickLog={quickLog} voiceToJournal={voiceToJournal} />
                ))}
              </>
            ) : (
              <TradeTable trades={trades} />
            )}
          </div>
          
          {/* Daily Summary */}
          <DailySummaryCard summary={dailySummary} />
        </div>
      </div>
      <JournalExportModal open={showExport} onOpenChange={setShowExport} />
    </div>
  );
}
