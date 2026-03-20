import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";

export type SubscriptionStatus = "pending" | "trial" | "active" | "expired" | "cancelled" | "past_due" | null;

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  subscriptionStatus: SubscriptionStatus;
  trialEndsAt: string | null;
  planType: "1child" | "2child" | null;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasAccess: boolean;
  trialDaysLeft: number | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiRequest("POST", "/api/auth/login", { email, password });
    const data = await res.json();
    setUser(data);
  };

  const signup = async (email: string, name: string, password: string) => {
    const res = await apiRequest("POST", "/api/auth/signup", { email, name, password });
    const data = await res.json();
    setUser(data);
  };

  const logout = async () => {
    await apiRequest("POST", "/api/auth/logout", {});
    setUser(null);
  };

  const hasAccess =
    user?.subscriptionStatus === "active" ||
    (user?.subscriptionStatus === "trial" &&
      user.trialEndsAt != null &&
      new Date() < new Date(user.trialEndsAt));

  const trialDaysLeft =
    user?.subscriptionStatus === "trial" && user.trialEndsAt
      ? Math.max(0, Math.round((new Date(user.trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
      : null;

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser, hasAccess, trialDaysLeft }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
