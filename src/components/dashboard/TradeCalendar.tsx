
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const calendarData = [
  { date: new Date(2025, 3, 1), pnl: 150, trades: 2, isWin: true },
  { date: new Date(2025, 3, 2), pnl: -80, trades: 1, isWin: false },
  { date: new Date(2025, 3, 5), pnl: 220, trades: 3, isWin: true },
  { date: new Date(2025, 3, 8), pnl: 90, trades: 1, isWin: true },
  { date: new Date(2025, 3, 9), pnl: -120, trades: 2, isWin: false },
  { date: new Date(2025, 3, 12), pnl: 300, trades: 4, isWin: true },
  { date: new Date(2025, 3, 15), pnl: 75, trades: 1, isWin: true },
  { date: new Date(2025, 3, 16), pnl: -150, trades: 2, isWin: false },
  { date: new Date(2025, 3, 19), pnl: 415, trades: 3, isWin: true }
];

const getTradingDayData = (date: Date) => {
  return calendarData.find(day => 
    day.date.getDate() === date.getDate() && 
    day.date.getMonth() === date.getMonth() && 
    day.date.getFullYear() === date.getFullYear()
  );
};

export function TradeCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const dayClassName = (date: Date) => {
    const dayData = getTradingDayData(date);
    if (!dayData) return "";
    
    if (dayData.isWin) {
      return "bg-green-100 text-green-800 hover:bg-green-200";
    } else {
      return "bg-red-100 text-red-800 hover:bg-red-200";
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          <span>Trading Calendar</span>
        </CardTitle>
        <CardDescription>See your trading performance by day</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="border rounded-md p-3"
          modifiersClassNames={{
            selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          }}
          modifiersStyles={{
            selected: {
              fontWeight: "bold"
            }
          }}
          components={{
            Day: ({ date, displayMonth, ...props }) => {
              const dayData = getTradingDayData(date);
              return (
                <div 
                  {...props} 
                  className={cn(props.className || "", dayData && dayClassName(date))}
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
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground py-2">
              No trades recorded for this day
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
