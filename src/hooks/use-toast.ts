
import { toast as sonnerToast } from "sonner";
import { ReactNode } from "react";

export type Toast = {
  title?: string;
  description?: ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
  action?: ReactNode;
};

const useToast = () => {
  const toast = (props: Toast = {}) => {
    const { title, description, variant, ...rest } = props;
    
    // If we have a title and description, use the more detailed toast format
    if (title && description) {
      return sonnerToast(title, {
        description,
        ...rest,
      });
    }
    
    // If we only have title, use it as the main message
    if (title && !description) {
      return sonnerToast(title, rest);
    }
    
    // If we only have description, use it as the main message
    if (!title && description) {
      if (typeof description === "string") {
        return sonnerToast(description, rest);
      }
      // Handle non-string descriptions
      return sonnerToast("Notification", { ...rest, description });
    }
    
    return sonnerToast("", rest);
  };

  return {
    toast,
    // Return an empty array to prevent the map error in any components still expecting it
    toasts: []
  };
};

export { useToast };
export { toast } from "sonner";
