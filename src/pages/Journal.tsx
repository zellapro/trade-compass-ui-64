
import { useState } from "react";
import { Search, Calendar, FileText, Filter, ArrowUpDown, Plus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TradeEntryCard } from "@/components/journal/TradeEntryCard";
import { StrategyFilter, StrategyFilterState } from "@/components/journal/StrategyFilter";
import { ViewStrategiesModal } from "@/components/journal/ViewStrategiesModal";

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
  // Strategy fields
  strategyCategory?: string;
  setupIds?: string[];
  setupGrade?: string;
  contextTags?: string[];
  isFavoriteStrategy?: boolean;
  strategyNotes?: string;
};

export default function Journal() {
  const [activeView, setActiveView] = useState<"journal" | "calendar" | "plans">("journal");
  const [showViewStrategies, setShowViewStrategies] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "month">("all");
  
  // Strategy filtering
  const [strategyFilters, setStrategyFilters] = useState<StrategyFilterState>({
    categories: [],
    setups: [],
    grades: [],
    contextTags: [],
    favorites: null
  });

  // Sample trades
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
      // Added strategy fields
      strategyCategory: "indicator",
      setupIds: ["ind-vwap"],
      setupGrade: "a-plus",
      contextTags: ["pre-market", "bullish-bias"],
      isFavoriteStrategy: true,
      strategyNotes: "VWAP rejection in premarket with strong volume confirmation."
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
      // Added strategy fields
      strategyCategory: "breakout",
      setupIds: ["bo-resistance"],
      setupGrade: "c",
      contextTags: ["regular-hours", "trending-market"],
      isFavoriteStrategy: false,
      strategyNotes: "Failed to wait for proper confirmation before entering."
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
      // Added strategy fields
      strategyCategory: "smc",
      setupIds: ["smc-sd", "smc-bos"],
      setupGrade: "b-plus",
      contextTags: ["regular-hours", "trending-market"],
      isFavoriteStrategy: true,
      strategyNotes: "Strong demand zone with break of structure confirmation."
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
      // Added strategy fields
      strategyCategory: "trend",
      setupIds: ["trend-pullback"],
      setupGrade: "b",
      contextTags: ["regular-hours", "neutral-bias"],
      isFavoriteStrategy: false,
      strategyNotes: "Textbook pullback to moving average entry."
    }
  ];

  const handleStrategyFilterChange = (filters: StrategyFilterState) => {
    setStrategyFilters(filters);
    console.log("Strategy filters updated:", filters);
  };

  // Apply strategy filters to trades
  const filteredTrades = trades.filter(trade => {
    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesTicker = trade.ticker.toLowerCase().includes(searchLower);
      const matchesSetup = trade.setup.toLowerCase().includes(searchLower);
      const matchesStrategy = trade.strategy.toLowerCase().includes(searchLower);
      const matchesNotes = trade.notes.toLowerCase().includes(searchLower);
      
      if (!(matchesTicker || matchesSetup || matchesStrategy || matchesNotes)) {
        return false;
      }
    }
    
    // If no strategy filters are applied, show all trades
    if (
      strategyFilters.categories.length === 0 &&
      strategyFilters.setups.length === 0 &&
      strategyFilters.grades.length === 0 &&
      strategyFilters.contextTags.length === 0 &&
      strategyFilters.favorites === null
    ) {
      return true;
    }
    
    // Check category filter
    if (
      strategyFilters.categories.length > 0 &&
      trade.strategyCategory &&
      !strategyFilters.categories.includes(trade.strategyCategory)
    ) {
      return false;
    }
    
    // Check setup filter
    if (
      strategyFilters.setups.length > 0 &&
      trade.setupIds &&
      !trade.setupIds.some(id => strategyFilters.setups.includes(id))
    ) {
      return false;
    }
    
    // Check grade filter
    if (
      strategyFilters.grades.length > 0 &&
      trade.setupGrade &&
      !strategyFilters.grades.includes(trade.setupGrade)
    ) {
      return false;
    }
    
    // Check context tags filter
    if (
      strategyFilters.contextTags.length > 0 &&
      trade.contextTags &&
      !trade.contextTags.some(tag => strategyFilters.contextTags.includes(tag))
    ) {
      return false;
    }
    
    // Check favorites filter
    if (
      strategyFilters.favorites !== null &&
      trade.isFavoriteStrategy !== strategyFilters.favorites
    ) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trade Journal</h1>
          <p className="text-muted-foreground">Document, analyze, and improve your trading strategies.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Tabs defaultValue="all" className="w-auto">
            <TabsList className="h-9">
              <TabsTrigger 
                value="all" 
                className="text-xs h-8"
                onClick={() => setDateFilter("all")}
              >
                All Time
              </TabsTrigger>
              <TabsTrigger 
                value="today"
                className="text-xs h-8"
                onClick={() => setDateFilter("today")}
              >
                Today
              </TabsTrigger>
              <TabsTrigger 
                value="week"
                className="text-xs h-8"
                onClick={() => setDateFilter("week")}
              >
                This Week
              </TabsTrigger>
              <TabsTrigger 
                value="month"
                className="text-xs h-8"
                onClick={() => setDateFilter("month")}
              >
                This Month
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex">
            <Button 
              variant={activeView === "journal" ? "default" : "outline"}
              size="sm" 
              className="rounded-r-none"
              onClick={() => setActiveView("journal")}
            >
              <FileText className="h-4 w-4 mr-1" />
              Journal
            </Button>
            <Button 
              variant={activeView === "calendar" ? "default" : "outline"}
              size="sm" 
              className="rounded-none"
              onClick={() => setActiveView("calendar")}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Calendar
            </Button>
            <Button 
              variant={activeView === "plans" ? "default" : "outline"}
              size="sm" 
              className="rounded-l-none"
              onClick={() => setActiveView("plans")}
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Plans
            </Button>
          </div>
          
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Trade
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tickers, setups, strategies, or notes..." 
              className="pl-9 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 h-10">
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="flex-1 h-10">
              <ArrowUpDown className="h-4 w-4 mr-1" />
              Sort
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 h-10"
              onClick={() => setShowViewStrategies(true)}
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Strategies
            </Button>
          </div>
        </div>
        
        <StrategyFilter
          activeFilters={strategyFilters}
          onFilterChange={handleStrategyFilterChange}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Trades ({filteredTrades.length})</h2>
            <Badge variant="outline" className="font-normal">
              {dateFilter === "all" ? "All Time" : 
               dateFilter === "today" ? "Today" : 
               dateFilter === "week" ? "This Week" : "This Month"}
            </Badge>
          </div>
        </div>
        
        <div className="grid gap-4">
          {filteredTrades.length > 0 ? (
            filteredTrades.map((trade) => (
              <TradeEntryCard key={trade.id} trade={trade} />
            ))
          ) : (
            <div className="text-center py-10 border rounded-lg bg-background/50">
              <p className="text-muted-foreground">No trades found matching your filters.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery("");
                  setStrategyFilters({
                    categories: [],
                    setups: [],
                    grades: [],
                    contextTags: [],
                    favorites: null
                  });
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <ViewStrategiesModal open={showViewStrategies} onOpenChange={setShowViewStrategies} />
    </div>
  );
}
