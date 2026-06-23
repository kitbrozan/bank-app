"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Repeat,
  CreditCard,
  BarChart3,
  Settings,
  Bot,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", shortLabel: "Home", icon: Home },
  { href: "/transfers", label: "Transfers", shortLabel: "Send", icon: Repeat },
  { href: "/payments", label: "Payments", shortLabel: "Pay", icon: CreditCard },
  { href: "/analytics", label: "Analytics", shortLabel: "Stats", icon: BarChart3 },
  { href: "/ai-support", label: "AI Support", shortLabel: "AI", icon: Bot },
  { href: "/settings", label: "Settings", shortLabel: "Set", icon: Settings },
];

export default function AppNavigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card/50 p-4 backdrop-blur-xl md:flex">
        <div className="mb-10 flex items-center gap-3">
          <span className="bg-gradient-to-r from-brand-blue via-purple-400 to-brand-violet bg-clip-text text-xl font-light text-transparent drop-shadow-[0_2px_6px_rgba(100,100,255,0.15)]">
            Levinpay
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link key={href} href={href} className="group relative">
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    isActive
                      ? "bg-gold/10 text-gold"
                      : "text-muted-foreground hover:bg-card/80 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="desktop-indicator"
                      className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gold"
                      initial={{ opacity: 0, scaleY: 0.5 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <Icon className="ml-2 size-4 shrink-0" />
                  <span className="truncate">{label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-2 left-2 right-2 z-20 flex items-stretch justify-between rounded-2xl border border-border/40 bg-card/80 p-1 shadow-lg shadow-black/20 backdrop-blur-xl md:hidden">
        {navItems.map(({ href, label, shortLabel, icon: Icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className="relative flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center px-0.5 py-1"
            >
              <motion.div
                className="flex flex-col items-center gap-0.5"
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    color: isActive ? "var(--gold)" : "var(--muted-foreground)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon className="size-5" />
                </motion.div>
                <span
                  className={`max-w-full truncate text-[9px] font-medium leading-none min-[380px]:text-[10px] ${
                    isActive ? "text-gold" : "text-muted-foreground"
                  }`}
                >
                  <span className="hidden min-[380px]:inline">{shortLabel}</span>
                </span>
              </motion.div>

              {isActive && (
                <motion.div
                  layoutId="mobile-indicator"
                  className="absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gold"
                  initial={{ opacity: 0, scaleX: 0.5 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
