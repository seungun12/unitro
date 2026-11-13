export type ConverterSlug =
  | "length-converter"
  | "weight-converter"
  | "temperature-converter"
  | "area-converter"
  | "volume-converter";

export interface UnitDefinition {
  id: string;
  label: string;
  symbol: string;
  description: string;
  commonValues: number[];
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface ConverterCategory {
  slug: ConverterSlug;
  title: string;
  description: string;
  units: UnitDefinition[];
  allowsNegative?: boolean;
}
