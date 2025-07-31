
import React, { useState, useEffect, useRef } from "react";
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
import { SearchResults } from "@/components/search/SearchResults";

export function Header() {
  const [dateRange, setDateRange] = useState("Last 30 days");
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(3);
  const { toggleMobile, isMobile } = useSidebar();
  
  // Search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock search data
  const mockSearchData = [
    { id: "1", type: "trade", title: "AAPL Long", subtitle: "Apple Inc. - Tech Sector", date: "Dec 15", pnl: 245.50, tags: ["momentum", "breakout"] },
    { id: "2", type: "trade", title: "TSLA Short", subtitle: "Tesla Inc. - Auto Sector", date: "Dec 14", pnl: -125.30, tags: ["reversal", "earnings"] },
    { id: "3", type: "symbol", title: "MSFT", subtitle: "Microsoft Corporation", date: "Dec 13", tags: ["tech", "dividend"] },
    { id: "4", type: "tag", title: "momentum", subtitle: "12 trades tagged", tags: [] },
    { id: "5", type: "tag", title: "breakout", subtitle: "8 trades tagged", tags: [] },
  ];

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        const filtered = mockSearchData.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setSearchResults(filtered);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchResultClick = (result: any) => {
    setShowResults(false);
    setSearchQuery("");
    toast({
      title: "Navigation",
      description: `Opening ${result.title}`,
      duration: 2000,
    });
  };

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
        <div className="relative" ref={searchRef}>
          <Input 
            type="search" 
            placeholder="Search trades, tags, symbols..." 
            className="w-full pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowResults(true)}
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
          
          {showResults && (
            <SearchResults
              query={searchQuery}
              results={searchResults}
              onResultClick={handleSearchResultClick}
            />
          )}
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 flex h-2 w-2 items-center justify-center rounded-full bg-destructive" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between p-2 border-b">
              <h4 className="font-semibold">Notifications</h4>
              <Button variant="ghost" size="sm" onClick={() => setNotifications(0)}>
                Mark all read
              </Button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications > 0 ? (
                <>
                  <DropdownMenuItem className="flex-col items-start p-3">
                    <div className="font-medium">Trade Alert</div>
                    <div className="text-sm text-muted-foreground">Your AAPL trade has reached profit target</div>
                    <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex-col items-start p-3">
                    <div className="font-medium">Risk Warning</div>
                    <div className="text-sm text-muted-foreground">Daily loss limit approaching</div>
                    <div className="text-xs text-muted-foreground mt-1">10 minutes ago</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex-col items-start p-3">
                    <div className="font-medium">Market Update</div>
                    <div className="text-sm text-muted-foreground">High volatility detected in tech sector</div>
                    <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
                  </DropdownMenuItem>
                </>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No new notifications
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center space-x-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            </div>
            <DropdownMenuItem>
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              Support
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
