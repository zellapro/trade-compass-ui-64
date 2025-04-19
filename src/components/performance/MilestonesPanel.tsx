
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign, Calendar, Star, ChartBar, Filter, ChartLine } from "lucide-react";

export function MilestonesPanel() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Trading Milestones</CardTitle>
        <CardDescription>Your trading achievements and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-green-50 border border-green-100 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 rounded-full p-1.5">
                <ChartLine className="h-4 w-4 text-green-600" />
              </div>
              <div className="font-medium text-sm">10R Week Achieved</div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Apr 15-19, 2025</div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 rounded-full p-1.5">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div className="font-medium text-sm">3 Green Weeks Streak</div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Mar 29 - Apr 19, 2025</div>
          </div>
          
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 rounded-full p-1.5">
                <Filter className="h-4 w-4 text-purple-600" />
              </div>
              <div className="font-medium text-sm">5 Risk-Managed Trades</div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">All under 2% risk, all profitable</div>
          </div>
          
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="bg-amber-100 rounded-full p-1.5">
                <Star className="h-4 w-4 text-amber-600" />
              </div>
              <div className="font-medium text-sm">3R Single Trade</div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">TSLA Bull Flag on Apr 16, 2025</div>
          </div>
          
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-100 rounded-full p-1.5">
                <ChartBar className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="font-medium text-sm">75% Win Rate Week</div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">12 wins out of 16 trades</div>
          </div>
          
          <div className="bg-teal-50 border border-teal-100 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="bg-teal-100 rounded-full p-1.5">
                <CircleDollarSign className="h-4 w-4 text-teal-600" />
              </div>
              <div className="font-medium text-sm">$1,000 Day</div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">First $1k+ day achieved</div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg border">
          <div className="text-sm font-medium mb-1">Upcoming Milestones:</div>
          <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
            <li>$5,000 Month (Currently: $4,238)</li>
            <li>20-Trade Winning Streak (Current best: 8)</li>
            <li>100 Trades Journaled (Currently: 83)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
