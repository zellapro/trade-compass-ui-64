import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, CalendarDays, BarChart2, Clock, FileText, Settings, BookOpen, Home, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  // Read the collapsed state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed");
    if (savedState !== null) {
      setCollapsed(savedState === "true");
    }
  }, []);

  // Save the collapsed state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed.toString());
  }, [collapsed]);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const navigationItems = [{
    title: "Home",
    icon: Home,
    href: "/"
  }, {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard"
  }, {
    title: "Trade Journal",
    icon: FileText,
    href: "/journal"
  }, {
    title: "Performance",
    icon: BarChart2,
    href: "/performance"
  }, {
    title: "Playbook",
    icon: BookOpen,
    href: "/playbook"
  }, {
    title: "Trade Replay",
    icon: Clock,
    href: "/replay"
  }, {
    title: "Reports",
    icon: CalendarDays,
    href: "/reports"
  }, {
    title: "Settings",
    icon: Settings,
    href: "/settings"
  }];
  return <div className={cn("hidden lg:flex flex-col h-screen border-r bg-card transition-all duration-300", collapsed ? "w-[4.5rem]" : "w-64")}>
      <div className={cn("p-4 border-b flex items-center", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && <div>
            <h1 className="text-2xl font-bold">TradeVult</h1>
            <p className="text-sm text-muted-foreground">Trading Journal</p>
          </div>}
        {collapsed && <h1 className="text-2xl font-bold">Z</h1>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
        {navigationItems.map(item => <Link key={item.href} to={item.href} className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors", isActive(item.href) ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 text-foreground", collapsed && "justify-center px-2")} title={collapsed ? item.title : undefined}>
            <item.icon className="h-5 w-5" />
            {!collapsed && item.title}
          </Link>)}
      </nav>
      
      <div className={cn("p-4 border-t text-center text-xs text-muted-foreground", collapsed && "px-2")}>
        {!collapsed ? <span>ZellaPro v2.0 - Elite Trader Edition</span> : <span>v2.0</span>}
      </div>
    </div>;
}