import { Link } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil } from "lucide-react";
import { getDictLabel, getDictColor } from "@/lib/dict";
import type { Equipment } from "@/types/equipment";

const colorMap: Record<string, string> = {
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  slate: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
};

interface EquipmentTableProps {
  data: Equipment[];
  onEdit: (item: Equipment) => void;
}

export function EquipmentTable({ data, onEdit }: EquipmentTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="w-[120px] font-mono text-xs uppercase tracking-wider text-muted-foreground/70">设备编号</TableHead>
            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground/70">设备名称</TableHead>
            <TableHead className="w-[100px] text-xs uppercase tracking-wider text-muted-foreground/70">所属车间</TableHead>
            <TableHead className="w-[150px] text-xs uppercase tracking-wider text-muted-foreground/70">规格型号</TableHead>
            <TableHead className="w-[100px] text-xs uppercase tracking-wider text-muted-foreground/70">设备状态</TableHead>
            <TableHead className="w-[120px] text-xs uppercase tracking-wider text-muted-foreground/70">最近维护日期</TableHead>
            <TableHead className="w-[80px] text-right text-xs uppercase tracking-wider text-muted-foreground/70">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id} className="transition-colors cursor-pointer">
                <TableCell className="font-mono text-sm">{item.assetCode}</TableCell>
                <TableCell className="font-medium">{item.assetName}</TableCell>
                <TableCell>
                  <Badge
                    className={colorMap[getDictColor("dict-workshop", item.workshop) ?? "slate"]}
                    variant="secondary"
                  >
                    {getDictLabel("dict-workshop", item.workshop)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{item.model}</TableCell>
                <TableCell>
                  <Badge
                    className={colorMap[getDictColor("dict-equipment-status", item.status) ?? "slate"]}
                    variant="secondary"
                  >
                    {getDictLabel("dict-equipment-status", item.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {item.lastMaintenanceDate ?? "-"}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem asChild>
                        <Link
                          to="/equipment/$id"
                          params={{ id: item.id }}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                          查看详情
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onEdit(item)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Pencil className="h-4 w-4" />
                        编辑
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
