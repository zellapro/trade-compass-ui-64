
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend = "neutral",
  className 
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p 
            className={cn(
              "mt-1 text-xs", 
              trend === "up" && "text-trading-green", 
              trend === "down" && "text-trading-red",
              trend === "neutral" && "text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
