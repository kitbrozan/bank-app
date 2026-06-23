"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Home,
  Repeat,
  CreditCard,
  BarChart3,
  Settings,
  Bot,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/transfers", label: "Transfers", icon: Repeat },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/ai-support", label: "AI Support", icon: Bot },
  { href: "/settings", label: "Settings", icon: Settings },
]

export default function AppNavigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <>
      {/* ========== DESKTOP SIDEBAR ========== */}
      <aside className="sticky top-0 z-40 hidden h-[100dvh] min-h-screen w-[200px] shrink-0 flex-col border-r border-border/10 bg-[#0a0a12]/95 backdrop-blur-2xl md:flex">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-16 top-10 h-40 w-40 rounded-full bg-brand-violet/6 blur-[60px]" />
          <div className="absolute -right-10 bottom-32 h-32 w-32 rounded-full bg-gold/4 blur-[50px]" />
        </div>

        <div className="relative px-5 pt-6 pb-8">
          <span className="text-base font-bold tracking-tight text-foreground">
            Levin<span className="text-gold">pay</span>
          </span>
          <p className="mt-0.5 text-[9px] tracking-[0.2em] uppercase text-muted-foreground/30">
            Private Banking
          </p>
        </div>

        <nav className="relative flex flex-1 flex-col gap-0.5 px-2.5">
          <p className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/25">
            Main
          </p>
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(href)
            return (
              <Link key={href} href={href} className="group relative">
                <div
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 transition-all duration-200 ${
                    active
                      ? "bg-gold/[0.07] text-gold"
                      : "text-muted-foreground/60 hover:bg-white/[0.02] hover:text-foreground/80"
                  }`}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-r-full bg-gold" />
                  )}

                  <Icon
                    className={`size-4 shrink-0 transition-colors ${active ? "text-gold" : ""}`}
                    strokeWidth={active ? 2 : 1.5}
                  />

                  <span className={`text-xs font-medium ${active ? "text-gold" : ""}`}>
                    {label}
                  </span>

                  {active && (
                    <ChevronRight className="ml-auto size-3 text-gold/30" />
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="relative m-2.5 rounded-lg border border-gold/6 bg-gradient-to-br from-gold/[0.04] to-transparent p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="size-1.5 rounded-full bg-positive" />
            <span className="text-[9px] font-medium text-positive uppercase tracking-wider">Online</span>
          </div>
          <p className="text-[10px] text-muted-foreground/60">Need help?</p>
          <p className="text-[10px] font-medium text-foreground/80">Ask AI Assistant</p>
        </div>
      </aside>

      {/* ========== MOBILE DRAWER ========== */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed left-0 top-0 z-50 h-screen w-[260px] border-r border-border/10 bg-[#0a0a12]/95 backdrop-blur-2xl md:hidden">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-20 top-20 h-60 w-60 rounded-full bg-brand-violet/8 blur-[80px]" />
            </div>

            <div className="relative flex items-center justify-between px-5 pt-6 pb-4">
              <span className="text-base font-bold tracking-tight text-foreground">
                Levin<span className="text-gold">pay</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="grid size-8 place-items-center rounded-lg border border-border/40 bg-card/40 text-muted-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <nav className="relative flex flex-col gap-0.5 p-3 pt-2">
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/30">
                Main
              </p>
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = isActive(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="group relative"
                  >
                    <div
                      className={`flex items-center gap-3 rounded-xl px-3.5 py-3 transition-all duration-300 ${
                        active
                          ? "bg-gold/[0.08] text-gold"
                          : "text-muted-foreground/70 hover:bg-white/[0.03] hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <div className="absolute left-0 top-1/2 h-5 w-[2.5px] -translate-y-1/2 rounded-r-full bg-gold shadow-[0_0_6px_rgba(212,168,83,0.4)]" />
                      )}
                      <Icon
                        className={`size-[18px] shrink-0 transition-all ${active ? "text-gold" : "text-muted-foreground/50 group-hover:text-foreground/70"}`}
                        strokeWidth={active ? 2.2 : 1.6}
                      />
                      <span className={`text-[13px] font-medium ${active ? "text-gold" : ""}`}>{label}</span>
                      {active && <ChevronRight className="ml-auto size-3.5 text-gold/40" />}
                    </div>
                  </Link>
                )
              })}
            </nav>

            <div className="absolute bottom-6 left-3 right-3">
              <div className="rounded-xl border border-gold/8 bg-gradient-to-br from-gold/[0.05] to-transparent p-3.5">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="size-1.5 rounded-full bg-positive animate-pulse" />
                  <span className="text-[10px] font-medium text-positive uppercase tracking-wider">Online</span>
                </div>
                <p className="text-[11px] text-muted-foreground/70">Need help? Ask AI Assistant</p>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* ========== MOBILE BOTTOM NAV ========== */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/10 bg-[#0a0a12]/90 backdrop-blur-2xl md:hidden">
        <div className="flex items-center justify-around px-1 py-1.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="group relative flex flex-col items-center gap-0.5 px-2 py-1"
              >
                {active && (
                  <div className="absolute -top-0.5 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_6px_rgba(212,168,83,0.5)]" />
                )}

                <div
                  className={`grid size-8 place-items-center rounded-lg transition-all duration-300 ${
                    active
                      ? "bg-gold/10 text-gold -translate-y-0.5"
                      : "text-muted-foreground/50 group-hover:text-foreground/70"
                  }`}
                >
                  <Icon className="size-[17px]" strokeWidth={active ? 2.2 : 1.6} />
                </div>

                <span
                  className={`text-[9px] font-medium transition-colors ${
                    active ? "text-gold" : "text-muted-foreground/50"
                  }`}
                >
                  {label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}