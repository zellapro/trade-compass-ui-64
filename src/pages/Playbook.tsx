
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { EdgeTherapistAI } from "@/components/playbook/EdgeTherapistAI";
import { CognitiveProfiler } from "@/components/playbook/CognitiveProfiler";
import { ExecutionScanner } from "@/components/playbook/ExecutionScanner";
import { StrategyBuilder } from "@/components/playbook/StrategyBuilder";
import { MissedTradeLogger } from "@/components/playbook/MissedTradeLogger";
import { StrategyHeatMap } from "@/components/playbook/StrategyHeatMap";
import { EdgeEvolutionTracker } from "@/components/playbook/EdgeEvolutionTracker";
import {
  Brain,
  Lightbulb,
  LineChart,
  FileCode,
  Telescope,
  ChevronDown,
  Plus,
  Sparkles,
  Grid3X3,
  Check,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

const Playbook = () => {
  const [activeTab, setActiveTab] = useState("psychology");
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Glass pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-background to-background pointer-events-none"></div>
      
      {/* Edge Therapist AI Button - Always visible */}
      <div className="fixed top-20 right-6 z-50">
        <EdgeTherapistAI />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex-1 container max-w-7xl mx-auto px-4 py-6 space-y-8">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Playbook
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1 text-xs bg-black/20 border-white/10 hover:bg-white/10">
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh Data
              </Button>
              <Button variant="default" size="sm" className="h-8 gap-1 text-xs bg-indigo-600 hover:bg-indigo-500">
                <Plus className="h-3.5 w-3.5" />
                New Strategy
              </Button>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm">
            <span className="font-medium text-primary">Strategy. Psychology. Identity.</span> — Your elite-level trader command center
          </p>
        </div>
        
        {/* Glassmorphism Tabs */}
        <Tabs 
          defaultValue="psychology" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-violet-500/20 to-cyan-400/20 blur-xl h-10 rounded-full opacity-30"></div>
            <TabsList className="relative grid grid-cols-5 w-full h-11 bg-black/30 backdrop-blur-xl border border-white/10 rounded-full p-1 overflow-hidden">
              <TabsTrigger 
                value="psychology" 
                className={cn(
                  "rounded-full text-sm flex items-center gap-1.5",
                  activeTab === "psychology" ? "data-[state=active]:bg-indigo-600/80 data-[state=active]:text-white" : ""
                )}
              >
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Psychology Profiler</span>
              </TabsTrigger>
              <TabsTrigger 
                value="behavior"
                className={cn(
                  "rounded-full text-sm flex items-center gap-1.5",
                  activeTab === "behavior" ? "data-[state=active]:bg-violet-600/80 data-[state=active]:text-white" : ""
                )}
              >
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Behavior Analysis</span>
              </TabsTrigger>
              <TabsTrigger 
                value="strategy"
                className={cn(
                  "rounded-full text-sm flex items-center gap-1.5",
                  activeTab === "strategy" ? "data-[state=active]:bg-cyan-600/80 data-[state=active]:text-white" : ""
                )}
              >
                <FileCode className="h-4 w-4" />
                <span className="hidden sm:inline">Strategy Builder</span>
              </TabsTrigger>
              <TabsTrigger 
                value="missed"
                className={cn(
                  "rounded-full text-sm flex items-center gap-1.5",
                  activeTab === "missed" ? "data-[state=active]:bg-fuchsia-600/80 data-[state=active]:text-white" : ""
                )}
              >
                <Telescope className="h-4 w-4" />
                <span className="hidden sm:inline">Missed Trades</span>
              </TabsTrigger>
              <TabsTrigger 
                value="insights"
                className={cn(
                  "rounded-full text-sm flex items-center gap-1.5",
                  activeTab === "insights" ? "data-[state=active]:bg-amber-600/80 data-[state=active]:text-white" : ""
                )}
              >
                <LineChart className="h-4 w-4" />
                <span className="hidden sm:inline">Edge Insights</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Tab Contents with glassmorphism effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-violet-900/5 blur-3xl rounded-3xl opacity-30 -z-10"></div>
            
            <TabsContent value="psychology" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <CognitiveProfiler />
              </div>
            </TabsContent>
            
            <TabsContent value="behavior" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <ExecutionScanner />
              </div>
            </TabsContent>
            
            <TabsContent value="strategy" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <StrategyBuilder />
              </div>
            </TabsContent>
            
            <TabsContent value="missed" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <MissedTradeLogger />
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StrategyHeatMap />
                <EdgeEvolutionTracker />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      {/* Floating button for adding missed trades */}
      <Button 
        size="sm" 
        className="fixed bottom-6 right-6 rounded-full h-12 w-12 shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-600 to-violet-600 p-0 flex items-center justify-center hover:from-indigo-500 hover:to-violet-500 z-40"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Playbook;
