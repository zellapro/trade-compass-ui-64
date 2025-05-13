
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, AlertCircle, LineChart, Sparkles, ChartBar, Clock, X, Check, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

export function ExecutionScanner() {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

  return (
    <Card className={isLightTheme 
      ? "border-gray-200 bg-white shadow-sm" 
      : "border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden"}>
      <CardHeader className={`border-b ${isLightTheme 
        ? "border-gray-100 bg-gradient-to-r from-violet-50 to-violet-100/50" 
        : "border-white/10 bg-gradient-to-r from-violet-900/30 to-fuchsia-900/30"}`}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Lightbulb className={`mr-2 h-5 w-5 ${isLightTheme ? "text-violet-600" : "text-violet-400"}`} />
            <span className={isLightTheme ? "text-gray-800" : "bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"}>
              Execution Edge Scanner
            </span>
          </CardTitle>
          <Badge variant="outline" className={isLightTheme 
            ? "border-violet-200 bg-violet-50 text-violet-700 text-xs" 
            : "border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs"}>
            <ChartBar className="h-3 w-3 mr-1" /> Based on 147 Trades
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Trader archetype */}
          <div className="flex flex-col space-y-5">
            <div className={`p-4 ${isLightTheme 
              ? "bg-gray-50 border border-gray-200" 
              : "bg-white/5 border border-white/10"} rounded-xl`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Trading Archetype</h3>
                <Badge className={isLightTheme ? "bg-violet-600 text-white" : "bg-violet-500/80 text-white"}>93% Accuracy</Badge>
              </div>
              
              <div className={isLightTheme 
                ? "bg-gradient-to-r from-violet-50 to-violet-100/50 rounded-lg p-3 mb-4 border border-violet-200"
                : "bg-gradient-to-r from-violet-900/20 to-violet-800/10 rounded-lg p-3 mb-4 border border-violet-500/20"}>
                <h4 className={`text-xl font-bold ${isLightTheme 
                  ? "text-violet-800" 
                  : "bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"}`}>
                  Rule-Bound Operator
                </h4>
                <p className="text-sm text-muted-foreground">
                  You thrive with systematic approaches and clear decision frameworks.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Systematic vs. Intuitive</span>
                  <span className="font-medium">Systematic</span>
                </div>
                <div className={`h-1.5 w-full ${isLightTheme ? "bg-gray-200" : "bg-white/10"} rounded-full overflow-hidden`}>
                  <div className={`h-full ${isLightTheme 
                    ? "bg-gradient-to-r from-violet-500 to-fuchsia-500" 
                    : "bg-gradient-to-r from-violet-500 to-fuchsia-500"} rounded-full`} style={{ width: "86%" }}></div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span>Conservative vs. Aggressive</span>
                  <span className="font-medium">Conservative</span>
                </div>
                <div className={`h-1.5 w-full ${isLightTheme ? "bg-gray-200" : "bg-white/10"} rounded-full overflow-hidden`}>
                  <div className={`h-full ${isLightTheme 
                    ? "bg-gradient-to-r from-violet-500 to-fuchsia-500" 
                    : "bg-gradient-to-r from-violet-500 to-fuchsia-500"} rounded-full`} style={{ width: "72%" }}></div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span>Technical vs. Fundamental</span>
                  <span className="font-medium">Technical</span>
                </div>
                <div className={`h-1.5 w-full ${isLightTheme ? "bg-gray-200" : "bg-white/10"} rounded-full overflow-hidden`}>
                  <div className={`h-full ${isLightTheme 
                    ? "bg-gradient-to-r from-violet-500 to-fuchsia-500" 
                    : "bg-gradient-to-r from-violet-500 to-fuchsia-500"} rounded-full`} style={{ width: "94%" }}></div>
                </div>
              </div>
            </div>
            
            <div className={`p-4 ${isLightTheme 
              ? "bg-gray-50 border border-gray-200" 
              : "bg-white/5 border border-white/10"} rounded-xl`}>
              <h3 className="font-medium mb-3">Key Insights</h3>
              
              <div className="space-y-3">
                <div className={`flex items-start p-2 ${isLightTheme 
                  ? "bg-green-50 border border-green-200" 
                  : "bg-green-900/20 border border-green-500/20"} rounded-lg`}>
                  <Check className={`h-4 w-4 ${isLightTheme ? "text-green-600" : "text-green-400"} mt-0.5 mr-2 flex-shrink-0`} />
                  <div>
                    <p className="text-sm">
                      Your win rate is 12% higher on trades where you completed full pre-trade checklists.
                    </p>
                  </div>
                </div>
                
                <div className={`flex items-start p-2 ${isLightTheme 
                  ? "bg-amber-50 border border-amber-200" 
                  : "bg-amber-900/20 border border-amber-500/20"} rounded-lg`}>
                  <AlertCircle className={`h-4 w-4 ${isLightTheme ? "text-amber-600" : "text-amber-400"} mt-0.5 mr-2 flex-shrink-0`} />
                  <div>
                    <p className="text-sm">
                      You enter 63% of trades late after initial confirmation, reducing R:R by 0.4 on average.
                    </p>
                  </div>
                </div>
                
                <div className={`flex items-start p-2 ${isLightTheme 
                  ? "bg-red-50 border border-red-200" 
                  : "bg-red-900/20 border border-red-500/20"} rounded-lg`}>
                  <X className={`h-4 w-4 ${isLightTheme ? "text-red-600" : "text-red-400"} mt-0.5 mr-2 flex-shrink-0`} />
                  <div>
                    <p className="text-sm">
                      Post-news setups underperform with 34% win rate vs. 58% average across all setups.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Middle column: Performance metrics */}
          <div className="lg:col-span-2 space-y-5">
            <div className={`p-4 ${isLightTheme 
              ? "bg-gray-50 border border-gray-200" 
              : "bg-white/5 border border-white/10"} rounded-xl`}>
              <h3 className="font-medium mb-4">Performance Metrics</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {["Plan Adherence", "Timing Precision", "Post-Loss Recovery", "Impulse Control", "Checklist Usage"].map((metric, i) => (
                  <div key={i} className={`flex flex-col items-center justify-center p-3 ${isLightTheme 
                    ? "bg-white border border-gray-200" 
                    : "bg-white/5 border border-white/10"} rounded-lg`}>
                    <span className="text-xs text-muted-foreground mb-2">{metric}</span>
                    
                    <div className="relative h-20 w-20 flex items-center justify-center">
                      {/* Circular progress bar background */}
                      <svg className="h-full w-full -rotate-90 absolute" viewBox="0 0 24 24">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke={isLightTheme ? "rgba(226,232,240,1)" : "rgba(255,255,255,0.1)"}
                          strokeWidth="2"
                        />
                      </svg>
                      
                      {/* Circular progress bar fill */}
                      <svg className="h-full w-full -rotate-90 absolute" viewBox="0 0 24 24">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke={`url(#gradient-${i})`}
                          strokeWidth="2"
                          strokeDasharray={`${[82, 68, 75, 58, 89][i] * 0.628} 100`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={isLightTheme ? "#8b5cf6" : "#8b5cf6"} />
                            <stop offset="100%" stopColor={isLightTheme ? "#c084fc" : "#d946ef"} />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      {/* Percentage text */}
                      <div className="text-lg font-semibold">
                        {[82, 68, 75, 58, 89][i]}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className={`p-4 ${isLightTheme 
                ? "bg-gray-50 border border-gray-200" 
                : "bg-white/5 border border-white/10"} rounded-xl`}>
                <h3 className="font-medium mb-4 flex items-center">
                  <PieChart className={`h-4 w-4 ${isLightTheme ? "text-violet-600" : "text-violet-400"} mr-2`} />
                  <span>Behavior vs. Outcome</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 ${isLightTheme 
                    ? "bg-green-50 border border-green-200" 
                    : "bg-green-900/20 border border-green-500/20"} rounded-lg text-center`}>
                    <div className="text-xs text-muted-foreground mb-1">Disciplined Win</div>
                    <div className={`text-2xl font-bold ${isLightTheme ? "text-green-600" : "text-green-400"}`}>46%</div>
                  </div>
                  
                  <div className={`p-3 ${isLightTheme 
                    ? "bg-amber-50 border border-amber-200" 
                    : "bg-amber-900/20 border border-amber-500/20"} rounded-lg text-center`}>
                    <div className="text-xs text-muted-foreground mb-1">Impulsive Win</div>
                    <div className={`text-2xl font-bold ${isLightTheme ? "text-amber-600" : "text-amber-400"}`}>12%</div>
                  </div>
                  
                  <div className={`p-3 ${isLightTheme 
                    ? "bg-red-50 border border-red-200" 
                    : "bg-red-900/20 border border-red-500/20"} rounded-lg text-center`}>
                    <div className="text-xs text-muted-foreground mb-1">Disciplined Loss</div>
                    <div className={`text-2xl font-bold ${isLightTheme ? "text-red-600" : "text-red-400"}`}>32%</div>
                  </div>
                  
                  <div className={`p-3 ${isLightTheme 
                    ? "bg-red-100 border border-red-200" 
                    : "bg-red-900/30 border border-red-500/30"} rounded-lg text-center`}>
                    <div className="text-xs text-muted-foreground mb-1">Impulsive Loss</div>
                    <div className={`text-2xl font-bold ${isLightTheme ? "text-red-600" : "text-red-500"}`}>10%</div>
                  </div>
                </div>
                
                <div className={`mt-3 p-2 ${isLightTheme 
                  ? "bg-violet-50 border border-violet-200" 
                  : "bg-violet-900/20 border border-violet-500/20"} rounded-lg`}>
                  <div className="flex items-start gap-2">
                    <Sparkles className={`h-4 w-4 ${isLightTheme ? "text-violet-600" : "text-violet-400"} mt-0.5 flex-shrink-0`} />
                    <p className="text-xs">
                      <span className="font-medium">Insight:</span> Your disciplined processes lead to a 
                      <span className={`${isLightTheme ? "text-green-600" : "text-green-400"} font-medium`}> 59% win rate</span>, while impulsive decisions result in only a 
                      <span className={`${isLightTheme ? "text-amber-600" : "text-amber-400"} font-medium`}> 31% win rate</span>.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 ${isLightTheme 
                ? "bg-gray-50 border border-gray-200" 
                : "bg-white/5 border border-white/10"} rounded-xl`}>
                <h3 className="font-medium mb-4 flex items-center">
                  <Clock className={`h-4 w-4 ${isLightTheme ? "text-violet-600" : "text-violet-400"} mr-2`} />
                  <span>Time-Based Analysis</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 ${isLightTheme 
                    ? "bg-white border border-gray-200" 
                    : "bg-white/5 border border-white/10"} rounded-lg`}>
                    <div className="text-xs text-muted-foreground">Best Time Frame</div>
                    <div className="text-lg font-bold">5-Minute</div>
                    <div className={`text-xs ${isLightTheme ? "text-green-600" : "text-green-400"}`}>86% of profitable trades</div>
                  </div>
                  
                  <div className={`p-3 ${isLightTheme 
                    ? "bg-white border border-gray-200" 
                    : "bg-white/5 border border-white/10"} rounded-lg`}>
                    <div className="text-xs text-muted-foreground">Best Trading Window</div>
                    <div className="text-lg font-bold">9:30 - 11:00 AM</div>
                    <div className={`text-xs ${isLightTheme ? "text-green-600" : "text-green-400"}`}>2.1:1 average R:R</div>
                  </div>
                  
                  <div className={`p-3 ${isLightTheme 
                    ? "bg-white border border-gray-200" 
                    : "bg-white/5 border border-white/10"} rounded-lg`}>
                    <div className="text-xs text-muted-foreground">Worst Trading Time</div>
                    <div className="text-lg font-bold">2:00 - 3:00 PM</div>
                    <div className={`text-xs ${isLightTheme ? "text-red-600" : "text-red-400"}`}>32% win rate</div>
                  </div>
                  
                  <div className={`p-3 ${isLightTheme 
                    ? "bg-white border border-gray-200" 
                    : "bg-white/5 border border-white/10"} rounded-lg`}>
                    <div className="text-xs text-muted-foreground">Avg. Trade Duration</div>
                    <div className="text-lg font-bold">27 minutes</div>
                    <div className={`text-xs ${isLightTheme ? "text-amber-600" : "text-amber-400"}`}>Trending shorter</div>
                  </div>
                </div>
                
                <div className={`mt-3 p-2 ${isLightTheme 
                  ? "bg-violet-50 border border-violet-200" 
                  : "bg-violet-900/20 border border-violet-500/20"} rounded-lg`}>
                  <div className="flex items-start gap-2">
                    <Sparkles className={`h-4 w-4 ${isLightTheme ? "text-violet-600" : "text-violet-400"} mt-0.5 flex-shrink-0`} />
                    <p className="text-xs">
                      <span className="font-medium">Recommendation:</span> Consider taking a scheduled break between 2:00-3:00 PM or switch to observation mode only.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button className={isLightTheme 
                ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white" 
                : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500"}>
                <Sparkles className="h-4 w-4 mr-2" />
                Sync With Strategy Builder
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
