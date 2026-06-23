import {
    ShoppingBag,
    Plane,
    ArrowDownLeft,
    Coffee,
    Repeat,
  } from "lucide-react"
  
  const transactions = [
    {
      name: "Salary deposit",
      sub: "Acme Holdings · Today",
      amount: "+€8,200.00",
      positive: true,
      icon: ArrowDownLeft,
    },
    {
      name: "Net-a-Porter",
      sub: "Shopping · Yesterday",
      amount: "-€1,340.00",
      positive: false,
      icon: ShoppingBag,
    },
    {
      name: "Emirates Airlines",
      sub: "Travel · 2 days ago",
      amount: "-€2,910.50",
      positive: false,
      icon: Plane,
    },
    {
      name: "EUR → USDC",
      sub: "Exchange · 3 days ago",
      amount: "-€1,000.00",
      positive: false,
      icon: Repeat,
    },
    {
      name: "Blue Bottle Coffee",
      sub: "Dining · 3 days ago",
      amount: "-€12.40",
      positive: false,
      icon: Coffee,
    },
  ]
  
  export function Transactions() {
    return (
      <section className="rounded-3xl border border-border bg-card/60 p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Transactions</h3>
          <button
            type="button"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            See all
          </button>
        </div>
  
        <ul className="mt-4 flex flex-col gap-1">
          {transactions.map((tx) => (
            <li
              key={tx.name}
              className="flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-secondary/50"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-secondary/60 text-muted-foreground">
                <tx.icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {tx.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">{tx.sub}</p>
              </div>
              <p
                className={`text-sm font-semibold tabular-nums ${
                  tx.positive ? "text-positive" : "text-foreground"
                }`}
              >
                {tx.amount}
              </p>
            </li>
          ))}
        </ul>
      </section>
    )
  }
  