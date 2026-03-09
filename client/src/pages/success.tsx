import { useEffect } from "react";
import { Brain, CheckCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const G_FONT = `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,800&family=Instrument+Sans:wght@400;500;600;700&display=swap`;

interface SuccessPageProps {
  onNavigate: (page: "app") => void;
}

export default function SuccessPage({ onNavigate }: SuccessPageProps) {
  const { refreshUser } = useAuth();

  useEffect(() => {
    // Refresh user to pick up new subscription status from webhook
    const timer = setTimeout(() => refreshUser(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`@import url('${G_FONT}'); @keyframes pop { 0% { transform:scale(0); opacity:0; } 70% { transform:scale(1.15); } 100% { transform:scale(1); opacity:1; } } .pop { animation: pop 0.5s cubic-bezier(.34,1.56,.64,1) both; }`}</style>
      <div style={{
        minHeight: "100vh", background: "#F7F3ED",
        fontFamily: "'Instrument Sans', sans-serif",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: 24,
        textAlign: "center",
      }}>
        <div className="pop" style={{
          width: 80, height: 80, background: "#E6F0E8", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24,
        }}>
          <CheckCircle size={40} color="#1C3A2F" />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{
            width: 36, height: 36, background: "#1C3A2F", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Brain size={20} color="#C9973A" />
          </div>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, color: "#1C3A2F" }}>
            e-Skillora
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Fraunces', serif", fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: 800, color: "#1C3A2F", marginBottom: 12,
        }}>
          You're all set! 🎉
        </h1>
        <p style={{ color: "#6B6B6B", fontSize: 17, maxWidth: 420, lineHeight: 1.6, marginBottom: 36 }}>
          Your subscription is active. Your child can start learning right now — all 12 grade levels unlocked.
        </p>

        <button
          onClick={() => onNavigate("app")}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
            fontSize: 17, background: "#1C3A2F", color: "white",
            border: "none", borderRadius: 14, padding: "16px 32px",
            cursor: "pointer", transition: "all 0.2s",
          }}
        >
          Start Learning <ArrowRight size={18} />
        </button>
      </div>
    </>
  );
}
