
import { ReactNode, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { useTheme } from "@/context/ThemeContext";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  // Ensure theme is applied to the entire layout
  useEffect(() => {
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-premium');
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div className="flex h-screen bg-background">
      {/* Subtle background patterns */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#0a0514_1px,transparent_1px),linear-gradient(to_bottom,#0a0514_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_500px_at_30%_50%,var(--primary),transparent)] opacity-10"></div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_800px_at_70%_70%,var(--accent),transparent)] opacity-10"></div>
      
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
