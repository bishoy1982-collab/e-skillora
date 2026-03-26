import { useState } from "react";
import { CheckCircle, ArrowRight, Zap } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface PaywallModalProps {
  reason: "expired" | "cancelled" | "past_due";
}

const PLANS = [
  { id: "1child", label: "1 Child", price: "$10.99", color: "#2A5240" },
  { id: "2child", label: "2 Children", price: "$14.99", color: "#1C3A2F", badge: "Best Value" },
] as const;

const messages = {
  expired: {
    title: "Your free trial has ended",
    sub: "Choose a plan to keep your child's progress and continue learning.",
    badge: "TRIAL ENDED",
    badgeColor: "#C9973A",
  },
  cancelled: {
    title: "Your subscription is inactive",
    sub: "Reactivate to restore full access instantly.",
    badge: "SUBSCRIPTION INACTIVE",
    badgeColor: "#9A9A9A",
  },
  past_due: {
    title: "Payment issue detected",
    sub: "Update your payment method to continue.",
    badge: "PAYMENT FAILED",
    badgeColor: "#E8604C",
  },
};

export default function PaywallModal({ reason }: PaywallModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"1child" | "2child">("1child");

  const { title, sub, badge, badgeColor } = messages[reason];

  const handleSubscribe = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiRequest("POST", "/api/stripe/checkout", { planType: selectedPlan });
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(28,58,47,0.6)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{
        background: "white", borderRadius: 24, padding: "40px 36px",
        width: "100%", maxWidth: 460, position: "relative",
        boxShadow: "0 20px 60px rgba(28,58,47,0.25)",
        animation: "scaleIn 0.3s cubic-bezier(.34,1.56,.64,1)",
      }}>
        <style>{`@keyframes scaleIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }`}</style>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: `${badgeColor}18`, color: badgeColor,
          fontSize: 11, fontWeight: 700, padding: "4px 12px",
          borderRadius: 9999, marginBottom: 20, letterSpacing: "0.5px",
        }}>
          <Zap size={11} fill={badgeColor} color={badgeColor} />
          {badge}
        </div>

        <h2 style={{
          fontFamily: "'Fraunces', serif", fontSize: 26,
          fontWeight: 800, color: "#1C3A2F", marginBottom: 8,
        }}>
          {title}
        </h2>
        <p style={{ color: "#6B6B6B", fontSize: 15, marginBottom: 24, lineHeight: 1.5 }}>
          {sub}
        </p>

        {/* Plan selector */}
        <p style={{ fontSize: 12, fontWeight: 700, color: "#6B6B6B", marginBottom: 10, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Choose your plan
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          {PLANS.map(plan => {
            const active = selectedPlan === plan.id;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                style={{
                  position: "relative", padding: "14px 12px", borderRadius: 14,
                  border: `2px solid ${active ? plan.color : "rgba(224,217,207,0.9)"}`,
                  background: active ? plan.color : "rgba(255,255,255,0.85)",
                  cursor: "pointer", textAlign: "left",
                  transition: "all 0.15s", fontFamily: "'Instrument Sans', sans-serif",
                }}
              >
                {plan.badge && (
                  <span style={{
                    position: "absolute", top: -9, right: 8,
                    background: "#C9973A", color: "#1C3A2F",
                    fontSize: 9, fontWeight: 800, padding: "2px 8px",
                    borderRadius: 9999, letterSpacing: "0.03em",
                  }}>{plan.badge}</span>
                )}
                <p style={{ fontSize: 13, fontWeight: 700, color: active ? "#fff" : "#1C3A2F", marginBottom: 2 }}>
                  {plan.label}
                </p>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 800, color: active ? "#E5B96A" : "#1C3A2F", lineHeight: 1 }}>
                  {plan.price}<span style={{ fontSize: 11, fontWeight: 400, color: active ? "rgba(255,255,255,0.65)" : "#9A9A9A" }}>/mo</span>
                </p>
              </button>
            );
          })}
        </div>

        {/* Features */}
        <div style={{ background: "#F7F3ED", borderRadius: 14, padding: "14px 16px", marginBottom: 20 }}>
          {[
            "All 12 grade levels (Math & Reading)",
            "Daily worksheets + instant grading",
            "AI that explains your mistakes in plain English",
          ].map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <CheckCircle size={13} color="#3D7A5C" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#3D3D3D" }}>{f}</span>
            </div>
          ))}
          <p style={{ fontSize: 12, color: "#9A9A9A", marginTop: 6 }}>Cancel anytime</p>
        </div>

        {error && (
          <p style={{ color: "#E8604C", fontSize: 13, marginBottom: 12 }}>{error}</p>
        )}

        <button
          onClick={handleSubscribe}
          disabled={loading}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", fontFamily: "'Instrument Sans', sans-serif",
            fontWeight: 700, fontSize: 16, background: "#1C3A2F", color: "white",
            border: "none", borderRadius: 14, padding: "15px",
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
            transition: "all 0.2s",
          }}
        >
          {loading ? "Redirecting to checkout..." : <> Subscribe Now <ArrowRight size={18} /> </>}
        </button>

        <p style={{ textAlign: "center", color: "#9A9A9A", fontSize: 12, marginTop: 12 }}>
          Secure checkout powered by Stripe
        </p>
      </div>
    </div>
  );
}
