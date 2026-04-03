export type MaintenanceCycle =
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "semiannual"
  | "annual"
  | "by_hours";

export type PlanStatus = "active" | "paused" | "overdue";

export interface MaintenancePlan {
  id: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  content: string;
  cycle: MaintenanceCycle;
  cycleHours: number | null;
  nextDate: string | null;
  advanceNoticeDays: number;
  sopAttachment: string | null;
  planStatus: PlanStatus;
  createdAt: string;
}
