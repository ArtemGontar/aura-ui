export interface VoiceOption {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'neutral';
}

// Azure Text-to-Speech voices for English
const englishVoices: VoiceOption[] = [
  { id: 'en-US-GuyNeural', name: 'Guy', gender: 'male' },
  { id: 'en-US-JennyNeural', name: 'Jenny', gender: 'female' },
  { id: 'en-US-AriaNeural', name: 'Aria', gender: 'female' }
];

// Azure Text-to-Speech voices for Russian
const russianVoices: VoiceOption[] = [
  { id: 'ru-RU-DmitryNeural', name: 'Дмитрий', gender: 'male' },
  { id: 'ru-RU-SvetlanaNeural', name: 'Светлана', gender: 'female' },
  { id: 'ru-RU-DariyaNeural', name: 'Дария', gender: 'female' }
];

// Default to English voices if language not supported
const defaultVoices = englishVoices;

// Map of language codes to voice options
const voicesByLanguage: Record<string, VoiceOption[]> = {
  'en': englishVoices,
  'ru': russianVoices,
};

/**
 * Get voice options based on language code
 * @param languageCode - ISO language code (e.g., 'en', 'ru')
 * @returns Array of voice options for the specified language
 */
export const getVoiceOptions = (languageCode: string = 'en'): VoiceOption[] => {
  // Get base language code if hyphenated (e.g., 'en-US' -> 'en')
  const baseLanguage = languageCode.split('-')[0].toLowerCase();
  
  console.log(`Fetching voice options for language code: ${languageCode}`);
  // Return voices for the language or default to English voices
  return voicesByLanguage[baseLanguage] || defaultVoices;
};
