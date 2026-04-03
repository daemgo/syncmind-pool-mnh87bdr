import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type UserRole = "admin" | "technician" | "viewer";

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo users with different roles
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  admin: {
    password: "admin123",
    user: {
      id: "1",
      username: "admin",
      name: "系统管理员",
      role: "admin",
    },
  },
  tech: {
    password: "tech123",
    user: {
      id: "2",
      username: "tech",
      name: "王师傅",
      role: "technician",
    },
  },
  viewer: {
    password: "view123",
    user: {
      id: "3",
      username: "viewer",
      name: "张经理",
      role: "viewer",
    },
  },
};

// Role-based permissions
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ["/", "/equipment", "/work-orders", "/maintenance", "/spare-parts", "/integration", "/reports", "/settings"],
  technician: ["/", "/work-orders", "/maintenance", "/spare-parts"],
  viewer: ["/"],
};

export function canAccessPath(role: UserRole, path: string): boolean {
  return ROLE_PERMISSIONS[role].includes(path);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

const STORAGE_KEY = "eam_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const demoUser = DEMO_USERS[username];
    if (demoUser && demoUser.password === password) {
      setUser(demoUser.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
