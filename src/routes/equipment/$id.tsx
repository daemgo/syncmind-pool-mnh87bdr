import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { EquipmentDetail } from "@/components/equipment/equipment-detail";
import { equipmentMock, lifecycleMock } from "@/mock/equipment";

export const Route = createFileRoute("/equipment/$id")({
  component: EquipmentDetailPage,
});

export function EquipmentDetailPage() {
  const { id } = Route.useParams();
  const item = equipmentMock.find((e) => e.id === id);
  const lifecycle = item ? (lifecycleMock[id] ?? []) : [];

  if (!item) {
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <p className="text-muted-foreground">设备不存在</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/equipment">返回列表</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/equipment">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">设备详情</h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono">{item.assetCode}</p>
        </div>
      </div>
      <EquipmentDetail data={item} lifecycle={lifecycle} />
    </div>
  );
}
