
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Image, Link as LinkIcon, Upload, Download } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample attachments data
const attachments = [
  { id: 1, name: "TSLA_Apr19_2025_chart.png", type: "image", size: "1.2 MB" },
  { id: 2, name: "TradingView_TSLA_Breakout", type: "link", size: "URL" },
  { id: 3, name: "VWAP_Strategy_Notes.pdf", type: "document", size: "420 KB" }
];

export function AttachmentsPanel() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Attachments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border border-dashed rounded-md bg-accent/30 p-6 text-center mb-4">
          <div className="flex flex-col items-center gap-2">
            <Upload size={24} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag & drop files here, or <span className="text-primary font-medium">browse</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Supports images, PDFs, TradingView links, and more
            </p>
          </div>
          <Button variant="outline" size="sm" className="mt-3">
            Upload Files
          </Button>
        </div>
        
        <div className="space-y-2">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="flex items-center gap-3 p-2 border rounded-md hover:bg-accent/30">
              <div className="h-9 w-9 rounded-md bg-accent flex items-center justify-center">
                {attachment.type === "image" && <Image size={16} />}
                {attachment.type === "link" && <LinkIcon size={16} />}
                {attachment.type === "document" && <FileText size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{attachment.name}</p>
                <p className="text-xs text-muted-foreground">{attachment.size}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download size={14} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
