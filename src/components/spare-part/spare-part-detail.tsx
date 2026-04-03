import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Package, AlertTriangle } from "lucide-react";
import { getDictLabel } from "@/lib/dict";
import type { SparePart } from "@/types/spare-part";

const colorMap: Record<string, string> = {
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
  orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
};

interface SparePartDetailProps {
  data: SparePart;
}

export function SparePartDetail({ data }: SparePartDetailProps) {
  const getStockStatus = () => {
    if (data.currentStock === 0) return { label: "缺货", color: "red" };
    if (data.currentStock <= data.safetyStock) return { label: "预警", color: "amber" };
    return { label: "正常", color: "green" };
  };

  const stock = getStockStatus();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-xl">{data.partName}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1 font-mono">
                {data.partCode}
              </p>
            </div>
            <Badge className={colorMap[stock.color]} variant="secondary">
              {stock.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">备件分类</span>
              <span className="ml-auto font-medium">
                {getDictLabel("dict-spare-category", data.category)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">计量单位</span>
              <span className="ml-auto font-medium">
                {getDictLabel("dict-stock-unit", data.unit)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">当前库存</span>
              <span className={`ml-auto font-medium font-mono ${stock.color === "red" ? "text-red-600" : stock.color === "amber" ? "text-amber-600" : "text-green-600"}`}>
                {data.currentStock}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">安全库存</span>
              <span className="ml-auto font-medium">{data.safetyStock}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">详细信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            ["规格型号", data.spec || "-"],
            ["存放位置", data.location || "-"],
            ["关联设备数", `${data.linkedAssetCount} 台`],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
          {data.description && (
            <>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground mb-1">备注</p>
                <p className="text-sm">{data.description}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
