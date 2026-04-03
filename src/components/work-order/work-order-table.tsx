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
import { MoreHorizontal, Eye, Pencil, Send } from "lucide-react";
import { getDictLabel, getDictColor } from "@/lib/dict";
import type { WorkOrder } from "@/types/work-order";

const colorMap: Record<string, string> = {
  red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  slate: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  sky: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
};

const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };

interface WorkOrderTableProps {
  data: WorkOrder[];
  onEdit: (item: WorkOrder) => void;
}

export function WorkOrderTable({ data, onEdit }: WorkOrderTableProps) {
  const sorted = [...data].sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="w-[140px] font-mono text-xs uppercase tracking-wider text-muted-foreground/70">工单编号</TableHead>
            <TableHead className="w-[120px] text-xs uppercase tracking-wider text-muted-foreground/70">设备编号</TableHead>
            <TableHead className="text-xs uppercase tracking-wider text-muted-foreground/70">工单标题</TableHead>
            <TableHead className="w-[100px] text-xs uppercase tracking-wider text-muted-foreground/70">工单状态</TableHead>
            <TableHead className="w-[80px] text-xs uppercase tracking-wider text-muted-foreground/70">优先级</TableHead>
            <TableHead className="w-[100px] text-xs uppercase tracking-wider text-muted-foreground/70">来源</TableHead>
            <TableHead className="w-[100px] text-xs uppercase tracking-wider text-muted-foreground/70">执行人</TableHead>
            <TableHead className="w-[140px] text-xs uppercase tracking-wider text-muted-foreground/70">创建时间</TableHead>
            <TableHead className="w-[80px] text-right text-xs uppercase tracking-wider text-muted-foreground/70">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            sorted.map((item) => (
              <TableRow key={item.id} className="transition-colors cursor-pointer">
                <TableCell className="font-mono text-sm">{item.workOrderCode}</TableCell>
                <TableCell className="font-mono text-sm">{item.assetCode}</TableCell>
                <TableCell className="font-medium max-w-[200px] truncate">{item.title}</TableCell>
                <TableCell>
                  <Badge
                    className={colorMap[getDictColor("dict-work-order-status", item.status) ?? "slate"]}
                    variant="secondary"
                  >
                    {getDictLabel("dict-work-order-status", item.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={colorMap[getDictColor("dict-work-order-priority", item.priority) ?? "slate"]}
                    variant="secondary"
                  >
                    {getDictLabel("dict-work-order-priority", item.priority)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={colorMap[getDictColor("dict-work-order-source", item.source) ?? "slate"]}
                    variant="secondary"
                  >
                    {getDictLabel("dict-work-order-source", item.source)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {item.assignees.length > 0 ? item.assignees[0] : "-"}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {item.createdAt}
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
                          to="/work-orders/$id"
                          params={{ id: item.id }}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                          查看详情
                        </Link>
                      </DropdownMenuItem>
                      {item.status === "pending_dispatch" && (
                        <DropdownMenuItem
                          onClick={() => onEdit(item)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Send className="h-4 w-4" />
                          派工
                        </DropdownMenuItem>
                      )}
                      {(item.status === "pending_execute" || item.status === "executing") && (
                        <DropdownMenuItem
                          onClick={() => onEdit(item)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Pencil className="h-4 w-4" />
                          处理
                        </DropdownMenuItem>
                      )}
                      {item.status === "pending_acceptance" && (
                        <DropdownMenuItem
                          onClick={() => onEdit(item)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                          验收
                        </DropdownMenuItem>
                      )}
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
