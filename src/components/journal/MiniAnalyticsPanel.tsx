
import { BarChart2, Star, Tag } from "lucide-react";

export function MiniAnalyticsPanel() {
  // Demo only, in real app fetch these
  const stats = [
    { label: "Trades this week", value: 17, icon: <BarChart2 size={18} />, color: "bg-blue-100 text-blue-900" },
    { label: "Win Rate", value: "76%", icon: <Star size={18} />, color: "bg-green-100 text-green-900" },
    { label: "Top Setup", value: "VWAP Fade", icon: <Tag size={18} />, color: "bg-amber-100 text-amber-900" },
    { label: "Most Mistakes", value: "Breakout", icon: <Tag size={18} />, color: "bg-red-100 text-red-900" },
    { label: "Top Ticker", value: "TSLA", icon: <Tag size={18} />, color: "bg-purple-100 text-purple-900" },
  ];
  return (
    <div className="flex flex-wrap gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ring-1 ring-muted/20 ${stat.color}`}
        >
          {stat.icon}
          {stat.label}: <span className="ml-1">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
