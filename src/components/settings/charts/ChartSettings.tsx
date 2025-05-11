
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart, Calendar, Clock, Save } from "lucide-react";

export default function ChartSettings({ onSettingChange }: { onSettingChange: () => void }) {
  const [performanceCharts, setPerformanceCharts] = useState({
    performanceLine: true,
    winLossDistribution: true,
    strategyBreakdown: true,
    profitByTimeOfDay: true,
  });

  const [psychologyCharts, setPsychologyCharts] = useState({
    emotionTrend: true,
    performanceByEmotion: true,
    calendarHeatmap: true,
  });

  const handleSave = () => {
    console.log("Saving chart settings");
    onSettingChange();
    // Here you would save the settings to your backend
  };

  const handleTogglePerformanceChart = (chart: keyof typeof performanceCharts) => {
    setPerformanceCharts(prev => ({ ...prev, [chart]: !prev[chart] }));
    onSettingChange();
  };

  const handleTogglePsychologyChart = (chart: keyof typeof psychologyCharts) => {
    setPsychologyCharts(prev => ({ ...prev, [chart]: !prev[chart] }));
    onSettingChange();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Chart Settings</h2>
        <p className="text-muted-foreground mb-6">
          Configure the charts used in your reports
        </p>
        
        <div className="space-y-6">
          <Card className="bg-card dark:bg-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-4">Performance Charts</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10">
                <div className="col-span-2">
                  <div className="grid grid-cols-3 font-medium text-sm pb-2 border-b">
                    <div className="col-span-2">Chart Type</div>
                    <div className="text-right">Enabled</div>
                  </div>
                </div>

                <div className="flex items-center justify-between col-span-2 md:col-span-1">
                  <div className="flex items-center gap-3">
                    <LineChart className="h-5 w-5 text-blue-500" />
                    <span>Performance Line Chart</span>
                  </div>
                  <Switch
                    checked={performanceCharts.performanceLine}
                    onCheckedChange={() => handleTogglePerformanceChart("performanceLine")}
                  />
                </div>
                
                <div className="flex items-center justify-between col-span-2 md:col-span-1">
                  <div className="flex items-center gap-3">
                    <BarChart className="h-5 w-5 text-green-500" />
                    <span>Win/Loss Distribution</span>
                  </div>
                  <Switch
                    checked={performanceCharts.winLossDistribution}
                    onCheckedChange={() => handleTogglePerformanceChart("winLossDistribution")}
                  />
                </div>
                
                <div className="flex items-center justify-between col-span-2 md:col-span-1">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple-500" />
                    <span>Strategy Breakdown</span>
                  </div>
                  <Switch
                    checked={performanceCharts.strategyBreakdown}
                    onCheckedChange={() => handleTogglePerformanceChart("strategyBreakdown")}
                  />
                </div>
                
                <div className="flex items-center justify-between col-span-2 md:col-span-1">
                  <div className="flex items-center gap-3">
                    <BarChart className="h-5 w-5 text-amber-500" />
                    <span>Profit by Time of Day</span>
                  </div>
                  <Switch
                    checked={performanceCharts.profitByTimeOfDay}
                    onCheckedChange={() => handleTogglePerformanceChart("profitByTimeOfDay")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card dark:bg-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-4">Psychology Charts</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10">
                <div className="col-span-2">
                  <div className="grid grid-cols-3 font-medium text-sm pb-2 border-b">
                    <div className="col-span-2">Chart Type</div>
                    <div className="text-right">Enabled</div>
                  </div>
                </div>

                <div className="flex items-center justify-between col-span-2 md:col-span-1">
                  <div className="flex items-center gap-3">
                    <LineChart className="h-5 w-5 text-blue-500" />
                    <span>Emotion Trend Chart</span>
                  </div>
                  <Switch
                    checked={psychologyCharts.emotionTrend}
                    onCheckedChange={() => handleTogglePsychologyChart("emotionTrend")}
                  />
                </div>
                
                <div className="flex items-center justify-between col-span-2 md:col-span-1">
                  <div className="flex items-center gap-3">
                    <BarChart className="h-5 w-5 text-indigo-500" />
                    <span>Performance by Emotion</span>
                  </div>
                  <Switch
                    checked={psychologyCharts.performanceByEmotion}
                    onCheckedChange={() => handleTogglePsychologyChart("performanceByEmotion")}
                  />
                </div>
                
                <div className="flex items-center justify-between col-span-2 md:col-span-1">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-cyan-500" />
                    <span>Calendar Heatmap</span>
                  </div>
                  <Switch
                    checked={psychologyCharts.calendarHeatmap}
                    onCheckedChange={() => handleTogglePsychologyChart("calendarHeatmap")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Chart Settings
        </Button>
      </div>
    </div>
  );
}
