
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Brain, X, Mic, MicOff, Send, Sparkles, Download, Maximize, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export function EdgeTherapistAI() {
  const [open, setOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [activeMode, setActiveMode] = useState<"coach" | "therapist" | "tactical">("coach");
  const [fullscreen, setFullscreen] = useState(false);
  
  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };
  
  return (
    <>
      {/* Enhanced floating button with glow effect */}
      <Button
        onClick={() => setOpen(true)}
        className="relative h-14 w-14 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 p-0 shadow-lg shadow-indigo-700/30 hover:shadow-indigo-700/50 transition-all duration-300 hover:scale-105"
      >
        <div className="absolute inset-0 rounded-full animate-pulse bg-indigo-500 blur-xl opacity-50"></div>
        <div className="absolute inset-0 rounded-full border border-indigo-400/30"></div>
        <Brain className="h-6 w-6 text-white relative z-10" />
      </Button>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent 
          side={fullscreen ? "bottom" : "right"} 
          className={cn(
            "border-l border-white/10 overflow-hidden bg-black/80 backdrop-blur-xl p-0",
            fullscreen ? "w-full h-full inset-0 rounded-none" : "w-full sm:w-[450px] sm:max-w-[450px]"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Enhanced Header */}
            <SheetHeader className="px-4 py-3 border-b border-white/10 flex flex-row items-center justify-between bg-black/40">
              <SheetTitle className="flex items-center text-lg">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center mr-2 shadow-lg shadow-indigo-600/20">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-medium">
                  EdgeTherapist.AI
                </span>
                <span className="ml-2 bg-indigo-900/50 text-indigo-300 text-xs py-0.5 px-2 rounded-full">Beta</span>
              </SheetTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-8 w-8 hover:bg-white/5"
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                >
                  {voiceEnabled ? (
                    <Mic className="h-4 w-4 text-indigo-400" />
                  ) : (
                    <MicOff className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-8 w-8 hover:bg-white/5"
                  onClick={toggleFullscreen}
                >
                  <Maximize className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-8 w-8 hover:bg-white/5" 
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </SheetHeader>
            
            {/* Enhanced Mode selector */}
            <div className="px-4 py-3 border-b border-white/10 bg-black/20">
              <div className="flex rounded-full p-0.5 bg-white/5 border border-white/10 shadow-inner">
                <Button 
                  variant="ghost" 
                  className={cn(
                    "flex-1 h-8 rounded-full text-xs font-normal transition-all duration-300",
                    activeMode === "coach" ? "bg-indigo-600/60 text-white shadow-inner" : "hover:bg-white/5 text-muted-foreground"
                  )}
                  onClick={() => setActiveMode("coach")}
                >
                  Edge Coach
                </Button>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "flex-1 h-8 rounded-full text-xs font-normal transition-all duration-300",
                    activeMode === "therapist" ? "bg-indigo-600/60 text-white shadow-inner" : "hover:bg-white/5 text-muted-foreground"
                  )}
                  onClick={() => setActiveMode("therapist")}
                >
                  Therapist
                </Button>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "flex-1 h-8 rounded-full text-xs font-normal transition-all duration-300",
                    activeMode === "tactical" ? "bg-indigo-600/60 text-white shadow-inner" : "hover:bg-white/5 text-muted-foreground"
                  )}
                  onClick={() => setActiveMode("tactical")}
                >
                  Tactical
                </Button>
              </div>
            </div>
            
            {/* Enhanced Chat area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
              {/* AI Welcome Message */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 flex-shrink-0 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 max-w-[85%] shadow-lg shadow-indigo-900/10">
                  <p className="text-sm text-primary">
                    Welcome to EdgeTherapist.AI. How can I help with your trading psychology today?
                  </p>
                </div>
              </div>
              
              {/* AI Message with insight */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 flex-shrink-0 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 max-w-[85%] shadow-lg shadow-indigo-900/10">
                  <p className="text-sm text-primary">
                    I've analyzed your recent trading patterns. You seem to be experiencing some hesitation on entries, particularly after your loss last Thursday. Would you like to explore what might be causing this?
                  </p>
                  <div className="mt-3 p-3 bg-indigo-600/20 rounded-lg border border-indigo-600/30">
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles className="h-3 w-3 text-indigo-400" />
                      <p className="text-xs font-medium text-indigo-300">Pattern Detected</p>
                    </div>
                    <p className="text-xs text-indigo-200">
                      Early exit pattern identified in 7 of your last 10 winning trades. Average profit reduced by 31% compared to your strategy targets.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* User Message */}
              <div className="flex gap-3 justify-end">
                <div className="bg-indigo-900/30 border border-indigo-500/20 rounded-2xl rounded-tr-none p-4 max-w-[85%] shadow-lg shadow-indigo-900/10">
                  <p className="text-sm">
                    Yes, I think I'm still recovering from that big loss last week. I'm trying to secure profits too quickly.
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
              
              {/* AI Response with advanced UI */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 flex-shrink-0 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 max-w-[85%] shadow-lg shadow-indigo-900/10">
                  <p className="text-sm text-primary">
                    That's a common response to a significant loss. Let's work on a recovery protocol for you:
                  </p>
                  
                  <ol className="list-decimal ml-5 mt-2 text-sm space-y-1 text-primary/90">
                    <li>Set a specific "minimum hold time" based on your setup</li>
                    <li>Create a written rule for partial exit criteria</li>
                    <li>Use the mental rehearsal exercise we developed</li>
                  </ol>
                  
                  <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-cyan-900/30 to-indigo-900/30 border border-cyan-500/20">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-700/30 rounded-full h-2">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-xs text-cyan-300 ml-2">65%</span>
                    </div>
                    <p className="text-xs text-cyan-200 mt-1">Recovery progress since last major loss</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Input area */}
            <div className="border-t border-white/10 p-4 bg-black/40">
              <div className="flex gap-3 items-center">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Message EdgeTherapist.AI..." 
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-inner"
                  />
                  {voiceEnabled && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                      <div className="h-1 w-1 rounded-full bg-indigo-500 animate-pulse"></div>
                      <div className="h-2 w-1 rounded-full bg-indigo-500 animate-pulse delay-75"></div>
                      <div className="h-3 w-1 rounded-full bg-indigo-500 animate-pulse delay-150"></div>
                      <div className="h-2 w-1 rounded-full bg-indigo-500 animate-pulse delay-75"></div>
                      <div className="h-1 w-1 rounded-full bg-indigo-500 animate-pulse"></div>
                    </div>
                  )}
                </div>
                <Button size="icon" className="rounded-full h-10 w-10 bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-600/20">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-primary">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Suggest prompts
                </Button>
                
                <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-primary">
                  <Download className="h-3 w-3 mr-1" />
                  Export chat
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
