
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface GenerationSettings {
  prompt: string;
  negativePrompt: string;
  width: number;
  height: number;
  guidanceScale: number;
}

interface PromptStepProps {
  settings: GenerationSettings;
  imagePreview: string | null;
  onPromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onNegativePromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onGuidanceChange: (value: number[]) => void;
  onNextStep: () => void;
}

export function PromptStep({
  settings,
  imagePreview,
  onPromptChange,
  onNegativePromptChange,
  onGuidanceChange,
  onNextStep
}: PromptStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text">Customize Your Generation</h2>
        <p className="text-muted-foreground mt-2">
          Describe what you want the AI to create
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Reference Image</label>
            {imagePreview && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <img 
                  src={imagePreview} 
                  alt="Reference" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Guidance Scale: {settings.guidanceScale}
            </label>
            <Slider 
              defaultValue={[settings.guidanceScale]} 
              min={1} 
              max={15} 
              step={0.5}
              onValueChange={onGuidanceChange}
              className="mb-6"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>More Creative</span>
              <span>More Precise</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Prompt</label>
            <Textarea 
              placeholder="A detailed description of what you want to generate..."
              className="h-32 resize-none"
              value={settings.prompt}
              onChange={onPromptChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Negative Prompt (Optional)</label>
            <Textarea 
              placeholder="What you don't want to see in the image..."
              className="h-24 resize-none"
              value={settings.negativePrompt}
              onChange={onNegativePromptChange}
            />
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onNextStep}
        disabled={!settings.prompt.trim()}
        className="bg-gradient-primary"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Generate Image
      </Button>
    </div>
  );
}
