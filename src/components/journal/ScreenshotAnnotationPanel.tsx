
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, PenLine, Trash, Download } from "lucide-react";

export function ScreenshotAnnotationPanel() {
  const [hasImage, setHasImage] = useState(false);
  
  const handleImageUpload = () => {
    // In a real implementation, this would handle the actual file upload
    setHasImage(true);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Screenshot Annotation</CardTitle>
        <CardDescription>
          Upload and annotate screenshots of your trades
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasImage ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-12 space-y-4">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Drag & drop screenshot here or click to browse
              </p>
              <Button onClick={handleImageUpload}>Upload Screenshot</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-muted aspect-video rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Screenshot preview</p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm">
                <PenLine className="h-4 w-4 mr-1" />
                Annotate
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setHasImage(false)}>
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
