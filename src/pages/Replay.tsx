
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, Play, Download } from "lucide-react";

export default function Replay() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Replay Mode</h1>
        <p className="text-muted-foreground">Replay market conditions to improve your trading skills.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Chart Replay</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Select Date</span>
                  </Button>
                  <Button size="sm" className="flex items-center gap-1">
                    <Play size={14} />
                    <span>Start Replay</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] rounded-md bg-accent flex items-center justify-center overflow-hidden">
                <p className="text-accent-foreground text-sm">Chart replay visualization will go here</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Saved Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search saved sessions" className="pl-8" />
                </div>
                
                <Tabs defaultValue="recent">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="favorites">Favorites</TabsTrigger>
                  </TabsList>
                  <TabsContent value="recent" className="pt-2">
                    <div className="space-y-2">
                      {["AAPL Earnings 04/18", "SPY Market Open 04/17", "TSLA Breakout 04/15", "NVDA Support Test 04/12"].map((session) => (
                        <div key={session} className="flex items-center justify-between rounded-md border p-2">
                          <span className="text-sm font-medium">{session}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="favorites" className="pt-2">
                    <div className="space-y-2">
                      {["AMZN Gap Fill 04/11", "META Resistance 04/05", "QQQ Reversal 03/28"].map((session) => (
                        <div key={session} className="flex items-center justify-between rounded-md border p-2">
                          <span className="text-sm font-medium">{session}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
