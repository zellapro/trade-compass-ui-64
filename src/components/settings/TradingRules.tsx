
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, ChevronDown, ChevronUp, Plus, Save } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface TradingRulesProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const TradingRules: React.FC<TradingRulesProps> = ({ onSettingChange, saveResetButtons }) => {
  const { toast } = useToast();

  // Custom Checklists
  const [checklists, setChecklists] = useState([
    {
      id: "1",
      name: "Morning Prep Checklist",
      items: ["Review market news", "Check key levels", "Plan trades"],
      isOpen: true
    },
    {
      id: "2",
      name: "Trade Entry Checklist",
      items: ["Confirm trend", "Check risk ratio", "Set stop loss"],
      isOpen: false
    },
    {
      id: "3",
      name: "Exit Checklist",
      items: ["Take profit hit", "Stop loss hit", "Technical reversal"],
      isOpen: false
    }
  ]);

  // New Checklist State
  const [newChecklistName, setNewChecklistName] = useState("");
  const [newChecklistItems, setNewChecklistItems] = useState(["Item 1", "Item 2", "Item 3"]);

  // Auto-Tagging Rules
  const [rules, setRules] = useState([
    { id: "1", name: "Premarket", condition: "entry_time < '09:30'", enabled: true },
    { id: "2", name: "Oversized Loss", condition: "loss > 200", enabled: true },
    { id: "3", name: "Home Run", condition: "profit > 500", enabled: true }
  ]);

  // New Rule State
  const [newRuleName, setNewRuleName] = useState("");
  const [conditionType, setConditionType] = useState("Time-based");
  const [condition, setCondition] = useState("");

  // Rule Settings
  const [autoValidation, setAutoValidation] = useState(true);
  const [showWarnings, setShowWarnings] = useState(true);
  const [requireCompletion, setRequireCompletion] = useState(false);
  
  // Trading Plan
  const [tradingPlanTitle, setTradingPlanTitle] = useState("");
  const [tradingPlanContent, setTradingPlanContent] = useState("");
  const [showInSidebar, setShowInSidebar] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Toggle checklist expanded state
  const toggleChecklist = (id: string) => {
    setChecklists(checklists.map(list => 
      list.id === id ? { ...list, isOpen: !list.isOpen } : list
    ));
  };

  // Add new checklist
  const addChecklist = () => {
    if (newChecklistName.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a checklist name",
        variant: "destructive"
      });
      return;
    }

    const filteredItems = newChecklistItems.filter(item => item.trim() !== "");
    if (filteredItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one checklist item",
        variant: "destructive"
      });
      return;
    }

    const newList = {
      id: Date.now().toString(),
      name: newChecklistName,
      items: filteredItems,
      isOpen: false
    };

    setChecklists([...checklists, newList]);
    setNewChecklistName("");
    setNewChecklistItems(["Item 1", "Item 2", "Item 3"]);
    
    toast({
      title: "Checklist Added",
      description: `${newChecklistName} has been created successfully.`
    });
    
    onSettingChange();
  };

  // Delete checklist
  const deleteChecklist = (id: string) => {
    setChecklists(checklists.filter(list => list.id !== id));
    
    toast({
      title: "Checklist Deleted",
      description: "The checklist has been removed."
    });
    
    onSettingChange();
  };

  // Add new rule
  const addRule = () => {
    if (newRuleName.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a rule name",
        variant: "destructive"
      });
      return;
    }

    if (condition.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a condition",
        variant: "destructive"
      });
      return;
    }

    const newRule = {
      id: Date.now().toString(),
      name: newRuleName,
      condition: condition,
      enabled: true
    };

    setRules([...rules, newRule]);
    setNewRuleName("");
    setCondition("");
    
    toast({
      title: "Rule Added",
      description: `${newRuleName} rule has been created successfully.`
    });
    
    onSettingChange();
  };

  // Toggle rule enabled state
  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
    onSettingChange();
  };

  // Update checklist item
  const updateChecklistItem = (listId: string, index: number, value: string) => {
    const updatedChecklists = checklists.map(list => {
      if (list.id === listId) {
        const updatedItems = [...list.items];
        updatedItems[index] = value;
        return { ...list, items: updatedItems };
      }
      return list;
    });
    setChecklists(updatedChecklists);
    onSettingChange();
  };

  // Update new checklist item
  const updateNewChecklistItem = (index: number, value: string) => {
    const updatedItems = [...newChecklistItems];
    updatedItems[index] = value;
    setNewChecklistItems(updatedItems);
  };

  // Remove checklist item
  const removeChecklistItem = (index: number) => {
    if (newChecklistItems.length > 1) {
      setNewChecklistItems(newChecklistItems.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Error",
        description: "At least one item is required",
        variant: "destructive"
      });
    }
  };

  // Add new checklist item
  const addChecklistItem = () => {
    setNewChecklistItems([...newChecklistItems, ""]);
  };

  // Save rule settings
  const saveRuleSettings = () => {
    toast({
      title: "Rule Settings Saved",
      description: "Your rule validation settings have been updated."
    });
    onSettingChange();
  };

  // Save checklist
  const saveChecklist = () => {
    toast({
      title: "Checklists Saved",
      description: "Your custom checklists have been saved."
    });
    onSettingChange();
  };
  
  // Save trading plan
  const saveTradingPlan = () => {
    if (!tradingPlanTitle) {
      toast({
        title: "Error",
        description: "Please enter a trading plan title",
        variant: "destructive"
      });
      return;
    }
    
    if (!tradingPlanContent) {
      toast({
        title: "Error",
        description: "Please enter trading plan content",
        variant: "destructive"
      });
      return;
    }
    
    toast.success("Trading plan saved successfully");
    onSettingChange();
  };
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  // Import trading plan
  const importTradingPlan = () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file to import",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate import
    toast.success(`File ${selectedFile.name} imported successfully`);
    
    // Reset the file input
    setSelectedFile(null);
    const fileInput = document.getElementById('trading-plan-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    
    onSettingChange();
  };

  return (
    <div className="space-y-8">
      {/* Trading Plan */}
      <Card className="border">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-center">Trading Plan</CardTitle>
          <CardDescription className="text-center">
            Link your trading plan to your journal
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Trading Plan Title</h3>
            <Input 
              placeholder="e.g., Q2 2025 Trading Plan"
              value={tradingPlanTitle}
              onChange={(e) => setTradingPlanTitle(e.target.value)}
            />
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Trading Plan Content</h3>
            <Textarea 
              placeholder="Enter your trading plan details here..."
              className="min-h-40"
              value={tradingPlanContent}
              onChange={(e) => setTradingPlanContent(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="show-sidebar" 
              checked={showInSidebar}
              onCheckedChange={setShowInSidebar}
            />
            <Label htmlFor="show-sidebar">Show in journal sidebar</Label>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={saveTradingPlan}>
              <Save className="mr-2 h-4 w-4" />
              Save Trading Plan
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-4">Import Trading Plan</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-48">
                <Input
                  id="trading-plan-file"
                  type="file"
                  accept=".pdf,.docx,.md,.txt"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supported formats: PDF, DOCX, MD, TXT
                </p>
              </div>
              <Button 
                onClick={importTradingPlan}
                disabled={!selectedFile}
                className="whitespace-nowrap"
              >
                Upload
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Checklists */}
      <Card className="border">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-center">Custom Checklists</CardTitle>
          <CardDescription className="text-center">
            Create and manage checklists for your trading workflow
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Existing Checklists */}
          <div className="space-y-4">
            {checklists.map((list) => (
              <div key={list.id} className="border rounded-md">
                <Collapsible open={list.isOpen} onOpenChange={() => toggleChecklist(list.id)}>
                  <div className="flex items-center p-3 gap-2">
                    <div className="text-primary">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 11L12 14L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="flex-1 font-medium text-lg">{list.name}</div>
                    <CollapsibleTrigger className="p-1">
                      {list.isOpen ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </CollapsibleTrigger>
                  </div>
                  
                  <CollapsibleContent className="px-3 pb-3">
                    <ul className="list-disc pl-8 space-y-2">
                      {list.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="w-full flex gap-1">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full flex gap-1 text-destructive hover:bg-destructive/10"
                        onClick={() => deleteChecklist(list.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>

          {/* Add New Checklist */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium text-center mb-4">Add New Checklist</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm mb-1">Checklist Name</p>
                <Input 
                  placeholder="e.g. Morning Prep, Entry Checklist" 
                  value={newChecklistName}
                  onChange={(e) => setNewChecklistName(e.target.value)}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm">Checklist Items</p>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline" 
                    onClick={addChecklistItem}
                    className="h-7 text-xs flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Add Item
                  </Button>
                </div>

                <div className="space-y-2">
                  {newChecklistItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={item}
                        placeholder={`Item ${idx + 1}`}
                        onChange={(e) => updateNewChecklistItem(idx, e.target.value)}
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeChecklistItem(idx)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Button 
              onClick={saveChecklist}
              className="bg-[#1eaedb] hover:bg-[#1eaedb]/90 text-white"
            >
              Save Checklist
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Tagging Rules */}
      <Card className="border">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-center">Auto-Tagging Rules</CardTitle>
          <CardDescription className="text-center">
            Configure rules to automatically tag your trades based on criteria
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Rules Table */}
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 text-sm font-medium">Rule Name</th>
                  <th className="text-left p-3 text-sm font-medium">Condition</th>
                  <th className="text-center p-3 text-sm font-medium">Enabled</th>
                  <th className="text-center p-3 text-sm font-medium w-10">Edit</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rules.map((rule) => (
                  <tr key={rule.id} className="bg-card">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 12V22H4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 7H2V12H22V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 22V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 7H16.5C17.1667 7 18.5 6.2 18.5 4C18.5 1.8 17.1667 1 16.5 1C15.8333 1 15 2 15 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 7H7.5C6.83333 7 5.5 6.2 5.5 4C5.5 1.8 6.83333 1 7.5 1C8.16667 1 9 2 9 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span>{rule.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="font-mono text-xs bg-muted/30 p-1 rounded">{rule.condition}</div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center">
                        <Switch 
                          checked={rule.enabled}
                          onCheckedChange={() => toggleRule(rule.id)}
                        />
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <button className="p-1 hover:bg-muted rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add New Rule */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium text-center mb-4">Add New Auto-Tag Rule</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm mb-1">Tag Name</p>
                <Input 
                  placeholder="e.g. Premarket, Oversize" 
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                />
              </div>
              
              <div>
                <p className="text-sm mb-1">Condition Type</p>
                <select 
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={conditionType}
                  onChange={(e) => setConditionType(e.target.value)}
                >
                  <option>Time-based</option>
                  <option>Profit-based</option>
                  <option>Loss-based</option>
                  <option>Symbol-based</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm mb-1">Condition</p>
              <Textarea
                placeholder="e.g., entry_time < '09:30' or profit > 500"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
              <p className="text-xs text-center text-muted-foreground mt-1">
                Use variables like: entry_time, exit_time, profit, loss, symbol, risk, reward, etc.
              </p>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={addRule}
                className="bg-[#1eaedb] hover:bg-[#1eaedb]/90 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Auto-Tag Rule
              </Button>
            </div>
          </div>

          {/* Rule Settings */}
          <div className="pt-4 border-t mt-6">
            <h3 className="text-lg font-medium text-center mb-4">Rule Validation Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Automatic Rule Validation</p>
                  <p className="text-sm text-muted-foreground">Automatically check trades against your rules</p>
                </div>
                <Switch 
                  checked={autoValidation} 
                  onCheckedChange={setAutoValidation}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Rule Violation Warnings</p>
                  <p className="text-sm text-muted-foreground">Display warnings when a trade violates your predefined rules</p>
                </div>
                <Switch 
                  checked={showWarnings} 
                  onCheckedChange={setShowWarnings}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Require Checklist Completion</p>
                  <p className="text-sm text-muted-foreground">Force checklist completion before allowing trade entry</p>
                </div>
                <Switch 
                  checked={requireCompletion} 
                  onCheckedChange={setRequireCompletion}
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                onClick={saveRuleSettings}
                variant="default"
              >
                Save Rule Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {saveResetButtons}
    </div>
  );
};

export default TradingRules;
