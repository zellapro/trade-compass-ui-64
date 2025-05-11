
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Telescope, Search, Upload, Clock, Filter, AlertCircle, Calendar, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function MissedTradeLogger() {
  const [showAddForm, setShowAddForm] = useState(false);
  
  const missedTrades = [
    {
      id: 1,
      date: "May 11, 2025",
      time: "10:35 AM",
      symbol: "EURUSD",
      setup: "OB + BOS",
      reason: "Fear / Hesitation",
      outcome: "Would Have Won",
      notes: "Clear setup with all conditions met, but hesitated after yesterday's loss",
      replayFlag: true
    },
    {
      id: 2,
      date: "May 10, 2025",
      time: "2:15 PM",
      symbol: "USDJPY",
      setup: "FVG Pullback",
      reason: "Not at screen",
      outcome: "Would Have Won",
      notes: "Stepped away during lunch, missed the perfect entry",
      replayFlag: false
    },
    {
      id: 3,
      date: "May 09, 2025",
      time: "9:45 AM",
      symbol: "BTCUSD",
      setup: "London Break",
      reason: "Distraction",
      outcome: "Would Have Lost",
      notes: "Was checking email during setup, but analysis shows it would have hit stop loss",
      replayFlag: false
    }
  ];
  
  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-fuchsia-900/30 to-purple-900/30">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Telescope className="mr-2 h-5 w-5 text-fuchsia-400" />
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Missed Play Opportunities – Log to Learn
            </span>
          </CardTitle>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Missed Trade
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {showAddForm && (
          <div className="mb-6 bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Plus className="h-5 w-5 mr-2 text-fuchsia-400" />
              Log Missed Opportunity
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1.5 text-muted-foreground">Date</label>
                    <Input 
                      type="date" 
                      className="bg-white/5 border-white/10 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30"
                      defaultValue="2025-05-11"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5 text-muted-foreground">Time</label>
                    <Input 
                      type="time" 
                      className="bg-white/5 border-white/10 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30"
                      defaultValue="10:00"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm mb-1.5 text-muted-foreground">Symbol</label>
                  <Input 
                    type="text" 
                    placeholder="EURUSD, BTCUSD, etc." 
                    className="bg-white/5 border-white/10 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30"
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-1.5 text-muted-foreground">Setup Name</label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 focus:ring-1 focus:ring-fuchsia-500/30 focus:border-fuchsia-500/50">
                      <SelectValue placeholder="Select a setup" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ob-bos">OB + BOS</SelectItem>
                      <SelectItem value="fvg-pullback">FVG Pullback</SelectItem>
                      <SelectItem value="london-break">London Break</SelectItem>
                      <SelectItem value="ny-open">NY Open Volume</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm mb-2 text-muted-foreground">Reason Missed</label>
                  <div className="space-y-2">
                    {["Fear / Hesitation", "Not at screen", "Distraction", "Uncertainty", "Technical Issues"].map((reason, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Checkbox id={`reason-${i}`} className="data-[state=checked]:bg-fuchsia-600 data-[state=checked]:border-fuchsia-600" />
                        <label htmlFor={`reason-${i}`} className="text-sm">{reason}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1.5 text-muted-foreground">Screenshot (Optional)</label>
                  <div className="border-2 border-dashed border-white/10 rounded-lg p-4 text-center hover:border-fuchsia-500/30 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm mb-1.5 text-muted-foreground">Lesson Learned</label>
                  <textarea 
                    className="w-full h-[120px] rounded-md bg-white/5 border border-white/10 p-2 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30"
                    placeholder="What did you learn from missing this trade?"
                  />
                </div>
                
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="replay-flag" className="data-[state=checked]:bg-fuchsia-600 data-[state=checked]:border-fuchsia-600" />
                  <label htmlFor="replay-flag" className="text-sm">Flag for replay practice</label>
                </div>
                
                <div className="flex justify-end pt-2">
                  <Button 
                    variant="outline" 
                    className="mr-2 border-white/10 text-muted-foreground hover:text-white hover:bg-white/5"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500">
                    Save Missed Trade
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex items-center w-full md:w-auto mb-3 md:mb-0">
            <Search className="h-4 w-4 mr-2 text-muted-foreground" />
            <Input 
              placeholder="Search missed trades..." 
              className="bg-white/5 border-white/10 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 w-full md:w-[240px]"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Select>
              <SelectTrigger className="bg-white/5 border-white/10 w-full md:w-[140px] h-9 text-xs">
                <Filter className="h-3.5 w-3.5 mr-1" />
                <span>All Reasons</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reasons</SelectItem>
                <SelectItem value="fear">Fear / Hesitation</SelectItem>
                <SelectItem value="away">Not at screen</SelectItem>
                <SelectItem value="distraction">Distraction</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="bg-white/5 border-white/10 w-full md:w-[140px] h-9 text-xs">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>This Week</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="text-left text-xs font-medium text-muted-foreground pb-2">Date/Time</th>
                <th className="text-left text-xs font-medium text-muted-foreground pb-2">Symbol</th>
                <th className="text-left text-xs font-medium text-muted-foreground pb-2">Setup</th>
                <th className="text-left text-xs font-medium text-muted-foreground pb-2">Reason</th>
                <th className="text-left text-xs font-medium text-muted-foreground pb-2">Outcome</th>
                <th className="text-left text-xs font-medium text-muted-foreground pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {missedTrades.map((trade) => (
                <tr key={trade.id} className="group">
                  <td className="bg-white/5 border-t border-b border-l border-white/10 rounded-l-lg p-3 group-hover:bg-white/10 transition-colors">
                    <div className="text-sm">{trade.date}</div>
                    <div className="text-xs text-muted-foreground">{trade.time}</div>
                  </td>
                  <td className="bg-white/5 border-t border-b border-white/10 p-3 group-hover:bg-white/10 transition-colors">
                    <span className="font-medium text-sm">{trade.symbol}</span>
                  </td>
                  <td className="bg-white/5 border-t border-b border-white/10 p-3 group-hover:bg-white/10 transition-colors">
                    <Badge variant="outline" className="font-normal border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300 text-xs">
                      {trade.setup}
                    </Badge>
                  </td>
                  <td className="bg-white/5 border-t border-b border-white/10 p-3 group-hover:bg-white/10 transition-colors">
                    <span className="text-sm">{trade.reason}</span>
                  </td>
                  <td className="bg-white/5 border-t border-b border-white/10 p-3 group-hover:bg-white/10 transition-colors">
                    <Badge
                      className={cn(
                        "font-normal text-xs",
                        trade.outcome.includes("Won") 
                          ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                          : "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                      )}
                    >
                      {trade.outcome}
                    </Badge>
                  </td>
                  <td className="bg-white/5 border-t border-b border-r border-white/10 rounded-r-lg p-3 group-hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-2">
                      {trade.replayFlag && (
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-fuchsia-500/20 hover:text-fuchsia-300">
                          <Clock className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-fuchsia-500/20 hover:text-fuchsia-300">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-fuchsia-950/30 border border-fuchsia-500/20 rounded-lg p-3">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm mb-1">AI Insight</h4>
              <p className="text-sm text-muted-foreground">
                You've missed 7 trades after experiencing losses, suggesting heightened risk aversion. 
                Consider implementing a "reset routine" after losses to maintain emotional balance.
                67% of your missed trades occur between 2:00-3:30 PM - consider scheduling breaks during this time period.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
