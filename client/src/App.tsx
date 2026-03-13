import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import SuccessPage from "./pages/success";
import ResetPasswordPage from "./pages/reset-password";
import PaywallModal from "./components/PaywallModal";
import TrialBanner from "./components/TrialBanner";
import ESkillora from "./components/ESkillora-v3";

type Page = "landing" | "login" | "signup" | "app" | "success" | "reset-password";

function getInitialPage(): Page {
  const path = window.location.pathname;
  if (path === "/success") return "success";
  if (path === "/login") return "login";
  if (path === "/signup") return "signup";
  if (path === "/app") return "app";
  if (path === "/reset-password") return "reset-password";
  return "landing";
}

function AppRouter() {
  const { user, loading, hasAccess } = useAuth();
  const [page, setPage] = useState<Page>(getInitialPage);

  // Update URL when page changes
  useEffect(() => {
    const paths: Record<Page, string> = {
      landing: "/", login: "/login", signup: "/signup",
      app: "/app", success: "/success", "reset-password": "/reset-password",
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


  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "#F7F3ED",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 40, height: 40, border: "3px solid #E0D9CF",
            borderTopColor: "#1C3A2F", borderRadius: "50%",
            animation: "spin 0.8s linear infinite", margin: "0 auto 12px",
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
    const status = user?.subscriptionStatus;
    const needsPaywall = !hasAccess && status !== "trial";
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
