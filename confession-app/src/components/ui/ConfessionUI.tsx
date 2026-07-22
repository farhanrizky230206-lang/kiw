import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SiWhatsapp } from "react-icons/si";

export function CardWrapper({ children, className }: { children: ReactNode; className?: string }) {
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

export function Label({ children }: { children: ReactNode }) {
  return (
    <div className="text-[#b4657a] text-[12px] uppercase tracking-[3px] font-bold mb-4 text-center">
      {children}
    </div>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-serif text-[#a84f68] text-3xl md:text-4xl mb-6 text-center leading-tight">
      {children}
    </h1>
  );
}

export function Paragraph({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[#4a3037] text-base md:text-lg mb-4 leading-relaxed text-center", className)}>
      {children}
    </p>
  );
}

export function PrimaryButton({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) {
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

export function SecondaryButton({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) {
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

export function WhatsAppButton({ children, href, className }: { children: ReactNode; href: string; className?: string }) {
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