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
import type {
  WorkOrderStatus,
  WorkOrderPriority,
  WorkOrderSource,
} from "@/types/work-order";

interface WorkOrderFilterProps {
  onFilterChange: (filters: {
    search: string;
    status: WorkOrderStatus | "all";
    priority: WorkOrderPriority | "all";
    source: WorkOrderSource | "all";
  }) => void;
}

export function WorkOrderFilter({ onFilterChange }: WorkOrderFilterProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<WorkOrderStatus | "all">("all");
  const [priority, setPriority] = useState<WorkOrderPriority | "all">("all");
  const [source, setSource] = useState<WorkOrderSource | "all">("all");

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-card rounded-xl border border-border">
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索工单编号、设备..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onFilterChange({ search: e.target.value, status, priority, source });
          }}
          className="pl-9 h-9"
        />
      </div>
      <Select
        value={status}
        onValueChange={(v) => {
          setStatus(v as WorkOrderStatus | "all");
          onFilterChange({ search, status: v as WorkOrderStatus | "all", priority, source });
        }}
      >
        <SelectTrigger className="w-36 h-9">
          <SelectValue placeholder="工单状态" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部状态</SelectItem>
          <SelectItem value="pending_dispatch">待派工</SelectItem>
          <SelectItem value="pending_execute">待执行</SelectItem>
          <SelectItem value="executing">执行中</SelectItem>
          <SelectItem value="pending_acceptance">待验收</SelectItem>
          <SelectItem value="completed">已完成</SelectItem>
          <SelectItem value="archived">已归档</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={priority}
        onValueChange={(v) => {
          setPriority(v as WorkOrderPriority | "all");
          onFilterChange({ search, status, priority: v as WorkOrderPriority | "all", source });
        }}
      >
        <SelectTrigger className="w-28 h-9">
          <SelectValue placeholder="优先级" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部</SelectItem>
          <SelectItem value="urgent">紧急</SelectItem>
          <SelectItem value="high">高</SelectItem>
          <SelectItem value="medium">中</SelectItem>
          <SelectItem value="low">低</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={source}
        onValueChange={(v) => {
          setSource(v as WorkOrderSource | "all");
          onFilterChange({ search, status, priority, source: v as WorkOrderSource | "all" });
        }}
      >
        <SelectTrigger className="w-36 h-9">
          <SelectValue placeholder="来源" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部来源</SelectItem>
          <SelectItem value="fault_report">故障报修</SelectItem>
          <SelectItem value="preventive">预防性维护</SelectItem>
          <SelectItem value="scheduled">计划检修</SelectItem>
          <SelectItem value="other">其他</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="ghost"
        size="sm"
        className="h-9 px-3 text-muted-foreground hover:text-foreground"
        onClick={() => {
          setSearch("");
          setStatus("all");
          setPriority("all");
          setSource("all");
          onFilterChange({ search: "", status: "all", priority: "all", source: "all" });
        }}
      >
        <Filter className="h-4 w-4 mr-1.5" />
        重置
      </Button>
    </div>
  );
}
