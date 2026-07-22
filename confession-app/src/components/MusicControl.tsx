import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export function MusicControl({ playIntent }: { playIntent: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (playIntent && audioRef.current && !playing) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlaying(true);
          })
          .catch(() => {
            console.log("Autoplay prevented or missing audio file.");
          });
      }
    }
  }, [playIntent, playing]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(() => console.log("Missing audio file or playback error."));
    }
  };

  return (
    <>
      <audio ref={audioRef} src="lagu.mp3" loop />
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(180,101,122,0.3)] hover:scale-105 transition-transform z-50 text-[#b4657a]"
        aria-label="Toggle music"
      >
        {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
      </button>
    </>
  );
}