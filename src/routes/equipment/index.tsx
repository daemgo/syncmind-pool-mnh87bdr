import { useState, useMemo } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EquipmentFilter } from "@/components/equipment/equipment-filter";
import { EquipmentTable } from "@/components/equipment/equipment-table";
import { EquipmentFormDialog } from "@/components/equipment/equipment-form-dialog";
import { equipmentMock } from "@/mock/equipment";
import type { Equipment } from "@/types/equipment";

export const Route = createFileRoute("/equipment/")({
  beforeLoad: () => {
    const stored = localStorage.getItem("eam_auth_user");
    if (!stored) throw redirect({ to: "/login" });
    const user = JSON.parse(stored);
    if (!["admin"].includes(user.role)) throw redirect({ to: "/" });
  },
  component: EquipmentPage,
});

export function EquipmentPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Equipment | undefined>();
  const [filters, setFilters] = useState({
    search: "",
    workshop: "all" as const,
    status: "all" as const,
  });

  const filtered = useMemo(() => {
    return equipmentMock.filter((item) => {
      if (
        filters.search &&
        !item.assetCode.toLowerCase().includes(filters.search.toLowerCase()) &&
        !item.assetName.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (filters.workshop !== "all" && item.workshop !== filters.workshop) return false;
      if (filters.status !== "all" && item.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  const handleEdit = (item: Equipment) => {
    setEditItem(item);
    setFormOpen(true);
  };

  const handleNew = () => {
    setEditItem(undefined);
    setFormOpen(true);
  };

  return (
    <div className="page-section">
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">设备台账</h1>
          <p className="page-description">
            管理全厂设备档案，记录设备全生命周期
          </p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-1.5" />
          新建设备
        </Button>
      </div>
      <EquipmentFilter onFilterChange={setFilters} />
      <EquipmentTable data={filtered} onEdit={handleEdit} />
      <EquipmentFormDialog
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
