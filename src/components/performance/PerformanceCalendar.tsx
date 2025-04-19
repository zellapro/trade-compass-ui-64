
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  { date: new Date(2025, 3, 30), pnl: 450, trades: 5, result: "win" }
];

// Helper function to get trading day data
const getTradingDayData = (date: Date) => {
  return tradingDayData.find(day => 
    day.date.getDate() === date.getDate() && 
    day.date.getMonth() === date.getMonth() && 
    day.date.getFullYear() === date.getFullYear()
  );
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
  
  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        onMonthChange={setSelectedMonth}
        className="border rounded-md p-3"
        modifiersClassNames={{
          selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
        }}
        components={{
          Day: ({ date, displayMonth, ...props }) => {
            const dayData = getTradingDayData(date);
            return (
              <div 
                {...props}
                className={cn(props.className as string, dayData && getDayClassName(date))}
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
        {selectedDate && getTradingDayData(selectedDate) ? (
          <div>
            <div className="font-medium">{format(selectedDate, "MMMM d, yyyy")}</div>
            <div className="mt-2 space-y-2">
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
          </div>
        ) : (
          <div className="text-center text-sm text-muted-foreground py-2">
            No trades recorded for this day
          </div>
        )}
      </div>
    </div>
  );
}
