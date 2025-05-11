
import React, { useState } from "react";
import AlertThresholds from "./notifications/AlertThresholds";
import NotificationPreferences from "./notifications/NotificationPreferences";

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
      <AlertThresholds onSettingChange={onSettingChange} />
      <NotificationPreferences onSettingChange={onSettingChange} />
      
      <div className="flex justify-end">
        {saveResetButtons}
      </div>
    </div>
  );
};

export default NotificationSettings;
