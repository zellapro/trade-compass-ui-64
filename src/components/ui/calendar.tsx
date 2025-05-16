
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type NavigationState, DayPickerNavigationProps } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  mode?: "single" | "multiple" | "range" | "default";
  viewMode?: "month" | "year";
};

const YearPicker = ({
  month,
  onMonthChange,
  className,
  disabled,
}: {
  month: Date;
  onMonthChange: (month: Date) => void;
  className?: string;
  disabled?: boolean;
}) => {
  const currentYear = month.getFullYear();
  
  const handleMonthSelect = (monthIndex: number) => {
    const newMonth = new Date(currentYear, monthIndex);
    onMonthChange(newMonth);
  };
  
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  return (
    <div className={cn("grid grid-cols-3 gap-2", className)}>
      {months.map((monthName, index) => {
        const isCurrentMonth = month.getMonth() === index;
        return (
          <button
            key={monthName}
            onClick={() => handleMonthSelect(index)}
            disabled={disabled}
            className={cn(
              "text-sm py-2 px-1 rounded-md",
              isCurrentMonth 
                ? "bg-primary text-primary-foreground font-medium" 
                : "hover:bg-muted",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {monthName}
          </button>
        );
      })}
    </div>
  );
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  numberOfMonths = 1,
  viewMode = "month",
  mode = "single",
  ...props
}: CalendarProps) {
  const [currentViewMode, setCurrentViewMode] = React.useState<"month" | "year">(viewMode);
  const [month, setMonth] = React.useState<Date>(props.defaultMonth || new Date());

  // Sync with props
  React.useEffect(() => {
    setCurrentViewMode(viewMode);
  }, [viewMode]);

  if (currentViewMode === "year") {
    return (
      <div className={cn("p-3 space-y-4", className)}>
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              setMonth(new Date(month.getFullYear() - 1, month.getMonth()));
            }}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Year</span>
          </button>
          <div className="text-sm font-medium">
            {month.getFullYear()}
          </div>
          <button
            onClick={() => {
              setMonth(new Date(month.getFullYear() + 1, month.getMonth()));
            }}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            )}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Year</span>
          </button>
        </div>
        <YearPicker 
          month={month} 
          onMonthChange={(newMonth) => {
            setMonth(newMonth);
            setCurrentViewMode("month");
          }}
        />
        <button
          onClick={() => setCurrentViewMode("month")}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center mt-2"
        >
          Back to Month View
        </button>
      </div>
    );
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      numberOfMonths={numberOfMonths}
      className={cn("p-3 pointer-events-auto", className)}
      month={month}
      onMonthChange={setMonth}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      footer={
        <button
          onClick={() => setCurrentViewMode("year")}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center mt-2"
        >
          Show Year View
        </button>
      }
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
