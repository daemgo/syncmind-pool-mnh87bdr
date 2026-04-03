import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Wrench,
  ClipboardList,
  Package,
  Monitor,
  BarChart3,
  Plug,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuGroups = [
  {
    label: "核心功能",
    items: [
      { label: "监控大屏", icon: Monitor, path: "/" },
      { label: "设备台账", icon: Cpu, path: "/equipment" },
      { label: "维修工单", icon: Wrench, path: "/work-orders" },
      { label: "预防维护", icon: ClipboardList, path: "/maintenance" },
      { label: "备品备件", icon: Package, path: "/spare-parts" },
    ],
  },
  {
    label: "系统",
    items: [
      { label: "西门子集成", icon: Plug, path: "/integration", placeholder: true },
      { label: "分析报表", icon: BarChart3, path: "/reports", placeholder: true },
      { label: "系统设置", icon: Settings, path: "/settings", placeholder: true },
    ],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-border transition-all duration-200 flex flex-col",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-3 border-b border-border shrink-0">
        {!collapsed && (
          <span className="text-base font-semibold text-foreground truncate">
            EAM 管理系统
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1.5 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
          aria-label={collapsed ? "展开侧边栏" : "折叠侧边栏"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {menuGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="px-2 mb-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
