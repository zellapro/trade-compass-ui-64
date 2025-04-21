
import { useState } from "react";
import { TradeFilterBar } from "@/components/journal/TradeFilterBar";
import { MiniAnalyticsPanel } from "@/components/journal/MiniAnalyticsPanel";
import { TradeEntryCard } from "@/components/journal/TradeEntryCard";
import { DailySummaryCard } from "@/components/journal/DailySummaryCard";
import { JournalExportModal } from "@/components/journal/JournalExportModal";

export default function Journal() {
  // For demo, static trades and summaries
  const [showExport, setShowExport] = useState(false);
  const [voiceToJournal, setVoiceToJournal] = useState(false);
  const [quickLog, setQuickLog] = useState(false);

  // Sample trades per day
  const trades = [
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
    }
    // Add more trades as needed
  ];

  // Demo daily summary
  const dailySummary = {
    date: "2025-04-21",
    netPnl: 762.5,
    winRate: 50,
    mistakes: ["Late entry on AAPL, FOMO"],
    mostTraded: "TSLA",
    aiRecap: "Solid discipline on TSLA. Main miss was late AAPL entry. Focus on pre-entry criteria to boost win rate."
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trade Journal</h1>
          <p className="text-muted-foreground">Log, analyze, and review all your trades—AI-powered for deeper insights.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-2 rounded-md text-xs font-medium border ${voiceToJournal ? "bg-primary text-white" : "bg-background"} transition`}
            onClick={() => setVoiceToJournal(v => !v)}
          >
            🎤 {voiceToJournal ? "Voice-to-Journal: ON" : "Voice-to-Journal"}
          </button>
          <button
            className={`px-3 py-2 rounded-md text-xs font-medium border ${quickLog ? "bg-primary text-white" : "bg-background"} transition`}
            onClick={() => setQuickLog(l => !l)}
          >
            ⚡ {quickLog ? "Quick Log: ON" : "Quick Log"}
          </button>
          <button
            className="px-3 py-2 rounded-md text-xs font-medium border bg-background hover:bg-accent transition"
            onClick={() => setShowExport(true)}
          >
            📤 Export
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-4">
          <TradeFilterBar />
          <MiniAnalyticsPanel />
          {/* Trade entry cards */}
          <div className="space-y-4">
            {trades.map((trade) => (
              <TradeEntryCard key={trade.id} trade={trade} quickLog={quickLog} voiceToJournal={voiceToJournal} />
            ))}
            <DailySummaryCard summary={dailySummary} />
          </div>
        </div>
        {/* Optionally: right rail for exporting, search, analytics—skip for now */}
      </div>
      <JournalExportModal open={showExport} onOpenChange={setShowExport} />
    </div>
  );
}
