
import { toast as sonnerToast, type Toast as SonnerToast } from "sonner";

export type ToastProps = SonnerToast & {
  title?: string;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
};

const useToast = () => {
  const toast = ({ title, description, variant, ...props }: ToastProps = {}) => {
    return sonnerToast(title, {
      description,
      ...props,
    });
  };

  return { toast };
};

export { useToast, sonnerToast as toast };
