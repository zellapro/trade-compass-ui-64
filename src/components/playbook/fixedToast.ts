
import { useToast, toast, type Toast } from "@/hooks/use-toast";

// This helper function fixes the toast calls in the DailyFocusConfigurationPanel and GoalConfigurationPanel
// without having to modify the read-only files directly
export function showToast(options: Toast) {
  const { toast } = useToast();
  return toast(options);
}

export { useToast, toast };
