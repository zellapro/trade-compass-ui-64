
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function Journal() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trade Journal</h1>
          <p className="text-muted-foreground">Log and review your trade history.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Calendar size={16} />
          <span>Add New Trade</span>
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="all">All Trades</TabsTrigger>
          <TabsTrigger value="wins">Wins</TabsTrigger>
          <TabsTrigger value="losses">Losses</TabsTrigger>
          <TabsTrigger value="setups">Setups</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Trades</CardTitle>
              <CardDescription>
                A complete list of all your recorded trades.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-accent/50">
                <p className="text-muted-foreground">Trade journal entries will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="wins" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Winning Trades</CardTitle>
              <CardDescription>
                All of your winning trades for analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-accent/50">
                <p className="text-muted-foreground">Winning trades will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="losses" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Losing Trades</CardTitle>
              <CardDescription>
                Review your losing trades to improve your strategy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-accent/50">
                <p className="text-muted-foreground">Losing trades will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="setups" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Trade Setups</CardTitle>
              <CardDescription>
                Analyze performance by trade setup type.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-accent/50">
                <p className="text-muted-foreground">Trade setups analysis will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
