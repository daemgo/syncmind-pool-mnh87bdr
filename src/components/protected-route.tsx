import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth, canAccessPath } from "@/contexts/auth-context";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPaths?: string[];
}

export function ProtectedRoute({ children, requiredPaths = [] }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
      return;
    }

    // Check if current path is allowed for user's role
    if (user && requiredPaths.length > 0) {
      const currentPath = window.location.pathname;
      const hasAccess = requiredPaths.some((path) =>
        currentPath === path || currentPath.startsWith(path + "/")
      );
      if (!hasAccess) {
        // Redirect to first allowed path
        navigate({ to: requiredPaths[0] || "/" });
      }
    }
  }, [isAuthenticated, user, navigate, requiredPaths]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0e17] flex items-center justify-center">
        <div className="animate-pulse flex items-center gap-3 text-cyan-400">
          <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm font-medium">身份验证中...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
