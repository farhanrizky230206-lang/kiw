import { useEffect, useState } from "react";

export function HeartBurst({ trigger }: { trigger: number }) {
  const [hearts, setHearts] = useState<{ id: number; tx: string; ty: string; scale: number; left: string; top: string }[]>([]);

  useEffect(() => {
    if (!trigger) return;
    
    // Spawn 35 hearts rapidly
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 35) {
        clearInterval(interval);
        return;
      }
      
      const tx = (Math.random() - 0.5) * 400 + "px";
      const ty = (Math.random() - 0.5) * 400 + "px";
      const scale = 0.5 + Math.random() * 1.5;
      const left = 40 + Math.random() * 20 + "%";
      const top = 40 + Math.random() * 20 + "%";

      setHearts(prev => [...prev, { id: Date.now() + Math.random(), tx, ty, scale, left, top }]);
      count++;
    }, 100);

    return () => clearInterval(interval);
  }, [trigger]);

  // Clean up old hearts
  useEffect(() => {
    if (hearts.length > 0) {
      const timer = setTimeout(() => {
        setHearts(prev => prev.filter(h => Date.now() - h.id < 2000));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hearts]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {hearts.map(h => (
        <div
          key={h.id}
          className="burst-heart absolute text-[#e63946]"
          style={{
            left: h.left,
            top: h.top,
            '--tx': h.tx,
            '--ty': h.ty,
            '--scale': h.scale,
          } as any}
        >
          🤍
        </div>
      ))}
    </div>
  );
}