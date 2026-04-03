export type WorkOrderStatus =
  | "pending_dispatch"
  | "pending_execute"
  | "executing"
  | "pending_acceptance"
  | "completed"
  | "archived";

export type WorkOrderPriority = "urgent" | "high" | "medium" | "low";

export type WorkOrderSource = "fault_report" | "preventive" | "scheduled" | "other";

export interface ExecuteRecord {
  executedBy: string;
  executedAt: string;
  content: string;
}

export interface WorkOrder {
  id: string;
  workOrderCode: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  title: string;
  description: string;
  source: WorkOrderSource;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  assignees: string[];
  mainAssignee: string;
  assignedBy: string;
  assignedAt: string | null;
  executeRecords: ExecuteRecord[];
  faultReason: string;
  solution: string;
  rating: number | null;
  acceptedBy: string;
  acceptedAt: string | null;
  createdBy: string;
  createdAt: string;
}
