"use client";


import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { ColorPackage, ColorEntry, LibraryType } from "@/types/color-library";

function labToRgb(l: number, a: number, b: number) {
  let y = (l + 16) / 116;
  let x = a / 500 + y;
  let z = y - b / 200;

  const xyz2 = (v: number) =>
    v ** 3 > 0.008856 ? v ** 3 : (v - 16 / 116) / 7.787;

  x = xyz2(x) * 0.95047;
  y = xyz2(y) * 1.0;
  z = xyz2(z) * 1.08883;

  let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let b_ = x * 0.0557 + y * -0.2040 + z * 1.0570;

  const gamma = (c: number) => {
    c = c <= 0 ? 0 : c >= 1 ? 1 : c;
    return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
  };

  return [
    Math.round(gamma(r) * 255),
    Math.round(gamma(g) * 255),
    Math.round(gamma(b_) * 255),
  ];
}

export default function ColorLibrary() {
  const [packages, setPackages] = useState<ColorPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<number>(1);
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [newPackageName, setNewPackageName] = useState("");
  const [newPackageType, setNewPackageType] = useState<LibraryType>("Standard");
  const [searchText, setSearchText] = useState("");

  const [editingPackageId, setEditingPackageId] = useState<number | null>(null);
  const [editPackageName, setEditPackageName] = useState("");
  const [editPackageType, setEditPackageType] = useState<LibraryType>("Standard");

  const [colors, setColors] = useState<ColorEntry[]>([]);
  
  const [showFormulaId, setShowFormulaId] = useState<number | null>(null);

  const [showAddColor, setShowAddColor] = useState(false);
  const [newColorName, setNewColorName] = useState("");
  const [newL, setNewL] = useState("");
  const [newA, setNewA] = useState("");
  const [newB, setNewB] = useState("");

  // Formula
  const [formula1Ink, setFormula1Ink] = useState("");
  const [formula1Percent, setFormula1Percent] = useState("");

  const [formula2Ink, setFormula2Ink] = useState("");
  const [formula2Percent, setFormula2Percent] = useState("");

  const [formula3Ink, setFormula3Ink] = useState("");
  const [formula3Percent, setFormula3Percent] = useState("");

  const [formula4Ink, setFormula4Ink] = useState("");
  const [formula4Percent, setFormula4Percent] = useState("");

  const [editFormula1Ink, setEditFormula1Ink] = useState("");
  const [editFormula1Percent, setEditFormula1Percent] = useState("");

  const [editFormula2Ink, setEditFormula2Ink] = useState("");
  const [editFormula2Percent, setEditFormula2Percent] = useState("");

  const [editFormula3Ink, setEditFormula3Ink] = useState("");
  const [editFormula3Percent, setEditFormula3Percent] = useState("");

  const [editFormula4Ink, setEditFormula4Ink] = useState("");
  const [editFormula4Percent, setEditFormula4Percent] = useState("");
    

  const [editingColorId, setEditingColorId] = useState<number | null>(null);
  const [editColorName, setEditColorName] = useState("");
  const [editL, setEditL] = useState("");
  const [editA, setEditA] = useState("");
  const [editB, setEditB] = useState("");

  const filteredColors = colors
    .filter((c) => c.packageId === selectedPackage)
    .filter((c) => c.name.toLowerCase().includes(searchText.toLowerCase()));

  useEffect(() => {
    const savedPackages = localStorage.getItem("color-packages");
    const savedColors = localStorage.getItem("color-library-colors");

    if (savedPackages && JSON.parse(savedPackages).length > 0) {
      setPackages(JSON.parse(savedPackages));
    } else {
      setPackages([
        { id: 1, type: "Standard", name: "Quick Standard", description: "Basic process colors" },
        { id: 2, type: "Standard", name: "FOGRA39", description: "FOGRA reference" },
        { id: 3, type: "Standard", name: "ISO Coated V2", description: "ISO reference" },
        { id: 4, type: "Standard", name: "Solid Coated", description: "Solid coated reference" },
        { id: 5, type: "Standard", name: "Solid Coated2", description: "Second solid coated set" },
        { id: 6, type: "Pantone", name: "Pantone", description: "Pantone reference colors" },
      ]);
    }

    if (savedColors && JSON.parse(savedColors).length > 0) {
      setColors(JSON.parse(savedColors));
    } else {
      setColors([
        { id: 1, packageId: 1, name: "Process Cyan", l: 55, a: -35, b: -50 },
        { id: 2, packageId: 1, name: "Process Magenta", l: 48, a: 74, b: -5 },
        { id: 3, packageId: 1, name: "Process Yellow", l: 90, a: -5, b: 90 },
        { id: 4, packageId: 1, name: "Process Black", l: 20, a: 0, b: 0 },
        { id: 5, packageId: 2, name: "Cyan FOGRA39", l: 56, a: -37, b: -50 },
        { id: 6, packageId: 2, name: "Magenta FOGRA39", l: 49, a: 75, b: -3 },
        { id: 7, packageId: 2, name: "Yellow FOGRA39", l: 89, a: -4, b: 88 },
        { id: 8, packageId: 2, name: "Black FOGRA39", l: 18, a: 0, b: 0 },
        { id: 9, packageId: 3, name: "Cyan ISO", l: 57, a: -36, b: -48 },
        { id: 10, packageId: 3, name: "Magenta ISO", l: 50, a: 73, b: -4 },
        { id: 11, packageId: 3, name: "Yellow ISO", l: 88, a: -3, b: 87 },
        { id: 12, packageId: 3, name: "Black ISO", l: 19, a: 0, b: 0 },
        { id: 13, packageId: 4, name: "Cyan Solid", l: 54, a: -32, b: -46 },
        { id: 14, packageId: 4, name: "Magenta Solid", l: 49, a: 71, b: -2 },
        { id: 15, packageId: 4, name: "Yellow Solid", l: 87, a: -4, b: 85 },
        { id: 16, packageId: 4, name: "Black Solid", l: 18, a: 0, b: 0 },
        { id: 17, packageId: 5, name: "Cyan Solid2", l: 55, a: -34, b: -48 },
        { id: 18, packageId: 5, name: "Magenta Solid2", l: 50, a: 72, b: -1 },
        { id: 19, packageId: 5, name: "Yellow Solid2", l: 88, a: -3, b: 86 },
        { id: 20, packageId: 5, name: "Black Solid2", l: 19, a: 0, b: 0 },
        { id: 21, packageId: 6, name: "Pantone Red", l: 53, a: 80, b: 67 },
        { id: 22, packageId: 6, name: "Pantone Blue", l: 32, a: 15, b: -70 },
        { id: 23, packageId: 6, name: "Pantone Green", l: 72, a: -45, b: 55 },
        { id: 24, packageId: 6, name: "Pantone Yellow", l: 93, a: -2, b: 92 },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("color-packages", JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem("color-library-colors", JSON.stringify(colors));
  }, [colors]);

const addColor = () => {
  if (!newColorName || newL === "" || newA === "" || newB === "") {
    return alert("Fill all fields");
  }

  if (isNaN(Number(newL)) || isNaN(Number(newA)) || isNaN(Number(newB))) {
    return alert("L, a, b must be numbers");
  }

  setColors([
    ...colors,
    {
      id: Date.now(),
      packageId: selectedPackage,
      name: newColorName,
      l: Number(newL),
      a: Number(newA),
      b: Number(newB),

      formula: [
        { ink: formula1Ink, percent: Number(formula1Percent) },
        { ink: formula2Ink, percent: Number(formula2Percent) },
        { ink: formula3Ink, percent: Number(formula3Percent) },
        { ink: formula4Ink, percent: Number(formula4Percent) },
      ].filter((f) => f.ink && !isNaN(f.percent)),
    },
  ]);

  setNewColorName("");
  setNewL("");
  setNewA("");
  setNewB("");

  setFormula1Ink("");
  setFormula1Percent("");
  setFormula2Ink("");
  setFormula2Percent("");
  setFormula3Ink("");
  setFormula3Percent("");
  setFormula4Ink("");
  setFormula4Percent("");

  setShowAddColor(false);
};

  const deleteColor = (id: number) => {
    setColors(colors.filter((c) => c.id !== id));
  };

  const startEditColor = (color: ColorEntry) => {
    setEditingColorId(color.id);
    setEditColorName(color.name);
    setEditL(color.l.toString());
    setEditA(color.a.toString());
    setEditB(color.b.toString());
    setShowAddColor(true);
  };

 const saveEditColor = () => {
  if (editingColorId === null) return;

  setColors(
    colors.map((c) =>
      c.id === editingColorId
        ? {
            ...c,
            name: editColorName,
            l: Number(editL),
            a: Number(editA),
            b: Number(editB),

            formula: [
              { ink: editFormula1Ink, percent: Number(editFormula1Percent) },
              { ink: editFormula2Ink, percent: Number(editFormula2Percent) },
              { ink: editFormula3Ink, percent: Number(editFormula3Percent) },
              { ink: editFormula4Ink, percent: Number(editFormula4Percent) },
            ].filter((f) => f.ink && !isNaN(f.percent)),
          }
        : c
    )
  );

  setEditingColorId(null);
  setEditColorName("");
  setEditL("");
  setEditA("");
  setEditB("");

  setEditFormula1Ink("");
  setEditFormula1Percent("");
  setEditFormula2Ink("");
  setEditFormula2Percent("");
  setEditFormula3Ink("");
  setEditFormula3Percent("");
  setEditFormula4Ink("");
  setEditFormula4Percent("");

  setShowAddColor(false);
};

  const importCXF = (file: File) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    const text = e.target?.result;

    if (typeof text !== "string") return;

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    const objects = Array.from(
      xml.getElementsByTagNameNS("*", "Object")
    );

    const pantoneColors = objects
      .map((obj, index) => {
        const name =
          obj.getAttribute("Name") ||
          `Pantone ${index + 1}`;

        const lab =
          obj.getElementsByTagNameNS("*", "ColorCIELab")[0];

        if (!lab) return null;

        const l = Number(
          lab.getElementsByTagNameNS("*", "L")[0]?.textContent || 0
        );

        const a = Number(
          lab.getElementsByTagNameNS("*", "A")[0]?.textContent || 0
        );

        const b = Number(
          lab.getElementsByTagNameNS("*", "B")[0]?.textContent || 0
        );

        return {
          id: Date.now() + index,
          packageId: selectedPackage,
          name,
          l,
          a,
          b,
        };
      })
      .filter(Boolean) as ColorEntry[];

    setColors([
      ...colors,
      ...pantoneColors,
    ]);

    alert(
      `${pantoneColors.length} colors imported`
    );
  };

  reader.readAsText(file);
};

const exportCXF = () => {
  const selectedPkg =
    packages.find(
      (p) => p.id === selectedPackage
    );

  if (!selectedPkg) {
    alert("Package not found");
    return;
  }

  const packageColors =
    colors.filter(
      (c) => c.packageId === selectedPackage
    );

  if (packageColors.length === 0) {
    alert("No colors in this package");
    return;
  }

  const xmlColors =
    packageColors
      .map(
        (c) => `
  <cc:Object Name="${c.name}">
    <cc:ColorCIELab>
      <cc:L>${c.l}</cc:L>
      <cc:A>${c.a}</cc:A>
      <cc:B>${c.b}</cc:B>
    </cc:ColorCIELab>
  </cc:Object>`
      )
      .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<cc:ColorCollection xmlns:cc="http://www.xrite.com/cc">
${xmlColors}
</cc:ColorCollection>`;

  const blob = new Blob(
    [xml],
    { type: "application/xml" }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download =
    `${selectedPkg.name}.cxf`;

  link.click();

  URL.revokeObjectURL(url);
};

const [openPackageMenu, setOpenPackageMenu] =
useState<number | null>(null);
const [openColorMenu, setOpenColorMenu] =
useState<number | null>(null);
  return (
    <main className="min-h-screen bg-[#111827] text-white p-5">
      <div className="flex flex-wrap gap-3 mb-8">

  <button
    onClick={() => (window.location.href = "/")}
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    Home
  </button>

  <button
    onClick={() => (window.location.href = "/new-report")}
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    New Report
  </button>

  <button
    onClick={() => (window.location.href = "/color-library")}
    className="bg-cyan-500 border border-cyan-400 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    Color Library
  </button>

  <button
    onClick={() => (window.location.href = "/history")}
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    My Report
  </button>

  <button
    onClick={() => (window.location.href = "/settings")}
    className="bg-[#1F2937] border border-gray-700 px-4 py-3 rounded-2xl text-sm font-medium"
  >
    Settings
  </button>

</div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold">Color Library</h1>
        <p className="text-gray-400 mt-2">Manage color packages and LAB references</p>
      </div>

      <button onClick={() => setShowAddPackage(true)} className="bg-cyan-500 hover:bg-cyan-400 text-white px-5 py-3 rounded-2xl font-bold mb-5">
        + New Package
      </button>

      {showAddPackage && (
        <div className="bg-[#1F2937] border border-gray-700 rounded-3xl p-5 mb-5 space-y-3">
          <input type="text" placeholder="Package Name" value={newPackageName} onChange={(e) => setNewPackageName(e.target.value)} className="bg-[#111827] border border-gray-700 p-3 rounded-2xl w-full outline-none" />
          <select value={newPackageType} onChange={(e) => setNewPackageType(e.target.value as LibraryType)} className="bg-[#111827] border border-gray-700 p-3 rounded-2xl w-full outline-none">
            <option value="Standard">Standard</option>
            <option value="Customer">Customer</option>
            <option value="Job">Job</option>
            <option value="Pantone">Pantone</option>
          </select>
          <div className="flex gap-3">
            <button onClick={() => {
              setPackages([...packages, { id: Date.now(), name: newPackageName, type: newPackageType, description: "Custom Package" }]);
              setNewPackageName("");
              setNewPackageType("Standard");
              setShowAddPackage(false);
            }} className="flex-1 bg-cyan-500 hover:bg-cyan-400 px-4 py-3 rounded-2xl font-bold">
              Add Package
            </button>
            <button onClick={() => setShowAddPackage(false)} className="flex-1 bg-gray-600 hover:bg-gray-500 px-4 py-3 rounded-2xl font-bold">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className={`rounded-3xl p-5 border shadow-xl ${selectedPackage === pkg.id ? "bg-[#123040] border-cyan-500" : "bg-[#1F2937] border-gray-700"}`}>
            <div className="flex justify-between items-center gap-4">
              <div onClick={() => setSelectedPackage(pkg.id)} className="cursor-pointer">
                <div className="text-xl font-bold">{pkg.name}</div>
                <div className="text-cyan-400 text-sm mt-1">{pkg.type}</div>
                <p className="text-gray-400 mt-1">{pkg.description}</p>
              </div>
              <div className="relative">

<button

onClick={()=>

setOpenPackageMenu(

openPackageMenu===pkg.id

? null

: pkg.id

)

}

className="
p-2
rounded-xl
hover:bg-gray-700
"

>

<MoreVertical size={20} />

</button>

{openPackageMenu===pkg.id && (

<div

className="
absolute
right-0
top-12
w-36
bg-[#111827]
border
border-gray-700
rounded-2xl
overflow-hidden
z-50
"

>

<button

onClick={()=>{

setEditingPackageId(pkg.id);

setEditPackageName(pkg.name);

setEditPackageType(pkg.type);

setOpenPackageMenu(null);

}}

className="
w-full
p-3
text-left
hover:bg-gray-700
"

>

Edit

</button>

<button

onClick={()=>{

setPackages(

packages.filter(

(p)=>p.id!==pkg.id

)

);

setColors(

colors.filter(

(c)=>c.packageId!==pkg.id

)

);

setOpenPackageMenu(null);

}}

className="
w-full
p-3
text-left
text-red-400
hover:bg-gray-700
"

>

Delete

</button>

</div>

)}

</div>
            </div>

            {editingPackageId === pkg.id && (
              <div className="bg-[#111827] border border-gray-700 rounded-2xl p-4 mt-4 space-y-3">
                <input type="text" value={editPackageName} onChange={(e) => setEditPackageName(e.target.value)} className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl w-full outline-none" />
                <select value={editPackageType} onChange={(e) => setEditPackageType(e.target.value as LibraryType)} className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl w-full outline-none">
                  <option value="Standard">Standard</option>
                  <option value="Customer">Customer</option>
                  <option value="Job">Job</option>
                  <option value="Pantone">Pantone</option>
                </select>
                <div className="flex gap-3">
                  <button onClick={() => {
                    setPackages(packages.map((p) => p.id === editingPackageId ? { ...p, name: editPackageName, type: editPackageType } : p));
                    setEditingPackageId(null);
                  }} className="flex-1 bg-cyan-500 hover:bg-cyan-400 px-4 py-3 rounded-2xl font-bold">
                    Save
                  </button>
                  <button onClick={() => setEditingPackageId(null)} className="flex-1 bg-gray-600 hover:bg-gray-500 px-4 py-3 rounded-2xl font-bold">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 bg-[#1F2937] border border-gray-700 rounded-3xl p-5">
        <div className="text-cyan-400 font-bold mb-2">
          Package Selected: {packages.find((p) => p.id === selectedPackage)?.name}
        </div>

        <h2 className="text-3xl font-bold mb-5">Colors</h2>

        <input type="text" placeholder="Search Color..." value={searchText} onChange={(e) => setSearchText(e.target.value)} className="bg-[#111827] border border-gray-700 rounded-2xl p-3 w-full mb-4 outline-none" />

        <div className="flex gap-3 mb-4">

  <button
    onClick={() =>
      setShowAddColor(true)
    }
    className="bg-cyan-500 text-white px-4 py-2 rounded-xl"
  >
    + Add Color
  </button>

  <label className="bg-purple-600 text-white px-4 py-2 rounded-xl cursor-pointer">

  Import CXF

  <input
    type="file"
    accept=".cxf,.xml"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (file) {
        importCXF(file);
      }
    }}
  />

</label>

<button
  onClick={exportCXF}
  className="bg-green-600 text-white px-4 py-2 rounded-xl"
>
  Export CXF
</button>

</div>

        {showAddColor && editingColorId === null && (
          <div className="bg-[#111827] border border-gray-700 rounded-2xl p-4 mb-5 space-y-3">
            <input type="text" placeholder="Color Name" value={newColorName} onChange={(e) => setNewColorName(e.target.value)} className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl w-full outline-none" />
            <input type="number" placeholder="L" value={newL} onChange={(e) => setNewL(e.target.value)} className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl w-full outline-none" />
            <input type="number" placeholder="a" value={newA} onChange={(e) => setNewA(e.target.value)} className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl w-full outline-none" />
            <input type="number" placeholder="b" value={newB} onChange={(e) => setNewB(e.target.value)} className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl w-full outline-none" />
            <div className="text-cyan-400 font-bold mt-2">
              Formula
            </div>

            <div className="grid grid-cols-2 gap-2">

              <input type="text" placeholder="Ink 1" value={formula1Ink} onChange={(e) => setFormula1Ink(e.target.value)} className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl" />
              <input type="number" placeholder="% 1" value={formula1Percent} onChange={(e) => setFormula1Percent(e.target.value)} className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl" />

              <input type="text" placeholder="Ink 2" value={formula2Ink} onChange={(e) => setFormula2Ink(e.target.value)} className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl" />
              <input type="number" placeholder="% 2" value={formula2Percent} onChange={(e) => setFormula2Percent(e.target.value)} className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl" />

              <input type="text" placeholder="Ink 3" value={formula3Ink} onChange={(e) => setFormula3Ink(e.target.value)} className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl" />
              <input type="number" placeholder="% 3" value={formula3Percent} onChange={(e) => setFormula3Percent(e.target.value)} className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl" />

              <input type="text" placeholder="Ink 4" value={formula4Ink} onChange={(e) => setFormula4Ink(e.target.value)} className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl" />
              <input type="number" placeholder="% 4" value={formula4Percent} onChange={(e) => setFormula4Percent(e.target.value)} className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl" />

            </div>
            <div className="flex gap-3">
              <button onClick={addColor} className="flex-1 bg-cyan-500 hover:bg-cyan-400 px-4 py-3 rounded-2xl font-bold">Add Color</button>
              <button onClick={() => setShowAddColor(false)} className="flex-1 bg-gray-600 hover:bg-gray-500 px-4 py-3 rounded-2xl font-bold">Cancel</button>
            </div>
          </div>
        )}

        {editingColorId !== null && (
  <div className="bg-[#111827] border border-gray-700 rounded-2xl p-4 mb-5 space-y-3">
    
    {/* Color Name & Lab */}
    <input
      type="text"
      placeholder="Color Name"
      value={editColorName}
      onChange={(e) => setEditColorName(e.target.value)}
      className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl w-full outline-none"
    />
    <input
      type="number"
      placeholder="L"
      value={editL}
      onChange={(e) => setEditL(e.target.value)}
      className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl w-full outline-none"
    />
    <input
      type="number"
      placeholder="a"
      value={editA}
      onChange={(e) => setEditA(e.target.value)}
      className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl w-full outline-none"
    />
    <input
      type="number"
      placeholder="b"
      value={editB}
      onChange={(e) => setEditB(e.target.value)}
      className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl w-full outline-none"
    />

    {/* Formula Edit */}
    <div className="text-cyan-400 font-bold mt-2">
      Formula
    </div>

    <div className="grid grid-cols-2 gap-2">
      <input
        type="text"
        placeholder="Ink 1"
        value={editFormula1Ink}
        onChange={(e) => setEditFormula1Ink(e.target.value)}
        className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl"
      />
      <input
        type="number"
        placeholder="% 1"
        value={editFormula1Percent}
        onChange={(e) => setEditFormula1Percent(e.target.value)}
        className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl"
      />

      <input
        type="text"
        placeholder="Ink 2"
        value={editFormula2Ink}
        onChange={(e) => setEditFormula2Ink(e.target.value)}
        className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl"
      />
      <input
        type="number"
        placeholder="% 2"
        value={editFormula2Percent}
        onChange={(e) => setEditFormula2Percent(e.target.value)}
        className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl"
      />

      <input
        type="text"
        placeholder="Ink 3"
        value={editFormula3Ink}
        onChange={(e) => setEditFormula3Ink(e.target.value)}
        className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl"
      />
      <input
        type="number"
        placeholder="% 3"
        value={editFormula3Percent}
        onChange={(e) => setEditFormula3Percent(e.target.value)}
        className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl"
      />

      <input
        type="text"
        placeholder="Ink 4"
        value={editFormula4Ink}
        onChange={(e) => setEditFormula4Ink(e.target.value)}
        className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl"
      />
      <input
        type="number"
        placeholder="% 4"
        value={editFormula4Percent}
        onChange={(e) => setEditFormula4Percent(e.target.value)}
        className="bg-[#1F2937] border border-gray-700 p-3 rounded-2xl"
      />
    </div>

    {/* Buttons Save / Cancel */}
    <div className="flex gap-3">
      <button
        onClick={saveEditColor}
        className="flex-1 bg-cyan-500 hover:bg-cyan-400 px-4 py-3 rounded-2xl font-bold"
      >
        Save
      </button>
      <button
        onClick={() => setEditingColorId(null)}
        className="flex-1 bg-gray-600 hover:bg-gray-500 px-4 py-3 rounded-2xl font-bold"
      >
        Cancel
      </button>
    </div>
  </div>
)}

        <div className="space-y-3">
          {filteredColors.map((color) => {
  const [r, g, b_] = labToRgb(color.l, color.a, color.b);

  return (
    <div key={color.id} className="bg-[#111827] border border-gray-700 rounded-2xl p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-lg">{color.name}</div>
          <div className="text-gray-400 text-sm">
            L {color.l} | a {color.a} | b {color.b}
          </div>
        </div>

        <div className="flex gap-2 items-center">

<div
className="w-12 h-12 rounded-xl border border-gray-500"
style={{
backgroundColor:`rgb(${r},${g},${b_})`
}}
/>

<div className="relative">

<button

onClick={()=>

setOpenColorMenu(

openColorMenu===color.id

? null

: color.id

)

}

className="
p-2
rounded-xl
hover:bg-gray-700
"

>

<MoreVertical size={20}/>

</button>

{openColorMenu===color.id && (

<div

className="
absolute
right-0
top-12
w-44
bg-[#111827]
border
border-gray-700
rounded-2xl
overflow-hidden
z-50
"

>

<button

onClick={()=>{

startEditColor(color);

setOpenColorMenu(null);

}}

className="
w-full
p-3
text-left
hover:bg-gray-700
"

>

Edit

</button>

<button

onClick={()=>{

deleteColor(color.id);

setOpenColorMenu(null);

}}

className="
w-full
p-3
text-left
text-red-400
hover:bg-gray-700
"

>

Delete

</button>

<button

onClick={()=>{

setShowFormulaId(

showFormulaId===color.id

? null

: color.id

);

setOpenColorMenu(null);

}}

className="
w-full
p-3
text-left
hover:bg-gray-700
"

>

{showFormulaId===color.id

? "Hide Formula"

: "View Formula"}

</button>

</div>

)}

</div>

</div>
      </div>

      {showFormulaId === color.id && (
        <div className="grid grid-cols-4 gap-2 text-sm mt-2">
  {color.formula && color.formula.length > 0 ? (
    color.formula.map((f, i) => (
      <div key={i} className="bg-gray-800 rounded-xl p-2 text-center">
        {f.ink} {f.percent}%
      </div>
    ))
  ) : (
    <div className="col-span-4 bg-gray-800 rounded-xl p-3 text-center text-gray-400">
      No formula added
    </div>
  )}
</div>
      )}
    </div>
  );
})}
        </div>
      </div>
    </main>
  );
}