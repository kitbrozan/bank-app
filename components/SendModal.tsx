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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-4">
      <div className="relative max-h-[90vh] w-[92vw] max-w-md overflow-y-auto rounded-3xl border border-white/10 bg-gradient-to-br from-[#0B1120] to-[#020617] p-5 backdrop-blur-xl shadow-2xl sm:p-6">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 grid size-11 place-items-center text-white/50 transition hover:text-white sm:right-4 sm:top-4"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 pr-8 text-xl font-bold text-white">Send Money</h2>

        <div className="mb-4">
          <label className="text-sm text-white/50">Recipient</label>
          <div className="mt-1 flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2">
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
            className="mt-1 min-h-11 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white placeholder-white/30 outline-none"
          />
        </div>

        <button className="flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FBBF24] to-amber-500 py-3 text-sm font-semibold text-[#0B1120] shadow-lg shadow-[#FBBF24]/30 transition hover:shadow-[#FBBF24]/50">
          <Send className="h-4 w-4" /> Send
        </button>
      </div>
    </div>
  );
}