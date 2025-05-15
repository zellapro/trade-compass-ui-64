
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function RecentTrades() {
  const navigate = useNavigate();
  
  return (
    <Card className="col-span-3 row-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">Recent Trades</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/settings?tab=broker")}
            className="text-xs flex items-center gap-1"
          >
            <Settings className="h-3 w-3" /> Connect Broker
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/journal")}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            <p>No recent trades</p>
            <Button 
              variant="link" 
              className="mt-2" 
              onClick={() => navigate("/settings?tab=broker")}
            >
              Connect your broker to import trades
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
