
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StrategyGrid } from "@/components/playbook/StrategyGrid";
import { BlueprintBuilder } from "@/components/playbook/BlueprintBuilder";
import { MissedTradeLogger } from "@/components/playbook/MissedTradeLogger";
import { SharedPlaybooks } from "@/components/playbook/SharedPlaybooks";
import { PlaybookAICompanion } from "@/components/playbook/PlaybookAICompanion";
import { FileText, Search, Plus, Calendar, Star, TrendingUp, Filter } from "lucide-react";

const Playbook = () => {
  const [activeTab, setActiveTab] = useState("strategies");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState("all");
  const [strategyType, setStrategyType] = useState("all");
  
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Trading Playbook</h1>
        <p className="text-muted-foreground">
          Develop, refine and track your trading strategies in one place
        </p>
      </div>
      
      <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
        <div className="flex-1">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search strategies..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All TFs</SelectItem>
                    <SelectItem value="m1">1 Min</SelectItem>
                    <SelectItem value="m5">5 Min</SelectItem>
                    <SelectItem value="m15">15 Min</SelectItem>
                    <SelectItem value="h1">1 Hour</SelectItem>
                    <SelectItem value="d1">Daily</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={strategyType} onValueChange={setStrategyType}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Strategy Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="reversal">Reversal</SelectItem>
                    <SelectItem value="trend">Trend</SelectItem>
                    <SelectItem value="breakout">Breakout</SelectItem>
                    <SelectItem value="orderblock">Order Block</SelectItem>
                    <SelectItem value="fairdvalue">Fair Value Gap</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" className="whitespace-nowrap">
                  <Plus className="mr-1 h-4 w-4" /> New Strategy
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="strategies" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="strategies">
                  <FileText className="mr-2 h-4 w-4 hidden sm:inline" />
                  Strategies
                </TabsTrigger>
                <TabsTrigger value="blueprint">
                  <Star className="mr-2 h-4 w-4 hidden sm:inline" />
                  Blueprint
                </TabsTrigger>
                <TabsTrigger value="missed">
                  <Calendar className="mr-2 h-4 w-4 hidden sm:inline" />
                  Missed Trades
                </TabsTrigger>
                <TabsTrigger value="shared">
                  <TrendingUp className="mr-2 h-4 w-4 hidden sm:inline" />
                  Shared
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="strategies">
                <StrategyGrid 
                  searchQuery={searchQuery} 
                  timeframe={timeframe} 
                  strategyType={strategyType}
                />
              </TabsContent>
              
              <TabsContent value="blueprint">
                <BlueprintBuilder />
              </TabsContent>
              
              <TabsContent value="missed">
                <MissedTradeLogger />
              </TabsContent>
              
              <TabsContent value="shared">
                <SharedPlaybooks />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="w-full lg:w-80 xl:w-96">
          <PlaybookAICompanion activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default Playbook;
