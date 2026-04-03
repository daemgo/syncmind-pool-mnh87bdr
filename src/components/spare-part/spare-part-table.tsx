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
import { MoreHorizontal, Eye, Pencil, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { getDictLabel, getDictColor } from "@/lib/dict";
import type { SparePart } from "@/types/spare-part";

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  slate: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
};

interface SparePartTableProps {
  data: SparePart[];
  onEdit: (item: SparePart) => void;
  onInbound: (item: SparePart) => void;
  onOutbound: (item: SparePart) => void;
}

export function SparePartTable({ data, onEdit, onInbound, onOutbound }: SparePartTableProps) {
  const getStockStatus = (item: SparePart) => {
    if (item.currentStock === 0) return { label: "缺货", color: "red" };
    if (item.currentStock <= item.safetyStock) return { label: "预警", color: "amber" };
    return { label: "正常", color: "green" };
  };

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] font-mono">备件编号</TableHead>
            <TableHead className="w-[180px]">备件名称</TableHead>
            <TableHead className="w-[100px]">备件分类</TableHead>
            <TableHead className="w-[100px] text-right">当前库存</TableHead>
            <TableHead className="w-[100px] text-right">安全库存</TableHead>
            <TableHead className="w-[80px]">库存状态</TableHead>
            <TableHead className="w-[100px] text-right">关联设备</TableHead>
            <TableHead className="w-[80px] text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                暂无数据
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => {
              const stock = getStockStatus(item);
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">{item.partCode}</TableCell>
                  <TableCell className="font-medium">{item.partName}</TableCell>
                  <TableCell>
                    <Badge
                      className={colorMap[getDictColor("dict-spare-category", item.category) ?? "slate"]}
                      variant="secondary"
                    >
                      {getDictLabel("dict-spare-category", item.category)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">{item.currentStock}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{item.safetyStock}</TableCell>
                  <TableCell>
                    <Badge className={colorMap[stock.color]} variant="secondary">
                      {stock.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {item.linkedAssetCount}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            to="/spare-parts/$id"
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
                          onClick={() => onInbound(item)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <ArrowDownToLine className="h-4 w-4" />
                          入库
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onOutbound(item)}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <ArrowUpFromLine className="h-4 w-4" />
                          出库
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
