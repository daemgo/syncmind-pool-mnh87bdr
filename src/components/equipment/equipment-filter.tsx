import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { EquipmentStatus, Workshop } from "@/types/equipment";

interface EquipmentFilterProps {
  onFilterChange: (filters: {
    search: string;
    workshop: Workshop | "all";
    status: EquipmentStatus | "all";
  }) => void;
}

export function EquipmentFilter({ onFilterChange }: EquipmentFilterProps) {
  const [search, setSearch] = useState("");
  const [workshop, setWorkshop] = useState<Workshop | "all">("all");
  const [status, setStatus] = useState<EquipmentStatus | "all">("all");

  const handleChange = () => {
    onFilterChange({ search, workshop, status });
  };

  return (
    <div className="flex flex-wrap gap-3 p-4 bg-card rounded-xl border border-border">
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索设备编号、名称..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onFilterChange({ search: e.target.value, workshop, status });
          }}
          className="pl-9"
        />
      </div>
      <Select
        value={workshop}
        onValueChange={(v) => {
          setWorkshop(v as Workshop | "all");
          onFilterChange({ search, workshop: v as Workshop | "all", status });
        }}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="所属车间" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部车间</SelectItem>
          <SelectItem value="A">车间A</SelectItem>
          <SelectItem value="B">车间B</SelectItem>
          <SelectItem value="C">车间C</SelectItem>
          <SelectItem value="D">车间D</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={status}
        onValueChange={(v) => {
          setStatus(v as EquipmentStatus | "all");
          onFilterChange({ search, workshop, status: v as EquipmentStatus | "all" });
        }}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="设备状态" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部状态</SelectItem>
          <SelectItem value="running">运行中</SelectItem>
          <SelectItem value="stopped_repair">停机待修</SelectItem>
          <SelectItem value="stopped_material">停机待料</SelectItem>
          <SelectItem value="idle">闲置</SelectItem>
          <SelectItem value="scrapped">报废</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setSearch("");
          setWorkshop("all");
          setStatus("all");
          onFilterChange({ search: "", workshop: "all", status: "all" });
        }}
      >
        <Filter className="h-4 w-4 mr-1.5" />
        重置
      </Button>
    </div>
  );
}
