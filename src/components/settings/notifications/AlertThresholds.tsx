
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AlertThresholdsProps {
  onSettingChange: () => void;
}

const AlertThresholds: React.FC<AlertThresholdsProps> = ({ onSettingChange }) => {
  const { toast } = useToast();
  const [drawdownThreshold, setDrawdownThreshold] = useState<string>("5");
  const [tradeLossThreshold, setTradeLossThreshold] = useState<string>("200");
  const [winningStreak, setWinningStreak] = useState<string>("5");
  const [losingStreak, setLosingStreak] = useState<string>("3");

  const handleSave = () => {
    toast({
      title: "Alert thresholds saved",
      description: "Your alert threshold settings have been updated successfully."
    });
    onSettingChange();
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-center">Alert Thresholds</CardTitle>
        <CardDescription className="text-center">
          Configure when you want to receive alerts based on your trading activity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Drawdown Alert Threshold */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-center">Drawdown Alert Threshold (%)</p>
            <Input 
              type="number" 
              value={drawdownThreshold} 
              onChange={(e) => {
                setDrawdownThreshold(e.target.value);
                onSettingChange();
              }}
              className="text-center"
            />
            <p className="text-xs text-muted-foreground text-center">
              Alert when your account drawdown exceeds this percentage
            </p>
          </div>

          {/* Single Trade Loss Threshold */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-center">Single Trade Loss Threshold ($)</p>
            <Input 
              type="number" 
              value={tradeLossThreshold} 
              onChange={(e) => {
                setTradeLossThreshold(e.target.value);
                onSettingChange();
              }}
              className="text-center"
            />
            <p className="text-xs text-muted-foreground text-center">
              Alert when a single trade loss exceeds this amount
            </p>
          </div>

          {/* Winning Streak Alert */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-center">Winning Streak Alert</p>
            <Input 
              type="number" 
              value={winningStreak} 
              onChange={(e) => {
                setWinningStreak(e.target.value);
                onSettingChange();
              }}
              className="text-center"
            />
            <p className="text-xs text-muted-foreground text-center">
              Alert when you hit this number of consecutive winning trades
            </p>
          </div>

          {/* Losing Streak Alert */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-center">Losing Streak Alert</p>
            <Input 
              type="number" 
              value={losingStreak} 
              onChange={(e) => {
                setLosingStreak(e.target.value);
                onSettingChange();
              }}
              className="text-center"
            />
            <p className="text-xs text-muted-foreground text-center">
              Alert when you hit this number of consecutive losing trades
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <Button 
            onClick={handleSave} 
            className="bg-[#1eaedb] hover:bg-[#1eaedb]/90 text-white"
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Save Alert Thresholds
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertThresholds;
