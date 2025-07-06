
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export function MultiAccountSupport() {
  // Sample account data
  const accounts = [
    { 
      id: "tdameritrade", 
      name: "TD Ameritrade", 
      balance: 25420.75, 
      pnl: 842.50,
      pnlPercent: 3.4,
      positive: true
    },
    { 
      id: "interactive", 
      name: "Interactive Brokers", 
      balance: 18750.20, 
      pnl: -320.80,
      pnlPercent: -1.7,
      positive: false
    },
    { 
      id: "paper", 
      name: "Paper Trading", 
      balance: 10000.00, 
      pnl: 1250.50,
      pnlPercent: 12.5,
      positive: true
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Multi-Account Analysis</CardTitle>
        <CardDescription>
          Compare performance across different trading accounts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={accounts[0].id}>
          <TabsList className="grid grid-cols-3">
            {accounts.map((account) => (
              <TabsTrigger key={account.id} value={account.id}>
                {account.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {accounts.map((account) => (
            <TabsContent key={account.id} value={account.id} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Account Balance</p>
                  <p className="text-lg font-medium">${account.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Profit/Loss</p>
                  <div className="flex items-center gap-1.5">
                    <p className={`text-lg font-medium ${account.positive ? 'text-green-500' : 'text-red-500'}`}>
                      {account.positive ? '+' : ''}{account.pnl.toLocaleString('en-US', {minimumFractionDigits: 2})}
                    </p>
                    <Badge variant={account.positive ? 'default' : 'destructive'} className="text-xs">
                      {account.positive ? '+' : ''}{account.pnlPercent}%
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted h-40 rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Account performance chart</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Win Rate</p>
                  <p className="text-sm font-medium">
                    {account.positive ? '62%' : '48%'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Profit Factor</p>
                  <p className="text-sm font-medium">
                    {account.positive ? '1.8' : '0.9'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Avg R</p>
                  <p className="text-sm font-medium">
                    {account.positive ? '1.4' : '0.8'}
                  </p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
