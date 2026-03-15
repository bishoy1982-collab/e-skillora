const G_FONT = `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,600;9..144,700;9..144,800&family=Instrument+Sans:wght@400;500;600;700&display=swap`;

const PAGE_CSS = `
@import url('${G_FONT}');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { min-height: 100%; -webkit-font-smoothing: antialiased; }
body { font-family: 'Instrument Sans', sans-serif; background: #F7F3ED; color: #1A1A1A; }
.contact-card { background: #fff; border-radius: 20px; padding: 40px 36px; box-shadow: 0 4px 32px rgba(28,58,47,0.08); max-width: 560px; width: 100%; }
.info-row { display: flex; align-items: flex-start; gap: 14px; padding: 18px 0; border-bottom: 1px solid #F0EBE3; }
.info-row:last-child { border-bottom: none; }
.icon-wrap { width: 40px; height: 40px; border-radius: 12px; background: #F7F3ED; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 20px; }
.back-link { color: #1C3A2F; font-size: 14px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 32px; opacity: 0.75; transition: opacity .2s; }
.back-link:hover { opacity: 1; }
@media (max-width: 600px) { .contact-card { padding: 28px 20px; } }
`;

interface Props {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate }: Props) {
  return (
    <>
      <style>{PAGE_CSS}</style>
      <div style={{
        minHeight: "100vh", background: "#F7F3ED",
        fontFamily: "'Instrument Sans', sans-serif",
      }}>
        {/* Nav */}
        <nav style={{
          background: "#fff", borderBottom: "1px solid #E8E2D9",
          padding: "0 24px", height: 60, display: "flex", alignItems: "center",
          justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100,
        }}>
          <button
            onClick={() => onNavigate("landing")}
            style={{
              fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700,
              color: "#1C3A2F", background: "none", border: "none", cursor: "pointer",
            }}
          >
            e-Skillora
          </button>
          <button
            onClick={() => onNavigate("landing")}
            style={{
              fontSize: 14, fontWeight: 600, color: "#1C3A2F",
              background: "none", border: "none", cursor: "pointer", opacity: 0.7,
            }}
          >
            ← Back to Home
          </button>
        </nav>

        {/* Hero */}
        <div style={{
          background: "linear-gradient(145deg, #1C3A2F, #2A5240)",
          padding: "60px 24px 80px",
          textAlign: "center",
        }}>
          <p style={{
            fontSize: 13, fontWeight: 600, letterSpacing: "0.12em",
            color: "#C9973A", textTransform: "uppercase", marginBottom: 14,
          }}>
            Get in Touch
          </p>
          <h1 style={{
            fontFamily: "'Fraunces', serif", fontSize: "clamp(32px, 6vw, 52px)",
            fontWeight: 700, color: "#fff", marginBottom: 16, lineHeight: 1.15,
          }}>
            We're here to help
          </h1>
          <p style={{
            fontSize: 17, color: "rgba(255,255,255,0.72)", maxWidth: 480,
            margin: "0 auto", lineHeight: 1.65,
          }}>
            Have a question, concern, or just want to say hello? Reach out — we typically respond within 1 business day.
          </p>
        </div>

        {/* Card */}
        <div style={{
          display: "flex", justifyContent: "center",
          padding: "0 24px 80px", marginTop: -40,
        }}>
          <div className="contact-card">

            <div className="info-row">
              <div className="icon-wrap">✉️</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#9A9A9A", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Email us
                </p>
                <a
                  href="mailto:contact@eskillor.org"
                  style={{ fontSize: 17, fontWeight: 600, color: "#1C3A2F", textDecoration: "none" }}
                >
                  contact@eskillor.org
                </a>
                <p style={{ fontSize: 13, color: "#9A9A9A", marginTop: 4 }}>
                  For general inquiries, support, and feedback
                </p>
              </div>
            </div>

            <div className="info-row">
              <div className="icon-wrap">⏱️</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#9A9A9A", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Response Time
                </p>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#1C3A2F" }}>
                  Within 1 business day
                </p>
                <p style={{ fontSize: 13, color: "#9A9A9A", marginTop: 4 }}>
                  Monday – Friday, 9 AM – 6 PM EST
                </p>
              </div>
            </div>

            <div className="info-row">
              <div className="icon-wrap">🏢</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#9A9A9A", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Company
                </p>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#1C3A2F" }}>
                  E-Skillora LLC
                </p>
                <p style={{ fontSize: 13, color: "#9A9A9A", marginTop: 4 }}>
                  AI-powered K–12 educational platform
                </p>
              </div>
            </div>

            <div style={{ marginTop: 28, padding: "20px", background: "#F7F3ED", borderRadius: 14 }}>
              <p style={{ fontSize: 13, color: "#6B6B6B", lineHeight: 1.6 }}>
                <strong style={{ color: "#1C3A2F" }}>Common topics:</strong> billing &amp; subscriptions, account issues, technical support, curriculum questions, partnership inquiries.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid #E0D9CF", padding: "28px 20px",
          textAlign: "center",
        }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 12 }}>
            <button onClick={() => onNavigate("landing")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#9A9A9A" }}>Home</button>
            <button onClick={() => onNavigate("terms")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#9A9A9A" }}>Terms &amp; Conditions</button>
            <a href="mailto:contact@eskillor.org" style={{ fontSize: 13, color: "#9A9A9A", textDecoration: "none" }}>Contact</a>
          </div>
          <p style={{ fontSize: 12, color: "#BCBCBC" }}>
            &copy; {new Date().getFullYear()} E-Skillora LLC · All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
