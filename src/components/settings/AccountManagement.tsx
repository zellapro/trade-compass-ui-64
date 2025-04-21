
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, FileText, ShieldCheck, Upload, Download, FileJson, FileType, X, ExternalLink, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AccountManagementProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const AccountManagement: React.FC<AccountManagementProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const [subscriptionPlan, setSubscriptionPlan] = useState("pro");
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>Manage your subscription and billing information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Current Plan</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl font-bold capitalize">{subscriptionPlan}</span>
                  <Badge className="bg-green-500 text-white hover:bg-green-600">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Next billing: May 21, 2025
                </p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Manage Subscription</span>
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="border rounded-md p-3 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                <span className="text-lg font-medium">Free</span>
                <span className="text-muted-foreground text-sm">$0 / month</span>
                <ul className="text-xs text-left mt-2 space-y-1">
                  <li className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    <span>Basic Journal</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    <span>1 Broker Connection</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    <span>100 Trades/Month</span>
                  </li>
                </ul>
                <Button variant="ghost" size="sm" className="mt-2" disabled={subscriptionPlan === "free"}>
                  {subscriptionPlan === "free" ? "Current" : "Downgrade"}
                </Button>
              </div>
              
              <div className="border border-primary rounded-md p-3 flex flex-col items-center justify-center text-center relative bg-primary/5">
                <Badge className="absolute -top-2 -right-2 bg-primary">Popular</Badge>
                <span className="text-lg font-medium">Pro</span>
                <span className="text-muted-foreground text-sm">$29 / month</span>
                <ul className="text-xs text-left mt-2 space-y-1">
                  <li className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    <span>Advanced Analytics</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    <span>5 Broker Connections</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    <span>Unlimited Trades</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    <span>AI Assistant</span>
                  </li>
                </ul>
                <Button variant="ghost" size="sm" className="mt-2" disabled={subscriptionPlan === "pro"}>
                  {subscriptionPlan === "pro" ? "Current" : "Upgrade"}
                </Button>
              </div>
              
              <div className="border rounded-md p-3 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer">
                <span className="text-lg font-medium">Elite</span>
                <span className="text-muted-foreground text-sm">$49 / month</span>
                <ul className="text-xs text-left mt-2 space-y-1">
                  <li className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    <span>All Pro Features</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    <span>Unlimited Connections</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    <span>Advanced Rule Engine</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    <span>Priority Support</span>
                  </li>
                </ul>
                <Button variant="ghost" size="sm" className="mt-2" disabled={subscriptionPlan === "elite"}>
                  {subscriptionPlan === "elite" ? "Current" : "Upgrade"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Linked Devices</CardTitle>
          <CardDescription>Manage your active sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Chrome on Windows</p>
                  <p className="text-sm text-muted-foreground">Last active: Today</p>
                </div>
                <Badge>Current</Badge>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Safari on iPhone</p>
                  <p className="text-sm text-muted-foreground">Last active: Yesterday</p>
                </div>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
              <div className="flex justify-between items-center pb-2">
                <div>
                  <p className="font-medium">Firefox on MacBook</p>
                  <p className="text-sm text-muted-foreground">Last active: 3 days ago</p>
                </div>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-2">Logout from all devices</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Export and import your trading data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 space-y-4">
            <div>
              <h3 className="font-medium mb-2">Export Data</h3>
              <div className="flex flex-wrap gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <FileJson className="h-4 w-4" />
                        <span>Export as JSON</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download all data in JSON format</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>Export as CSV</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download all trades in CSV format</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        <span>Export as PDF</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Generate a PDF report of your trading history</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="pt-2">
              <h3 className="font-medium mb-2">Import from other platforms</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-3 border rounded-md p-2">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Tradervue</div>
                    <div className="text-xs text-muted-foreground">Import your trades from Tradervue</div>
                  </div>
                  <Button variant="outline" size="sm">Import</Button>
                </div>
                
                <div className="flex items-center gap-3 border rounded-md p-2">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">TraderSync</div>
                    <div className="text-xs text-muted-foreground">Import your trades from TraderSync</div>
                  </div>
                  <Button variant="outline" size="sm">Import</Button>
                </div>
                
                <div className="flex items-center gap-3 border rounded-md p-2">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Edgewonk</div>
                    <div className="text-xs text-muted-foreground">Import your trades from Edgewonk</div>
                  </div>
                  <Button variant="outline" size="sm">Import</Button>
                </div>
                
                <div className="flex items-center gap-3 border rounded-md p-2 border-dashed">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                    <Upload className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Custom CSV</div>
                    <div className="text-xs text-muted-foreground">Upload a custom CSV file</div>
                  </div>
                  <Button variant="outline" size="sm">Upload</Button>
                </div>
              </div>
            </div>
          </div>
          
          {saveResetButtons}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountManagement;
