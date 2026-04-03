import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Activity,
  Clock,
  Wrench,
  Package,
  Calendar,
  User,
} from "lucide-react";
import { getDictLabel } from "@/lib/dict";
import type { Equipment, LifecycleEvent } from "@/types/equipment";

const colorMap: Record<string, string> = {
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  slate: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
  emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const eventTypeLabel: Record<string, { label: string; color: string }> = {
  created: { label: "创建", color: "blue" },
  status_changed: { label: "状态变更", color: "violet" },
  maintenance: { label: "维修记录", color: "green" },
  plan_changed: { label: "维护计划变更", color: "amber" },
  scrapped: { label: "报废", color: "red" },
};

interface EquipmentDetailProps {
  data: Equipment;
  lifecycle: LifecycleEvent[];
}

export function EquipmentDetail({ data, lifecycle }: EquipmentDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-xl">{data.assetName}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1 font-mono">
                {data.assetCode}
              </p>
            </div>
            <Badge
              className={colorMap[getDictLabel("dict-equipment-status", data.status) === "运行中" ? "green" : "amber"]}
              variant="secondary"
            >
              {getDictLabel("dict-equipment-status", data.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">规格型号</span>
              <span className="ml-auto font-medium">{data.model}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">额定功率</span>
              <span className="ml-auto font-medium">{data.ratedPower} kW</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">所属车间</span>
              <span className="ml-auto font-medium">
                {getDictLabel("dict-workshop", data.workshop)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">安装日期</span>
              <span className="ml-auto font-medium">{data.installDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["生产厂商", data.manufacturer || "-"],
              ["额定转速", data.ratedSpeed > 0 ? `${data.ratedSpeed} rpm` : "-"],
              ["西门子系统编号", data.siemensSystemId || "-"],
              ["最近维护日期", data.lastMaintenanceDate || "暂无记录"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium text-right max-w-[60%]">{value}</span>
              </div>
            ))}
            {data.description && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">备注</p>
                  <p className="text-sm">{data.description}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Lifecycle Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">生命周期记录</CardTitle>
          </CardHeader>
          <CardContent>
            {lifecycle.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">暂无记录</p>
            ) : (
              <div className="space-y-4">
                {lifecycle.map((event, idx) => (
                  <div key={event.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-2.5 h-2.5 rounded-full mt-1.5 ${colorMap[eventTypeLabel[event.eventType]?.color ?? "slate"]}`}
                      />
                      {idx < lifecycle.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge
                          className={colorMap[eventTypeLabel[event.eventType]?.color ?? "slate"]}
                          variant="secondary"
                        >
                          {eventTypeLabel[event.eventType]?.label ?? event.eventType}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {event.occurredAt.split("T")[0]}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{event.summary}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        操作人: {event.operator}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
