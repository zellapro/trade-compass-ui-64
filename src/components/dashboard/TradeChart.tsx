
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TradeChartProps {
  title: string;
  subtitle?: string;
}

export function TradeChart({ title, subtitle }: TradeChartProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Chart placeholder - in a real app, we'd integrate a library like Recharts */}
        <div className="h-[300px] w-full rounded-md bg-accent flex items-center justify-center">
          <p className="text-accent-foreground text-sm">Chart visualization will go here</p>
        </div>
      </CardContent>
    </Card>
  );
}
