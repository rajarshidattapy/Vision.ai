
import { GenerationProcess } from "@/components/GenerationProcess";

export default function GeneratePage() {
  return (
    <div className="container pt-24 pb-16 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
          Create with AI
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload 5-20 images, customize your prompt, and let our AI transform them.
        </p>
      </div>
      
      <GenerationProcess />
    </div>
  );
}
