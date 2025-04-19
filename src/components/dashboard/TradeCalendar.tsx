
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Sample data for the calendar
const tradeData = {
  "2025-04-01": { result: "win", pnl: 250, trades: 3 },
  "2025-04-02": { result: "win", pnl: 150, trades: 2 },
  "2025-04-03": { result: "loss", pnl: -100, trades: 2 },
  "2025-04-04": { result: "win", pnl: 80, trades: 1 },
  "2025-04-05": { result: "neutral", pnl: 0, trades: 1 },
  "2025-04-08": { result: "win", pnl: 320, trades: 4 },
  "2025-04-09": { result: "loss", pnl: -130, trades: 2 },
  "2025-04-10": { result: "win", pnl: 180, trades: 2 },
  "2025-04-11": { result: "win", pnl: 90, trades: 1 },
  "2025-04-12": { result: "loss", pnl: -200, trades: 3 },
  "2025-04-15": { result: "win", pnl: 220, trades: 2 },
  "2025-04-16": { result: "neutral", pnl: 10, trades: 2 },
  "2025-04-17": { result: "win", pnl: 130, trades: 1 },
  "2025-04-18": { result: "win", pnl: 270, trades: 3 },
  "2025-04-19": { result: "loss", pnl: -150, trades: 2 },
};

export function TradeCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Format date to match the tradeData keys
  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const dayData = formattedDate in tradeData ? tradeData[formattedDate as keyof typeof tradeData] : null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Trading Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="mx-auto"
          classNames={{
            day_selected: "",
            day: (date) => {
              const formattedDay = format(date, "yyyy-MM-dd");
              if (formattedDay in tradeData) {
                const dayResult = tradeData[formattedDay as keyof typeof tradeData].result;
                return cn(
                  "hover:bg-accent relative",
                  {
                    "bg-trading-green-light text-trading-green-dark": dayResult === "win",
                    "bg-trading-red-light text-trading-red-dark": dayResult === "loss",
                    "bg-trading-gray-light text-trading-gray-dark": dayResult === "neutral",
                  }
                );
              }
              return "";
            },
          }}
          components={{
            DayContent: (props) => {
              const formattedDay = format(props.date, "yyyy-MM-dd");
              const hasData = formattedDay in tradeData;
              
              if (!hasData) {
                return <div>{props.date.getDate()}</div>;
              }
              
              return (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="w-full h-full flex items-center justify-center">
                      {props.date.getDate()}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{format(props.date, "MMMM d, yyyy")}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">P&L:</p>
                          <p className={cn(
                            "font-medium",
                            {
                              "text-trading-green": tradeData[formattedDay as keyof typeof tradeData].pnl > 0,
                              "text-trading-red": tradeData[formattedDay as keyof typeof tradeData].pnl < 0,
                            }
                          )}>
                            ${tradeData[formattedDay as keyof typeof tradeData].pnl}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Trades:</p>
                          <p className="font-medium">
                            {tradeData[formattedDay as keyof typeof tradeData].trades}
                          </p>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            },
          }}
        />
        
        {dayData && (
          <div className="mt-4 p-3 border rounded-md">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{formattedDate}</h3>
              <span className={cn(
                "text-sm font-medium px-2 py-0.5 rounded-full",
                {
                  "bg-trading-green-light text-trading-green-dark": dayData.result === "win",
                  "bg-trading-red-light text-trading-red-dark": dayData.result === "loss",
                  "bg-trading-gray-light text-trading-gray-dark": dayData.result === "neutral",
                }
              )}>
                {dayData.result === "win" ? "Profitable" : dayData.result === "loss" ? "Loss" : "Neutral"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div>
                <p className="text-muted-foreground">P&L:</p>
                <p className={cn(
                  "font-medium",
                  {
                    "text-trading-green": dayData.pnl > 0,
                    "text-trading-red": dayData.pnl < 0,
                  }
                )}>
                  ${dayData.pnl}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Trades:</p>
                <p className="font-medium">{dayData.trades}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
