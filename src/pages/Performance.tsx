
import React, { useState } from "react";
import { FilterPanel } from "@/components/performance/FilterPanel";
import { RiskMetricsPanel } from "@/components/performance/RiskMetricsPanel";
import { StrategyTable } from "@/components/performance/StrategyTable";
import { 
  EquityCurveChart, 
  TradeDistributionChart, 
  StrategyBreakdownChart, 
  SetupHeatmap, 
  MistakeAnalyticsChart, 
  ConsistencyTracker 
} from "@/components/performance/charts";
import { AiInsightsPanel } from "@/components/performance/AiInsightsPanel";
import { BrokerComparisonPanel } from "@/components/performance/BrokerComparisonPanel";
import { MilestonesPanel } from "@/components/performance/MilestonesPanel";
import { PerformanceCalendar } from "@/components/performance/PerformanceCalendar";
import { MonteCarloSimulationPanel } from "@/components/performance/MonteCarloSimulationPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Performance = () => {
  const [timeframe, setTimeframe] = useState("30d"); // Default timeframe
  
  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Performance Analytics</h1>
      </div>
      
      <FilterPanel onTimeframeChange={setTimeframe} className="mb-6" />
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EquityCurveChart timeframe={timeframe} />
            <RiskMetricsPanel timeframe={timeframe} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TradeDistributionChart timeframe={timeframe} />
            <PerformanceCalendar timeframe={timeframe} />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <ConsistencyTracker timeframe={timeframe} />
          </div>
        </TabsContent>
        
        {/* Strategies Tab */}
        <TabsContent value="strategies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StrategyBreakdownChart timeframe={timeframe} />
            <SetupHeatmap timeframe={timeframe} />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <MistakeAnalyticsChart timeframe={timeframe} />
            <StrategyTable timeframe={timeframe} />
          </div>
        </TabsContent>
        
        {/* Simulation Tab */}
        <TabsContent value="simulation">
          <MonteCarloSimulationPanel />
        </TabsContent>
        
        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AiInsightsPanel />
            <MilestonesPanel />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <BrokerComparisonPanel />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Performance;
