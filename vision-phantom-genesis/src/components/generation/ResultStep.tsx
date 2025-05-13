
import { Button } from "@/components/ui/button";
import { Download, Share, Image, Info, Loader, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface GenerationSettings {
  prompt: string;
  negativePrompt: string;
  width: number;
  height: number;
  guidanceScale: number;
}

interface ResultStepProps {
  generatedImage: string | null;
  settings: GenerationSettings;
  onMintNFT: () => void;
  onDownload: () => void;
  onRefinePrompt: () => void;
  onStartOver: () => void;
  connected: boolean;
  isMinting: boolean;
  mintResult: any;
}

export function ResultStep({
  generatedImage,
  settings,
  onMintNFT,
  onDownload,
  onRefinePrompt,
  onStartOver,
  connected,
  isMinting,
  mintResult
}: ResultStepProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text">Your Generated Image</h2>
        <p className="text-muted-foreground mt-2">
          Here's what the AI created based on your prompt
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border">
            {generatedImage && (
              <img 
                src={generatedImage} 
                alt="Generated" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onDownload}
              className="flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                toast.info("Sharing is simulated in this demo");
              }}
              className="flex-1"
            >
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-lg space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Your Prompt</h3>
            <p className="text-sm">{settings.prompt}</p>
          </div>
          
          {settings.negativePrompt && (
            <div className="space-y-2">
              <h3 className="font-medium">Negative Prompt</h3>
              <p className="text-sm">{settings.negativePrompt}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <h3 className="font-medium">Settings</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Dimensions:</span>
                <span>{settings.width}×{settings.height}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Guidance:</span>
                <span>{settings.guidanceScale}</span>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border space-y-4">
            <Button 
              onClick={onMintNFT} 
              className="w-full bg-gradient-neon text-black font-bold"
              disabled={isMinting || !!mintResult || !connected}
            >
              {isMinting ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : mintResult ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Image className="mr-2 h-4 w-4" />
              )}
              {isMinting ? "Minting..." : mintResult ? "Minted Successfully" : "Mint as NFT"}
            </Button>
            
            {!connected && !mintResult && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                <Info className="inline h-3 w-3 mr-1" />
                Requires connected wallet
              </p>
            )}
            
            {mintResult && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">NFT Details</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-xs h-6 px-2"
                  >
                    {showDetails ? "Hide" : "Show"} Details
                  </Button>
                </div>
                
                {showDetails && (
                  <div className="text-xs p-3 bg-muted/30 rounded-md space-y-2 font-mono overflow-x-auto">
                    <div>
                      <span className="text-muted-foreground">Mint Address: </span>
                      <span className="font-medium">{mintResult.mintAddress}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Transaction: </span>
                      <span className="font-medium">{mintResult.txSignature?.slice(0, 12)}...{mintResult.txSignature?.slice(-12)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Metadata: </span>
                      <span className="font-medium">{mintResult.metadataPDA}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Token Address: </span>
                      <span className="font-medium">{mintResult.associatedTokenAddress}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 pt-4">
        <Button 
          variant="outline"
          onClick={onRefinePrompt}
          className="flex-1"
        >
          Refine Prompt
        </Button>
        
        <Button 
          variant="outline"
          onClick={onStartOver}
          className="flex-1"
        >
          Start Over
        </Button>
      </div>
    </div>
  );
}
