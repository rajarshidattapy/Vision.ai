
export interface GenerationSettings {
  prompt: string;
  negativePrompt: string;
  width: number;
  height: number;
  guidanceScale: number;
}

export type GenerationStep = "upload" | "prompt" | "generating" | "result";

export interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  prompt: string;
  createdAt: string;
  likes: number;
  liked: boolean;
}
