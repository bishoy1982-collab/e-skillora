// ═══════════════════════════════════════════════════════════════
// e-SKILLORA v3  —  Complete Application
// Parent & Child Onboarding · Netflix-style Login · Parent Dashboard
// Child Placement · Daily Worksheets · 85% Mastery Tests
// Single file → drop in as src/App.jsx in Replit
// ═══════════════════════════════════════════════════════════════
import { useState, useRef, useEffect } from "react";
import {
  Brain, Play, CheckCircle, XCircle, Home, PenTool, Trash2, X,
  Lock, Plus, BookOpen, BarChart3, ChevronRight, ChevronLeft,
  RefreshCw, Star, Calendar, Lightbulb, ArrowRight, Trophy,
  RotateCcw, Eye, EyeOff, Settings, Users, CreditCard, LogOut,
  Shield, Clock, Check, Edit2, Minus, Mail, Bell, Award,
  TrendingUp, Target, Zap, AlertCircle, HelpCircle
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// DESIGN SYSTEM
// Palette: warm cream #F7F3ED · deep forest #1C3A2F · gold #C9973A
// Accent coral #E8604C · soft sage #8BAF94 · ink #1A1A1A
// Typography: Fraunces (display) + Instrument Sans (body)
// ─────────────────────────────────────────────────────────────
const G_FONT = `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=Instrument+Sans:wght@400;500;600;700&display=swap`;

const GLOBAL_CSS = `
@import url('${G_FONT}');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{min-height:100%;-webkit-font-smoothing:antialiased}
body{font-family:'Instrument Sans',sans-serif;background:#F7F3ED;color:#1A1A1A}
:root{
  --cream:#F7F3ED;--cream-d:#EDE8E0;--cream-dd:#E0D9CF;
  --forest:#1C3A2F;--forest-m:#2A5240;--forest-l:#3D7A5C;
  --gold:#C9973A;--gold-l:#E5B96A;--gold-ll:#F5E4C0;
  --coral:#E8604C;--coral-l:#F08070;
  --sage:#8BAF94;--sage-l:#B8D4BE;--sage-ll:#E6F0E8;
  --ink:#1A1A1A;--ink-m:#3D3D3D;--ink-l:#6B6B6B;--ink-ll:#9A9A9A;
  --white:#FFFFFF;--shadow:0 2px 12px rgba(28,58,47,0.10);
  --shadow-lg:0 8px 40px rgba(28,58,47,0.14);
  --r-sm:10px;--r-md:16px;--r-lg:24px;--r-xl:32px;--r-full:9999px;
}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideIn{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.93)}to{opacity:1;transform:scale(1)}}
@keyframes pop{0%{transform:scale(0) rotate(-15deg);opacity:0}65%{transform:scale(1.15) rotate(4deg);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes shimmer{0%{opacity:.4}50%{opacity:1}100%{opacity:.4}}
@keyframes celebrate{0%{transform:scale(1)}30%{transform:scale(1.08)}60%{transform:scale(.97)}100%{transform:scale(1)}}
.afu{animation:fadeUp .45s cubic-bezier(.22,1,.36,1) both}
.afi{animation:fadeIn .35s ease both}
.asi{animation:slideIn .4s cubic-bezier(.22,1,.36,1) both}
.sci{animation:scaleIn .35s cubic-bezier(.34,1.56,.64,1) both}
.pop{animation:pop .5s cubic-bezier(.34,1.56,.64,1) both}
.float{animation:float 3s ease-in-out infinite}
.d1{animation-delay:.06s}.d2{animation-delay:.12s}.d3{animation-delay:.18s}.d4{animation-delay:.24s}.d5{animation-delay:.3s}
input:-webkit-autofill,input:-webkit-autofill:focus{transition:background-color 9999s ease 0s,-webkit-text-fill-color 9999s ease 0s;-webkit-text-fill-color:var(--ink)!important}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:var(--cream-dd);border-radius:2px}
button:focus-visible,input:focus-visible{outline:2px solid var(--forest);outline-offset:2px}
`;

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const AVATAR_SETS = {
  playful: [
    { e:"🦁", bg:"#C9973A" }, { e:"🐯", bg:"#E8604C" }, { e:"🐻", bg:"#8B5E3C" },
    { e:"🦊", bg:"#D4763B" }, { e:"🐧", bg:"#2A5AA0" }, { e:"🦋", bg:"#7B4BA0" },
    { e:"🐬", bg:"#2D8C7C" }, { e:"🦄", bg:"#B85C8A" }, { e:"🚀", bg:"#1C3A2F" },
    { e:"⭐", bg:"#C9973A" }, { e:"🌈", bg:"#3D7A5C" }, { e:"🎯", bg:"#E8604C" },
  ],
  teen: [
    { e:"🎧", bg:"#1C3A2F" }, { e:"🎸", bg:"#2A5240" }, { e:"🎮", bg:"#2A5AA0" },
    { e:"⚽", bg:"#3D7A5C" }, { e:"🏀", bg:"#C9973A" }, { e:"🏐", bg:"#E8604C" },
    { e:"📚", bg:"#7B4BA0" }, { e:"🧠", bg:"#1C3A2F" }, { e:"🧪", bg:"#2D8C7C" },
    { e:"🧩", bg:"#D4763B" }, { e:"🛰️", bg:"#2A5AA0" }, { e:"🏆", bg:"#C9973A" },
  ],
};

function getAvatarOptions(age) {
  const a = parseInt(age);
  if (!Number.isFinite(a)) return AVATAR_SETS.playful;
  return a >= 11 ? AVATAR_SETS.teen : AVATAR_SETS.playful;
}

const PLANS = [
  { id:"starter", label:"Starter", price:9,  cap:1, desc:"1 child · All 12 levels", badge:null,         color:"var(--sage)",   dark:"var(--forest)" },
  { id:"family",  label:"Family",  price:15, cap:2, desc:"2 children · Everything", badge:"Most Popular", color:"var(--forest)", dark:"var(--cream)" },
  { id:"pro",     label:"Pro",     price:22, cap:2, desc:"2 children + analytics",  badge:null,          color:"var(--gold)",   dark:"var(--forest)" },
];

function getStartLevel(age) {
  const a = parseInt(age);
  if (a<=5) return "A"; if (a<=6) return "B"; if (a<=7) return "C";
  if (a<=8) return "D"; if (a<=9) return "E"; if (a<=10) return "F";
  if (a<=11) return "G"; if (a<=12) return "H"; if (a<=13) return "I";
  if (a<=14) return "J"; if (a<=15) return "K"; return "L";
}
function gradeLabel(age) {
  const a = parseInt(age);
  if (a<=5) return "Pre-K / Kindergarten";
  if (a<=6) return "1st Grade"; if (a<=7) return "2nd Grade";
  if (a<=8) return "3rd Grade"; if (a<=9) return "4th Grade";
  if (a<=10) return "5th Grade"; if (a<=11) return "6th Grade";
  if (a<=12) return "7th Grade"; if (a<=13) return "8th Grade";
  return "High School";
}

// ─────────────────────────────────────────────────────────────
// STORAGE
// ─────────────────────────────────────────────────────────────
const LS = {
  get: (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del: (k)    => { try { localStorage.removeItem(k); } catch {} },
};
const APP_KEY = "eskillora_v3_app";
const getApp  = ()  => LS.get(APP_KEY, null);
const setApp  = (d) => LS.set(APP_KEY, d);

function initApp(email, password, pin, plan, children) {
  return {
    v: 3,
    parent: { email, password, pin, plan, trialEnd: Date.now() + 7*24*3600*1000 },
    children: children.map((c, i) => ({
      id: `child_${Date.now()}_${i}`,
      name: c.name, age: c.age,
      pin: c.pin,
      avatar: c.avatar, avatarBg: c.avatarBg,
      level: getStartLevel(c.age),
      placementDone: false,
    })),
    createdAt: new Date().toISOString(),
  };
}

// ─────────────────────────────────────────────────────────────
// UI PRIMITIVES
// ─────────────────────────────────────────────────────────────
const s = {
  // Buttons
  btn: (v="primary", full=false, disabled=false) => ({
    display:"flex", alignItems:"center", justifyContent:"center", gap:8,
    fontFamily:"'Instrument Sans',sans-serif", fontWeight:600, fontSize:16,
    borderRadius:"var(--r-lg)", border:"1px solid transparent", cursor: disabled?"not-allowed":"pointer",
    transition:"all .18s", userSelect:"none", outline:"none",
    padding:"14px 28px", width: full?"100%":"auto",
    opacity: disabled ? .45 : 1,
    ...(v==="primary"  && { background:"var(--forest)",  color:"var(--cream)",  boxShadow:"0 10px 26px rgba(28,58,47,0.18)" }),
    ...(v==="gold"     && { background:"var(--gold)",    color:"var(--forest)", boxShadow:"0 10px 26px rgba(201,151,58,0.22)" }),
    ...(v==="outline"  && { background:"rgba(255,255,255,0.75)", color:"var(--forest)", border:"1px solid var(--cream-dd)" }),
    ...(v==="ghost"    && { background:"transparent",    color:"var(--ink-l)",  padding:"10px 16px" }),
    ...(v==="danger"   && { background:"var(--coral)",   color:"var(--white)"  }),
    ...(v==="sage"     && { background:"var(--sage-ll)", color:"var(--forest)" }),
  }),
  // Cards
  card: (p=24) => ({
    background:"rgba(255,255,255,0.92)",
    borderRadius:"var(--r-xl)",
    padding:p,
    border:"1px solid rgba(224,217,207,0.9)",
    boxShadow:"0 10px 40px rgba(28,58,47,0.10)",
    backdropFilter:"blur(8px)",
  }),
  cardForest: (p=24) => ({ background:"var(--forest)", borderRadius:"var(--r-xl)", padding:p, boxShadow:"0 16px 50px rgba(0,0,0,0.22)" }),
  // Inputs
  input: (err=false) => ({
    width:"100%", fontFamily:"'Instrument Sans',sans-serif", fontSize:16, color:"var(--ink)",
    background:"rgba(247,243,237,0.72)",
    border:`1px solid ${err?"rgba(232,96,76,0.75)":"rgba(224,217,207,0.95)"}`,
    borderRadius:"14px",
    padding:"14px 16px",
    outline:"none",
    transition:"border-color .16s, box-shadow .16s, background .16s",
  }),
  label: { fontSize:13, fontWeight:600, color:"var(--ink-l)", display:"block", marginBottom:6, fontFamily:"'Instrument Sans'" },
};

function Btn({ children, onClick, v="primary", full=false, disabled=false, style:sx={}, size="md" }) {
  const base = s.btn(v, full, disabled);
  const sizes = { sm:{fontSize:14,padding:"10px 20px",borderRadius:"var(--r-md)"}, md:{}, lg:{fontSize:18,padding:"18px 32px",borderRadius:"var(--r-xl)"} };
  return (
    <button style={{...base,...sizes[size],...sx}} onClick={disabled?undefined:onClick}
      onMouseEnter={e=>{ if(!disabled){ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="var(--shadow-lg)"; }}}
      onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
      {children}
    </button>
  );
}

function Field({ label, type="text", value, onChange, placeholder, error, hint, icon, autoFocus, onKeyDown }) {
  const [show, setShow] = useState(false);
  const isPass = type === "password";
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
      {label && <label style={s.label}>{label}</label>}
      <div style={{ position:"relative" }}>
        {icon && <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"var(--ink-ll)" }}>{icon}</span>}
        <input
          type={isPass && show ? "text" : type}
          value={value} onChange={e=>onChange(e.target.value)}
          placeholder={placeholder} autoFocus={autoFocus} onKeyDown={onKeyDown}
          style={{...s.input(!!error), paddingLeft: icon?"44px":"18px", paddingRight: isPass?"48px":"18px"}}
          onFocus={e=>e.target.style.borderColor="var(--forest)"}
          onBlur={e=>e.target.style.borderColor=error?"var(--coral)":"var(--cream-dd)"}
        />
        {isPass && (
          <button type="button" onClick={()=>setShow(!show)} style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"var(--ink-ll)" }}>
            {show ? <EyeOff size={18}/> : <Eye size={18}/>}
          </button>
        )}
      </div>
      {error && <p style={{ fontSize:12, color:"var(--coral)", marginTop:4 }}>{error}</p>}
      {hint && !error && <p style={{ fontSize:12, color:"var(--ink-ll)", marginTop:4 }}>{hint}</p>}
    </div>
  );
}

function Tag({ children, color="forest" }) {
  const colors = { forest:{bg:"var(--forest)",fg:"var(--cream)"}, gold:{bg:"var(--gold-ll)",fg:"var(--forest)"}, sage:{bg:"var(--sage-ll)",fg:"var(--forest)"}, coral:{bg:"#FDE8E5",fg:"var(--coral)"} };
  return <span style={{ fontSize:12, fontWeight:600, padding:"3px 10px", borderRadius:"var(--r-full)", fontFamily:"'Instrument Sans'", ...colors[color] }}>{children}</span>;
}

function StepDots({ total, current }) {
  return (
    <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:32 }}>
      {Array.from({length:total}).map((_,i) => (
        <div key={i} style={{ height:6, borderRadius:3, transition:"all .3s",
          width: i===current?24:8,
          background: i<current?"var(--forest)":i===current?"var(--gold)":"var(--cream-dd)" }}/>
      ))}
    </div>
  );
}

function Divider({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, margin:"8px 0" }}>
      <div style={{ flex:1, height:1, background:"var(--cream-dd)" }}/>
      {label && <span style={{ fontSize:13, color:"var(--ink-ll)" }}>{label}</span>}
      <div style={{ flex:1, height:1, background:"var(--cream-dd)" }}/>
    </div>
  );
}

function SocialBtn({ icon, label, onClick }) {
  return (
    <button onClick={onClick} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"13px 0", background:"var(--cream)", border:"2px solid var(--cream-dd)", borderRadius:"var(--r-md)", fontFamily:"'Instrument Sans'", fontSize:14, fontWeight:600, cursor:"pointer", color:"var(--ink)" }}
      onMouseEnter={e=>e.target.style.borderColor="var(--forest)"}
      onMouseLeave={e=>e.target.style.borderColor="var(--cream-dd)"}>
      <span style={{fontSize:18}}>{icon}</span> {label}
    </button>
  );
}

function Spinner() {
  return <div style={{ width:20, height:20, border:"2.5px solid rgba(255,255,255,0.3)", borderTopColor:"white", borderRadius:"50%", animation:"spin .7s linear infinite" }}/>;
}

// ─────────────────────────────────────────────────────────────
// LAYOUT SHELL (wraps all onboarding screens)
// ─────────────────────────────────────────────────────────────
function Shell({ children, maxW=480, bg="var(--cream)" }) {
  return (
    <div style={{ minHeight:"100vh", background:bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 16px" }}>
      {/* Logo wordmark */}
      <div className="afu" style={{ display:"flex", alignItems:"center", gap:10, marginBottom:32 }}>
        <div style={{ width:40,height:40, background:"var(--forest)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Brain size={22} color="var(--gold)"/>
        </div>
        <span style={{ fontFamily:"'Fraunces',serif", fontSize:22, fontWeight:700, color:"var(--forest)", letterSpacing:"-0.5px" }}>e-Skillora</span>
      </div>
      <div style={{ width:"100%", maxWidth:maxW }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ① ONBOARDING FLOW
// ─────────────────────────────────────────────────────────────

// Step 1 — Account
function OB_Account({ onNext }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [err, setErr] = useState({});
  const go = () => {
    const e = {};
    if (!email.includes("@")) e.email = "Enter a valid email address";
    if (pw.length < 6) e.pw = "Password must be at least 6 characters";
    if (pw !== cpw) e.cpw = "Passwords don't match";
    if (Object.keys(e).length) { setErr(e); return; }
    onNext({ email, password: pw });
  };
  return (
    <div className="afu" style={s.card(36)}>
      <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:30, fontWeight:700, color:"var(--forest)", marginBottom:6, lineHeight:1.15 }}>
        Create your account
      </h1>
      <p style={{ color:"var(--ink-l)", fontSize:15, marginBottom:28 }}>You'll manage your children's learning from here</p>

      <div style={{ display:"flex", flexDirection:"column", gap:18, marginBottom:28 }}>
        <Field label="Email address" type="email" value={email} onChange={v=>{setEmail(v);setErr({})}} placeholder="parent@email.com" error={err.email} icon={<Mail size={16}/>}/>
        <Field label="Password" type="password" value={pw} onChange={v=>{setPw(v);setErr({})}} placeholder="Min. 6 characters" error={err.pw}/>
        <Field label="Confirm password" type="password" value={cpw} onChange={v=>{setCpw(v);setErr({})}} placeholder="Same as above" error={err.cpw} onKeyDown={e=>e.key==="Enter"&&go()}/>
      </div>

      <Btn onClick={go} full v="primary" size="lg">Continue <ArrowRight size={18}/></Btn>
      <p style={{ textAlign:"center", fontSize:12, color:"var(--ink-ll)", marginTop:16 }}>
        By continuing you agree to our Terms of Service & Privacy Policy
      </p>
    </div>
  );
}

// Step 2 — Plan
function OB_Plan({ onNext }) {
  const [sel, setSel] = useState("family");
  return (
    <div className="afu" style={s.card(36)}>
      <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:30, fontWeight:700, color:"var(--forest)", marginBottom:6 }}>Choose a plan</h1>
      <p style={{ color:"var(--ink-l)", fontSize:15, marginBottom:28 }}>Try free for <strong>7 days</strong> · Cancel anytime</p>

      <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:28 }}>
        {PLANS.map(p => {
          const active = sel === p.id;
          return (
            <button key={p.id} onClick={()=>setSel(p.id)} style={{
              position:"relative", textAlign:"left", padding:"18px 20px", borderRadius:"var(--r-lg)",
              background: active ? p.color : "var(--cream)",
              border:`2px solid ${active ? p.color : "var(--cream-dd)"}`,
              cursor:"pointer", transition:"all .2s", outline:"none",
            }}>
              {p.badge && (
                <span style={{ position:"absolute", top:-10, right:14, background:"var(--gold)", color:"var(--forest)", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:"var(--r-full)", fontFamily:"'Instrument Sans'" }}>{p.badge}</span>
              )}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <p style={{ fontFamily:"'Fraunces',serif", fontSize:18, fontWeight:700, color: active ? p.dark : "var(--forest)", marginBottom:3 }}>{p.label}</p>
                  <p style={{ fontSize:13, color: active ? (p.dark==="var(--cream)"?"rgba(247,243,237,0.75)":"rgba(28,58,47,0.65)") : "var(--ink-l)" }}>{p.desc}</p>
                </div>
                <div style={{ textAlign:"right", flexShrink:0, marginLeft:12 }}>
                  <span style={{ fontFamily:"'Fraunces',serif", fontSize:28, fontWeight:700, color: active ? p.dark : "var(--forest)" }}>${p.price}</span>
                  <span style={{ fontSize:12, color: active ? (p.dark==="var(--cream)"?"rgba(247,243,237,0.7)":"rgba(28,58,47,0.6)") : "var(--ink-ll)" }}>/mo</span>
                </div>
              </div>
              {active && <div style={{ position:"absolute", top:14, right:14, width:22, height:22, borderRadius:"50%", background:"var(--gold)", display:"flex", alignItems:"center", justifyContent:"center" }}><Check size={13} color="var(--forest)"/></div>}
            </button>
          );
        })}
      </div>
      <Btn onClick={()=>onNext({plan:sel})} full size="lg">Continue <ArrowRight size={18}/></Btn>
    </div>
  );
}

// Step 3 — Payment
function OB_Payment({ plan, onNext }) {
  const p = PLANS.find(x=>x.id===plan);
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const fmtCard = v => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const fmtExp  = v => { const d=v.replace(/\D/g,"").slice(0,4); return d.length>2?`${d.slice(0,2)}/${d.slice(2)}`:d; };
  const pay = () => {
    if (!name||!card||!exp||!cvc) return;
    setLoading(true);
    setTimeout(()=>{ setLoading(false); onNext(); }, 1600);
  };
  return (
    <div className="afu" style={s.card(36)}>
      <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:30, fontWeight:700, color:"var(--forest)", marginBottom:6 }}>Payment details</h1>
      <p style={{ color:"var(--ink-l)", fontSize:15, marginBottom:20 }}>7-day free trial, then ${p?.price}/month</p>

      {/* Plan pill */}
      <div style={{ background:"var(--sage-ll)", borderRadius:"var(--r-md)", padding:"12px 16px", marginBottom:24, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <p style={{ fontWeight:700, color:"var(--forest)", fontSize:14 }}>{p?.label} Plan — {p?.cap} child{p?.cap>1?"ren":""}</p>
          <p style={{ fontSize:12, color:"var(--ink-l)" }}>Free for 7 days, then billed monthly</p>
        </div>
        <span style={{ fontFamily:"'Fraunces',serif", fontSize:24, fontWeight:700, color:"var(--forest)" }}>${p?.price}</span>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:24 }}>
        <Field label="Name on card" value={name} onChange={setName} placeholder="Jane Smith"/>
        <Field label="Card number" value={card} onChange={v=>setCard(fmtCard(v))} placeholder="4242 4242 4242 4242"/>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <Field label="Expiry" value={exp} onChange={v=>setExp(fmtExp(v))} placeholder="MM/YY"/>
          <Field label="CVC" value={cvc} onChange={v=>setCvc(v.replace(/\D/g,"").slice(0,3))} placeholder="123"/>
        </div>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:"var(--ink-ll)", marginBottom:20 }}>
        <Shield size={13}/> Secured with 256-bit TLS encryption · No card charges for 7 days
      </div>
      <Btn onClick={pay} full size="lg" disabled={!name||!card||!exp||!cvc||loading}>
        {loading ? <><Spinner/> Processing…</> : <><Check size={18}/> Start Free Trial</>}
      </Btn>
    </div>
  );
}

// Step 4 — Add Children
function OB_Children({ plan, onNext }) {
  const maxKids = PLANS.find(p=>p.id===plan)?.cap ?? 1;
  const blank = () => {
    const first = AVATAR_SETS.playful[0];
    return { name:"", age:"", pin:"", avatar: first.e, avatarBg: first.bg, avatarSet: "auto" };
  };
  const [kids, setKids] = useState([blank()]);
  const [active, setActive] = useState(0);

  const upd = (i, f, v) => { const k=[...kids]; k[i]={...k[i],[f]:v}; setKids(k); };
  const addKid = () => { setKids([...kids, blank()]); setActive(kids.length); };
  const remKid = (i) => { const k=kids.filter((_,j)=>j!==i); setKids(k); setActive(Math.max(0,active-1)); };
  const canGo = kids.every(k=>k.name.trim() && k.age && /^\d{4}$/.test(String(k.pin||"")));

  return (
    <div className="afu" style={s.card(36)}>
      <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:30, fontWeight:700, color:"var(--forest)", marginBottom:6 }}>
        Add your {maxKids>1?"children":"child"}
      </h1>
      <p style={{ color:"var(--ink-l)", fontSize:15, marginBottom:24 }}>Up to {maxKids} profile{maxKids>1?"s":""} on your plan</p>

      {/* Multi-child tab */}
      {kids.length>1 && (
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          {kids.map((k,i) => (
            <button key={i} onClick={()=>setActive(i)} style={{
              flex:1, padding:"10px", borderRadius:"var(--r-md)", fontSize:14, fontWeight:600,
              fontFamily:"'Instrument Sans'", cursor:"pointer", transition:"all .2s", border:"2px solid",
              background: active===i?"var(--forest)":"var(--cream)",
              borderColor: active===i?"var(--forest)":"var(--cream-dd)",
              color: active===i?"var(--cream)":"var(--ink-l)",
            }}>{k.name||`Child ${i+1}`}</button>
          ))}
        </div>
      )}

      {/* Child form */}
      {kids.map((kid, idx) => idx===active && (
        <div key={idx} className="asi" style={{ display:"flex", flexDirection:"column", gap:20 }}>
          {/* Avatar row */}
          <div>
            <label style={s.label}>Avatar</label>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, marginBottom:10, flexWrap:"wrap" }}>
              <div style={{ display:"flex", gap:6, background:"var(--cream)", border:"1px solid var(--cream-dd)", padding:4, borderRadius:"var(--r-full)" }}>
                {[
                  { id:"auto", label:"Auto" },
                  { id:"playful", label:"Playful" },
                  { id:"teen", label:"Older kids" },
                ].map(opt => {
                  const activeOpt = (kid.avatarSet || "auto") === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => upd(idx, "avatarSet", opt.id)}
                      style={{
                        border: "none",
                        cursor: "pointer",
                        padding: "8px 12px",
                        borderRadius: "999px",
                        fontFamily: "'Instrument Sans'",
                        fontSize: 13,
                        fontWeight: 700,
                        background: activeOpt ? "var(--forest)" : "transparent",
                        color: activeOpt ? "var(--cream)" : "var(--ink-l)",
                        transition: "all .15s",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {kid.age && (
                <span style={{ fontSize: 12, color: "var(--ink-ll)" }}>
                  Recommended: <strong style={{ color: "var(--forest)" }}>{parseInt(kid.age) >= 11 ? "Older kids" : "Playful"}</strong>
                </span>
              )}
            </div>

            {(() => {
              const setId = (kid.avatarSet || "auto");
              const list = setId === "playful"
                ? AVATAR_SETS.playful
                : setId === "teen"
                  ? AVATAR_SETS.teen
                  : getAvatarOptions(kid.age);

              return (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:8 }}>
                  {list.map((av, i) => {
                    const selected = kid.avatar === av.e;
                    return (
                      <button
                        key={`${av.e}-${i}`}
                        onClick={()=>{ upd(idx,"avatar",av.e); upd(idx,"avatarBg",av.bg); }}
                        style={{
                          width: "100%",
                          aspectRatio: "1 / 1",
                          borderRadius: 16,
                          fontSize: 22,
                          cursor: "pointer",
                          border: selected ? "2px solid var(--forest)" : "1px solid var(--cream-dd)",
                          background: selected ? av.bg : "var(--white)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: selected ? "0 10px 30px rgba(28,58,47,0.14)" : "none",
                          transform: selected ? "translateY(-1px)" : "translateY(0)",
                          transition: "all .15s",
                        }}
                        onMouseEnter={(e)=>{ e.currentTarget.style.borderColor="var(--forest)"; }}
                        onMouseLeave={(e)=>{ e.currentTarget.style.borderColor=selected ? "var(--forest)" : "var(--cream-dd)"; }}
                      >
                        <span style={{ filter: selected ? "drop-shadow(0 6px 10px rgba(0,0,0,0.12))" : "none" }}>{av.e}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })()}
          </div>

          <Field label="Child's first name" value={kid.name} onChange={v=>upd(idx,"name",v)} placeholder="e.g. Emma" autoFocus/>

          <Field
            label="Child PIN"
            value={kid.pin}
            onChange={v=>upd(idx,"pin",v.replace(/\D/g,"").slice(0,4))}
            placeholder="4 digits"
            hint="Your child will use this PIN to enter their profile"
            error={kid.pin && kid.pin.length > 0 && kid.pin.length < 4 ? "PIN must be 4 digits" : ""}
          />

          {/* Age picker */}
          <div>
            <label style={s.label}>Age</label>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {Array.from({length:15},(_,i)=>i+4).map(age=>(
                <button key={age} onClick={()=>upd(idx,"age",String(age))} style={{
                  width:48, height:44, borderRadius:"var(--r-md)", fontSize:16, fontWeight:700,
                  fontFamily:"'Fraunces',serif", cursor:"pointer", border:"2px solid", transition:"all .15s",
                  background: kid.age===String(age)?"var(--forest)":"var(--cream)",
                  borderColor: kid.age===String(age)?"var(--forest)":"var(--cream-dd)",
                  color: kid.age===String(age)?"var(--cream)":"var(--ink)",
                }}>{age}</button>
              ))}
            </div>
            {kid.age && <p style={{ fontSize:13, color:"var(--forest)", marginTop:8, fontWeight:600 }}>📍 Level {getStartLevel(kid.age)} · {gradeLabel(kid.age)}</p>}
          </div>

          {kids.length>1 && (
            <button onClick={()=>remKid(idx)} style={{ display:"flex", alignItems:"center", gap:6, color:"var(--coral)", background:"none", border:"none", fontSize:13, cursor:"pointer", fontFamily:"'Instrument Sans'" }}>
              <Minus size={14}/> Remove this child
            </button>
          )}
        </div>
      ))}

      {kids.length < maxKids && (
        <button onClick={addKid} style={{
          width:"100%", marginTop:16, padding:14, borderRadius:"var(--r-lg)",
          background:"transparent", border:"2px dashed var(--cream-dd)", cursor:"pointer",
          color:"var(--ink-l)", fontSize:15, fontFamily:"'Instrument Sans'",
          display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"all .2s",
        }} onMouseEnter={e=>e.target.style.borderColor="var(--forest)"} onMouseLeave={e=>e.target.style.borderColor="var(--cream-dd)"}>
          <Plus size={18}/> Add another child
        </button>
      )}

      <div style={{ marginTop:24 }}>
        <Btn onClick={()=>onNext({children:kids})} full size="lg" disabled={!canGo}>Continue <ArrowRight size={18}/></Btn>
      </div>
    </div>
  );
}

// Step 5 — Parent PIN
function OB_Pin({ onNext }) {
  const [pin, setPin] = useState(Array(4).fill(""));
  const [conf, setConf] = useState(false);
  const [cpin, setCpin] = useState(Array(4).fill(""));
  const [err, setErr] = useState("");
  const refs  = [useRef(),useRef(),useRef(),useRef()];
  const crefs = [useRef(),useRef(),useRef(),useRef()];

  const handleDigit = (i, val, arr, setArr, rs) => {
    const d = val.replace(/\D/g,"").slice(0,1);
    const n=[...arr]; n[i]=d; setArr(n);
    if (d && i<3) rs[i+1].current?.focus();
    if (!d && i>0) rs[i-1].current?.focus();
    // auto-submit on last digit
    if (d && i===3) {
      const full = [...n];
      if (conf) {
        setTimeout(()=>{
          if (full.join("") !== pin.join("")) { setErr("PINs don't match — try again"); setCpin(Array(4).fill("")); crefs[0].current?.focus(); }
          else onNext({ pin: full.join("") });
        }, 120);
      } else {
        setTimeout(()=>{ setConf(true); setTimeout(()=>crefs[0].current?.focus(),80); }, 120);
      }
    }
  };

  const PinRow = ({arr, setArr, rs}) => (
    <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
      {arr.map((d,i)=>(
        <input key={i} ref={rs[i]} type="password" inputMode="numeric" maxLength={1} value={d}
          onChange={e=>handleDigit(i,e.target.value,arr,setArr,rs)}
          onKeyDown={e=>{ if(e.key==="Backspace"&&!d&&i>0) rs[i-1].current?.focus(); }}
          style={{ width:60, height:68, textAlign:"center", fontSize:28, fontWeight:700, fontFamily:"'Fraunces',serif",
            background:"var(--cream)", border:`2.5px solid ${d?"var(--forest)":"var(--cream-dd)"}`,
            borderRadius:"var(--r-lg)", outline:"none", transition:"border-color .2s", color:"var(--forest)" }}
          onFocus={e=>e.target.style.borderColor="var(--forest)"}
          onBlur={e=>e.target.style.borderColor=d?"var(--forest)":"var(--cream-dd)"}
        />
      ))}
    </div>
  );

  return (
    <div className="afu" style={{...s.card(36), textAlign:"center"}}>
      <div style={{ width:64, height:64, background:"var(--sage-ll)", borderRadius:20, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
        <Lock size={28} color="var(--forest)"/>
      </div>
      <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:28, fontWeight:700, color:"var(--forest)", marginBottom:8 }}>
        {conf ? "Confirm your PIN" : "Set a parent PIN"}
      </h1>
      <p style={{ color:"var(--ink-l)", fontSize:15, marginBottom:36 }}>
        {conf ? "Re-enter the same 4-digit PIN" : "Protects the parent dashboard from curious kids 🙈"}
      </p>
      <PinRow arr={conf?cpin:pin} setArr={conf?setCpin:setPin} rs={conf?crefs:refs}/>
      {err && <p style={{ color:"var(--coral)", fontSize:14, marginTop:12 }}>{err}</p>}
      {conf && <button onClick={()=>{setConf(false);setCpin(Array(4).fill(""));setErr("");}} style={{ marginTop:16, color:"var(--ink-l)", background:"none", border:"none", fontSize:14, cursor:"pointer", fontFamily:"'Instrument Sans'" }}>← Use different PIN</button>}
    </div>
  );
}

// Step 6 — Confirmation
function OB_Done({ data, onStart }) {
  return (
    <div className="sci" style={{...s.card(36), textAlign:"center"}}>
      <div className="pop" style={{ fontSize:72, marginBottom:8 }}>🎉</div>
      <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:32, fontWeight:700, color:"var(--forest)", marginBottom:8 }}>
        You're all set!
      </h1>
      <p style={{ color:"var(--ink-l)", fontSize:15, marginBottom:28 }}>
        Ready for {data.children?.length>1?"your children":"your child"} to start learning
      </p>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:32 }}>
        {(data.children||[]).map((c,i)=>(
          <div key={i} className={`afu d${i+1}`} style={{ display:"flex", alignItems:"center", gap:14, background:"var(--cream)", borderRadius:"var(--r-lg)", padding:"14px 18px" }}>
            <div style={{ width:48,height:48, background:c.avatarBg, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{c.avatar}</div>
            <div style={{ textAlign:"left", flex:1 }}>
              <p style={{ fontWeight:700, fontSize:16, color:"var(--ink)" }}>{c.name}</p>
              <p style={{ fontSize:13, color:"var(--ink-l)" }}>Age {c.age} · {gradeLabel(c.age)} · Level {getStartLevel(c.age)}</p>
            </div>
            <Tag color="sage">Ready!</Tag>
          </div>
        ))}
      </div>
      <Btn onClick={onStart} full size="lg" v="gold"><Play size={20}/> Start Learning Now</Btn>
    </div>
  );
}

// Onboarding wrapper
export function OnboardingFlow({ onComplete }) {
  const STEPS = 6;
  const [step, setStep] = useState(0);
  const [d, setD] = useState({});
  const merge = (extra, next) => { setD(prev=>({...prev,...extra})); setStep(next); };

  return (
    <Shell>
      <StepDots total={STEPS} current={step}/>
      {step===0 && <OB_Account onNext={v=>merge(v,1)}/>}
      {step===1 && <OB_Plan onNext={v=>merge(v,2)}/>}
      {step===2 && <OB_Payment plan={d.plan} onNext={()=>merge({},3)}/>}
      {step===3 && <OB_Children plan={d.plan} onNext={v=>merge(v,4)}/>}
      {step===4 && <OB_Pin onNext={v=>merge(v,5)}/>}
      {step===5 && <OB_Done data={d} onStart={()=>onComplete(d)}/>}
      {step>0 && step<5 && (
        <button onClick={()=>setStep(step-1)} style={{ display:"flex", alignItems:"center", gap:6, margin:"16px auto 0", color:"var(--ink-l)", background:"none", border:"none", fontSize:14, cursor:"pointer", fontFamily:"'Instrument Sans'" }}>
          <ChevronLeft size={16}/> Back
        </button>
      )}
    </Shell>
  );
}

// ─────────────────────────────────────────────────────────────
// ② LOGIN — Netflix-style profile select
// ─────────────────────────────────────────────────────────────
export function LoginScreen({ onParentLogin, onChildEnter }) {
  const [view, setView] = useState("profiles"); // profiles | parent_pin | forgot_pin | child_pin
  const [selChild, setSelChild] = useState(null);
  const [parentPin, setParentPin] = useState("");
  const [parentPinErr, setParentPinErr] = useState("");
  const [failedParentPinAttempts, setFailedParentPinAttempts] = useState(0);
  const [resetEmail, setResetEmail] = useState("");
  const [resetStatus, setResetStatus] = useState("");
  const [childPin, setChildPin] = useState("");
  const [childPinErr, setChildPinErr] = useState("");
  const app = getApp();

  const doParentLogin = () => {
    const pin = String(parentPin || "").replace(/\D/g, "").slice(0, 4);
    if (pin.length !== 4) { setParentPinErr("Enter your 4-digit PIN"); return; }
    if (pin === app?.parent?.pin) { onParentLogin(); }
    else {
      setFailedParentPinAttempts((n) => n + 1);
      setParentPinErr("Incorrect PIN");
    }
  };

  const doSendPinReset = () => {
    const email = (resetEmail || "").trim().toLowerCase();
    const parentEmail = String(app?.parent?.email || "").trim().toLowerCase();
    if (!email || !email.includes("@")) { setResetStatus("Enter a valid email address"); return; }
    if (email !== parentEmail) { setResetStatus("That email doesn’t match this account"); return; }
    setResetStatus(`If an account exists for ${email}, you'll receive a PIN reset email shortly.`);
  };

  const doChildEnter = () => {
    if (!selChild) return;
    const pin = String(childPin || "").replace(/\D/g, "").slice(0, 4);
    if (pin.length !== 4) { setChildPinErr("Enter your 4-digit PIN"); return; }
    const childRecord = app?.children?.find(c => c.id === selChild.id);
    if (pin === childRecord?.pin) { onChildEnter(selChild); }
    else { setChildPinErr("Incorrect PIN"); }
  };

  // ── Parent PIN screen
  if (view === "parent_pin") return (
    <Shell bg="var(--forest)">
      <div className="sci" style={{...s.card(36)}}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
          <div style={{ width:56,height:56, background:"var(--sage-ll)", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Shield size={28} color="var(--forest)"/>
          </div>
          <div>
            <p style={{ fontFamily:"'Fraunces',serif", fontSize:20, fontWeight:700, color:"var(--forest)" }}>Parent Login</p>
            <p style={{ fontSize:13, color:"var(--ink-l)" }}>{app?.parent?.email}</p>
          </div>
        </div>
        <div style={{ marginBottom:20 }}>
          <Field
            label="Parent PIN"
            type="password"
            value={parentPin}
            onChange={v=>{ setParentPin(v.replace(/\D/g,"").slice(0,4)); setParentPinErr(""); }}
            error={parentPinErr}
            placeholder="4 digits"
            autoFocus
            onKeyDown={e=>e.key==="Enter"&&doParentLogin()}
          />
        </div>
        <Btn onClick={doParentLogin} full size="lg">Enter Dashboard <ChevronRight size={18}/></Btn>
        {failedParentPinAttempts >= 3 && (
          <button
            onClick={() => { setView("forgot_pin"); setResetEmail(app?.parent?.email || ""); setResetStatus(""); }}
            style={{ display:"block", margin:"12px auto 0", color:"var(--forest)", background:"none", border:"none", fontSize:14, cursor:"pointer", fontFamily:"'Instrument Sans'", fontWeight:700, textDecoration:"underline" }}
          >
            Forgot PIN?
          </button>
        )}
        <button onClick={()=>{setView("profiles");setParentPin("");setParentPinErr("");setFailedParentPinAttempts(0);}} style={{ display:"block", margin:"14px auto 0", color:"var(--ink-l)", background:"none", border:"none", fontSize:14, cursor:"pointer", fontFamily:"'Instrument Sans'" }}>← Back to profiles</button>
      </div>
    </Shell>
  );

  // ── Forgot PIN (email reset)
  if (view === "forgot_pin") return (
    <Shell bg="var(--forest)">
      <div className="sci" style={{...s.card(36)}}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
          <div style={{ width:56,height:56, background:"var(--gold-ll)", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Mail size={26} color="var(--forest)"/>
          </div>
          <div>
            <p style={{ fontFamily:"'Fraunces',serif", fontSize:20, fontWeight:700, color:"var(--forest)" }}>Reset Parent PIN</p>
            <p style={{ fontSize:13, color:"var(--ink-l)" }}>We’ll email a reset link to your account email.</p>
          </div>
        </div>
        <div style={{ marginBottom:16 }}>
          <Field
            label="Email"
            type="email"
            value={resetEmail}
            onChange={(v)=>{ setResetEmail(v); setResetStatus(""); }}
            placeholder="you@email.com"
            icon={<Mail size={16}/>}
            onKeyDown={(e)=>e.key==="Enter"&&doSendPinReset()}
          />
        </div>
        {resetStatus && (
          <div style={{ background:"var(--cream)", border:"2px solid var(--cream-dd)", borderRadius:"var(--r-md)", padding:"12px 14px", color:"var(--ink-l)", fontSize:13, marginBottom:14 }}>
            {resetStatus}
          </div>
        )}
        <Btn onClick={doSendPinReset} full size="lg" v="primary">Send reset email <ArrowRight size={18}/></Btn>
        <button onClick={()=>{ setView("parent_pin"); setResetStatus(""); }} style={{ display:"block", margin:"14px auto 0", color:"var(--ink-l)", background:"none", border:"none", fontSize:14, cursor:"pointer", fontFamily:"'Instrument Sans'" }}>← Back</button>
      </div>
    </Shell>
  );

  // ── Child PIN
  if (view === "child_pin" && selChild) return (
    <div style={{ minHeight:"100vh", background:"var(--forest)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div className="sci" style={{ maxWidth:360, width:"100%", textAlign:"center" }}>
        <div className="float" style={{ width:100,height:100, background:selChild.avatarBg, borderRadius:28, display:"flex", alignItems:"center", justifyContent:"center", fontSize:52, margin:"0 auto 20px", boxShadow:`0 12px 40px ${selChild.avatarBg}60` }}>{selChild.avatar}</div>
        <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:28, fontWeight:700, color:"var(--cream)", marginBottom:8 }}>
          Hi, {selChild.name}! 👋
        </h2>
        <p style={{ color:"var(--sage)", fontSize:15, marginBottom:18 }}>Enter your 4-digit PIN to start</p>
        <div style={{ marginBottom:12 }}>
          <Field
            label="PIN"
            type="password"
            value={childPin}
            onChange={(v)=>{ setChildPin(v.replace(/\D/g,"").slice(0,4)); setChildPinErr(""); }}
            error={childPinErr}
            placeholder="4 digits"
            autoFocus
            onKeyDown={(e)=>e.key==="Enter"&&doChildEnter()}
          />
        </div>
        <Btn onClick={doChildEnter} full size="lg" v="gold"><Play size={22}/> Let's Go!</Btn>
        <button onClick={()=>{setView("profiles");setSelChild(null);setChildPin("");setChildPinErr("");}} style={{ display:"block", margin:"16px auto 0", color:"var(--sage)", background:"none", border:"none", fontSize:14, cursor:"pointer", fontFamily:"'Instrument Sans'" }}>← Switch profile</button>
      </div>
    </div>
  );

  // ── Profile picker
  return (
    <div style={{ minHeight:"100vh", background:"var(--forest)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div className="afu" style={{ textAlign:"center", marginBottom:40 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center", marginBottom:12 }}>
          <div style={{ width:40,height:40, background:"var(--gold)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Brain size={22} color="var(--forest)"/>
          </div>
          <span style={{ fontFamily:"'Fraunces',serif", fontSize:22, fontWeight:700, color:"var(--cream)" }}>e-Skillora</span>
        </div>
        <p style={{ color:"var(--sage)", fontSize:18, fontFamily:"'Fraunces',serif", fontStyle:"italic" }}>Who's learning today?</p>
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:24, justifyContent:"center", maxWidth:600 }}>
        {/* Children */}
        {app?.children?.map((child, i) => (
          <button key={child.id} className={`afu d${i+1}`} onClick={()=>{ setSelChild(child); setChildPin(""); setChildPinErr(""); setView("child_pin"); }} style={{
            display:"flex", flexDirection:"column", alignItems:"center", gap:12,
            background:"none", border:"none", cursor:"pointer", padding:8,
          }}>
            <div style={{
              width:100, height:100, background:child.avatarBg, borderRadius:26,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:50,
              boxShadow:`0 8px 30px ${child.avatarBg}50`, border:"3px solid transparent",
              transition:"all .2s",
            }} onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.07)"; e.currentTarget.style.border="3px solid var(--gold)"; }}
               onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.border="3px solid transparent"; }}>
              {child.avatar}
            </div>
            <p style={{ color:"var(--cream)", fontSize:16, fontWeight:600, fontFamily:"'Instrument Sans'" }}>{child.name}</p>
            <p style={{ color:"var(--sage)", fontSize:13 }}>Age {child.age}</p>
          </button>
        ))}

        {/* Parent */}
        <button className="afu d3" onClick={()=>{ setParentPin(""); setParentPinErr(""); setFailedParentPinAttempts(0); setView("parent_pin"); }} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, background:"none", border:"none", cursor:"pointer", padding:8 }}>
          <div style={{
            width:100, height:100, background:"rgba(255,255,255,0.07)", borderRadius:26,
            display:"flex", alignItems:"center", justifyContent:"center",
            border:"3px solid rgba(255,255,255,0.12)", transition:"all .2s",
          }} onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.07)"; e.currentTarget.style.border="3px solid var(--gold)"; }}
             onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.border="3px solid rgba(255,255,255,0.12)"; }}>
            <Shield size={42} color="var(--sage)"/>
          </div>
          <p style={{ color:"var(--cream)", fontSize:16, fontWeight:600, fontFamily:"'Instrument Sans'" }}>Parent</p>
          <p style={{ color:"var(--sage)", fontSize:13 }}>Dashboard</p>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ③ PARENT DASHBOARD
// ─────────────────────────────────────────────────────────────
export function ParentDashboard({ onLogout, onSwitchToChild }) {
  const [app, setAppLocal] = useState(() => getApp());
  const [tab, setTab] = useState("overview");
  const refresh = () => { const d=getApp(); setAppLocal(d); };

  const TABS = [
    { id:"overview",   icon:<BarChart3 size={16}/>, label:"Overview" },
    { id:"children",   icon:<Users size={16}/>,     label:"Children" },
    { id:"plan",       icon:<CreditCard size={16}/>, label:"Plan"    },
    { id:"settings",   icon:<Settings size={16}/>,  label:"Settings" },
  ];

  const planData  = PLANS.find(p=>p.id===app?.parent?.plan) || PLANS[1];
  const trialLeft = Math.max(0, Math.ceil((app?.parent?.trialEnd - Date.now()) / 86400000));

  // Per-child stats
  const childStats = (child) => {
    const prog = LS.get(`skillora-progress-${child.name}`, null);
    if (!prog) return { days:0, questions:0, accuracy:0, level: child.level||"A" };
    const days = Object.keys(prog.completedDays||{}).length;
    const totalQ  = Object.values(prog.completedDays||{}).reduce((s,v)=>s+v.total,0);
    const totalC  = Object.values(prog.completedDays||{}).reduce((s,v)=>s+v.correct,0);
    return { days, questions: totalQ, accuracy: totalQ>0?Math.round(totalC/totalQ*100):0, level: prog.currentLevel||child.level||"A" };
  };

  return (
    <div style={{ minHeight:"100vh", background:"var(--cream)", fontFamily:"'Instrument Sans'" }}>
      {/* Top bar */}
      <div style={{ background:"var(--forest)", padding:"0 24px", position:"sticky", top:0, zIndex:50 }}>
        <div style={{ maxWidth:920, margin:"0 auto", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <Brain size={22} color="var(--gold)"/>
            <span style={{ fontFamily:"'Fraunces',serif", fontSize:18, fontWeight:700, color:"var(--cream)" }}>e-Skillora</span>
            <Tag color="gold">Parent</Tag>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ color:"var(--sage)", fontSize:13 }}>{app?.parent?.email}</span>
            <button onClick={onLogout} style={{ display:"flex", alignItems:"center", gap:6, color:"var(--sage)", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"var(--r-md)", padding:"7px 14px", fontSize:13, cursor:"pointer", fontFamily:"'Instrument Sans'" }}>
              <LogOut size={14}/> Sign out
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:920, margin:"0 auto", padding:"32px 24px" }}>
        {/* Tab bar */}
        <div style={{ display:"flex", gap:4, background:"var(--white)", borderRadius:"var(--r-lg)", padding:5, marginBottom:28, boxShadow:"var(--shadow)", width:"fit-content" }}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              display:"flex", alignItems:"center", gap:7, padding:"9px 20px", borderRadius:"var(--r-md)",
              fontSize:14, fontWeight:600, fontFamily:"'Instrument Sans'", cursor:"pointer", border:"none", transition:"all .2s",
              background: tab===t.id?"var(--forest)":"transparent",
              color: tab===t.id?"var(--cream)":"var(--ink-l)",
            }}>{t.icon} {t.label}</button>
          ))}
        </div>

        {/* OVERVIEW */}
        {tab==="overview" && (
          <div className="afu">
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:28, fontWeight:700, color:"var(--forest)", marginBottom:4 }}>
              Good {new Date().getHours()<12?"morning":"afternoon"}! 👋
            </h2>
            <p style={{ color:"var(--ink-l)", fontSize:15, marginBottom:24 }}>Here's how your {app?.children?.length===1?"child is":"children are"} doing</p>

            {/* Trial banner */}
            {trialLeft > 0 && (
              <div style={{ background:"var(--gold-ll)", border:"2px solid var(--gold)", borderRadius:"var(--r-lg)", padding:"14px 20px", marginBottom:24, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <Clock size={18} color="var(--forest)"/>
                  <p style={{ fontWeight:600, color:"var(--forest)", fontSize:15 }}>Free trial: {trialLeft} day{trialLeft!==1?"s":""} remaining</p>
                </div>
                <button style={{ fontSize:13, fontWeight:700, color:"var(--forest)", background:"none", border:"none", cursor:"pointer", textDecoration:"underline" }}>Upgrade now</button>
              </div>
            )}

            {/* Child cards */}
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {app?.children?.map(child=>{
                const st = childStats(child);
                return (
                  <div key={child.id} style={{ background:"var(--white)", borderRadius:"var(--r-xl)", boxShadow:"var(--shadow)", padding:24 }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                        <div style={{ width:56,height:56, background:child.avatarBg, borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>{child.avatar}</div>
                        <div>
                          <p style={{ fontFamily:"'Fraunces',serif", fontSize:20, fontWeight:700, color:"var(--forest)" }}>{child.name}</p>
                          <p style={{ fontSize:13, color:"var(--ink-l)" }}>Age {child.age} · Level {st.level} · {gradeLabel(child.age)}</p>
                        </div>
                      </div>
                      <Btn onClick={()=>onSwitchToChild(child)} v="sage" size="sm">Switch to {child.name} <ChevronRight size={14}/></Btn>
                    </div>

                    {/* Stats row */}
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginTop:20 }}>
                      {[
                        { icon:"📅", label:"Days done",  val:st.days, color:"var(--forest)" },
                        { icon:"🎯", label:"Accuracy",    val:`${st.accuracy}%`, color: st.accuracy>=80?"var(--forest)":st.accuracy>=60?"var(--gold)":"var(--coral)" },
                        { icon:"📝", label:"Questions",   val:st.questions.toLocaleString(), color:"var(--forest)" },
                        { icon:"⭐", label:"Level",       val:st.level, color:"var(--gold)" },
                      ].map((s2,i)=>(
                        <div key={i} style={{ background:"var(--cream)", borderRadius:"var(--r-md)", padding:"14px 12px", textAlign:"center" }}>
                          <p style={{ fontSize:22, marginBottom:2 }}>{s2.icon}</p>
                          <p style={{ fontFamily:"'Fraunces',serif", fontSize:22, fontWeight:700, color:s2.color }}>{s2.val}</p>
                          <p style={{ fontSize:11, color:"var(--ink-ll)" }}>{s2.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Level progress bar */}
                    {st.days > 0 && (
                      <div style={{ marginTop:16 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                          <span style={{ fontSize:12, color:"var(--ink-l)" }}>Level {st.level} progress</span>
                          <span style={{ fontSize:12, fontWeight:600, color:"var(--forest)" }}>{st.days}/60 days</span>
                        </div>
                        <div style={{ height:8, background:"var(--cream-dd)", borderRadius:4 }}>
                          <div style={{ height:8, borderRadius:4, background:"var(--forest)", transition:"width .5s", width:`${Math.min(100,(st.days/60)*100)}%` }}/>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CHILDREN */}
        {tab==="children" && (
          <div className="afu">
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:28, fontWeight:700, color:"var(--forest)" }}>Children</h2>
              {(app?.children?.length||0) < planData.cap && (
                <Btn v="primary" size="sm"><Plus size={16}/> Add child</Btn>
              )}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {app?.children?.map(child=>(
                <div key={child.id} style={{ background:"var(--white)", borderRadius:"var(--r-xl)", boxShadow:"var(--shadow)", padding:22, display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{ width:60,height:60, background:child.avatarBg, borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, flexShrink:0 }}>{child.avatar}</div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontFamily:"'Fraunces',serif", fontSize:18, fontWeight:700, color:"var(--forest)" }}>{child.name}</p>
                    <p style={{ fontSize:14, color:"var(--ink-l)" }}>Age {child.age} · {gradeLabel(child.age)} · Level {getStartLevel(child.age)}</p>
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <Btn v="sage" size="sm"><Edit2 size={14}/> Edit</Btn>
                    <Btn v="danger" size="sm"><Trash2 size={14}/></Btn>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLAN */}
        {tab==="plan" && (
          <div className="afu">
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:28, fontWeight:700, color:"var(--forest)", marginBottom:20 }}>Your Subscription</h2>
            <div style={{ background:"var(--forest)", borderRadius:"var(--r-xl)", padding:28, marginBottom:20, color:"var(--cream)" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                <div>
                  <p style={{ fontSize:13, color:"var(--sage)" }}>Current plan</p>
                  <p style={{ fontFamily:"'Fraunces',serif", fontSize:30, fontWeight:700, color:"var(--gold)" }}>{planData.label}</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ fontFamily:"'Fraunces',serif", fontSize:36, fontWeight:700, color:"var(--cream)" }}>${planData.price}</p>
                  <p style={{ color:"var(--sage)", fontSize:13 }}>per month</p>
                </div>
              </div>
              <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:16 }}>
                {["All 12 math levels","Daily 50-question worksheets",`Up to ${planData.cap} child account${planData.cap>1?"s":""}`,planData.id==="pro"?"Detailed analytics":"Progress tracking"].map((f,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                    <Check size={15} color="var(--gold)"/> <span style={{ fontSize:14, color:"var(--cream)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", gap:12 }}>
              <Btn full v="primary">Upgrade Plan</Btn>
              <Btn full v="outline">Cancel</Btn>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {tab==="settings" && (
          <div className="afu">
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:28, fontWeight:700, color:"var(--forest)", marginBottom:20 }}>Settings</h2>
            {[
              { label:"Email address", val:app?.parent?.email, action:"Change" },
              { label:"Password",      val:"••••••••••",       action:"Update" },
              { label:"Parent PIN",    val:"• • • •",          action:"Change PIN" },
              { label:"Notifications", val:"Weekly progress reports", action:"Configure" },
            ].map(row=>(
              <div key={row.label} style={{ background:"var(--white)", borderRadius:"var(--r-lg)", boxShadow:"var(--shadow)", padding:"18px 22px", marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <p style={{ fontSize:12, color:"var(--ink-ll)", marginBottom:2 }}>{row.label}</p>
                  <p style={{ fontSize:15, fontWeight:500, color:"var(--ink)" }}>{row.val}</p>
                </div>
                <button style={{ color:"var(--forest)", background:"none", border:"none", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Instrument Sans'" }}>{row.action}</button>
              </div>
            ))}
            <div style={{ marginTop:24 }}>
              <Btn v="danger" full onClick={onLogout}><LogOut size={16}/> Sign Out</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ④ CHILD PLACEMENT QUIZ (5–8 questions)
// ─────────────────────────────────────────────────────────────
export function ChildPlacement({ child, onComplete }) {
  const N = 8;
  // We need LEVEL_ORDER and generateLevelQuestions from the engine below
  // They'll be available in the same file scope
  const startLvl = getStartLevel(parseInt(child.age));
  const [questions] = useState(()=>{
    const lo = typeof LEVEL_ORDER!=="undefined" ? LEVEL_ORDER : ["A","B","C","D","E","F","G","H","I","J","K","L"];
    const idx = lo.indexOf(startLvl);
    const levels = [lo[Math.max(0,idx-1)], startLvl, lo[Math.min(lo.length-1,idx+1)]];
    const pool = [];
    levels.forEach(lv => {
      const qs = typeof generateLevelQuestions==="function" ? generateLevelQuestions(lv) : [];
      pool.push(...qs.slice(0,4));
    });
    return typeof shuffle==="function" ? shuffle(pool).slice(0,N) : pool.slice(0,N);
  });
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);

  const submit = (ans) => {
    const a = [...answers, ans];
    if (cur+1>=questions.length) { setAnswers(a); setDone(true); }
    else { setAnswers(a); setCur(cur+1); setInput(""); }
  };

  if (done) {
    const lo = typeof LEVEL_ORDER!=="undefined"?LEVEL_ORDER:["A","B","C","D","E","F","G","H","I","J","K","L"];
    const correct = questions.filter((q,i)=>typeof isCorrect==="function"&&isCorrect(answers[i],q.answer)||answers[i]===q.answer).length;
    const pct = correct/questions.length;
    const idx = lo.indexOf(startLvl);
    const assigned = pct>=0.8 ? lo[Math.min(idx+1,lo.length-1)] : pct>=0.5 ? startLvl : lo[Math.max(idx-1,0)];
    const lInfo = typeof LEVEL_MAP!=="undefined" ? LEVEL_MAP[assigned] : { grade:"Math" };
    return (
      <div style={{ minHeight:"100vh", background:"var(--forest)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
        <div className="sci" style={{ maxWidth:420, width:"100%" }}>
          <div style={{...s.card(36), textAlign:"center"}}>
            <div className="pop" style={{ fontSize:72, marginBottom:4 }}>🎯</div>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:28, fontWeight:700, color:"var(--forest)", marginBottom:8 }}>Great job, {child.name}!</h2>
            <p style={{ color:"var(--ink-l)", fontSize:15, marginBottom:24 }}>We found your perfect starting level!</p>
            <div style={{ background:"var(--sage-ll)", borderRadius:"var(--r-lg)", padding:"20px 28px", marginBottom:28 }}>
              <p style={{ fontSize:13, color:"var(--ink-l)", marginBottom:4 }}>Your starting level</p>
              <p style={{ fontFamily:"'Fraunces',serif", fontSize:48, fontWeight:800, color:"var(--forest)" }}>Level {assigned}</p>
              <p style={{ fontSize:15, color:"var(--forest)", fontWeight:600 }}>{lInfo?.grade||""}</p>
            </div>
            <Btn onClick={()=>onComplete(assigned)} full size="lg" v="gold"><Play size={20}/> Start Learning! 🚀</Btn>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[cur] || {};
  return (
    <div style={{ minHeight:"100vh", background:"var(--forest)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ maxWidth:480, width:"100%" }}>
        {/* Header */}
        <div className="afu" style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center", marginBottom:12 }}>
            <div style={{ width:44,height:44, background:child.avatarBg, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{child.avatar}</div>
            <p style={{ color:"var(--cream)", fontFamily:"'Fraunces',serif", fontSize:18, fontWeight:600 }}>Quick check-in, {child.name}!</p>
          </div>
          <p style={{ color:"var(--sage)", fontSize:14 }}>This helps us find your perfect level</p>
          {/* Progress dots */}
          <div style={{ display:"flex", gap:6, justifyContent:"center", marginTop:16 }}>
            {questions.map((_,i)=>(
              <div key={i} style={{ width:28, height:5, borderRadius:3, transition:"background .3s",
                background: i<cur?"var(--gold)": i===cur?"var(--cream)":"rgba(255,255,255,0.2)" }}/>
            ))}
          </div>
        </div>

        <div className="sci" style={s.card(28)}>
          <p style={{ fontSize:13, color:"var(--ink-ll)", marginBottom:4 }}>Question {cur+1} of {questions.length}</p>
          <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:22, fontWeight:700, color:"var(--forest)", marginBottom:24 }}>{q.question}</h2>
          {q.type==="multiple" ? (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {(q.options||[]).map((opt,i)=>(
                <button key={i} onClick={()=>submit(opt)} style={{
                  padding:"15px 20px", borderRadius:"var(--r-md)", textAlign:"left", fontSize:16, fontWeight:500,
                  background:"var(--cream)", border:"2px solid var(--cream-dd)", cursor:"pointer",
                  fontFamily:"'Instrument Sans'", color:"var(--ink)", transition:"all .15s",
                }} onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--forest)";e.currentTarget.style.background="var(--sage-ll)";}}
                   onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--cream-dd)";e.currentTarget.style.background="var(--cream)";}}>
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <input type="text" value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"&&input.trim())submit(input.trim());}} autoFocus placeholder="Type your answer…"
                style={{...s.input(), fontSize:22, fontFamily:"'Fraunces',serif", fontWeight:700 }}
                onFocus={e=>e.target.style.borderColor="var(--forest)"} onBlur={e=>e.target.style.borderColor="var(--cream-dd)"}/>
              <Btn onClick={()=>{if(input.trim())submit(input.trim());}} full disabled={!input.trim()}>Next <ArrowRight size={16}/></Btn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ⑤ CHILD CELEBRATION
// ─────────────────────────────────────────────────────────────
export function CelebrationOverlay({ score, total, wrongCount, onContinue }) {
  const pct = Math.round(score/total*100);
  const stars = pct>=90?3:pct>=70?2:1;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(28,58,47,0.97)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:24, animation:"fadeIn .3s ease" }}>
      <div className="sci" style={{ maxWidth:400, width:"100%", textAlign:"center" }}>
        <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:20 }}>
          {[1,2,3].map(s2=>(
            <span key={s2} className="pop" style={{ fontSize:56, animationDelay:`${s2*0.1}s`, opacity:0,
              filter: s2<=stars?"drop-shadow(0 0 14px gold)":"grayscale(1) opacity(.25)" }}>⭐</span>
          ))}
        </div>
        <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:32, fontWeight:800, color:"var(--cream)", marginBottom:8 }}>
          {pct>=90?"Perfect! 🏆":pct>=70?"Great Job! 🎉":"Nice Try! 💪"}
        </h2>
        <p style={{ color:"var(--sage)", fontSize:16, marginBottom:24 }}>
          {pct>=90?"You crushed it! Amazing work!":pct>=70?"You're getting stronger every day!":"Keep going — practice makes perfect!"}
        </p>
        <div style={{ background:"rgba(255,255,255,0.07)", borderRadius:"var(--r-xl)", padding:"24px 32px", marginBottom:28 }}>
          <p style={{ fontFamily:"'Fraunces',serif", fontSize:52, fontWeight:800, color: pct>=80?"var(--gold)":pct>=60?"#E5B96A":"var(--coral)" }}>{pct}%</p>
          <p style={{ color:"var(--sage)", fontSize:15 }}>{score} out of {total} correct</p>
          {wrongCount>0 && <p style={{ color:"rgba(255,255,255,0.5)", fontSize:13, marginTop:6 }}>📌 {wrongCount} question{wrongCount!==1?"s":""} will repeat tomorrow</p>}
        </div>
        <Btn onClick={onContinue} full size="lg" v="gold"><ArrowRight size={18}/> Continue</Btn>
      </div>
    </div>
  );
}

const LEVEL_ORDER = ["A","B","C","D","E","F","G","H","I","J","K","L"];

const LEVEL_MAP = {
  A:{ grade:"Pre-K / Kindergarten", ageRange:"4–6", color:"#e74c3c",
      themes:["Counting 1-20","Number Recognition","Comparing Quantities","Basic Shapes","Patterns","Sorting","Ordinal Numbers","Simple Addition","Simple Subtraction"] },
  B:{ grade:"Grade 1", ageRange:"6–7", color:"#e67e22",
      themes:["Counting to 100","Place Value Tens & Ones","Addition Facts to 20","Subtraction Facts to 20","Skip Counting","Comparing Numbers","Time","Basic Fractions","Shapes","Word Problems"] },
  C:{ grade:"Grade 2", ageRange:"7–8", color:"#f39c12",
      themes:["Place Value to 1000","Addition with Regrouping","Subtraction with Borrowing","Intro Multiplication","Even and Odd","Money","Measurement","Time to Minute","Fractions","Two-Step Word Problems"] },
  D:{ grade:"Grade 3", ageRange:"8–9", color:"#27ae60",
      themes:["Multiplication Tables","Division Basics","Fractions","Equivalent Fractions","Area and Perimeter","Rounding","Word Problems","Graphs","Mass and Volume"] },
  E:{ grade:"Grade 4", ageRange:"9–10", color:"#2ecc71",
      themes:["Multi-Digit Multiplication","Long Division","Factors and Multiples","Prime and Composite","Fraction Operations","Decimals","Angles","Area of Complex Shapes"] },
  F:{ grade:"Grade 5", ageRange:"10–11", color:"#1abc9c",
      themes:["Multiply Fractions","Divide Fractions","Decimal Operations","Powers of 10","Order of Operations","Coordinate Plane","Volume","Negative Numbers"] },
  G:{ grade:"Grade 6", ageRange:"11–12", color:"#3498db",
      themes:["Ratios and Rates","Percent","Dividing Fractions","Absolute Value","Expressions","One-Step Equations","Area of Polygons","Statistics"] },
  H:{ grade:"Grade 7", ageRange:"12–13", color:"#2980b9",
      themes:["Proportional Relationships","Percent Change","Rational Numbers","Two-Step Equations","Inequalities","Circles","Probability","Scale Drawings"] },
  I:{ grade:"Grade 8 / Pre-Algebra", ageRange:"13–14", color:"#8e44ad",
      themes:["Multi-Step Equations","Systems of Equations","Slope","Slope-Intercept Form","Scientific Notation","Pythagorean Theorem","Functions","Transformations"] },
  J:{ grade:"Algebra I", ageRange:"14–15", color:"#9b59b6",
      themes:["Linear Equations","Graphing Lines","Systems","Polynomials","Factoring","Quadratics","Quadratic Formula","Exponential Functions"] },
  K:{ grade:"Geometry", ageRange:"15–16", color:"#c0392b",
      themes:["Proofs","Parallel Lines","Triangle Congruence","Triangle Similarity","Special Right Triangles","Trig Ratios","Circle Theorems","Volume and Surface Area"] },
  L:{ grade:"Algebra II / Pre-Calculus", ageRange:"16–18", color:"#16a085",
      themes:["Polynomial Functions","Rational Functions","Logarithms","Exponential Equations","Sequences and Series","Trig Functions","Trig Identities","Matrices","Combinatorics"] },
};

// ─────────────────────────────────────────────────────────────
// 2. CONCEPT EXAMPLES (shown before first worksheet per theme)
// ─────────────────────────────────────────────────────────────
const EXAMPLES = {
  "Counting 1-20": {
    title: "How to Count Objects",
    intro: "Counting means saying one number for each object. The last number you say tells you how many there are.",
    steps: ["Point to the first object and say '1'","Point to the next and say '2'","Keep going until every object has a number","The last number = how many total"],
    worked: [
      { problem:"Count: 🍎🍎🍎🍎", solution:"Touch each apple: 1…2…3…4. Answer = 4" },
      { problem:"Count: ⭐⭐⭐", solution:"1…2…3. Answer = 3" },
    ]
  },
  "Simple Addition": {
    title: "How to Add Numbers",
    intro: "Addition means putting two groups together to find the total.",
    steps: ["Start with the bigger number","Count on by the smaller number","Example: 3 + 2 → start at 3, count 4, 5 → Answer = 5","Tip: use your fingers to count on!"],
    worked: [
      { problem:"2 + 3 = ?", solution:"Start at 2. Count on 3 more: 3, 4, 5. Answer = 5" },
      { problem:"4 + 1 = ?", solution:"Start at 4. Count on 1 more: 5. Answer = 5" },
    ]
  },
  "Simple Subtraction": {
    title: "How to Subtract",
    intro: "Subtraction means taking away from a group.",
    steps: ["Start with the big number","Count backwards by the small number","Example: 5 − 2 → start at 5, go back: 4, 3 → Answer = 3"],
    worked: [
      { problem:"5 − 2 = ?", solution:"Start at 5. Count back 2: 4, 3. Answer = 3" },
      { problem:"4 − 1 = ?", solution:"Start at 4. Count back 1: 3. Answer = 3" },
    ]
  },
  "Place Value Tens & Ones": {
    title: "Place Value: Tens and Ones",
    intro: "Every 2-digit number has a TENS place and an ONES place.",
    steps: ["The ONES digit is on the right","The TENS digit is one step to the left","37 = 3 tens + 7 ones = 30 + 7","Think of tens as bundles of 10 sticks"],
    worked: [
      { problem:"What is the tens digit in 47?", solution:"47 = 4 tens + 7 ones. Tens digit = 4" },
      { problem:"What number is 5 tens and 6 ones?", solution:"5×10 + 6 = 50 + 6 = 56" },
    ]
  },
  "Addition Facts to 20": {
    title: "Addition Facts to 20",
    intro: "Learn these facts by heart — they are the foundation of all math!",
    steps: ["Make-10 trick: 8+5 → 8+2=10, then +3 = 13","Doubles: 6+6=12, 7+7=14, 8+8=16, 9+9=18","Near-doubles: 6+7 = 6+6+1 = 13","For 9+any: 9+7 → 10+6=16"],
    worked: [
      { problem:"9 + 7 = ?", solution:"9+1=10, then +6 = 16. Answer = 16" },
      { problem:"8 + 6 = ?", solution:"8+2=10, then +4 = 14. Answer = 14" },
    ]
  },
  "Multiplication Tables": {
    title: "Multiplication Tables",
    intro: "Multiplication is fast repeated addition. 3×4 means three groups of 4.",
    steps: ["×0 rule: anything × 0 = 0","×1 rule: anything × 1 = itself","×2 rule: double the number","×10 rule: add a zero (7×10=70)","×9 trick: digits sum to 9 (9×7=63, 6+3=9)"],
    worked: [
      { problem:"6 × 8 = ?", solution:"Memorize: 6×8=48. Check: 6×8 = 6×4×2 = 24×2 = 48" },
      { problem:"7 × 9 = ?", solution:"9s trick: 7×9 → 6 tens and 3 ones → 63. Or: 7×10−7 = 63" },
    ]
  },
  "Division Basics": {
    title: "How to Divide",
    intro: "Division splits a number into equal groups. Think of it as reverse multiplication.",
    steps: ["20 ÷ 4 means: split 20 into 4 equal groups","Ask: 4 × ? = 20 → 4×5=20, so answer is 5","Dividend ÷ Divisor = Quotient","Division and multiplication are opposites"],
    worked: [
      { problem:"36 ÷ 6 = ?", solution:"Ask: 6 × ? = 36 → 6×6=36. Answer = 6" },
      { problem:"42 ÷ 7 = ?", solution:"Ask: 7 × ? = 42 → 7×6=42. Answer = 6" },
    ]
  },
  "Area and Perimeter": {
    title: "Area and Perimeter",
    intro: "Perimeter is the distance around a shape. Area is the space inside.",
    steps: ["PERIMETER: add all sides. Rectangle: P = 2×(L+W)","AREA of rectangle: A = Length × Width","Area is measured in square units (cm², m²)","Perimeter is measured in regular units (cm, m)"],
    worked: [
      { problem:"Rectangle 5×3. Perimeter?", solution:"P = 2×(5+3) = 2×8 = 16 units" },
      { problem:"Rectangle 5×3. Area?", solution:"A = 5×3 = 15 square units" },
    ]
  },
  "Fractions": {
    title: "Understanding Fractions",
    intro: "A fraction shows part of a whole. The bottom number is how many equal parts total. The top is how many you have.",
    steps: ["Numerator (top) = parts you have","Denominator (bottom) = total equal parts","3/8 means: 8 equal pieces, you have 3","1/2 = one out of two equal pieces"],
    worked: [
      { problem:"3 out of 8 parts shaded. Write the fraction.", solution:"3 shaded / 8 total = 3/8" },
      { problem:"Which is bigger: 3/4 or 1/2?", solution:"1/2 = 2/4. Compare: 3/4 > 2/4. So 3/4 is bigger." },
    ]
  },
  "Order of Operations": {
    title: "Order of Operations (PEMDAS)",
    intro: "Always solve in this exact order to get the right answer.",
    steps: ["P — Parentheses first","E — Exponents","M/D — Multiply & Divide (left to right)","A/S — Add & Subtract (left to right)","Memory trick: Please Excuse My Dear Aunt Sally"],
    worked: [
      { problem:"2 + 3 × 4 = ?", solution:"× first: 3×4=12. Then +2: 12+2=14. NOT 5×4=20!" },
      { problem:"(8−3) × 2² = ?", solution:"Parentheses: 8−3=5. Exponent: 2²=4. Multiply: 5×4=20" },
    ]
  },
  "Slope": {
    title: "Understanding Slope",
    intro: "Slope measures how steep a line is. It's the ratio of vertical change to horizontal change.",
    steps: ["Slope formula: m = (y₂−y₁) ÷ (x₂−x₁)","rise = change going up/down","run = change going left/right","Positive slope: line goes up →","Negative slope: line goes down →","Zero slope: horizontal line"],
    worked: [
      { problem:"Slope between (0,0) and (4,8)?", solution:"m = (8−0)÷(4−0) = 8÷4 = 2" },
      { problem:"Slope between (1,5) and (3,1)?", solution:"m = (1−5)÷(3−1) = −4÷2 = −2" },
    ]
  },
  "Systems of Equations": {
    title: "Solving Systems of Equations",
    intro: "A system is two equations with the same variables. Find values that make BOTH equations true.",
    steps: ["Substitution: solve one eq for y, substitute into other","Elimination: add/subtract equations to cancel a variable","Check: plug answer back into BOTH equations","Example: x+y=10, x−y=2"],
    worked: [
      { problem:"x+y=10 and x−y=2", solution:"Add equations: 2x=12, x=6. Then y=10−6=4. Check: 6+4=10 ✓ and 6−4=2 ✓" },
      { problem:"y=2x and y=x+3", solution:"Substitute: 2x=x+3, x=3. Then y=2(3)=6. Answer: (3,6)" },
    ]
  },
  "Pythagorean Theorem": {
    title: "Pythagorean Theorem",
    intro: "In any right triangle: a² + b² = c², where c is the hypotenuse (longest side).",
    steps: ["Identify the right angle (the 90° corner)","The two shorter sides are legs (a and b)","The longest side opposite the right angle is the hypotenuse (c)","a² + b² = c²","Common triples: 3-4-5, 5-12-13, 8-15-17"],
    worked: [
      { problem:"Legs 3 and 4. Find hypotenuse.", solution:"3²+4²=c² → 9+16=25 → c=√25=5" },
      { problem:"Hypotenuse 13, one leg 5. Find other leg.", solution:"5²+b²=13² → 25+b²=169 → b²=144 → b=12" },
    ]
  },
  "Quadratics": {
    title: "Solving Quadratic Equations",
    intro: "A quadratic equation has the form ax²+bx+c=0. We find the values of x that make it true.",
    steps: ["Method 1 — Factor: find two numbers that multiply to c and add to b","Method 2 — Quadratic Formula: x = (−b ± √(b²−4ac)) ÷ 2a","Method 3 — Complete the square","Always check your answers by substituting back in"],
    worked: [
      { problem:"x²+5x+6=0", solution:"Factor: (x+2)(x+3)=0 → x=−2 or x=−3" },
      { problem:"x²−5x+6=0", solution:"Factor: (x−2)(x−3)=0 → x=2 or x=3" },
    ]
  },
  "Logarithms": {
    title: "Understanding Logarithms",
    intro: "A logarithm answers: 'what exponent do I need?' log_b(x)=y means b^y=x.",
    steps: ["log₁₀(1000)=3 because 10³=1000","log₂(8)=3 because 2³=8","ln means log base e (natural log)","log(AB)=log(A)+log(B)","log(A/B)=log(A)−log(B)","log(Aⁿ)=n·log(A)"],
    worked: [
      { problem:"log₂(32)=?", solution:"2^?=32 → 2⁵=32 → answer=5" },
      { problem:"Solve 3^x=81", solution:"log both sides: x·log(3)=log(81) → x=4 (since 3⁴=81)" },
    ]
  },
  "Trig Ratios": {
    title: "Trigonometric Ratios (SOH-CAH-TOA)",
    intro: "In a right triangle, the three trig ratios relate angles to side lengths.",
    steps: ["SOH: Sin = Opposite ÷ Hypotenuse","CAH: Cos = Adjacent ÷ Hypotenuse","TOA: Tan = Opposite ÷ Adjacent","Special values: sin(30°)=½, cos(60°)=½, tan(45°)=1","sin(60°)=cos(30°)=√3/2"],
    worked: [
      { problem:"Right triangle, opp=3, hyp=5. Find sin(A).", solution:"sin(A)=opp/hyp=3/5=0.6" },
      { problem:"tan(45°)=?", solution:"In a 45-45-90 triangle, opp=adj, so tan=opp/adj=1" },
    ]
  },
  "Percent": {
    title: "Working with Percentages",
    intro: "Percent means 'per hundred.' 25% = 25/100 = 0.25.",
    steps: ["To find % of a number: multiply by the decimal (25%×60 = 0.25×60 = 15)","To find what % one number is of another: (part÷whole)×100","Percent increase: (new−old)÷old × 100","Percent decrease: (old−new)÷old × 100"],
    worked: [
      { problem:"What is 30% of 80?", solution:"0.30 × 80 = 24" },
      { problem:"15 is what % of 60?", solution:"(15÷60)×100 = 0.25×100 = 25%" },
    ]
  },
  "Decimals": {
    title: "Understanding Decimals",
    intro: "Decimals are another way to write fractions with denominators of 10, 100, 1000, etc.",
    steps: ["0.3 = 3/10 (three tenths)","0.35 = 35/100 (thirty-five hundredths)","To add/subtract: line up decimal points","To multiply: ignore decimals, multiply, then count decimal places","To compare: 0.6 vs 0.59 → write 0.60 vs 0.59 → 0.60 is larger"],
    worked: [
      { problem:"3.5 + 2.7 = ?", solution:"Line up decimals: 3.5+2.7=6.2" },
      { problem:"0.6 or 0.59 — which is larger?", solution:"0.6 = 0.60. Compare 0.60 vs 0.59. 0.60 > 0.59" },
    ]
  },
};

// ─────────────────────────────────────────────────────────────
// 3. MATH HELPERS
// ─────────────────────────────────────────────────────────────
function gcd(a, b) { return b === 0 ? Math.abs(a) : gcd(b, a % b); }
function factorial(n) { if (n <= 1) return 1; let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function norm(s) { return String(s).trim().toLowerCase().replace(/\s+/g, " "); }
function isCorrect(userAns, correctAns) { return norm(userAns) === norm(correctAns); }

// ─────────────────────────────────────────────────────────────
// 4. QUESTION GENERATOR  (~3000 per level, parametric)
// ─────────────────────────────────────────────────────────────
function generateLevelQuestions(level) {
  const pool = [];
  let n = 1;
  const add = (theme, diff, question, type, opts, answer, hint, explanation) => {
    pool.push({
      id: `${level}-${String(n++).padStart(4,"0")}`,
      level, theme, difficulty: diff, question, type,
      options: opts || null,
      answer: String(answer),
      hint, explanation
    });
  };

  if (level === "A") {
    const emojis = ["🍎","🌟","🐸","🦆","🎈","🐱","🍊","⭐","🌸","🐶"];
    for (let count = 1; count <= 20; count++) {
      for (let e = 0; e < emojis.length; e++) {
        add("Counting 1-20","easy",`Count: ${emojis[e].repeat(count)}`,"input",null,count,`Say one number per ${emojis[e]}.`,`Count ${count} → answer is ${count}.`);
      }
      add("Counting 1-20","easy",`What number comes after ${count}?`,"multiple",
        shuffle([count+1,count>1?count-1:count+2,count+2,count+3>20?19:count+3].map(String)),
        String(count+1 > 20 ? "beyond scope" : count+1),`Count forward from ${count}.`,`After ${count} comes ${count+1}.`);
      if (count > 1) add("Counting 1-20","easy",`What number comes before ${count}?`,"multiple",
        shuffle([count-1,count,count+1,count>2?count-2:count+2].map(String)),
        String(count-1),`Count backward from ${count}.`,`Before ${count} is ${count-1}.`);
    }
    for (let a = 0; a <= 5; a++) {
      for (let b = 0; b <= 5; b++) {
        if (a+b <= 10) {
          add("Simple Addition","easy",`${a} + ${b} = ?`,"input",null,a+b,`Start at ${a}, count up ${b} more.`,`${a} + ${b} = ${a+b}.`);
          add("Simple Addition","medium",`You have ${a} 🍎 and get ${b} more. How many total?`,"multiple",
            shuffle([a+b, Math.max(0,a+b-1), a+b+1, a+b+2].filter((v,i,s)=>s.indexOf(v)===i).map(String)),
            String(a+b),`${a} + ${b} = ?`,`${a} + ${b} = ${a+b}.`);
        }
        if (a >= b) {
          add("Simple Subtraction","easy",`${a} - ${b} = ?`,"input",null,a-b,`Start at ${a}, count back ${b}.`,`${a} - ${b} = ${a-b}.`);
          if (a>0) add("Simple Subtraction","medium",`There are ${a} birds 🐦. ${b} fly away. How many left?`,"multiple",
            shuffle([a-b,a+b,Math.max(0,a-b-1),a-b+1].filter((v,i,s)=>s.indexOf(v)===i).map(String)),
            String(a-b),`${a} - ${b} = ?`,`${a} - ${b} = ${a-b}.`);
        }
      }
    }
    const names=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"];
    for (let i = 1; i <= 20; i++) {
      add("Number Recognition","easy",`Which number spells "${names[i]}"?`,"multiple",
        shuffle([i, i>1?i-1:i+3, i<20?i+1:i-2, i<19?i+2:i-3].filter((v,i2,s)=>v>=0&&v<=20&&s.indexOf(v)===i2).map(String)),
        String(i),`${names[i]} = ${i}`,`${names[i]} = ${i}.`);
    }
    for (let a = 1; a <= 10; a++) for (let b = 1; b <= 10; b++) {
      const sym = a<b?"<":a>b?">":"=";
      add("Comparing Quantities","medium",`${a} __ ${b}  (pick <, >, or =)`,"multiple",["<",">","="],sym,
        `${a} is ${a<b?"less than":a>b?"greater than":"equal to"} ${b}.`,`${a} ${sym} ${b}.`);
    }
    const patColors = ["🔴","🔵","🟡","🟢","🟠","🟣"];
    for (let i = 0; i < 40; i++) {
      const c1=patColors[i%6], c2=patColors[(i+1)%6];
      add("Patterns","easy",`What comes next? ${c1}${c2}${c1}${c2}${c1}__`,"multiple",
        shuffle([c1,c2,"🟤","⚫"]),c2,`Pattern: ${c1} ${c2} repeating.`,`${c1}${c2} pattern repeats → next is ${c2}.`);
      add("Patterns","medium",`What comes next? ${c1}${c1}${c2}${c1}${c1}${c2}${c1}${c1}__`,"multiple",
        shuffle([c1,c2,"🟤","⚫"]),c2,`Pattern: ${c1}${c1}${c2} repeating.`,`Double-${c1} then ${c2} → next is ${c2}.`);
    }
    const shapes=[["triangle","3","3 sides"],["square","4","4 equal sides"],["rectangle","4","4 sides"],["circle","0","no sides"],["pentagon","5","5 sides"],["hexagon","6","6 sides"]];
    shapes.forEach(([name,sides,desc])=>{
      for (let i=0;i<5;i++) {
        add("Basic Shapes","easy",`How many sides does a ${name} have?`,"multiple",
          shuffle(["0","3","4","5","6"].slice(0,4)),sides,`A ${name} has ${desc}.`,`${name} → ${sides} sides.`);
      }
    });
    for (let i=1;i<=5;i++) {
      const ordinals=["first","second","third","fourth","fifth"];
      const letters=["A","B","C","D","E"];
      add("Ordinal Numbers","easy",`Which letter is ${ordinals[i-1]}? A, B, C, D, E`,"multiple",
        ["A","B","C","D","E"],letters[i-1],`Count to position ${i}.`,`${ordinals[i-1]} → ${letters[i-1]}.`);
    }
  }

  if (level === "B") {
    for (let t=1;t<=9;t++) for (let o=0;o<=9;o++) {
      const num = t*10+o;
      add("Place Value Tens & Ones","easy",`In ${num}, the TENS digit is?`,"input",null,t,`${num} = ${t} tens + ${o} ones.`,`${t} tens.`);
      add("Place Value Tens & Ones","easy",`In ${num}, the ONES digit is?`,"input",null,o,`${num} = ${t} tens + ${o} ones.`,`${o} ones.`);
      add("Place Value Tens & Ones","medium",`${t} tens and ${o} ones = ?`,"input",null,num,`Tens × 10 + ones.`,`${t}×10+${o} = ${num}.`);
    }
    for (let a=0;a<=10;a++) for (let b=0;b<=10;b++) {
      if (a+b<=20) {
        add("Addition Facts to 20","easy",`${a} + ${b} = ?`,"input",null,a+b,
          a===9?`Make ten: 9+1=10, then +${b-1}`:b===0?`${a} + 0 = ${a}`:`Start at ${a}, count up ${b}.`,`${a} + ${b} = ${a+b}.`);
        add("Addition Facts to 20","medium",`? + ${b} = ${a+b}`,"input",null,a,`Think: what + ${b} = ${a+b}?`,`${a} + ${b} = ${a+b}.`);
      }
      if (a>=b) {
        add("Subtraction Facts to 20","easy",`${a} - ${b} = ?`,"input",null,a-b,`Think: ${b} + ? = ${a}.`,`${a} - ${b} = ${a-b}.`);
        add("Subtraction Facts to 20","medium",`${a} - ? = ${a-b}`,"input",null,b,`Reverse: ${a-b} + ? = ${a}.`,`${a} - ${b} = ${a-b}.`);
      }
    }
    for (let s=2;s<=18;s+=2) add("Skip Counting","easy",`Skip by 2s: ${s}, ${s+2}, ${s+4}, __, ${s+8}`,"input",null,s+6,"Add 2 each time.",`${s+6}.`);
    for (let s=5;s<=45;s+=5) add("Skip Counting","easy",`Skip by 5s: ${s}, ${s+5}, __, ${s+15}`,"input",null,s+10,"Add 5 each time.",`${s+10}.`);
    for (let s=10;s<=80;s+=10) add("Skip Counting","easy",`Skip by 10s: ${s}, __, ${s+20}`,"input",null,s+10,"Add 10 each time.",`${s+10}.`);
    for (let a=10;a<=99;a+=7) for (let b=10;b<=99;b+=11) {
      add("Comparing Numbers","medium",`${a} vs ${b}: write <, >, or =`,"multiple",["<",">","="],
        a<b?"<":a>b?">":"=",`Compare tens digits first.`,`${a} ${a<b?"<":a>b?">":"="} ${b}.`);
    }
    for (let h=1;h<=12;h++) {
      add("Time","medium",`Short hand points to ${h}, long hand points to 12. What time is it?`,"multiple",
        shuffle([`${h}:00`,`${h}:30`,`${h===12?1:h+1}:00`,`${h>1?h-1:12}:30`]),`${h}:00`,
        "Long hand at 12 = exactly on the hour.",`${h}:00.`);
      add("Time","medium",`Short hand between ${h} and ${h===12?1:h+1}, long hand at 6. Time?`,"multiple",
        shuffle([`${h}:30`,`${h}:00`,`${h===12?1:h+1}:00`,`${h>1?h-1:12}:30`]),`${h}:30`,
        "Long hand at 6 = half past (:30).",`${h}:30.`);
    }
    for (let d=2;d<=8;d++) for (let num=1;num<d;num++) {
      add("Basic Fractions","easy",`A shape has ${d} equal parts. ${num} part(s) are shaded. Write the fraction.`,"input",null,`${num}/${d}`,`Shaded/Total.`,`${num}/${d}.`);
      add("Basic Fractions","medium",`Which is larger: 1/${d} or 1/${d+1}?`,"multiple",[`1/${d}`,`1/${d+1}`,"Same"],`1/${d}`,`Larger denominator = smaller pieces.`,`1/${d} > 1/${d+1}.`);
    }
    for (let a=1;a<=10;a++) for (let b=1;b<=10;b++) {
      if (a+b<=20) add("Word Problems","medium",`There are ${a} red balls and ${b} blue balls. How many total?`,"input",null,a+b,`Add them together.`,`${a}+${b}=${a+b}.`);
      if (a>b) add("Word Problems","medium",`There are ${a} students. ${b} leave. How many remain?`,"input",null,a-b,`Subtract.`,`${a}-${b}=${a-b}.`);
    }
  }

  if (level === "C") {
    for (let h=1;h<=9;h++) for (let t=0;t<=9;t++) for (let o=0;o<=9;o++) {
      const num=h*100+t*10+o;
      if (pool.filter(q=>q.theme==="Place Value to 1000").length < 250) {
        add("Place Value to 1000","easy",`What is the hundreds digit in ${num}?`,"input",null,h,`H|T|O = ${h}|${t}|${o}.`,`Hundreds digit = ${h}.`);
        add("Place Value to 1000","medium",`${h} hundreds + ${t} tens + ${o} ones = ?`,"input",null,num,`${h*100}+${t*10}+${o}.`,`${num}.`);
      }
    }
    for (let a=11;a<=99;a+=6) for (let b=11;b<=99;b+=8) {
      add("Addition with Regrouping","medium",`${a} + ${b} = ?`,"input",null,a+b,`Add ones: ${a%10}+${b%10}=${(a%10)+(b%10)>9?`(${(a%10)+(b%10)}, write ${(a%10+b%10)%10} carry 1)`:`${(a%10)+(b%10)}`}. Then tens.`,`${a+b}.`);
    }
    for (let a=20;a<=99;a+=7) for (let b=10;b<a;b+=9) {
      add("Subtraction with Borrowing","medium",`${a} - ${b} = ?`,"input",null,a-b,`Borrow from tens column if needed.`,`${a-b}.`);
    }
    for (let a=2;a<=5;a++) for (let b=2;b<=12;b++) {
      add("Intro Multiplication","easy",`${a} × ${b} = ?`,"input",null,a*b,`${a} groups of ${b}: ${Array(a).fill(b).join("+")} = ?`,`${a*b}.`);
      add("Intro Multiplication","medium",`${a} bags with ${b} apples each. Total apples?`,"input",null,a*b,`${a} × ${b} = ?`,`${a*b} apples.`);
    }
    for (let n=1;n<=50;n++) add("Even and Odd","easy",`Is ${n} even or odd?`,"multiple",["Even","Odd"],n%2===0?"Even":"Odd",
      `Even ends in 0,2,4,6,8. Odd ends in 1,3,5,7,9.`,`${n} ends in ${n%10} → ${n%2===0?"even":"odd"}.`);
    const coinVals=[["penny",1],["nickel",5],["dime",10],["quarter",25]];
    coinVals.forEach(([name,val])=>{
      for (let c=1;c<=8;c++) add("Money","easy",`${c} ${name}${c>1?"s":""} = ? cents`,"input",null,c*val,`${name} = ${val}¢.`,`${c}×${val}=${c*val}¢.`);
    });
    for (let a=10;a<=99;a+=11) for (let b=5;b<a;b+=13) {
      add("Money","medium",`You have ${a}¢ and spend ${b}¢. Change?`,"input",null,a-b,`${a} − ${b} = ?`,`${a-b}¢.`);
    }
    for (let a=5;a<=95;a+=5) { const r=Math.round(a/10)*10; add("Rounding (C)","easy",`Round ${a} to the nearest 10.`,"input",null,r,`Ones digit is ${a%10}. ${a%10>=5?"≥5 round up":"<5 round down"}.`,`${r}.`); }
    for (let a=2;a<=9;a++) for (let b=2;b<=a;b++) {
      add("Fractions","easy",`Write ${b} out of ${a} as a fraction.`,"input",null,`${b}/${a}`,`Numerator/Denominator.`,`${b}/${a}.`);
    }
  }

  if (level === "D") {
    for (let a=1;a<=10;a++) for (let b=1;b<=10;b++) {
      add("Multiplication Tables","easy",`${a} × ${b} = ?`,"input",null,a*b,`Skip count by ${b}, ${a} times.`,`${a*b}.`);
      add("Multiplication Tables","medium",`? × ${b} = ${a*b}`,"input",null,a,`${b} × ? = ${a*b}.`,`${a}.`);
      add("Division Basics","easy",`${a*b} ÷ ${b} = ?`,"input",null,a,`${b} × ? = ${a*b}.`,`${a}.`);
      add("Division Basics","medium",`Share ${a*b} equally among ${b} people. Each gets?`,"input",null,a,`${a*b} ÷ ${b}.`,`${a}.`);
    }
    for (let l=2;l<=15;l++) for (let w=2;w<=10;w++) {
      if (pool.filter(q=>q.theme==="Area and Perimeter").length < 400) {
        add("Area and Perimeter","easy",`Rectangle ${l} × ${w}. Find the area.`,"input",null,l*w,"A = L × W.",`${l*w} sq units.`);
        add("Area and Perimeter","easy",`Rectangle ${l} × ${w}. Find the perimeter.`,"input",null,2*(l+w),"P = 2(L+W).",`2(${l}+${w}) = ${2*(l+w)}.`);
      }
    }
    for (let n=5;n<=995;n+=8) {
      const r10=Math.round(n/10)*10, r100=Math.round(n/100)*100;
      add("Rounding","easy",`Round ${n} to nearest 10.`,"input",null,r10,`Ones digit (${n%10}) ${n%10>=5?"≥5→up":"<5→down"}.`,`${r10}.`);
      add("Rounding","medium",`Round ${n} to nearest 100.`,"input",null,r100,`Tens digit (${Math.floor(n/10)%10}) ${Math.floor(n/10)%10>=5?"≥5→up":"<5→down"}.`,`${r100}.`);
    }
    for (let d=2;d<=12;d++) for (let num=1;num<d;num++) {
      const g=gcd(num,d);
      add("Fractions","easy",`Write a fraction: ${num} shaded out of ${d} total.`,"input",null,`${num}/${d}`,"Shaded ÷ Total.",`${num}/${d}.`);
      if (g>1) add("Equivalent Fractions","medium",`Simplify ${num}/${d}.`,"input",null,`${num/g}/${d/g}`,`GCF(${num},${d}) = ${g}. Divide both.`,`${num/g}/${d/g}.`);
      add("Equivalent Fractions","easy",`Is ${num}/${d} = ${num*2}/${d*2}?`,"multiple",["Yes","No"],"Yes","Multiply both by 2.",`${num}/${d} = ${num*2}/${d*2}. Yes.`);
    }
  }

  if (level === "E") {
    for (let a=10;a<=99;a+=11) for (let b=2;b<=9;b++) {
      add("Multi-Digit Multiplication","medium",`${a} × ${b} = ?`,"input",null,a*b,"Multiply ones, then tens. Carry if needed.",`${a*b}.`);
    }
    for (let a=100;a<=999;a+=37) for (let b=2;b<=9;b++) {
      if (pool.filter(q=>q.theme==="Multi-Digit Multiplication").length < 300)
        add("Multi-Digit Multiplication","hard",`${a} × ${b} = ?`,"input",null,a*b,"Work column by column.",`${a*b}.`);
    }
    for (let divisor=2;divisor<=9;divisor++) for (let quotient=10;quotient<=99;quotient+=7) {
      add("Long Division","medium",`${divisor*quotient} ÷ ${divisor} = ?`,"input",null,quotient,`${divisor} × ? = ${divisor*quotient}.`,`${quotient}.`);
    }
    for (let n=2;n<=60;n++) {
      const isPrime = n>1 && !Array.from({length:n-2},(_,i)=>i+2).some(f=>n%f===0);
      add("Prime and Composite","easy",`Is ${n} prime or composite?`,"multiple",["Prime","Composite"],isPrime?"Prime":"Composite",
        isPrime?`Factors: only 1 and ${n}.`:`Can be divided by numbers other than 1 and ${n}.`,isPrime?`Prime.`:`Composite.`);
    }
    for (let d=2;d<=12;d++) for (let n=1;n<d;n++) {
      if (pool.filter(q=>q.theme==="Fraction Operations").length < 250) {
        add("Fraction Operations","easy",`${n}/${d} + ${n}/${d} = ?`,"input",null,`${2*n<d?`${2*n}/${d}`:gcd(2*n,d)>1?`${(2*n)/gcd(2*n,d)}/${d/gcd(2*n,d)}`:`${2*n}/${d}`}`,"Same denominator: add numerators.",`${2*n}/${d}.`);
        if (n<d-1) add("Fraction Operations","easy",`${n+1}/${d} - ${n}/${d} = ?`,"input",null,`1/${d}`,"Same denominator: subtract numerators.",`1/${d}.`);
      }
    }
    for (let d of [10,100]) for (let num=1;num<d;num+=d===10?1:7) {
      if (pool.filter(q=>q.theme==="Decimals").length < 250)
        add("Decimals","easy",`Write ${num}/${d} as a decimal.`,"input",null,(num/d).toFixed(d===10?1:2),`${d===10?"Tenths":"Hundredths"}.`,`${(num/d).toFixed(d===10?1:2)}.`);
    }
    for (let a=1.0;a<=9.9;a+=0.3) {
      const b=parseFloat((a+1.1).toFixed(1));
      add("Decimals","medium",`${a.toFixed(1)} + ${b.toFixed(1)} = ?`,"input",null,(a+b).toFixed(1).replace(/\.0$/,""),"Line up decimal points.",`${(a+b).toFixed(1)}.`);
    }
  }

  if (level === "F") {
    for (let a=1;a<=9;a++) for (let b=1;b<=9;b++) for (let c=1;c<=5;c++) for (let d=1;d<=5;d++) {
      if (pool.filter(q=>q.theme==="Multiply Fractions").length < 300)
        add("Multiply Fractions","medium",`${a}/${b} × ${c}/${d} = ?`,"input",null,
          (()=>{const n2=a*c,d2=b*d,g=gcd(n2,d2);return g>1?`${n2/g}/${d2/g}`:`${n2}/${d2}`})(),
          "Multiply tops, multiply bottoms. Then simplify.","Result.");
    }
    for (let a=1;a<=9;a++) for (let b=1;b<=9;b++) for (let c=1;c<=5;c++) for (let d=1;d<=5;d++) {
      if (pool.filter(q=>q.theme==="Divide Fractions").length < 300)
        add("Divide Fractions","medium",`${a}/${b} ÷ ${c}/${d} = ?`,"input",null,
          (()=>{const n2=a*d,d2=b*c,g=gcd(n2,d2);return g>1?`${n2/g}/${d2/g}`:`${n2}/${d2}`})(),
          "Keep-Change-Flip: multiply by the reciprocal.","Result.");
    }
    const pairs=[[1.5,2.3],[4.7,2.1],[8.25,3.14],[0.6,0.4],[12.5,3.5],[7.1,2.9],[5.55,1.45],[3.75,1.25]];
    pairs.forEach(([a,b])=>{
      add("Decimal Operations","easy",`${a} + ${b} = ?`,"input",null,parseFloat((a+b).toFixed(3)).toString(),"Line up decimal points.",`${a+b}.`);
      add("Decimal Operations","easy",`${a} - ${b} = ?`,"input",null,parseFloat((a-b).toFixed(3)).toString(),"Line up decimal points.",`${a-b}.`);
      add("Decimal Operations","medium",`${a} × ${b} = ?`,"input",null,parseFloat((a*b).toFixed(4)).toString(),"Count decimal places.",`${parseFloat((a*b).toFixed(4))}.`);
    });
    for (let exp=1;exp<=6;exp++) for (let m=1;m<=9;m++) {
      add("Powers of 10","easy",`${m} × 10^${exp} = ?`,"input",null,m*Math.pow(10,exp),`Move decimal ${exp} places right.`,`${m*Math.pow(10,exp)}.`);
      add("Powers of 10","medium",`${m*Math.pow(10,exp)} ÷ 10^${exp} = ?`,"input",null,m,`Move decimal ${exp} places left.`,`${m}.`);
    }
    const opsQ=[["2+3×4",14],["(5+3)×2",16],["20÷4+3×2",11],["3+4²÷2",11],["10-(2+3)",5],["(8-3)×4",20],["6+2×(4-1)",12],["18÷(2+1)+5",11],["4²-3×2",10],["5×(2+3)-4",21]];
    opsQ.forEach(([expr,ans])=>{
      for (let i=0;i<5;i++) add("Order of Operations","medium",`${expr} = ?`,"input",null,ans,"PEMDAS: P→E→M/D→A/S.",`${ans}.`);
    });
    for (let l=1;l<=8;l++) for (let w=1;w<=8;w++) for (let h=1;h<=6;h++) {
      if (pool.filter(q=>q.theme==="Volume").length < 200)
        add("Volume","medium",`Rectangular box: ${l}×${w}×${h}. Volume?`,"input",null,l*w*h,"V = L×W×H.",`${l*w*h} cubic units.`);
    }
    for (let n=-10;n<=10;n++) {
      add("Negative Numbers","easy",`Which is greater: ${n} or ${n+1}?`,"multiple",[String(n),String(n+1)],String(n+1),"Numbers increase to the right on a number line.",`${n+1} > ${n}.`);
      if (n!==0) add("Negative Numbers","easy",`What is the opposite of ${n}?`,"input",null,-n,`The opposite has the same distance from 0 but on the other side.`,`Opposite of ${n} is ${-n}.`);
    }
  }

  if (level === "G") {
    for (let a=1;a<=20;a++) for (let b=1;b<=20;b++) {
      if (pool.filter(q=>q.theme==="Ratios and Rates").length < 300) {
        const g=gcd(a,b);
        add("Ratios and Rates","easy",`Simplify the ratio ${a}:${b}.`,"input",null,`${a/g}:${b/g}`,`GCF(${a},${b})=${g}. Divide both.`,`${a/g}:${b/g}.`);
      }
    }
    for (let dist of [60,90,120,150,200,250]) for (let time of [2,3,4,5]) {
      add("Ratios and Rates","medium",`${dist} miles in ${time} hours. Speed in mph?`,"input",null,dist/time,`Speed = distance ÷ time.`,`${dist/time} mph.`);
    }
    for (let p=5;p<=95;p+=5) for (let w of [20,40,50,60,80,100,120,200]) {
      if (pool.filter(q=>q.theme==="Percent").length < 400) {
        const part=Math.round(p/100*w);
        add("Percent","easy",`${p}% of ${w} = ?`,"input",null,part,`${p}% = ${p/100}. Multiply by ${w}.`,`${part}.`);
      }
    }
    for (let part=5;part<=60;part+=5) for (let whole of [20,25,50,60,80,100]) {
      if (part<whole && pool.filter(q=>q.theme==="Percent").length < 500)
        add("Percent","medium",`${part} is what percent of ${whole}?`,"input",null,Math.round(part/whole*100),`(${part}÷${whole})×100.`,`${Math.round(part/whole*100)}%.`);
    }
    for (let x=-10;x<=10;x++) add("Absolute Value","easy",`|${x}| = ?`,"input",null,Math.abs(x),"Distance from 0.",`${Math.abs(x)}.`);
    for (let m=1;m<=10;m++) for (let b=1;b<=20;b++) {
      const x=Math.floor(Math.random()*8)+1, rhs=m*x+b;
      if (pool.filter(q=>q.theme==="One-Step Equations").length < 200) {
        add("One-Step Equations","medium",`x + ${b} = ${x+b}. Solve.`,"input",null,x,`Subtract ${b} from both sides.`,`x = ${x}.`);
        add("One-Step Equations","medium",`${m}x = ${m*x}. Solve.`,"input",null,x,`Divide both sides by ${m}.`,`x = ${x}.`);
      }
    }
    for (let i=0;i<50;i++) {
      const data=Array.from({length:5},()=>Math.floor(Math.random()*20)+1);
      const sorted=[...data].sort((a,b)=>a-b);
      const sum=data.reduce((s,v)=>s+v,0);
      add("Statistics","medium",`Mean of: ${data.join(", ")}`,"input",null,(sum/5).toFixed(1),`Add all, divide by ${data.length}.`,`${sum}÷5=${(sum/5).toFixed(1)}.`);
      add("Statistics","medium",`Median of: ${data.join(", ")}`,"input",null,sorted[2],"Sort, find middle value.",`Sorted: ${sorted.join(", ")}. Middle = ${sorted[2]}.`);
      add("Statistics","easy",`Range of: ${data.join(", ")}`,"input",null,sorted[4]-sorted[0],"Max − Min.",`${sorted[4]}−${sorted[0]}=${sorted[4]-sorted[0]}.`);
    }
  }

  if (level === "H") {
    for (let k=1;k<=10;k++) for (let x=1;x<=10;x++) {
      const y=k*x;
      add("Proportional Relationships","easy",`y = kx. If k=${k} and x=${x}, find y.`,"input",null,y,`y = ${k} × ${x}.`,`y = ${y}.`);
      if (x<10) add("Proportional Relationships","medium",`y/x is constant. y=${y}, x=${x}. Find y when x=${x+1}.`,"input",null,k*(x+1),`k = ${y}/${x} = ${k}. y=${k}×${x+1}.`,`${k*(x+1)}.`);
    }
    for (let orig=10;orig<=200;orig+=10) for (let chgPct=10;chgPct<=50;chgPct+=10) {
      const newV=Math.round(orig*(1+chgPct/100));
      const decV=Math.round(orig*(1-chgPct/100));
      if (pool.filter(q=>q.theme==="Percent Change").length < 200) {
        add("Percent Change","medium",`Price increases ${chgPct}% from $${orig}. New price?`,"input",null,newV,`${orig}×${1+chgPct/100}.`,`$${newV}.`);
        add("Percent Change","medium",`$${orig} → $${decV}. Percent decrease?`,"input",null,chgPct,`(${orig}-${decV})/${orig}×100.`,`${chgPct}%.`);
      }
    }
    for (let a=-10;a<=10;a++) for (let b=-10;b<=10;b++) {
      if (pool.filter(q=>q.theme==="Rational Numbers").length < 300) {
        add("Rational Numbers","easy",`${a} + (${b}) = ?`,"input",null,a+b,"Use number line: right=+, left=−.",`${a+b}.`);
        add("Rational Numbers","easy",`${a} × (${b}) = ?`,"input",null,a*b,"Same signs→positive. Diff signs→negative.",`${a*b}.`);
      }
    }
    for (let m=1;m<=8;m++) for (let b2=1;b2<=15;b2++) {
      const x=Math.floor(Math.random()*9)+1;
      if (pool.filter(q=>q.theme==="Two-Step Equations").length < 300) {
        add("Two-Step Equations","medium",`${m}x + ${b2} = ${m*x+b2}. Solve.`,"input",null,x,`Subtract ${b2}: ${m}x=${m*x}. Divide by ${m}.`,`x = ${x}.`);
        add("Two-Step Equations","medium",`${m}x - ${b2} = ${m*x-b2}. Solve.`,"input",null,x,`Add ${b2}: ${m}x=${m*x}. Divide by ${m}.`,`x = ${x}.`);
      }
    }
    for (let r=1;r<=20;r++) {
      add("Circles","easy",`Circle, radius=${r}. Circumference? (π≈3.14)`,"input",null,(2*3.14*r).toFixed(2),"C = 2πr.",`${(2*3.14*r).toFixed(2)}.`);
      add("Circles","easy",`Circle, radius=${r}. Area? (π≈3.14)`,"input",null,(3.14*r*r).toFixed(2),"A = πr².",`${(3.14*r*r).toFixed(2)}.`);
    }
    for (let i=0;i<50;i++) {
      const outcomes=[4,6,8,10,12];
      const total=outcomes[i%outcomes.length];
      const fav=Math.floor(Math.random()*(total-1))+1;
      const g=gcd(fav,total);
      add("Probability","medium",`A bag has ${total} marbles; ${fav} are red. P(red)?`,"input",null,`${fav/g}/${total/g}`,`P = favorable/total.`,`${fav}/${total} = ${fav/g}/${total/g}.`);
    }
  }

  if (level === "I") {
    for (let a=1;a<=8;a++) for (let b=1;b<=15;b++) for (let c=1;c<=5;c++) {
      const x=Math.floor(Math.random()*7)+2;
      if (pool.filter(q=>q.theme==="Multi-Step Equations").length < 350) {
        const lhs=a*x+b, rhs=c*x+lhs-c*x;
        add("Multi-Step Equations","medium",`${a}x + ${b} = ${a*x+b}. Solve.`,"input",null,x,`Subtract ${b}, divide by ${a}.`,`x = ${x}.`);
        add("Multi-Step Equations","hard",`${a}(x + ${b}) = ${a*(x+b)}. Solve.`,"input",null,x,`Divide by ${a}: x+${b}=${x+b}.`,`x = ${x}.`);
      }
    }
    const pts=[[0,0,4,8],[1,2,3,6],[0,1,5,6],[2,3,6,8],[0,-2,3,4],[-1,0,2,3],[1,3,4,9],[0,0,3,-6]];
    pts.forEach(([x1,y1,x2,y2])=>{
      const rise=y2-y1, run=x2-x1;
      if (run!==0) {
        const g=gcd(Math.abs(rise),Math.abs(run));
        const slopeStr = run===0 ? "undefined" : rise%run===0 ? String(rise/run) : `${rise/g}/${run/g}`;
        add("Slope","medium",`Find slope between (${x1},${y1}) and (${x2},${y2}).`,"input",null,slopeStr,`m = (y₂−y₁)/(x₂−x₁) = (${y2}-${y1})/(${x2}-${x1}).`,`m = ${slopeStr}.`);
        add("Slope-Intercept Form","medium",`A line passes through (${x1},${y1}) with slope ${slopeStr}. y-intercept?`,"input",null,y1-parseFloat(slopeStr)*x1,`y=mx+b → ${y1}=${slopeStr}×${x1}+b.`,`b = ${y1-parseFloat(slopeStr)*x1}.`);
      }
    });
    for (let a=1;a<=8;a++) for (let b=0;b<=8;b++) {
      const x=Math.floor(Math.random()*5)+1, y=Math.floor(Math.random()*5)+1;
      if (pool.filter(q=>q.theme==="Systems of Equations").length < 200) {
        add("Systems of Equations","hard",`x + y = ${x+y} and x − y = ${x-y}. Find x.`,"input",null,x,"Add the equations: 2x = ?",`x = ${x}.`);
        add("Systems of Equations","hard",`x + y = ${x+y} and x − y = ${x-y}. Find y.`,"input",null,y,"Once you have x, substitute back.",`y = ${y}.`);
      }
    }
    const pythTriples=[[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15],[7,24,25],[20,21,29]];
    pythTriples.forEach(([a,b,c])=>{
      for (let i=0;i<5;i++) {
        add("Pythagorean Theorem","easy",`Right triangle, legs ${a} and ${b}. Hypotenuse?`,"input",null,c,`a²+b²=c²: ${a}²+${b}²=${a*a+b*b}.`,`c = ${c}.`);
        add("Pythagorean Theorem","medium",`Hypotenuse ${c}, leg ${a}. Other leg?`,"input",null,b,`b²=c²−a²=${c*c}−${a*a}=${c*c-a*a}.`,`b = ${b}.`);
      }
    });
    for (let m=1;m<=5;m++) for (let b2=0;b2<=8;b2++) for (let x=0;x<=10;x++) {
      if (pool.filter(q=>q.theme==="Functions").length < 150)
        add("Functions","easy",`f(x) = ${m}x + ${b2}. Find f(${x}).`,"input",null,m*x+b2,`Substitute x = ${x}.`,`${m}(${x})+${b2} = ${m*x+b2}.`);
    }
    for (let e=1;e<=6;e++) for (let m2=1;m2<=9;m2++) {
      if (pool.filter(q=>q.theme==="Scientific Notation").length < 100) {
        const big=m2*Math.pow(10,e);
        add("Scientific Notation","medium",`Write ${big.toLocaleString()} in scientific notation.`,"input",null,`${m2}×10^${e}`,`Move decimal to get 1≤m<10.`,`${m2}×10^${e}.`);
      }
    }
  }

  if (level === "J") {
    for (let m=1;m<=10;m++) for (let b2=1;b2<=20;b2++) {
      const x=Math.floor(Math.random()*10)+1;
      add("Linear Equations","medium",`${m}x + ${b2} = ${m*x+b2}. Solve.`,"input",null,x,`Subtract ${b2}, divide by ${m}.`,`x = ${x}.`);
      add("Linear Equations","medium",`${m}x − ${b2} = ${m*x-b2}. Solve.`,"input",null,x,`Add ${b2}, divide by ${m}.`,`x = ${x}.`);
      add("Linear Equations","hard",`${m}(x + ${b2}) = ${m*(x+b2)}. Solve.`,"input",null,x,`Divide by ${m}: x+${b2}=${x+b2}.`,`x = ${x}.`);
    }
    for (let m=1;m<=8;m++) for (let b2=-10;b2<=10;b2++) {
      if (pool.filter(q=>q.theme==="Graphing Lines").length < 200) {
        add("Graphing Lines","easy",`y = ${m}x + ${b2}. Slope?`,"input",null,m,"y=mx+b: m is slope.",`Slope = ${m}.`);
        add("Graphing Lines","easy",`y = ${m}x + ${b2}. y-intercept?`,"input",null,b2,"y=mx+b: b is y-intercept.",`y-intercept = ${b2}.`);
      }
    }
    for (let r1=-5;r1<=5;r1++) for (let r2=-5;r2<=5;r2++) {
      if (pool.filter(q=>q.theme==="Quadratics").length < 250 && r1<=r2) {
        const b3=-(r1+r2), c3=r1*r2;
        if (Math.abs(b3)<=10 && Math.abs(c3)<=20)
          add("Quadratics","hard",`Solve: x² ${b3>=0?`+ ${b3}`:b3}x ${c3>=0?`+ ${c3}`:c3} = 0.`,"input",null,
            r1===r2?`${r1}`:`${Math.min(r1,r2)} and ${Math.max(r1,r2)}`,
            `Factor: find two numbers ×to ${c3} and +to ${b3}.`,r1===r2?`x = ${r1}.`:`x = ${r1} or x = ${r2}.`);
      }
    }
    for (let a=1;a<=5;a++) for (let b2=0;b2<=8;b2++) for (let c=0;c<=5;c++) for (let d=0;d<=8;d++) {
      if (pool.filter(q=>q.theme==="Polynomials").length < 150)
        add("Polynomials","medium",`(${a}x + ${b2}) + (${c}x + ${d}) = ?`,"input",null,`${a+c}x + ${b2+d}`,"Combine like terms.",`${a+c}x + ${b2+d}.`);
    }
    for (let n=2;n<=5;n++) for (let r=-4;r<=4;r++) for (let s=-4;s<=4;s++) {
      if (pool.filter(q=>q.theme==="Factoring").length < 150 && r!==s && r!==0 && s!==0) {
        const b3=r+s, c3=r*s;
        if (Math.abs(b3)<=8 && Math.abs(c3)<=16)
          add("Factoring","medium",`Factor: x² ${b3>=0?`+ ${b3}x`:b3+"x"} ${c3>=0?`+ ${c3}`:c3}.`,"input",null,`(x${r>=0?"+"+r:r})(x${s>=0?"+"+s:s})`,`Find two #s ×${c3} and +${b3}.`,`(x+${r})(x+${s}).`);
      }
    }
    for (let base=2;base<=4;base++) for (let x=0;x<=6;x++) {
      if (pool.filter(q=>q.theme==="Exponential Functions").length < 100)
        add("Exponential Functions","medium",`y = ${base}^x. When x = ${x}, y = ?`,"input",null,Math.pow(base,x),`${base}^${x}.`,`${Math.pow(base,x)}.`);
    }
  }

  if (level === "K") {
    const specAngles=[{deg:30,sin:"1/2",cos:"√3/2",tan:"√3/3"},{deg:45,sin:"√2/2",cos:"√2/2",tan:"1"},{deg:60,sin:"√3/2",cos:"1/2",tan:"√3"}];
    specAngles.forEach(({deg,sin,cos,tan})=>{
      for (let i=0;i<20;i++) {
        add("Trig Ratios","medium",`sin(${deg}°) = ?`,"multiple",shuffle([sin,cos,tan,"2/3"]),sin,"SOH-CAH-TOA. Memorize special angles.",`sin(${deg}°) = ${sin}.`);
        add("Trig Ratios","medium",`cos(${deg}°) = ?`,"multiple",shuffle([sin,cos,tan,"1/3"]),cos,"CAH: adj/hyp.",`cos(${deg}°) = ${cos}.`);
        add("Trig Ratios","medium",`tan(${deg}°) = ?`,"multiple",shuffle([sin,cos,tan,"2"]),tan,"TOA: opp/adj.",`tan(${deg}°) = ${tan}.`);
      }
    });
    const tripleK=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41],[20,21,29]];
    tripleK.forEach(([a,b,c])=>{
      for (let i=0;i<5;i++) {
        add("Special Right Triangles","medium",`Right triangle, legs ${a} & ${b}. Hypotenuse?`,"input",null,c,`a²+b²=c²`,`c = ${c}.`);
        add("Special Right Triangles","medium",`45-45-90 triangle, leg = ${a}. Hypotenuse?`,"input",null,`${a}√2`,"Hyp = leg × √2.",`${a}√2.`);
        add("Special Right Triangles","medium",`30-60-90 triangle, short leg = ${a}. Hypotenuse?`,"input",null,2*a,"Hyp = 2 × short leg.",`${2*a}.`);
      }
    });
    for (let r=1;r<=15;r++) {
      add("Volume and Surface Area","easy",`Sphere r=${r}. Volume? (π≈3.14)`,"input",null,parseFloat((4/3*3.14*r*r*r).toFixed(2)),"V = 4/3πr³.",`${(4/3*3.14*r*r*r).toFixed(2)}.`);
      add("Volume and Surface Area","medium",`Cylinder r=${r}, h=${r+2}. Volume? (π≈3.14)`,"input",null,parseFloat((3.14*r*r*(r+2)).toFixed(2)),"V = πr²h.",`${(3.14*r*r*(r+2)).toFixed(2)}.`);
    }
    const congRules=[["SSS","all 3 sides equal"],["SAS","two sides and the included angle"],["ASA","two angles and the included side"],["AAS","two angles and a non-included side"]];
    congRules.forEach(([rule,desc])=>{
      for (let i=0;i<15;i++)
        add("Triangle Congruence","medium",`Two triangles share ${desc}. Congruence rule?`,"multiple",["SSS","SAS","ASA","AAS"],rule,"Memorize congruence postulates.",`${rule}.`);
    });
    const midPts=[[0,0,4,6],[1,2,5,8],[2,3,8,7],[-2,1,4,5],[3,4,9,10]];
    midPts.forEach(([x1,y1,x2,y2])=>{
      add("Coordinate Geometry","medium",`Midpoint of (${x1},${y1}) and (${x2},${y2})?`,"input",null,`(${(x1+x2)/2},${(y1+y2)/2})`,"Average coordinates.",`((${x1}+${x2})/2, (${y1}+${y2})/2).`);
      const d=Math.sqrt((x2-x1)**2+(y2-y1)**2);
      add("Coordinate Geometry","medium",`Distance from (${x1},${y1}) to (${x2},${y2})?`,"input",null,parseFloat(d.toFixed(2)),"√((x₂-x₁)²+(y₂-y₁)²).",`${d.toFixed(2)}.`);
    });
  }

  if (level === "L") {
    for (let base=2;base<=10;base++) for (let exp=1;exp<=6;exp++) {
      const val=Math.pow(base,exp);
      if (pool.filter(q=>q.theme==="Logarithms").length < 300) {
        add("Logarithms","medium",`log_${base}(${val}) = ?`,"input",null,exp,`${base}^? = ${val}.`,`${base}^${exp}=${val}, so answer is ${exp}.`);
        add("Logarithms","medium",`Solve: ${base}^x = ${val}.`,"input",null,exp,`Take log base ${base}.`,`x = ${exp}.`);
      }
    }
    for (let a1=1;a1<=8;a1++) for (let d=1;d<=8;d++) for (let n=3;n<=10;n++) {
      if (pool.filter(q=>q.theme==="Sequences and Series").length < 300) {
        const an=a1+(n-1)*d;
        add("Sequences and Series","easy",`Arithmetic: a₁=${a1}, d=${d}. Find a_${n}.`,"input",null,an,`a_n = a₁+(n−1)d.`,`${a1}+(${n-1})×${d} = ${an}.`);
      }
    }
    for (let a1=1;a1<=5;a1++) for (let r=2;r<=4;r++) for (let n=2;n<=7;n++) {
      if (pool.filter(q=>q.theme==="Sequences and Series").length < 500)
        add("Sequences and Series","medium",`Geometric: a₁=${a1}, r=${r}. Find a_${n}.`,"input",null,a1*Math.pow(r,n-1),`a_n = a₁×r^(n−1).`,`${a1}×${r}^${n-1} = ${a1*Math.pow(r,n-1)}.`);
    }
    const trigIds=[["sin²(x)+cos²(x)","1"],["1+tan²(x)","sec²(x)"],["cos(2x)","cos²x−sin²x"],["sin(2x)","2sin(x)cos(x)"],["tan(x)","sin(x)/cos(x)"]];
    trigIds.forEach(([lhs,rhs])=>{
      for (let i=0;i<20;i++)
        add("Trig Identities","hard",`Simplify: ${lhs}`,"input",null,rhs,"Pythagorean/double-angle identity.",`${lhs} = ${rhs}.`);
    });
    for (let n=3;n<=10;n++) for (let k=1;k<n;k++) {
      if (pool.filter(q=>q.theme==="Combinatorics").length < 200) {
        const p=factorial(n)/factorial(n-k);
        const c=factorial(n)/(factorial(k)*factorial(n-k));
        add("Combinatorics","medium",`P(${n},${k}) = n!/(n−k)! = ?`,"input",null,p,`${n}!/${n-k}!`,`${p}.`);
        add("Combinatorics","medium",`C(${n},${k}) = ?`,"input",null,c,`${n}!/(${k}!×${n-k}!)`,`${c}.`);
      }
    }
    for (let i=0;i<50;i++) {
      const a=Math.floor(Math.random()*4)+1, b2=Math.floor(Math.random()*5), c=Math.floor(Math.random()*4)+1, d2=Math.floor(Math.random()*5)+1;
      add("Matrices","medium",`Det of [[${a},${b2}],[${c},${d2}]] = ?`,"input",null,a*d2-b2*c,`det = ad − bc.`,`${a}×${d2} − ${b2}×${c} = ${a*d2-b2*c}.`);
    }
    for (let base=2;base<=5;base++) for (let x=0;x<=5;x++) {
      if (pool.filter(q=>q.theme==="Exponential Equations").length < 100)
        add("Exponential Equations","medium",`Solve: ${base}^x = ${Math.pow(base,x)}.`,"input",null,x,`log both sides.`,`x = ${x}.`);
    }
  }

  return shuffle(pool);
}

// ─────────────────────────────────────────────────────────────
// 5. STORAGE HELPERS
// ─────────────────────────────────────────────────────────────
function loadState(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
}
function saveState(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ─────────────────────────────────────────────────────────────
// 6. WHITEBOARD
// ─────────────────────────────────────────────────────────────
function Whiteboard({ open, onClose }) {
  const ref = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#1a1a1a");
  const [size, setSize] = useState(3);
  const [tool, setTool] = useState("pen");
  useEffect(() => {
    if (!open || !ref.current) return;
    const ctx = ref.current.getContext("2d");
    ctx.fillStyle = "#fff"; ctx.fillRect(0,0,800,480);
  }, [open]);
  const pos = (e) => { const r=ref.current.getBoundingClientRect(); const s=e.touches?.[0]??e; return {x:s.clientX-r.left,y:s.clientY-r.top}; };
  const start = (e) => { const {x,y}=pos(e); const c=ref.current.getContext("2d"); c.beginPath(); c.moveTo(x,y); setDrawing(true); };
  const draw = (e) => { if(!drawing) return; const {x,y}=pos(e); const c=ref.current.getContext("2d"); c.strokeStyle=tool==="eraser"?"#fff":color; c.lineWidth=tool==="eraser"?24:size; c.lineCap="round"; c.lineTo(x,y); c.stroke(); };
  const stop = () => { setDrawing(false); if(ref.current) ref.current.getContext("2d").beginPath(); };
  const clear = () => { const c=ref.current.getContext("2d"); c.fillStyle="#fff"; c.fillRect(0,0,800,480); };
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-bold flex items-center gap-2"><PenTool className="w-4 h-4"/>Scratch Pad</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded"><X className="w-5 h-5"/></button>
        </div>
        <div className="p-3 border-b flex flex-wrap items-center gap-3">
          {["pen","eraser"].map(t=>(
            <button key={t} onClick={()=>setTool(t)} className={`px-3 py-1.5 rounded-lg text-sm capitalize ${tool===t?"bg-purple-600 text-white":"bg-gray-200"}`}>{t}</button>
          ))}
          {tool==="pen" && ["#1a1a1a","#e74c3c","#3498db","#27ae60","#f39c12"].map(c=>(
            <button key={c} onClick={()=>setColor(c)} style={{background:c}} className={`w-7 h-7 rounded-full border-2 ${color===c?"border-purple-500 scale-110":"border-gray-300"}`}/>
          ))}
          {tool==="pen" && <input type="range" min="1" max="12" value={size} onChange={e=>setSize(+e.target.value)} className="w-20"/>}
          <button onClick={clear} className="ml-auto px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm flex items-center gap-1"><Trash2 className="w-4 h-4"/>Clear</button>
        </div>
        <canvas ref={ref} width={760} height={420} onMouseDown={start} onMouseMove={draw} onMouseUp={stop} onMouseLeave={stop} onTouchStart={start} onTouchMove={draw} onTouchEnd={stop} className="m-3 border-2 border-gray-200 rounded-xl cursor-crosshair" style={{touchAction:"none",maxWidth:"100%"}}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 7. CONCEPT INTRO SCREEN
// ─────────────────────────────────────────────────────────────
function ConceptIntro({ theme, onStart }) {
  const ex = EXAMPLES[theme];
  if (!ex) { onStart(); return null; }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Lightbulb className="w-5 h-5"/></div>
              <span className="text-sm font-medium uppercase tracking-wide opacity-80">New Concept</span>
            </div>
            <h2 className="text-2xl font-bold">{ex.title}</h2>
            <p className="mt-2 opacity-90 text-sm">{ex.intro}</p>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-600"/>Steps to solve:</h3>
            <ol className="space-y-2 mb-6">
              {ex.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i+1}</span>
                  <span className="text-gray-700 text-sm">{step}</span>
                </li>
              ))}
            </ol>
            <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-amber-500"/>Worked examples:</h3>
            <div className="space-y-3 mb-6">
              {ex.worked.map((w, i) => (
                <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="font-semibold text-gray-800 mb-1">📝 {w.problem}</p>
                  <p className="text-amber-800 text-sm">✅ {w.solution}</p>
                </div>
              ))}
            </div>
            <button onClick={onStart} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Play className="w-5 h-5"/>Start Practice Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 8. WORKSHEET RESULTS SCREEN
// ─────────────────────────────────────────────────────────────
function WorksheetResults({ questions, answers, dayNumber, onContinue, isRetry }) {
  const correct = questions.filter((q,i) => isCorrect(answers[i], q.answer));
  const wrong = questions.filter((q,i) => !isCorrect(answers[i], q.answer));
  const pct = Math.round(correct.length / questions.length * 100);
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Score card */}
        <div className={`rounded-3xl shadow-xl p-7 text-white bg-gradient-to-r ${pct>=80?"from-green-500 to-emerald-600":pct>=60?"from-yellow-500 to-amber-600":"from-red-500 to-rose-600"}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm font-medium">{isRetry?"Retry Review":"Day " + dayNumber} Results</p>
              <h2 className="text-3xl font-bold mt-1">{pct >= 80 ? "Great Work! 🎉" : pct >= 60 ? "Good Effort! 💪" : "Keep Practicing! 📚"}</h2>
            </div>
            <div className="text-right">
              <p className="text-5xl font-bold">{pct}%</p>
              <p className="text-white/80 text-sm">{correct.length} / {questions.length} correct</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-full h-3">
            <div className="bg-white h-3 rounded-full transition-all" style={{width:`${pct}%`}}/>
          </div>
        </div>

        {/* Wrong answers review */}
        {wrong.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-red-600">
              <XCircle className="w-5 h-5"/>Questions to Review ({wrong.length})
            </h3>
            <p className="text-sm text-gray-500 mb-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
              📌 These questions will appear again tomorrow so you can master them!
            </p>
            <div className="space-y-4">
              {wrong.slice(0, showAll ? wrong.length : 5).map((q, i) => {
                const idx = questions.indexOf(q);
                return (
                  <div key={q.id} className="border-2 border-red-100 rounded-xl p-4 bg-red-50">
                    <p className="font-semibold text-gray-800 mb-2">Q: {q.question}</p>
                    <p className="text-red-600 text-sm mb-1">❌ Your answer: <strong>{answers[idx] || "(blank)"}</strong></p>
                    <p className="text-green-700 text-sm mb-2">✅ Correct answer: <strong>{q.answer}</strong></p>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 mb-1">💡 How to solve it:</p>
                      <p className="text-sm text-gray-700">{q.explanation}</p>
                      {q.hint && <p className="text-xs text-blue-600 mt-1">Hint: {q.hint}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
            {wrong.length > 5 && (
              <button onClick={()=>setShowAll(!showAll)} className="mt-3 w-full py-2 text-sm text-purple-600 font-medium hover:bg-purple-50 rounded-xl">
                {showAll ? "Show less ▲" : `Show all ${wrong.length} wrong answers ▼`}
              </button>
            )}
          </div>
        )}

        {/* Correct answers */}
        {correct.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5"/>Correct Answers ({correct.length})
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {correct.map(q => (
                <div key={q.id} className="bg-green-50 rounded-lg p-3 border border-green-100">
                  <p className="text-xs text-gray-500 truncate">{q.question}</p>
                  <p className="text-green-700 font-semibold text-sm">✓ {q.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={onContinue} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <ArrowRight className="w-5 h-5"/>
          {wrong.length > 0 ? "Continue to Next Day" : "Continue"}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 9. LEVEL ASSESSMENT TEST
// ─────────────────────────────────────────────────────────────
function LevelAssessment({ level, onPass, onFail }) {
  const [questions] = useState(() => {
    const pool = generateLevelQuestions(level);
    return shuffle(pool).slice(0, 40);
  });
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [done, setDone] = useState(false);
  const [wb, setWb] = useState(false);

  const submit = (ans) => {
    const newA = [...answers, ans];
    if (cur + 1 >= questions.length) {
      setAnswers(newA);
      setDone(true);
    } else {
      setAnswers(newA);
      setCur(cur+1);
      setInput("");
      setShowHint(false);
    }
  };

  if (done) {
    const correct = questions.filter((q,i) => isCorrect(answers[i], q.answer)).length;
    const pct = Math.round(correct / questions.length * 100);
    const passed = pct >= 85;
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5 ${passed?"bg-green-100":"bg-red-100"}`}>
            {passed ? <Trophy className="w-12 h-12 text-green-600"/> : <RotateCcw className="w-12 h-12 text-red-500"/>}
          </div>
          <h2 className="text-3xl font-bold mb-2">{passed ? "Level Complete! 🎉" : "Not Quite Yet..."}</h2>
          <p className="text-gray-500 mb-5">{passed ? "You've mastered this level!" : "You need 85% to advance. Let's practice more!"}</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className={`rounded-2xl p-4 ${passed?"bg-green-50":"bg-red-50"}`}>
              <p className="text-3xl font-bold" style={{color:passed?"#27ae60":"#e74c3c"}}>{pct}%</p>
              <p className="text-xs text-gray-500">Score</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4">
              <p className="text-3xl font-bold text-blue-600">{correct}/{questions.length}</p>
              <p className="text-xs text-gray-500">Correct</p>
            </div>
            <div className={`rounded-2xl p-4 ${passed?"bg-purple-50":"bg-amber-50"}`}>
              <p className="text-3xl font-bold" style={{color:passed?"#9b59b6":"#f39c12"}}>85%</p>
              <p className="text-xs text-gray-500">Required</p>
            </div>
          </div>
          {passed ? (
            <button onClick={onPass} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg flex items-center justify-center gap-2">
              <ArrowRight className="w-5 h-5"/>Advance to Next Level
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-amber-700 bg-amber-50 rounded-xl p-3">You scored {pct}%. You need {85-pct}% more to pass. Review the level again and try your best!</p>
              <button onClick={onFail} className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg flex items-center justify-center gap-2">
                <RotateCcw className="w-5 h-5"/>Repeat Level from Start
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const q = questions[cur];
  const info = LEVEL_MAP[level];
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-bold text-indigo-700">Level {level} Assessment</span>
              <span className="text-gray-400 text-sm ml-3">Q {cur+1} of {questions.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Need 85% to pass</span>
              <button onClick={()=>setWb(true)} className="p-2 bg-purple-100 text-purple-700 rounded-lg"><PenTool className="w-4 h-4"/></button>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="h-2 rounded-full bg-indigo-600 transition-all" style={{width:`${(cur/questions.length)*100}%`}}/>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-7">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-white text-xs font-medium" style={{background:info.color}}>{q.theme}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${q.difficulty==="easy"?"bg-green-100 text-green-700":q.difficulty==="hard"?"bg-red-100 text-red-700":"bg-yellow-100 text-yellow-700"}`}>{q.difficulty}</span>
          </div>
          <h2 className="text-xl font-bold mt-3 mb-6">{q.question}</h2>
          {q.type==="multiple" ? (
            <div className="space-y-3">
              {q.options.map((opt,i) => (
                <button key={i} onClick={()=>submit(opt)} className="w-full text-left px-5 py-3.5 rounded-xl border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all font-medium">{opt}</button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <input type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&input.trim())submit(input.trim());}} placeholder="Type your answer…" autoFocus className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-lg"/>
              <div className="flex gap-3">
                <button onClick={()=>setShowHint(!showHint)} className="px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-sm border border-amber-200 hover:bg-amber-100">💡 {showHint?"Hide":"Hint"}</button>
                <button onClick={()=>{if(input.trim())submit(input.trim());}} disabled={!input.trim()} className="flex-1 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-40">Submit →</button>
              </div>
              {showHint && <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">💡 {q.hint}</div>}
            </div>
          )}
        </div>
      </div>
      <Whiteboard open={wb} onClose={()=>setWb(false)}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 10. MAIN LEARN APP (worksheet engine)
// ─────────────────────────────────────────────────────────────
function LearnApp({ studentName, startLevel, onBackToHome }) {
  const DAILY_Q = 50;
  const DAYS_PER_LEVEL = 60; // 60 days × 50 questions = 3000 per level

  // Student progress persisted in localStorage
  const [progress, setProgress] = useState(() => loadState(`skillora-progress-${studentName}`, {
    currentLevel: startLevel,
    dayNumber: 1,
    completedDays: {},   // { "A-1": { correct, total, wrongIds }, ... }
    levelAttempt: {},    // { "A": 1 } — how many times level attempted
    levelQuestions: {},  // { "A": [all generated questions] }
    pendingRetry: {},    // { "A-2": [question ids to retry] } — wrong q's from prev day
    seenThemes: {},      // { "A": ["Counting 1-20"] } — which themes already shown examples for
  }));

  const [view, setView] = useState("dashboard"); // dashboard|concept|worksheet|results|assessment
  const [worksheetQ, setWorksheetQ] = useState([]);
  const [curQ, setCurQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [wb, setWb] = useState(false);
  const [pendingTheme, setPendingTheme] = useState(null);
  const [isRetryDay, setIsRetryDay] = useState(false);

  const save = (newProg) => { setProgress(newProg); saveState(`skillora-progress-${studentName}`, newProg); };

  // Get or generate questions for current level
  const getLevelQuestions = (prog, level) => {
    if (prog.levelQuestions[level] && prog.levelQuestions[level].length > 0) {
      return prog.levelQuestions[level];
    }
    const generated = generateLevelQuestions(level);
    const updated = { ...prog, levelQuestions: { ...prog.levelQuestions, [level]: generated } };
    save(updated);
    return generated;
  };

  // Build today's 50 questions
  const buildDailyWorksheet = (prog) => {
    const level = prog.currentLevel;
    const day = prog.dayNumber;
    const dayKey = `${level}-${day}`;
    const allQ = getLevelQuestions(prog, level);

    // How many questions per theme (distribute across themes over 60 days)
    const themes = LEVEL_MAP[level].themes;
    const themeIndex = (day - 1) % themes.length;
    const primaryTheme = themes[themeIndex];
    const secondaryTheme = themes[(themeIndex + 1) % themes.length];

    // Check if this theme needs a concept intro
    const seenThemes = prog.seenThemes[level] || [];
    if (!seenThemes.includes(primaryTheme) && EXAMPLES[primaryTheme]) {
      return { needsIntro: true, theme: primaryTheme };
    }

    // Get retry questions from previous day
    const prevDayKey = `${level}-${day - 1}`;
    const retryIds = prog.pendingRetry[prevDayKey] || [];
    const retryQ = allQ.filter(q => retryIds.includes(q.id)).slice(0, 15); // max 15 retry

    // Fill remaining from today's themes
    const remaining = DAILY_Q - retryQ.length;
    const primaryQ = shuffle(allQ.filter(q => q.theme === primaryTheme)).slice(0, Math.ceil(remaining * 0.6));
    const secondaryQ = shuffle(allQ.filter(q => q.theme === secondaryTheme)).slice(0, Math.ceil(remaining * 0.4));

    let todayQ = shuffle([...retryQ, ...primaryQ, ...secondaryQ]).slice(0, DAILY_Q);

    // If not enough questions, fill from any theme
    if (todayQ.length < DAILY_Q) {
      const ids = new Set(todayQ.map(q => q.id));
      const extra = shuffle(allQ.filter(q => !ids.has(q.id))).slice(0, DAILY_Q - todayQ.length);
      todayQ = [...todayQ, ...extra];
    }

    return { needsIntro: false, questions: todayQ, retryCount: retryQ.length };
  };

  const startDay = () => {
    const result = buildDailyWorksheet(progress);
    if (result.needsIntro) {
      setPendingTheme(result.theme);
      setView("concept");
    } else {
      setIsRetryDay(result.retryCount > 0);
      setWorksheetQ(result.questions);
      setCurQ(0); setAnswers([]); setInputVal(""); setShowHint(false);
      setView("worksheet");
    }
  };

  const handleConceptDone = () => {
    const newProg = { ...progress };
    if (!newProg.seenThemes[newProg.currentLevel]) newProg.seenThemes[newProg.currentLevel] = [];
    if (!newProg.seenThemes[newProg.currentLevel].includes(pendingTheme)) {
      newProg.seenThemes[newProg.currentLevel].push(pendingTheme);
    }
    save(newProg);
    setPendingTheme(null);
    // Now build the worksheet
    const result = buildDailyWorksheet(newProg);
    setIsRetryDay((result.retryCount || 0) > 0);
    setWorksheetQ(result.questions || []);
    setCurQ(0); setAnswers([]); setInputVal(""); setShowHint(false);
    setView("worksheet");
  };

  const submitAnswer = (ans) => {
    const newA = [...answers, ans];
    if (curQ + 1 >= worksheetQ.length) {
      setAnswers(newA);
      setView("results");
    } else {
      setAnswers(newA);
      setCurQ(curQ+1);
      setInputVal("");
      setShowHint(false);
    }
  };

  const handleResultsContinue = () => {
    const level = progress.currentLevel;
    const day = progress.dayNumber;
    const dayKey = `${level}-${day}`;

    // Collect wrong question IDs for retry tomorrow
    const wrongIds = worksheetQ.filter((q,i) => !isCorrect(answers[i], q.answer)).map(q => q.id);
    const correct = worksheetQ.length - wrongIds.length;

    const newProg = {
      ...progress,
      completedDays: {
        ...progress.completedDays,
        [dayKey]: { correct, total: worksheetQ.length, wrongIds }
      },
      pendingRetry: { ...progress.pendingRetry, [dayKey]: wrongIds },
      dayNumber: day + 1,
    };

    // Check if level is complete (60 days done)
    if (day >= DAYS_PER_LEVEL) {
      save({ ...newProg, dayNumber: day }); // keep current day for assessment
      setView("assessment");
    } else {
      save(newProg);
      setView("dashboard");
    }
  };

  const handleAssessmentPass = () => {
    const currentIdx = LEVEL_ORDER.indexOf(progress.currentLevel);
    const nextLevel = LEVEL_ORDER[currentIdx + 1] || progress.currentLevel;
    const newProg = {
      ...progress,
      currentLevel: nextLevel,
      dayNumber: 1,
      pendingRetry: {},
    };
    save(newProg);
    setView("dashboard");
  };

  const handleAssessmentFail = () => {
    // Reset the level — clear completed days, questions, retry, seen themes for this level
    const level = progress.currentLevel;
    const newProg = {
      ...progress,
      dayNumber: 1,
      pendingRetry: {},
      levelAttempt: { ...progress.levelAttempt, [level]: (progress.levelAttempt[level] || 1) + 1 },
      levelQuestions: { ...progress.levelQuestions, [level]: [] }, // regenerate
      seenThemes: { ...progress.seenThemes, [level]: [] },
      completedDays: Object.fromEntries(Object.entries(progress.completedDays).filter(([k]) => !k.startsWith(level + "-")))
    };
    save(newProg);
    setView("dashboard");
  };

  // ── VIEWS ──────────────────────────────────────────────
  if (view === "concept") return <ConceptIntro theme={pendingTheme} onStart={handleConceptDone}/>;

  if (view === "results") return (
    <WorksheetResults questions={worksheetQ} answers={answers} dayNumber={progress.dayNumber} onContinue={handleResultsContinue} isRetry={isRetryDay}/>
  );

  if (view === "assessment") return (
    <LevelAssessment level={progress.currentLevel} onPass={handleAssessmentPass} onFail={handleAssessmentFail}/>
  );

  if (view === "worksheet") {
    const q = worksheetQ[curQ];
    if (!q) return null;
    const pct = (curQ / worksheetQ.length) * 100;
    const info = LEVEL_MAP[q.level];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background:info.color}}>{q.level}</div>
                <div>
                  <p className="font-bold text-sm text-gray-700">Day {progress.dayNumber} · {q.theme}</p>
                  <p className="text-xs text-gray-400">Question {curQ+1} of {worksheetQ.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isRetryDay && curQ < worksheetQ.filter((_,i)=>i<curQ && progress.pendingRetry[`${progress.currentLevel}-${progress.dayNumber-1}`]?.includes(worksheetQ[i]?.id)).length && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">📌 Retry</span>
                )}
                <button onClick={()=>setWb(true)} className="p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"><PenTool className="w-4 h-4"/></button>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="h-2.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all" style={{width:`${pct}%`}}/>
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-3xl shadow-xl p-7">
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">{q.difficulty}</p>
            <h2 className="text-xl font-bold text-gray-800 mb-6">{q.question}</h2>

            {q.type === "multiple" ? (
              <div className="space-y-3">
                {q.options.map((opt,i) => (
                  <button key={i} onClick={()=>submitAnswer(opt)} className="w-full text-left px-5 py-3.5 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all font-medium text-gray-700">{opt}</button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <input type="text" value={inputVal} onChange={e=>setInputVal(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&inputVal.trim())submitAnswer(inputVal.trim());}} placeholder="Your answer…" autoFocus className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none text-xl"/>
                <div className="flex gap-3">
                  <button onClick={()=>setShowHint(!showHint)} className="px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-sm border border-amber-200 hover:bg-amber-100 font-medium">💡 {showHint?"Hide Hint":"Show Hint"}</button>
                  <button onClick={()=>{if(inputVal.trim())submitAnswer(inputVal.trim());}} disabled={!inputVal.trim()} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-md disabled:opacity-40 transition-all">Submit →</button>
                </div>
                {showHint && <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">💡 {q.hint}</div>}
              </div>
            )}
          </div>
        </div>
        <Whiteboard open={wb} onClose={()=>setWb(false)}/>
      </div>
    );
  }

  // ── DASHBOARD ──────────────────────────────────────────
  const level = progress.currentLevel;
  const info = LEVEL_MAP[level];
  const day = progress.dayNumber;
  const daysDone = Object.keys(progress.completedDays).filter(k=>k.startsWith(level+"-")).length;
  const totalCorrect = Object.values(progress.completedDays).reduce((s,v)=>s+v.correct,0);
  const totalQ = Object.values(progress.completedDays).reduce((s,v)=>s+v.total,0);
  const levelPct = Math.round(daysDone / DAYS_PER_LEVEL * 100);
  const overallAcc = totalQ > 0 ? Math.round(totalCorrect/totalQ*100) : 0;
  const todayDone = progress.completedDays[`${level}-${day}`];
  const readyForAssessment = daysDone >= DAYS_PER_LEVEL;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6"
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "24px 16px",
        background: "linear-gradient(135deg, #F5F0FF 0%, #EFF6FF 100%)",
      }}
    >
      <div className="max-w-xl mx-auto" style={{ maxWidth: 576, margin: "0 auto" }}>
        {/* Header */}
        <div
          className="flex items-center justify-between mb-6"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, gap: 12 }}
        >
          <div className="flex items-center gap-3" style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <div
              className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
              style={{
                width: 48,
                height: 48,
                borderRadius: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background: "linear-gradient(135deg, #7C3AED, #2563EB)",
              }}
            >
              <Brain className="w-6 h-6 text-white" style={{ width: 24, height: 24, color: "white" }} />
            </div>
            <div style={{ minWidth: 0 }}>
              <p className="font-bold text-gray-800" style={{ fontWeight: 800, color: "#1F2937" }}>Hi, {studentName}! 👋</p>
              <p className="text-sm text-gray-500" style={{ fontSize: 13, color: "#6B7280" }}>{info.grade}</p>
            </div>
          </div>
          <button
            onClick={onBackToHome}
            className="p-2 hover:bg-gray-200 rounded-xl text-gray-500"
            style={{ padding: 8, borderRadius: 12, background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", color: "#6B7280", flexShrink: 0 }}
          >
            <Home className="w-5 h-5" style={{ width: 20, height: 20 }} />
          </button>
        </div>

        {/* Level card */}
        <div className="rounded-3xl text-white p-6 mb-5 shadow-xl" style={{background:`linear-gradient(135deg, ${info.color}, ${info.color}dd)`}}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/70 text-sm">Current Level</p>
              <h2 className="text-3xl font-bold">Level {level}</h2>
              <p className="text-white/90 text-sm mt-0.5">{info.grade} · Ages {info.ageRange}</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs">Day</p>
              <p className="text-4xl font-bold">{day}</p>
              <p className="text-white/70 text-xs">of {DAYS_PER_LEVEL}</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-full h-3 mb-1">
            <div className="bg-white h-3 rounded-full transition-all" style={{width:`${levelPct}%`}}/>
          </div>
          <div className="flex justify-between text-xs text-white/70">
            <span>{daysDone} days completed</span><span>{levelPct}% of level done</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label:"Overall Accuracy", value:`${overallAcc}%`, color:"text-purple-600", bg:"bg-purple-50" },
            { label:"Days Done", value:String(daysDone), color:"text-blue-600", bg:"bg-blue-50" },
            { label:"Questions Done", value:totalQ > 999 ? `${(totalQ/1000).toFixed(1)}k` : String(totalQ), color:"text-green-600", bg:"bg-green-50" },
          ].map(s=>(
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-center shadow-sm`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Today's retry notice */}
        {(() => {
          const prevKey = `${level}-${day-1}`;
          const retryIds = progress.pendingRetry[prevKey] || [];
          return retryIds.length > 0 && !todayDone ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4 flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"/>
              <div>
                <p className="font-semibold text-amber-800 text-sm">📌 {retryIds.length} questions from yesterday included</p>
                <p className="text-xs text-amber-600">These are questions you missed — let's master them today!</p>
              </div>
            </div>
          ) : null;
        })()}

        {/* Action button */}
        {readyForAssessment ? (
          <div className="bg-white rounded-2xl shadow p-5 mb-4">
            <div className="text-center mb-4">
              <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-2"/>
              <h3 className="text-xl font-bold">Level {level} Complete!</h3>
              <p className="text-gray-500 text-sm">You've finished all 60 days. Take the assessment test to advance.</p>
            </div>
            <button onClick={()=>setView("assessment")} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg flex items-center justify-center gap-2">
              <Award className="w-5 h-5"/>Take Level {level} Assessment
            </button>
          </div>
        ) : todayDone ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2"/>
            <h3 className="font-bold text-green-800">Today's worksheet done! ✅</h3>
            <p className="text-sm text-green-600">Score: {Math.round(todayDone.correct/todayDone.total*100)}% · {todayDone.correct}/{todayDone.total} correct</p>
            <p className="text-xs text-gray-400 mt-1">Come back tomorrow for Day {day+1}!</p>
          </div>
        ) : (
          <button onClick={startDay} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold text-xl hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-3 mb-4">
            <Play className="w-6 h-6"/>Start Day {day} · 50 Questions
          </button>
        )}

        {/* Recent days */}
        {daysDone > 0 && (
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2"><Calendar className="w-4 h-4"/>Recent Days</h3>
            <div className="space-y-2">
              {Array.from({length:Math.min(7,daysDone)},(_,i)=>{
                const d = daysDone - i;
                const dk = `${level}-${d}`;
                const data = progress.completedDays[dk];
                if (!data) return null;
                const acc = Math.round(data.correct/data.total*100);
                return (
                  <div key={dk} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-500">{d}</div>
                    <div className="flex-1">
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className={`h-2 rounded-full ${acc>=80?"bg-green-400":acc>=60?"bg-yellow-400":"bg-red-400"}`} style={{width:`${acc}%`}}/>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold w-12 text-right ${acc>=80?"text-green-600":acc>=60?"text-yellow-600":"text-red-500"}`}>{acc}%</span>
                    {data.wrongIds?.length > 0 && <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{data.wrongIds.length} retry</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 11. HOME / LANDING PAGE
// ─────────────────────────────────────────────────────────────
function getStartLevelForAge(age) {
  const a = parseInt(age);
  if (a<=5) return "A"; if (a<=6) return "B"; if (a<=7) return "C";
  if (a<=8) return "D"; if (a<=9) return "E"; if (a<=10) return "F";
  if (a<=11) return "G"; if (a<=12) return "H"; if (a<=13) return "I";
  if (a<=14) return "J"; if (a<=15) return "K"; return "L";
}


// ─────────────────────────────────────────────────────────────
// ROOT — orchestrates all screens
// ─────────────────────────────────────────────────────────────
export default function App() {
  // Inject global styles + fonts
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => { try { document.head.removeChild(el); } catch {} };
  }, []);

  // State machine:
  // onboarding → login → parent_dash | child_placement → child_learn
  const [screen, setScreen] = useState(() => getApp() ? "login" : "onboarding");
  const [activeChild, setActiveChild] = useState(null);
  const [celebData, setCelebData] = useState(null); // {score,total,wrong}

  const refreshApp = () => {};

  // ── 1. Onboarding complete
  const handleOnboardingDone = (formData) => {
    const app = initApp(
      formData.email, formData.password, formData.pin,
      formData.plan, formData.children || []
    );
    setApp(app);
    setScreen("login");
  };

  // ── 2. Parent logged in
  const handleParentLogin = () => setScreen("parent_dash");

  // ── 3. Child profile tapped
  const handleChildEnter = (child) => {
    setActiveChild(child);
    const prog = LS.get(`skillora-progress-${child.name}`, null);
    // Check if placement has been done
    const appData = getApp();
    const childRecord = appData?.children?.find(c => c.id === child.id);
    if (!childRecord?.placementDone && !prog) {
      setScreen("child_placement");
    } else {
      setScreen("child_learn");
    }
  };

  // ── 4. Placement complete
  const handlePlacementDone = (level) => {
    const appData = getApp();
    if (appData && activeChild) {
      appData.children = appData.children.map(c =>
        c.id === activeChild.id ? { ...c, level, placementDone: true } : c
      );
      setApp(appData);
      // Init progress
      LS.set(`skillora-progress-${activeChild.name}`, {
        currentLevel: level, dayNumber: 1,
        completedDays: {}, levelAttempt: {}, levelQuestions: {},
        pendingRetry: {}, seenThemes: {},
      });
      setActiveChild({ ...activeChild, level, placementDone: true });
    }
    setScreen("child_learn");
  };

  // ── 5. Parent switches to child from dashboard
  const handleDashSwitchChild = (child) => {
    setActiveChild(child);
    setScreen("child_learn");
  };

  // ── 6. Logout
  const handleLogout = () => {
    setScreen("login");
    setActiveChild(null);
    setCelebData(null);
  };

  // ── 7. Child back to login
  const handleChildBack = () => {
    setScreen("login");
    setActiveChild(null);
    setCelebData(null);
  };

  // ── Render ────────────────────────────────────────
  return (
    <>
      {screen === "onboarding"       && <OnboardingFlow onComplete={handleOnboardingDone}/>}
      {screen === "login"            && <LoginScreen onParentLogin={handleParentLogin} onChildEnter={handleChildEnter}/>}
      {screen === "parent_dash"      && <ParentDashboard onLogout={handleLogout} onSwitchToChild={handleDashSwitchChild}/>}
      {screen === "child_placement"  && activeChild && <ChildPlacement child={activeChild} onComplete={handlePlacementDone}/>}
      {screen === "child_learn"      && activeChild && (
        <LearnApp
          studentName={activeChild.name}
          startLevel={activeChild.level || getStartLevel(parseInt(activeChild.age||"10"))}
          onBackToHome={handleChildBack}
          childData={activeChild}
        />
      )}
      {celebData && (
        <CelebrationOverlay
          score={celebData.score} total={celebData.total} wrongCount={celebData.wrong}
          onContinue={()=>setCelebData(null)}
        />
      )}
    </>
  );
}
