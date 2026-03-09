import { useState } from "react";
import { X, CheckCircle, ArrowRight, Zap } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface PaywallModalProps {
  reason: "expired" | "cancelled" | "past_due";
  onClose?: () => void;
}

export default function PaywallModal({ reason, onClose }: PaywallModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const messages = {
    expired: {
      title: "Your free trial has ended",
      sub: "Subscribe to keep learning where you left off.",
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

  const { title, sub, badge, badgeColor } = messages[reason];

  const handleSubscribe = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiRequest("POST", "/api/stripe/checkout", {});
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
        width: "100%", maxWidth: 440, position: "relative",
        boxShadow: "0 20px 60px rgba(28,58,47,0.25)",
        animation: "scaleIn 0.3s cubic-bezier(.34,1.56,.64,1)",
      }}>
        <style>{`@keyframes scaleIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }`}</style>

        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 16, right: 16,
              background: "#F7F3ED", border: "none", borderRadius: 8,
              width: 32, height: 32, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#9A9A9A",
            }}
          >
            <X size={16} />
          </button>
        )}

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
        <p style={{ color: "#6B6B6B", fontSize: 15, marginBottom: 28, lineHeight: 1.5 }}>
          {sub}
        </p>

        {/* Price */}
        <div style={{
          background: "#F7F3ED", borderRadius: 16, padding: "20px 24px",
          marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#1C3A2F" }}>
              $10.99<span style={{ fontSize: 14, fontWeight: 400, color: "#9A9A9A" }}>/month</span>
            </p>
            <p style={{ fontSize: 12, color: "#9A9A9A", marginTop: 2 }}>Cancel anytime</p>
          </div>
          <div style={{ textAlign: "right" }}>
            {[
              "All 12 grade levels",
              "AI tutor included",
              "Unlimited practice",
            ].map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#6B6B6B" }}>{f}</span>
                <CheckCircle size={12} color="#3D7A5C" />
              </div>
            ))}
          </div>
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
