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
import type { SpareCategory } from "@/types/spare-part";

interface SparePartFilterProps {
  onFilterChange: (filters: {
    search: string;
    category: SpareCategory | "all";
    stockStatus: "normal" | "warning" | "out" | "all";
  }) => void;
}

export function SparePartFilter({ onFilterChange }: SparePartFilterProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<SpareCategory | "all">("all");
  const [stockStatus, setStockStatus] = useState<"normal" | "warning" | "out" | "all">("all");

  const getStockStatus = (part: { currentStock: number; safetyStock: number }) => {
    if (part.currentStock === 0) return "out";
    if (part.currentStock <= part.safetyStock) return "warning";
    return "normal";
  };

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-card rounded-xl border border-border">
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索备件编号、名称..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onFilterChange({ search: e.target.value, category, stockStatus });
          }}
          className="pl-9 h-9"
        />
      </div>
      <Select
        value={category}
        onValueChange={(v) => {
          setCategory(v as SpareCategory | "all");
          onFilterChange({ search, category: v as SpareCategory | "all", stockStatus });
        }}
      >
        <SelectTrigger className="w-32 h-9">
          <SelectValue placeholder="备件分类" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部分类</SelectItem>
          <SelectItem value="mechanical">机械类</SelectItem>
          <SelectItem value="electrical">电气类</SelectItem>
          <SelectItem value="hydraulic">液压类</SelectItem>
          <SelectItem value="tool">刀具类</SelectItem>
          <SelectItem value="other">其他</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={stockStatus}
        onValueChange={(v) => {
          setStockStatus(v as "normal" | "warning" | "out" | "all");
          onFilterChange({ search, category, stockStatus: v as "normal" | "warning" | "out" | "all" });
        }}
      >
        <SelectTrigger className="w-36 h-9">
          <SelectValue placeholder="库存状态" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部</SelectItem>
          <SelectItem value="normal">正常</SelectItem>
          <SelectItem value="warning">预警</SelectItem>
          <SelectItem value="out">缺货</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="ghost"
        size="sm"
        className="h-9 px-3 text-muted-foreground hover:text-foreground"
        onClick={() => {
          setSearch("");
          setCategory("all");
          setStockStatus("all");
          onFilterChange({ search: "", category: "all", stockStatus: "all" });
        }}
      >
        <Filter className="h-4 w-4 mr-1.5" />
        重置
      </Button>
    </div>
  );
}
