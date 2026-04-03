import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MaintenanceDetail } from "@/components/maintenance/maintenance-detail";
import { maintenanceMock } from "@/mock/maintenance";

export const Route = createFileRoute("/maintenance/$id")({
  component: MaintenanceDetailPage,
});

export function MaintenanceDetailPage() {
  const { id } = Route.useParams();
  const item = maintenanceMock.find((m) => m.id === id);

  if (!item) {
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <p className="text-muted-foreground">维护计划不存在</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/maintenance">返回列表</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/maintenance">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">维护计划详情</h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono">
            {item.assetCode}
          </p>
        </div>
      </div>
      <MaintenanceDetail data={item} />
    </div>
  );
}
