# Vision.AI

- A full-stack web3 x AI app where users can upload 15–20 of their images to generate personalized AI avatars using Stable Diffusion, and mint them as NFTs on the **Solana blockchain**.

---

## 🚀 Features


- 💾 User image upload & storage on AWS S3
- 🧠 AI model fine-tuning with Replicate API (StableDiffusion v1.5)
- 🎨 Personalized avatar generation
- ✨ Prompt generator using OpenAI API
- 🪙 NFT minting on Solana using Metaplex + web3.js
- 👛 Wallet connect (Phantom)

---

## 🧱 Tech Stack

| Layer         | Tech                                      |
|---------------|-------------------------------------------|
| Frontend      | HTML, CSS, JS                   |        |
| AI Model      | Replicate API (DreamBooth on SD 1.5)      |
| Prompt Gen    | OpenAI GPT API                            |
| Storage       | IPFS                                      |
| NFT Minting   | Solana + Metaplex + `@solana/web3.js`     |
| Wallet        | Solana Wallet Adapter (Phantom, etc)      |

---

## 🧪 Demo

👉 [Live Demo](.vercel.app)

> Upload → Fine-tune → Generate → Mint NFT → Done ✅

---
## 🧠 AI Model Fine-Tuning

- Utilizes [Replicate](https://replicate.com/) API to train a **DreamBooth model** based on the user's 15–20 uploaded images.
- Generates avatars in multiple themes (cyberpunk, anime, fantasy, realistic, etc).
- Stores generated avatars in **AWS S3**.

---

## 🪙 NFT Minting on Solana

- Uses `@solana/web3.js` and [Metaplex Token Metadata Standard](https://docs.metaplex.com/token-metadata/overview)
- Connect via Phantom or Backpack wallet.
- Mint selected avatar to Solana devnet/mainnet as NFT.

```json
{
  "name": "Cyberpunk Rajarshi",
  "description": "AI-generated avatar fine-tuned on your likeness.",
  "image": "https://s3.amazonaws.com/your-bucket/avatar.png",
  "attributes": [
    { "trait_type": "Style", "value": "Cyberpunk" }
  ]
}
```

---

## 🛠️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/ai-avatar-nft-minter.git
   cd ai-avatar-nft-minter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local`:
   ```env
   AWS_ACCESS_KEY_ID=...
   AWS_SECRET_ACCESS_KEY=...
   AWS_BUCKET_NAME=...

   REPLICATE_API_TOKEN=...
   OPENROUTER_API_KEY=...

   NEXT_PUBLIC_SOLANA_NETWORK=devnet
   ```

4. **Run locally**
   ```bash
   npm run dev
   ```
---

## 💡 Future Additions

- 🎭 AI Avatar as Twitter PFP via OAuth
- 🎨 Allow style selection before generation
- 🔁 NFT resale integration with Magic Eden
- 🧬 Multi-style model generation per user

---

## 📜 License

[MIT](LICENSE)


