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
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/transfers", label: "Transfers", icon: Repeat },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function AppNavigation() {
  const pathname = usePathname();

  return (
    <>
      {/* ========== DESKTOP SIDEBAR ========== */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/50 backdrop-blur-xl p-4 h-screen sticky top-0">
        {/* Только название с градиентом */}
        <div className="mb-10 flex items-center gap-3">
          <span className="text-xl font-light bg-gradient-to-r from-brand-blue via-purple-400 to-brand-violet text-transparent bg-clip-text drop-shadow-[0_2px_6px_rgba(100,100,255,0.15)]">
            Levinpay
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link key={href} href={href} className="relative group">
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
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
                  <span className="ml-2">{label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ========== MOBILE BOTTOM NAVIGATION ========== */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 flex justify-around rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-2 shadow-lg shadow-black/20 z-20">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href} className="relative flex flex-col items-center">
              <motion.div
                className="flex flex-col items-center gap-1 px-2 py-1"
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.25 : 1,
                    color: isActive ? "var(--gold)" : "var(--muted-foreground)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <span
                  className={`text-[10px] transition-colors ${
                    isActive ? "text-gold" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </motion.div>

              {isActive && (
                <motion.div
                  layoutId="mobile-indicator"
                  className="absolute -bottom-1 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-gold"
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