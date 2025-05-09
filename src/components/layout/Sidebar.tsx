
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  BarChart2,
  Clock,
  FileText,
  Settings,
  BookOpen,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    {
      title: "Home",
      icon: Home,
      href: "/",
    },
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Trade Journal",
      icon: FileText,
      href: "/journal",
    },
    {
      title: "Performance",
      icon: BarChart2,
      href: "/performance",
    },
    {
      title: "Playbook",
      icon: BookOpen,
      href: "/playbook",
    },
    {
      title: "Trade Replay",
      icon: Clock,
      href: "/replay",
    },
    {
      title: "Reports",
      icon: CalendarDays,
      href: "/reports",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <div className="hidden lg:flex flex-col h-screen w-64 border-r bg-card">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold">ZellaPro</h1>
        <p className="text-sm text-muted-foreground">Trading Journal</p>
      </div>
      <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              isActive(item.href)
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/50 text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t text-center text-xs text-muted-foreground">
        <span>ZellaPro v2.0 - Elite Trader Edition</span>
      </div>
    </div>
  );
}
