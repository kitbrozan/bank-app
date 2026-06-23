"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Home, Repeat, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Главная", href: "/dashboard" },
  { icon: Repeat, label: "Переводы", href: "/transfer" },
  { icon: Clock, label: "История", href: "/transactions" },
  { icon: User, label: "Профиль", href: "/profile" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard" || pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-svh bg-gradient-to-b from-[#0B1120] to-[#020617]">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:flex">
        <Link href="/dashboard" className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] font-bold text-[#FBBF24] backdrop-blur-xl">
            B
          </div>
          <span className="text-lg font-semibold text-white">BankApp</span>
        </Link>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = isActive(pathname, href);

            return (
              <Button
                key={href}
                variant="ghost"
                asChild
                className={cn(
                  "h-11 w-full justify-start gap-3 rounded-xl px-4 text-white/60 hover:bg-white/[0.06] hover:text-white",
                  active &&
                    "bg-[#FBBF24]/10 text-[#FBBF24] hover:bg-[#FBBF24]/15 hover:text-[#FBBF24]",
                )}
              >
                <Link href={href}>
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-h-svh min-w-0 flex-1 flex-col">
        <main className="flex-1 overflow-y-auto p-4 pb-28 md:pb-6">{children}</main>

        <nav className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-around rounded-3xl border border-white/10 bg-white/[0.08] px-2 py-3 backdrop-blur-xl md:hidden">
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = isActive(pathname, href);

            return (
              <Button
                key={href}
                variant="ghost"
                asChild
                className={cn(
                  "h-auto flex-col gap-1 rounded-xl px-3 py-1 text-white/50 hover:bg-transparent hover:text-white/80",
                  active && "text-[#FBBF24] hover:text-[#FBBF24]",
                )}
              >
                <Link href={href}>
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px] font-medium">{label}</span>
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
