
import { Bot, BookOpen, Clock, BookText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AiInsightCardProps {
  aiSummary?: string;
  patternInsights?: string[];
  similarTrades?: { id: string; ticker: string; date: string; outcome: string }[];
}

export function AiInsightCard({
  aiSummary = "AI analysis pending. Submit this trade to get AI-powered insights on your execution, emotional patterns, and suggestions for improvement.",
  patternInsights = [],
  similarTrades = []
}: AiInsightCardProps) {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center">
          <Bot className="h-4 w-4 mr-1.5" />
          AI Trade Analysis
        </h3>
        <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
          Generate
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground">
        {aiSummary}
      </div>
      
      {patternInsights.length > 0 && (
        <div>
          <h4 className="text-xs font-medium mb-1.5 flex items-center">
            <BookText className="h-3.5 w-3.5 mr-1" />
            Pattern Recognition
          </h4>
          <ul className="text-xs space-y-1 text-muted-foreground">
            {patternInsights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-1.5"></span>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {similarTrades.length > 0 && (
        <div>
          <h4 className="text-xs font-medium mb-1.5 flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Similar Trades
          </h4>
          <ul className="text-xs space-y-1">
            {similarTrades.map((trade, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="text-muted-foreground">{trade.ticker} - {trade.date}</span>
                <span className={`text-xs ${trade.outcome === 'win' ? 'text-green-500' : trade.outcome === 'loss' ? 'text-red-500' : 'text-yellow-500'}`}>
                  {trade.outcome === 'win' ? 'Win' : trade.outcome === 'loss' ? 'Loss' : 'BE'}
                </span>
              </li>
            ))}
          </ul>
          <Button variant="ghost" size="sm" className="w-full mt-2 text-xs flex items-center">
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            View All Similar Trades
          </Button>
        </div>
      )}
    </div>
  );
}
