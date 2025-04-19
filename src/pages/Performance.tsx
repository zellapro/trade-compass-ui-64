
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Performance() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Performance</h1>
          <p className="text-muted-foreground">Analyze your trading metrics and performance.</p>
        </div>
        <Select defaultValue="30d">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="equity">Equity Curve</TabsTrigger>
          <TabsTrigger value="symbols">Symbols</TabsTrigger>
          <TabsTrigger value="timing">Timing</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md bg-accent/50">
                  <p className="text-muted-foreground">Performance chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profit Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md bg-accent/50">
                  <p className="text-muted-foreground">Profit distribution chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="equity" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Equity Curve</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center border rounded-md bg-accent/50">
                <p className="text-muted-foreground">Equity curve will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="symbols" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Symbol</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center border rounded-md bg-accent/50">
                <p className="text-muted-foreground">Symbol performance will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timing" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Trading Timing Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center border rounded-md bg-accent/50">
                <p className="text-muted-foreground">Time-based performance will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center border rounded-md bg-accent/50">
                <p className="text-muted-foreground">Advanced trading metrics will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
