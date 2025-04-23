
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock, Zap, Star } from "lucide-react";

export type TagType = "setup" | "strategy" | "session" | "emotion" | "context" | "mistake" | "perfect";

interface TagsSectionProps {
  tags: {
    type: TagType;
    label: string;
    highlight?: boolean;
  }[];
}

export function TagsSection({ tags }: TagsSectionProps) {
  const getTagVariant = (type: TagType, highlight?: boolean) => {
    switch (type) {
      case "setup":
        return highlight ? "default" : "outline";
      case "strategy":
        return "info";
      case "session":
        return "outline";
      case "emotion":
        return "warning";
      case "context":
        return "secondary";
      case "mistake":
        return "error";
      case "perfect":
        return "success";
      default:
        return "outline";
    }
  };

  const getTagIcon = (type: TagType) => {
    switch (type) {
      case "perfect":
        return <CheckCircle className="h-3.5 w-3.5 mr-1" />;
      case "mistake":
        return <AlertTriangle className="h-3.5 w-3.5 mr-1" />;
      case "session":
        return <Clock className="h-3.5 w-3.5 mr-1" />;
      case "strategy":
        return <Star className="h-3.5 w-3.5 mr-1" />;
      case "setup":
        return <Zap className="h-3.5 w-3.5 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Badge 
          key={index} 
          variant={getTagVariant(tag.type, tag.highlight)}
          className="flex items-center px-2.5 py-1 text-xs"
        >
          {getTagIcon(tag.type)}
          {tag.label}
        </Badge>
      ))}
    </div>
  );
}
