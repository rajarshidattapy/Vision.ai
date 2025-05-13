
import { Progress } from "@/components/ui/progress";

interface GeneratingStepProps {
  progress: number;
}

export function GeneratingStep({ progress }: GeneratingStepProps) {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <h2 className="text-2xl font-bold gradient-text">Generating Your Image</h2>
      <div className="w-full max-w-md mb-4">
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {progress < 30 ? "Analyzing reference image..." : 
           progress < 60 ? "Processing your prompt..." : 
           progress < 90 ? "Applying AI magic..." :
           "Finalizing generation..."}
        </p>
      </div>
      
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 bg-gradient-primary rounded-lg opacity-20 animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
