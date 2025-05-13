
import { NavBar } from "@/components/NavBar";
import { WalletProvider } from "@/components/WalletComponents";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import GeneratePage from "./GeneratePage";
import GalleryPage from "./GalleryPage";

const Index = () => {
  useEffect(() => {
    // Set the document title
    document.title = "Vision.ai - AI Image Generation with NFT Minting";
  }, []);

  return (
    <WalletProvider>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/generate" element={<GeneratePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </main>
        <footer className="glass py-6 text-center">
          <p className="text-muted-foreground text-sm">
            Vision.ai — A simulated AI image generation platform with Solana wallet integration
          </p>
        </footer>
      </div>
    </WalletProvider>
  );
};

export default Index;
