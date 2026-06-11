"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NewReportPage() {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#111827] text-white p-5">
      {/* TOP NAVIGATION */}

      <div className="flex flex-wrap gap-3 mb-6">

        <a
          href="/"
          className={`border px-4 py-3 rounded-2xl text-sm font-medium ${
            pathname === "/"
              ? "bg-cyan-500 border-cyan-400 text-white"
              : "bg-[#1F2937] border-gray-700 text-white"
          }`}
        >
          Home
        </a>

        <a
          href="/new-report"
          className={`border px-4 py-3 rounded-2xl text-sm font-medium ${
            pathname === "/new-report"
              ? "bg-cyan-500 border-cyan-400 text-white"
              : "bg-[#1F2937] border-gray-700 text-white"
          }`}
        >
          New Report
        </a>

        <a
          href="/color-library"
          className={`border px-4 py-3 rounded-2xl text-sm font-medium ${
            pathname === "/color-library"
              ? "bg-cyan-500 border-cyan-400 text-white"
              : "bg-[#1F2937] border-gray-700 text-white"
          }`}
        >
          Color Library
        </a>

        <a
          href="/history"
          className={`border px-4 py-3 rounded-2xl text-sm font-medium ${
            pathname === "/history"
              ? "bg-cyan-500 border-cyan-400 text-white"
              : "bg-[#1F2937] border-gray-700 text-white"
          }`}
        >
          History
        </a>

        <a
          href="/settings"
          className={`border px-4 py-3 rounded-2xl text-sm font-medium ${
            pathname === "/settings"
              ? "bg-cyan-500 border-cyan-400 text-white"
              : "bg-[#1F2937] border-gray-700 text-white"
          }`}
        >
          Settings
        </a>

      </div>

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          New Report
        </h1>

        <p className="text-gray-400 mt-2">
          Create New QC Measurement Report
        </p>

      </div>

      {/* FORM */}
      <div className="bg-[#1F2937] rounded-3xl p-5 border border-gray-700 shadow-xl space-y-5">

        {/* CUSTOMER */}
        <div>

          <label className="text-sm text-gray-400">
            Customer
          </label>

          <input
            type="text"
            placeholder="Input customer name"
            className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
          />

        </div>

        {/* ARTICLE */}
        <div>

          <label className="text-sm text-gray-400">
            Article
          </label>

          <input
            type="text"
            placeholder="Input article"
            className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
          />

        </div>

        {/* SUPPLIER */}
        <div>

          <label className="text-sm text-gray-400">
            Supplier Plate
          </label>

          <input
            type="text"
            placeholder="Input supplier plate"
            className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
          />

        </div>

        {/* DATE */}
        <div>

          <label className="text-sm text-gray-400">
            Date
          </label>

          <input
            type="date"
            className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
          />

        </div>

        {/* NOTE NUMBER */}
        <div>

          <label className="text-sm text-gray-400">
            Note Number
          </label>

          <input
            type="text"
            placeholder="Input note number"
            className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
          />

        </div>

        {/* MEASUREMENT CONDITION */}
        <div>

          <label className="text-sm text-gray-400">
            Measurement Condition
          </label>

          <select
            className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
          >

            <option>
              D50 - 2 - M0
            </option>

            <option>
              D65 - 10 - M1
            </option>

          </select>

        </div>

        {/* DELTA E MODE */}
        <div>

          <label className="text-sm text-gray-400">
            Delta E Mode
          </label>

          <select
            className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
          >

            <option>
              Delta E 2000
            </option>

            <option>
              Delta E 1994
            </option>

            <option>
              Delta E 1976
            </option>

          </select>

        </div>

        {/* START BUTTON */}
        <Link href="/measurement">

          <button className="w-full mt-5 bg-cyan-500 hover:bg-cyan-400 rounded-2xl py-4 text-lg font-bold">

            START MEASUREMENT

          </button>

        </Link>

      </div>

    </main>
  );
}