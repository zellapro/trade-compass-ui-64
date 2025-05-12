
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
        className="relative h-14 w-14 rounded-full bg-gradient-to-br from-zella-cyan-glow to-zella-electric-purple p-0 shadow-neon-glow hover:shadow-button-glow transition-all duration-300 hover:scale-105 animate-float"
      >
        <div className="absolute inset-0 rounded-full animate-pulse-glow bg-zella-cyan-glow blur-xl opacity-50"></div>
        <div className="absolute inset-0 rounded-full border border-white/30"></div>
        <Brain className="h-6 w-6 text-zella-primary-text relative z-10" />
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
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zella-cyan-glow to-zella-electric-purple flex items-center justify-center mr-2 shadow-neon-glow">
                  <Brain className="h-4 w-4 text-zella-primary-text" />
                </div>
                <span className="bg-gradient-to-r from-zella-cyan-glow to-zella-electric-purple bg-clip-text text-transparent font-medium">
                  EdgeTherapist.AI
                </span>
                <span className="ml-2 bg-zella-electric-purple/50 text-zella-cyan-glow text-xs py-0.5 px-2 rounded-full">Beta</span>
              </SheetTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-8 w-8 hover:bg-white/5"
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                >
                  {voiceEnabled ? (
                    <Mic className="h-4 w-4 text-zella-cyan-glow" />
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
                    activeMode === "coach" ? "bg-gradient-to-r from-zella-cyan-glow/60 to-zella-electric-purple/60 text-white shadow-inner" : "hover:bg-white/5 text-muted-foreground"
                  )}
                  onClick={() => setActiveMode("coach")}
                >
                  Edge Coach
                </Button>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "flex-1 h-8 rounded-full text-xs font-normal transition-all duration-300",
                    activeMode === "therapist" ? "bg-gradient-to-r from-zella-cyan-glow/60 to-zella-electric-purple/60 text-white shadow-inner" : "hover:bg-white/5 text-muted-foreground"
                  )}
                  onClick={() => setActiveMode("therapist")}
                >
                  Therapist
                </Button>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "flex-1 h-8 rounded-full text-xs font-normal transition-all duration-300",
                    activeMode === "tactical" ? "bg-gradient-to-r from-zella-cyan-glow/60 to-zella-electric-purple/60 text-white shadow-inner" : "hover:bg-white/5 text-muted-foreground"
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
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zella-cyan-glow to-zella-electric-purple flex-shrink-0 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 max-w-[85%] shadow-neon-glow">
                  <p className="text-sm text-zella-primary-text">
                    Welcome to EdgeTherapist.AI. How can I help with your trading psychology today?
                  </p>
                </div>
              </div>
              
              {/* AI Message with insight */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zella-cyan-glow to-zella-electric-purple flex-shrink-0 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 max-w-[85%] shadow-neon-glow">
                  <p className="text-sm text-zella-primary-text">
                    I've analyzed your recent trading patterns. You seem to be experiencing some hesitation on entries, particularly after your loss last Thursday. Would you like to explore what might be causing this?
                  </p>
                  <div className="mt-3 p-3 bg-zella-cyan-glow/20 rounded-lg border border-zella-cyan-glow/30">
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles className="h-3 w-3 text-zella-cyan-glow" />
                      <p className="text-xs font-medium text-zella-cyan-glow">Pattern Detected</p>
                    </div>
                    <p className="text-xs text-zella-primary-text">
                      Early exit pattern identified in 7 of your last 10 winning trades. Average profit reduced by 31% compared to your strategy targets.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* User Message */}
              <div className="flex gap-3 justify-end">
                <div className="bg-zella-electric-purple/30 border border-zella-electric-purple/20 rounded-2xl rounded-tr-none p-4 max-w-[85%] shadow-lg">
                  <p className="text-sm text-zella-primary-text">
                    Yes, I think I'm still recovering from that big loss last week. I'm trying to secure profits too quickly.
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-zella-cyan-glow flex-shrink-0 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
              
              {/* AI Response with advanced UI */}
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zella-cyan-glow to-zella-electric-purple flex-shrink-0 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 max-w-[85%] shadow-neon-glow">
                  <p className="text-sm text-zella-primary-text">
                    That's a common response to a significant loss. Let's work on a recovery protocol for you:
                  </p>
                  
                  <ol className="list-decimal ml-5 mt-2 text-sm space-y-1 text-zella-primary-text/90">
                    <li>Set a specific "minimum hold time" based on your setup</li>
                    <li>Create a written rule for partial exit criteria</li>
                    <li>Use the mental rehearsal exercise we developed</li>
                  </ol>
                  
                  <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-zella-cyan-glow/30 to-zella-electric-purple/30 border border-zella-cyan-glow/20">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-700/30 rounded-full h-2">
                        <div className="bg-gradient-to-r from-zella-cyan-glow to-zella-electric-purple h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-xs text-zella-cyan-glow ml-2">65%</span>
                    </div>
                    <p className="text-xs text-zella-primary-text mt-1">Recovery progress since last major loss</p>
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
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-zella-cyan-glow/50 shadow-inner"
                  />
                  {voiceEnabled && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                      <div className="h-1 w-1 rounded-full bg-zella-cyan-glow animate-pulse"></div>
                      <div className="h-2 w-1 rounded-full bg-zella-cyan-glow animate-pulse delay-75"></div>
                      <div className="h-3 w-1 rounded-full bg-zella-cyan-glow animate-pulse delay-150"></div>
                      <div className="h-2 w-1 rounded-full bg-zella-cyan-glow animate-pulse delay-75"></div>
                      <div className="h-1 w-1 rounded-full bg-zella-cyan-glow animate-pulse"></div>
                    </div>
                  )}
                </div>
                <Button 
                  size="icon" 
                  className="rounded-full h-10 w-10 bg-gradient-to-r from-zella-cyan-glow to-zella-electric-purple hover:shadow-button-glow transition-all duration-300"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-zella-primary-text">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Suggest prompts
                </Button>
                
                <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-zella-primary-text">
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
