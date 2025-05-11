
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Webhook {
  id: string;
  name: string;
  url: string;
  event: string;
}

const triggerEvents = [
  { value: "tradeImport", label: "Trade Import" },
  { value: "journalUpdate", label: "Journal Update" },
  { value: "reportGenerated", label: "Report Generated" },
  { value: "strategyUpdate", label: "Strategy Update" }
];

const WebhooksTab: React.FC = () => {
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    { id: '1', name: 'Trade Import Notification', url: 'https://example.com/webhook1', event: 'tradeImport' },
    { id: '2', name: 'Journal Update', url: 'https://example.com/webhook2', event: 'journalUpdate' }
  ]);
  
  const [newWebhookName, setNewWebhookName] = useState("");
  const [newWebhookUrl, setNewWebhookUrl] = useState("https://");
  const [newWebhookEvent, setNewWebhookEvent] = useState<string>("tradeImport");
  const [showAddForm, setShowAddForm] = useState(false);
  const [testWebhookId, setTestWebhookId] = useState<string | null>(null);
  
  const handleAddWebhook = () => {
    if (!newWebhookName.trim() || !newWebhookUrl.trim() || !newWebhookEvent) {
      toast.error("Please fill in all fields");
      return;
    }

    const newWebhook: Webhook = {
      id: Date.now().toString(),
      name: newWebhookName,
      url: newWebhookUrl,
      event: newWebhookEvent
    };

    setWebhooks([...webhooks, newWebhook]);
    resetForm();
    toast.success("Webhook added successfully");
  };
  
  const resetForm = () => {
    setNewWebhookName("");
    setNewWebhookUrl("https://");
    setNewWebhookEvent("tradeImport");
    setShowAddForm(false);
  };
  
  const deleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id));
    toast.success("Webhook deleted successfully");
  };
  
  const testWebhook = (webhookId: string) => {
    const webhook = webhooks.find(w => w.id === webhookId);
    if (!webhook) return;
    
    setTestWebhookId(webhookId);
    
    // Simulate webhook test
    setTimeout(() => {
      setTestWebhookId(null);
      toast.success("Test event sent successfully", {
        description: `Event sent to ${webhook.url}`
      });
    }, 1000);
  };
  
  const getEventLabel = (eventValue: string) => {
    const event = triggerEvents.find(e => e.value === eventValue);
    return event ? event.label : eventValue;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Webhook Endpoints</h2>
        {!showAddForm && (
          <Button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Webhook
          </Button>
        )}
      </div>
      
      {showAddForm && (
        <div className="border rounded-lg p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-name">Webhook Name</Label>
            <Input
              id="webhook-name"
              placeholder="e.g. Trade Import Alert"
              value={newWebhookName}
              onChange={(e) => setNewWebhookName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trigger-event">Trigger Event</Label>
            <Select 
              value={newWebhookEvent} 
              onValueChange={setNewWebhookEvent}
            >
              <SelectTrigger id="trigger-event">
                <SelectValue placeholder="Select trigger event" />
              </SelectTrigger>
              <SelectContent>
                {triggerEvents.map((event) => (
                  <SelectItem key={event.value} value={event.value}>
                    {event.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder="https://"
              value={newWebhookUrl}
              onChange={(e) => setNewWebhookUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              The URL that will receive webhook events via HTTP POST
            </p>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleAddWebhook}>Add Webhook</Button>
          </div>
        </div>
      )}
      
      {webhooks.length > 0 && (
        <>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {webhooks.map((webhook) => (
                  <TableRow key={webhook.id}>
                    <TableCell className="font-medium">{webhook.name}</TableCell>
                    <TableCell>{getEventLabel(webhook.event)}</TableCell>
                    <TableCell className="font-mono text-xs truncate max-w-[200px]">
                      {webhook.url}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={testWebhookId === webhook.id}
                          onClick={() => testWebhook(webhook.id)}
                        >
                          {testWebhookId === webhook.id ? "Sending..." : "Test"}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteWebhook(webhook.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-4 border-t">
            <h3 className="font-medium text-sm mb-2">Test Webhook</h3>
            <div className="flex gap-2">
              <Select defaultValue={webhooks[0].id}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select webhook" />
                </SelectTrigger>
                <SelectContent>
                  {webhooks.map((webhook) => (
                    <SelectItem key={webhook.id} value={webhook.id}>
                      {webhook.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">Send Test Event</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WebhooksTab;
