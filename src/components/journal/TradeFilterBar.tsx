
import { useState } from "react";
import { Calendar, Tag, Strategy, Setup, Check, X, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const tagOptions = ["Premarket", "FOMO", "VWAP Fade"];
const strategyOptions = ["Breakout", "VWAP Fade", "Gap Fill", "Trend"];
const setupOptions = ["Breakout", "VWAP", "Gap", "Reversal"];
const emotionTags = ["Hesitation", "FOMO", "Confident"];
const presetFilters = ["My Best Setups", "Mistake Days", "Prop Firm Review"];

export function TradeFilterBar() {
  const [date, setDate] = useState({ from: "", to: "" });
  const [tags, setTags] = useState<string[]>([]);
  const [strategies, setStrategies] = useState<string[]>([]);
  const [setups, setSetups] = useState<string[]>([]);
  const [outcome, setOutcome] = useState(""); // win/loss/be
  const [ruleViolation, setRuleViolation] = useState(false);
  const [emotions, setEmotions] = useState<string[]>([]);
  const [preset, setPreset] = useState("");

  return (
    <div className="bg-accent/50 rounded-md shadow-sm px-4 py-3 flex flex-col md:flex-row md:items-end gap-3">
      <div className="flex flex-wrap gap-3 flex-1">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Date Range</label>
          <div className="flex gap-2">
            <input type="date" className="rounded-md border px-2 py-1 text-xs" value={date.from} onChange={e => setDate(d => ({...d, from: e.target.value}))} />
            <span className="text-xs opacity-60">to</span>
            <input type="date" className="rounded-md border px-2 py-1 text-xs" value={date.to} onChange={e => setDate(d => ({...d, to: e.target.value}))} />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Tags</label>
          <select multiple className="rounded-md border px-2 py-1 text-xs min-w-[80px]" value={tags} onChange={e => setTags(Array.from(e.target.selectedOptions, o => o.value))}>
            {tagOptions.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Strategy</label>
          <select multiple className="rounded-md border px-2 py-1 text-xs min-w-[80px]" value={strategies} onChange={e => setStrategies(Array.from(e.target.selectedOptions, o => o.value))}>
            {strategyOptions.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Setup</label>
          <select multiple className="rounded-md border px-2 py-1 text-xs min-w-[80px]" value={setups} onChange={e => setSetups(Array.from(e.target.selectedOptions, o => o.value))}>
            {setupOptions.map(su => <option key={su}>{su}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Outcome</label>
          <select className="rounded-md border px-2 py-1 text-xs min-w-[70px]" value={outcome} onChange={e => setOutcome(e.target.value)}>
            <option value="">Any</option>
            <option value="win">Green (Win)</option>
            <option value="loss">Red (Loss)</option>
            <option value="be">BE</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground flex gap-1 items-center">Rule Violation</label>
          <input type="checkbox" checked={ruleViolation} onChange={e => setRuleViolation(e.target.checked)} />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Emotion</label>
          <select multiple className="rounded-md border px-2 py-1 text-xs min-w-[80px]" value={emotions} onChange={e => setEmotions(Array.from(e.target.selectedOptions, o => o.value))}>
            {emotionTags.map(et => <option key={et}>{et}</option>)}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1 min-w-[140px]">
        <select className="rounded-md border px-2 py-1 text-xs" value={preset} onChange={e => setPreset(e.target.value)}>
          <option value="">Filter Presets</option>
          {presetFilters.map(p => <option key={p}>{p}</option>)}
        </select>
        <Button variant="outline" size="sm" className="text-xs h-8 mt-1">Save as Preset</Button>
      </div>
    </div>
  );
}
