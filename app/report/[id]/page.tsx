"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Color from "colorjs.io";

export default function ReportPage() {
  function getLabColor(
  l: number,
  a: number,
  b: number
) {
  try {
    const color = new Color(
      "lab",
      [l, a, b]
    );

    return color.to("srgb").toString();
  } catch {
    return "#999999";
  }
}
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

          <div>
            <strong>Delta Mode:</strong>{" "}
            {report.deltaMode || "E76"}
         </div>

        </div>

      </div>
{/* JOB INFORMATION */}

<div className="border rounded-xl p-4 mb-6">

  <h2 className="text-xl font-bold mb-4">
    JOB INFORMATION
  </h2>

  <div className="grid grid-cols-2 gap-3">

    <div>
      <strong>Job Name:</strong>{" "}
      {report.jobInfo?.jobName}
    </div>

    <div>
      <strong>Customer:</strong>{" "}
      {report.jobInfo?.customer}
    </div>

    <div>
      <strong>Operator:</strong>{" "}
      {report.jobInfo?.operator}
    </div>

    <div>
      <strong>Shift:</strong>{" "}
      {report.jobInfo?.shift}
    </div>

  </div>

</div>
<div className="border rounded-xl p-4 mb-6">

  <h2 className="text-xl font-bold mb-4">
    SUBSTRATE INFORMATION
  </h2>

  <div className="grid grid-cols-2 gap-3">

    <div>
      <strong>Type:</strong>{" "}
      {report.jobInfo?.substrateType}
    </div>

    <div>
      <strong>Color:</strong>{" "}
      {report.jobInfo?.substrateColor}
    </div>

    <div>
      <strong>Thickness:</strong>{" "}
      {report.jobInfo?.thickness}
    </div>

    <div>
      <strong>Width:</strong>{" "}
      {report.jobInfo?.width}
    </div>

  </div>

</div>
      {/* TABLE */}

      <table className="w-full border-collapse border border-gray-400">

        <thead>

          <tr className="bg-gray-100">

  <th className="border p-2">
    Review
  </th>

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
    Difference
  </th>

  <th className="border p-2">
    Tape
  </th>

  <th className="border p-2">
    Viscosity
  </th>

  <th className="border p-2">
    ΔE
  </th>

</tr>

        </thead>

        <tbody>

          {report.rows.map(
  (row: any, index: number) => {


    const dL = row.deltaL;
const dA = row.deltaA;
const dB = row.deltaB;

    return (
  <tr key={index}>

    {/* REVIEW */}
    <td className="border p-2">

  <div
    className="w-10 h-10 rounded border border-gray-400"
    style={{
      backgroundColor:
        getLabColor(
          row.measureL,
          row.measureA,
          row.measureB
        )
    }}
  />

</td>

    {/* COLOR */}
    <td className="border p-2">
      {row.color}
    </td>

    {/* TARGET */}
    <td className="border p-2">
      L{row.targetL}
      <br />
      a{row.targetA}
      <br />
      b{row.targetB}
    </td>

    {/* MEASURE */}
    <td className="border p-2">
      L{row.measureL}
      <br />
      a{row.measureA}
      <br />
      b{row.measureB}
    </td>

    {/* DIFFERENCE */}
    <td className="border p-2">
      ΔL {dL}
      <br />
      Δa {dA}
      <br />
      Δb {dB}
    </td>

    {/* TAPE */}
    <td className="border p-2">
      {row.tape || "-"}
    </td>

    {/* VISCOSITY */}
    <td className="border p-2">
      {row.viscosity || "-"}
    </td>

    {/* DELTA E */}
    <td className="border p-2">
  {row.deltaE?.toFixed(2)}
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