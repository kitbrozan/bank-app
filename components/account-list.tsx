import { ChevronRight, Euro, CircleDollarSign } from "lucide-react"

const accounts = [
  {
    name: "Main",
    currency: "EUR",
    sub: "Personal current account",
    balance: "€102,380.40",
    delta: "+1.2%",
    icon: Euro,
    accent: "text-brand-blue bg-brand-blue/12 ring-brand-blue/25",
  },
  {
    name: "USDC",
    currency: "USD Coin",
    sub: "Stablecoin wallet",
    balance: "$26,070.32",
    delta: "+0.1%",
    icon: CircleDollarSign,
    accent: "text-gold bg-gold/12 ring-gold/25",
  },
]

export function AccountList() {
  return (
    <section className="w-full min-w-0 rounded-3xl border border-border bg-card/60 p-4 backdrop-blur-xl sm:p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Accounts</h3>
        <button
          type="button"
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Manage
        </button>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {accounts.map((acc) => (
          <li key={acc.name}>
            <button
              type="button"
              className="group flex w-full min-w-0 items-center gap-2 rounded-2xl border border-transparent bg-secondary/40 p-3 text-left transition-all hover:border-border hover:bg-secondary/70 sm:gap-3"
            >
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-xl ring-1 sm:size-11 ${acc.accent}`}
              >
                <acc.icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {acc.name}
                  </p>
                  <span className="shrink-0 rounded-md bg-background/60 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {acc.currency}
                  </span>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {acc.sub}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="max-w-[5.5rem] truncate text-xs font-semibold tabular-nums text-foreground sm:max-w-none sm:text-sm">
                  {acc.balance}
                </p>
                <p className="text-[10px] font-medium text-positive sm:text-xs">{acc.delta}</p>
              </div>
              <ChevronRight className="hidden size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 sm:block" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
