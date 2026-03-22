import { useState, useEffect } from "react";

function track(event: string) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, referrer: document.referrer }),
  }).catch(() => {});
}
import { Brain, ArrowRight, CheckCircle, BookOpen, Target, Users, Zap, Star, ChevronRight, Play, Shield, Sparkles } from "lucide-react";

const G_FONT = `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,600;9..144,700;9..144,800&family=Instrument+Sans:wght@400;500;600;700&display=swap`;

const LANDING_CSS = `
@import url('${G_FONT}');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { min-height: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; }
body { font-family: 'Instrument Sans', sans-serif; background: #F7F3ED; color: #1A1A1A; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
.fade-up { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
.d1 { animation-delay: .08s; } .d2 { animation-delay: .16s; } .d3 { animation-delay: .24s; } .d4 { animation-delay: .32s; } .d5 { animation-delay: .4s; }
.float { animation: float 3s ease-in-out infinite; }
.hero-btn { transition: all 0.2s cubic-bezier(.22,1,.36,1); }
.hero-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(0,0,0,0.2) !important; }
.login-link:hover { color: #1C3A2F !important; }
.feature-card { transition: all 0.25s cubic-bezier(.22,1,.36,1); }
.feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.12) !important; }
.step-card { transition: all 0.25s cubic-bezier(.22,1,.36,1); }
.step-card:hover { transform: translateY(-2px); }
`;

interface LandingPageProps {
  onNavigate: (page: "login" | "signup") => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  useEffect(() => { track("pageview"); }, []);

  function goSignup() { track("click_free_trial"); onNavigate("signup"); }
  function goLogin()  { track("click_login");      onNavigate("login");  }

  return (
    <>
      <style>{LANDING_CSS}</style>
      <div style={{ minHeight: "100vh", background: "#F7F3ED", fontFamily: "'Instrument Sans', sans-serif" }}>

        {/* Nav */}
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px", maxWidth: 1080, margin: "0 auto",
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(247,243,237,0.92)", backdropFilter: "blur(16px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 38, height: 38, background: "linear-gradient(145deg, #1C3A2F, #2A5240)",
              borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(28,58,47,0.2)",
            }}>
              <Brain size={20} color="#E5B96A" />
            </div>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, color: "#1C3A2F", letterSpacing: "-0.02em" }}>
              e-Skillora
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              className="login-link"
              onClick={goLogin}
              style={{
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600,
                fontSize: 14, color: "#6B6B6B", background: "none",
                border: "none", cursor: "pointer", padding: "8px 14px", transition: "color 0.2s",
              }}
            >
              Log in
            </button>
            <button
              className="hero-btn"
              onClick={goSignup}
              style={{
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
                fontSize: 14, background: "linear-gradient(145deg, #1C3A2F, #2A5240)", color: "#F7F3ED",
                border: "none", borderRadius: 9999, padding: "10px 22px", cursor: "pointer",
                boxShadow: "0 8px 32px rgba(28,58,47,0.22)",
              }}
            >
              Start Free Trial
            </button>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 20px 40px", textAlign: "center" }}>
          <div className="fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "linear-gradient(145deg, #E6F0E8, #DCFCE7)", color: "#1C3A2F", fontSize: 12,
            fontWeight: 700, padding: "7px 16px", borderRadius: 9999,
            marginBottom: 24, letterSpacing: "0.04em", textTransform: "uppercase",
            boxShadow: "0 2px 8px rgba(28,58,47,0.08)",
          }}>
            <Star size={12} fill="#C9973A" color="#C9973A" />
            3-DAY FREE TRIAL · THEN FROM $9.99/MONTH
          </div>

          <h1 className="fade-up d1" style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(32px, 6vw, 54px)",
            fontWeight: 800, color: "#1C3A2F",
            lineHeight: 1.1, marginBottom: 18,
            letterSpacing: "-0.03em",
          }}>
            Your child's personal{" "}
            <span style={{
              background: "linear-gradient(145deg, #C9973A, #E5B96A)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              AI tutor
            </span>
            <br />for grades 1-12
          </h1>

          <p className="fade-up d2" style={{
            fontSize: 17, color: "#6B6B6B", lineHeight: 1.65,
            maxWidth: 500, margin: "0 auto 32px",
          }}>
            Mastery-based Math & Reading across 12 grade levels.
            Adaptive quizzes, an interactive whiteboard, and an AI tutor
            that only appears when your child is truly stuck.
          </p>

          <div className="fade-up d3" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <button
              className="hero-btn"
              onClick={goSignup}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
                fontSize: 16, background: "linear-gradient(145deg, #1C3A2F, #2A5240)", color: "#F7F3ED",
                border: "none", borderRadius: 9999, padding: "16px 32px", cursor: "pointer",
                boxShadow: "0 8px 32px rgba(28,58,47,0.25)",
                minHeight: 52,
              }}
            >
              Start Free Trial <ArrowRight size={18} />
            </button>
            <button
              className="hero-btn"
              onClick={goLogin}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600,
                fontSize: 15, background: "rgba(255,255,255,0.9)", color: "#1C3A2F",
                border: "1.5px solid #E0D9CF", borderRadius: 9999, padding: "14px 28px",
                cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                minHeight: 52,
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
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 56px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 12,
          }}>
            {[
              { icon: BookOpen, label: "12 Levels", sub: "Pre-K through Pre-Calc", color: "#1C3A2F", bg: "linear-gradient(145deg, #E6F0E8, #DCFCE7)" },
              { icon: Target, label: "3,000+", sub: "Questions per level", color: "#C9973A", bg: "linear-gradient(145deg, #F5E4C0, #FEF3C7)" },
              { icon: Users, label: "Ages 4-18", sub: "Adaptive placement test", color: "#3D7A5C", bg: "linear-gradient(145deg, #E6F0E8, #DCFCE7)" },
              { icon: Zap, label: "AI Tutor", sub: "Activates when stuck", color: "#E8604C", bg: "linear-gradient(145deg, #FEF2F0, #FEE2E2)" },
            ].map((item, i) => (
              <div key={i} className="feature-card fade-up" style={{
                animationDelay: `${0.1 + i * 0.08}s`,
                background: "rgba(255,255,255,0.92)", borderRadius: 24, padding: "22px 18px",
                textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                border: "1px solid rgba(224,217,207,0.7)",
                backdropFilter: "blur(8px)",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, margin: "0 auto 12px",
                  background: item.bg, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}>
                  <item.icon size={22} color={item.color} />
                </div>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#1C3A2F", letterSpacing: "-0.02em" }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 12, color: "#9A9A9A", marginTop: 4, lineHeight: 1.4 }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", padding: "56px 20px", borderTop: "1px solid rgba(224,217,207,0.5)", borderBottom: "1px solid rgba(224,217,207,0.5)" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "#EDE9FE", color: "#7C3AED", fontSize: 11,
                fontWeight: 700, padding: "5px 14px", borderRadius: 9999,
                marginBottom: 16, letterSpacing: "0.06em", textTransform: "uppercase",
              }}>
                HOW IT WORKS
              </span>
              <h2 style={{
                fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 700, color: "#1C3A2F", marginBottom: 10, letterSpacing: "-0.02em",
              }}>
                Three steps to mastery
              </h2>
              <p style={{ color: "#6B6B6B", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
                From sign-up to your child's first lesson in under 5 minutes
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {[
                {
                  step: "01", title: "Placement test", emoji: "🎯",
                  desc: "A quick adaptive quiz places your child at exactly the right level — no grade assumptions.",
                  color: "#7C3AED", bg: "#EDE9FE",
                },
                {
                  step: "02", title: "Daily practice", emoji: "📚",
                  desc: "Structured worksheets with Math & Reading questions. Progress requires mastery, not just completion.",
                  color: "#2563EB", bg: "#DBEAFE",
                },
                {
                  step: "03", title: "AI tutor on demand", emoji: "🤖",
                  desc: "After 2 wrong answers on the same question, the AI tutor activates once to explain the concept clearly.",
                  color: "#16A34A", bg: "#DCFCE7",
                },
              ].map((item) => (
                <div key={item.step} className="step-card" style={{
                  background: "rgba(255,255,255,0.92)", borderRadius: 24, padding: "28px 24px",
                  border: "1px solid rgba(224,217,207,0.7)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: item.bg, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: 24, marginBottom: 16,
                  }}>
                    {item.emoji}
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 700, color: item.color,
                    letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8,
                  }}>
                    STEP {item.step}
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 700, color: "#1C3A2F", marginBottom: 8, letterSpacing: "-0.01em" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#6B6B6B", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "56px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "#F5E4C0", color: "#C9973A", fontSize: 11,
              fontWeight: 700, padding: "5px 14px", borderRadius: 9999,
              marginBottom: 16, letterSpacing: "0.06em", textTransform: "uppercase",
            }}>
              SIMPLE PRICING
            </span>
            <h2 style={{
              fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 4vw, 34px)",
              fontWeight: 700, color: "#1C3A2F", marginBottom: 8, letterSpacing: "-0.02em",
            }}>
              One plan. Everything included.
            </h2>
          </div>
          <div style={{
            background: "linear-gradient(160deg, #1C3A2F, #2A5240, #3D7A5C)",
            borderRadius: 28, padding: "36px 28px",
            textAlign: "center",
            boxShadow: "0 8px 40px rgba(28,58,47,0.22), 0 0 0 1px rgba(255,255,255,0.05) inset",
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "linear-gradient(145deg, #C9973A, #E5B96A)", color: "#1C3A2F",
              fontSize: 11, fontWeight: 700, padding: "5px 14px",
              borderRadius: 9999, marginBottom: 20, letterSpacing: "0.06em", textTransform: "uppercase",
            }}>
              ALL FEATURES INCLUDED
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "#8BAF94", marginRight: 4 }}>from</span>
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: 48, fontWeight: 800, color: "white", letterSpacing: "-0.03em" }}>
                $9.99
              </span>
              <span style={{ fontSize: 15, color: "#8BAF94", marginLeft: 4 }}>/month</span>
            </div>
            <p style={{ color: "#8BAF94", fontSize: 13, marginBottom: 4 }}>
              1 child · $9.99/mo &nbsp;·&nbsp; 2 children · $14.99/mo
            </p>
            <p style={{ color: "#8BAF94", fontSize: 14, marginBottom: 28 }}>
              Start with a 3-day free trial. Cancel anytime.
            </p>
            <div style={{ textAlign: "left", maxWidth: 320, margin: "0 auto" }}>
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
                  marginBottom: 12,
                }}>
                  <CheckCircle size={16} color="#E5B96A" style={{ flexShrink: 0 }} />
                  <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14 }}>{feature}</span>
                </div>
              ))}
            </div>
            <button
              className="hero-btn"
              onClick={goSignup}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 8, width: "100%", marginTop: 24,
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700,
                fontSize: 16, background: "linear-gradient(145deg, #C9973A, #E5B96A)", color: "#1C3A2F",
                border: "none", borderRadius: 9999, padding: "16px", cursor: "pointer",
                boxShadow: "0 8px 32px rgba(201,151,58,0.3)",
                minHeight: 52,
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
          borderTop: "1px solid #E0D9CF", padding: "32px 20px",
          textAlign: "center", background: "#fff",
        }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 14 }}>
            <button
              onClick={() => onNavigate("contact")}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#6B6B6B", fontFamily: "'Instrument Sans', sans-serif" }}
            >
              Contact Us
            </button>
            <button
              onClick={() => onNavigate("terms")}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#6B6B6B", fontFamily: "'Instrument Sans', sans-serif" }}
            >
              Terms &amp; Conditions
            </button>
            <a
              href="mailto:contact@e-skillora.org"
              style={{ fontSize: 13, color: "#6B6B6B", textDecoration: "none", fontFamily: "'Instrument Sans', sans-serif" }}
            >
              contact@e-skillora.org
            </a>
          </div>
          <p style={{ fontSize: 12, color: "#BCBCBC", fontFamily: "'Instrument Sans', sans-serif" }}>
            &copy; {new Date().getFullYear()} E-Skillora LLC · All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
