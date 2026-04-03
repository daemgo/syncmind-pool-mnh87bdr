import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartConfig,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  Cpu,
  Wrench,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
} from "lucide-react";
import { equipmentMock } from "@/mock/equipment";
import { workOrderMock } from "@/mock/work-order";
import { maintenanceMock } from "@/mock/maintenance";
import { sparePartMock } from "@/mock/spare-part";
import { Link } from "@tanstack/react-router";
import { getDictLabel } from "@/lib/dict";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

const oeeData = [
  { month: "10月", oee: 78 },
  { month: "11月", oee: 82 },
  { month: "12月", oee: 75 },
  { month: "1月", oee: 85 },
  { month: "2月", oee: 88 },
  { month: "3月", oee: 91 },
];

const chartConfig = {
  oee: {
    label: "OEE (%)",
    color: "var(--color-chart-1)",
  },
  faults: {
    label: "故障次数",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig;

const faultData = [
  { name: "VMC-850", faults: 2 },
  { name: "CK6150", faults: 4 },
  { name: "LCT-3015", faults: 1 },
  { name: "Y32-500", faults: 0 },
  { name: "CMM", faults: 0 },
];

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

export function DashboardPage() {
  const runningCount = equipmentMock.filter((e) => e.status === "running").length;
  const stoppedCount = equipmentMock.filter(
    (e) => e.status === "stopped_repair" || e.status === "stopped_material"
  ).length;
  const activeWorkOrders = workOrderMock.filter(
    (w) => w.status === "executing" || w.status === "pending_execute" || w.status === "pending_dispatch"
  ).length;
  const urgentWorkOrders = workOrderMock.filter((w) => w.priority === "urgent").length;
  const overduePlans = maintenanceMock.filter((m) => m.planStatus === "overdue").length;
  const warningParts = sparePartMock.filter(
    (p) => p.currentStock <= p.safetyStock && p.currentStock > 0
  ).length;
  const outParts = sparePartMock.filter((p) => p.currentStock === 0).length;
  const currentOEE = oeeData[oeeData.length - 1].oee;

  return (
    <div className="page-section">
      <div className="page-header">
        <h1 className="page-title">监控大屏</h1>
        <p className="page-description">
          实时掌握全厂设备运行状态
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="stat-card card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">设备总数</p>
                <p className="text-3xl font-semibold mt-1 tabular-nums">{equipmentMock.length}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 dark:text-green-400 font-medium">{runningCount} 运行</span>
                  {" · "}
                  <span className="text-amber-600 dark:text-amber-400 font-medium">{stoppedCount} 停机</span>
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">活跃工单</p>
                <p className="text-3xl font-semibold mt-1 tabular-nums">{activeWorkOrders}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {urgentWorkOrders > 0 && (
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      {urgentWorkOrders} 紧急
                    </span>
                  )}
                  {urgentWorkOrders === 0 && <span>无紧急工单</span>}
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
                <Wrench className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">综合OEE</p>
                <p className="text-3xl font-semibold mt-1 tabular-nums">{currentOEE}%</p>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  较上月 +3%
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card card-hover">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">待处理事项</p>
                <p className="text-3xl font-semibold mt-1 tabular-nums">
                  {overduePlans + warningParts + outParts}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {overduePlans > 0 && (
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      {overduePlans} 到期
                    </span>
                  )}
                  {warningParts > 0 && (
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      {" · "}{warningParts} 预警
                    </span>
                  )}
                  {outParts > 0 && (
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      {" · "}{outParts} 缺货
                    </span>
                  )}
                  {overduePlans + warningParts + outParts === 0 && <span>暂无异常</span>}
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-base">OEE 趋势（近6个月）</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <AreaChart data={oeeData}>
                <defs>
                  <linearGradient id="oeeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--card)",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  cursor={{ stroke: "var(--primary)", strokeWidth: 1, strokeDasharray: "4 4" }}
                />
                <Area
                  type="monotone"
                  dataKey="oee"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  fill="url(#oeeGradient)"
                  dot={{ fill: "var(--color-chart-1)", r: 4 }}
                  activeDot={{ r: 6, stroke: "var(--primary-foreground)", strokeWidth: 2 }}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-base">设备故障次数排名</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <BarChart data={faultData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--card)",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  cursor={{ fill: "var(--accent)" }}
                />
                <Bar dataKey="faults" radius={[0, 4, 4, 0]} maxBarSize={24}>
                  {faultData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={
                        entry.faults === 0
                          ? "var(--color-chart-1)"
                          : entry.faults >= 3
                            ? "var(--color-chart-2)"
                            : "var(--color-chart-3)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Work Orders */}
      <Card className="card-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">最新工单</CardTitle>
            <Link to="/work-orders" className="text-sm text-primary hover:underline transition-opacity">
              查看全部
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {workOrderMock.slice(0, 5).map((wo) => (
              <div
                key={wo.id}
                className="list-item"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-muted-foreground shrink-0">
                    {wo.workOrderCode}
                  </span>
                  <span className="text-sm truncate">{wo.title}</span>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <Badge
                    className={colorMap[getDictLabel("dict-work-order-status", wo.status) === "执行中" ? "amber" : "blue"]}
                    variant="secondary"
                  >
                    {getDictLabel("dict-work-order-status", wo.status)}
                  </Badge>
                  <Badge
                    className={colorMap[getDictLabel("dict-work-order-priority", wo.priority) === "紧急" ? "red" : "amber"]}
                    variant="secondary"
                  >
                    {getDictLabel("dict-work-order-priority", wo.priority)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
