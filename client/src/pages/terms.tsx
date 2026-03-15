const G_FONT = `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,600;9..144,700;9..144,800&family=Instrument+Sans:wght@400;500;600;700&display=swap`;

const PAGE_CSS = `
@import url('${G_FONT}');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { min-height: 100%; -webkit-font-smoothing: antialiased; }
body { font-family: 'Instrument Sans', sans-serif; background: #F7F3ED; color: #1A1A1A; }
.terms-body { max-width: 760px; margin: 0 auto; padding: 0 24px 80px; }
.terms-section { background: #fff; border-radius: 16px; padding: 32px 36px; margin-bottom: 16px; box-shadow: 0 2px 12px rgba(28,58,47,0.06); }
.terms-section h2 { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: #1C3A2F; margin-bottom: 14px; }
.terms-section p, .terms-section li { font-size: 15px; color: #444; line-height: 1.75; margin-bottom: 10px; }
.terms-section ul { padding-left: 20px; margin-bottom: 10px; }
.terms-section li { list-style: disc; margin-bottom: 6px; }
.terms-section strong { color: #1C3A2F; }
.last-updated { font-size: 13px; color: #9A9A9A; margin-bottom: 32px; display: block; }
@media (max-width: 600px) { .terms-section { padding: 24px 20px; } }
`;

interface Props {
  onNavigate: (page: string) => void;
}

export default function TermsPage({ onNavigate }: Props) {
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
          padding: "56px 24px 72px",
          textAlign: "center",
        }}>
          <p style={{
            fontSize: 13, fontWeight: 600, letterSpacing: "0.12em",
            color: "#C9973A", textTransform: "uppercase", marginBottom: 14,
          }}>
            Legal
          </p>
          <h1 style={{
            fontFamily: "'Fraunces', serif", fontSize: "clamp(30px, 5vw, 46px)",
            fontWeight: 700, color: "#fff", marginBottom: 14, lineHeight: 1.15,
          }}>
            Terms &amp; Conditions
          </h1>
          <p style={{
            fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 520, margin: "0 auto",
          }}>
            Please read these terms carefully before using E-Skillora.
          </p>
        </div>

        {/* Body */}
        <div className="terms-body" style={{ paddingTop: 40 }}>
          <span className="last-updated">Last updated: March 14, 2026 &nbsp;·&nbsp; Effective: March 14, 2026</span>

          <div className="terms-section">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using the E-Skillora platform, website, or any related services (collectively, the "Service") operated by <strong>E-Skillora LLC</strong> ("Company," "we," "us," or "our"), you agree to be bound by these Terms &amp; Conditions ("Terms"). If you do not agree to all of these Terms, you may not access or use the Service.
            </p>
            <p>
              By creating an account, subscribing to a plan, or otherwise using the Service, you represent that you are at least 18 years of age and have the legal capacity to enter into a binding agreement.
            </p>
          </div>

          <div className="terms-section">
            <h2>2. Description of Service</h2>
            <p>
              E-Skillora is an AI-powered K–12 educational platform designed to help children learn and practice academic subjects. The Service includes access to:
            </p>
            <ul>
              <li>AI-driven tutoring and practice sessions</li>
              <li>Grade-level curriculum content for grades K–12</li>
              <li>Progress tracking, streaks, and performance analytics for parents</li>
              <li>Subscription-based account management</li>
            </ul>
            <p>We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.</p>
          </div>

          <div className="terms-section">
            <h2>3. Accounts &amp; Eligibility</h2>
            <p>
              To use the Service you must register for an account. You agree to provide accurate, complete, and current information and to keep it updated. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.
            </p>
            <p>
              The Service is intended for parents and guardians who create accounts on behalf of their minor children. By registering, you confirm that any child profiles you create are under your lawful care and supervision.
            </p>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms or that we reasonably believe are being misused.
            </p>
          </div>

          <div className="terms-section">
            <h2>4. Subscriptions, Billing &amp; Refunds</h2>
            <p>
              E-Skillora is offered on a subscription basis. By subscribing, you authorize us (via our payment processor, Stripe) to charge your payment method on a recurring basis at the then-current rate for your selected plan.
            </p>
            <ul>
              <li><strong>Free Trial:</strong> New subscribers receive a 3-day free trial. You will not be charged until the trial ends. You may cancel before the trial ends to avoid any charge.</li>
              <li><strong>Billing Cycle:</strong> Subscriptions renew monthly on the anniversary of your start date unless cancelled.</li>
              <li><strong>Cancellation:</strong> You may cancel at any time through your account settings or by contacting us at <a href="mailto:contact@eskillor.org" style={{ color: "#C9973A" }}>contact@eskillor.org</a>. Cancellation takes effect at the end of the current billing period.</li>
              <li><strong>Refunds:</strong> All payments are non-refundable except where required by applicable law. If you believe you were charged in error, contact us within 14 days of the charge.</li>
              <li><strong>Price Changes:</strong> We may change subscription pricing at any time. We will provide at least 30 days' notice of any price increase via email before it takes effect.</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for any unlawful purpose or in violation of these Terms</li>
              <li>Share your account credentials with unauthorized third parties</li>
              <li>Attempt to reverse-engineer, scrape, or extract content from the platform</li>
              <li>Upload or transmit harmful, offensive, or infringing content</li>
              <li>Circumvent any security or access controls</li>
              <li>Use the Service to develop a competing product or service</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2>6. Children's Privacy (COPPA)</h2>
            <p>
              E-Skillora is designed for use by children under parental supervision. We comply with the Children's Online Privacy Protection Act (COPPA). We do not knowingly collect personal information directly from children under 13 without verifiable parental consent.
            </p>
            <p>
              Parents and guardians are responsible for managing their children's use of the Service and for providing any necessary consent. Child profiles are associated with and managed by the parent/guardian account holder.
            </p>
            <p>
              If you believe we have inadvertently collected personal information from a child without appropriate consent, please contact us immediately at <a href="mailto:contact@eskillor.org" style={{ color: "#C9973A" }}>contact@eskillor.org</a>.
            </p>
          </div>

          <div className="terms-section">
            <h2>7. Intellectual Property</h2>
            <p>
              All content, features, functionality, logos, trademarks, and technology on the Service — including but not limited to text, graphics, AI-generated responses, curriculum content, and software — are the exclusive property of E-Skillora LLC or its licensors and are protected by applicable intellectual property laws.
            </p>
            <p>
              You are granted a limited, non-exclusive, non-transferable license to access and use the Service for personal, non-commercial educational purposes only. No rights are transferred to you beyond what is expressly stated here.
            </p>
          </div>

          <div className="terms-section">
            <h2>8. AI-Generated Content Disclaimer</h2>
            <p>
              The Service uses artificial intelligence to generate educational content and tutoring responses. While we strive for accuracy, AI-generated content may occasionally contain errors or inaccuracies. <strong>E-Skillora does not warrant the accuracy, completeness, or suitability of any AI-generated content</strong> for any specific educational outcome.
            </p>
            <p>
              Parents and guardians should review AI interactions and supplement the Service with other educational resources as appropriate.
            </p>
          </div>

          <div className="terms-section">
            <h2>9. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. We do not guarantee any specific educational outcomes or results from use of the Service.
            </p>
          </div>

          <div className="terms-section">
            <h2>10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, E-SKILLORA LLC AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES — INCLUDING LOST PROFITS, DATA LOSS, OR GOODWILL — ARISING OUT OF OR RELATED TO YOUR USE OF (OR INABILITY TO USE) THE SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p>
              OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU TO US IN THE 12 MONTHS PRECEDING THE CLAIM.
            </p>
          </div>

          <div className="terms-section">
            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless E-Skillora LLC and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or related to: (a) your use of the Service; (b) your violation of these Terms; or (c) your violation of any rights of a third party.
            </p>
          </div>

          <div className="terms-section">
            <h2>12. Governing Law &amp; Dispute Resolution</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the United States and the state in which E-Skillora LLC is registered, without regard to conflict of law principles.
            </p>
            <p>
              Any dispute arising from or relating to these Terms or the Service shall first be attempted to be resolved through good-faith negotiation. If not resolved within 30 days, disputes shall be submitted to binding arbitration administered under the rules of the American Arbitration Association (AAA).
            </p>
            <p>
              <strong>Class Action Waiver:</strong> You agree to resolve disputes only on an individual basis and waive any right to bring or participate in a class action lawsuit or class-wide arbitration.
            </p>
          </div>

          <div className="terms-section">
            <h2>13. Termination</h2>
            <p>
              We may suspend or terminate your access to the Service at any time, with or without cause and with or without notice, including for violation of these Terms. Upon termination, your right to use the Service ceases immediately.
            </p>
            <p>
              You may close your account at any time by contacting us at <a href="mailto:contact@eskillor.org" style={{ color: "#C9973A" }}>contact@eskillor.org</a>. Closing your account does not entitle you to a refund of any prepaid fees.
            </p>
          </div>

          <div className="terms-section">
            <h2>14. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. When we make material changes, we will update the "Last updated" date at the top of this page and notify you via email or a prominent notice within the Service at least 14 days before the changes take effect.
            </p>
            <p>
              Your continued use of the Service after the effective date of any changes constitutes your acceptance of the revised Terms.
            </p>
          </div>

          <div className="terms-section">
            <h2>15. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <p>
              <strong>E-Skillora LLC</strong><br />
              Email: <a href="mailto:contact@eskillor.org" style={{ color: "#C9973A" }}>contact@eskillor.org</a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid #E0D9CF", padding: "28px 20px",
          textAlign: "center",
        }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 12 }}>
            <button onClick={() => onNavigate("landing")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#9A9A9A" }}>Home</button>
            <button onClick={() => onNavigate("contact")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#9A9A9A" }}>Contact Us</button>
            <a href="mailto:contact@eskillor.org" style={{ fontSize: 13, color: "#9A9A9A", textDecoration: "none" }}>contact@eskillor.org</a>
          </div>
          <p style={{ fontSize: 12, color: "#BCBCBC" }}>
            &copy; {new Date().getFullYear()} E-Skillora LLC · All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
