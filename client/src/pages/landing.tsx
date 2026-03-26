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
        <div style={{ background: "#F9FAFB", borderBottom: "1px solid #EBEBEB", overflow: "hidden" }}>
          <div style={{ ...wrap, paddingTop: 72, paddingBottom: 0 }}>

            {/* Top: text centred */}
            <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto", paddingBottom: 56 }}>
              <div className="fu section-label" style={{ background: "#DCFCE7", color: "#16A34A" }}>
                <Star size={11} fill="#16A34A" color="#16A34A" /> 3-Day Free Trial · No credit card required
              </div>
              <h1 className="fu d1" style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 800,
                color: "#111", lineHeight: 1.1, marginBottom: 20, letterSpacing: "-0.03em",
              }}>
                Your child can master<br />math and reading
              </h1>
              <p className="fu d2" style={{ fontSize: 18, color: "#555", lineHeight: 1.7, marginBottom: 8 }}>
                Daily worksheets, instant grading, and level progression for grades 1–12.
              </p>
              <p className="fu d2" style={{ fontSize: 14, color: "#16A34A", fontWeight: 600, marginBottom: 36 }}>
                Also built for self-learners
              </p>
              <div className="fu d3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={goSignup} style={{ fontSize: 16, padding: "15px 32px" }}>
                  Start Free Trial <ArrowRight size={16} />
                </button>
                <button className="btn-secondary" onClick={() => scrollTo("how-it-works")} style={{ fontSize: 15 }}>
                  See How It Works <ChevronDown size={16} />
                </button>
              </div>
              <p className="fu d4" style={{ fontSize: 13, color: "#999", marginTop: 14 }}>
                Students welcome, not just parents · Cancel anytime
              </p>
            </div>

            {/* Bottom: 3-screenshot cascade */}
            <div className="hero-mockup" style={{ position: "relative", height: 340, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 0 }}>

              {/* Left screen — Profile selection */}
              <div style={{
                position: "absolute", left: "50%", bottom: 0,
                transform: "translateX(-108%) rotate(-6deg)",
                width: 280, borderRadius: "16px 16px 0 0", overflow: "hidden",
                boxShadow: "0 16px 56px rgba(0,0,0,0.18)", border: "1px solid rgba(0,0,0,0.07)",
                zIndex: 1,
              }}>
                <div style={{ background: "linear-gradient(160deg, #1C3A2F, #2A5240, #3D7A5C)", padding: "10px 14px 0" }}>
                  <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
                    {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                  </div>
                  <p style={{ fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 700, color: "#fff", textAlign: "center", marginBottom: 14 }}>Who's learning today?</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                    {[{ e: "🦁", n: "Emma", l: "Level 4" }, { e: "🐬", n: "Jake", l: "Level 2" }].map(p => (
                      <div key={p.n} style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.18)", borderRadius: 14, padding: "12px 8px", textAlign: "center" }}>
                        <div style={{ fontSize: 26, marginBottom: 4 }}>{p.e}</div>
                        <p style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{p.n}</p>
                        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{p.l}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <span style={{ fontSize: 16 }}>🛡️</span>
                    <div><p style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>Parent Dashboard</p><p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>View progress</p></div>
                  </div>
                </div>
              </div>

              {/* Centre screen — Active worksheet (tallest, front) */}
              <div style={{
                position: "relative", width: 300, borderRadius: "16px 16px 0 0", overflow: "hidden",
                boxShadow: "0 20px 72px rgba(0,0,0,0.22)", border: "1px solid rgba(0,0,0,0.07)",
                zIndex: 3,
              }}>
                <div style={{ background: "rgba(0,0,0,0.06)", padding: "9px 14px", display: "flex", gap: 5 }}>
                  {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                </div>
                <div style={{ background: "linear-gradient(145deg, #1C3A2F, #2A5240)", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Grade 4 · Math</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: "'Fraunces', serif" }}>Worksheet #12</p>
                  </div>
                  <div style={{ background: "linear-gradient(145deg,#C9973A,#E5B96A)", color: "#1C3A2F", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 9999 }}>Level 4</div>
                </div>
                <div style={{ background: "#F7F3ED", padding: "14px 16px 18px" }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: "#9A9A9A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Daily Worksheet</p>
                  {[
                    { n: "1", q: "What is 7 × 8?", done: true },
                    { n: "2", q: "Solve: 144 ÷ 12 = ?", done: true },
                    { n: "3", q: "Round 3,748 to the nearest hundred", done: false },
                    { n: "4", q: "What is 25% of 200?", done: false },
                  ].map(item => (
                    <div key={item.n} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 10, marginBottom: 6, background: item.done ? "rgba(28,58,47,0.07)" : "rgba(255,255,255,0.9)", border: `1px solid ${item.done ? "rgba(28,58,47,0.15)" : "rgba(224,217,207,0.9)"}` }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: item.done ? "#1C3A2F" : "#E0D9CF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: item.done ? "#fff" : "#9A9A9A", flexShrink: 0 }}>{item.n}</span>
                      <span style={{ fontSize: 11, color: "#3D3D3D", flex: 1 }}>{item.q}</span>
                      {item.done && <span style={{ fontSize: 9, color: "#3D7A5C", fontWeight: 600 }}>✓</span>}
                    </div>
                  ))}
                  <div style={{ marginTop: 10, background: "linear-gradient(145deg,#1C3A2F,#2A5240)", borderRadius: 9999, padding: "9px", textAlign: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#F7F3ED" }}>Submit Worksheet</span>
                  </div>
                </div>
              </div>

              {/* Right screen — Results */}
              <div style={{
                position: "absolute", left: "50%", bottom: 0,
                transform: "translateX(8%) rotate(6deg)",
                width: 280, borderRadius: "16px 16px 0 0", overflow: "hidden",
                boxShadow: "0 16px 56px rgba(0,0,0,0.18)", border: "1px solid rgba(0,0,0,0.07)",
                zIndex: 1,
              }}>
                <div style={{ background: "rgba(0,0,0,0.06)", padding: "9px 14px", display: "flex", gap: 5 }}>
                  {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />)}
                </div>
                <div style={{ background: "linear-gradient(145deg,#16A34A,#22C55E)", padding: "16px", textAlign: "center" }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Worksheet Complete</p>
                  <p style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 800, color: "#fff", lineHeight: 1 }}>85%</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>17 of 20 correct 🎉</p>
                </div>
                <div style={{ background: "#F7F3ED", padding: "12px 14px" }}>
                  {[
                    { q: "What is 7 × 8?", ok: true },
                    { q: "Solve: 144 ÷ 12 = ?", ok: true },
                    { q: "Round 3,748 to nearest hundred", ok: false, right: "3,700" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 8, marginBottom: 5, background: r.ok ? "#F0FDF4" : "#FFF1F0", border: `1px solid ${r.ok ? "#BBF7D0" : "#FECACA"}` }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: r.ok ? "#16A34A" : "#E8604C", flexShrink: 0 }}>{r.ok ? "✓" : "✗"}</span>
                      <span style={{ fontSize: 10, color: "#444", flex: 1 }}>{r.q}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 10, background: "rgba(28,58,47,0.06)", borderRadius: 10, padding: "8px 12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#1C3A2F" }}>Level 4 progress</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#16A34A" }}>85% ✓</span>
                    </div>
                    <div style={{ height: 5, background: "#E0D9CF", borderRadius: 9999 }}>
                      <div style={{ height: "100%", width: "85%", background: "linear-gradient(90deg,#C9973A,#E5B96A)", borderRadius: 9999 }} />
                    </div>
                    <p style={{ fontSize: 9, color: "#9A9A9A", marginTop: 4 }}>Level 5 unlocked! 🎉</p>
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
              <div className="section-label" style={{ background: "#FEF3C7", color: "#D97706" }}>See it in action</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, color: "#111", letterSpacing: "-0.02em" }}>
                The full experience, start to finish
              </h2>
              <p style={{ fontSize: 16, color: "#666", marginTop: 12, maxWidth: 480, margin: "12px auto 0" }}>
                From picking a profile to completing a worksheet and watching the level bar fill up.
              </p>
            </div>

            {/* 2×2 screen grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: 32 }}>

              {/* Screen 1 — Profile selection */}
              <div>
                <div style={{
                  borderRadius: 20, overflow: "hidden",
                  boxShadow: "0 8px 48px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06)",
                  background: "linear-gradient(160deg, #1C3A2F 0%, #2A5240 45%, #3D7A5C 100%)",
                }}>
                  {/* Chrome bar */}
                  <div style={{ background: "rgba(0,0,0,0.2)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 6 }}>
                    {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: 6, height: 20, marginLeft: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>e-skillora.org</span>
                    </div>
                  </div>
                  {/* App content */}
                  <div style={{ padding: "28px 24px 32px" }}>
                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 24 }}>
                      <div style={{ width: 32, height: 32, background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Brain size={16} color="#E5B96A" />
                      </div>
                      <span style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>e-Skillora</span>
                    </div>
                    <p style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, color: "#fff", textAlign: "center", marginBottom: 20, letterSpacing: "-0.02em" }}>
                      Who's learning today?
                    </p>
                    {/* Profile cards */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                      {[{ emoji: "🦁", name: "Emma", age: "Age 9 · Level 4" }, { emoji: "🐬", name: "Jake", age: "Age 7 · Level 2" }].map((p) => (
                        <div key={p.name} style={{
                          background: "rgba(255,255,255,0.10)", border: "1.5px solid rgba(255,255,255,0.18)",
                          borderRadius: 20, padding: "16px 12px", textAlign: "center",
                          backdropFilter: "blur(12px)", cursor: "pointer",
                        }}>
                          <div style={{ fontSize: 36, marginBottom: 8 }}>{p.emoji}</div>
                          <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{p.name}</p>
                          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{p.age}</p>
                        </div>
                      ))}
                    </div>
                    {/* Parent access */}
                    <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "11px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, background: "rgba(255,255,255,0.12)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 15 }}>🛡️</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Parent Dashboard</p>
                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>parent@email.com</p>
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 16 }}>›</span>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 16, paddingLeft: 4 }}>
                  <p style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 4 }}>Choose your learner</p>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>Each child has their own profile, level, and progress — completely separate.</p>
                </div>
              </div>

              {/* Screen 2 — Active worksheet */}
              <div>
                <div style={{
                  borderRadius: 20, overflow: "hidden",
                  boxShadow: "0 8px 48px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06)",
                  background: "#F7F3ED",
                }}>
                  <div style={{ background: "rgba(0,0,0,0.07)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 6 }}>
                    {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
                    <div style={{ flex: 1, background: "rgba(0,0,0,0.06)", borderRadius: 6, height: 20, marginLeft: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 10, color: "rgba(0,0,0,0.35)" }}>e-skillora.org</span>
                    </div>
                  </div>
                  <div style={{ padding: "0 0 20px" }}>
                    {/* Header */}
                    <div style={{ background: "linear-gradient(145deg, #1C3A2F, #2A5240)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Grade 4 · Math</p>
                        <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "'Fraunces', serif" }}>Worksheet #12</p>
                      </div>
                      <div style={{ background: "linear-gradient(145deg, #C9973A, #E5B96A)", color: "#1C3A2F", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 9999 }}>
                        Level 4
                      </div>
                    </div>
                    {/* Questions */}
                    <div style={{ padding: "16px 20px 0" }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "#9A9A9A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Daily Worksheet</p>
                      {[
                        { n: "1", q: "What is 7 × 8?", answered: true },
                        { n: "2", q: "Solve: 144 ÷ 12 = ?", answered: true },
                        { n: "3", q: "Round 3,748 to the nearest hundred", answered: false },
                        { n: "4", q: "What is 25% of 200?", answered: false },
                      ].map((item) => (
                        <div key={item.n} style={{
                          background: item.answered ? "rgba(28,58,47,0.06)" : "rgba(255,255,255,0.9)",
                          border: `1.5px solid ${item.answered ? "rgba(28,58,47,0.15)" : "rgba(224,217,207,0.9)"}`,
                          borderRadius: 14, padding: "12px 14px", marginBottom: 8,
                          display: "flex", alignItems: "center", gap: 12,
                        }}>
                          <span style={{ width: 22, height: 22, borderRadius: "50%", background: item.answered ? "#1C3A2F" : "#E0D9CF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: item.answered ? "#fff" : "#9A9A9A", flexShrink: 0 }}>{item.n}</span>
                          <span style={{ fontSize: 13, color: "#3D3D3D", flex: 1 }}>{item.q}</span>
                          {item.answered
                            ? <span style={{ fontSize: 11, color: "#3D7A5C", fontWeight: 600 }}>Answered</span>
                            : <div style={{ width: 56, height: 22, background: "#F7F3ED", border: "1.5px solid #E0D9CF", borderRadius: 6 }} />
                          }
                        </div>
                      ))}
                      <div style={{ marginTop: 16, background: "linear-gradient(145deg, #1C3A2F, #2A5240)", borderRadius: 9999, padding: "13px", textAlign: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#F7F3ED" }}>Submit Worksheet</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 16, paddingLeft: 4 }}>
                  <p style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 4 }}>Structured daily worksheets</p>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>Every session is purposeful — the right level, the right questions, every day.</p>
                </div>
              </div>

              {/* Screen 3 — Graded results */}
              <div>
                <div style={{
                  borderRadius: 20, overflow: "hidden",
                  boxShadow: "0 8px 48px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06)",
                  background: "#F7F3ED",
                }}>
                  <div style={{ background: "rgba(0,0,0,0.07)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 6 }}>
                    {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
                    <div style={{ flex: 1, background: "rgba(0,0,0,0.06)", borderRadius: 6, height: 20, marginLeft: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 10, color: "rgba(0,0,0,0.35)" }}>e-skillora.org</span>
                    </div>
                  </div>
                  <div style={{ padding: "0 0 20px" }}>
                    {/* Score header */}
                    <div style={{ background: "linear-gradient(145deg, #16A34A, #22C55E)", padding: "20px", textAlign: "center" }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Worksheet Complete</p>
                      <p style={{ fontFamily: "'Fraunces', serif", fontSize: 40, fontWeight: 800, color: "#fff", lineHeight: 1 }}>85%</p>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>17 of 20 correct · Nice work! 🎉</p>
                    </div>
                    <div style={{ padding: "16px 20px 0" }}>
                      {/* Results */}
                      {[
                        { q: "What is 7 × 8?", yours: "56", correct: true },
                        { q: "Solve: 144 ÷ 12 = ?", yours: "12", correct: true },
                        { q: "Round 3,748 to the nearest hundred", yours: "3,800", correct: false, right: "3,700" },
                      ].map((r, i) => (
                        <div key={i} style={{
                          display: "flex", alignItems: "flex-start", gap: 10,
                          padding: "10px 12px", borderRadius: 12, marginBottom: 8,
                          background: r.correct ? "#F0FDF4" : "#FFF1F0",
                          border: `1px solid ${r.correct ? "#BBF7D0" : "#FECACA"}`,
                        }}>
                          <div style={{ width: 24, height: 24, borderRadius: "50%", background: r.correct ? "#16A34A" : "#E8604C", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                            {r.correct ? "✓" : "✗"}
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 12, color: "#3D3D3D", fontWeight: 500 }}>{r.q}</p>
                            {!r.correct && <p style={{ fontSize: 11, color: "#E8604C", marginTop: 2 }}>Your answer: {r.yours} · Correct: {r.right}</p>}
                          </div>
                        </div>
                      ))}
                      {/* Level progress */}
                      <div style={{ marginTop: 14, background: "rgba(28,58,47,0.06)", borderRadius: 14, padding: "12px 14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#1C3A2F" }}>Level 4 progress</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#16A34A" }}>85% ✓ — Level unlocked!</span>
                        </div>
                        <div style={{ height: 7, background: "#E0D9CF", borderRadius: 9999 }}>
                          <div style={{ height: "100%", width: "85%", background: "linear-gradient(90deg, #C9973A, #E5B96A)", borderRadius: 9999 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 16, paddingLeft: 4 }}>
                  <p style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 4 }}>Instant grading and feedback</p>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>Every answer graded immediately — students know exactly what to improve.</p>
                </div>
              </div>

              {/* Screen 4 — Parent dashboard */}
              <div>
                <div style={{
                  borderRadius: 20, overflow: "hidden",
                  boxShadow: "0 8px 48px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.06)",
                  background: "#F7F3ED",
                }}>
                  <div style={{ background: "rgba(0,0,0,0.07)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 6 }}>
                    {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
                    <div style={{ flex: 1, background: "rgba(0,0,0,0.06)", borderRadius: 6, height: 20, marginLeft: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 10, color: "rgba(0,0,0,0.35)" }}>e-skillora.org/dashboard</span>
                    </div>
                  </div>
                  <div style={{ padding: "16px 20px 20px" }}>
                    <p style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 700, color: "#1C3A2F", marginBottom: 14 }}>Good morning 👋</p>
                    {/* Child card */}
                    <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(224,217,207,0.7)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                      <div style={{ background: "linear-gradient(145deg, #1C3A2F, #2A5240)", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ fontSize: 32 }}>🦁</div>
                        <div>
                          <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "'Fraunces', serif" }}>Emma</p>
                          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Age 9 · Level 4 · Math & Reading</p>
                        </div>
                        <div style={{ marginLeft: "auto", background: "linear-gradient(145deg, #C9973A, #E5B96A)", color: "#1C3A2F", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 9999 }}>
                          Level 4
                        </div>
                      </div>
                      <div style={{ background: "#fff", padding: "14px 16px" }}>
                        {/* Level bar */}
                        <div style={{ marginBottom: 14 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Level Progress</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#C9973A" }}>72% to Level 5</span>
                          </div>
                          <div style={{ height: 7, background: "#EDE8E0", borderRadius: 9999 }}>
                            <div style={{ height: "100%", width: "72%", background: "linear-gradient(90deg, #C9973A, #E5B96A)", borderRadius: 9999 }} />
                          </div>
                        </div>
                        {/* Stats grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                          {[
                            { label: "Accuracy", val: "84%", color: "#16A34A" },
                            { label: "Streak",   val: "6 days", color: "#C9973A" },
                            { label: "Sessions", val: "24",     color: "#2563EB" },
                            { label: "Time",     val: "4.2h",   color: "#7C3AED" },
                          ].map((s) => (
                            <div key={s.label} style={{ background: "#F7F3ED", borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
                              <p style={{ fontSize: 13, fontWeight: 800, color: s.color, fontFamily: "'Fraunces', serif" }}>{s.val}</p>
                              <p style={{ fontSize: 10, color: "#9A9A9A", marginTop: 2 }}>{s.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 16, paddingLeft: 4 }}>
                  <p style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 4 }}>Parent dashboard</p>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>Track accuracy, streak, level progress, and time spent — all in one place.</p>
                </div>
              </div>

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
