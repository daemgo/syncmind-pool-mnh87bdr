import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { WorkOrderDetail } from "@/components/work-order/work-order-detail";
import { workOrderMock } from "@/mock/work-order";

export const Route = createFileRoute("/work-orders/$id")({
  component: WorkOrderDetailPage,
});

export function WorkOrderDetailPage() {
  const { id } = Route.useParams();
  const item = workOrderMock.find((w) => w.id === id);

  if (!item) {
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <p className="text-muted-foreground">工单不存在</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/work-orders">返回列表</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/work-orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">工单详情</h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono">
            {item.workOrderCode}
          </p>
        </div>
      </div>
      <WorkOrderDetail data={item} />
    </div>
  );
}
