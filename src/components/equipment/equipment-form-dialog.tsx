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
import type { Equipment } from "@/types/equipment";
import type { EquipmentStatus, Workshop } from "@/types/equipment";

interface EquipmentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: Equipment;
}

const defaultForm = {
  assetCode: "",
  assetName: "",
  model: "",
  manufacturer: "",
  workshop: "A" as Workshop,
  installDate: "",
  siemensSystemId: "",
  ratedPower: "",
  ratedSpeed: "",
  status: "running" as EquipmentStatus,
  description: "",
};

export function EquipmentFormDialog({
  open,
  onOpenChange,
  data,
}: EquipmentFormDialogProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState(data ?? defaultForm);
  const isEdit = !!data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save - in real app this would call an API
    onOpenChange(false);
    navigate({ to: "/equipment" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑设备" : "新建设备"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assetCode">设备编号 *</Label>
              <Input
                id="assetCode"
                value={form.assetCode}
                onChange={(e) => setForm({ ...form, assetCode: e.target.value })}
                placeholder="如 AST-2026006"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assetName">设备名称 *</Label>
              <Input
                id="assetName"
                value={form.assetName}
                onChange={(e) => setForm({ ...form, assetName: e.target.value })}
                placeholder="设备名称"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">规格型号 *</Label>
              <Input
                id="model"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manufacturer">生产厂商</Label>
              <Input
                id="manufacturer"
                value={form.manufacturer}
                onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workshop">所属车间 *</Label>
              <Select value={form.workshop} onValueChange={(v) => setForm({ ...form, workshop: v as Workshop })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">车间A</SelectItem>
                  <SelectItem value="B">车间B</SelectItem>
                  <SelectItem value="C">车间C</SelectItem>
                  <SelectItem value="D">车间D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="installDate">安装日期 *</Label>
              <Input
                id="installDate"
                type="date"
                value={form.installDate}
                onChange={(e) => setForm({ ...form, installDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ratedPower">额定功率(kW)</Label>
              <Input
                id="ratedPower"
                type="number"
                step="0.01"
                value={form.ratedPower}
                onChange={(e) => setForm({ ...form, ratedPower: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ratedSpeed">额定转速(rpm)</Label>
              <Input
                id="ratedSpeed"
                type="number"
                value={form.ratedSpeed}
                onChange={(e) => setForm({ ...form, ratedSpeed: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siemensSystemId">西门子系统编号</Label>
              <Input
                id="siemensSystemId"
                value={form.siemensSystemId}
                onChange={(e) => setForm({ ...form, siemensSystemId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">设备状态 *</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as EquipmentStatus })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="running">运行中</SelectItem>
                  <SelectItem value="stopped_repair">停机待修</SelectItem>
                  <SelectItem value="stopped_material">停机待料</SelectItem>
                  <SelectItem value="idle">闲置</SelectItem>
                  <SelectItem value="scrapped">报废</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">备注</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit">{isEdit ? "保存" : "创建"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
