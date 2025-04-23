
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface TradeRatingCardProps {
  setupQuality: number;
  planAdherence: number;
  executionQuality: number;
  emotionalControl: number;
  overallGrade?: string;
  onRatingChange?: (category: string, value: number) => void;
}

export function TradeRatingCard({ 
  setupQuality = 7, 
  planAdherence = 8, 
  executionQuality = 6, 
  emotionalControl = 7,
  overallGrade = "B+",
  onRatingChange
}: TradeRatingCardProps) {

  const handleRatingChange = (category: string, value: number[]) => {
    if (onRatingChange) {
      onRatingChange(category, value[0]);
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes("A+")) return "text-green-500";
    if (grade.includes("A")) return "text-green-400";
    if (grade.includes("B+")) return "text-blue-400";
    if (grade.includes("B")) return "text-blue-300";
    if (grade.includes("C+")) return "text-yellow-500";
    if (grade.includes("C")) return "text-yellow-400";
    if (grade.includes("D")) return "text-red-400";
    return "text-red-500";
  };

  return (
    <div className="space-y-4 bg-background/50 rounded-lg border p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold">Trade Performance Rating</h3>
        <div className={cn("flex items-center gap-1", getGradeColor(overallGrade))}>
          <Star className="h-4 w-4 fill-current" />
          <span className="font-bold">{overallGrade}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium">Setup Quality</span>
            <span className="text-xs font-medium">{setupQuality}/10</span>
          </div>
          <Slider
            value={[setupQuality]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => handleRatingChange("setupQuality", value)}
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium">Plan Adherence</span>
            <span className="text-xs font-medium">{planAdherence}/10</span>
          </div>
          <Slider
            value={[planAdherence]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => handleRatingChange("planAdherence", value)}
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium">Execution Quality</span>
            <span className="text-xs font-medium">{executionQuality}/10</span>
          </div>
          <Slider
            value={[executionQuality]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => handleRatingChange("executionQuality", value)}
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium">Emotional Control</span>
            <span className="text-xs font-medium">{emotionalControl}/10</span>
          </div>
          <Slider
            value={[emotionalControl]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => handleRatingChange("emotionalControl", value)}
          />
        </div>
      </div>
    </div>
  );
}
