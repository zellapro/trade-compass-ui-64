
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Trash2, Upload, ChevronRight, CirclePlus, Calendar } from "lucide-react";

export const BlueprintBuilder: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    abbreviation: "",
    type: "",
    timeframe: "",
    description: "",
    entryConditions: "",
    exitConditions: "",
    stopLoss: "",
    riskManagement: "",
    tags: [""] as string[],
  });
  
  const [currentTag, setCurrentTag] = useState("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const addTag = () => {
    if (currentTag.trim() !== "" && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags.filter(t => t !== ""), currentTag.trim()]
      }));
      setCurrentTag("");
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Strategy Blueprint Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="manual" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">Build Manually</TabsTrigger>
                <TabsTrigger value="fromTrade">Generate From Trade</TabsTrigger>
              </TabsList>
              
              <TabsContent value="manual" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Strategy Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="e.g., Order Block Reversal" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="abbreviation">Abbreviation</Label>
                    <Input 
                      id="abbreviation" 
                      name="abbreviation" 
                      placeholder="e.g., OBR" 
                      maxLength={4}
                      value={formData.abbreviation} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Strategy Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => handleSelectChange("type", value)}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select strategy type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orderblock">Order Block</SelectItem>
                        <SelectItem value="fairdvalue">Fair Value Gap</SelectItem>
                        <SelectItem value="breakout">Breakout</SelectItem>
                        <SelectItem value="trend">Trend Following</SelectItem>
                        <SelectItem value="reversal">Reversal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Preferred Timeframe</Label>
                    <Select 
                      value={formData.timeframe} 
                      onValueChange={(value) => handleSelectChange("timeframe", value)}
                    >
                      <SelectTrigger id="timeframe">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="m1">1 Minute</SelectItem>
                        <SelectItem value="m5">5 Minutes</SelectItem>
                        <SelectItem value="m15">15 Minutes</SelectItem>
                        <SelectItem value="m30">30 Minutes</SelectItem>
                        <SelectItem value="h1">1 Hour</SelectItem>
                        <SelectItem value="h4">4 Hours</SelectItem>
                        <SelectItem value="d1">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Brief description of your strategy" 
                    rows={2} 
                    value={formData.description} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="entryConditions">Entry Conditions</Label>
                  <Textarea 
                    id="entryConditions" 
                    name="entryConditions" 
                    placeholder="Describe your entry conditions in detail" 
                    rows={4} 
                    value={formData.entryConditions} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="exitConditions">Exit Conditions</Label>
                  <Textarea 
                    id="exitConditions" 
                    name="exitConditions" 
                    placeholder="Describe your exit conditions in detail" 
                    rows={3} 
                    value={formData.exitConditions} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stopLoss">Stop Loss Placement</Label>
                    <Textarea 
                      id="stopLoss" 
                      name="stopLoss" 
                      placeholder="Describe your stop loss strategy" 
                      rows={2} 
                      value={formData.stopLoss} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="riskManagement">Risk Management Rules</Label>
                    <Textarea 
                      id="riskManagement" 
                      name="riskManagement" 
                      placeholder="Describe your risk rules" 
                      rows={2} 
                      value={formData.riskManagement} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Label>Trade Checklist</Label>
                  
                  <div className="space-y-2">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox id={`item-${item}`} />
                        <Label htmlFor={`item-${item}`} className="text-sm font-normal">
                          Checklist Item {item}
                        </Label>
                        <Button variant="ghost" size="sm" className="ml-auto h-7 w-7 p-0">
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    ))}
                    
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add Checklist Item
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Strategy Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.filter(tag => tag !== "").map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0 ml-1" 
                          onClick={() => removeTag(tag)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a tag" 
                      value={currentTag} 
                      onChange={(e) => setCurrentTag(e.target.value)} 
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag}>Add</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Chart Images</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center min-h-32 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Upload example chart</p>
                    </div>
                    {/* Add more placeholder boxes if needed */}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="fromTrade">
                <div className="space-y-6 py-4">
                  <div className="text-center p-8">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Generate from Previous Trade</h3>
                    <p className="text-muted-foreground mb-4">
                      Create a new strategy blueprint from a successful trade in your journal
                    </p>
                    <Button>
                      <CirclePlus className="mr-2 h-4 w-4" />
                      Select Trade from Journal
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>
              Create Strategy
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle>Blueprint Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.name ? (
              <>
                <div>
                  <h3 className="text-xl font-bold">
                    {formData.name}
                    {formData.abbreviation && (
                      <Badge variant="outline" className="ml-2">
                        {formData.abbreviation}
                      </Badge>
                    )}
                  </h3>
                  {formData.type && formData.timeframe && (
                    <div className="flex items-center gap-2 mt-1">
                      <Badge>
                        {formData.type === "orderblock" && "Order Block"}
                        {formData.type === "fairdvalue" && "Fair Value Gap"}
                        {formData.type === "breakout" && "Breakout"}
                        {formData.type === "trend" && "Trend Following"}
                        {formData.type === "reversal" && "Reversal"}
                      </Badge>
                      <Badge variant="outline">
                        {formData.timeframe}
                      </Badge>
                    </div>
                  )}
                </div>
                
                {formData.description && (
                  <div>
                    <h4 className="text-sm font-semibold">Description</h4>
                    <p className="text-sm text-muted-foreground">{formData.description}</p>
                  </div>
                )}
                
                {formData.entryConditions && (
                  <div>
                    <h4 className="text-sm font-semibold">Entry Conditions</h4>
                    <p className="text-sm text-muted-foreground">{formData.entryConditions}</p>
                  </div>
                )}
                
                {formData.exitConditions && (
                  <div>
                    <h4 className="text-sm font-semibold">Exit Conditions</h4>
                    <p className="text-sm text-muted-foreground">{formData.exitConditions}</p>
                  </div>
                )}
                
                {(formData.stopLoss || formData.riskManagement) && (
                  <div>
                    <h4 className="text-sm font-semibold">Risk Management</h4>
                    {formData.stopLoss && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Stop Loss:</span> {formData.stopLoss}
                      </p>
                    )}
                    {formData.riskManagement && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Risk Rules:</span> {formData.riskManagement}
                      </p>
                    )}
                  </div>
                )}
                
                {formData.tags.filter(t => t !== "").length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {formData.tags.filter(t => t !== "").map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Fill in the strategy details to see a preview
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
