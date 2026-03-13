import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import SuccessPage from "./pages/success";
import ResetPasswordPage from "./pages/reset-password";
import AdminPage from "./pages/admin";
import PaywallModal from "./components/PaywallModal";
import TrialBanner from "./components/TrialBanner";
import ESkillora from "./components/ESkillora-v3";
import { apiRequest } from "./lib/queryClient";

type Page = "landing" | "login" | "signup" | "app" | "success" | "reset-password" | "admin";

function getInitialPage(): Page {
  const path = window.location.pathname;
  if (path === "/success") return "success";
  if (path === "/login") return "login";
  if (path === "/signup") return "signup";
  if (path === "/app") return "app";
  if (path === "/reset-password") return "reset-password";
  if (path === "/admin") return "admin";
  return "landing";
}

function PendingSetup() {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const handleSetup = async () => {
    setLoading(true);
    try {
      const res = await apiRequest("POST", "/api/stripe/checkout", {});
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#F7F3ED",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      fontFamily: "'Instrument Sans', sans-serif",
    }}>
      <div style={{
        background: "#fff", borderRadius: 24, padding: "40px 36px",
        maxWidth: 420, width: "100%", textAlign: "center",
        boxShadow: "0 8px 40px rgba(28,58,47,0.12)",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, color: "#1C3A2F", marginBottom: 8 }}>
          One last step!
        </h2>
        <p style={{ color: "#6B6B6B", fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
          Set up your payment method to activate your 3-day free trial. You won't be charged until the trial ends.
        </p>
        <button
          onClick={handleSetup}
          disabled={loading}
          style={{
            width: "100%", background: "#1C3A2F", color: "#fff",
            border: "none", borderRadius: 14, padding: "15px",
            fontSize: 16, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1, marginBottom: 12,
            fontFamily: "'Instrument Sans', sans-serif",
          }}
        >
          {loading ? "Redirecting..." : "Activate Free Trial →"}
        </button>
        <button
          onClick={() => logout()}
          style={{
            background: "none", border: "none", color: "#9A9A9A",
            fontSize: 13, cursor: "pointer", fontFamily: "'Instrument Sans', sans-serif",
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

function AppRouter() {
  const { user, loading, hasAccess } = useAuth();
  const [page, setPage] = useState<Page>(getInitialPage);

  // Update URL when page changes
  useEffect(() => {
    const paths: Record<Page, string> = {
      landing: "/", login: "/login", signup: "/signup",
      app: "/app", success: "/success", "reset-password": "/reset-password", admin: "/admin",
    };
    window.history.pushState({}, "", paths[page]);
  }, [page]);

  // Handle browser back/forward
  useEffect(() => {
    const handler = () => setPage(getInitialPage());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  // Redirect logged-in users away from auth pages
  useEffect(() => {
    if (!loading && user && (page === "login" || page === "signup")) {
      setPage("app");
    }
  }, [user, loading, page]);

  // Redirect unauthenticated users away from app
  useEffect(() => {
    if (!loading && !user && page === "app") {
      setPage("landing");
    }
  }, [user, loading, page]);

  if (page === "admin") return <AdminPage />;

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "#F7F3ED",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div>
          <div style={{
            width: 40, height: 40, border: "3px solid #E0D9CF",
            borderTopColor: "#1C3A2F", borderRadius: "50%",
            animation: "spin 0.8s linear infinite", margin: "0 auto",
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const navigate = (p: Page) => setPage(p);

  if (page === "landing") return <LandingPage onNavigate={(p) => navigate(p as Page)} />;
  if (page === "login") return <LoginPage onNavigate={(p) => navigate(p as Page)} />;
  if (page === "signup") return <SignupPage onNavigate={(p) => navigate(p as Page)} />;
  if (page === "success") return <SuccessPage onNavigate={() => navigate("app")} />;
  if (page === "reset-password") return <ResetPasswordPage onNavigate={() => navigate("login")} />;

  // App page
  if (page === "app") {
    // Pending users need to complete Stripe checkout — show inline prompt, no auto-redirect
    if (user?.subscriptionStatus === "pending") return <PendingSetup />;

    const status = user?.subscriptionStatus;
    const paywallReason = status === "expired" || status === "cancelled" || status === "past_due"
      ? status : null;

    return (
      <div style={{ position: "relative" }}>
        <TrialBanner />
        {paywallReason && (
          <PaywallModal reason={paywallReason as "expired" | "cancelled" | "past_due"} />
        )}
        <ESkillora />
      </div>
    );
  }

  return <LandingPage onNavigate={(p) => navigate(p as Page)} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
