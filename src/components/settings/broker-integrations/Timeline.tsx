
import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface TimelineEvent {
  id: string;
  date: string;
  status: 'success' | 'error' | 'pending';
  details: string;
  broker: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No import history available.
      </div>
    );
  }
  
  // Format date to be more human-readable
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, yyyy 'at' h:mm a");
    } catch (e) {
      return "Unknown date";
    }
  };
  
  // Get the event icon based on status
  const getEventIcon = (status: 'success' | 'error' | 'pending') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };

  // Get color classes based on status
  const getStatusClasses = (status: 'success' | 'error' | 'pending') => {
    switch (status) {
      case 'success':
        return "bg-green-500/20 border-green-500";
      case 'error':
        return "bg-red-500/20 border-red-500";
      case 'pending':
        return "bg-amber-500/20 border-amber-500";
    }
  };

  return (
    <ol className="relative">
      {events.map((event, index) => (
        <motion.li 
          key={event.id}
          className={cn(
            "mb-6 ml-6",
            index === events.length - 1 ? "mb-0" : ""
          )}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <span 
            className={cn(
              "absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-background",
              getStatusClasses(event.status)
            )}
          >
            {getEventIcon(event.status)}
          </span>
          <div className="p-4 bg-muted/30 rounded-lg border border-muted">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-medium text-primary-foreground">{event.broker}</h3>
              <time className="text-xs text-muted-foreground">{formatDate(event.date)}</time>
            </div>
            <p className="text-sm text-foreground/80">
              {event.details}
            </p>
          </div>
          {index !== events.length - 1 && (
            <div className="absolute h-full w-0.5 bg-muted left-0 top-6"></div>
          )}
        </motion.li>
      ))}
    </ol>
  );
};
