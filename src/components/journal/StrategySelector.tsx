
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarOff, Star, Tag, Filter } from "lucide-react";
import { StrategySelectionModal, SelectedStrategy } from "./StrategySelectionModal";
import { StrategyDisplay } from "./StrategyDisplay";
import { cn } from "@/lib/utils";

interface StrategySelectorProps {
  onStrategyChange?: (strategy: SelectedStrategy) => void;
  currentStrategy?: SelectedStrategy;
  className?: string;
}

export function StrategySelector({ 
  onStrategyChange, 
  currentStrategy,
  className 
}: StrategySelectorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleStrategyUpdate = (updatedStrategy: SelectedStrategy) => {
    if (onStrategyChange) {
      onStrategyChange(updatedStrategy);
    }
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Strategy & Setup</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5"
        >
          <Tag className="h-4 w-4" />
          <span>{currentStrategy ? 'Change Strategy' : 'Select Strategy'}</span>
        </Button>
      </div>
      
      {currentStrategy ? (
        <Card>
          <CardContent className="pt-4">
            <StrategyDisplay 
              strategy={currentStrategy}
              onStrategyChange={handleStrategyUpdate}
              editable={true}
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center space-y-3">
            <Tag className="h-10 w-10 text-muted-foreground" />
            <div>
              <h4 className="font-medium">No Strategy Selected</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Click the button above to select a strategy and setup for this trade
              </p>
            </div>
            <Button 
              variant="default" 
              onClick={() => setIsModalOpen(true)}
            >
              Select Strategy
            </Button>
          </CardContent>
        </Card>
      )}
      
      <StrategySelectionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialSelection={currentStrategy}
        onSave={handleStrategyUpdate}
      />
    </div>
  );
}
