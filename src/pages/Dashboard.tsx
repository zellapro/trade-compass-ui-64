
import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BrokerIntegrationPanel } from "../components/dashboard/BrokerIntegrationPanel";
import { MonteCarloSimulation } from "../components/dashboard/MonteCarloSimulation";
import { CustomReportsBuilder } from "../components/dashboard/CustomReportsBuilder";
import { GoalProgressTracker } from "../components/dashboard/GoalProgressTracker";
import { GoalTracker } from "@/components/dashboard/GoalTracker"; // Original GoalTracker component
import { CommunityBenchmarkingPanel } from "../components/playbook/CommunityBenchmarkingPanel";
import { EducationalContentSuggestionModule } from "../components/playbook/EducationalContentSuggestionModule";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your trading.</p>
        </div>
      </div>
      
      {/* Broker Integration Panel - Top Module */}
      <BrokerIntegrationPanel />
      
      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Goals Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <GoalTracker />
            <GoalProgressTracker />
          </div>
          
          {/* Other dashboard components would go here */}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <MonteCarloSimulation />
          
          {/* Additional analytics components would go here */}
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <CustomReportsBuilder />
          
          {/* Additional reports components would go here */}
        </TabsContent>
        
        {/* Learning Tab */}
        <TabsContent value="learning" className="space-y-6">
          <EducationalContentSuggestionModule />
          
          {/* Additional learning components would go here */}
        </TabsContent>
        
        {/* Community Tab */}
        <TabsContent value="community" className="space-y-6">
          <CommunityBenchmarkingPanel />
          
          {/* Additional community components would go here */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
