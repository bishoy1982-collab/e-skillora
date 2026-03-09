import { useState } from "react";
import { Brain, ArrowRight, CheckCircle, BookOpen, Target, Users, Zap, Star, ChevronRight } from "lucide-react";

const G_FONT = `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,600;9..144,700;9..144,800&family=Instrument+Sans:wght@400;500;600;700&display=swap`;

const LANDING_CSS = `
@import url('${G_FONT}');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { min-height: 100%; -webkit-font-smoothing: antialiased; }
body { font-family: 'Instrument Sans', sans-serif; background: #F7F3ED; color: #1A1A1A; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
.fade-up { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
.d1 { animation-delay: .1s; } .d2 { animation-delay: .2s; } .d3 { animation-delay: .3s; } .d4 { animation-delay: .4s; }
.float { animation: float 3s ease-in-out infinite; }
.hero-btn:hover { background: #2A5240 !important; transform: translateY(-1px); }
.hero-btn { transition: all 0.2s; }
.login-link:hover { color: #1C3A2F !important; }
.feature-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(28,58,47,0.12) !important; }
.feature-card { transition: all 0.2s; }
`;

interface LandingPageProps {
  onNavigate: (page: "login" | "signup") => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <>
      <style>{LANDING_CSS}</style>
      <div style={{ minHeight: "100vh", background: "#F7F3ED", fontFamily: "'Instrument Sans', sans-serif" }}>

        {/* Nav */}
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 32px", maxWidth: 1080, margin: "0 auto",
        }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              className="login-link"
              onClick={() => onNavigate("login")}
              style={{
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600,
                fontSize: 15, color: "#6B6B6B", background: "none",
                border: "none", cursor: "pointer", padding: "8px 16px", transition: "color 0.2s",
              }}
            >
              Log in
            </button>
            <button
              className="hero-btn"
              onClick={() => onNavigate("signup")}
              style={{
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600,
                fontSize: 15, background: "#1C3A2F", color: "#F7F3ED",
                border: "none", borderRadius: 12, padding: "10px 22px", cursor: "pointer",
              }}
            >
              Start Free Trial
            </button>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px 48px", textAlign: "center" }}>
          <div className="fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#E6F0E8", color: "#1C3A2F", fontSize: 13,
            fontWeight: 700, padding: "6px 16px", borderRadius: 9999,
            marginBottom: 28, letterSpacing: "0.3px",
          }}>
            <Star size={13} fill="#C9973A" color="#C9973A" />
            3-DAY FREE TRIAL · THEN $10.99/MONTH
          </div>

          <h1 className="fade-up d1" style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(36px, 6vw, 58px)",
            fontWeight: 800, color: "#1C3A2F",
            lineHeight: 1.12, marginBottom: 20,
          }}>
            Your child's personal{" "}
            <span style={{
              color: "#C9973A", position: "relative", display: "inline-block",
            }}>
              AI tutor
            </span>
            <br />for grades 1–12
          </h1>

          <p className="fade-up d2" style={{
            fontSize: 18, color: "#6B6B6B", lineHeight: 1.65,
            maxWidth: 520, margin: "0 auto 40px",
          }}>
            Mastery-based Math & Reading across 12 grade levels.
            Adaptive quizzes, an interactive whiteboard, and an AI tutor
            that only appears when your child is truly stuck.
          </p>

          <div className="fade-up d3" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <button
              className="hero-btn"
              onClick={() => onNavigate("signup")}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
                fontSize: 17, background: "#1C3A2F", color: "#F7F3ED",
                border: "none", borderRadius: 16, padding: "16px 32px", cursor: "pointer",
              }}
            >
              Start Free Trial <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onNavigate("login")}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600,
                fontSize: 16, background: "white", color: "#1C3A2F",
                border: "2px solid #E0D9CF", borderRadius: 16, padding: "14px 28px",
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              Log in <ChevronRight size={16} />
            </button>
          </div>

          <p className="fade-up d4" style={{ fontSize: 13, color: "#9A9A9A", marginTop: 16 }}>
            No credit card required for trial · Cancel anytime
          </p>
        </div>

        {/* Stats */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 64px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 16,
          }}>
            {[
              { icon: BookOpen, label: "12 Levels", sub: "Pre-K through Pre-Calc", color: "#1C3A2F" },
              { icon: Target, label: "3,000+", sub: "Questions per level", color: "#C9973A" },
              { icon: Users, label: "Ages 4–18", sub: "Adaptive placement test", color: "#3D7A5C" },
              { icon: Zap, label: "AI Tutor", sub: "Activates when stuck", color: "#E8604C" },
            ].map((item, i) => (
              <div key={i} className="feature-card" style={{
                background: "white", borderRadius: 20, padding: "24px 20px",
                textAlign: "center", boxShadow: "0 2px 16px rgba(28,58,47,0.07)",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, margin: "0 auto 12px",
                  background: `${item.color}15`, display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <item.icon size={22} color={item.color} />
                </div>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#1C3A2F" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 12, color: "#9A9A9A", marginTop: 4, lineHeight: 1.4 }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div style={{ background: "white", padding: "64px 24px" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 700, color: "#1C3A2F", textAlign: "center", marginBottom: 12,
            }}>
              How e-Skillora works
            </h2>
            <p style={{ textAlign: "center", color: "#6B6B6B", fontSize: 16, marginBottom: 48 }}>
              Three steps from sign-up to your child's first lesson
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
              {[
                {
                  step: "01", title: "Placement test",
                  desc: "A quick adaptive quiz places your child at exactly the right level — no grade assumptions.",
                },
                {
                  step: "02", title: "Daily practice",
                  desc: "Structured worksheets with Math & Reading questions. Progress requires mastery, not just completion.",
                },
                {
                  step: "03", title: "AI tutor on demand",
                  desc: "After 2 wrong answers on the same question, the AI tutor activates once to explain the concept clearly.",
                },
              ].map((item) => (
                <div key={item.step}>
                  <div style={{
                    fontFamily: "'Fraunces', serif", fontSize: 42, fontWeight: 800,
                    color: "#E6F0E8", marginBottom: 12, lineHeight: 1,
                  }}>
                    {item.step}
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, color: "#1C3A2F", marginBottom: 8 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 15, color: "#6B6B6B", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "64px 24px" }}>
          <h2 style={{
            fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 4vw, 36px)",
            fontWeight: 700, color: "#1C3A2F", textAlign: "center", marginBottom: 12,
          }}>
            Simple pricing
          </h2>
          <p style={{ textAlign: "center", color: "#6B6B6B", fontSize: 16, marginBottom: 36 }}>
            One plan. Everything included.
          </p>
          <div style={{
            background: "#1C3A2F", borderRadius: 24, padding: "40px 36px",
            textAlign: "center", boxShadow: "0 8px 40px rgba(28,58,47,0.18)",
          }}>
            <div style={{
              display: "inline-block", background: "#C9973A", color: "#1C3A2F",
              fontSize: 12, fontWeight: 700, padding: "4px 14px",
              borderRadius: 9999, marginBottom: 20, letterSpacing: "0.5px",
            }}>
              ALL FEATURES INCLUDED
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: 52, fontWeight: 800, color: "white" }}>
                $10.99
              </span>
              <span style={{ fontSize: 16, color: "#8BAF94", marginLeft: 4 }}>/month</span>
            </div>
            <p style={{ color: "#8BAF94", fontSize: 15, marginBottom: 32 }}>
              Start with a 3-day free trial. Cancel anytime.
            </p>
            {[
              "12 grade levels (Math & Reading)",
              "3,000+ questions per level",
              "AI tutor that activates when stuck",
              "Interactive whiteboard",
              "Progress analytics dashboard",
              "Adaptive placement test",
            ].map((feature) => (
              <div key={feature} style={{
                display: "flex", alignItems: "center", gap: 10,
                marginBottom: 12, textAlign: "left",
              }}>
                <CheckCircle size={16} color="#C9973A" style={{ flexShrink: 0 }} />
                <span style={{ color: "#E6F0E8", fontSize: 15 }}>{feature}</span>
              </div>
            ))}
            <button
              className="hero-btn"
              onClick={() => onNavigate("signup")}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 8, width: "100%", marginTop: 28,
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
                fontSize: 17, background: "#C9973A", color: "#1C3A2F",
                border: "none", borderRadius: 14, padding: "16px", cursor: "pointer",
              }}
            >
              Start 3-Day Free Trial <ArrowRight size={18} />
            </button>
            <p style={{ color: "#8BAF94", fontSize: 13, marginTop: 12 }}>
              No credit card required · Cancel anytime
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid #E0D9CF", padding: "24px 32px",
          textAlign: "center", fontSize: 13, color: "#9A9A9A",
        }}>
          © {new Date().getFullYear()} e-Skillora · E-Skillora LLC · All rights reserved.
        </footer>
      </div>
    </>
  );
}
