
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CheckIcon, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export function FilterPanel() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Mock data
  const symbols = ["AAPL", "MSFT", "TSLA", "NVDA", "AMZN", "GOOG", "META", "SPY"];
  const strategies = ["Bull Flag", "VWAP Bounce", "Reversal", "Breakout", "VWAP Rejection"];
  const sessions = ["Pre-market", "Regular Hours", "Power Hour", "After Hours"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const tags = ["#GoodEntry", "#BadExit", "#FOMO", "#Revenge", "#Patience", "#Impulsive"];
  
  // Handle toggle for multi-select items
  const toggleItem = (item: string, currentItems: string[], setItems: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentItems.includes(item)) {
      setItems(currentItems.filter(i => i !== item));
    } else {
      setItems([...currentItems, item]);
    }
  };
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="mb-2 block">Date Range</Label>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Start Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <span>to</span>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "End Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="mt-4">
              <Label className="mb-2 block">P&L Range</Label>
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="Min P&L" className="w-full" />
                <span>to</span>
                <Input type="number" placeholder="Max P&L" className="w-full" />
              </div>
            </div>
          </div>
          
          <div>
            <Label className="mb-2 block">Symbols</Label>
            <div className="flex flex-wrap gap-1 border rounded-md p-2 h-20 overflow-y-auto">
              {symbols.map((symbol) => (
                <Badge 
                  key={symbol}
                  variant={selectedSymbols.includes(symbol) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleItem(symbol, selectedSymbols, setSelectedSymbols)}
                >
                  {symbol}
                  {selectedSymbols.includes(symbol) && (
                    <CheckIcon className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
            
            <div className="mt-4">
              <Label className="mb-2 block">Strategies</Label>
              <div className="flex flex-wrap gap-1 border rounded-md p-2 h-20 overflow-y-auto">
                {strategies.map((strategy) => (
                  <Badge 
                    key={strategy}
                    variant={selectedStrategies.includes(strategy) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleItem(strategy, selectedStrategies, setSelectedStrategies)}
                  >
                    {strategy}
                    {selectedStrategies.includes(strategy) && (
                      <CheckIcon className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <Label className="mb-2 block">Sessions</Label>
            <div className="space-y-2">
              {sessions.map((session) => (
                <div key={session} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`session-${session}`} 
                    checked={selectedSessions.includes(session)}
                    onCheckedChange={() => toggleItem(session, selectedSessions, setSelectedSessions)}
                  />
                  <label
                    htmlFor={`session-${session}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {session}
                  </label>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Label className="mb-2 block">Days of Week</Label>
              <div className="flex flex-wrap gap-1">
                {days.map((day) => (
                  <Badge 
                    key={day}
                    variant={selectedDays.includes(day) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleItem(day, selectedDays, setSelectedDays)}
                  >
                    {day.substring(0, 3)}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <Label className="mb-2 block">Tags</Label>
              <div className="flex flex-wrap gap-1 border rounded-md p-2 h-10 overflow-y-auto">
                {tags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleItem(tag, selectedTags, setSelectedTags)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline">Reset</Button>
          <Button>Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
}
