"use client"

import { useState } from "react"
import { Bell, Settings, ArrowUpRight, ArrowDownLeft, Repeat, Share2, Search, SlidersHorizontal, Plus } from "lucide-react"

// ── Types ───────────────────────────────────────────────
interface Transaction {
  id: string
  name: string
  category: string
  amount: number
  currency: string
  date: string
  type: "income" | "expense"
  initials: string
  gradient: string
  progress: number
  progressColor: string
}

// ── Mock data ───────────────────────────────────────────
const transactions: Transaction[] = [
  {
    id: "1",
    name: "Netflix Subscription",
    category: "Entertainment",
    amount: 15.99,
    currency: "$",
    date: "Today, 14:32",
    type: "expense",
    initials: "NF",
    gradient: "from-rose-500/80 to-orange-500/80",
    progress: 72,
    progressColor: "bg-rose-400",
  },
  {
    id: "2",
    name: "Freelance Design",
    category: "Income",
    amount: 2400.00,
    currency: "$",
    date: "Today, 09:15",
    type: "income",
    initials: "FD",
    gradient: "from-emerald-500/80 to-teal-500/80",
    progress: 100,
    progressColor: "bg-emerald-400",
  },
  {
    id: "3",
    name: "Whole Foods Market",
    category: "Groceries",
    amount: 127.43,
    currency: "$",
    date: "Yesterday, 18:45",
    type: "expense",
    initials: "WF",
    gradient: "from-amber-500/80 to-yellow-500/80",
    progress: 45,
    progressColor: "bg-amber-400",
  },
  {
    id: "4",
    name: "Uber Ride",
    category: "Transport",
    amount: 23.50,
    currency: "$",
    date: "Yesterday, 08:20",
    type: "expense",
    initials: "UB",
    gradient: "from-violet-500/80 to-purple-500/80",
    progress: 28,
    progressColor: "bg-violet-400",
  },
  {
    id: "5",
    name: "Salary Deposit",
    category: "Income",
    amount: 5200.00,
    currency: "$",
    date: "Jun 21, 09:00",
    type: "income",
    initials: "SD",
    gradient: "from-emerald-500/80 to-cyan-500/80",
    progress: 100,
    progressColor: "bg-emerald-400",
  },
  {
    id: "6",
    name: "Spotify Premium",
    category: "Entertainment",
    amount: 9.99,
    currency: "$",
    date: "Jun 20, 12:00",
    type: "expense",
    initials: "SP",
    gradient: "from-green-500/80 to-lime-500/80",
    progress: 68,
    progressColor: "bg-green-400",
  },
  {
    id: "7",
    name: "Electric Bill",
    category: "Utilities",
    amount: 89.20,
    currency: "$",
    date: "Jun 19, 10:30",
    type: "expense",
    initials: "EB",
    gradient: "from-sky-500/80 to-blue-500/80",
    progress: 55,
    progressColor: "bg-sky-400",
  },
  {
    id: "8",
    name: "Coffee Shop",
    category: "Food & Drink",
    amount: 6.75,
    currency: "$",
    date: "Jun 19, 08:15",
    type: "expense",
    initials: "CS",
    gradient: "from-orange-500/80 to-red-500/80",
    progress: 12,
    progressColor: "bg-orange-400",
  },
]

// ── Components ────────────────────────────────────────────
function TransactionCard({ tx }: { tx: Transaction }) {
  const [hovered, setHovered] = useState(false)

  const isIncome = tx.type === "income"
  const amountStr = `${isIncome ? "+" : "-"}${tx.currency}${tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex w-full min-w-0 flex-wrap items-center gap-3 rounded-2xl border border-border/40 bg-card/40 p-3 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-card/60 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-gold/5 sm:gap-4 sm:p-4 md:flex-nowrap md:p-5"
    >
      {/* Avatar */}
      <div
        className={`grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${tx.gradient} ring-2 ring-white/10 shadow-lg`}
      >
        <span className="text-xs font-bold text-white/90">{tx.initials}</span>
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-semibold text-foreground">{tx.name}</h3>
          <span className={`shrink-0 text-sm font-bold tabular-nums ${isIncome ? "text-positive" : "text-foreground"}`}>
            {amountStr}
          </span>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-xs text-muted-foreground">{tx.category}</span>
          <span className="hidden text-muted-foreground/40 sm:inline">·</span>
          <span className="text-xs text-muted-foreground/70">{tx.date}</span>
        </div>

        {/* Progress bar */}
        <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-muted/30">
          <div
            className={`h-full rounded-full ${tx.progressColor} transition-all duration-700 ease-out`}
            style={{ width: `${tx.progress}%` }}
          />
        </div>
      </div>

      {/* Arrow indicator — hidden on mobile to save space */}
      <div
        className={`hidden size-8 shrink-0 place-items-center rounded-full sm:grid ${
          isIncome
            ? "bg-positive/10 text-positive"
            : "bg-destructive/10 text-destructive"
        }`}
      >
        {isIncome ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
      </div>

      {/* Hover overlay actions */}
      <div
        className={`absolute inset-x-0 -bottom-0 flex items-center justify-center gap-3 rounded-b-2xl bg-gradient-to-t from-black/60 to-transparent pb-3 pt-8 transition-all duration-300 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-xs font-medium text-gold ring-1 ring-gold/20 backdrop-blur transition-all hover:bg-gold/25"
        >
          <Repeat className="size-3" />
          Repeat
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/15 backdrop-blur transition-all hover:bg-white/20"
        >
          <Share2 className="size-3" />
          Share
        </button>
      </div>
    </div>
  )
}

function StatCard({ label, value, change, positive }: { label: string; value: string; change: string; positive: boolean }) {
  return (
    <div className="w-full min-w-0 rounded-2xl border border-border/40 bg-card/40 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-card/60 sm:p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-bold text-foreground sm:text-xl">{value}</p>
      <div className={`mt-1 flex items-center gap-1 text-xs font-medium ${positive ? "text-positive" : "text-destructive"}`}>
        {positive ? <ArrowDownLeft className="size-3" /> : <ArrowUpRight className="size-3" />}
        {change}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────
export default function PaymentsPage() {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all")
  const [search, setSearch] = useState("")

  const filtered = transactions.filter((tx) => {
    const matchesFilter = filter === "all" || tx.type === filter
    const matchesSearch = tx.name.toLowerCase().includes(search.toLowerCase()) || tx.category.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0)
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0)

  return (
    <main className="bg-aurora min-h-full w-full min-w-0 overflow-x-hidden">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 md:py-8">
        {/* Header */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3 md:mb-8">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-gold/15 ring-1 ring-gold/30">
              <span className="font-mono text-sm font-bold text-gold">A</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Welcome back</p>
              <h1 className="text-base font-semibold text-foreground sm:text-lg">Alexander Voss</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
            </button>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
              aria-label="Settings"
            >
              <Settings className="size-4" />
            </button>
          </div>
        </header>

        {/* Stats row */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4">
          <StatCard label="Total Balance" value="$7,567.83" change="+12.5% this month" positive />
          <StatCard label="Total Income" value={`$${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}`} change="+8.2% this month" positive />
          <StatCard label="Total Expenses" value={`$${totalExpense.toLocaleString("en-US", { minimumFractionDigits: 2 })}`} change="+3.1% this month" positive={false} />
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {(["all", "income", "expense"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`min-h-11 rounded-full px-4 py-2 text-xs font-medium capitalize transition-all ${
                  filter === f
                    ? "bg-gold/15 text-gold ring-1 ring-gold/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 sm:flex-nowrap">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full min-w-0 rounded-full border border-border bg-card/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 backdrop-blur outline-none ring-0 transition-all focus:border-gold/30 focus:ring-1 focus:ring-gold/20"
              />
            </div>
            <button
              type="button"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
            >
              <SlidersHorizontal className="size-4" />
            </button>
            <button
              type="button"
              className="flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-gold/15 px-4 py-2 text-xs font-medium text-gold ring-1 ring-gold/30 transition-all hover:bg-gold/25"
            >
              <Plus className="size-3.5" />
              New
            </button>
          </div>
        </div>

        {/* Transaction list */}
        <div className="flex flex-col gap-3">
          {filtered.map((tx) => (
            <TransactionCard key={tx.id} tx={tx} />
          ))}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-border/40 bg-card/30 p-12 text-center backdrop-blur-xl">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          )}
        </div>

        {/* Load more */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="min-h-11 rounded-full border border-border bg-card/40 px-6 py-2.5 text-sm font-medium text-muted-foreground backdrop-blur transition-all hover:bg-card/60 hover:text-foreground"
          >
            Load more
          </button>
        </div>
      </div>
    </main>
  )
}