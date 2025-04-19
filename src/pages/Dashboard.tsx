
import { 
  BarChart2, 
  TrendingUp, 
  TrendingDown, 
  Percent, 
  DollarSign 
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { TradeChart } from "@/components/dashboard/TradeChart";
import { RecentTrades } from "@/components/dashboard/RecentTrades";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Your trading performance at a glance.</p>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total P&L"
          value="$2,584.35"
          description="+15.3% from last month"
          icon={<DollarSign size={18} />}
          trend="up"
        />
        <StatCard
          title="Win Rate"
          value="67.8%"
          description="58 winning trades"
          icon={<Percent size={18} />}
          trend="up"
        />
        <StatCard
          title="Average Win"
          value="$358.42"
          description="+$42.18 vs last month"
          icon={<TrendingUp size={18} />}
          trend="up"
        />
        <StatCard
          title="Average Loss"
          value="$156.24"
          description="+$12.37 vs last month"
          icon={<TrendingDown size={18} />}
          trend="down"
        />
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <TradeChart title="P&L Performance" subtitle="Last 30 days" />
        <TradeChart title="Win/Loss Ratio" subtitle="By trade setup" />
        <TradeChart title="Trading Volume" subtitle="By market session" />
      </div>
      
      <RecentTrades />
    </div>
  );
}
