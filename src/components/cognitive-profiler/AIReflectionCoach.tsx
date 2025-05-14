
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/context/ThemeContext";
import { Brain, ChevronRight, Clock, RefreshCw, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function AIReflectionCoach() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      content: "👋 I'm your AI Reflection Coach. How can I help you reflect on your trading today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: generateAIResponse(input),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1200);
  };
  
  const generateAIResponse = (query: string): string => {
    // Simple response generation based on keywords
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("break") && lowerQuery.includes("rule")) {
      return "Looking at your recent trades, it seems you broke your risk management rule due to overconfidence after a winning streak. This is a common pattern - your win rate drops 35% after 3 consecutive wins. Consider implementing a 'winning streak checklist' that forces you to be extra vigilant about position sizing after multiple wins.";
    }
    
    if (lowerQuery.includes("anxious") || lowerQuery.includes("anxiety")) {
      return "I notice you've been journaling about anxiety in 65% of your recent trade entries. Your data shows you win only 28% of trades entered during anxious states vs. 72% when calm. Try the 4-7-8 breathing technique before entering trades (inhale for 4s, hold for 7s, exhale for 8s), which has been shown to reduce anxiety significantly.";
    }
    
    if (lowerQuery.includes("focus") || lowerQuery.includes("distracted")) {
      return "Your performance metrics show a 40% decline in execution quality during afternoon sessions. This correlates with your notes about feeling mentally fatigued. Consider limiting your trading to the first 2 hours of the market open when your focus metrics are highest, or implement a mandatory 15-minute break every hour to reset your attention.";
    }
    
    return "Based on your trading patterns this week, I've noticed you perform best when you have a clear pre-defined plan and stick to it. Your win rate on planned trades is 67% versus 31% on unplanned entries. What specific aspect of your trading process would you like to discuss in more detail?";
  };
  
  const exampleQueries = [
    "Why did I break my trading rules today?",
    "I'm feeling anxious before trades. Any suggestions?",
    "How can I improve my focus during trading sessions?"
  ];
  
  return (
    <Card className="overflow-hidden border-border/50 backdrop-blur-sm flex flex-col h-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-semibold">AI Reflection Coach</CardTitle>
        <CardDescription>
          Conversational assistant to help you reflect and evolve
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto pb-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="flex flex-col">
              <div 
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? isLightTheme 
                        ? "bg-blue-500 text-white" 
                        : "bg-blue-600 text-white"
                      : isLightTheme 
                        ? "bg-slate-100 text-slate-900" 
                        : "bg-slate-800 text-slate-100"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
              <div 
                className={`text-xs text-muted-foreground mt-1 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {messages.length === 1 && (
          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-medium">Try asking:</h3>
            <div className="space-y-2">
              {exampleQueries.map((query, index) => (
                <Button 
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => {
                    setInput(query);
                  }}
                >
                  <ChevronRight className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{query}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <div className={`px-4 py-3 ${isLightTheme ? "bg-slate-50" : "bg-slate-900/50"}`}>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>Weekly summary sent every Friday</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2"
            disabled={isLoading}
            onClick={() => {
              setMessages([{
                role: "assistant",
                content: "👋 I'm your AI Reflection Coach. How can I help you reflect on your trading today?",
                timestamp: new Date()
              }]);
            }}
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Textarea 
            placeholder="Ask a question about your trading psychology..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`resize-none ${isLightTheme ? "bg-white" : "bg-slate-800"}`}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            className="flex-shrink-0"
            size="icon"
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
