import { useEffect } from "react";

function track(event: string) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, referrer: document.referrer }),
  }).catch(() => {});
}
import { Brain, ArrowRight, CheckCircle, ClipboardCheck, BarChart3, GraduationCap, Star, ChevronDown, Zap, Target, TrendingUp, BookOpen } from "lucide-react";

const G_FONT = `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Instrument+Sans:wght@400;500;600;700&display=swap`;

const CSS = `
@import url('${G_FONT}');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Instrument Sans', sans-serif; background: #fff; color: #2D2D2D; -webkit-font-smoothing: antialiased; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
.fu { animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both; }
.d1{animation-delay:.07s}.d2{animation-delay:.14s}.d3{animation-delay:.21s}.d4{animation-delay:.28s}.d5{animation-delay:.35s}
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'Instrument Sans', sans-serif; font-weight: 700; font-size: 15px;
  background: #1C3A2F; color: #fff; border: none; border-radius: 10px;
  padding: 14px 28px; cursor: pointer; transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
  box-shadow: 0 4px 16px rgba(28,58,47,0.22); min-height: 48px; white-space: nowrap;
}
.btn-primary:hover { background: #142e25; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(28,58,47,0.28); }
.btn-secondary {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'Instrument Sans', sans-serif; font-weight: 600; font-size: 15px;
  background: #fff; color: #1C3A2F; border: 1.5px solid #D1D5DB; border-radius: 10px;
  padding: 13px 26px; cursor: pointer; transition: border-color 0.18s, transform 0.18s, box-shadow 0.18s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05); min-height: 48px; white-space: nowrap;
}
.btn-secondary:hover { border-color: #1C3A2F; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.09); }
.card {
  background: #fff; border-radius: 16px; border: 1px solid #EBEBEB;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06); transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
.nav-link {
  background: none; border: none; cursor: pointer; font-family: 'Instrument Sans', sans-serif;
  font-size: 14px; font-weight: 500; color: #555; padding: 8px 12px;
  transition: color 0.15s; text-decoration: none;
}
.nav-link:hover { color: #1C3A2F; }
.section-label {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 11px; font-weight: 700; padding: 5px 14px; border-radius: 9999px;
  letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 16px;
}
.check-yes { color: #16A34A; font-weight: 700; font-size: 18px; }
.check-no  { color: #D1D5DB; font-weight: 700; font-size: 18px; }
.check-partial { color: #F59E0B; font-weight: 700; font-size: 16px; }
@media (max-width: 768px) {
  .hero-grid { grid-template-columns: 1fr !important; }
  .hero-mockup { display: none !important; }
  .three-col { grid-template-columns: 1fr !important; }
  .four-col { grid-template-columns: 1fr 1fr !important; }
  .compare-table { font-size: 13px !important; }
  .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  .nav-links { display: none !important; }
}
`;

interface LandingPageProps {
  onNavigate: (page: "login" | "signup") => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  useEffect(() => { track("pageview"); }, []);

  function goSignup() { track("click_free_trial"); onNavigate("signup"); }
  function goLogin()  { track("click_login");      onNavigate("login");  }
  function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }

  const wrap = { maxWidth: 1100, margin: "0 auto", padding: "0 24px" };
  const section = { padding: "80px 0" };

  return (
    <>
      <style>{CSS}</style>
      <div style={{ background: "#fff", color: "#2D2D2D" }}>

        {/* ── NAVBAR ── */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid #EBEBEB",
          boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
        }}>
          <div style={{ ...wrap, display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, background: "linear-gradient(145deg, #1C3A2F, #2A5240)",
                borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 3px 10px rgba(28,58,47,0.2)",
              }}>
                <Brain size={18} color="#E5B96A" />
              </div>
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 700, color: "#1C3A2F", letterSpacing: "-0.02em" }}>
                e-Skillora
              </span>
            </div>
            {/* Links */}
            <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <button className="nav-link" onClick={() => scrollTo("how-it-works")}>How it works</button>
              <button className="nav-link" onClick={() => scrollTo("pricing")}>Pricing</button>
              <button className="nav-link" onClick={goLogin} style={{ fontWeight: 600 }}>Login</button>
              <button className="btn-primary" onClick={goSignup} style={{ marginLeft: 8, fontSize: 14, padding: "10px 20px", minHeight: 40 }}>
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <div style={{ background: "#F9FAFB", borderBottom: "1px solid #EBEBEB" }}>
          <div style={{ ...wrap, ...section }}>
            <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

              {/* Left */}
              <div>
                <div className="fu section-label" style={{ background: "#DCFCE7", color: "#16A34A" }}>
                  <Star size={11} fill="#16A34A" color="#16A34A" /> 3-Day Free Trial
                </div>
                <h1 className="fu d1" style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800,
                  color: "#111", lineHeight: 1.15, marginBottom: 18, letterSpacing: "-0.03em",
                }}>
                  Help your child improve with structured daily learning
                </h1>
                <p className="fu d2" style={{ fontSize: 17, color: "#555", lineHeight: 1.7, marginBottom: 10 }}>
                  Daily worksheets, instant grading, and level progression that builds real skills.
                </p>
                <p className="fu d2" style={{ fontSize: 14, color: "#16A34A", fontWeight: 600, marginBottom: 32 }}>
                  Also built for self-learners in grades 1–12
                </p>
                <div className="fu d3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button className="btn-primary" onClick={goSignup}>
                    Start Free Trial <ArrowRight size={16} />
                  </button>
                  <button className="btn-secondary" onClick={() => scrollTo("how-it-works")}>
                    See How It Works <ChevronDown size={16} />
                  </button>
                </div>
                <p className="fu d4" style={{ fontSize: 13, color: "#999", marginTop: 14 }}>
                  No credit card required · Cancel anytime · Students welcome
                </p>
              </div>

              {/* Right — Product Mockup */}
              <div className="hero-mockup fu d3" style={{
                background: "#fff", borderRadius: 20,
                boxShadow: "0 8px 48px rgba(0,0,0,0.12), 0 0 0 1px #EBEBEB",
                overflow: "hidden",
              }}>
                {/* Mockup header bar */}
                <div style={{ background: "#1C3A2F", padding: "14px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["#FF5F57","#FEBC2E","#28C840"].map(c => (
                      <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginLeft: 8 }}>Grade 4 · Math · Worksheet #12</span>
                  <div style={{ marginLeft: "auto", background: "#E5B96A", color: "#1C3A2F", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 9999 }}>
                    Level 4
                  </div>
                </div>
                {/* Worksheet body */}
                <div style={{ padding: "24px 24px 20px" }}>
                  <p style={{ fontSize: 13, color: "#999", marginBottom: 16, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Daily Worksheet
                  </p>
                  {[
                    { q: "What is 7 × 8?", a: "56", correct: true },
                    { q: "Solve: 144 ÷ 12 = ?", a: "12", correct: true },
                    { q: "Round 3,748 to the nearest hundred", a: "3,700", correct: false },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 14px", borderRadius: 10, marginBottom: 8,
                      background: item.correct ? "#F0FDF4" : "#FFF7ED",
                      border: `1px solid ${item.correct ? "#BBF7D0" : "#FED7AA"}`,
                    }}>
                      <div>
                        <p style={{ fontSize: 13, color: "#444", fontWeight: 500 }}>{item.q}</p>
                        <p style={{ fontSize: 12, color: "#888", marginTop: 2 }}>Answer: {item.a}</p>
                      </div>
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: item.correct ? "#16A34A" : "#F97316",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: 14, fontWeight: 700, flexShrink: 0,
                      }}>
                        {item.correct ? "✓" : "✗"}
                      </div>
                    </div>
                  ))}
                  {/* Score bar */}
                  <div style={{ marginTop: 16, padding: "14px 16px", background: "#F9FAFB", borderRadius: 12, border: "1px solid #EBEBEB" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>Worksheet Score</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#16A34A" }}>67%</span>
                    </div>
                    <div style={{ height: 6, background: "#E5E7EB", borderRadius: 9999 }}>
                      <div style={{ height: "100%", width: "67%", background: "linear-gradient(90deg, #16A34A, #22C55E)", borderRadius: 9999 }} />
                    </div>
                    <p style={{ fontSize: 11, color: "#999", marginTop: 8 }}>Score 80%+ to advance to Level 5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SOCIAL PROOF ── */}
        <div style={{ ...section }}>
          <div style={wrap}>
            <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { quote: "The daily worksheets keep my child consistent.", label: "Parent of a 4th grader" },
                { quote: "I like that it actually tracks progress clearly.", label: "Parent of a 6th grader" },
                { quote: "It feels structured, not random like other apps.", label: "Parent of a 2nd grader" },
              ].map((t, i) => (
                <div key={i} className="card fu" style={{ padding: "24px", animationDelay: `${i * 0.08}s` }}>
                  <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                    {[...Array(5)].map((_, s) => <Star key={s} size={13} fill="#F59E0B" color="#F59E0B" />)}
                  </div>
                  <p style={{ fontSize: 15, color: "#333", lineHeight: 1.65, marginBottom: 16, fontStyle: "italic" }}>
                    "{t.quote}"
                  </p>
                  <p style={{ fontSize: 12, color: "#999", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div id="how-it-works" style={{ ...section, background: "#F9FAFB", borderTop: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB" }}>
          <div style={wrap}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label" style={{ background: "#EDE9FE", color: "#7C3AED" }}>How it works</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em" }}>
                Three steps to real progress
              </h2>
            </div>
            <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { step: "01", icon: ClipboardCheck, title: "Get daily worksheets", desc: "Structured worksheets based on your child's current level — Math, Reading, or both.", color: "#7C3AED", bg: "#EDE9FE" },
                { step: "02", icon: BarChart3, title: "Complete and get graded", desc: "Every worksheet is graded instantly with clear, specific feedback on each answer.", color: "#2563EB", bg: "#DBEAFE" },
                { step: "03", icon: GraduationCap, title: "Move up levels", desc: "Advance to the next level after scoring 80% or higher — real mastery, not just completion.", color: "#16A34A", bg: "#DCFCE7" },
              ].map((item) => (
                <div key={item.step} className="card" style={{ padding: "32px 28px" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: item.bg, display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 20,
                  }}>
                    <item.icon size={24} color={item.color} />
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: item.color, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
                    STEP {item.step}
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 10, letterSpacing: "-0.01em" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PRODUCT SHOWCASE ── */}
        <div style={{ ...section }}>
          <div style={wrap}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label" style={{ background: "#FEF3C7", color: "#D97706" }}>The product</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em" }}>
                Built for daily learning, not one-off sessions
              </h2>
            </div>
            <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {[
                {
                  title: "Structured daily worksheets",
                  caption: "Every session has a clear goal and structure — no randomness.",
                  color: "#7C3AED", bg: "#F5F3FF",
                  preview: (
                    <div style={{ padding: "16px" }}>
                      <div style={{ background: "#fff", borderRadius: 10, padding: "12px 14px", border: "1px solid #E9D5FF", marginBottom: 8 }}>
                        <p style={{ fontSize: 11, color: "#7C3AED", fontWeight: 700, marginBottom: 6 }}>GRADE 3 · MATH · WORKSHEET 7</p>
                        {["4 × 6 = ?", "25 + 38 = ?", "100 − 43 = ?"].map((q, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < 2 ? "1px solid #F3F4F6" : "none" }}>
                            <span style={{ fontSize: 12, color: "#444" }}>{q}</span>
                            <div style={{ width: 48, height: 20, background: "#F3F4F6", borderRadius: 4 }} />
                          </div>
                        ))}
                      </div>
                      <div style={{ background: "#7C3AED", borderRadius: 8, padding: "8px 14px", textAlign: "center" }}>
                        <span style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>Submit Worksheet</span>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Instant grading and feedback",
                  caption: "Students see exactly what to fix — no waiting, no guessing.",
                  color: "#2563EB", bg: "#EFF6FF",
                  preview: (
                    <div style={{ padding: "16px" }}>
                      <div style={{ background: "#fff", borderRadius: 10, padding: "12px 14px", border: "1px solid #BFDBFE", marginBottom: 8 }}>
                        <p style={{ fontSize: 11, color: "#2563EB", fontWeight: 700, marginBottom: 8 }}>RESULTS</p>
                        {[{ q: "4 × 6 = ?", a: "24", ok: true }, { q: "25 + 38 = ?", a: "63", ok: true }, { q: "100 − 43 = ?", a: "47", ok: false }].map((r, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: i < 2 ? "1px solid #F3F4F6" : "none" }}>
                            <span style={{ fontSize: 12, color: "#444" }}>{r.q} <strong>{r.a}</strong></span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: r.ok ? "#16A34A" : "#DC2626" }}>{r.ok ? "✓" : "✗"}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ background: "#EFF6FF", borderRadius: 8, padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "#2563EB", fontWeight: 600 }}>Score: 67%</span>
                        <div style={{ height: 6, width: 80, background: "#BFDBFE", borderRadius: 9999 }}>
                          <div style={{ height: "100%", width: "67%", background: "#2563EB", borderRadius: 9999 }} />
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Clear level progression",
                  caption: "Track growth and move up after proving real mastery.",
                  color: "#16A34A", bg: "#F0FDF4",
                  preview: (
                    <div style={{ padding: "16px" }}>
                      <div style={{ background: "#fff", borderRadius: 10, padding: "12px 14px", border: "1px solid #BBF7D0", marginBottom: 8 }}>
                        <p style={{ fontSize: 11, color: "#16A34A", fontWeight: 700, marginBottom: 8 }}>PROGRESS</p>
                        {[
                          { level: "Level 3", pct: 100, done: true },
                          { level: "Level 4", pct: 67, done: false },
                          { level: "Level 5", pct: 0, done: false },
                        ].map((l, i) => (
                          <div key={i} style={{ marginBottom: i < 2 ? 8 : 0 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                              <span style={{ fontSize: 12, color: "#444", fontWeight: 500 }}>{l.level}</span>
                              <span style={{ fontSize: 11, color: l.done ? "#16A34A" : "#999", fontWeight: 600 }}>{l.done ? "Complete ✓" : `${l.pct}%`}</span>
                            </div>
                            <div style={{ height: 6, background: "#F3F4F6", borderRadius: 9999 }}>
                              <div style={{ height: "100%", width: `${l.pct}%`, background: l.done ? "#16A34A" : "#86EFAC", borderRadius: 9999, transition: "width 0.3s" }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ background: "#F0FDF4", borderRadius: 8, padding: "8px 14px", textAlign: "center" }}>
                        <span style={{ fontSize: 12, color: "#16A34A", fontWeight: 600 }}>Score 80%+ to unlock Level 5</span>
                      </div>
                    </div>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="card" style={{ overflow: "hidden" }}>
                  <div style={{ background: item.bg, borderBottom: "1px solid #EBEBEB" }}>
                    {item.preview}
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 700, color: "#111", marginBottom: 6, letterSpacing: "-0.01em" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── WHY IT WORKS ── */}
        <div style={{ ...section, background: "#F9FAFB", borderTop: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB" }}>
          <div style={wrap}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-label" style={{ background: "#DCFCE7", color: "#16A34A" }}>Why it works</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em" }}>
                The system behind the results
              </h2>
            </div>
            <div className="four-col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[
                { icon: ClipboardCheck, color: "#7C3AED", bg: "#EDE9FE", title: "Daily practice builds consistency", desc: "Same structure every day creates habits that stick." },
                { icon: Zap,            color: "#2563EB", bg: "#DBEAFE", title: "Immediate feedback prevents mistakes sticking", desc: "Students correct errors while the lesson is still fresh." },
                { icon: TrendingUp,     color: "#16A34A", bg: "#DCFCE7", title: "Clear progression keeps students motivated", desc: "Visible progress to the next level creates a reason to keep going." },
                { icon: Target,         color: "#D97706", bg: "#FEF3C7", title: "Mastery ensures real understanding", desc: "80% threshold means no gaps get papered over." },
              ].map((f, i) => (
                <div key={i} className="card" style={{ padding: "24px 20px" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <f.icon size={22} color={f.color} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 8, lineHeight: 1.35 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── COMPARISON ── */}
        <div style={{ ...section }}>
          <div style={wrap}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-label" style={{ background: "#F3F4F6", color: "#555" }}>How we compare</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em" }}>
                More structured than apps. More scalable than tutors.
              </h2>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table className="compare-table" style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ padding: "14px 20px", textAlign: "left", color: "#999", fontWeight: 600, fontSize: 13, borderBottom: "2px solid #EBEBEB" }}>Feature</th>
                    <th style={{ padding: "14px 20px", textAlign: "center", background: "#1C3A2F", color: "#fff", fontWeight: 700, fontSize: 14, borderRadius: "12px 12px 0 0", borderBottom: "2px solid #1C3A2F" }}>
                      e-Skillora
                    </th>
                    <th style={{ padding: "14px 20px", textAlign: "center", color: "#999", fontWeight: 600, fontSize: 13, borderBottom: "2px solid #EBEBEB" }}>Private Tutors</th>
                    <th style={{ padding: "14px 20px", textAlign: "center", color: "#999", fontWeight: 600, fontSize: 13, borderBottom: "2px solid #EBEBEB" }}>Other Apps</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Structured daily progression",  es: true,    tutor: "partial", app: false },
                    { feature: "Instant grading & feedback",    es: true,    tutor: false,     app: "partial" },
                    { feature: "Mastery-based level system",    es: true,    tutor: "partial", app: false },
                    { feature: "Consistent daily habit",        es: true,    tutor: false,     app: "partial" },
                    { feature: "Affordable (from $10.99/mo)",   es: true,    tutor: false,     app: true },
                    { feature: "Works for self-learners",       es: true,    tutor: false,     app: "partial" },
                  ].map((row, i) => {
                    const cell = (val: boolean | string) => (
                      val === true    ? <span className="check-yes">✓</span> :
                      val === false   ? <span className="check-no">✗</span> :
                      <span className="check-partial">~</span>
                    );
                    const bg = i % 2 === 0 ? "#fff" : "#FAFAFA";
                    return (
                      <tr key={i}>
                        <td style={{ padding: "14px 20px", color: "#444", fontWeight: 500, background: bg, borderBottom: "1px solid #EBEBEB" }}>{row.feature}</td>
                        <td style={{ padding: "14px 20px", textAlign: "center", background: "#F0F7F4", borderBottom: "1px solid #D1E8DC", borderLeft: "2px solid #1C3A2F", borderRight: "2px solid #1C3A2F" }}>{cell(row.es)}</td>
                        <td style={{ padding: "14px 20px", textAlign: "center", background: bg, borderBottom: "1px solid #EBEBEB" }}>{cell(row.tutor)}</td>
                        <td style={{ padding: "14px 20px", textAlign: "center", background: bg, borderBottom: "1px solid #EBEBEB" }}>{cell(row.app)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 16 }}>
                {[["✓", "#16A34A", "Yes"], ["~", "#F59E0B", "Partially"], ["✗", "#D1D5DB", "No"]].map(([sym, color, label]) => (
                  <span key={label} style={{ fontSize: 13, color: "#666", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color, fontWeight: 700 }}>{sym}</span> {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── PRICING ── */}
        <div id="pricing" style={{ ...section, background: "#F9FAFB", borderTop: "1px solid #EBEBEB", borderBottom: "1px solid #EBEBEB" }}>
          <div style={{ ...wrap, maxWidth: 560 }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="section-label" style={{ background: "#FEF3C7", color: "#D97706" }}>Simple pricing</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em" }}>
                One plan. Everything included.
              </h2>
            </div>
            <div style={{
              background: "linear-gradient(160deg, #1C3A2F, #2A5240)",
              borderRadius: 20, padding: "40px 32px", textAlign: "center",
              boxShadow: "0 8px 40px rgba(28,58,47,0.2)",
            }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(229,185,106,0.2)", color: "#E5B96A", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 9999, marginBottom: 20, letterSpacing: "0.07em", textTransform: "uppercase" }}>
                ALL FEATURES INCLUDED
              </div>
              <div style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "#8BAF94", marginRight: 4 }}>from</span>
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: 52, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>$10.99</span>
                <span style={{ fontSize: 15, color: "#8BAF94", marginLeft: 4 }}>/month</span>
              </div>
              <p style={{ color: "#8BAF94", fontSize: 13, marginBottom: 4 }}>1 child · $10.99/mo &nbsp;·&nbsp; 2 children · $14.99/mo</p>
              <p style={{ color: "#8BAF94", fontSize: 14, marginBottom: 32 }}>Start with a 3-day free trial. Cancel anytime.</p>
              <div style={{ textAlign: "left", maxWidth: 320, margin: "0 auto 28px" }}>
                {[
                  "12 grade levels (Math & Reading)",
                  "Daily worksheets for every level",
                  "Automatic grading with instant feedback",
                  "Level progression requiring 80% mastery",
                  "AI that explains your mistakes in plain English",
                  "Progress analytics dashboard",
                ].map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                    <CheckCircle size={16} color="#E5B96A" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button
                className="btn-primary"
                onClick={goSignup}
                style={{ width: "100%", justifyContent: "center", background: "linear-gradient(145deg, #C9973A, #E5B96A)", color: "#1C3A2F", boxShadow: "0 6px 24px rgba(201,151,58,0.3)" }}
              >
                Start 3-Day Free Trial <ArrowRight size={16} />
              </button>
              <p style={{ color: "#8BAF94", fontSize: 13, marginTop: 12 }}>No credit card required · Cancel anytime</p>
            </div>
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div style={{ ...section, background: "#F0F7F4", borderBottom: "1px solid #EBEBEB", textAlign: "center" }}>
          <div style={{ ...wrap, maxWidth: 600 }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, color: "#111", marginBottom: 16, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Build better learning habits starting today
            </h2>
            <p style={{ fontSize: 17, color: "#555", marginBottom: 32, lineHeight: 1.65 }}>
              Structured practice that leads to real progress.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={goSignup} style={{ fontSize: 16, padding: "16px 32px" }}>
                Start Free Trial <ArrowRight size={16} />
              </button>
              <button className="btn-secondary" onClick={() => scrollTo("how-it-works")} style={{ fontSize: 15 }}>
                See How It Works
              </button>
            </div>
            <p style={{ fontSize: 13, color: "#999", marginTop: 14 }}>No credit card required · Cancel anytime · Students welcome</p>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer style={{ background: "#fff", borderTop: "1px solid #EBEBEB", padding: "48px 24px 32px" }}>
          <div className="footer-grid" style={{ ...wrap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 40 }}>
            {/* Left */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 34, height: 34, background: "linear-gradient(145deg, #1C3A2F, #2A5240)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Brain size={16} color="#E5B96A" />
                </div>
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 700, color: "#1C3A2F" }}>e-Skillora</span>
              </div>
              <p style={{ fontSize: 14, color: "#888", lineHeight: 1.65, maxWidth: 280 }}>
                Structured daily worksheets, instant grading, and level progression for grades 1–12.
              </p>
            </div>
            {/* Right */}
            <div style={{ display: "flex", gap: 48, justifyContent: "flex-end", flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Product</p>
                {[
                  { label: "Pricing", action: () => scrollTo("pricing") },
                  { label: "How it works", action: () => scrollTo("how-it-works") },
                  { label: "Login", action: goLogin },
                ].map((l) => (
                  <button key={l.label} onClick={l.action} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#555", padding: "5px 0", fontFamily: "'Instrument Sans', sans-serif", transition: "color 0.15s" }}>
                    {l.label}
                  </button>
                ))}
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Legal</p>
                {[
                  { label: "Privacy", action: () => onNavigate("privacy" as any) },
                  { label: "Terms", action: () => onNavigate("terms") },
                  { label: "Contact", action: () => onNavigate("contact") },
                ].map((l) => (
                  <button key={l.label} onClick={l.action} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#555", padding: "5px 0", fontFamily: "'Instrument Sans', sans-serif", transition: "color 0.15s" }}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ ...wrap, borderTop: "1px solid #EBEBEB", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 13, color: "#BBB" }}>© {new Date().getFullYear()} E-Skillora LLC · All rights reserved.</p>
            <a href="mailto:contact@e-skillora.org" style={{ fontSize: 13, color: "#888", textDecoration: "none" }}>contact@e-skillora.org</a>
          </div>
        </footer>

      </div>
    </>
  );
}
