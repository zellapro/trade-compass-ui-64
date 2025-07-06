
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { EdgeTherapistAI } from "@/components/playbook/EdgeTherapistAI";
import { CognitiveProfilerDashboard } from "@/components/cognitive-profiler/CognitiveProfilerDashboard";
import { ExecutionScanner } from "@/components/playbook/ExecutionScanner";
import { StrategyBuilder } from "@/components/playbook/StrategyBuilder";
import { MissedTradeLogger } from "@/components/playbook/MissedTradeLogger";
import { StrategyHeatMap } from "@/components/playbook/StrategyHeatMap";
import { EdgeEvolutionTracker } from "@/components/playbook/EdgeEvolutionTracker";
import { GoalConfigurationPanel } from "@/components/playbook/GoalConfigurationPanel";
import { DailyFocusConfigurationPanel } from "@/components/playbook/DailyFocusConfigurationPanel";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
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
  RefreshCw,
  Clock,
  Settings
} from "lucide-react";

const Playbook = () => {
  const [activeTab, setActiveTab] = useState("psychology");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme } = useTheme();
  
  // Effect to add page-specific background patterns and gradients
  useEffect(() => {
    document.body.classList.add('playbook-page');
    return () => {
      document.body.classList.remove('playbook-page');
    };
  }, []);
  
  // Determine if we should use light theme styles
  const isLightTheme = theme === "light";
  
  return (
    <div className={`flex flex-col min-h-screen ${isLightTheme ? 'bg-gray-50' : 'bg-zella-background'} relative overflow-hidden`}>
      {/* Background patterns - adjusted for light theme */}
      {!isLightTheme ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zella-electric-purple/20 via-zella-background to-zella-background pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_70%_20%,_var(--tw-gradient-stops))] from-zella-cyan-glow/10 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-[linear-gradient(to_right,#0a0514_1px,transparent_1px),linear-gradient(to_bottom,#0a0514_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.08]"></div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/30 via-gray-50 to-gray-50 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_70%_20%,_var(--tw-gradient-stops))] from-blue-100/20 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.2]"></div>
          </div>
        </>
      )}
      
      {/* Edge Therapist AI Button - Always visible */}
      <div className="fixed top-20 right-6 z-50">
        <EdgeTherapistAI />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex-1 container max-w-7xl mx-auto px-4 py-6 space-y-8">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold tracking-wider ${
                isLightTheme 
                  ? 'text-gray-800' 
                  : 'bg-gradient-to-r from-zella-primary-text to-zella-primary-text/70 bg-clip-text text-transparent'
              }`}>
                Playbook™
              </h1>
              <p className={`${isLightTheme ? 'text-gray-500' : 'text-zella-secondary-text'} text-sm mt-1`}>
                <span className={`font-medium ${isLightTheme ? 'text-blue-600' : 'text-zella-cyan-glow'}`}>
                  Strategy. Psychology. Identity.
                </span> — Your elite-level trader command center
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={`h-8 gap-1 text-xs ${
                  isLightTheme 
                    ? 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300' 
                    : 'bg-black/20 border-white/10 hover:bg-white/10 hover:border-white/20'
                } transition-colors`}
              >
                <Clock className="h-3.5 w-3.5" />
                History
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`h-8 gap-1 text-xs ${
                  isLightTheme 
                    ? 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300' 
                    : 'bg-black/20 border-white/10 hover:bg-white/10 hover:border-white/20'
                } transition-colors`}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className={`h-8 gap-1 text-xs ${
                  isLightTheme 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gradient-to-r from-zella-cyan-glow to-zella-electric-purple hover:shadow-button-glow'
                } transition-all duration-300`}
              >
                <Plus className="h-3.5 w-3.5" />
                New Strategy
              </Button>
            </div>
          </div>
        </div>
        
        {/* Enhanced Tabs */}
        <Tabs 
          defaultValue="psychology" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="relative mb-6">
            {!isLightTheme && (
              <div className="absolute inset-0 bg-gradient-to-r from-zella-electric-purple/30 via-zella-cyan-glow/30 to-zella-electric-purple/30 blur-xl h-10 rounded-full opacity-40"></div>
            )}
            <TabsList className={`relative grid grid-cols-5 w-full h-12 ${
              isLightTheme 
                ? 'bg-white border border-gray-200 shadow-sm' 
                : 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-neon-glow'
              } rounded-full p-1 overflow-hidden`}
            >
              <TabsTrigger 
                value="psychology" 
                className={cn(
                  "rounded-full text-sm flex items-center gap-2 transition-all duration-300",
                  isLightTheme 
                    ? (activeTab === "psychology" ? "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700" : "") 
                    : (activeTab === "psychology" ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-zella-electric-purple/80 data-[state=active]:to-zella-electric-purple/60 data-[state=active]:text-white data-[state=active]:shadow-inner" : "")
                )}
              >
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Cognitive Profiler</span>
                <span className="inline sm:hidden">Profile</span>
              </TabsTrigger>
              <TabsTrigger 
                value="behavior"
                className={cn(
                  "rounded-full text-sm flex items-center gap-2 transition-all duration-300",
                  isLightTheme 
                    ? (activeTab === "behavior" ? "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700" : "") 
                    : (activeTab === "behavior" ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-zella-cyan-glow/80 data-[state=active]:to-zella-cyan-glow/60 data-[state=active]:text-white data-[state=active]:shadow-inner" : "")
                )}
              >
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Execution Scanner</span>
                <span className="inline sm:hidden">Execution</span>
              </TabsTrigger>
              <TabsTrigger 
                value="strategy"
                className={cn(
                  "rounded-full text-sm flex items-center gap-2 transition-all duration-300",
                  isLightTheme 
                    ? (activeTab === "strategy" ? "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700" : "") 
                    : (activeTab === "strategy" ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-zella-cyan-glow/80 data-[state=active]:to-zella-electric-purple/80 data-[state=active]:text-white data-[state=active]:shadow-inner" : "")
                )}
              >
                <FileCode className="h-4 w-4" />
                <span className="hidden sm:inline">Strategy Builder</span>
                <span className="inline sm:hidden">Strategy</span>
              </TabsTrigger>
              <TabsTrigger 
                value="missed"
                className={cn(
                  "rounded-full text-sm flex items-center gap-2 transition-all duration-300",
                  isLightTheme 
                    ? (activeTab === "missed" ? "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700" : "") 
                    : (activeTab === "missed" ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-zella-electric-purple/60 data-[state=active]:to-zella-electric-purple/80 data-[state=active]:text-white data-[state=active]:shadow-inner" : "")
                )}
              >
                <Telescope className="h-4 w-4" />
                <span className="hidden sm:inline">Missed Trades</span>
                <span className="inline sm:hidden">Missed</span>
              </TabsTrigger>
              <TabsTrigger 
                value="insights"
                className={cn(
                  "rounded-full text-sm flex items-center gap-2 transition-all duration-300",
                  isLightTheme 
                    ? (activeTab === "insights" ? "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700" : "") 
                    : (activeTab === "insights" ? "data-[state=active]:bg-gradient-to-r data-[state=active]:from-zella-cyan-glow/60 data-[state=active]:to-zella-cyan-glow/80 data-[state=active]:text-white data-[state=active]:shadow-inner" : "")
                )}
              >
                <LineChart className="h-4 w-4" />
                <span className="hidden sm:inline">Edge Insights</span>
                <span className="inline sm:hidden">Insights</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Tab Contents */}
          <div className="relative">
            {!isLightTheme && (
              <div className="absolute inset-0 bg-gradient-to-b from-zella-electric-purple/30 to-zella-cyan-glow/10 blur-3xl rounded-3xl opacity-30 -z-10"></div>
            )}
            
            <TabsContent value="psychology" className="mt-0 space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 gap-6">
                <CognitiveProfilerDashboard />
              </div>
            </TabsContent>
            
            <TabsContent value="behavior" className="mt-0 space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 gap-6">
                <ExecutionScanner />
              </div>
            </TabsContent>
            
            <TabsContent value="strategy" className="mt-0 space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 gap-6">
                <StrategyBuilder />
              </div>
            </TabsContent>
            
            <TabsContent value="missed" className="mt-0 space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 gap-6">
                <MissedTradeLogger />
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="mt-0 space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StrategyHeatMap />
                <EdgeEvolutionTracker />
              </div>
            </TabsContent>
          </div>
        </Tabs>
        
        {/* Configuration Panels Section */}
        <div className="mt-8">
          <div className="flex items-center mb-6">
            <Settings className="h-5 w-5 mr-2" />
            <h2 className={`text-xl font-semibold ${
              isLightTheme 
                ? 'text-gray-800' 
                : 'text-zella-primary-text'
            }`}>
              Configure Dashboard Panels
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GoalConfigurationPanel />
            <DailyFocusConfigurationPanel />
          </div>
        </div>
      </div>
      
      {/* Enhanced floating button for adding missed trades */}
      <Button 
        size="sm" 
        className={`fixed bottom-6 right-6 rounded-full h-14 w-14 ${
          isLightTheme 
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
            : 'shadow-neon-glow bg-gradient-to-r from-zella-cyan-glow to-zella-electric-purple hover:shadow-button-glow'
        } p-0 flex items-center justify-center z-40 hover:scale-105 transition-all duration-300`}
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Add Missed Trade</span>
      </Button>
    </div>
  );
};

export default Playbook;
