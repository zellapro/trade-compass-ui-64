
import React from "react";
import BrokerCategory from "./broker-integrations/BrokerCategory";
import { toast } from "sonner";

interface BrokerIntegrationsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const BROKERS = {
  indian: [
    { id: "zerodha", name: "Zerodha", type: "Indian Markets", category: "indian", connected: false, docsUrl: "https://kite.trade/docs/connect/v3/" },
    { id: "groww", name: "Groww", type: "Indian Markets", category: "indian", connected: false },
    { id: "upstox", name: "Upstox", type: "Indian Markets", category: "indian", connected: false },
    { id: "angelone", name: "Angel One", type: "Indian Markets", category: "indian", connected: false },
    { id: "dhan", name: "Dhan", type: "Indian Markets", category: "indian", connected: false },
    { id: "5paisa", name: "5paisa", type: "Indian Markets", category: "indian", connected: false },
  ],
  crypto: [
    { id: "binance", name: "Binance", type: "Crypto", category: "crypto", connected: false, docsUrl: "https://binance-docs.github.io/apidocs/" },
    { id: "coindcx", name: "CoinDCX", type: "Crypto", category: "crypto", connected: false },
    { id: "wazirx", name: "WazirX", type: "Crypto", category: "crypto", connected: false },
    { id: "coinbase", name: "Coinbase", type: "Crypto", category: "crypto", connected: false },
    { id: "bybit", name: "Bybit", type: "Crypto", category: "crypto", connected: false },
    { id: "okx", name: "OKX", type: "Crypto", category: "crypto", connected: false },
  ],
  forex: [
    { id: "exness", name: "Exness", type: "Forex", category: "forex", connected: false },
    { id: "mt4", name: "MetaTrader 4", type: "Forex", category: "forex", connected: false },
    { id: "mt5", name: "MetaTrader 5", type: "Forex", category: "forex", connected: false },
    { id: "icmarkets", name: "IC Markets", type: "Forex", category: "forex", connected: false },
    { id: "fxtm", name: "FXTM", type: "Forex", category: "forex", connected: false },
    { id: "pepperstone", name: "Pepperstone", type: "Forex", category: "forex", connected: false },
  ],
  global: [
    { id: "tradingview", name: "TradingView", type: "Global", category: "global", connected: false, requiresSecret: false },
    { id: "thinkorswim", name: "ThinkOrSwim", type: "Global", category: "global", connected: false },
    { id: "ibkr", name: "Interactive Brokers", type: "Global", category: "global", connected: false },
    { id: "tradestation", name: "TradeStation", type: "Global", category: "global", connected: false },
  ],
};

const BrokerIntegrations: React.FC<BrokerIntegrationsProps> = ({
  onSettingChange,
  saveResetButtons,
}) => {
  const handleConnect = async (id: string, apiKey: string, secretKey?: string) => {
    // In a real app, this would make an API call to store the credentials securely
    console.log(`Connecting to ${id} with API key`);
    onSettingChange();
  };

  const handleDisconnect = async (id: string) => {
    // In a real app, this would make an API call to remove the stored credentials
    console.log(`Disconnecting from ${id}`);
    onSettingChange();
  };

  return (
    <div className="space-y-6">
      <BrokerCategory
        title="Indian Markets"
        brokers={BROKERS.indian}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
      
      <BrokerCategory
        title="Cryptocurrency"
        brokers={BROKERS.crypto}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
      
      <BrokerCategory
        title="Forex"
        brokers={BROKERS.forex}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
      
      <BrokerCategory
        title="Global"
        brokers={BROKERS.global}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
      
      {saveResetButtons}
    </div>
  );
};

export default BrokerIntegrations;
