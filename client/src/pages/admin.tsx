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

// ─── Recent Users Table ───────────────────────────────────────────────────────

function RecentUsersTable({ users }: { users: RecentUser[] }) {
  return (
    <Card>
      <SectionTitle>Recent Users</SectionTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${BORDER}` }}>
              {["Name", "Email", "Status", "Trial Ends / Joined", "Stripe"].map(h => (
                <th key={h} style={{
                  textAlign: "left", padding: "8px 12px",
                  color: "#6B7280", fontWeight: 600, fontSize: 12,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} style={{ borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? "#FAFAFA" : CARD_BG }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: "#111827" }}>{u.name || "—"}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{u.email}</td>
                <td style={{ padding: "10px 12px" }}>
                  <StatusBadge status={u.subscriptionStatus} />
                </td>
                <td style={{ padding: "10px 12px", color: "#6B7280" }}>
                  {u.trialEndsAt ? `Trial: ${fmtDate(u.trialEndsAt)}` : `Joined: ${fmtDate(u.createdAt)}`}
                </td>
                <td style={{ padding: "10px 12px", textAlign: "center" }}>
                  {u.hasStripe
                    ? <span style={{ color: GREEN_TEXT, fontWeight: 700, fontSize: 16 }}>✓</span>
                    : <span style={{ color: "#D1D5DB" }}>—</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now, setNow] = useState(new Date());

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/metrics", {
        headers: { "X-Admin-Secret": password },
      });
      if (!res.ok) throw new Error("Failed to load metrics");
      const data = await res.json();
      setMetrics(data);
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

            {/* Row 5: Recent Users */}
            <RecentUsersTable users={metrics.recentUsers} />

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
