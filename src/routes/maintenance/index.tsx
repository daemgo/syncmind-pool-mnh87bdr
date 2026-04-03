import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MaintenanceFilter } from "@/components/maintenance/maintenance-filter";
import { MaintenanceTable } from "@/components/maintenance/maintenance-table";
import { MaintenanceFormDialog } from "@/components/maintenance/maintenance-form-dialog";
import { maintenanceMock } from "@/mock/maintenance";
import type { MaintenancePlan } from "@/types/maintenance";

export const Route = createFileRoute("/maintenance/")({
  component: MaintenancePage,
});

export function MaintenancePage() {
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<MaintenancePlan | undefined>();
  const [filters, setFilters] = useState({
    search: "",
    cycle: "all" as const,
    planStatus: "all" as const,
  });

  const filtered = useMemo(() => {
    return maintenanceMock.filter((item) => {
      if (
        filters.search &&
        !item.assetCode.toLowerCase().includes(filters.search.toLowerCase()) &&
        !item.assetName.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (filters.cycle !== "all" && item.cycle !== filters.cycle) return false;
      if (filters.planStatus !== "all" && item.planStatus !== filters.planStatus)
        return false;
      return true;
    });
  }, [filters]);

  const handleEdit = (item: MaintenancePlan) => {
    setEditItem(item);
    setFormOpen(true);
  };

  const handleExecute = (item: MaintenancePlan) => {
    // Trigger work order creation for this plan
    alert(`为「${item.assetName}」创建维修工单`);
  };

  const handleNew = () => {
    setEditItem(undefined);
    setFormOpen(true);
  };

  return (
    <div className="page-section">
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">预防性维护</h1>
          <p className="page-description">
            制定周期性维护计划，系统自动触发维修工单
          </p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-1.5" />
          新建计划
        </Button>
      </div>
      <MaintenanceFilter onFilterChange={setFilters} />
      <MaintenanceTable
        data={filtered}
        onEdit={handleEdit}
        onExecute={handleExecute}
      />
      <MaintenanceFormDialog
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
