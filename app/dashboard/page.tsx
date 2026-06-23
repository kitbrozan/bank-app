import { Bell, Settings } from "lucide-react"
import { BalanceCard } from "@/components/balance-card"
import { AccountList } from "@/components/account-list"
import { MyGoalCard, MyProgramCard } from "@/components/goals-program"
import { ExpensesChart } from "@/components/expenses-chart"
import { Transactions } from "@/components/transactions"

export default function Page() {
  return (
    <main className="bg-aurora min-h-screen w-full">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
        {/* header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-gold/15 ring-1 ring-gold/30">
              <span className="font-mono text-sm font-bold text-gold">A</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Welcome back</p>
              <h1 className="text-lg font-semibold text-foreground">
                Alexander Voss
              </h1>
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

        {/* main grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <BalanceCard />
            <AccountList />
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <MyGoalCard />
              <MyProgramCard />
            </div>
            <ExpensesChart />
            <Transactions />
          </div>
        </div>
      </div>
    </main>
  )
}
