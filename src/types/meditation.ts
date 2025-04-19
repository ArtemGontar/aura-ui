export type MeditationCategory = "Neural" | "Humanic" | "Ambient";
export type MeditationStatus = "ready" | "inprogress" | "failed";

export interface Meditation {
  id: number;
  text: string;
  audioUrl: string;
  backgroundColor: string;
  category: MeditationCategory;
  readinessStatus: MeditationStatus;
}

export interface MeditationSettings {
  topic: string;
  voiceName: string;
  speechRate: number;
  pitch: number;
  pauseStrength: number;
  backgroundAudio: string;
}