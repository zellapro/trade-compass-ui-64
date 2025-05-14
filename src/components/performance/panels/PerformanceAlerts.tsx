
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, X, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PerformanceAlerts() {
  // Mock data for alerts
  const alerts = [
    {
      id: 1,
      type: "warning",
      message: "You've broken your checklist adherence 3 trades in a row",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "info",
      message: "Your afternoon trading performance (after 2pm) is 18% lower than morning sessions",
      time: "1 day ago"
    },
    {
      id: 3,
      type: "warning",
      message: "Position sizing inconsistency detected in your last 5 trades",
      time: "2 days ago"
    },
    {
      id: 4,
      type: "info",
      message: "You're consistently performing better with Breakout strategy than Pullback",
      time: "5 days ago"
    }
  ];
  
  const getAlertIcon = (type: string) => {
    switch(type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <Bell className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg font-medium">AI Performance Alerts</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map(alert => (
            <div 
              key={alert.id} 
              className="flex items-start gap-3 p-3 rounded-lg border border-muted bg-muted/20"
            >
              <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
              
              <div className="flex-1">
                <p className="text-sm">{alert.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {alert.time}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Clock className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {alerts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No alerts at the moment. We'll notify you when we detect patterns.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
