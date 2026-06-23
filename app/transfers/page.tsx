"use client"

import { useState } from "react"
import {
  Bell,
  Settings,
  ArrowRightLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
  User,
  Clock,
  Star,
  Plus,
  ChevronRight,
  Shield,
  Zap,
  Globe,
  CreditCard,
  Wallet,
  Landmark,
  Smartphone,
  Check,
  X,
  ChevronDown,
} from "lucide-react"

// ── Types ───────────────────────────────────────────────
interface Account {
  id: string
  name: string
  number: string
  balance: number
  currency: string
  icon: React.ElementType
  color: string
}

interface Contact {
  id: string
  name: string
  initials: string
  gradient: string
  recentAmount?: string
  isFavorite: boolean
}

interface TransferMethod {
  id: string
  title: string
  description: string
  icon: React.ElementType
  color: string
  badge?: string
}

interface RecentTransfer {
  id: string
  from: string
  to: string
  amount: number
  currency: string
  date: string
  status: "completed" | "pending" | "failed"
}

// ── Mock data ───────────────────────────────────────────
const accounts: Account[] = [
  { id: "1", name: "Main Account", number: "**** 4521", balance: 7567.83, currency: "$", icon: Wallet, color: "from-gold/20 to-amber-500/20" },
  { id: "2", name: "Savings", number: "**** 8893", balance: 12400.0, currency: "$", icon: Landmark, color: "from-emerald-500/20 to-teal-500/20" },
  { id: "3", name: "Business", number: "**** 1102", balance: 3420.5, currency: "$", icon: Building2, color: "from-violet-500/20 to-purple-500/20" },
  { id: "4", name: "Crypto Wallet", number: "**** 7734", balance: 1850.0, currency: "$", icon: Zap, color: "from-orange-500/20 to-red-500/20" },
]

const contacts: Contact[] = [
  { id: "1", name: "Sarah Miller", initials: "SM", gradient: "from-rose-500/80 to-pink-500/80", recentAmount: "$120", isFavorite: true },
  { id: "2", name: "James Wilson", initials: "JW", gradient: "from-sky-500/80 to-blue-500/80", recentAmount: "$45", isFavorite: true },
  { id: "3", name: "Emma Chen", initials: "EC", gradient: "from-emerald-500/80 to-teal-500/80", recentAmount: "$250", isFavorite: false },
  { id: "4", name: "Marcus Johnson", initials: "MJ", gradient: "from-amber-500/80 to-yellow-500/80", recentAmount: "$80", isFavorite: false },
  { id: "5", name: "Lisa Park", initials: "LP", gradient: "from-violet-500/80 to-purple-500/80", recentAmount: "$340", isFavorite: true },
  { id: "6", name: "David Brown", initials: "DB", gradient: "from-orange-500/80 to-red-500/80", isFavorite: false },
]

const transferMethods: TransferMethod[] = [
  { id: "between", title: "Between My Accounts", description: "Move money between your accounts instantly", icon: ArrowRightLeft, color: "bg-gold/15 text-gold", badge: "Free" },
  { id: "someone", title: "Send to Someone", description: "Transfer to a person using phone or email", icon: User, color: "bg-positive/15 text-positive" },
  { id: "bank", title: "From Another Bank", description: "Link and pull funds from external accounts", icon: Building2, color: "bg-brand-blue/15 text-brand-blue" },
  { id: "international", title: "International", description: "Send money abroad with low fees", icon: Globe, color: "bg-brand-violet/15 text-brand-violet", badge: "SWIFT" },
  { id: "card", title: "Card Transfer", description: "Send to any card number worldwide", icon: CreditCard, color: "bg-rose-500/15 text-rose-400" },
  { id: "phone", title: "Phone Number", description: "Send via phone number or QR code", icon: Smartphone, color: "bg-amber-500/15 text-amber-400" },
]

const recentTransfers: RecentTransfer[] = [
  { id: "1", from: "Main Account", to: "Sarah Miller", amount: 120, currency: "$", date: "Today, 14:32", status: "completed" },
  { id: "2", from: "Savings", to: "James Wilson", amount: 45, currency: "$", date: "Yesterday, 09:15", status: "completed" },
  { id: "3", from: "Main Account", to: "Electric Bill", amount: 89.2, currency: "$", date: "Jun 19, 10:30", status: "completed" },
  { id: "4", from: "Business", to: "Emma Chen", amount: 250, currency: "$", date: "Jun 18, 16:45", status: "pending" },
  { id: "5", from: "Main Account", to: "Crypto Wallet", amount: 500, currency: "$", date: "Jun 15, 11:20", status: "completed" },
]

// ── Components ────────────────────────────────────────────
function AccountCard({ account, selected, onClick }: { account: Account; selected: boolean; onClick: () => void }) {
  const Icon = account.icon
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${
        selected
          ? "border-gold/40 bg-gold/10 shadow-[0_0_20px_rgba(212,168,83,0.15)]"
          : "border-border/40 bg-card/40 hover:bg-card/60 hover:-translate-y-0.5"
      } backdrop-blur-xl`}
    >
      <div className={`grid size-11 place-items-center rounded-xl bg-gradient-to-br ${account.color} ring-1 ring-white/10`}>
        <Icon className="size-5 text-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{account.name}</p>
        <p className="text-xs text-muted-foreground">{account.number}</p>
      </div>
      <p className="text-sm font-bold text-foreground">{account.currency}{account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
      {selected && (
        <div className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-black">
          <Check className="size-3" />
        </div>
      )}
    </button>
  )
}

function TransferMethodCard({ method, onClick }: { method: TransferMethod; onClick: () => void }) {
  const Icon = method.icon
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 rounded-2xl border border-border/40 bg-card/40 p-4 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-card/60 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
    >
      <div className={`grid size-12 shrink-0 place-items-center rounded-xl ${method.color} ring-1 ring-white/10 transition-transform group-hover:scale-105`}>
        <Icon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{method.title}</p>
          {method.badge && (
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-medium text-gold ring-1 ring-gold/20">
              {method.badge}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{method.description}</p>
      </div>
      <ChevronRight className="size-4 text-muted-foreground/50 transition-colors group-hover:text-foreground" />
    </button>
  )
}

function ContactAvatar({ contact, onClick }: { contact: Contact; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-2 transition-transform hover:scale-105"
    >
      <div
        className={`grid size-14 place-items-center rounded-full bg-gradient-to-br ${contact.gradient} ring-2 ring-white/10 shadow-lg transition-shadow group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
      >
        <span className="text-sm font-bold text-white/90">{contact.initials}</span>
      </div>
      <p className="max-w-[4.5rem] truncate text-xs text-muted-foreground transition-colors group-hover:text-foreground">
        {contact.name}
      </p>
      {contact.recentAmount && (
        <p className="text-[10px] text-muted-foreground/60">{contact.recentAmount}</p>
      )}
    </button>
  )
}

function RecentTransferRow({ transfer }: { transfer: RecentTransfer }) {
  const statusColors = {
    completed: "text-positive",
    pending: "text-amber-400",
    failed: "text-destructive",
  }
  const statusBg = {
    completed: "bg-positive/10",
    pending: "bg-amber-400/10",
    failed: "bg-destructive/10",
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border/40 bg-card/40 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-card/60">
      <div className="grid size-10 place-items-center rounded-full bg-muted/30">
        {transfer.status === "completed" ? (
          <ArrowUpRight className="size-4 text-destructive" />
        ) : transfer.status === "pending" ? (
          <Clock className="size-4 text-amber-400" />
        ) : (
          <X className="size-4 text-destructive" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{transfer.to}</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusBg[transfer.status]} ${statusColors[transfer.status]}`}>
            {transfer.status}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          From {transfer.from} · {transfer.date}
        </p>
      </div>
      <p className="text-sm font-bold text-foreground">{transfer.currency}{transfer.amount.toFixed(2)}</p>
    </div>
  )
}

function QuickAmount({ amount, selected, onClick }: { amount: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
        selected
          ? "bg-gold/15 text-gold ring-1 ring-gold/30"
          : "border border-border/40 bg-card/40 text-muted-foreground hover:text-foreground"
      }`}
    >
      {amount}
    </button>
  )
}

// ── Page ──────────────────────────────────────────────────
export default function TransferPage() {
  const [selectedFrom, setSelectedFrom] = useState("1")
  const [selectedTo, setSelectedTo] = useState("2")
  const [amount, setAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const fromAccount = accounts.find((a) => a.id === selectedFrom)
  const toAccount = accounts.find((a) => a.id === selectedTo)

  const favorites = contacts.filter((c) => c.isFavorite)
  const frequent = contacts.filter((c) => !c.isFavorite && c.recentAmount)
  const allOthers = contacts.filter((c) => !c.isFavorite && !c.recentAmount)

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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Left column — Transfer actions */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            {/* Transfer methods */}
            <div>
              <h2 className="mb-4 text-sm font-semibold text-foreground">Transfer Methods</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {transferMethods.map((method) => (
                  <TransferMethodCard
                    key={method.id}
                    method={method}
                    onClick={() => setSelectedMethod(method.id)}
                  />
                ))}
              </div>
            </div>

            {/* Between accounts */}
            <div className="rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Between My Accounts</h2>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Shield className="size-3 text-positive" />
                  Secure
                </div>
              </div>

              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <p className="mb-2 text-xs text-muted-foreground">From</p>
                  <div className="flex flex-col gap-2">
                    {accounts.slice(0, 2).map((account) => (
                      <AccountCard
                        key={account.id}
                        account={account}
                        selected={selectedFrom === account.id}
                        onClick={() => setSelectedFrom(account.id)}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid size-10 place-items-center self-center rounded-full bg-gold/10 ring-1 ring-gold/20">
                  <ArrowRightLeft className="size-4 text-gold" />
                </div>
                <div className="flex-1">
                  <p className="mb-2 text-xs text-muted-foreground">To</p>
                  <div className="flex flex-col gap-2">
                    {accounts.slice(2).map((account) => (
                      <AccountCard
                        key={account.id}
                        account={account}
                        selected={selectedTo === account.id}
                        onClick={() => setSelectedTo(account.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Amount input */}
              <div className="mb-4">
                <p className="mb-2 text-xs text-muted-foreground">Amount</p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-muted-foreground">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-11 w-full rounded-2xl border border-border/60 bg-card/60 pl-10 pr-4 text-lg font-bold text-foreground placeholder:text-muted-foreground/30 backdrop-blur outline-none transition-all focus:border-gold/30 focus:ring-1 focus:ring-gold/20 sm:h-14 sm:text-2xl"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["$50", "$100", "$250", "$500", "$1,000"].map((a) => (
                    <QuickAmount
                      key={a}
                      amount={a}
                      selected={amount === a.replace(/[$,]/g, "")}
                      onClick={() => setAmount(a.replace(/[$,]/g, ""))}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowConfirm(true)}
                disabled={!amount || Number(amount) <= 0}
                className="w-full rounded-2xl bg-gold/15 py-3.5 text-sm font-semibold text-gold ring-1 ring-gold/30 transition-all hover:bg-gold/25 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Transfer {amount ? `$${Number(amount).toFixed(2)}` : ""}
              </button>
            </div>

            {/* Send to someone */}
            <div className="rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Send to Someone</h2>
                <button className="flex items-center gap-1 rounded-full bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold ring-1 ring-gold/20 transition-all hover:bg-gold/20">
                  <Plus className="size-3" />
                  New contact
                </button>
              </div>

              {/* Favorites */}
              {favorites.length > 0 && (
                <div className="mb-5">
                  <p className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Star className="size-3 text-gold" />
                    Favorites
                  </p>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {favorites.map((contact) => (
                      <ContactAvatar key={contact.id} contact={contact} />
                    ))}
                  </div>
                </div>
              )}

              {/* Frequent */}
              {frequent.length > 0 && (
                <div>
                  <p className="mb-3 text-xs text-muted-foreground">Frequent</p>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {frequent.map((contact) => (
                      <ContactAvatar key={contact.id} contact={contact} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column — Recent & scheduled */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {/* Recent transfers */}
            <div className="rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Recent Transfers</h2>
                <button className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                  View all
                </button>
              </div>
              <div className="flex flex-col gap-2.5">
                {recentTransfers.map((transfer) => (
                  <RecentTransferRow key={transfer.id} transfer={transfer} />
                ))}
              </div>
            </div>

            {/* Scheduled transfers */}
            <div className="rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Scheduled</h2>
                <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold ring-1 ring-gold/20">
                  2 active
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-border/30 bg-card/30 p-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-rose-500/15">
                    <Clock className="size-4 text-rose-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">Rent Payment</p>
                    <p className="text-xs text-muted-foreground">Monthly · 1st of month</p>
                  </div>
                  <p className="text-sm font-bold text-foreground">$1,200</p>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border/30 bg-card/30 p-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-sky-500/15">
                    <Building2 className="size-4 text-sky-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">Savings Auto-Transfer</p>
                    <p className="text-xs text-muted-foreground">Weekly · Every Monday</p>
                  </div>
                  <p className="text-sm font-bold text-foreground">$200</p>
                </div>
              </div>
            </div>

            {/* Transfer limits */}
            <div className="rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-xl">
              <h2 className="mb-4 text-sm font-semibold text-foreground">Transfer Limits</h2>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Daily limit</span>
                    <span className="text-foreground">$8,500 / $10,000</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/20">
                    <div className="h-full rounded-full bg-gold transition-all" style={{ width: "85%" }} />
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Monthly limit</span>
                    <span className="text-foreground">$34,200 / $50,000</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/20">
                    <div className="h-full rounded-full bg-positive transition-all" style={{ width: "68%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-4">
          <div className="max-h-[90vh] w-[92vw] max-w-md overflow-y-auto rounded-3xl border border-border/60 bg-card/90 p-5 backdrop-blur-xl shadow-2xl sm:p-6">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-gold/15 ring-1 ring-gold/30">
                <ArrowRightLeft className="size-7 text-gold" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Confirm Transfer</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {fromAccount?.name} → {toAccount?.name}
              </p>
            </div>
            <div className="mb-6 rounded-2xl border border-border/40 bg-card/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-lg font-bold text-foreground sm:text-xl">${Number(amount).toFixed(2)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Fee</span>
                <span className="text-positive">Free</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="min-h-11 flex-1 rounded-2xl border border-border/60 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-card/60 hover:text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowConfirm(false); setAmount("") }}
                className="min-h-11 flex-1 rounded-2xl bg-gold/15 py-3 text-sm font-semibold text-gold ring-1 ring-gold/30 transition-all hover:bg-gold/25"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}