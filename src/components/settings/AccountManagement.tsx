
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Undo } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import all our components
import SubscriptionPanel from "@/components/settings/subscription/SubscriptionPanel";
import ActiveSessionsPanel from "@/components/settings/devices/ActiveSessionsPanel";
import DataManagementPanel from "@/components/settings/data/DataManagementPanel";

interface AccountManagementProps {
  onSettingChange: () => void;
}

const AccountManagement: React.FC<AccountManagementProps> = ({
  onSettingChange,
}) => {
  const { toast } = useToast();
  const [changesMade, setChangesMade] = useState<Record<string, boolean>>({});

  const handleSettingChange = (section: string) => {
    setChangesMade(prev => ({ ...prev, [section]: true }));
    onSettingChange();
  };

  const handleSave = (section: string) => {
    setChangesMade(prev => ({ ...prev, [section]: false }));
    toast({
      title: "Settings saved",
      description: `Your ${getSectionName(section)} settings have been updated.`,
    });
  };

  const handleReset = (section: string) => {
    setChangesMade(prev => ({ ...prev, [section]: false }));
    toast({
      title: "Settings reset",
      description: `Your ${getSectionName(section)} settings have been reset to defaults.`,
    });
  };

  const getSectionName = (section: string): string => {
    switch(section) {
      case "subscription": return "subscription";
      case "sessions": return "active sessions";
      case "data": return "data management";
      default: return section;
    }
  };

  const SectionButtons = ({ section }: { section: string }) => (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => handleReset(section)}
        disabled={!changesMade[section]}
      >
        <Undo className="mr-1 h-4 w-4" />
        Reset
      </Button>
      <Button 
        size="sm" 
        onClick={() => handleSave(section)}
        disabled={!changesMade[section]}
      >
        <Save className="mr-1 h-4 w-4" />
        Save Changes
      </Button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Subscription Panel */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Subscription</h2>
        <SubscriptionPanel 
          onSettingChange={() => handleSettingChange('subscription')}
          saveResetButtons={<SectionButtons section="subscription" />}
        />
      </div>

      {/* Active Sessions Panel */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Active Sessions</h2>
        <ActiveSessionsPanel 
          onSettingChange={() => handleSettingChange('sessions')}
          saveResetButtons={<SectionButtons section="sessions" />}
        />
      </div>

      {/* Data Management Panel */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Data Management</h2>
        <DataManagementPanel 
          onSettingChange={() => handleSettingChange('data')}
          saveResetButtons={<SectionButtons section="data" />}
        />
      </div>
    </div>
  );
};

export default AccountManagement;
