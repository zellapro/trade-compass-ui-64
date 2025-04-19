
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Generate detailed reports on your trading activity.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 size={16} />
            <span>Share</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md bg-accent/50">
                  <p className="text-muted-foreground">Monthly performance chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-md border p-3">
                      <p className="text-sm text-muted-foreground">Total Trades</p>
                      <p className="text-xl font-bold">47</p>
                    </div>
                    <div className="rounded-md border p-3">
                      <p className="text-sm text-muted-foreground">Win Rate</p>
                      <p className="text-xl font-bold text-trading-green">68.5%</p>
                    </div>
                    <div className="rounded-md border p-3">
                      <p className="text-sm text-muted-foreground">Net P&L</p>
                      <p className="text-xl font-bold text-trading-green">$2,847.52</p>
                    </div>
                    <div className="rounded-md border p-3">
                      <p className="text-sm text-muted-foreground">Profit Factor</p>
                      <p className="text-xl font-bold">2.73</p>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-3">
                    <p className="text-sm text-muted-foreground">Best Trading Day</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="font-medium">April 15, 2024</p>
                      <p className="text-trading-green font-semibold">+$625.38</p>
                    </div>
                  </div>
                  
                  <div className="rounded-md border p-3">
                    <p className="text-sm text-muted-foreground">Worst Trading Day</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="font-medium">April 8, 2024</p>
                      <p className="text-trading-red font-semibold">-$247.65</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="quarterly" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Quarterly Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-accent/50">
                <p className="text-muted-foreground">Quarterly report data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="yearly" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Yearly Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-accent/50">
                <p className="text-muted-foreground">Yearly report data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Date Range Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-accent/50">
                <p className="text-muted-foreground">Custom date range reports will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
