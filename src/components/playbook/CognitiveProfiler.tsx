
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Brain, ChevronLeft, ChevronRight, Sparkles, Star, AlertTriangle, Check, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

export function CognitiveProfiler() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  
  // Sample questions
  const questions = [
    {
      id: 1,
      text: "When a trade moves against you, what is your first instinct?",
      options: [
        "Cut losses immediately",
        "Add to position to average down",
        "Wait for price to return to entry",
        "Evaluate if initial thesis is intact"
      ]
    },
    {
      id: 2,
      text: "How do you typically feel after taking a significant loss?",
      options: [
        "Eager to make it back immediately",
        "Analytical about what went wrong",
        "Need time away from charts",
        "Minimal emotional impact"
      ]
    },
    {
      id: 3,
      text: "Which statement best describes your trading preparation?",
      options: [
        "Detailed plan with multiple scenarios",
        "General idea with flexibility",
        "Quick assessment before entry",
        "Rely mostly on real-time analysis"
      ]
    }
  ];
  
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  return (
    <Card className={isLightTheme 
      ? "border-gray-200 bg-white shadow-sm" 
      : "border-white/10 bg-black/40 backdrop-blur-xl"}>
      <CardHeader className={`border-b ${isLightTheme 
        ? "border-gray-100 bg-gradient-to-r from-indigo-50 to-indigo-100/50" 
        : "border-white/10 bg-gradient-to-r from-indigo-900/30 to-violet-900/30"}`}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Brain className={`mr-2 h-5 w-5 ${isLightTheme ? "text-indigo-600" : "text-indigo-400"}`} />
            <span className={isLightTheme ? "text-gray-800" : "bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"}>
              Know Thyself – Cognitive Edge Profiler
            </span>
          </CardTitle>
          <Badge variant="outline" className={isLightTheme 
            ? "border-indigo-200 bg-indigo-50 text-indigo-700 text-xs" 
            : "border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs"}>
            <Sparkles className="h-3 w-3 mr-1" /> AI-Powered
          </Badge>
        </div>
      </CardHeader>
      
      {!showResults ? (
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-6">
            {/* Progress indicator */}
            <div className="w-full flex items-center justify-center mb-2">
              <div className={`relative h-1 w-44 ${isLightTheme ? "bg-gray-200" : "bg-white/10"} rounded-full overflow-hidden`}>
                <div 
                  className={`absolute h-full ${isLightTheme 
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500" 
                    : "bg-gradient-to-r from-indigo-500 to-violet-500"} rounded-full`}
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <span className="ml-3 text-xs text-muted-foreground">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>
            
            {/* Question card with animation */}
            <div className={`w-full max-w-xl ${isLightTheme 
              ? "bg-gray-50 border border-gray-200" 
              : "bg-white/5 border border-white/10"} p-6 rounded-xl`}>
              <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].text}</h3>
              <div className="space-y-3 mt-6">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-3 rounded-lg ${isLightTheme 
                      ? "border border-gray-200 bg-white hover:bg-indigo-50 hover:border-indigo-200" 
                      : "border border-white/10 bg-white/5 hover:bg-indigo-600/20 hover:border-indigo-500/50"} transition-colors duration-200`}
                  >
                    <div className="flex items-center">
                      <div className={`h-5 w-5 rounded-full ${isLightTheme 
                        ? "border border-gray-300" 
                        : "border border-white/20"} mr-3 flex items-center justify-center`}>
                        <div className={`h-3 w-3 rounded-full ${isLightTheme 
                          ? "bg-white/0 group-hover:bg-indigo-500" 
                          : "bg-white/0 group-hover:bg-indigo-500"} transition-colors`}></div>
                      </div>
                      {option}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex items-center justify-between w-full max-w-xl">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={isLightTheme ? "text-gray-500 hover:text-gray-800" : "text-muted-foreground hover:text-white"}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                className={isLightTheme 
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white" 
                  : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500"}
              >
                {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent className="p-6">
          <div className="flex flex-col space-y-6">
            {/* Result Card */}
            <div className={`p-6 border ${isLightTheme 
              ? "border-gray-200 rounded-xl bg-gradient-to-b from-indigo-50/50 to-white" 
              : "border-white/10 rounded-xl bg-gradient-to-b from-indigo-900/20 to-black/20"}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${isLightTheme 
                  ? "text-indigo-800" 
                  : "bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent"}`}>
                  Calculated Profile: Disciplined Tactical
                </h3>
                <Badge className={isLightTheme ? "bg-indigo-600 text-white" : "bg-indigo-600 text-white"}>98% Match</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center mb-2">
                      <Star className={`h-4 w-4 ${isLightTheme ? "text-amber-500" : "text-amber-400"} mr-2`} />
                      Strength Zones
                    </h4>
                    <ul className="space-y-2 pl-6 text-sm">
                      <li className="flex items-start">
                        <Check className={`h-3.5 w-3.5 ${isLightTheme ? "text-green-600" : "text-green-400"} mr-2 mt-0.5 flex-shrink-0`} />
                        <span>Plan adherence & rule following</span>
                      </li>
                      <li className="flex items-start">
                        <Check className={`h-3.5 w-3.5 ${isLightTheme ? "text-green-600" : "text-green-400"} mr-2 mt-0.5 flex-shrink-0`} />
                        <span>Post-loss recovery & resilience</span>
                      </li>
                      <li className="flex items-start">
                        <Check className={`h-3.5 w-3.5 ${isLightTheme ? "text-green-600" : "text-green-400"} mr-2 mt-0.5 flex-shrink-0`} />
                        <span>Technical precision & accuracy</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium flex items-center mb-2">
                      <AlertTriangle className={`h-4 w-4 ${isLightTheme ? "text-amber-500" : "text-amber-400"} mr-2`} />
                      Risk Factors
                    </h4>
                    <ul className="space-y-2 pl-6 text-sm">
                      <li className="flex items-start">
                        <AlertTriangle className={`h-3.5 w-3.5 ${isLightTheme ? "text-amber-500" : "text-amber-400"} mr-2 mt-0.5 flex-shrink-0`} />
                        <span>Tendency to exit winners too early</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className={`h-3.5 w-3.5 ${isLightTheme ? "text-amber-500" : "text-amber-400"} mr-2 mt-0.5 flex-shrink-0`} />
                        <span>Over-analysis leading to missed entries</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center mb-2">
                      <LineChart className={`h-4 w-4 ${isLightTheme ? "text-blue-600" : "text-blue-400"} mr-2`} />
                      Setup Fit
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Order Block (OB) Setups</span>
                          <span>87%</span>
                        </div>
                        <div className={`h-1.5 w-full ${isLightTheme ? "bg-gray-200" : "bg-white/10"} rounded-full overflow-hidden`}>
                          <div className={`h-full ${isLightTheme 
                            ? "bg-gradient-to-r from-green-500 to-green-400" 
                            : "bg-gradient-to-r from-green-500 to-green-400"} rounded-full`} style={{width: "87%"}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Pullback Strategies</span>
                          <span>92%</span>
                        </div>
                        <div className={`h-1.5 w-full ${isLightTheme ? "bg-gray-200" : "bg-white/10"} rounded-full overflow-hidden`}>
                          <div className={`h-full ${isLightTheme 
                            ? "bg-gradient-to-r from-green-500 to-green-400" 
                            : "bg-gradient-to-r from-green-500 to-green-400"} rounded-full`} style={{width: "92%"}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Breakout Trading</span>
                          <span>64%</span>
                        </div>
                        <div className={`h-1.5 w-full ${isLightTheme ? "bg-gray-200" : "bg-white/10"} rounded-full overflow-hidden`}>
                          <div className={`h-full ${isLightTheme 
                            ? "bg-gradient-to-r from-amber-500 to-amber-400" 
                            : "bg-gradient-to-r from-amber-500 to-amber-400"} rounded-full`} style={{width: "64%"}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium flex items-center mb-2">
                      <Sparkles className={`h-4 w-4 ${isLightTheme ? "text-violet-600" : "text-violet-400"} mr-2`} />
                      Ritual Advice
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Implement a 5-minute technical review before trades. 
                      Use a 3-step validation checklist to combat over-analysis.
                      Journal emotional state after each exit.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`mt-6 pt-4 border-t ${isLightTheme ? "border-gray-200" : "border-white/10"}`}>
                <Button className={isLightTheme 
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white" 
                  : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500"}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Sync With Strategy Builder
                </Button>
              </div>
            </div>
            
            {/* Re-take button */}
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                className={isLightTheme 
                  ? "border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50" 
                  : "border-white/10 text-muted-foreground hover:text-white hover:bg-white/5"} 
                onClick={() => {
                  setCurrentQuestion(0);
                  setShowResults(false);
                }}>
                Retake Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
