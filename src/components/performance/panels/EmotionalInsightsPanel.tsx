
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
} from 'recharts';

interface EmotionalInsightsPanelProps {
  timeframe: string;
}

export function EmotionalInsightsPanel({ timeframe }: EmotionalInsightsPanelProps) {
  // Mock data for emotional tiles
  const beforeEntryEmotion = {
    emotion: "Focus",
    percentage: "42%",
    color: "bg-blue-500",
  };
  
  const duringTradeEmotion = {
    emotion: "Anxiety",
    percentage: "38%",
    color: "bg-yellow-500",
  };
  
  const afterExitEmotion = {
    emotion: "Relief",
    percentage: "45%",
    color: "bg-green-500",
  };
  
  // Mock data for emotional profile radar chart
  const emotionalProfileData = [
    { trait: "Discipline", value: 8, fullMark: 10 },
    { trait: "Calm", value: 7, fullMark: 10 },
    { trait: "Patience", value: 6, fullMark: 10 },
    { trait: "Adaptability", value: 7, fullMark: 10 },
    { trait: "Fear Control", value: 5, fullMark: 10 },
    { trait: "Greed Control", value: 4, fullMark: 10 },
  ];
  
  // Mock data for emotional triggers
  const emotionalTriggers = [
    "Consecutive losses increase anxiety",
    "Overtrading when market is choppy",
    "FOMO during trending markets",
    "Hesitation after a large loss"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Emotion Tiles */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        <EmotionTile title="Before Entry" emotion={beforeEntryEmotion} />
        <EmotionTile title="During Trade" emotion={duringTradeEmotion} />
        <EmotionTile title="After Exit" emotion={afterExitEmotion} />
      </div>
      
      {/* Emotional Triggers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Top Emotional Triggers</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {emotionalTriggers.map((trigger, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary mr-2 text-sm">
                  {index + 1}
                </span>
                <span>{trigger}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {/* Emotional Profile Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Emotional Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                emotionalProfile: {},
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={emotionalProfileData}>
                  <PolarGrid stroke="rgba(255,255,255,0.2)" />
                  <PolarAngleAxis dataKey="trait" tick={{ fill: "currentColor" }} />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} />
                  <Radar
                    name="Emotional Profile"
                    dataKey="value"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface EmotionProps {
  emotion: string;
  percentage: string;
  color: string;
}

function EmotionTile({ title, emotion }: { title: string; emotion: EmotionProps }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-2 ${emotion.color}`} />
          <div className="text-2xl font-bold">{emotion.emotion}</div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{emotion.percentage} of trades</p>
      </CardContent>
    </Card>
  );
}
