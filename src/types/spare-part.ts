export type SpareCategory = "mechanical" | "electrical" | "hydraulic" | "tool" | "other";

export type StockUnit = "piece" | "unit" | "set" | "meter" | "kg";

export type StockStatus = "normal" | "warning" | "out";

export interface SparePart {
  id: string;
  partCode: string;
  partName: string;
  category: SpareCategory;
  spec: string;
  unit: StockUnit;
  currentStock: number;
  safetyStock: number;
  location: string;
  description: string;
  linkedAssetCount: number;
  createdAt: string;
}
