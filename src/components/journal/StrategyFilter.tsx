
import { useState } from "react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronDown, Filter, Search, Star, Tag, X } from "lucide-react";
import { 
  strategyCategories, 
  setupGrades,
  contextTags 
} from "@/data/strategyData";
import { cn } from "@/lib/utils";

export interface StrategyFilterState {
  categories: string[];
  setups: string[];
  grades: string[];
  contextTags: string[];
  favorites: boolean | null;
}

interface StrategyFilterProps {
  onFilterChange: (filters: StrategyFilterState) => void;
  activeFilters: StrategyFilterState;
  className?: string;
}

export function StrategyFilter({ 
  onFilterChange, 
  activeFilters,
  className 
}: StrategyFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter categories and setups based on search
  const filteredCategories = strategyCategories.filter(category => {
    if (!searchQuery) return true;
    
    const categoryMatch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
    const setupMatch = category.setups.some(setup => 
      setup.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return categoryMatch || setupMatch;
  });
  
  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = activeFilters.categories.includes(categoryId) 
      ? activeFilters.categories.filter(id => id !== categoryId)
      : [...activeFilters.categories, categoryId];
      
    onFilterChange({
      ...activeFilters,
      categories: newCategories
    });
  };
  
  const handleSetupToggle = (setupId: string) => {
    const newSetups = activeFilters.setups.includes(setupId)
      ? activeFilters.setups.filter(id => id !== setupId)
      : [...activeFilters.setups, setupId];
      
    onFilterChange({
      ...activeFilters,
      setups: newSetups
    });
  };
  
  const handleGradeToggle = (gradeId: string) => {
    const newGrades = activeFilters.grades.includes(gradeId)
      ? activeFilters.grades.filter(id => id !== gradeId)
      : [...activeFilters.grades, gradeId];
      
    onFilterChange({
      ...activeFilters,
      grades: newGrades
    });
  };
  
  const handleContextTagToggle = (tagId: string) => {
    const newContextTags = activeFilters.contextTags.includes(tagId)
      ? activeFilters.contextTags.filter(id => id !== tagId)
      : [...activeFilters.contextTags, tagId];
      
    onFilterChange({
      ...activeFilters,
      contextTags: newContextTags
    });
  };
  
  const handleFavoriteToggle = () => {
    // null -> true -> false -> null cycle
    let newFavoriteState: boolean | null;
    
    if (activeFilters.favorites === null) {
      newFavoriteState = true;
    } else if (activeFilters.favorites === true) {
      newFavoriteState = false;
    } else {
      newFavoriteState = null;
    }
    
    onFilterChange({
      ...activeFilters,
      favorites: newFavoriteState
    });
  };
  
  const clearFilters = () => {
    onFilterChange({
      categories: [],
      setups: [],
      grades: [],
      contextTags: [],
      favorites: null
    });
  };
  
  const hasActiveFilters = (
    activeFilters.categories.length > 0 ||
    activeFilters.setups.length > 0 ||
    activeFilters.grades.length > 0 ||
    activeFilters.contextTags.length > 0 ||
    activeFilters.favorites !== null
  );
  
  // Get display name for a setup by ID
  const getSetupName = (setupId: string): string => {
    for (const category of strategyCategories) {
      const setup = category.setups.find(setup => setup.id === setupId);
      if (setup) return setup.name;
    }
    return "";
  };
  
  // Get display name for a category by ID
  const getCategoryName = (categoryId: string): string => {
    const category = strategyCategories.find(cat => cat.id === categoryId);
    return category ? category.name : "";
  };
  
  // Get display name for a grade by ID
  const getGradeName = (gradeId: string): string => {
    const grade = setupGrades.find(g => g.id === gradeId);
    return grade ? grade.name : "";
  };
  
  // Get display name for a context tag by ID
  const getContextTagName = (tagId: string): string => {
    const tag = contextTags.find(t => t.id === tagId);
    return tag ? tag.name : "";
  };
  
  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant={hasActiveFilters ? "default" : "outline"} 
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Tag className="h-4 w-4" />
            <span>Strategy Filters</span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 font-normal">
                {activeFilters.categories.length + 
                  activeFilters.setups.length + 
                  activeFilters.grades.length + 
                  activeFilters.contextTags.length +
                  (activeFilters.favorites !== null ? 1 : 0)}
              </Badge>
            )}
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[340px] p-0" align="start">
          <Tabs defaultValue="category">
            <div className="p-2 border-b">
              <div className="relative mb-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search strategies or setups"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="category">Category</TabsTrigger>
                <TabsTrigger value="setup">Setup</TabsTrigger>
                <TabsTrigger value="grade">Grade</TabsTrigger>
                <TabsTrigger value="context">Context</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="category" className="m-0">
              <ScrollArea className="h-[280px]">
                <div className="p-2 space-y-1">
                  <Button
                    variant={activeFilters.favorites !== null ? "default" : "ghost"}
                    size="sm"
                    onClick={handleFavoriteToggle}
                    className="w-full justify-start"
                  >
                    <Star 
                      className={cn(
                        "h-4 w-4 mr-2",
                        activeFilters.favorites === true && "fill-amber-500 text-amber-500",
                        activeFilters.favorites === false && "text-muted-foreground"
                      )}
                    />
                    <span>
                      {activeFilters.favorites === true && "Favorites Only"}
                      {activeFilters.favorites === false && "Non-Favorites"}
                      {activeFilters.favorites === null && "Favorites"}
                    </span>
                  </Button>
                
                  {filteredCategories.map(category => (
                    <div
                      key={category.id}
                      className="flex items-start space-x-2 px-2 py-1.5 rounded"
                    >
                      <Checkbox
                        id={`cat-${category.id}`}
                        checked={activeFilters.categories.includes(category.id)}
                        onCheckedChange={() => handleCategoryToggle(category.id)}
                      />
                      <label
                        htmlFor={`cat-${category.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="setup" className="m-0">
              <ScrollArea className="h-[280px]">
                <div className="p-2 space-y-1">
                  {filteredCategories.map(category => (
                    <div key={category.id} className="mb-3">
                      <h4 className="text-xs font-semibold text-muted-foreground mb-1 px-2">
                        {category.name}
                      </h4>
                      <div className="space-y-1">
                        {category.setups
                          .filter(setup => 
                            !searchQuery || 
                            setup.name.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map(setup => (
                            <div
                              key={setup.id}
                              className="flex items-start space-x-2 px-2 py-1.5 rounded"
                            >
                              <Checkbox
                                id={`setup-${setup.id}`}
                                checked={activeFilters.setups.includes(setup.id)}
                                onCheckedChange={() => handleSetupToggle(setup.id)}
                              />
                              <label
                                htmlFor={`setup-${setup.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {setup.name}
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="grade" className="m-0">
              <div className="p-3 space-y-3">
                <div className="flex flex-wrap gap-1">
                  {setupGrades.map(grade => (
                    <Badge
                      key={grade.id}
                      variant={activeFilters.grades.includes(grade.id) ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer px-3 py-1 m-0.5",
                        grade.id === "a-plus" && "hover:bg-green-100 hover:text-green-800",
                        grade.id === "a" && "hover:bg-green-100 hover:text-green-800",
                        grade.id === "b-plus" && "hover:bg-blue-100 hover:text-blue-800",
                        grade.id === "b" && "hover:bg-blue-100 hover:text-blue-800",
                        grade.id === "c" && "hover:bg-yellow-100 hover:text-yellow-800",
                        grade.id === "d" && "hover:bg-orange-100 hover:text-orange-800",
                        grade.id === "f" && "hover:bg-red-100 hover:text-red-800"
                      )}
                      onClick={() => handleGradeToggle(grade.id)}
                    >
                      {grade.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="context" className="m-0">
              <ScrollArea className="h-[280px]">
                <div className="p-2 space-y-1">
                  {contextTags.map(tag => (
                    <div
                      key={tag.id}
                      className="flex items-start space-x-2 px-2 py-1.5 rounded"
                    >
                      <Checkbox
                        id={`context-${tag.id}`}
                        checked={activeFilters.contextTags.includes(tag.id)}
                        onCheckedChange={() => handleContextTagToggle(tag.id)}
                      />
                      <label
                        htmlFor={`context-${tag.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {tag.name}
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
          
          <div className="flex items-center justify-between p-2 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters} 
              disabled={!hasActiveFilters}
            >
              Clear Filters
            </Button>
            <Button 
              size="sm" 
              onClick={() => setIsOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      
      {/* Display Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1 mt-2">
          {activeFilters.categories.map(categoryId => (
            <Badge 
              key={`cat-${categoryId}`}
              variant="outline"
              className="flex items-center gap-1"
            >
              <span className="mr-1">Category:</span>
              {getCategoryName(categoryId)}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => handleCategoryToggle(categoryId)}
              />
            </Badge>
          ))}
          
          {activeFilters.setups.map(setupId => (
            <Badge 
              key={`setup-${setupId}`}
              variant="outline"
              className="flex items-center gap-1"
            >
              <span className="mr-1">Setup:</span>
              {getSetupName(setupId)}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => handleSetupToggle(setupId)}
              />
            </Badge>
          ))}
          
          {activeFilters.grades.map(gradeId => (
            <Badge 
              key={`grade-${gradeId}`}
              variant="outline"
              className="flex items-center gap-1"
            >
              <span className="mr-1">Grade:</span>
              {getGradeName(gradeId)}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => handleGradeToggle(gradeId)}
              />
            </Badge>
          ))}
          
          {activeFilters.contextTags.map(tagId => (
            <Badge 
              key={`context-${tagId}`}
              variant="outline"
              className="flex items-center gap-1"
            >
              <span className="mr-1">Context:</span>
              {getContextTagName(tagId)}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => handleContextTagToggle(tagId)}
              />
            </Badge>
          ))}
          
          {activeFilters.favorites !== null && (
            <Badge 
              variant="outline"
              className="flex items-center gap-1"
            >
              <span className="mr-1">
                {activeFilters.favorites ? "Favorites Only" : "Non-Favorites"}
              </span>
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={handleFavoriteToggle}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
