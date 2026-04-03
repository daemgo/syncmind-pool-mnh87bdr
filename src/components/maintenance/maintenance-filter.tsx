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
import type { MaintenanceCycle, PlanStatus } from "@/types/maintenance";

interface MaintenanceFilterProps {
  onFilterChange: (filters: {
    search: string;
    cycle: MaintenanceCycle | "all";
    planStatus: PlanStatus | "all";
  }) => void;
}

export function MaintenanceFilter({ onFilterChange }: MaintenanceFilterProps) {
  const [search, setSearch] = useState("");
  const [cycle, setCycle] = useState<MaintenanceCycle | "all">("all");
  const [planStatus, setPlanStatus] = useState<PlanStatus | "all">("all");

  return (
    <div className="flex flex-wrap gap-3 p-4 bg-card rounded-xl border border-border">
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索设备编号、名称..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onFilterChange({ search: e.target.value, cycle, planStatus });
          }}
          className="pl-9"
        />
      </div>
      <Select
        value={cycle}
        onValueChange={(v) => {
          setCycle(v as MaintenanceCycle | "all");
          onFilterChange({ search, cycle: v as MaintenanceCycle | "all", planStatus });
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="维护周期" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部周期</SelectItem>
          <SelectItem value="daily">每日</SelectItem>
          <SelectItem value="weekly">每周</SelectItem>
          <SelectItem value="monthly">每月</SelectItem>
          <SelectItem value="quarterly">每季度</SelectItem>
          <SelectItem value="semiannual">每半年</SelectItem>
          <SelectItem value="annual">每年</SelectItem>
          <SelectItem value="by_hours">按运行小时数</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={planStatus}
        onValueChange={(v) => {
          setPlanStatus(v as PlanStatus | "all");
          onFilterChange({ search, cycle, planStatus: v as PlanStatus | "all" });
        }}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="计划状态" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部状态</SelectItem>
          <SelectItem value="active">执行中</SelectItem>
          <SelectItem value="paused">已暂停</SelectItem>
          <SelectItem value="overdue">已到期未执行</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setSearch("");
          setCycle("all");
          setPlanStatus("all");
          onFilterChange({ search: "", cycle: "all", planStatus: "all" });
        }}
      >
        <Filter className="h-4 w-4 mr-1.5" />
        重置
      </Button>
    </div>
  );
}
