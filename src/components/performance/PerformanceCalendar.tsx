
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { type DayProps } from "react-day-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PerformanceCalendarProps {
  timeframe: string;
}

// Mock data for trading days
const tradingDayData = [
  { date: new Date(2025, 3, 1), pnl: 150, trades: 2, result: "win" },
  { date: new Date(2025, 3, 2), pnl: -80, trades: 1, result: "loss" },
  { date: new Date(2025, 3, 5), pnl: 220, trades: 3, result: "win" },
  { date: new Date(2025, 3, 8), pnl: 90, trades: 1, result: "win" },
  { date: new Date(2025, 3, 9), pnl: -120, trades: 2, result: "loss" },
  { date: new Date(2025, 3, 12), pnl: 300, trades: 4, result: "win" },
  { date: new Date(2025, 3, 15), pnl: 75, trades: 1, result: "win" },
  { date: new Date(2025, 3, 16), pnl: -150, trades: 2, result: "loss" },
  { date: new Date(2025, 3, 19), pnl: 415, trades: 3, result: "win" },
  { date: new Date(2025, 3, 20), pnl: 10, trades: 1, result: "breakeven" },
  { date: new Date(2025, 3, 22), pnl: -95, trades: 2, result: "loss" },
  { date: new Date(2025, 3, 23), pnl: 180, trades: 3, result: "win" },
  { date: new Date(2025, 3, 26), pnl: 260, trades: 4, result: "win" },
  { date: new Date(2025, 3, 27), pnl: 185, trades: 2, result: "win" },
  { date: new Date(2025, 3, 29), pnl: -110, trades: 1, result: "loss" },
  { date: new Date(2025, 3, 30), pnl: 450, trades: 5, result: "win" },
  // Additional mock data throughout the year
  { date: new Date(2025, 0, 15), pnl: 230, trades: 3, result: "win" },
  { date: new Date(2025, 1, 5), pnl: -90, trades: 2, result: "loss" },
  { date: new Date(2025, 1, 20), pnl: 310, trades: 4, result: "win" },
  { date: new Date(2025, 2, 10), pnl: 175, trades: 3, result: "win" },
  { date: new Date(2025, 2, 25), pnl: -120, trades: 2, result: "loss" },
  { date: new Date(2025, 4, 12), pnl: 280, trades: 3, result: "win" },
  { date: new Date(2025, 4, 18), pnl: -75, trades: 1, result: "loss" },
  { date: new Date(2025, 5, 2), pnl: 190, trades: 2, result: "win" },
  { date: new Date(2025, 5, 28), pnl: 320, trades: 4, result: "win" },
  { date: new Date(2025, 6, 15), pnl: -110, trades: 2, result: "loss" },
  { date: new Date(2025, 7, 8), pnl: 245, trades: 3, result: "win" },
  { date: new Date(2025, 8, 17), pnl: -60, trades: 1, result: "loss" },
  { date: new Date(2025, 9, 6), pnl: 290, trades: 3, result: "win" },
  { date: new Date(2025, 10, 22), pnl: 350, trades: 4, result: "win" },
  { date: new Date(2025, 11, 15), pnl: -130, trades: 2, result: "loss" }
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
  "2025-01-15": [
    { id: 6, symbol: "TSLA", entry: 225.75, exit: 230.50, pnl: 475, result: "win", time: "10:30 AM" },
    { id: 7, symbol: "GOOGL", entry: 152.25, exit: 154.75, pnl: 250, result: "win", time: "1:15 PM" },
    { id: 8, symbol: "AMD", entry: 168.50, exit: 166.75, pnl: -175, result: "loss", time: "3:30 PM" }
  ],
  // Add more mock trade data for various days
};

// Helper function to get trading day data
const getTradingDayData = (date: Date) => {
  return tradingDayData.find(day => 
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

// Helper function for day class names
const getDayClassName = (date: Date) => {
  const dayData = getTradingDayData(date);
  if (!dayData) return "";
  
  if (dayData.result === "win") {
    return "bg-green-100 text-green-800 hover:bg-green-200";
  } else if (dayData.result === "loss") {
    return "bg-red-100 text-red-800 hover:bg-red-200";
  } else {
    return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
  }
};

export function PerformanceCalendar({ timeframe }: PerformanceCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"year" | "month">("year");
  const currentYear = new Date().getFullYear();
  const tradesForSelectedDay = selectedDate ? getTradesForDay(selectedDate) : [];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">{viewMode === "year" ? `${currentYear} Calendar` : format(selectedMonth, "MMMM yyyy")}</h3>
        <div className="flex gap-2">
          <button 
            className={cn(
              "px-3 py-1 text-sm rounded-md", 
              viewMode === "month" ? "bg-primary text-white" : "bg-muted"
            )}
            onClick={() => setViewMode("month")}
          >
            Month
          </button>
          <button 
            className={cn(
              "px-3 py-1 text-sm rounded-md", 
              viewMode === "year" ? "bg-primary text-white" : "bg-muted"
            )}
            onClick={() => setViewMode("year")}
          >
            Year
          </button>
        </div>
      </div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        onMonthChange={setSelectedMonth}
        numberOfMonths={viewMode === "year" ? 12 : 1}
        className="border rounded-md p-3"
        modifiersClassNames={{
          selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
        }}
        components={{
          Day: ({ date, ...otherProps }: DayProps & React.HTMLAttributes<HTMLDivElement>) => {
            const dayData = getTradingDayData(date);
            return (
              <div 
                {...otherProps}
                className={cn(otherProps.className, dayData && getDayClassName(date))}
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
      
      <Card className="mt-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a day"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDate && getTradingDayData(selectedDate) ? (
            <div>
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Trades:</span>
                  <span className="font-medium">{getTradingDayData(selectedDate)?.trades}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>P&L:</span>
                  <span className={cn(
                    "font-medium",
                    getTradingDayData(selectedDate)?.result === "win" ? "text-green-600" : 
                    getTradingDayData(selectedDate)?.result === "loss" ? "text-red-600" : 
                    "text-yellow-600"
                  )}>
                    {getTradingDayData(selectedDate)?.pnl >= 0 ? "+" : ""}${getTradingDayData(selectedDate)?.pnl}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Result:</span>
                  <span className={cn(
                    "font-medium",
                    getTradingDayData(selectedDate)?.result === "win" ? "text-green-600" : 
                    getTradingDayData(selectedDate)?.result === "loss" ? "text-red-600" : 
                    "text-yellow-600"
                  )}>
                    {getTradingDayData(selectedDate)?.result === "win" ? "Winning Day" : 
                     getTradingDayData(selectedDate)?.result === "loss" ? "Losing Day" : 
                     "Breakeven Day"}
                  </span>
                </div>
              </div>
              
              {tradesForSelectedDay.length > 0 ? (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium mb-3">Trades for this day</h4>
                  <ScrollArea className="h-[200px] pr-2">
                    <div className="space-y-2">
                      {tradesForSelectedDay.map((trade) => (
                        <div key={trade.id} className="border rounded-md p-3 flex justify-between items-center">
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
                            <div className="text-xs flex items-center gap-1">
                              Entry: ${trade.entry} → Exit: ${trade.exit}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ) : (
                <div className="mt-4 border-t pt-4 text-center text-sm text-muted-foreground py-8">
                  No detailed trade data available for this day
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground py-8">
              {selectedDate ? "No trades recorded for this day" : "Select a day to view trades"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
