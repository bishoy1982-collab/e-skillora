import { useState, useEffect } from "react";
import { Brain, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

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

interface ResetPasswordPageProps {
  onNavigate: (page: "login") => void;
}

export default function ResetPasswordPage({ onNavigate }: ResetPasswordPageProps) {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token") ?? "";
    setToken(t);
    if (!t) setError("Missing reset link. Please use the link from your email.");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!token) {
      setError("Missing reset link. Please use the link from your email.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    try {
      const res = await apiRequest("POST", "/api/auth/reset-password", {
        token,
        newPassword,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message ?? "Failed to reset password");
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message ?? "This link may have expired. Please request a new one.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <style>{CSS}</style>
        <div style={{
          minHeight: "100vh", background: "#F7F3ED",
          fontFamily: "'Instrument Sans', sans-serif",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", padding: "24px",
        }}>
          <div className="fade-up" style={{
            background: "white", borderRadius: 24,
            padding: "40px 36px", width: "100%", maxWidth: 440,
            boxShadow: "0 4px 32px rgba(28,58,47,0.10)", textAlign: "center",
          }}>
            <div style={{ width: 56, height: 56, background: "#E6F0E8", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <CheckCircle size={28} color="#1C3A2F" />
            </div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, color: "#1C3A2F", marginBottom: 8 }}>
              Password updated
            </h1>
            <p style={{ color: "#6B6B6B", fontSize: 15, marginBottom: 24 }}>
              You can now log in with your new password.
            </p>
            <button
              onClick={() => onNavigate("login")}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
                fontSize: 16, background: "#1C3A2F", color: "#F7F3ED",
                border: "none", borderRadius: 14, padding: "14px 24px",
                cursor: "pointer",
              }}
            >
              Back to login <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div style={{
        minHeight: "100vh", background: "#F7F3ED",
        fontFamily: "'Instrument Sans', sans-serif",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "24px",
      }}>
        <div className="fade-up" style={{ marginBottom: 32, cursor: "pointer" }} onClick={() => onNavigate("login")}>
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

        <div className="fade-up" style={{
          background: "white", borderRadius: 24,
          padding: "40px 36px", width: "100%", maxWidth: 440,
          boxShadow: "0 4px 32px rgba(28,58,47,0.10)",
        }}>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 800, color: "#1C3A2F", marginBottom: 6 }}>
            Set new password
          </h1>
          <p style={{ color: "#9A9A9A", fontSize: 15, marginBottom: 28 }}>
            Enter your new password below.
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
                New password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
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
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#3D3D3D", marginBottom: 6 }}>
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                placeholder="Same as above"
                autoComplete="new-password"
                style={{
                  width: "100%", fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 15, color: "#1A1A1A", background: "#F7F3ED",
                  border: "2px solid #E0D9CF", borderRadius: 12,
                  padding: "13px 16px", transition: "border-color 0.2s",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !token}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
                fontSize: 16, background: "#1C3A2F", color: "#F7F3ED",
                border: "none", borderRadius: 14, padding: "15px",
                cursor: loading || !token ? "not-allowed" : "pointer",
                opacity: loading || !token ? 0.7 : 1, marginTop: 4,
              }}
            >
              {loading ? "Updating…" : <> Update password <ArrowRight size={18} /> </>}
            </button>
          </form>

          <button
            onClick={() => onNavigate("login")}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#9A9A9A", fontSize: 14, marginTop: 20,
              fontFamily: "'Instrument Sans', sans-serif",
            }}
          >
            ← Back to login
          </button>
        </div>
      </div>
    </>
  );
}
