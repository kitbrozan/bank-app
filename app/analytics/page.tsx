"use client"

import { useState } from "react"
import { Bell, Settings, TrendingUp, TrendingDown, Wallet, ChevronLeft, ChevronRight } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// ── Types ───────────────────────────────────────────────
interface CashFlowPeriod {
  label: string
  income: number
  expense: number
}

// ── Mock data ───────────────────────────────────────────
const monthlyData = [
  { month: "Jan", income: 4200, expense: 3100 },
  { month: "Feb", income: 4800, expense: 2900 },
  { month: "Mar", income: 3900, expense: 3400 },
  { month: "Apr", income: 5200, expense: 2800 },
  { month: "May", income: 4600, expense: 3200 },
  { month: "Jun", income: 5800, expense: 3500 },
]

const categoryData = [
  { name: "Housing", value: 1200, color: "#d4a853" },      // gold
  { name: "Food", value: 650, color: "#34d399" },           // emerald
  { name: "Transport", value: 320, color: "#818cf8" },      // indigo
  { name: "Entertainment", value: 280, color: "#f472b6" }, // pink
  { name: "Utilities", value: 210, color: "#60a5fa" },     // blue
  { name: "Other", value: 340, color: "#a78bfa" },         // violet
]

const cashFlowPeriods: CashFlowPeriod[] = [
  { label: "Last 7 days", income: 1840, expense: 920 },
  { label: "Last 30 days", income: 7560, expense: 4100 },
  { label: "Last 3 months", income: 21400, expense: 11800 },
  { label: "Last 6 months", income: 45600, expense: 25200 },
  { label: "This year", income: 89200, expense: 47800 },
]

// ── Components ────────────────────────────────────────────
function StatCard({
  label,
  value,
  change,
  positive,
  icon: Icon,
  iconBg,
}: {
  label: string
  value: string
  change: string
  positive: boolean
  icon: React.ElementType
  iconBg: string
}) {
  return (
    <div className="rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-card/60 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1.5 text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`grid size-10 place-items-center rounded-xl ${iconBg} ring-1 ring-white/10`}>
          <Icon className="size-5 text-foreground" />
        </div>
      </div>
      <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${positive ? "text-positive" : "text-destructive"}`}>
        {positive ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
        {change}
      </div>
    </div>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null
  return (
    <div className="rounded-xl border border-border/60 bg-card/80 p-3 backdrop-blur-xl shadow-2xl">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      {payload.map((entry: any, idx: number) => (
        <p key={idx} className="mt-1 text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

function CustomPieTooltip({ active, payload }: any) {
  if (!active || !payload || !payload[0]) return null
  const data = payload[0].payload
  return (
    <div className="rounded-xl border border-border/60 bg-card/80 p-3 backdrop-blur-xl shadow-2xl">
      <p className="text-sm font-semibold" style={{ color: data.color }}>
        {data.name}
      </p>
      <p className="text-xs text-muted-foreground">${data.value.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground/70">
        {((data.value / categoryData.reduce((s, c) => s + c.value, 0)) * 100).toFixed(1)}%
      </p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────
export default function AnalyticsPage() {
  const [periodIndex, setPeriodIndex] = useState(1)
  const period = cashFlowPeriods[periodIndex]

  const totalBalance = "$7,567.83"
  const monthlyIn = "$5,800.00"
  const monthlyOut = "$3,500.00"

  return (
    <main className="bg-aurora min-h-screen w-full">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-gold/15 ring-1 ring-gold/30">
              <span className="font-mono text-sm font-bold text-gold">A</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Welcome back</p>
              <h1 className="text-lg font-semibold text-foreground">Alexander Voss</h1>
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
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Total Balance"
            value={totalBalance}
            change="+12.5% vs last month"
            positive
            icon={Wallet}
            iconBg="bg-gold/15"
          />
          <StatCard
            label="Monthly In"
            value={monthlyIn}
            change="+8.2% vs last month"
            positive
            icon={TrendingUp}
            iconBg="bg-positive/15"
          />
          <StatCard
            label="Monthly Out"
            value={monthlyOut}
            change="+3.1% vs last month"
            positive={false}
            icon={TrendingDown}
            iconBg="bg-destructive/15"
          />
        </div>

        {/* Charts row */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Line chart */}
          <div className="rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-xl transition-all duration-300 hover:bg-card/50 lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Income vs Expenses</h2>
                <p className="text-xs text-muted-foreground">Last 6 months</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-muted-foreground">Income</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-rose-400" />
                  <span className="text-xs text-muted-foreground">Expense</span>
                </div>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fb7185" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#fb7185" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#888", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#888", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${v / 1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#34d399"
                    strokeWidth={2.5}
                    fill="url(#incomeGrad)"
                    dot={{ r: 4, fill: "#34d399", stroke: "#0a0a0a", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "#34d399", stroke: "#0a0a0a", strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#fb7185"
                    strokeWidth={2.5}
                    fill="url(#expenseGrad)"
                    dot={{ r: 4, fill: "#fb7185", stroke: "#0a0a0a", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "#fb7185", stroke: "#0a0a0a", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie chart */}
          <div className="rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-xl transition-all duration-300 hover:bg-card/50 lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-foreground">Expenses by Category</h2>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
            <div className="flex h-72 items-center gap-4">
              <div className="h-full w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex w-1/2 flex-col gap-2.5">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-xs text-muted-foreground">{cat.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground">${cat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cash Flow block */}
        <div className="rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-card/50">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Cash Flow</h2>
              <p className="text-xs text-muted-foreground">Select period to view summary</p>
            </div>
            <div className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold ring-1 ring-gold/20">
              {period.label}
            </div>
          </div>

          {/* Slider */}
          <div className="mb-8">
            <div className="relative mb-4 flex items-center justify-between">
              {cashFlowPeriods.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setPeriodIndex(i)}
                  className={`text-xs transition-colors ${
                    i === periodIndex ? "font-semibold text-gold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="relative h-1.5 w-full rounded-full bg-muted/30">
              <div
                className="absolute h-full rounded-full bg-gradient-to-r from-gold to-emerald-400 transition-all duration-500"
                style={{
                  width: `${(periodIndex / (cashFlowPeriods.length - 1)) * 100}%`,
                }}
              />
              <input
                type="range"
                min={0}
                max={cashFlowPeriods.length - 1}
                step={1}
                value={periodIndex}
                onChange={(e) => setPeriodIndex(Number(e.target.value))}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              {/* Thumb markers */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-between">
                {cashFlowPeriods.map((_, i) => (
                  <div
                    key={i}
                    className={`size-3 rounded-full border-2 transition-all duration-300 ${
                      i === periodIndex
                        ? "border-gold bg-gold scale-110"
                        : "border-muted/50 bg-card"
                    }`}
                    style={{
                      position: "absolute",
                      left: `${(i / (cashFlowPeriods.length - 1)) * 100}%`,
                      transform: "translateX(-50%)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Cash flow stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border/30 bg-card/30 p-4 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Total Income</p>
              <p className="mt-1 text-xl font-bold text-positive">${period.income.toLocaleString()}</p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted/20">
                <div className="h-full rounded-full bg-positive transition-all duration-500" style={{ width: "75%" }} />
              </div>
            </div>
            <div className="rounded-xl border border-border/30 bg-card/30 p-4 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Total Expenses</p>
              <p className="mt-1 text-xl font-bold text-destructive">${period.expense.toLocaleString()}</p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted/20">
                <div className="h-full rounded-full bg-destructive transition-all duration-500" style={{ width: "55%" }} />
              </div>
            </div>
            <div className="rounded-xl border border-border/30 bg-card/30 p-4 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Net Cash Flow</p>
              <p className="mt-1 text-xl font-bold text-gold">${(period.income - period.expense).toLocaleString()}</p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted/20">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-500"
                  style={{ width: `${Math.min(((period.income - period.expense) / period.income) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}