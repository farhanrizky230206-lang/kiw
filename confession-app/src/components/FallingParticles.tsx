import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  emoji: string;
  size: number;
  duration: number;
}

export function FallingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticle = {
          id: Date.now(),
          x: Math.random() * 100,
          emoji: Math.random() > 0.5 ? "🤍" : "🌸",
          size: 12 + Math.random() * 14,
          duration: 7 + Math.random() * 2,
        };
        // Keep last 30 to prevent memory leak
        return [...prev, newParticle].slice(-30);
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle absolute top-[-10vh]"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationName: "floatDown"
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}