
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Brain, Check, List, Settings, Timer } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const questions = [
  {
    id: 1,
    question: "How do you respond to fast-moving markets?",
    answers: [
      "I get excited and want to act quickly",
      "I feel anxious and prefer to step back",
      "I stay calm and methodically assess opportunities",
      "I follow my pre-defined rules regardless of market speed"
    ]
  },
  {
    id: 2,
    question: "When analyzing a potential trade, you prefer:",
    answers: [
      "Quick technical setups with clear entry/exit signals",
      "Detailed fundamental analysis with long-term outlook",
      "A combination of technical and fundamental factors",
      "Systematic, rule-based entries regardless of analysis type"
    ]
  },
  {
    id: 3,
    question: "How do you handle losses?",
    answers: [
      "I move on quickly to the next opportunity",
      "I analyze them deeply to learn lessons",
      "I take a break to reset emotionally",
      "I check if my system worked as expected"
    ]
  }
];

const strategyProfiles = [
  {
    type: "Scalping",
    match: 85,
    description: "Your personality traits indicate comfort with fast decision-making and high-focus activities. Scalping leverages your quick analytical abilities.",
    suitableFor: "High-focus, fast processors who can make quick decisions",
    tools: ["5-minute pre-market focus ritual", "Rapid setup checklist", "Risk per trade calculator"]
  },
  {
    type: "Swing Trading",
    match: 65,
    description: "Your reflective nature and patience make swing trading a potential fit, though you may need to develop more comfort with uncertainty over multiple days.",
    suitableFor: "Patient, reflective types who can detach from positions",
    tools: ["Daily market overview template", "Position sizing worksheet", "Scenario planning guide"]
  },
  {
    type: "Trend Following",
    match: 90,
    description: "Your systematic thinking and emotional detachment align perfectly with trend following approaches that require discipline and objectivity.",
    suitableFor: "Emotionally detached, systematic thinkers who follow rules",
    tools: ["Trend identification framework", "Trailing stop methodology", "System adherence checklist"]
  }
];

export function PersonalityStrategyAlignment() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const [activeTab, setActiveTab] = React.useState("quiz");
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = React.useState(false);
  
  // Handle answering a question
  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };
  
  // Move to next question or finish quiz
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setActiveTab("results");
    }
  };
  
  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizCompleted(false);
    setActiveTab("quiz");
  };
  
  return (
    <Card className="overflow-hidden border-border/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-semibold">Personality-Based Strategy Alignment</CardTitle>
        <CardDescription>
          Match your psychological traits to optimal trading styles
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="quiz">Assessment</TabsTrigger>
            <TabsTrigger value="results" disabled={!quizCompleted}>Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quiz" className="space-y-4 min-h-[300px]">
            {currentQuestion < questions.length && (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span className="text-muted-foreground">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                  </span>
                </div>
                
                <div className={`p-4 rounded-lg ${
                  isLightTheme ? "bg-slate-100" : "bg-slate-900/50"
                }`}>
                  <h3 className="font-medium mb-4">{questions[currentQuestion].question}</h3>
                  
                  <RadioGroup 
                    value={answers[currentQuestion]?.toString()} 
                    onValueChange={(value) => handleAnswer(parseInt(value))}
                    className="space-y-3"
                  >
                    {questions[currentQuestion].answers.map((answer, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
                        <Label htmlFor={`answer-${index}`} className="text-sm">{answer}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleNext}
                    disabled={answers[currentQuestion] === undefined}
                    className="flex items-center"
                  >
                    {currentQuestion === questions.length - 1 ? "Complete" : "Next"} 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6 min-h-[300px]">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Your Strategy Alignment</h3>
              <Button variant="outline" size="sm" onClick={resetQuiz}>
                Retake Quiz
              </Button>
            </div>
            
            <div className="space-y-4">
              {strategyProfiles.sort((a, b) => b.match - a.match).map((profile) => (
                <div 
                  key={profile.type}
                  className={`p-4 rounded-lg ${
                    profile.match >= 80 
                      ? (isLightTheme ? "bg-green-50 border border-green-100" : "bg-green-900/20 border border-green-900/30")
                      : profile.match >= 70 
                        ? (isLightTheme ? "bg-blue-50 border border-blue-100" : "bg-blue-900/20 border border-blue-900/30")
                        : (isLightTheme ? "bg-slate-100 border border-slate-200" : "bg-slate-900/40 border border-slate-800")
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      {profile.match >= 80 && (
                        <div className={`mr-2 p-1 rounded-full ${
                          isLightTheme ? "bg-green-100" : "bg-green-900/30"
                        }`}>
                          <Check className={`h-4 w-4 ${
                            isLightTheme ? "text-green-600" : "text-green-400"
                          }`} />
                        </div>
                      )}
                      <h4 className="font-medium">{profile.type}</h4>
                    </div>
                    <div 
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        profile.match >= 80 
                          ? (isLightTheme ? "bg-green-100 text-green-800" : "bg-green-900/30 text-green-300") 
                          : profile.match >= 70 
                            ? (isLightTheme ? "bg-blue-100 text-blue-800" : "bg-blue-900/30 text-blue-300")
                            : (isLightTheme ? "bg-slate-200 text-slate-800" : "bg-slate-800 text-slate-300")
                      }`}
                    >
                      {profile.match}% Match
                    </div>
                  </div>
                  
                  <p className="text-sm mb-3">{profile.description}</p>
                  
                  <div className="mb-3">
                    <div className="flex items-center space-x-2 mb-2 text-xs text-muted-foreground">
                      <Brain className="h-3.5 w-3.5" />
                      <span>Best suited for:</span>
                    </div>
                    <p className="text-sm">{profile.suitableFor}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2 text-xs text-muted-foreground">
                      <Settings className="h-3.5 w-3.5" />
                      <span>Recommended Tools:</span>
                    </div>
                    <div className="space-y-1">
                      {profile.tools.map((tool, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center text-xs p-2 rounded ${
                            isLightTheme ? "bg-white/80" : "bg-black/20"
                          }`}
                        >
                          {index === 0 ? (
                            <Timer className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
                          ) : index === 1 ? (
                            <List className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
                          ) : (
                            <Settings className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
                          )}
                          {tool}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
