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
import type { WorkOrder } from "@/types/work-order";
import type {
  WorkOrderStatus,
  WorkOrderPriority,
  WorkOrderSource,
} from "@/types/work-order";

interface WorkOrderFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: WorkOrder;
  mode?: "dispatch" | "process" | "accept";
}

const defaultForm = {
  title: "",
  description: "",
  source: "fault_report" as WorkOrderSource,
  priority: "medium" as WorkOrderPriority,
  assignee: "",
};

export function WorkOrderFormDialog({
  open,
  onOpenChange,
  data,
  mode = "create",
}: WorkOrderFormDialogProps) {
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    navigate({ to: "/work-orders" });
  };

  const isCreate = mode === "create";
  const isDispatch = mode === "dispatch" || data?.status === "pending_dispatch";
  const isProcess = mode === "process" || data?.status === "executing";
  const isAccept = mode === "accept" || data?.status === "pending_acceptance";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isCreate
              ? "新建工单"
              : isDispatch
                ? "派工"
                : isProcess
                  ? "处理工单"
                  : "验收工单"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isCreate && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assetCode">设备编号 *</Label>
                  <Input id="assetCode" placeholder="选择设备" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source">来源 *</Label>
                  <Select
                    value={form.source}
                    onValueChange={(v) => setForm({ ...form, source: v as WorkOrderSource })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fault_report">故障报修</SelectItem>
                      <SelectItem value="preventive">预防性维护</SelectItem>
                      <SelectItem value="scheduled">计划检修</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">工单标题 *</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">优先级 *</Label>
                  <Select
                    value={form.priority}
                    onValueChange={(v) => setForm({ ...form, priority: v as WorkOrderPriority })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">紧急</SelectItem>
                      <SelectItem value="high">高</SelectItem>
                      <SelectItem value="medium">中</SelectItem>
                      <SelectItem value="low">低</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">问题描述</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                />
              </div>
            </>
          )}

          {isDispatch && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assignee">执行人 *</Label>
                <Input
                  id="assignee"
                  placeholder="输入执行人姓名"
                  value={form.assignee}
                  onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                  required
                />
              </div>
            </div>
          )}

          {isProcess && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="executeContent">执行内容 *</Label>
                <Textarea
                  id="executeContent"
                  placeholder="记录本次执行的操作内容"
                  rows={4}
                  required
                />
              </div>
            </div>
          )}

          {isAccept && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faultReason">故障原因 *</Label>
                <Textarea
                  id="faultReason"
                  placeholder="填写故障原因"
                  rows={2}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="solution">处理措施 *</Label>
                <Textarea
                  id="solution"
                  placeholder="填写处理措施"
                  rows={2}
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
              {isCreate ? "创建" : isDispatch ? "确认派工" : isProcess ? "提交执行" : "验收通过"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
