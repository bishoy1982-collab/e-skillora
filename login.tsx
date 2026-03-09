import { useState } from "react";
import { Brain, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
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

interface LoginPageProps {
  onNavigate: (page: "landing" | "signup" | "app") => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      onNavigate("app");
    } catch (err: any) {
      const msg = err?.message || "";
      if (msg.includes("401") || msg.includes("Invalid")) {
        setError("Invalid email or password");
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
        <div className="fade-up" style={{ marginBottom: 36, cursor: "pointer" }} onClick={() => onNavigate("landing")}>
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
            Welcome back
          </h1>
          <p style={{ color: "#9A9A9A", fontSize: 15, marginBottom: 28 }}>
            Log in to continue your child's learning journey
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
                  placeholder="Your password"
                  autoComplete="current-password"
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
              {loading ? "Logging in..." : <> Log in <ArrowRight size={18} /> </>}
            </button>
          </form>

          <p style={{ textAlign: "center", color: "#9A9A9A", fontSize: 14, marginTop: 24 }}>
            Don't have an account?{" "}
            <button
              onClick={() => onNavigate("signup")}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#1C3A2F", fontWeight: 700, fontSize: 14,
                fontFamily: "'Instrument Sans', sans-serif",
              }}
            >
              Start free trial
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
