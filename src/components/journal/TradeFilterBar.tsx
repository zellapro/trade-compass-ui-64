
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowUpDown, 
  Calendar, 
  Filter, 
  Search, 
  SlidersHorizontal, 
  Tag,
  Settings 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function TradeFilterBar() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search trades..."
          className="pl-8 w-full sm:w-[300px]"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort By
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          <Tag className="mr-2 h-4 w-4" />
          Tags
        </Button>
        <Button variant="outline" size="sm" className="whitespace-nowrap">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="whitespace-nowrap"
          onClick={() => navigate("/settings?tab=trading")}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Rules
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="whitespace-nowrap"
          onClick={() => navigate("/settings?tab=broker")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Connections
        </Button>
      </div>
    </div>
  );
}
