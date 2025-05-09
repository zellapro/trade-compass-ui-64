
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, MessageSquare, Download, Filter, Search } from "lucide-react";

interface SharedStrategy {
  id: number;
  name: string;
  type: string;
  author: string;
  timeframe: string;
  winRate: number;
  avgRR: number;
  ratings: number;
  downloads: number;
  comments: number;
  description: string;
  tags: string[];
}

const sharedStrategies: SharedStrategy[] = [
  {
    id: 1,
    name: "Smart Money ICT Setup",
    type: "orderblock",
    author: "ProTrader",
    timeframe: "m5",
    winRate: 72,
    avgRR: 3.1,
    ratings: 84,
    downloads: 219,
    comments: 15,
    description: "Pure ICT concepts setup with order block entry and breaker block exit",
    tags: ["ICT", "Order Block", "High Win Rate"]
  },
  {
    id: 2,
    name: "FVG Reversal Strategy",
    type: "fairdvalue",
    author: "TrendMaster",
    timeframe: "h1",
    winRate: 54,
    avgRR: 5.2,
    ratings: 56,
    downloads: 138,
    comments: 8,
    description: "Fair Value Gap reversal strategy with multi-timeframe confirmation",
    tags: ["FVG", "Reversal", "High RR"]
  },
  {
    id: 3,
    name: "Volume Profile Breakout",
    type: "breakout",
    author: "VolumeTrader",
    timeframe: "m15",
    winRate: 65,
    avgRR: 2.4,
    ratings: 42,
    downloads: 97,
    comments: 6,
    description: "High probability breakout trades based on Volume Profile analysis",
    tags: ["Volume", "Breakout", "Momentum"]
  },
  {
    id: 4,
    name: "Wyckoff Distribution Range Play",
    type: "trend",
    author: "ClassicalTrader",
    timeframe: "h4",
    winRate: 58,
    avgRR: 3.8,
    ratings: 61,
    downloads: 183,
    comments: 12,
    description: "Classic Wyckoff distribution range play with spring and upthrust entries",
    tags: ["Wyckoff", "Range", "Technical"]
  },
];

export const SharedPlaybooks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("community");
  
  const filteredStrategies = sharedStrategies.filter(strategy => {
    const matchesSearch = searchQuery === "" || 
      strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      strategy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      strategy.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });
  
  // Get star rating display (full stars based on percentage of ratings)
  const getStarRating = (ratings: number) => {
    const percentage = (ratings / 100) * 5;
    return `${percentage.toFixed(1)}/5`;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search shared strategies..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <Button size="sm">
            Share My Strategy
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="community" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="my-shared">My Shared</TabsTrigger>
          <TabsTrigger value="coach">Coach Review</TabsTrigger>
        </TabsList>
        
        <TabsContent value="community" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStrategies.map((strategy) => (
              <Card key={strategy.id} className="h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        {strategy.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        by {strategy.author} • {strategy.timeframe}
                      </CardDescription>
                    </div>
                    <Badge>
                      {strategy.type === "orderblock" && "Order Block"}
                      {strategy.type === "fairdvalue" && "FVG"}
                      {strategy.type === "breakout" && "Breakout"}
                      {strategy.type === "trend" && "Trend"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="py-2 flex-1">
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
                  
                  <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {strategy.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="py-2">
                  <div className="flex w-full justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400" />
                        <span className="text-xs">{getStarRating(strategy.ratings)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs">{strategy.downloads}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs">{strategy.comments}</span>
                      </div>
                    </div>
                    <Button size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Import
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredStrategies.length === 0 && (
            <div className="text-center p-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No shared strategies found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="my-shared" className="pt-4">
          <div className="text-center p-8">
            <div className="mx-auto rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Shared Strategies</h3>
            <p className="text-muted-foreground mb-4">
              You haven't shared any of your strategies with the community yet
            </p>
            <Button>
              Share a Strategy
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="coach" className="pt-4">
          <div className="text-center p-8">
            <div className="mx-auto rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Coach Review</h3>
            <p className="text-muted-foreground mb-4">
              Submit your strategies for professional review and get expert feedback
            </p>
            <Button>
              Submit for Review
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
