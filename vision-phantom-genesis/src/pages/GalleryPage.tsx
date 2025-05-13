
import { GalleryGrid } from "@/components/GalleryGrid";

export default function GalleryPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Your Gallery
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            View your uploaded images that have been processed by our AI.
            Connect your wallet to like images or mint them as NFTs.
          </p>
        </div>
      </div>
      
      <GalleryGrid />
    </div>
  );
}
