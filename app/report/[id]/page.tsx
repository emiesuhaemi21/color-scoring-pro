"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReportPage() {
  const params = useParams();

  const [report, setReport] =
    useState<any>(null);

  useEffect(() => {
    const stored =
      localStorage.getItem(
        "color-scoring-reports"
      );

    if (!stored) return;

    const reports =
      JSON.parse(stored);

    const found =
      reports.find(
        (r: any) =>
          r.id.toString() === params.id
      );

    setReport(found);
  }, [params.id]);

  if (!report)
    return (
      <div className="p-10">
        Loading...
      </div>
    );

  return (
    <main className="bg-white text-black min-h-screen p-10">

      {/* TOP MENU */}

      <div className="flex gap-3 mb-8 print:hidden">

        <a
          href="/"
          className="bg-gray-200 px-4 py-2 rounded-xl"
        >
          Home
        </a>

        <a
          href="/history"
          className="bg-gray-200 px-4 py-2 rounded-xl"
        >
          History
        </a>

        <button
          onClick={() => window.print()}
          className="bg-cyan-500 text-white px-4 py-2 rounded-xl"
        >
          Print Report
        </button>

      </div>

      {/* HEADER */}

      <div className="border-b pb-6 mb-6">

        <h1 className="text-4xl font-bold">
          COLOR SCORING REPORT
        </h1>

        <div className="mt-4 space-y-1">

          <div>
            <strong>Report Name:</strong>{" "}
            {report.reportName}
          </div>

          <div>
            <strong>Date:</strong>{" "}
            {report.date}
          </div>

          <div>
            <strong>Total Score:</strong>{" "}
            {report.totalScore}%
          </div>

        </div>

      </div>

      {/* TABLE */}

      <table className="w-full border-collapse border border-gray-400">

        <thead>

          <tr className="bg-gray-100">

            <th className="border p-2">
              Color
            </th>

            <th className="border p-2">
              Target LAB
            </th>

            <th className="border p-2">
              Measure LAB
            </th>

            <th className="border p-2">
              ΔE
            </th>

          </tr>

        </thead>

        <tbody>

          {report.rows.map(
            (row: any, index: number) => {

              const delta =
                Math.sqrt(
                  Math.pow(
                    row.targetL -
                      row.measureL,
                    2
                  ) +
                    Math.pow(
                      row.targetA -
                        row.measureA,
                      2
                    ) +
                    Math.pow(
                      row.targetB -
                        row.measureB,
                      2
                    )
                ).toFixed(2);

              return (
                <tr key={index}>

                  <td className="border p-2">
                    {row.color}
                  </td>

                  <td className="border p-2">
                    L{row.targetL} a
                    {row.targetA} b
                    {row.targetB}
                  </td>

                  <td className="border p-2">
                    L{row.measureL} a
                    {row.measureA} b
                    {row.measureB}
                  </td>

                  <td className="border p-2">
                    {delta}
                  </td>

                </tr>
              );
            }
          )}

        </tbody>

      </table>

      {/* FOOTER */}

      <div className="mt-10">

        <div className="font-semibold">
          QC Approval:
        </div>

        <div className="mt-16 border-t w-64">
          Signature
        </div>

      </div>

    </main>
  );
}