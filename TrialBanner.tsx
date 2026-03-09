import { useState } from "react";
import { X, Clock, ArrowRight } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/contexts/AuthContext";

export default function TrialBanner() {
  const { trialDaysLeft, user } = useAuth();
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(false);

  if (dismissed || user?.subscriptionStatus !== "trial" || trialDaysLeft === null) return null;

  const isLastDay = trialDaysLeft <= 1;
  const bgColor = isLastDay ? "#FEF2F0" : "#E6F0E8";
  const textColor = isLastDay ? "#E8604C" : "#1C3A2F";
  const borderColor = isLastDay ? "#F8D0CA" : "#B8D4BE";

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
      background: bgColor, border: `1px solid ${borderColor}`,
      borderRadius: 12, padding: "12px 16px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 12, margin: "12px 16px 0", flexWrap: "wrap",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Clock size={16} color={textColor} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: textColor }}>
          {trialDaysLeft === 0
            ? "Your trial expires today!"
            : `${trialDaysLeft} day${trialDaysLeft !== 1 ? "s" : ""} left in your free trial`}
        </span>
        <span style={{ fontSize: 13, color: textColor, opacity: 0.7 }}>
          · Then $10.99/month
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={handleUpgrade}
          disabled={loading}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600,
            fontSize: 13, background: textColor, color: "white",
            border: "none", borderRadius: 8, padding: "7px 14px",
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
            transition: "all 0.2s",
          }}
        >
          {loading ? "..." : <> Subscribe <ArrowRight size={13} /> </>}
        </button>
        <button
          onClick={() => setDismissed(true)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: textColor, opacity: 0.5, display: "flex", alignItems: "center",
          }}
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
