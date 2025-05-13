
import { Button } from "@/components/ui/button";
import { useState, createContext, useContext, ReactNode, useEffect } from "react";
import { Wallet, Loader } from "lucide-react";
import { toast } from "sonner";

// Mock classes to simulate wallet API
class PhantomWalletAdapter {
  private _connected: boolean = false;
  private _publicKey: string | null = null;
  
  get connected() {
    return this._connected;
  }
  
  get publicKey() {
    return this._publicKey;
  }
  
  async connect() {
    await new Promise(resolve => setTimeout(resolve, 1500));
    this._connected = true;
    this._publicKey = "8gLCj6jAM4YBis8HpZWnSL9xVFnZRbP8Sbf6VHNdEGxN";
    return { publicKey: this._publicKey };
  }
  
  async disconnect() {
    await new Promise(resolve => setTimeout(resolve, 500));
    this._connected = false;
    this._publicKey = null;
  }
}

// Mock phantom provider for window object
interface PhantomWindow extends Window {
  phantom?: {
    solana?: {
      isPhantom: boolean;
      connect: () => Promise<{ publicKey: string }>;
      disconnect: () => Promise<void>;
    }
  }
}

interface WalletContextType {
  connected: boolean;
  connecting: boolean;
  publicKey: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  wallet: PhantomWalletAdapter | null;
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  connecting: false,
  publicKey: null,
  connect: async () => {},
  disconnect: () => {},
  wallet: null
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<PhantomWalletAdapter | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    // Initialize phantom wallet adapter
    const phantomWallet = new PhantomWalletAdapter();
    setWallet(phantomWallet);
    
    // Check if wallet was previously connected
    const savedWalletConnection = localStorage.getItem('walletConnected');
    if (savedWalletConnection === 'true') {
      // Auto-connect when the app loads
      connectWallet(phantomWallet);
    }
  }, []);

  const connectWallet = async (walletAdapter: PhantomWalletAdapter) => {
    try {
      setConnecting(true);
      const { publicKey } = await walletAdapter.connect();
      setConnected(true);
      setPublicKey(publicKey);
      localStorage.setItem('walletConnected', 'true');
      toast.success("Wallet connected successfully!");
    } catch (error) {
      console.error('Connection error:', error);
      toast.error("Failed to connect wallet");
    } finally {
      setConnecting(false);
    }
  };

  const connect = async () => {
    if (wallet) {
      await connectWallet(wallet);
    } else {
      toast.error("Wallet adapter not initialized");
    }
  };

  const disconnect = async () => {
    if (wallet) {
      try {
        await wallet.disconnect();
        setConnected(false);
        setPublicKey(null);
        localStorage.removeItem('walletConnected');
        toast.info("Wallet disconnected");
      } catch (error) {
        console.error('Disconnect error:', error);
        toast.error("Failed to disconnect wallet");
      }
    }
  };

  return (
    <WalletContext.Provider value={{
      connected,
      connecting,
      publicKey,
      connect,
      disconnect,
      wallet
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}

export function WalletMultiButton() {
  const { connected, connecting, publicKey, connect, disconnect } = useWallet();

  if (connecting) {
    return (
      <Button disabled className="relative bg-gradient-primary">
        <Loader className="mr-2 h-4 w-4 animate-spin" />
        <span>Connecting...</span>
      </Button>
    );
  }

  if (connected && publicKey) {
    return (
      <Button 
        variant="outline" 
        onClick={disconnect}
        className="border-primary text-primary hover:bg-primary/10"
      >
        <Wallet className="mr-2 h-4 w-4" />
        {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
      </Button>
    );
  }

  return (
    <Button onClick={connect} className="bg-gradient-primary">
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
