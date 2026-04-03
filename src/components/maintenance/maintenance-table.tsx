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
import { MoreHorizontal, Eye, Pencil, PlayCircle } from "lucide-react";
import { getDictLabel, getDictColor } from "@/lib/dict";
import type { MaintenancePlan } from "@/types/maintenance";

const colorMap: Record<string, string> = {
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  sky: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  slate: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
};

interface MaintenanceTableProps {
  data: MaintenancePlan[];
  onEdit: (item: MaintenancePlan) => void;
  onExecute: (item: MaintenancePlan) => void;
}

export function MaintenanceTable({ data, onEdit, onExecute }: MaintenanceTableProps) {
  const sorted = [...data].sort((a, b) => {
    if (!a.nextDate) return 1;
    if (!b.nextDate) return -1;
    return new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime();
  });

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="w-[120px] font-mono text-xs uppercase tracking-wider text-muted-foreground/70">设备编号</TableHead>
            <TableHead className="w-[200px] text-xs uppercase tracking-wider text-muted-foreground/70">设备名称</TableHead>
            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground/70">维护内容</TableHead>
            <TableHead className="w-[100px] text-xs uppercase tracking-wider text-muted-foreground/70">维护周期</TableHead>
            <TableHead className="w-[120px] text-xs uppercase tracking-wider text-muted-foreground/70">下次维护日期</TableHead>
            <TableHead className="w-[120px] text-xs uppercase tracking-wider text-muted-foreground/70">计划状态</TableHead>
            <TableHead className="w-[80px] text-right text-xs uppercase tracking-wider text-muted-foreground/70">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            sorted.map((item) => (
              <TableRow key={item.id} className="transition-colors cursor-pointer">
                <TableCell className="font-mono text-sm">{item.assetCode}</TableCell>
                <TableCell className="font-medium">{item.assetName}</TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                  {item.content}
                </TableCell>
                <TableCell>
                  <Badge
                    className={colorMap[getDictColor("dict-maintenance-cycle", item.cycle) ?? "slate"]}
                    variant="secondary"
                  >
                    {getDictLabel("dict-maintenance-cycle", item.cycle)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {item.nextDate ?? "按小时触发"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={colorMap[getDictColor("dict-plan-status", item.planStatus) ?? "slate"]}
                    variant="secondary"
                  >
                    {getDictLabel("dict-plan-status", item.planStatus)}
                  </Badge>
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
                          to="/maintenance/$id"
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
                      <DropdownMenuItem
                        onClick={() => onExecute(item)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <PlayCircle className="h-4 w-4" />
                        立即执行
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
