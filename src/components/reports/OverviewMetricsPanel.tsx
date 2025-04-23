
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Clock,
  TrendingUp,
  BarChart,
  ChevronDown,
  DollarSign,
  Percent,
  Star,
  Bug,
  Zap
} from "lucide-react";

interface OverviewMetricsPanelProps {
  timeframe?: string;
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  subtitle?: string;
}

const MetricCard = ({ title, value, icon, change, changeType, subtitle }: MetricCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              {icon}
            </div>
            <h3 className="text-sm font-medium">{title}</h3>
          </div>
          {change && (
            <Badge 
              variant="outline" 
              className={`
                ${changeType === "positive" ? "text-emerald-400 bg-emerald-950/30" : ""}
                ${changeType === "negative" ? "text-red-400 bg-red-950/30" : ""}
                ${changeType === "neutral" ? "text-blue-400 bg-blue-950/30" : ""}
              `}
            >
              {change}
            </Badge>
          )}
        </div>
        <div className="flex items-baseline mt-3">
          <span className="text-2xl font-bold">{value}</span>
          {subtitle && <span className="ml-2 text-xs text-muted-foreground">{subtitle}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export function OverviewMetricsPanel({ timeframe = "30d" }: OverviewMetricsPanelProps) {
  const [expanded, setExpanded] = useState(false);
  
  // First row metrics - always visible
  const primaryMetrics = [
    {
      title: "Total Trades",
      value: "127",
      icon: <Activity size={18} />,
      change: "+12%",
      changeType: "positive" as const,
      subtitle: "vs. previous period"
    },
    {
      title: "Win Rate",
      value: "68%",
      icon: <Percent size={18} />,
      change: "+5%",
      changeType: "positive" as const,
      subtitle: "24% higher than avg"
    },
    {
      title: "Avg R:R",
      value: "2.3",
      icon: <BarChart size={18} />,
      change: "+0.4",
      changeType: "positive" as const,
      subtitle: "ratio"
    },
    {
      title: "Net P&L",
      value: "$12,845",
      icon: <DollarSign size={18} />,
      change: "+28%",
      changeType: "positive" as const,
      subtitle: "after fees"
    }
  ];
  
  // Second row metrics - visible when expanded
  const secondaryMetrics = [
    {
      title: "Avg Hold Time",
      value: "1h 15m",
      icon: <Clock size={18} />,
      change: "-18m",
      changeType: "positive" as const,
      subtitle: "per trade"
    },
    {
      title: "Max Drawdown",
      value: "$2,230",
      icon: <TrendingUp size={18} />,
      change: "5.2%",
      changeType: "negative" as const,
      subtitle: "of capital"
    },
    {
      title: "Best Strategy",
      value: "OB Reclaim",
      icon: <Star size={18} />,
      change: "78% win",
      changeType: "positive" as const,
      subtitle: "by win rate"
    },
    {
      title: "Common Mistake",
      value: "Early Entries",
      icon: <Bug size={18} />,
      change: "12 times",
      changeType: "negative" as const,
      subtitle: "this period"
    }
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {primaryMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
      
      {expanded && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 animate-fade-in">
          {secondaryMetrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      )}
      
      <button 
        onClick={() => setExpanded(!expanded)} 
        className="mx-auto flex items-center justify-center p-1 mt-2 text-xs text-muted-foreground hover:text-foreground"
      >
        <span>{expanded ? "Show Less" : "Show More Metrics"}</span>
        <ChevronDown size={14} className={`ml-1 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
    </>
  );
}
