
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell 
} from "recharts";

// Mock data for broker comparison
const brokerData = [
  { name: "AAPL", journaled: 125, actual: 118, diff: -7 },
  { name: "MSFT", journaled: 85, actual: 85, diff: 0 },
  { name: "TSLA", journaled: 250, actual: 220, diff: -30 },
  { name: "AMZN", journaled: 110, actual: 142, diff: 32 },
  { name: "NVDA", journaled: 180, actual: 175, diff: -5 }
];

// Mock data for fees
const feeData = [
  { name: "Commissions", amount: 320 },
  { name: "ECN Fees", amount: 180 },
  { name: "Exchange Fees", amount: 85 },
  { name: "Data Fees", amount: 65 }
];

export function BrokerComparisonPanel() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Broker Comparison</CardTitle>
        <CardDescription>Comparing journal entries with broker statements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-sm text-muted-foreground">Gross P&L</div>
            <div className="text-2xl font-bold text-trading-green">+$4,238.50</div>
          </div>
          
          <div className="bg-card rounded-lg p-4 border">
            <div className="text-sm text-muted-foreground">Net P&L (After Fees)</div>
            <div className="text-2xl font-bold text-trading-green">+$3,588.50</div>
            <div className="text-sm flex items-center mt-1 text-trading-red">
              <ArrowDown size={14} className="inline-block mr-1" /> $650.00 in fees
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">P&L Discrepancies</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={brokerData}
              margin={{ top: 0, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm">
                          <span className="text-blue-600">Journal:</span>{" "}
                          <span className="font-mono">${payload[0].value}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-green-600">Actual:</span>{" "}
                          <span className="font-mono">${payload[1].value}</span>
                        </p>
                        <p className={`text-sm ${Number(payload[2].value) >= 0 ? "text-trading-green" : "text-trading-red"}`}>
                          <span>Difference:</span>{" "}
                          <span className="font-mono">{Number(payload[2].value) >= 0 ? "+" : ""}${payload[2].value}</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="journaled" name="Journaled P&L" fill="#3B82F6" />
              <Bar dataKey="actual" name="Actual P&L" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <div className="text-sm font-medium mb-2">Fee Breakdown</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={feeData}
              margin={{ top: 0, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-trading-red">
                          <span className="font-mono">${payload[0].value}</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="amount" name="Fee Amount" fill="#EF4444">
                {feeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#EF4444" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
