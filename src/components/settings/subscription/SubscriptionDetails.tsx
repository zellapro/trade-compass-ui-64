
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CalendarDays, CreditCard, Download, ChevronRight, Zap } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface SubscriptionDetailsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const [billingFrequency, setBillingFrequency] = useState<"monthly" | "yearly">("monthly");

  const handleFrequencyChange = (checked: boolean) => {
    setBillingFrequency(checked ? "yearly" : "monthly");
    onSettingChange();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription</CardTitle>
        <CardDescription>Manage your plan and payment details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-lg">Current Plan:</h3>
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                ELITE
              </Badge>
              <Badge variant="outline">Trial ends in 7 days</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Full access to all ZellaPro features including AI analysis, unlimited replays, and premium coaching.
            </p>
          </div>
          <Button variant="outline">Compare Plans</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span>Billing Frequency</span>
                </Label>
                <div className="text-sm text-muted-foreground">Choose how often you're billed</div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-sm ${billingFrequency === "monthly" ? "font-medium" : "text-muted-foreground"}`}>Monthly</span>
                <Switch
                  checked={billingFrequency === "yearly"}
                  onCheckedChange={handleFrequencyChange}
                />
                <span className={`text-sm ${billingFrequency === "yearly" ? "font-medium" : "text-muted-foreground"}`}>
                  Yearly <span className="text-green-500">(-20%)</span>
                </span>
              </div>
            </div>
            
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span>Next Billing Date</span>
              </Label>
              <div className="font-medium">May 16, 2025</div>
              <div className="text-sm text-muted-foreground">
                Your free trial ends on this date, and your card will be charged $29/month.
              </div>
            </div>
            
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>Payment Method</span>
              </Label>
              <div className="flex items-center gap-3">
                <div className="bg-card border rounded-md px-3 py-2 flex items-center gap-2">
                  <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-xs font-medium">
                    VISA
                  </div>
                  <div className="text-sm">
                    <div>•••• •••• •••• 4242</div>
                    <div className="text-xs text-muted-foreground">Expires 09/26</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium flex items-center gap-1">
                <Zap className="h-4 w-4 text-primary" />
                Usage Summary
              </h3>
              <Separator className="my-2" />
            </div>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Replay Sessions</span>
                  <span className="font-medium">Unlimited</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>API Usage</span>
                  <span className="font-medium">347 / 1000 requests</span>
                </div>
                <Progress value={34.7} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI Feedback Credits</span>
                  <span className="font-medium">128 / Unlimited</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Invoice History</h3>
              <div className="border rounded-md divide-y">
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Elite Plan - Trial</div>
                    <div className="text-xs text-muted-foreground">May 09, 2025</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge variant="secondary">Free</Badge>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Elite Plan - Monthly</div>
                    <div className="text-xs text-muted-foreground">Apr 09, 2025</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="text-sm font-medium">$29.00</div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-2 flex items-center justify-center gap-1">
                View All Invoices
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6 pt-4 border-t">
          <Button variant="destructive">Cancel Subscription</Button>
          {saveResetButtons}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionDetails;
