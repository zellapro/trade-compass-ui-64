
import React, { useState } from "react";
import { 
  PerformanceSummary,
  TradeQualityBreakdown,
  PsychologicalEdgeTracker,
  EmotionalInsightsPanel,
  AiBehavioralFeedback,
  GoalProgressTracker,
  MistakeTaxLog,
  StrategyPerformanceMatrix,
  DailyPerformanceRhythm,
  EdgeAmplifierProfile,
  PerformanceAlerts
} from "@/components/performance/panels";
import { Card } from "@/components/ui/card";
import { FilterPanel } from "@/components/performance/FilterPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Performance = () => {
  const [timeframe, setTimeframe] = useState("30d");
  
  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Performance Analytics</h1>
      </div>
      
      <FilterPanel onTimeframeChange={setTimeframe} className="mb-6" />
      
      {/* Performance Summary Section - Always visible */}
      <section className="mb-8">
        <PerformanceSummary timeframe={timeframe} />
      </section>
      
      {/* Tabbed Sections for Organization */}
      <Tabs defaultValue="technical" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 w-full">
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="psychological">Psychological</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        
        {/* Technical Performance Tab */}
        <TabsContent value="technical" className="space-y-8">
          <TradeQualityBreakdown timeframe={timeframe} />
          <DailyPerformanceRhythm timeframe={timeframe} />
          <MistakeTaxLog timeframe={timeframe} />
        </TabsContent>
        
        {/* Psychological Performance Tab */}
        <TabsContent value="psychological" className="space-y-8">
          <PsychologicalEdgeTracker timeframe={timeframe} />
          <EmotionalInsightsPanel timeframe={timeframe} />
        </TabsContent>
        
        {/* Strategies Tab */}
        <TabsContent value="strategies" className="space-y-8">
          <StrategyPerformanceMatrix timeframe={timeframe} />
          <EdgeAmplifierProfile />
          <GoalProgressTracker />
        </TabsContent>
        
        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-8">
          <AiBehavioralFeedback timeframe={timeframe} />
          <PerformanceAlerts />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Performance;
