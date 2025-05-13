
import { useState } from "react";
import { toast } from "sonner";
import { useWallet } from "../WalletComponents";
import { GenerationSettings, GenerationStep } from "@/types/generation";
import { userGalleryImages } from "../GenerationProcess";

export function useGenerationProcess() {
  const { connected } = useWallet();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<GenerationStep>("upload");
  const [isMinting, setIsMinting] = useState(false);
  const [mintResult, setMintResult] = useState<any>(null);
  const [settings, setSettings] = useState<GenerationSettings>({
    prompt: "",
    negativePrompt: "",
    width: 512,
    height: 512,
    guidanceScale: 7.5,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      if (files.length < 5) {
        toast.error("Please upload at least 5 images");
        return;
      }
      
      if (files.length > 20) {
        toast.error("You can upload a maximum of 20 images");
        return;
      }
      
      setImageFiles(files);
      
      // Just show the preview of the first image
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
      
      toast.success(`${files.length} images uploaded successfully!`);
    }
  };

  const handleNextStep = () => {
    if (step === "upload" && imagePreview) {
      setStep("prompt");
    } else if (step === "prompt" && settings.prompt.trim()) {
      startGeneration();
    }
  };

  const startGeneration = () => {
    setStep("generating");
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate the generation process with incremental progress
    // Slowed down to take 10 seconds longer than before
    const interval = setInterval(() => {
      setProgress(prev => {
        // Reduced increment amount to slow down progress
        const newProgress = prev + Math.random() * 3;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          // Added extra 10 seconds of waiting at 100%
          setTimeout(() => {
            // Use the Git SVG icon as the generated result instead of the original image
            const gitIconUrl = "https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg";
            setGeneratedImage(gitIconUrl);
            setIsGenerating(false);
            setStep("result");
            
            // Add the image to the gallery
            // Clear previous gallery images
            userGalleryImages.length = 0;
            
            // Add the new image to the gallery
            userGalleryImages.push({
              id: Date.now().toString(),
              imageUrl: gitIconUrl,
              title: "Your Generated Image",
              prompt: settings.prompt,
              createdAt: new Date().toISOString().split('T')[0],
              likes: 0,
              liked: false,
            });
            
            toast.success("Image generated successfully!");
          }, 10500); // Added 10 seconds + 500ms from previous timeout
          return 100;
        }
        
        return newProgress;
      });
    }, 200);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSettings({ ...settings, prompt: e.target.value });
  };

  const handleNegativePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSettings({ ...settings, negativePrompt: e.target.value });
  };

  const handleGuidanceChange = (value: number[]) => {
    setSettings({ ...settings, guidanceScale: value[0] });
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'vision-ai-generated-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded");
    }
  };

  const handleMintNFT = async () => {
    if (!connected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    setIsMinting(true);
    
    try {
      // Simulate minting process delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock NFT minting response
      const mockNFTData = {
        mintAddress: "8xGg7vjSk4ZQwEyF8ZwMRhXjJqj9dT3KY5Gkt4oZqQQ4",
        txSignature: "5JX4q8K1b7zMXJTYBh5MwB3urTRgMQe6GrxZ7bZpohYZyk9XnAzAY3hWgA7xFJiQ5fKPy7WbsDrn1Tk6FkdsfPoW",
        metadataPDA: "A3z8Zh4MCa3zXoBN3GkjD2zZb1SLFoNNrBu1QwvStftf",
        associatedTokenAddress: "Fg6PaFpoGXkYsidMpWxqSWKepgXqFtTzGTTkY5rvhTzF"
      };
      
      setMintResult(mockNFTData);
      console.log(mockNFTData);
      
      toast.success("NFT minted successfully!", {
        description: `Mint Address: ${mockNFTData.mintAddress.slice(0, 8)}...`,
        duration: 5000,
      });
    } catch (error) {
      toast.error("Failed to mint NFT");
      console.error(error);
    } finally {
      setIsMinting(false);
    }
  };

  const handleRefinePrompt = () => {
    setStep("prompt");
    setProgress(0);
    setGeneratedImage(null);
    setMintResult(null);
  };

  const startOver = () => {
    setStep("upload");
    setImagePreview(null);
    setImageFiles([]);
    setGeneratedImage(null);
    setProgress(0);
    setMintResult(null);
    setSettings({
      prompt: "",
      negativePrompt: "",
      width: 512,
      height: 512,
      guidanceScale: 7.5,
    });
  };

  return {
    imageFiles,
    imagePreview,
    generatedImage,
    isGenerating,
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
  };
}
