
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, BarChart2, Star, Paperclip, Circle, CircleCheck, CircleX, Replay } from "lucide-react";

// Mock data for development
const strategies = [
  {
    id: 1,
    name: "OB Sweep",
    abbreviation: "OBS",
    type: "orderblock",
    timeframe: "m5",
    winRate: 68,
    avgRR: 2.8,
    edgeScore: 89,
    description: "Order block sweep with volume confirmation",
    tags: ["Momentum", "Liquidity", "High Win Rate"],
    setupCount: 47,
    successfulTrades: 32,
    lastUpdated: "2025-04-22",
    version: "1.2",
    checklistItems: [
      { id: 1, text: "HTF trend alignment", completed: true },
      { id: 2, text: "Order block formed with rejection", completed: true },
      { id: 3, text: "Volume spike on sweep", completed: false },
      { id: 4, text: "Lower timeframe confirmation", completed: true }
    ],
  },
  {
    id: 2,
    name: "FVG Pullback",
    abbreviation: "FVG",
    type: "fairdvalue",
    timeframe: "h1",
    winRate: 54,
    avgRR: 4.2,
    edgeScore: 76,
    description: "Fair value gap pullback entry with market structure shift",
    tags: ["Pullback", "Gap Fill", "High RR"],
    setupCount: 29,
    successfulTrades: 16,
    lastUpdated: "2025-05-01",
    version: "2.1",
    checklistItems: [
      { id: 1, text: "Clear FVG present on chart", completed: true },
      { id: 2, text: "Structure break and retest", completed: true },
      { id: 3, text: "Volume confirmation", completed: false },
      { id: 4, text: "Stop below structure", completed: true }
    ],
  },
  {
    id: 3,
    name: "BOS Retest",
    abbreviation: "BOS",
    type: "breakout",
    timeframe: "m15",
    winRate: 71,
    avgRR: 2.1,
    edgeScore: 82,
    description: "Break of structure with retest confirmation",
    tags: ["Breakout", "Trend Continuation", "Quick Setup"],
    setupCount: 52,
    successfulTrades: 37,
    lastUpdated: "2025-04-28",
    version: "1.0",
    checklistItems: [
      { id: 1, text: "Clear market structure break", completed: true },
      { id: 2, text: "Retest of broken structure", completed: true },
      { id: 3, text: "Volume confirmation", completed: true },
      { id: 4, text: "Stop loss below last swing", completed: true }
    ],
  },
];

interface StrategyGridProps {
  searchQuery: string;
  timeframe: string;
  strategyType: string;
}

export const StrategyGrid: React.FC<StrategyGridProps> = ({
  searchQuery,
  timeframe,
  strategyType
}) => {
  const [expandedStrategy, setExpandedStrategy] = useState<number | null>(null);

  // Filter strategies based on search and filter criteria
  const filteredStrategies = strategies.filter(strategy => {
    const matchesSearch = searchQuery === "" || 
      strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      strategy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      strategy.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesTimeframe = timeframe === "all" || strategy.timeframe === timeframe;
    const matchesType = strategyType === "all" || strategy.type === strategyType;
    
    return matchesSearch && matchesTimeframe && matchesType;
  });

  const toggleStrategy = (id: number) => {
    if (expandedStrategy === id) {
      setExpandedStrategy(null);
    } else {
      setExpandedStrategy(id);
    }
  };

  // Edge score color based on value
  const getEdgeScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {filteredStrategies.length === 0 ? (
        <div className="col-span-full p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">No strategies found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : (
        filteredStrategies.map((strategy) => (
          <Collapsible 
            key={strategy.id}
            open={expandedStrategy === strategy.id}
            onOpenChange={() => toggleStrategy(strategy.id)}
            className="rounded-lg border border-border shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      {strategy.name}
                      <Badge variant="outline" className="ml-2 text-xs">v{strategy.version}</Badge>
                    </CardTitle>
                    <CardDescription className="mt-1 flex items-center">
                      <Badge className="mr-2">{strategy.abbreviation}</Badge>
                      {strategy.type === "orderblock" && "Order Block"}
                      {strategy.type === "fairdvalue" && "Fair Value Gap"}
                      {strategy.type === "breakout" && "Breakout"}
                      {strategy.type === "trend" && "Trend"}
                      {strategy.type === "reversal" && "Reversal"}
                      <Badge variant="outline" className="ml-2">{strategy.timeframe}</Badge>
                    </CardDescription>
                  </div>
                  <div className={`text-xl font-bold ${getEdgeScoreColor(strategy.edgeScore)}`}>
                    {strategy.edgeScore}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pb-3">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                    <div className="flex items-center">
                      <span className="font-semibold">{strategy.winRate}%</span>
                      <Progress value={strategy.winRate} className="h-2 ml-2" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg RR</p>
                    <p className="font-semibold">{strategy.avgRR}R</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {strategy.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    {expandedStrategy === strategy.id ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Collapse
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        View Details
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
              </CardContent>

              <CollapsibleContent>
                <Separator />
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2 text-sm">Trade Checklist</h4>
                  <ul className="space-y-1 mb-4">
                    {strategy.checklistItems.map((item) => (
                      <li key={item.id} className="flex items-center text-sm">
                        {item.completed ? (
                          <CircleCheck className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Circle className="h-4 w-4 mr-2 text-muted-foreground" />
                        )}
                        {item.text}
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-medium mb-2 text-sm">Strategy Performance</h4>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Setups</p>
                      <p className="font-semibold">{strategy.setupCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Successful</p>
                      <p className="font-semibold">{strategy.successfulTrades} trades</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
                  <p className="text-sm mb-4">{strategy.lastUpdated}</p>

                  <div className="text-sm">{strategy.description}</div>
                </CardContent>

                <CardFooter className="flex justify-between pt-0">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Paperclip className="h-4 w-4 mr-1" />
                      Trades
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart2 className="h-4 w-4 mr-1" />
                      Analytics
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Replay className="h-4 w-4 mr-1" />
                      Replay
                    </Button>
                    <Button size="sm">
                      <Star className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardFooter>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))
      )}
    </div>
  );
};
