
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar as CalendarIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { format, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { type DayProps } from "react-day-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const calendarData = [
  { date: new Date(2025, 3, 1), pnl: 150, trades: 2, isWin: true },
  { date: new Date(2025, 3, 2), pnl: -80, trades: 1, isWin: false },
  { date: new Date(2025, 3, 5), pnl: 220, trades: 3, isWin: true },
  { date: new Date(2025, 3, 8), pnl: 90, trades: 1, isWin: true },
  { date: new Date(2025, 3, 9), pnl: -120, trades: 2, isWin: false },
  { date: new Date(2025, 3, 12), pnl: 300, trades: 4, isWin: true },
  { date: new Date(2025, 3, 15), pnl: 75, trades: 1, isWin: true },
  { date: new Date(2025, 3, 16), pnl: -150, trades: 2, isWin: false },
  { date: new Date(2025, 3, 19), pnl: 415, trades: 3, isWin: true },
  { date: new Date(2025, 2, 15), pnl: 120, trades: 1, isWin: true },
  { date: new Date(2025, 2, 18), pnl: -90, trades: 2, isWin: false },
  { date: new Date(2025, 2, 20), pnl: 310, trades: 3, isWin: true },
  { date: new Date(2025, 2, 25), pnl: 200, trades: 2, isWin: true },
  { date: new Date(2025, 2, 29), pnl: -110, trades: 1, isWin: false },
  { date: new Date(2025, 4, 2), pnl: 180, trades: 2, isWin: true },
  { date: new Date(2025, 4, 5), pnl: -70, trades: 1, isWin: false },
  { date: new Date(2025, 4, 9), pnl: 250, trades: 2, isWin: true },
  { date: new Date(2025, 4, 12), pnl: 130, trades: 1, isWin: true },
  { date: new Date(2025, 4, 15), pnl: -90, trades: 2, isWin: false },
];

// Mock data for specific trades on a day
const dailyTradeData = {
  "2025-04-01": [
    { id: 1, symbol: "AAPL", entry: 185.25, exit: 188.50, pnl: 325, result: "win", time: "10:15 AM" },
    { id: 2, symbol: "MSFT", entry: 410.75, exit: 408.25, pnl: -175, result: "loss", time: "1:45 PM" }
  ],
  "2025-04-05": [
    { id: 3, symbol: "AMZN", entry: 178.30, exit: 182.40, pnl: 410, result: "win", time: "9:45 AM" },
    { id: 4, symbol: "NVDA", entry: 875.50, exit: 880.75, pnl: 525, result: "win", time: "11:20 AM" },
    { id: 5, symbol: "META", entry: 495.25, exit: 491.50, pnl: -375, result: "loss", time: "2:30 PM" }
  ],
  "2025-03-15": [
    { id: 6, symbol: "TSLA", entry: 173.40, exit: 175.20, pnl: 180, result: "win", time: "10:30 AM" }
  ],
  "2025-03-25": [
    { id: 7, symbol: "GOOGL", entry: 148.75, exit: 150.50, pnl: 175, result: "win", time: "11:10 AM" },
    { id: 8, symbol: "AMD", entry: 175.30, exit: 177.80, pnl: 250, result: "win", time: "2:15 PM" }
  ],
  "2025-05-02": [
    { id: 9, symbol: "NFLX", entry: 630.50, exit: 634.25, pnl: 375, result: "win", time: "9:50 AM" },
    { id: 10, symbol: "JPM", entry: 198.75, exit: 196.50, pnl: -225, result: "loss", time: "3:20 PM" }
  ]
};

const getTradingDayData = (date: Date) => {
  return calendarData.find(day => 
    day.date.getDate() === date.getDate() && 
    day.date.getMonth() === date.getMonth() && 
    day.date.getFullYear() === date.getFullYear()
  );
};

// Helper function to get trades for a specific day
const getTradesForDay = (date: Date) => {
  const dateStr = format(date, "yyyy-MM-dd");
  return dailyTradeData[dateStr as keyof typeof dailyTradeData] || [];
};

const dayClassName = (date: Date) => {
  const dayData = getTradingDayData(date);
  if (!dayData) return "";
  
  if (dayData.isWin) {
    return "bg-green-100 text-green-800 hover:bg-green-200";
  } else {
    return "bg-red-100 text-red-800 hover:bg-red-200";
  }
};

export function TradeCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<"month" | "year">("month");
  const tradesForSelectedDay = selectedDate ? getTradesForDay(selectedDate) : [];
  
  const toggleViewMode = () => {
    setViewMode(viewMode === "month" ? "year" : "month");
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Trading Calendar</span>
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 flex items-center gap-1"
            onClick={toggleViewMode}
          >
            {viewMode === "month" ? "Year View" : "Month View"}
          </Button>
        </div>
        <CardDescription>See your trading performance by day</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="border rounded-md"
          viewMode={viewMode}
          modifiersClassNames={{
            selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          }}
          modifiersStyles={{
            selected: {
              fontWeight: "bold"
            }
          }}
          components={{
            Day: ({ date, ...otherProps }: DayProps & React.HTMLAttributes<HTMLDivElement>) => {
              const dayData = getTradingDayData(date);
              return (
                <div 
                  {...otherProps} 
                  className={cn(otherProps.className, dayData && dayClassName(date))}
                >
                  {format(date, "d")}
                  {dayData && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 flex justify-center">
                      <span className="inline-block h-1 w-1 rounded-full bg-current"></span>
                    </div>
                  )}
                </div>
              );
            }
          }}
        />
        
        <div className="mt-4 p-3 border rounded-md">
          {selectedDate && (
            <div>
              <div className="font-medium">{format(selectedDate, "MMMM d, yyyy")}</div>
              
              {getTradingDayData(selectedDate) ? (
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Trades:</span>
                    <span className="font-medium">{getTradingDayData(selectedDate)?.trades}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>P&L:</span>
                    <span className={cn(
                      "font-medium",
                      getTradingDayData(selectedDate)?.isWin ? "text-green-600" : "text-red-600"
                    )}>
                      {getTradingDayData(selectedDate)?.isWin ? "+" : ""}{getTradingDayData(selectedDate)?.pnl}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Result:</span>
                    <span className={cn(
                      "font-medium",
                      getTradingDayData(selectedDate)?.isWin ? "text-green-600" : "text-red-600"
                    )}>
                      {getTradingDayData(selectedDate)?.isWin ? "Winning Day" : "Losing Day"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">No trading data for this day</p>
                </div>
              )}
              
              {tradesForSelectedDay.length > 0 ? (
                <div className="mt-4 border-t pt-4">
                  <Collapsible defaultOpen>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Trades for this day</h4>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      <ScrollArea className="h-[150px]">
                        <div className="space-y-2">
                          {tradesForSelectedDay.map((trade) => (
                            <div key={trade.id} className="border rounded-md p-2 flex justify-between items-center">
                              <div>
                                <div className="font-medium">{trade.symbol}</div>
                                <div className="text-xs text-muted-foreground">{trade.time}</div>
                              </div>
                              <div className="text-right">
                                <div className={cn(
                                  "font-medium",
                                  trade.result === "win" ? "text-green-600" : "text-red-600"
                                )}>
                                  {trade.pnl >= 0 ? "+" : ""}${trade.pnl}
                                </div>
                                <div className="text-xs">
                                  Entry: ${trade.entry} → Exit: ${trade.exit}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              ) : getTradingDayData(selectedDate) && (
                <div className="text-center text-sm text-muted-foreground py-2 mt-4 border-t pt-4">
                  Trade details not available
                </div>
              )}
              
              {tradesForSelectedDay.length > 0 && (
                <div className="flex justify-end mt-3">
                  <Button variant="outline" size="sm" className="text-xs">
                    View in Journal
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs ml-2">
                    Replay Trades
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
