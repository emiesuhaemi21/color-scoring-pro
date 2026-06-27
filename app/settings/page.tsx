"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsPage() {
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State untuk Settings
  const [companyName, setCompanyName] = useState("");
  const [defaultDelta, setDefaultDelta] = useState("Delta E 2000");
  const [passScore, setPassScore] = useState(70);
  const [condition, setCondition] = useState("D50 - 2 - M0");

  // LOAD SETTINGS saat komponen dimuat
  useEffect(() => {
    const stored = localStorage.getItem("color-scoring-settings");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCompanyName(parsed.companyName || "");
      setDefaultDelta(parsed.defaultDelta || "Delta E 2000");
      setPassScore(parsed.passScore || 70);
      setCondition(parsed.condition || "D50 - 2 - M0");
    }
  }, []);

  // SAVE SETTINGS
  const saveSettings = () => {
    const settings = {
      companyName,
      defaultDelta,
      passScore,
      condition,
    };
    localStorage.setItem("color-scoring-settings", JSON.stringify(settings));
    alert("Settings Saved!");
  };

  // FUNGSI BACKUP
  const handleBackup = () => {
    const backupData = { ...localStorage };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-color-scoring-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // FUNGSI RESTORE
  const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        if (confirm("PERINGATAN: Semua data saat ini akan dihapus dan diganti dengan data dari file backup. Lanjutkan?")) {
          localStorage.clear();
          Object.keys(importedData).forEach((key) => {
            localStorage.setItem(key, importedData[key]);
          });
          alert("Restore Berhasil! Aplikasi akan memuat ulang.");
          window.location.reload();
        }
      } catch (err) {
        alert("Gagal membaca file. Pastikan file adalah file JSON backup yang valid.");
      }
    };
    reader.readAsText(file);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "New Report", href: "/new-report" },
    { name: "Color Library", href: "/color-library" },
    { name: "Customer", href: "/customer" },
    { name: "My Report", href: "/history" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <main className="min-h-screen bg-[#111827] text-white p-5">
      {/* TOP NAVIGATION */}
      <div className="flex flex-wrap gap-3 mb-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`border px-4 py-3 rounded-2xl text-sm font-medium ${
              pathname === link.href
                ? "bg-cyan-500 border-cyan-400 text-white"
                : "bg-[#1F2937] border-gray-700 text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="text-gray-400 mt-2">Color Scoring Pro Configuration</p>
      </div>

      <div className="bg-[#1F2937] rounded-3xl p-5 border border-gray-700 shadow-xl space-y-5">
        {/* Company Name */}
        <div>
          <label className="text-sm text-gray-400">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
          />
        </div>

        {/* Delta E Mode */}
        <div>
          <label className="text-sm text-gray-400">Default Delta E</label>
          <select
            value={defaultDelta}
            onChange={(e) => setDefaultDelta(e.target.value)}
            className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
          >
            <option>Delta E 2000</option>
            <option>Delta E 1994</option>
            <option>Delta E 1976</option>
          </select>
        </div>

        {/* Pass Score */}
        <div>
          <label className="text-sm text-gray-400">Pass Score (%)</label>
          <input
            type="number"
            value={passScore}
            onChange={(e) => setPassScore(Number(e.target.value))}
            className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
          />
        </div>

        {/* Condition */}
        <div>
          <label className="text-sm text-gray-400">Measurement Condition</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
          >
            <option>D50 - 2 - M0</option>
            <option>D65 - 10 - M1</option>
          </select>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveSettings}
          className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 rounded-2xl py-4 font-bold text-lg transition"
        >
          SAVE SETTINGS
        </button>

        {/* DATA MANAGEMENT SECTION */}
        <div className="mt-8 border-t border-gray-700 pt-6">
          <h3 className="text-sm font-bold text-gray-400 mb-4">DATA MANAGEMENT</h3>
          <div className="flex gap-3">
            <button
              onClick={handleBackup}
              className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-2xl text-sm font-bold transition"
            >
              Backup Data
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-2xl text-sm font-bold transition"
            >
              Restore Data
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleRestore}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>
      </div>
    </main>
  );
}