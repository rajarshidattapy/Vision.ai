
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { WalletMultiButton } from "./WalletComponents";
import { Menu, X } from "lucide-react";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <span className="font-bold text-white">Vision.ai</span>
          </div>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/generate" className="font-medium hover:text-primary transition-colors">
            Generate
          </Link>
          <Link to="/gallery" className="font-medium hover:text-primary transition-colors">
            Gallery
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <WalletMultiButton />
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 bg-background glass-card md:hidden z-40">
            <nav className="flex flex-col p-4 gap-4">
              <Link 
                to="/" 
                className="p-4 text-center font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/generate" 
                className="p-4 text-center font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Generate
              </Link>
              <Link 
                to="/gallery"
                className="p-4 text-center font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <div className="flex items-center justify-center gap-4 mt-4">
                <ThemeToggle />
                <WalletMultiButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
