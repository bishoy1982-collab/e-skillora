import { useState } from "react";
import { X, Clock, ArrowRight, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/contexts/AuthContext";

export default function TrialBanner() {
  const { trialDaysLeft, user } = useAuth();
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(false);

  if (user?.subscriptionStatus === "active") return null;
  if (dismissed || user?.subscriptionStatus !== "trial" || trialDaysLeft === null) return null;

  const isLastDay = trialDaysLeft <= 1;
  const isUrgent = trialDaysLeft <= 2;

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await apiRequest("POST", "/api/stripe/checkout", {});
      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "sticky", top: 0, left: 0, right: 0, zIndex: 150,
      background: isUrgent
        ? "linear-gradient(145deg, #E8604C, #F87060)"
        : "linear-gradient(145deg, #1C3A2F, #2A5240)",
      padding: "12px 16px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 10, flexWrap: "wrap",
      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      fontFamily: "'Instrument Sans', sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
        {isUrgent ? (
          <AlertCircle size={16} color="rgba(255,255,255,0.9)" style={{ flexShrink: 0 }} />
        ) : (
          <Clock size={16} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0 }} />
        )}
        <span style={{
          fontSize: 13, fontWeight: 600, color: "#fff",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {trialDaysLeft === 0
            ? "Your trial expires today!"
            : `${trialDaysLeft} day${trialDaysLeft !== 1 ? "s" : ""} left in trial`}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <button
          onClick={handleUpgrade}
          disabled={loading}
          style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
            fontSize: 12,
            background: isUrgent
              ? "rgba(255,255,255,0.95)"
              : "linear-gradient(145deg, #C9973A, #E5B96A)",
            color: isUrgent ? "#E8604C" : "#1C3A2F",
            border: "none", borderRadius: 9999, padding: "8px 16px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "all 0.2s",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            minHeight: 36,
            letterSpacing: "-0.01em",
          }}
        >
          {loading ? "..." : <> Subscribe <ArrowRight size={12} /> </>}
        </button>
        <button
          onClick={() => setDismissed(true)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center",
            padding: 4, minWidth: 28, minHeight: 28,
            borderRadius: 9999,
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
