
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, EyeOff, Copy, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string | null;
  scopes: string[];
}

const ApiKeysTab: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: '1', name: 'Trading App Integration', key: 'sk_live_TradeJournalAPI_9f8d3a2e71b54c8', created: 'Apr 10, 2025', lastUsed: 'Today', scopes: ['read', 'trades'] },
    { id: '2', name: 'Data Export', key: 'sk_live_TradeJournalAPI_7e5d1b8f32a61d9', created: 'Mar 15, 2025', lastUsed: '1 week ago', scopes: ['read'] }
  ]);
  
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyScopes, setNewKeyScopes] = useState<Record<string, boolean>>({
    read: true,
    write: false,
    trades: false,
    journals: false,
    analytics: false,
  });
  const [newGeneratedKey, setNewGeneratedKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  const handleScopeChange = (scope: string, checked: boolean) => {
    setNewKeyScopes(prev => ({ ...prev, [scope]: checked }));
  };

  const generateNewKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a key name");
      return;
    }

    // Generate random key
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let newKey = "sk_live_TradeJournalAPI_";
    for (let i = 0; i < 16; i++) {
      newKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setNewGeneratedKey(newKey);
    toast.success("API key generated successfully", {
      description: "Make sure to copy your key now. You won't be able to see it again."
    });
  };

  const saveNewKey = () => {
    const scopes = Object.entries(newKeyScopes)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: newGeneratedKey,
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUsed: null,
      scopes
    };

    setApiKeys([...apiKeys, newKey]);
    resetNewKeyForm();
    toast.success("New API key saved");
  };

  const resetNewKeyForm = () => {
    setShowNewKeyForm(false);
    setNewKeyName("");
    setNewGeneratedKey("");
    setNewKeyScopes({
      read: true,
      write: false,
      trades: false,
      journals: false,
      analytics: false,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("API key copied to clipboard");
  };

  const deleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast.success("API key revoked successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">API Access Keys</h2>
        {!showNewKeyForm && !newGeneratedKey && (
          <Button 
            onClick={() => setShowNewKeyForm(true)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Generate New Key
          </Button>
        )}
      </div>

      {showNewKeyForm && !newGeneratedKey && (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="key-name">Key Name</Label>
            <Input
              id="key-name"
              placeholder="e.g. Trading Bot Access"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Access Scopes</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="scope-read" 
                  checked={newKeyScopes.read}
                  onCheckedChange={(checked) => handleScopeChange('read', checked)}
                />
                <Label htmlFor="scope-read">Read</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="scope-write" 
                  checked={newKeyScopes.write}
                  onCheckedChange={(checked) => handleScopeChange('write', checked)}
                />
                <Label htmlFor="scope-write">Write</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="scope-trades" 
                  checked={newKeyScopes.trades}
                  onCheckedChange={(checked) => handleScopeChange('trades', checked)}
                />
                <Label htmlFor="scope-trades">Trades</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="scope-journals" 
                  checked={newKeyScopes.journals}
                  onCheckedChange={(checked) => handleScopeChange('journals', checked)}
                />
                <Label htmlFor="scope-journals">Journals</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="scope-analytics" 
                  checked={newKeyScopes.analytics}
                  onCheckedChange={(checked) => handleScopeChange('analytics', checked)}
                />
                <Label htmlFor="scope-analytics">Analytics</Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={resetNewKeyForm}>Cancel</Button>
            <Button onClick={generateNewKey}>Generate Key</Button>
          </div>
        </div>
      )}
      
      {newGeneratedKey && (
        <div className="border border-primary/30 rounded-lg p-4 space-y-4 bg-primary/5">
          <div className="text-center">
            <h3 className="font-medium mb-2">Your API Key</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This key will only be shown once. Store it securely.
            </p>
            
            <div className="relative mb-4">
              <Input
                value={showKey ? newGeneratedKey : "•".repeat(newGeneratedKey.length)}
                readOnly
                className="pr-16 font-mono text-sm"
              />
              <div className="absolute right-2 top-2 flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 mr-1"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => copyToClipboard(newGeneratedKey)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center gap-2">
              <Button variant="outline" onClick={resetNewKeyForm}>Cancel</Button>
              <Button onClick={saveNewKey}>Save Key</Button>
            </div>
          </div>
        </div>
      )}
      
      {apiKeys.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>{apiKey.created}</TableCell>
                  <TableCell>{apiKey.lastUsed || 'Never'}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteKey(apiKey.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <div className="p-4 border rounded-lg bg-muted/20">
        <h3 className="text-base font-medium mb-2">API Documentation</h3>
        <p className="text-sm text-muted-foreground mb-4">
          View the API documentation to learn how to integrate with our services
        </p>
        <Button variant="outline" className="flex items-center gap-2">
          View API Documentation
        </Button>
      </div>
    </div>
  );
};

export default ApiKeysTab;
