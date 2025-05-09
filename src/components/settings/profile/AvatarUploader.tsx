
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, Camera, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AvatarUploaderProps {
  currentAvatar?: string;
  onChange: (file: File | null) => void;
}

const AvatarUploader = ({ currentAvatar, onChange }: AvatarUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(currentAvatar || null);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-32 h-32 border-4 border-primary/30">
        <AvatarImage src={preview || undefined} alt="User avatar" />
        <AvatarFallback className="text-4xl bg-secondary">
          <User className="h-16 w-16 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>

      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleButtonClick}
          className="flex items-center gap-2"
        >
          <Upload size={16} />
          <span>Upload</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <Camera size={16} />
          <span>Take Photo</span>
        </Button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default AvatarUploader;
