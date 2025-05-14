
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { MonteCarloChart } from "./charts/MonteCarloChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const MonteCarloSimulationPanel = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [riskPerTrade, setRiskPerTrade] = useState(1);
  const [numTrades, setNumTrades] = useState("500");
  const [confidenceLevel, setConfidenceLevel] = useState("95");
  const [useLastTrades, setUseLastTrades] = useState(false);
  const [scale, setScale] = useState<"linear" | "log">("linear");

  // Mock simulation results
  const mockResults = {
    medianEquity: 12750,
    maxDrawdown: 18.5,
    doublingProbability: 72.4,
  };

  return (
    <Card className="bg-card shadow-lg border-border/30 animate-fade-in">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
          Monte Carlo Simulation
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={16} className="text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              Simulates potential future equity curves based on your risk parameters and historical performance data.
            </TooltipContent>
          </Tooltip>
        </CardTitle>
        <CollapsibleTrigger
          onClick={() => setIsOpen(!isOpen)}
          className="text-muted-foreground hover:text-foreground"
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </CollapsibleTrigger>
      </CardHeader>

      <Collapsible open={isOpen} className="w-full">
        <CollapsibleContent>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Inputs */}
              <div className="flex flex-col space-y-6">
                <h3 className="text-md font-medium text-foreground">Simulation Parameters</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="risk-per-trade" className="text-sm text-muted-foreground">
                        Risk Per Trade (%)
                      </Label>
                      <div className="w-16">
                        <Input
                          id="risk-input"
                          type="number"
                          min={0.25}
                          max={5}
                          step={0.25}
                          value={riskPerTrade}
                          onChange={(e) => setRiskPerTrade(parseFloat(e.target.value))}
                          className="h-7 text-xs text-right"
                        />
                      </div>
                    </div>
                    <Slider
                      id="risk-per-trade"
                      min={0.25}
                      max={5}
                      step={0.25}
                      value={[riskPerTrade]}
                      onValueChange={(value) => setRiskPerTrade(value[0])}
                      className="py-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="num-trades" className="text-sm text-muted-foreground">
                      Number of Trades
                    </Label>
                    <Select value={numTrades} onValueChange={setNumTrades}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select number of trades" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100 Trades</SelectItem>
                        <SelectItem value="250">250 Trades</SelectItem>
                        <SelectItem value="500">500 Trades</SelectItem>
                        <SelectItem value="1000">1000 Trades</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confidence" className="text-sm text-muted-foreground">
                      Confidence Level
                    </Label>
                    <Select value={confidenceLevel} onValueChange={setConfidenceLevel}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select confidence level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90%</SelectItem>
                        <SelectItem value="95">95%</SelectItem>
                        <SelectItem value="99">99%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Label htmlFor="use-trades" className="text-sm text-muted-foreground">
                      Use my last 50 trades
                    </Label>
                    <Switch
                      id="use-trades"
                      checked={useLastTrades}
                      onCheckedChange={setUseLastTrades}
                    />
                  </div>

                  <button
                    className={cn(
                      "w-full mt-4 bg-zella-surface hover:bg-zella-surface/80 rounded-md py-2 px-4 font-medium transition-colors",
                      "text-primary border border-zella-cyan-glow/30 hover:border-zella-cyan-glow/50 shadow-sm"
                    )}
                  >
                    Run Simulation
                  </button>
                </div>

                {/* Metric Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <MetricBox
                    title="Median Outcome"
                    value={`$${mockResults.medianEquity.toLocaleString()}`}
                    tooltip="The median expected account value after simulation"
                  />
                  <MetricBox
                    title="Max Drawdown"
                    value={`${mockResults.maxDrawdown}%`}
                    tooltip="The largest expected drawdown in your account during simulation"
                    isNegative
                  />
                  <MetricBox
                    title="Double Prob."
                    value={`${mockResults.doublingProbability}%`}
                    tooltip="Probability of doubling your starting capital"
                  />
                </div>
              </div>

              {/* Right Column - Chart */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-medium text-foreground">Probability Cone</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="scale-toggle" className="text-xs text-muted-foreground">
                        {scale === "linear" ? "Linear" : "Log"}
                      </Label>
                      <Switch
                        id="scale-toggle"
                        checked={scale === "log"}
                        onCheckedChange={(checked) => setScale(checked ? "log" : "linear")}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full h-[300px] bg-zella-surface/30 rounded-lg border border-border/30 p-4">
                  <MonteCarloChart scale={scale} />
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 justify-center">
                  <LegendItem color="#00FF99" label="Median Path" />
                  <LegendItem color="rgba(111, 0, 255, 0.4)" label="Confidence Zone" />
                  <LegendItem color="#FF4D6D" label="Drawdown Risk" />
                </div>
              </div>
            </div>
            
            {/* Optional Enhancement */}
            <div className="mt-8 border-t border-border/30 pt-4">
              <div className="flex items-center space-x-2">
                <h3 className="text-md font-medium text-foreground">Multiple Strategies</h3>
                <span className="text-xs bg-zella-surface px-2 py-0.5 rounded text-zella-cyan-glow">
                  Coming Soon
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Compare Monte Carlo simulations across different trading strategies to optimize your approach.
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

// Helper Components
const MetricBox = ({
  title,
  value,
  tooltip,
  isNegative = false,
}: {
  title: string;
  value: string;
  tooltip: string;
  isNegative?: boolean;
}) => (
  <div className="bg-zella-surface/30 rounded-lg p-3 border border-border/30">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs text-muted-foreground">{title}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info size={12} className="text-muted-foreground cursor-help" />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs text-xs">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </div>
    <div
      className={cn(
        "font-mono text-lg font-medium",
        isNegative ? "text-zella-negative-signal" : "text-zella-positive-signal"
      )}
    >
      {value}
    </div>
  </div>
);

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center space-x-2">
    <div
      className="w-3 h-3 rounded-full"
      style={{ backgroundColor: color }}
    />
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);
