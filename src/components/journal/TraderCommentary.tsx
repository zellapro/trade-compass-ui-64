
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { LightbulbIcon } from "lucide-react";

export function TraderCommentary() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Trader's Commentary</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pre-trade">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="pre-trade">Pre-Trade</TabsTrigger>
            <TabsTrigger value="during-trade">During Trade</TabsTrigger>
            <TabsTrigger value="post-trade">Post-Trade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pre-trade" className="space-y-4">
            <div>
              <Label htmlFor="pre-trade-thesis">Trade Thesis</Label>
              <Textarea 
                id="pre-trade-thesis" 
                placeholder="What was your plan before entering this trade?"
                className="min-h-[120px] mt-1.5"
                defaultValue="TSLA showing strong momentum after breaking above VWAP. Volume increasing, and price holding above the 9 EMA. Looking for a continuation move toward previous day's high."
              />
            </div>
            
            <div className="space-y-3">
              <Label>Pre-Trade Emotions</Label>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-sm">Calm</span>
                    <span className="text-sm">Anxious</span>
                  </div>
                  <Slider defaultValue={[30]} max={100} step={1} />
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-sm">Confident</span>
                    <span className="text-sm">Doubtful</span>
                  </div>
                  <Slider defaultValue={[70]} max={100} step={1} />
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-sm">Patient</span>
                    <span className="text-sm">FOMO</span>
                  </div>
                  <Slider defaultValue={[20]} max={100} step={1} />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="during-trade" className="space-y-4">
            <div>
              <Label htmlFor="during-trade-thoughts">Trade Thoughts</Label>
              <Textarea 
                id="during-trade-thoughts" 
                placeholder="What were you thinking while in this trade?"
                className="min-h-[120px] mt-1.5"
                defaultValue="Price moving as expected. Seeing strong buying momentum. Some resistance at previous high but volume still looks good. Might add to position if we break above resistance."
              />
            </div>
            
            <div className="space-y-3">
              <Label>During-Trade Emotions</Label>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-sm">In Control</span>
                    <span className="text-sm">Impulsive</span>
                  </div>
                  <Slider defaultValue={[40]} max={100} step={1} />
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-sm">Focused</span>
                    <span className="text-sm">Distracted</span>
                  </div>
                  <Slider defaultValue={[25]} max={100} step={1} />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="post-trade" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div>
                <Label htmlFor="what-went-well">What Went Well</Label>
                <Textarea 
                  id="what-went-well" 
                  placeholder="What aspects of this trade were successful?"
                  className="min-h-[120px] mt-1.5"
                  defaultValue="Good entry at the right point of momentum. Managed risk properly with a tight stop. Let profits run instead of taking early exit."
                />
              </div>
              
              <div>
                <Label htmlFor="what-to-improve">What To Improve</Label>
                <Textarea 
                  id="what-to-improve" 
                  placeholder="What could you improve next time?"
                  className="min-h-[120px] mt-1.5"
                  defaultValue="Could have added to position when the setup confirmed. Hesitated slightly on entry, which cost some potential profit."
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Execution Score (1-10)</Label>
                <span className="text-lg font-medium">8</span>
              </div>
              <Slider defaultValue={[8]} max={10} step={1} />
            </div>
            
            <div className="space-y-3">
              <Label>Post-Trade Emotions</Label>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-sm">Satisfied</span>
                    <span className="text-sm">Regretful</span>
                  </div>
                  <Slider defaultValue={[20]} max={100} step={1} />
                </div>
              </div>
            </div>
            
            <div className="bg-accent/50 rounded-md p-3 flex gap-3 mt-2">
              <div>
                <LightbulbIcon size={20} className="text-amber-500" />
              </div>
              <div className="text-sm">
                <p className="font-medium mb-1">AI Insight</p>
                <p>You hesitated on the breakout entry. Your profitability on breakout patterns increases by 32% when you enter within 10 seconds of confirmation.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
