
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Bot, Brain, Mic, Edit, MessageSquare, FileText, Gauge, FileSearch, Settings } from "lucide-react";

interface AiPreferencesProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const AiPreferences: React.FC<AiPreferencesProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const [aiSummaries, setAiSummaries] = useState(true);
  const [aiTone, setAiTone] = useState("tactical");
  const [journalingMethod, setJournalingMethod] = useState("guided");
  const [replayMode, setReplayMode] = useState("manual");
  
  const handleAiSummariesToggle = () => {
    setAiSummaries(!aiSummaries);
    onSettingChange();
  };
  
  const handleAiToneChange = (value: string) => {
    setAiTone(value);
    onSettingChange();
  };
  
  const handleJournalingMethodChange = (value: string) => {
    setJournalingMethod(value);
    onSettingChange();
  };
  
  const handleReplayModeChange = (value: string) => {
    setReplayMode(value);
    onSettingChange();
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Assistant Settings</CardTitle>
          <CardDescription>Configure how the AI assists with your trading journal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex gap-3">
              <div className="bg-primary/10 rounded-full p-2 h-fit">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">AI-Generated Summaries</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically create trade summaries and insights
                </p>
              </div>
            </div>
            <Switch checked={aiSummaries} onCheckedChange={handleAiSummariesToggle} />
          </div>
          
          {aiSummaries && (
            <>
              <div className="pl-12 space-y-4">
                <div>
                  <Label className="text-base">AI Tone</Label>
                  <RadioGroup defaultValue="tactical" value={aiTone} onValueChange={handleAiToneChange} className="grid grid-cols-3 gap-4 mt-2">
                    <div className={`border rounded-lg p-4 relative ${aiTone === 'tactical' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="tactical" id="tone-tactical" className="absolute right-4 top-4" />
                      <div className="mb-2 text-center">
                        <Brain className="h-8 w-8 mx-auto text-muted-foreground" />
                      </div>
                      <Label htmlFor="tone-tactical" className="font-medium text-center block">Tactical</Label>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        "Your entry was at 85% of the move. Consider earlier entries next time."
                      </p>
                    </div>
                    
                    <div className={`border rounded-lg p-4 relative ${aiTone === 'casual' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="casual" id="tone-casual" className="absolute right-4 top-4" />
                      <div className="mb-2 text-center">
                        <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground" />
                      </div>
                      <Label htmlFor="tone-casual" className="font-medium text-center block">Casual</Label>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        "Nice trade! You got in a bit late though, try to catch it earlier next time."
                      </p>
                    </div>
                    
                    <div className={`border rounded-lg p-4 relative ${aiTone === 'motivational' ? 'border-primary bg-primary/5' : ''}`}>
                      <RadioGroupItem value="motivational" id="tone-motivational" className="absolute right-4 top-4" />
                      <div className="mb-2 text-center">
                        <Gauge className="h-8 w-8 mx-auto text-muted-foreground" />
                      </div>
                      <Label htmlFor="tone-motivational" className="font-medium text-center block">Motivational</Label>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        "Great effort on this trade! You're developing discipline, keep it up!"
                      </p>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="ai-detail" className="mb-2 block">Analysis Detail Level</Label>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Concise</span>
                      <span className="text-sm">Detailed</span>
                    </div>
                    <Slider 
                      defaultValue={[70]} 
                      max={100} 
                      step={10}
                      className="w-full" 
                      onValueChange={() => onSettingChange()}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="include-mistakes">Highlight Mistakes</Label>
                    <p className="text-sm text-muted-foreground">
                      AI will analyze and identify potential trading mistakes
                    </p>
                  </div>
                  <Switch id="include-mistakes" defaultChecked onChange={onSettingChange} />
                </div>
                
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="suggest-improvements">Suggest Improvements</Label>
                    <p className="text-sm text-muted-foreground">
                      AI will suggest ways to improve similar trades in the future
                    </p>
                  </div>
                  <Switch id="suggest-improvements" defaultChecked onChange={onSettingChange} />
                </div>
                
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <div className="space-y-0.5">
                    <Label htmlFor="correlate-performance">Correlate with Performance</Label>
                    <p className="text-sm text-muted-foreground">
                      AI will connect this trade with overall performance patterns
                    </p>
                  </div>
                  <Switch id="correlate-performance" defaultChecked onChange={onSettingChange} />
                </div>
              </div>
              
              <Separator />
            </>
          )}
          
          <div>
            <Label className="text-base mb-2 block">Journaling Method</Label>
            <RadioGroup defaultValue="guided" value={journalingMethod} onValueChange={handleJournalingMethodChange} className="grid grid-cols-3 gap-4 mt-2">
              <div className={`border rounded-lg p-4 relative ${journalingMethod === 'quick' ? 'border-primary bg-primary/5' : ''}`}>
                <RadioGroupItem value="quick" id="method-quick" className="absolute right-4 top-4" />
                <div className="mb-2 text-center">
                  <Edit className="h-8 w-8 mx-auto text-muted-foreground" />
                </div>
                <Label htmlFor="method-quick" className="font-medium text-center block">Quick Log</Label>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Simple free-form journal entries with minimal prompts
                </p>
              </div>
              
              <div className={`border rounded-lg p-4 relative ${journalingMethod === 'guided' ? 'border-primary bg-primary/5' : ''}`}>
                <RadioGroupItem value="guided" id="method-guided" className="absolute right-4 top-4" />
                <div className="mb-2 text-center">
                  <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                </div>
                <Label htmlFor="method-guided" className="font-medium text-center block">Guided Prompts</Label>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Structured questions to help analyze your trades
                </p>
              </div>
              
              <div className={`border rounded-lg p-4 relative ${journalingMethod === 'voice' ? 'border-primary bg-primary/5' : ''}`}>
                <RadioGroupItem value="voice" id="method-voice" className="absolute right-4 top-4" />
                <div className="mb-2 text-center">
                  <Mic className="h-8 w-8 mx-auto text-muted-foreground" />
                </div>
                <Label htmlFor="method-voice" className="font-medium text-center block">Voice-to-Text</Label>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Record audio notes that are transcribed automatically
                </p>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-base mb-2 block">Trade Replay Mode</Label>
            <Select value={replayMode} onValueChange={handleReplayModeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select replay mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="always">Always On</SelectItem>
                <SelectItem value="off">Always Off</SelectItem>
                <SelectItem value="manual">Manual per Trade</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-2">
              Configure how trade replay functionality works by default
            </p>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="font-medium">Advanced AI Settings</h3>
            
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div className="space-y-0.5">
                <Label htmlFor="pattern-recognition">Pattern Recognition</Label>
                <p className="text-sm text-muted-foreground">
                  AI will identify recurring patterns in your trading behavior
                </p>
              </div>
              <Switch id="pattern-recognition" defaultChecked onChange={onSettingChange} />
            </div>
            
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div className="space-y-0.5">
                <Label htmlFor="psychological-insights">Psychological Insights</Label>
                <p className="text-sm text-muted-foreground">
                  AI will analyze emotional patterns in your trading
                </p>
              </div>
              <Switch id="psychological-insights" defaultChecked onChange={onSettingChange} />
            </div>
            
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div className="space-y-0.5">
                <Label htmlFor="market-context">Include Market Context</Label>
                <p className="text-sm text-muted-foreground">
                  AI will consider broader market conditions in analysis
                </p>
              </div>
              <Switch id="market-context" defaultChecked onChange={onSettingChange} />
            </div>
            
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div className="space-y-0.5">
                <Label htmlFor="data-privacy">Privacy Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Limit data sent to AI models for enhanced privacy
                </p>
              </div>
              <Switch id="data-privacy" onChange={onSettingChange} />
            </div>
          </div>
          
          {saveResetButtons}
        </CardContent>
      </Card>
    </div>
  );
};

export default AiPreferences;
