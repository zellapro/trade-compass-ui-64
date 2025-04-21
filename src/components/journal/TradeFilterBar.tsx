import { useState } from "react";
import { Calendar, Tag, Check, X, ChevronDown, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const tagOptions = ["Premarket", "FOMO", "VWAP Fade"];
const strategyOptions = ["Breakout", "VWAP Fade", "Gap Fill", "Trend", "Reversal", "Support Bounce"];
const setupOptions = ["Breakout", "VWAP", "Gap", "Reversal", "Support Bounce", "Trend Continuation"];
const emotionTags = ["Hesitation", "FOMO", "Confident", "Calm", "Focused", "Neutral"];
const presetFilters = ["My Best Setups", "Mistake Days", "Prop Firm Review"];
const gradeOptions = ["A+", "A", "B+", "B", "C", "D"];

export function TradeFilterBar() {
  const [date, setDate] = useState({ from: "", to: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedPreset, setSelectedPreset] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    tags: string[];
    strategies: string[];
    setups: string[];
    outcome: string;
    emotions: string[];
    grades: string[];
    ruleViolation: boolean;
  }>({
    tags: [],
    strategies: [],
    setups: [],
    outcome: "",
    emotions: [],
    grades: [],
    ruleViolation: false
  });

  const handleAddFilter = (category: string, value: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (category === 'tags' && !newFilters.tags.includes(value)) {
        newFilters.tags = [...newFilters.tags, value];
      } else if (category === 'strategies' && !newFilters.strategies.includes(value)) {
        newFilters.strategies = [...newFilters.strategies, value];
      } else if (category === 'setups' && !newFilters.setups.includes(value)) {
        newFilters.setups = [...newFilters.setups, value];
      } else if (category === 'outcome') {
        newFilters.outcome = value;
      } else if (category === 'emotions' && !newFilters.emotions.includes(value)) {
        newFilters.emotions = [...newFilters.emotions, value];
      } else if (category === 'grades' && !newFilters.grades.includes(value)) {
        newFilters.grades = [...newFilters.grades, value];
      }
      return newFilters;
    });
    setActiveTags([...activeTags, `${category}:${value}`]);
  };

  const handleRemoveTag = (tag: string) => {
    setActiveTags(activeTags.filter(t => t !== tag));
    const [category, value] = tag.split(':');
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (category === 'tags') {
        newFilters.tags = newFilters.tags.filter(t => t !== value);
      } else if (category === 'strategies') {
        newFilters.strategies = newFilters.strategies.filter(s => s !== value);
      } else if (category === 'setups') {
        newFilters.setups = newFilters.setups.filter(s => s !== value);
      } else if (category === 'outcome') {
        newFilters.outcome = '';
      } else if (category === 'emotions') {
        newFilters.emotions = newFilters.emotions.filter(e => e !== value);
      } else if (category === 'grades') {
        newFilters.grades = newFilters.grades.filter(g => g !== value);
      } else if (category === 'ruleViolation') {
        newFilters.ruleViolation = false;
      }
      return newFilters;
    });
  };

  const handlePresetSelect = (preset: string) => {
    setSelectedPreset(preset);
    if (!activeTags.includes(`preset:${preset}`)) {
      setActiveTags([...activeTags.filter(t => !t.startsWith('preset:')), `preset:${preset}`]);
    }
  };

  const handleRuleViolationsToggle = () => {
    setActiveFilters(prev => ({
      ...prev,
      ruleViolation: !prev.ruleViolation
    }));
    
    if (activeFilters.ruleViolation) {
      setActiveTags(activeTags.filter(t => t !== 'ruleViolation:true'));
    } else {
      setActiveTags([...activeTags, 'ruleViolation:true']);
    }
  };

  const clearAllFilters = () => {
    setActiveTags([]);
    setActiveFilters({
      tags: [],
      strategies: [],
      setups: [],
      outcome: "",
      emotions: [],
      grades: [],
      ruleViolation: false
    });
    setSelectedPreset("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for ticker or notes..." 
            className="pl-9 pr-3 py-2 w-full" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar size={14} />
              <span>Date Range</span>
              <ChevronDown size={14} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="end">
            <div className="grid gap-3">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Date Range</h4>
                <div className="flex gap-2 items-center">
                  <Input 
                    type="date" 
                    className="w-full"
                    value={date.from}
                    onChange={e => setDate({...date, from: e.target.value})}
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input 
                    type="date" 
                    className="w-full"
                    value={date.to}
                    onChange={e => setDate({...date, to: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => {
                  const today = new Date().toISOString().split('T')[0];
                  setDate({from: today, to: today});
                  if (!activeTags.some(t => t.startsWith('date:'))) {
                    setActiveTags([...activeTags, 'date:Today']);
                  }
                }}>Today</Button>
                <Button size="sm" variant="outline" onClick={() => {
                  const today = new Date();
                  const weekStart = new Date(today);
                  weekStart.setDate(today.getDate() - today.getDay());
                  setDate({
                    from: weekStart.toISOString().split('T')[0],
                    to: today.toISOString().split('T')[0]
                  });
                  if (!activeTags.some(t => t.startsWith('date:'))) {
                    setActiveTags([...activeTags, 'date:This Week']);
                  }
                }}>This Week</Button>
                <Button size="sm" variant="outline" onClick={() => {
                  const today = new Date();
                  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                  setDate({
                    from: monthStart.toISOString().split('T')[0],
                    to: today.toISOString().split('T')[0]
                  });
                  if (!activeTags.some(t => t.startsWith('date:'))) {
                    setActiveTags([...activeTags, 'date:This Month']);
                  }
                }}>This Month</Button>
              </div>
              <div className="flex justify-end">
                <Button size="sm" onClick={() => {
                  if (date.from && date.to) {
                    const formatDate = (dateStr: string) => {
                      const d = new Date(dateStr);
                      return d.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
                    };
                    const displayDate = `${formatDate(date.from)} - ${formatDate(date.to)}`;
                    setActiveTags([...activeTags.filter(t => !t.startsWith('date:')), `date:${displayDate}`]);
                  }
                }}>Apply</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter size={14} />
              <span>Filters</span>
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full px-2 py-1.5 text-sm hover:bg-accent cursor-pointer flex justify-between items-center">
                <span>Setup</span>
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {setupOptions.map(setup => (
                  <DropdownMenuCheckboxItem
                    key={setup}
                    checked={activeFilters.setups.includes(setup)}
                    onCheckedChange={() => {
                      if (activeFilters.setups.includes(setup)) {
                        handleRemoveTag(`setups:${setup}`);
                      } else {
                        handleAddFilter('setups', setup);
                      }
                    }}
                  >
                    {setup}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full px-2 py-1.5 text-sm hover:bg-accent cursor-pointer flex justify-between items-center">
                <span>Strategy</span>
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {strategyOptions.map(strategy => (
                  <DropdownMenuCheckboxItem
                    key={strategy}
                    checked={activeFilters.strategies.includes(strategy)}
                    onCheckedChange={() => {
                      if (activeFilters.strategies.includes(strategy)) {
                        handleRemoveTag(`strategies:${strategy}`);
                      } else {
                        handleAddFilter('strategies', strategy);
                      }
                    }}
                  >
                    {strategy}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full px-2 py-1.5 text-sm hover:bg-accent cursor-pointer flex justify-between items-center">
                <span>Outcome</span>
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => {
                  if (activeFilters.outcome === 'win') {
                    handleRemoveTag('outcome:win');
                  } else {
                    setActiveFilters(prev => ({...prev, outcome: 'win'}));
                    setActiveTags([...activeTags.filter(t => !t.startsWith('outcome:')), 'outcome:win']);
                  }
                }}>
                  <div className="flex items-center">
                    {activeFilters.outcome === 'win' && <Check size={14} className="mr-2" />}
                    <span className="ml-2">Win</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  if (activeFilters.outcome === 'loss') {
                    handleRemoveTag('outcome:loss');
                  } else {
                    setActiveFilters(prev => ({...prev, outcome: 'loss'}));
                    setActiveTags([...activeTags.filter(t => !t.startsWith('outcome:')), 'outcome:loss']);
                  }
                }}>
                  <div className="flex items-center">
                    {activeFilters.outcome === 'loss' && <Check size={14} className="mr-2" />}
                    <span className="ml-2">Loss</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                  if (activeFilters.outcome === 'be') {
                    handleRemoveTag('outcome:be');
                  } else {
                    setActiveFilters(prev => ({...prev, outcome: 'be'}));
                    setActiveTags([...activeTags.filter(t => !t.startsWith('outcome:')), 'outcome:be']);
                  }
                }}>
                  <div className="flex items-center">
                    {activeFilters.outcome === 'be' && <Check size={14} className="mr-2" />}
                    <span className="ml-2">Break Even</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full px-2 py-1.5 text-sm hover:bg-accent cursor-pointer flex justify-between items-center">
                <span>Grade</span>
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {gradeOptions.map(grade => (
                  <DropdownMenuCheckboxItem
                    key={grade}
                    checked={activeFilters.grades.includes(grade)}
                    onCheckedChange={() => {
                      if (activeFilters.grades.includes(grade)) {
                        handleRemoveTag(`grades:${grade}`);
                      } else {
                        handleAddFilter('grades', grade);
                      }
                    }}
                  >
                    {grade}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full px-2 py-1.5 text-sm hover:bg-accent cursor-pointer flex justify-between items-center">
                <span>Emotion</span>
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {emotionTags.map(emotion => (
                  <DropdownMenuCheckboxItem
                    key={emotion}
                    checked={activeFilters.emotions.includes(emotion)}
                    onCheckedChange={() => {
                      if (activeFilters.emotions.includes(emotion)) {
                        handleRemoveTag(`emotions:${emotion}`);
                      } else {
                        handleAddFilter('emotions', emotion);
                      }
                    }}
                  >
                    {emotion}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenuCheckboxItem
              checked={activeFilters.ruleViolation}
              onCheckedChange={handleRuleViolationsToggle}
            >
              Rule Violations
            </DropdownMenuCheckboxItem>
            
            <Separator className="my-1" />
            
            <DropdownMenuItem onClick={clearAllFilters}>
              Clear All Filters
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Select value={selectedPreset} onValueChange={handlePresetSelect}>
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Filter Presets" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="placeholder">Filter Presets</SelectItem>
            {presetFilters.map(preset => (
              <SelectItem key={preset} value={preset}>{preset}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button size="sm" variant="outline">Save as Preset</Button>
      </div>
      
      {activeTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {activeTags.map(tag => {
            const [category, value] = tag.split(':');
            return (
              <Badge 
                key={tag} 
                variant="outline" 
                className="flex items-center gap-1 px-2 py-1"
              >
                <span className="text-xs font-medium">{value}</span>
                <X 
                  size={14} 
                  className="cursor-pointer" 
                  onClick={() => handleRemoveTag(tag)}
                />
              </Badge>
            );
          })}
          {activeTags.length > 0 && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 px-2 text-xs"
              onClick={clearAllFilters}
            >
              Clear All
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
