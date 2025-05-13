
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Search, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { TradeEntryCard } from "@/components/journal/TradeEntryCard";
import { TradeFilterBar } from "@/components/journal/TradeFilterBar";
import { StickySidebar } from "@/components/journal/StickySidebar";
import { DailySummaryCard } from "@/components/journal/DailySummaryCard";
import { ScreenshotAnnotationPanel } from "@/components/journal/ScreenshotAnnotationPanel";
import { EmotionOutcomeAnalysis } from "@/components/journal/EmotionOutcomeAnalysis";
import { MultiAccountSupport } from "@/components/journal/MultiAccountSupport";

export interface Trade {
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
  outcome: "win" | "loss" | "breakeven";
  strategy: string;
  setup: string;
  strategyCategory?: string;
  setupIds?: string[];
  setupGrade?: string;
  contextTags?: string[];
  strategyNotes?: string;
  isFavoriteStrategy?: boolean;
  notes: string;
  aiSummary: string;
  ruleChecks: { name: string; passed: boolean }[];
  pinned: boolean;
  emotionTags: string[];
}

const sampleTrades: Trade[] = [
  {
    id: "trade-1",
    ticker: "AAPL",
    entryTime: "2025-05-13T09:45:00Z",
    exitTime: "2025-05-13T10:15:00Z",
    entryPrice: 215.50,
    exitPrice: 218.75,
    size: 100,
    pnl: 325,
    pnlPct: 1.51,
    rMultiple: 2.3,
    outcome: "win",
    strategy: "Momentum",
    setup: "ORB",
    strategyCategory: "momentum",
    setupIds: ["orb"],
    setupGrade: "a",
    contextTags: ["market-open", "trend-day"],
    notes: "Solid opening range breakout with volume confirmation.",
    aiSummary: "Well executed ORB trade with proper risk management and timely exit.",
    ruleChecks: [
      { name: "PreMarket", passed: true },
      { name: "Risk", passed: true },
      { name: "Stop", passed: true }
    ],
    pinned: false,
    emotionTags: ["Confident", "Focused"]
  },
  {
    id: "trade-2",
    ticker: "TSLA",
    entryTime: "2025-05-12T13:30:00Z",
    exitTime: "2025-05-12T14:45:00Z",
    entryPrice: 305.20,
    exitPrice: 298.75,
    size: 50,
    pnl: -322.50,
    pnlPct: -2.11,
    rMultiple: -1.5,
    outcome: "loss",
    strategy: "Reversal",
    setup: "VWAP Bounce",
    strategyCategory: "reversal",
    setupIds: ["vwap-test"],
    setupGrade: "c",
    contextTags: ["midday", "volume-spike"],
    notes: "Entered too early before confirmation. Stopped out when support broke.",
    aiSummary: "Entry was premature, lacking sufficient confirmation. Consider waiting for stronger price action signals before entering similar setups.",
    ruleChecks: [
      { name: "PreMarket", passed: true },
      { name: "Risk", passed: true },
      { name: "Stop", passed: false }
    ],
    pinned: false,
    emotionTags: ["Impatient", "FOMO"]
  },
];

export default function Journal() {
  const [activeTab, setActiveTab] = useState("trades");
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Trading Journal</h1>
            <p className="text-muted-foreground">Record, analyze, and learn from your trades</p>
          </div>
          <div>
            <Button className="shadow">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Tabs defaultValue="trades" value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="trades">Trades</TabsTrigger>
              <TabsTrigger value="journal">Journal</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showFilters && <TradeFilterBar onClose={() => setShowFilters(false)} />}

        <div className="space-y-6">
          {activeTab === "trades" && (
            <>
              <DailySummaryCard />
              
              <div className="space-y-4">
                {sampleTrades.map(trade => (
                  <TradeEntryCard key={trade.id} trade={trade} />
                ))}
              </div>
            </>
          )}
          
          {activeTab === "journal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Reflection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">What went well today?</label>
                    <Input placeholder="Enter your thoughts..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">What could be improved?</label>
                    <Input placeholder="Enter your thoughts..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Action items for next session</label>
                    <Input placeholder="Enter your thoughts..." />
                  </div>
                </CardContent>
              </Card>
              
              {/* Emotion Outcome Analysis Component */}
              <EmotionOutcomeAnalysis />
            </div>
          )}
          
          {activeTab === "analysis" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Trading performance analytics will be displayed here.</p>
                </CardContent>
              </Card>
              
              <MultiAccountSupport />
            </div>
          )}
          
          {activeTab === "tools" && (
            <div className="space-y-6">
              <ScreenshotAnnotationPanel />
            </div>
          )}
        </div>
      </div>

      <StickySidebar className="md:w-[320px] shrink-0" />
    </div>
  );
}
