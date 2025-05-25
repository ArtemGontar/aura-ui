import { useState, useRef, useCallback } from 'react';
import { getAudioSasUrl } from '../services/audioService';

interface UseMeditationPlayerReturn {
  playingId: string | null;
  audioRef: React.RefObject<HTMLAudioElement>;
  togglePlayPause: (meditationId: string, audioUrl: string) => Promise<void>;
  moveAudio: (meditationId: string, amount: number) => void;
  isLoadingSasUrl: boolean;
}

export const useMeditationPlayer = (): UseMeditationPlayerReturn => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioSasUrls, setAudioSasUrls] = useState<Record<string, string>>({});
  const [isLoadingSasUrl, setIsLoadingSasUrl] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchAndCacheSasUrl = useCallback(async (meditationId: string, audioUrl: string): Promise<string | null> => {
    if (audioSasUrls[meditationId]) {
      return audioSasUrls[meditationId];
    }
    setIsLoadingSasUrl(true);
    try {
      const sasUrl = await getAudioSasUrl(audioUrl);
      setAudioSasUrls(prev => ({ ...prev, [meditationId]: sasUrl }));
      return sasUrl;
    } catch (error) {
      console.error("Error fetching SAS URL for meditation:", meditationId, error);
      return null; // Return null on error
    } finally {
      setIsLoadingSasUrl(false);
    }
  }, [audioSasUrls]);

  const togglePlayPause = useCallback(async (meditationId: string, audioUrl: string): Promise<void> => {
    if (!audioRef.current) return;

    const isCurrentlyPlayingThis = playingId === meditationId && !audioRef.current.paused;

    if (isCurrentlyPlayingThis) {
      // Pause the current audio
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      // If another audio is playing, pause it first.
      if (playingId && playingId !== meditationId && !audioRef.current.paused) {
        audioRef.current.pause();
        // setPlayingId(null); // Setting playingId to null here might be too soon if the new audio fails to load
      }
      
      let sasUrlToPlay = audioSasUrls[meditationId];
      if (!sasUrlToPlay || audioRef.current.src !== sasUrlToPlay) { // Ensure src is set if it's different or not set
        const fetchedSasUrl = await fetchAndCacheSasUrl(meditationId, audioUrl);
        if (!fetchedSasUrl) {
          setPlayingId(null); // Ensure playingId is cleared if SAS URL fetch fails
          return; // Early exit if SAS URL fetch failed
        }
        sasUrlToPlay = fetchedSasUrl;
        audioRef.current.src = sasUrlToPlay;
      }
      
      try {
        await audioRef.current.play();
        setPlayingId(meditationId);
      } catch (error) {
        console.error("Error playing audio for meditation:", meditationId, error);
        setPlayingId(null); // Clear playingId on playback error
      }
    }
  }, [playingId, audioSasUrls, fetchAndCacheSasUrl]);

  const moveAudio = useCallback((meditationId: string, amount: number): void => {
    if (playingId === meditationId && audioRef.current) {
      const newTime = audioRef.current.currentTime + amount;
      audioRef.current.currentTime = Math.max(0, Math.min(newTime, audioRef.current.duration || 0));
    }
  }, [playingId]);

  return {
    playingId,
    audioRef,
    togglePlayPause,
    moveAudio,
    isLoadingSasUrl,
  };
};
