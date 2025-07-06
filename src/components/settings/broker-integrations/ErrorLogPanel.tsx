
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, HelpCircle } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ErrorLog {
  id: string;
  timestamp: string;
  broker: string;
  message: string;
  suggestion: string;
  severity: 'high' | 'medium' | 'low';
}

interface ErrorLogPanelProps {
  errors: ErrorLog[];
}

export const ErrorLogPanel: React.FC<ErrorLogPanelProps> = ({ errors }) => {
  if (errors.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Error Logs</CardTitle>
          <CardDescription>No integration errors to display</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="rounded-full bg-green-500/10 p-3 mb-4">
              <HelpCircle className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-center text-muted-foreground">All broker connections are healthy. No error logs to display.</p>
          </div>
        </CardContent>
      </Card>
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

  // Get severity badge
  const getSeverityBadge = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            High
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            Medium
          </Badge>
        );
      case 'low':
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            Low
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Error Logs</CardTitle>
          <CardDescription>Broker connection and sync error logs</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>Export Logs</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {errors.map((error, index) => (
          <motion.div
            key={error.id}
            className="p-4 border rounded-md bg-muted/20 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{error.broker}</h3>
                {getSeverityBadge(error.severity)}
              </div>
              <time className="text-xs text-muted-foreground">
                {formatDate(error.timestamp)}
              </time>
            </div>
            <p className="text-sm mb-3">{error.message}</p>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">Suggested Fix:</span>
                <span className="text-xs text-muted-foreground">{error.suggestion}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <HelpCircle className="h-4 w-4" />
                      <span className="sr-only">Get Help</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent align="end">
                    <p className="max-w-xs">View troubleshooting guide for this error</p>
                  </TooltipContent>
                </Tooltip>
                <Button variant="link" size="sm" className="h-7 px-2 text-blue-500">
                  Resolve
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};
