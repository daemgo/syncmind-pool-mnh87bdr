import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Tag,
  AlertTriangle,
  Clock,
  User,
  CheckCircle,
  Star,
} from "lucide-react";
import { getDictLabel } from "@/lib/dict";
import type { WorkOrder } from "@/types/work-order";

const colorMap: Record<string, string> = {
  red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  slate: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  sky: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
};

interface WorkOrderDetailProps {
  data: WorkOrder;
}

export function WorkOrderDetail({ data }: WorkOrderDetailProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-xl">{data.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1 font-mono">
                {data.workOrderCode}
              </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Badge
                className={colorMap[getDictLabel("dict-work-order-status", data.status) === "执行中" ? "amber" : "blue"]}
                variant="secondary"
              >
                {getDictLabel("dict-work-order-status", data.status)}
              </Badge>
              <Badge
                className={colorMap[getDictLabel("dict-work-order-priority", data.priority) === "紧急" ? "red" : "amber"]}
                variant="secondary"
              >
                {getDictLabel("dict-work-order-priority", data.priority)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">设备</span>
              <span className="ml-auto font-medium font-mono text-xs">
                {data.assetCode}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">来源</span>
              <span className="ml-auto font-medium">
                {getDictLabel("dict-work-order-source", data.source)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">创建时间</span>
              <span className="ml-auto font-medium text-sm">{data.createdAt}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">创建人</span>
              <span className="ml-auto font-medium">{data.createdBy}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dispatch Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">派工信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["执行人", data.assignees.length > 0 ? data.assignees.join("、") : "未指定"],
              ["主执行人", data.mainAssignee || "-"],
              ["派工人", data.assignedBy || "-"],
              ["派工时间", data.assignedAt ? data.assignedAt.split("T")[0] : "-"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
            {data.description && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">问题描述</p>
                  <p className="text-sm">{data.description}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Execute Records */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">执行记录</CardTitle>
          </CardHeader>
          <CardContent>
            {data.executeRecords.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">暂无执行记录</p>
            ) : (
              <div className="space-y-4">
                {data.executeRecords.map((record, idx) => (
                  <div key={idx} className="border-l-2 border-primary pl-4 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{record.executedBy}</span>
                      <span className="text-xs text-muted-foreground">
                        {record.executedAt.split("T")[0]}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{record.content}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Acceptance */}
      {(data.status === "completed" || data.status === "archived") && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">验收信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              ["故障原因", data.faultReason || "-"],
              ["处理措施", data.solution || "-"],
              [
                "维修评分",
                data.rating
                  ? Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 inline-block ${i < data.rating! ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                      />
                    ))
                  : "-",
              ],
              ["验收人", data.acceptedBy || "-"],
              ["验收时间", data.acceptedAt ? data.acceptedAt.split("T")[0] : "-"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
