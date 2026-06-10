"use client";

import { useEffect, useState } from "react";

export default function HistoryPage() {

  const [reports, setReports] = useState<any[]>([]);

  // LOAD REPORT
  useEffect(() => {
    const stored = localStorage.getItem("color-scoring-reports");
    if (stored) {
      setReports(JSON.parse(stored));
    }
  }, []);

  // DELETE REPORT
  const deleteReport = (id: number) => {
    const filtered = reports.filter((report) => report.id !== id);
    setReports(filtered);
    localStorage.setItem("color-scoring-reports", JSON.stringify(filtered));
  };

  return (
    <main className="min-h-screen bg-[#111827] text-white p-5">
      {/* TOP NAVIGATION */}
      <div className="flex flex-wrap gap-3 mb-6">
        <a href="/" className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium">Home</a>
        <a href="/new-report" className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium">New Report</a>
        <a href="/history" className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium">History</a>
        <a href="/settings" className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium">Settings</a>
      </div>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">History Reports</h1>
        <p className="text-gray-400 mt-2">Saved QC Measurement Reports</p>
      </div>

      {/* REPORT LIST */}
      <div className="space-y-4">
        {reports.length === 0 && (
          <div className="bg-[#1F2937] rounded-3xl p-6 border border-gray-700 text-center text-gray-400">
            No Saved Reports
          </div>
        )}

        {reports.map((report) => (
          <div
            key={report.id}
            className="block bg-[#1F2937] rounded-3xl p-5 border border-gray-700 shadow-xl hover:border-cyan-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold">{report.reportName || "Untitled Report"}</div>
                <div className="text-gray-400 mt-1 text-sm">{report.date}</div>
              </div>
              <div className="text-cyan-400 text-3xl font-bold">{report.totalScore}%</div>
            </div>

            {/* TABLE */}
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700 text-gray-400">
                    <th className="text-left py-2">Color</th>
                    <th className="text-left">Target LAB</th>
                    <th className="text-left">Measure LAB</th>
                  </tr>
                </thead>
                <tbody>
                  {report.rows.map((row: any, index: number) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-3">{row.color}</td>
                      <td>L{row.targetL} a{row.targetA} b{row.targetB}</td>
                      <td>L{row.measureL} a{row.measureA} b{row.measureB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BUTTONS */}
            <div className="mt-5 flex gap-3">
              <div
                className="flex-1 text-center bg-cyan-500 hover:bg-cyan-400 rounded-2xl py-3 font-bold cursor-pointer"
                onClick={() => window.location.href = `/report/${report.id}`}
              >
                VIEW REPORT
              </div>

              <div
                className="flex-1 text-center bg-yellow-500 hover:bg-yellow-400 rounded-2xl py-3 font-bold cursor-pointer"
                onClick={() => window.location.href = `/measurement?edit=${report.id}`}
              >
                EDIT
              </div>

              <button
                onClick={() => deleteReport(report.id)}
                className="flex-1 bg-red-500 hover:bg-red-400 rounded-2xl py-3 font-bold"
              >
                DELETE REPORT
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}