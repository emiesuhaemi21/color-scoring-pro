"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { useMemo, useState, useEffect } from "react";

import DeltaE from "delta-e";
import Color from "colorjs.io";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

type ColorRow = {
  color: string;

  enabled: boolean;

  tape: string;
  viscosity: number;

  targetL: number;
  targetA: number;
  targetB: number;

  measureL: number;
  measureA: number;
  measureB: number;
};

export default function MeasurementPage() {

  // REPORT NAME
  const [reportName, setReportName] =
    useState("");

  // SAVED REPORTS
  const [savedReports, setSavedReports] =
    useState<any[]>([]);
const [deltaMode, setDeltaMode] =
  useState("E2000");
  const [customer, setCustomer] =
  useState("");

const [article, setArticle] =
  useState("");

const [supplierPlate, setSupplierPlate] =
  useState("");

const [operator, setOperator] =
  useState("");

const [machine, setMachine] =
  useState("");

const [jobNumber, setJobNumber] =
  useState("");

const [condition, setCondition] =
  useState("D50-2");

const [opacity, setOpacity] =
  useState(false);
  // COLOR DATA
  const [rows, setRows] = useState<ColorRow[]>([
  {
    color: "Cyan",
    enabled: true,

    tape: "Medium",
viscosity: 18,

    targetL: 55,
    targetA: -35,
    targetB: -50,

    measureL: 54,
    measureA: -34,
    measureB: -49,
  },

  {
    color: "Magenta",
    enabled: true,

    tape: "Medium",
viscosity: 18,

    targetL: 48,
    targetA: 74,
    targetB: -5,

    measureL: 49,
    measureA: 72,
    measureB: -6,
  },

  {
    color: "Yellow",
    enabled: true,

    tape: "Medium",
viscosity: 18,

    targetL: 90,
    targetA: -5,
    targetB: 90,

    measureL: 91,
    measureA: -4,
    measureB: 88,
  },

  {
    color: "Black",
    enabled: true,

    tape: "Medium",
viscosity: 18,

    targetL: 20,
    targetA: 0,
    targetB: 0,

    measureL: 22,
    measureA: 1,
    measureB: 1,
  },

  {
    color: "Orange",
    enabled: false,

    tape: "Medium",
viscosity: 18,

    targetL: 70,
    targetA: 35,
    targetB: 75,

    measureL: 71,
    measureA: 36,
    measureB: 74,
  },

  {
    color: "Green",
    enabled: false,

    tape: "Medium",
viscosity: 18,

    targetL: 60,
    targetA: -60,
    targetB: 30,

    measureL: 59,
    measureA: -59,
    measureB: 29,
  },

  {
    color: "Violet",
    enabled: false,

    tape: "Medium",
viscosity: 18,

    targetL: 40,
    targetA: 40,
    targetB: -45,

    measureL: 42,
    measureA: 39,
    measureB: -44,
  },

  {
    color: "White",
    enabled: false,

    tape: "Medium",
viscosity: 18,

    targetL: 98,
    targetA: 0,
    targetB: 2,

    measureL: 97,
    measureA: 1,
    measureB: 3,
  },

  {
    color: "Spot 1",
    enabled: false,

    tape: "Medium",
viscosity: 18,

    targetL: 50,
    targetA: 50,
    targetB: 50,

    measureL: 51,
    measureA: 49,
    measureB: 52,
  },

  {
    color: "Spot 2",
    enabled: false,

    tape: "Medium",
viscosity: 18,

    targetL: 45,
    targetA: 20,
    targetB: 10,

    measureL: 44,
    measureA: 21,
    measureB: 11,
  },

  {
    color: "Spot 3",
    enabled: false,

    tape: "Medium",
viscosity: 18,

    targetL: 30,
    targetA: 10,
    targetB: -10,

    measureL: 29,
    measureA: 11,
    measureB: -11,
  },
]);

  // LOAD REPORTS
  useEffect(() => {

    const stored =
      localStorage.getItem(
        "color-scoring-reports"
      );

    if (stored) {
      setSavedReports(JSON.parse(stored));
    }

  }, []);

  // DELTA E 2000
  const calculateDeltaE = (
  row: ColorRow
) => {

  // DELTA E 2000
  if (deltaMode === "E2000") {

    const result =
      DeltaE.getDeltaE00(
        {
          L: row.targetL,
          A: row.targetA,
          B: row.targetB,
        },

        {
          L: row.measureL,
          A: row.measureA,
          B: row.measureB,
        }
      );

    return Number(result.toFixed(2));
  }

  // DELTA E 94
  if (deltaMode === "E94") {

    const result =
      DeltaE.getDeltaE94(
        {
          L: row.targetL,
          A: row.targetA,
          B: row.targetB,
        },

        {
          L: row.measureL,
          A: row.measureA,
          B: row.measureB,
        }
      );

    return Number(result.toFixed(2));
  }

  // DELTA E 76
  const result =
    DeltaE.getDeltaE76(
      {
        L: row.targetL,
        A: row.targetA,
        B: row.targetB,
      },

      {
        L: row.measureL,
        A: row.measureA,
        B: row.measureB,
      }
    );

  return Number(result.toFixed(2));
};
  // SCORE ENGINE
  const calculateScore = (
    de: number
  ) => {

    if (de <= 1) return 100;
    if (de <= 2) return 90;
    if (de <= 3) return 80;
    if (de <= 4) return 70;
    if (de <= 5) return 60;

    return 50;
  };

  // ACTIVE COLORS
const activeRows =
  rows.filter(
    (row) => row.enabled
  );

// TOTAL SCORE
const totalScore = useMemo(() => {

  const total =
    activeRows.reduce((acc, row) => {

      const de =
        calculateDeltaE(row);

      return (
        acc +
        calculateScore(de)
      );

    }, 0) / activeRows.length;

  return Math.round(total);

}, [activeRows]);

  // STATUS
  const getStatus = (
    score: number
  ) => {

    if (score >= 90)
      return {
        label: "EXCELLENT",
        color: "text-green-400",
      };

    if (score >= 70)
      return {
        label: "GOOD",
        color: "text-green-300",
      };

    if (score >= 60)
      return {
        label: "WARNING",
        color: "text-yellow-400",
      };

    return {
      label: "FAIL",
      color: "text-red-400",
    };
  };

  const status =
    getStatus(totalScore);

    const getLabColor = (
  l: number,
  a: number,
  b: number
) => {

  try {

    const color =
      new Color(
        "lab",
        [l, a, b]
      );

    return color.to("srgb").toString();

  } catch {

    return "#777777";
  }
};

  // UPDATE INPUT
  const updateValue = (
    index: number,
    field: keyof ColorRow,
    value: string
  ) => {

    const updated = [...rows];

    updated[index] = {
      ...updated[index],

      [field]:
        field === "color"
          ? value
          : Number(value),
    };

    setRows(updated);
  };

  // SAVE REPORT
  const saveReport = () => {

    const report = {
      id: Date.now(),

      reportName,

      date:
        new Date().toLocaleString(),

      totalScore,

      rows,
    };

    const updatedReports = [
      report,
      ...savedReports,
    ];

    setSavedReports(updatedReports);

    localStorage.setItem(
      "color-scoring-reports",
      JSON.stringify(updatedReports)
    );

    alert("Report Saved!");
  };
  // EXPORT PDF
const exportPDF = async () => {

  const input =
    document.getElementById(
      "report-area"
    );

  if (!input) return;

  const canvas =
    await html2canvas(input, {
      scale: 2,
    });

  const imgData =
    canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth =
    pdf.internal.pageSize.getWidth();

  const pdfHeight =
    (canvas.height * pdfWidth) /
    canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    pdfWidth,
    pdfHeight
  );

  pdf.save(
    "color-scoring-report.pdf"
  );
};

  
  // TVI GRAPH
  const tviData = [
    {
      value: 0,
      standard: 0,
      measure: 0,
    },

    {
      value: 25,
      standard: 26,
      measure: 28,
    },

    {
      value: 50,
      standard: 52,
      measure: 55,
    },

    {
      value: 75,
      standard: 76,
      measure: 78,
    },

    {
      value: 100,
      standard: 100,
      measure: 100,
    },
  ];

  // DELTA GRAPH
  const deltaGraph =
    activeRows.map((row) => ({
      color:
        row.color.charAt(0),

      de:
        calculateDeltaE(row),
    }));

  // LAB GRAPH
  const labGraph =
    activeRows.map((row) => ({
      color:
        row.color.charAt(0),

      value:
        row.measureL -
        row.targetL,
    }));

  return (
    <main
  id="report-area"
  className="min-h-screen bg-[#111827] text-white p-4"
>
     {/* TOP NAVIGATION */}

<div className="flex flex-wrap gap-3 mb-5">

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
    href="/history"
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    History
  </a>

  <a
    href="/settings"
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    Settings
  </a>

  <button
    onClick={exportPDF}
    className="bg-cyan-500 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    Export PDF
  </button>

</div>
<div className="bg-[#1F2937] rounded-3xl p-5 border border-gray-700 mb-6">

  <h2 className="text-xl font-bold mb-5">
    Report Information
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <input
      type="text"
      placeholder="PT Customer"
      value={customer}
      onChange={(e) =>
        setCustomer(e.target.value)
      }
      className="bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
    />

    <input
      type="text"
      placeholder="Article"
      value={article}
      onChange={(e) =>
        setArticle(e.target.value)
      }
      className="bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
    />

    <input
      type="text"
      placeholder="Supplier Plate"
      value={supplierPlate}
      onChange={(e) =>
        setSupplierPlate(e.target.value)
      }
      className="bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
    />

    <input
      type="text"
      placeholder="Operator"
      value={operator}
      onChange={(e) =>
        setOperator(e.target.value)
      }
      className="bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
    />

    <input
      type="text"
      placeholder="Machine"
      value={machine}
      onChange={(e) =>
        setMachine(e.target.value)
      }
      className="bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
    />

    <input
      type="text"
      placeholder="Job Number"
      value={jobNumber}
      onChange={(e) =>
        setJobNumber(e.target.value)
      }
      className="bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
    />

  </div>

  <div className="grid md:grid-cols-2 gap-4 mt-4">

    <select
      value={condition}
      onChange={(e) =>
        setCondition(e.target.value)
      }
      className="bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3"
    >

      <option>D50-2</option>
      <option>D65-10</option>
      <option>M0</option>
      <option>M1</option>
      <option>M2</option>

    </select>

    <label className="flex items-center gap-3 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3">

      <input
        type="checkbox"
        checked={opacity}
        onChange={(e) =>
          setOpacity(e.target.checked)
        }
      />

      Use Opacity

    </label>

  </div>

</div>
      {/* HEADER */}
      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          Measurement
        </h1>

        <p className="text-gray-400 mt-1">
          Color Scoring Pro
        </p>
<div className="mt-5">

  <label className="text-sm text-gray-400">
    Delta E Mode
  </label>

  <select
    value={deltaMode}
    onChange={(e) =>
      setDeltaMode(e.target.value)
    }
    className="w-full mt-2 bg-[#1F2937] border border-gray-700 rounded-2xl px-4 py-3"
  >

    <option value="E2000">
      Delta E 2000
    </option>

    <option value="E94">
      Delta E 94
    </option>

    <option value="E76">
      Delta E 76
    </option>

  </select>

</div>
        

{/* COLOR CHANNELS */}

<div className="bg-[#1F2937] rounded-3xl p-5 mb-6 border border-gray-700">

  <h2 className="text-lg font-semibold mb-4">
    Color Channels
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

    {rows.map((row, index) => (

      <label
        key={index}
        className="flex items-center gap-3 bg-[#111827] border border-gray-700 rounded-2xl px-4 py-3 cursor-pointer"
      >

        <input
          type="checkbox"
          checked={row.enabled}
          onChange={(e) => {

            const updated =
              [...rows];

            updated[index].enabled =
              e.target.checked;

            setRows(updated);
          }}
        />

        <span>
          {row.color}
        </span>

      </label>

    ))}

  </div>

</div>

      {/* SCORE */}
      <div className="bg-[#1F2937] rounded-3xl p-6 mb-6 border border-gray-700 shadow-xl">

        <h2 className="text-center text-gray-400 text-sm">
          TOTAL SCORE
        </h2>

        <div className="text-center mt-4">

          <div className={`text-6xl font-bold ${status.color}`}>
            {totalScore}%
          </div>

          <div className={`mt-2 text-2xl font-semibold ${status.color}`}>
            {status.label}
          </div>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-[#1F2937] rounded-3xl p-5 border border-gray-700 overflow-x-auto">

        <h2 className="text-lg font-semibold mb-4">
          Measurement Table
        </h2>

        <table className="w-full text-sm min-w-[900px]">

          <thead>

            <tr className="text-gray-400 border-b border-gray-700">

              <th className="text-left py-3">
  Review
</th>

              <th className="text-left py-3">
                Color
              </th>

              <th className="text-left">
                Target L
              </th>

              <th className="text-left">
                Target a
              </th>

              <th className="text-left">
                Target b
              </th>

              <th className="text-left">
                Measure L
              </th>

              <th className="text-left">
                Measure a
              </th>

              <th className="text-left">
  Measure b
</th>

<th className="text-left">
  ΔL
</th>

<th className="text-left">
  Δa
</th>

<th className="text-left">
  Δb
</th>

<th className="text-left">
  Tape
</th>

<th className="text-left">
  Viscosity
</th>

              <th className="text-left">
                Δ{deltaMode}
              </th>

              <th className="text-left">
                Score
              </th>

            </tr>

          </thead>

          <tbody>

  {activeRows.map((row, index) => {

              const de =
                calculateDeltaE(row);

              const score =
                calculateScore(de);

              const rowStatus =
                getStatus(score);

              return (
                <tr
                  key={index}
                  className="border-b border-gray-800"
                >
<td className="py-3">

  <div
    className="w-12 h-12 rounded-xl border border-gray-600"
    style={{
      backgroundColor:
        getLabColor(
          row.measureL,
          row.measureA,
          row.measureB
        ),
    }}
  />

</td>

                  <td className="py-3 pr-2 font-medium">
                    {row.color}
                  </td>

                  {/* TARGET L */}
                  <td>
                    <input
                      type="number"
                      value={row.targetL}
                      onChange={(e) =>
                        updateValue(
                          index,
                          "targetL",
                          e.target.value
                        )
                      }
                      className="w-20 bg-[#111827] border border-gray-600 rounded-lg px-2 py-2"
                    />
                  </td>

                  {/* TARGET A */}
                  <td>
                    <input
                      type="number"
                      value={row.targetA}
                      onChange={(e) =>
                        updateValue(
                          index,
                          "targetA",
                          e.target.value
                        )
                      }
                      className="w-20 bg-[#111827] border border-gray-600 rounded-lg px-2 py-2"
                    />
                  </td>

                  {/* TARGET B */}
                  <td>
                    <input
                      type="number"
                      value={row.targetB}
                      onChange={(e) =>
                        updateValue(
                          index,
                          "targetB",
                          e.target.value
                        )
                      }
                      className="w-20 bg-[#111827] border border-gray-600 rounded-lg px-2 py-2"
                    />
                  </td>

                  {/* MEASURE L */}
                  <td>
                    <input
                      type="number"
                      value={row.measureL}
                      onChange={(e) =>
                        updateValue(
                          index,
                          "measureL",
                          e.target.value
                        )
                      }
                      className="w-20 bg-[#111827] border border-gray-600 rounded-lg px-2 py-2"
                    />
                  </td>

                  {/* MEASURE A */}
                  <td>
                    <input
                      type="number"
                      value={row.measureA}
                      onChange={(e) =>
                        updateValue(
                          index,
                          "measureA",
                          e.target.value
                        )
                      }
                      className="w-20 bg-[#111827] border border-gray-600 rounded-lg px-2 py-2"
                    />
                  </td>

                  {/* MEASURE B */}
                  <td>
                    <input
                      type="number"
                      value={row.measureB}
                      onChange={(e) =>
                        updateValue(
                          index,
                          "measureB",
                          e.target.value
                        )
                      }
                      className="w-20 bg-[#111827] border border-gray-600 rounded-lg px-2 py-2"
                    />
                  </td>
                  {/* DELTA L */}
<td
  className={
    Math.abs(
      row.measureL -
      row.targetL
    ) > 2
      ? "text-red-400 font-bold"
      : "text-green-400"
  }
>
  {(
    row.measureL -
    row.targetL
  ).toFixed(2)}
</td>

{/* DELTA A */}
<td
  className={
    Math.abs(
      row.measureA -
      row.targetA
    ) > 2
      ? "text-red-400 font-bold"
      : "text-green-400"
  }
>
  {(
    row.measureA -
    row.targetA
  ).toFixed(2)}
</td>

{/* DELTA B */}
<td
  className={
    Math.abs(
      row.measureB -
      row.targetB
    ) > 2
      ? "text-red-400 font-bold"
      : "text-green-400"
  }
>
  {(
    row.measureB -
    row.targetB
  ).toFixed(2)}
</td>

{/* TAPE */}
<td>

  <select
    value={row.tape}
    onChange={(e) =>
      updateValue(
        index,
        "tape",
        e.target.value
      )
    }
    className="bg-[#111827] border border-gray-600 rounded-lg px-2 py-2"
  >

    <option value="Soft">
      Soft
    </option>

    <option value="Medium">
      Medium
    </option>

    <option value="Hard">
      Hard
    </option>

  </select>

</td>

{/* VISCOSITY */}
<td>

  <input
    type="number"
    value={row.viscosity}
    onChange={(e) =>
      updateValue(
        index,
        "viscosity",
        e.target.value
      )
    }
    className="w-24 bg-[#111827] border border-gray-600 rounded-lg px-2 py-2"
  />

</td>

                  {/* DELTA */}
                  <td className="font-semibold">
                    {de}
                  </td>

                  {/* SCORE */}
                  <td className={rowStatus.color}>
                    {score}%
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* GRAPH */}
      <div className="mt-6 space-y-5">

        {/* TVI */}
        <div className="bg-[#1F2937] rounded-3xl p-5 border border-gray-700 h-72">

          <h2 className="text-lg font-semibold mb-3">
            Dot Gain Curve
          </h2>

          <ResponsiveContainer width="100%" height={220}>

            <LineChart data={tviData}>

              <CartesianGrid stroke="#374151" />

              <XAxis
                dataKey="value"
                stroke="#9CA3AF"
              />

              <YAxis stroke="#9CA3AF" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="standard"
                stroke="#9CA3AF"
                strokeWidth={2}
              />

              <Line
                type="monotone"
                dataKey="measure"
                stroke="#22D3EE"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* DELTA GRAPH */}
        <div className="bg-[#1F2937] rounded-3xl p-5 border border-gray-700 h-72">

          <h2 className="text-lg font-semibold mb-3">
            Delta E Graph
          </h2>

          <ResponsiveContainer width="100%" height={220}>

            <BarChart data={deltaGraph}>

              <CartesianGrid stroke="#374151" />

              <XAxis
                dataKey="color"
                stroke="#9CA3AF"
              />

              <YAxis stroke="#9CA3AF" />

              <Tooltip />

              <Bar
                dataKey="de"
                fill="#22D3EE"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* LAB GRAPH */}
        <div className="bg-[#1F2937] rounded-3xl p-5 border border-gray-700 h-72">

          <h2 className="text-lg font-semibold mb-3">
            LAB Difference Graph
          </h2>

          <ResponsiveContainer width="100%" height={220}>

            <LineChart data={labGraph}>

              <CartesianGrid stroke="#374151" />

              <XAxis
                dataKey="color"
                stroke="#9CA3AF"
              />

              <YAxis stroke="#9CA3AF" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#4ADE80"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>
{/* SAVE */}
        <div className="mt-5">

          <input
            type="text"
            placeholder="Report Name"
            value={reportName}
            onChange={(e) =>
              setReportName(
                e.target.value
              )
            }
            className="w-full bg-[#1F2937] border border-gray-700 rounded-2xl px-4 py-3"
          />

          <button
            onClick={saveReport}
            className="w-full mt-3 bg-cyan-500 hover:bg-cyan-400 rounded-2xl py-4 font-bold"
          >
            Save Report
          </button>

        </div>

      </div>
      {/* SAVED REPORTS */}
      <div className="mt-8 bg-[#1F2937] rounded-3xl p-5 border border-gray-700">

        <h2 className="text-xl font-bold mb-4">
          Saved Reports
        </h2>

        <div className="space-y-3">

          {savedReports.map((report) => (

            <div
              key={report.id}
              className="bg-[#111827] rounded-2xl p-4 border border-gray-800"
            >

              <div className="flex items-center justify-between">

                <div>

                  <div className="font-semibold">
                    {report.reportName || "Untitled Report"}
                  </div>

                  <div className="text-sm text-gray-400 mt-1">
                    {report.date}
                  </div>

                </div>

                <div className="text-cyan-400 font-bold text-xl">
                  {report.totalScore}%
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}