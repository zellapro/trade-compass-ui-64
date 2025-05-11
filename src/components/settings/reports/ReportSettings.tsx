
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Clock, LineChart, BarChart, Save, Upload } from "lucide-react";

export default function ReportSettings({ onSettingChange }: { onSettingChange: () => void }) {
  const [metrics, setMetrics] = useState({
    winRate: true,
    profitLoss: true,
    riskReward: true,
    holdingTime: true,
    maxDrawdown: true,
  });

  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeTradeList, setIncludeTradeList] = useState(true);
  const [defaultView, setDefaultView] = useState("custom");
  const [compareTo, setCompareTo] = useState("previous");

  // Goal settings
  const [monthlyGoal, setMonthlyGoal] = useState("2000");
  const [winRateGoal, setWinRateGoal] = useState("60");
  const [riskRewardGoal, setRiskRewardGoal] = useState("2.5");
  const [consistencyGoal, setConsistencyGoal] = useState("80");

  const handleSave = () => {
    console.log("Saving report settings");
    onSettingChange();
    // Here you would save the settings to your backend
  };

  const handleMetricToggle = (metric: keyof typeof metrics) => {
    setMetrics((prev) => ({ ...prev, [metric]: !prev[metric] }));
    onSettingChange();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Report Settings</h2>
        <p className="text-muted-foreground mb-6">
          Configure how your trading reports are generated and displayed
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Default Report View</h3>
            <Select value={defaultView} onValueChange={(value) => {
              setDefaultView(value);
              onSettingChange();
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a default view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="custom">Custom Date Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Prioritized Metrics</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop to reorder metrics by importance. Toggle to show/hide
            </p>
            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">
                        <ArrowUpDown size={16} />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <Clock size={18} className="text-blue-500" />
                          <span className="font-medium">Win Rate</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Percentage of winning trades</p>
                      </div>
                    </div>
                    <Switch
                      checked={metrics.winRate}
                      onCheckedChange={() => handleMetricToggle("winRate")}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">
                        <ArrowUpDown size={16} />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 font-bold">$</span>
                          <span className="font-medium">Profit/Loss</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Total profit or loss amount</p>
                      </div>
                    </div>
                    <Switch
                      checked={metrics.profitLoss}
                      onCheckedChange={() => handleMetricToggle("profitLoss")}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">
                        <ArrowUpDown size={16} />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <LineChart size={18} className="text-purple-500" />
                          <span className="font-medium">Risk/Reward Ratio</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Average risk to reward ratio</p>
                      </div>
                    </div>
                    <Switch
                      checked={metrics.riskReward}
                      onCheckedChange={() => handleMetricToggle("riskReward")}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">
                        <ArrowUpDown size={16} />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <Clock size={18} className="text-amber-500" />
                          <span className="font-medium">Avg. Holding Time</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Average time in trade</p>
                      </div>
                    </div>
                    <Switch
                      checked={metrics.holdingTime}
                      onCheckedChange={() => handleMetricToggle("holdingTime")}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground">
                        <ArrowUpDown size={16} />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <BarChart size={18} className="text-red-500" />
                          <span className="font-medium">Max Drawdown</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Maximum account drawdown</p>
                      </div>
                    </div>
                    <Switch
                      checked={metrics.maxDrawdown}
                      onCheckedChange={() => handleMetricToggle("maxDrawdown")}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Goal Setting</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm mb-2">Monthly Profit Goal ($)</p>
                <Input 
                  type="number" 
                  value={monthlyGoal} 
                  onChange={(e) => {
                    setMonthlyGoal(e.target.value);
                    onSettingChange();
                  }}
                  placeholder="Enter monthly profit goal" 
                />
              </div>
              <div>
                <p className="text-sm mb-2">Win Rate Goal (%)</p>
                <Input 
                  type="number" 
                  value={winRateGoal}
                  min="0"
                  max="100"
                  onChange={(e) => {
                    setWinRateGoal(e.target.value);
                    onSettingChange();
                  }}
                  placeholder="Enter win rate goal" 
                />
              </div>
              <div>
                <p className="text-sm mb-2">Risk/Reward Goal</p>
                <Input 
                  type="number" 
                  value={riskRewardGoal}
                  step="0.1"
                  onChange={(e) => {
                    setRiskRewardGoal(e.target.value);
                    onSettingChange();
                  }}
                  placeholder="Enter risk/reward goal" 
                />
              </div>
              <div>
                <p className="text-sm mb-2">Consistency Score Goal (%)</p>
                <Input 
                  type="number" 
                  value={consistencyGoal}
                  min="0"
                  max="100"
                  onChange={(e) => {
                    setConsistencyGoal(e.target.value);
                    onSettingChange();
                  }}
                  placeholder="Enter consistency score goal" 
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Comparison Settings</h3>
            <Select value={compareTo} onValueChange={(value) => {
              setCompareTo(value);
              onSettingChange();
            }}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select comparison period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="previous">Previous Period</SelectItem>
                <SelectItem value="lastweek">Last Week</SelectItem>
                <SelectItem value="lastmonth">Last Month</SelectItem>
                <SelectItem value="lastquarter">Last Quarter</SelectItem>
                <SelectItem value="lastyear">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">PDF Export Settings</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm mb-2">Report Logo</p>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-12 border rounded border-dashed flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">No logo</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Include Charts</p>
                  <p className="text-xs text-muted-foreground">Include performance charts in PDF exports</p>
                </div>
                <Switch
                  checked={includeCharts}
                  onCheckedChange={(checked) => {
                    setIncludeCharts(checked);
                    onSettingChange();
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Include Trade List</p>
                  <p className="text-xs text-muted-foreground">Include detailed trade list in PDF exports</p>
                </div>
                <Switch
                  checked={includeTradeList}
                  onCheckedChange={(checked) => {
                    setIncludeTradeList(checked);
                    onSettingChange();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Report Settings
        </Button>
      </div>
    </div>
  );
}
