
import { useToast as useToastHook, toast as toastHook, type Toast as ToastType } from "@/components/ui/toast";

export type Toast = ToastType;

export const useToast = useToastHook;
export const toast = toastHook;
