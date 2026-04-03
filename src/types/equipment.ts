export type EquipmentStatus =
  | "running"
  | "stopped_repair"
  | "stopped_material"
  | "scrapped"
  | "idle";

export type Workshop = "A" | "B" | "C" | "D";

export interface Equipment {
  id: string;
  assetCode: string;
  assetName: string;
  model: string;
  manufacturer: string;
  workshop: Workshop;
  installDate: string;
  siemensSystemId: string;
  ratedPower: number;
  ratedSpeed: number;
  status: EquipmentStatus;
  description: string;
  lastMaintenanceDate: string | null;
  createdAt: string;
}

export interface LifecycleEvent {
  id: string;
  equipmentId: string;
  eventType: "created" | "status_changed" | "maintenance" | "plan_changed" | "scrapped";
  occurredAt: string;
  operator: string;
  summary: string;
  details?: Record<string, unknown>;
}
