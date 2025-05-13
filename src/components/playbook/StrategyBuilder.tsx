
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { FileCode, Sparkles, UploadCloud, ArrowRight, LineChart, AlertCircle, Check, Clock, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

export function StrategyBuilder() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [input, setInput] = useState("");
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  
  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate generation with a delay
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 2000);
  };
  
  return (
    <Card className={isLightTheme 
      ? "border-gray-200 bg-white shadow-sm"
      : "border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden"}>
      <CardHeader className={isLightTheme 
        ? "border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50/50"
        : "border-b border-white/10 bg-gradient-to-r from-zella-electric-purple/30 to-zella-cyan-glow/30"}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <FileCode className={`mr-2 h-5 w-5 ${isLightTheme ? "text-blue-600" : "text-zella-cyan-glow"}`} />
            <span className={isLightTheme 
              ? "text-gray-800" 
              : "bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"}>
              AI Strategy Sculptor – Build Your Edge from Thought
            </span>
          </CardTitle>
          <Badge variant="outline" className={isLightTheme 
            ? "border-blue-200 bg-blue-50 text-blue-700 text-xs"
            : "border-zella-cyan-glow/30 bg-zella-cyan-glow/10 text-zella-cyan-glow text-xs"}>
            <Sparkles className="h-3 w-3 mr-1" /> AI-Powered
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {!showResult ? (
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-full max-w-3xl space-y-4">
              <div className={isLightTheme 
                ? "bg-gray-50 border border-gray-200 p-4 rounded-xl"
                : "bg-white/5 border border-white/10 p-4 rounded-xl"}>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Sparkles className={`h-4 w-4 ${isLightTheme ? "text-blue-600" : "text-zella-cyan-glow"} mr-2`} />
                  Describe your strategy idea in natural language
                </h3>
                <Textarea
                  placeholder="I want to build a strategy that uses OBs + FVG after liquidity sweep on 5m, only if 15m is bullish, with a RR of at least 1:2 and confirmation from NY open volume."
                  className={isLightTheme 
                    ? "min-h-[120px] w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:border-blue-300 focus:ring-1 focus:ring-blue-200 resize-none"
                    : "min-h-[120px] w-full bg-transparent border border-white/10 rounded-lg p-3 text-sm focus:border-zella-cyan-glow/50 focus:ring-1 focus:ring-zella-cyan-glow/30 resize-none"}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "Order Block + BOS", 
                  "Liquidity Sweep + FVG", 
                  "Smart Money Concepts", 
                  "Mean Reversion",
                  "Momentum Based"
                ].map((tag) => (
                  <Button 
                    key={tag}
                    variant="outline" 
                    size="sm"
                    className={isLightTheme 
                      ? "bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-200 text-xs"
                      : "bg-white/5 border-white/10 hover:bg-zella-cyan-glow/20 hover:border-zella-cyan-glow/30 text-xs"}
                    onClick={() => setInput(prev => prev ? `${prev}, incorporating ${tag}` : `I want to build a strategy based on ${tag}`)}
                  >
                    + {tag}
                  </Button>
                ))}
              </div>
              
              <div className="flex flex-col items-center mt-6">
                <Button 
                  onClick={handleGenerate}
                  disabled={!input.trim() || isGenerating}
                  className={isLightTheme 
                    ? "bg-blue-600 hover:bg-blue-700 text-white min-w-[180px] transition-all duration-300"
                    : "bg-gradient-to-r from-zella-cyan-glow to-zella-electric-purple hover:shadow-button-glow min-w-[180px] transition-all duration-300"}
                >
                  {isGenerating ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Build with AI
                    </>
                  )}
                </Button>
                
                {isGenerating && (
                  <div className="w-full max-w-md mt-6">
                    <div className={`relative h-2 overflow-hidden rounded-full ${isLightTheme ? "bg-gray-100" : "bg-white/10"}`}>
                      <div className={`absolute h-full rounded-full animate-pulse ${isLightTheme 
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500" 
                        : "bg-gradient-to-r from-zella-cyan-glow to-zella-electric-purple"}`}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Analyzing input</span>
                      <span>Formulating strategy</span>
                      <span>Finalizing</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className={isLightTheme 
              ? "bg-gradient-to-r from-blue-50/50 via-indigo-50/60 to-blue-50/50 rounded-xl border border-blue-100 p-6 relative overflow-hidden"
              : "bg-gradient-to-r from-zella-electric-purple/10 via-zella-cyan-glow/20 to-zella-electric-purple/10 rounded-xl border border-white/10 p-6 relative overflow-hidden"}>
              {/* Subtle glow effect in the background */}
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full filter blur-3xl -z-10 ${isLightTheme 
                ? "bg-blue-100/40" 
                : "bg-zella-cyan-glow/10"}`}></div>
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Strategy details */}
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={isLightTheme 
                        ? "text-xl font-bold text-blue-700"
                        : "text-xl font-bold bg-gradient-to-r from-zella-cyan-glow to-zella-electric-purple bg-clip-text text-transparent"}>
                        OB-FVG Liquidity Sweep Strategy
                      </h3>
                      <p className="text-muted-foreground text-sm">Generated on May 11, 2025</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className={isLightTheme 
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-zella-positive-signal/30 bg-zella-positive-signal/10 text-zella-positive-signal"}>
                        Experimental
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium flex items-center">
                          <Check className={`h-4 w-4 ${isLightTheme ? "text-blue-600" : "text-zella-cyan-glow"} mr-2`} />
                          Entry Rules
                        </h4>
                        <ul className="mt-2 pl-6 text-sm space-y-2">
                          <li className="list-disc text-muted-foreground">Identify Order Block (OB) on 5m timeframe</li>
                          <li className="list-disc text-muted-foreground">Confirm 15m timeframe is showing bullish bias</li>
                          <li className="list-disc text-muted-foreground">Look for liquidity sweep below recent swing low</li>
                          <li className="list-disc text-muted-foreground">Wait for Fair Value Gap (FVG) to form post-sweep</li>
                          <li className="list-disc text-muted-foreground">Confirm entry with NY open volume increase</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium flex items-center">
                          <LineChart className={`h-4 w-4 ${isLightTheme ? "text-blue-600" : "text-zella-cyan-glow"} mr-2`} />
                          Risk Model
                        </h4>
                        <ul className="mt-2 pl-6 text-sm space-y-1">
                          <li className="list-disc text-muted-foreground">Stop Loss: Below liquidity sweep low</li>
                          <li className="list-disc text-muted-foreground">Position Size: 2% account risk maximum</li>
                          <li className="list-disc text-muted-foreground">Minimum R:R ratio: 1:2</li>
                          <li className="list-disc text-muted-foreground">Maximum 2 entries per setup</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium flex items-center">
                          <ArrowRight className={`h-4 w-4 ${isLightTheme ? "text-blue-600" : "text-zella-cyan-glow"} mr-2`} />
                          Exit Rules
                        </h4>
                        <ul className="mt-2 pl-6 text-sm space-y-1">
                          <li className="list-disc text-muted-foreground">Take 50% profit at 1:1 R:R</li>
                          <li className="list-disc text-muted-foreground">Move stop to break-even after 1:1 reached</li>
                          <li className="list-disc text-muted-foreground">Final take profit at next significant structure</li>
                          <li className="list-disc text-muted-foreground">Exit all if NY open volume is below average</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium flex items-center">
                          <TriangleAlert className={`h-4 w-4 ${isLightTheme ? "text-blue-600" : "text-zella-cyan-glow"} mr-2`} />
                          Invalidation Criteria
                        </h4>
                        <ul className="mt-2 pl-6 text-sm space-y-1">
                          <li className="list-disc text-muted-foreground">15m timeframe flips bearish</li>
                          <li className="list-disc text-muted-foreground">Price breaks OB before forming FVG</li>
                          <li className="list-disc text-muted-foreground">No liquidity sweep within 3 candles of OB</li>
                          <li className="list-disc text-muted-foreground">Major news event during setup formation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-4">
                    <div className={isLightTheme 
                      ? "bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3"
                      : "bg-zella-cyan-glow/10 border border-zella-cyan-glow/20 rounded-lg p-3 flex items-start gap-3"}>
                      <AlertCircle className={`h-5 w-5 ${isLightTheme ? "text-blue-600" : "text-zella-cyan-glow"} flex-shrink-0 mt-0.5`} />
                      <div>
                        <h4 className="font-medium text-sm mb-1">AI Feedback</h4>
                        <p className="text-sm text-muted-foreground">
                          This strategy aligns well with your "Rule-Bound Operator" profile, but the RR model may be too aggressive 
                          based on your tendency to exit trades early. Consider setting alerts at key prices to avoid monitoring charts continuously.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Strategy visualization and actions */}
                <div className="md:w-[260px] flex-shrink-0 space-y-4">
                  <div className={isLightTheme 
                    ? "bg-gray-50 border border-gray-200 rounded-lg p-3"
                    : "bg-white/5 border border-white/10 rounded-lg p-3"}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium">Screenshot</h4>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground">
                        <UploadCloud className="h-3.5 w-3.5 mr-1" />
                        Upload
                      </Button>
                    </div>
                    <div className={`h-[140px] w-full rounded border ${isLightTheme 
                      ? "border-gray-200 bg-white/80 flex items-center justify-center"
                      : "border-white/10 bg-white/5 flex items-center justify-center"}`}>
                      <UploadCloud className="h-8 w-8 text-muted-foreground opacity-50" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Replay Ready</span>
                      <div className={`w-8 h-4 rounded-full flex items-center p-0.5 ${isLightTheme 
                        ? "bg-blue-100" 
                        : "bg-zella-cyan-glow/30"}`}>
                        <div className={`w-3 h-3 rounded-full ${isLightTheme 
                          ? "bg-blue-600" 
                          : "bg-zella-cyan-glow"}`}></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Share with Community</span>
                      <div className="w-8 h-4 bg-muted rounded-full flex items-center p-0.5">
                        <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Add to Favorites</span>
                      <div className="w-8 h-4 bg-muted rounded-full flex items-center p-0.5">
                        <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-3">
                    <Button className={isLightTheme 
                      ? "w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                      : "w-full bg-gradient-to-r from-zella-cyan-glow to-zella-electric-purple hover:shadow-button-glow transition-all duration-300"}>
                      <Clock className="mr-2 h-4 w-4" />
                      Start Replay Session
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-3">
              <Button 
                variant="outline" 
                className={isLightTheme 
                  ? "border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-gray-800"
                  : "border-white/10 hover:bg-white/5 text-muted-foreground hover:text-white"} 
                onClick={() => setShowResult(false)}>
                Build Another Strategy
              </Button>
              
              <Button className={isLightTheme 
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gradient-to-r from-zella-cyan-glow to-zella-electric-purple hover:shadow-button-glow transition-all duration-300"}>
                <Sparkles className="mr-2 h-4 w-4" />
                Save Strategy
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
