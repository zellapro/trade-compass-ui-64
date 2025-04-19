
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Check, X, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const checklistItems = [
  { id: 1, label: "Was the setup valid according to my rules?", checked: true },
  { id: 2, label: "Did I size the position appropriately (1-2% risk)?", checked: true },
  { id: 3, label: "Did I wait for confirmation before entering?", checked: false },
  { id: 4, label: "Was my risk-reward ratio at least 2:1?", checked: true },
  { id: 5, label: "Did I enter at a logical support/resistance level?", checked: true },
  { id: 6, label: "Was I following my trading plan?", checked: true },
  { id: 7, label: "Did I avoid trading during major news events?", checked: true },
  { id: 8, label: "Did I set a proper stop loss before entering?", checked: true }
];

export function TradeChecklist() {
  // Calculate compliance percentage
  const completedCount = checklistItems.filter(item => item.checked).length;
  const compliancePercentage = Math.round((completedCount / checklistItems.length) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Trade Rules Checklist</CardTitle>
        <div className="flex items-center gap-1.5">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Save size={14} />
            <span>Template</span>
          </Button>
          <div 
            className={cn(
              "px-2.5 py-1 rounded-md text-sm font-medium",
              compliancePercentage >= 80 ? "bg-green-100 text-green-700" :
              compliancePercentage >= 60 ? "bg-amber-100 text-amber-700" :
              "bg-red-100 text-red-700"
            )}
          >
            {compliancePercentage}% Compliant
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {checklistItems.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <Checkbox id={`checklist-${item.id}`} checked={item.checked} />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor={`checklist-${item.id}`} className="text-sm">
                  {item.label}
                </Label>
              </div>
              <div className="ml-auto">
                {item.checked ? (
                  <Check size={16} className="text-green-600" />
                ) : (
                  <X size={16} className="text-red-600" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="ghost" size="sm" className="mt-4 gap-1.5">
          <Plus size={14} />
          <span>Add Item</span>
        </Button>
      </CardContent>
    </Card>
  );
}
