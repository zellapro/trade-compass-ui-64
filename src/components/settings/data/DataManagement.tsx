
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Download, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";
import { addDays, subDays } from "date-fns";

interface DataManagementProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

interface ExportFilter {
  id: string;
  label: string;
}

const DataManagement: React.FC<DataManagementProps> = ({ 
  onSettingChange,
  saveResetButtons
}) => {
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState<string>("json");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  
  const exportFilters: ExportFilter[] = [
    { id: "trades", label: "Trades" },
    { id: "notes", label: "Notes" },
    { id: "tags", label: "Tags" },
    { id: "strategies", label: "Strategies" },
    { id: "mistakes", label: "Mistakes" },
    { id: "screenshots", label: "Screenshots" },
    { id: "replays", label: "Replay Data" },
  ];
  
  const exportFormats = [
    { value: "json", label: "JSON" },
    { value: "csv", label: "CSV" },
    { value: "pdf", label: "PDF" },
    { value: "zip", label: "ZIP Bundle" },
  ];

  const handleFilterToggle = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      setSelectedFilters(selectedFilters.filter(id => id !== filterId));
    } else {
      setSelectedFilters([...selectedFilters, filterId]);
    }
    onSettingChange();
  };
  
  const handleExport = () => {
    if (selectedFilters.length === 0) {
      toast({
        title: "No filters selected",
        description: "Please select at least one data filter to export",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Data export started",
      description: `Your ${exportFormat.toUpperCase()} export will be ready shortly`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>Export your trading data in different formats</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Select Data to Export</h3>
          <div className="flex flex-wrap gap-2">
            {exportFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterToggle(filter.id)}
                className="transition-all"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Date Range</h3>
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Export Format</h3>
            <div className="flex gap-3">
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {exportFormats.map(format => (
                    <SelectItem key={format.value} value={format.value}>
                      {format.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={handleExport} 
                disabled={selectedFilters.length === 0}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>

            <div className="mt-2 text-sm text-muted-foreground">
              {exportFormat === 'json' && 'JSON format is best for importing into other applications'}
              {exportFormat === 'csv' && 'CSV format is best for spreadsheet applications like Excel'}
              {exportFormat === 'pdf' && 'PDF format is best for printing and sharing reports'}
              {exportFormat === 'zip' && 'ZIP Bundle includes all data formats in a compressed file'}
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3">Export Options</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="anonymize" />
              <Label htmlFor="anonymize">Anonymize data (remove personal information)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="screenshots" />
              <Label htmlFor="screenshots">Include screenshots</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="metadata" />
              <Label htmlFor="metadata">Include metadata</Label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          {saveResetButtons}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataManagement;
