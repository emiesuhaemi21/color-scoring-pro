export type LibraryType =
  | "Pantone"
  | "Standard"
  | "Customer"
  | "Job";

export type ColorPackage = {
  id: number;

  type: LibraryType;

  name: string;

  description: string;
};

export type ColorEntry = {
  id: number;

  packageId: number;

  name: string;

  l: number;
  a: number;
  b: number;
};