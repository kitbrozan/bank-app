"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// В реальном проекте данные будут из БД, пока заглушка
const transactions = [
  { id: "1", name: "Apple Store", category: "Shopping", amount: -899.00, date: "Today", description: "iPhone case and charger" },
  { id: "2", name: "Salary", category: "Income", amount: 4250.00, date: "Yesterday", description: "Monthly salary from employer" },
  { id: "3", name: "Supermarket", category: "Groceries", amount: -64.30, date: "2 days ago", description: "Weekly groceries" },
];

export default function TransactionDetail() {
  const { id } = useParams() as { id: string };
  const tx = transactions.find((t) => t.id === id);

  if (!tx) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#0f1a2e] to-[#020617] p-4 flex items-center justify-center">
        <div className="text-white/70 text-center">
          <p className="text-xl">Transaction not found</p>
          <Link href="/dashboard" className="text-[#FBBF24] hover:underline mt-2 inline-block">← Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#0f1a2e] to-[#020617] p-4 md:p-6">
      <div className="mx-auto max-w-2xl">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition">
          <ArrowLeft className="h-5 w-5" /> Back
        </Link>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{tx.name}</h1>
              <p className="text-sm text-white/50">{tx.category}</p>
            </div>
            <span className={`text-2xl font-mono font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
            </span>
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="text-sm text-white/30">Date: {tx.date}</p>
            <p className="text-sm text-white/30 mt-1">Description: {tx.description || "—"}</p>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="flex-1 rounded-2xl border border-white/15 bg-white/10 py-2 text-sm font-medium text-white hover:bg-white/20 transition">
              Share
            </button>
            <button className="flex-1 rounded-2xl bg-[#FBBF24] py-2 text-sm font-semibold text-[#0B1120] shadow-lg shadow-[#FBBF24]/30 hover:shadow-[#FBBF24]/50 transition">
              Repeat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}