// ═══════════════════════════════════════════════════════════════
// e-SKILLORA v3  —  Complete Application
// Parent & Child Onboarding · Netflix-style Login · Parent Dashboard
// Child Placement · Daily Worksheets · 85% Mastery Tests
// Single file → drop in as src/App.jsx in Replit
// ═══════════════════════════════════════════════════════════════
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Brain, Play, CheckCircle, XCircle, Home, PenTool, Trash2, X,
  Lock, Plus, BookOpen, BarChart3, ChevronRight, ChevronLeft,
  RefreshCw, Star, Calendar, Lightbulb, ArrowRight, Trophy,
  RotateCcw, Eye, EyeOff, Settings, Users, CreditCard, LogOut,
  Shield, Clock, Check, Edit2, Minus, Mail, Bell, Award,
  TrendingUp, Target, Zap, AlertCircle, HelpCircle, Flame, Sparkles
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
html,body{min-height:100%;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%}
body{font-family:'Instrument Sans',sans-serif;background:#F7F3ED;color:#1A1A1A}
:root{
  --cream:#F7F3ED;--cream-d:#EDE8E0;--cream-dd:#E0D9CF;
  --forest:#1C3A2F;--forest-m:#2A5240;--forest-l:#3D7A5C;--forest-xl:#4F9E74;
  --gold:#C9973A;--gold-l:#E5B96A;--gold-ll:#F5E4C0;
  --coral:#E8604C;--coral-l:#F08070;
  --sage:#8BAF94;--sage-l:#B8D4BE;--sage-ll:#E6F0E8;
  --ink:#1A1A1A;--ink-m:#3D3D3D;--ink-l:#6B6B6B;--ink-ll:#9A9A9A;
  --white:#FFFFFF;
  --purple:#7C3AED;--purple-l:#A78BFA;--purple-ll:#EDE9FE;
  --blue:#2563EB;--blue-l:#60A5FA;--blue-ll:#DBEAFE;
  --amber:#D97706;--amber-l:#FCD34D;--amber-ll:#FEF3C7;
  --green:#16A34A;--green-l:#4ADE80;--green-ll:#DCFCE7;
  --grad-forest:linear-gradient(145deg,#1C3A2F 0%,#2A5240 100%);
  --grad-gold:linear-gradient(145deg,#C9973A 0%,#E5B96A 100%);
  --grad-learn:linear-gradient(145deg,#7C3AED 0%,#2563EB 100%);
  --grad-success:linear-gradient(145deg,#16A34A 0%,#22C55E 100%);
  --grad-coral:linear-gradient(145deg,#E8604C 0%,#F87060 100%);
  --grad-hero:linear-gradient(160deg,#1C3A2F 0%,#2A5240 45%,#3D7A5C 100%);
  --shadow-xs:0 1px 3px rgba(0,0,0,0.07);
  --shadow-sm:0 2px 8px rgba(0,0,0,0.09);
  --shadow-md:0 4px 20px rgba(0,0,0,0.11);
  --shadow-lg:0 8px 40px rgba(0,0,0,0.14);
  --shadow-xl:0 16px 64px rgba(0,0,0,0.18);
  --shadow-forest:0 8px 32px rgba(28,58,47,0.22);
  --shadow-gold:0 8px 32px rgba(201,151,58,0.26);
  --shadow-learn:0 8px 32px rgba(124,58,237,0.22);
  --r-xs:6px;--r-sm:10px;--r-md:16px;--r-lg:20px;--r-xl:28px;--r-2xl:40px;--r-full:9999px;
  --nav-h:66px;
  --safe-b:env(safe-area-inset-bottom,0px);
}
input,button,textarea,select{font-family:inherit}
button{cursor:pointer}
.sci{animation:fadeUp .45s cubic-bezier(.22,1,.36,1) both}
.sci2{animation:fadeUp .45s .08s cubic-bezier(.22,1,.36,1) both}
.sci3{animation:fadeUp .45s .16s cubic-bezier(.22,1,.36,1) both}
.sci4{animation:fadeUp .45s .24s cubic-bezier(.22,1,.36,1) both}
.fin{animation:fadeIn .35s ease both}
.sli{animation:slideIn .4s cubic-bezier(.22,1,.36,1) both}
.scl{animation:scaleIn .35s cubic-bezier(.22,1,.36,1) both}
.pop{animation:pop .5s cubic-bezier(.22,1,.36,1) both}
.flt{animation:float 3s ease-in-out infinite}
.cel{animation:celebrate .6s ease both}
.pulse{animation:pulse 2s ease-in-out infinite}
.afu{animation:fadeUp .45s cubic-bezier(.22,1,.36,1) both}
.afi{animation:fadeIn .35s ease both}
.asi{animation:slideIn .4s cubic-bezier(.22,1,.36,1) both}
.float{animation:float 3s ease-in-out infinite}
.d1{animation-delay:.06s}.d2{animation-delay:.12s}.d3{animation-delay:.18s}.d4{animation-delay:.24s}.d5{animation-delay:.3s}
input:-webkit-autofill,input:-webkit-autofill:focus{transition:background-color 9999s ease 0s,-webkit-text-fill-color 9999s ease 0s;-webkit-text-fill-color:var(--ink)!important}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideIn{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:none}}
@keyframes scaleIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
@keyframes pop{0%{opacity:0;transform:scale(0) rotate(-8deg)}70%{transform:scale(1.08) rotate(2deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes celebrate{0%{transform:scale(1)}30%{transform:scale(1.1)}60%{transform:scale(.97)}100%{transform:scale(1)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes slideUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:none}}
@keyframes bounceIn{0%{opacity:0;transform:scale(.6)}60%{transform:scale(1.1)}100%{opacity:1;transform:scale(1)}}
@keyframes confettiFall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}
@keyframes streakPop{0%{transform:scale(1)}40%{transform:scale(1.3)}70%{transform:scale(0.9)}100%{transform:scale(1)}}
@keyframes masteryGlow{0%,100%{box-shadow:0 0 20px rgba(201,151,58,0.4)}50%{box-shadow:0 0 40px rgba(201,151,58,0.8)}}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--cream-dd);border-radius:999px}
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
  { id:"1child",  label:"1 Child",    price:10.99, cap:1, desc:"1 child · All 12 levels · AI tutor",   badge:null,          color:"var(--sage)",   dark:"var(--forest)" },
  { id:"2child",  label:"2 Children", price:14.99, cap:2, desc:"2 children · All 12 levels · AI tutor", badge:"Best Value",  color:"var(--forest)", dark:"var(--cream)" },
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
const BASE_APP_KEY = "eskillora_v3_app";
let _appKey = BASE_APP_KEY;
function _setAppKey(userId) { _appKey = userId ? `${BASE_APP_KEY}_${userId}` : BASE_APP_KEY; }
const getApp  = ()  => LS.get(_appKey, null);
const setApp  = (d) => LS.set(_appKey, d);

function initApp(email, password, pin, plan, children) {
  return {
    v: 3,
    parent: { email, password, pin, plan, trialEnd: Date.now() + 3*24*3600*1000 },
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
  btn:(v="primary",full=false,disabled=false,size="md")=>({
    display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,
    fontFamily:"'Instrument Sans',sans-serif",fontWeight:700,
    fontSize:size==="lg"?17:size==="sm"?13:15,
    borderRadius:"var(--r-full)",border:"none",
    cursor:disabled?"not-allowed":"pointer",
    transition:"all .18s cubic-bezier(.22,1,.36,1)",userSelect:"none",outline:"none",
    padding:size==="lg"?"16px 32px":size==="sm"?"9px 18px":"13px 26px",
    width:full?"100%":"auto",opacity:disabled?.45:1,
    letterSpacing:"-0.01em",
    ...(v==="primary"&&{background:"var(--grad-forest)",color:"var(--cream)",boxShadow:"var(--shadow-forest)"}),
    ...(v==="gold"&&{background:"var(--grad-gold)",color:"var(--forest)",boxShadow:"var(--shadow-gold)"}),
    ...(v==="learn"&&{background:"var(--grad-learn)",color:"#fff",boxShadow:"var(--shadow-learn)"}),
    ...(v==="success"&&{background:"var(--grad-success)",color:"#fff",boxShadow:"0 8px 28px rgba(22,163,74,0.28)"}),
    ...(v==="outline"&&{background:"rgba(255,255,255,0.9)",color:"var(--forest)",border:"1.5px solid var(--cream-dd)",boxShadow:"var(--shadow-xs)"}),
    ...(v==="ghost"&&{background:"transparent",color:"var(--ink-l)",padding:size==="sm"?"7px 14px":"10px 18px",boxShadow:"none"}),
    ...(v==="danger"&&{background:"var(--grad-coral)",color:"#fff",boxShadow:"0 8px 24px rgba(232,96,76,0.28)"}),
    ...(v==="sage"&&{background:"var(--sage-ll)",color:"var(--forest)",border:"1px solid var(--sage-l)"}),
    ...(v==="white"&&{background:"rgba(255,255,255,0.18)",color:"#fff",border:"1.5px solid rgba(255,255,255,0.32)",backdropFilter:"blur(8px)"}),
  }),
  card:(p=24,hover=false)=>({
    background:"rgba(255,255,255,0.92)",
    borderRadius:"var(--r-xl)",padding:p,
    border:"1px solid rgba(224,217,207,0.7)",
    boxShadow:"var(--shadow-md)",
    backdropFilter:"blur(12px)",
    transition:hover?"all .22s cubic-bezier(.22,1,.36,1)":undefined,
  }),
  cardForest:(p=24)=>({background:"var(--grad-forest)",borderRadius:"var(--r-xl)",padding:p,boxShadow:"var(--shadow-forest)",border:"1px solid rgba(255,255,255,0.08)"}),
  cardGlass:(p=20)=>({background:"rgba(255,255,255,0.12)",borderRadius:"var(--r-xl)",padding:p,border:"1px solid rgba(255,255,255,0.22)",backdropFilter:"blur(16px)"}),
  input:(err=false)=>({
    width:"100%",fontFamily:"'Instrument Sans',sans-serif",fontSize:16,color:"var(--ink)",
    background:"rgba(255,255,255,0.85)",
    border:`1.5px solid ${err?"var(--coral)":"rgba(224,217,207,0.9)"}`,
    borderRadius:"var(--r-md)",padding:"14px 16px",
    outline:"none",transition:"border .15s, box-shadow .15s",
    boxShadow:err?"0 0 0 3px rgba(232,96,76,0.15)":"none",
    WebkitAppearance:"none",
  }),
  inputIcon:(err=false)=>({
    width:"100%",fontFamily:"'Instrument Sans',sans-serif",fontSize:16,color:"var(--ink)",
    background:"rgba(255,255,255,0.85)",
    border:`1.5px solid ${err?"var(--coral)":"rgba(224,217,207,0.9)"}`,
    borderRadius:"var(--r-md)",padding:"14px 16px 14px 46px",
    outline:"none",transition:"border .15s",WebkitAppearance:"none",
  }),
  label:()=>({fontSize:13,fontWeight:600,color:"var(--ink-l)",display:"block",marginBottom:6,letterSpacing:"0.01em"}),
  tag:(color="forest")=>({
    display:"inline-flex",alignItems:"center",gap:4,
    fontSize:11,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",
    padding:"4px 10px",borderRadius:"var(--r-full)",
    ...(color==="forest"&&{background:"var(--sage-ll)",color:"var(--forest-m)"}),
    ...(color==="gold"&&{background:"var(--gold-ll)",color:"var(--gold)"}),
    ...(color==="coral"&&{background:"rgba(232,96,76,0.12)",color:"var(--coral)"}),
    ...(color==="purple"&&{background:"var(--purple-ll)",color:"var(--purple)"}),
    ...(color==="green"&&{background:"var(--green-ll)",color:"var(--green)"}),
    ...(color==="cream"&&{background:"rgba(255,255,255,0.2)",color:"rgba(255,255,255,0.9)"}),
  }),
};

function Btn({ children, onClick, v="primary", full=false, disabled=false, style:sx={}, size="md" }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        ...s.btn(v, full, disabled, size),
        transform:(!disabled&&hov)?"translateY(-2px)":"none",
        boxShadow:(!disabled&&hov)&&v!=="ghost"&&v!=="outline"?"0 14px 40px rgba(0,0,0,0.2)":s.btn(v).boxShadow,
        ...sx,
      }}>
      {children}
    </button>
  );
}

function Field({ label, children, type="text", value, onChange, placeholder, error, hint, icon, autoFocus, onKeyDown, required }) {
  const [show, setShow] = useState(false);
  const isPass = type === "password";
  // If children are passed, render them directly (new API)
  if (children) {
    return (
      <div style={{display:"flex",flexDirection:"column",gap:0,marginBottom:0}}>
        {label && <label style={{...s.label(),marginBottom:7}}>{label}{required&&<span style={{color:"var(--coral)",marginLeft:3}}>*</span>}</label>}
        {children}
        {error && <span style={{fontSize:12,color:"var(--coral)",marginTop:5,fontWeight:500,display:"flex",alignItems:"center",gap:4}}><AlertCircle size={12}/>{error}</span>}
        {hint && !error && <span style={{fontSize:12,color:"var(--ink-ll)",marginTop:5}}>{hint}</span>}
      </div>
    );
  }
  // Legacy API with value/onChange
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
      {label && <label style={s.label()}>{label}{required&&<span style={{color:"var(--coral)",marginLeft:3}}>*</span>}</label>}
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
      {error && <span style={{fontSize:12,color:"var(--coral)",marginTop:5,fontWeight:500,display:"flex",alignItems:"center",gap:4}}><AlertCircle size={12}/>{error}</span>}
      {hint && !error && <span style={{fontSize:12,color:"var(--ink-ll)",marginTop:5}}>{hint}</span>}
    </div>
  );
}

function Tag({ children, color="forest" }) {
  return <span style={s.tag(color)}>{children}</span>;
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
function Shell({ children, maxW=520, bg="var(--cream)", noPad=false }) {
  return (
    <div style={{minHeight:"100svh",background:bg,display:"flex",flexDirection:"column",alignItems:"center",overflowX:"hidden"}}>
      {/* Logo wordmark */}
      <div className="afu" style={{ display:"flex", alignItems:"center", gap:10, marginTop:32, marginBottom:32 }}>
        <div style={{ width:40,height:40, background:"var(--forest)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Brain size={22} color="var(--gold)"/>
        </div>
        <span style={{ fontFamily:"'Fraunces',serif", fontSize:22, fontWeight:700, color:"var(--forest)", letterSpacing:"-0.5px" }}>e-Skillora</span>
      </div>
      <div style={{width:"100%",maxWidth:maxW,flex:1,display:"flex",flexDirection:"column",padding:noPad?0:"0 16px calc(var(--safe-b) + 16px)"}}>
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
  const [sel, setSel] = useState("1child");
  return (
    <div className="afu" style={s.card(36)}>
      <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:30, fontWeight:700, color:"var(--forest)", marginBottom:6 }}>Choose a plan</h1>
      <p style={{ color:"var(--ink-l)", fontSize:15, marginBottom:28 }}>Try free for <strong>3 days</strong> · From $10.99/mo · Cancel anytime</p>

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
      <p style={{ color:"var(--ink-l)", fontSize:15, marginBottom:20 }}>3-day free trial, then ${p?.price}/month</p>

      {/* Plan pill */}
      <div style={{ background:"var(--sage-ll)", borderRadius:"var(--r-md)", padding:"12px 16px", marginBottom:24, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <p style={{ fontWeight:700, color:"var(--forest)", fontSize:14 }}>{p?.label} Plan — {p?.cap} child{p?.cap>1?"ren":""}</p>
          <p style={{ fontSize:12, color:"var(--ink-l)" }}>Free for 3 days, then billed monthly</p>
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
        <Shield size={13}/> Secured with 256-bit TLS encryption · No card charges for 3 days
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
            <label style={s.label()}>Avatar</label>

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
            <label style={s.label()}>Age</label>
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
  const [pin, setPin] = useState("");
  const [conf, setConf] = useState(false);
  const [cpin, setCpin] = useState("");
  const [err, setErr] = useState("");

  const pinInputStyle = { ...s.input(false), letterSpacing:"0.3em", fontSize:28, textAlign:"center", fontFamily:"'Fraunces',serif" };

  const handlePin = (val) => {
    const d = val.replace(/\D/g,"").slice(0,4);
    setPin(d);
    if (d.length === 4) setTimeout(()=>{ setConf(true); setCpin(""); setErr(""); }, 120);
  };

  const handleCpin = (val) => {
    const d = val.replace(/\D/g,"").slice(0,4);
    setCpin(d);
    if (d.length === 4) setTimeout(()=>{
      if (d !== pin) { setErr("PINs don't match — try again"); setCpin(""); }
      else onNext({ pin: d });
    }, 120);
  };

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
      {conf
        ? <input type="password" inputMode="numeric" maxLength={4} value={cpin} onChange={e=>handleCpin(e.target.value)} style={pinInputStyle} placeholder="••••" autoFocus/>
        : <input type="password" inputMode="numeric" maxLength={4} value={pin}  onChange={e=>handlePin(e.target.value)}  style={pinInputStyle} placeholder="••••" autoFocus/>
      }
      {err && <p style={{ color:"var(--coral)", fontSize:14, marginTop:12 }}>{err}</p>}
      {conf && <button onClick={()=>{setConf(false);setCpin("");setErr("");}} style={{ marginTop:16, color:"var(--ink-l)", background:"none", border:"none", fontSize:14, cursor:"pointer", fontFamily:"'Instrument Sans'" }}>← Use different PIN</button>}
    </div>
  );
}

// Step 6 — Confirmation
function OB_Done({ data, onStart }) {
  return (
    <div className="sci" style={{...s.card(0), overflow:"hidden", textAlign:"center"}}>
      {/* Gradient header */}
      <div style={{background:"var(--grad-forest)",padding:"32px 24px 28px"}}>
        <div className="pop" style={{ fontSize:72, marginBottom:8, filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.2))" }}>🎉</div>
        <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:30, fontWeight:700, color:"#fff", marginBottom:6 }}>
          You're all set!
        </h1>
        <p style={{ color:"rgba(255,255,255,0.65)", fontSize:14 }}>
          Ready for {data.children?.length>1?"your children":"your child"} to start learning
        </p>
      </div>
      <div style={{padding:"20px 24px 28px"}}>
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
          {(data.children||[]).map((c,i)=>(
            <div key={i} className={`afu d${i+1}`} style={{ display:"flex", alignItems:"center", gap:14, background:"var(--cream)", borderRadius:"var(--r-lg)", padding:"14px 18px", border:"1px solid var(--cream-dd)" }}>
              <div style={{ width:52,height:52, background:c.avatarBg, borderRadius:"var(--r-md)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0, boxShadow:"0 4px 12px rgba(0,0,0,0.15)" }}>{c.avatar}</div>
              <div style={{ textAlign:"left", flex:1 }}>
                <p style={{ fontWeight:700, fontSize:16, color:"var(--ink)" }}>{c.name}</p>
                <p style={{ fontSize:13, color:"var(--ink-l)" }}>Age {c.age} · {gradeLabel(c.age)} · Level {getStartLevel(c.age)}</p>
              </div>
              <Tag color="green">Ready!</Tag>
            </div>
          ))}
        </div>
        <Btn onClick={onStart} full size="lg" v="gold"><Play size={20}/> Start Learning Now</Btn>
      </div>
    </div>
  );
}

// Onboarding wrapper
export function OnboardingFlow({ onComplete, plan: preselectedPlan }) {
  // If plan is already known (user selected it in PendingSetup/Stripe), skip the plan step
  const skipPlan = !!preselectedPlan;
  const STEPS = skipPlan ? 3 : 4;
  const [step, setStep] = useState(0);
  const [d, setD] = useState(() => skipPlan ? { plan: preselectedPlan } : {});
  const merge = (extra, next) => { setD(prev=>({...prev,...extra})); setStep(next); };

  if (skipPlan) {
    // Steps: 0=Children, 1=Pin, 2=Done
    return (
      <Shell>
        <StepDots total={STEPS} current={step}/>
        {step===0 && <OB_Children plan={preselectedPlan} onNext={v=>merge(v,1)}/>}
        {step===1 && <OB_Pin onNext={v=>merge(v,2)}/>}
        {step===2 && <OB_Done data={d} onStart={()=>onComplete(d)}/>}
        {step>0 && step<2 && (
          <button onClick={()=>setStep(step-1)} style={{ display:"flex", alignItems:"center", gap:6, margin:"16px auto 0", color:"var(--ink-l)", background:"none", border:"none", fontSize:14, cursor:"pointer", fontFamily:"'Instrument Sans'" }}>
            <ChevronLeft size={16}/> Back
          </button>
        )}
      </Shell>
    );
  }

  // Legacy path: no pre-selected plan (fallback for old users or edge cases)
  return (
    <Shell>
      <StepDots total={STEPS} current={step}/>
      {step===0 && <OB_Plan onNext={v=>merge(v,1)}/>}
      {step===1 && <OB_Children plan={d.plan} onNext={v=>merge(v,2)}/>}
      {step===2 && <OB_Pin onNext={v=>merge(v,3)}/>}
      {step===3 && <OB_Done data={d} onStart={()=>onComplete(d)}/>}
      {step>0 && step<3 && (
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
  const [view, setView] = useState("profiles");
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
    else { setFailedParentPinAttempts((n) => n + 1); setParentPinErr("Incorrect PIN"); }
  };

  const doSendPinReset = () => {
    const email = (resetEmail || "").trim().toLowerCase();
    const parentEmail = String(app?.parent?.email || "").trim().toLowerCase();
    if (!email || !email.includes("@")) { setResetStatus("Enter a valid email address"); return; }
    if (email !== parentEmail) { setResetStatus("That email doesn’t match this account"); return; }
    setResetStatus(`A PIN reset link has been sent to ${email}.`);
  };

  const doChildEnter = () => {
    if (!selChild) return;
    const pin = String(childPin || "").replace(/\D/g, "").slice(0, 4);
    if (pin.length !== 4) { setChildPinErr("Enter your 4-digit PIN"); return; }
    const childRecord = app?.children?.find(c => c.id === selChild.id);
    if (pin === childRecord?.pin) { onChildEnter(selChild); }
    else { setChildPinErr("Incorrect PIN"); }
  };

  // ── Child PIN screen
  if (view === "child_pin") return (
    <div style={{minHeight:"100svh",background:"var(--grad-hero)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 20px",gap:0}}>
      <button onClick={()=>{setView("profiles");setSelChild(null);setChildPin("");setChildPinErr("");}}
        style={{position:"absolute",top:20,left:20,...s.btn("white","","","sm"),gap:6}}>
        <ChevronLeft size={16}/> Back
      </button>
      <div className="sci" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:24,width:"100%",maxWidth:360}}>
        <div className="flt" style={{
          width:100,height:100,borderRadius:"var(--r-2xl)",
          background:selChild?.avatarBg||"#8BAF94",
          fontSize:44,display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:"0 0 0 6px rgba(255,255,255,0.15), 0 20px 60px rgba(0,0,0,0.3)",
        }}>{selChild?.avatar}</div>
        <div style={{textAlign:"center"}}>
          <h2 style={{fontFamily:"’Fraunces’,serif",fontSize:26,fontWeight:700,color:"#fff",marginBottom:4}}>Hi, {selChild?.name}!</h2>
          <p style={{color:"rgba(255,255,255,0.65)",fontSize:14}}>Enter your PIN to start learning</p>
        </div>
        <div style={{...s.card(24),width:"100%"}}>
          <Field label="Your PIN" error={childPinErr}>
            <input
              type="password" maxLength={4} inputMode="numeric"
              value={childPin}
              onChange={e=>{setChildPin(e.target.value.replace(/\D/g,"").slice(0,4));setChildPinErr("");}}
              onKeyDown={e=>e.key==="Enter"&&doChildEnter()}
              style={{...s.input(!!childPinErr),letterSpacing:"0.3em",fontSize:20,textAlign:"center"}}
              placeholder="••••"
              autoFocus
            />
          </Field>
          <button onClick={doChildEnter} style={{...s.btn("learn",true,false,"lg"),marginTop:16}}>
            Let’s Go! 🚀
          </button>
        </div>
      </div>
    </div>
  );

  // ── Parent PIN screen
  if (view === "parent_pin") return (
    <div style={{minHeight:"100svh",background:"var(--grad-hero)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 20px"}}>
      <button onClick={()=>{setView("profiles");setParentPin("");setParentPinErr("");setFailedParentPinAttempts(0);}}
        style={{position:"absolute",top:20,left:20,...s.btn("white","","","sm"),gap:6}}>
        <ChevronLeft size={16}/> Back
      </button>
      <div className="sci" style={{width:"100%",maxWidth:360,display:"flex",flexDirection:"column",gap:20}}>
        <div style={{textAlign:"center"}}>
          <div style={{width:64,height:64,borderRadius:"var(--r-xl)",background:"rgba(255,255,255,0.12)",border:"1.5px solid rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",backdropFilter:"blur(8px)"}}>
            <Shield size={28} color="#fff"/>
          </div>
          <h2 style={{fontFamily:"’Fraunces’,serif",fontSize:24,fontWeight:700,color:"#fff",marginBottom:4}}>Parent Access</h2>
          <p style={{color:"rgba(255,255,255,0.6)",fontSize:13}}>{app?.parent?.email}</p>
        </div>
        <div style={{...s.card(24)}}>
          <Field label="Parent PIN" error={parentPinErr}>
            <input
              type="password" maxLength={4} inputMode="numeric"
              value={parentPin}
              onChange={e=>{setParentPin(e.target.value.replace(/\D/g,"").slice(0,4));setParentPinErr("");}}
              onKeyDown={e=>e.key==="Enter"&&doParentLogin()}
              style={{...s.input(!!parentPinErr),letterSpacing:"0.3em",fontSize:20,textAlign:"center"}}
              placeholder="••••"
              autoFocus
            />
          </Field>
          <button onClick={doParentLogin} style={{...s.btn("primary",true,false,"lg"),marginTop:16}}>
            Enter Dashboard
          </button>
          {failedParentPinAttempts >= 3 && (
            <button onClick={()=>setView("forgot_pin")}
              style={{...s.btn("ghost",true,false,"sm"),marginTop:10,color:"var(--coral)"}}>
              Forgot PIN? Reset it
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // ── Forgot PIN screen
  if (view === "forgot_pin") return (
    <div style={{minHeight:"100svh",background:"var(--grad-hero)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 20px"}}>
      <button onClick={()=>setView("parent_pin")}
        style={{position:"absolute",top:20,left:20,...s.btn("white","","","sm"),gap:6}}>
        <ChevronLeft size={16}/> Back
      </button>
      <div className="sci" style={{width:"100%",maxWidth:360,display:"flex",flexDirection:"column",gap:20}}>
        <div style={{textAlign:"center"}}>
          <h2 style={{fontFamily:"’Fraunces’,serif",fontSize:22,fontWeight:700,color:"#fff",marginBottom:8}}>Reset your PIN</h2>
          <p style={{color:"rgba(255,255,255,0.65)",fontSize:14,lineHeight:1.5}}>Enter your email and we’ll send a reset link</p>
        </div>
        <div style={{...s.card(24)}}>
          {resetStatus ? (
            <div style={{textAlign:"center",padding:"8px 0"}}>
              <div style={{fontSize:32,marginBottom:12}}>📬</div>
              <p style={{color:"var(--forest)",fontWeight:600,fontSize:14,lineHeight:1.5}}>{resetStatus}</p>
            </div>
          ) : (
            <>
              <Field label="Email address">
                <input type="email" value={resetEmail} onChange={e=>setResetEmail(e.target.value)}
                  style={s.input()} placeholder="you@example.com" autoFocus/>
              </Field>
              <button onClick={doSendPinReset} style={{...s.btn("primary",true,false,"lg"),marginTop:16}}>
                Send Reset Link
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // ── Profiles view (main)
  const children = app?.children || [];
  return (
    <div style={{minHeight:"100svh",background:"var(--grad-hero)",display:"flex",flexDirection:"column",overflowX:"hidden"}}>
      {/* Header */}
      <div style={{padding:"20px 24px 0",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:36,height:36,background:"var(--gold-ll)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Brain size={20} color="var(--forest)"/>
          </div>
          <span style={{fontFamily:"’Fraunces’,serif",fontWeight:700,fontSize:20,color:"#fff",letterSpacing:"-0.02em"}}>e-Skillora</span>
        </div>
      </div>

      {/* Title */}
      <div className="sci" style={{textAlign:"center",padding:"32px 24px 24px"}}>
        <h1 style={{fontFamily:"’Fraunces’,serif",fontWeight:700,fontSize:26,color:"#fff",marginBottom:8,letterSpacing:"-0.02em"}}>
          Who’s learning today?
        </h1>
        <p style={{color:"rgba(255,255,255,0.55)",fontSize:14}}>Select your profile to continue</p>
      </div>

      {/* Profiles grid */}
      <div style={{
        flex:1,padding:"0 20px",
        display:"flex",flexDirection:"column",alignItems:"center",gap:16,
        paddingBottom:"calc(var(--safe-b) + 32px)",
      }}>
        {/* Children profiles */}
        <div style={{
          display:"grid",
          gridTemplateColumns:children.length===1?"1fr":children.length===2?"1fr 1fr":"repeat(auto-fit,minmax(140px,1fr))",
          gap:12,width:"100%",maxWidth:420,
        }}>
          {children.map((child,i)=>(
            <button key={child.id} className="sci" style={{
              animationDelay:`${i*0.08}s`,
              background:"rgba(255,255,255,0.10)",
              border:"1.5px solid rgba(255,255,255,0.18)",
              borderRadius:"var(--r-xl)",padding:"20px 12px",
              display:"flex",flexDirection:"column",alignItems:"center",gap:10,
              cursor:"pointer",backdropFilter:"blur(12px)",
              transition:"all .2s cubic-bezier(.22,1,.36,1)",
            }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.18)";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,0.25)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.10)";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}
            onClick={()=>{setSelChild(child);setView("child_pin");}}>
              <div style={{
                width:72,height:72,borderRadius:"var(--r-lg)",
                background:child.avatarBg||"#8BAF94",
                fontSize:34,display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:"0 4px 20px rgba(0,0,0,0.25)",
              }}>{child.avatar}</div>
              <div>
                <div style={{fontWeight:700,fontSize:15,color:"#fff",textAlign:"center"}}>{child.name}</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",textAlign:"center",marginTop:2}}>Age {child.age}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Parent button */}
        <button className="sci2" style={{
          background:"rgba(255,255,255,0.08)",
          border:"1.5px solid rgba(255,255,255,0.14)",
          borderRadius:"var(--r-xl)",padding:"16px 28px",
          display:"flex",alignItems:"center",gap:14,
          width:"100%",maxWidth:420,cursor:"pointer",
          backdropFilter:"blur(8px)",
          transition:"all .2s cubic-bezier(.22,1,.36,1)",
        }}
        onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.14)";}}
        onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";}}
        onClick={()=>setView("parent_pin")}>
          <div style={{width:44,height:44,borderRadius:"var(--r-md)",background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <Shield size={20} color="rgba(255,255,255,0.8)"/>
          </div>
          <div style={{textAlign:"left"}}>
            <div style={{fontWeight:700,fontSize:14,color:"rgba(255,255,255,0.9)"}}>Parent Dashboard</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.45)",marginTop:1}}>{app?.parent?.email}</div>
          </div>
          <ChevronRight size={16} color="rgba(255,255,255,0.4)" style={{marginLeft:"auto"}}/>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ③ PARENT DASHBOARD
// ─────────────────────────────────────────────────────────────
export function ParentDashboard({ onLogout, onFullLogout }) {
  const [app, setAppLocal] = useState(() => getApp());
  const [tab, setTab] = useState("overview");
  const refresh = () => { const d=getApp(); setAppLocal(d); };

  const planData = PLANS.find(p=>p.id===app?.parent?.plan) || PLANS[0];

  // Bottom navigation tabs
  const TABS = [
    { id:"overview", icon:<BarChart3 size={20}/>, label:"Overview" },
    { id:"children", icon:<Users size={20}/>, label:"Children" },
    { id:"plan",     icon:<CreditCard size={20}/>, label:"Plan" },
    { id:"settings", icon:<Settings size={20}/>, label:"Settings" },
  ];

  return (
    <div style={{minHeight:"100svh",background:"var(--cream)",display:"flex",flexDirection:"column"}}>
      {/* Sticky Top Bar */}
      <div style={{
        background:"rgba(247,243,237,0.92)",backdropFilter:"blur(16px)",
        borderBottom:"1px solid var(--cream-dd)",
        padding:"14px 20px",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        position:"sticky",top:0,zIndex:100,
      }}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,background:"var(--forest)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Brain size={18} color="var(--cream)"/>
          </div>
          <div>
            <span style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:17,color:"var(--forest)",letterSpacing:"-0.02em"}}>e-Skillora</span>
            <span style={{...s.tag("forest"),marginLeft:8,fontSize:10}}>Parent</span>
          </div>
        </div>
        <button onClick={onLogout} style={{...s.btn("ghost","","","sm"),color:"var(--ink-l)",fontWeight:600,gap:5}}>
          <Users size={15}/> Switch User
        </button>
      </div>

      {/* Tab Content */}
      <div style={{flex:1,overflowY:"auto",paddingBottom:"calc(var(--nav-h) + var(--safe-b) + 16px)"}}>
        {tab==="overview" && <OverviewTab app={app}/>}
        {tab==="children" && <ChildrenTab app={app} planData={planData} refresh={refresh}/>}
        {tab==="plan" && <PlanTab app={app} planData={planData}/>}
        {tab==="settings" && <SettingsTab app={app} onLogout={onFullLogout || onLogout} refresh={refresh}/>}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position:"fixed",bottom:0,left:0,right:0,zIndex:200,
        background:"rgba(255,255,255,0.96)",backdropFilter:"blur(20px)",
        borderTop:"1px solid var(--cream-dd)",
        padding:"10px 8px calc(var(--safe-b) + 10px)",
        display:"flex",alignItems:"center",justifyContent:"space-around",
      }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            display:"flex",flexDirection:"column",alignItems:"center",gap:3,
            padding:"6px 16px",borderRadius:"var(--r-md)",border:"none",
            background:tab===t.id?"var(--sage-ll)":"transparent",
            color:tab===t.id?"var(--forest)":"var(--ink-ll)",
            fontFamily:"'Instrument Sans',sans-serif",fontWeight:600,fontSize:10,
            letterSpacing:"0.02em",cursor:"pointer",
            transition:"all .2s",minWidth:60,
          }}>
            <span style={{color:tab===t.id?"var(--forest)":"var(--ink-ll)",lineHeight:1}}>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function OverviewTab({ app }) {
  const hour = new Date().getHours();
  const greeting = hour<12?"Good morning":hour<17?"Good afternoon":"Good evening";
  const emoji = hour<12?"☀️":hour<17?"🌤️":"🌙";
  const [streaks, setStreaks] = useState({});

  useEffect(() => {
    const children = app?.children || [];
    children.forEach(child => {
      fetch(`/api/streaks/${encodeURIComponent(child.id)}`)
        .then(r => r.json())
        .then(d => { if (d?.currentStreak != null) setStreaks(prev => ({...prev, [child.id]: d.currentStreak})); })
        .catch(() => {});
    });
  }, [app?.children?.length]);

  return (
    <div style={{padding:"20px 20px 8px",display:"flex",flexDirection:"column",gap:20}}>
      {/* Greeting */}
      <div className="sci" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <p style={{fontSize:13,color:"var(--ink-ll)",fontWeight:500,marginBottom:2}}>{greeting} {emoji}</p>
          <h1 style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:22,color:"var(--forest)",letterSpacing:"-0.02em"}}>
            Parent Dashboard
          </h1>
        </div>
      </div>

      {/* Children cards */}
      {(app?.children||[]).map((child,i)=>{
        const prog = (() => { try { const v = localStorage.getItem(`skillora-progress-${child.id}`); return v ? JSON.parse(v) : null; } catch { return null; } })();
        const allDays = Object.values(prog?.completedDays||{});
        const daysCompleted = Object.keys(prog?.completedDays||{}).filter(k=>k.startsWith(prog?.currentLevel||child.level)).length;

        // Accuracy this week vs last week
        const now = new Date();
        const weekAgo = new Date(now); weekAgo.setDate(now.getDate() - 7);
        const twoWeeksAgo = new Date(now); twoWeeksAgo.setDate(now.getDate() - 14);
        const thisWeekDays = allDays.filter(d=>d.date && new Date(d.date)>=weekAgo);
        const lastWeekDays = allDays.filter(d=>d.date && new Date(d.date)>=twoWeeksAgo && new Date(d.date)<weekAgo);
        const accThisWeek = thisWeekDays.length ? Math.round(thisWeekDays.reduce((s,d)=>s+d.correct,0)/thisWeekDays.reduce((s,d)=>s+d.total,0)*100) : null;
        const accLastWeek = lastWeekDays.length ? Math.round(lastWeekDays.reduce((s,d)=>s+d.correct,0)/lastWeekDays.reduce((s,d)=>s+d.total,0)*100) : null;
        const accDelta = accThisWeek!=null && accLastWeek!=null ? accThisWeek - accLastWeek : null;

        // Struggling skills (wrong 2+ times = appears in wrongIds of 2+ days)
        const wrongCounts = {};
        allDays.forEach(d => { (d.wrongIds||[]).forEach(id => { wrongCounts[id] = (wrongCounts[id]||0) + 1; }); });
        const strugglingIds = Object.entries(wrongCounts).filter(([,c])=>c>=2).map(([id])=>id);
        // Get themes from question IDs (format: LEVEL-INDEX)
        const strugglingThemes = [...new Set(strugglingIds.map(id => {
          const level = id.split("-")[0];
          const levelQs = prog?.levelQuestions?.[level] || [];
          const q = levelQs.find(q => q.id === id);
          return q?.theme;
        }).filter(Boolean))].slice(0, 4);

        // Time spent today and this week (in minutes)
        const today = now.toISOString().slice(0,10);
        const todayDays = allDays.filter(d=>d.date&&d.date.slice(0,10)===today);
        const minsToday = todayDays.reduce((s,d)=>s+(d.mins||0),0);
        const minsWeek = thisWeekDays.reduce((s,d)=>s+(d.mins||0),0);

        // Level progress
        const currentLevel = prog?.currentLevel || child.level;
        const levelPct = Math.round(daysCompleted / 60 * 100);
        const nextLevel = LEVEL_ORDER[LEVEL_ORDER.indexOf(currentLevel)+1];

        const childStreak = streaks[child.id] || 0;

        return (
          <div key={child.id} className="sci" style={{animationDelay:`${i*0.1}s`}}>
            <div style={{...s.card(0),overflow:"hidden"}}>
              {/* Card Header */}
              <div style={{background:"var(--grad-forest)",padding:"18px 20px",display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:52,height:52,borderRadius:"var(--r-md)",background:child.avatarBg||"#8BAF94",fontSize:26,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(0,0,0,0.25)",flexShrink:0}}>
                  {child.avatar}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:18,color:"#fff"}}>{child.name}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.6)",marginTop:2}}>Age {child.age} · Level {currentLevel}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
                  <span style={{...s.tag("cream"),fontSize:10}}>{gradeLabel(child.age)}</span>
                  {childStreak > 0 && (
                    <div style={{display:"flex",alignItems:"center",gap:4,background:"rgba(255,107,53,0.9)",borderRadius:"var(--r-full)",padding:"3px 8px"}}>
                      <Flame size={12} color="#fff"/>
                      <span style={{fontSize:12,fontWeight:800,color:"#fff"}}>{childStreak} day streak</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Level progress bar */}
              <div style={{padding:"12px 20px 0"}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--ink-ll)",marginBottom:4}}>
                  <span>Level {currentLevel} progress</span>
                  <span>{levelPct}% → {nextLevel ? `Level ${nextLevel}` : "Final Level"}</span>
                </div>
                <div style={{height:6,background:"rgba(28,58,47,0.08)",borderRadius:"var(--r-full)",overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${Math.min(100,levelPct)}%`,background:"var(--grad-gold)",borderRadius:"var(--r-full)",transition:"width .8s cubic-bezier(.22,1,.36,1)"}}/>
                </div>
              </div>

              {/* Stats grid */}
              <div style={{padding:"12px 20px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:8}}>
                {[
                  {label:"This Week",value:accThisWeek!=null?`${accThisWeek}%`:"—",sub:accDelta!=null?(accDelta>=0?`▲${accDelta}%`:`▼${Math.abs(accDelta)}%`):"",color:accThisWeek>=80?"var(--green)":accThisWeek>=60?"var(--amber)":"var(--coral)"},
                  {label:"Days Done",value:daysCompleted||0,sub:"this level",color:"var(--forest)"},
                  {label:"Today",value:minsToday>0?`${minsToday}m`:"—",sub:minsWeek>0?`${minsWeek}m week`:"",color:"var(--blue)"},
                  {label:"Streak",value:childStreak>0?`${childStreak}🔥`:"0",sub:"days",color:"#FF6B35"},
                ].map(stat=>(
                  <div key={stat.label} style={{textAlign:"center",background:"var(--cream)",borderRadius:"var(--r-md)",padding:"8px 4px"}}>
                    <div style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:16,color:stat.color,lineHeight:1}}>{stat.value}</div>
                    {stat.sub&&<div style={{fontSize:9,color:stat.sub.startsWith("▲")?"var(--green)":stat.sub.startsWith("▼")?"var(--coral)":"var(--ink-ll)",marginTop:2,fontWeight:600}}>{stat.sub}</div>}
                    <div style={{fontSize:9,color:"var(--ink-ll)",marginTop:2,fontWeight:500}}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Struggling skills */}
              {strugglingThemes.length > 0 && (
                <div style={{padding:"0 20px 14px"}}>
                  <p style={{fontSize:11,fontWeight:700,color:"var(--coral)",marginBottom:6,display:"flex",alignItems:"center",gap:4}}>
                    <AlertCircle size={11}/> Needs practice:
                  </p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {strugglingThemes.map(t=>(
                      <span key={t} style={{fontSize:10,background:"rgba(232,96,76,0.1)",color:"var(--coral)",borderRadius:"var(--r-full)",padding:"3px 8px",fontWeight:600,border:"1px solid rgba(232,96,76,0.2)"}}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        );
      })}

      {!app?.children?.length && (
        <div style={{...s.card(32),textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:12}}>👨‍👩‍👧</div>
          <p style={{fontFamily:"'Fraunces',serif",fontWeight:600,fontSize:16,color:"var(--forest)",marginBottom:6}}>No children yet</p>
          <p style={{fontSize:13,color:"var(--ink-l)"}}>Go to Children tab to add your first child</p>
        </div>
      )}
    </div>
  );
}

function ChildrenTab({ app, planData, refresh }) {
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDelete = (childId) => {
    const appData = getApp();
    if (!appData) return;
    appData.children = appData.children.filter(c => c.id !== childId);
    setApp(appData);
    refresh();
    setConfirmDelete(null);
  };

  return (
    <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <h2 style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:20,color:"var(--forest)"}}>Children</h2>
        {(app?.children?.length||0) < planData.cap && (
          <button style={{...s.btn("primary","","","sm"),gap:5}} onClick={()=>alert("Add child flow coming soon")}>
            <Plus size={14}/> Add Child
          </button>
        )}
      </div>
      {(app?.children||[]).map(child=>(
        <div key={child.id} style={{...s.card(16),display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:52,height:52,borderRadius:"var(--r-md)",background:child.avatarBg,fontSize:26,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            {child.avatar}
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:15,color:"var(--forest)"}}>{child.name}</div>
            <div style={{fontSize:12,color:"var(--ink-l)",marginTop:2}}>Age {child.age} · Level {child.level}</div>
          </div>
          <button onClick={()=>setConfirmDelete(child.id)} style={{...s.btn("ghost","","","sm"),color:"var(--coral)",padding:"8px"}}>
            <Trash2 size={16}/>
          </button>
        </div>
      ))}
      {confirmDelete && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:20}}>
          <div style={{...s.card(24),maxWidth:320,width:"100%"}}>
            <h3 style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:18,color:"var(--forest)",marginBottom:8}}>Remove child?</h3>
            <p style={{color:"var(--ink-l)",fontSize:14,marginBottom:20}}>This will permanently delete all progress data.</p>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setConfirmDelete(null)} style={{...s.btn("outline",true)}}>Cancel</button>
              <button onClick={()=>handleDelete(confirmDelete)} style={{...s.btn("danger",true)}}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PlanTab({ app, planData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleManageSubscription = async () => {
    setLoading(true);
    setError("");
    try {
      const { apiRequest } = await import("@/lib/queryClient");
      const res = await apiRequest("POST", "/api/stripe/portal", {});
      if (!res.ok) {
        const data = await res.json().catch(()=>({}));
        if (res.status === 400) {
          setError("No billing account found. Please subscribe first using the Subscribe button above.");
        } else {
          setError(data.message || "Failed to open billing portal. Please try again.");
        }
        setLoading(false);
        return;
      }
      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      setError("Failed to open billing portal. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:16}}>
      <h2 style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:20,color:"var(--forest)"}}>Your Plan</h2>
      <div style={{...s.cardForest(24)}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16}}>
          <div>
            <span style={{...s.tag("cream"),marginBottom:8,display:"inline-flex"}}>{planData.label}</span>
            <div style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:32,color:"var(--gold)",lineHeight:1}}>
              ${planData.price}<span style={{fontSize:15,fontWeight:400,opacity:0.7}}>/mo</span>
            </div>
          </div>
        </div>
        {[`Up to ${planData.cap} child${planData.cap>1?"ren":""}`, "All 12 curriculum levels", "Daily worksheets & tests", "AI tutor included"].map(f=>(
          <div key={f} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <CheckCircle size={16} color="var(--gold-l)"/>
            <span style={{color:"rgba(255,255,255,0.85)",fontSize:14}}>{f}</span>
          </div>
        ))}
      </div>
      {error && (
        <div style={{background:"rgba(232,96,76,0.1)",border:"1px solid rgba(232,96,76,0.3)",borderRadius:"var(--r-md)",padding:"12px 16px",fontSize:13,color:"var(--coral)",fontWeight:500}}>
          {error}
        </div>
      )}
      <button onClick={handleManageSubscription} disabled={loading} style={{...s.btn("gold",true,loading,"lg"),gap:8}}>
        <Settings size={16}/> {loading?"Processing...":"Manage / Cancel Subscription"}
      </button>
    </div>
  );
}

function SettingsTab({ app, onLogout, refresh }) {
  const [pwSection, setPwSection] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  const [pinSection, setPinSection] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [pinMsg, setPinMsg] = useState("");

  const [showCurriculum, setShowCurriculum] = useState(false);
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [curriculumSubject, setCurriculumSubject] = useState("math");

  const handleChangePassword = async () => {
    if (newPw !== confirmPw) { setPwMsg("Passwords do not match."); return; }
    if (newPw.length < 6) { setPwMsg("Password must be at least 6 characters."); return; }
    setPwLoading(true); setPwMsg("");
    try {
      const { apiRequest } = await import("@/lib/queryClient");
      await apiRequest("POST", "/api/change-password", { currentPassword: currentPw, newPassword: newPw });
      setPwMsg("Password updated successfully!");
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
    } catch (err) {
      setPwMsg("Failed to update password. Check your current password.");
    }
    setPwLoading(false);
  };

  const handleChangePin = () => {
    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) { setPinMsg("PIN must be exactly 4 digits."); return; }
    const appData = getApp();
    if (appData) {
      appData.parent.pin = newPin;
      setApp(appData);
      refresh();
      setPinMsg("PIN updated!");
      setNewPin("");
    }
  };

  return (
    <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:16}}>
      <h2 style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:20,color:"var(--forest)"}}>Settings</h2>

      {/* Email display */}
      <div style={{...s.card(16),display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:38,height:38,borderRadius:"var(--r-sm)",background:"var(--sage-ll)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--forest)",flexShrink:0}}>
          <Mail size={16}/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:11,color:"var(--ink-ll)",fontWeight:500,letterSpacing:"0.02em"}}>Email address</div>
          <div style={{fontSize:14,color:"var(--ink-m)",fontWeight:600,marginTop:1}}>{app?.parent?.email}</div>
        </div>
      </div>

      {/* Change Password */}
      <div style={{...s.card(16)}}>
        <button onClick={()=>setPwSection(!pwSection)} style={{display:"flex",alignItems:"center",gap:14,background:"none",border:"none",cursor:"pointer",width:"100%",textAlign:"left",padding:0}}>
          <div style={{width:38,height:38,borderRadius:"var(--r-sm)",background:"var(--sage-ll)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--forest)",flexShrink:0}}>
            <Lock size={16}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,color:"var(--ink-m)",fontWeight:600}}>Change Password</div>
          </div>
          <ChevronRight size={16} color="var(--ink-ll)" style={{transform:pwSection?"rotate(90deg)":"none",transition:"transform .2s"}}/>
        </button>
        {pwSection && (
          <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:10}}>
            <input type="password" placeholder="Current password" value={currentPw} onChange={e=>setCurrentPw(e.target.value)}
              style={{...s.input(),fontSize:14}}/>
            <input type="password" placeholder="New password" value={newPw} onChange={e=>setNewPw(e.target.value)}
              style={{...s.input(),fontSize:14}}/>
            <input type="password" placeholder="Confirm new password" value={confirmPw} onChange={e=>setConfirmPw(e.target.value)}
              style={{...s.input(),fontSize:14}}/>
            {pwMsg && <p style={{fontSize:12,color:pwMsg.includes("success")?"var(--green)":"var(--coral)",fontWeight:500}}>{pwMsg}</p>}
            <button onClick={handleChangePassword} disabled={pwLoading} style={{...s.btn("primary",true,pwLoading,"sm")}}>
              {pwLoading?"Updating...":"Update Password"}
            </button>
          </div>
        )}
      </div>

      {/* Change PIN */}
      <div style={{...s.card(16)}}>
        <button onClick={()=>setPinSection(!pinSection)} style={{display:"flex",alignItems:"center",gap:14,background:"none",border:"none",cursor:"pointer",width:"100%",textAlign:"left",padding:0}}>
          <div style={{width:38,height:38,borderRadius:"var(--r-sm)",background:"var(--sage-ll)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--forest)",flexShrink:0}}>
            <Shield size={16}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,color:"var(--ink-m)",fontWeight:600}}>Change Parent PIN</div>
          </div>
          <ChevronRight size={16} color="var(--ink-ll)" style={{transform:pinSection?"rotate(90deg)":"none",transition:"transform .2s"}}/>
        </button>
        {pinSection && (
          <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:10}}>
            <input type="text" inputMode="numeric" maxLength={4} placeholder="New 4-digit PIN" value={newPin}
              onChange={e=>setNewPin(e.target.value.replace(/\D/g,"").slice(0,4))}
              style={{...s.input(),fontSize:18,fontFamily:"'Fraunces',serif",fontWeight:700,letterSpacing:"0.3em",textAlign:"center"}}/>
            {pinMsg && <p style={{fontSize:12,color:pinMsg.includes("updated")?"var(--green)":"var(--coral)",fontWeight:500}}>{pinMsg}</p>}
            <button onClick={handleChangePin} style={{...s.btn("primary",true,false,"sm")}}>Update PIN</button>
          </div>
        )}
      </div>

      {/* Curriculum Overview */}
      <div style={{...s.card(16)}}>
        <button onClick={()=>setShowCurriculum(!showCurriculum)} style={{display:"flex",alignItems:"center",gap:14,background:"none",border:"none",cursor:"pointer",width:"100%",textAlign:"left",padding:0}}>
          <div style={{width:38,height:38,borderRadius:"var(--r-sm)",background:"var(--sage-ll)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--forest)",flexShrink:0}}>
            <BookOpen size={16}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,color:"var(--ink-m)",fontWeight:600}}>Curriculum Overview</div>
            <div style={{fontSize:11,color:"var(--ink-ll)",marginTop:1}}>12 Math + 12 Reading levels · Pre-K through Grade 12</div>
          </div>
          <ChevronRight size={16} color="var(--ink-ll)" style={{transform:showCurriculum?"rotate(90deg)":"none",transition:"transform .2s"}}/>
        </button>
        {showCurriculum && (
          <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:6}}>
            {/* Subject tabs */}
            <div style={{display:"flex",background:"var(--cream-d)",borderRadius:"var(--r-full)",padding:3,gap:3}}>
              {[{id:"math",label:"➗ Math"},{id:"ela",label:"📚 Reading"}].map(sub=>(
                <button key={sub.id} onClick={()=>{setCurriculumSubject(sub.id);setExpandedLevel(null);}} style={{
                  flex:1,borderRadius:"var(--r-full)",padding:"7px 10px",border:"none",cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .15s",
                  ...(curriculumSubject===sub.id?{background:"#fff",boxShadow:"0 1px 6px rgba(0,0,0,0.1)",color:"var(--forest)"}:{background:"transparent",color:"var(--ink-l)"}),
                }}>{sub.label}</button>
              ))}
            </div>
            {LEVEL_ORDER.map(lv=>{
              const levelMapToUse = curriculumSubject === "ela" ? ELA_LEVEL_MAP : LEVEL_MAP;
              const info=levelMapToUse[lv];
              const isOpen=expandedLevel===lv;
              return (
                <div key={lv}>
                  <button onClick={()=>setExpandedLevel(isOpen?null:lv)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",background:isOpen?"var(--sage-ll)":"var(--cream)",border:"none",borderRadius:"var(--r-sm)",padding:"10px 12px",cursor:"pointer",textAlign:"left"}}>
                    <div style={{width:28,height:28,borderRadius:"var(--r-full)",background:info.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:11,fontWeight:800,flexShrink:0}}>{lv}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600,color:"var(--ink)"}}>{info.grade}</div>
                      <div style={{fontSize:11,color:"var(--ink-ll)"}}>Ages {info.ageRange}</div>
                    </div>
                    <ChevronRight size={14} color="var(--ink-ll)" style={{transform:isOpen?"rotate(90deg)":"none",transition:"transform .2s"}}/>
                  </button>
                  {isOpen && (
                    <div style={{padding:"8px 12px 8px 50px",display:"flex",flexWrap:"wrap",gap:6}}>
                      {info.themes.map(t=>(
                        <span key={t} style={{fontSize:11,background:"var(--cream-dd)",borderRadius:"var(--r-full)",padding:"4px 10px",color:"var(--ink-l)",fontWeight:500}}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sign Out */}
      <div style={{marginTop:8}}>
        <button onClick={onLogout} style={{...s.btn("danger",true,false,"lg"),gap:8}}>
          <LogOut size={16}/> Sign Out
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ④ CHILD PLACEMENT QUIZ (5–8 questions)
// ─────────────────────────────────────────────────────────────
export function ChildPlacement({ child, onComplete }) {
  // 12-question adaptive placement starting at Grade 3 (Level D)
  const LO = ["A","B","C","D","E","F","G","H","I","J","K","L"];
  const START_LEVEL = "D"; // Grade 3
  const TOTAL_Q = 12;

  const [currentLevelIdx, setCurrentLevelIdx] = useState(LO.indexOf(START_LEVEL));
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);
  const [levelScores, setLevelScores] = useState({}); // levelIdx → {correct, total}
  const [history, setHistory] = useState([]); // [{level, correct}]
  const [answered, setAnswered] = useState(0);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);
  const [placedLevel, setPlacedLevel] = useState(null);

  const [currentQ, setCurrentQ] = useState(() => {
    const qs = typeof generateLevelQuestions==="function" ? generateLevelQuestions(LO[LO.indexOf(START_LEVEL)]) : [];
    const pool = typeof shuffle==="function" ? shuffle(qs) : qs;
    return pool.find(q=>q.type==="multiple") || pool[0];
  });

  const getNextQuestion = (levelIdx) => {
    const level = LO[Math.max(0, Math.min(LO.length-1, levelIdx))];
    const qs = typeof generateLevelQuestions==="function" ? generateLevelQuestions(level) : [];
    const pool = typeof shuffle==="function" ? shuffle(qs) : qs;
    // Prefer multiple choice for placement
    return pool.find(q=>q.type==="multiple") || pool[0];
  };

  const handleAnswer = (ans) => {
    const correct = typeof isCorrect==="function" ? isCorrect(ans, currentQ.answer) : ans===currentQ.answer;
    const newAnswered = answered + 1;
    const newHistory = [...history, { levelIdx: currentLevelIdx, correct }];

    // Update level scores
    const prevScore = levelScores[currentLevelIdx] || {correct:0, total:0};
    const newLevelScores = {
      ...levelScores,
      [currentLevelIdx]: { correct: prevScore.correct + (correct?1:0), total: prevScore.total + 1 }
    };
    setLevelScores(newLevelScores);
    setHistory(newHistory);
    setInput("");

    if (newAnswered >= TOTAL_Q) {
      // Determine placement: find the highest level where they scored ≥ 60%
      let bestLevel = 0; // default to A
      for (let idx = 0; idx < LO.length; idx++) {
        const sc = newLevelScores[idx];
        if (sc && sc.total > 0 && sc.correct/sc.total >= 0.6) {
          bestLevel = idx;
        }
      }
      setPlacedLevel(LO[bestLevel]);
      setDone(true);
      return;
    }

    // Adaptive logic
    let nextLevelIdx = currentLevelIdx;
    let newCC = consecutiveCorrect;
    let newCW = consecutiveWrong;

    if (correct) {
      newCC++;
      newCW = 0;
      if (newCC >= 2) {
        // 2 correct in a row → go harder
        nextLevelIdx = Math.min(LO.length - 1, currentLevelIdx + 1);
        newCC = 0;
      }
    } else {
      newCW++;
      newCC = 0;
      if (newCW >= 2) {
        // 2 wrong in a row → go easier
        nextLevelIdx = Math.max(0, currentLevelIdx - 1);
        newCW = 0;
      }
    }

    setConsecutiveCorrect(newCC);
    setConsecutiveWrong(newCW);
    setCurrentLevelIdx(nextLevelIdx);
    setAnswered(newAnswered);
    setCurrentQ(getNextQuestion(nextLevelIdx));
  };

  if (done && placedLevel) {
    const lInfo = typeof LEVEL_MAP!=="undefined" ? LEVEL_MAP[placedLevel] : { grade:"" };
    const totalCorrect = Object.values(levelScores).reduce((s,v)=>s+v.correct,0);
    const totalAnswered = Object.values(levelScores).reduce((s,v)=>s+v.total,0);
    const pct = totalAnswered > 0 ? Math.round(totalCorrect/totalAnswered*100) : 0;
    return (
      <div style={{ minHeight:"100vh", background:"var(--forest)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
        <div className="sci" style={{ maxWidth:440, width:"100%" }}>
          <div style={{...s.card(36), textAlign:"center"}}>
            <div className="pop" style={{ fontSize:72, marginBottom:4 }}>🎯</div>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:28, fontWeight:700, color:"var(--forest)", marginBottom:8 }}>
              Great job, {child.name}!
            </h2>
            <p style={{ color:"var(--ink-l)", fontSize:15, marginBottom:24 }}>
              We tested {TOTAL_Q} questions across multiple levels and found your perfect starting point!
            </p>
            <div style={{ background:"var(--sage-ll)", borderRadius:"var(--r-lg)", padding:"20px 28px", marginBottom:16 }}>
              <p style={{ fontSize:13, color:"var(--ink-l)", marginBottom:4 }}>Your starting level</p>
              <p style={{ fontFamily:"'Fraunces',serif", fontSize:48, fontWeight:800, color:"var(--forest)" }}>Level {placedLevel}</p>
              <p style={{ fontSize:15, color:"var(--forest)", fontWeight:600 }}>{lInfo?.grade||""}</p>
            </div>
            <div style={{ background:"var(--blue-ll)", borderRadius:"var(--r-md)", padding:"10px 16px", marginBottom:24, fontSize:13, color:"var(--blue)", lineHeight:1.5 }}>
              📊 You answered {totalCorrect} of {TOTAL_Q} questions correctly ({pct}%).
              {pct >= 80 ? " Excellent performance!" : pct >= 60 ? " Good effort!" : " We'll help you build from here!"}
            </div>
            <Btn onClick={()=>onComplete(placedLevel)} full size="lg" v="gold">
              <Play size={20}/> Start Learning! 🚀
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  const q = currentQ || {};
  const progressPct = Math.round(answered / TOTAL_Q * 100);

  return (
    <div style={{ minHeight:"100vh", background:"var(--forest)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ maxWidth:480, width:"100%" }}>
        {/* Header */}
        <div className="afu" style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center", marginBottom:12 }}>
            <div style={{ width:44,height:44, background:child.avatarBg||"#8BAF94", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{child.avatar}</div>
            <p style={{ color:"var(--cream)", fontFamily:"'Fraunces',serif", fontSize:18, fontWeight:600 }}>Placement Test, {child.name}!</p>
          </div>
          <p style={{ color:"var(--sage)", fontSize:14 }}>12 adaptive questions to find your perfect level</p>
          {/* Progress bar */}
          <div style={{ marginTop:16, height:6, background:"rgba(255,255,255,0.15)", borderRadius:"var(--r-full)", overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${progressPct}%`, background:"var(--gold)", borderRadius:"var(--r-full)", transition:"width .3s" }}/>
          </div>
          <p style={{ fontSize:12, color:"rgba(255,255,255,0.5)", marginTop:6 }}>Question {answered+1} of {TOTAL_Q} · Level {LO[currentLevelIdx]}</p>
        </div>

        <div className="sci" style={s.card(28)}>
          <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:22, fontWeight:700, color:"var(--forest)", marginBottom:24 }}>{q.question}</h2>
          {q.type==="multiple" ? (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {(q.options||[]).map((opt,i)=>(
                <button key={i} onClick={()=>handleAnswer(opt)} style={{
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
                onKeyDown={e=>{if(e.key==="Enter"&&input.trim())handleAnswer(input.trim());}} autoFocus placeholder="Type your answer…"
                style={{...s.input(), fontSize:22, fontFamily:"'Fraunces',serif", fontWeight:700 }}
                onFocus={e=>e.target.style.borderColor="var(--forest)"} onBlur={e=>e.target.style.borderColor="var(--cream-dd)"}/>
              <Btn onClick={()=>{if(input.trim())handleAnswer(input.trim());}} full disabled={!input.trim()}>
                Next <ArrowRight size={16}/>
              </Btn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ④b ELA PLACEMENT TEST
// ─────────────────────────────────────────────────────────────
function ELAPlacement({ child, questions, startLevel, onComplete }) {
  const N = questions.length || 8;
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);

  const submit = (ans) => {
    const a = [...answers, ans];
    if (cur + 1 >= questions.length) { setAnswers(a); setDone(true); }
    else { setAnswers(a); setCur(cur + 1); setInput(""); }
  };

  if (done) {
    const lo = LEVEL_ORDER;
    const correct = questions.filter((q, i) => answers[i] === q.answer).length;
    const pct = correct / questions.length;
    const idx = lo.indexOf(startLevel);
    const assigned = pct >= 0.8 ? lo[Math.min(idx+1, lo.length-1)] : pct >= 0.5 ? startLevel : lo[Math.max(idx-1, 0)];
    const lInfo = ELA_LEVEL_MAP[assigned] || { grade: "Grade" };
    return (
      <div style={{ minHeight:"100vh", background:"var(--forest)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
        <div className="sci" style={{ maxWidth:420, width:"100%" }}>
          <div style={{...s.card(36), textAlign:"center"}}>
            <div className="pop" style={{ fontSize:72, marginBottom:4 }}>📚</div>
            <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:28, fontWeight:700, color:"var(--forest)", marginBottom:8 }}>Reading level found!</h2>
            <p style={{ color:"var(--ink-l)", fontSize:15, marginBottom:24 }}>We found your perfect Reading starting level!</p>
            <div style={{ background:"var(--sage-ll)", borderRadius:"var(--r-lg)", padding:"20px 28px", marginBottom:28 }}>
              <p style={{ fontSize:13, color:"var(--ink-l)", marginBottom:4 }}>Your reading level</p>
              <p style={{ fontFamily:"'Fraunces',serif", fontSize:48, fontWeight:800, color:"var(--forest)" }}>Level {assigned}</p>
              <p style={{ fontSize:15, color:"var(--forest)", fontWeight:600 }}>{lInfo.grade}</p>
            </div>
            <Btn onClick={() => onComplete(assigned)} full size="lg" v="gold"><Play size={20}/> Start Reading! 📚</Btn>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[cur] || {};
  return (
    <div style={{ minHeight:"100vh", background:"#1C2A6B", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ maxWidth:480, width:"100%" }}>
        <div className="afu" style={{ textAlign:"center", marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center", marginBottom:12 }}>
            {child?.avatar && <div style={{ width:44, height:44, background:child.avatarBg, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{child.avatar}</div>}
            <p style={{ color:"var(--cream)", fontFamily:"'Fraunces',serif", fontSize:18, fontWeight:600 }}>Reading check-in, {child?.name}!</p>
          </div>
          <p style={{ color:"rgba(255,255,255,0.6)", fontSize:14 }}>This helps us find your reading level</p>
          <div style={{ display:"flex", gap:6, justifyContent:"center", marginTop:16 }}>
            {questions.map((_,i) => (
              <div key={i} style={{ width:28, height:5, borderRadius:3, transition:"background .3s",
                background: i<cur?"var(--gold)": i===cur?"var(--cream)":"rgba(255,255,255,0.2)" }}/>
            ))}
          </div>
        </div>
        <div className="sci" style={s.card(28)}>
          <p style={{ fontSize:13, color:"var(--ink-ll)", marginBottom:4 }}>Question {cur+1} of {questions.length}</p>
          <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:20, fontWeight:700, color:"var(--forest)", marginBottom:24 }}>{q.question}</h2>
          {q.type === "multiple" ? (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {(q.options||[]).map((opt,i) => (
                <button key={i} onClick={() => submit(opt)} style={{
                  padding:"15px 20px", borderRadius:"var(--r-md)", textAlign:"left", fontSize:15, fontWeight:500,
                  background:"var(--cream)", border:"2px solid var(--cream-dd)", cursor:"pointer",
                  fontFamily:"'Instrument Sans'", color:"var(--ink)", transition:"all .15s",
                }}>{opt}</button>
              ))}
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <input type="text" value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"&&input.trim())submit(input.trim());}} autoFocus placeholder="Type your answer…"
                style={{...s.input(), fontSize:20, fontFamily:"'Fraunces',serif", fontWeight:700}}/>
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

const ELA_LEVEL_MAP = {
  A:{ grade:"Pre-K / Kindergarten", ageRange:"4–6", color:"#e91e8c",
      themes:["Letter Recognition","Phonics Basics","Sight Words","Simple Sentences","Rhyming Words","Story Sequence"] },
  B:{ grade:"Grade 1", ageRange:"6–7", color:"#9c27b0",
      themes:["Short Vowels","Word Families","Reading Comprehension","Vocabulary","Capitalization","Punctuation Basics"] },
  C:{ grade:"Grade 2", ageRange:"7–8", color:"#673ab7",
      themes:["Long Vowels","Compound Words","Main Idea","Context Clues","Nouns & Verbs","Story Elements"] },
  D:{ grade:"Grade 3", ageRange:"8–9", color:"#3f51b5",
      themes:["Prefixes & Suffixes","Synonyms & Antonyms","Text Evidence","Adjectives & Adverbs","Paragraph Writing","Figurative Language"] },
  E:{ grade:"Grade 4", ageRange:"9–10", color:"#2196f3",
      themes:["Greek & Latin Roots","Inference","Compare & Contrast","Point of View","Grammar Review","Research Skills"] },
  F:{ grade:"Grade 5", ageRange:"10–11", color:"#03a9f4",
      themes:["Vocabulary in Context","Theme & Moral","Author's Purpose","Figurative Language","Sentence Structure","Opinion Writing"] },
  G:{ grade:"Grade 6", ageRange:"11–12", color:"#00bcd4",
      themes:["Connotation & Denotation","Central Idea","Argument & Evidence","Literary Devices","Comma Rules","Persuasive Writing"] },
  H:{ grade:"Grade 7", ageRange:"12–13", color:"#009688",
      themes:["Word Choice & Tone","Textual Analysis","Bias & Perspective","Complex Sentences","MLA Basics","Expository Writing"] },
  I:{ grade:"Grade 8", ageRange:"13–14", color:"#4caf50",
      themes:["Advanced Vocabulary","Rhetoric & Appeals","Poetry Analysis","Semicolons & Colons","Research Writing","Literary Analysis"] },
  J:{ grade:"High School 1", ageRange:"14–15", color:"#8bc34a",
      themes:["SAT Vocabulary","Analyzing Arguments","Shakespeare Basics","Complex Grammar","Essay Structure","Critical Reading"] },
  K:{ grade:"High School 2", ageRange:"15–16", color:"#cddc39",
      themes:["Advanced Grammar","AP Vocabulary","Comparative Literature","Rhetorical Analysis","College Essay","Satire & Irony"] },
  L:{ grade:"High School 3", ageRange:"16–18", color:"#ff9800",
      themes:["AP Lang Terms","Advanced Rhetoric","Research Paper","Literary Theory","SAT Reading","College-Level Writing"] },
};

function generateELAThemeQuestions(level, theme, mkId) {
  const qs = [];
  const add = (question, type, options, answer, hint, explanation) => {
    qs.push({ id:mkId(), level, theme, difficulty:type==="input"?"medium":"easy", question, type, options:options||null, answer:String(answer), hint:hint||"", explanation:explanation||"" });
  };
  const addH = (question, type, options, answer, hint, explanation) => {
    qs.push({ id:mkId(), level, theme, difficulty:"hard", question, type, options:options||null, answer:String(answer), hint:hint||"", explanation:explanation||"" });
  };

  // ── LEVEL A ──
  if (theme==="Letter Recognition") {
    const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i=0;i<26;i++) {
      add(`What letter is this? ${letters[i]}`,"input",null,letters[i],`Look at the shape of the letter.`,`The letter is ${letters[i]}.`);
      const opts=shuffle([letters[i],letters[(i+1)%26],letters[(i+3)%26],letters[(i+5)%26]]);
      add(`Which is the letter ${letters[i]}?`,"multiple",opts,letters[i],`Look for ${letters[i]}.`,`The answer is ${letters[i]}.`);
      if(i<25) add(`What letter comes after ${letters[i]}?`,"multiple",shuffle([letters[i+1],letters[Math.max(0,i-1)],letters[(i+2)%26],letters[(i+4)%26]]),letters[i+1],`Think of the alphabet song.`,`After ${letters[i]} comes ${letters[i+1]}.`);
    }
    add("How many letters are in the alphabet?","input",null,"26","Sing the alphabet song and count.","There are 26 letters.");
    add("What is the first letter of the alphabet?","multiple",["A","B","Z","M"],"A","The alphabet starts with...","A is the first letter.");
    add("What is the last letter of the alphabet?","multiple",["Z","Y","X","A"],"Z","The alphabet ends with...","Z is the last letter.");
  }
  if (theme==="Phonics Basics") {
    const phonics=[["B","bat"],["C","cat"],["D","dog"],["F","fish"],["G","goat"],["H","hat"],["J","jam"],["K","kite"],["L","leg"],["M","map"],["N","net"],["P","pig"],["R","run"],["S","sun"],["T","top"],["V","van"],["W","web"],["Z","zip"]];
    phonics.forEach(([letter,word])=>{
      add(`What sound does the letter ${letter} make? Think of the word "${word}".`,"multiple",shuffle([`/${letter.toLowerCase()}/`,"/a/","/e/","/o/"]),`/${letter.toLowerCase()}/`,`Say "${word}" slowly.`,`${letter} makes the /${letter.toLowerCase()}/ sound as in "${word}".`);
      add(`What letter does "${word}" start with?`,"input",null,letter,`Say "${word}" slowly — what's the first sound?`,`"${word}" starts with ${letter}.`);
    });
    ["a","e","i","o","u"].forEach(v=>{
      add(`Is "${v.toUpperCase()}" a vowel or a consonant?`,"multiple",["Vowel","Consonant"],"Vowel","A, E, I, O, U are...","Vowels are A, E, I, O, U.");
    });
    ["B","C","D","F"].forEach(c=>{
      add(`Is "${c}" a vowel or a consonant?`,"multiple",["Vowel","Consonant"],"Consonant","A, E, I, O, U are vowels. Everything else is...","Consonants are all the letters that aren't vowels.");
    });
  }
  if (theme==="Sight Words") {
    const words=["the","and","is","it","to","in","I","a","my","we","can","see","go","like","he","she","was","for","on","are","you","they","this","have","from","not","but","what","all","had"];
    words.forEach(w=>{
      add(`Can you spell this sight word? "${w.toUpperCase()}"`,"input",null,w,`Sound it out: "${w}".`,`The word is "${w}".`);
      const wrong=shuffle(words.filter(x=>x!==w)).slice(0,3);
      add(`Which word is "${w}"?`,"multiple",shuffle([w,...wrong]),w,`Look carefully at each word.`,`The correct word is "${w}".`);
    });
  }
  if (theme==="Simple Sentences") {
    const subjects=["The cat","The dog","A bird","The fish","My mom"];
    const verbs=["runs","jumps","sits","eats","plays"];
    subjects.forEach((sub,i)=>{
      add(`Finish the sentence: "${sub} _____."  (${verbs[i]})`,"input",null,verbs[i],`What does ${sub.toLowerCase()} do?`,`${sub} ${verbs[i]}.`);
      add(`What is the subject of: "${sub} ${verbs[i]}."?`,"multiple",shuffle([sub,"A rock","The house","nothing"]),sub,`The subject is who or what does the action.`,`The subject is "${sub}".`);
    });
    add("Every sentence starts with a _____ letter.","multiple",["capital","small","number","symbol"],"capital","Think about how sentences begin.","Sentences start with a capital letter.");
    add("Every sentence ends with a _____.","multiple",["period","comma","colon","dash"],"period","What goes at the end?","Sentences end with a period (or ? or !).");
    for(let i=0;i<8;i++) add(`Does this need a period or question mark? "Where is the cat___"`,"multiple",["?",".","!",","],"?","Is it asking something?","Questions end with ?");
  }
  if (theme==="Rhyming Words") {
    const pairs=[["cat","hat"],["dog","log"],["sun","fun"],["bed","red"],["pig","big"],["hop","top"],["run","bun"],["lake","cake"],["bell","well"],["king","ring"],["fish","dish"],["mat","bat"],["pen","ten"],["sit","hit"],["cup","pup"]];
    pairs.forEach(([a,b])=>{
      const wrong=shuffle(pairs.filter(p=>p[0]!==a).map(p=>p[1])).slice(0,3);
      add(`Which word rhymes with "${a}"?`,"multiple",shuffle([b,...wrong]),b,`Words that rhyme sound the same at the end.`,`"${a}" rhymes with "${b}".`);
      add(`Do "${a}" and "${b}" rhyme?`,"multiple",["Yes","No"],"Yes",`Do they sound alike at the end?`,`"${a}" and "${b}" rhyme!`);
    });
  }
  if (theme==="Story Sequence") {
    add("What happens FIRST in a story?","multiple",["The beginning","The middle","The end","The title"],"The beginning","Stories have a beginning, middle, and end.","The beginning comes first.");
    add("What happens LAST in a story?","multiple",["The end","The beginning","The middle","The title"],"The end","Stories have a beginning, middle, and end.","The end comes last.");
    for(let i=0;i<5;i++){
      add(`Put in order: "She ate breakfast. She woke up. She went to school." What happened first?`,"multiple",["She woke up","She ate breakfast","She went to school","She slept"],"She woke up","Think about what you do first in the morning.","First she woke up, then ate, then went to school.");
      add(`Put in order: "The seed grew. We planted a seed. A flower bloomed." What happened first?`,"multiple",["We planted a seed","The seed grew","A flower bloomed","It rained"],"We planted a seed","What has to happen before something can grow?","First plant, then grow, then bloom.");
      add(`Put in order: "He blew out candles. He opened presents. His friends arrived." What happened first?`,"multiple",["His friends arrived","He blew out candles","He opened presents","He ate cake"],"His friends arrived","Friends come to the party before cake.","First friends arrive, then candles, then presents.");
    }
  }

  // ── LEVEL B ──
  if (theme==="Short Vowels") {
    const words=[["cat","a"],["bed","e"],["pig","i"],["dog","o"],["bus","u"],["hat","a"],["pen","e"],["sit","i"],["hot","o"],["cup","u"],["bat","a"],["red","e"],["fin","i"],["log","o"],["sun","u"]];
    words.forEach(([w,v])=>{
      add(`What is the short vowel sound in "${w}"?`,"multiple",shuffle(["a","e","i","o","u"]),v,`Say "${w}" slowly. Which vowel do you hear?`,`"${w}" has a short ${v} sound.`);
      add(`Type a word with a short "${v}" sound.`,"input",null,w,`Think: c-${v}-t, b-${v}-d...`,`"${w}" has a short ${v}.`);
    });
  }
  if (theme==="Word Families") {
    const families=[["at","cat","bat","hat","mat","sat","rat","fat","pat"],["an","can","ban","fan","man","pan","ran","tan","van"],["ig","big","dig","fig","jig","pig","rig","wig"],["ot","cot","dot","got","hot","lot","not","pot","rot"],["ug","bug","dug","hug","jug","mug","pug","rug","tug"]];
    families.forEach(([ending,...words])=>{
      words.forEach(w=>{
        const wrong=shuffle(families.filter(f=>f[0]!==ending).map(f=>f[1])).slice(0,3);
        add(`"${w}" belongs to the -${ending} family. Which other word belongs?`,"multiple",shuffle([words.find(x=>x!==w)||words[0],...wrong]),words.find(x=>x!==w)||words[0],`Words in the -${ending} family end in -${ending}.`,`Both end in -${ending}.`);
      });
    });
  }
  if (theme==="Reading Comprehension") {
    const passages=[
      {text:"Tom has a red ball. He likes to play with it in the park.",q:"What color is Tom's ball?",a:"Red",opts:["Red","Blue","Green","Yellow"]},
      {text:"The cat sat on a mat. It was a sunny day.",q:"Where did the cat sit?",a:"On a mat",opts:["On a mat","On a bed","On a chair","On the floor"]},
      {text:"Sara loves to read books. Her favorite book is about a dog named Max.",q:"What is Sara's favorite book about?",a:"A dog named Max",opts:["A dog named Max","A cat","A bird","A fish"]},
      {text:"Ben went to the store. He bought milk and bread.",q:"What did Ben buy?",a:"Milk and bread",opts:["Milk and bread","Eggs","Juice","Cookies"]},
      {text:"It was raining outside. Lily took her umbrella.",q:"Why did Lily take her umbrella?",a:"It was raining",opts:["It was raining","It was sunny","It was snowing","It was windy"]},
    ];
    passages.forEach(p=>{
      add(`Read: "${p.text}" — ${p.q}`,"multiple",shuffle(p.opts),p.a,"Read the passage carefully.","The answer is found in the text.");
      add(`Read: "${p.text}" — ${p.q} (type your answer)`,"input",null,p.a,"Look for the answer in the passage.","Re-read the passage to find it.");
    });
    for(let i=0;i<5;i++) add(`In the sentence "The happy puppy ran fast," what word describes the puppy?`,"multiple",shuffle(["happy","ran","fast","the"]),"happy","Describing words tell us about the noun.","'Happy' describes the puppy.");
  }
  if (theme==="Vocabulary") {
    const vocab=[["big","large"],["small","tiny"],["fast","quick"],["happy","glad"],["sad","unhappy"],["pretty","beautiful"],["smart","clever"],["begin","start"],["end","finish"],["hard","difficult"]];
    vocab.forEach(([w,syn])=>{
      add(`Which word means the same as "${w}"?`,"multiple",shuffle([syn,"broken","purple","seven"]),syn,`Think of another word for "${w}".`,`"${syn}" means the same as "${w}".`);
      add(`"${w}" means the same as _____.`,"input",null,syn,`Another word for ${w}...`,`"${w}" = "${syn}".`);
    });
  }
  if (theme==="Capitalization") {
    const names=["john","sara","new york","monday","january","mr. smith","fido","main street"];
    const correct=["John","Sara","New York","Monday","January","Mr. Smith","Fido","Main Street"];
    names.forEach((n,i)=>{
      add(`Capitalize correctly: "${n}"`,"input",null,correct[i],"Names and proper nouns start with a capital letter.",`"${correct[i]}" is correct.`);
      add(`Should "${n}" be capitalized?`,"multiple",["Yes","No"],"Yes","Is it a name, place, or day?","Names, places, and days are capitalized.");
    });
    add("Which should be capitalized?","multiple",shuffle(["tuesday","ball","run","happy"]),"tuesday","Days of the week are capitalized.","Tuesday is a proper noun.");
    add("Which should be capitalized?","multiple",shuffle(["march","chair","walk","green"]),"march","Months are capitalized.","March is a proper noun.");
    for(let i=0;i<5;i++) add("The first word of a sentence should be _____.","multiple",["capitalized","lowercase","bold","underlined"],"capitalized","Every sentence starts with...","The first word is always capitalized.");
  }
  if (theme==="Punctuation Basics") {
    for(let i=0;i<5;i++){
      add("A telling sentence ends with a _____.","multiple",shuffle(["period","question mark","exclamation point","comma"]),"period","Telling sentences end with .","A period ends a statement.");
      add("An asking sentence ends with a _____.","multiple",shuffle(["question mark","period","exclamation point","comma"]),"question mark","Asking sentences end with ?","A question mark ends a question.");
      add("A sentence showing excitement ends with _____.","multiple",shuffle(["exclamation point","period","question mark","comma"]),"exclamation point","Exciting! Amazing! Wow!","An exclamation point shows strong feeling.");
    }
    add(`What punctuation goes here? "Where are you going___"`,"multiple",["?",".",",","!"],"?","Is it asking something?","Questions need a question mark.");
    add(`What punctuation goes here? "I love ice cream___"`,"multiple",["!","?",".",","],"!","It shows excitement.","An exclamation point shows excitement.");
    add(`What punctuation goes here? "The cat is sleeping___"`,"multiple",[".",",","?","!"],".","It's a simple statement.","Statements end with periods.");
  }

  // ── LEVEL C ──
  if (theme==="Long Vowels") {
    const words=[["cake","a"],["bike","i"],["bone","o"],["cute","u"],["tree","e"],["kite","i"],["home","o"],["tube","u"],["make","a"],["these","e"],["time","i"],["hope","o"],["mule","u"],["lake","a"],["gene","e"]];
    words.forEach(([w,v])=>{
      add(`What is the long vowel sound in "${w}"?`,"multiple",shuffle(["a","e","i","o","u"]),v,`The silent E makes the vowel say its name.`,`"${w}" has a long ${v} sound.`);
      add(`Does "${w}" have a long or short vowel sound?`,"multiple",["Long","Short"],"Long","Silent E at the end makes it long.","The E at the end makes the vowel long.");
    });
  }
  if (theme==="Compound Words") {
    const compounds=[["sun","flower","sunflower"],["rain","bow","rainbow"],["foot","ball","football"],["bed","room","bedroom"],["cup","cake","cupcake"],["air","plane","airplane"],["base","ball","baseball"],["some","thing","something"],["out","side","outside"],["butter","fly","butterfly"],["fire","truck","firetruck"],["book","shelf","bookshelf"],["tooth","brush","toothbrush"],["snow","man","snowman"],["star","fish","starfish"]];
    compounds.forEach(([a,b,c])=>{
      add(`Combine "${a}" + "${b}" = ?`,"input",null,c,`Put the two words together.`,`${a} + ${b} = ${c}.`);
      const wrong=shuffle(compounds.filter(x=>x[2]!==c).map(x=>x[2])).slice(0,3);
      add(`Which is a compound word?`,"multiple",shuffle([c,...wrong]),c,`A compound word is two words put together.`,`"${c}" = "${a}" + "${b}".`);
    });
  }
  if (theme==="Main Idea") {
    const passages=[
      {text:"Dogs make great pets. They are loyal and fun. Dogs love to play fetch and go for walks.",q:"What is the main idea?",a:"Dogs make great pets",opts:["Dogs make great pets","Cats are better","Birds can fly","Fish swim"]},
      {text:"Apples are a healthy snack. They have vitamins and taste sweet. You can eat them raw or in a pie.",q:"What is the main idea?",a:"Apples are a healthy snack",opts:["Apples are a healthy snack","Pie is tasty","Vitamins are important","Oranges are better"]},
      {text:"Exercise is important for everyone. It keeps your body strong and your mind sharp. You should try to exercise every day.",q:"What is the main idea?",a:"Exercise is important",opts:["Exercise is important","Sleep is good","Food gives energy","Water is wet"]},
    ];
    passages.forEach(p=>{
      add(`Read: "${p.text}" — ${p.q}`,"multiple",shuffle(p.opts),p.a,"The main idea is what the whole passage is about.","The main idea is the most important point.");
      add(`Read: "${p.text}" — What is the passage mainly about?`,"input",null,p.a,"What is the big idea?","The main idea is the central topic.");
    });
    for(let i=0;i<9;i++) add("The main idea of a paragraph is _____.","multiple",shuffle(["what the whole paragraph is about","a small detail","the first word","the last sentence"]),"what the whole paragraph is about","The main idea is the big picture.","The main idea tells what the paragraph is mostly about.");
  }
  if (theme==="Context Clues") {
    const clues=[
      {sent:"The enormous elephant was the biggest animal at the zoo.",word:"enormous",a:"Very big",opts:["Very big","Very small","Fast","Colorful"]},
      {sent:"She was famished after not eating all day, so she ate three plates of food.",word:"famished",a:"Very hungry",opts:["Very hungry","Tired","Happy","Scared"]},
      {sent:"The frigid wind made everyone shiver and put on their coats.",word:"frigid",a:"Very cold",opts:["Very cold","Hot","Windy","Calm"]},
      {sent:"He was elated when he won the prize — he jumped up and down with joy.",word:"elated",a:"Very happy",opts:["Very happy","Angry","Sad","Tired"]},
      {sent:"The swift rabbit ran so fast that no one could catch it.",word:"swift",a:"Very fast",opts:["Very fast","Slow","Big","Small"]},
    ];
    clues.forEach(c=>{
      add(`"${c.sent}" What does "${c.word}" mean?`,"multiple",shuffle(c.opts),c.a,"Use the other words to figure out the meaning.","Context clues help you figure out unknown words.");
      add(`Based on the sentence "${c.sent}", "${c.word}" means _____.`,"input",null,c.a,"What does the rest of the sentence tell you?",`"${c.word}" means "${c.a}".`);
      addH(`Write a sentence using the word "${c.word}".`,"input",null,c.word,"Use it like the example sentence.",`Any sentence correctly using "${c.word}" works.`);
    });
  }
  if (theme==="Nouns & Verbs") {
    const nouns=["dog","cat","house","tree","book","ball","car","apple","teacher","school"];
    const verbs=["run","jump","eat","read","play","sing","walk","swim","write","draw"];
    nouns.forEach(n=>{
      add(`Is "${n}" a noun or a verb?`,"multiple",["Noun","Verb"],"Noun","A noun is a person, place, or thing.","Nouns name people, places, or things.");
      add(`Which word is a NOUN?`,"multiple",shuffle([n,"run","quickly","beautiful"]),n,"A noun is a person, place, or thing.",`"${n}" is a noun.`);
    });
    verbs.forEach(v=>{
      add(`Is "${v}" a noun or a verb?`,"multiple",["Noun","Verb"],"Verb","A verb is an action word.","Verbs show action.");
      add(`Which word is a VERB?`,"multiple",shuffle([v,"table","pretty","slowly"]),v,"A verb shows action.",`"${v}" is a verb.`);
    });
  }
  if (theme==="Story Elements") {
    for(let i=0;i<5;i++){
      add("The CHARACTERS in a story are _____.","multiple",shuffle(["the people or animals in the story","where the story takes place","what happens","the author"]),"the people or animals in the story","Characters are who the story is about.","Characters are the people/animals in a story.");
      add("The SETTING of a story is _____.","multiple",shuffle(["where and when the story takes place","who is in the story","the problem","the ending"]),"where and when the story takes place","Setting = where + when.","The setting is the time and place.");
      add("The PLOT of a story is _____.","multiple",shuffle(["what happens in the story","who is in it","where it takes place","the title"]),"what happens in the story","Plot = events.","The plot is the sequence of events.");
    }
  }

  // ── LEVEL D ──
  if (theme==="Prefixes & Suffixes") {
    const prefixes=[["un","not","unhappy","happy"],["re","again","redo","do"],["pre","before","preview","view"],["mis","wrongly","misspell","spell"],["dis","not","disagree","agree"]];
    prefixes.forEach(([pre,meaning,example,base])=>{
      add(`What does the prefix "${pre}-" mean?`,"multiple",shuffle([meaning,"after","more","under"]),meaning,`Think: "${example}" means ${meaning} ${base}.`,`"${pre}-" means "${meaning}".`);
      add(`Add the prefix "${pre}-" to "${base}":`,  "input",null,example,`Put "${pre}" in front of "${base}".`,`${pre} + ${base} = ${example}.`);
      add(`"${example}" means _____ ${base}.`,"multiple",shuffle([meaning,"very","always","sometimes"]),meaning,`The prefix "${pre}-" means...`,`"${pre}-" means "${meaning}".`);
    });
    const suffixes=[["ful","full of","hopeful","hope"],["less","without","careless","care"],["ness","state of","kindness","kind"],["ly","in a way","slowly","slow"],["er","one who","teacher","teach"],["ing","doing","running","run"],["ed","past tense","jumped","jump"]];
    suffixes.forEach(([suf,meaning,example,base])=>{
      add(`What does the suffix "-${suf}" mean?`,"multiple",shuffle([meaning,"before","not","again"]),meaning,`Think: "${example}" means ${meaning} ${base}.`,`"-${suf}" means "${meaning}".`);
      add(`Add "-${suf}" to "${base}":`, "input",null,example,`Put "-${suf}" at the end of "${base}".`,`${base} + ${suf} = ${example}.`);
    });
  }
  if (theme==="Synonyms & Antonyms") {
    const syns=[["happy","joyful"],["sad","unhappy"],["big","large"],["small","tiny"],["fast","quick"],["slow","sluggish"],["smart","clever"],["pretty","beautiful"],["angry","furious"],["brave","courageous"],["start","begin"],["end","finish"],["easy","simple"],["hard","difficult"],["loud","noisy"]];
    syns.forEach(([a,b])=>{
      add(`What is a synonym for "${a.toUpperCase()}"?`,"multiple",shuffle([b,"purple","seven","chair"]),b,`A synonym means the same thing.`,`"${b}" means the same as "${a}".`);
      add(`"${a}" and "${b}" are _____.`,"multiple",["Synonyms","Antonyms","Homophones","Verbs"],"Synonyms","They mean the same thing.","Synonyms have the same meaning.");
    });
    const ants=[["hot","cold"],["big","small"],["happy","sad"],["fast","slow"],["up","down"],["light","dark"],["old","new"],["open","close"],["hard","soft"],["wet","dry"],["loud","quiet"],["long","short"],["full","empty"],["right","wrong"],["win","lose"]];
    ants.forEach(([a,b])=>{
      add(`What is an antonym for "${a.toUpperCase()}"?`,"multiple",shuffle([b,"purple","seven","chair"]),b,`An antonym means the opposite.`,`"${b}" is the opposite of "${a}".`);
      add(`"${a}" and "${b}" are _____.`,"multiple",["Antonyms","Synonyms","Homophones","Verbs"],"Antonyms","They mean the opposite.","Antonyms have opposite meanings.");
    });
  }
  if (theme==="Text Evidence") {
    const passages=[
      {text:"Maria loves painting. She paints every day after school. Her room is full of paintings.",q:"How do you know Maria loves painting?",a:"She paints every day",opts:["She paints every day","She said so","Her mom told her","She has brushes"]},
      {text:"The sky grew dark and the wind blew hard. Trees bent sideways.",q:"What evidence tells you a storm is coming?",a:"The sky grew dark and wind blew hard",opts:["The sky grew dark and wind blew hard","It was sunny","Birds were singing","Flowers bloomed"]},
    ];
    passages.forEach(p=>{
      for(let i=0;i<4;i++){
        add(`Read: "${p.text}" — ${p.q}`,"multiple",shuffle(p.opts),p.a,"Find the clues in the text.","Text evidence means proof from the passage.");
      }
      add(`Read: "${p.text}" — Find evidence: ${p.q}`,"input",null,p.a,"Quote from the passage.","Look at what the text says directly.");
    });
    for(let i=0;i<5;i++) add("Text evidence is _____.","multiple",shuffle(["proof from the passage","your opinion","a guess","what a friend says"]),"proof from the passage","Evidence comes from the text itself.","Text evidence = proof found in the reading.");
  }
  if (theme==="Adjectives & Adverbs") {
    const adjs=["big","small","red","happy","tall","old","new","fast","slow","bright"];
    adjs.forEach(a=>{
      add(`Is "${a}" an adjective or an adverb?`,"multiple",["Adjective","Adverb"],"Adjective","Adjectives describe nouns.",`"${a}" describes a noun, so it's an adjective.`);
    });
    const advs=["quickly","slowly","loudly","softly","happily","sadly","carefully","badly","easily","eagerly"];
    advs.forEach(a=>{
      add(`Is "${a}" an adjective or an adverb?`,"multiple",["Adjective","Adverb"],"Adverb","Adverbs describe verbs and often end in -ly.",`"${a}" describes how something is done.`);
    });
    add("Adjectives describe _____.","multiple",shuffle(["nouns","verbs","adverbs","prepositions"]),"nouns","Adjectives tell about people, places, things.","Adjectives modify nouns.");
    add("Adverbs describe _____.","multiple",shuffle(["verbs","nouns","articles","pronouns"]),"verbs","Adverbs tell how, when, or where.","Adverbs modify verbs.");
  }
  if (theme==="Paragraph Writing") {
    for(let i=0;i<5;i++){
      add("Every paragraph should have a _____ sentence.","multiple",shuffle(["topic","funny","long","short"]),"topic","The first sentence tells what the paragraph is about.","A topic sentence introduces the main idea.");
      add("Supporting details _____.","multiple",shuffle(["give more information about the main idea","change the topic","end the paragraph","start a new paragraph"]),"give more information about the main idea","Details support the topic sentence.","Supporting details explain the main idea.");
      add("A concluding sentence _____.","multiple",shuffle(["wraps up the paragraph","starts a new idea","asks a question","is always short"]),"wraps up the paragraph","The last sentence closes the paragraph.","A concluding sentence summarizes or restates the main idea.");
    }
  }
  if (theme==="Figurative Language" && level==="D") {
    const similes=[["quick as a fox","Simile"],["the sun is a golden coin","Metaphor"],["the wind whispered through the trees","Personification"],["I told you a million times","Hyperbole"],["buzz went the bee","Onomatopoeia"],["brave as a lion","Simile"],["life is a rollercoaster","Metaphor"],["the flowers danced in the wind","Personification"],["I'm so hungry I could eat a horse","Hyperbole"],["crash bang boom","Onomatopoeia"]];
    similes.forEach(([ex,type])=>{
      add(`"${ex}" is an example of:`,"multiple",shuffle(["Simile","Metaphor","Personification","Hyperbole"]),type,`${type==="Simile"?"Uses 'like' or 'as'":type==="Metaphor"?"Says something IS something else":type==="Personification"?"Gives human qualities to non-human things":"Extreme exaggeration"}.`,`This is ${type.toLowerCase()}.`);
    });
    add("A simile uses the words _____.","multiple",shuffle(["like or as","is","but","and"]),"like or as","Similes compare using 'like' or 'as'.","Similes use 'like' or 'as' to compare.");
    add("A metaphor says something _____ something else.","multiple",shuffle(["IS","LIKE","AS","BUT"]),"IS","Metaphors don't use 'like' or 'as'.","Metaphors directly say one thing is another.");
  }

  // ── LEVEL E ──
  if (theme==="Greek & Latin Roots") {
    const roots=[["bio","life","biology"],["graph","write","autograph"],["port","carry","transport"],["aud","hear","audience"],["vis","see","visible"],["dict","say","dictionary"],["struct","build","construct"],["rupt","break","interrupt"],["scrib","write","describe"],["spec","look","inspect"],["aqua","water","aquarium"],["terra","earth","territory"],["phon","sound","telephone"],["auto","self","automatic"],["micro","small","microscope"]];
    roots.forEach(([root,meaning,example])=>{
      add(`The root "${root}" means:`, "multiple",shuffle([meaning,"opposite","again","under"]),meaning,`Think of the word "${example}".`,`"${root}" means "${meaning}" as in "${example}".`);
      add(`Which word contains the root "${root}"?`, "multiple",shuffle([example,"banana","purple","thirteen"]),example,`"${root}" means "${meaning}".`,`"${example}" contains "${root}".`);
    });
  }
  if (theme==="Inference") {
    const inferences=[
      {text:"Sam grabbed his umbrella and raincoat before leaving.",q:"What can you infer about the weather?",a:"It is raining or about to rain",opts:["It is raining or about to rain","It is sunny","It is snowing","It is windy"]},
      {text:"The puppy wagged its tail and jumped on the visitor.",q:"How does the puppy feel?",a:"Happy and excited",opts:["Happy and excited","Scared","Angry","Tired"]},
      {text:"Maria yawned and rubbed her eyes during the movie.",q:"What can you infer about Maria?",a:"She is tired",opts:["She is tired","She is scared","She is hungry","She is angry"]},
      {text:"The cafeteria was noisy with children laughing and talking.",q:"What can you infer?",a:"It is lunchtime at school",opts:["It is lunchtime at school","It is nighttime","Everyone is sleeping","The school is closed"]},
    ];
    inferences.forEach(inf=>{
      add(`Read: "${inf.text}" — ${inf.q}`,"multiple",shuffle(inf.opts),inf.a,"Use clues in the text to figure out what's not directly stated.","An inference uses clues to draw a conclusion.");
      add(`Read: "${inf.text}" — ${inf.q}`,"input",null,inf.a,"What do the details suggest?","Infer means to read between the lines.");
    });
    for(let i=0;i<7;i++) add("An inference is _____.","multiple",shuffle(["a conclusion based on evidence and reasoning","a fact stated in the text","a random guess","the author's name"]),"a conclusion based on evidence and reasoning","Inferences use clues from the text.","An inference is an educated conclusion.");
  }
  if (theme==="Compare & Contrast") {
    for(let i=0;i<5;i++){
      add("When you COMPARE two things, you find _____.","multiple",shuffle(["how they are similar","how they are different","what color they are","how old they are"]),"how they are similar","Compare = same.","Comparing finds similarities.");
      add("When you CONTRAST two things, you find _____.","multiple",shuffle(["how they are different","how they are similar","their names","their sizes"]),"how they are different","Contrast = different.","Contrasting finds differences.");
      add("Which signal word shows COMPARISON?","multiple",shuffle(["similarly","however","but","although"]),"similarly","Comparison = alike.","'Similarly' shows comparison.");
      add("Which signal word shows CONTRAST?","multiple",shuffle(["however","likewise","also","similarly"]),"however","Contrast = different.","'However' signals contrast.");
    }
  }
  if (theme==="Point of View") {
    for(let i=0;i<5;i++){
      add(`"I went to the store." — What point of view is this?`,"multiple",shuffle(["First person","Second person","Third person","Fourth person"]),"First person","Look for 'I' or 'we'.","First person uses 'I' or 'we'.");
      add(`"You should try this." — What point of view?`,"multiple",shuffle(["Second person","First person","Third person","None"]),"Second person","Look for 'you'.","Second person uses 'you'.");
      add(`"She walked to school." — What point of view?`,"multiple",shuffle(["Third person","First person","Second person","None"]),"Third person","Look for 'he', 'she', 'they'.","Third person uses 'he', 'she', 'they'.");
    }
  }
  if (theme==="Grammar Review") {
    for(let i=0;i<5;i++){
      add("A NOUN is _____.","multiple",shuffle(["a person, place, or thing","an action word","a describing word","a connecting word"]),"a person, place, or thing","Nouns name things.","Nouns are people, places, or things.");
      add("A VERB is _____.","multiple",shuffle(["an action word","a person","a place","a describing word"]),"an action word","Verbs show action.","Verbs express action or state of being.");
      add("An ADJECTIVE describes _____.","multiple",shuffle(["a noun","a verb","an adverb","a conjunction"]),"a noun","Adjectives modify nouns.","Adjectives describe nouns.");
      add("A PRONOUN replaces _____.","multiple",shuffle(["a noun","a verb","an adjective","a sentence"]),"a noun","He, she, they, it...","Pronouns take the place of nouns.");
    }
  }
  if (theme==="Research Skills") {
    for(let i=0;i<5;i++){
      add("A reliable source is _____.","multiple",shuffle(["a trusted place to find information","any website","a friend's opinion","a social media post"]),"a trusted place to find information","Think: can you trust it?","Reliable sources are trustworthy and accurate.");
      add("An encyclopedia is _____.","multiple",shuffle(["a book of facts on many topics","a story book","a dictionary","a comic book"]),"a book of facts on many topics","Encyclopedias have factual information.","Encyclopedias contain factual articles.");
      add("The table of contents is found _____.","multiple",shuffle(["at the beginning of a book","at the end","in the middle","on the cover"]),"at the beginning of a book","It lists chapters and pages.","The table of contents is at the front.");
    }
  }

  // ── LEVEL F ──
  if (theme==="Vocabulary in Context" && level==="F") {
    const vocab=[
      {sent:"The benevolent king gave food to all the poor families.",word:"benevolent",a:"Kind and generous",opts:["Kind and generous","Mean","Confused","Loud"]},
      {sent:"The meticulous artist spent hours on every tiny detail.",word:"meticulous",a:"Very careful and precise",opts:["Very careful and precise","Messy","Lazy","Quick"]},
      {sent:"Her candid response surprised everyone because it was so honest.",word:"candid",a:"Honest and open",opts:["Honest and open","Sneaky","Quiet","Rude"]},
      {sent:"The dilapidated building was falling apart.",word:"dilapidated",a:"In poor condition",opts:["In poor condition","Brand new","Beautiful","Tall"]},
      {sent:"She showed great resilience by bouncing back from every setback.",word:"resilience",a:"Ability to recover quickly",opts:["Ability to recover quickly","Weakness","Anger","Speed"]},
    ];
    vocab.forEach(v=>{
      add(`"${v.sent}" — The word "${v.word}" means:`,"multiple",shuffle(v.opts),v.a,"Use context clues from the sentence.",`"${v.word}" means "${v.a}".`);
      add(`Based on context, "${v.word}" means _____.`,"input",null,v.a,"Read the whole sentence for clues.",`"${v.word}" means "${v.a}".`);
      addH(`Use "${v.word}" in a sentence.`,"input",null,v.word,"Show you understand the meaning.",`Use it to show its meaning.`);
    });
  }
  if (theme==="Theme & Moral") {
    for(let i=0;i<5;i++){
      add("The THEME of a story is _____.","multiple",shuffle(["the lesson or message","the main character","the setting","the title"]),"the lesson or message","Theme = the big lesson.","The theme is the underlying message.");
      add("A MORAL is _____.","multiple",shuffle(["a lesson learned from a story","a character","a setting","a conflict"]),"a lesson learned from a story","Fables often have morals.","A moral is a life lesson from the story.");
      add(`The story of the tortoise and the hare teaches: "Slow and steady wins the race." This is the _____.`,"multiple",shuffle(["moral","setting","character","conflict"]),"moral","It's the lesson of the story.","The moral is the lesson.");
    }
  }
  if (theme==="Author's Purpose") {
    for(let i=0;i<5;i++){
      add("The three main purposes for writing are _____.","multiple",shuffle(["to inform, persuade, and entertain","to read, write, and listen","to speak, sing, and dance","to eat, sleep, and play"]),"to inform, persuade, and entertain","PIE: Persuade, Inform, Entertain.","Authors write to persuade, inform, or entertain.");
      add("A newspaper article is written to _____.","multiple",shuffle(["inform","entertain","persuade","confuse"]),"inform","News gives facts.","News articles inform readers.");
      add("A fairy tale is written to _____.","multiple",shuffle(["entertain","inform","persuade","scare"]),"entertain","Stories are for enjoyment.","Fairy tales entertain readers.");
      add("An advertisement is written to _____.","multiple",shuffle(["persuade","inform","entertain","educate"]),"persuade","Ads want you to buy something.","Advertisements persuade people.");
    }
  }
  if (theme==="Figurative Language" && level==="F") {
    const examples=[
      ["The stars winked at me","Personification"],["He runs like the wind","Simile"],["Time is money","Metaphor"],["I have a ton of homework","Hyperbole"],["The leaves whispered secrets","Personification"],["She is as brave as a lion","Simile"],["The world is a stage","Metaphor"],["I waited forever","Hyperbole"],["The thunder grumbled","Personification"],["Cool as a cucumber","Simile"],
    ];
    examples.forEach(([ex,type])=>{
      add(`"${ex}" is an example of:`,"multiple",shuffle(["Simile","Metaphor","Personification","Hyperbole"]),type,`Think about what technique is being used.`,`This is ${type.toLowerCase()}.`);
    });
    add("Personification gives _____ qualities to non-human things.","multiple",shuffle(["human","animal","plant","rock"]),"human","Person = human.","Personification attributes human traits to non-human things.");
    add("Hyperbole is _____.","multiple",shuffle(["extreme exaggeration","a comparison using 'like'","a direct comparison","giving human traits"]),"extreme exaggeration","Hyper = over the top.","Hyperbole is extreme exaggeration for effect.");
  }
  if (theme==="Sentence Structure" && level==="F") {
    for(let i=0;i<5;i++){
      add("A SIMPLE sentence has _____.","multiple",shuffle(["one independent clause","two independent clauses","a dependent clause","no subject"]),"one independent clause","Simple = one complete thought.","A simple sentence has one independent clause.");
      add("A COMPOUND sentence joins two clauses with _____.","multiple",shuffle(["a conjunction (and, but, or)","a period","nothing","a question mark"]),"a conjunction (and, but, or)","FANBOYS: For, And, Nor, But, Or, Yet, So.","Compound sentences use conjunctions.");
      add("Which is a compound sentence?","multiple",shuffle(["I ran and she walked.","The cat sat.","Running fast.","Blue sky."]),"I ran and she walked.","It has two complete thoughts joined by 'and'.","Two independent clauses joined by a conjunction.");
    }
  }
  if (theme==="Opinion Writing") {
    for(let i=0;i<5;i++){
      add("An opinion is _____.","multiple",shuffle(["what someone thinks or believes","a proven fact","a question","a command"]),"what someone thinks or believes","Opinions are personal views.","An opinion reflects a personal belief.");
      add("A FACT is _____.","multiple",shuffle(["something that can be proven true","what someone thinks","a guess","a hope"]),"something that can be proven true","Facts can be verified.","Facts are provable statements.");
      add(`"Pizza is the best food." — Is this a fact or opinion?`,"multiple",["Opinion","Fact"],"Opinion","Can it be proven?","It's a personal preference, not provable.");
      add(`"Water boils at 100°C." — Is this a fact or opinion?`,"multiple",["Fact","Opinion"],"Fact","Can it be proven?","This can be scientifically verified.");
    }
  }

  // ── LEVELS G–L: generate themed questions ──
  const upperThemeBank = {
    "Connotation & Denotation":[
      {q:"The DENOTATION of a word is its _____.",opts:["dictionary definition","emotional meaning","synonym","antonym"],a:"dictionary definition"},
      {q:"The CONNOTATION of a word is its _____.",opts:["emotional association","dictionary meaning","spelling","pronunciation"],a:"emotional association"},
      {q:`"Thrifty" and "cheap" have the same denotation but different _____.`,opts:["connotations","spellings","pronunciations","definitions"],a:"connotations"},
      {q:`"Home" has a _____ connotation compared to "house".`,opts:["warmer","colder","neutral","negative"],a:"warmer"},
      {q:`Which word has a NEGATIVE connotation?`,opts:["stubborn","determined","firm","resolute"],a:"stubborn"},
      {q:`Which word has a POSITIVE connotation?`,opts:["courageous","reckless","foolish","careless"],a:"courageous"},
      {q:`"Inexpensive" vs "cheap" — which sounds more positive?`,opts:["Inexpensive","Cheap","Both the same","Neither"],a:"Inexpensive"},
      {q:`"Slender" has a more _____ connotation than "skinny".`,opts:["positive","negative","neutral","angry"],a:"positive"},
      {q:`The denotation of "snake" is a reptile. A common connotation is _____.`,opts:["untrustworthy","friendly","colorful","slow"],a:"untrustworthy"},
      {q:`"Childlike" has a _____ connotation; "childish" has a _____ one.`,opts:["positive; negative","negative; positive","both positive","both negative"],a:"positive; negative"},
      {q:"Connotation can be positive, negative, or _____.","opts":["neutral","loud","fast","colorful"],a:"neutral"},
      {q:`"Assertive" vs "bossy" — "bossy" has a _____ connotation.`,opts:["negative","positive","neutral","happy"],a:"negative"},
      {q:`"Vintage" vs "old" — "vintage" sounds more _____.`,opts:["valuable","worthless","broken","ugly"],a:"valuable"},
      {q:`"Unique" vs "weird" — which is more positive?`,opts:["Unique","Weird","Both","Neither"],a:"Unique"},
      {q:`Authors choose words with specific connotations to influence the reader's _____.`,opts:["feelings","spelling","grammar","handwriting"],a:"feelings"},
    ],
    "Central Idea":[
      {q:"The central idea is _____.","opts":["the main point of a text","a supporting detail","the title","the author"],a:"the main point of a text"},
      {q:"Supporting details help _____.","opts":["explain the central idea","change the topic","confuse the reader","end the text"],a:"explain the central idea"},
      {q:"To find the central idea, ask: 'What is this text MOSTLY about?' True or false?","opts":["True","False"],a:"True"},
      {q:"A summary should include the _____ and key details.","opts":["central idea","author's birthday","page numbers","illustrations"],a:"central idea"},
      {q:"The central idea is usually _____ in the text.","opts":["implied or stated","always the first sentence","always the title","never mentioned"],a:"implied or stated"},
      {q:"Which is a central idea vs. a detail? 'Exercise is important' vs 'Running burns calories'","opts":["Exercise is important = central idea","Running burns calories = central idea","Both are details","Both are central ideas"],a:"Exercise is important = central idea"},
    ],
    "Argument & Evidence":[
      {q:"A claim is _____.","opts":["a statement the author wants you to believe","a fact everyone agrees on","a question","a summary"],a:"a statement the author wants you to believe"},
      {q:"Evidence supports a _____.","opts":["claim","title","bibliography","heading"],a:"claim"},
      {q:"Which is the strongest evidence?","opts":["A scientific study","A friend's opinion","A rumor","A guess"],a:"A scientific study"},
      {q:"A counterargument is _____.","opts":["the opposing viewpoint","your main claim","a summary","a conclusion"],a:"the opposing viewpoint"},
      {q:"Logical reasoning connects evidence to the _____.","opts":["claim","title","author","setting"],a:"claim"},
      {q:"Anecdotal evidence is _____ than statistical evidence.","opts":["weaker","stronger","the same","unrelated"],a:"weaker"},
    ],
    "Literary Devices":[
      {q:"Alliteration is _____.","opts":["repeating the same beginning sound","a type of rhyme","a metaphor","a plot twist"],a:"repeating the same beginning sound"},
      {q:`"Peter Piper picked a peck" is an example of _____.`,"opts":["alliteration","metaphor","simile","hyperbole"],a:"alliteration"},
      {q:"Foreshadowing gives _____ about future events.","opts":["hints","facts","opinions","definitions"],a:"hints"},
      {q:"Irony is when the opposite of what is _____ happens.","opts":["expected","written","said","seen"],a:"expected"},
      {q:"An allusion is a reference to _____.","opts":["something well-known","nothing","the future","a footnote"],a:"something well-known"},
      {q:"Imagery appeals to the reader's _____.","opts":["senses","logic","memory","schedule"],a:"senses"},
    ],
    "Comma Rules":[
      {q:"Use a comma _____ items in a list.","opts":["between","after all","before all","instead of"],a:"between"},
      {q:`"I bought apples oranges and bananas." Where do commas go?`,"opts":["After apples and oranges","After bananas","Nowhere","After I"],a:"After apples and oranges"},
      {q:"Use a comma after an _____ phrase.","opts":["introductory","ending","middle","short"],a:"introductory"},
      {q:"Use a comma before a _____ in a compound sentence.","opts":["conjunction","period","noun","verb"],a:"conjunction"},
      {q:`"However I disagree." — The comma goes after _____.`,"opts":["However","I","disagree","No comma needed"],a:"However"},
      {q:"The Oxford comma goes before the last item and the _____ in a list.","opts":["conjunction","period","semicolon","colon"],a:"conjunction"},
    ],
    "Persuasive Writing":[
      {q:"Persuasive writing tries to _____.","opts":["convince the reader","inform the reader","entertain the reader","confuse the reader"],a:"convince the reader"},
      {q:"A strong persuasive essay includes _____.","opts":["evidence and reasoning","only opinions","no examples","random facts"],a:"evidence and reasoning"},
      {q:"Emotional appeal targets the reader's _____.","opts":["feelings","logic","ethics","spelling"],a:"feelings"},
      {q:"Logical appeal uses _____.","opts":["facts and reasoning","emotions","personal stories","humor"],a:"facts and reasoning"},
      {q:"Ethical appeal builds the writer's _____.","opts":["credibility","humor","vocabulary","speed"],a:"credibility"},
      {q:"A call to action tells the reader to _____.","opts":["do something","stop reading","forget everything","take a nap"],a:"do something"},
    ],
  };
  // Add more themes for levels G-L
  const moreThemes = {
    "Word Choice & Tone":[
      {q:"Tone is the author's _____ toward the subject.","opts":["attitude","name","age","address"],a:"attitude"},
      {q:"Formal tone is used in _____.","opts":["academic writing","text messages","jokes","diaries"],a:"academic writing"},
      {q:"Word choice affects the _____ of a text.","opts":["tone and mood","length","font","page number"],a:"tone and mood"},
      {q:`"The experiment yielded results" has a _____ tone.`,"opts":["formal","casual","angry","silly"],a:"formal"},
      {q:"Informal tone sounds like _____.","opts":["everyday conversation","a textbook","a legal document","a dictionary"],a:"everyday conversation"},
      {q:"Diction means _____.","opts":["word choice","punctuation","spelling","grammar"],a:"word choice"},
    ],
    "Textual Analysis":[
      {q:"Textual analysis examines _____.","opts":["how a text creates meaning","just the plot","only characters","the cover"],a:"how a text creates meaning"},
      {q:"When analyzing a text, consider the author's _____.","opts":["purpose and audience","favorite color","age","hometown"],a:"purpose and audience"},
      {q:"Structure in a text refers to _____.","opts":["how it is organized","how long it is","the font used","the paper quality"],a:"how it is organized"},
      {q:"A thesis statement presents the _____ of an analysis.","opts":["main argument","bibliography","title page","dedication"],a:"main argument"},
      {q:"Evidence in textual analysis comes from _____.","opts":["the text itself","outside sources only","your imagination","the author's biography"],a:"the text itself"},
      {q:"Analysis goes beyond summary by explaining _____.","opts":["WHY and HOW","just WHAT","only WHO","just WHERE"],a:"WHY and HOW"},
    ],
    "Bias & Perspective":[
      {q:"Bias is _____.","opts":["a one-sided viewpoint","a fact","a summary","a question"],a:"a one-sided viewpoint"},
      {q:"To identify bias, look for _____ language.","opts":["loaded or emotional","neutral","simple","short"],a:"loaded or emotional"},
      {q:"A balanced text presents _____ sides.","opts":["multiple","one","no","random"],a:"multiple"},
      {q:"Perspective is shaped by a person's _____.","opts":["experiences and beliefs","height","hair color","shoe size"],a:"experiences and beliefs"},
      {q:"Media literacy helps you _____.","opts":["evaluate sources critically","watch more TV","read faster","write shorter"],a:"evaluate sources critically"},
      {q:"An objective text is _____.","opts":["free from personal opinions","full of bias","always short","always long"],a:"free from personal opinions"},
    ],
    "Complex Sentences":[
      {q:"A complex sentence has one independent clause and at least one _____ clause.","opts":["dependent","independent","simple","compound"],a:"dependent"},
      {q:"Which word starts a dependent clause?","opts":["Because","And","But","Or"],a:"Because"},
      {q:`"Because it rained, we stayed inside." — The dependent clause is _____.`,"opts":["Because it rained","we stayed inside","we","inside"],a:"Because it rained"},
      {q:"Subordinating conjunctions include: because, although, when, if, and _____.","opts":["since","and","but","or"],a:"since"},
      {q:"A dependent clause _____ stand alone as a sentence.","opts":["cannot","can","always","sometimes"],a:"cannot"},
      {q:`"Although she was tired, she finished the race." — "Although she was tired" is a _____ clause.`,"opts":["dependent","independent","simple","run-on"],a:"dependent"},
    ],
    "MLA Basics":[
      {q:"MLA stands for _____.","opts":["Modern Language Association","Math Learning Academy","Multiple Letter Arrangement","Main Lesson Approach"],a:"Modern Language Association"},
      {q:"MLA format uses _____ spacing.","opts":["double","single","triple","no"],a:"double"},
      {q:"In MLA, the Works Cited page lists _____.","opts":["all sources used","only books","the title","the author's bio"],a:"all sources used"},
      {q:"MLA in-text citations include the author's _____ and page number.","opts":["last name","first name","middle name","nickname"],a:"last name"},
      {q:"MLA format uses _____ font.","opts":["12-point Times New Roman","Comic Sans","any font","bold Arial"],a:"12-point Times New Roman"},
      {q:"The header in MLA includes your _____ and page number.","opts":["last name","favorite quote","school name","grade"],a:"last name"},
    ],
    "Expository Writing":[
      {q:"Expository writing _____.","opts":["explains or informs","tells a story","persuades","describes feelings"],a:"explains or informs"},
      {q:"An expository essay uses _____ evidence.","opts":["factual","emotional","fictional","poetic"],a:"factual"},
      {q:"A thesis statement in expository writing states the _____.","opts":["main idea","character","setting","conflict"],a:"main idea"},
      {q:"Transition words in expository writing include _____.","opts":["furthermore, additionally, however","once upon a time","the end","dear diary"],a:"furthermore, additionally, however"},
      {q:"The purpose of expository writing is to _____.","opts":["educate the reader","make the reader laugh","scare the reader","bore the reader"],a:"educate the reader"},
      {q:"Expository essays should be written in _____ person.","opts":["third","first","second","no"],a:"third"},
    ],
    "Advanced Vocabulary":[
      {q:`"Ubiquitous" means _____.`,"opts":["found everywhere","rare","invisible","ancient"],a:"found everywhere"},
      {q:`"Ephemeral" means _____.`,"opts":["lasting a very short time","eternal","heavy","colorful"],a:"lasting a very short time"},
      {q:`"Pragmatic" means _____.`,"opts":["practical and realistic","dreamy","artistic","lazy"],a:"practical and realistic"},
      {q:`"Eloquent" means _____.`,"opts":["fluent and persuasive in speaking","quiet","rude","boring"],a:"fluent and persuasive in speaking"},
      {q:`"Ambiguous" means _____.`,"opts":["open to more than one interpretation","clear","simple","obvious"],a:"open to more than one interpretation"},
      {q:`"Benevolent" means _____.`,"opts":["well-meaning and kindly","evil","selfish","lazy"],a:"well-meaning and kindly"},
    ],
    "Rhetoric & Appeals":[
      {q:"Ethos appeals to _____.","opts":["credibility/ethics","emotions","logic","humor"],a:"credibility/ethics"},
      {q:"Pathos appeals to _____.","opts":["emotions","logic","credibility","facts"],a:"emotions"},
      {q:"Logos appeals to _____.","opts":["logic and reason","emotions","ethics","authority"],a:"logic and reason"},
      {q:"A rhetorical question does NOT expect a _____.","opts":["real answer","reaction","thought","pause"],a:"real answer"},
      {q:"Repetition in rhetoric is used to _____.","opts":["emphasize a point","waste time","confuse","bore"],a:"emphasize a point"},
      {q:"An appeal to authority uses _____ to support a claim.","opts":["expert opinions","rumors","gossip","wishes"],a:"expert opinions"},
    ],
    "Poetry Analysis":[
      {q:"A stanza in poetry is like a _____ in prose.","opts":["paragraph","word","letter","period"],a:"paragraph"},
      {q:"Rhyme scheme is labeled using _____.","opts":["letters (ABAB)","numbers","symbols","colors"],a:"letters (ABAB)"},
      {q:"Free verse poetry has NO regular _____.","opts":["rhyme or meter","words","meaning","author"],a:"rhyme or meter"},
      {q:"A sonnet has _____ lines.","opts":["14","10","20","8"],a:"14"},
      {q:"Meter is the _____ pattern in poetry.","opts":["rhythmic","color","size","font"],a:"rhythmic"},
      {q:"A haiku has _____ syllables total.","opts":["17","10","20","12"],a:"17"},
    ],
    "Semicolons & Colons":[
      {q:"A semicolon connects two _____ clauses.","opts":["independent","dependent","short","run-on"],a:"independent"},
      {q:"Use a colon before a _____.","opts":["list","period","comma","semicolon"],a:"list"},
      {q:`Which is correct? "I have three pets___ a dog, a cat, and a fish."`,"opts":["colon (:)","semicolon (;)","comma (,)","period (.)"],a:"colon (:)"},
      {q:`"She loves to read; he prefers to write." — The semicolon joins two _____ ideas.`,"opts":["related","unrelated","opposite","random"],a:"related"},
      {q:"A semicolon is _____ than a comma but _____ than a period.","opts":["stronger; weaker","weaker; stronger","the same","unrelated"],a:"stronger; weaker"},
      {q:"Do NOT use a semicolon before a _____ clause.","opts":["dependent","independent","main","complete"],a:"dependent"},
    ],
    "Research Writing":[
      {q:"A research paper starts with a _____.","opts":["thesis statement","bibliography","conclusion","index"],a:"thesis statement"},
      {q:"Primary sources are _____ accounts.","opts":["firsthand","secondhand","thirdhand","fictional"],a:"firsthand"},
      {q:"Secondary sources _____ primary sources.","opts":["analyze or interpret","replace","ignore","copy"],a:"analyze or interpret"},
      {q:"Plagiarism is _____.","opts":["using someone's work without credit","good research","a type of citation","a writing style"],a:"using someone's work without credit"},
      {q:"A bibliography lists _____.","opts":["all sources consulted","only books","the author's friends","the page count"],a:"all sources consulted"},
      {q:"Paraphrasing means _____.","opts":["restating in your own words","copying exactly","deleting","ignoring"],a:"restating in your own words"},
    ],
    "Literary Analysis":[
      {q:"Literary analysis examines _____.","opts":["how an author creates meaning","just the plot","only the ending","the book cover"],a:"how an author creates meaning"},
      {q:"A motif is a _____ element in a literary work.","opts":["recurring","one-time","hidden","deleted"],a:"recurring"},
      {q:"Symbolism uses objects to represent _____.","opts":["abstract ideas","nothing","other objects","prices"],a:"abstract ideas"},
      {q:"Characterization is how an author _____ characters.","opts":["develops","names","counts","draws"],a:"develops"},
      {q:"Theme differs from subject because theme is a _____ about the subject.","opts":["statement or message","single word","name","date"],a:"statement or message"},
      {q:"Conflict in literature can be internal or _____.","opts":["external","invisible","optional","imaginary"],a:"external"},
    ],
    "SAT Vocabulary":[
      {q:`"Arduous" means _____.`,"opts":["difficult and tiring","easy","fun","colorful"],a:"difficult and tiring"},
      {q:`"Candid" means _____.`,"opts":["truthful and straightforward","dishonest","shy","confused"],a:"truthful and straightforward"},
      {q:`"Diligent" means _____.`,"opts":["hardworking","lazy","careless","rude"],a:"hardworking"},
      {q:`"Gregarious" means _____.`,"opts":["sociable","shy","angry","bored"],a:"sociable"},
      {q:`"Meticulous" means _____.`,"opts":["showing great attention to detail","careless","fast","loud"],a:"showing great attention to detail"},
      {q:`"Pragmatic" means _____.`,"opts":["dealing with things practically","idealistic","dreamy","random"],a:"dealing with things practically"},
    ],
    "Analyzing Arguments":[
      {q:"A valid argument has _____.","opts":["logical reasoning and evidence","only emotions","no evidence","personal attacks"],a:"logical reasoning and evidence"},
      {q:"A logical fallacy is _____.","opts":["a flaw in reasoning","strong evidence","a fact","good logic"],a:"a flaw in reasoning"},
      {q:"Ad hominem attacks the _____ instead of the argument.","opts":["person","evidence","logic","conclusion"],a:"person"},
      {q:"A straw man fallacy _____ the opponent's argument.","opts":["misrepresents","strengthens","supports","ignores"],a:"misrepresents"},
      {q:"Appeal to popularity assumes something is right because _____.","opts":["many people believe it","it is proven","experts agree","studies show it"],a:"many people believe it"},
      {q:"A red herring _____ from the main argument.","opts":["distracts","supports","proves","strengthens"],a:"distracts"},
    ],
    "Shakespeare Basics":[
      {q:"Shakespeare wrote in _____ pentameter.","opts":["iambic","trochaic","anapestic","dactylic"],a:"iambic"},
      {q:"A soliloquy is when a character _____.","opts":["speaks thoughts aloud alone","sings","fights","dances"],a:"speaks thoughts aloud alone"},
      {q:`"Romeo and Juliet" is a _____.`,"opts":["tragedy","comedy","history","fairy tale"],a:"tragedy"},
      {q:"Shakespeare's plays were performed at the _____ Theatre.","opts":["Globe","Empire","Palace","Royal"],a:"Globe"},
      {q:`"To be, or not to be" is from _____.`,"opts":["Hamlet","Macbeth","Othello","King Lear"],a:"Hamlet"},
      {q:"Shakespeare wrote approximately _____ plays.","opts":["37","10","50","100"],a:"37"},
    ],
    "Essay Structure":[
      {q:"An essay has an introduction, body, and _____.","opts":["conclusion","appendix","glossary","index"],a:"conclusion"},
      {q:"The thesis statement is in the _____.","opts":["introduction","conclusion","body","title"],a:"introduction"},
      {q:"Body paragraphs support the _____.","opts":["thesis","title","author","date"],a:"thesis"},
      {q:"Each body paragraph needs a _____ sentence.","opts":["topic","random","final","first"],a:"topic"},
      {q:"The conclusion should _____ the thesis.","opts":["restate","contradict","ignore","delete"],a:"restate"},
      {q:"Transitions connect _____ between paragraphs.","opts":["ideas","pages","words","letters"],a:"ideas"},
    ],
    "Critical Reading":[
      {q:"Critical reading means _____.","opts":["analyzing and evaluating a text","reading fast","reading aloud","skimming"],a:"analyzing and evaluating a text"},
      {q:"When reading critically, question the author's _____.","opts":["assumptions and evidence","handwriting","spelling","age"],a:"assumptions and evidence"},
      {q:"Annotating a text means _____.","opts":["making notes and marking key passages","drawing pictures","erasing words","copying it"],a:"making notes and marking key passages"},
      {q:"Critical readers consider _____ perspectives.","opts":["multiple","only one","no","random"],a:"multiple"},
      {q:"Evaluating credibility means checking if a source is _____.","opts":["trustworthy","long","short","colorful"],a:"trustworthy"},
      {q:"Critical reading requires _____ engagement with the text.","opts":["active","passive","no","minimal"],a:"active"},
    ],
    "Complex Grammar":[
      {q:"A gerund is a verb form used as a _____.","opts":["noun","verb","adjective","adverb"],a:"noun"},
      {q:"A participle is a verb form used as an _____.","opts":["adjective","noun","adverb","conjunction"],a:"adjective"},
      {q:"An infinitive begins with _____.","opts":["to","for","by","at"],a:"to"},
      {q:"Parallel structure means using the same _____ pattern.","opts":["grammatical","color","size","font"],a:"grammatical"},
      {q:"A dangling modifier has no clear _____ to modify.","opts":["word","sentence","paragraph","book"],a:"word"},
      {q:"Subject-verb agreement means they must match in _____.","opts":["number","color","length","font"],a:"number"},
    ],
    "Advanced Grammar":[
      {q:"The subjunctive mood expresses _____.","opts":["wishes or hypotheticals","facts","commands","questions"],a:"wishes or hypotheticals"},
      {q:`"If I were rich" uses the _____ mood.`,"opts":["subjunctive","indicative","imperative","interrogative"],a:"subjunctive"},
      {q:"An appositive _____ a noun.","opts":["renames or describes","replaces","deletes","hides"],a:"renames or describes"},
      {q:"A relative clause begins with _____.","opts":["who, which, or that","and, but, or","because, since","for, to, by"],a:"who, which, or that"},
      {q:"Active voice: the subject _____ the action.","opts":["performs","receives","ignores","watches"],a:"performs"},
      {q:"Passive voice: the subject _____ the action.","opts":["receives","performs","ignores","creates"],a:"receives"},
    ],
    "AP Vocabulary":[
      {q:`"Juxtaposition" means _____.`,"opts":["placing things side by side for comparison","separating","hiding","ignoring"],a:"placing things side by side for comparison"},
      {q:`"Didactic" means _____.`,"opts":["intended to teach","entertaining","confusing","boring"],a:"intended to teach"},
      {q:`"Pedantic" means _____.`,"opts":["excessively focused on minor details","relaxed","creative","emotional"],a:"excessively focused on minor details"},
      {q:`"Sardonic" means _____.`,"opts":["grimly mocking","kind","gentle","happy"],a:"grimly mocking"},
      {q:`"Verisimilitude" means _____.`,"opts":["appearance of being true","beauty","complexity","humor"],a:"appearance of being true"},
      {q:`"Anaphora" is the repetition of words at the _____ of successive clauses.`,"opts":["beginning","end","middle","random place"],a:"beginning"},
    ],
    "Comparative Literature":[
      {q:"Comparative literature studies _____.","opts":["literature across cultures and languages","only English texts","only poetry","only novels"],a:"literature across cultures and languages"},
      {q:"An archetype is a _____ pattern.","opts":["universal","rare","modern","artificial"],a:"universal"},
      {q:"The Hero's Journey is a common _____.","opts":["narrative archetype","poem type","essay format","grammar rule"],a:"narrative archetype"},
      {q:"Intertextuality is when texts _____ each other.","opts":["reference","ignore","contradict","copy"],a:"reference"},
      {q:"A universal theme is understood across _____.","opts":["cultures","one country only","one school","one classroom"],a:"cultures"},
      {q:"Genre means _____ of literature.","opts":["category or type","length","age","color"],a:"category or type"},
    ],
    "Rhetorical Analysis":[
      {q:"Rhetorical analysis examines HOW an author _____.","opts":["makes an argument","tells a joke","draws a picture","sings a song"],a:"makes an argument"},
      {q:"The rhetorical triangle includes speaker, audience, and _____.","opts":["message","setting","time","weather"],a:"message"},
      {q:"SOAPSTone stands for Speaker, Occasion, Audience, Purpose, Subject, _____.","opts":["Tone","Time","Text","Title"],a:"Tone"},
      {q:"Kairos refers to the _____ context of an argument.","opts":["timeliness / right moment","color","length","font"],a:"timeliness / right moment"},
      {q:"A rhetorical strategy is a technique used to _____.","opts":["persuade the audience","confuse the audience","bore the audience","ignore the audience"],a:"persuade the audience"},
      {q:"Analyzing rhetoric requires examining both content and _____.","opts":["style/delivery","cover page","bibliography","index"],a:"style/delivery"},
    ],
    "College Essay":[
      {q:"A college essay should showcase your _____.","opts":["unique voice and personality","test scores","GPA","class rank"],a:"unique voice and personality"},
      {q:"The best college essays are _____.","opts":["authentic and specific","generic","very long","copied"],a:"authentic and specific"},
      {q:"'Show, don't tell' means using _____ details.","opts":["vivid, specific","vague","general","boring"],a:"vivid, specific"},
      {q:"A college essay prompt asks you to _____.","opts":["reflect and share your perspective","list achievements","write a research paper","summarize a book"],a:"reflect and share your perspective"},
      {q:"The opening of a college essay should _____.","opts":["grab the reader's attention","be boring","restate the prompt","list your grades"],a:"grab the reader's attention"},
      {q:"Revision is _____ for a strong college essay.","opts":["essential","optional","unnecessary","harmful"],a:"essential"},
    ],
    "Satire & Irony":[
      {q:"Satire uses humor to _____.","opts":["criticize or mock","praise","ignore","hide"],a:"criticize or mock"},
      {q:"Verbal irony is when someone says the _____ of what they mean.","opts":["opposite","same","more","less"],a:"opposite"},
      {q:"Situational irony is when the outcome is _____ what was expected.","opts":["opposite of","exactly","similar to","unrelated to"],a:"opposite of"},
      {q:"Dramatic irony is when the audience knows something the _____ does not.","opts":["character","author","narrator","reader"],a:"character"},
      {q:`"A Modest Proposal" by Jonathan Swift is an example of _____.`,"opts":["satire","romance","mystery","comedy"],a:"satire"},
      {q:"Sarcasm is a form of _____ irony.","opts":["verbal","situational","dramatic","cosmic"],a:"verbal"},
    ],
    "AP Lang Terms":[
      {q:"An antithesis presents _____ ideas in parallel structure.","opts":["contrasting","similar","random","unrelated"],a:"contrasting"},
      {q:"Chiasmus is a _____ of grammatical structures.","opts":["reversal","repetition","deletion","combination"],a:"reversal"},
      {q:"Synecdoche uses a _____ to represent the whole.","opts":["part","color","sound","shape"],a:"part"},
      {q:"Metonymy replaces a name with something _____ associated.","opts":["closely","loosely","never","rarely"],a:"closely"},
      {q:`"The pen is mightier than the sword" — "pen" is _____ for writing.`,"opts":["metonymy","simile","alliteration","onomatopoeia"],a:"metonymy"},
      {q:"Epistrophe is repetition at the _____ of successive clauses.","opts":["end","beginning","middle","random point"],a:"end"},
    ],
    "Advanced Rhetoric":[
      {q:"Aristotle identified three rhetorical appeals: ethos, pathos, and _____.","opts":["logos","kairos","mythos","chronos"],a:"logos"},
      {q:"The Toulmin model of argument includes claim, evidence, and _____.","opts":["warrant","thesis","topic","theme"],a:"warrant"},
      {q:"A warrant connects the evidence to the _____.","opts":["claim","title","author","conclusion only"],a:"claim"},
      {q:"Rogerian argument seeks _____ ground.","opts":["common","higher","lower","no"],a:"common"},
      {q:"A concession acknowledges the _____ of the opposing view.","opts":["validity","weakness","irrelevance","humor"],a:"validity"},
      {q:"Effective rhetoric considers the audience's _____.","opts":["values and beliefs","age only","name","height"],a:"values and beliefs"},
    ],
    "Research Paper":[
      {q:"A research paper requires _____ sources.","opts":["credible","any","no","fictional"],a:"credible"},
      {q:"An annotated bibliography includes a _____ of each source.","opts":["summary and evaluation","picture","graph","song"],a:"summary and evaluation"},
      {q:"A literature review surveys _____.","opts":["existing research on a topic","fiction books","newspapers only","magazines only"],a:"existing research on a topic"},
      {q:"Peer-reviewed articles are reviewed by _____.","opts":["experts in the field","the public","students","anyone"],a:"experts in the field"},
      {q:"APA and MLA are types of _____ styles.","opts":["citation","writing","reading","speaking"],a:"citation"},
      {q:"A counterargument _____ your paper.","opts":["strengthens","weakens","destroys","ignores"],a:"strengthens"},
    ],
    "Literary Theory":[
      {q:"Feminist criticism examines _____.","opts":["gender roles and power","only female authors","only poetry","only novels"],a:"gender roles and power"},
      {q:"Marxist criticism focuses on _____.","opts":["social class and economics","grammar","rhythm","rhyme"],a:"social class and economics"},
      {q:"Psychoanalytic criticism explores characters' _____.","opts":["unconscious motivations","clothes","names","ages"],a:"unconscious motivations"},
      {q:"New Historicism considers the _____ context of literature.","opts":["historical and cultural","grammatical","numerical","visual"],a:"historical and cultural"},
      {q:"Reader-response theory focuses on the _____ interpretation.","opts":["reader's","author's","editor's","publisher's"],a:"reader's"},
      {q:"Formalism focuses on the text's _____ elements.","opts":["structural and literary","historical","biographical","cultural"],a:"structural and literary"},
    ],
    "SAT Reading":[
      {q:"SAT Reading passages test your ability to _____.","opts":["comprehend and analyze texts","write essays","do math","draw pictures"],a:"comprehend and analyze texts"},
      {q:"Evidence-based questions ask you to _____ your answer.","opts":["support with text evidence","guess","skip","imagine"],a:"support with text evidence"},
      {q:"In SAT Reading, 'best evidence' means the lines that _____ your answer.","opts":["most directly support","contradict","are unrelated to","repeat"],a:"most directly support"},
      {q:"Paired passages require you to _____ two texts.","opts":["compare and analyze","ignore one","only read one","combine into one"],a:"compare and analyze"},
      {q:"Vocabulary in context questions ask for the meaning _____ used in the passage.","opts":["as","always","never","sometimes"],a:"as"},
      {q:"The main purpose question asks WHY the author _____.","opts":["wrote the passage","chose the title","used that font","lived there"],a:"wrote the passage"},
    ],
    "College-Level Writing":[
      {q:"College-level writing requires _____ thinking.","opts":["critical","basic","no","simple"],a:"critical"},
      {q:"A strong thesis is _____ and arguable.","opts":["specific","vague","obvious","broad"],a:"specific"},
      {q:"Academic writing uses _____ person.","opts":["third","first","second","no"],a:"third"},
      {q:"Synthesis means combining _____ sources.","opts":["multiple","zero","one","fictional"],a:"multiple"},
      {q:"Proper citation avoids _____.","opts":["plagiarism","creativity","research","reading"],a:"plagiarism"},
      {q:"Revision focuses on _____ while proofreading focuses on _____.","opts":["content/structure; grammar/spelling","spelling; content","nothing; everything","grammar; ideas"],a:"content/structure; grammar/spelling"},
    ],
  };

  // Check in both banks
  const bank = upperThemeBank[theme] || moreThemes[theme];
  if (bank) {
    bank.forEach(item => {
      add(item.q,"multiple",shuffle(item.opts),item.a,`Think about what "${theme}" means.`,`The answer is "${item.a}".`);
    });
    // Add input variants for first 8
    bank.slice(0,8).forEach(item => {
      add(`${item.q} (type your answer)`,"input",null,item.a,`Think carefully about ${theme}.`,`The answer is "${item.a}".`);
    });
  }

  return qs;
}

function generateELAQuestions(level) {
  const info = ELA_LEVEL_MAP[level];
  if (!info) return [];
  const questions = [];
  let idNum = 1;
  const mkId = () => `${level}ELA-${String(idNum++).padStart(4,"0")}`;

  info.themes.forEach(theme => {
    questions.push(...generateELAThemeQuestions(level, theme, mkId));
  });

  return questions;
}

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
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:12}}>
      <div style={{background:"#fff",borderRadius:"var(--r-xl)",boxShadow:"var(--shadow-xl)",width:"100%",maxWidth:720,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderBottom:"1px solid var(--cream-dd)"}}>
          <h3 style={{fontWeight:700,fontSize:14,display:"flex",alignItems:"center",gap:6,color:"var(--ink)"}}>
            <PenTool size={15} color="var(--purple)"/> Scratch Pad
          </h3>
          <button onClick={onClose} style={{width:30,height:30,borderRadius:"var(--r-sm)",background:"var(--cream)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--ink-l)"}}>
            <X size={16}/>
          </button>
        </div>
        <div style={{padding:"10px 14px",borderBottom:"1px solid var(--cream-dd)",display:"flex",flexWrap:"wrap",alignItems:"center",gap:8}}>
          {["pen","eraser"].map(t=>(
            <button key={t} onClick={()=>setTool(t)} style={{padding:"6px 14px",borderRadius:"var(--r-md)",fontSize:13,fontWeight:600,border:"none",cursor:"pointer",textTransform:"capitalize",background:tool===t?"var(--purple)":"var(--cream)",color:tool===t?"#fff":"var(--ink-l)"}}>
              {t}
            </button>
          ))}
          {tool==="pen"&&["#1a1a1a","#e74c3c","#3498db","#27ae60","#f39c12"].map(c=>(
            <button key={c} onClick={()=>setColor(c)} style={{width:26,height:26,borderRadius:"var(--r-full)",background:c,border:color===c?"2.5px solid var(--purple)":"2px solid transparent",cursor:"pointer",transform:color===c?"scale(1.15)":"none",transition:"transform .15s"}}/>
          ))}
          {tool==="pen"&&<input type="range" min="1" max="12" value={size} onChange={e=>setSize(+e.target.value)} style={{width:80}}/>}
          <button onClick={clear} style={{marginLeft:"auto",padding:"6px 12px",background:"var(--coral)",color:"#fff",border:"none",borderRadius:"var(--r-md)",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
            <Trash2 size={13}/> Clear
          </button>
        </div>
        <canvas ref={ref} width={760} height={380} onMouseDown={start} onMouseMove={draw} onMouseUp={stop} onMouseLeave={stop} onTouchStart={start} onTouchMove={draw} onTouchEnd={stop}
          style={{margin:12,border:"1.5px solid var(--cream-dd)",borderRadius:"var(--r-md)",cursor:"crosshair",touchAction:"none",maxWidth:"calc(100% - 24px)",display:"block"}}/>
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
    <div style={{minHeight:"100svh",background:"linear-gradient(145deg,#EFF6FF,#EDE9FE)",padding:"20px 16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style={{width:"100%",maxWidth:560,display:"flex",flexDirection:"column",gap:0}}>
        <div className="sci" style={{background:"#fff",borderRadius:"var(--r-xl)",overflow:"hidden",boxShadow:"var(--shadow-lg)"}}>
          {/* Header */}
          <div style={{background:"var(--grad-learn)",padding:"24px 24px 20px",color:"#fff"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{width:40,height:40,background:"rgba(255,255,255,0.18)",borderRadius:"var(--r-md)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Lightbulb size={20} color="#fff"/>
              </div>
              <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",opacity:0.75}}>New Concept</span>
            </div>
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:700,marginBottom:6}}>{ex.title}</h2>
            <p style={{fontSize:14,opacity:0.85,lineHeight:1.5}}>{ex.intro}</p>
          </div>
          {/* Body */}
          <div style={{padding:"20px 24px 24px",display:"flex",flexDirection:"column",gap:20}}>
            <div>
              <h3 style={{fontWeight:700,color:"var(--ink-m)",marginBottom:12,fontSize:14,display:"flex",alignItems:"center",gap:6}}>
                <BookOpen size={15} color="var(--blue)"/> Steps to solve:
              </h3>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {ex.steps.map((step,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10}}>
                    <span style={{width:22,height:22,background:"var(--blue-ll)",color:"var(--blue)",borderRadius:"var(--r-full)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</span>
                    <span style={{fontSize:14,color:"var(--ink-m)",lineHeight:1.5}}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{fontWeight:700,color:"var(--ink-m)",marginBottom:12,fontSize:14,display:"flex",alignItems:"center",gap:6}}>
                <Star size={15} color="var(--amber)"/> Worked examples:
              </h3>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {ex.worked.map((w,i)=>(
                  <div key={i} style={{background:"var(--amber-ll)",border:"1px solid var(--amber-l)",borderRadius:"var(--r-md)",padding:"12px 14px"}}>
                    <p style={{fontWeight:600,color:"var(--ink)",marginBottom:4,fontSize:14}}>📝 {w.problem}</p>
                    <p style={{color:"var(--amber)",fontSize:13}}>✅ {w.solution}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={onStart} style={{...s.btn("learn",true,false,"lg"),gap:8}}>
              <Play size={18}/> Start Practice Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AI EXPLANATION PANEL (shown inline after wrong answer)
// ─────────────────────────────────────────────────────────────
function AIExplanationPanel({ question, wrongAnswer, attempts, aiText, loading, onTryAgain, onSkip }) {
  const isStep = attempts >= 2;
  return (
    <div className="sci2" style={{
      background: isStep
        ? "linear-gradient(145deg,#EDE9FE,#DBEAFE)"
        : "linear-gradient(145deg,#FEF3C7,#FFF7ED)",
      border: `2px solid ${isStep ? "#A78BFA" : "#FCD34D"}`,
      borderRadius: "var(--r-xl)",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
    }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <div style={{
          width:36, height:36, borderRadius:"var(--r-full)",
          background: isStep ? "var(--purple)" : "var(--amber)",
          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
        }}>
          {isStep ? <Sparkles size={18} color="#fff"/> : <Lightbulb size={18} color="#fff"/>}
        </div>
        <div>
          <p style={{ fontWeight:700, fontSize:14, color: isStep ? "var(--purple)" : "var(--amber)", lineHeight:1 }}>
            {isStep ? "Let me break it down step-by-step" : "Oops! Here's what happened"}
          </p>
          <p style={{ fontSize:11, color:"var(--ink-ll)", marginTop:2 }}>Your answer: <strong>{wrongAnswer}</strong></p>
        </div>
      </div>

      {/* AI explanation */}
      <div style={{
        background:"rgba(255,255,255,0.85)",
        borderRadius:"var(--r-lg)",
        padding:"14px 16px",
        fontSize:14,
        color:"var(--ink-m)",
        lineHeight:1.65,
        minHeight: 52,
        display:"flex",
        alignItems: loading ? "center" : "flex-start",
        gap:8,
      }}>
        {loading ? (
          <>
            <div style={{ width:16, height:16, border:"2px solid var(--purple-l)", borderTopColor:"var(--purple)", borderRadius:"50%", animation:"spin .7s linear infinite", flexShrink:0 }}/>
            <span style={{ color:"var(--ink-ll)", fontStyle:"italic" }}>Thinking of the best way to explain this…</span>
          </>
        ) : (
          aiText || question.explanation
        )}
      </div>

      {!loading && !isStep && question.hint && (
        <div style={{ background:"rgba(201,151,58,0.1)", border:"1px solid var(--gold-l)", borderRadius:"var(--r-md)", padding:"10px 14px", fontSize:13, color:"var(--gold)" }}>
          💡 Hint: {question.hint}
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display:"flex", gap:10 }}>
        <button onClick={onTryAgain} style={{
          ...s.btn("learn", true, false, "md"),
          flex:2,
        }}>
          ↩ Try Again
        </button>
        <button onClick={onSkip} style={{
          ...s.btn("ghost", false, false, "md"),
          flex:1,
          color:"var(--ink-ll)",
          fontSize:13,
        }}>
          Skip →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MASTERY CELEBRATION OVERLAY
// ─────────────────────────────────────────────────────────────
function MasteryCelebration({ level, nextLevel, onContinue }) {
  const confetti = Array.from({length:20}, (_,i) => ({
    id:i,
    left: `${Math.random()*100}%`,
    color: ["#C9973A","#E8604C","#7C3AED","#16A34A","#2563EB"][i%5],
    delay: `${Math.random()*1.5}s`,
    size: 8 + Math.random()*8,
  }));
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:999,
      background:"rgba(28,58,47,0.85)",
      display:"flex", alignItems:"center", justifyContent:"center",
      backdropFilter:"blur(8px)",
    }}>
      {confetti.map(c => (
        <div key={c.id} style={{
          position:"absolute", top:-20, left:c.left,
          width:c.size, height:c.size,
          borderRadius: c.id%2===0 ? "50%" : "2px",
          background:c.color,
          animation:`confettiFall 3s ${c.delay} ease-in forwards`,
        }}/>
      ))}
      <div className="pop" style={{
        background:"white", borderRadius:"var(--r-2xl)",
        padding:"40px 32px", maxWidth:380, width:"90%",
        textAlign:"center",
        animation:"masteryGlow 2s ease-in-out infinite",
      }}>
        <div style={{ fontSize:64, marginBottom:8, animation:"streakPop .5s ease" }}>🏆</div>
        <h2 style={{ fontFamily:"'Fraunces',serif", fontSize:28, fontWeight:800, color:"var(--forest)", marginBottom:8 }}>
          Level {level} Mastered!
        </h2>
        <p style={{ color:"var(--ink-l)", fontSize:15, marginBottom:24, lineHeight:1.5 }}>
          You scored 80%+ and unlocked <strong>Level {nextLevel}</strong>!
          That's incredible work. 🎉
        </p>
        <div style={{ background:"var(--sage-ll)", borderRadius:"var(--r-lg)", padding:"16px", marginBottom:24 }}>
          <p style={{ fontSize:12, color:"var(--ink-ll)", marginBottom:4 }}>Advancing to</p>
          <p style={{ fontFamily:"'Fraunces',serif", fontSize:40, fontWeight:800, color:"var(--forest)", lineHeight:1 }}>Level {nextLevel}</p>
        </div>
        <button onClick={onContinue} style={{ ...s.btn("gold", true, false, "lg"), gap:8 }}>
          <Play size={18}/> Start Level {nextLevel}!
        </button>
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
  const gradBg = pct>=80?"linear-gradient(145deg,#16A34A,#22C55E)":pct>=60?"linear-gradient(145deg,#D97706,#F59E0B)":"linear-gradient(145deg,#DC2626,#EF4444)";

  return (
    <div style={{minHeight:"100svh",background:"#F8F8FA",padding:"20px 16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style={{width:"100%",maxWidth:560,display:"flex",flexDirection:"column",gap:16}}>

        {/* Score card */}
        <div className="sci" style={{background:gradBg,borderRadius:"var(--r-xl)",padding:"24px 20px",color:"#fff",boxShadow:"var(--shadow-lg)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div>
              <p style={{fontSize:13,opacity:0.8,fontWeight:500,marginBottom:4}}>{isRetry?"Retry Review":"Day "+dayNumber} Results</p>
              <h2 style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:700}}>
                {pct>=80?"Great Work! 🎉":pct>=60?"Good Effort! 💪":"Keep Practicing! 📚"}
              </h2>
            </div>
            <div style={{textAlign:"right"}}>
              <p style={{fontFamily:"'Fraunces',serif",fontSize:48,fontWeight:800,lineHeight:1}}>{pct}%</p>
              <p style={{fontSize:13,opacity:0.8}}>{correct.length}/{questions.length} correct</p>
            </div>
          </div>
          <div style={{height:8,background:"rgba(255,255,255,0.25)",borderRadius:"var(--r-full)",overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:"#fff",borderRadius:"var(--r-full)",transition:"width .8s cubic-bezier(.22,1,.36,1)"}}/>
          </div>
        </div>

        {/* Wrong answers */}
        {wrong.length > 0 && (
          <div className="sci2" style={{...s.card(20)}}>
            <h3 style={{fontWeight:700,fontSize:15,color:"#DC2626",display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
              <XCircle size={16} color="#DC2626"/> Questions to Review ({wrong.length})
            </h3>
            <div style={{background:"var(--amber-ll)",border:"1px solid var(--amber-l)",borderRadius:"var(--r-md)",padding:"10px 12px",marginBottom:14,fontSize:13,color:"var(--amber)"}}>
              📌 These will appear again tomorrow so you can master them!
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {wrong.slice(0,showAll?wrong.length:5).map((q)=>{
                const idx = questions.indexOf(q);
                return (
                  <div key={q.id} style={{border:"1.5px solid rgba(220,38,38,0.2)",borderRadius:"var(--r-md)",padding:"14px 16px",background:"rgba(220,38,38,0.04)"}}>
                    <p style={{fontWeight:600,color:"var(--ink)",marginBottom:6,fontSize:14,lineHeight:1.4}}>Q: {q.question}</p>
                    <p style={{color:"#DC2626",fontSize:13,marginBottom:3}}>❌ Your answer: <strong>{answers[idx]||(answers[idx]===""?"(blank)":answers[idx])|| "(blank)"}</strong></p>
                    <p style={{color:"var(--green)",fontSize:13,marginBottom:8}}>✅ Correct: <strong>{q.answer}</strong></p>
                    <div style={{background:"rgba(255,255,255,0.9)",borderRadius:"var(--r-sm)",padding:"10px 12px",border:"1px solid var(--cream-dd)"}}>
                      <p style={{fontSize:11,fontWeight:600,color:"var(--ink-ll)",marginBottom:4}}>💡 How to solve it:</p>
                      <p style={{fontSize:13,color:"var(--ink-m)",lineHeight:1.5}}>{q.explanation}</p>
                      {q.hint&&<p style={{fontSize:12,color:"var(--blue)",marginTop:4}}>Hint: {q.hint}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
            {wrong.length>5&&(
              <button onClick={()=>setShowAll(!showAll)} style={{marginTop:10,width:"100%",padding:"10px",fontSize:13,color:"var(--purple)",fontWeight:600,background:"transparent",border:"none",cursor:"pointer",borderRadius:"var(--r-md)"}}>
                {showAll?`Show less ▲`:`Show all ${wrong.length} wrong answers ▼`}
              </button>
            )}
          </div>
        )}

        {/* Correct answers */}
        {correct.length > 0 && (
          <div className="sci3" style={{...s.card(20)}}>
            <h3 style={{fontWeight:700,fontSize:15,color:"var(--green)",display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
              <CheckCircle size={16} color="var(--green)"/> Correct Answers ({correct.length})
            </h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {correct.map(q=>(
                <div key={q.id} style={{background:"var(--green-ll)",borderRadius:"var(--r-md)",padding:"10px 12px",border:"1px solid rgba(22,163,74,0.15)"}}>
                  <p style={{fontSize:12,color:"var(--ink-l)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:3}}>{q.question}</p>
                  <p style={{color:"var(--green)",fontWeight:700,fontSize:13}}>✓ {q.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={onContinue} style={{...s.btn("learn",true,false,"lg"),gap:8}}>
          <ArrowRight size={18}/> {wrong.length>0?"Continue to Next Day":"Continue"}
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
    if (cur + 1 >= questions.length) { setAnswers(newA); setDone(true); }
    else { setAnswers(newA); setCur(cur+1); setInput(""); setShowHint(false); }
  };

  if (done) {
    const correct = questions.filter((q,i) => isCorrect(answers[i], q.answer)).length;
    const pct = Math.round(correct / questions.length * 100);
    const passed = pct >= 80;
    return (
      <div style={{minHeight:"100svh",background:"linear-gradient(145deg,#EDE9FE,#EFF6FF)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px 16px"}}>
        <div className="sci" style={{...s.card(28),maxWidth:440,width:"100%",textAlign:"center",boxShadow:"var(--shadow-xl)"}}>
          <div style={{width:80,height:80,borderRadius:"var(--r-full)",background:passed?"var(--green-ll)":"rgba(220,38,38,0.1)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
            {passed?<Trophy size={36} color="var(--green)"/>:<RotateCcw size={36} color="#DC2626"/>}
          </div>
          <h2 style={{fontFamily:"'Fraunces',serif",fontSize:26,fontWeight:700,color:"var(--forest)",marginBottom:6}}>
            {passed?"Level Complete! 🎉":"Not Quite Yet..."}
          </h2>
          <p style={{color:"var(--ink-l)",fontSize:14,marginBottom:20}}>
            {passed?"You've mastered this level!":"You need 80% to advance. Let's practice more!"}
          </p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
            {[
              {label:"Score",value:`${pct}%`,bg:passed?"var(--green-ll)":"rgba(220,38,38,0.08)",color:passed?"var(--green)":"#DC2626"},
              {label:"Correct",value:`${correct}/${questions.length}`,bg:"var(--blue-ll)",color:"var(--blue)"},
              {label:"Required",value:"80%",bg:passed?"var(--purple-ll)":"var(--amber-ll)",color:passed?"var(--purple)":"var(--amber)"},
            ].map(st=>(
              <div key={st.label} style={{background:st.bg,borderRadius:"var(--r-lg)",padding:"12px 8px",textAlign:"center"}}>
                <p style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:800,color:st.color,lineHeight:1}}>{st.value}</p>
                <p style={{fontSize:11,color:"var(--ink-ll)",marginTop:4,fontWeight:500}}>{st.label}</p>
              </div>
            ))}
          </div>
          {passed ? (
            <button onClick={onPass} style={{...s.btn("success",true,false,"lg"),gap:8}}>
              <ArrowRight size={18}/> Advance to Next Level
            </button>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <div style={{background:"var(--amber-ll)",border:"1px solid var(--amber-l)",borderRadius:"var(--r-md)",padding:"10px 14px",fontSize:13,color:"var(--amber)"}}>
                You scored {pct}%. Need {80-pct}% more to pass. Keep practicing!
              </div>
              <button onClick={onFail} style={{...s.btn("danger",true,false,"lg"),gap:8}}>
                <RotateCcw size={16}/> Repeat Level from Start
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const q = questions[cur];
  const info = LEVEL_MAP[level];
  const pct = (cur / questions.length) * 100;
  return (
    <div style={{minHeight:"100svh",background:"linear-gradient(145deg,#EDE9FE,#EFF6FF)",padding:"16px 16px",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style={{width:"100%",maxWidth:560,display:"flex",flexDirection:"column",gap:12}}>
        {/* Progress header */}
        <div style={{...s.card(16)}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <div>
              <span style={{fontWeight:700,color:"var(--purple)",fontSize:14}}>Level {level} Assessment</span>
              <span style={{color:"var(--ink-ll)",fontSize:13,marginLeft:8}}>Q {cur+1} of {questions.length}</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:12,fontWeight:700,color:"var(--amber)",background:"var(--amber-ll)",border:"1px solid var(--amber-l)",borderRadius:"var(--r-full)",padding:"4px 10px"}}>Need 80% to pass</span>
              <button onClick={()=>setWb(true)} style={{width:34,height:34,background:"var(--purple-ll)",border:"none",borderRadius:"var(--r-sm)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"var(--purple)"}}>
                <PenTool size={15}/>
              </button>
            </div>
          </div>
          <div style={{height:6,background:"var(--cream-dd)",borderRadius:"var(--r-full)",overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:"var(--grad-learn)",borderRadius:"var(--r-full)",transition:"width .3s"}}/>
          </div>
        </div>
        {/* Question */}
        <div style={{...s.card(24)}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <span style={{fontSize:12,fontWeight:700,color:"#fff",background:info.color,borderRadius:"var(--r-full)",padding:"3px 10px"}}>{q.theme}</span>
            <span style={{fontSize:11,fontWeight:600,padding:"3px 8px",borderRadius:"var(--r-full)",
              ...(q.difficulty==="easy"?{background:"var(--green-ll)",color:"var(--green)"}:q.difficulty==="hard"?{background:"rgba(220,38,38,0.1)",color:"#DC2626"}:{background:"var(--amber-ll)",color:"var(--amber)"})
            }}>{q.difficulty}</span>
          </div>
          <h2 style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:700,color:"var(--ink)",marginBottom:20,lineHeight:1.4}}>{q.question}</h2>
          {q.type==="multiple" ? (
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {q.options.map((opt,i)=>(
                <button key={i} onClick={()=>submit(opt)} style={{
                  padding:"14px 18px",borderRadius:"var(--r-md)",textAlign:"left",fontSize:15,fontWeight:500,
                  background:"var(--cream)",border:"2px solid var(--cream-dd)",cursor:"pointer",
                  fontFamily:"'Instrument Sans'",color:"var(--ink)",transition:"all .15s",
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--purple)";e.currentTarget.style.background="var(--purple-ll)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--cream-dd)";e.currentTarget.style.background="var(--cream)";}}>
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <input type="text" value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"&&input.trim())submit(input.trim());}}
                placeholder="Type your answer…" autoFocus
                style={{...s.input(),fontSize:18,fontFamily:"'Fraunces',serif",fontWeight:600}}
                onFocus={e=>e.target.style.borderColor="var(--purple)"}
                onBlur={e=>e.target.style.borderColor="rgba(224,217,207,0.9)"}/>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setShowHint(!showHint)} style={{padding:"10px 14px",background:"var(--amber-ll)",color:"var(--amber)",border:"1px solid var(--amber-l)",borderRadius:"var(--r-md)",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
                  💡 {showHint?"Hide":"Hint"}
                </button>
                <button onClick={()=>{if(input.trim())submit(input.trim());}} disabled={!input.trim()} style={{...s.btn("learn",true,!input.trim()),flex:1}}>
                  Submit →
                </button>
              </div>
              {showHint&&<div style={{background:"var(--amber-ll)",border:"1px solid var(--amber-l)",borderRadius:"var(--r-md)",padding:"10px 14px",fontSize:13,color:"var(--amber)"}}>💡 {q.hint}</div>}
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
function LearnApp({ studentName, startLevel, onBackToHome, childData }) {
  const DAILY_Q = 50;
  const DAYS_PER_LEVEL = 60; // 60 days × 50 questions = 3000 per level

  const [subject, setSubject] = useState("math"); // "math" | "ela"

  const childKey = childData?.id || studentName;
  const getProgressKey = (subj) => subj === "ela"
    ? `skillora-progress-${childKey}-ela`
    : `skillora-progress-${childKey}`;

  const defaultProgress = {
    currentLevel: startLevel,
    dayNumber: 1,
    completedDays: {},
    levelAttempt: {},
    levelQuestions: {},
    pendingRetry: {},
    seenThemes: {},
  };

  // Student progress persisted in localStorage
  const [progress, setProgress] = useState(() => loadState(getProgressKey("math"), defaultProgress));

  const [view, setView] = useState("dashboard"); // dashboard|concept|worksheet|results|assessment
  const [worksheetQ, setWorksheetQ] = useState([]);
  const [curQ, setCurQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [wb, setWb] = useState(false);
  const [pendingTheme, setPendingTheme] = useState(null);
  const [isRetryDay, setIsRetryDay] = useState(false);

  // AI Explanation Engine state
  const [wrongAttempts, setWrongAttempts] = useState({}); // questionId → count
  const [pendingWrong, setPendingWrong] = useState(null); // {question, wrongAnswer} | null
  const [aiExplain, setAiExplain] = useState(null); // {loading, text} | null

  // Streak & session tracking
  const [streak, setStreak] = useState(0);
  const sessionStartRef = useRef(null);

  // Mastery celebration
  const [masteryCelebration, setMasteryCelebration] = useState(null); // {level, nextLevel} | null

  // Load streak on mount / child change
  useEffect(() => {
    const childId = childData?.id;
    if (!childId) return;
    fetch(`/api/streaks/${encodeURIComponent(childId)}`)
      .then(r => r.json())
      .then(d => { if (d?.currentStreak != null) setStreak(d.currentStreak); })
      .catch(() => {});
  }, [childData?.id]);

  const fetchAIExplanation = async (question, wrongAnswer, isSecondAttempt) => {
    setAiExplain({ loading: true, text: null });
    const systemPrompt = `You are a warm, encouraging math tutor for K-12 students. When a student gets a question wrong:
- Be kind and supportive, never discouraging
- ${isSecondAttempt ? "Give a clear step-by-step breakdown to guide them" : "Briefly explain why their answer was incorrect and give a helpful hint"}
- Keep it concise (2-4 sentences)
- NEVER reveal the exact answer directly`;
    const userMsg = isSecondAttempt
      ? `Question: "${question.question}"\nCorrect answer concept: ${question.explanation}\nStudent answered: "${wrongAnswer}" (2nd wrong attempt). Give a step-by-step breakdown without revealing the answer.`
      : `Question: "${question.question}"\nStudent answered: "${wrongAnswer}"\nCorrect answer is: ${question.answer}\nExplain why they're wrong and guide them with a hint. Don't say the exact answer.`;
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: userMsg }], systemPrompt }),
      });
      const data = await res.json();
      setAiExplain({ loading: false, text: data.text || question.explanation });
    } catch {
      setAiExplain({ loading: false, text: question.explanation });
    }
  };

  const save = (newProg) => { setProgress(newProg); saveState(getProgressKey(subject), newProg); };

  const handleSubjectChange = (newSubject) => {
    const prog = loadState(getProgressKey(newSubject), null);
    setSubject(newSubject);
    if (newSubject === "ela" && !prog) {
      // No ELA progress yet — run placement
      setProgress(defaultProgress);
      setView("ela_placement");
    } else {
      setProgress(prog || defaultProgress);
      setView("dashboard");
    }
  };

  const activeLevelMap = subject === "ela" ? ELA_LEVEL_MAP : LEVEL_MAP;

  // Get or generate questions for current level
  const getLevelQuestions = (prog, level) => {
    if (prog.levelQuestions[level] && prog.levelQuestions[level].length > 0) {
      return prog.levelQuestions[level];
    }
    const generated = subject === "ela" ? generateELAQuestions(level) : generateLevelQuestions(level);
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
    const themes = activeLevelMap[level].themes;
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
      sessionStartRef.current = Date.now();
      setIsRetryDay(result.retryCount > 0);
      setWorksheetQ(result.questions);
      setCurQ(0); setAnswers([]); setInputVal(""); setShowHint(false);
      setWrongAttempts({}); setPendingWrong(null); setAiExplain(null);
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
    sessionStartRef.current = Date.now();
    const result = buildDailyWorksheet(newProg);
    setIsRetryDay((result.retryCount || 0) > 0);
    setWorksheetQ(result.questions || []);
    setCurQ(0); setAnswers([]); setInputVal(""); setShowHint(false);
    setWrongAttempts({}); setPendingWrong(null); setAiExplain(null);
    setView("worksheet");
  };

  const submitAnswer = (ans) => {
    const q = worksheetQ[curQ];
    const correct = isCorrect(ans, q.answer);

    if (!correct) {
      // Wrong answer — show AI explanation, don't advance
      const attempts = (wrongAttempts[q.id] || 0) + 1;
      setWrongAttempts(prev => ({ ...prev, [q.id]: attempts }));
      setPendingWrong({ question: q, wrongAnswer: ans });
      setAiExplain(null);
      fetchAIExplanation(q, ans, attempts >= 2);
      setInputVal("");
      return;
    }

    // Correct — advance
    const newA = [...answers, ans];
    setPendingWrong(null);
    setAiExplain(null);
    setInputVal("");
    setShowHint(false);
    if (curQ + 1 >= worksheetQ.length) {
      setAnswers(newA);
      setView("results");
    } else {
      setAnswers(newA);
      setCurQ(curQ + 1);
    }
  };

  const skipQuestion = () => {
    // Record the wrong answer and advance
    const q = worksheetQ[curQ];
    const wrongAns = pendingWrong?.wrongAnswer || "";
    const newA = [...answers, wrongAns];
    setPendingWrong(null);
    setAiExplain(null);
    setInputVal("");
    setShowHint(false);
    if (curQ + 1 >= worksheetQ.length) {
      setAnswers(newA);
      setView("results");
    } else {
      setAnswers(newA);
      setCurQ(curQ + 1);
    }
  };

  const handleResultsContinue = () => {
    const level = progress.currentLevel;
    const day = progress.dayNumber;
    const dayKey = `${level}-${day}`;

    // Collect wrong question IDs for retry tomorrow
    const wrongIds = worksheetQ.filter((q,i) => !isCorrect(answers[i], q.answer)).map(q => q.id);
    const correct = worksheetQ.length - wrongIds.length;
    const sessionMins = sessionStartRef.current
      ? Math.round((Date.now() - sessionStartRef.current) / 60000)
      : 0;

    const newProg = {
      ...progress,
      completedDays: {
        ...progress.completedDays,
        [dayKey]: { correct, total: worksheetQ.length, wrongIds, date: new Date().toISOString(), mins: sessionMins }
      },
      pendingRetry: { ...progress.pendingRetry, [dayKey]: wrongIds },
      dayNumber: day + 1,
    };

    // Update streak in DB
    const childId = childData?.id;
    if (childId) {
      const today = new Date().toISOString().slice(0, 10);
      fetch("/api/streaks/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId }),
      })
        .then(r => r.json())
        .then(d => { if (d?.currentStreak != null) setStreak(d.currentStreak); })
        .catch(() => {});
    }

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
    if (nextLevel !== progress.currentLevel) {
      setMasteryCelebration({ level: progress.currentLevel, nextLevel });
    } else {
      setView("dashboard");
    }
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
  if (view === "ela_placement") {
    const elaPlacementQuestions = (() => {
      const lo = LEVEL_ORDER;
      const idx = lo.indexOf(startLevel);
      const levels = [lo[Math.max(0,idx-1)], startLevel, lo[Math.min(lo.length-1,idx+1)]];
      const pool = [];
      levels.forEach(lv => {
        const qs = generateELAQuestions(lv);
        pool.push(...qs.slice(0, 3));
      });
      return shuffle(pool).slice(0, 8);
    })();
    return <ELAPlacement
      child={{ name: studentName, avatar: childData?.avatar, avatarBg: childData?.avatarBg }}
      questions={elaPlacementQuestions}
      startLevel={startLevel}
      onComplete={(level) => {
        const newProg = { currentLevel: level, dayNumber: 1, completedDays: {}, levelAttempt: {}, levelQuestions: {}, pendingRetry: {}, seenThemes: {} };
        saveState(getProgressKey("ela"), newProg);
        setProgress(newProg);
        setView("dashboard");
      }}
    />;
  }

  if (masteryCelebration) {
    return <MasteryCelebration
      level={masteryCelebration.level}
      nextLevel={masteryCelebration.nextLevel}
      onContinue={() => { setMasteryCelebration(null); setView("dashboard"); }}
    />;
  }

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
    const info = activeLevelMap[q.level] || LEVEL_MAP[q.level];
    return (
      <div style={{minHeight:"100svh",background:"linear-gradient(145deg,#F5F0FF,#EFF6FF)",padding:"16px",display:"flex",flexDirection:"column",alignItems:"center",width:"100%",boxSizing:"border-box"}}>
        <div style={{width:"100%",maxWidth:560,display:"flex",flexDirection:"column",gap:12}}>
          {/* Header */}
          <div style={{...s.card(14)}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:32,height:32,borderRadius:"var(--r-full)",background:info.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:800}}>{q.level}</div>
                <div>
                  <p style={{fontWeight:700,fontSize:13,color:"var(--ink)"}}>Day {progress.dayNumber} · {q.theme}</p>
                  <p style={{fontSize:12,color:"var(--ink-ll)"}}>Question {curQ+1} of {worksheetQ.length}</p>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                {isRetryDay && <span style={{fontSize:11,background:"var(--amber-ll)",color:"var(--amber)",borderRadius:"var(--r-full)",padding:"3px 8px",fontWeight:600}}>📌 Retry</span>}
                <button onClick={()=>setWb(true)} style={{width:34,height:34,background:"var(--purple-ll)",border:"none",borderRadius:"var(--r-sm)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"var(--purple)"}}>
                  <PenTool size={15}/>
                </button>
              </div>
            </div>
            <div style={{height:6,background:"var(--cream-dd)",borderRadius:"var(--r-full)",overflow:"hidden"}}>
              <div style={{height:"100%",width:`${pct}%`,background:"var(--grad-learn)",borderRadius:"var(--r-full)",transition:"width .3s"}}/>
            </div>
          </div>
          {/* Question card */}
          <div style={{...s.card(22), opacity: pendingWrong ? 0.7 : 1, transition:"opacity .2s"}}>
            <p style={{fontSize:11,color:"var(--ink-ll)",fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6}}>{q.difficulty}</p>
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:20,fontWeight:700,color:"var(--ink)",marginBottom:20,lineHeight:1.4}}>{q.question}</h2>
            {pendingWrong ? (
              // Showing AI explanation — display answer choices disabled
              <div style={{display:"flex",flexDirection:"column",gap:8,pointerEvents:"none",opacity:0.5}}>
                {q.type==="multiple" ? q.options.map((opt,i) => (
                  <div key={i} style={{
                    padding:"14px 18px",borderRadius:"var(--r-md)",fontSize:15,fontWeight:500,
                    background: opt===pendingWrong.wrongAnswer ? "rgba(232,96,76,0.12)" : "var(--cream)",
                    border: `2px solid ${opt===pendingWrong.wrongAnswer ? "var(--coral)" : "var(--cream-dd)"}`,
                    color:"var(--ink)",
                  }}>{opt}</div>
                )) : (
                  <div style={{...s.input(),fontSize:18,fontFamily:"'Fraunces',serif",fontWeight:600,padding:"14px 16px",color:"var(--coral)"}}>{pendingWrong.wrongAnswer}</div>
                )}
              </div>
            ) : q.type==="multiple" ? (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {q.options.map((opt,i)=>(
                  <button key={i} onClick={()=>submitAnswer(opt)} style={{
                    padding:"14px 18px",borderRadius:"var(--r-md)",textAlign:"left",fontSize:15,fontWeight:500,
                    background:"var(--cream)",border:"2px solid var(--cream-dd)",cursor:"pointer",
                    fontFamily:"'Instrument Sans'",color:"var(--ink)",transition:"all .15s",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--purple)";e.currentTarget.style.background="var(--purple-ll)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--cream-dd)";e.currentTarget.style.background="var(--cream)";}}>
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <input type="text" value={inputVal} onChange={e=>setInputVal(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter"&&inputVal.trim())submitAnswer(inputVal.trim());}}
                  placeholder="Your answer…" autoFocus
                  style={{...s.input(),fontSize:18,fontFamily:"'Fraunces',serif",fontWeight:600}}
                  onFocus={e=>e.target.style.borderColor="var(--purple)"}
                  onBlur={e=>e.target.style.borderColor="rgba(224,217,207,0.9)"}/>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>setShowHint(!showHint)} style={{padding:"10px 14px",background:"var(--amber-ll)",color:"var(--amber)",border:"1px solid var(--amber-l)",borderRadius:"var(--r-md)",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
                    💡 {showHint?"Hide Hint":"Show Hint"}
                  </button>
                  <button onClick={()=>{if(inputVal.trim())submitAnswer(inputVal.trim());}} disabled={!inputVal.trim()} style={{...s.btn("learn",true,!inputVal.trim()),flex:1}}>
                    Submit →
                  </button>
                </div>
                {showHint&&<div style={{background:"var(--amber-ll)",border:"1px solid var(--amber-l)",borderRadius:"var(--r-md)",padding:"10px 14px",fontSize:13,color:"var(--amber)"}}>💡 {q.hint}</div>}
              </div>
            )}
          </div>

          {/* AI Explanation Panel — shown after wrong answer */}
          {pendingWrong && aiExplain !== undefined && (
            <AIExplanationPanel
              question={pendingWrong.question}
              wrongAnswer={pendingWrong.wrongAnswer}
              attempts={wrongAttempts[pendingWrong.question.id] || 1}
              aiText={aiExplain?.text}
              loading={aiExplain?.loading ?? true}
              onTryAgain={() => {
                setPendingWrong(null);
                setAiExplain(null);
                setInputVal("");
              }}
              onSkip={skipQuestion}
            />
          )}
        </div>
        <Whiteboard open={wb} onClose={()=>setWb(false)}/>
      </div>
    );
  }

  // ── DASHBOARD ──────────────────────────────────────────
  const level = progress.currentLevel;
  const info = activeLevelMap[level] || LEVEL_MAP[level];
  const day = progress.dayNumber;
  const daysDone = Object.keys(progress.completedDays).filter(k=>k.startsWith(level+"-")).length;
  const totalCorrect = Object.values(progress.completedDays).reduce((s,v)=>s+v.correct,0);
  const totalQ = Object.values(progress.completedDays).reduce((s,v)=>s+v.total,0);
  const levelPct = Math.round(daysDone / DAYS_PER_LEVEL * 100);
  const overallAcc = totalQ > 0 ? Math.round(totalCorrect/totalQ*100) : 0;
  const todayDone = progress.completedDays[`${level}-${day}`];
  const readyForAssessment = daysDone >= DAYS_PER_LEVEL;

  return (
    <div style={{minHeight:"100svh",background:"linear-gradient(145deg,#F5F0FF,#EFF6FF)",padding:"16px",display:"flex",flexDirection:"column",alignItems:"center",width:"100%",boxSizing:"border-box"}}>
      <div style={{width:"100%",maxWidth:520,display:"flex",flexDirection:"column",gap:14}}>

        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:12,minWidth:0}}>
            <div style={{width:46,height:46,borderRadius:"var(--r-full)",background:"var(--grad-learn)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"var(--shadow-learn)"}}>
              <Brain size={22} color="#fff"/>
            </div>
            <div style={{minWidth:0}}>
              <p style={{fontWeight:800,fontSize:16,color:"var(--ink)",fontFamily:"'Instrument Sans'"}}>Hi, {studentName}! 👋</p>
              <p style={{fontSize:12,color:"var(--ink-ll)"}}>{info.grade}</p>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {/* Streak badge */}
            {streak > 0 && (
              <div style={{
                display:"flex",alignItems:"center",gap:5,
                background:"linear-gradient(135deg,#FF6B35,#FF8C00)",
                borderRadius:"var(--r-full)",padding:"6px 12px",
                boxShadow:"0 4px 16px rgba(255,107,53,0.35)",
                animation:"streakPop .5s ease",
              }}>
                <Flame size={16} color="#fff"/>
                <span style={{fontWeight:800,fontSize:15,color:"#fff",fontFamily:"'Fraunces',serif"}}>{streak}</span>
              </div>
            )}
            <button onClick={onBackToHome} style={{width:38,height:38,borderRadius:"var(--r-md)",background:"rgba(255,255,255,0.85)",border:"1px solid rgba(0,0,0,0.07)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"var(--ink-l)",flexShrink:0,boxShadow:"var(--shadow-xs)"}}>
              <Home size={18}/>
            </button>
          </div>
        </div>

        {/* Subject selector */}
        <div style={{display:"flex",background:"rgba(255,255,255,0.7)",borderRadius:"var(--r-full)",padding:4,gap:4,boxShadow:"var(--shadow-xs)"}}>
          {[{id:"math",label:"Math",icon:"➗"},{id:"ela",label:"Reading",icon:"📚"}].map(sub=>(
            <button key={sub.id} onClick={()=>handleSubjectChange(sub.id)} style={{
              flex:1,borderRadius:"var(--r-full)",padding:"9px 16px",border:"none",cursor:"pointer",
              fontSize:14,fontWeight:700,transition:"all .2s",display:"flex",alignItems:"center",justifyContent:"center",gap:6,
              ...(subject===sub.id
                ? {background:"#fff",boxShadow:"0 2px 10px rgba(0,0,0,0.12)",color:"var(--forest)"}
                : {background:"transparent",color:"var(--ink-l)"}),
            }}>{sub.icon} {sub.label}</button>
          ))}
        </div>

        {/* Level card */}
        <div style={{background:`linear-gradient(145deg,${info.color},${info.color}cc)`,borderRadius:"var(--r-xl)",padding:"20px 20px 16px",color:"#fff",boxShadow:"0 8px 32px rgba(0,0,0,0.18)"}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
            <div>
              <p style={{fontSize:12,opacity:0.7,fontWeight:500,marginBottom:4}}>Current Level</p>
              <h2 style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:800,lineHeight:1,marginBottom:4}}>Level {level}</h2>
              <p style={{fontSize:13,opacity:0.85}}>{info.grade} · Ages {info.ageRange}</p>
            </div>
            <div style={{textAlign:"right"}}>
              <p style={{fontSize:11,opacity:0.65,marginBottom:2}}>Day</p>
              <p style={{fontFamily:"'Fraunces',serif",fontSize:40,fontWeight:800,lineHeight:1}}>{day}</p>
              <p style={{fontSize:11,opacity:0.65}}>of {DAYS_PER_LEVEL}</p>
            </div>
          </div>
          <div style={{height:8,background:"rgba(255,255,255,0.25)",borderRadius:"var(--r-full)",overflow:"hidden",marginBottom:6}}>
            <div style={{height:"100%",width:`${levelPct}%`,background:"rgba(255,255,255,0.9)",borderRadius:"var(--r-full)",transition:"width .8s cubic-bezier(.22,1,.36,1)"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,opacity:0.7}}>
            <span>{daysDone} days completed</span><span>{levelPct}% of level done</span>
          </div>
        </div>

        {/* Stats row */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          {[
            {label:"Accuracy",value:`${overallAcc}%`,bg:"var(--purple-ll)",color:"var(--purple)"},
            {label:"Days Done",value:String(daysDone),bg:"var(--blue-ll)",color:"var(--blue)"},
            {label:"Questions",value:totalQ>999?`${(totalQ/1000).toFixed(1)}k`:String(totalQ),bg:"var(--green-ll)",color:"var(--green)"},
          ].map(st=>(
            <div key={st.label} style={{background:st.bg,borderRadius:"var(--r-lg)",padding:"14px 8px",textAlign:"center",boxShadow:"var(--shadow-xs)"}}>
              <p style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:800,color:st.color,lineHeight:1}}>{st.value}</p>
              <p style={{fontSize:11,color:"var(--ink-ll)",marginTop:5,fontWeight:500}}>{st.label}</p>
            </div>
          ))}
        </div>

        {/* Mastery Gate — 80% threshold progress bar */}
        {totalQ > 0 && (
          <div style={{...s.card(16)}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <Target size={15} color={overallAcc>=80?"var(--green)":"var(--amber)"}/>
                <span style={{fontWeight:700,fontSize:13,color:"var(--ink-m)"}}>Level Mastery Gate</span>
              </div>
              <span style={{
                fontSize:12,fontWeight:700,
                color:overallAcc>=80?"var(--green)":"var(--amber)",
                background:overallAcc>=80?"var(--green-ll)":"var(--amber-ll)",
                borderRadius:"var(--r-full)",padding:"3px 10px",
              }}>{overallAcc>=80?"✓ On Track":"Need 80%"}</span>
            </div>
            <div style={{position:"relative",height:10,background:"var(--cream-dd)",borderRadius:"var(--r-full)",overflow:"visible",marginBottom:8}}>
              <div style={{
                height:"100%",
                width:`${Math.min(100,overallAcc)}%`,
                background:overallAcc>=80?"var(--grad-success)":"linear-gradient(90deg,#F59E0B,#D97706)",
                borderRadius:"var(--r-full)",
                transition:"width .8s cubic-bezier(.22,1,.36,1)",
              }}/>
              {/* 80% marker */}
              <div style={{
                position:"absolute",top:-4,left:"80%",
                width:3,height:18,background:"var(--forest)",borderRadius:2,
              }}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--ink-ll)"}}>
              <span>Your accuracy: <strong style={{color:overallAcc>=80?"var(--green)":"var(--amber)"}}>{overallAcc}%</strong></span>
              <span>🎯 Goal: 80% to advance</span>
            </div>
            {overallAcc < 80 && totalQ >= 50 && (
              <div style={{marginTop:8,padding:"8px 12px",background:"rgba(217,119,6,0.08)",borderRadius:"var(--r-md)",fontSize:12,color:"var(--amber)"}}>
                Keep going! You need {80-overallAcc}% more accuracy to unlock Level {LEVEL_ORDER[LEVEL_ORDER.indexOf(level)+1]||"next"}.
              </div>
            )}
          </div>
        )}

        {/* Retry notice */}
        {(()=>{
          const prevKey=`${level}-${day-1}`;
          const retryIds=progress.pendingRetry[prevKey]||[];
          return retryIds.length>0&&!todayDone?(
            <div style={{background:"var(--amber-ll)",border:"1px solid var(--amber-l)",borderRadius:"var(--r-lg)",padding:"12px 16px",display:"flex",alignItems:"flex-start",gap:10}}>
              <RefreshCw size={16} color="var(--amber)" style={{flexShrink:0,marginTop:2}}/>
              <div>
                <p style={{fontWeight:700,color:"var(--amber)",fontSize:13,marginBottom:2}}>📌 {retryIds.length} questions from yesterday included</p>
                <p style={{fontSize:12,color:"var(--amber)",opacity:0.8}}>Let's master these missed questions today!</p>
              </div>
            </div>
          ):null;
        })()}

        {/* Action */}
        {readyForAssessment ? (
          <div style={{...s.card(20),textAlign:"center"}}>
            <Trophy size={40} color="var(--gold)" style={{margin:"0 auto 10px"}}/>
            <h3 style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:18,color:"var(--forest)",marginBottom:6}}>Level {level} Complete!</h3>
            <p style={{color:"var(--ink-l)",fontSize:13,marginBottom:16}}>You've finished all 60 days. Take the assessment to advance.</p>
            <button onClick={()=>setView("assessment")} style={{...s.btn("gold",true,false,"lg"),gap:8}}>
              <Award size={18}/> Take Level {level} Assessment
            </button>
          </div>
        ) : todayDone ? (
          <div style={{background:"var(--green-ll)",border:"1px solid rgba(22,163,74,0.2)",borderRadius:"var(--r-lg)",padding:"20px",textAlign:"center"}}>
            <CheckCircle size={36} color="var(--green)" style={{margin:"0 auto 10px"}}/>
            <h3 style={{fontWeight:700,color:"var(--green)",fontSize:15,marginBottom:4}}>Today's worksheet done! ✅</h3>
            <p style={{fontSize:13,color:"var(--green)",opacity:0.8,marginBottom:4}}>Score: {Math.round(todayDone.correct/todayDone.total*100)}% · {todayDone.correct}/{todayDone.total} correct</p>
            <p style={{fontSize:12,color:"var(--ink-ll)"}}>Come back tomorrow for Day {day+1}!</p>
          </div>
        ) : (
          <button onClick={startDay} style={{...s.btn("learn",true,false,"lg"),gap:10,fontSize:17}}>
            <Play size={20}/> Start Day {day} · 50 Questions
          </button>
        )}

        {/* Recent days */}
        {daysDone>0&&(
          <div style={{...s.card(18)}}>
            <h3 style={{fontWeight:700,color:"var(--ink-m)",fontSize:14,display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
              <Calendar size={15} color="var(--ink-l)"/> Recent Days
            </h3>
            <div style={{display:"flex",flexDirection:"column",gap:0}}>
              {Array.from({length:Math.min(7,daysDone)},(_,i)=>{
                const d2=daysDone-i;
                const dk=`${level}-${d2}`;
                const data=progress.completedDays[dk];
                if(!data)return null;
                const acc=Math.round(data.correct/data.total*100);
                const accColor=acc>=80?"var(--green)":acc>=60?"var(--amber)":"#DC2626";
                return(
                  <div key={dk} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<Math.min(6,daysDone-1)?"1px solid var(--cream-d)":"none"}}>
                    <div style={{width:30,height:30,background:"var(--cream)",borderRadius:"var(--r-sm)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"var(--ink-l)",flexShrink:0}}>{d2}</div>
                    <div style={{flex:1,height:6,background:"var(--cream-dd)",borderRadius:"var(--r-full)",overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${acc}%`,background:accColor,borderRadius:"var(--r-full)",transition:"width .5s"}}/>
                    </div>
                    <span style={{fontSize:13,fontWeight:700,color:accColor,width:36,textAlign:"right"}}>{acc}%</span>
                    {data.wrongIds?.length>0&&<span style={{fontSize:11,color:"var(--amber)",background:"var(--amber-ll)",borderRadius:"var(--r-full)",padding:"2px 7px",whiteSpace:"nowrap"}}>{data.wrongIds.length} retry</span>}
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
  const { user: authUser, logout: authLogout } = useAuth();

  // Scope localStorage to the authenticated user so different accounts
  // on the same browser never share each other's children.
  _setAppKey(authUser?.id);

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
      "", "", formData.pin,
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
    const prog = LS.get(`skillora-progress-${child.id}`, null);
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
      LS.set(`skillora-progress-${activeChild.id}`, {
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

  // ── 6. Switch user (returns to profile selector, stays logged into account)
  const handleLogout = () => {
    setScreen("login");
    setActiveChild(null);
    setCelebData(null);
  };

  // ── 6b. Full sign out (logs out of account entirely)
  const handleFullLogout = async () => {
    setScreen("login");
    setActiveChild(null);
    setCelebData(null);
    try { await authLogout(); } catch {}
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
      {screen === "onboarding"       && <OnboardingFlow onComplete={handleOnboardingDone} plan={authUser?.planType ?? null}/>}
      {screen === "login"            && <LoginScreen onParentLogin={handleParentLogin} onChildEnter={handleChildEnter}/>}
      {screen === "parent_dash"      && <ParentDashboard onLogout={handleLogout} onFullLogout={handleFullLogout}/>}
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
