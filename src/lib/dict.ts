export const dictionaries = {
  "dict-equipment-status": [
    { label: "运行中", value: "running", color: "green" },
    { label: "停机待修", value: "stopped_repair", color: "amber" },
    { label: "停机待料", value: "stopped_material", color: "orange" },
    { label: "报废", value: "scrapped", color: "gray" },
    { label: "闲置", value: "idle", color: "slate" },
  ],
  "dict-workshop": [
    { label: "车间A", value: "A", color: "blue" },
    { label: "车间B", value: "B", color: "violet" },
    { label: "车间C", value: "C", color: "amber" },
    { label: "车间D", value: "D", color: "emerald" },
  ],
  "dict-work-order-status": [
    { label: "待派工", value: "pending_dispatch", color: "sky" },
    { label: "待执行", value: "pending_execute", color: "blue" },
    { label: "执行中", value: "executing", color: "amber" },
    { label: "待验收", value: "pending_acceptance", color: "violet" },
    { label: "已完成", value: "completed", color: "green" },
    { label: "已归档", value: "archived", color: "gray" },
  ],
  "dict-work-order-priority": [
    { label: "紧急", value: "urgent", color: "red" },
    { label: "高", value: "high", color: "orange" },
    { label: "中", value: "medium", color: "amber" },
    { label: "低", value: "low", color: "slate" },
  ],
  "dict-work-order-source": [
    { label: "故障报修", value: "fault_report", color: "red" },
    { label: "预防性维护", value: "preventive", color: "green" },
    { label: "计划检修", value: "scheduled", color: "blue" },
    { label: "其他", value: "other", color: "gray" },
  ],
  "dict-maintenance-cycle": [
    { label: "每日", value: "daily", color: "sky" },
    { label: "每周", value: "weekly", color: "blue" },
    { label: "每月", value: "monthly", color: "violet" },
    { label: "每季度", value: "quarterly", color: "amber" },
    { label: "每半年", value: "semiannual", color: "orange" },
    { label: "每年", value: "annual", color: "red" },
    { label: "按运行小时数", value: "by_hours", color: "emerald" },
  ],
  "dict-plan-status": [
    { label: "执行中", value: "active", color: "green" },
    { label: "已暂停", value: "paused", color: "gray" },
    { label: "已到期未执行", value: "overdue", color: "red" },
  ],
  "dict-spare-category": [
    { label: "机械类", value: "mechanical", color: "blue" },
    { label: "电气类", value: "electrical", color: "amber" },
    { label: "液压类", value: "hydraulic", color: "violet" },
    { label: "刀具类", value: "tool", color: "orange" },
    { label: "其他", value: "other", color: "gray" },
  ],
  "dict-stock-unit": [
    { label: "件", value: "piece", color: "slate" },
    { label: "个", value: "unit", color: "slate" },
    { label: "套", value: "set", color: "slate" },
    { label: "米", value: "meter", color: "slate" },
    { label: "千克", value: "kg", color: "slate" },
  ],
} as const;

export function getDictOptions(dictId: string) {
  return dictionaries[dictId as keyof typeof dictionaries] ?? [];
}

export function getDictLabel(dictId: string, value: string): string {
  const options = getDictOptions(dictId);
  return options.find((o) => o.value === value)?.label ?? value;
}

export function getDictColor(dictId: string, value: string): string | undefined {
  const options = getDictOptions(dictId);
  return options.find((o) => o.value === value)?.color;
}
