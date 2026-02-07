import React, { useEffect, useState, useRef } from "react";

interface Props {
  name: string;
}

interface Heart {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  emoji: string;
}

const EMOJIS = ["❤️", "🌸", "🌹", "💐", "💖", "💗", "💓", "💝", "🩷", "💘"];

const ValentineSuccess = ({ name }: Props) => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 24,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setHearts(generated);

    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-valentine-bg px-4">
      <audio ref={audioRef} src="/audio/True (2003 Remaster) (mp3cut.net).mp3" loop />
      {/* Falling hearts */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="pointer-events-none fixed animate-fall"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg animate-fade-in text-center">
        <div className="rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm border border-valentine-light/30 sm:p-12">
          <img src="/img/memoji.webp" alt="Memoji" className="mx-auto h-60 w-60 sm:h-28 sm:w-28" />
          <h1 className="mt-4 text-2xl font-extrabold text-valentine-dark sm:text-4xl leading-tight">
            You have successfully confirmed your Valentine!
          </h1>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-valentine-primary/40" />
          <p className="mt-4 text-lg font-medium text-valentine-muted sm:text-xl">
            Happy Valentine's Day,{" "}
            <span className="font-bold text-valentine-primary">{name}</span>! 💌
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValentineSuccess;
