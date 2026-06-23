"use client"

import { useState } from "react"
import { TrendingDown } from "lucide-react"

const data = [
  { day: "Mon", value: 320 },
  { day: "Tue", value: 540 },
  { day: "Wed", value: 410 },
  { day: "Thu", value: 720 },
  { day: "Fri", value: 880 },
  { day: "Sat", value: 1240 },
  { day: "Sun", value: 660 },
]

export function ExpensesChart() {
  const [active, setActive] = useState<number | null>(5)
  const max = Math.max(...data.map((d) => d.value))
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <section className="w-full min-w-0 rounded-3xl border border-border bg-card/60 p-4 backdrop-blur-xl sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground">My Expenses</h3>
          <p className="mt-1 text-lg font-semibold tabular-nums text-foreground sm:text-xl md:text-2xl">
            €{total.toLocaleString("en-US")}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
          <TrendingDown className="size-3.5 text-positive" />
          This week
        </span>
      </div>

      <div className="mt-4 flex h-32 items-end justify-between gap-1 sm:mt-6 sm:h-40 sm:gap-2">
        {data.map((d, i) => {
          const isActive = active === i
          return (
            <button
              key={d.day}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <span
                className={`text-[10px] font-semibold tabular-nums transition-opacity ${
                  isActive
                    ? "text-foreground opacity-100"
                    : "text-muted-foreground opacity-0 group-hover:opacity-100"
                }`}
              >
                €{d.value}
              </span>
              <span
                style={{ height: `${(d.value / max) * 100}%` }}
                className={`w-full rounded-t-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-t from-brand-blue to-brand-violet shadow-[0_0_18px_-4px_var(--brand-violet)]"
                    : "bg-secondary group-hover:bg-secondary/80"
                }`}
              />
              <span className="text-[11px] font-medium text-muted-foreground">
                {d.day}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
