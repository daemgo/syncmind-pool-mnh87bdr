import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { SparePart } from "@/types/spare-part";
import type { SpareCategory, StockUnit } from "@/types/spare-part";

interface SparePartFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: SparePart;
  mode?: "edit" | "inbound" | "outbound";
}

const defaultForm = {
  partCode: "",
  partName: "",
  category: "mechanical" as SpareCategory,
  spec: "",
  unit: "piece" as StockUnit,
  safetyStock: "",
  location: "",
  description: "",
  quantity: "",
};

export function SparePartFormDialog({
  open,
  onOpenChange,
  data,
  mode = "edit",
}: SparePartFormDialogProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const isEdit = mode === "edit";
  const isInbound = mode === "inbound";
  const isOutbound = mode === "outbound";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    navigate({ to: "/spare-parts" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? "编辑备件"
              : isInbound
                ? "备件入库"
                : "备件出库"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isEdit ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="partCode">备件编号 *</Label>
                  <Input
                    id="partCode"
                    value={form.partCode}
                    onChange={(e) => setForm({ ...form, partCode: e.target.value })}
                    placeholder="如 SP-2026006"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partName">备件名称 *</Label>
                  <Input
                    id="partName"
                    value={form.partName}
                    onChange={(e) => setForm({ ...form, partName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">备件分类 *</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => setForm({ ...form, category: v as SpareCategory })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mechanical">机械类</SelectItem>
                      <SelectItem value="electrical">电气类</SelectItem>
                      <SelectItem value="hydraulic">液压类</SelectItem>
                      <SelectItem value="tool">刀具类</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">计量单位 *</Label>
                  <Select
                    value={form.unit}
                    onValueChange={(v) => setForm({ ...form, unit: v as StockUnit })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="piece">件</SelectItem>
                      <SelectItem value="unit">个</SelectItem>
                      <SelectItem value="set">套</SelectItem>
                      <SelectItem value="meter">米</SelectItem>
                      <SelectItem value="kg">千克</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="safetyStock">安全库存</Label>
                  <Input
                    id="safetyStock"
                    type="number"
                    value={form.safetyStock}
                    onChange={(e) => setForm({ ...form, safetyStock: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">存放位置</Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="如 车间A仓库-2号架"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">备注</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                />
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg text-sm">
                <p className="text-muted-foreground">备件</p>
                <p className="font-medium">{data?.partName}</p>
                <p className="text-muted-foreground font-mono text-xs">
                  {data?.partCode}
                </p>
                <p className="text-muted-foreground mt-1">
                  当前库存：<span className="font-medium font-mono">{data?.currentStock}</span>
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  {isInbound ? "入库数量 *" : "出库数量 *"}
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  placeholder="输入数量"
                  required
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit">
              {isEdit ? "保存" : isInbound ? "确认入库" : "确认出库"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
