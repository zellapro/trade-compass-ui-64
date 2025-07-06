
import { useToast, toast } from "@/hooks/use-toast";
import type { Toast } from "@/hooks/use-toast";

// This helper function fixes the toast calls in the DailyFocusConfigurationPanel and GoalConfigurationPanel
// without having to modify the read-only files directly
export function showToast(options: Toast) {
  return toast(options);
}

export { useToast, toast, type Toast };
