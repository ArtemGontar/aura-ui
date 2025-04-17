export type MeditationCategory = "Neural" | "Humanic" | "Noize";

export interface Meditation {
  id: number;
  text: string;
  audioUrl: string;
  backgroundColor: string;
  category: MeditationCategory;
}

export interface MeditationSettings {
  topic: string;
  voicePreference: string;
  speechRate: number;
  pitch: number;
  pauseStrength: number;
  addBreathingEffects: boolean;
  backgroundAudio: string;
}