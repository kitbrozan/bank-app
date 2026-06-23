"use client";

import { useState } from "react";
import { X, User, Send } from "lucide-react";

type SendModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultRecipient?: string;
};

export default function SendModal({ isOpen, onClose, defaultRecipient = "" }: SendModalProps) {
  const [recipient, setRecipient] = useState(defaultRecipient);
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-[#0B1120] to-[#020617] p-6 backdrop-blur-xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/50 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Send Money</h2>

        <div className="mb-4">
          <label className="text-sm text-white/50">Recipient</label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2">
            <User className="h-5 w-5 text-white/30" />
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Name or account"
              className="flex-1 bg-transparent text-white placeholder-white/30 outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm text-white/50">Amount (€)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-white placeholder-white/30 outline-none"
          />
        </div>

        <button className="w-full rounded-2xl bg-gradient-to-r from-[#FBBF24] to-amber-500 py-3 font-semibold text-[#0B1120] shadow-lg shadow-[#FBBF24]/30 hover:shadow-[#FBBF24]/50 transition flex items-center justify-center gap-2">
          <Send className="h-4 w-4" /> Send
        </button>
      </div>
    </div>
  );
}