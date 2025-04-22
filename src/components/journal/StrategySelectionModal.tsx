
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Check, ChevronDown, ChevronUp, Filter, Search, Star, StarOff, Tag, X } from "lucide-react";
import { strategyCategories, setupGrades, contextTags, StrategyCategory, Setup } from "@/data/strategyData";
import { cn } from "@/lib/utils";

export interface SelectedStrategy {
  categoryId: string;
  setupIds: string[];
  gradeId?: string;
  contextTagIds: string[];
  isFavorite: boolean;
  notes?: string;
}

interface StrategySelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialSelection?: SelectedStrategy;
  onSave: (selection: SelectedStrategy) => void;
}

export function StrategySelectionModal({
  open,
  onOpenChange,
  initialSelection,
  onSave,
}: StrategySelectionModalProps) {
  const [activeTab, setActiveTab] = useState("select");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialSelection?.categoryId || null
  );
  const [selectedSetups, setSelectedSetups] = useState<string[]>(
    initialSelection?.setupIds || []
  );
  const [selectedGrade, setSelectedGrade] = useState<string | undefined>(
    initialSelection?.gradeId
  );
  const [selectedContextTags, setSelectedContextTags] = useState<string[]>(
    initialSelection?.contextTagIds || []
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(
    initialSelection?.isFavorite || false
  );
  const [notes, setNotes] = useState<string>(initialSelection?.notes || "");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Reset form when modal opens with new data
  useEffect(() => {
    if (open && initialSelection) {
      setSelectedCategory(initialSelection.categoryId);
      setSelectedSetups(initialSelection.setupIds);
      setSelectedGrade(initialSelection.gradeId);
      setSelectedContextTags(initialSelection.contextTagIds);
      setIsFavorite(initialSelection.isFavorite);
      setNotes(initialSelection.notes || "");
      
      // Expand the category that contains selected setups
      if (initialSelection.categoryId) {
        setExpandedCategories([initialSelection.categoryId]);
      }
    }
  }, [open, initialSelection]);

  // Filter categories and setups based on search query
  const filteredCategories = strategyCategories.filter((category) => {
    if (!searchQuery) return true;
    
    const categoryMatches = category.name.toLowerCase().includes(searchQuery.toLowerCase());
    const setupMatches = category.setups.some((setup) => 
      setup.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return categoryMatches || setupMatches;
  });

  const handleCategoryToggle = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSetupToggle = (setupId: string) => {
    if (selectedSetups.includes(setupId)) {
      setSelectedSetups(selectedSetups.filter(id => id !== setupId));
    } else {
      setSelectedSetups([...selectedSetups, setupId]);
    }
  };

  const handleContextTagToggle = (tagId: string) => {
    if (selectedContextTags.includes(tagId)) {
      setSelectedContextTags(selectedContextTags.filter(id => id !== tagId));
    } else {
      setSelectedContextTags([...selectedContextTags, tagId]);
    }
  };

  const handleSave = () => {
    onSave({
      categoryId: selectedCategory || "",
      setupIds: selectedSetups,
      gradeId: selectedGrade,
      contextTagIds: selectedContextTags,
      isFavorite,
      notes,
    });
    onOpenChange(false);
  };

  const getSetupName = (setupId: string): string => {
    for (const category of strategyCategories) {
      const setup = category.setups.find(s => s.id === setupId);
      if (setup) return setup.name;
    }
    return "";
  };

  const getCategoryName = (categoryId: string): string => {
    const category = strategyCategories.find(c => c.id === categoryId);
    return category ? category.name : "";
  };

  const renderSelectedSetups = () => {
    return selectedSetups.map(setupId => {
      const setupName = getSetupName(setupId);
      return (
        <Badge 
          key={setupId} 
          variant="secondary" 
          className="mr-1 mb-1 p-1.5 flex items-center gap-1"
        >
          {setupName}
          <X 
            className="h-3 w-3 ml-1 cursor-pointer" 
            onClick={() => handleSetupToggle(setupId)}
          />
        </Badge>
      );
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Strategy & Setup Selection</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="select" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="select">
              <Tag className="h-4 w-4 mr-2" />
              Select Strategy
            </TabsTrigger>
            <TabsTrigger value="grade">
              <Star className="h-4 w-4 mr-2" />
              Grade & Context
            </TabsTrigger>
            <TabsTrigger value="notes">
              Notes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="select" className="flex-1 flex flex-col mt-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search strategies or setups"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
                className={cn(
                  "flex items-center gap-1",
                  isFavorite && "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300"
                )}
              >
                {isFavorite ? (
                  <>
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <span>Favorite</span>
                  </>
                ) : (
                  <>
                    <StarOff className="h-4 w-4" />
                    <span>Not Favorite</span>
                  </>
                )}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
              {/* Categories Column */}
              <div className="border rounded-md p-2 overflow-y-auto">
                <h3 className="font-medium text-sm mb-2">Strategy Categories</h3>
                <ScrollArea className="h-[300px] pr-2">
                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className={cn(
                        "mb-1 p-2 rounded-md cursor-pointer hover:bg-accent transition-colors",
                        selectedCategory === category.id && "bg-primary/10"
                      )}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      <div className="font-medium text-sm">{category.name}</div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
              
              {/* Setups Column */}
              <div className="border rounded-md p-2 overflow-y-auto col-span-1 md:col-span-2">
                <h3 className="font-medium text-sm mb-2">Available Setups</h3>
                <ScrollArea className="h-[300px] pr-2">
                  {selectedCategory ? (
                    <div className="space-y-1">
                      {strategyCategories
                        .find((cat) => cat.id === selectedCategory)
                        ?.setups.map((setup) => (
                          <div
                            key={setup.id}
                            className={cn(
                              "p-2 rounded-md hover:bg-accent cursor-pointer transition-colors flex items-center justify-between",
                              selectedSetups.includes(setup.id) && "bg-primary/10"
                            )}
                            onClick={() => handleSetupToggle(setup.id)}
                          >
                            <span>{setup.name}</span>
                            {selectedSetups.includes(setup.id) && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-center py-4">
                      Select a category to view setups
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
            
            {selectedSetups.length > 0 && (
              <div className="mt-4 border-t pt-3">
                <h3 className="font-medium text-sm mb-2">Selected Setups:</h3>
                <div className="flex flex-wrap">
                  {renderSelectedSetups()}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="grade" className="flex-1 flex flex-col mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trade Grade Section */}
              <div>
                <h3 className="font-medium mb-2">Trade Grade</h3>
                <div className="grid grid-cols-7 gap-1">
                  {setupGrades.map((grade) => (
                    <Button
                      key={grade.id}
                      variant={selectedGrade === grade.id ? "default" : "outline"}
                      onClick={() => setSelectedGrade(grade.id)}
                      className="flex flex-col items-center justify-center h-14"
                    >
                      <span className={cn(
                        "text-lg font-bold",
                        grade.id === "a-plus" && "text-green-600",
                        grade.id === "a" && "text-green-500",
                        grade.id === "b-plus" && "text-blue-500",
                        grade.id === "b" && "text-blue-400",
                        grade.id === "c" && "text-yellow-500",
                        grade.id === "d" && "text-orange-500",
                        grade.id === "f" && "text-red-500",
                      )}>
                        {grade.name}
                      </span>
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {setupGrades.find(g => g.id === selectedGrade)?.description || 
                    "Select a grade to rate your trade execution"}
                </p>
              </div>
              
              {/* Context Tags Section */}
              <div>
                <h3 className="font-medium mb-2">Market Context Tags</h3>
                <div className="flex flex-wrap gap-1 max-h-[160px] overflow-y-auto p-1 border rounded-md">
                  {contextTags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant={selectedContextTags.includes(tag.id) ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer m-0.5 py-1.5",
                        selectedContextTags.includes(tag.id) && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => handleContextTagToggle(tag.id)}
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="flex-1 flex flex-col mt-4">
            <div className="flex-1">
              <h3 className="font-medium mb-2">Strategy Notes</h3>
              <textarea
                className="w-full h-40 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add notes about your strategy implementation, what worked well, what could be improved..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <div className="flex gap-2 justify-between w-full items-center">
            <div className="text-sm text-muted-foreground">
              {selectedSetups.length} setup{selectedSetups.length !== 1 ? 's' : ''} selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!selectedCategory || selectedSetups.length === 0}>
                Save Strategy
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
