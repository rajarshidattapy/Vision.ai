
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/components/WalletComponents";
import { toast } from "sonner";
import { ArrowRight, Star, Sparkles, Code, Image } from "lucide-react";

export default function LandingPage() {
  const { connected } = useWallet();

  const features = [
    {
      title: "Advanced AI Image Generation",
      description: "Transform your ideas into stunning visuals with our state-of-the-art AI models.",
      icon: <Sparkles className="h-6 w-6" />
    },
    {
      title: "Solana NFT Integration",
      description: "Mint your generated images as NFTs directly on the Solana blockchain.",
      icon: <Code className="h-6 w-6" />
    },
    {
      title: "Beautiful Image Gallery",
      description: "Explore a curated collection of AI-generated artwork from our community.",
      icon: <Image className="h-6 w-6" />
    },
    {
      title: "Premium Experience",
      description: "Enjoy a seamless, intuitive interface designed for both beginners and professionals.",
      icon: <Star className="h-6 w-6" />
    }
  ];

  const handleExploreGallery = () => {
    if (!connected) {
      toast.info("You can browse the gallery without connecting a wallet, but you'll need to connect to like or mint images.");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-16">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-vision-purple via-vision-blue to-vision-neon opacity-10 animate-spin-slow"></div>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 gradient-text">
            Transform Your Ideas with<br />AI-Powered Vision
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Generate stunning images from text prompts or reference photos, 
            and mint them as NFTs on the Solana blockchain.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generate">
              <Button size="lg" className="bg-gradient-primary px-8 py-6 text-lg">
                Start Creating <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/gallery" onClick={handleExploreGallery}>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                Explore Gallery
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          <div className="animate-bounce">
            <ArrowRight className="h-5 w-5 rotate-90 text-muted-foreground" />
          </div>
        </div>
        
        {/* Floating Cards */}
        <div className="hidden xl:block absolute -right-10 top-1/4 animate-float">
          <div className="glass-card w-64 h-64 rounded-lg overflow-hidden rotate-6">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1770&auto=format&fit=crop" 
              alt="AI-generated landscape" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="hidden xl:block absolute -left-10 bottom-1/4 animate-float delay-200">
          <div className="glass-card w-64 h-64 rounded-lg overflow-hidden -rotate-6">
            <img 
              src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1887&auto=format&fit=crop" 
              alt="AI-generated artwork" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with blockchain innovation 
              to deliver a unique creative experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-6 rounded-lg transition-transform hover:-translate-y-1"
              >
                <div className="bg-gradient-primary inline-flex p-3 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-vision-purple to-vision-blue opacity-10"></div>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-lg"></div>
        </div>
        
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              Ready to Transform Your Creative Vision?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Join our community of creators and start generating beautiful AI artwork 
              that you can own as NFTs on the Solana blockchain.
            </p>
            
            <Link to="/generate">
              <Button size="lg" className="bg-gradient-primary px-8 py-6 text-lg">
                Start Creating Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
