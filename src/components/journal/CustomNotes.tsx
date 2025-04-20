
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Mic, Hash } from "lucide-react";

// Sample custom tags
const tags = [
  { id: 1, name: "HighConfidence", color: "green" },
  { id: 2, name: "MorningSession", color: "blue" },
  { id: 3, name: "VolumeConfirmation", color: "amber" }
];

export function CustomNotes() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Custom Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground">Prompts</label>
              <Button variant="ghost" size="sm" className="h-6 gap-1">
                <Plus size={12} />
                <span className="text-xs">Add</span>
              </Button>
            </div>
            <div className="text-sm p-2.5 border rounded-md bg-accent/30 italic">
              Did I follow my pre-market analysis plan for this trade?
            </div>
            <Textarea 
              placeholder="Enter your answer..."
              className="min-h-[80px]"
              defaultValue="Yes, I identified the VWAP reclaim setup during pre-market analysis and waited for the perfect entry after seeing volume confirmation. The trade executed exactly according to plan with minimal drawdown."
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground">Voice Notes</label>
              <Button variant="outline" size="sm" className="h-6 gap-1">
                <Mic size={12} />
                <span className="text-xs">Record</span>
              </Button>
            </div>
            <div className="text-sm p-2.5 border rounded-md">
              <span className="text-muted-foreground">Voice note recorded - 0:45</span>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-4 bg-primary/20 rounded-full flex-1">
                  <div className="h-full w-3/4 bg-primary rounded-full"></div>
                </div>
                <span className="text-xs text-muted-foreground">0:45</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground">Tags</label>
              <Button variant="ghost" size="sm" className="h-6 gap-1">
                <Hash size={12} />
                <span className="text-xs">Add</span>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge 
                  key={tag.id} 
                  variant="secondary"
                  className={cn(
                    tag.color === "green" && "bg-green-100 text-green-800 hover:bg-green-200",
                    tag.color === "blue" && "bg-blue-100 text-blue-800 hover:bg-blue-200",
                    tag.color === "amber" && "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  )}
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
