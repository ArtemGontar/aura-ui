export interface Meditation {
  id: number;
  text: string;
  audioUrl: string;
  backgroundColor: string;
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