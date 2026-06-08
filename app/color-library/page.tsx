"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ColorPackage,
  ColorEntry,
} from "@/types/color-library";

export default function ColorLibraryPage() {

  const [
    packages,
    setPackages,
  ] = useState<
    ColorPackage[]
  >([]);

  const [
  colors,
  setColors,
] = useState<
  ColorEntry[]
>([]);

const [
  selectedPackage,
  setSelectedPackage,
] = useState(1);

  useEffect(() => {

    const saved =
      localStorage.getItem(
        "color-packages"
      );

    if (saved) {

  setPackages(
    JSON.parse(saved)
  );
  
localStorage.removeItem(
  "color-library-colors"
);
  const savedColors =
    localStorage.getItem(
      "color-library-colors"
    );

  if (
    savedColors &&
    JSON.parse(savedColors).length > 0
  ) {

    setColors(
      JSON.parse(savedColors)
    );

  } else {

    setColors([

  // QUICK STANDARD

  {
    id: 1,
    packageId: 1,
    name: "Process Cyan",
    l: 55,
    a: -35,
    b: -50,
  },

  {
    id: 2,
    packageId: 1,
    name: "Process Magenta",
    l: 48,
    a: 74,
    b: -5,
  },

  {
    id: 3,
    packageId: 1,
    name: "Process Yellow",
    l: 90,
    a: -5,
    b: 90,
  },

  {
    id: 4,
    packageId: 1,
    name: "Process Black",
    l: 20,
    a: 0,
    b: 0,
  },

  // FOGRA39

  {
    id: 5,
    packageId: 2,
    name: "Cyan FOGRA39",
    l: 56,
    a: -37,
    b: -50,
  },

  {
    id: 6,
    packageId: 2,
    name: "Magenta FOGRA39",
    l: 49,
    a: 75,
    b: -3,
  },

  {
    id: 7,
    packageId: 2,
    name: "Yellow FOGRA39",
    l: 89,
    a: -4,
    b: 88,
  },

  {
    id: 8,
    packageId: 2,
    name: "Black FOGRA39",
    l: 18,
    a: 0,
    b: 0,
  },

  // ISO COATED V2

  {
    id: 9,
    packageId: 3,
    name: "Cyan ISO",
    l: 57,
    a: -36,
    b: -48,
  },

  {
    id: 10,
    packageId: 3,
    name: "Magenta ISO",
    l: 50,
    a: 73,
    b: -4,
  },

  {
    id: 11,
    packageId: 3,
    name: "Yellow ISO",
    l: 88,
    a: -3,
    b: 87,
  },

  {
    id: 12,
    packageId: 3,
    name: "Black ISO",
    l: 19,
    a: 0,
    b: 0,
  },

]);

  }
console.log(colors);
  return;
}


    const defaults: ColorPackage[] = [

      {
        id: 1,
        type: "Standard",
        name:
          "Quick Standard",
        description:
          "Basic process colors",
      },

      {
        id: 2,
        type: "Standard",
        name:
          "FOGRA39",
        description:
          "FOGRA reference",
      },

      {
        id: 3,
        type: "Standard",
        name:
          "ISO Coated V2",
        description:
          "ISO reference",
      },

      {
        id: 4,
        type: "Pantone",
        name:
          "Pantone Coated",
        description:
          "Pantone coated library",
      },

      {
        id: 5,
        type: "Pantone",
        name:
          "Pantone Uncoated",
        description:
          "Pantone uncoated library",
      },

    ];

    

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "color-packages",
      JSON.stringify(
        packages
      )
    );

  }, [packages]);

  useEffect(() => {

  localStorage.setItem(
    "color-library-colors",
    JSON.stringify(
      colors
    )
  );

}, [colors]);

const filteredColors =
  colors.filter(
    (c) =>
      c.packageId ===
      selectedPackage
  );

  return (

    <main className="p-8">

      <h1 className="text-3xl font-bold mb-6">

        COLOR LIBRARY

      </h1>

      <div className="space-y-3">

        {packages.map(
  (pkg) => (

    <button
      key={pkg.id}
      onClick={() =>
        setSelectedPackage(
          pkg.id
        )
      }
      className={`
        w-full
        text-left
        border
        rounded-xl
        p-4

        ${
          selectedPackage === pkg.id
            ? "border-cyan-500 bg-cyan-50"
            : ""
        }
      `}
    >

              <div className="font-bold text-lg">

                {pkg.name}

              </div>

              <div className="text-sm opacity-70">

                {pkg.type}

              </div>

              <div className="mt-1">

                {pkg.description}

              </div>

            </button>

          )
        )}

      </div>

<div className="mt-10">

  <div className="mb-4 font-bold">

    Package Selected:
    {selectedPackage}

  </div>

  <h2 className="text-2xl font-bold mb-4">

    COLORS

  </h2>
  <button
  onClick={() => {

    const name =
      prompt(
        "Color Name"
      );

    if (!name) return;

    const l =
      Number(
        prompt("L")
      );

    const a =
      Number(
        prompt("a")
      );

    const b =
      Number(
        prompt("b")
      );

    setColors([
      ...colors,

      {
        id: Date.now(),

        packageId:
          selectedPackage,

        name,

        l,
        a,
        b,
      },
    ]);

  }}
  className="
    bg-cyan-500
    text-white
    px-4
    py-2
    rounded-xl
    mb-4
  "
>
  + New Color
</button>

{filteredColors.map((color) => (

    <div
      key={color.id}
      className="
        border
        rounded-xl
        p-3
        mb-2
      "
    >

      <div className="font-bold">

        {color.name}

      </div>

      <div>

        L {color.l}
        {" | "}
        a {color.a}
        {" | "}
        b {color.b}

      </div>

    </div>

  ))}

</div>

</main>

  );

}