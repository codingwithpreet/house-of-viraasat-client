export interface SizeChartRow {
  size: string;
  chest: string;
  waist: string;
  hip: string;
  shoulder: string;
  length: string;
}

export interface ColorVariant {
  name: string;
  hex: string;
  available: boolean;
}

export interface SizeVariant {
  size: string;
  label: string;
  available: boolean;
}

export interface FitVariant {
  label: string;
  value: string;
  description: string;
}

export const sizeChart: SizeChartRow[] = [
  { size: "36", chest: '36"', waist: '30"', hip: '38"', shoulder: '17"', length: '44"' },
  { size: "38", chest: '38"', waist: '32"', hip: '40"', shoulder: '17.5"', length: '45"' },
  { size: "40", chest: '40"', waist: '34"', hip: '42"', shoulder: '18"', length: '46"' },
  { size: "42", chest: '42"', waist: '36"', hip: '44"', shoulder: '18.5"', length: '47"' },
  { size: "44", chest: '44"', waist: '38"', hip: '46"', shoulder: '19"', length: '48"' },
  { size: "46", chest: '46"', waist: '40"', hip: '48"', shoulder: '19.5"', length: '49"' },
  { size: "48", chest: '48"', waist: '42"', hip: '50"', shoulder: '20"', length: '50"' },
];

export const colorVariants: ColorVariant[] = [
  { name: "Imperial Cream", hex: "#F5F0E8", available: true },
  { name: "Champagne Gold", hex: "#E8D5A3", available: true },
  { name: "Ivory White", hex: "#FDFBF7", available: false },
  { name: "Pearl Blush", hex: "#F2E4D8", available: true },
];

export const sizeVariants: SizeVariant[] = [
  { size: "36", label: "36", available: false },
  { size: "38", label: "38", available: true },
  { size: "40", label: "40", available: true },
  { size: "42", label: "42", available: true },
  { size: "44", label: "44", available: true },
  { size: "46", label: "46", available: false },
  { size: "48", label: "48", available: false },
];

export const fitVariants: FitVariant[] = [
  {
    label: "Structured",
    value: "structured",
    description: "Classic structured silhouette with canvas interior for sharp posture",
  },
  {
    label: "Slim Fit",
    value: "slim",
    description: "A closer-to-body fit that accentuates the torso",
  },
  {
    label: "Classic",
    value: "classic",
    description: "Relaxed traditional drape with comfortable movement",
  },
];
