
import React from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface SettingsButtonProps {
  section?: string;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ 
  section = "", 
  variant = "ghost",
  size = "icon"
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (section) {
      navigate(`/settings?tab=${section}`);
    } else {
      navigate("/settings");
    }
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={variant} 
            size={size} 
            onClick={handleClick}
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{section ? `${section.charAt(0).toUpperCase() + section.slice(1)} Settings` : "Settings"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SettingsButton;
