import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
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
  LayoutDashboard,
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
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex items-center h-14 border-b border-border shrink-0",
        collapsed ? "justify-center px-2" : "justify-between px-4"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-base font-semibold text-foreground">
              EAM
            </span>
          </div>
        )}
        {collapsed && (
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1.5 rounded-lg hover:bg-accent text-muted-foreground transition-colors",
            collapsed && "mt-1"
          )}
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
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {menuGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="px-3 mb-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {group.label}
              </p>
            )}
            {collapsed && (
              <div className="w-8 h-px bg-border mx-auto mb-2" />
            )}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                        collapsed && "justify-center px-0"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className={cn(
                        "h-[18px] w-[18px] shrink-0 transition-transform duration-200",
                        !isActive && "group-hover:scale-110"
                      )} />
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                      {isActive && !collapsed && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-foreground/50" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 p-3 border-t border-border">
        <div className={cn(
          "flex items-center rounded-lg bg-muted/50 p-2",
          collapsed && "justify-center p-2"
        )}>
          <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <span className="text-xs font-medium text-primary">管</span>
          </div>
          {!collapsed && (
            <div className="ml-2 min-w-0">
              <p className="text-xs font-medium truncate">系统管理员</p>
              <p className="text-[10px] text-muted-foreground truncate">admin@changji.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
