import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import SuccessPage from "./pages/success";
import ResetPasswordPage from "./pages/reset-password";
import AdminPage from "./pages/admin";
import QuestionsAdminPage from "./pages/questions-admin";
import PaywallModal from "./components/PaywallModal";
import TrialBanner from "./components/TrialBanner";
import ESkillora from "./components/ESkillora-v3";
import { apiRequest } from "./lib/queryClient";

type Page = "landing" | "login" | "signup" | "app" | "success" | "reset-password" | "admin" | "questions-admin";

function getInitialPage(): Page {
  const path = window.location.pathname;
  if (path === "/success") return "success";
  if (path === "/login") return "login";
  if (path === "/signup") return "signup";
  if (path === "/app") return "app";
  if (path === "/reset-password") return "reset-password";
  if (path === "/admin") return "admin";
  if (path === "/questions-admin") return "questions-admin";
  return "landing";
}

const PENDING_PLANS = [
  {
    id: "1child" as const,
    label: "1 Child",
    price: "$10.99",
    desc: "1 child · All 12 grade levels · AI tutor",
    color: "#2A5240",
    badge: null as string | null,
  },
  {
    id: "2child" as const,
    label: "2 Children",
    price: "$14.99",
    desc: "2 children · All 12 grade levels · AI tutor",
    color: "#1C3A2F",
    badge: "Best Value",
  },
];

function PendingSetup() {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<"1child" | "2child">("1child");
  const [error, setError] = useState("");
  const { logout } = useAuth();

  const handleSetup = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiRequest("POST", "/api/stripe/checkout", { planType: selected });
      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        setError("No checkout URL returned. Please try again.");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
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
        background: "#fff", borderRadius: 24, padding: "40px 32px",
        maxWidth: 440, width: "100%",
        boxShadow: "0 8px 40px rgba(28,58,47,0.12)",
      }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 700, color: "#1C3A2F", marginBottom: 6 }}>
          Choose your plan
        </h2>
        <p style={{ color: "#6B6B6B", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
          Try free for <strong>3 days</strong> · Cancel anytime · You won't be charged until the trial ends.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {PENDING_PLANS.map(plan => {
            const active = selected === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                style={{
                  position: "relative", textAlign: "left", padding: "18px 20px",
                  borderRadius: 16, cursor: "pointer", transition: "all .2s",
                  background: active ? plan.color : "#F7F3ED",
                  border: `2px solid ${active ? plan.color : "#E0D9CF"}`,
                  fontFamily: "'Instrument Sans', sans-serif",
                }}
              >
                {plan.badge && (
                  <span style={{
                    position: "absolute", top: -10, right: 14,
                    background: "#C9973A", color: "#1C3A2F",
                    fontSize: 11, fontWeight: 700, padding: "3px 10px",
                    borderRadius: 9999,
                  }}>{plan.badge}</span>
                )}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: active ? "#fff" : "#1C3A2F", marginBottom: 3 }}>{plan.label}</p>
                    <p style={{ fontSize: 13, color: active ? "rgba(255,255,255,0.7)" : "#9A9A9A" }}>{plan.desc}</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                    <span style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: active ? "#E5B96A" : "#1C3A2F" }}>{plan.price}</span>
                    <span style={{ fontSize: 12, color: active ? "rgba(255,255,255,0.6)" : "#9A9A9A" }}>/mo</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {error && (
          <div style={{
            background: "rgba(232,96,76,0.08)", border: "1px solid rgba(232,96,76,0.25)",
            borderRadius: 12, padding: "12px 14px", marginBottom: 16,
            color: "#E8604C", fontSize: 13, lineHeight: 1.5,
          }}>
            {error}
          </div>
        )}

        <button
          onClick={handleSetup}
          disabled={loading}
          style={{
            width: "100%", background: "linear-gradient(145deg, #1C3A2F, #2A5240)", color: "#fff",
            border: "none", borderRadius: 14, padding: "15px",
            fontSize: 16, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1, marginBottom: 14,
            fontFamily: "'Instrument Sans', sans-serif",
            boxShadow: "0 8px 24px rgba(28,58,47,0.2)",
          }}
        >
          {loading ? "Redirecting to Stripe..." : "Start Free Trial →"}
        </button>
        <button
          onClick={() => logout()}
          style={{
            display: "block", margin: "0 auto", background: "none", border: "none",
            color: "#9A9A9A", fontSize: 13, cursor: "pointer",
            fontFamily: "'Instrument Sans', sans-serif",
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
      app: "/app", success: "/success", "reset-password": "/reset-password", admin: "/admin", "questions-admin": "/questions-admin",
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
  if (page === "questions-admin") return <QuestionsAdminPage />;

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
