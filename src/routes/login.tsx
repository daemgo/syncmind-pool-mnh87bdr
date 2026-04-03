import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, User, Lock, ChevronRight, Zap } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate({ to: "/" });
      } else {
        setError("用户名或密码错误");
      }
    } catch {
      setError("登录失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { username: "admin", role: "管理员", desc: "全部功能访问权限" },
    { username: "tech", role: "技术员", desc: "工单/维护/备件" },
    { username: "viewer", role: "访客", desc: "仅查看监控大屏" },
  ];

  const fillDemo = (demo: (typeof demoAccounts)[0]) => {
    setUsername(demo.username);
    setPassword(demo.username + "123");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] relative overflow-hidden flex items-center justify-center">
      {/* Animated background grid */}
      <div className="absolute inset-0 cyber-grid" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Scanlines effect */}
      <div className="absolute inset-0 scanlines opacity-[0.03]" />

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 mb-6 shadow-lg shadow-cyan-500/25">
            <Shield className="h-8 w-8 text-slate-900" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              EAM SYSTEM
            </span>
          </h1>
          <p className="text-slate-500 mt-2 text-sm">智能设备资产管理系统</p>
        </div>

        {/* Login Form */}
        <div className="cyber-card p-8">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400/50 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400/50 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400/50 rounded-br-lg" />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <User className="h-3 w-3" /> 用户名
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="cyber-input pl-10"
                  placeholder="输入用户名"
                  autoComplete="username"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400/50">
                  <User className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Lock className="h-3 w-3" /> 密码
              </label>
              <div className="relative">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="cyber-input pl-10"
                  placeholder="输入密码"
                  autoComplete="current-password"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400/50">
                  <Lock className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="text-red-400 text-sm text-center py-2 bg-red-400/10 rounded-lg border border-red-400/20">
                {error}
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-900 font-semibold shadow-lg shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  身份验证中...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  进入系统
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8 pt-6 border-t border-cyan-400/20">
            <p className="text-xs text-slate-500 text-center mb-4 flex items-center justify-center gap-2">
              <Zap className="h-3 w-3" /> 演示账号
            </p>
            <div className="grid grid-cols-3 gap-2">
              {demoAccounts.map((demo) => (
                <button
                  key={demo.username}
                  type="button"
                  onClick={() => fillDemo(demo)}
                  className="group p-3 rounded-lg border border-slate-700 hover:border-cyan-400/50 bg-slate-800/50 hover:bg-slate-800 transition-all duration-200 text-left"
                >
                  <p className="text-xs font-medium text-slate-300 group-hover:text-cyan-400 transition-colors">
                    {demo.role}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                    {demo.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-xs mt-6">
          © 2026 长机科技 · 设备资产管理系统
        </p>
      </div>
    </div>
  );
}
