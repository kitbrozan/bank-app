"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bell,
  Settings,
  Send,
  Sparkles,
  Zap,
  TrendingUp,
  CreditCard,
  Shield,
  PiggyBank,
  ArrowRight,
  Bot,
  User,
  Loader2,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  FileText,
  BarChart3,
  Wallet,
  Landmark,
  AlertCircle,
  ChevronDown,
} from "lucide-react"

// ── Types ───────────────────────────────────────────────
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isTyping?: boolean
}

interface Suggestion {
  id: string
  icon: React.ElementType
  iconColor: string
  title: string
  subtitle: string
  prompt: string
}

// ── Mock data ───────────────────────────────────────────
const suggestions: Suggestion[] = [
  {
    id: "1",
    icon: TrendingUp,
    iconColor: "text-gold",
    title: "Analyze my spending",
    subtitle: "Get insights on where your money goes",
    prompt: "Analyze my spending patterns for the last 3 months and identify areas where I can save money. Break it down by category.",
  },
  {
    id: "2",
    icon: PiggyBank,
    iconColor: "text-positive",
    title: "Create a savings plan",
    subtitle: "AI-powered strategy to reach your goals",
    prompt: "I want to save $10,000 in 12 months. My current monthly income is $5,800 and expenses are around $3,500. Create a realistic savings plan with milestones.",
  },
  {
    id: "3",
    icon: CreditCard,
    iconColor: "text-brand-blue",
    title: "Optimize my cards",
    subtitle: "Find the best card for each purchase",
    prompt: "Compare my Visa Platinum and Mastercard Gold cards. Which one should I use for groceries, travel, and online shopping based on cashback and fees?",
  },
  {
    id: "4",
    icon: Shield,
    iconColor: "text-brand-violet",
    title: "Security checkup",
    subtitle: "Review account safety recommendations",
    prompt: "Run a security audit on my account. Check my recent login activity, connected devices, and recommend any security improvements.",
  },
  {
    id: "5",
    icon: BarChart3,
    iconColor: "text-rose-400",
    title: "Investment advice",
    subtitle: "Personalized portfolio suggestions",
    prompt: "Based on my current balance of $7,567 and monthly savings of $2,300, what would be a smart low-risk investment strategy for a beginner?",
  },
  {
    id: "6",
    icon: Wallet,
    iconColor: "text-amber-400",
    title: "Budget this month",
    subtitle: "Smart allocation for remaining funds",
    prompt: "It's the 23rd of the month. I've spent $3,200 out of my $3,500 budget. Help me allocate the remaining $300 wisely for the next 7 days.",
  },
]

const mockResponses: Record<string, string> = {
  "1": `## 💰 Spending Analysis — Last 3 Months

**Total spent:** $10,247

| Category | Amount | % of Total | Trend |
|----------|--------|-----------|-------|
| 🏠 Housing | $3,600 | 35.1% | → Stable |
| 🍔 Food & Dining | $1,950 | 19.0% | ↑ +12% |
| 🚗 Transport | $1,280 | 12.5% | → Stable |
| 🎬 Entertainment | $980 | 9.6% | ↑ +28% 🚨 |
| 🛒 Shopping | $1,420 | 13.9% | ↓ -8% |
| 📱 Utilities | $817 | 8.0% | → Stable |
| 🎲 Other | $200 | 1.9% | — |

### 🔍 Key Insights

**1. Entertainment spike detected**
Your streaming subscriptions and dining out increased 28% compared to the previous quarter. Consider reviewing unused subscriptions — you're paying for Netflix, Spotify, and Disney+ simultaneously.

**2. Food spending is creeping up**
At $650/month average, you're spending $130 more than the recommended 15% of income on food. Meal prepping 2-3 days a week could save ~$180/month.

**3. Positive trend in shopping**
Shopping expenses dropped 8% — great job sticking to your list!

### 💡 Savings Opportunities
- Cancel unused subscriptions: **~$35/month**
- Meal prep twice weekly: **~$180/month**
- Use cashback card for groceries: **~$25/month**

**Potential monthly savings: ~$240**`,

  "2": `## 🎯 12-Month Savings Plan: $10,000 Goal

**Current situation:**
- Monthly income: $5,800
- Monthly expenses: $3,500
- **Available to save: $2,300/month**

**Target:** $10,000 in 12 months
**Required:** $834/month
**You can save:** $2,300/month
**✅ Goal is absolutely achievable!**

---

### 📅 Milestone Roadmap

| Month | Cumulative Saved | Milestone Reward |
|-------|-----------------|------------------|
| Month 3 | $2,500 | Small treat ($50) |
| Month 6 | $5,000 | Weekend getaway |
| Month 9 | $7,500 | Halfway celebration |
| Month 12 | $10,000 | 🎉 GOAL REACHED! |

### 🏦 Recommended Strategy

**1. Automate transfers**
Set up auto-transfer of $850 to a high-yield savings account on payday. This is "pay yourself first."

**2. Use the 50/30/20 tweak**
- 50% needs ($2,900) — you're at $3,500, trim $600
- 30% wants ($1,740) — currently implicit in expenses
- 20% savings ($1,160) — boost to $850 for the goal

**3. Emergency buffer**
Keep $1,500 as a buffer in checking. The remaining $850+ goes straight to savings.

**4. Account recommendation**
Open a dedicated savings account with 4.5% APY. At that rate, your $10,000 will earn an extra ~$225/year.

### 📊 Conservative vs Aggressive

| Approach | Monthly Save | Months to Goal | Risk |
|----------|-------------|----------------|------|
| Conservative | $850 | 12 | Low ✅ |
| Moderate | $1,150 | 9 | Low |
| Aggressive | $2,000 | 5 | Medium |

I recommend the **conservative approach** — you'll hit the goal comfortably with room for unexpected expenses.`,

  "3": `## 💳 Card Optimization Guide

### Your Cards at a Glance

| Feature | Visa Platinum | Mastercard Gold |
|---------|--------------|-----------------|
| **Groceries** | 2% cashback | 1.5% cashback |
| **Travel** | 1% + insurance | 3% + lounge |
| **Online** | 1.5% | 2% |
| **Dining** | 1% | 2% |
| **Annual Fee** | $0 | $95 |
| **FX Fee** | 2.5% | 0% |

---

### 🎯 Best Card by Category

| Purchase Type | Best Card | Why |
|---------------|-----------|-----|
| 🛒 **Groceries** | **Visa Platinum** | 2% vs 1.5% — saves you ~$15/month |
| ✈️ **Travel** | **Mastercard Gold** | 3% + free lounge + travel insurance |
| 🌐 **Online** | **Mastercard Gold** | 2% + fraud protection |
| 🍽️ **Dining** | **Mastercard Gold** | 2% + dining credits |
| 🏪 **Everything else** | **Visa Platinum** | No annual fee to offset |

### 💡 Pro Tips

**1. Grocery strategy**
Use Visa Platinum at Whole Foods, Trader Joe's, and supermarkets. At $650/month groceries, you earn **$13/month** vs $9.75 on Mastercard.

**2. Travel stack**
Book flights/hotels on Mastercard Gold for 3% back + insurance. On a $1,200 trip, that's **$36 cashback** + peace of mind.

**3. International purchases**
Mastercard Gold has 0% foreign exchange fee. On a $500 international purchase, you save **$12.50** vs Visa.

**4. Break-even analysis**
Mastercard Gold costs $95/year. You need to spend ~$3,200/year on travel/dining to break even. Based on your spending, you'll save **~$140/year** with the right card strategy.

### 📱 Quick Reference
Keep both in your wallet:
- **Visa Platinum** → Groceries, daily stuff, backup
- **Mastercard Gold** → Travel, dining, online, international`,

  "4": `## 🔒 Security Audit Report

### ✅ Passed Checks

| Check | Status | Details |
|-------|--------|---------|
| 2FA Enabled | ✅ | Authenticator app active |
| Biometric Login | ✅ | Face ID configured |
| Strong Password | ✅ | Last changed 3 months ago |
| KYC Verified | ✅ | Level 3 — Full Access |
| Email Verified | ✅ | alex.voss@email.com |

---

### ⚠️ Attention Required

**1. Suspicious login attempt**
Failed login from Chrome/Windows in London, UK on Jun 20. If this wasn't you, I recommend:
- Change your password immediately
- Review and revoke unknown sessions
- Enable login notifications

**2. Password age**
Your password is 3 months old. For optimal security, rotate every 90 days. You have ~2 weeks left.

**3. Inactive device**
iPad Air (Boston) hasn't been used in 3 days. If lost or no longer needed, revoke access.

---

### 🔐 Recommendations

| Priority | Action | Impact |
|----------|--------|--------|
| 🔴 High | Change password | Prevents credential reuse attacks |
| 🟡 Medium | Enable SMS alerts for logins | Real-time breach detection |
| 🟢 Low | Set up account recovery codes | Backup if 2FA device lost |
| 🟢 Low | Review app permissions quarterly | Minimize attack surface |

### 📊 Security Score: 8.2/10

Your account is well-protected. Address the London login concern and password rotation to reach 9.5/10.

Want me to guide you through changing your password or setting up SMS alerts?`,

  "5": `## 📈 Beginner Investment Strategy

**Your profile:**
- Current balance: $7,567
- Monthly savings: $2,300
- Risk tolerance: Low (beginner)
- Goal: Grow wealth steadily

---

### 🏗️ Recommended Portfolio (Conservative)

| Asset Class | Allocation | Vehicle | Expected Return |
|-------------|-----------|---------|-----------------|
| 💵 High-Yield Savings | 40% ($3,000) | HYSA @ 4.5% APY | 4.5% |
| 📊 Index Funds | 35% ($2,650) | S&P 500 ETF | 8-10% avg |
| 🏛️ Bonds | 15% ($1,135) | Treasury I-Bonds | 5.27% current |
| 🪙 Crypto (small) | 5% ($378) | BTC/ETH split | High vol |
| 💰 Cash Buffer | 5% ($378) | Checking | 0% |

---

### 📅 First 6 Months Plan

| Month | Action | Amount |
|-------|--------|--------|
| Month 1 | Open HYSA, deposit $3,000 | $3,000 |
| Month 2 | Buy S&P 500 ETF (VOO/SPY) | $1,300 |
| Month 3 | Buy Treasury I-Bonds | $1,135 |
| Month 4 | Add to S&P 500 ETF | $1,350 |
| Month 5 | Small crypto position | $378 |
| Month 6 | Rebalance & review | — |

---

### 🧠 Key Principles

**1. Dollar-cost averaging (DCA)**
Invest the same amount monthly regardless of market conditions. This smooths out volatility.

**2. Don't time the market**
Studies show time IN the market beats timing the market. Start now, even with small amounts.

**3. Emergency fund first**
Keep 3-6 months expenses ($10,500-$21,000) in savings before aggressive investing. You're at ~$7,500 — build to $10,500 first.

**4. Tax-advantaged accounts**
Consider opening a Roth IRA. You can contribute $7,000/year and withdrawals in retirement are tax-free.

---

### 📊 Projected Growth (Conservative)

| Year | Portfolio Value | Total Contributed | Gain |
|------|----------------|-------------------|------|
| Year 1 | $34,800 | $34,000 | +$800 |
| Year 3 | $112,000 | $90,000 | +$22,000 |
| Year 5 | $198,000 | $146,000 | +$52,000 |
| Year 10 | $485,000 | $286,000 | +$199,000 |

*Assumes $2,300/month contribution, 6.5% blended return*

---

### ⚠️ Important Disclaimers

- Past performance ≠ future results
- Crypto is highly volatile — only invest what you can afford to lose
- Consider consulting a fee-only financial advisor for personalized advice
- This is educational, not financial advice

Want me to explain any specific investment vehicle in detail?`,

  "6": `## 📅 7-Day Budget: $300 Remaining

**Situation:**
- Days left: 7 (Jun 23 → Jun 30)
- Remaining budget: $300
- Daily allowance: ~$43/day

---

### 🎯 Smart Allocation

| Category | Amount | Days | Notes |
|----------|--------|------|-------|
| 🍔 Food | $140 | All 7 | $20/day — cook 4 days, eat out 3 |
| 🚗 Transport | $50 | All 7 | Gas + parking, avoid rideshare |
| 🛒 Essentials | $40 | As needed | Toiletries, household |
| 🎉 Buffer | $50 | Weekend | Social event or surprise |
| 💰 Emergency | $20 | — | Roll over if unused |

---

### 📆 Day-by-Day Plan

**Jun 23 (Today)** — $43
- Groceries for the week: $35
- Coffee: $8

**Jun 24-25** — $40/day
- Meal prep days: $15/day food
- No unnecessary spending

**Jun 26-27** — $45/day
- Mid-week check: assess remaining
- Small treat if on track: $10

**Jun 28-29** — $50/day
- Weekend social: $30
- Transport: $15
- Buffer: $5

**Jun 30** — $30
- Last day: light spending
- Roll over anything saved

---

### 💡 Money-Saving Hacks for the Week

1. **Use cashback card** for all purchases → save ~$6
2. **Cook at home** 4 days → save ~$60 vs eating out
3. **Free entertainment** — parks, library, home movie night
4. **Gas app** — find cheapest station, save ~$3
5. **No impulse buys** — 24-hour rule for anything >$20

### 📊 If You Stick to Plan

| Scenario | End of Month |
|----------|-------------|
| Perfect execution | $20 saved, $0 overspend |
| One unexpected expense | $0 saved, $0 overspend |
| Two slip-ups | -$30 overspend (acceptable) |

You've got this! $43/day is very manageable. The key is avoiding the "it's almost payday" mentality. Want me to send you a daily reminder checklist?`,
}

// ── Components ────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-2">
      <div className="size-2 animate-bounce rounded-full bg-gold/60 [animation-delay:0ms]" />
      <div className="size-2 animate-bounce rounded-full bg-gold/60 [animation-delay:150ms]" />
      <div className="size-2 animate-bounce rounded-full bg-gold/60 [animation-delay:300ms]" />
    </div>
  )
}

function AnalysisAnimation({ step }: { step: number }) {
  const steps = [
    { icon: FileText, label: "Reading transaction history..." },
    { icon: BarChart3, label: "Analyzing patterns..." },
    { icon: TrendingUp, label: "Calculating projections..." },
    { icon: Sparkles, label: "Generating insights..." },
  ]

  return (
    <div className="flex flex-col gap-3 py-2">
      {steps.map((s, i) => {
        const Icon = s.icon
        const isActive = i <= step
        const isDone = i < step
        return (
          <div
            key={i}
            className={`flex items-center gap-3 transition-all duration-500 ${
              isActive ? "opacity-100" : "opacity-30"
            }`}
          >
            <div
              className={`grid size-7 place-items-center rounded-lg transition-all duration-500 ${
                isDone
                  ? "bg-positive/20 text-positive"
                  : isActive
                  ? "bg-gold/20 text-gold animate-pulse"
                  : "bg-muted/20 text-muted-foreground"
              }`}
            >
              {isDone ? <Check className="size-3.5" /> : <Icon className="size-3.5" />}
            </div>
            <span
              className={`text-xs transition-all duration-500 ${
                isDone ? "text-positive" : isActive ? "text-gold" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
            {isActive && !isDone && (
              <Loader2 className="size-3 animate-spin text-gold" />
            )}
          </div>
        )
      })}
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user"
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (message.isTyping) {
    return (
      <div className="flex gap-3">
        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-gold/15 ring-1 ring-gold/30">
          <Bot className="size-4 text-gold" />
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-border/40 bg-card/40 px-5 py-3 backdrop-blur-xl">
          <AnalysisAnimation step={message.content as unknown as number} />
        </div>
      </div>
    )
  }

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`grid size-8 shrink-0 place-items-center rounded-full ring-1 ${
          isUser
            ? "bg-positive/15 ring-positive/30"
            : "bg-gold/15 ring-gold/30"
        }`}
      >
        {isUser ? <User className="size-4 text-positive" /> : <Bot className="size-4 text-gold" />}
      </div>
      <div className={`max-w-[85%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`rounded-2xl px-5 py-3 backdrop-blur-xl ${
            isUser
              ? "rounded-tr-sm border border-positive/20 bg-positive/10"
              : "rounded-tl-sm border border-border/40 bg-card/40"
          }`}
        >
          <div className="prose prose-invert prose-sm max-w-none">
            {message.content.split("\n").map((line, i) => {
              if (line.startsWith("## ")) {
                return (
                  <h3 key={i} className="mb-2 mt-4 text-sm font-bold text-gold first:mt-0">
                    {line.replace("## ", "")}
                  </h3>
                )
              }
              if (line.startsWith("**") && line.endsWith("**")) {
                return (
                  <p key={i} className="my-1.5 text-xs font-semibold text-foreground">
                    {line.replace(/\*\*/g, "")}
                  </p>
                )
              }
              if (line.startsWith("|")) {
                return null // Tables rendered separately
              }
              if (line.startsWith("---")) {
                return <hr key={i} className="my-3 border-border/30" />
              }
              if (line.startsWith("### ")) {
                return (
                  <h4 key={i} className="mb-2 mt-3 text-xs font-bold text-foreground">
                    {line.replace("### ", "")}
                  </h4>
                )
              }
              if (line.startsWith("- ")) {
                return (
                  <li key={i} className="my-0.5 text-xs text-muted-foreground">
                    {line.replace("- ", "")}
                  </li>
                )
              }
              if (line.match(/^\d+\./)) {
                return (
                  <p key={i} className="my-1 text-xs text-muted-foreground">
                    {line}
                  </p>
                )
              }
              if (line.trim() === "") {
                return <div key={i} className="h-1" />
              }
              return (
                <p key={i} className="my-1 text-xs leading-relaxed text-muted-foreground">
                  {line}
                </p>
              )
            })}
          </div>
        </div>
        {!isUser && (
          <div className="mt-1.5 flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="grid size-6 place-items-center rounded-md text-muted-foreground/50 transition-colors hover:text-foreground"
            >
              {copied ? <Check className="size-3 text-positive" /> : <Copy className="size-3" />}
            </button>
            <button className="grid size-6 place-items-center rounded-md text-muted-foreground/50 transition-colors hover:text-foreground">
              <ThumbsUp className="size-3" />
            </button>
            <button className="grid size-6 place-items-center rounded-md text-muted-foreground/50 transition-colors hover:text-foreground">
              <ThumbsDown className="size-3" />
            </button>
            <button className="grid size-6 place-items-center rounded-md text-muted-foreground/50 transition-colors hover:text-foreground">
              <RotateCcw className="size-3" />
            </button>
            <span className="ml-1 text-[10px] text-muted-foreground/40">
              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function SuggestionCard({ suggestion, onClick }: { suggestion: Suggestion; onClick: () => void }) {
  const Icon = suggestion.icon
  return (
    <button
      onClick={onClick}
      className="group flex flex-col gap-2 rounded-2xl border border-border/40 bg-card/40 p-4 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-card/60 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-gold/20"
    >
      <div className="flex items-center justify-between">
        <div className={`grid size-9 place-items-center rounded-xl bg-muted/20 ring-1 ring-white/10 transition-colors group-hover:bg-gold/10`}>
          <Icon className={`size-4 ${suggestion.iconColor}`} />
        </div>
        <ArrowRight className="size-4 text-muted-foreground/30 transition-all group-hover:text-gold group-hover:translate-x-0.5" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{suggestion.title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{suggestion.subtitle}</p>
      </div>
    </button>
  )
}

// ── Page ──────────────────────────────────────────────────
export default function AISupportPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hey Alexander! 👋\n\nI'm your AI financial assistant. I can analyze your spending, help you save, optimize your cards, or answer any money questions.\n\nWhat would you like to explore today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateAnalysis = async (suggestionId: string) => {
    setIsAnalyzing(true)
    setAnalysisStep(0)

    // Show typing indicator with analysis animation
    const typingId = "typing-" + Date.now()
    setMessages((prev) => [
      ...prev,
      { id: typingId, role: "assistant", content: "0", timestamp: new Date(), isTyping: true },
    ])

    // Animate through steps
    for (let i = 0; i < 4; i++) {
      await new Promise((r) => setTimeout(r, 1200))
      setAnalysisStep(i + 1)
      setMessages((prev) =>
        prev.map((m) => (m.id === typingId ? { ...m, content: String(i + 1) } : m))
      )
    }

    await new Promise((r) => setTimeout(r, 800))

    // Remove typing, add real response
    setMessages((prev) =>
      prev
        .filter((m) => m.id !== typingId)
        .concat({
          id: "resp-" + Date.now(),
          role: "assistant",
          content: mockResponses[suggestionId] || "I'm analyzing your data...",
          timestamp: new Date(),
        })
    )

    setIsAnalyzing(false)
    setAnalysisStep(0)
  }

  const handleSuggestion = (suggestion: Suggestion) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: "user-" + Date.now(), role: "user", content: suggestion.prompt, timestamp: new Date() },
    ])

    simulateAnalysis(suggestion.id)
  }

  const handleSend = () => {
    if (!input.trim() || isAnalyzing) return

    setMessages((prev) => [
      ...prev,
      { id: "user-" + Date.now(), role: "user", content: input.trim(), timestamp: new Date() },
    ])
    setInput("")

    // Generic response for custom prompts
    setIsAnalyzing(true)
    const typingId = "typing-" + Date.now()
    setMessages((prev) => [
      ...prev,
      { id: typingId, role: "assistant", content: "0", timestamp: new Date(), isTyping: true },
    ])

    setTimeout(() => {
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== typingId)
          .concat({
            id: "resp-" + Date.now(),
            role: "assistant",
            content: `I've analyzed your request. Based on your account data, here's what I found:\n\n**1. Quick Overview**\nYour current balance is $7,567.83 with a monthly savings rate of ~40%. That's above average!\n\n**2. Recommendation**\nI'd suggest breaking this down into specific categories. Would you like me to:\n- Dive deeper into a specific area?\n- Create an action plan with deadlines?\n- Compare with similar user benchmarks?\n\nLet me know how I can help further!`,
            timestamp: new Date(),
          })
      )
      setIsAnalyzing(false)
    }, 4000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <main className="bg-aurora min-h-screen w-full">
      <div className="mx-auto flex h-screen max-w-5xl flex-col px-4 py-8 sm:px-6 lg:py-12">
        {/* Header */}
        <header className="mb-6 flex shrink-0 items-center justify-between">
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
            <div className="flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-3 py-1.5">
              <Sparkles className="size-3.5 text-gold" />
              <span className="text-xs font-medium text-gold">AI Assistant</span>
            </div>
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

        {/* Chat area */}
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="flex flex-col gap-5 pb-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggestions — show only when not analyzing and last message is from assistant */}
          {!isAnalyzing && messages[messages.length - 1]?.role === "assistant" && (
            <div className="shrink-0">
              <p className="mb-3 text-xs font-medium text-muted-foreground/60">Suggested questions</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {suggestions.map((suggestion) => (
                  <SuggestionCard
                    key={suggestion.id}
                    suggestion={suggestion}
                    onClick={() => handleSuggestion(suggestion)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="shrink-0 rounded-2xl border border-border/40 bg-card/40 p-3 backdrop-blur-xl">
            <div className="flex items-end gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about your finances..."
                rows={1}
                className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
                style={{ fieldSizing: "content" }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isAnalyzing}
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold ring-1 ring-gold/30 transition-all hover:bg-gold/25 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}