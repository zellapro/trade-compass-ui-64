
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, RefreshCw, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function FilterPanel() {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>Last 30 Days</span>
            </Button>
            <Button variant="outline" size="sm" className="flex gap-1.5">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            <Button variant="outline" size="sm" className="flex gap-1.5">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex gap-1.5"
            onClick={() => navigate("/settings?tab=charts")}
          >
            <Settings className="h-4 w-4" />
            <span>Chart Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
