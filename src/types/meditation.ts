export type MeditationCategory = "Neural" | "Humanic" | "Ambient";

export interface Meditation {
  id: number;
  text: string;
  audioUrl: string;
  backgroundColor: string;
  category: MeditationCategory;
}

export interface MeditationSettings {
  topic: string;
  voiceName: string;
  speechRate: number;
  pitch: number;
  pauseStrength: number;
  addBreathingEffects: boolean;
  backgroundAudio: string;
}