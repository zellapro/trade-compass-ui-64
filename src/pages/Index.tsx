
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentTrades } from "@/components/dashboard/RecentTrades";
import { BarChart2, LineChart, TrendingUp, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back, John</h1>
        <p className="text-muted-foreground">Here's a summary of your trading activities</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's P&L"
          value="+$725.38"
          description="8 trades"
          trend="up"
          icon={<TrendingUp size={18} />}
        />
        <StatCard
          title="This Week"
          value="+$2,847.52"
          description="32 trades"
          trend="up"
          icon={<BarChart2 size={18} />}
        />
        <StatCard
          title="Win Rate"
          value="67.8%"
          description="This month"
          icon={<LineChart size={18} />}
        />
        <StatCard
          title="Open Positions"
          value="4"
          description="Total value: $12,450"
          icon={<BookOpen size={18} />}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="h-[300px] flex items-center justify-center rounded-md bg-accent">
              <p className="text-accent-foreground text-sm">Daily P&L Chart</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">Quick Actions</h3>
            <div className="grid gap-3">
              <Link to="/journal">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Add New Trade
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button className="w-full justify-start" variant="outline">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View Dashboard
                </Button>
              </Link>
              <Link to="/performance">
                <Button className="w-full justify-start" variant="outline">
                  <LineChart className="mr-2 h-4 w-4" />
                  Performance Analysis
                </Button>
              </Link>
              <Link to="/replay">
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Market Replay
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <RecentTrades />
    </div>
  );
}
