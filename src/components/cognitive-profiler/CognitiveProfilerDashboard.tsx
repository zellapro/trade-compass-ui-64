
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { EmotionalTendenciesMap } from "./EmotionalTendenciesMap";
import { ImpulseTriggerAnalysis } from "./ImpulseTriggerAnalysis";
import { BehaviorDeviationTracker } from "./BehaviorDeviationTracker";
import { MindsetOverTime } from "./MindsetOverTime";
import { CognitiveBiasFingerprint } from "./CognitiveBiasFingerprint";
import { ResilienceTracker } from "./ResilienceTracker";
import { PersonalityStrategyAlignment } from "./PersonalityStrategyAlignment";
import { EmotionPerformanceMatrix } from "./EmotionPerformanceMatrix";
import { NeuroDisciplineTools } from "./NeuroDisciplineTools";
import { AIReflectionCoach } from "./AIReflectionCoach";
import { PsychologyScoreBanner } from "./PsychologyScoreBanner";

export function CognitiveProfilerDashboard() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  return (
    <div className={`w-full space-y-6 ${
      isLightTheme ? 'bg-gray-50' : 'bg-zella-background'
    } relative overflow-hidden`}>
      {/* Background patterns */}
      {!isLightTheme ? (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zella-electric-purple/20 via-zella-background to-zella-background pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_70%_20%,_var(--tw-gradient-stops))] from-zella-cyan-glow/10 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-[linear-gradient(to_right,#0a0514_1px,transparent_1px),linear-gradient(to_bottom,#0a0514_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.08]"></div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/30 via-gray-50 to-gray-50 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_70%_20%,_var(--tw-gradient-stops))] from-blue-100/20 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.2]"></div>
          </div>
        </>
      )}
      
      {/* Psychology Score Banner */}
      <div className="relative z-10">
        <PsychologyScoreBanner />
      </div>

      {/* Main content grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Row */}
        <EmotionalTendenciesMap />
        <ImpulseTriggerAnalysis />

        {/* Second Row */}
        <BehaviorDeviationTracker />
        <MindsetOverTime />

        {/* Third Row */}
        <CognitiveBiasFingerprint />
        <ResilienceTracker />

        {/* Fourth Row */}
        <PersonalityStrategyAlignment />
        <EmotionPerformanceMatrix />

        {/* Fifth Row */}
        <NeuroDisciplineTools />
        <AIReflectionCoach />
      </div>
    </div>
  );
}
