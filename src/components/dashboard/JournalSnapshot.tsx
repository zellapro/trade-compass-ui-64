
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

// Sample journal entries
const journalEntries = [
  {
    id: 1,
    date: "2025-04-18",
    time: "10:45 AM",
    content: "AAPL trade went exactly as planned. Identified the support level and waited for confirmation before entry. Feeling confident about this setup.",
    emotion: "confident",
    emoji: "😊",
  },
  {
    id: 2,
    date: "2025-04-17",
    time: "2:30 PM",
    content: "Made an impulsive trade on TSLA after missing the first move. Ended up chasing and getting stopped out. Need to stick to my plan.",
    emotion: "frustrated",
    emoji: "😣",
  },
  {
    id: 3,
    date: "2025-04-16",
    time: "11:15 AM",
    content: "Market was choppy today. Stayed mostly on the sidelines and took only one high-probability setup. Proud of my discipline.",
    emotion: "calm",
    emoji: "😌",
  }
];

export function JournalSnapshot() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Journal Snapshot</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Brain className="h-3 w-3" />
            <span>AI Analysis</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3 p-2 rounded-md border bg-muted/50">
          <p className="text-sm italic">
            "You felt anxious in 3/5 losing trades this week. Consider practicing mindfulness before trading sessions."
          </p>
        </div>
        
        <div className="flex gap-2 mb-3 overflow-x-auto py-1">
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Filter className="h-3 w-3 mr-1" />
            High Conviction
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Emotional Days
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Revenge Trades
          </Button>
        </div>
        
        <div className="space-y-3">
          {journalEntries.map((entry) => (
            <HoverCard key={entry.id}>
              <HoverCardTrigger asChild>
                <div className="p-2 rounded-md border cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{entry.date} • {entry.time}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "flex items-center",
                        entry.emotion === "confident" && "bg-trading-green-light",
                        entry.emotion === "frustrated" && "bg-trading-red-light",
                        entry.emotion === "calm" && "bg-trading-blue-light"
                      )}
                    >
                      <span className="mr-1">{entry.emoji}</span>
                      <span>{entry.emotion}</span>
                    </Badge>
                  </div>
                  <p className="text-xs truncate">{entry.content}</p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{entry.date} • {entry.time}</h4>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "flex items-center",
                        entry.emotion === "confident" && "bg-trading-green-light",
                        entry.emotion === "frustrated" && "bg-trading-red-light",
                        entry.emotion === "calm" && "bg-trading-blue-light"
                      )}
                    >
                      <span className="mr-1">{entry.emoji}</span>
                      <span>{entry.emotion}</span>
                    </Badge>
                  </div>
                  <p className="text-sm">{entry.content}</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Utility function for className conditionals
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
