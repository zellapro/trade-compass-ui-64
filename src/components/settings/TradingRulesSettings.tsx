
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckSquare, Plus, Trash2, Edit, Copy, ArrowUp, ArrowDown, ChevronDown, X, Tag, Gauge, Clock, DollarSign, Percent, Calendar } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TradingRulesSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

interface ChecklistItem {
  id: string;
  text: string;
  required: boolean;
}

interface Checklist {
  id: string;
  name: string;
  description: string;
  items: ChecklistItem[];
  enabled: boolean;
}

interface AutoTagRule {
  id: string;
  name: string;
  condition: {
    field: string;
    operator: string;
    value: string;
  };
  tag: string;
  enabled: boolean;
}

const TradingRulesSettings: React.FC<TradingRulesSettingsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const [activeTab, setActiveTab] = useState("checklists");
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: "morning-prep",
      name: "Morning Preparation",
      description: "Checklist for market preparation before trading",
      enabled: true,
      items: [
        { id: "mp-1", text: "Review market news and events", required: true },
        { id: "mp-2", text: "Check economic calendar", required: true },
        { id: "mp-3", text: "Review watchlist and prepare trade ideas", required: true },
        { id: "mp-4", text: "Set risk parameters for the day", required: true },
        { id: "mp-5", text: "Check previous day's trades", required: false },
      ]
    },
    {
      id: "entry",
      name: "Trade Entry",
      description: "Checklist before entering a trade",
      enabled: true,
      items: [
        { id: "e-1", text: "Verify trade aligns with strategy", required: true },
        { id: "e-2", text: "Check risk/reward ratio (min 1:2)", required: true },
        { id: "e-3", text: "Identify stop loss level", required: true },
        { id: "e-4", text: "Identify profit target", required: true },
        { id: "e-5", text: "Check position size vs. risk limits", required: true },
        { id: "e-6", text: "Ensure not trading during news events", required: false },
      ]
    },
    {
      id: "exit",
      name: "Trade Exit",
      description: "Checklist for exiting trades",
      enabled: true,
      items: [
        { id: "ex-1", text: "Has profit target been reached?", required: false },
        { id: "ex-2", text: "Has stop loss been reached?", required: false },
        { id: "ex-3", text: "Has trade setup invalidated?", required: false },
        { id: "ex-4", text: "Are there reasons to take partial profits?", required: false },
        { id: "ex-5", text: "Record reason for exit", required: true },
      ]
    },
    {
      id: "post-review",
      name: "Post-Trade Review",
      description: "Checklist for reviewing completed trades",
      enabled: true,
      items: [
        { id: "pr-1", text: "Was the trade plan followed?", required: true },
        { id: "pr-2", text: "What went well in this trade?", required: true },
        { id: "pr-3", text: "What could be improved?", required: true },
        { id: "pr-4", text: "Were emotions well managed?", required: true },
        { id: "pr-5", text: "Record any lessons learned", required: true },
      ]
    },
  ]);
  
  const [autoTagRules, setAutoTagRules] = useState<AutoTagRule[]>([
    {
      id: "rule-1",
      name: "Premarket Trades",
      condition: {
        field: "time",
        operator: "before",
        value: "09:30"
      },
      tag: "Premarket",
      enabled: true
    },
    {
      id: "rule-2",
      name: "Oversized Loss",
      condition: {
        field: "loss",
        operator: "greater-than",
        value: "200"
      },
      tag: "Oversized",
      enabled: true
    },
    {
      id: "rule-3",
      name: "Gap Trade",
      condition: {
        field: "setup",
        operator: "contains",
        value: "Gap"
      },
      tag: "Gap",
      enabled: true
    },
    {
      id: "rule-4",
      name: "Emotional Trade",
      condition: {
        field: "notes",
        operator: "contains",
        value: "FOMO"
      },
      tag: "Emotional",
      enabled: true
    },
  ]);
  
  const toggleChecklist = (id: string) => {
    setChecklists(prev => prev.map(checklist => 
      checklist.id === id ? { ...checklist, enabled: !checklist.enabled } : checklist
    ));
    onSettingChange();
  };
  
  const toggleChecklistItem = (checklistId: string, itemId: string, field: 'required') => {
    setChecklists(prev => prev.map(checklist => 
      checklist.id === checklistId ? {
        ...checklist,
        items: checklist.items.map(item => 
          item.id === itemId ? { ...item, [field]: !item[field] } : item
        )
      } : checklist
    ));
    onSettingChange();
  };
  
  const toggleAutoTagRule = (id: string) => {
    setAutoTagRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
    onSettingChange();
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="checklists" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="checklists" className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            <span>Checklists</span>
          </TabsTrigger>
          <TabsTrigger value="auto-tagging" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span>Auto-Tagging</span>
          </TabsTrigger>
          <TabsTrigger value="scoring" className="flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            <span>Trade Scoring</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Checklists Tab */}
        <TabsContent value="checklists" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Trading Checklists</CardTitle>
              <CardDescription>Configure checklists to follow before, during, and after trades</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full space-y-4">
                {checklists.map((checklist) => (
                  <AccordionItem key={checklist.id} value={checklist.id} className="border rounded-lg px-4">
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <CheckSquare className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">{checklist.name}</h3>
                          <p className="text-sm text-muted-foreground">{checklist.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={checklist.enabled} 
                          onCheckedChange={() => toggleChecklist(checklist.id)}
                        />
                        <AccordionTrigger className="h-4 w-4 p-0 hover:bg-transparent" />
                      </div>
                    </div>
                    <AccordionContent className="pb-4">
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex items-center gap-2 h-8">
                            <Edit className="h-3 w-3" />
                            <span>Edit Name</span>
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-2 h-8">
                            <Copy className="h-3 w-3" />
                            <span>Duplicate</span>
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-2 h-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="h-3 w-3" />
                            <span>Delete</span>
                          </Button>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          {checklist.items.map((item, index) => (
                            <div key={item.id} className="flex items-center justify-between border rounded-md p-3 gap-2">
                              <div className="flex items-start gap-3 flex-1">
                                <div className="pt-0.5">
                                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <Input 
                                  value={item.text} 
                                  onChange={() => onSettingChange()} 
                                  className="border-0 bg-transparent px-0 py-0 focus-visible:ring-0"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Switch 
                                    id={`required-${item.id}`} 
                                    checked={item.required}
                                    onCheckedChange={() => toggleChecklistItem(checklist.id, item.id, 'required')} 
                                  />
                                  <Label htmlFor={`required-${item.id}`} className="text-xs">Required</Label>
                                </div>
                                
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="icon" className="h-7 w-7" disabled={index === 0}>
                                    <ArrowUp className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-7 w-7" disabled={index === checklist.items.length - 1}>
                                    <ArrowDown className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50">
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <Button variant="outline" size="sm" className="flex items-center gap-2 w-full">
                          <Plus className="h-4 w-4" />
                          <span>Add Checklist Item</span>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <Button variant="outline" className="mt-6 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Create New Checklist</span>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Auto-Tagging Tab */}
        <TabsContent value="auto-tagging" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Auto-Tagging Rules</CardTitle>
              <CardDescription>Create rules to automatically tag trades based on criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {autoTagRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{rule.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                          <span>If</span>
                          <Badge variant="outline" className="bg-muted font-normal">
                            {rule.condition.field === 'time' && <Clock className="h-3 w-3 mr-1" />}
                            {rule.condition.field === 'loss' && <DollarSign className="h-3 w-3 mr-1" />}
                            {rule.condition.field === 'setup' && <CheckSquare className="h-3 w-3 mr-1" />}
                            {rule.condition.field === 'notes' && <Edit className="h-3 w-3 mr-1" />}
                            {rule.condition.field}
                          </Badge>
                          <span>is</span>
                          <Badge variant="outline" className="bg-muted font-normal">
                            {rule.condition.operator}
                          </Badge>
                          <Badge variant="outline" className="bg-muted font-normal">
                            {rule.condition.value}
                          </Badge>
                          <span>then tag as</span>
                          <Badge className="bg-primary/80 text-primary-foreground font-normal">
                            <Tag className="h-3 w-3 mr-1" />
                            {rule.tag}
                          </Badge>
                        </div>
                      </div>
                      <Switch 
                        checked={rule.enabled} 
                        onCheckedChange={() => toggleAutoTagRule(rule.id)}
                      />
                    </div>
                  </div>
                ))}
                
                <Collapsible className="border rounded-lg p-4 border-dashed">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 w-full">
                      <Plus className="h-4 w-4" />
                      <span>Create New Auto-Tag Rule</span>
                      <ChevronDown className="h-4 w-4 ml-auto" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="rule-name">Rule Name</Label>
                      <Input id="rule-name" placeholder="Enter a name for this rule" className="mt-1" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label htmlFor="rule-field">Field</Label>
                        <Select defaultValue="time">
                          <SelectTrigger id="rule-field" className="mt-1">
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="time">Time</SelectItem>
                            <SelectItem value="profit">Profit</SelectItem>
                            <SelectItem value="loss">Loss</SelectItem>
                            <SelectItem value="setup">Setup</SelectItem>
                            <SelectItem value="notes">Notes</SelectItem>
                            <SelectItem value="broker">Broker</SelectItem>
                            <SelectItem value="symbol">Symbol</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="rule-operator">Operator</Label>
                        <Select defaultValue="before">
                          <SelectTrigger id="rule-operator" className="mt-1">
                            <SelectValue placeholder="Select operator" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="before">Before</SelectItem>
                            <SelectItem value="after">After</SelectItem>
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="greater-than">Greater Than</SelectItem>
                            <SelectItem value="less-than">Less Than</SelectItem>
                            <SelectItem value="contains">Contains</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="rule-value">Value</Label>
                        <Input id="rule-value" placeholder="e.g., 09:30, 200, VWAP" className="mt-1" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="rule-tag">Tag to Apply</Label>
                      <div className="flex gap-2 mt-1">
                        <Input id="rule-tag" placeholder="e.g., Premarket, Oversized, VWAP" />
                        <Select defaultValue="blue">
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Tag color" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                            <SelectItem value="orange">Orange</SelectItem>
                            <SelectItem value="purple">Purple</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Create Rule</Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Trade Scoring Tab */}
        <TabsContent value="scoring" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Trade Scoring Configuration</CardTitle>
              <CardDescription>Configure how trade execution scores are calculated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Score Components</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure the weight of each component in the final trade score
                  </p>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <Label htmlFor="entry-weight" className="font-medium">Entry Quality</Label>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                        <Input 
                          id="entry-weight" 
                          type="range" 
                          min="0" 
                          max="100" 
                          step="5" 
                          defaultValue="30"
                          onChange={onSettingChange} 
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          How well the entry matched your trading plan and setup
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <Label htmlFor="exit-weight" className="font-medium">Exit Quality</Label>
                          <span className="text-sm font-medium">30%</span>
                        </div>
                        <Input 
                          id="exit-weight" 
                          type="range" 
                          min="0" 
                          max="100" 
                          step="5" 
                          defaultValue="30"
                          onChange={onSettingChange} 
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          How well you managed the exit according to your plan
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <Label htmlFor="plan-weight" className="font-medium">Plan Adherence</Label>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                        <Input 
                          id="plan-weight" 
                          type="range" 
                          min="0" 
                          max="100" 
                          step="5" 
                          defaultValue="25"
                          onChange={onSettingChange} 
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          How closely you followed your trading plan
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <Label htmlFor="risk-weight" className="font-medium">Risk Management</Label>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                        <Input 
                          id="risk-weight" 
                          type="range" 
                          min="0" 
                          max="100" 
                          step="5" 
                          defaultValue="15"
                          onChange={onSettingChange} 
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Proper position sizing and risk/reward ratio
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Grading Scale</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure the thresholds for trade grades
                  </p>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">A</div>
                          <span className="font-medium">A Grade (Excellent)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Score:</span>
                          <Input 
                            type="number" 
                            min="1" 
                            max="100" 
                            defaultValue="90"
                            className="w-20 text-center"
                            onChange={onSettingChange} 
                          />
                          <span className="text-sm">points or higher</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">B</div>
                          <span className="font-medium">B Grade (Good)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Score:</span>
                          <Input 
                            type="number" 
                            min="1" 
                            max="100" 
                            defaultValue="75"
                            className="w-20 text-center"
                            onChange={onSettingChange} 
                          />
                          <span className="text-sm">to 89 points</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white font-medium">C</div>
                          <span className="font-medium">C Grade (Average)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Score:</span>
                          <Input 
                            type="number" 
                            min="1" 
                            max="100" 
                            defaultValue="60"
                            className="w-20 text-center"
                            onChange={onSettingChange} 
                          />
                          <span className="text-sm">to 74 points</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-medium">D</div>
                          <span className="font-medium">D Grade (Poor)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Score:</span>
                          <Input 
                            type="number" 
                            min="1" 
                            max="100" 
                            defaultValue="40"
                            className="w-20 text-center"
                            onChange={onSettingChange} 
                          />
                          <span className="text-sm">to 59 points</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Auto-grading</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatically grade trades based on checklist completion and rule adherence
                    </p>
                  </div>
                  <Switch defaultChecked onChange={onSettingChange} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {saveResetButtons}
    </div>
  );
};

// Add missing Badge component
const Badge = ({ children, className, variant }: { children: React.ReactNode, className?: string, variant?: "default" | "outline" }) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const variantClasses = variant === "outline" 
    ? "border border-input hover:bg-accent hover:text-accent-foreground" 
    : "bg-primary text-primary-foreground hover:bg-primary/80";
  
  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </div>
  );
};

export default TradingRulesSettings;
