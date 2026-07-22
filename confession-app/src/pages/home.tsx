import { useState, useEffect, useRef, ReactNode } from "react";
import { Heart, Play, Pause } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { cn } from "@/lib/utils";

// ─── UI Components ────────────────────────────────────────────────────────────

function CardWrapper({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(
      "w-full max-w-[720px] mx-auto",
      "bg-white/90 backdrop-blur-md",
      "rounded-[28px] p-[35px] md:p-[45px]",
      "shadow-[0_8px_32px_rgba(180,101,122,0.1)]",
      "border border-white/60",
      className
    )}>
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <div className="text-[#b4657a] text-[12px] uppercase tracking-[3px] font-bold mb-4 text-center">
      {children}
    </div>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-serif text-[#a84f68] text-3xl md:text-4xl mb-6 text-center leading-tight">
      {children}
    </h1>
  );
}

function Paragraph({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[#4a3037] text-base md:text-lg mb-4 leading-relaxed text-center", className)}>
      {children}
    </p>
  );
}

function PrimaryButton({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full md:w-auto px-8 py-3 rounded-full text-white font-medium transition-all duration-300",
        "bg-gradient-to-r from-[#d46b88] to-[#ad3e5e]",
        "hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(173,62,94,0.3)]",
        className
      )}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full md:w-auto px-8 py-3 rounded-full font-medium transition-all duration-300",
        "bg-[#fff0f4] text-[#ad3e5e] border border-[#fbcfe8]",
        "hover:bg-[#ffe5eb] hover:-translate-y-[1px]",
        className
      )}
    >
      {children}
    </button>
  );
}

function WhatsAppButton({ children, href, className }: { children: ReactNode; href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 rounded-full text-white font-medium transition-all duration-300",
        "bg-[#25d366] hover:bg-[#1da851] shadow-md hover:shadow-lg hover:-translate-y-[2px]",
        className
      )}
    >
      <SiWhatsapp className="text-xl" />
      <span>{children}</span>
    </a>
  );
}

// ─── Falling Particles ────────────────────────────────────────────────────────

interface Particle {
  id: number;
  x: number;
  emoji: string;
  size: number;
  duration: number;
}

function FallingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => {
        const p: Particle = {
          id: Date.now(),
          x: Math.random() * 100,
          emoji: Math.random() > 0.5 ? "🤍" : "🌸",
          size: 12 + Math.random() * 14,
          duration: 7 + Math.random() * 2,
        };
        return [...prev, p].slice(-30);
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
            animationName: "floatDown",
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}

// ─── Heart Burst ──────────────────────────────────────────────────────────────

interface BurstHeart {
  id: number;
  tx: string;
  ty: string;
  scale: number;
  left: string;
  top: string;
}

function HeartBurst({ trigger }: { trigger: number }) {
  const [hearts, setHearts] = useState<BurstHeart[]>([]);

  useEffect(() => {
    if (!trigger) return;
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 35) { clearInterval(interval); return; }
      setHearts(prev => [...prev, {
        id: Date.now() + Math.random(),
        tx: (Math.random() - 0.5) * 400 + "px",
        ty: (Math.random() - 0.5) * 400 + "px",
        scale: 0.5 + Math.random() * 1.5,
        left: 40 + Math.random() * 20 + "%",
        top: 40 + Math.random() * 20 + "%",
      }]);
      count++;
    }, 100);
    return () => clearInterval(interval);
  }, [trigger]);

  useEffect(() => {
    if (hearts.length === 0) return;
    const t = setTimeout(() => setHearts([]), 2000);
    return () => clearTimeout(t);
  }, [hearts.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {hearts.map(h => (
        <div
          key={h.id}
          className="burst-heart absolute"
          style={{
            left: h.left,
            top: h.top,
            "--tx": h.tx,
            "--ty": h.ty,
            "--scale": h.scale,
          } as React.CSSProperties}
        >
          🤍
        </div>
      ))}
    </div>
  );
}

// ─── Music Control ────────────────────────────────────────────────────────────

function MusicControl({ playIntent }: { playIntent: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (playIntent && audioRef.current && !playing) {
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  }, [playIntent, playing]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="lagu.mp3" loop />
      <button
        onClick={toggle}
        aria-label="Toggle music"
        className="fixed bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(180,101,122,0.3)] hover:scale-105 transition-transform z-50 text-[#b4657a]"
      >
        {playing
          ? <Pause size={20} fill="currentColor" />
          : <Play size={20} fill="currentColor" className="ml-0.5" />}
      </button>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [section, setSection] = useState(1);
  const [playIntent, setPlayIntent] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);

  const goTo = (next: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSection(next);
    setPlayIntent(true);
  };

  const handleYes = () => {
    setBurstTrigger(Date.now());
    goTo(6);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-b from-[#fff7f8] to-[#ffe5eb] overflow-x-hidden relative flex flex-col items-center justify-center p-4 py-12 md:p-8">
      <FallingParticles />
      <MusicControl playIntent={playIntent} />
      <HeartBurst trigger={burstTrigger} />

      <div className="relative z-10 w-full max-w-[720px]">

        {/* ── Section 1 ── */}
        {section === 1 && (
          <div className="animate-slide-up-fade">
            <CardWrapper>
              <Label>Sebuah pesan khusus</Label>
              <div className="flex justify-center mb-8">
                <div className="w-[180px] h-[180px] rounded-full border border-[#fbcfe8] shadow-[0_8px_16px_rgba(180,101,122,0.15)] flex items-center justify-center overflow-hidden bg-[#fff0f4]">
                  <img
                    src="foto.jpg"
                    alt="Foto"
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      (e.currentTarget.nextElementSibling as HTMLElement)?.classList.remove("hidden");
                    }}
                  />
                  <div className="hidden text-[#fbcfe8]">
                    <Heart size={64} fill="currentColor" />
                  </div>
                </div>
              </div>
              <Heading>Hai, Kamu 🤍</Heading>
              <Paragraph>Ada sesuatu yang sudah cukup lama ingin aku sampaikan kepadamu.</Paragraph>
              <Paragraph>Mungkin cara ini sedikit berbeda, tapi aku membuat halaman ini karena aku ingin menyampaikan semuanya dengan sungguh-sungguh, bukan hanya lewat pesan singkat.</Paragraph>
              <p className="text-center italic text-[#b4657a] text-sm mt-6 mb-8">
                "Sebelum melanjutkan, baca semuanya sampai akhir, ya."
              </p>
              <div className="flex justify-center">
                <PrimaryButton onClick={() => goTo(2)}>Buka Pesannya</PrimaryButton>
              </div>
            </CardWrapper>
          </div>
        )}

        {/* ── Section 2 ── */}
        {section === 2 && (
          <div className="animate-slide-up-fade">
            <CardWrapper>
              <Label>Tentang kamu</Label>
              <Heading>Entah Sejak Kapan...</Heading>
              <Paragraph>Sejak kita mulai saling mengenal, ada banyak hal kecil tentangmu yang perlahan membuatku merasa nyaman.</Paragraph>
              <Paragraph>Aku suka caramu berbicara, caramu tersenyum, caramu bercerita, dan bagaimana kehadiranmu bisa membuat hari yang biasa saja menjadi terasa lebih menyenangkan.</Paragraph>
              <Paragraph>Mungkin ada banyak hal yang kamu anggap sederhana, tetapi bagiku, hal-hal kecil itu justru menjadi sesuatu yang selalu aku ingat.</Paragraph>
              <Paragraph>Aku tidak tahu tepatnya sejak kapan, tetapi perlahan aku mulai menantikan pesan darimu, ingin mendengar ceritamu, dan ingin mengetahui bagaimana harimu berjalan.</Paragraph>
              <div className="flex justify-center mt-10">
                <PrimaryButton onClick={() => goTo(3)}>Lanjutkan</PrimaryButton>
              </div>
            </CardWrapper>
          </div>
        )}

        {/* ── Section 3 ── */}
        {section === 3 && (
          <div className="animate-slide-up-fade">
            <CardWrapper>
              <Label>Perasaanku</Label>
              <Heading>Aku Mulai Menyadari...</Heading>
              <Paragraph>Awalnya aku mencoba menganggap semua ini sebagai rasa nyaman biasa. Namun, semakin lama aku mengenalmu, semakin aku sadar bahwa perasaanku kepadamu sudah lebih dari sekadar teman.</Paragraph>
              <Paragraph>Aku membuat halaman ini bukan hanya untuk terlihat romantis atau membuatmu terkesan.</Paragraph>
              <Paragraph>
                Aku membuatnya karena aku ingin kamu mengetahui bahwa{" "}
                <strong className="text-[#b34061] font-semibold">perasaanku benar-benar tulus.</strong>
              </Paragraph>
              <Paragraph>Aku tidak ingin datang hanya untuk bermain-main, lalu pergi ketika keadaan mulai sulit. Aku ingin mengenalmu lebih dalam, saling mendukung, saling menghargai, dan tumbuh bersama.</Paragraph>
              <div className="flex justify-center mt-10">
                <PrimaryButton onClick={() => goTo(4)}>Ada Satu Hal Lagi</PrimaryButton>
              </div>
            </CardWrapper>
          </div>
        )}

        {/* ── Section 4 ── */}
        {section === 4 && (
          <div className="animate-slide-up-fade">
            <CardWrapper>
              <Label>Kejujuranku</Label>
              <Heading>Aku Tidak Sempurna</Heading>
              <Paragraph>Aku mungkin tidak selalu tahu bagaimana cara membuatmu bahagia setiap waktu. Aku juga tidak bisa berjanji bahwa semuanya akan selalu berjalan sempurna.</Paragraph>
              <Paragraph>Tetapi aku bisa berjanji untuk berusaha jujur, menjaga komunikasi, mendengarkanmu, menghargai perasaanmu, dan tidak meninggalkanmu sendirian saat keadaan sedang tidak mudah.</Paragraph>
              <Paragraph>Aku ingin menjadi seseorang yang tidak hanya hadir ketika semuanya menyenangkan, tetapi juga tetap tinggal ketika hari-harimu terasa berat.</Paragraph>
              <Paragraph className="text-[#b34061] font-bold text-lg md:text-xl mt-6">
                Karena bagiku, menyukai seseorang bukan hanya tentang rasa bahagia, tetapi juga tentang kesiapan untuk saling menjaga.
              </Paragraph>
              <div className="flex justify-center mt-10">
                <PrimaryButton onClick={() => goTo(5)}>Pertanyaan Terakhir</PrimaryButton>
              </div>
            </CardWrapper>
          </div>
        )}

        {/* ── Section 5 ── */}
        {section === 5 && (
          <div className="animate-slide-up-fade">
            <CardWrapper>
              <Label>Dari hati yang paling jujur</Label>
              <Heading>Akhirnya Aku Ingin Bilang...</Heading>
              <Paragraph>Aku suka sama kamu. Aku nyaman sama kamu, dan aku ingin hubungan kita menjadi sesuatu yang lebih berarti.</Paragraph>
              <Paragraph>Aku ingin mengenalmu lebih dekat dan menjalani hubungan ini dengan niat yang serius.</Paragraph>
              <div className="my-12 text-center">
                <h2
                  className="text-[#b34061] font-serif font-bold leading-tight"
                  style={{ fontSize: "clamp(30px, 6vw, 50px)" }}
                >
                  Maukah kamu<br />menjadi pacarku? 🤍
                </h2>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <PrimaryButton onClick={handleYes} className="text-lg px-10">
                  Iya, Aku Mau 🤍
                </PrimaryButton>
                <SecondaryButton onClick={() => goTo(7)} className="text-lg px-10">
                  Aku Butuh Waktu
                </SecondaryButton>
              </div>
              <p className="text-center text-[#b4657a] text-sm mt-8 opacity-80">
                Apa pun jawabanmu, aku akan tetap menghargainya.
              </p>
            </CardWrapper>
          </div>
        )}

        {/* ── Section 6 — Yes ── */}
        {section === 6 && (
          <div className="animate-slide-up-fade">
            <CardWrapper>
              <Label>Hari yang membahagiakan</Label>
              <Heading>Terima Kasih 🤍</Heading>
              <Paragraph>Terima kasih sudah memberikan aku kesempatan untuk menjadi bagian yang lebih berarti dalam hidupmu.</Paragraph>
              <Paragraph>Mulai hari ini, semoga kita bisa saling menjaga, saling memahami, saling mendukung, dan menjalani semuanya bersama-sama.</Paragraph>
              <p className="text-center italic text-[#b34061] font-serif text-xl my-8">
                "Aku bahagia karena kamu memilih untuk berjalan bersamaku."
              </p>
              <div className="flex justify-center mt-8">
                <WhatsAppButton href="https://wa.me/6281234567890?text=Aku%20sudah%20baca%20semuanya%2C%20dan%20jawabanku%20adalah%20iya%20🤍">
                  Kirim Jawaban ke WhatsApp
                </WhatsAppButton>
              </div>
            </CardWrapper>
          </div>
        )}

        {/* ── Section 7 — Need Time ── */}
        {section === 7 && (
          <div className="animate-slide-up-fade">
            <CardWrapper>
              <Label>Aku menghargai jawabanmu</Label>
              <Heading>Tidak Apa-Apa 🤍</Heading>
              <Paragraph>Terima kasih sudah membaca semuanya sampai akhir.</Paragraph>
              <Paragraph>Aku mengerti kalau kamu masih membutuhkan waktu untuk memikirkan semua ini. Aku tidak ingin memaksamu memberikan jawaban sebelum kamu benar-benar yakin.</Paragraph>
              <Paragraph>Ambillah waktu yang kamu butuhkan. Apa pun keputusanmu nanti, aku akan tetap menghargai kejujuran dan perasaanmu.</Paragraph>
              <div className="flex justify-center mt-10">
                <WhatsAppButton href="https://wa.me/6281234567890?text=Aku%20sudah%20membaca%20semuanya.%20Aku%20masih%20butuh%20waktu%20untuk%20memikirkan%20jawabanku.">
                  Sampaikan Lewat WhatsApp
                </WhatsAppButton>
              </div>
            </CardWrapper>
          </div>
        )}

      </div>
    </div>
  );
}
