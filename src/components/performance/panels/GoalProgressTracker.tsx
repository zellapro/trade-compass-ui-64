
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function GoalProgressTracker() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Improve Win Rate to 70%",
      progress: 68,
      target: 70,
      deadline: "June 30",
      completed: false
    },
    {
      id: 2,
      title: "Reduce Maximum Drawdown to 5%",
      progress: 4,
      target: 5,
      deadline: "July 15",
      completed: false
    },
    {
      id: 3,
      title: "Complete 50 Trades with Perfect Checklist Adherence",
      progress: 32,
      target: 50,
      deadline: "July 31",
      completed: false
    }
  ]);
  
  const handleMarkComplete = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };
  
  const handleAddGoal = () => {
    // In a real implementation, this would open a modal
    console.log("Add new goal");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Goal Progress Tracker</CardTitle>
          <Button size="sm" variant="outline" onClick={handleAddGoal}>
            <Plus className="h-4 w-4 mr-1" />
            Add Goal
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map(goal => (
          <div 
            key={goal.id} 
            className={`p-4 rounded-lg border ${goal.completed ? 'bg-muted/50 border-muted' : 'bg-card border-border'}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="space-y-1">
                <h3 className={`font-medium ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>{goal.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                    Due {goal.deadline}
                  </span>
                </div>
              </div>
              <Button 
                variant={goal.completed ? "default" : "outline"} 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => handleMarkComplete(goal.id)}
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Progress</span>
                <span>{goal.progress} / {goal.target}</span>
              </div>
              <Progress value={(goal.progress / goal.target) * 100} className="h-2" />
            </div>
          </div>
        ))}
      </CardContent>
      {goals.length === 0 && (
        <CardFooter className="pt-0">
          <div className="w-full text-center py-8 text-muted-foreground">
            No active goals. Click "Add Goal" to create one.
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
