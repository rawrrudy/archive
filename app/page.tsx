"use client";

import { useState } from "react";

export default function Home() {
  const [entered, setEntered] = useState(false);

  if (entered) {
    return (
      <main className="min-h-screen bg-[#050505] text-[#d6d6d6] font-mono p-8">
        <h1 className="text-2xl tracking-widest">ARCHIVE SYSTEM</h1>
        <p className="mt-4 text-gray-500">SYSTEM ACCESS GRANTED!</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-[#d6d6d6] font-mono flex items-center justify-center p-6">
      <div className="w-full max-w-3xl border border-[#222] bg-[#080808] shadow-2xl">
        <div className="border-b border-[#222] px-6 py-3 flex justify-between text-xs text-gray-600">
          <span>ARCHIVE SYSTEM</span>
          <span>TERMINAL 03</span>
        </div>

        <div className="p-10 md:p-16">
          <div className="text-xs text-gray-600 mb-8">
            INTERNAL INFORMATION ARCHIVE
          </div>

          <h1 className="text-3xl md:text-5xl tracking-[0.25em] mb-6">
            ARCHIVE SYSTEM
          </h1>

          <div className="h-px bg-[#222] mb-8" />

          <div className="space-y-2 text-sm text-gray-500 mb-12">
            <p>ACCESS LEVEL: PUBLIC</p>
            <p>SYSTEM STATUS: ONLINE</p>
            <p>DATABASE STATUS: <span className="text-gray-300">OPERATIONAL</span></p>
          </div>

          <button
            onClick={() => setEntered(true)}
            className="border border-[#444] px-8 py-3 text-sm tracking-[0.2em] hover:bg-[#151515] hover:border-[#777] transition-all"
          >
            ENTER ARCHIVE
          </button>

          <p className="mt-10 text-[10px] text-gray-700">
            Unauthorized access is prohibited.
          </p>
        </div>

        <div className="border-t border-[#222] px-6 py-3 text-[10px] text-gray-700 flex justify-between">
          <span>ARCHIVE SYSTEM v3.7</span>
          <span>© 1998–2026</span>
        </div>
      </div>
    </main>
  );
}