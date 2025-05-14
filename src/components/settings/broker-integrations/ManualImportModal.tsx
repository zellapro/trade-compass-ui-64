
import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, File, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ImportResult {
  tradeCount: number;
  source: string;
}

interface ManualImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (result: ImportResult) => void;
}

export const ManualImportModal: React.FC<ManualImportModalProps> = ({ isOpen, onClose, onImport }) => {
  const [activeTab, setActiveTab] = useState<string>("csv");
  const [importing, setImporting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [source, setSource] = useState<string>("Manual Upload");
  const [dateFormat, setDateFormat] = useState<string>("YYYY-MM-DD");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "text/csv" || file.name.endsWith(".csv") ||
          file.type === "application/vnd.ms-excel" || 
          file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        setUploadedFile(file);
      }
    }
  };
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFile(file);
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (!uploadedFile) return;
    
    setImporting(true);
    
    // In a real app, this would be a fetch to an API endpoint
    setTimeout(() => {
      setImporting(false);
      
      const result: ImportResult = {
        tradeCount: Math.floor(Math.random() * 50) + 5, // Random number between 5-54
        source: source
      };
      
      onImport(result);
    }, 1500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Manual Trade Import</DialogTitle>
          <DialogDescription>
            Import trades from CSV or Excel files
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="csv" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="csv">CSV Import</TabsTrigger>
            <TabsTrigger value="excel">Excel Import</TabsTrigger>
          </TabsList>
          
          <TabsContent value="csv">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                isDragging ? "border-primary bg-primary/5" : "border-border"
              } transition-colors cursor-pointer`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".csv"
                className="hidden"
              />
              
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isDragging ? 1.05 : 1 }}
                className="flex flex-col items-center justify-center gap-3"
              >
                {uploadedFile ? (
                  <>
                    <FileText className="h-10 w-10 text-primary" />
                    <div>
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Cloud className="h-10 w-10 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Drag & Drop or click to upload</p>
                      <p className="text-sm text-muted-foreground">
                        Upload CSV files with your trade data
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
            
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 dark:text-blue-500"
                asChild
              >
                <a href="#" download>Download CSV Template</a>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="excel">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                isDragging ? "border-primary bg-primary/5" : "border-border"
              } transition-colors cursor-pointer`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".xlsx,.xls"
                className="hidden"
              />
              
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isDragging ? 1.05 : 1 }}
                className="flex flex-col items-center justify-center gap-3"
              >
                {uploadedFile ? (
                  <>
                    <File className="h-10 w-10 text-primary" />
                    <div>
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Cloud className="h-10 w-10 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Drag & Drop or click to upload</p>
                      <p className="text-sm text-muted-foreground">
                        Upload Excel files with your trade data
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
            
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 dark:text-blue-500"
                asChild
              >
                <a href="#" download>Download Excel Template</a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source">Source / Platform</Label>
              <Input
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Where are these trades from?"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger id="date-format">
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM-DD-YYYY">MM-DD-YYYY</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!uploadedFile || importing}
            className="min-w-[100px]"
          >
            {importing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Importing...
              </>
            ) : (
              "Import Trades"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
