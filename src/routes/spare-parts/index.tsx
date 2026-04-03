import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SparePartFilter } from "@/components/spare-part/spare-part-filter";
import { SparePartTable } from "@/components/spare-part/spare-part-table";
import { SparePartFormDialog } from "@/components/spare-part/spare-part-form-dialog";
import { sparePartMock } from "@/mock/spare-part";
import type { SparePart } from "@/types/spare-part";

export const Route = createFileRoute("/spare-parts/")({
  component: SparePartPage,
});

export function SparePartPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<SparePart | undefined>();
  const [mode, setMode] = useState<"edit" | "inbound" | "outbound">("edit");
  const [filters, setFilters] = useState({
    search: "",
    category: "all" as const,
    stockStatus: "all" as const,
  });

  const getStockStatus = (item: SparePart) => {
    if (item.currentStock === 0) return "out";
    if (item.currentStock <= item.safetyStock) return "warning";
    return "normal";
  };

  const filtered = useMemo(() => {
    return sparePartMock.filter((item) => {
      if (
        filters.search &&
        !item.partCode.toLowerCase().includes(filters.search.toLowerCase()) &&
        !item.partName.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (filters.category !== "all" && item.category !== filters.category) return false;
      if (filters.stockStatus !== "all" && getStockStatus(item) !== filters.stockStatus)
        return false;
      return true;
    });
  }, [filters]);

  const handleEdit = (item: SparePart) => {
    setEditItem(item);
    setMode("edit");
    setFormOpen(true);
  };

  const handleInbound = (item: SparePart) => {
    setEditItem(item);
    setMode("inbound");
    setFormOpen(true);
  };

  const handleOutbound = (item: SparePart) => {
    setEditItem(item);
    setMode("outbound");
    setFormOpen(true);
  };

  const handleNew = () => {
    setEditItem(undefined);
    setMode("edit");
    setFormOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">备品备件</h1>
          <p className="text-sm text-muted-foreground mt-1">
            备件库存台账，关联设备BOM，安全库存预警
          </p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-1.5" />
          新增备件
        </Button>
      </div>
      <SparePartFilter onFilterChange={setFilters} />
      <SparePartTable
        data={filtered}
        onEdit={handleEdit}
        onInbound={handleInbound}
        onOutbound={handleOutbound}
      />
      <SparePartFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditItem(undefined);
        }}
        data={editItem}
        mode={mode}
      />
    </div>
  );
}
