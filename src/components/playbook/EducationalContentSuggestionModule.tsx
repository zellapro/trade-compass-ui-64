
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { showToast } from "@/components/playbook/fixedToast";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  BookText,
  FileText,
  Youtube,
  AudioLines,
  FileQuestion,
  CheckCircle2,
  ExternalLink,
  Bookmark,
  Star,
  ThumbsUp,
  ThumbsDown,
  MousePointerClick,
  Download,
  Heart,
  ArrowRight,
  FileSpreadsheet,
  ListChecks,
  Filter,
  BarChart,
  XCircle,
  UserCog,
  BrainCircuit,
  Layers,
  Lightbulb
} from "lucide-react";

// Mock data for educational content
const educationalContent = [
  {
    id: "content-1",
    title: "Mastering Position Sizing for Consistent Growth",
    type: "video",
    source: "YouTube",
    author: "Pro Trader Academy",
    duration: "22:15",
    match: 95,
    matchReason: "Based on your risk management habits",
    category: "risk-management",
    bookmark: true,
    url: "#",
    tags: ["position-sizing", "risk-management", "growth"],
    thumbnail: "https://example.com/thumbnail1.jpg",
    usefulRating: 4.7,
    userRated: 8
  },
  {
    id: "content-2",
    title: "Psychology of Revenge Trading: Breaking the Cycle",
    type: "article",
    source: "Trading Journal",
    author: "Dr. Sarah Thompson",
    duration: "8 min read",
    match: 93,
    matchReason: "Based on your recent trading patterns",
    category: "psychology",
    bookmark: false,
    url: "#",
    tags: ["trading-psychology", "revenge-trading", "discipline"],
    usefulRating: 4.5,
    userRated: 12
  },
  {
    id: "content-3",
    title: "Pre-Market Routine Checklist for Disciplined Traders",
    type: "checklist",
    source: "TraderInsights",
    author: "Mark Williams",
    duration: "1 page",
    match: 90,
    matchReason: "Recommended for your style",
    category: "discipline",
    bookmark: true,
    url: "#",
    tags: ["preparation", "routine", "consistency"],
    usefulRating: 4.8,
    userRated: 15
  },
  {
    id: "content-4",
    title: "Exit Strategy Optimization Framework",
    type: "spreadsheet",
    source: "TradeModels",
    author: "Alex Chen",
    duration: "Interactive",
    match: 88,
    matchReason: "Addresses your exit timing issues",
    category: "execution",
    bookmark: false,
    url: "#",
    tags: ["exit-strategy", "profit-taking", "scaling"],
    usefulRating: 4.2,
    userRated: 5
  },
  {
    id: "content-5",
    title: "The Psychology of Trading: Managing Fear and Greed",
    type: "podcast",
    source: "Trading Mindset",
    author: "Dr. Brett Steenbarger",
    duration: "45:22",
    match: 85,
    matchReason: "Related to emotional challenges",
    category: "psychology",
    bookmark: false,
    url: "#",
    tags: ["emotions", "fear", "greed"],
    usefulRating: 4.9,
    userRated: 24
  },
  {
    id: "content-6",
    title: "Advanced Technical Analysis: Finding High Probability Setups",
    type: "course",
    source: "Trade Academy",
    author: "Richard Taylor",
    duration: "3.5 hours",
    match: 80,
    matchReason: "Based on your strategy preferences",
    category: "technical-analysis",
    bookmark: false,
    url: "#",
    tags: ["technical-analysis", "setups", "probability"],
    usefulRating: 4.6,
    userRated: 18
  },
  {
    id: "content-7",
    title: "Market Internals and How They Affect Your Trading",
    type: "webinar",
    source: "Trading Edge",
    author: "Michael Stevens",
    duration: "1:15:30",
    match: 78,
    matchReason: "Complements your trading approach",
    category: "market-structure",
    bookmark: false,
    url: "#",
    tags: ["market-internals", "volume-analysis", "depth"],
    usefulRating: 4.3,
    userRated: 9
  }
];

// Mock data for learning areas
const learningAreas = [
  { 
    id: "risk-management", 
    name: "Risk Management", 
    score: 65,
    highPriority: true,
    weakSpots: [
      "Position size consistency",
      "Managing drawdowns"
    ],
    recommendations: 3
  },
  { 
    id: "psychology", 
    name: "Trading Psychology", 
    score: 72,
    highPriority: true, 
    weakSpots: [
      "Emotional trading",
      "FOMO management"
    ],
    recommendations: 5
  },
  { 
    id: "execution", 
    name: "Trade Execution", 
    score: 80,
    highPriority: false,
    weakSpots: [
      "Exit timing"
    ],
    recommendations: 2
  },
  { 
    id: "technical-analysis", 
    name: "Technical Analysis", 
    score: 85,
    highPriority: false,
    weakSpots: [],
    recommendations: 3
  },
  { 
    id: "discipline", 
    name: "Discipline & Routine", 
    score: 68,
    highPriority: true,
    weakSpots: [
      "Trading plan adherence",
      "Preparation consistency"
    ],
    recommendations: 4
  },
  { 
    id: "market-structure", 
    name: "Market Structure", 
    score: 78,
    highPriority: false,
    weakSpots: [
      "Institutional order flow recognition"
    ],
    recommendations: 2
  }
];

// Mock data for learning progress and milestones
const learningProgress = {
  coursesCompleted: 7,
  totalCourses: 12,
  articlesRead: 23,
  checklistsCompleted: 5,
  quizzesTaken: 4,
  avgQuizScore: 82,
  streak: 15,
  totalMinutes: 1280,
  weeklyGoal: 180,
  weeklyProgress: 120
};

export function EducationalContentSuggestionModule() {
  const [activeTab, setActiveTab] = useState("recommendations");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState<string[]>([]);
  const [autoSuggestEnabled, setAutoSuggestEnabled] = useState(true);
  
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Youtube className="h-4 w-4 text-red-500" />;
      case "article":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "podcast":
        return <AudioLines className="h-4 w-4 text-green-500" />;
      case "checklist":
        return <ListChecks className="h-4 w-4 text-amber-500" />;
      case "course":
        return <BookOpen className="h-4 w-4 text-purple-500" />;
      case "spreadsheet":
        return <FileSpreadsheet className="h-4 w-4 text-cyan-500" />;
      case "webinar":
        return <UserCog className="h-4 w-4 text-pink-500" />;
      default:
        return <FileQuestion className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 70) return "text-blue-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };
  
  const toggleDescription = (id: string) => {
    if (showFullDescription.includes(id)) {
      setShowFullDescription(showFullDescription.filter(item => item !== id));
    } else {
      setShowFullDescription([...showFullDescription, id]);
    }
  };
  
  const toggleBookmark = (contentId: string) => {
    showToast({
      title: "Resource Bookmarked",
      description: "Added to your learning library"
    });
  };
  
  const handleRateResource = (contentId: string, isPositive: boolean) => {
    showToast({
      title: isPositive ? "Rated Helpful" : "Rated Unhelpful",
      description: "Thank you for your feedback"
    });
  };
  
  const filteredContent = activeCategory 
    ? educationalContent.filter(content => content.category === activeCategory)
    : educationalContent;

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookText className="h-5 w-5 text-blue-500" />
              Educational Feedback & Content
            </CardTitle>
            <CardDescription>Personalized learning resources based on your trading patterns</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="auto-suggestions" className={autoSuggestEnabled ? "text-blue-500" : "text-muted-foreground"}>
              Auto-Suggestions
            </Label>
            <Switch
              id="auto-suggestions"
              checked={autoSuggestEnabled}
              onCheckedChange={setAutoSuggestEnabled}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="grid grid-cols-3 mb-1">
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="learning-areas">Learning Areas</TabsTrigger>
              <TabsTrigger value="progress">Your Progress</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="mt-0">
            <div className="p-6 pt-4 space-y-4">
              {/* Learning Areas Filter Chips */}
              <ScrollArea className="w-full whitespace-nowrap pb-2">
                <div className="flex gap-2">
                  <Button
                    variant={activeCategory === null ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full text-xs h-8",
                      activeCategory === null ? "bg-blue-500/80 hover:bg-blue-500/90" : ""
                    )}
                    onClick={() => setActiveCategory(null)}
                  >
                    All Resources
                  </Button>
                  
                  {learningAreas.map((area) => (
                    <Button
                      key={area.id}
                      variant={activeCategory === area.id ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "rounded-full text-xs h-8",
                        activeCategory === area.id ? "bg-blue-500/80 hover:bg-blue-500/90" : "",
                        area.highPriority && activeCategory !== area.id && "border-amber-500/50 text-amber-500"
                      )}
                      onClick={() => setActiveCategory(area.id)}
                    >
                      {area.name}
                      {area.highPriority && (
                        <span className="ml-1 text-[10px] bg-amber-500/20 text-amber-500 px-1 py-0.5 rounded">Priority</span>
                      )}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Content Recommendations */}
              <div className="space-y-4">
                {filteredContent.map((content) => (
                  <div 
                    key={content.id} 
                    className="rounded-lg border p-4 hover:bg-black/5 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-black/10 flex items-center justify-center flex-shrink-0 mt-1">
                          {getContentTypeIcon(content.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{content.title}</h3>
                            <Badge variant="outline" className="capitalize text-xs">
                              {content.type}
                            </Badge>
                            <Badge className="bg-blue-500/20 text-blue-500 text-xs">
                              {content.match}% match
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span>{content.author}</span>
                            <span>•</span>
                            <span>{content.source}</span>
                            <span>•</span>
                            <span>{content.duration}</span>
                          </div>
                          
                          <div className="text-sm mt-2">
                            <p className="text-muted-foreground">
                              {content.matchReason}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {content.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-black/10 hover:bg-black/20 text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center text-sm">
                          <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 mr-1" />
                          <span>{content.usefulRating}</span>
                          <span className="text-xs text-muted-foreground ml-1">
                            ({content.userRated})
                          </span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 gap-1"
                          onClick={() => window.open(content.url, "_blank")}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          View
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-muted-foreground hover:text-foreground"
                          onClick={() => toggleBookmark(content.id)}
                        >
                          <Bookmark className={cn(
                            "h-4 w-4 mr-1",
                            content.bookmark ? "fill-amber-400 text-amber-400" : ""
                          )} />
                          {content.bookmark ? "Saved" : "Save"}
                        </Button>
                        
                        <div className="flex items-center border-l border-muted pl-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 hover:text-green-500"
                            onClick={() => handleRateResource(content.id, true)}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 hover:text-red-500"
                            onClick={() => handleRateResource(content.id, false)}
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Recommended 2 days ago
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center pt-2">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Refine Recommendations</span>
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Learning Areas Tab */}
          <TabsContent value="learning-areas" className="mt-0">
            <div className="p-6 pt-4 space-y-6">
              {/* Skill Radar */}
              <div className="rounded-lg border p-5 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-purple-500" />
                    <h3 className="font-medium">Trading Knowledge Map</h3>
                  </div>
                  <Badge variant="outline">Based on performance data</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningAreas.map((area) => (
                    <div key={area.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">{area.name}</h4>
                          {area.highPriority && (
                            <Badge className="bg-amber-500/20 text-amber-500">Priority</Badge>
                          )}
                        </div>
                        <span className={cn(
                          "text-sm font-medium",
                          getScoreColor(area.score)
                        )}>
                          {area.score}/100
                        </span>
                      </div>
                      
                      <Progress 
                        value={area.score} 
                        className="h-1.5"
                        indicatorClassName={getProgressColor(area.score)}
                      />
                      
                      {area.weakSpots.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {area.weakSpots.map((spot, i) => (
                            <div key={i} className="flex items-center gap-1 text-xs text-muted-foreground">
                              <XCircle className="h-3 w-3 text-red-500" />
                              <span>{spot}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="pt-1">
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-xs text-primary"
                          onClick={() => setActiveTab("recommendations") || setActiveCategory(area.id)}
                        >
                          View {area.recommendations} recommendations
                          <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Learning Path */}
              <div className="rounded-lg border p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium">Personalized Learning Path</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      stage: "Foundation",
                      complete: true,
                      items: ["Basic Technical Analysis", "Trading Psychology 101", "Risk Management Essentials"],
                      resources: 5,
                      progress: 100
                    },
                    {
                      stage: "Intermediate",
                      complete: false,
                      current: true,
                      items: ["Advanced Position Sizing", "Trading Plan Optimization", "Emotional Resilience"],
                      resources: 7,
                      progress: 65
                    },
                    {
                      stage: "Advanced",
                      complete: false,
                      items: ["Market Internals", "Advanced Order Flow", "Algorithmic Edge Discovery"],
                      resources: 9,
                      progress: 0
                    }
                  ].map((stage, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "rounded-lg p-4",
                        stage.complete ? "bg-green-500/10 border border-green-500/30" : 
                        stage.current ? "bg-blue-500/10 border border-blue-500/30" : 
                        "bg-black/10 border border-white/10"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{stage.stage}</h4>
                          {stage.complete && (
                            <Badge className="bg-green-500/20 text-green-500">Completed</Badge>
                          )}
                          {stage.current && (
                            <Badge className="bg-blue-500/20 text-blue-500">In Progress</Badge>
                          )}
                        </div>
                        <span className="text-sm">{stage.progress}% complete</span>
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        {stage.items.map((item, j) => (
                          <div key={j} className="flex items-center gap-2">
                            {stage.complete ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <div className={cn(
                                "h-4 w-4 rounded-full border",
                                stage.current ? "border-blue-500" : "border-muted-foreground" 
                              )}>
                                {stage.current && j === 0 && (
                                  <div className="h-2 w-2 rounded-full bg-blue-500 m-[3px]"></div>
                                )}
                              </div>
                            )}
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                      
                      {(stage.complete || stage.current) && (
                        <div className="mt-3">
                          <Button size="sm" variant={stage.complete ? "outline" : "default"} className="text-xs">
                            {stage.complete ? "Review Resources" : "Continue Learning"}
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Progress Tab */}
          <TabsContent value="progress" className="mt-0">
            <div className="p-6 pt-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Learning Stats */}
                <div className="rounded-lg border p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Your Learning Stats</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-black/10">
                      <div className="text-xs text-muted-foreground">Courses Completed</div>
                      <div className="text-2xl font-bold mt-1">
                        {learningProgress.coursesCompleted} 
                        <span className="text-sm text-muted-foreground font-normal">
                          /{learningProgress.totalCourses}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-black/10">
                      <div className="text-xs text-muted-foreground">Articles Read</div>
                      <div className="text-2xl font-bold mt-1">
                        {learningProgress.articlesRead}
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-black/10">
                      <div className="text-xs text-muted-foreground">Checklists Completed</div>
                      <div className="text-2xl font-bold mt-1">
                        {learningProgress.checklistsCompleted}
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg bg-black/10">
                      <div className="text-xs text-muted-foreground">Quiz Score Average</div>
                      <div className="text-2xl font-bold mt-1">
                        {learningProgress.avgQuizScore}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Learning Streak</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Don't break the chain!</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(Math.min(7, learningProgress.streak))].map((_, i) => (
                          <div key={i} className="h-8 w-3 bg-blue-500 rounded-sm ml-1"></div>
                        ))}
                      </div>
                      <div className="text-lg font-bold">
                        {learningProgress.streak}
                        <span className="text-xs text-muted-foreground ml-1">days</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Weekly Progress */}
                <div className="rounded-lg border p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <h3 className="font-medium">Weekly Progress</h3>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-black/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Learning Time</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Minutes this week</div>
                      </div>
                      <div className="text-lg font-bold">
                        {learningProgress.weeklyProgress} 
                        <span className="text-xs text-muted-foreground font-normal">
                          /{learningProgress.weeklyGoal} min
                        </span>
                      </div>
                    </div>
                    
                    <Progress 
                      value={(learningProgress.weeklyProgress / learningProgress.weeklyGoal) * 100} 
                      className="h-2"
                      indicatorClassName="bg-blue-500"
                    />
                    
                    <div className="text-xs text-muted-foreground mt-1">
                      You need {learningProgress.weeklyGoal - learningProgress.weeklyProgress} more minutes to reach your weekly goal
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-5 w-5 text-amber-500" />
                      <h4 className="font-medium">Quick Learning Insights</h4>
                    </div>
                    
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>You learn best through interactive content</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Morning sessions show 32% higher retention</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>You apply 65% of checklist items to your trading</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button className="gap-2">
                      <Download className="h-4 w-4" />
                      <span>Download Progress Report</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Recommended Next Steps */}
              <div className="rounded-lg border p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MousePointerClick className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Recommended Next Steps</h3>
                  </div>
                  <Badge variant="outline">Personalized Path</Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Complete Position Sizing Module",
                      desc: "4 lessons remaining",
                      icon: BookOpen,
                      color: "text-purple-500",
                      priority: "High"
                    },
                    {
                      title: "Take Psychology Assessment",
                      desc: "Measures emotional resilience",
                      icon: BrainCircuit,
                      color: "text-pink-500",
                      priority: "Medium"
                    },
                    {
                      title: "Review Weekend Analysis Checklist",
                      desc: "Prepare for next week's trading",
                      icon: ListChecks,
                      color: "text-amber-500",
                      priority: "Low"
                    }
                  ].map((item, i) => {
                    const ItemIcon = item.icon;
                    const priorityColor = 
                      item.priority === "High" ? "bg-red-500/20 text-red-500" :
                      item.priority === "Medium" ? "bg-amber-500/20 text-amber-500" :
                      "bg-blue-500/20 text-blue-500";
                    
                    return (
                      <div key={i} className="rounded-lg border border-white/10 p-4 flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                          <div className={`h-8 w-8 rounded-full ${item.color}/20 flex items-center justify-center`}>
                            <ItemIcon className={`h-4 w-4 ${item.color}`} />
                          </div>
                          <Badge className={priorityColor}>{item.priority}</Badge>
                        </div>
                        <h4 className="font-medium mb-1">{item.title}</h4>
                        <p className="text-xs text-muted-foreground flex-grow">{item.desc}</p>
                        <Button className="mt-3 w-full" size="sm">Start</Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
