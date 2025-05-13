
import { useToast as useSonnerToast, type Toast } from "sonner";

export type ToastProps = Toast & {
  title?: string;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
};

type ToasterToast = ToastProps;

const TOAST_LIMIT = 5;
type ToasterToastActionElement = React.ReactElement;

interface ToasterStore {
  toasts: ToasterToast[];
  add: (toast: ToasterToast) => void;
  dismiss: (toastId: string | number) => void;
  remove: (toastId: string | number) => void;
}

// This is a mock store that mimics the original toast library to match the component interface
const toastStore: ToasterStore = {
  toasts: [],
  add: () => {},
  dismiss: () => {},
  remove: () => {},
};

const useToast = () => {
  const { toast } = useSonnerToast();

  const toastFunction = ({ title, description, variant, ...props }: ToastProps = {}) => {
    return toast(title, {
      description,
      ...props,
    });
  };

  return {
    toast: toastFunction,
    toasts: toastStore.toasts,
  };
};

export { useToast, Toast };
export { toast } from "sonner";
