
import { useState } from "react";
import { 
  Smile, 
  Frown, 
  Meh, 
  ThumbsUp, 
  ThumbsDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface EmotionTrackerProps {
  beforeEmotions?: string[];
  duringEmotions?: string[];
  afterEmotions?: string[];
  mindsetRating?: number;
  onEmotionChange?: (stage: 'before' | 'during' | 'after', emotions: string[]) => void;
  onMindsetChange?: (rating: number) => void;
}

const EMOTION_OPTIONS = [
  { label: "Calm", icon: <Smile className="h-4 w-4 mr-1.5" /> },
  { label: "Focused", icon: <Smile className="h-4 w-4 mr-1.5" /> },
  { label: "Confident", icon: <ThumbsUp className="h-4 w-4 mr-1.5" /> },
  { label: "Excited", icon: <Smile className="h-4 w-4 mr-1.5" /> },
  { label: "Anxious", icon: <Meh className="h-4 w-4 mr-1.5" /> },
  { label: "FOMO", icon: <Frown className="h-4 w-4 mr-1.5" /> },
  { label: "Hesitant", icon: <Meh className="h-4 w-4 mr-1.5" /> },
  { label: "Impatient", icon: <Frown className="h-4 w-4 mr-1.5" /> },
  { label: "Frustrated", icon: <ThumbsDown className="h-4 w-4 mr-1.5" /> },
  { label: "Revenge", icon: <Frown className="h-4 w-4 mr-1.5" /> },
];

export function EmotionTracker({ 
  beforeEmotions = [], 
  duringEmotions = [], 
  afterEmotions = [],
  mindsetRating = 7,
  onEmotionChange,
  onMindsetChange
}: EmotionTrackerProps) {
  const [activeTab, setActiveTab] = useState<'before' | 'during' | 'after'>('before');
  const [mindsetScore, setMindsetScore] = useState(mindsetRating);

  const handleEmotionToggle = (emotion: string) => {
    if (!onEmotionChange) return;
    
    let currentEmotions: string[] = [];
    switch (activeTab) {
      case 'before':
        currentEmotions = [...beforeEmotions];
        break;
      case 'during':
        currentEmotions = [...duringEmotions];
        break;
      case 'after':
        currentEmotions = [...afterEmotions];
        break;
    }

    if (currentEmotions.includes(emotion)) {
      onEmotionChange(activeTab, currentEmotions.filter(e => e !== emotion));
    } else {
      onEmotionChange(activeTab, [...currentEmotions, emotion]);
    }
  };

  const handleMindsetChange = (value: number[]) => {
    setMindsetScore(value[0]);
    if (onMindsetChange) {
      onMindsetChange(value[0]);
    }
  };

  const getEmotionsForActiveTab = () => {
    switch (activeTab) {
      case 'before':
        return beforeEmotions;
      case 'during':
        return duringEmotions;
      case 'after':
        return afterEmotions;
      default:
        return [];
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex border-b border-border/50">
        <Button 
          variant="ghost" 
          size="sm"
          className={`rounded-none border-b-2 px-3 py-2 ${activeTab === 'before' ? 'border-primary' : 'border-transparent'}`}
          onClick={() => setActiveTab('before')}
        >
          Before Trade
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className={`rounded-none border-b-2 px-3 py-2 ${activeTab === 'during' ? 'border-primary' : 'border-transparent'}`}
          onClick={() => setActiveTab('during')}
        >
          During Trade
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className={`rounded-none border-b-2 px-3 py-2 ${activeTab === 'after' ? 'border-primary' : 'border-transparent'}`}
          onClick={() => setActiveTab('after')}
        >
          After Trade
        </Button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {EMOTION_OPTIONS.map(emotion => {
          const isActive = getEmotionsForActiveTab().includes(emotion.label);
          return (
            <Button
              key={emotion.label}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className="h-9 flex items-center justify-start"
              onClick={() => handleEmotionToggle(emotion.label)}
            >
              {emotion.icon}
              {emotion.label}
            </Button>
          );
        })}
      </div>
      
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Mindset Rating</span>
          <span className="text-sm font-medium">{mindsetScore}/10</span>
        </div>
        <Slider 
          value={[mindsetScore]} 
          min={1} 
          max={10} 
          step={1} 
          onValueChange={handleMindsetChange} 
          className="w-full" 
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Poor</span>
          <span>Average</span>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  );
}
