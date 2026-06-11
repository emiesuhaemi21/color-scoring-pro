"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {

  const [companyName, setCompanyName] =
    useState("");

  const [defaultDelta, setDefaultDelta] =
    useState("Delta E 2000");

  const [passScore, setPassScore] =
    useState(70);

  const [condition, setCondition] =
    useState("D50 - 2 - M0");

  // LOAD SETTINGS
  useEffect(() => {

    const stored =
      localStorage.getItem(
        "color-scoring-settings"
      );

    if (stored) {

      const parsed =
        JSON.parse(stored);

      setCompanyName(
        parsed.companyName || ""
      );

      setDefaultDelta(
        parsed.defaultDelta ||
        "Delta E 2000"
      );

      setPassScore(
        parsed.passScore || 70
      );

      setCondition(
        parsed.condition ||
        "D50 - 2 - M0"
      );
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

    localStorage.setItem(
      "color-scoring-settings",
      JSON.stringify(settings)
    );

    alert("Settings Saved!");
  };

  return (
    <main className="min-h-screen bg-[#111827] text-white p-5">

     {/* TOP NAVIGATION */}
<div className="flex flex-wrap gap-3 mb-6">

  <a
    href="/"
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    Home
  </a>

  <a
    href="/new-report"
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    New Report
  </a>

  <a
    href="/color-library"
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    Color Library
  </a>

  <a
    href="/history"
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    History
  </a>

  <a
    href="/settings"
    className="bg-cyan-500 border border-cyan-400 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    Settings
  </a>

</div>
      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="text-gray-400 mt-2">
          Color Scoring Pro Configuration
        </p>

      </div>

      {/* FORM */}
      <div className="bg-[#1F2937] rounded-3xl p-5 border border-gray-700 shadow-xl space-y-5">

        {/* COMPANY */}
        <div>

          <label className="text-sm text-gray-400">
            Company Name
          </label>

          <input
            type="text"
            value={companyName}
            onChange={(e) =>
              setCompanyName(
                e.target.value
              )
            }
            placeholder="Input company name"
            className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
          />

        </div>

        {/* DELTA */}
        <div>

          <label className="text-sm text-gray-400">
            Default Delta E
          </label>

          <select
            value={defaultDelta}
            onChange={(e) =>
              setDefaultDelta(
                e.target.value
              )
            }
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

        {/* PASS SCORE */}
        <div>

          <label className="text-sm text-gray-400">
            Pass Score (%)
          </label>

          <input
            type="number"
            value={passScore}
            onChange={(e) =>
              setPassScore(
                Number(e.target.value)
              )
            }
            className="w-full mt-2 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
          />

        </div>

        {/* CONDITION */}
        <div>

          <label className="text-sm text-gray-400">
            Measurement Condition
          </label>

          <select
            value={condition}
            onChange={(e) =>
              setCondition(
                e.target.value
              )
            }
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

        {/* SAVE */}
        <button
          onClick={saveSettings}
          className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 rounded-2xl py-4 font-bold text-lg"
        >

          SAVE SETTINGS

        </button>

      </div>

    </main>
  );
}