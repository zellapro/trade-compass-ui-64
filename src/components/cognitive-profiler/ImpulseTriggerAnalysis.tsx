
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator"; 
import { AlertCircle, Brain, Lightbulb } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface TriggerItem {
  id: string;
  label: string;
  checked: boolean;
  severity?: number;
}

interface SuggestionItem {
  trigger: string;
  severity: number;
  suggestion: string;
}

export function ImpulseTriggerAnalysis() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  const [triggers, setTriggers] = React.useState<TriggerItem[]>([
    { id: "news", label: "Breaking news", checked: true, severity: 8 },
    { id: "candles", label: "Big red/green candles", checked: true, severity: 9 },
    { id: "revenge", label: "Revenge trades", checked: true, severity: 10 },
    { id: "fomo", label: "Missing out (FOMO)", checked: false },
    { id: "price-alerts", label: "Price alerts", checked: false },
    { id: "social", label: "Social media calls", checked: true, severity: 7 },
    { id: "boredom", label: "Boredom/overtrading", checked: false },
    { id: "excitement", label: "Market excitement", checked: false },
    { id: "psychological", label: "Psychological levels", checked: false }
  ]);

  const topTriggers: SuggestionItem[] = [
    { 
      trigger: "Revenge Trades", 
      severity: 10,
      suggestion: "Implement a mandatory 15-minute cooldown after any losing trade before placing a new one."
    },
    { 
      trigger: "Big Red/Green Candles", 
      severity: 9,
      suggestion: "Create a checklist that must be completed before entering during high volatility candles."
    },
    { 
      trigger: "Breaking News", 
      severity: 8,
      suggestion: "Set a timer for 5 minutes after news before taking any action. Record your initial reaction vs. final decision."
    }
  ];
  
  const handleTriggerChange = (id: string, checked: boolean) => {
    setTriggers(prev => prev.map(trigger => 
      trigger.id === id ? { ...trigger, checked } : trigger
    ));
  };

  return (
    <Card className="overflow-hidden border-border/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-semibold">Impulse Trigger Analysis</CardTitle>
        <CardDescription>
          Diagnosing what market or emotional triggers cause impulsive actions
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground">Common Impulse Triggers</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {triggers.map((trigger) => (
              <div key={trigger.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={trigger.id} 
                  checked={trigger.checked}
                  onCheckedChange={(checked) => 
                    handleTriggerChange(trigger.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={trigger.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {trigger.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Top 3 Personal Triggers</h3>
          </div>
          
          <div className="space-y-5">
            {topTriggers.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{item.trigger}</div>
                  <div 
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      item.severity >= 9 
                        ? (isLightTheme ? 'bg-red-100 text-red-800' : 'bg-red-900/30 text-red-300') 
                        : item.severity >= 7 
                          ? (isLightTheme ? 'bg-amber-100 text-amber-800' : 'bg-amber-900/30 text-amber-300')
                          : (isLightTheme ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/30 text-blue-300')
                    }`}
                  >
                    Severity: {item.severity}/10
                  </div>
                </div>
                
                <Progress 
                  value={item.severity * 10} 
                  className={`h-2 ${
                    item.severity >= 9 
                      ? (isLightTheme ? 'bg-red-100' : 'bg-red-900/30') 
                      : item.severity >= 7 
                        ? (isLightTheme ? 'bg-amber-100' : 'bg-amber-900/30')
                        : (isLightTheme ? 'bg-blue-100' : 'bg-blue-900/30')
                  }`}
                  indicatorClassName={
                    item.severity >= 9 
                      ? (isLightTheme ? 'bg-red-500' : 'bg-red-500') 
                      : item.severity >= 7 
                        ? (isLightTheme ? 'bg-amber-500' : 'bg-amber-500')
                        : (isLightTheme ? 'bg-blue-500' : 'bg-blue-500')
                  }
                />
                
                <div className={`flex p-3 rounded-md ${
                  isLightTheme ? 'bg-slate-100' : 'bg-slate-900/50'
                }`}>
                  <Lightbulb className={`h-5 w-5 mr-2 shrink-0 ${
                    isLightTheme ? 'text-amber-500' : 'text-amber-400'
                  }`} />
                  <p className="text-sm">{item.suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
