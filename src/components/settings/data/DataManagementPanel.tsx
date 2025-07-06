
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DataManagementPanelProps {
  onSettingChange: () => void;
  saveResetButtons: React.ReactNode;
}

const DataManagementPanel: React.FC<DataManagementPanelProps> = ({ 
  onSettingChange,
  saveResetButtons
}) => {
  const { toast } = useToast();
  const [openImports, setOpenImports] = useState<string[]>([]);

  const handleExport = (format: string) => {
    toast({
      title: `Exporting as ${format.toUpperCase()}`,
      description: "Your data is being prepared for download.",
    });
    onSettingChange();
  };

  const toggleImport = (importType: string) => {
    setOpenImports(prev => 
      prev.includes(importType) 
        ? prev.filter(item => item !== importType) 
        : [...prev, importType]
    );
  };

  const handleImport = (platform: string) => {
    toast({
      title: `Import from ${platform}`,
      description: "Connecting to the platform for data import.",
    });
    onSettingChange();
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle>Data Management</CardTitle>
        <CardDescription>Export your data or import from other platforms</CardDescription>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        {/* Export Data Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Export Data</h3>
          <p className="text-muted-foreground">
            Download all your trade history and journal entries
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleExport('csv')}
              className="bg-blue-500/10 text-blue-500 border-blue-500/30 hover:bg-blue-500/20"
            >
              Export as CSV
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleExport('json')}
            >
              Export as JSON
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleExport('pdf')}
            >
              Export as PDF
            </Button>
          </div>
        </div>
        
        <Separator />
        
        {/* Import Data Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Import Data</h3>
          <p className="text-muted-foreground">
            Import your trading history from other platforms
          </p>
          
          {/* Import from Tradervue */}
          <div className="border rounded-lg">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleImport('tradervue')}
            >
              <h4 className="font-medium">Import from Tradervue</h4>
              {openImports.includes('tradervue') ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            
            {openImports.includes('tradervue') && (
              <div className="p-4 pt-0">
                <p className="mb-4 text-sm text-muted-foreground">
                  Connect your Tradervue account to import your trading history
                </p>
                <Button onClick={() => handleImport('Tradervue')}>
                  Connect Tradervue
                </Button>
              </div>
            )}
          </div>
          
          {/* Import from Edgewonk */}
          <div className="border rounded-lg">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleImport('edgewonk')}
            >
              <h4 className="font-medium">Import from Edgewonk</h4>
              {openImports.includes('edgewonk') ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            
            {openImports.includes('edgewonk') && (
              <div className="p-4 pt-0">
                <p className="mb-4 text-sm text-muted-foreground">
                  Import your data from Edgewonk CSV exports
                </p>
                <Button onClick={() => handleImport('Edgewonk')}>
                  Upload Edgewonk File
                </Button>
              </div>
            )}
          </div>
          
          {/* Import from CSV/JSON */}
          <div className="border rounded-lg">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleImport('csv')}
            >
              <h4 className="font-medium">Import from CSV/JSON</h4>
              {openImports.includes('csv') ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            
            {openImports.includes('csv') && (
              <div className="p-4 pt-0">
                <p className="mb-4 text-sm text-muted-foreground">
                  Import your trading data from CSV or JSON files
                </p>
                <Button onClick={() => handleImport('CSV/JSON')}>
                  Upload File
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          {saveResetButtons}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataManagementPanel;
