
import React, { useState, useEffect } from "react";
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
  Clock
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
  
  // Get theme-specific background and accent colors
  const getThemeStyles = () => {
    switch(theme) {
      case 'light':
        return {
          bgColor: "bg-gray-100",
          glassBg: "bg-white/70",
          accentGradient: "from-blue-500 to-purple-500",
          textGradient: "from-blue-700 to-purple-700"
        };
      case 'dark':
        return {
          bgColor: "bg-gray-900",
          glassBg: "bg-black/40",
          accentGradient: "from-blue-500 to-indigo-600",
          textGradient: "from-blue-400 to-indigo-400"
        };
      case 'premium':
      default:
        return {
          bgColor: "bg-zella-background",
          glassBg: "bg-black/40",
          accentGradient: "from-zella-cyan-glow to-zella-electric-purple",
          textGradient: "from-zella-cyan-glow to-zella-electric-purple"
        };
    }
  };
  
  const themeStyles = getThemeStyles();
  
  return (
    <div className={`flex flex-col min-h-screen ${themeStyles.bgColor} relative overflow-hidden`}>
      {/* Theme-specific background patterns and gradients */}
      {theme === 'premium' && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zella-electric-purple/20 via-zella-background to-zella-background pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_70%_20%,_var(--tw-gradient-stops))] from-zella-cyan-glow/10 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-[linear-gradient(to_right,#0a0514_1px,transparent_1px),linear-gradient(to_bottom,#0a0514_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.08]"></div>
          </div>
        </>
      )}
      
      {theme === 'dark' && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-gray-900 to-gray-900 pointer-events-none"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.08]"></div>
          </div>
        </>
      )}
      
      {theme === 'light' && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-gray-100 to-gray-100 pointer-events-none"></div>
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
              <h1 className={`text-3xl md:text-4xl font-bold tracking-wider bg-gradient-to-r ${themeStyles.textGradient} bg-clip-text text-transparent`}>
                Playbook™
              </h1>
              <p className={`${theme === 'light' ? 'text-gray-600' : theme === 'dark' ? 'text-gray-400' : 'text-zella-secondary-text'} text-sm mt-1`}>
                <span className={`font-medium ${theme === 'premium' ? 'text-zella-cyan-glow' : theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Strategy. Psychology. Identity.</span> — Your elite-level trader command center
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={`h-8 gap-1 text-xs ${theme === 'premium' ? 'bg-black/20 border-white/10 hover:bg-white/10 hover:border-white/20' : ''} transition-colors`}
              >
                <Clock className="h-3.5 w-3.5" />
                History
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`h-8 gap-1 text-xs ${theme === 'premium' ? 'bg-black/20 border-white/10 hover:bg-white/10 hover:border-white/20' : ''} transition-colors`}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className={`h-8 gap-1 text-xs ${theme === 'premium' ? `bg-gradient-to-r ${themeStyles.accentGradient} hover:shadow-button-glow` : ''} transition-all duration-300`}
              >
                <Plus className="h-3.5 w-3.5" />
                New Strategy
              </Button>
            </div>
          </div>
        </div>
        
        {/* Enhanced Glassmorphism Tabs */}
        <Tabs 
          defaultValue="psychology" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="relative mb-6">
            {theme === 'premium' && (
              <div className="absolute inset-0 bg-gradient-to-r from-zella-electric-purple/30 via-zella-cyan-glow/30 to-zella-electric-purple/30 blur-xl h-10 rounded-full opacity-40"></div>
            )}
            <TabsList className={`relative grid grid-cols-5 w-full h-12 ${themeStyles.glassBg} backdrop-blur-xl border ${theme === 'premium' ? 'border-white/10' : theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} rounded-full p-1 overflow-hidden ${theme === 'premium' ? 'shadow-neon-glow' : ''}`}>
              <TabsTrigger 
                value="psychology" 
                className={cn(
                  "rounded-full text-sm flex items-center gap-2 transition-all duration-300",
                  activeTab === "psychology" ? `data-[state=active]:bg-gradient-to-r data-[state=active]:${themeStyles.accentGradient} data-[state=active]:text-white data-[state=active]:shadow-inner` : ""
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
                  activeTab === "behavior" ? `data-[state=active]:bg-gradient-to-r data-[state=active]:${themeStyles.accentGradient} data-[state=active]:text-white data-[state=active]:shadow-inner` : ""
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
                  activeTab === "strategy" ? `data-[state=active]:bg-gradient-to-r data-[state=active]:${themeStyles.accentGradient} data-[state=active]:text-white data-[state=active]:shadow-inner` : ""
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
                  activeTab === "missed" ? `data-[state=active]:bg-gradient-to-r data-[state=active]:${themeStyles.accentGradient} data-[state=active]:text-white data-[state=active]:shadow-inner` : ""
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
                  activeTab === "insights" ? `data-[state=active]:bg-gradient-to-r data-[state=active]:${themeStyles.accentGradient} data-[state=active]:text-white data-[state=active]:shadow-inner` : ""
                )}
              >
                <LineChart className="h-4 w-4" />
                <span className="hidden sm:inline">Edge Insights</span>
                <span className="inline sm:hidden">Insights</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Tab Contents with enhanced glassmorphism effect */}
          <div className="relative">
            {theme === 'premium' && (
              <div className="absolute inset-0 bg-gradient-to-b from-zella-electric-purple/30 to-zella-cyan-glow/10 blur-3xl rounded-3xl opacity-30 -z-10"></div>
            )}
            
            <TabsContent value="psychology" className="mt-0 space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 gap-6">
                <CognitiveProfiler />
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
      </div>
      
      {/* Enhanced floating button for adding missed trades */}
      <Button 
        size="sm" 
        className={`fixed bottom-6 right-6 rounded-full h-14 w-14 ${theme === 'premium' ? 'shadow-neon-glow bg-gradient-to-r from-zella-cyan-glow to-zella-electric-purple hover:shadow-button-glow' : theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} p-0 flex items-center justify-center z-40 hover:scale-105 transition-all duration-300`}
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Add Missed Trade</span>
      </Button>
    </div>
  );
};

export default Playbook;
