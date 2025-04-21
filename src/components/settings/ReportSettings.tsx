
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, TrendingUp, Target, ChevronsUpDown, Upload, ArrowUpDown, Percent, DollarSign, Clock, LayoutGrid } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface ReportSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const ReportSettings: React.FC<ReportSettingsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const [defaultView, setDefaultView] = useState("weekly");
  
  const handleDefaultViewChange = (value: string) => {
    setDefaultView(value);
    onSettingChange();
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>Customize how your trading performance reports are displayed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base mb-2 block">Default Report View</Label>
            <div className="grid grid-cols-4 gap-4">
              <div 
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer ${defaultView === 'daily' ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => handleDefaultViewChange('daily')}
              >
                <Clock className="h-6 w-6 text-muted-foreground mb-2" />
                <span className="font-medium">Daily</span>
              </div>
              
              <div 
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer ${defaultView === 'weekly' ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => handleDefaultViewChange('weekly')}
              >
                <Calendar className="h-6 w-6 text-muted-foreground mb-2" />
                <span className="font-medium">Weekly</span>
              </div>
              
              <div 
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer ${defaultView === 'monthly' ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => handleDefaultViewChange('monthly')}
              >
                <BarChart3 className="h-6 w-6 text-muted-foreground mb-2" />
                <span className="font-medium">Monthly</span>
              </div>
              
              <div 
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer ${defaultView === 'ytd' ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => handleDefaultViewChange('ytd')}
              >
                <TrendingUp className="h-6 w-6 text-muted-foreground mb-2" />
                <span className="font-medium">YTD</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-base mb-2 block">Prioritized Metrics</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Select which metrics should be displayed prominently in reports
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <Checkbox id="metric-pnl" defaultChecked onCheckedChange={onSettingChange} />
                <Label htmlFor="metric-pnl" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Net P&L</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <Checkbox id="metric-win-rate" defaultChecked onCheckedChange={onSettingChange} />
                <Label htmlFor="metric-win-rate" className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <span>Win Rate</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <Checkbox id="metric-avg-rr" defaultChecked onCheckedChange={onSettingChange} />
                <Label htmlFor="metric-avg-rr" className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <span>Avg. Risk/Reward</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <Checkbox id="metric-profit-factor" onCheckedChange={onSettingChange} />
                <Label htmlFor="metric-profit-factor" className="flex items-center gap-2">
                  <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                  <span>Profit Factor</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <Checkbox id="metric-max-drawdown" onCheckedChange={onSettingChange} />
                <Label htmlFor="metric-max-drawdown" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span>Max Drawdown</span>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <Checkbox id="metric-trade-volume" onCheckedChange={onSettingChange} />
                <Label htmlFor="metric-trade-volume" className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                  <span>Trade Volume</span>
                </Label>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-base mb-2 block">Performance Goals</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Set targets for your trading performance
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="goal-pnl" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>Monthly P&L Target</span>
                  </Label>
                  <div className="flex mt-1">
                    <div className="flex items-center justify-center bg-muted px-3 border rounded-l-md">
                      <span>$</span>
                    </div>
                    <Input 
                      id="goal-pnl"
                      type="number" 
                      placeholder="e.g., 5000" 
                      className="rounded-l-none"
                      onChange={onSettingChange} 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="goal-win-rate" className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                    <span>Win Rate Target</span>
                  </Label>
                  <div className="flex mt-1">
                    <Input 
                      id="goal-win-rate"
                      type="number" 
                      placeholder="e.g., 60" 
                      className="rounded-r-none"
                      onChange={onSettingChange} 
                    />
                    <div className="flex items-center justify-center bg-muted px-3 border rounded-r-md">
                      <span>%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="goal-rr" className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                    <span>Avg. Risk/Reward Target</span>
                  </Label>
                  <div className="flex mt-1">
                    <Input 
                      id="goal-rr"
                      type="number" 
                      step="0.1"
                      placeholder="e.g., 2.0" 
                      onChange={onSettingChange} 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="goal-trade-count" className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                    <span>Monthly Trade Goal</span>
                  </Label>
                  <div className="flex mt-1">
                    <Input 
                      id="goal-trade-count"
                      type="number" 
                      placeholder="e.g., 100" 
                      onChange={onSettingChange} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div>
                  <Label htmlFor="show-goals-dashboard">Show Goals on Dashboard</Label>
                  <p className="text-sm text-muted-foreground">
                    Display progress towards your trading goals on the dashboard
                  </p>
                </div>
                <Switch id="show-goals-dashboard" defaultChecked onChange={onSettingChange} />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-base mb-2 block">Comparison Settings</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Configure how performance is compared between periods
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="comparison-type">Compare Current Period To</Label>
                <Select defaultValue="previous" onValueChange={onSettingChange}>
                  <SelectTrigger id="comparison-type" className="mt-1">
                    <SelectValue placeholder="Select comparison type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="previous">Previous Period</SelectItem>
                    <SelectItem value="peak">Peak Period</SelectItem>
                    <SelectItem value="average">All-Time Average</SelectItem>
                    <SelectItem value="year-ago">Same Period Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div>
                  <Label htmlFor="highlight-improvements">Highlight Improvements</Label>
                  <p className="text-sm text-muted-foreground">
                    Emphasize metrics that have improved compared to the selected period
                  </p>
                </div>
                <Switch id="highlight-improvements" defaultChecked onChange={onSettingChange} />
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div>
                  <Label htmlFor="show-percentage-change">Show Percentage Change</Label>
                  <p className="text-sm text-muted-foreground">
                    Display percentage change alongside absolute values
                  </p>
                </div>
                <Switch id="show-percentage-change" defaultChecked onChange={onSettingChange} />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-base mb-2 block">Export Branding</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Customize the appearance of exported reports
            </p>
            
            <div className="flex items-center gap-4">
              <div className="border rounded-lg p-4 w-32 h-24 flex items-center justify-center bg-muted">
                <p className="text-sm text-muted-foreground">Your Logo</p>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Logo</span>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Recommended size: 300x150px, PNG or SVG format
                </p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="report-title">Custom Report Title</Label>
                <Input 
                  id="report-title" 
                  placeholder="Trading Performance Report" 
                  className="mt-1"
                  onChange={onSettingChange} 
                />
              </div>
              
              <div>
                <Label htmlFor="trader-name">Trader Name</Label>
                <Input 
                  id="trader-name" 
                  placeholder="John Doe" 
                  className="mt-1"
                  onChange={onSettingChange} 
                />
              </div>
            </div>
          </div>
          
          {saveResetButtons}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportSettings;
