
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Brain, X, Mic, MicOff, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function EdgeTherapistAI() {
  const [open, setOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [activeMode, setActiveMode] = useState<"coach" | "therapist" | "tactical">("coach");
  
  return (
    <>
      {/* Floating button with glow effect */}
      <Button
        onClick={() => setOpen(true)}
        className="relative h-12 w-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 p-0 shadow-lg shadow-indigo-700/30 hover:shadow-indigo-700/50 transition-all duration-300"
      >
        <div className="absolute inset-0 rounded-full animate-pulse bg-indigo-500 blur-xl opacity-50"></div>
        <Brain className="h-5 w-5 text-white relative z-10" />
      </Button>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:w-[450px] sm:max-w-[450px] p-0 border-l border-white/10 overflow-hidden bg-black/80 backdrop-blur-xl">
          <div className="flex flex-col h-full">
            {/* Header */}
            <SheetHeader className="px-4 py-3 border-b border-white/10 flex flex-row items-center justify-between">
              <SheetTitle className="flex items-center text-lg">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center mr-2">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-medium">
                  EdgeTherapist.AI
                </span>
              </SheetTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-8 w-8"
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                >
                  {voiceEnabled ? (
                    <Mic className="h-4 w-4 text-indigo-400" />
                  ) : (
                    <MicOff className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </SheetHeader>
            
            {/* Mode selector */}
            <div className="px-4 py-2 border-b border-white/10">
              <div className="flex rounded-full p-0.5 bg-white/5 border border-white/10">
                <Button 
                  variant="ghost" 
                  className={cn(
                    "flex-1 h-8 rounded-full text-xs font-normal",
                    activeMode === "coach" ? "bg-indigo-600/60 text-white" : "hover:bg-white/5 text-muted-foreground"
                  )}
                  onClick={() => setActiveMode("coach")}
                >
                  Coach
                </Button>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "flex-1 h-8 rounded-full text-xs font-normal",
                    activeMode === "therapist" ? "bg-indigo-600/60 text-white" : "hover:bg-white/5 text-muted-foreground"
                  )}
                  onClick={() => setActiveMode("therapist")}
                >
                  Therapist
                </Button>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "flex-1 h-8 rounded-full text-xs font-normal",
                    activeMode === "tactical" ? "bg-indigo-600/60 text-white" : "hover:bg-white/5 text-muted-foreground"
                  )}
                  onClick={() => setActiveMode("tactical")}
                >
                  Tactical
                </Button>
              </div>
            </div>
            
            {/* Chat area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* AI Message */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 flex-shrink-0 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 max-w-[85%]">
                  <p className="text-sm text-primary">
                    Welcome to EdgeTherapist.AI. How can I help with your trading psychology today?
                  </p>
                </div>
              </div>
              
              {/* AI Message with insight */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 flex-shrink-0 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 max-w-[85%]">
                  <p className="text-sm text-primary">
                    I've noticed your last 3 setups had early exits. Are you experiencing fear of missing profits lately?
                  </p>
                  <div className="mt-2 p-2 bg-indigo-600/20 rounded-lg border border-indigo-600/30">
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles className="h-3 w-3 text-indigo-400" />
                      <p className="text-xs font-medium text-indigo-300">Pattern Detected</p>
                    </div>
                    <p className="text-xs text-indigo-200">
                      Early exit pattern identified in 7 of your last 10 winning trades.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* User Message */}
              <div className="flex gap-3 justify-end">
                <div className="bg-indigo-900/30 border border-indigo-500/20 rounded-2xl rounded-tr-none p-4 max-w-[85%]">
                  <p className="text-sm">
                    Yes, I think I'm still recovering from that big loss last week. I'm trying to secure profits too quickly.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Input area */}
            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2 items-center">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Message EdgeTherapist.AI..." 
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                  {voiceEnabled && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
                    </div>
                  )}
                </div>
                <Button size="icon" className="rounded-full h-9 w-9 bg-indigo-600 hover:bg-indigo-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-center mt-2">
                <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-primary">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Suggest helpful prompts
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
