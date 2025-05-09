
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Undo } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Import all our new components
import ProfileSettings from "@/components/settings/profile/ProfileSettings";
import SubscriptionDetails from "@/components/settings/subscription/SubscriptionDetails";
import LinkedDevices from "@/components/settings/devices/LinkedDevices";
import DataManagement from "@/components/settings/data/DataManagement";
import SocialConnections from "@/components/settings/social/SocialConnections";

interface AccountManagementProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const AccountManagement: React.FC<AccountManagementProps> = ({
  onSettingChange,
  saveResetButtons,
}) => {
  const { toast } = useToast();
  const [changesMade, setChangesMade] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<string[]>(["profile"]);

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
      case "profile": return "profile";
      case "subscription": return "subscription";
      case "devices": return "linked devices";
      case "data": return "data management";
      case "social": return "social media";
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
  
  const handleAccordionChange = (value: string) => {
    // If the value is already in the array, remove it, otherwise add it
    setExpandedSections(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };

  return (
    <div className="space-y-6">
      <Accordion 
        type="multiple" 
        value={expandedSections} 
        onValueChange={setExpandedSections}
        className="space-y-6"
      >
        <AccordionItem value="profile" className="border-none">
          <AccordionTrigger className="py-0 [&[data-state=open]]:mb-6">
            <h2 className="text-xl font-semibold">Profile Settings</h2>
          </AccordionTrigger>
          <AccordionContent>
            <ProfileSettings 
              onSettingChange={() => handleSettingChange('profile')}
              saveResetButtons={<SectionButtons section="profile" />}
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="subscription" className="border-none">
          <AccordionTrigger className="py-0 [&[data-state=open]]:mb-6">
            <h2 className="text-xl font-semibold">Subscription Plans</h2>
          </AccordionTrigger>
          <AccordionContent>
            <SubscriptionDetails 
              onSettingChange={() => handleSettingChange('subscription')}
              saveResetButtons={<SectionButtons section="subscription" />}
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="devices" className="border-none">
          <AccordionTrigger className="py-0 [&[data-state=open]]:mb-6">
            <h2 className="text-xl font-semibold">Linked Devices</h2>
          </AccordionTrigger>
          <AccordionContent>
            <LinkedDevices 
              onSettingChange={() => handleSettingChange('devices')}
              saveResetButtons={<SectionButtons section="devices" />}
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="data" className="border-none">
          <AccordionTrigger className="py-0 [&[data-state=open]]:mb-6">
            <h2 className="text-xl font-semibold">Data Management</h2>
          </AccordionTrigger>
          <AccordionContent>
            <DataManagement 
              onSettingChange={() => handleSettingChange('data')}
              saveResetButtons={<SectionButtons section="data" />}
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="social" className="border-none">
          <AccordionTrigger className="py-0 [&[data-state=open]]:mb-6">
            <h2 className="text-xl font-semibold">Social Media Connections</h2>
          </AccordionTrigger>
          <AccordionContent>
            <SocialConnections 
              onSettingChange={() => handleSettingChange('social')}
              saveResetButtons={<SectionButtons section="social" />}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AccountManagement;
