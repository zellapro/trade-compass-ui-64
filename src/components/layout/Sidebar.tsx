
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
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/SidebarContext";

export function Sidebar() {
  const location = useLocation();
  const { 
    collapsed, 
    toggleCollapsed, 
    mobileOpen, 
    setMobileOpen, 
    isMobile 
  } = useSidebar();
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
    <>
      {/* Mobile backdrop */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "flex flex-col h-screen border-r bg-card transition-all duration-300",
          // Desktop styles
          "hidden lg:flex",
          collapsed ? "w-[4.5rem]" : "w-64",
          // Mobile styles
          isMobile && "lg:hidden fixed left-0 top-0 z-50 w-64",
          isMobile && mobileOpen && "flex",
          isMobile && !mobileOpen && "hidden"
        )}
      >
        <div className={cn("p-4 border-b flex items-center", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && (
            <div>
              <h1 className="text-2xl font-bold">ZellaPro</h1>
              <p className="text-sm text-muted-foreground">Trading Journal</p>
            </div>
          )}
          {collapsed && <h1 className="text-2xl font-bold">Z</h1>}
          
          {/* Desktop collapse button */}
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleCollapsed}
              className="h-8 w-8"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
          
          {/* Mobile close button */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
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
                  : "hover:bg-accent/50 text-foreground",
                collapsed && !isMobile && "justify-center px-2"
              )}
              title={collapsed && !isMobile ? item.title : undefined}
              onClick={() => isMobile && setMobileOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {(!collapsed || isMobile) && item.title}
            </Link>
          ))}
        </nav>
      
        <div className={cn("p-4 border-t text-center text-xs text-muted-foreground", collapsed && !isMobile && "px-2")}>
          {(!collapsed || isMobile) ? (
            <span>ZellaPro v2.0 - Elite Trader Edition</span>
          ) : (
            <span>v2.0</span>
          )}
        </div>
      </div>
    </>
  );
}
