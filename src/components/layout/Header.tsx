
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Sun, Moon, ChevronDown, Calendar, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { useSidebar } from "@/context/SidebarContext";

export function Header() {
  const [dateRange, setDateRange] = useState("Last 30 days");
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(3);
  const { toggleMobile, isMobile } = useSidebar();

  const handleThemeToggle = () => {
    toggleTheme();
    toast({
      title: `Theme Changed`,
      description: `${theme === "light" ? "Dark" : "Light"} theme applied`,
      duration: 2000,
    });
  };

  return (
    <header className="w-full h-16 px-4 flex items-center justify-between bg-background border-b">
      {/* Left section: Mobile menu + Logo and Account Switch */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobile}
            className="lg:hidden"
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        <div className="text-2xl font-bold">ZellaPro</div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-xs bg-primary text-primary-foreground hover:bg-primary/90 ml-2">
              FUNDED
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Personal Account</DropdownMenuItem>
            <DropdownMenuItem>Funded Account</DropdownMenuItem>
            <DropdownMenuItem>Demo Account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {dateRange}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setDateRange("Today")}>Today</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange("Last 7 days")}>Last 7 days</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange("Last 30 days")}>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange("This month")}>This month</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateRange("This year")}>This year</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Center section: Search */}
      <div className="flex-1 px-6 max-w-xl mx-auto">
        <div className="relative">
          <Input 
            type="search" 
            placeholder="Search trades, tags, symbols..." 
            className="w-full pl-10" 
          />
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Right section: Actions and User */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleThemeToggle}
          className="rounded-full"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell size={20} />
          {notifications > 0 && (
            <span className="absolute top-1 right-1 flex h-2 w-2 items-center justify-center rounded-full bg-destructive" />
          )}
        </Button>
        
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
