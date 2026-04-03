import { createFileRoute, redirect } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/settings/")({
  beforeLoad: () => {
    const stored = localStorage.getItem("eam_auth_user");
    if (!stored) throw redirect({ to: "/login" });
    const user = JSON.parse(stored);
    if (user.role !== "admin") throw redirect({ to: "/" });
  },
  component: SettingsPage,
});

export function SettingsPage() {
  return (
    <div className="page-section">
      <div className="page-header">
        <h1 className="page-title">系统设置</h1>
        <p className="page-description">
          用户管理、权限配置、系统参数设置
        </p>
      </div>
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-base">系统配置</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">该模块尚未生成</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              请继续对话，描述您希望如何配置系统设置页面，系统将自动生成。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
