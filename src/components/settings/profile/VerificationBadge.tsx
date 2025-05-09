
import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

interface VerificationBadgeProps {
  isVerified: boolean;
  type: "email" | "mobile";
  onVerify?: () => void;
}

const VerificationBadge = ({ isVerified, type, onVerify }: VerificationBadgeProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
          isVerified 
            ? "text-green-500 bg-green-500/10 border border-green-500/20" 
            : "text-amber-500 bg-amber-500/10 border border-amber-500/20"
        }`}>
          {isVerified ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <XCircle className="h-3 w-3 mr-1" />
          )}
          {isVerified ? "Verified" : "Unverified"}
        </div>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-64" align="center">
        {isVerified ? (
          <div>
            <h4 className="font-medium">Verified {type}</h4>
            <p className="text-sm text-muted-foreground">
              {type === "email" 
                ? "Your email address has been verified." 
                : "Your mobile number has been verified."}
            </p>
          </div>
        ) : (
          <div>
            <h4 className="font-medium">Verification Required</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Please verify your {type} to enable all account features.
            </p>
            {onVerify && (
              <Button size="sm" onClick={onVerify}>
                Verify Now
              </Button>
            )}
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default VerificationBadge;
