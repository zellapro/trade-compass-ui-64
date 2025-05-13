
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
  Target, 
  Plus, 
  X, 
  Save, 
  Edit2, 
  Check, 
  ChevronUp, 
  ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

// Example goal data structure
type GoalType = "limit" | "boolean" | "minimum" | "completion";

interface Goal {
  id: number;
  title: string;
  target?: number; 
  type: GoalType;
  unit?: string;
  enabled: boolean;
  priority: "high" | "medium" | "low";
}

export function GoalConfigurationPanel() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Take only 3 trades per day",
      target: 3,
      type: "limit",
      enabled: true,
      priority: "high"
    },
    {
      id: 2,
      title: "No trades after 12PM",
      type: "boolean",
      enabled: true,
      priority: "medium"
    },
    {
      id: 3,
      title: "Win rate above 65%",
      target: 65,
      type: "minimum",
      unit: "%",
      enabled: true,
      priority: "high"
    },
    {
      id: 4,
      title: "Journal every trade",
      target: 100,
      type: "completion",
      unit: "%",
      enabled: true,
      priority: "medium"
    }
  ]);
  
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: "",
    type: "limit",
    target: undefined,
    unit: "",
    enabled: true,
    priority: "medium"
  });
  
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editGoal, setEditGoal] = useState<Goal | null>(null);
  
  const handleAddGoal = () => {
    if (!newGoal.title) {
      toast({
        title: "Error",
        description: "Goal title is required",
        variant: "destructive"
      });
      return;
    }
    
    if ((newGoal.type === "limit" || newGoal.type === "minimum" || newGoal.type === "completion") && newGoal.target === undefined) {
      toast({
        title: "Error",
        description: "Target value is required for this goal type",
        variant: "destructive"
      });
      return;
    }
    
    const goalToAdd: Goal = {
      id: Math.max(0, ...goals.map(g => g.id)) + 1,
      title: newGoal.title || "",
      target: newGoal.target,
      type: newGoal.type as GoalType,
      unit: newGoal.unit,
      enabled: true,
      priority: newGoal.priority as "high" | "medium" | "low"
    };
    
    setGoals([...goals, goalToAdd]);
    setNewGoal({
      title: "",
      type: "limit",
      target: undefined,
      unit: "",
      enabled: true,
      priority: "medium"
    });
    setIsAddingGoal(false);
    
    toast({
      title: "Goal Added",
      description: "New goal has been added to your tracker",
    });
  };
  
  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast({
      title: "Goal Deleted",
      description: "Goal has been removed from your tracker",
    });
  };
  
  const handleEditStart = (goal: Goal) => {
    setEditingId(goal.id);
    setEditGoal({...goal});
  };
  
  const handleEditSave = () => {
    if (!editGoal) return;
    
    setGoals(goals.map(goal => goal.id === editingId ? editGoal : goal));
    setEditingId(null);
    setEditGoal(null);
    
    toast({
      title: "Goal Updated",
      description: "Your goal has been updated successfully",
    });
  };
  
  const handleMoveGoal = (id: number, direction: "up" | "down") => {
    const currentIndex = goals.findIndex(goal => goal.id === id);
    if (
      (direction === "up" && currentIndex === 0) || 
      (direction === "down" && currentIndex === goals.length - 1)
    ) return;
    
    const newGoals = [...goals];
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    
    // Swap positions
    [newGoals[currentIndex], newGoals[targetIndex]] = [newGoals[targetIndex], newGoals[currentIndex]];
    setGoals(newGoals);
  };
  
  const handleToggleEnable = (id: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        return { ...goal, enabled: !goal.enabled };
      }
      return goal;
    }));
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Target className="mr-2 h-5 w-5" />
            <span>Goal Configuration</span>
          </CardTitle>
          <Badge variant="outline">
            {goals.filter(goal => goal.enabled).length}/{goals.length} Active
          </Badge>
        </div>
        <CardDescription>
          Configure your trading goals that appear on your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => (
          <div 
            key={goal.id} 
            className={cn(
              "border rounded-md p-3",
              editingId === goal.id ? "border-primary" : "border-border",
              !goal.enabled && "opacity-60"
            )}
          >
            {editingId === goal.id ? (
              <div className="space-y-3">
                <Input 
                  value={editGoal?.title || ""} 
                  onChange={e => setEditGoal({...editGoal!, title: e.target.value})}
                  placeholder="Goal title"
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <Select 
                    value={editGoal?.type} 
                    onValueChange={val => setEditGoal({
                      ...editGoal!, 
                      type: val as GoalType
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Goal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="limit">Limit (stay under)</SelectItem>
                      <SelectItem value="boolean">Boolean (yes/no)</SelectItem>
                      <SelectItem value="minimum">Minimum (stay above)</SelectItem>
                      <SelectItem value="completion">Completion (complete all)</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={editGoal?.priority} 
                    onValueChange={val => setEditGoal({
                      ...editGoal!, 
                      priority: val as "high" | "medium" | "low"
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {editGoal?.type !== "boolean" && (
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={editGoal?.target || ""}
                      onChange={e => setEditGoal({...editGoal!, target: parseInt(e.target.value) || 0})}
                      placeholder="Target value"
                      className="w-2/3"
                    />
                    <Input
                      value={editGoal?.unit || ""}
                      onChange={e => setEditGoal({...editGoal!, unit: e.target.value})}
                      placeholder="Unit (optional)"
                      className="w-1/3"
                    />
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setEditingId(null);
                      setEditGoal(null);
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
                        "h-7 w-7 p-0 rounded-full mr-2",
                        goal.enabled ? 
                          (goal.priority === "high" ? "text-red-500" : 
                          goal.priority === "medium" ? "text-amber-500" : 
                          "text-blue-500") : 
                          "text-muted-foreground"
                      )}
                      onClick={() => handleToggleEnable(goal.id)}
                    >
                      {goal.enabled ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </Button>
                    <span className={cn(
                      "font-medium",
                      !goal.enabled && "text-muted-foreground"
                    )}>
                      {goal.title}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => handleMoveGoal(goal.id, "up")}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => handleMoveGoal(goal.id, "down")}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => handleEditStart(goal)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-100"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {goal.type !== "boolean" && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    {goal.type === "limit" ? "Stay under" : 
                     goal.type === "minimum" ? "Stay above" : 
                     "Complete"}: <span className="font-medium">{goal.target}{goal.unit || ""}</span>
                  </div>
                )}
                
                <div className="mt-1 text-xs">
                  <Badge variant="secondary" className="text-xs">
                    {goal.type === "limit" ? "Limit" : 
                     goal.type === "minimum" ? "Minimum" : 
                     goal.type === "boolean" ? "Boolean" : 
                     "Completion"}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "ml-2 text-xs",
                      goal.priority === "high" ? "border-red-200 bg-red-50 text-red-700" : 
                      goal.priority === "medium" ? "border-amber-200 bg-amber-50 text-amber-700" : 
                      "border-blue-200 bg-blue-50 text-blue-700"
                    )}
                  >
                    {goal.priority === "high" ? "High" : 
                     goal.priority === "medium" ? "Medium" : 
                     "Low"} priority
                  </Badge>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isAddingGoal ? (
          <div className="border rounded-md p-3 border-primary">
            <div className="space-y-3">
              <Input 
                value={newGoal.title} 
                onChange={e => setNewGoal({...newGoal, title: e.target.value})}
                placeholder="Enter goal title"
              />
              
              <div className="grid grid-cols-2 gap-2">
                <Select 
                  value={newGoal.type} 
                  onValueChange={val => setNewGoal({
                    ...newGoal, 
                    type: val as GoalType
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="limit">Limit (stay under)</SelectItem>
                    <SelectItem value="boolean">Boolean (yes/no)</SelectItem>
                    <SelectItem value="minimum">Minimum (stay above)</SelectItem>
                    <SelectItem value="completion">Completion (complete all)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={newGoal.priority} 
                  onValueChange={val => setNewGoal({
                    ...newGoal, 
                    priority: val as "high" | "medium" | "low"
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {newGoal.type !== "boolean" && (
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={newGoal.target || ""}
                    onChange={e => setNewGoal({...newGoal, target: parseInt(e.target.value) || undefined})}
                    placeholder="Target value"
                    className="w-2/3"
                  />
                  <Input
                    value={newGoal.unit || ""}
                    onChange={e => setNewGoal({...newGoal, unit: e.target.value})}
                    placeholder="Unit (optional)"
                    className="w-1/3"
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsAddingGoal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={handleAddGoal}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Goal
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={() => setIsAddingGoal(true)}
          >
            <Plus className="mr-1 h-4 w-4" />
            Add New Goal
          </Button>
        )}
      </CardContent>
      <CardFooter className="pt-3 border-t bg-muted/50 flex justify-between">
        <div className="text-xs text-muted-foreground">
          Goals will be synced with your Goal Tracker
        </div>
        <Button size="sm" onClick={() => {
          toast({
            title: "Settings Saved",
            description: "Your goal configurations have been saved successfully.",
          });
        }}>
          Save Configuration
        </Button>
      </CardFooter>
    </Card>
  );
}
