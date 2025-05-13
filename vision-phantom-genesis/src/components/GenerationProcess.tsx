
import { UploadStep } from "./generation/UploadStep";
import { PromptStep } from "./generation/PromptStep";
import { GeneratingStep } from "./generation/GeneratingStep";
import { ResultStep } from "./generation/ResultStep";
import { useGenerationProcess } from "./generation/useGenerationProcess";

// Create a global store for the uploaded/generated images
export const userGalleryImages: {
  id: string;
  imageUrl: string;
  title: string;
  prompt: string;
  createdAt: string;
  likes: number;
  liked: boolean;
}[] = [];

export function GenerationProcess() {
  const {
    imageFiles,
    imagePreview,
    generatedImage,
    progress,
    step,
    settings,
    connected,
    isMinting,
    mintResult,
    handleFileChange,
    handleNextStep,
    handlePromptChange,
    handleNegativePromptChange,
    handleGuidanceChange,
    handleDownload,
    handleMintNFT,
    handleRefinePrompt,
    startOver
  } = useGenerationProcess();

  const renderStep = () => {
    switch (step) {
      case "upload":
        return (
          <UploadStep 
            imageFiles={imageFiles}
            imagePreview={imagePreview}
            onFileChange={handleFileChange}
            onNextStep={handleNextStep}
          />
        );
        
      case "prompt":
        return (
          <PromptStep 
            settings={settings}
            imagePreview={imagePreview}
            onPromptChange={handlePromptChange}
            onNegativePromptChange={handleNegativePromptChange}
            onGuidanceChange={handleGuidanceChange}
            onNextStep={handleNextStep}
          />
        );
        
      case "generating":
        return <GeneratingStep progress={progress} />;
        
      case "result":
        return (
          <ResultStep 
            generatedImage={generatedImage}
            settings={settings}
            onMintNFT={handleMintNFT}
            onDownload={handleDownload}
            onRefinePrompt={handleRefinePrompt}
            onStartOver={startOver}
            connected={connected}
            isMinting={isMinting}
            mintResult={mintResult}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {renderStep()}
    </div>
  );
}
