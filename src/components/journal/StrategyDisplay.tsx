
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Star, Tag } from "lucide-react";
import { StrategySelectionModal, SelectedStrategy } from "./StrategySelectionModal";
import { findCategoryById, findSetupById, findGradeById, findContextTagById } from "@/data/strategyData";
import { cn } from "@/lib/utils";

interface StrategyDisplayProps {
  strategy?: SelectedStrategy;
  onStrategyChange?: (strategy: SelectedStrategy) => void;
  editable?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "inline" | "card" | "compact";
}

export function StrategyDisplay({ 
  strategy, 
  onStrategyChange, 
  editable = true,
  className,
  size = "md",
  variant = "card"
}: StrategyDisplayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  if (!strategy) return null;
  
  const categoryName = strategy.categoryId ? findCategoryById(strategy.categoryId)?.name : "";
  
  const setupNames = strategy.setupIds.map(id => {
    const setup = findSetupById(id);
    return setup ? setup.name : "";
  }).filter(Boolean);
  
  const grade = strategy.gradeId ? findGradeById(strategy.gradeId) : undefined;
  
  const contextTags = strategy.contextTagIds.map(id => {
    const tag = findContextTagById(id);
    return tag ? tag.name : "";
  }).filter(Boolean);

  const handleStrategyUpdate = (updatedStrategy: SelectedStrategy) => {
    if (onStrategyChange) {
      onStrategyChange(updatedStrategy);
    }
  };

  // Different style variants
  if (variant === "inline") {
    return (
      <>
        <div className={cn("flex flex-wrap items-center gap-1", className)}>
          {strategy.isFavorite && (
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
          )}
          
          {setupNames.map((name, i) => (
            <Badge key={i} variant="outline" className="text-xs font-normal">
              {name}
            </Badge>
          ))}
          
          {grade && (
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs font-semibold",
                grade.id === "a-plus" && "text-green-600 border-green-200 bg-green-50",
                grade.id === "a" && "text-green-500 border-green-200 bg-green-50",
                grade.id === "b-plus" && "text-blue-500 border-blue-200 bg-blue-50",
                grade.id === "b" && "text-blue-400 border-blue-200 bg-blue-50",
                grade.id === "c" && "text-yellow-500 border-yellow-200 bg-yellow-50",
                grade.id === "d" && "text-orange-500 border-orange-200 bg-orange-50",
                grade.id === "f" && "text-red-500 border-red-200 bg-red-50",
              )}
            >
              {grade.name}
            </Badge>
          )}
          
          {editable && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 ml-1" 
              onClick={() => setIsModalOpen(true)}
            >
              <Pencil className="h-3 w-3" />
            </Button>
          )}
        </div>
        
        <StrategySelectionModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          initialSelection={strategy}
          onSave={handleStrategyUpdate}
        />
      </>
    );
  }
  
  if (variant === "compact") {
    return (
      <>
        <div className={cn("flex flex-col", className)}>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <Tag className="h-3 w-3" />
            <span className="font-medium">{categoryName}</span>
            {strategy.isFavorite && <Star className="h-3 w-3 text-amber-500 fill-amber-500" />}
          </div>
          
          <div className="flex flex-wrap gap-1 mb-1">
            {setupNames.map((name, i) => (
              <Badge key={i} variant="secondary" className="text-xs py-0">
                {name}
              </Badge>
            ))}
          </div>
          
          {editable && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs self-start" 
              onClick={() => setIsModalOpen(true)}
            >
              Edit Strategy
            </Button>
          )}
        </div>
        
        <StrategySelectionModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          initialSelection={strategy}
          onSave={handleStrategyUpdate}
        />
      </>
    );
  }
  
  // Default card variant
  return (
    <>
      <div className={cn("space-y-3", className)}>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <h4 className="font-medium">{categoryName}</h4>
              {strategy.isFavorite && (
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              )}
            </div>
            
            <div className="flex flex-wrap gap-1">
              {setupNames.map((name, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {name}
                </Badge>
              ))}
            </div>
          </div>
          
          {grade && (
            <Badge 
              variant="outline" 
              className={cn(
                "text-sm font-bold px-2 py-1",
                grade.id === "a-plus" && "text-green-600 border-green-200 bg-green-50",
                grade.id === "a" && "text-green-500 border-green-200 bg-green-50",
                grade.id === "b-plus" && "text-blue-500 border-blue-200 bg-blue-50",
                grade.id === "b" && "text-blue-400 border-blue-200 bg-blue-50",
                grade.id === "c" && "text-yellow-500 border-yellow-200 bg-yellow-50",
                grade.id === "d" && "text-orange-500 border-orange-200 bg-orange-50",
                grade.id === "f" && "text-red-500 border-red-200 bg-red-50",
              )}
            >
              {grade.name}
            </Badge>
          )}
        </div>
        
        {contextTags.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Context:</p>
            <div className="flex flex-wrap gap-1">
              {contextTags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {strategy.notes && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Notes:</p>
            <p className="text-xs">{strategy.notes}</p>
          </div>
        )}
        
        {editable && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs w-full" 
            onClick={() => setIsModalOpen(true)}
          >
            <Pencil className="h-3.5 w-3.5 mr-1" />
            Edit Strategy
          </Button>
        )}
      </div>
      
      <StrategySelectionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialSelection={strategy}
        onSave={handleStrategyUpdate}
      />
    </>
  );
}
