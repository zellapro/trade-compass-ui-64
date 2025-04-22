
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, FileText, Play, ExternalLink, Eye, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Trade } from "@/pages/Journal";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { findCategoryById, findSetupById, findGradeById } from "@/data/strategyData";
import { StrategyDisplay } from "./StrategyDisplay";

export function TradeTable({ trades }: { trades: Trade[] }) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  
  const toggleRow = (id: string) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  const getStrategyInfo = (trade: Trade) => {
    if (!trade.strategyCategory) {
      return { category: "", setupNames: [] };
    }
    
    const category = findCategoryById(trade.strategyCategory);
    const setupNames = trade.setupIds ? 
      trade.setupIds.map(id => {
        const setup = findSetupById(id);
        return setup ? setup.name : "";
      }).filter(Boolean) :
      [];
      
    return { 
      category: category?.name || "", 
      setupNames 
    };
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ticker</TableHead>
            <TableHead className="w-[80px]">Time</TableHead>
            <TableHead className="w-[120px]">Strategy</TableHead>
            <TableHead className="text-right">Entry</TableHead>
            <TableHead className="text-right">Exit</TableHead>
            <TableHead className="text-right">P&L</TableHead>
            <TableHead className="text-right">R</TableHead>
            <TableHead className="w-[80px]">Grade</TableHead>
            <TableHead className="w-[80px]">Outcome</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade) => (
            <>
              <TableRow 
                key={trade.id}
                className={cn(
                  "group hover:bg-accent/50 cursor-pointer transition-colors",
                  trade.pinned && "bg-primary/5"
                )}
                onClick={() => toggleRow(trade.id)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-1">
                    {trade.pinned && <span className="text-xs text-primary">📌</span>}
                    {trade.ticker}
                  </div>
                </TableCell>
                <TableCell>{formatTime(trade.entryTime)}</TableCell>
                <TableCell>
                  {trade.strategyCategory ? (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        {trade.isFavoriteStrategy && (
                          <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                        )}
                        {getStrategyInfo(trade).setupNames.length > 0 ? (
                          <Badge variant="outline" className="text-xs font-normal">
                            {getStrategyInfo(trade).setupNames[0]}
                            {getStrategyInfo(trade).setupNames.length > 1 && "+"}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs font-normal">
                            {trade.setup}
                          </Badge>
                        )}
                      </div>
                      {trade.setupGrade && (
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs mt-1 w-fit",
                            trade.setupGrade === "a-plus" && "text-green-600 border-green-200 bg-green-50",
                            trade.setupGrade === "a" && "text-green-500 border-green-200 bg-green-50",
                            trade.setupGrade === "b-plus" && "text-blue-500 border-blue-200 bg-blue-50",
                            trade.setupGrade === "b" && "text-blue-400 border-blue-200 bg-blue-50",
                            trade.setupGrade === "c" && "text-yellow-500 border-yellow-200 bg-yellow-50",
                            trade.setupGrade === "d" && "text-orange-500 border-orange-200 bg-orange-50",
                            trade.setupGrade === "f" && "text-red-500 border-red-200 bg-red-50",
                          )}
                        >
                          {findGradeById(trade.setupGrade)?.name || ""}
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <Badge variant="outline" className="text-xs font-normal">
                      {trade.setup}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right font-mono">${trade.entryPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right font-mono">${trade.exitPrice.toFixed(2)}</TableCell>
                <TableCell className={cn(
                  "text-right font-medium",
                  trade.pnl > 0 ? "text-green-600" : trade.pnl < 0 ? "text-red-600" : ""
                )}>
                  {trade.pnl > 0 ? "+" : ""}{trade.pnl.toFixed(2)}
                  <span className="text-xs ml-1 opacity-70">({trade.pnlPct.toFixed(1)}%)</span>
                </TableCell>
                <TableCell className="text-right">{trade.rMultiple.toFixed(1)}R</TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      trade.grade.startsWith('A') ? "success" : 
                      trade.grade.startsWith('B') ? "outline" : 
                      "error"
                    }
                    className="text-xs"
                  >
                    {trade.grade}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      trade.outcome === "win" ? "success" :
                      trade.outcome === "loss" ? "error" :
                      "warning"
                    }
                    className="text-xs"
                  >
                    {trade.outcome === "win" ? "Win" : trade.outcome === "loss" ? "Loss" : "BE"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <FileText size={14} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">AI Analysis</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {trade.replay && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Play size={14} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Replay</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <ExternalLink size={14} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">View Details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
              
              {/* Expanded Row */}
              {expandedRow === trade.id && (
                <TableRow>
                  <TableCell colSpan={10} className="bg-muted/20 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Trade Details</h4>
                        <div className="space-y-1">
                          <div className="grid grid-cols-2 text-xs">
                            <span className="text-muted-foreground">Strategy:</span>
                            <span>{trade.strategy}</span>
                          </div>
                          <div className="grid grid-cols-2 text-xs">
                            <span className="text-muted-foreground">Size:</span>
                            <span>{trade.size} shares</span>
                          </div>
                          <div className="grid grid-cols-2 text-xs">
                            <span className="text-muted-foreground">Execution:</span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  className={i < trade.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"} 
                                />
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 text-xs">
                            <span className="text-muted-foreground">Emotion:</span>
                            <div className="flex flex-wrap gap-1">
                              {trade.emotionTags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Display Strategy Information */}
                        {trade.strategyCategory && trade.setupIds && (
                          <div className="mt-3">
                            <h4 className="text-sm font-medium mb-2">Strategy Information</h4>
                            {trade.strategyCategory && trade.setupIds && (
                              <StrategyDisplay
                                strategy={{
                                  categoryId: trade.strategyCategory,
                                  setupIds: trade.setupIds,
                                  gradeId: trade.setupGrade,
                                  contextTagIds: trade.contextTags || [],
                                  isFavorite: trade.isFavoriteStrategy || false,
                                  notes: trade.strategyNotes
                                }}
                                variant="compact"
                                editable={true}
                              />
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">AI Summary</h4>
                        <p className="text-xs">{trade.aiSummary}</p>
                        
                        <div className="mt-3">
                          <h4 className="text-sm font-medium mb-1">Notes</h4>
                          <p className="text-xs">{trade.notes}</p>
                        </div>
                        
                        <div className="mt-3 flex justify-end">
                          <Button variant="outline" size="sm" className="text-xs gap-1">
                            <Eye size={14} /> View Full Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
