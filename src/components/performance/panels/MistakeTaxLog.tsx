
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flag } from 'lucide-react';

interface MistakeTaxLogProps {
  timeframe: string;
}

export function MistakeTaxLog({ timeframe }: MistakeTaxLogProps) {
  // Mock data for mistake tax log
  const mistakes = [
    {
      id: 1,
      date: "2023-05-10",
      category: "Position Sizing",
      amount: 120,
      tradeId: "T-45678"
    },
    {
      id: 2,
      date: "2023-05-12",
      category: "Early Exit",
      amount: 85,
      tradeId: "T-45680"
    },
    {
      id: 3,
      date: "2023-05-14",
      category: "FOMO Entry",
      amount: 210,
      tradeId: "T-45683"
    },
    {
      id: 4,
      date: "2023-05-16",
      category: "Ignoring Stop Loss",
      amount: 320,
      tradeId: "T-45689"
    },
    {
      id: 5,
      date: "2023-05-18",
      category: "Revenge Trading",
      amount: 180,
      tradeId: "T-45691"
    }
  ];
  
  const totalMistakePoints = mistakes.reduce((sum, mistake) => sum + mistake.amount, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium">Mistake Tax Log</CardTitle>
          <p className="text-sm text-muted-foreground">Total Mistake Points: <span className="font-semibold text-destructive">{totalMistakePoints}</span></p>
        </div>
        <Button variant="outline" size="sm">
          <Flag className="h-4 w-4 mr-1" />
          Tag Mistake
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/50">
              <tr>
                <th scope="col" className="px-4 py-3 rounded-l-lg">Date</th>
                <th scope="col" className="px-4 py-3">Mistake Category</th>
                <th scope="col" className="px-4 py-3">Tax Amount</th>
                <th scope="col" className="px-4 py-3">Trade ID</th>
                <th scope="col" className="px-4 py-3 rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mistakes.map(mistake => (
                <tr key={mistake.id} className="border-b border-muted/20 hover:bg-muted/20">
                  <td className="px-4 py-3">{mistake.date}</td>
                  <td className="px-4 py-3">{mistake.category}</td>
                  <td className="px-4 py-3 font-semibold text-destructive">{mistake.amount}</td>
                  <td className="px-4 py-3">
                    <a href="#" className="text-primary hover:underline">{mistake.tradeId}</a>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm" className="h-7 px-2">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
