
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function EdgeAmplifierProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Edge Amplifier (Trader DNA)</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="flex items-start gap-6">
          {/* Trader Profile Avatar */}
          <div className="rounded-full w-24 h-24 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white">
            TP
          </div>
          
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Disciplined Trend Trader</h3>
              <p className="text-sm text-muted-foreground">Profile based on 280 analyzed trades</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Strengths</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm pl-2">
                  <li>Excellent risk management (avg. 1.1% risk per trade)</li>
                  <li>Consistent stop-loss adherence (98% compliance)</li>
                  <li>Patience when waiting for setup confirmation</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Weaknesses</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm pl-2">
                  <li>Tendency to exit winning trades too early</li>
                  <li>Lower performance during high-volatility periods</li>
                  <li>Inconsistent premarket preparation routine</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex justify-end">
        <Button variant="outline">
          View Full DNA Report 
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
