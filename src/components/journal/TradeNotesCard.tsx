
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TradeNotesCardProps {
  tradePlan?: string;
  entryReason?: string;
  exitReason?: string;
  lessonLearned?: string;
  reflection?: string;
  onNotesChange?: (field: string, value: string) => void;
}

export function TradeNotesCard({
  tradePlan = "",
  entryReason = "",
  exitReason = "",
  lessonLearned = "",
  reflection = "",
  onNotesChange
}: TradeNotesCardProps) {
  const handleChange = (field: string, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onNotesChange) {
      onNotesChange(field, e.target.value);
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="plan">
        <TabsList className="grid grid-cols-3 mb-3">
          <TabsTrigger value="plan">Trade Plan</TabsTrigger>
          <TabsTrigger value="execution">Execution</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plan" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Pre-Trade Plan</label>
            <Textarea
              placeholder="What was your plan for this trade?"
              className="resize-none min-h-[100px]"
              value={tradePlan}
              onChange={(e) => handleChange("tradePlan", e)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="execution" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Entry Reason</label>
            <Textarea
              placeholder="Why did you enter this trade?"
              className="resize-none min-h-[80px]"
              value={entryReason}
              onChange={(e) => handleChange("entryReason", e)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1.5">Exit Reason</label>
            <Textarea
              placeholder="Why did you exit this trade?"
              className="resize-none min-h-[80px]"
              value={exitReason}
              onChange={(e) => handleChange("exitReason", e)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="lessons" className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Key Lesson</label>
            <Textarea
              placeholder="What's the most important lesson from this trade?"
              className="resize-none min-h-[80px]"
              value={lessonLearned}
              onChange={(e) => handleChange("lessonLearned", e)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1.5">Self-Reflection</label>
            <Textarea
              placeholder="How could you improve next time?"
              className="resize-none min-h-[80px]"
              value={reflection}
              onChange={(e) => handleChange("reflection", e)}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
