
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription, 
  CardFooter
} from "@/components/ui/card";
import { 
  Focus,
  Calendar,
  Plus,
  Trash2,
  Save,
  Edit2,
  ToggleLeft,
  ToggleRight,
  Clock,
  Copy,
  Check,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

// Types
type FocusCategory = "pattern" | "execution" | "mindset" | "strategy" | "other";
type Recurrence = "daily" | "weekday" | "weekend" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "mon-wed-fri" | "tue-thu" | "weekly";

interface FocusItem {
  id: number;
  title: string;
  description: string;
  category: FocusCategory;
  isTemplate: boolean;
  isActive: boolean;
  recurrence: Recurrence;
  actionItems: string[];
}

interface Template {
  id: number;
  title: string;
  description: string;
  category: FocusCategory;
  actionItems: string[];
}

export function DailyFocusConfigurationPanel() {
  // Sample templates
  const templates: Template[] = [
    {
      id: 1,
      title: "Wait for Confirmation",
      description: "Focus on waiting for clear price action confirmation before entering trades",
      category: "execution",
      actionItems: [
        "Wait for candle close",
        "Look for volume confirmation",
        "Ensure price is above/below key level"
      ]
    },
    {
      id: 2,
      title: "Proper Stop Loss Placement",
      description: "Focus on placing stops at logical levels based on market structure",
      category: "execution",
      actionItems: [
        "Place stops beyond recent swing points",
        "Account for volatility",
        "Don't place stops at obvious levels"
      ]
    },
    {
      id: 3,
      title: "Manage Emotions During Drawdowns",
      description: "Practice techniques to stay calm during losing periods",
      category: "mindset",
      actionItems: [
        "Take deep breaths when feeling stressed",
        "Review trading plan when uncertain",
        "Accept losses as cost of doing business"
      ]
    },
    {
      id: 4,
      title: "Volume Price Analysis",
      description: "Focus on the relationship between volume and price movements",
      category: "pattern",
      actionItems: [
        "Look for volume divergence",
        "Note climax volume at reversals",
        "Identify low volume pullbacks"
      ]
    },
  ];
  
  // Focus items
  const [focusItems, setFocusItems] = useState<FocusItem[]>([
    {
      id: 1,
      title: "Wait for Confirmation",
      description: "Focus on waiting for clear price action confirmation before entering trades",
      category: "execution",
      isTemplate: true,
      isActive: true,
      recurrence: "daily",
      actionItems: [
        "Wait for candle close",
        "Look for volume confirmation",
        "Ensure price is above/below key level"
      ]
    },
    {
      id: 2,
      title: "Manage Trading Size",
      description: "Be disciplined with position sizing and don't overtrade",
      category: "mindset",
      isTemplate: false,
      isActive: true,
      recurrence: "weekday",
      actionItems: [
        "Max 2% risk per trade",
        "Reduce size after two consecutive losses",
        "Follow position size rules in trading plan"
      ]
    }
  ]);
  
  const [activeTab, setActiveTab] = useState("configured");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [newFocusItem, setNewFocusItem] = useState<Omit<FocusItem, 'id'>>({
    title: "",
    description: "",
    category: "execution",
    isTemplate: false,
    isActive: true,
    recurrence: "daily",
    actionItems: [""]
  });
  
  const [editFocusItem, setEditFocusItem] = useState<FocusItem | null>(null);
  
  const handleAddActionItem = () => {
    setNewFocusItem({
      ...newFocusItem,
      actionItems: [...newFocusItem.actionItems, ""]
    });
  };
  
  const handleEditActionItem = () => {
    if (!editFocusItem) return;
    
    setEditFocusItem({
      ...editFocusItem,
      actionItems: [...editFocusItem.actionItems, ""]
    });
  };
  
  const handleRemoveActionItem = (index: number) => {
    setNewFocusItem({
      ...newFocusItem,
      actionItems: newFocusItem.actionItems.filter((_, i) => i !== index)
    });
  };
  
  const handleRemoveEditActionItem = (index: number) => {
    if (!editFocusItem) return;
    
    setEditFocusItem({
      ...editFocusItem,
      actionItems: editFocusItem.actionItems.filter((_, i) => i !== index)
    });
  };
  
  const handleUpdateActionItem = (index: number, value: string) => {
    const updatedItems = [...newFocusItem.actionItems];
    updatedItems[index] = value;
    
    setNewFocusItem({
      ...newFocusItem,
      actionItems: updatedItems
    });
  };
  
  const handleUpdateEditActionItem = (index: number, value: string) => {
    if (!editFocusItem) return;
    
    const updatedItems = [...editFocusItem.actionItems];
    updatedItems[index] = value;
    
    setEditFocusItem({
      ...editFocusItem,
      actionItems: updatedItems
    });
  };
  
  const handleAddFocusItem = () => {
    if (!newFocusItem.title) {
      toast({
        title: "Error",
        description: "Focus item title is required",
        variant: "destructive"
      });
      return;
    }
    
    // Filter empty action items
    const filteredActionItems = newFocusItem.actionItems.filter(item => item.trim() !== "");
    
    if (filteredActionItems.length === 0) {
      toast({
        title: "Error",
        description: "At least one action item is required",
        variant: "destructive"
      });
      return;
    }
    
    const itemToAdd: FocusItem = {
      id: Math.max(0, ...focusItems.map(item => item.id)) + 1,
      ...newFocusItem,
      actionItems: filteredActionItems
    };
    
    setFocusItems([...focusItems, itemToAdd]);
    setNewFocusItem({
      title: "",
      description: "",
      category: "execution",
      isTemplate: false,
      isActive: true,
      recurrence: "daily",
      actionItems: [""]
    });
    setIsAddingItem(false);
    
    toast({
      title: "Focus Item Added",
      description: "New daily focus item has been added"
    });
  };
  
  const handleDeleteFocusItem = (id: number) => {
    setFocusItems(focusItems.filter(item => item.id !== id));
    toast({
      title: "Focus Item Deleted",
      description: "Focus item has been removed"
    });
  };
  
  const handleEditStart = (item: FocusItem) => {
    setEditingId(item.id);
    setEditFocusItem({...item});
  };
  
  const handleEditSave = () => {
    if (!editFocusItem) return;
    
    // Filter empty action items
    const filteredActionItems = editFocusItem.actionItems.filter(item => item.trim() !== "");
    
    if (!editFocusItem.title || filteredActionItems.length === 0) {
      toast({
        title: "Error",
        description: "Title and at least one action item are required",
        variant: "destructive"
      });
      return;
    }
    
    setFocusItems(focusItems.map(item => 
      item.id === editingId ? {...editFocusItem, actionItems: filteredActionItems} : item
    ));
    setEditingId(null);
    setEditFocusItem(null);
    
    toast({
      title: "Focus Item Updated",
      description: "Your focus item has been updated successfully"
    });
  };
  
  const handleToggleActive = (id: number) => {
    setFocusItems(focusItems.map(item => {
      if (item.id === id) {
        return { ...item, isActive: !item.isActive };
      }
      return item;
    }));
  };
  
  const handleUseTemplate = (template: Template) => {
    setNewFocusItem({
      title: template.title,
      description: template.description,
      category: template.category,
      isTemplate: true,
      isActive: true,
      recurrence: "daily",
      actionItems: [...template.actionItems]
    });
    setIsAddingItem(true);
    setActiveTab("configured");
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Focus className="mr-2 h-5 w-5" />
            <span>Daily Focus Configuration</span>
          </CardTitle>
          <Badge variant="outline">
            {focusItems.filter(item => item.isActive).length} Active
          </Badge>
        </div>
        <CardDescription>
          Configure your daily focus items that appear on your dashboard
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="configured" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="configured">Configured Items</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="configured" className="space-y-4 p-6 pt-4">
          {focusItems.map((item) => (
            <div 
              key={item.id} 
              className={cn(
                "border rounded-md p-3",
                editingId === item.id ? "border-primary" : "border-border",
                !item.isActive && "opacity-60"
              )}
            >
              {editingId === item.id ? (
                <div className="space-y-3">
                  <Input 
                    value={editFocusItem?.title || ""} 
                    onChange={e => setEditFocusItem({...editFocusItem!, title: e.target.value})}
                    placeholder="Focus title"
                  />
                  
                  <Textarea 
                    value={editFocusItem?.description || ""} 
                    onChange={e => setEditFocusItem({...editFocusItem!, description: e.target.value})}
                    placeholder="Description"
                    className="h-20"
                  />
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Select 
                      value={editFocusItem?.category} 
                      onValueChange={val => setEditFocusItem({
                        ...editFocusItem!, 
                        category: val as FocusCategory
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pattern">Pattern Recognition</SelectItem>
                        <SelectItem value="execution">Trade Execution</SelectItem>
                        <SelectItem value="mindset">Trading Mindset</SelectItem>
                        <SelectItem value="strategy">Strategy</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={editFocusItem?.recurrence} 
                      onValueChange={val => setEditFocusItem({
                        ...editFocusItem!, 
                        recurrence: val as Recurrence
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Recurrence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Every Day</SelectItem>
                        <SelectItem value="weekday">Weekdays</SelectItem>
                        <SelectItem value="weekend">Weekends</SelectItem>
                        <SelectItem value="monday">Mondays</SelectItem>
                        <SelectItem value="tuesday">Tuesdays</SelectItem>
                        <SelectItem value="wednesday">Wednesdays</SelectItem>
                        <SelectItem value="thursday">Thursdays</SelectItem>
                        <SelectItem value="friday">Fridays</SelectItem>
                        <SelectItem value="mon-wed-fri">Mon/Wed/Fri</SelectItem>
                        <SelectItem value="tue-thu">Tue/Thu</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Action Items:</div>
                    {editFocusItem?.actionItems.map((action, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input 
                          value={action} 
                          onChange={e => handleUpdateEditActionItem(index, e.target.value)}
                          placeholder={`Action item ${index + 1}`}
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-9 w-9 p-0"
                          onClick={() => handleRemoveEditActionItem(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full mt-2"
                      onClick={handleEditActionItem}
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add Action Item
                    </Button>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setEditingId(null);
                        setEditFocusItem(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleEditSave}
                    >
                      <Save className="mr-1 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={cn(
                          "h-8 w-8 p-0 mr-2",
                          item.isActive ? "text-green-500" : "text-muted-foreground"
                        )}
                        onClick={() => handleToggleActive(item.id)}
                      >
                        {item.isActive ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                      </Button>
                      <span className={cn(
                        "font-medium",
                        !item.isActive && "text-muted-foreground"
                      )}>
                        {item.title}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => handleEditStart(item)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-100"
                        onClick={() => handleDeleteFocusItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </div>
                  
                  <div className="mt-3 space-y-1">
                    {item.actionItems.map((action, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <Check className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={cn(
                        "text-xs",
                        item.category === "pattern" ? "border-purple-200 bg-purple-50 text-purple-700" :
                        item.category === "execution" ? "border-blue-200 bg-blue-50 text-blue-700" :
                        item.category === "mindset" ? "border-green-200 bg-green-50 text-green-700" :
                        item.category === "strategy" ? "border-amber-200 bg-amber-50 text-amber-700" :
                        "border-gray-200 bg-gray-50 text-gray-700"
                      )}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </Badge>
                      
                      {item.isTemplate && (
                        <Badge variant="outline" className="border-cyan-200 bg-cyan-50 text-cyan-700 text-xs">
                          Template
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        {item.recurrence === "daily" ? "Every day" :
                         item.recurrence === "weekday" ? "Weekdays" :
                         item.recurrence === "weekend" ? "Weekends" :
                         item.recurrence === "monday" ? "Mondays" :
                         item.recurrence === "tuesday" ? "Tuesdays" :
                         item.recurrence === "wednesday" ? "Wednesdays" :
                         item.recurrence === "thursday" ? "Thursdays" :
                         item.recurrence === "friday" ? "Fridays" :
                         item.recurrence === "mon-wed-fri" ? "Mon/Wed/Fri" :
                         item.recurrence === "tue-thu" ? "Tue/Thu" : "Weekly"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isAddingItem ? (
            <div className="border rounded-md p-3 border-primary">
              <div className="space-y-3">
                <Input 
                  value={newFocusItem.title} 
                  onChange={e => setNewFocusItem({...newFocusItem, title: e.target.value})}
                  placeholder="Enter focus title"
                />
                
                <Textarea 
                  value={newFocusItem.description} 
                  onChange={e => setNewFocusItem({...newFocusItem, description: e.target.value})}
                  placeholder="Add a description"
                  className="h-20"
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <Select 
                    value={newFocusItem.category} 
                    onValueChange={val => setNewFocusItem({
                      ...newFocusItem, 
                      category: val as FocusCategory
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pattern">Pattern Recognition</SelectItem>
                      <SelectItem value="execution">Trade Execution</SelectItem>
                      <SelectItem value="mindset">Trading Mindset</SelectItem>
                      <SelectItem value="strategy">Strategy</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={newFocusItem.recurrence} 
                    onValueChange={val => setNewFocusItem({
                      ...newFocusItem, 
                      recurrence: val as Recurrence
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Recurrence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Every Day</SelectItem>
                      <SelectItem value="weekday">Weekdays</SelectItem>
                      <SelectItem value="weekend">Weekends</SelectItem>
                      <SelectItem value="monday">Mondays</SelectItem>
                      <SelectItem value="tuesday">Tuesdays</SelectItem>
                      <SelectItem value="wednesday">Wednesdays</SelectItem>
                      <SelectItem value="thursday">Thursdays</SelectItem>
                      <SelectItem value="friday">Fridays</SelectItem>
                      <SelectItem value="mon-wed-fri">Mon/Wed/Fri</SelectItem>
                      <SelectItem value="tue-thu">Tue/Thu</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium">Action Items:</div>
                  {newFocusItem.actionItems.map((action, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input 
                        value={action} 
                        onChange={e => handleUpdateActionItem(index, e.target.value)}
                        placeholder={`Action item ${index + 1}`}
                      />
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-9 w-9 p-0"
                        onClick={() => handleRemoveActionItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full mt-2"
                    onClick={handleAddActionItem}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Action Item
                  </Button>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsAddingItem(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleAddFocusItem}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Focus Item
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => setIsAddingItem(true)}
            >
              <Plus className="mr-1 h-4 w-4" />
              Add New Focus Item
            </Button>
          )}
        </TabsContent>
        
        <TabsContent value="templates" className="p-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="border overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{template.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-1">
                    {template.actionItems.map((action, index) => (
                      <div key={index} className="flex items-center text-xs">
                        <Check className="h-3 w-3 mr-1 text-green-500 flex-shrink-0" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <div className="px-6 py-2 bg-muted/50 border-t flex items-center justify-between">
                  <Badge variant="outline" className={cn(
                    "text-xs",
                    template.category === "pattern" ? "border-purple-200 bg-purple-50 text-purple-700" :
                    template.category === "execution" ? "border-blue-200 bg-blue-50 text-blue-700" :
                    template.category === "mindset" ? "border-green-200 bg-green-50 text-green-700" :
                    template.category === "strategy" ? "border-amber-200 bg-amber-50 text-amber-700" :
                    "border-gray-200 bg-gray-50 text-gray-700"
                  )}>
                    {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Use Template
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="pt-3 border-t bg-muted/50 flex justify-between">
        <div className="text-xs text-muted-foreground">
          Focus items will be synced with your Daily Focus panel
        </div>
        <Button size="sm" onClick={() => {
          toast({
            title: "Settings Saved",
            description: "Your focus configurations have been saved.",
          });
        }}>
          Save Configuration
        </Button>
      </CardFooter>
    </Card>
  );
}
