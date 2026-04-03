import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { getDictLabel } from "@/lib/dict";
import type { MaintenancePlan } from "@/types/maintenance";

const colorMap: Record<string, string> = {
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  sky: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  slate: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
};

interface MaintenanceDetailProps {
  data: MaintenancePlan;
}

export function MaintenanceDetail({ data }: MaintenanceDetailProps) {
  return (
    <div className="space-y-6">
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
              className={colorMap[getDictLabel("dict-plan-status", data.planStatus) === "执行中" ? "green" : "red"]}
              variant="secondary"
            >
              {getDictLabel("dict-plan-status", data.planStatus)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">维护周期</span>
              <span className="ml-auto font-medium">
                {getDictLabel("dict-maintenance-cycle", data.cycle)}
              </span>
            </div>
            {data.cycle === "by_hours" ? (
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">触发阈值</span>
                <span className="ml-auto font-medium">{data.cycleHours} 小时</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">下次维护日期</span>
                <span className="ml-auto font-medium">{data.nextDate ?? "-"}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">提前提醒</span>
              <span className="ml-auto font-medium">{data.advanceNoticeDays} 天</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">创建时间</span>
              <span className="ml-auto font-medium text-sm">{data.createdAt}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">维护内容</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">{data.content}</p>
          {data.sopAttachment && (
            <>
              <Separator />
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">标准作业指导书</span>
                <span className="font-medium">{data.sopAttachment}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
