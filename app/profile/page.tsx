"use client";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#0B1120] to-[#020617] p-4">
      <div className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-white">Профиль</h1>
        <p className="mt-2 text-white/50">Информация о пользователе.</p>
      </div>
    </div>
  );
}