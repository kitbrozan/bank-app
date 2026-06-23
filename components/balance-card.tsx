"use client";

import type React from "react";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Plus,
  Send,
  Repeat,
  ScanLine,
  Eye,
  EyeOff,
} from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";
import { cn } from "@/lib/utils";

const actions = [
  {
    label: "Send",
    icon: Send,
    color: "text-brand-blue",
    ring: "group-hover/btn:border-brand-blue/60",
    glow: "group-hover/btn:shadow-[0_0_22px_-4px_var(--brand-blue)]",
  },
  {
    label: "Exchange",
    icon: Repeat,
    color: "text-brand-violet",
    ring: "group-hover/btn:border-brand-violet/60",
    glow: "group-hover/btn:shadow-[0_0_22px_-4px_var(--brand-violet)]",
  },
  {
    label: "Scan QR",
    icon: ScanLine,
    color: "text-gold",
    ring: "group-hover/btn:border-gold/60",
    glow: "group-hover/btn:shadow-[0_0_22px_-4px_var(--gold)]",
  },
] as const;

export function BalanceCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };

  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="relative w-full min-w-0 [perspective:1400px]">
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        className="w-full min-w-0 rounded-4xl bg-gradient-to-br from-card/80 via-card/60 to-card/80 p-px shadow-2xl transition-transform duration-200 ease-out [transform-style:preserve-3d]"
      >
        {/* Glass inner surface — без анимаций, только прозрачность */}
        <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-card/70 p-4 backdrop-blur-xl sm:p-6 md:p-7">
          {/* убрал все анимации: нет animate-shine, animate-halo, liquid-border */}

          {/* top row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-gold/15 ring-1 ring-gold/30">
                <span className="font-mono text-sm font-semibold text-gold">
                  Au
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Aurum Private
                </p>
                <p className="text-xs text-muted-foreground">
                  •••• 4921 · Visa Infinite
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setHidden((v) => !v)}
              className="grid size-9 place-items-center rounded-full border border-border bg-secondary/40 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={hidden ? "Show balance" : "Hide balance"}
            >
              {hidden ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {/* balance */}
          <div className="mt-6 sm:mt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Total Balance
            </p>
            <div className="mt-2 flex min-w-0 items-end gap-1.5 sm:gap-2">
              <span className="shrink-0 text-lg font-light text-muted-foreground sm:text-2xl">
                €
              </span>
              <h2 className="min-w-0 text-balance text-[clamp(1.75rem,7vw,3.75rem)] font-semibold leading-none tracking-tight text-foreground tabular-nums">
                {hidden ? (
                  "••••••"
                ) : (
                  <AnimatedCounter value={128450.72} />
                )}
              </h2>
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-positive/10 px-2.5 py-1 text-xs font-medium text-positive ring-1 ring-positive/20">
              <ArrowUpRight className="size-3.5" />
              +2.4% · €3,012 this month
            </div>
          </div>

          {/* Top up — small, clear primary button */}
          <button
            type="button"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground shadow-[0_0_24px_-6px_var(--gold)] transition-transform hover:scale-[1.03] active:scale-95 sm:mt-7"
          >
            <Plus className="size-4" />
            Top up
          </button>

          {/* secondary actions */}
          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
            {actions.map(({ label, icon: Icon, color, ring, glow }) => (
              <button
                key={label}
                type="button"
                className="group/btn flex min-h-11 flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-secondary/40 px-1 py-3 transition-all hover:bg-secondary/70 sm:px-2 sm:py-4"
              >
                <span
                  className={cn(
                    "grid size-11 place-items-center rounded-xl border border-border bg-background/60 transition-all",
                    ring,
                    glow,
                  )}
                >
                  <Icon className={cn("size-5", color)} />
                </span>
                <span className="text-xs font-medium text-foreground">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}