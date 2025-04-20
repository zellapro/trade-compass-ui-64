
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Edit, 
  Tag, 
  FileStack, 
  Save, 
  Copy, 
  FileDown
} from "lucide-react";
import { Link } from "react-router-dom";

export function StickySidebar() {
  return (
    <div className="sticky top-4 flex flex-col gap-2 max-h-[calc(100vh-2rem)] overflow-y-auto p-3 bg-background/80 backdrop-blur-sm rounded-lg shadow-md border">
      <div className="space-y-2">
        <Button variant="default" className="gap-2 w-full justify-start">
          <Play size={16} />
          <span>Replay Trade</span>
        </Button>
        
        <Button variant="outline" className="gap-2 w-full justify-start">
          <Edit size={16} />
          <span>Edit Trade</span>
        </Button>
        
        <Button variant="outline" className="gap-2 w-full justify-start">
          <Tag size={16} />
          <span>Tag & Grade</span>
        </Button>
        
        <Button variant="outline" className="gap-2 w-full justify-start">
          <FileStack size={16} />
          <span>Compare Trades</span>
        </Button>
      </div>
      
      <div className="border-t pt-2 mt-2">
        <div className="space-y-2">
          <Button variant="secondary" className="gap-2 w-full justify-start">
            <Save size={16} />
            <span>Save Template</span>
          </Button>
          
          <Button variant="ghost" className="gap-2 w-full justify-start">
            <Copy size={16} />
            <span>Duplicate</span>
          </Button>
          
          <Button variant="ghost" className="gap-2 w-full justify-start">
            <FileDown size={16} />
            <span>Export PDF</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
