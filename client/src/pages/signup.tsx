import { useState } from "react";
import { Brain, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle, ChevronLeft, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const G_FONT = `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,800&family=Instrument+Sans:wght@400;500;600;700&display=swap`;

const CSS = `
@import url('${G_FONT}');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
.fade-up { animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) both; }
.d1 { animation-delay: .06s; } .d2 { animation-delay: .12s; }
.auth-input { transition: border-color 0.2s, box-shadow 0.2s; }
.auth-input:focus { border-color: #1C3A2F !important; box-shadow: 0 0 0 3px rgba(28,58,47,0.1) !important; outline: none; }
.submit-btn { transition: all 0.2s cubic-bezier(.22,1,.36,1); }
.submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(28,58,47,0.25) !important; }
.back-link { transition: color 0.2s; }
.back-link:hover { color: #1C3A2F !important; }
`;

interface SignupPageProps {
  onNavigate: (page: "landing" | "login" | "app") => void;
}

export default function SignupPage({ onNavigate }: SignupPageProps) {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) { setError("Please enter your name"); return; }
    if (!email || !email.includes("@")) { setError("Please enter a valid email"); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return; }

    setLoading(true);
    try {
      await signup(email, name, password);
      onNavigate("app");
    } catch (err: any) {
      const msg = err?.message || "";
      if (msg.includes("409") || msg.includes("already exists")) {
        setError("An account with this email already exists");
      } else if (msg.includes("400")) {
        setError("Please check your details and try again");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{
        minHeight: "100svh",
        background: "linear-gradient(160deg, #1C3A2F 0%, #2A5240 45%, #3D7A5C 100%)",
        fontFamily: "'Instrument Sans', sans-serif",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "24px 20px",
      }}>
        {/* Back button */}
        <button
          className="back-link"
          onClick={() => onNavigate("landing")}
          style={{
            position: "absolute", top: 20, left: 20,
            display: "inline-flex", alignItems: "center", gap: 4,
            background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.2)",
            borderRadius: 9999, padding: "8px 16px", cursor: "pointer",
            color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600,
            fontFamily: "'Instrument Sans', sans-serif",
            backdropFilter: "blur(8px)",
          }}
        >
          <ChevronLeft size={14} /> Back
        </button>

        {/* Logo */}
        <div className="fade-up" style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, background: "rgba(255,255,255,0.12)",
            border: "1.5px solid rgba(255,255,255,0.2)",
            borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(8px)",
          }}>
            <Brain size={20} color="#E5B96A" />
          </div>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
            e-Skillora
          </span>
        </div>

        {/* Trial badge */}
        <div className="fade-up" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
          color: "rgba(255,255,255,0.9)", fontSize: 11,
          fontWeight: 700, padding: "6px 16px", borderRadius: 9999,
          marginBottom: 20, letterSpacing: "0.04em", textTransform: "uppercase" as const,
          backdropFilter: "blur(8px)",
        }}>
          <Star size={12} fill="#E5B96A" color="#E5B96A" />
          3 DAYS FREE · THEN $10.99/MONTH
        </div>

        {/* Card */}
        <div className="fade-up d1" style={{
          background: "rgba(255,255,255,0.95)", borderRadius: 28,
          padding: "36px 28px", width: "100%", maxWidth: 420,
          boxShadow: "0 8px 40px rgba(0,0,0,0.14), 0 0 0 1px rgba(255,255,255,0.1) inset",
          backdropFilter: "blur(12px)",
        }}>
          <h1 style={{
            fontFamily: "'Fraunces', serif", fontSize: 26,
            fontWeight: 700, color: "#1C3A2F", marginBottom: 4,
            letterSpacing: "-0.02em",
          }}>
            Create your account
          </h1>
          <p style={{ color: "#9A9A9A", fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
            Start your child's free 3-day trial today
          </p>

          {error && (
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(232,96,76,0.08)", border: "1px solid rgba(232,96,76,0.2)",
              borderRadius: 12, padding: "12px 14px", marginBottom: 20,
            }}>
              <AlertCircle size={16} color="#E8604C" style={{ flexShrink: 0 }} />
              <span style={{ color: "#E8604C", fontSize: 14, fontWeight: 500 }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#6B6B6B", marginBottom: 7, letterSpacing: "0.01em" }}>
                Your name
              </label>
              <input
                className="auth-input"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                placeholder="Jane Smith"
                autoComplete="name"
                style={{
                  width: "100%", fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 16, color: "#1A1A1A", background: "rgba(255,255,255,0.85)",
                  border: "1.5px solid rgba(224,217,207,0.9)", borderRadius: 16,
                  padding: "14px 16px", WebkitAppearance: "none" as any,
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#6B6B6B", marginBottom: 7, letterSpacing: "0.01em" }}>
                Email address
              </label>
              <input
                className="auth-input"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="you@email.com"
                autoComplete="email"
                style={{
                  width: "100%", fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 16, color: "#1A1A1A", background: "rgba(255,255,255,0.85)",
                  border: "1.5px solid rgba(224,217,207,0.9)", borderRadius: 16,
                  padding: "14px 16px", WebkitAppearance: "none" as any,
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#6B6B6B", marginBottom: 7, letterSpacing: "0.01em" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  className="auth-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  style={{
                    width: "100%", fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: 16, color: "#1A1A1A", background: "rgba(255,255,255,0.85)",
                    border: "1.5px solid rgba(224,217,207,0.9)", borderRadius: 16,
                    padding: "14px 48px 14px 16px", WebkitAppearance: "none" as any,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "#9A9A9A",
                    display: "flex", alignItems: "center", padding: 4,
                    minWidth: 32, minHeight: 32,
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              className="submit-btn"
              type="submit"
              disabled={loading}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
                fontSize: 16, background: "linear-gradient(145deg, #1C3A2F, #2A5240)", color: "#F7F3ED",
                border: "none", borderRadius: 9999, padding: "15px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1, marginTop: 4,
                boxShadow: "0 8px 32px rgba(28,58,47,0.22)",
                minHeight: 52,
              }}
            >
              {loading ? "Creating account..." : <> Start Free Trial <ArrowRight size={18} /> </>}
            </button>
          </form>

          {/* What you get */}
          <div style={{
            borderTop: "1px solid rgba(224,217,207,0.5)", marginTop: 24, paddingTop: 20,
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {[
              "3 days completely free",
              "Full access to all 12 grade levels",
              "Cancel before trial ends — no charge",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircle size={15} color="#16A34A" />
                <span style={{ fontSize: 13, color: "#6B6B6B" }}>{item}</span>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", color: "#9A9A9A", fontSize: 14, marginTop: 20 }}>
            Already have an account?{" "}
            <button
              onClick={() => onNavigate("login")}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#1C3A2F", fontWeight: 700, fontSize: 14,
                fontFamily: "'Instrument Sans', sans-serif",
              }}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
