
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { 
  Brain, 
  X, 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  Download, 
  User, 
  Bot,
  ChevronDown,
  ArrowDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

export function EdgeTherapistAI() {
  const [open, setOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [activeMode, setActiveMode] = useState<"coach" | "therapist" | "tactical">("coach");
  const [newMessage, setNewMessage] = useState("");
  const { theme } = useTheme();
  
  // Function to determine theme-specific styles
  const getThemeStyles = () => {
    switch(theme) {
      case 'light':
        return {
          buttonGradient: "bg-blue-500",
          buttonGlow: "shadow-md hover:shadow-lg",
          chatBackground: "bg-white",
          chatBorder: "border-gray-200",
          aiMessageBg: "bg-blue-50/80",
          aiMessageBorder: "border-blue-100",
          userMessageBg: "bg-blue-500",
          userMessageBorder: "border-blue-600",
          inputBg: "bg-white",
          inputBorder: "border-gray-300"
        };
      case 'dark':
        return {
          buttonGradient: "bg-blue-600",
          buttonGlow: "shadow-md hover:shadow-lg",
          chatBackground: "bg-gray-900",
          chatBorder: "border-gray-700",
          aiMessageBg: "bg-gray-800",
          aiMessageBorder: "border-gray-700",
          userMessageBg: "bg-blue-600",
          userMessageBorder: "border-blue-700",
          inputBg: "bg-gray-800",
          inputBorder: "border-gray-700"
        };
      case 'premium':
      default:
        return {
          buttonGradient: "bg-gradient-to-br from-zella-cyan-glow to-zella-electric-purple",
          buttonGlow: "shadow-neon-glow hover:shadow-button-glow",
          chatBackground: "bg-black/80",
          chatBorder: "border-white/10",
          aiMessageBg: "bg-white/5",
          aiMessageBorder: "border-white/10",
          userMessageBg: "bg-zella-electric-purple/30",
          userMessageBorder: "border-zella-electric-purple/20",
          inputBg: "bg-white/5",
          inputBorder: "border-white/10"
        };
    }
  };
  
  const themeStyles = getThemeStyles();
  
  // Example conversation history
  const conversation = [
    { sender: "ai", content: "Welcome to EdgeTherapist.AI. How can I help with your trading psychology today?" },
    { sender: "ai", content: "I've analyzed your recent trading patterns. You seem to be experiencing some hesitation on entries, particularly after your loss last Thursday. Would you like to explore what might be causing this?", attachments: [
      { type: "insight", content: "Early exit pattern identified in 7 of your last 10 winning trades. Average profit reduced by 31% compared to your strategy targets." }
    ]},
    { sender: "user", content: "Yes, I think I'm still recovering from that big loss last week. I'm trying to secure profits too quickly." },
    { sender: "ai", content: "That's a common response to a significant loss. Let's work on a recovery protocol for you:\n\n1. Set a specific \"minimum hold time\" based on your setup\n2. Create a written rule for partial exit criteria\n3. Use the mental rehearsal exercise we developed", attachments: [
      { type: "progress", content: "Recovery progress since last major loss", value: 65 }
    ]},
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // In a real app, this would send the message to an AI service
    console.log("Sending message:", newMessage);
    
    // Clear the input
    setNewMessage("");
  };
  
  return (
    <>
      {/* Enhanced floating button with glow effect */}
      <Button
        onClick={() => setOpen(true)}
        className={`relative h-14 w-14 rounded-full ${themeStyles.buttonGradient} p-0 ${themeStyles.buttonGlow} transition-all duration-300 hover:scale-105 animate-float`}
      >
        {theme === 'premium' && (
          <div className="absolute inset-0 rounded-full animate-pulse-glow bg-zella-cyan-glow blur-xl opacity-50"></div>
        )}
        <div className={`absolute inset-0 rounded-full ${theme === 'premium' ? 'border border-white/30' : ''}`}></div>
        <Brain className={`h-6 w-6 ${theme === 'light' ? 'text-white' : theme === 'dark' ? 'text-white' : 'text-zella-primary-text'} relative z-10`} />
      </Button>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent 
          side="center"
          className={cn(
            `${themeStyles.chatBackground} ${themeStyles.chatBorder} backdrop-blur-xl p-0 w-full h-[85vh] max-w-4xl rounded-xl overflow-hidden`,
          )}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <SheetHeader className={`px-4 py-3 border-b ${themeStyles.chatBorder} flex flex-row items-center justify-between bg-opacity-90 sticky top-0 z-40`}>
              <SheetTitle className="flex items-center text-lg">
                <div className={`h-8 w-8 rounded-full ${theme === 'premium' ? 'bg-gradient-to-br from-zella-cyan-glow to-zella-electric-purple' : theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center mr-2 ${theme === 'premium' ? 'shadow-neon-glow' : ''}`}>
                  <Brain className={`h-4 w-4 ${theme === 'dark' || theme === 'light' ? 'text-white' : 'text-zella-primary-text'}`} />
                </div>
                <span className={`${theme === 'premium' ? 'bg-gradient-to-r from-zella-cyan-glow to-zella-electric-purple bg-clip-text text-transparent' : theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                  EdgeTherapist.AI
                </span>
                <span className={`ml-2 ${theme === 'premium' ? 'bg-zella-electric-purple/50 text-zella-cyan-glow' : theme === 'dark' ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'} text-xs py-0.5 px-2 rounded-full`}>Beta</span>
              </SheetTitle>
              
              <div className="flex items-center gap-2">
                {/* Mode Selector */}
                <div className={`hidden md:flex rounded-md ${theme === 'premium' ? 'bg-black/20' : theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-1 mr-4`}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={cn(
                      "h-7 text-xs rounded transition-all",
                      activeMode === "coach" ? `${theme === 'premium' ? 'bg-gradient-to-r from-zella-cyan-glow/60 to-zella-electric-purple/60' : theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'} text-white` : "hover:bg-white/5"
                    )}
                    onClick={() => setActiveMode("coach")}
                  >
                    Coach
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={cn(
                      "h-7 text-xs rounded transition-all",
                      activeMode === "therapist" ? `${theme === 'premium' ? 'bg-gradient-to-r from-zella-cyan-glow/60 to-zella-electric-purple/60' : theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'} text-white` : "hover:bg-white/5"
                    )}
                    onClick={() => setActiveMode("therapist")}
                  >
                    Therapist
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={cn(
                      "h-7 text-xs rounded transition-all",
                      activeMode === "tactical" ? `${theme === 'premium' ? 'bg-gradient-to-r from-zella-cyan-glow/60 to-zella-electric-purple/60' : theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'} text-white` : "hover:bg-white/5"
                    )}
                    onClick={() => setActiveMode("tactical")}
                  >
                    Tactical
                  </Button>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-full h-8 w-8 ${theme === 'premium' ? 'hover:bg-white/5' : 'hover:bg-gray-200'}`}
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                >
                  {voiceEnabled ? (
                    <Mic className={`h-4 w-4 ${theme === 'premium' ? 'text-zella-cyan-glow' : theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  ) : (
                    <MicOff className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-full h-8 w-8 ${theme === 'premium' ? 'hover:bg-white/5' : 'hover:bg-gray-200'}`}
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </SheetHeader>
            
            {/* ChatGPT-style chat area */}
            <div className="flex-1 overflow-y-auto px-4 md:px-0">
              <div className="max-w-3xl mx-auto py-6 space-y-6">
                {conversation.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : ''}`}
                  >
                    <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : ''} max-w-3xl w-full gap-4 px-4`}>
                      {message.sender === 'ai' && (
                        <div className={`h-8 w-8 rounded-full ${theme === 'premium' ? 'bg-gradient-to-br from-zella-cyan-glow to-zella-electric-purple' : theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'} flex-shrink-0 flex items-center justify-center mt-1`}>
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      
                      {message.sender === 'user' && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0 flex items-center justify-center mt-1">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`flex flex-col space-y-2 ${message.sender === 'user' ? 'items-end' : ''} flex-1`}>
                        <div className={`${message.sender === 'ai' ? `${themeStyles.aiMessageBg} ${themeStyles.aiMessageBorder}` : `${themeStyles.userMessageBg} ${themeStyles.userMessageBorder}`} px-4 py-3 rounded-2xl ${message.sender === 'ai' ? 'rounded-tl-sm' : 'rounded-tr-sm'} border max-w-full`}>
                          <p className={`text-base whitespace-pre-wrap ${message.sender === 'user' && theme === 'premium' ? 'text-zella-primary-text' : message.sender === 'user' ? 'text-white' : ''}`}>
                            {message.content}
                          </p>
                          
                          {message.attachments?.map((attachment, i) => (
                            <div key={i} className="mt-3">
                              {attachment.type === 'insight' && (
                                <div className={`p-3 ${theme === 'premium' ? 'bg-zella-cyan-glow/20 rounded-lg border border-zella-cyan-glow/30' : theme === 'dark' ? 'bg-blue-900/50 border border-blue-800' : 'bg-blue-100 border border-blue-200'}`}>
                                  <div className="flex items-center gap-1 mb-1">
                                    <Sparkles className={`h-3 w-3 ${theme === 'premium' ? 'text-zella-cyan-glow' : theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                                    <p className={`text-xs font-medium ${theme === 'premium' ? 'text-zella-cyan-glow' : theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Pattern Detected</p>
                                  </div>
                                  <p className="text-xs">
                                    {attachment.content}
                                  </p>
                                </div>
                              )}
                              
                              {attachment.type === 'progress' && (
                                <div className={`mt-3 p-3 rounded-lg ${theme === 'premium' ? 'bg-gradient-to-r from-zella-cyan-glow/30 to-zella-electric-purple/30 border border-zella-cyan-glow/20' : theme === 'dark' ? 'bg-blue-900/50 border border-blue-800' : 'bg-blue-100 border border-blue-200'}`}>
                                  <div className="flex items-center">
                                    <div className={`w-full ${theme === 'premium' ? 'bg-gray-700/30' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} rounded-full h-2`}>
                                      <div className={`${theme === 'premium' ? 'bg-gradient-to-r from-zella-cyan-glow to-zella-electric-purple' : theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'} h-2 rounded-full`} style={{ width: `${attachment.value}%` }}></div>
                                    </div>
                                    <span className={`text-xs ${theme === 'premium' ? 'text-zella-cyan-glow' : theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} ml-2`}>{attachment.value}%</span>
                                  </div>
                                  <p className="text-xs mt-1">
                                    {attachment.content}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* ChatGPT-style input bar */}
            <div className="sticky bottom-0 z-10 px-4 py-4">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="relative">
                  <div className={`flex items-end ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-xl overflow-hidden shadow-lg`}>
                    <textarea
                      placeholder="Message EdgeTherapist.AI..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className={`${themeStyles.inputBg} resize-none min-h-[56px] max-h-[200px] w-full px-4 py-3 outline-none text-sm`}
                      rows={1}
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      className={`${theme === 'premium' ? 'bg-gradient-to-r from-zella-cyan-glow to-zella-electric-purple' : theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'} h-10 w-10 rounded-full m-1`}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-5 w-5 -rotate-45" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-center mt-2">
                    <p className={`text-xs ${theme === 'premium' ? 'text-zella-secondary-text' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      EdgeTherapist.AI provides trading psychology support, not financial advice
                    </p>
                  </div>
                </form>
                
                {/* Utility buttons */}
                <div className="flex justify-between items-center mt-2 px-1">
                  <Button variant="ghost" size="sm" className={`h-7 text-xs ${theme === 'premium' ? 'text-muted-foreground hover:text-zella-primary-text' : ''}`}>
                    <Download className="h-3 w-3 mr-1" />
                    Export chat
                  </Button>
                  
                  <Button variant="ghost" size="sm" className={`h-7 text-xs ${theme === 'premium' ? 'text-muted-foreground hover:text-zella-primary-text' : ''}`}>
                    <ArrowDown className="h-3 w-3 mr-1" />
                    Scroll to bottom
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
