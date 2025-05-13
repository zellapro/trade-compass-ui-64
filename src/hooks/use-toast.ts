
import { toast as sonnerToast, type ToastT } from "sonner";

export type ToastProps = {
  title?: string;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
  action?: React.ReactNode;
};

type ToasterToast = ToastProps;

const useToast = () => {
  const toast = (props: ToastProps = {}) => {
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
      return sonnerToast(description as string, rest);
    }
    
    return sonnerToast("", rest);
  };

  return {
    toast,
    // Return an empty array to prevent the map error
    toasts: [],
  };
};

export { useToast };
export { toast } from "sonner";
export type { ToastT as Toast };
