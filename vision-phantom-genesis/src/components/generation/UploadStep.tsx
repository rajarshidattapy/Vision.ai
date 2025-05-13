
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface UploadStepProps {
  imageFiles: File[];
  imagePreview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNextStep: () => void;
}

export function UploadStep({ imageFiles, imagePreview, onFileChange, onNextStep }: UploadStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text">Upload Images</h2>
        <p className="text-muted-foreground mt-2">
          Upload 5-20 images for the AI to transform
        </p>
      </div>
      
      <div 
        className={`
          border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center
          ${imagePreview ? 'border-primary' : 'border-muted-foreground'}
          transition-all hover:border-primary cursor-pointer
        `}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        {imagePreview ? (
          <div className="relative w-full h-64 mb-4">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute top-2 right-2 bg-background/80 px-2 py-1 rounded-md">
              <span className="text-sm font-medium">{imageFiles.length} images selected</span>
            </div>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Click to upload or drag and drop<br />
              JPG, PNG, or GIF (5-20 images)
            </p>
          </>
        )}
        <Input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
          multiple
        />
      </div>
      
      <Button 
        onClick={onNextStep}
        disabled={!imagePreview}
        className="bg-gradient-primary"
      >
        Next: Add Prompt
      </Button>
    </div>
  );
}
