
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Check, X, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample goal data
const goals = [
  {
    id: 1,
    title: "Take only 3 trades per day",
    current: 2,
    target: 3,
    type: "limit", // limit means stay under
    completed: false,
  },
  {
    id: 2,
    title: "No trades after 12PM",
    current: 0,
    target: 0,
    type: "boolean", // boolean means yes/no
    completed: true,
  },
  {
    id: 3,
    title: "Win rate above 65%",
    current: 68,
    target: 65,
    type: "minimum", // minimum means stay above
    unit: "%",
    completed: true,
  },
  {
    id: 4,
    title: "Journal every trade",
    current: 6,
    target: 8,
    type: "completion", // completion means complete all
    completed: false,
  }
];

export function GoalTracker() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Goal Tracker</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            <span>3/4 Complete</span>
          </Badge>
        </div>
        <CardDescription>Track your daily trading objectives</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {goal.completed ? (
                    <Check className="h-4 w-4 mr-2 text-trading-green" />
                  ) : (
                    <span className="h-4 w-4 mr-2 flex items-center justify-center">
                      {goal.type === "limit" && goal.current <= goal.target && (
                        <Bell className="h-4 w-4 text-trading-blue" />
                      )}
                      {goal.type !== "limit" && (
                        <X className="h-4 w-4 text-trading-red" />
                      )}
                    </span>
                  )}
                  <span className="text-sm font-medium">{goal.title}</span>
                </div>
                <Badge 
                  variant="outline"
                  className={cn(
                    "text-xs",
                    goal.completed && "bg-trading-green-light text-trading-green-dark"
                  )}
                >
                  {goal.type === "boolean" ? 
                    (goal.completed ? "Achieved" : "Not Yet") : 
                    `${goal.current}${goal.unit || ""} / ${goal.target}${goal.unit || ""}`
                  }
                </Badge>
              </div>
              
              {goal.type !== "boolean" && (
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full",
                      goal.completed ? "bg-trading-green" : "bg-trading-blue",
                      goal.type === "limit" && 
                        (goal.current > goal.target ? "bg-trading-red" : "")
                    )}
                    style={{
                      width: goal.type === "minimum" || goal.type === "completion" ? 
                        `${Math.min(100, (goal.current / goal.target) * 100)}%` : 
                        `${Math.min(100, (goal.current / goal.target) * 100)}%`
                    }}
                  />
                </div>
              )}
              
              {goal.id === 1 && !goal.completed && goal.current === goal.target - 1 && (
                <div className="text-xs text-trading-blue italic mt-1 flex items-center">
                  <Bell className="h-3 w-3 mr-1" />
                  <span>You've hit your risk limit today. One trade remaining.</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
