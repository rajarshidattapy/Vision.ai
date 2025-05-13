
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "./WalletComponents";
import { Image, Heart, Share, Download, MoveRight } from "lucide-react";
import { toast } from "sonner";
import { userGalleryImages } from "./GenerationProcess";

interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  prompt: string;
  createdAt: string;
  likes: number;
  liked: boolean;
}

export function GalleryGrid() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const { connected } = useWallet();

  // Update gallery whenever userGalleryImages changes
  useEffect(() => {
    setGalleryItems(userGalleryImages.length > 0 ? userGalleryImages : []);
  }, []);

  const handleLike = (id: string) => {
    if (!connected) {
      toast.error("Please connect your wallet to like images");
      return;
    }
    
    setGalleryItems(prev => prev.map(item => {
      if (item.id === id) {
        const liked = !item.liked;
        return {
          ...item,
          liked,
          likes: liked ? item.likes + 1 : item.likes - 1
        };
      }
      return item;
    }));
  };

  const handleMintNFT = (item: GalleryItem) => {
    if (!connected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    toast.success(`NFT minting initiated for "${item.title}"`, {
      description: "This is a simulated action. In a real app, this would create an NFT on the Solana blockchain.",
      duration: 5000,
    });
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'vision-ai-gallery-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded");
  };

  const handleShare = (item: GalleryItem) => {
    toast.info(`Sharing "${item.title}" (simulated in demo)`);
  };

  return (
    <div className="container py-8">
      {selectedItem ? (
        <div className="space-y-6">
          <button 
            onClick={() => setSelectedItem(null)}
            className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <MoveRight className="h-4 w-4 mr-1 rotate-180" />
            Back to Gallery
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-lg overflow-hidden border border-border">
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold">{selectedItem.title}</h2>
                  <p className="text-sm text-muted-foreground">Created on {selectedItem.createdAt}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleLike(selectedItem.id)}
                    className={selectedItem.liked ? "text-red-500" : ""}
                  >
                    <Heart className="h-5 w-5" fill={selectedItem.liked ? "currentColor" : "none"} />
                  </Button>
                  <span className="text-sm">{selectedItem.likes}</span>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-lg space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Prompt</h3>
                <p className="text-sm">{selectedItem.prompt}</p>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-border">
                <Button 
                  onClick={() => handleMintNFT(selectedItem)} 
                  className="w-full bg-gradient-neon text-black font-bold"
                >
                  <Image className="mr-2 h-4 w-4" />
                  Mint as NFT
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(selectedItem.imageUrl)}
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleShare(selectedItem)}
                    className="w-full"
                  >
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        galleryItems.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-bold mb-2">Your gallery is empty</h3>
            <p className="text-muted-foreground mb-6">Generate some images to see them here</p>
            <Button onClick={() => window.location.href = '/generate'} className="bg-gradient-primary">
              Go to Generate
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div 
                key={item.id} 
                className="glass-card rounded-lg overflow-hidden group"
              >
                <div 
                  className="aspect-square relative cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <img 
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <h3 className="text-white font-bold">{item.title}</h3>
                      <p className="text-white/80 text-sm line-clamp-1">{item.prompt}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {item.createdAt}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(item.id);
                      }}
                      className={item.liked ? "text-red-500" : ""}
                    >
                      <Heart className="h-4 w-4" fill={item.liked ? "currentColor" : "none"} />
                    </Button>
                    <span className="text-sm">{item.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
