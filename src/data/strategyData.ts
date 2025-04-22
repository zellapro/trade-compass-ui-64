
// Define types for our strategy system
export interface Setup {
  id: string;
  name: string;
  description?: string;
}

export interface StrategyCategory {
  id: string;
  name: string;
  setups: Setup[];
  description?: string;
}

// Main strategy categories with their setups
export const strategyCategories: StrategyCategory[] = [
  {
    id: "smc",
    name: "Smart Money Concepts (SMC/ICT)",
    setups: [
      { id: "smc-ob", name: "Order Blocks" },
      { id: "smc-bos", name: "Break of Structure" },
      { id: "smc-fvg", name: "Fair Value Gap" },
      { id: "smc-imbalance", name: "Imbalance" },
      { id: "smc-liquidity", name: "Liquidity Sweeps" },
      { id: "smc-mtf", name: "MTF (Multi-timeframe)" },
      { id: "smc-inducement", name: "Inducement Patterns" },
      { id: "smc-sd", name: "Supply & Demand Zones" },
    ],
  },
  {
    id: "price-action",
    name: "Price Action-Based",
    setups: [
      { id: "pa-pin", name: "Pin Bar / Rejection" },
      { id: "pa-engulfing", name: "Engulfing Patterns" },
      { id: "pa-inside", name: "Inside Bar" },
      { id: "pa-2bar", name: "Two-Bar Play" },
      { id: "pa-3bar", name: "Three-Bar Play" },
      { id: "pa-outside", name: "Outside Bar" },
      { id: "pa-wick", name: "Wick Rejection" },
      { id: "pa-pivot", name: "Pivot Points" },
    ],
  },
  {
    id: "pattern",
    name: "Pattern-Based",
    setups: [
      { id: "pattern-hs", name: "Head & Shoulders" },
      { id: "pattern-dbottom", name: "Double Bottom" },
      { id: "pattern-dtop", name: "Double Top" },
      { id: "pattern-flag", name: "Bull/Bear Flag" },
      { id: "pattern-wedge", name: "Wedge Patterns" },
      { id: "pattern-triangle", name: "Triangle Patterns" },
      { id: "pattern-harmonic", name: "Harmonic Patterns" },
      { id: "pattern-abcd", name: "ABCD Pattern" },
    ],
  },
  {
    id: "fibonacci",
    name: "Fibonacci-Based",
    setups: [
      { id: "fib-retracement", name: "Fibonacci Retracement" },
      { id: "fib-extension", name: "Fibonacci Extension" },
      { id: "fib-expansion", name: "Fibonacci Expansion" },
      { id: "fib-abcd", name: "Fibonacci ABCD" },
      { id: "fib-gartley", name: "Gartley Pattern" },
      { id: "fib-butterfly", name: "Butterfly Pattern" },
      { id: "fib-crab", name: "Crab Pattern" },
      { id: "fib-bat", name: "Bat Pattern" },
    ],
  },
  {
    id: "indicator",
    name: "Indicator-Based",
    setups: [
      { id: "ind-ma", name: "Moving Average Crossover" },
      { id: "ind-rsi", name: "RSI Divergence" },
      { id: "ind-macd", name: "MACD Crossover" },
      { id: "ind-bb", name: "Bollinger Bands Squeeze" },
      { id: "ind-vwap", name: "VWAP Bounce/Rejection" },
      { id: "ind-stoch", name: "Stochastic Crossover" },
      { id: "ind-adx", name: "ADX Trend Strength" },
      { id: "ind-ichimoku", name: "Ichimoku Cloud" },
    ],
  },
  {
    id: "breakout",
    name: "Breakout-Based",
    setups: [
      { id: "bo-range", name: "Range Breakout" },
      { id: "bo-consolidation", name: "Consolidation Breakout" },
      { id: "bo-resistance", name: "Resistance Breakout" },
      { id: "bo-support", name: "Support Breakout" },
      { id: "bo-trendline", name: "Trendline Breakout" },
      { id: "bo-channel", name: "Channel Breakout" },
      { id: "bo-flag", name: "Flag Breakout" },
      { id: "bo-wedge", name: "Wedge Breakout" },
    ],
  },
  {
    id: "volume",
    name: "Volume-Based",
    setups: [
      { id: "vol-climax", name: "Volume Climax" },
      { id: "vol-divergence", name: "Volume Divergence" },
      { id: "vol-profile", name: "Volume Profile" },
      { id: "vol-vpoc", name: "VPOC Rejection" },
      { id: "vol-absorption", name: "Volume Absorption" },
      { id: "vol-spread", name: "Volume Spread Analysis" },
      { id: "vol-churn", name: "Churning Volume" },
      { id: "vol-breakout", name: "Volume Breakout" },
    ],
  },
  {
    id: "trend",
    name: "Trend Continuation & Reversal",
    setups: [
      { id: "trend-pullback", name: "Trend Pullback" },
      { id: "trend-reverse", name: "Trend Reversal" },
      { id: "trend-exhaustion", name: "Exhaustion Move" },
      { id: "trend-momentum", name: "Momentum Play" },
      { id: "trend-failure", name: "Failed Continuation" },
      { id: "trend-v-reversal", name: "V-Bottom/Top Reversal" },
      { id: "trend-mean-reversion", name: "Mean Reversion" },
      { id: "trend-momentum-shift", name: "Momentum Shift" },
    ],
  },
  {
    id: "gap",
    name: "Gap and News-Based",
    setups: [
      { id: "gap-fill", name: "Gap Fill" },
      { id: "gap-continuation", name: "Gap & Go" },
      { id: "gap-reversal", name: "Gap Reversal" },
      { id: "gap-fade", name: "Gap Fade" },
      { id: "news-catalyst", name: "News Catalyst" },
      { id: "earnings-play", name: "Earnings Play" },
      { id: "news-fade", name: "News Fade" },
      { id: "news-breakout", name: "News Breakout" },
    ],
  },
  {
    id: "intraday",
    name: "Intraday & Scalping",
    setups: [
      { id: "intra-opening-range", name: "Opening Range Breakout" },
      { id: "intra-first-pullback", name: "First Pullback" },
      { id: "intra-vwap", name: "VWAP Reversion" },
      { id: "intra-hod-lod", name: "HOD/LOD Break" },
      { id: "intra-power-hour", name: "Power Hour Setup" },
      { id: "intra-momentum", name: "Momentum Scalp" },
      { id: "intra-reversal", name: "Intraday Reversal" },
      { id: "intra-session", name: "Session Transition" },
    ],
  },
  {
    id: "options",
    name: "Options & Derivatives",
    setups: [
      { id: "opt-premium-decay", name: "Premium Decay" },
      { id: "opt-iv-crush", name: "IV Crush" },
      { id: "opt-calendar", name: "Calendar Spread" },
      { id: "opt-vertical", name: "Vertical Spread" },
      { id: "opt-iron-condor", name: "Iron Condor" },
      { id: "opt-butterfly", name: "Butterfly Spread" },
      { id: "opt-diagonal", name: "Diagonal Spread" },
      { id: "opt-ratio", name: "Ratio Spread" },
    ],
  },
  {
    id: "algo",
    name: "Algo / Quant-Based",
    setups: [
      { id: "algo-mean-reversion", name: "Mean Reversion Algo" },
      { id: "algo-momentum", name: "Momentum Algo" },
      { id: "algo-stat-arb", name: "Statistical Arbitrage" },
      { id: "algo-pair-trading", name: "Pair Trading" },
      { id: "algo-basket", name: "Basket Trading" },
      { id: "algo-ml", name: "Machine Learning Signal" },
      { id: "algo-hft", name: "HFT Pattern" },
      { id: "algo-seasonal", name: "Seasonal Pattern" },
    ],
  },
  {
    id: "market-specific",
    name: "Market-Specific Variants",
    setups: [
      { id: "market-forex-london", name: "Forex London Breakout" },
      { id: "market-forex-asian", name: "Asian Session Range" },
      { id: "market-futures-globex", name: "Globex Overnight" },
      { id: "market-futures-rth", name: "Regular Trading Hours" },
      { id: "market-crypto-weekend", name: "Weekend Crypto Move" },
      { id: "market-futures-inventory", name: "Inventory Adjustment" },
      { id: "market-etf-sector", name: "Sector Rotation" },
      { id: "market-commodity", name: "Commodity Cycle" },
    ],
  },
];

// Setup grades for rating after trade
export const setupGrades = [
  { id: "a-plus", name: "A+", description: "Perfect execution, ideal conditions" },
  { id: "a", name: "A", description: "Excellent execution, strong conditions" },
  { id: "b-plus", name: "B+", description: "Very good execution, favorable conditions" },
  { id: "b", name: "B", description: "Good execution, normal conditions" },
  { id: "c", name: "C", description: "Average execution, mixed conditions" },
  { id: "d", name: "D", description: "Poor execution, unfavorable conditions" },
  { id: "f", name: "F", description: "Failed execution, wrong conditions" }
];

// Context tags for the trade
export const contextTags = [
  { id: "bullish-bias", name: "Bullish Bias" },
  { id: "bearish-bias", name: "Bearish Bias" },
  { id: "neutral-bias", name: "Neutral Bias" },
  { id: "trending-market", name: "Trending Market" },
  { id: "ranging-market", name: "Ranging Market" },
  { id: "volatile-market", name: "Volatile Market" },
  { id: "low-liquidity", name: "Low Liquidity" },
  { id: "high-liquidity", name: "High Liquidity" },
  { id: "pre-market", name: "Pre-Market" },
  { id: "regular-hours", name: "Regular Hours" },
  { id: "post-market", name: "Post-Market" },
  { id: "news-event", name: "News Event" },
  { id: "earnings", name: "Earnings" },
  { id: "economic-release", name: "Economic Release" },
  { id: "sector-rotation", name: "Sector Rotation" },
  { id: "market-reversal", name: "Market Reversal" }
];

// Helper function to find a strategy category by ID
export const findCategoryById = (id: string): StrategyCategory | undefined => {
  return strategyCategories.find(category => category.id === id);
};

// Helper function to find a setup by ID across all categories
export const findSetupById = (id: string): Setup | undefined => {
  for (const category of strategyCategories) {
    const setup = category.setups.find(setup => setup.id === id);
    if (setup) return setup;
  }
  return undefined;
};

// Helper function to get grade by ID
export const findGradeById = (id: string): typeof setupGrades[0] | undefined => {
  return setupGrades.find(grade => grade.id === id);
};

// Helper function to get context tag by ID
export const findContextTagById = (id: string): typeof contextTags[0] | undefined => {
  return contextTags.find(tag => tag.id === id);
};
