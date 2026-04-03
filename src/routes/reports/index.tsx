import { createFileRoute, redirect } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/reports/")({
  beforeLoad: () => {
    const stored = localStorage.getItem("eam_auth_user");
    if (!stored) throw redirect({ to: "/login" });
    const user = JSON.parse(stored);
    if (user.role !== "admin") throw redirect({ to: "/" });
  },
  component: ReportsPage,
});

export function ReportsPage() {
  return (
    <div className="page-section">
      <div className="page-header">
        <h1 className="page-title">分析报表</h1>
        <p className="page-description">
          设备OEE、故障率、维护成本等多维度分析
        </p>
      </div>
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-base">OEE / 故障率 / 维护成本分析</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">该模块尚未生成</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              请继续对话，描述您希望如何展示分析报表页面，系统将自动生成。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
