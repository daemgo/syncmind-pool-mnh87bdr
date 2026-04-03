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
import type { MaintenancePlan } from "@/types/maintenance";
import type { MaintenanceCycle, PlanStatus } from "@/types/maintenance";

interface MaintenanceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: MaintenancePlan;
}

const defaultForm = {
  assetCode: "",
  content: "",
  cycle: "monthly" as MaintenanceCycle,
  cycleHours: "",
  nextDate: "",
  advanceNoticeDays: "3",
  planStatus: "active" as PlanStatus,
};

export function MaintenanceFormDialog({
  open,
  onOpenChange,
  data,
}: MaintenanceFormDialogProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState(
    data
      ? {
          assetCode: data.assetCode,
          content: data.content,
          cycle: data.cycle,
          cycleHours: data.cycleHours?.toString() ?? "",
          nextDate: data.nextDate ?? "",
          advanceNoticeDays: data.advanceNoticeDays.toString(),
          planStatus: data.planStatus,
        }
      : defaultForm
  );
  const isEdit = !!data;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    navigate({ to: "/maintenance" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑维护计划" : "新建维护计划"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assetCode">关联设备 *</Label>
              <Input
                id="assetCode"
                value={form.assetCode}
                onChange={(e) => setForm({ ...form, assetCode: e.target.value })}
                placeholder="选择设备"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycle">维护周期 *</Label>
              <Select
                value={form.cycle}
                onValueChange={(v) => setForm({ ...form, cycle: v as MaintenanceCycle })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">每日</SelectItem>
                  <SelectItem value="weekly">每周</SelectItem>
                  <SelectItem value="monthly">每月</SelectItem>
                  <SelectItem value="quarterly">每季度</SelectItem>
                  <SelectItem value="semiannual">每半年</SelectItem>
                  <SelectItem value="annual">每年</SelectItem>
                  <SelectItem value="by_hours">按运行小时数</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.cycle === "by_hours" ? (
              <div className="space-y-2">
                <Label htmlFor="cycleHours">运行小时阈值 *</Label>
                <Input
                  id="cycleHours"
                  type="number"
                  value={form.cycleHours}
                  onChange={(e) => setForm({ ...form, cycleHours: e.target.value })}
                  placeholder="如 2000"
                  required
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="nextDate">下次维护日期 *</Label>
                <Input
                  id="nextDate"
                  type="date"
                  value={form.nextDate}
                  onChange={(e) => setForm({ ...form, nextDate: e.target.value })}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="advanceNoticeDays">提前提醒天数</Label>
              <Input
                id="advanceNoticeDays"
                type="number"
                min="1"
                max="30"
                value={form.advanceNoticeDays}
                onChange={(e) => setForm({ ...form, advanceNoticeDays: e.target.value })}
              />
            </div>
            {isEdit && (
              <div className="space-y-2">
                <Label htmlFor="planStatus">计划状态</Label>
                <Select
                  value={form.planStatus}
                  onValueChange={(v) => setForm({ ...form, planStatus: v as PlanStatus })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">执行中</SelectItem>
                    <SelectItem value="paused">已暂停</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">维护内容 *</Label>
            <Textarea
              id="content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="描述本次维护的具体事项"
              rows={4}
              required
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
