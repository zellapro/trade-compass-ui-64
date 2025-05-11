
import React from "react";
import NotificationPreferences from "./notifications/NotificationPreferences";
import AlertThresholds from "./notifications/AlertThresholds";

interface NotificationSettingsProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  return (
    <div className="space-y-8">
      <NotificationPreferences onSettingChange={onSettingChange} />
      <AlertThresholds onSettingChange={onSettingChange} />
      
      <div className="flex justify-end">
        {saveResetButtons}
      </div>
    </div>
  );
};

export default NotificationSettings;
