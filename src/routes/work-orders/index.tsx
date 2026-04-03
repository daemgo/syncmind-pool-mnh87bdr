import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WorkOrderFilter } from "@/components/work-order/work-order-filter";
import { WorkOrderTable } from "@/components/work-order/work-order-table";
import { WorkOrderFormDialog } from "@/components/work-order/work-order-form-dialog";
import { workOrderMock } from "@/mock/work-order";
import type { WorkOrder } from "@/types/work-order";

export const Route = createFileRoute("/work-orders/")({
  component: WorkOrderPage,
});

export function WorkOrderPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<WorkOrder | undefined>();
  const [filters, setFilters] = useState({
    search: "",
    status: "all" as const,
    priority: "all" as const,
    source: "all" as const,
  });

  const filtered = useMemo(() => {
    return workOrderMock.filter((item) => {
      if (
        filters.search &&
        !item.workOrderCode.toLowerCase().includes(filters.search.toLowerCase()) &&
        !item.assetCode.toLowerCase().includes(filters.search.toLowerCase()) &&
        !item.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (filters.status !== "all" && item.status !== filters.status) return false;
      if (filters.priority !== "all" && item.priority !== filters.priority) return false;
      if (filters.source !== "all" && item.source !== filters.source) return false;
      return true;
    });
  }, [filters]);

  const handleEdit = (item: WorkOrder) => {
    setEditItem(item);
    setFormOpen(true);
  };

  const handleNew = () => {
    setEditItem(undefined);
    setFormOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">维修工单</h1>
          <p className="text-sm text-muted-foreground mt-1">
            管理工单从创建到归档的全流程闭环
          </p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-1.5" />
          新建工单
        </Button>
      </div>
      <WorkOrderFilter onFilterChange={setFilters} />
      <WorkOrderTable data={filtered} onEdit={handleEdit} />
      <WorkOrderFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditItem(undefined);
        }}
        data={editItem}
      />
    </div>
  );
}
