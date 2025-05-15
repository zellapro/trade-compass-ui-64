
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { Calendar, Calendar as CalendarIcon, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface GoalDayData {
  date: string;
  completed: number;
  total: number;
  goals: {
    id: string;
    name: string;
    completed: boolean;
    category: string;
  }[];
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Generate sample data
const generateMockData = (year: number, month: number): GoalDayData[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const data: GoalDayData[] = [];
  
  const categories = ['Discipline', 'Emotional Control', 'Process Adherence', 'Mindfulness'];
  const goalTemplates = [
    'Follow trading plan completely',
    'Journal all trades within 1 hour',
    'Take breaks between trades',
    'Avoid revenge trading',
    'Complete pre-market routine',
    'Stick to risk parameters',
    '5-minute meditation before session',
    'Accept losses without frustration'
  ];
  
  for (let day = 1; day <= daysInMonth; day++) {
    // Skip weekends
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      continue; // Skip weekends
    }
    
    const dailyGoals = [];
    const goalCount = Math.floor(Math.random() * 3) + 2; // 2-4 goals per day
    
    for (let g = 0; g < goalCount; g++) {
      const goalTemplate = goalTemplates[Math.floor(Math.random() * goalTemplates.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const completed = Math.random() > 0.3; // 70% chance of completion
      
      dailyGoals.push({
        id: `goal-${day}-${g}`,
        name: goalTemplate,
        completed,
        category
      });
    }
    
    const completed = dailyGoals.filter(g => g.completed).length;
    
    data.push({
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      completed,
      total: dailyGoals.length,
      goals: dailyGoals
    });
  }
  
  return data;
};

export const GoalAchievementCalendar: React.FC = () => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [category, setCategory] = useState<string>("all");
  
  const calendarData = generateMockData(viewYear, viewMonth);
  
  const handlePreviousMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };
  
  const handleDownload = () => {
    console.log('Downloading goal achievement data...');
    // Implement download functionality
  };
  
  const getCellColor = (dayData: GoalDayData) => {
    if (!dayData) return 'bg-muted/20';
    
    const ratio = dayData.completed / dayData.total;
    
    if (ratio === 1) return 'bg-green-500/80 hover:bg-green-500';
    if (ratio >= 0.75) return 'bg-green-400/70 hover:bg-green-400';
    if (ratio >= 0.5) return 'bg-yellow-400/70 hover:bg-yellow-400';
    if (ratio > 0) return 'bg-orange-400/70 hover:bg-orange-400';
    return 'bg-red-400/70 hover:bg-red-400';
  };
  
  // Create a grid of days
  const renderCalendarGrid = () => {
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const rows = [];
    
    // Days of week header
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Create the calendar grid
    let dayCounter = 1;
    const weeksInMonth = Math.ceil((daysInMonth + firstDayOfMonth) / 7);
    
    for (let week = 0; week < weeksInMonth; week++) {
      const days = [];
      
      for (let day = 0; day < 7; day++) {
        if ((week === 0 && day < firstDayOfMonth) || dayCounter > daysInMonth) {
          // Empty cells before first day or after last day
          days.push(<td key={`empty-${week}-${day}`} className="p-1 text-center text-muted-foreground"></td>);
        } else {
          const currentDate = new Date(viewYear, viewMonth, dayCounter);
          const dateString = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(dayCounter).padStart(2, '0')}`;
          const dayData = calendarData.find(d => d.date === dateString);
          
          // Filter by category if selected
          const filteredGoals = dayData?.goals.filter(g => category === 'all' || g.category === category);
          const completedCount = filteredGoals?.filter(g => g.completed).length || 0;
          const totalCount = filteredGoals?.length || 0;
          
          days.push(
            <td key={dayCounter} className="p-0.5">
              <div className="relative">
                <div className={`
                  w-full h-14 rounded-md flex flex-col items-center justify-center cursor-pointer
                  relative transition-colors
                  ${getCellColor({ ...dayData!, completed: completedCount, total: totalCount || 1 })}
                  ${dateString === today.toISOString().split('T')[0] ? 'ring-2 ring-primary' : ''}
                `}>
                  <span className="font-medium text-sm">{dayCounter}</span>
                  {dayData && totalCount > 0 && (
                    <span className="text-xs">{completedCount}/{totalCount}</span>
                  )}
                </div>
              </div>
            </td>
          );
          dayCounter++;
        }
      }
      
      rows.push(<tr key={`week-${week}`}>{days}</tr>);
    }
    
    return (
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {daysOfWeek.map(day => (
              <th key={day} className="text-center p-1 text-xs font-medium text-muted-foreground">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };
  
  const getMonthStats = () => {
    if (calendarData.length === 0) return { total: 0, completed: 0, streak: 0 };
    
    const filteredGoals = calendarData.flatMap(day => 
      day.goals.filter(g => category === 'all' || g.category === category)
    );
    
    const total = filteredGoals.length;
    const completed = filteredGoals.filter(g => g.completed).length;
    
    // Calculate current streak
    let streak = 0;
    const sortedDays = [...calendarData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    for (const day of sortedDays) {
      const dayGoals = day.goals.filter(g => category === 'all' || g.category === category);
      if (dayGoals.length === 0) continue;
      
      const allCompleted = dayGoals.every(g => g.completed);
      if (allCompleted) {
        streak++;
      } else {
        break;
      }
    }
    
    return { total, completed, streak };
  };
  
  const { total, completed, streak } = getMonthStats();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Goal Achievement Calendar</CardTitle>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-lg font-medium min-w-28 text-center">
                {MONTHS[viewMonth]} {viewYear}
              </div>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center w-full sm:w-auto">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Discipline">Discipline</SelectItem>
                  <SelectItem value="Emotional Control">Emotional Control</SelectItem>
                  <SelectItem value="Process Adherence">Process Adherence</SelectItem>
                  <SelectItem value="Mindfulness">Mindfulness</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-2 px-4 bg-muted/30 rounded-lg mb-2">
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground">Completed</div>
              <div className="text-xl font-bold">{completed}/{total}</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground">Success Rate</div>
              <div className="text-xl font-bold">
                {total > 0 ? `${Math.round((completed / total) * 100)}%` : "0%"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground">Current Streak</div>
              <div className="text-xl font-bold">{streak} days</div>
            </div>
          </div>
          
          <div className="calendar-container">
            {renderCalendarGrid()}
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline" className="bg-green-500/80">100%</Badge>
            <Badge variant="outline" className="bg-green-400/70">75%+</Badge>
            <Badge variant="outline" className="bg-yellow-400/70">50%+</Badge>
            <Badge variant="outline" className="bg-orange-400/70">1-49%</Badge>
            <Badge variant="outline" className="bg-red-400/70">0%</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
