
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Zap, Focus, CalendarDays, Layers, Calendar, Upload, FileText, GitMerge, ChevronDown, Clock, Pencil, Copy, LinkIcon, Lock } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface BonusFeaturesProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const BonusFeatures: React.FC<BonusFeaturesProps> = ({
  onSettingChange,
  saveResetButtons
}) => {
  const [focusModeEnabled, setFocusModeEnabled] = useState(false);
  const [marketSyncEnabled, setMarketSyncEnabled] = useState(true);
  const [tradingPlanEnabled, setTradingPlanEnabled] = useState(false);
  const [calendarSyncEnabled, setCalendarSyncEnabled] = useState(false);
  
  const toggleFocusMode = () => {
    setFocusModeEnabled(!focusModeEnabled);
    onSettingChange();
  };
  
  const toggleMarketSync = () => {
    setMarketSyncEnabled(!marketSyncEnabled);
    onSettingChange();
  };
  
  const toggleTradingPlan = () => {
    setTradingPlanEnabled(!tradingPlanEnabled);
    onSettingChange();
  };
  
  const toggleCalendarSync = () => {
    setCalendarSyncEnabled(!calendarSyncEnabled);
    onSettingChange();
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Focus Mode</CardTitle>
          <CardDescription>Configure a distraction-free trading environment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <div className="bg-primary/10 rounded-full p-2 h-fit">
                <Focus className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Focus Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Hide analytics and show only the essential trading tools
                </p>
              </div>
            </div>
            <Switch checked={focusModeEnabled} onCheckedChange={toggleFocusMode} />
          </div>
          
          {focusModeEnabled && (
            <div className="pl-12 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <Switch id="focus-hide-analytics" defaultChecked onChange={onSettingChange} />
                  <Label htmlFor="focus-hide-analytics">Hide Analytics</Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <Switch id="focus-hide-alerts" defaultChecked onChange={onSettingChange} />
                  <Label htmlFor="focus-hide-alerts">Hide Notifications</Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <Switch id="focus-show-checklist" defaultChecked onChange={onSettingChange} />
                  <Label htmlFor="focus-show-checklist">Show Trading Checklist</Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <Switch id="focus-timer" defaultChecked onChange={onSettingChange} />
                  <Label htmlFor="focus-timer">Show Session Timer</Label>
                </div>
              </div>
              
              <div>
                <Label htmlFor="focus-active-template">Active Template</Label>
                <Select defaultValue="trading">
                  <SelectTrigger id="focus-active-template" className="mt-1">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trading">Trading Session</SelectItem>
                    <SelectItem value="planning">Planning Session</SelectItem>
                    <SelectItem value="review">Review Session</SelectItem>
                    <SelectItem value="custom">Custom Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div>
                  <Label htmlFor="focus-keyboard">Keyboard Shortcut</Label>
                  <p className="text-xs text-muted-foreground">
                    Quickly toggle focus mode with a keyboard shortcut
                  </p>
                </div>
                <div className="flex gap-1">
                  <div className="bg-muted px-2 py-1 rounded text-sm font-mono">Ctrl</div>
                  <div className="bg-muted px-2 py-1 rounded text-sm font-mono">Shift</div>
                  <div className="bg-muted px-2 py-1 rounded text-sm font-mono">F</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Market Sync</CardTitle>
          <CardDescription>Configure market sessions and holidays</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <div className="bg-primary/10 rounded-full p-2 h-fit">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Market Session Sync</h3>
                <p className="text-sm text-muted-foreground">
                  Define market hours and holidays for accurate trade timing
                </p>
              </div>
            </div>
            <Switch checked={marketSyncEnabled} onCheckedChange={toggleMarketSync} />
          </div>
          
          {marketSyncEnabled && (
            <div className="pl-12 space-y-4">
              <div>
                <Label className="text-base mb-2 block">Active Markets</Label>
                <div className="space-y-3">
                  <Collapsible className="border rounded-lg">
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-600">US</span>
                        </div>
                        <span className="font-medium">US Markets (NYSE/NASDAQ)</span>
                      </div>
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 pt-0 border-t">
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="nyse-open">Regular Session Start</Label>
                            <Select defaultValue="09:30">
                              <SelectTrigger id="nyse-open" className="mt-1">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="09:30">9:30 AM ET</SelectItem>
                                <SelectItem value="08:00">8:00 AM ET (Pre-market)</SelectItem>
                                <SelectItem value="04:00">4:00 AM ET (Extended)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="nyse-close">Regular Session End</Label>
                            <Select defaultValue="16:00">
                              <SelectTrigger id="nyse-close" className="mt-1">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="16:00">4:00 PM ET</SelectItem>
                                <SelectItem value="20:00">8:00 PM ET (After-hours)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="nyse-premarket" defaultChecked onChange={onSettingChange} />
                          <Label htmlFor="nyse-premarket">Include Pre-market (4:00 AM - 9:30 AM)</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="nyse-afterhours" defaultChecked onChange={onSettingChange} />
                          <Label htmlFor="nyse-afterhours">Include After-hours (4:00 PM - 8:00 PM)</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="nyse-holidays" defaultChecked onChange={onSettingChange} />
                          <Label htmlFor="nyse-holidays">Auto-sync US market holidays</Label>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Collapsible className="border rounded-lg">
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-orange-600">IN</span>
                        </div>
                        <span className="font-medium">Indian Markets (NSE/BSE)</span>
                      </div>
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 pt-0 border-t">
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="nse-open">Regular Session Start</Label>
                            <Select defaultValue="09:15">
                              <SelectTrigger id="nse-open" className="mt-1">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="09:00">9:00 AM IST (Pre-open)</SelectItem>
                                <SelectItem value="09:15">9:15 AM IST</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="nse-close">Regular Session End</Label>
                            <Select defaultValue="15:30">
                              <SelectTrigger id="nse-close" className="mt-1">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15:30">3:30 PM IST</SelectItem>
                                <SelectItem value="16:00">4:00 PM IST (Post-market)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="nse-premarket" defaultChecked onChange={onSettingChange} />
                          <Label htmlFor="nse-premarket">Include Pre-open session (9:00 AM - 9:15 AM)</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="nse-holidays" defaultChecked onChange={onSettingChange} />
                          <Label htmlFor="nse-holidays">Auto-sync Indian market holidays</Label>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Collapsible className="border rounded-lg">
                    <CollapsibleTrigger className="flex justify-between items-center w-full p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-purple-600">CR</span>
                        </div>
                        <span className="font-medium">Crypto Markets (24/7)</span>
                      </div>
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 pt-0 border-t">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-muted-foreground">
                          Crypto markets trade 24/7. You can define your preferred trading sessions.
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="crypto-peak-start">Peak Session Start</Label>
                            <Select defaultValue="00:00">
                              <SelectTrigger id="crypto-peak-start" className="mt-1">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }).map((_, i) => (
                                  <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                                    {`${i.toString().padStart(2, '0')}:00 UTC`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="crypto-peak-end">Peak Session End</Label>
                            <Select defaultValue="00:00">
                              <SelectTrigger id="crypto-peak-end" className="mt-1">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }).map((_, i) => (
                                  <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                                    {`${i.toString().padStart(2, '0')}:00 UTC`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="crypto-all" defaultChecked onChange={onSettingChange} />
                          <Label htmlFor="crypto-all">Allow trading at all hours</Label>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
                
                <Button variant="outline" className="mt-4 flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  <span>Add New Market</span>
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-base mb-2 block">Custom Trading Hours</Label>
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="trading-start">Your Trading Start</Label>
                      <Select defaultValue="09:00">
                        <SelectTrigger id="trading-start" className="mt-1">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                              {`${i.toString().padStart(2, '0')}:00`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="trading-end">Your Trading End</Label>
                      <Select defaultValue="16:30">
                        <SelectTrigger id="trading-end" className="mt-1">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                              {`${i.toString().padStart(2, '0')}:00`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="trading-monday" defaultChecked onChange={onSettingChange} />
                      <Label htmlFor="trading-monday">Monday</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="trading-tuesday" defaultChecked onChange={onSettingChange} />
                      <Label htmlFor="trading-tuesday">Tuesday</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="trading-wednesday" defaultChecked onChange={onSettingChange} />
                      <Label htmlFor="trading-wednesday">Wednesday</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="trading-thursday" defaultChecked onChange={onSettingChange} />
                      <Label htmlFor="trading-thursday">Thursday</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="trading-friday" defaultChecked onChange={onSettingChange} />
                      <Label htmlFor="trading-friday">Friday</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="trading-saturday" onChange={onSettingChange} />
                      <Label htmlFor="trading-saturday">Saturday</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="trading-sunday" onChange={onSettingChange} />
                      <Label htmlFor="trading-sunday">Sunday</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Trading Plan Integration</CardTitle>
          <CardDescription>Link your trading plan to your journal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <div className="bg-primary/10 rounded-full p-2 h-fit">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Trading Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Link your trading plan document to your journal for easy reference
                </p>
              </div>
            </div>
            <Switch checked={tradingPlanEnabled} onCheckedChange={toggleTradingPlan} />
          </div>
          
          {tradingPlanEnabled && (
            <div className="pl-12 space-y-4">
              <div className="border rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base mb-2 block">Import Trading Plan</Label>
                    <div className="flex gap-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        <span>Upload Document</span>
                      </Button>
                      
                      <Button variant="outline" className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4" />
                        <span>Link External Document</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Upload a PDF or Word document, or link to Google Docs, Notion, etc.
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="plan-sections" className="text-base mb-2 block">Key Sections</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center gap-2">
                          <Pencil className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Trading Strategies</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center gap-2">
                          <Pencil className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Risk Management Rules</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center gap-2">
                          <Pencil className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Trading Psychology</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="mt-2 flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      <span>Add New Section</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="plan-journal-link">Link to Journal Page</Label>
                  <p className="text-sm text-muted-foreground">
                    Show trading plan as a reference on the journal page
                  </p>
                </div>
                <Switch id="plan-journal-link" defaultChecked onChange={onSettingChange} />
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="space-y-0.5">
                  <Label htmlFor="plan-compliance">Plan Compliance Tracking</Label>
                  <p className="text-sm text-muted-foreground">
                    Track how well your trades follow your trading plan
                  </p>
                </div>
                <Switch id="plan-compliance" defaultChecked onChange={onSettingChange} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Calendar Integration</CardTitle>
          <CardDescription>Connect with Google Calendar or other calendar apps</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <div className="bg-primary/10 rounded-full p-2 h-fit">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Calendar Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Sync trading review sessions and journal reminders with your calendar
                </p>
              </div>
            </div>
            <Switch checked={calendarSyncEnabled} onCheckedChange={toggleCalendarSync} />
          </div>
          
          {calendarSyncEnabled && (
            <div className="pl-12 space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Connect Calendar Service</h3>
                
                <div className="space-y-3">
                  <div className="border rounded-lg p-3 flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded">
                      <Calendar className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Google Calendar</h4>
                      <p className="text-xs text-muted-foreground">Not connected</p>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  
                  <div className="border rounded-lg p-3 flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Microsoft Outlook</h4>
                      <p className="text-xs text-muted-foreground">Not connected</p>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  
                  <div className="border rounded-lg p-3 flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-black/10 rounded">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Apple Calendar</h4>
                      <p className="text-xs text-muted-foreground">Not connected</p>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-base mb-2 block">Calendar Events</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure what events are synced to your calendar
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="cal-weekly-review" onChange={onSettingChange} />
                    <Label htmlFor="cal-weekly-review">Weekly Trading Review</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="cal-market-holidays" onChange={onSettingChange} />
                    <Label htmlFor="cal-market-holidays">Market Holidays</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="cal-trading-hours" onChange={onSettingChange} />
                    <Label htmlFor="cal-trading-hours">Trading Hours</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="cal-economic-events" onChange={onSettingChange} />
                    <Label htmlFor="cal-economic-events">Economic Events</Label>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-base mb-2 block">Reminder Settings</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="cal-reminder-time">Default Reminder Time</Label>
                      <p className="text-xs text-muted-foreground">
                        How far in advance to send reminders
                      </p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger id="cal-reminder-time" className="w-[140px]">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="1440">1 day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="cal-reminder-method">Reminder Method</Label>
                      <p className="text-xs text-muted-foreground">
                        How you want to receive calendar reminders
                      </p>
                    </div>
                    <Select defaultValue="popup">
                      <SelectTrigger id="cal-reminder-method" className="w-[140px]">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popup">Popup</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {saveResetButtons}
    </div>
  );
};

export default BonusFeatures;
