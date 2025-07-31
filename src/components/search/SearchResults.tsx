import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Calendar, Tag } from "lucide-react";

interface SearchResult {
  id: string;
  type: "trade" | "tag" | "symbol";
  title: string;
  subtitle?: string;
  date?: string;
  pnl?: number;
  tags?: string[];
}

interface SearchResultsProps {
  query: string;
  results: SearchResult[];
  onResultClick: (result: SearchResult) => void;
}

export function SearchResults({ query, results, onResultClick }: SearchResultsProps) {
  if (!query) return null;

  if (results.length === 0) {
    return (
      <Card className="absolute top-full left-0 right-0 mt-1 z-50 border shadow-lg">
        <CardContent className="p-4 text-center text-muted-foreground">
          No results found for "{query}"
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="absolute top-full left-0 right-0 mt-1 z-50 border shadow-lg max-h-96 overflow-y-auto">
      <CardContent className="p-2">
        {results.map((result) => (
          <div
            key={result.id}
            className="flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer rounded-md"
            onClick={() => onResultClick(result)}
          >
            <div className="flex items-center gap-3 flex-1">
              {result.type === "trade" && (
                <div className={`p-1 rounded ${result.pnl && result.pnl > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {result.pnl && result.pnl > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                </div>
              )}
              {result.type === "tag" && (
                <div className="p-1 rounded bg-blue-100 text-blue-600">
                  <Tag size={16} />
                </div>
              )}
              {result.type === "symbol" && (
                <div className="p-1 rounded bg-purple-100 text-purple-600">
                  <Calendar size={16} />
                </div>
              )}
              
              <div className="flex-1">
                <div className="font-medium text-sm">{result.title}</div>
                {result.subtitle && (
                  <div className="text-xs text-muted-foreground">{result.subtitle}</div>
                )}
                {result.tags && (
                  <div className="flex gap-1 mt-1">
                    {result.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-right text-xs text-muted-foreground">
              {result.date && <div>{result.date}</div>}
              {result.pnl && (
                <div className={result.pnl > 0 ? 'text-green-600' : 'text-red-600'}>
                  {result.pnl > 0 ? '+' : ''}${result.pnl.toFixed(2)}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}