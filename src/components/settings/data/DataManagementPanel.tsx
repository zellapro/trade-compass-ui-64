
import React from "react";
import { cn } from "@/lib/utils";
import BackupRestorePanel from "./BackupRestorePanel";
import { DataManagement } from "./DataManagement";

interface DataManagementPanelProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const DataManagementPanel: React.FC<DataManagementPanelProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  return (
    <div className={cn("grid gap-6")}>
      <BackupRestorePanel 
        onSettingChange={onSettingChange}
        saveResetButtons={saveResetButtons}
      />
      
      <DataManagement />
    </div>
  );
};

export default DataManagementPanel;
