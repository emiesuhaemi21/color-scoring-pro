"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FileText, Grid, History, Settings } from "lucide-react";

const menus = [
  { title: "New Report", icon: FileText, link: "/new-report" },
  { title: "Color Library", icon: Grid, link: "/color-library" }, // tetap seperti ini
  { title: "History", icon: History, link: "/history" },
  { title: "Settings", icon: Settings, link: "/settings" },
];

export default function HomePage() {

useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker registered"))
        .catch((err) =>
          console.error("Service Worker registration failed:", err)
        );
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#111827] text-white p-5">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Color Scoring Pro</h1>
        <p className="text-gray-400 mt-2">Industrial Color QC System</p>
      </div>

      {/* STATUS CARD */}
      <div className="bg-[#1F2937] rounded-3xl p-6 border border-gray-700 shadow-xl mb-8">
        <div className="text-gray-400 text-sm">SYSTEM STATUS</div>
        <div className="mt-3 text-5xl font-bold text-cyan-400">READY</div>
        <div className="mt-2 text-gray-400">Delta E 2000 Engine Active</div>
      </div>

      {/* MENU GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {menus.map((menu, idx) => {
          const Icon = menu.icon;
          return (
            <Link href={menu.link} key={idx}>
              <button className="w-full bg-[#1F2937] rounded-3xl p-6 border border-gray-700 shadow-xl active:scale-95 transition">
                <div className="flex flex-col items-center justify-center">
                  <Icon size={38} className="text-cyan-400 mb-3" />
                  <span className="text-sm font-medium text-center">{menu.title}</span>
                </div>
              </button>
            </Link>
          );
        })}
      </div>

      {/* NOTE: Tidak menampilkan Color Library inline di Home */}
    </main>
  );
}