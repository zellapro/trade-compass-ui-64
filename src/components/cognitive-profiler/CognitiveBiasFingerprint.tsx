
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Lightbulb } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface BiasType {
  name: string;
  score: number;
  description: string;
  mitigation: string;
}

const biases: BiasType[] = [
  {
    name: "Loss Aversion",
    score: 78,
    description: "You show a strong tendency to avoid losses over acquiring gains. This often results in holding losing trades too long and cutting winners short.",
    mitigation: "Use automated take profit and stop loss orders to remove emotion from the equation. Practice visualizing both gains and losses as learning opportunities.",
  },
  {
    name: "Recency Bias",
    score: 65,
    description: "You tend to heavily weight recent market events when making decisions, sometimes ignoring longer-term patterns.",
    mitigation: "Before trading, review longer timeframes first, then zoom in. Create a checklist that includes consulting historical patterns.",
  },
  {
    name: "Confirmation Bias",
    score: 72,
    description: "You often search for information that confirms your existing beliefs while ignoring contradictory evidence.",
    mitigation: "For each trade, write both a bull and bear case, even if you strongly favor one direction. Follow people with opposing market views.",
  },
  {
    name: "Sunk Cost Fallacy",
    score: 58,
    description: "You sometimes continue investing in losing positions because of the time and money already spent.",
    mitigation: "Evaluate positions as if you were opening them fresh today. Ask: 'Would I enter this trade now at this price?'",
  },
  {
    name: "Overtrading",
    score: 83,
    description: "You tend to trade excessively, especially during periods of market volatility or after losses.",
    mitigation: "Implement a daily trade limit and rest periods. After consecutive losses, enforce a 'cooling off' period of at least 30 minutes.",
  },
];

export function CognitiveBiasFingerprint() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  // Sort biases by score (highest to lowest)
  const sortedBiases = [...biases].sort((a, b) => b.score - a.score);
  
  return (
    <Card className="overflow-hidden border-border/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-semibold">Cognitive Bias Fingerprint</CardTitle>
        <CardDescription>
          Identifies dominant cognitive biases affecting your trading decisions
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {sortedBiases.map((bias) => (
            <div key={bias.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{bias.name}</span>
                <span 
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    bias.score > 75 
                      ? (isLightTheme ? "bg-red-100 text-red-800" : "bg-red-900/30 text-red-300") 
                      : bias.score > 60 
                        ? (isLightTheme ? "bg-amber-100 text-amber-800" : "bg-amber-900/30 text-amber-300")
                        : (isLightTheme ? "bg-green-100 text-green-800" : "bg-green-900/30 text-green-300")
                  }`}
                >
                  {bias.score}/100
                </span>
              </div>
              
              <Progress 
                value={bias.score} 
                className={`h-2 ${
                  bias.score > 75 
                    ? (isLightTheme ? "bg-red-100" : "bg-red-900/30") 
                    : bias.score > 60 
                      ? (isLightTheme ? "bg-amber-100" : "bg-amber-900/30")
                      : (isLightTheme ? "bg-green-100" : "bg-green-900/30")
                }`}
                indicatorClassName={
                  bias.score > 75 
                    ? (isLightTheme ? "bg-red-500" : "bg-red-500") 
                    : bias.score > 60 
                      ? (isLightTheme ? "bg-amber-500" : "bg-amber-500")
                      : (isLightTheme ? "bg-green-500" : "bg-green-500")
                }
              />
            </div>
          ))}
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {sortedBiases.slice(0, 3).map((bias) => (
            <AccordionItem key={bias.name} value={bias.name}>
              <AccordionTrigger className="text-sm">
                Mitigation Strategy: {bias.name}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">{bias.description}</p>
                  
                  <div className={`flex p-3 rounded-md ${
                    isLightTheme ? "bg-slate-100" : "bg-slate-900/50"
                  }`}>
                    <Lightbulb className={`h-5 w-5 mr-2 shrink-0 ${
                      isLightTheme ? "text-amber-500" : "text-amber-400"
                    }`} />
                    <p className="text-sm">{bias.mitigation}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
