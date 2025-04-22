
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, BookOpen, Tag } from "lucide-react";
import { strategyCategories, setupGrades, contextTags } from "@/data/strategyData";

interface ViewStrategiesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewStrategiesModal({ open, onOpenChange }: ViewStrategiesModalProps) {
  const [activeTab, setActiveTab] = useState("categories");
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Strategy Library
          </DialogTitle>
          <DialogDescription>
            Browse all available trading strategies and setups
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categories">Strategy Categories</TabsTrigger>
            <TabsTrigger value="setups">Popular Setups</TabsTrigger>
            <TabsTrigger value="stats">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories" className="flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-240px)]">
              <div className="space-y-4 p-1">
                {strategyCategories.map((category) => (
                  <Card key={category.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {category.description || `${category.setups.length} setups available`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {category.setups.map((setup) => (
                          <Badge 
                            key={setup.id} 
                            variant="secondary"
                            className="text-xs font-normal"
                          >
                            {setup.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="setups" className="flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-240px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
                {strategyCategories.slice(0, 4).flatMap((category) => 
                  category.setups.slice(0, 3).map((setup) => (
                    <Card key={setup.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          {setup.name}
                          <Badge variant="outline" className="text-xs font-normal">
                            {category.name}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs">
                        <p>{setup.description || "A strategy setup based on market structure and price action."}</p>
                        
                        {/* Mock performance data */}
                        <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                          <span>Win Rate: 68%</span>
                          <span>•</span>
                          <span>Avg RR: 1.8</span>
                          <span>•</span>
                          <span>Usage: 23 trades</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="stats" className="flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-240px)]">
              <div className="space-y-4 p-1">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Top Performing Strategies</CardTitle>
                    <CardDescription>Based on win rate and R-multiple</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span>SMC Order Blocks</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                            A+ Grade
                          </Badge>
                        </div>
                        <div className="text-muted-foreground text-xs">
                          76% Win Rate | 2.3R Avg
                        </div>
                      </li>
                      <li className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span>Bull Flag Breakout</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                            A Grade
                          </Badge>
                        </div>
                        <div className="text-muted-foreground text-xs">
                          72% Win Rate | 2.1R Avg
                        </div>
                      </li>
                      <li className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span>VWAP Rejection</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                            B+ Grade
                          </Badge>
                        </div>
                        <div className="text-muted-foreground text-xs">
                          68% Win Rate | 1.9R Avg
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Strategy Utilization</CardTitle>
                    <CardDescription>Most commonly used strategies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between text-sm">
                        <span>Opening Range Breakout</span>
                        <Badge>48 trades</Badge>
                      </li>
                      <li className="flex items-center justify-between text-sm">
                        <span>SMC / ICT</span>
                        <Badge>42 trades</Badge>
                      </li>
                      <li className="flex items-center justify-between text-sm">
                        <span>Price Action</span>
                        <Badge>38 trades</Badge>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
