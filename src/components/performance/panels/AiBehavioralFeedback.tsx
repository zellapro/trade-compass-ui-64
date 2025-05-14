
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader, Sparkles } from 'lucide-react';

interface AiBehavioralFeedbackProps {
  timeframe: string;
}

export function AiBehavioralFeedback({ timeframe }: AiBehavioralFeedbackProps) {
  const [loading, setLoading] = useState(false);
  
  // Mock AI insights
  const insights = [
    {
      title: "Pattern Recognition",
      text: "Your performance shows a clear pattern of better outcomes when you trade during morning sessions (9:30 AM - 11:00 AM). During this period, your win rate is 72% vs. 58% during other times."
    },
    {
      title: "Psychological Edge",
      text: "You consistently perform better when you're noting feelings of 'calm' or 'focus' before entry. Consider implementing a pre-trade mindfulness routine to maintain this state."
    },
    {
      title: "Decision Making",
      text: "You tend to cut winners prematurely. Your average loss is 1.2R, but your average win is only 1.8R. Allowing winners to run to their targets could significantly improve your risk-reward ratio."
    }
  ];
  
  const handleRegenerateInsight = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-primary" />
            AI Insight: What Your Behavior Says
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {insights.map((insight, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-medium text-primary">{insight.title}</h3>
            <p className="text-muted-foreground">{insight.text}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={handleRegenerateInsight} 
          disabled={loading}
          className="group"
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
              Regenerate Insight
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
