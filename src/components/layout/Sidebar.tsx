
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BarChart2, 
  BookOpen, 
  LineChart, 
  Repeat, 
  FileText,
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: BarChart2,
  },
  {
    label: "Trade Journal",
    href: "/journal",
    icon: BookOpen,
  },
  {
    label: "Performance",
    href: "/performance",
    icon: LineChart,
  },
  {
    label: "Replay Mode",
    href: "/replay",
    icon: Repeat,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("/");

  useEffect(() => {
    // Update active item based on current path
    const path = window.location.pathname;
    setActiveItem(path);
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col border-r bg-sidebar transition-all duration-300 sticky top-0 left-0",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <div className={cn("overflow-hidden", collapsed ? "w-0" : "w-auto")}>
          <h2 className="text-xl font-bold text-primary">TradeCompass</h2>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  activeItem === item.href
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-accent/50"
                )}
                onClick={() => setActiveItem(item.href)}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <div className={cn("text-sm text-muted-foreground", collapsed ? "hidden" : "block")}>
          <p>TradeCompass v1.0</p>
        </div>
      </div>
    </div>
  );
}
