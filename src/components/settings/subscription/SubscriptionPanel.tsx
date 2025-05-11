
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Download } from "lucide-react";

interface SubscriptionPanelProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const SubscriptionPanel: React.FC<SubscriptionPanelProps> = ({ 
  onSettingChange,
  saveResetButtons
}) => {
  const { toast } = useToast();

  const handleChangePlan = () => {
    toast({
      title: "Change plan",
      description: "You will be redirected to the plan selection page.",
    });
    onSettingChange();
  };

  const handleDownloadReceipt = (date: string) => {
    toast({
      title: "Downloading receipt",
      description: `Receipt for ${date} is being downloaded.`,
    });
  };

  const handleUpdatePayment = () => {
    toast({
      title: "Update payment method",
      description: "You can now update your payment details.",
    });
    onSettingChange();
  };

  const handleAddPayment = () => {
    toast({
      title: "Add payment method",
      description: "You can now add a new payment method.",
    });
    onSettingChange();
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle>Subscription</CardTitle>
        <CardDescription>Manage your subscription and billing details</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        {/* Current Plan */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Current Plan</h3>
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/20 text-blue-500 px-2 py-0.5 rounded">Pro</span>
              <span className="text-lg">$29.99/month</span>
            </div>
          </div>
          <Button onClick={handleChangePlan}>Change Plan</Button>
        </div>
        
        {/* Billing History */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Billing History</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Receipt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Apr 1, 2025</TableCell>
                  <TableCell>$29.99</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">
                      ✓ Paid
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadReceipt("Apr 1, 2025")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mar 1, 2025</TableCell>
                  <TableCell>$29.99</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500">
                      ✓ Paid
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadReceipt("Mar 1, 2025")}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        
        {/* Payment Method */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          <div className="border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded bg-slate-300 dark:bg-slate-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <rect width="20" height="14" x="2" y="5" rx="2"/>
                  <line x1="2" x2="22" y1="10" y2="10"/>
                </svg>
              </div>
              <div>
                <div className="font-medium">Visa ending in 4242</div>
                <div className="text-sm text-muted-foreground">Expires 12/25</div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleUpdatePayment}>Update</Button>
            <Button variant="outline" onClick={handleAddPayment}>Add New</Button>
          </div>
        </div>
        
        <div className="flex justify-end">
          {saveResetButtons}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionPanel;
