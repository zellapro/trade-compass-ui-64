
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Search } from "lucide-react";
import { TradeSummaryCard } from "@/components/journal/TradeSummaryCard";
import { TradeChart } from "@/components/journal/TradeChart";
import { TraderCommentary } from "@/components/journal/TraderCommentary";
import { TradeGrading } from "@/components/journal/TradeGrading";
import { TradeChecklist } from "@/components/journal/TradeChecklist";
import { RelatedTrades } from "@/components/journal/RelatedTrades";
import { StatisticalSnapshot } from "@/components/journal/StatisticalSnapshot";
import { AttachmentsPanel } from "@/components/journal/AttachmentsPanel";
import { AiCoachPanel } from "@/components/journal/AiCoachPanel";
import { CustomNotes } from "@/components/journal/CustomNotes";
import { StickySidebar } from "@/components/journal/StickySidebar";
import { cn } from "@/lib/utils";

export default function Journal() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trade Journal</h1>
          <p className="text-muted-foreground">Log and review your trade history.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search trades..."
              className="w-full rounded-md border border-input pl-9 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <AddTradeDialog />
        </div>
      </div>
      
      {isFullscreen ? (
        <div className="fixed inset-0 bg-background z-50 p-4">
          <TradeChart fullscreen={true} onToggleFullscreen={() => setIsFullscreen(false)} />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content - Left */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <TradeSummaryCard />
            
            <TradeChart onToggleFullscreen={() => setIsFullscreen(true)} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TraderCommentary />
              <div className="space-y-6">
                <TradeGrading />
                <TradeChecklist />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AttachmentsPanel />
              <CustomNotes />
            </div>
          </div>
          
          {/* Sidebar - Right */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <StickySidebar />
            
            <AiCoachPanel />
            
            <RelatedTrades />
            
            <StatisticalSnapshot />
          </div>
        </div>
      )}
    </div>
  );
}

function AddTradeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add New Trade</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Trade</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Ticker Symbol</label>
              <input 
                type="text" 
                placeholder="e.g., TSLA" 
                className="px-3 py-2 border rounded-md"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    defaultValue="2025-04-19"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Trade Type</label>
                <select className="px-3 py-2 border rounded-md" defaultValue="Long">
                  <option>Long</option>
                  <option>Short</option>
                  <option>Option</option>
                  <option>Future</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Entry Price</label>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  defaultValue="164.25"
                  className="px-3 py-2 border rounded-md"
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Exit Price</label>
                <input 
                  type="number" 
                  placeholder="0.00"
                  defaultValue="168.40" 
                  className="px-3 py-2 border rounded-md"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Setup Type</label>
              <select className="px-3 py-2 border rounded-md" defaultValue="VWAP Reclaim">
                <option>Breakout</option>
                <option>VWAP Reclaim</option>
                <option>Gap Fill</option>
                <option>Reversal</option>
                <option>Trend Continuation</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Create Trade</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
