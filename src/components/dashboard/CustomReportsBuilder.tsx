
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CustomReportsBuilder() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Custom Reports Builder</CardTitle>
        <CardDescription>
          Create custom reports based on your trading data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select defaultValue="performance">
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="strategy">Strategy Analysis</SelectItem>
                  <SelectItem value="risk">Risk Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select defaultValue="month">
                <SelectTrigger>
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Generate Report</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
