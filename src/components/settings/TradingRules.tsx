
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Save, Undo, Plus, Info, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TradingRulesProps {
  onSettingChange: () => void;
  saveResetButtons?: React.ReactNode;
}

const TradingRules: React.FC<TradingRulesProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("risk-rules");
  const [riskPerTrade, setRiskPerTrade] = useState(2);
  const [maxDailyLoss, setMaxDailyLoss] = useState(5);
  const [maxWeeklyLoss, setMaxWeeklyLoss] = useState(10);
  const [maxOpenTrades, setMaxOpenTrades] = useState(3);
  const [enforceRiskRules, setEnforceRiskRules] = useState(true);
  const [tradingHoursStart, setTradingHoursStart] = useState("09:00");
  const [tradingHoursEnd, setTradingHoursEnd] = useState("16:30");
  const [restrictedSymbols, setRestrictedSymbols] = useState("");
  const [tradingPlan, setTradingPlan] = useState({
    goal: "Consistent 5% monthly returns",
    timeframe: "Daily",
    strategy: "Momentum with technical confirmation",
    notes: "Follow the trading plan carefully. Only take high probability setups."
  });

  const handleSaveRiskRules = () => {
    toast({
      description: "Risk management rules saved successfully.",
    });
    onSettingChange();
  };

  const handleSaveTimeRules = () => {
    toast({
      description: "Trading time rules saved successfully.",
    });
    onSettingChange();
  };

  const handleSaveSymbolRules = () => {
    toast({
      description: "Trading symbol restrictions saved successfully.",
    });
    onSettingChange();
  };

  const handleSaveTradingPlan = () => {
    toast({
      description: "Trading plan saved successfully.",
    });
    onSettingChange();
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-4 mb-6">
          <TabsTrigger value="risk-rules">Risk Rules</TabsTrigger>
          <TabsTrigger value="time-rules">Time Rules</TabsTrigger>
          <TabsTrigger value="symbol-rules">Symbol Rules</TabsTrigger>
          <TabsTrigger value="trading-plan">Trading Plan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="risk-rules" className="space-y-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Risk Management Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="risk-per-trade">Risk Per Trade (%)</Label>
                    <span className="font-medium">{riskPerTrade}%</span>
                  </div>
                  <Slider 
                    id="risk-per-trade" 
                    min={0.1} 
                    max={10} 
                    step={0.1} 
                    value={[riskPerTrade]} 
                    onValueChange={([val]) => setRiskPerTrade(val)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="max-daily-loss">Max Daily Loss (%)</Label>
                    <span className="font-medium">{maxDailyLoss}%</span>
                  </div>
                  <Slider 
                    id="max-daily-loss" 
                    min={1} 
                    max={20} 
                    step={1} 
                    value={[maxDailyLoss]} 
                    onValueChange={([val]) => setMaxDailyLoss(val)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="max-weekly-loss">Max Weekly Loss (%)</Label>
                    <span className="font-medium">{maxWeeklyLoss}%</span>
                  </div>
                  <Slider 
                    id="max-weekly-loss" 
                    min={1} 
                    max={30} 
                    step={1} 
                    value={[maxWeeklyLoss]} 
                    onValueChange={([val]) => setMaxWeeklyLoss(val)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="max-open-trades">Max Open Trades</Label>
                    <span className="font-medium">{maxOpenTrades}</span>
                  </div>
                  <Slider 
                    id="max-open-trades" 
                    min={1} 
                    max={10} 
                    step={1} 
                    value={[maxOpenTrades]} 
                    onValueChange={([val]) => setMaxOpenTrades(val)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enforce-risk-rules" 
                  checked={enforceRiskRules}
                  onCheckedChange={setEnforceRiskRules}
                />
                <Label htmlFor="enforce-risk-rules">Enforce risk rules when placing trades</Label>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveRiskRules}>
                  Save Risk Rules
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="time-rules" className="space-y-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                Trading Time Restrictions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trading-hours-start">Trading Hours Start</Label>
                  <Input 
                    id="trading-hours-start" 
                    type="time" 
                    value={tradingHoursStart}
                    onChange={(e) => setTradingHoursStart(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trading-hours-end">Trading Hours End</Label>
                  <Input 
                    id="trading-hours-end" 
                    type="time" 
                    value={tradingHoursEnd}
                    onChange={(e) => setTradingHoursEnd(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="restrict-weekends" />
                <Label htmlFor="restrict-weekends">Prevent trading on weekends</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="restrict-news" />
                <Label htmlFor="restrict-news">Restrict trading during major news events</Label>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveTimeRules}>
                  Save Time Rules
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="symbol-rules" className="space-y-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                Trading Symbol Restrictions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="restricted-symbols">Restricted Symbols (comma separated)</Label>
                <Textarea 
                  id="restricted-symbols" 
                  placeholder="e.g. TSLA, AAPL, MSFT" 
                  value={restrictedSymbols}
                  onChange={(e) => setRestrictedSymbols(e.target.value)}
                  className="h-24"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="enforce-whitelist" />
                <Label htmlFor="enforce-whitelist">Only allow trading on whitelisted symbols</Label>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveSymbolRules}>
                  Save Symbol Rules
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trading-plan" className="space-y-6">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5" />
                Trading Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trading-goal">Trading Goal</Label>
                  <Input 
                    id="trading-goal" 
                    placeholder="e.g. Consistent 5% monthly returns"
                    value={tradingPlan.goal}
                    onChange={(e) => setTradingPlan({...tradingPlan, goal: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeframe">Preferred Timeframe</Label>
                  <Select 
                    value={tradingPlan.timeframe}
                    onValueChange={(value) => setTradingPlan({...tradingPlan, timeframe: value})}
                  >
                    <SelectTrigger id="timeframe">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M1">1 Minute</SelectItem>
                      <SelectItem value="M5">5 Minutes</SelectItem>
                      <SelectItem value="M15">15 Minutes</SelectItem>
                      <SelectItem value="M30">30 Minutes</SelectItem>
                      <SelectItem value="H1">1 Hour</SelectItem>
                      <SelectItem value="H4">4 Hours</SelectItem>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="strategy">Primary Strategy</Label>
                  <Input 
                    id="strategy" 
                    placeholder="e.g. Breakout with volume confirmation"
                    value={tradingPlan.strategy}
                    onChange={(e) => setTradingPlan({...tradingPlan, strategy: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="trading-notes">Trading Notes</Label>
                  <Textarea 
                    id="trading-notes" 
                    placeholder="Additional notes for your trading plan"
                    value={tradingPlan.notes}
                    onChange={(e) => setTradingPlan({...tradingPlan, notes: e.target.value})}
                    className="h-32"
                  />
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveTradingPlan}>
                  Save Trading Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {saveResetButtons && (
        <div className="pt-4">
          {saveResetButtons}
        </div>
      )}
    </div>
  );
};

export default TradingRules;
