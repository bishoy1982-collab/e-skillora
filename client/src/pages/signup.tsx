import { useState } from "react";
import { Brain, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const G_FONT = `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,800&family=Instrument+Sans:wght@400;500;600;700&display=swap`;

const CSS = `
@import url('${G_FONT}');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
.fade-up { animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) both; }
.auth-input:focus { border-color: #1C3A2F !important; outline: none; }
.submit-btn:hover:not(:disabled) { background: #2A5240 !important; transform: translateY(-1px); }
.submit-btn { transition: all 0.2s; }
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
        minHeight: "100vh", background: "#F7F3ED",
        fontFamily: "'Instrument Sans', sans-serif",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "24px",
      }}>
        {/* Logo */}
        <div className="fade-up" style={{ marginBottom: 32, cursor: "pointer" }} onClick={() => onNavigate("landing")}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, background: "#1C3A2F", borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Brain size={22} color="#C9973A" />
            </div>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#1C3A2F" }}>
              e-Skillora
            </span>
          </div>
        </div>

        {/* Trial badge */}
        <div className="fade-up" style={{
          background: "#E6F0E8", color: "#1C3A2F", fontSize: 13,
          fontWeight: 700, padding: "6px 16px", borderRadius: 9999,
          marginBottom: 24, letterSpacing: "0.3px",
        }}>
          ✨ 3 DAYS FREE · THEN $10.99/MONTH · CANCEL ANYTIME
        </div>

        {/* Card */}
        <div className="fade-up" style={{
          background: "white", borderRadius: 24,
          padding: "40px 36px", width: "100%", maxWidth: 440,
          boxShadow: "0 4px 32px rgba(28,58,47,0.10)",
        }}>
          <h1 style={{
            fontFamily: "'Fraunces', serif", fontSize: 28,
            fontWeight: 800, color: "#1C3A2F", marginBottom: 6,
          }}>
            Create your account
          </h1>
          <p style={{ color: "#9A9A9A", fontSize: 15, marginBottom: 28 }}>
            Start your child's free 3-day trial today
          </p>

          {error && (
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "#FEF2F0", border: "1px solid #F8D0CA",
              borderRadius: 10, padding: "12px 14px", marginBottom: 20,
            }}>
              <AlertCircle size={16} color="#E8604C" style={{ flexShrink: 0 }} />
              <span style={{ color: "#E8604C", fontSize: 14 }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#3D3D3D", marginBottom: 6 }}>
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
                  fontSize: 15, color: "#1A1A1A", background: "#F7F3ED",
                  border: "2px solid #E0D9CF", borderRadius: 12,
                  padding: "13px 16px", transition: "border-color 0.2s",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#3D3D3D", marginBottom: 6 }}>
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
                  fontSize: 15, color: "#1A1A1A", background: "#F7F3ED",
                  border: "2px solid #E0D9CF", borderRadius: 12,
                  padding: "13px 16px", transition: "border-color 0.2s",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#3D3D3D", marginBottom: 6 }}>
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
                    fontSize: 15, color: "#1A1A1A", background: "#F7F3ED",
                    border: "2px solid #E0D9CF", borderRadius: 12,
                    padding: "13px 44px 13px 16px", transition: "border-color 0.2s",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "#9A9A9A",
                    display: "flex", alignItems: "center",
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
                fontSize: 16, background: "#1C3A2F", color: "#F7F3ED",
                border: "none", borderRadius: 14, padding: "15px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1, marginTop: 4,
              }}
            >
              {loading ? "Creating account..." : <> Start Free Trial <ArrowRight size={18} /> </>}
            </button>
          </form>

          {/* What you get */}
          <div style={{
            borderTop: "1px solid #F0EBE3", marginTop: 24, paddingTop: 20,
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            {[
              "3 days completely free",
              "Full access to all 12 grade levels",
              "Cancel before trial ends — no charge",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircle size={15} color="#3D7A5C" />
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

        <button
          onClick={() => onNavigate("landing")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#9A9A9A", fontSize: 14, marginTop: 20,
            fontFamily: "'Instrument Sans', sans-serif",
          }}
        >
          ← Back to home
        </button>
      </div>
    </>
  );
}
