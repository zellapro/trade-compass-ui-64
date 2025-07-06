
import React from "react";
import { FilterPanel } from "@/components/performance/FilterPanel";
import { RiskMetricsPanel } from "@/components/performance/RiskMetricsPanel";
import { StrategyTable } from "@/components/performance/StrategyTable";
import { EquityCurveChart, TradeDistributionChart, StrategyBreakdownChart, SetupHeatmap, MistakeAnalyticsChart, ConsistencyTracker } from "@/components/performance/charts";
import { AiInsightsPanel } from "@/components/performance/AiInsightsPanel";
import { BrokerComparisonPanel } from "@/components/performance/BrokerComparisonPanel";
import { MilestonesPanel } from "@/components/performance/MilestonesPanel";
import { PerformanceCalendar } from "@/components/performance/PerformanceCalendar";
import { MonteCarloSimulationPanel } from "@/components/performance/MonteCarloSimulationPanel";

const Performance = () => {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Performance Analytics</h1>
      </div>
      
      <FilterPanel />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Analytics Charts */}
        <div className="space-y-6">
          <EquityCurveChart />
          <MonteCarloSimulationPanel />
          <TradeDistributionChart />
        </div>
        
        <div className="space-y-6">
          <RiskMetricsPanel />
          <StrategyBreakdownChart />
          <SetupHeatmap />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <MistakeAnalyticsChart />
        <ConsistencyTracker />
        <StrategyTable />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AiInsightsPanel />
        <MilestonesPanel />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <PerformanceCalendar />
        <BrokerComparisonPanel />
      </div>
    </div>
  );
};

export default Performance;
