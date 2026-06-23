"use client"

import { useState } from "react"
import {
  Bell,
  Settings,
  ChevronRight,
  User,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Fingerprint,
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Check,
  LogOut,
  Trash2,
  ChevronDown,
  Lock,
  Mail,
  Phone,
  MapPin,
  FileText,
  HelpCircle,
  MessageSquare,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  RefreshCw,
  Download,
  Plus,
} from "lucide-react"

// ── Types ───────────────────────────────────────────────
interface ToggleProps {
  enabled: boolean
  onChange: () => void
}

interface SettingRowProps {
  icon: React.ElementType
  iconColor: string
  title: string
  subtitle?: string
  action?: React.ReactNode
  onClick?: () => void
  danger?: boolean
}

// ── Mock data ───────────────────────────────────────────
const cards = [
  { id: "1", name: "Visa Platinum", number: "**** 4521", expiry: "09/27", type: "visa", color: "from-gold/20 to-amber-500/20", isDefault: true },
  { id: "2", name: "Mastercard Gold", number: "**** 8893", expiry: "12/26", type: "mastercard", color: "from-violet-500/20 to-purple-500/20", isDefault: false },
]

const devices = [
  { id: "1", name: "iPhone 15 Pro", location: "New York, USA", lastActive: "Active now", isCurrent: true },
  { id: "2", name: "MacBook Pro", location: "New York, USA", lastActive: "2 hours ago", isCurrent: false },
  { id: "3", name: "iPad Air", location: "Boston, USA", lastActive: "3 days ago", isCurrent: false },
]

const loginHistory = [
  { id: "1", device: "iPhone 15 Pro", location: "New York, USA", time: "Today, 14:32", status: "success" },
  { id: "2", device: "MacBook Pro", location: "New York, USA", time: "Yesterday, 09:15", status: "success" },
  { id: "3", device: "Chrome — Windows", location: "London, UK", time: "Jun 20, 18:45", status: "failed" },
]

// ── Components ────────────────────────────────────────────
function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
        enabled ? "bg-gold" : "bg-muted/40"
      }`}
    >
      <div
        className={`absolute top-0.5 size-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
          enabled ? "translate-x-5.5" : "translate-x-0.5"
        }`}
      />
    </button>
  )
}

function SettingRow({ icon: Icon, iconColor, title, subtitle, action, onClick, danger }: SettingRowProps) {
  const Wrapper = onClick ? "button" : "div"
  const wrapperProps = onClick
    ? { onClick, className: "flex min-h-11 w-full min-w-0 items-center gap-3 rounded-2xl border border-border/40 bg-card/40 p-4 text-left backdrop-blur-xl transition-all duration-300 hover:bg-card/60 cursor-pointer sm:gap-4" + (danger ? " hover:border-destructive/30 hover:bg-destructive/5" : "") }
    : { className: "flex min-h-11 w-full min-w-0 items-center gap-3 rounded-2xl border border-border/40 bg-card/40 p-4 backdrop-blur-xl sm:gap-4" + (danger ? " hover:border-destructive/30 hover:bg-destructive/5" : "") }

  return (
    <Wrapper {...wrapperProps}>
      <div className={`grid size-10 shrink-0 place-items-center rounded-xl ${iconColor} ring-1 ring-white/10`}>
        <Icon className={`size-4 ${danger ? "text-destructive" : "text-foreground"}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-medium ${danger ? "text-destructive" : "text-foreground"}`}>{title}</p>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {action || (onClick && <ChevronRight className="size-4 text-muted-foreground/50" />)}
    </Wrapper>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  )
}

function CardItem({ card }: { card: typeof cards[0] }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex w-full min-w-0 items-center gap-3 rounded-2xl border border-border/40 bg-card/40 p-4 backdrop-blur-xl transition-all duration-300 hover:bg-card/60 sm:gap-4">
      <div className={`grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${card.color} ring-1 ring-white/10`}>
        <CreditCard className="size-5 text-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{card.name}</p>
          {card.isDefault && (
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-medium text-gold ring-1 ring-gold/20">
              Default
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{card.number} · Exp {card.expiry}</p>
      </div>
      <button
        onClick={handleCopy}
        className="grid size-8 place-items-center rounded-full bg-muted/20 text-muted-foreground transition-colors hover:text-foreground"
      >
        {copied ? <Check className="size-3.5 text-positive" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  )
}

function DeviceItem({ device }: { device: typeof devices[0] }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border/40 bg-card/40 p-4 backdrop-blur-xl">
      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-blue/15 ring-1 ring-white/10">
        <Smartphone className="size-4 text-brand-blue" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{device.name}</p>
          {device.isCurrent && (
            <span className="rounded-full bg-positive/15 px-2 py-0.5 text-[10px] font-medium text-positive ring-1 ring-positive/20">
              Current
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{device.location} · {device.lastActive}</p>
      </div>
      {!device.isCurrent && (
        <button className="text-xs font-medium text-destructive transition-colors hover:text-destructive/80">
          Revoke
        </button>
      )}
    </div>
  )
}

function LoginHistoryRow({ entry }: { entry: typeof loginHistory[0] }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border/40 bg-card/40 p-4 backdrop-blur-xl">
      <div className={`grid size-10 shrink-0 place-items-center rounded-xl ring-1 ring-white/10 ${
        entry.status === "success" ? "bg-positive/15" : "bg-destructive/15"
      }`}>
        {entry.status === "success" ? (
          <Check className="size-4 text-positive" />
        ) : (
          <AlertTriangle className="size-4 text-destructive" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{entry.device}</p>
        <p className="text-xs text-muted-foreground">{entry.location} · {entry.time}</p>
      </div>
      <span className={`text-xs font-medium ${entry.status === "success" ? "text-positive" : "text-destructive"}`}>
        {entry.status === "success" ? "Success" : "Failed"}
      </span>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "payments" | "preferences" | "support">("profile")
  const [notifications, setNotifications] = useState({ push: true, email: true, sms: false, marketing: false })
  const [biometric, setBiometric] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [twoFA, setTwoFA] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "security" as const, label: "Security", icon: Shield },
    { id: "payments" as const, label: "Payments", icon: CreditCard },
    { id: "preferences" as const, label: "Preferences", icon: Settings },
    { id: "support" as const, label: "Support", icon: HelpCircle },
  ]

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

        {/* Profile banner */}
        <div className="mb-6 flex w-full min-w-0 flex-col gap-4 rounded-2xl border border-border/40 bg-card/40 p-4 backdrop-blur-xl sm:mb-8 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
          <div className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold/30 to-amber-500/30 ring-2 ring-gold/30 shadow-[0_0_30px_rgba(212,168,83,0.15)] sm:size-16">
            <span className="text-base font-bold text-gold sm:text-lg">AV</span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-foreground sm:text-lg">Alexander Voss</h2>
            <p className="text-sm text-muted-foreground">alex.voss@email.com · Premium Member</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-positive/15 px-2.5 py-0.5 text-[10px] font-medium text-positive ring-1 ring-positive/20">
                Verified
              </span>
              <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-medium text-gold ring-1 ring-gold/20">
                Since 2021
              </span>
            </div>
          </div>
          <button className="min-h-11 w-full shrink-0 rounded-full bg-gold/15 px-4 py-2.5 text-sm font-medium text-gold ring-1 ring-gold/30 transition-all hover:bg-gold/25 sm:w-auto">
            Edit Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mb-8 [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-all sm:px-5 ${
                  activeTab === tab.id
                    ? "bg-gold/15 text-gold ring-1 ring-gold/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* ── PROFILE TAB ── */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Section title="Personal Information">
                <SettingRow
                  icon={User}
                  iconColor="bg-gold/15"
                  title="Full Name"
                  subtitle="Alexander Voss"
                  onClick={() => {}}
                />
                <SettingRow
                  icon={Mail}
                  iconColor="bg-brand-blue/15"
                  title="Email Address"
                  subtitle="alex.voss@email.com"
                  onClick={() => {}}
                />
                <SettingRow
                  icon={Phone}
                  iconColor="bg-positive/15"
                  title="Phone Number"
                  subtitle="+1 (555) 123-4567"
                  onClick={() => {}}
                />
                <SettingRow
                  icon={MapPin}
                  iconColor="bg-rose-500/15"
                  title="Address"
                  subtitle="123 Finance St, New York, NY 10001"
                  onClick={() => {}}
                />
              </Section>

              <Section title="Account Details">
                <SettingRow
                  icon={FileText}
                  iconColor="bg-violet-500/15"
                  title="Account ID"
                  subtitle="ACC-7842-9910-5533"
                  action={
                    <button className="grid size-8 place-items-center rounded-full bg-muted/20 text-muted-foreground transition-colors hover:text-foreground">
                      <Copy className="size-3.5" />
                    </button>
                  }
                />
                <SettingRow
                  icon={Globe}
                  iconColor="bg-sky-500/15"
                  title="Timezone"
                  subtitle="America/New_York (UTC-4)"
                  onClick={() => {}}
                />
              </Section>
            </div>

            <div>
              <Section title="KYC Verification">
                <div className="rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-xl bg-positive/15 ring-1 ring-white/10">
                        <Shield className="size-4 text-positive" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Identity Verified</p>
                        <p className="text-xs text-muted-foreground">Level 3 — Full Access</p>
                      </div>
                    </div>
                    <Check className="size-5 text-positive" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-card/60 p-3">
                      <div className="flex items-center gap-2">
                        <Check className="size-3.5 text-positive" />
                        <span className="text-xs text-foreground">Government ID</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">Jun 15, 2023</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-card/60 p-3">
                      <div className="flex items-center gap-2">
                        <Check className="size-3.5 text-positive" />
                        <span className="text-xs text-foreground">Proof of Address</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">Jun 15, 2023</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-card/60 p-3">
                      <div className="flex items-center gap-2">
                        <Check className="size-3.5 text-positive" />
                        <span className="text-xs text-foreground">Selfie Verification</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">Jun 15, 2023</span>
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="Connected Accounts">
                <SettingRow
                  icon={Globe}
                  iconColor="bg-brand-blue/15"
                  title="Google"
                  subtitle="Connected"
                  action={<Toggle enabled={true} onChange={() => {}} />}
                />
                <SettingRow
                  icon={Globe}
                  iconColor="bg-sky-500/15"
                  title="Apple ID"
                  subtitle="Connected"
                  action={<Toggle enabled={true} onChange={() => {}} />}
                />
              </Section>
            </div>
          </div>
        )}

        {/* ── SECURITY TAB ── */}
        {activeTab === "security" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Section title="Authentication">
                <SettingRow
                  icon={Lock}
                  iconColor="bg-gold/15"
                  title="Change Password"
                  subtitle="Last changed 3 months ago"
                  onClick={() => {}}
                />
                <SettingRow
                  icon={KeyRound}
                  iconColor="bg-positive/15"
                  title="Two-Factor Authentication"
                  subtitle="Enabled via Authenticator app"
                  action={<Toggle enabled={twoFA} onChange={() => setTwoFA(!twoFA)} />}
                />
                <SettingRow
                  icon={Fingerprint}
                  iconColor="bg-brand-violet/15"
                  title="Biometric Login"
                  subtitle="Face ID & Touch ID"
                  action={<Toggle enabled={biometric} onChange={() => setBiometric(!biometric)} />}
                />
                <SettingRow
                  icon={Eye}
                  iconColor="bg-brand-blue/15"
                  title="API Access Key"
                  subtitle={showApiKey ? "sk_live_51Hx9...Kj2m" : "••••••••••••••••"}
                  action={
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="grid size-8 place-items-center rounded-full bg-muted/20 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {showApiKey ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                      </button>
                      <button className="grid size-8 place-items-center rounded-full bg-muted/20 text-muted-foreground transition-colors hover:text-foreground">
                        <RefreshCw className="size-3.5" />
                      </button>
                    </div>
                  }
                />
              </Section>

              <Section title="Active Sessions">
                {devices.map((device) => (
                  <DeviceItem key={device.id} device={device} />
                ))}
              </Section>
            </div>

            <div>
              <Section title="Login History">
                {loginHistory.map((entry) => (
                  <LoginHistoryRow key={entry.id} entry={entry} />
                ))}
              </Section>

              <Section title="Security Alerts">
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 backdrop-blur-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
                    <div>
                      <p className="text-sm font-medium text-destructive">Suspicious Login Attempt</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Failed login from London, UK on Jun 20. If this wasn't you, change your password immediately.
                      </p>
                      <button className="mt-2 text-xs font-medium text-destructive underline underline-offset-2">
                        Review Activity
                      </button>
                    </div>
                  </div>
                </div>
              </Section>
            </div>
          </div>
        )}

        {/* ── PAYMENTS TAB ── */}
        {activeTab === "payments" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Section title="My Cards">
                {cards.map((card) => (
                  <CardItem key={card.id} card={card} />
                ))}
                <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border/60 bg-card/20 py-4 text-xs font-medium text-muted-foreground transition-all hover:border-gold/30 hover:text-gold">
                  <Plus className="size-4" />
                  Add New Card
                </button>
              </Section>

              <Section title="Transfer Limits">
                <div className="rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-xl">
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Daily Transfer</span>
                        <span className="text-xs font-semibold text-foreground">$8,500 / $10,000</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted/20">
                        <div className="h-full rounded-full bg-gold transition-all" style={{ width: "85%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Monthly Transfer</span>
                        <span className="text-xs font-semibold text-foreground">$34,200 / $50,000</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted/20">
                        <div className="h-full rounded-full bg-positive transition-all" style={{ width: "68%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">International Monthly</span>
                        <span className="text-xs font-semibold text-foreground">$2,100 / $5,000</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted/20">
                        <div className="h-full rounded-full bg-brand-blue transition-all" style={{ width: "42%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            </div>

            <div>
              <Section title="Payment Preferences">
                <SettingRow
                  icon={CreditCard}
                  iconColor="bg-gold/15"
                  title="Default Payment Method"
                  subtitle="Visa Platinum **** 4521"
                  onClick={() => {}}
                />
                <SettingRow
                  icon={RefreshCw}
                  iconColor="bg-positive/15"
                  title="Auto-Pay Bills"
                  subtitle="3 active subscriptions"
                  action={<Toggle enabled={true} onChange={() => {}} />}
                />
                <SettingRow
                  icon={Globe}
                  iconColor="bg-brand-violet/15"
                  title="Currency"
                  subtitle="USD ($) — Primary"
                  onClick={() => {}}
                />
              </Section>

              <Section title="Statements & Reports">
                <SettingRow
                  icon={FileText}
                  iconColor="bg-sky-500/15"
                  title="Monthly Statements"
                  subtitle="Auto-generated on 1st of month"
                  onClick={() => {}}
                />
                <SettingRow
                  icon={Download}
                  iconColor="bg-emerald-500/15"
                  title="Export Transaction History"
                  subtitle="CSV, PDF, or Excel"
                  onClick={() => {}}
                />
                <SettingRow
                  icon={FileText}
                  iconColor="bg-amber-500/15"
                  title="Tax Documents"
                  subtitle="2024 Form 1099-INT available"
                  onClick={() => {}}
                />
              </Section>
            </div>
          </div>
        )}

        {/* ── PREFERENCES TAB ── */}
        {activeTab === "preferences" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Section title="Notifications">
                <SettingRow
                  icon={Bell}
                  iconColor="bg-gold/15"
                  title="Push Notifications"
                  subtitle="Transaction alerts & updates"
                  action={<Toggle enabled={notifications.push} onChange={() => setNotifications({ ...notifications, push: !notifications.push })} />}
                />
                <SettingRow
                  icon={Mail}
                  iconColor="bg-brand-blue/15"
                  title="Email Notifications"
                  subtitle="Monthly summaries & security"
                  action={<Toggle enabled={notifications.email} onChange={() => setNotifications({ ...notifications, email: !notifications.email })} />}
                />
                <SettingRow
                  icon={MessageSquare}
                  iconColor="bg-positive/15"
                  title="SMS Alerts"
                  subtitle="Large transactions & logins"
                  action={<Toggle enabled={notifications.sms} onChange={() => setNotifications({ ...notifications, sms: !notifications.sms })} />}
                />
                <SettingRow
                  icon={Globe}
                  iconColor="bg-violet-500/15"
                  title="Marketing Emails"
                  subtitle="Offers & product updates"
                  action={<Toggle enabled={notifications.marketing} onChange={() => setNotifications({ ...notifications, marketing: !notifications.marketing })} />}
                />
              </Section>

              <Section title="Appearance">
                <SettingRow
                  icon={Moon}
                  iconColor="bg-brand-violet/15"
                  title="Dark Mode"
                  subtitle="Always on dark theme"
                  action={<Toggle enabled={darkMode} onChange={() => setDarkMode(!darkMode)} />}
                />
                <SettingRow
                  icon={Globe}
                  iconColor="bg-sky-500/15"
                  title="Language"
                  subtitle="English (US)"
                  onClick={() => {}}
                />
              </Section>
            </div>

            <div>
              <Section title="Privacy">
                <SettingRow
                  icon={Eye}
                  iconColor="bg-gold/15"
                  title="Hide Balance"
                  subtitle="Mask amounts on dashboard"
                  action={<Toggle enabled={false} onChange={() => {}} />}
                />
                <SettingRow
                  icon={Shield}
                  iconColor="bg-positive/15"
                  title="Data Sharing"
                  subtitle="Share anonymized data for improvements"
                  action={<Toggle enabled={true} onChange={() => {}} />}
                />
                <SettingRow
                  icon={Globe}
                  iconColor="bg-brand-blue/15"
                  title="Location Services"
                  subtitle="For fraud detection & ATMs"
                  action={<Toggle enabled={true} onChange={() => {}} />}
                />
              </Section>

              <Section title="Data & Storage">
                <SettingRow
                  icon={Download}
                  iconColor="bg-emerald-500/15"
                  title="Download My Data"
                  subtitle="Export all your personal data"
                  onClick={() => {}}
                />
                <SettingRow
                  icon={Trash2}
                  iconColor="bg-destructive/15"
                  title="Clear Cache"
                  subtitle="Free up 24.5 MB"
                  onClick={() => {}}
                />
              </Section>
            </div>
          </div>
        )}

        {/* ── SUPPORT TAB ── */}
        {activeTab === "support" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Section title="Help Center">
                <SettingRow
                  icon={HelpCircle}
                  iconColor="bg-gold/15"
                  title="FAQs"
                  subtitle="Common questions & answers"
                  onClick={() => {}}
                />
                <SettingRow
                  icon={MessageSquare}
                  iconColor="bg-positive/15"
                  title="Live Chat"
                  subtitle="Average response: 2 min"
                  onClick={() => {}}
                />
                <SettingRow
                  icon={Phone}
                  iconColor="bg-brand-blue/15"
                  title="Call Support"
                  subtitle="+1 (800) 555-0199 · 24/7"
                  onClick={() => {}}
                />
                <SettingRow
                  icon={Mail}
                  iconColor="bg-violet-500/15"
                  title="Email Support"
                  subtitle="support@aurorabank.com"
                  onClick={() => {}}
                />
              </Section>

              <Section title="Legal">
                <SettingRow
                  icon={FileText}
                  iconColor="bg-sky-500/15"
                  title="Terms of Service"
                  subtitle="Last updated: Jan 2024"
                  onClick={() => {}}
                />
                <SettingRow
                  icon={Shield}
                  iconColor="bg-positive/15"
                  title="Privacy Policy"
                  subtitle="How we handle your data"
                  onClick={() => {}}
                />
                <SettingRow
                  icon={FileText}
                  iconColor="bg-amber-500/15"
                  title="Cookie Policy"
                  subtitle="Manage cookie preferences"
                  onClick={() => {}}
                />
              </Section>
            </div>

            <div>
              <Section title="Account Actions">
                <div className="rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-xl">
                  <div className="flex flex-col gap-3">
                    <button className="flex items-center gap-3 rounded-xl bg-card/60 p-4 text-left transition-colors hover:bg-card/80">
                      <LogOut className="size-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Sign Out</span>
                    </button>
                    <button className="flex items-center gap-3 rounded-xl bg-destructive/5 p-4 text-left transition-colors hover:bg-destructive/10">
                      <Lock className="size-4 text-destructive" />
                      <div>
                        <p className="text-sm font-medium text-destructive">Freeze Account</p>
                        <p className="text-xs text-muted-foreground">Temporarily disable all transactions</p>
                      </div>
                    </button>
                    <button className="flex items-center gap-3 rounded-xl bg-destructive/5 p-4 text-left transition-colors hover:bg-destructive/10">
                      <Trash2 className="size-4 text-destructive" />
                      <div>
                        <p className="text-sm font-medium text-destructive">Close Account</p>
                        <p className="text-xs text-muted-foreground">Permanently delete your account</p>
                      </div>
                    </button>
                  </div>
                </div>
              </Section>

              <Section title="App Info">
                <div className="rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-muted-foreground">Version</span>
                    <span className="text-xs font-medium text-foreground">2.4.1</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-muted-foreground">Build</span>
                    <span className="text-xs font-medium text-foreground">#8842</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-muted-foreground">Environment</span>
                    <span className="rounded-full bg-positive/15 px-2 py-0.5 text-[10px] font-medium text-positive ring-1 ring-positive/20">
                      Production
                    </span>
                  </div>
                </div>
              </Section>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}