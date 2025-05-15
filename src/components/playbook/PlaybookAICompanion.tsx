
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PlaybookAICompanion() {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              AI Companion
            </CardTitle>
            <CardDescription>Your personal trading assistant</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/settings?tab=advanced")}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm italic text-muted-foreground">
              "I've analyzed your last 20 trades. Your win rate increases by 15% when you trade during market open. Consider focusing on this time period."
            </p>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm">Ask a question</Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/settings?tab=developer")}>AI Settings</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
