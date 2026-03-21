import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FunnelData {
  total: number;
  pending: number;
  trial: number;
  active: number;
  expired: number;
  cancelled: number;
  pastDue: number;
  withStripe: number;
}

interface BusinessData {
  mrr: number;
  trialConversionRate: number;
  churnCount: number;
}

interface GrowthData {
  newToday: number;
  newThisWeek: number;
  newThisMonth: number;
}

interface DailySignup {
  date: string;
  count: number;
}

interface RecentUser {
  id: number;
  email: string;
  name: string;
  subscriptionStatus: string | null;
  trialEndsAt: string | null;
  createdAt: string | null;
  hasStripe: boolean;
}

// ─── Grant Beta Card ──────────────────────────────────────────────────────────

const BETA_EMAIL_SUBJECT = `You're in - 30 days free on E-Skillora`;
const BETA_EMAIL_BODY = `Hi! I'm Bishoy, the founder of E-Skillora. I saw your interest and wanted to personally welcome you. Your 30 days free starts today, no credit card needed. Head to e-skillora.org to get started. I'd love to hear what you think, just reply to this email anytime. - Bishoy`;

function GrantBetaCard({ password }: { password: string }) {
  const [email, setEmail] = useState("");
  const [granted, setGranted] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<"subject" | "body" | null>(null);

  async function handleGrant(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    setGranted(null);
    try {
      const res = await fetch("/api/admin/grant-beta", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Secret": password },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setGranted(email.trim());
      setEmail("");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function copy(text: string, field: "subject" | "body") {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <Card>
      <SectionTitle>Grant Beta Trial</SectionTitle>
      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>
        Grants a 30-day free trial. Works for existing accounts and pre-grants for users who haven't signed up yet. Email copy will appear below for you to send manually.
      </p>
      <form onSubmit={handleGrant} style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <input
          type="email"
          placeholder="beta@example.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setGranted(null); setError(""); }}
          required
          style={{
            flex: 1, minWidth: 240, padding: "9px 14px", fontSize: 14,
            border: `1.5px solid ${BORDER}`, borderRadius: 6, outline: "none", color: "#111827",
          }}
        />
        <button
          type="submit"
          disabled={loading || !email.trim()}
          style={{
            padding: "9px 20px", background: loading ? "#9CA3AF" : DARK_GREEN,
            color: "#fff", border: "none", borderRadius: 6, fontSize: 14,
            fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", whiteSpace: "nowrap",
          }}
        >
          {loading ? "Granting…" : "Grant 30-Day Trial"}
        </button>
      </form>

      {error && (
        <div style={{ marginTop: 12, padding: "8px 14px", borderRadius: 6, fontSize: 13, fontWeight: 500, background: "#FEE2E2", color: "#B91C1C" }}>
          ✗ {error}
        </div>
      )}

      {granted && (
        <div style={{ marginTop: 16, padding: 16, background: "#F8FAFC", border: `1px solid ${BORDER}`, borderRadius: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#15803D", marginBottom: 12 }}>
            ✓ Trial granted for {granted} — send them this email:
          </div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Subject</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <code style={{ flex: 1, background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 4, padding: "6px 10px", fontSize: 13, color: "#111827" }}>
                {BETA_EMAIL_SUBJECT}
              </code>
              <button onClick={() => copy(BETA_EMAIL_SUBJECT, "subject")} style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600, background: copied === "subject" ? "#DCFCE7" : "#F3F4F6", color: copied === "subject" ? "#15803D" : "#374151", border: `1px solid ${BORDER}`, borderRadius: 4, cursor: "pointer", whiteSpace: "nowrap" }}>
                {copied === "subject" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Body</div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <div style={{ flex: 1, background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 4, padding: "8px 10px", fontSize: 13, color: "#111827", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                {BETA_EMAIL_BODY}
              </div>
              <button onClick={() => copy(BETA_EMAIL_BODY, "body")} style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600, background: copied === "body" ? "#DCFCE7" : "#F3F4F6", color: copied === "body" ? "#15803D" : "#374151", border: `1px solid ${BORDER}`, borderRadius: 4, cursor: "pointer", whiteSpace: "nowrap" }}>
                {copied === "body" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

interface AdminChild {
  name: string;
  age: number | null;
  placedLevel: string | null;
  floorOverrideApplied: boolean | null;
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  subscriptionStatus: string | null;
  planType: string | null;
  stripeSubscriptionId: string | null;
  stripeCustomerId: string | null;
  trialEndsAt: string | null;
  createdAt: string | null;
  betaTester: boolean | null;
  children: AdminChild[];
}

interface Metrics {
  funnel: FunnelData;
  business: BusinessData;
  growth: GrowthData;
  dailySignups: DailySignup[];
  recentUsers: RecentUser[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BG = "#0F1923";
const CARD_BG = "#FFFFFF";
const DARK_GREEN = "#1C3A2F";
const GOLD = "#C9973A";
const GREEN_TEXT = "#16a34a";
const BORDER = "#E5E7EB";

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending:   { bg: "#F3F4F6", text: "#6B7280" },
  trial:     { bg: "#DBEAFE", text: "#1D4ED8" },
  active:    { bg: "#DCFCE7", text: "#15803D" },
  expired:   { bg: "#FEF3C7", text: "#B45309" },
  cancelled: { bg: "#FEE2E2", text: "#B91C1C" },
  past_due:  { bg: "#FEE2E2", text: "#B91C1C" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString();
}

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function shortDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function pct(n: number, total: number): string {
  if (total === 0) return "0%";
  return Math.round((n / total) * 100) + "%";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: BG }}>
      <div style={{
        width: 48, height: 48,
        border: "4px solid #1C3A2F",
        borderTopColor: GOLD,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: CARD_BG,
      borderRadius: 12,
      padding: "20px 24px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: 15,
      fontWeight: 700,
      color: DARK_GREEN,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      marginBottom: 16,
    }}>
      {children}
    </div>
  );
}

function BigNumber({ value, color }: { value: string; color?: string }) {
  return (
    <div style={{
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: 42,
      fontWeight: 700,
      color: color ?? "#111827",
      lineHeight: 1,
      marginBottom: 6,
    }}>
      {value}
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{children}</div>
  );
}

function StatusBadge({ status }: { status: string | null }) {
  const s = status ?? "pending";
  const colors = STATUS_COLORS[s] ?? { bg: "#F3F4F6", text: "#6B7280" };
  return (
    <span style={{
      background: colors.bg,
      color: colors.text,
      borderRadius: 20,
      padding: "2px 10px",
      fontSize: 12,
      fontWeight: 600,
      textTransform: "capitalize",
    }}>
      {s.replace("_", " ")}
    </span>
  );
}

// ─── Metric Cards Row ─────────────────────────────────────────────────────────

function MetricCards({ metrics }: { metrics: Metrics }) {
  const { funnel, business } = metrics;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      <Card>
        <SectionTitle>MRR</SectionTitle>
        <BigNumber value={`$${fmt(business.mrr)}`} color={GREEN_TEXT} />
        <SubLabel>Monthly Recurring Revenue</SubLabel>
        <div style={{ fontSize: 12, color: GREEN_TEXT, marginTop: 6, fontWeight: 600 }}>
          +{funnel.active} active subscriber{funnel.active !== 1 ? "s" : ""}
        </div>
      </Card>

      <Card>
        <SectionTitle>Active</SectionTitle>
        <BigNumber value={fmt(funnel.active)} />
        <SubLabel>Paid Subscribers</SubLabel>
        <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>
          {funnel.pastDue} past due
        </div>
      </Card>

      <Card>
        <SectionTitle>Trial</SectionTitle>
        <BigNumber value={fmt(funnel.trial)} color="#1D4ED8" />
        <SubLabel>In Trial</SubLabel>
        <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>
          {funnel.pending} pending checkout
        </div>
      </Card>

      <Card>
        <SectionTitle>Conversion</SectionTitle>
        <BigNumber value={`${business.trialConversionRate}%`} color={GOLD} />
        <SubLabel>Trial → Paid</SubLabel>
        <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>
          {funnel.withStripe} checked out
        </div>
      </Card>
    </div>
  );
}

// ─── Funnel Card ──────────────────────────────────────────────────────────────

function FunnelCard({ funnel }: { funnel: FunnelData }) {
  const steps = [
    { label: "Total Signups", value: funnel.total, color: DARK_GREEN },
    { label: "Checkout Completed", value: funnel.withStripe, color: "#0369A1" },
    { label: "Trial Active", value: funnel.trial, color: "#6D28D9" },
    { label: "Paid Active", value: funnel.active, color: GREEN_TEXT },
  ];
  const maxVal = funnel.total || 1;

  return (
    <Card>
      <SectionTitle>Acquisition Funnel</SectionTitle>
      <div style={{ display: "flex", gap: 0, alignItems: "stretch" }}>
        {steps.map((step, i) => {
          const barWidth = Math.round((step.value / maxVal) * 100);
          const prev = i > 0 ? steps[i - 1].value : step.value;
          const dropPct = i > 0 && prev > 0 ? Math.round((1 - step.value / prev) * 100) : null;
          return (
            <div key={step.label} style={{ flex: 1, padding: "0 12px", borderLeft: i > 0 ? `1px solid ${BORDER}` : "none" }}>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6, fontWeight: 500 }}>{step.label}</div>
              <div style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 28, fontWeight: 700,
                color: step.color, marginBottom: 8,
              }}>
                {fmt(step.value)}
              </div>
              {dropPct !== null && (
                <div style={{ fontSize: 11, color: dropPct > 50 ? "#B91C1C" : "#B45309", marginBottom: 8, fontWeight: 600 }}>
                  ↓ {dropPct}% drop from previous
                </div>
              )}
              <div style={{ height: 8, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  width: `${barWidth}%`,
                  height: "100%",
                  background: step.color,
                  borderRadius: 4,
                  transition: "width 0.6s ease",
                }} />
              </div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>
                {pct(step.value, maxVal)} of total
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ─── Growth + Status Row ──────────────────────────────────────────────────────

function GrowthCard({ growth }: { growth: GrowthData }) {
  const rows = [
    { label: "Today", value: growth.newToday },
    { label: "This Week", value: growth.newThisWeek },
    { label: "This Month", value: growth.newThisMonth },
  ];
  return (
    <Card style={{ flex: 1 }}>
      <SectionTitle>Growth</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {rows.map(row => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 14, color: "#374151" }}>{row.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, fontWeight: 700, color: DARK_GREEN }}>
                {fmt(row.value)}
              </span>
              <span style={{ fontSize: 13, color: "#9CA3AF" }}>new</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function StatusBreakdownCard({ funnel }: { funnel: FunnelData }) {
  const items = [
    { label: "Active", value: funnel.active, color: GREEN_TEXT },
    { label: "Trial", value: funnel.trial, color: "#1D4ED8" },
    { label: "Pending", value: funnel.pending, color: "#6B7280" },
    { label: "Expired", value: funnel.expired, color: "#B45309" },
    { label: "Cancelled", value: funnel.cancelled, color: "#B91C1C" },
    { label: "Past Due", value: funnel.pastDue, color: "#DC2626" },
  ];
  const max = Math.max(...items.map(i => i.value), 1);
  return (
    <Card style={{ flex: 1 }}>
      <SectionTitle>Status Breakdown</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map(item => (
          <div key={item.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{item.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{fmt(item.value)}</span>
            </div>
            <div style={{ height: 6, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                width: `${Math.round((item.value / max) * 100)}%`,
                height: "100%",
                background: item.color,
                borderRadius: 4,
                transition: "width 0.6s ease",
              }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Daily Signups Chart ──────────────────────────────────────────────────────

function DailySignupsChart({ data }: { data: DailySignup[] }) {
  const maxCount = Math.max(...data.map(d => d.count), 1);
  const chartH = 140;
  const barW = 28;
  const gap = 10;
  const padL = 36;
  const padB = 32;
  const totalW = padL + data.length * (barW + gap);
  const totalH = chartH + padB;

  const yTicks = [0, Math.round(maxCount / 2), maxCount];

  return (
    <Card>
      <SectionTitle>Daily Signups — Last 14 Days</SectionTitle>
      <div style={{ overflowX: "auto" }}>
        <svg width={totalW} height={totalH} style={{ display: "block" }}>
          {/* Y-axis ticks */}
          {yTicks.map(tick => {
            const y = chartH - Math.round((tick / maxCount) * chartH);
            return (
              <g key={tick}>
                <line x1={padL - 6} y1={y} x2={totalW} y2={y} stroke="#F3F4F6" strokeWidth={1} />
                <text x={padL - 10} y={y + 4} textAnchor="end" fill="#9CA3AF" fontSize={10}>
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((d, i) => {
            const barH = maxCount > 0 ? Math.max(Math.round((d.count / maxCount) * chartH), d.count > 0 ? 4 : 0) : 0;
            const x = padL + i * (barW + gap);
            const y = chartH - barH;
            const label = shortDate(d.date);
            return (
              <g key={d.date}>
                <rect
                  x={x} y={y} width={barW} height={barH}
                  fill={DARK_GREEN} rx={3}
                />
                {d.count > 0 && (
                  <text x={x + barW / 2} y={y - 4} textAnchor="middle" fill="#374151" fontSize={10} fontWeight={600}>
                    {d.count}
                  </text>
                )}
                <text
                  x={x + barW / 2} y={chartH + 18}
                  textAnchor="middle" fill="#6B7280" fontSize={10}
                  transform={`rotate(-35, ${x + barW / 2}, ${chartH + 18})`}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}

// ─── Users Table ─────────────────────────────────────────────────────────────

const PAGE_SIZE = 100;

function UsersTable({ users, password }: { users: AdminUser[]; password: string }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = users.filter(u => u.email.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageUsers = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function toggleRow(id: string) {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const thStyle: React.CSSProperties = {
    textAlign: "left", padding: "8px 12px",
    color: "#6B7280", fontWeight: 600, fontSize: 11,
    textTransform: "uppercase", letterSpacing: "0.05em",
    whiteSpace: "nowrap",
  };

  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <SectionTitle>All Users ({filtered.length})</SectionTitle>
        <input
          type="text"
          placeholder="Filter by email…"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
          style={{
            padding: "7px 12px", fontSize: 13, border: `1.5px solid ${BORDER}`,
            borderRadius: 6, outline: "none", width: 240, color: "#111827",
          }}
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${BORDER}` }}>
              <th style={{ ...thStyle, width: 24 }} />
              {["Email", "Name", "Plan", "Status", "Started", "Renewal / Trial Ends", "Stripe Sub"].map(h => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageUsers.map((u, i) => {
              const isOpen = expanded.has(u.id);
              const rowBg = i % 2 === 0 ? "#FAFAFA" : CARD_BG;
              const stripeUrl = u.stripeSubscriptionId
                ? `https://dashboard.stripe.com/subscriptions/${u.stripeSubscriptionId}`
                : null;

              const renewalCell = (() => {
                if (u.subscriptionStatus === "trial" && u.trialEndsAt) {
                  return <span style={{ color: "#1D4ED8" }}>{fmtDate(u.trialEndsAt)}</span>;
                }
                if (u.subscriptionStatus === "active" && stripeUrl) {
                  return <a href={stripeUrl} target="_blank" rel="noreferrer" style={{ color: GREEN_TEXT, fontWeight: 600, textDecoration: "none" }}>View in Stripe ↗</a>;
                }
                return <span style={{ color: "#9CA3AF" }}>—</span>;
              })();

              return (
                <>
                  <tr
                    key={u.id}
                    onClick={() => toggleRow(u.id)}
                    style={{ borderBottom: isOpen ? "none" : `1px solid ${BORDER}`, background: rowBg, cursor: "pointer" }}
                  >
                    <td style={{ padding: "10px 8px 10px 12px", color: "#9CA3AF", fontSize: 11 }}>
                      {isOpen ? "▾" : "▸"}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#374151", fontFamily: "monospace", fontSize: 12 }}>{u.email}</td>
                    <td style={{ padding: "10px 12px", fontWeight: 600, color: "#111827" }}>
                      {u.name || "—"}
                      {u.betaTester && (
                        <span style={{
                          marginLeft: 7, fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
                          background: "#EDE9FE", color: "#6D28D9", borderRadius: 4, padding: "2px 6px",
                          verticalAlign: "middle",
                        }}>BETA</span>
                      )}
                    </td>
                    <td style={{ padding: "10px 12px", color: "#6B7280" }}>
                      {u.planType === "2child" ? "2 Children" : u.planType === "1child" ? "1 Child" : "—"}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <StatusBadge status={u.subscriptionStatus} />
                    </td>
                    <td style={{ padding: "10px 12px", color: "#6B7280", whiteSpace: "nowrap" }}>
                      {fmtDate(u.createdAt)}
                    </td>
                    <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>{renewalCell}</td>
                    <td style={{ padding: "10px 12px" }}>
                      {stripeUrl
                        ? <a href={stripeUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                            style={{ color: GREEN_TEXT, fontWeight: 600, fontSize: 12, textDecoration: "none", fontFamily: "monospace" }}>
                            {u.stripeSubscriptionId!.slice(0, 14)}… ↗
                          </a>
                        : <span style={{ color: "#D1D5DB" }}>—</span>
                      }
                    </td>
                  </tr>

                  {isOpen && (
                    <tr key={`${u.id}-exp`} style={{ background: "#F0F7F2", borderBottom: `1px solid ${BORDER}` }}>
                      <td />
                      <td colSpan={7} style={{ padding: "10px 12px 14px" }}>
                        {u.children.length === 0 ? (
                          <span style={{ fontSize: 12, color: "#9CA3AF", fontStyle: "italic" }}>No placement data recorded yet.</span>
                        ) : (
                          <table style={{ borderCollapse: "collapse", fontSize: 12, width: "auto" }}>
                            <thead>
                              <tr>
                                {["Child", "Age", "Placed Level", "Floor Override"].map(h => (
                                  <th key={h} style={{ textAlign: "left", padding: "4px 16px 4px 0", color: "#6B7280", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {u.children.map((c, ci) => (
                                <tr key={ci}>
                                  <td style={{ padding: "4px 16px 4px 0", fontWeight: 600, color: "#111827" }}>{c.name}</td>
                                  <td style={{ padding: "4px 16px 4px 0", color: "#374151" }}>{c.age ?? "—"}</td>
                                  <td style={{ padding: "4px 16px 4px 0", color: DARK_GREEN, fontWeight: 700 }}>{c.placedLevel ?? "—"}</td>
                                  <td style={{ padding: "4px 0" }}>
                                    {c.floorOverrideApplied
                                      ? <span style={{ background: "#FEF3C7", color: "#B45309", borderRadius: 4, padding: "2px 8px", fontWeight: 700, fontSize: 11 }}>Yes</span>
                                      : <span style={{ background: "#F3F4F6", color: "#6B7280", borderRadius: 4, padding: "2px 8px", fontSize: 11 }}>No</span>
                                    }
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
            style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${BORDER}`, background: CARD_BG, cursor: page === 0 ? "not-allowed" : "pointer", color: "#374151", fontSize: 13 }}>
            ← Prev
          </button>
          <span style={{ fontSize: 13, color: "#6B7280" }}>Page {page + 1} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
            style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${BORDER}`, background: CARD_BG, cursor: page === totalPages - 1 ? "not-allowed" : "pointer", color: "#374151", fontSize: 13 }}>
            Next →
          </button>
        </div>
      )}
    </Card>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/metrics", {
        headers: { "X-Admin-Secret": pw },
      });
      if (res.ok) {
        sessionStorage.setItem("admin_secret", pw);
        onLogin(pw);
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: BG,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;0,900;1,400&display=swap');
        * { box-sizing: border-box; }
      `}</style>
      <div style={{
        background: CARD_BG, borderRadius: 16, padding: "40px 36px",
        width: "100%", maxWidth: 400,
        boxShadow: "0 8px 40px rgba(0,0,0,0.32)",
        textAlign: "center",
      }}>
        <div style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 26, fontWeight: 900,
          color: DARK_GREEN, marginBottom: 4,
        }}>
          e-Skillora
        </div>
        <div style={{ fontSize: 12, color: GOLD, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 28 }}>
          Admin Dashboard
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Admin password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            autoFocus
            style={{
              width: "100%", padding: "12px 16px",
              border: `1.5px solid ${error ? "#EF4444" : BORDER}`,
              borderRadius: 8, fontSize: 15,
              outline: "none", marginBottom: 12,
              color: "#111827",
            }}
          />
          {error && (
            <div style={{ color: "#B91C1C", fontSize: 13, marginBottom: 10 }}>{error}</div>
          )}
          <button
            type="submit"
            disabled={loading || !pw}
            style={{
              width: "100%", padding: "12px 0",
              background: loading || !pw ? "#9CA3AF" : DARK_GREEN,
              color: "#FFFFFF", border: "none",
              borderRadius: 8, fontSize: 15, fontWeight: 700,
              cursor: loading || !pw ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Checking..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ password }: { password: string }) {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [allUsers, setAllUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now, setNow] = useState(new Date());
  const [wiping, setWiping] = useState(false);
  const [wipeMsg, setWipeMsg] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [metricsRes, usersRes] = await Promise.all([
        fetch("/api/admin/metrics", { headers: { "X-Admin-Secret": password } }),
        fetch("/api/admin/users",   { headers: { "X-Admin-Secret": password } }),
      ]);
      if (!metricsRes.ok) throw new Error("Failed to load metrics");
      if (!usersRes.ok)   throw new Error("Failed to load users");
      const [metricsData, usersData] = await Promise.all([metricsRes.json(), usersRes.json()]);
      setMetrics(metricsData);
      setAllUsers(usersData);
    } catch (e: any) {
      setError(e.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => { load(); }, [load]);

  // Clock tick
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  function signOut() {
    sessionStorage.removeItem("admin_secret");
    window.location.reload();
  }

  async function wipeDb() {
    const input = window.prompt(
      '⚠️  This will permanently delete ALL users, sessions, streaks, and questions.\n\nType "CONFIRM" to proceed:'
    );
    if (input !== "CONFIRM") return;
    setWiping(true);
    setWipeMsg("");
    try {
      const res = await fetch("/api/admin/wipe-db", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Secret": password },
        body: JSON.stringify({ confirm: "CONFIRM" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setWipeMsg("✓ Database wiped. All data cleared.");
      setMetrics(null);
    } catch (e: any) {
      setWipeMsg(`Error: ${e.message}`);
    } finally {
      setWiping(false);
    }
  }

  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;0,900;1,400&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* Top Bar */}
      <div style={{
        background: DARK_GREEN,
        padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 56,
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}>
        <div style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 20, fontWeight: 900, color: "#FFFFFF",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          e-Skillora
          <span style={{ fontSize: 12, color: GOLD, fontFamily: "system-ui", fontWeight: 400, letterSpacing: "0.1em" }}>
            ADMIN
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: "#FFFFFF", fontWeight: 500 }}>{dateStr}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{timeStr}</div>
          </div>
          <a
            href="/questions-admin"
            style={{
              background: "rgba(255,255,255,0.12)", color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 6, padding: "6px 14px", fontSize: 13,
              cursor: "pointer", textDecoration: "none",
            }}
          >
            Question Manager
          </a>
          <button
            onClick={load}
            style={{
              background: "rgba(255,255,255,0.12)", color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 6, padding: "6px 14px", fontSize: 13,
              cursor: "pointer",
            }}
          >
            ↻ Refresh
          </button>
          <button
            onClick={wipeDb}
            disabled={wiping}
            style={{
              background: "rgba(185,28,28,0.25)", color: "#FCA5A5",
              border: "1px solid rgba(185,28,28,0.4)",
              borderRadius: 6, padding: "6px 14px", fontSize: 13,
              cursor: wiping ? "not-allowed" : "pointer", opacity: wiping ? 0.6 : 1,
            }}
          >
            {wiping ? "Wiping…" : "⚠ Wipe DB"}
          </button>
          <button
            onClick={signOut}
            style={{
              background: "transparent", color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 6, padding: "6px 14px", fontSize: 13,
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {wipeMsg && (
        <div style={{
          background: wipeMsg.startsWith("Error") ? "#FEE2E2" : "#DCFCE7",
          color: wipeMsg.startsWith("Error") ? "#B91C1C" : "#15803D",
          padding: "12px 32px", fontSize: 14, fontWeight: 600, textAlign: "center",
        }}>
          {wipeMsg}
        </div>
      )}

      {/* Main Content */}
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "28px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

        {loading && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 80 }}>
            <div style={{
              width: 40, height: 40, border: "4px solid #1C3A2F",
              borderTopColor: GOLD, borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {error && (
          <div style={{ background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: 8, padding: 16, color: "#B91C1C" }}>
            Error: {error}
            <button onClick={load} style={{ marginLeft: 12, color: "#B91C1C", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>
              Retry
            </button>
          </div>
        )}

        {!loading && metrics && (
          <>
            {/* Row 1: Metric Cards */}
            <MetricCards metrics={metrics} />

            {/* Row 2: Funnel */}
            <FunnelCard funnel={metrics.funnel} />

            {/* Row 3: Growth + Status */}
            <div style={{ display: "flex", gap: 20 }}>
              <GrowthCard growth={metrics.growth} />
              <StatusBreakdownCard funnel={metrics.funnel} />
            </div>

            {/* Row 4: Daily Signups Chart */}
            <DailySignupsChart data={metrics.dailySignups} />

            {/* Row 5: Grant Beta */}
            <GrantBetaCard password={password} />

            {/* Row 6: All Users */}
            <UsersTable users={allUsers} password={password} />

            {/* Footer */}
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 12, paddingBottom: 16 }}>
              e-Skillora Admin · Data refreshed at {timeStr}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_secret");
    if (stored) setPassword(stored);
  }, []);

  if (password === null) {
    return <LoginScreen onLogin={pw => setPassword(pw)} />;
  }

  return <Dashboard password={password} />;
}
