
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Plus, Tag, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const setupTags = [
  { name: "Breakout", selected: true },
  { name: "VWAP Reclaim", selected: true },
  { name: "Gap Fill", selected: false },
  { name: "Reversal", selected: false },
  { name: "Trend Continuation", selected: false }
];

const mistakeTags = [
  { name: "Early Entry", selected: false },
  { name: "Late Entry", selected: true },
  { name: "FOMO", selected: false },
  { name: "Chased", selected: false },
  { name: "Ignored Stop", selected: false }
];

const improvementTags = [
  { name: "Good Risk Control", selected: true },
  { name: "Patient Entry", selected: false },
  { name: "Proper Position Size", selected: true },
  { name: "Let Winners Run", selected: true },
  { name: "Cut Losers Quick", selected: false }
];

interface GradeButtonProps {
  grade: string;
  selected?: boolean;
  onClick?: () => void;
}

function GradeButton({ grade, selected, onClick }: GradeButtonProps) {
  return (
    <Button 
      variant={selected ? "default" : "outline"} 
      className={cn(
        "h-10 w-10 p-0 font-medium",
        selected && grade === "A" && "bg-green-600 hover:bg-green-700",
        selected && grade === "B" && "bg-blue-600 hover:bg-blue-700",
        selected && grade === "C" && "bg-amber-600 hover:bg-amber-700",
        selected && grade === "F" && "bg-red-600 hover:bg-red-700",
      )}
      onClick={onClick}
    >
      {grade}
    </Button>
  );
}

export function TradeGrading() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Trade Grading & Tags</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-sm text-muted-foreground mb-2">Self Grade</div>
          <div className="flex items-center gap-2">
            <GradeButton grade="A" selected />
            <GradeButton grade="B" />
            <GradeButton grade="C" />
            <GradeButton grade="F" />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Setup Tags</div>
            <Button variant="ghost" size="sm" className="h-7 gap-1">
              <Plus size={14} />
              <span>Add</span>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {setupTags.map(tag => (
              <Badge 
                key={tag.name} 
                variant={tag.selected ? "default" : "outline"} 
                className={cn(
                  "cursor-pointer px-2.5 py-1",
                  tag.selected && "bg-blue-600 hover:bg-blue-700"
                )}
              >
                {tag.name}
                {tag.selected && <Check size={14} className="ml-1" />}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Mistake Tags</div>
            <Button variant="ghost" size="sm" className="h-7 gap-1">
              <Plus size={14} />
              <span>Add</span>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {mistakeTags.map(tag => (
              <Badge 
                key={tag.name} 
                variant={tag.selected ? "default" : "outline"} 
                className={cn(
                  "cursor-pointer px-2.5 py-1",
                  tag.selected && "bg-red-600 hover:bg-red-700"
                )}
              >
                {tag.name}
                {tag.selected && <Check size={14} className="ml-1" />}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">Improvement Tags</div>
            <Button variant="ghost" size="sm" className="h-7 gap-1">
              <Plus size={14} />
              <span>Add</span>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {improvementTags.map(tag => (
              <Badge 
                key={tag.name} 
                variant={tag.selected ? "default" : "outline"} 
                className={cn(
                  "cursor-pointer px-2.5 py-1",
                  tag.selected && "bg-green-600 hover:bg-green-700"
                )}
              >
                {tag.name}
                {tag.selected && <Check size={14} className="ml-1" />}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="bg-accent/50 rounded-md p-3 flex gap-3 mt-2">
          <div>
            <Tag size={20} className="text-blue-500" />
          </div>
          <div className="text-sm">
            <p className="font-medium mb-1">AI Tag Suggestions</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="cursor-pointer">Momentum Trade</Badge>
              <Badge variant="outline" className="cursor-pointer">Tech Sector</Badge>
              <Badge variant="outline" className="cursor-pointer">Volatile Market</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
