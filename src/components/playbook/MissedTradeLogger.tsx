
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Upload, BarChart2, AlertTriangle, CircleCheck, Clock, BellOff, Ban } from "lucide-react";

interface MissedTrade {
  id: number;
  date: string;
  ticker: string;
  setupType: string;
  category: string;
  reason: string;
  emotionalState: string;
  notes: string;
}

const missedTrades: MissedTrade[] = [
  {
    id: 1,
    date: "2025-05-06",
    ticker: "AAPL",
    setupType: "OB Reversal",
    category: "Spotted but not Taken",
    reason: "Hesitancy after previous loss",
    emotionalState: "Fearful",
    notes: "Perfect setup on the 5min chart, all conditions met but hesitated after previous loss."
  },
  {
    id: 2,
    date: "2025-05-04",
    ticker: "MSFT",
    setupType: "Breakout",
    category: "Spotted Late",
    reason: "Distracted with other tasks",
    emotionalState: "Distracted",
    notes: "Was looking at too many charts, noticed the setup after it had already moved 50% to target."
  },
  {
    id: 3,
    date: "2025-05-01",
    ticker: "AMZN",
    setupType: "FVG Fill",
    category: "Execution Error",
    reason: "Incorrect order entry",
    emotionalState: "Rushed",
    notes: "Set limit order too tight, missed fill by 2 ticks before perfect move."
  },
];

const categories = [
  { value: "spotted-not-taken", label: "Spotted but not Taken", icon: AlertTriangle },
  { value: "spotted-late", label: "Spotted Late", icon: Clock },
  { value: "distracted", label: "Distraction", icon: BellOff },
  { value: "execution-error", label: "Execution Error", icon: Ban },
  { value: "fear", label: "Fear/Hesitation", icon: AlertTriangle },
];

const emotionalStates = [
  { value: "fearful", label: "Fearful" },
  { value: "distracted", label: "Distracted" },
  { value: "rushed", label: "Rushed" },
  { value: "overconfident", label: "Overconfident" },
  { value: "frustrated", label: "Frustrated" },
  { value: "calm", label: "Calm" },
];

export const MissedTradeLogger: React.FC = () => {
  const [activeTab, setActiveTab] = useState("log");
  const [formData, setFormData] = useState({
    ticker: "",
    date: new Date().toISOString().split("T")[0],
    setupType: "",
    category: "",
    reason: "",
    emotionalState: "",
    notes: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  return (
    <Tabs defaultValue="log" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="log">Log New Missed Trade</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
        <TabsTrigger value="patterns">AI Patterns</TabsTrigger>
      </TabsList>
      
      <TabsContent value="log" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>Log a Missed Trade</CardTitle>
            <CardDescription>Record trades you missed to identify patterns and improve execution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ticker">Ticker/Symbol</Label>
                <Input 
                  id="ticker" 
                  name="ticker" 
                  placeholder="e.g., TSLA" 
                  value={formData.ticker} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  name="date" 
                  type="date" 
                  value={formData.date} 
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="setupType">Setup Type</Label>
                <Select 
                  value={formData.setupType} 
                  onValueChange={(value) => handleSelectChange("setupType", value)}
                >
                  <SelectTrigger id="setupType">
                    <SelectValue placeholder="Select setup type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ob-reversal">OB Reversal</SelectItem>
                    <SelectItem value="fvg-fill">FVG Fill</SelectItem>
                    <SelectItem value="breakout">Breakout</SelectItem>
                    <SelectItem value="trend-continuation">Trend Continuation</SelectItem>
                    <SelectItem value="bos-retest">BOS Retest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Missed Trade Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center">
                          <category.icon className="mr-2 h-4 w-4" />
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">Specific Reason</Label>
              <Input 
                id="reason" 
                name="reason" 
                placeholder="Briefly describe why you missed this trade" 
                value={formData.reason} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Emotional State</Label>
              <RadioGroup 
                className="grid grid-cols-3 gap-2"
                value={formData.emotionalState}
                onValueChange={(value) => handleSelectChange("emotionalState", value)}
              >
                {emotionalStates.map((state) => (
                  <div key={state.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={state.value} id={state.value} />
                    <Label htmlFor={state.value} className="text-sm font-normal">
                      {state.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Detailed Notes</Label>
              <Textarea 
                id="notes" 
                name="notes" 
                placeholder="Add detailed notes about the missed setup and what you could improve next time" 
                rows={4} 
                value={formData.notes} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Attach Chart Screenshot</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 10MB
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button className="ml-auto">Save Missed Trade</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="history" className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {missedTrades.map((trade) => (
            <Card key={trade.id} className="h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      {trade.ticker}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {trade.date} • {trade.setupType}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{trade.category}</Badge>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Reason:</span>
                    <span className="text-sm font-medium">{trade.reason}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Emotional State:</span>
                    <Badge variant="secondary">{trade.emotionalState}</Badge>
                  </div>
                  <Separator className="my-2" />
                  <div>
                    <h4 className="text-sm font-medium mb-1">Notes</h4>
                    <p className="text-sm text-muted-foreground">{trade.notes}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {missedTrades.length === 0 && (
          <div className="text-center p-8">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No missed trades logged yet</h3>
            <p className="text-muted-foreground mb-4">
              Start logging missed trades to identify patterns and improve your execution
            </p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="patterns" className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle>AI-Detected Patterns</CardTitle>
            <CardDescription>
              Automated analysis of your missed trade patterns and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Recurring Hesitation Pattern</h4>
                  <p className="text-sm text-muted-foreground">
                    You've missed 4 OB Reversal setups in the last 2 weeks, all after experiencing a loss. 
                    Consider implementing a "reset routine" after losses to prevent emotional decision-making.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Time-Based Pattern</h4>
                  <p className="text-sm text-muted-foreground">
                    67% of your missed trades occur between 2:00-3:30 PM. 
                    This suggests potential fatigue or decreased focus during this time period.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-start gap-4">
                <CircleCheck className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Improvement Detected</h4>
                  <p className="text-sm text-muted-foreground">
                    Your "Spotted but not Taken" missed trades have decreased by 40% this month compared to last month. 
                    Keep focusing on conviction in your strategy rules.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
