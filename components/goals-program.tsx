import { Target, Crown, Check } from "lucide-react"

export function MyGoalCard() {
  const current = 18400
  const target = 25000
  const pct = Math.round((current / target) * 100)

  return (
    <section className="w-full min-w-0 rounded-3xl border border-border bg-card/60 p-4 backdrop-blur-xl sm:p-5">
      <div className="flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-lg bg-brand-violet/15 text-brand-violet ring-1 ring-brand-violet/25">
          <Target className="size-4" />
        </span>
        <h3 className="text-sm font-semibold text-foreground">My Goal</h3>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">Dream Apartment</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-1 sm:mt-4">
        <p className="text-lg font-semibold tabular-nums text-foreground sm:text-xl md:text-2xl">
          €{current.toLocaleString("en-US")}
        </p>
        <p className="text-xs text-muted-foreground">
          of €{target.toLocaleString("en-US")}
        </p>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-violet to-brand-blue"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs font-medium text-brand-violet">
        {pct}% reached · €{(target - current).toLocaleString("en-US")} to go
      </p>
    </section>
  )
}

const perks = ["Priority concierge", "0% FX fees", "Airport lounges"]

export function MyProgramCard() {
  return (
    <section className="relative w-full min-w-0 overflow-hidden rounded-3xl border border-gold/30 bg-card/60 p-4 backdrop-blur-xl sm:p-5">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gold/10 blur-2xl"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-gold/15 text-gold ring-1 ring-gold/25">
            <Crown className="size-4" />
          </span>
          <h3 className="text-sm font-semibold text-foreground">My Program</h3>
        </div>
        <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold ring-1 ring-gold/25">
          Infinite
        </span>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">Tier progress</p>
      <p className="text-lg font-semibold text-foreground sm:text-xl md:text-2xl">8,420 pts</p>

      <ul className="mt-4 flex flex-col gap-2">
        {perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2 text-sm text-foreground"
          >
            <span className="grid size-5 place-items-center rounded-full bg-gold/15 text-gold">
              <Check className="size-3" />
            </span>
            {perk}
          </li>
        ))}
      </ul>
    </section>
  )
}
