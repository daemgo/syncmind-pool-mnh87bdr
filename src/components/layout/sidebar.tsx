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
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth, ROLE_PERMISSIONS } from "@/contexts/auth-context";

const ALL_MENU_GROUPS = [
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

const ROLE_LABELS: Record<string, string> = {
  admin: "管理员",
  technician: "技术员",
  viewer: "访客",
};

const ROLE_AVATARS: Record<string, string> = {
  admin: "管",
  technician: "技",
  viewer: "访",
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Filter menu items based on user role
  const allowedPaths = user ? ROLE_PERMISSIONS[user.role] : [];
  const menuGroups = ALL_MENU_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((item) => allowedPaths.includes(item.path)),
  })).filter((group) => group.items.length > 0);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out flex flex-col",
        "bg-[#0d1117] border-cyan-400/20",
        collapsed ? "w-16" : "w-60"
      )}
      style={{
        boxShadow: "inset -1px 0 0 0 rgba(6, 182, 212, 0.1)",
      }}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center h-14 shrink-0",
          collapsed ? "justify-center px-2" : "justify-between px-4"
        )}
        style={{ borderBottom: "1px solid rgba(6, 182, 212, 0.15)" }}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center shadow-sm"
              style={{
                background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
              }}
            >
              <LayoutDashboard className="h-4 w-4 text-slate-900" />
            </div>
            <span className="text-base font-bold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                EAM
              </span>
            </span>
          </div>
        )}
        {collapsed && (
          <div
            className="h-8 w-8 rounded-lg flex items-center justify-center shadow-sm"
            style={{
              background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
            }}
          >
            <LayoutDashboard className="h-4 w-4 text-slate-900" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1.5 rounded-lg transition-all duration-200 hover:scale-110",
            collapsed && "mt-1"
          )}
          style={{ color: "rgba(6, 182, 212, 0.6)" }}
          aria-label={collapsed ? "展开侧边栏" : "折叠侧边栏"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {menuGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p
                className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "rgba(6, 182, 212, 0.5)" }}
              >
                {group.label}
              </p>
            )}
            {collapsed && (
              <div
                className="w-8 h-px mx-auto mb-3"
                style={{
                  background: "linear-gradient(to right, transparent, rgba(6, 182, 212, 0.3), transparent)",
                }}
              />
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
                          ? "bg-gradient-to-r from-cyan-500/10 to-transparent text-cyan-400 border-l-2 border-cyan-400"
                          : "text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50",
                        collapsed && "justify-center px-0"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon
                        className={cn(
                          "h-[18px] w-[18px] shrink-0 transition-transform duration-200",
                          !isActive && "group-hover:scale-110"
                        )}
                      />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                      {isActive && !collapsed && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
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
      <div
        className="shrink-0 p-3"
        style={{ borderTop: "1px solid rgba(6, 182, 212, 0.15)" }}
      >
        <div
          className={cn(
            "flex items-center rounded-lg p-2 transition-all duration-200",
            collapsed && "justify-center"
          )}
          style={{ background: "rgba(6, 182, 212, 0.05)" }}
        >
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs font-medium"
            style={{
              background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)",
              color: "#22d3ee",
              border: "1px solid rgba(6, 182, 212, 0.3)",
            }}
          >
            {user ? ROLE_AVATARS[user.role] : "?"}
          </div>
          {!collapsed && user && (
            <div className="ml-2 min-w-0 flex-1">
              <p className="text-xs font-medium truncate text-slate-300">{user.name}</p>
              <p className="text-[10px] text-cyan-400/70 truncate">
                {ROLE_LABELS[user.role]}
              </p>
            </div>
          )}
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-2 mt-2 px-3 py-2 rounded-lg text-sm transition-all duration-200",
            collapsed ? "justify-center" : ""
          )}
          style={{
            color: "rgba(239, 68, 68, 0.7)",
          }}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>退出登录</span>}
        </button>
      </div>
    </aside>
  );
}
