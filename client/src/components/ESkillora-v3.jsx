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
function getAgeFloor(age) {
  const a = parseInt(age);
  if (a <= 6) return "A";
  if (a <= 8) return "B";
  if (a <= 10) return "C";
  if (a <= 12) return "D";
  return "E";
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
      <p style={{ color:"var(--ink-l)", fontSize:15, marginBottom:28 }}>Try free for <strong>7 days</strong> · From $10.99/mo · Cancel anytime</p>

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
                        onClick={()=>{ const k=[...kids]; k[idx]={...k[idx],avatar:av.e,avatarBg:av.bg}; setKids(k); }}
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
        {tab==="overview" && <OverviewTab app={app} refresh={refresh}/>}
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

function OverviewTab({ app, refresh }) {
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

              {/* Age-adjusted level note */}
              {child.levelNote && (
                <div style={{padding:"0 20px 14px"}}>
                  <div style={{background:"rgba(139,175,148,0.15)",border:"1px solid var(--sage-l)",borderRadius:"var(--r-md)",padding:"10px 12px",display:"flex",alignItems:"flex-start",gap:8}}>
                    <span style={{fontSize:14,flexShrink:0}}>📊</span>
                    <p style={{fontSize:12,color:"var(--forest)",lineHeight:1.5,flex:1,margin:0}}>{child.levelNote}</p>
                    <button onClick={()=>{
                      const appData = getApp();
                      if (appData) {
                        appData.children = appData.children.map(c => c.id===child.id ? {...c, levelNote:null} : c);
                        setApp(appData);
                        refresh();
                      }
                    }} style={{background:"none",border:"none",cursor:"pointer",color:"var(--ink-ll)",fontSize:16,lineHeight:1,padding:0,flexShrink:0}}>✕</button>
                  </div>
                </div>
              )}

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
          <button style={{...s.btn("primary","","","sm"),gap:5}} onClick={()=>{}}>
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
    const ageFloor = getAgeFloor(child.age);
    const levelOrder = ["A","B","C","D","E","F","G","H","I","J","K","L"];
    const finalLevel = levelOrder.indexOf(ageFloor) > levelOrder.indexOf(placedLevel) ? ageFloor : placedLevel;
    const ageAdjusted = finalLevel !== placedLevel;
    const lInfo = typeof LEVEL_MAP!=="undefined" ? LEVEL_MAP[finalLevel] : { grade:"" };
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
              <p style={{ fontFamily:"'Fraunces',serif", fontSize:48, fontWeight:800, color:"var(--forest)" }}>Level {finalLevel}</p>
              <p style={{ fontSize:15, color:"var(--forest)", fontWeight:600 }}>{lInfo?.grade||""}</p>
            </div>
            <div style={{ background:"var(--blue-ll)", borderRadius:"var(--r-md)", padding:"10px 16px", marginBottom:24, fontSize:13, color:"var(--blue)", lineHeight:1.5 }}>
              📊 You answered {totalCorrect} of {TOTAL_Q} questions correctly ({pct}%).
              {pct >= 80 ? " Excellent performance!" : pct >= 60 ? " Good effort!" : " We'll help you build from here!"}
            </div>
            <Btn onClick={()=>onComplete(finalLevel, ageAdjusted)} full size="lg" v="gold">
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
    // Varied punctuation examples
    [
      ["Where is the cat","?"],["The cat is sleeping","."],["I love ice cream","!"],
      ["Can you help me","?"],["She ran to the store","."],["Watch out","!"],
      ["Did you see that","?"],["My name is Alex","."]
    ].forEach(([ex,mark])=>{
      add(`What punctuation ends this? "${ex}___"`,"multiple",["?",".","!",","],mark,`Is it a question, statement, or exclamation?`,`"${ex}${mark}" — ${mark==="?"?"questions end with ?":mark==="!"?"exclamations end with !":"statements end with ."}`);
    });
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
    add("What is the MIDDLE of a story?","multiple",["Where the main events happen","The opening","The ending","The title"],"Where the main events happen","The middle has the main events.","The middle contains the main action.");
    // Varied story sequence examples
    const sequences=[
      {steps:["She woke up","She ate breakfast","She went to school"],first:"She woke up"},
      {steps:["We planted a seed","The seed grew","A flower bloomed"],first:"We planted a seed"},
      {steps:["His friends arrived","He blew out candles","He opened presents"],first:"His friends arrived"},
      {steps:["She got dressed","She put on shoes","She left the house"],first:"She got dressed"},
      {steps:["He lit the stove","The water boiled","He poured the soup"],first:"He lit the stove"},
      {steps:["They ordered pizza","They ate the pizza","They paid the bill"],first:"They ordered pizza"},
      {steps:["He opened the envelope","He read the letter","He got excited"],first:"He opened the envelope"},
      {steps:["The baby cried","Mom picked her up","The baby smiled"],first:"The baby cried"},
      {steps:["She found her keys","She got in the car","She drove away"],first:"She found her keys"},
      {steps:["The sun set","It got dark","Stars appeared"],first:"The sun set"},
      {steps:["He hit the ball","He ran to first base","He cheered"],first:"He hit the ball"},
      {steps:["She got sick","She blew her nose","She went to the doctor"],first:"She got sick"},
    ];
    sequences.forEach(({steps,first})=>{
      const [s1,s2,s3]=steps;
      add(`Put in order: "${s1}. ${s2}. ${s3}." What happened FIRST?`,"multiple",shuffle(steps),first,"Think about the logical order of events.","Events happen in a natural sequence.");
    });
    add("Words like 'first,' 'then,' and 'finally' tell you about _____.","multiple",["the order of events","characters","the setting","the title"],"the order of events","Sequence words show order.","Sequence words help you understand the order of events.");
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
    const rcPassages=[
      {text:"Tom has a red ball. He likes to play with it in the park.",q:"What color is Tom's ball?",a:"Red",opts:["Red","Blue","Green","Yellow"]},
      {text:"The cat sat on a mat. It was a sunny day.",q:"Where did the cat sit?",a:"On a mat",opts:["On a mat","On a bed","On a chair","On the floor"]},
      {text:"Sara loves to read books. Her favorite book is about a dog named Max.",q:"What is Sara's favorite book about?",a:"A dog named Max",opts:["A dog named Max","A cat","A bird","A fish"]},
      {text:"Ben went to the store. He bought milk and bread.",q:"What did Ben buy?",a:"Milk and bread",opts:["Milk and bread","Eggs","Juice","Cookies"]},
      {text:"It was raining outside. Lily took her umbrella.",q:"Why did Lily take her umbrella?",a:"It was raining",opts:["It was raining","It was sunny","It was snowing","It was windy"]},
      {text:"The bird sang in the tree. It had bright red feathers.",q:"What color were the bird's feathers?",a:"Red",opts:["Red","Blue","Green","Yellow"]},
      {text:"Jake loves to draw. He draws pictures of animals every day.",q:"What does Jake love to do?",a:"Draw",opts:["Draw","Swim","Run","Cook"]},
      {text:"The dog barked at the mail carrier. The mail carrier waved and walked away.",q:"What did the dog do?",a:"Barked",opts:["Barked","Ran away","Sat","Slept"]},
    ];
    rcPassages.forEach(p=>{
      add(`Read: "${p.text}" — ${p.q}`,"multiple",shuffle(p.opts),p.a,"Read the passage carefully.","The answer is found in the text.");
      add(`Read: "${p.text}" — ${p.q} (type your answer)`,"input",null,p.a,"Look for the answer in the passage.","Re-read the passage to find it.");
    });
    add(`In "The happy puppy ran fast," what word describes the puppy?`,"multiple",shuffle(["happy","ran","fast","the"]),"happy","Describing words tell us about the noun.","'Happy' describes the puppy.");
    add(`In "The tiny kitten meowed softly," what describes the kitten?`,"multiple",shuffle(["tiny","meowed","softly","the"]),"tiny","What word tells us about the kitten?","'Tiny' is the adjective describing the kitten.");
    add(`In "The tall tree swayed gently," what word describes the tree?`,"multiple",shuffle(["tall","tree","swayed","gently"]),"tall","Adjectives describe nouns.","'Tall' describes the tree.");
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
    add("The first word of a sentence should be _____.","multiple",["capitalized","lowercase","bold","underlined"],"capitalized","Every sentence starts with...","The first word is always capitalized.");
    add("The pronoun 'I' is always written as _____.","multiple",["a capital letter","lowercase","bold","small"],"a capital letter","The word 'I' is always capitalized.","'I' is always capitalized when used as a pronoun.");
    add("Names of specific people, places, and things are called _____.","multiple",["proper nouns","common nouns","adjectives","verbs"],"proper nouns","Proper nouns get capital letters.","Proper nouns always start with a capital letter.");
    [
      ["pacific ocean","Oceans and bodies of water","Pacific Ocean"],
      ["dr. jones","Titles with names","Dr. Jones"],
      ["thanksgiving","Names of holidays","Thanksgiving"],
    ].forEach(([n,rule,c])=>{
      add(`Should "${n}" be capitalized?`,"multiple",["Yes","No"],"Yes",`${rule} are proper nouns.`,`"${c}" — ${rule} are always capitalized.`);
    });
  }
  if (theme==="Punctuation Basics") {
    add("A telling sentence ends with a _____.","multiple",shuffle(["period","question mark","exclamation point","comma"]),"period","Telling sentences end with .","A period ends a statement.");
    add("An asking sentence ends with a _____.","multiple",shuffle(["question mark","period","exclamation point","comma"]),"question mark","Asking sentences end with ?","A question mark ends a question.");
    add("A sentence showing excitement ends with _____.","multiple",shuffle(["exclamation point","period","question mark","comma"]),"exclamation point","Exciting! Amazing! Wow!","An exclamation point shows strong feeling.");
    add(`What punctuation goes here? "Where are you going___"`,"multiple",["?",".",",","!"],"?","Is it asking something?","Questions need a question mark.");
    add(`What punctuation goes here? "I love ice cream___"`,"multiple",["!","?",".",","],"!","It shows excitement.","An exclamation point shows excitement.");
    add(`What punctuation goes here? "The cat is sleeping___"`,"multiple",[".",",","?","!"],".","It's a simple statement.","Statements end with periods.");
    add(`What punctuation goes here? "Are you coming to the party___"`,"multiple",["?",".",",","!"],"?","Is it asking a question?","Questions end with question marks.");
    add(`What punctuation goes here? "Stop right there___"`,"multiple",["!","?",".",","],"!","It's a command or exclamation.","Exclamations and strong commands use exclamation points.");
    add(`What punctuation goes here? "My dog's name is Spot___"`,"multiple",[".",",","?","!"],".","It's a statement.","Simple statements end with periods.");
    add("A comma is used to _____.","multiple",shuffle(["separate items in a list","end a sentence","ask a question","show excitement"]),"separate items in a list","Commas separate things.","Commas separate items in a list.");
    add(`In "I have a cat, a dog, and a fish," commas separate _____.`,"multiple",["items in a list","sentences","paragraphs","nothing"],"items in a list","List items are separated by commas.","Commas separate the items in the list.");
    add("How many end marks are there? (. ? !)","multiple",["3","2","4","1"],"3","Count them: period, question mark, exclamation point.","There are 3 end punctuation marks.");
    add("Which sentence needs a question mark?","multiple",["What is your name","My name is Sam","I like cats","She runs fast"],"What is your name","Questions ask something.","'What is your name?' is asking a question.");
    add("Which sentence needs a period?","multiple",["The sky is blue","What time is it","Watch out","Did you eat"],"The sky is blue","Statements end with periods.","'The sky is blue.' is a statement.");
    add("Which sentence needs an exclamation point?","multiple",["I won the prize","Where is the store","The dog is small","She walks slowly"],"I won the prize","Exclamation points show strong emotion.","'I won the prize!' shows excitement.");
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
    const miPassages=[
      {text:"Dogs make great pets. They are loyal and fun. Dogs love to play fetch and go for walks.",q:"What is the main idea?",a:"Dogs make great pets",opts:["Dogs make great pets","Cats are better","Birds can fly","Fish swim"]},
      {text:"Apples are a healthy snack. They have vitamins and taste sweet. You can eat them raw or in a pie.",q:"What is the main idea?",a:"Apples are a healthy snack",opts:["Apples are a healthy snack","Pie is tasty","Vitamins are important","Oranges are better"]},
      {text:"Exercise is important for everyone. It keeps your body strong and your mind sharp. You should try to exercise every day.",q:"What is the main idea?",a:"Exercise is important",opts:["Exercise is important","Sleep is good","Food gives energy","Water is wet"]},
      {text:"Rain comes from clouds. Water evaporates, forms clouds, and falls as rain. This is called the water cycle.",q:"What is the main idea?",a:"Rain comes from clouds in the water cycle",opts:["Rain comes from clouds in the water cycle","Clouds are white","The sun is bright","Oceans are big"]},
      {text:"Libraries are wonderful places. You can borrow books for free. Libraries also have computers and helpful staff.",q:"What is the main idea?",a:"Libraries are wonderful places",opts:["Libraries are wonderful places","Books cost money","Computers are useful","Staff work hard"]},
      {text:"Bees are very important insects. They pollinate flowers and make honey. Without bees, many plants could not grow.",q:"What is the main idea?",a:"Bees are very important insects",opts:["Bees are very important insects","Honey is sweet","Flowers are pretty","Gardens are large"]},
    ];
    miPassages.forEach(p=>{
      add(`Read: "${p.text}" — ${p.q}`,"multiple",shuffle(p.opts),p.a,"The main idea is what the whole passage is about.","The main idea is the most important point.");
      add(`Read: "${p.text}" — What is the passage mainly about?`,"input",null,p.a,"What is the big idea?","The main idea is the central topic.");
    });
    add("The main idea of a paragraph is _____.","multiple",shuffle(["what the whole paragraph is about","a small detail","the first word","the last sentence"]),"what the whole paragraph is about","The main idea is the big picture.","The main idea tells what the paragraph is mostly about.");
    add("Supporting details are _____ that explain the main idea.","multiple",["facts or examples","the main point","the title","the author"],"facts or examples","Details give more information.","Supporting details explain or prove the main idea.");
    add("The main idea is usually found in the _____ of a paragraph.","multiple",["topic sentence","last word","middle sentence","title"],"topic sentence","The topic sentence states the main idea.","The topic sentence often contains the main idea.");
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
    add("The CHARACTERS in a story are _____.","multiple",shuffle(["the people or animals in the story","where the story takes place","what happens","the author"]),"the people or animals in the story","Characters are who the story is about.","Characters are the people/animals in a story.");
    add("The SETTING of a story is _____.","multiple",shuffle(["where and when the story takes place","who is in the story","the problem","the ending"]),"where and when the story takes place","Setting = where + when.","The setting is the time and place.");
    add("The PLOT of a story is _____.","multiple",shuffle(["what happens in the story","who is in it","where it takes place","the title"]),"what happens in the story","Plot = events.","The plot is the sequence of events.");
    add("The CONFLICT in a story is _____.","multiple",shuffle(["the main problem","the setting","the main character","the happy ending"]),"the main problem","Conflict = the problem.","The conflict is the central problem or challenge.");
    add("The RESOLUTION of a story is _____.","multiple",shuffle(["how the problem is solved","the setting","the characters","the beginning"]),"how the problem is solved","Resolution = how it ends.","The resolution solves the conflict.");
    add("The THEME of a story is _____.","multiple",shuffle(["the big lesson or message","the main character's name","where it happens","the title"]),"the big lesson or message","Theme = the life lesson.","The theme is the underlying message or lesson.");
    add("In 'Goldilocks and the Three Bears,' the setting is _____.","multiple",["a forest and a bear's house","a school","a city","a beach"],"a forest and a bear's house","Where does the story take place?","The story is set in a forest near a bear's house.");
    add("In 'The Three Little Pigs,' the main conflict is _____.","multiple",["the wolf trying to blow down their houses","finding food","going to school","losing their toys"],"the wolf trying to blow down their houses","What problem do the pigs face?","The conflict is the wolf threatening their homes.");
    add("A protagonist is the _____ character in a story.","multiple",["main","smallest","oldest","funniest"],"main","The protagonist is the hero or main character.","The protagonist is the central character.");
    add("An antagonist is the character who _____.","multiple",["causes conflict","helps everyone","solves problems","is the nicest"],"causes conflict","The antagonist is the villain or obstacle.","The antagonist opposes the protagonist.");
    add("The CLIMAX of a story is _____.","multiple",["the most exciting or tense moment","the beginning","the setting","the character list"],"the most exciting or tense moment","The climax is the turning point.","The climax is the peak of tension in the plot.");
    add("Story elements include characters, setting, plot, conflict, and _____.","multiple",["resolution","commas","math","pictures"],"resolution","Think about the parts of a story.","Resolution is the final key story element.");
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
    const tePassages=[
      {text:"Maria loves painting. She paints every day after school. Her room is full of paintings.",q:"How do you know Maria loves painting?",a:"She paints every day",opts:["She paints every day","She said so","Her mom told her","She has brushes"]},
      {text:"The sky grew dark and the wind blew hard. Trees bent sideways.",q:"What evidence tells you a storm is coming?",a:"The sky grew dark and wind blew hard",opts:["The sky grew dark and wind blew hard","It was sunny","Birds were singing","Flowers bloomed"]},
      {text:"Jake's stomach growled. He stared at the clock as it slowly ticked toward lunch.",q:"What evidence shows Jake is hungry?",a:"His stomach growled",opts:["His stomach growled","He was sleeping","He was running","He was drawing"]},
      {text:"The library was silent. Everyone whispered and walked on tiptoe between the shelves.",q:"What evidence shows the library is a quiet place?",a:"Everyone whispered and walked on tiptoe",opts:["Everyone whispered and walked on tiptoe","People were singing","Children were running","Books were falling"]},
      {text:"Mia checked the weather app three times and packed her sunscreen and towel.",q:"What evidence shows Mia is planning a beach trip?",a:"She packed her sunscreen and towel",opts:["She packed her sunscreen and towel","She brought an umbrella","She wore a coat","She stayed home"]},
      {text:"The dog wagged its tail, jumped up, and ran to the door.",q:"What evidence shows the dog is excited?",a:"It wagged its tail, jumped up, and ran to the door",opts:["It wagged its tail, jumped up, and ran to the door","It hid under the bed","It was sleeping","It growled"]},
    ];
    tePassages.forEach(p=>{
      add(`Read: "${p.text}" — ${p.q}`,"multiple",shuffle(p.opts),p.a,"Find the clues in the text.","Text evidence means proof from the passage.");
      add(`Read: "${p.text}" — Find evidence: ${p.q}`,"input",null,p.a,"Quote from the passage.","Look at what the text says directly.");
    });
    add("Text evidence is _____.","multiple",shuffle(["proof from the passage","your opinion","a guess","what a friend says"]),"proof from the passage","Evidence comes from the text itself.","Text evidence = proof found in the reading.");
    add("When citing text evidence, you should _____.","multiple",["quote or reference the text","make something up","ask a friend","guess"],"quote or reference the text","Use the exact words or paraphrase from the text.","Text evidence comes directly from the reading.");
    add("The phrase 'According to the text...' introduces _____.","multiple",["text evidence","a personal opinion","a new topic","the author's name"],"text evidence","This phrase signals you're quoting the text.","'According to the text' introduces evidence from the passage.");
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
    add("Every paragraph should have a _____ sentence.","multiple",shuffle(["topic","funny","long","short"]),"topic","The first sentence tells what the paragraph is about.","A topic sentence introduces the main idea.");
    add("Supporting details _____.","multiple",shuffle(["give more information about the main idea","change the topic","end the paragraph","start a new paragraph"]),"give more information about the main idea","Details support the topic sentence.","Supporting details explain the main idea.");
    add("A concluding sentence _____.","multiple",shuffle(["wraps up the paragraph","starts a new idea","asks a question","is always short"]),"wraps up the paragraph","The last sentence closes the paragraph.","A concluding sentence summarizes or restates the main idea.");
    add("How many main ideas should a paragraph have?","multiple",["One","Two","Three","As many as you like"],"One","A paragraph focuses on a single idea.","Each paragraph has one main idea.");
    add("The topic sentence is usually _____ the paragraph.","multiple",["at the beginning of","at the end of","in the middle of","missing from"],"at the beginning of","The topic sentence introduces the topic.","Topic sentences typically open the paragraph.");
    add("Transition words like 'first,' 'next,' and 'finally' help paragraphs flow _____.","multiple",["smoothly","loudly","slowly","randomly"],"smoothly","Transitions connect ideas.","Transition words help ideas connect logically.");
    add("Which is a good topic sentence for a paragraph about dogs?","multiple",["Dogs are wonderful pets for many reasons.","The sky is blue.","Math is hard.","I like pizza."],"Dogs are wonderful pets for many reasons.","A topic sentence introduces the main idea.","A good topic sentence states what the paragraph will be about.");
    add("After the topic sentence, you add _____.","multiple",["supporting details","another topic sentence","a title","page numbers"],"supporting details","Supporting details explain the main idea.","Supporting details follow the topic sentence.");
    add("Indenting means _____.","multiple",["starting a new paragraph with extra space","writing in all caps","erasing text","using bold letters"],"starting a new paragraph with extra space","Indented paragraphs have a small space at the start.","Indentation signals the start of a new paragraph.");
    add("A paragraph that jumps between unrelated ideas is _____.","multiple",["unfocused","perfect","creative","ideal"],"unfocused","Good paragraphs stick to one main idea.","Paragraphs should stay focused on one topic.");
    add("Good paragraphs have a clear beginning, middle, and _____.","multiple",["end","title","character","question"],"end","Paragraphs have a structure.","Well-organized paragraphs have a clear beginning, middle, and end.");
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
    const moreInferences=[
      {text:"Sam grabbed his umbrella and raincoat before leaving.",q:"What can you infer about the weather?",a:"It is raining or about to rain",opts:["It is raining or about to rain","It is sunny","It is snowing","It is windy"]},
      {text:"The puppy wagged its tail and jumped on the visitor.",q:"How does the puppy feel?",a:"Happy and excited",opts:["Happy and excited","Scared","Angry","Tired"]},
      {text:"Maria yawned and rubbed her eyes during the movie.",q:"What can you infer about Maria?",a:"She is tired",opts:["She is tired","She is scared","She is hungry","She is angry"]},
      {text:"The cafeteria was noisy with children laughing and talking.",q:"What can you infer?",a:"It is lunchtime at school",opts:["It is lunchtime at school","It is nighttime","Everyone is sleeping","The school is closed"]},
      {text:"Lena smiled widely as she tore open the gift wrap.",q:"How does Lena feel?",a:"Excited and happy",opts:["Excited and happy","Sad","Angry","Scared"]},
      {text:"The streets were empty and all the shops had their lights off.",q:"What can you infer about the time?",a:"It is very late or early in the morning",opts:["It is very late or early in the morning","It is noon","School just let out","It is a busy afternoon"]},
      {text:"Carlos checked his watch again and tapped his foot impatiently.",q:"What can you infer about Carlos?",a:"He is waiting and feels impatient",opts:["He is waiting and feels impatient","He is bored and sleepy","He is happy and dancing","He is working hard"]},
      {text:"The trash can was overflowing and a smell drifted from the kitchen.",q:"What can you infer?",a:"The trash needs to be taken out",opts:["The trash needs to be taken out","Someone cooked a great meal","The kitchen was just cleaned","The dog made a mess"]},
    ];
    moreInferences.forEach(inf=>{
      add(`Read: "${inf.text}" — ${inf.q}`,"multiple",shuffle(inf.opts),inf.a,"Use clues in the text to figure out what's not directly stated.","An inference uses clues to draw a conclusion.");
      add(`Read: "${inf.text}" — ${inf.q}`,"input",null,inf.a,"What do the details suggest?","Infer means to read between the lines.");
    });
    add("An inference is _____.","multiple",shuffle(["a conclusion based on evidence and reasoning","a fact stated in the text","a random guess","the author's name"]),"a conclusion based on evidence and reasoning","Inferences use clues from the text.","An inference is an educated conclusion.");
    add("To make an inference, you use _____ from the text plus what you already know.","multiple",["clues","random words","the title","the page numbers"],"clues","Inferences combine text clues with background knowledge.","Inferences use text clues plus prior knowledge.");
    add("'Reading between the lines' means _____.","multiple",["making an inference","copying the text","skipping sentences","summarizing"],"making an inference","You figure out what isn't directly stated.","Making inferences means understanding implied meaning.");
  }
  if (theme==="Compare & Contrast") {
    add("When you COMPARE two things, you find _____.","multiple",shuffle(["how they are similar","how they are different","what color they are","how old they are"]),"how they are similar","Compare = same.","Comparing finds similarities.");
    add("When you CONTRAST two things, you find _____.","multiple",shuffle(["how they are different","how they are similar","their names","their sizes"]),"how they are different","Contrast = different.","Contrasting finds differences.");
    [
      ["similarly","Comparison"],["however","Contrast"],["likewise","Comparison"],["on the other hand","Contrast"],
      ["in the same way","Comparison"],["although","Contrast"],["both","Comparison"],["yet","Contrast"],
      ["also","Comparison"],["but","Contrast"],["in contrast","Contrast"],["just like","Comparison"],
    ].forEach(([word,type])=>{
      add(`The signal word "${word}" shows _____.`,"multiple",["Comparison","Contrast","Neither","Both"],type,`${type==="Comparison"?"Comparison words show sameness.":"Contrast words show difference."}`,`"${word}" signals ${type.toLowerCase()}.`);
    });
    add("A Venn diagram is used to _____.","multiple",["compare and contrast two things","summarize a story","list opinions","define words"],"compare and contrast two things","Venn diagrams show what's shared and different.","Venn diagrams help organize comparison information.");
    add("The overlapping center of a Venn diagram shows _____.","multiple",["similarities","differences","only one subject","nothing"],"similarities","The middle shows what both have in common.","The center of a Venn diagram shows shared traits.");
    add("Which pair is being COMPARED? 'Both cats and dogs make great pets.'","multiple",["Cats and dogs","Dogs and fish","Cats and birds","Dogs and horses"],"Cats and dogs","Look for 'both' — a comparison signal word.","'Both' shows that cats and dogs are being compared.");
  }
  if (theme==="Point of View") {
    [
      [`"I went to the store."`, "First person", "Look for 'I' or 'we'."],
      [`"You should try this."`, "Second person", "Look for 'you'."],
      [`"She walked to school."`, "Third person", "Look for 'he', 'she', 'they'."],
      [`"We won the championship!"`, "First person", "Look for 'I' or 'we'."],
      [`"He smiled at the crowd."`, "Third person", "Look for 'he', 'she', 'they'."],
      [`"You are going to love this."`, "Second person", "Look for 'you'."],
      [`"I believe everyone deserves kindness."`, "First person", "Look for 'I'."],
      [`"They ran through the park together."`, "Third person", "Look for 'he', 'she', 'they'."],
      [`"You must study for your test."`, "Second person", "Look for 'you'."],
    ].forEach(([ex,pov,hint])=>{
      add(`${ex} — What point of view is this?`,"multiple",shuffle(["First person","Second person","Third person","Fourth person"]),pov,hint,`This uses ${pov.toLowerCase()}.`);
    });
    add("First-person point of view uses _____.","multiple",["I, me, we, us","he, she, they","you, your","it, its"],"I, me, we, us","First person = the narrator speaks as 'I'.","First person uses I, me, we, us.");
    add("Third-person limited means the narrator knows _____.","multiple",["one character's thoughts","everyone's thoughts","no one's thoughts","the author's thoughts"],"one character's thoughts","Limited = only one character's perspective.","Third-person limited follows one character's viewpoint.");
    add("Third-person omniscient means the narrator knows _____.","multiple",["all characters' thoughts","one character's thoughts","no thoughts","only the setting"],"all characters' thoughts","Omniscient = all-knowing.","Omniscient narrators know everything.");
  }
  if (theme==="Grammar Review") {
    add("A NOUN is _____.","multiple",shuffle(["a person, place, or thing","an action word","a describing word","a connecting word"]),"a person, place, or thing","Nouns name things.","Nouns are people, places, or things.");
    add("A VERB is _____.","multiple",shuffle(["an action word","a person","a place","a describing word"]),"an action word","Verbs show action.","Verbs express action or state of being.");
    add("An ADJECTIVE describes _____.","multiple",shuffle(["a noun","a verb","an adverb","a conjunction"]),"a noun","Adjectives modify nouns.","Adjectives describe nouns.");
    add("A PRONOUN replaces _____.","multiple",shuffle(["a noun","a verb","an adjective","a sentence"]),"a noun","He, she, they, it...","Pronouns take the place of nouns.");
    add("A CONJUNCTION connects _____.","multiple",["words or clauses","nouns only","adjectives","punctuation"],"words or clauses","Words like 'and,' 'but,' 'or' are conjunctions.","Conjunctions join words, phrases, or clauses.");
    add("A PREPOSITION shows _____.","multiple",["relationship between words (in, on, at)","action","description","replacement"],"relationship between words (in, on, at)","Words like 'in,' 'on,' 'under' are prepositions.","Prepositions show relationships between words.");
    add("An ADVERB describes _____.","multiple",["a verb, adjective, or other adverb","a noun","a sentence","a paragraph"],"a verb, adjective, or other adverb","Adverbs tell how, when, where.","Adverbs modify verbs, adjectives, or other adverbs.");
    add("In 'The tall girl runs fast,' the adjective is _____.","multiple",["tall","girl","runs","fast"],"tall","Adjectives describe nouns.","'Tall' describes the noun 'girl'.");
    add("In 'She runs quickly,' the adverb is _____.","multiple",["quickly","She","runs","the"],"quickly","Adverbs describe verbs.","'Quickly' tells how she runs — it's an adverb.");
    add("Which is a proper noun?","multiple",["London","city","river","mountain"],"London","Proper nouns name specific places.","London is a specific city — a proper noun.");
    add("Which is a common noun?","multiple",["city","Paris","Mike","Monday"],"city","Common nouns name general things.","'City' is a general noun, not a specific one.");
    add("A SENTENCE must have a subject and a _____.","multiple",["predicate (verb)","comma","conjunction","period"],"predicate (verb)","Every sentence needs a subject and predicate.","A complete sentence has a subject and a predicate.");
  }
  if (theme==="Research Skills") {
    add("A reliable source is _____.","multiple",shuffle(["a trusted place to find information","any website","a friend's opinion","a social media post"]),"a trusted place to find information","Think: can you trust it?","Reliable sources are trustworthy and accurate.");
    add("An encyclopedia is _____.","multiple",shuffle(["a book of facts on many topics","a story book","a dictionary","a comic book"]),"a book of facts on many topics","Encyclopedias have factual information.","Encyclopedias contain factual articles.");
    add("The table of contents is found _____.","multiple",shuffle(["at the beginning of a book","at the end","in the middle","on the cover"]),"at the beginning of a book","It lists chapters and pages.","The table of contents is at the front.");
    add("The index of a book is found _____.","multiple",["at the back","at the front","in the middle","on the cover"],"at the back","The index lists topics alphabetically.","The index is at the back of a book.");
    add("A glossary provides _____.","multiple",["definitions of key terms","chapter summaries","author information","illustrations"],"definitions of key terms","A glossary is like a mini-dictionary.","Glossaries define specialized terms used in the book.");
    add("Which is the most reliable source for a science report?","multiple",["A science textbook","A personal blog","A social media post","An advertisement"],"A science textbook","Textbooks are reviewed by experts.","Science textbooks are peer-reviewed and reliable.");
    add("The purpose of a bibliography is to _____.","multiple",["list your sources","summarize your research","state your thesis","introduce your topic"],"list your sources","Bibliographies give credit to sources.","A bibliography lists all the sources you used.");
    add("Primary sources include _____.","multiple",["diaries, letters, and firsthand accounts","encyclopedia articles","textbooks","magazine summaries"],"diaries, letters, and firsthand accounts","Primary sources are original, firsthand materials.","Primary sources are original documents or firsthand accounts.");
    add("Plagiarism means _____.","multiple",["using someone's work without giving credit","writing your own ideas","citing sources","reading books"],"using someone's work without giving credit","Always give credit for other people's work.","Plagiarism is copying without attribution.");
    add("Skimming a text means _____.","multiple",["reading quickly for the main ideas","reading every word carefully","memorizing the text","copying the text"],"reading quickly for the main ideas","Skimming gives you a quick overview.","Skimming helps you quickly find main points.");
    add("When doing research, you should use _____ sources when possible.","multiple",["multiple","only one","no","fictional"],"multiple","Using multiple sources gives a fuller picture.","Good research draws from multiple reliable sources.");
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
    add("The THEME of a story is _____.","multiple",shuffle(["the lesson or message","the main character","the setting","the title"]),"the lesson or message","Theme = the big lesson.","The theme is the underlying message.");
    add("A MORAL is _____.","multiple",shuffle(["a lesson learned from a story","a character","a setting","a conflict"]),"a lesson learned from a story","Fables often have morals.","A moral is a life lesson from the story.");
    add(`The story of the tortoise and the hare teaches: "Slow and steady wins the race." This is the _____.`,"multiple",shuffle(["moral","setting","character","conflict"]),"moral","It's the lesson of the story.","The moral is the lesson.");
    add(`"The Boy Who Cried Wolf" teaches that if you lie repeatedly, people won't believe you. This is the _____.`,"multiple",["moral","setting","conflict","title"],"moral","Fables have morals.","The moral of this fable is about honesty and trust.");
    add(`Which is a THEME (not just a topic)?`,"multiple",["Friendship can help you overcome challenges.","Friendship","School","The ocean"],"Friendship can help you overcome challenges.","A theme is a complete message, not just a topic.","Themes are full statements, not single words.");
    add(`"The Ugly Duckling" teaches that _____.`,"multiple",["true beauty comes from within","ducks are beautiful","ponds are nice","birds can't swim"],"true beauty comes from within","What lesson does this story teach?","The theme is about inner beauty and belonging.");
    add("Themes are usually _____ in a story — you have to figure them out.","multiple",["implied (not stated directly)","written in the first sentence","in the title","told by a character"],"implied (not stated directly)","Themes are usually shown, not told.","Authors often imply themes rather than stating them directly.");
    add("A theme is different from a plot because a theme is _____.","multiple",["the message, not the events","what happens in the story","a character's name","the setting"],"the message, not the events","Plot = events; theme = meaning.","The theme is what the story means, not just what happens.");
    add("Stories can have _____ than one theme.","multiple",["more","exactly","less","only"],"more","Many stories explore several themes.","Rich stories often have multiple themes.");
    add("To find a theme, ask: What does the main character _____ by the end?","multiple",["learn","eat","buy","forget"],"learn","Character growth often reveals theme.","What the character learns often points to the theme.");
    add("Which of these is a universal theme found in many stories?","multiple",["Good triumphs over evil.","The dog barked loudly.","She wore a red hat.","He ate breakfast."],"Good triumphs over evil.","Universal themes appear across many cultures and stories.","'Good triumphs over evil' is a common theme found worldwide.");
  }
  if (theme==="Author's Purpose") {
    add("The three main purposes for writing are _____.","multiple",shuffle(["to inform, persuade, and entertain","to read, write, and listen","to speak, sing, and dance","to eat, sleep, and play"]),"to inform, persuade, and entertain","PIE: Persuade, Inform, Entertain.","Authors write to persuade, inform, or entertain.");
    add("A newspaper article is written to _____.","multiple",shuffle(["inform","entertain","persuade","confuse"]),"inform","News gives facts.","News articles inform readers.");
    add("A fairy tale is written to _____.","multiple",shuffle(["entertain","inform","persuade","scare"]),"entertain","Stories are for enjoyment.","Fairy tales entertain readers.");
    add("An advertisement is written to _____.","multiple",shuffle(["persuade","inform","entertain","educate"]),"persuade","Ads want you to buy something.","Advertisements persuade people.");
    add("A science textbook is written to _____.","multiple",["inform","entertain","persuade","confuse"],"inform","Textbooks provide facts.","Textbooks are written to teach and inform.");
    add("A letter asking for longer school lunch time is written to _____.","multiple",["persuade","inform","entertain","confuse"],"persuade","You want to change someone's mind.","Persuasive writing tries to change beliefs or actions.");
    add("A recipe card is written to _____.","multiple",["inform (give instructions)","entertain","persuade","confuse"],"inform (give instructions)","Recipes tell you what to do.","Instructional texts are written to inform.");
    add("A poem that expresses feelings is written primarily to _____.","multiple",["entertain and express","persuade","inform","argue"],"entertain and express","Poetry expresses emotion and creates experience.","Most poetry is written to entertain and express feelings.");
    add("The abbreviation PIE stands for _____.","multiple",["Persuade, Inform, Entertain","Print, Identify, Evaluate","Page, Index, Edit","Plan, Investigate, Explain"],"Persuade, Inform, Entertain","PIE is a helpful acronym for author's purpose.","PIE = Persuade, Inform, Entertain.");
    add("A biography is written mainly to _____.","multiple",["inform about a person's life","entertain with fiction","persuade","confuse"],"inform about a person's life","Biographies are factual accounts of real lives.","Biographies inform readers about real people.");
    add("A fable is written primarily to _____.","multiple",["entertain and teach a moral","inform with facts","persuade","describe science"],"entertain and teach a moral","Fables teach lessons through stories.","Fables entertain and convey moral lessons.");
    add("To determine author's purpose, ask: Why did the author _____ this?","multiple",["write","read","copy","delete"],"write","Think about the author's goal.","Always consider why an author chose to write a piece.");
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
    add("A SIMPLE sentence has _____.","multiple",shuffle(["one independent clause","two independent clauses","a dependent clause","no subject"]),"one independent clause","Simple = one complete thought.","A simple sentence has one independent clause.");
    add("A COMPOUND sentence joins two clauses with _____.","multiple",shuffle(["a conjunction (and, but, or)","a period","nothing","a question mark"]),"a conjunction (and, but, or)","FANBOYS: For, And, Nor, But, Or, Yet, So.","Compound sentences use conjunctions.");
    add("Which is a compound sentence?","multiple",shuffle(["I ran and she walked.","The cat sat.","Running fast.","Blue sky."]),"I ran and she walked.","It has two complete thoughts joined by 'and'.","Two independent clauses joined by a conjunction.");
    add("A COMPLEX sentence has one independent clause and one _____ clause.","multiple",["dependent","compound","simple","run-on"],"dependent","Complex = independent + dependent clauses.","A complex sentence combines an independent and dependent clause.");
    add("Which word can start a dependent clause?","multiple",shuffle(["because","and","or","so"]),"because","Subordinating conjunctions start dependent clauses.","'Because' is a subordinating conjunction.");
    add(`"Although it rained, we played outside." — This is a _____ sentence.`,"multiple",["complex","simple","compound","fragment"],"complex","It has an independent and a dependent clause.","'Although it rained' is the dependent clause.");
    add("A sentence fragment is _____.","multiple",["an incomplete sentence","a complete sentence","a compound sentence","a long sentence"],"an incomplete sentence","Fragments are missing a subject or verb.","A fragment lacks a subject, verb, or complete thought.");
    add("A run-on sentence has _____.","multiple",["two clauses joined without correct punctuation","one independent clause","a dependent clause","a question mark"],"two clauses joined without correct punctuation","Run-ons need a period, semicolon, or conjunction.","A run-on incorrectly joins independent clauses.");
    add("FANBOYS stands for conjunctions: For, And, Nor, But, Or, Yet, _____.","multiple",["So","Since","Sometimes","Should"],"So","FANBOYS are coordinating conjunctions.","FANBOYS: For, And, Nor, But, Or, Yet, So.");
    add("Which is a simple sentence?","multiple",["The dog ran.","I ran but she walked.","Because it was raining.","Running!"],"The dog ran.","A simple sentence has one subject and one verb.","'The dog ran.' has one subject and one verb.");
  }
  if (theme==="Opinion Writing") {
    add("An opinion is _____.","multiple",shuffle(["what someone thinks or believes","a proven fact","a question","a command"]),"what someone thinks or believes","Opinions are personal views.","An opinion reflects a personal belief.");
    add("A FACT is _____.","multiple",shuffle(["something that can be proven true","what someone thinks","a guess","a hope"]),"something that can be proven true","Facts can be verified.","Facts are provable statements.");
    add(`"Pizza is the best food." — Fact or opinion?`,"multiple",["Opinion","Fact"],"Opinion","Can it be proven?","It's a personal preference, not provable.");
    add(`"Water boils at 100°C." — Fact or opinion?`,"multiple",["Fact","Opinion"],"Fact","Can it be proven?","This can be scientifically verified.");
    add(`"Summer is the best season." — Fact or opinion?`,"multiple",["Opinion","Fact"],"Opinion","Different people prefer different seasons.","Personal preferences are opinions.");
    add(`"There are 7 days in a week." — Fact or opinion?`,"multiple",["Fact","Opinion"],"Fact","This can be verified.","Measurable, verifiable statements are facts.");
    add(`"Dogs are better pets than cats." — Fact or opinion?`,"multiple",["Opinion","Fact"],"Opinion","People have different preferences.","Preferences are opinions, not facts.");
    add(`"The Earth orbits the Sun." — Fact or opinion?`,"multiple",["Fact","Opinion"],"Fact","This is scientifically proven.","Scientific facts are verifiable by evidence.");
    add("Opinion writing should include _____ to support your view.","multiple",["reasons and evidence","only personal feelings","random examples","made-up stories"],"reasons and evidence","Good opinions are supported by reasons.","Strong opinion writing supports claims with evidence.");
    add("Signal words for opinions include _____.","multiple",["I think, I believe, in my opinion","first, then, finally","for example, such as","however, although"],"I think, I believe, in my opinion","These phrases signal personal opinions.","Opinion signal words show that a statement is a belief.");
    add("A counterargument in opinion writing is _____.","multiple",["the opposing view you address","your main opinion","your conclusion","an unrelated topic"],"the opposing view you address","Addressing the other side makes your argument stronger.","Acknowledging counterarguments strengthens your position.");
    add("To write a strong opinion piece, you should _____.","multiple",["state your opinion, give reasons, and conclude","only state your opinion","copy someone else's ideas","avoid using evidence"],"state your opinion, give reasons, and conclude","Good opinion writing has structure.","A strong opinion piece states a view, supports it, and concludes.");
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
      {q:"Identifying the central idea helps you _____ the text.","opts":["understand and summarize","copy and paste","memorize word for word","ignore"],a:"understand and summarize"},
      {q:"Each paragraph's topic sentence contributes to the _____ of the article.","opts":["central idea","title","author's name","page number"],a:"central idea"},
      {q:"The central idea is broader than any single _____.","opts":["detail","chapter","title","letter"],a:"detail"},
      {q:"When the central idea is implied, you must _____ it.","opts":["infer","copy","ignore","guess randomly"],a:"infer"},
      {q:"A good summary captures the central idea _____ every minor detail.","opts":["without listing","instead of ignoring","by copying","by listing"],a:"without listing"},
      {q:"The central idea in informational text is similar to the _____ in literary text.","opts":["theme","plot","character","setting"],a:"theme"},
      {q:"Central idea questions often ask: 'What is the _____ of the article?'","opts":["main idea / central claim","spelling","page count","author's age"],a:"main idea / central claim"},
      {q:"Details that support the central idea are called _____ details.","opts":["supporting","random","opposing","off-topic"],a:"supporting"},
      {q:"To identify the central idea, look at what most of the _____ discuss.","opts":["paragraphs","illustrations","page numbers","headings only"],a:"paragraphs"},
    ],
    "Argument & Evidence":[
      {q:"A claim is _____.","opts":["a statement the author wants you to believe","a fact everyone agrees on","a question","a summary"],a:"a statement the author wants you to believe"},
      {q:"Evidence supports a _____.","opts":["claim","title","bibliography","heading"],a:"claim"},
      {q:"Which is the strongest evidence?","opts":["A scientific study","A friend's opinion","A rumor","A guess"],a:"A scientific study"},
      {q:"A counterargument is _____.","opts":["the opposing viewpoint","your main claim","a summary","a conclusion"],a:"the opposing viewpoint"},
      {q:"Logical reasoning connects evidence to the _____.","opts":["claim","title","author","setting"],a:"claim"},
      {q:"Anecdotal evidence is _____ than statistical evidence.","opts":["weaker","stronger","the same","unrelated"],a:"weaker"},
      {q:"Addressing a counterargument _____ your argument.","opts":["strengthens","weakens","replaces","ignores"],a:"strengthens"},
      {q:"An argument without evidence is _____.","opts":["weak / unsupported","strong","complete","perfect"],a:"weak / unsupported"},
      {q:"'According to a 2020 NASA study...' is an example of _____ evidence.","opts":["statistical/scientific","anecdotal","emotional","fictional"],a:"statistical/scientific"},
      {q:"The conclusion of an argument should _____ the main claim.","opts":["restate and reinforce","contradict","ignore","question"],a:"restate and reinforce"},
      {q:"A rebuttal is _____.","opts":["a response to a counterargument","the main claim","a type of evidence","the introduction"],a:"a response to a counterargument"},
      {q:"Which is an opinion, not a fact?","opts":["History class is boring.","Water freezes at 0°C.","The Earth is round.","Dogs are mammals."],a:"History class is boring."},
      {q:"Citing a source means _____.","opts":["giving credit to where you found information","making up information","copying without credit","ignoring the source"],a:"giving credit to where you found information"},
      {q:"A warrant in an argument explains _____.","opts":["why the evidence supports the claim","where to find sources","what the topic is","who the author is"],a:"why the evidence supports the claim"},
      {q:"The strongest arguments combine ethos, pathos, and _____.","opts":["logos","mythos","pathos","rhyme"],a:"logos"},
    ],
    "Literary Devices":[
      {q:"Alliteration is _____.","opts":["repeating the same beginning sound","a type of rhyme","a metaphor","a plot twist"],a:"repeating the same beginning sound"},
      {q:`"Peter Piper picked a peck" is an example of _____.`,"opts":["alliteration","metaphor","simile","hyperbole"],a:"alliteration"},
      {q:"Foreshadowing gives _____ about future events.","opts":["hints","facts","opinions","definitions"],a:"hints"},
      {q:"Irony is when the opposite of what is _____ happens.","opts":["expected","written","said","seen"],a:"expected"},
      {q:"An allusion is a reference to _____.","opts":["something well-known","nothing","the future","a footnote"],a:"something well-known"},
      {q:"Imagery appeals to the reader's _____.","opts":["senses","logic","memory","schedule"],a:"senses"},
      {q:"Repetition in literature is used to _____.","opts":["emphasize an idea","confuse readers","add length","remove meaning"],a:"emphasize an idea"},
      {q:"A flashback interrupts the story to show _____ events.","opts":["past","future","current","imaginary"],a:"past"},
      {q:"Symbolism uses one thing to represent _____.","opts":["a deeper idea or meaning","nothing","itself","the author"],a:"a deeper idea or meaning"},
      {q:`"Buzz," "crash," and "sizzle" are examples of _____.`,"opts":["onomatopoeia","alliteration","simile","metaphor"],a:"onomatopoeia"},
      {q:"A motif is _____.","opts":["a recurring element in a literary work","a one-time detail","the main character","the ending"],a:"a recurring element in a literary work"},
      {q:"Dramatic irony occurs when the audience knows something the _____ does not.","opts":["character","author","publisher","editor"],a:"character"},
      {q:"The mood of a story is _____.","opts":["the feeling it creates in the reader","the theme","the plot","the setting"],a:"the feeling it creates in the reader"},
      {q:"Tone is the _____ attitude toward the subject.","opts":["author's","reader's","character's","publisher's"],a:"author's"},
      {q:"A foil character is used to _____ the protagonist's traits by contrast.","opts":["highlight","copy","ignore","replace"],a:"highlight"},
    ],
    "Comma Rules":[
      {q:"Use a comma _____ items in a list.","opts":["between","after all","before all","instead of"],a:"between"},
      {q:`"I bought apples oranges and bananas." Where do commas go?`,"opts":["After apples and oranges","After bananas","Nowhere","After I"],a:"After apples and oranges"},
      {q:"Use a comma after an _____ phrase.","opts":["introductory","ending","middle","short"],a:"introductory"},
      {q:"Use a comma before a _____ in a compound sentence.","opts":["conjunction","period","noun","verb"],a:"conjunction"},
      {q:`"However I disagree." — The comma goes after _____.`,"opts":["However","I","disagree","No comma needed"],a:"However"},
      {q:"The Oxford comma goes before the last item and the _____ in a list.","opts":["conjunction","period","semicolon","colon"],a:"conjunction"},
      {q:"Use a comma to set off a direct address in a sentence: 'Hello _____ how are you?'","opts":["comma after 'Hello'","no comma needed","comma after 'how'","comma after 'you'"],a:"comma after 'Hello'"},
      {q:`"Yes I would love to come." — A comma is needed after _____.`,"opts":["Yes","I","would","come"],a:"Yes"},
      {q:"Non-restrictive (nonessential) clauses are set off by _____.","opts":["commas","periods","semicolons","colons"],a:"commas"},
      {q:`Which sentence uses commas correctly?`,"opts":["I enjoy hiking, swimming, and cycling.","I enjoy hiking swimming and cycling.","I, enjoy hiking swimming, and cycling.","I enjoy, hiking, swimming and cycling."],a:"I enjoy hiking, swimming, and cycling."},
      {q:`"On Monday morning she ran five miles." A comma should go after _____.`,"opts":["morning","Monday","ran","miles"],a:"morning"},
      {q:"In dates, a comma separates the day from the _____.","opts":["year","month","week","century"],a:"year"},
      {q:"Which does NOT require a comma?","opts":["An essential/restrictive clause","After an introductory phrase","Before a conjunction in compound sentences","Between list items"],a:"An essential/restrictive clause"},
      {q:"Coordinate adjectives modifying the same noun are separated by _____.","opts":["commas","semicolons","colons","periods"],a:"commas"},
      {q:`"My sister Maria is a doctor." Is a comma needed around 'Maria'?`,"opts":["Yes — it's a nonessential appositive","No — it's essential info","Yes, always after names","No, never around names"],a:"Yes — it's a nonessential appositive"},
    ],
    "Persuasive Writing":[
      {q:"Persuasive writing tries to _____.","opts":["convince the reader","inform the reader","entertain the reader","confuse the reader"],a:"convince the reader"},
      {q:"A strong persuasive essay includes _____.","opts":["evidence and reasoning","only opinions","no examples","random facts"],a:"evidence and reasoning"},
      {q:"Emotional appeal targets the reader's _____.","opts":["feelings","logic","ethics","spelling"],a:"feelings"},
      {q:"Logical appeal uses _____.","opts":["facts and reasoning","emotions","personal stories","humor"],a:"facts and reasoning"},
      {q:"Ethical appeal builds the writer's _____.","opts":["credibility","humor","vocabulary","speed"],a:"credibility"},
      {q:"A call to action tells the reader to _____.","opts":["do something","stop reading","forget everything","take a nap"],a:"do something"},
      {q:"The three rhetorical appeals are ethos, pathos, and _____.","opts":["logos","mythos","chronos","kairos"],a:"logos"},
      {q:"Counterarguments _____ a persuasive essay when addressed effectively.","opts":["strengthen","weaken","destroy","shorten"],a:"strengthen"},
      {q:"A strong thesis in persuasive writing states your _____ clearly.","opts":["position/claim","favorite color","name","conclusion only"],a:"position/claim"},
      {q:"Which word signals a counterargument being addressed?","opts":["Although","Therefore","In addition","Furthermore"],a:"Although"},
      {q:"Facts and statistics are forms of _____ appeal in persuasion.","opts":["logos","pathos","ethos","kairos"],a:"logos"},
      {q:"Emotional language is a form of _____ appeal.","opts":["pathos","logos","ethos","none"],a:"pathos"},
      {q:"An expert's testimony is an example of _____ appeal.","opts":["ethos","pathos","logos","random"],a:"ethos"},
      {q:"A rebuttal in persuasion means _____.","opts":["responding to the opposing view","adding more evidence","restating your claim","writing the conclusion"],a:"responding to the opposing view"},
      {q:"Persuasive writing should target a specific _____.","opts":["audience","dictionary","bibliography","footnote"],a:"audience"},
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
      {q:"The mood of a text is the feeling it creates in the _____.","opts":["reader","author","publisher","editor"],a:"reader"},
      {q:"A somber tone suggests the author feels _____.","opts":["serious or sad","joyful","silly","confused"],a:"serious or sad"},
      {q:"Which word creates a more negative tone: 'house' or 'hovel'?","opts":["hovel","house","both the same","neither"],a:"hovel"},
      {q:"Choosing precise words instead of vague ones improves _____.","opts":["clarity and impact","page length","spelling","grammar"],a:"clarity and impact"},
      {q:"A sarcastic tone means the author is being _____.","opts":["mockingly ironic","sincere","neutral","formal"],a:"mockingly ironic"},
      {q:"Words with similar meanings but different emotional weight are called _____.","opts":["words with different connotations","synonyms","antonyms","homophones"],a:"words with different connotations"},
      {q:"An enthusiastic tone uses words that show _____.","opts":["excitement and energy","boredom","sadness","confusion"],a:"excitement and energy"},
      {q:"To shift from informal to formal writing, you should _____.","opts":["replace slang with precise vocabulary","add more exclamation points","use shorter sentences","remove evidence"],a:"replace slang with precise vocabulary"},
      {q:"'The smell of fresh bread wafted through the house' creates a _____ mood.","opts":["warm and comforting","frightening","sad","tense"],a:"warm and comforting"},
    ],
    "Textual Analysis":[
      {q:"Textual analysis examines _____.","opts":["how a text creates meaning","just the plot","only characters","the cover"],a:"how a text creates meaning"},
      {q:"When analyzing a text, consider the author's _____.","opts":["purpose and audience","favorite color","age","hometown"],a:"purpose and audience"},
      {q:"Structure in a text refers to _____.","opts":["how it is organized","how long it is","the font used","the paper quality"],a:"how it is organized"},
      {q:"A thesis statement presents the _____ of an analysis.","opts":["main argument","bibliography","title page","dedication"],a:"main argument"},
      {q:"Evidence in textual analysis comes from _____.","opts":["the text itself","outside sources only","your imagination","the author's biography"],a:"the text itself"},
      {q:"Analysis goes beyond summary by explaining _____.","opts":["WHY and HOW","just WHAT","only WHO","just WHERE"],a:"WHY and HOW"},
      {q:"A close reading focuses on _____ details of the text.","opts":["specific language and structural","general plot","character names only","the cover art"],a:"specific language and structural"},
      {q:"When analyzing structure, you might consider _____.","opts":["how the order of events affects meaning","the author's age","the page count","the cover design"],a:"how the order of events affects meaning"},
      {q:"Textual analysis asks: HOW does the author _____ their message?","opts":["convey","ignore","copy","hide"],a:"convey"},
      {q:"Quoting the text in an analysis _____ your argument.","opts":["supports","weakens","replaces","contradicts"],a:"supports"},
      {q:"When you paraphrase, you restate the text _____.","opts":["in your own words","word for word","in a shorter version only","without any changes"],a:"in your own words"},
      {q:"Point of view in a text affects _____.","opts":["what information the reader receives","the font","the page numbers","the title"],a:"what information the reader receives"},
      {q:"Analyzing the title of a text can reveal _____.","opts":["the author's purpose or theme","the page count","the publisher","random information"],a:"the author's purpose or theme"},
      {q:"In textual analysis, a 'claim' is supported by _____.","opts":["evidence from the text","the author's biography","outside opinions","pictures"],a:"evidence from the text"},
      {q:"The difference between analysis and summary is that analysis explains _____.","opts":["significance and meaning","just what happened","character names","the setting"],a:"significance and meaning"},
    ],
    "Bias & Perspective":[
      {q:"Bias is _____.","opts":["a one-sided viewpoint","a fact","a summary","a question"],a:"a one-sided viewpoint"},
      {q:"To identify bias, look for _____ language.","opts":["loaded or emotional","neutral","simple","short"],a:"loaded or emotional"},
      {q:"A balanced text presents _____ sides.","opts":["multiple","one","no","random"],a:"multiple"},
      {q:"Perspective is shaped by a person's _____.","opts":["experiences and beliefs","height","hair color","shoe size"],a:"experiences and beliefs"},
      {q:"Media literacy helps you _____.","opts":["evaluate sources critically","watch more TV","read faster","write shorter"],a:"evaluate sources critically"},
      {q:"An objective text is _____.","opts":["free from personal opinions","full of bias","always short","always long"],a:"free from personal opinions"},
      {q:"Confirmation bias means favoring information that _____ what you already believe.","opts":["confirms","contradicts","ignores","disproves"],a:"confirms"},
      {q:"A subjective text reflects _____.","opts":["personal opinions and feelings","only facts","no emotions","scientific data only"],a:"personal opinions and feelings"},
      {q:"Loaded language is designed to _____ the reader.","opts":["emotionally influence","inform neutrally","confuse","entertain"],a:"emotionally influence"},
      {q:"Primary sources may contain bias because _____.","opts":["they reflect the author's direct perspective","they are always wrong","they were written long ago","they are secondary"],a:"they reflect the author's direct perspective"},
      {q:"When evaluating a source, checking the _____ helps identify potential bias.","opts":["author's background and purpose","page count","font size","publication date only"],a:"author's background and purpose"},
      {q:"Stereotyping is a form of bias that _____.","opts":["oversimplifies groups of people","provides accurate data","removes assumptions","supports all individuals"],a:"oversimplifies groups of people"},
      {q:"Reading multiple perspectives on the same topic helps you _____.","opts":["form a more complete, balanced view","get confused","pick one side only","ignore the topic"],a:"form a more complete, balanced view"},
      {q:"Propaganda uses _____ to influence people's beliefs.","opts":["biased or misleading information","balanced facts","scientific evidence","multiple perspectives"],a:"biased or misleading information"},
      {q:"Critical readers ask: 'Who wrote this and _____ did they write it?'","opts":["why","when only","where only","how long ago"],a:"why"},
    ],
    "Complex Sentences":[
      {q:"A complex sentence has one independent clause and at least one _____ clause.","opts":["dependent","independent","simple","compound"],a:"dependent"},
      {q:"Which word starts a dependent clause?","opts":["Because","And","But","Or"],a:"Because"},
      {q:`"Because it rained, we stayed inside." — The dependent clause is _____.`,"opts":["Because it rained","we stayed inside","we","inside"],a:"Because it rained"},
      {q:"Subordinating conjunctions include: because, although, when, if, and _____.","opts":["since","and","but","or"],a:"since"},
      {q:"A dependent clause _____ stand alone as a sentence.","opts":["cannot","can","always","sometimes"],a:"cannot"},
      {q:`"Although she was tired, she finished the race." — "Although she was tired" is a _____ clause.`,"opts":["dependent","independent","simple","run-on"],a:"dependent"},
      {q:"A subordinating conjunction shows _____ between clauses.","opts":["a relationship (time, cause, condition)","no relationship","equal importance","contradiction only"],a:"a relationship (time, cause, condition)"},
      {q:`In "When the bell rings, students leave," the word 'When' is a _____.`,"opts":["subordinating conjunction","coordinating conjunction","preposition","pronoun"],a:"subordinating conjunction"},
      {q:"'Unless,' 'until,' and 'while' are examples of _____.","opts":["subordinating conjunctions","coordinating conjunctions","prepositions","articles"],a:"subordinating conjunctions"},
      {q:"A compound-complex sentence has at least two independent clauses and _____ dependent clause.","opts":["one","no","three","four"],a:"one"},
      {q:"When a dependent clause starts a sentence, use a _____ after it.","opts":["comma","period","semicolon","colon"],a:"comma"},
      {q:`"I will call you when I arrive." — 'when I arrive' is a _____ clause.`,"opts":["dependent","independent","main","coordinate"],a:"dependent"},
      {q:"Which is a complex sentence?","opts":["She left because she was tired.","She left and I stayed.","She left.","Leaving early."],a:"She left because she was tired."},
      {q:"A dependent clause expresses an _____ thought.","opts":["incomplete","complete","independent","random"],a:"incomplete"},
      {q:"The independent clause in a complex sentence can _____ as its own sentence.","opts":["stand alone","not stand alone","be removed","be ignored"],a:"stand alone"},
    ],
    "MLA Basics":[
      {q:"MLA stands for _____.","opts":["Modern Language Association","Math Learning Academy","Multiple Letter Arrangement","Main Lesson Approach"],a:"Modern Language Association"},
      {q:"MLA format uses _____ spacing.","opts":["double","single","triple","no"],a:"double"},
      {q:"In MLA, the Works Cited page lists _____.","opts":["all sources used","only books","the title","the author's bio"],a:"all sources used"},
      {q:"MLA in-text citations include the author's _____ and page number.","opts":["last name","first name","middle name","nickname"],a:"last name"},
      {q:"MLA format uses _____ font.","opts":["12-point Times New Roman","Comic Sans","any font","bold Arial"],a:"12-point Times New Roman"},
      {q:"The header in MLA includes your _____ and page number.","opts":["last name","favorite quote","school name","grade"],a:"last name"},
      {q:"In MLA, a Works Cited entry for a book starts with the _____.","opts":["author's last name","title","year","publisher"],a:"author's last name"},
      {q:"MLA margins are _____ on all sides.","opts":["1 inch","2 inches","0.5 inches","no margin"],a:"1 inch"},
      {q:"An in-text citation in MLA looks like _____.","opts":["(Smith 42)","[Smith, 2020]","Smith (42)","42 Smith"],a:"(Smith 42)"},
      {q:"The Works Cited page is _____ in alphabetical order.","opts":["listed","never organized","organized by date","listed by topic"],a:"listed"},
      {q:"MLA format is most commonly used in _____ disciplines.","opts":["humanities (English, history)","science and math","business","music"],a:"humanities (English, history)"},
      {q:"When no author is listed in MLA, use the _____ in citations.","opts":["title","date","publisher","URL"],a:"title"},
      {q:"MLA 9th edition is the _____ version of MLA guidelines.","opts":["most current","oldest","first","second"],a:"most current"},
      {q:"In MLA, page numbers go in the _____ right corner of each page.","opts":["upper","lower","left","center"],a:"upper"},
      {q:"Hanging indentation in a Works Cited entry means _____.","opts":["the second and subsequent lines are indented","the first line is indented","all lines are equal","no indentation"],a:"the second and subsequent lines are indented"},
    ],
    "Expository Writing":[
      {q:"Expository writing _____.","opts":["explains or informs","tells a story","persuades","describes feelings"],a:"explains or informs"},
      {q:"An expository essay uses _____ evidence.","opts":["factual","emotional","fictional","poetic"],a:"factual"},
      {q:"A thesis statement in expository writing states the _____.","opts":["main idea","character","setting","conflict"],a:"main idea"},
      {q:"Transition words in expository writing include _____.","opts":["furthermore, additionally, however","once upon a time","the end","dear diary"],a:"furthermore, additionally, however"},
      {q:"The purpose of expository writing is to _____.","opts":["educate the reader","make the reader laugh","scare the reader","bore the reader"],a:"educate the reader"},
      {q:"Expository essays should be written in _____ person.","opts":["third","first","second","no"],a:"third"},
      {q:"Types of expository writing include _____.","opts":["compare/contrast, cause/effect, problem/solution","fiction, poetry, drama","persuasion, satire, humor","narrative, memoir, autobiography"],a:"compare/contrast, cause/effect, problem/solution"},
      {q:"In expository writing, each body paragraph should focus on _____.","opts":["one main point","multiple unrelated ideas","only opinions","fictional examples"],a:"one main point"},
      {q:"A cause-and-effect essay explains _____.","opts":["why something happened and what resulted","a story's plot","how to do something","a comparison between two things"],a:"why something happened and what resulted"},
      {q:"A compare-and-contrast essay examines _____.","opts":["similarities and differences","only differences","only similarities","unrelated topics"],a:"similarities and differences"},
      {q:"Expository writing should be _____ and based on research.","opts":["objective","subjective","emotional","biased"],a:"objective"},
      {q:"A strong expository introduction includes _____.","opts":["a hook, background info, and thesis","a story, dialogue, and moral","a list of opinions","only the thesis"],a:"a hook, background info, and thesis"},
      {q:"Problem-solution essays describe a _____ and propose a _____.","opts":["problem; solution","character; setting","theme; conflict","plot; resolution"],a:"problem; solution"},
      {q:"Using headings and subheadings in expository writing helps _____.","opts":["organize and guide the reader","add length","replace evidence","remove the thesis"],a:"organize and guide the reader"},
      {q:"The concluding paragraph in expository writing should _____.","opts":["restate the thesis and summarize key points","introduce new evidence","tell a new story","repeat the introduction word for word"],a:"restate the thesis and summarize key points"},
    ],
    "Advanced Vocabulary":[
      {q:`"Ubiquitous" means _____.`,"opts":["found everywhere","rare","invisible","ancient"],a:"found everywhere"},
      {q:`"Ephemeral" means _____.`,"opts":["lasting a very short time","eternal","heavy","colorful"],a:"lasting a very short time"},
      {q:`"Pragmatic" means _____.`,"opts":["practical and realistic","dreamy","artistic","lazy"],a:"practical and realistic"},
      {q:`"Eloquent" means _____.`,"opts":["fluent and persuasive in speaking","quiet","rude","boring"],a:"fluent and persuasive in speaking"},
      {q:`"Ambiguous" means _____.`,"opts":["open to more than one interpretation","clear","simple","obvious"],a:"open to more than one interpretation"},
      {q:`"Benevolent" means _____.`,"opts":["well-meaning and kindly","evil","selfish","lazy"],a:"well-meaning and kindly"},
      {q:`"Tenacious" means _____.`,"opts":["persistent and determined","weak","forgetful","careless"],a:"persistent and determined"},
      {q:`"Verbose" means _____.`,"opts":["using more words than necessary","silent","brief","clear"],a:"using more words than necessary"},
      {q:`"Lucid" means _____.`,"opts":["clearly expressed and easy to understand","confusing","dark","noisy"],a:"clearly expressed and easy to understand"},
      {q:`"Contemplate" means _____.`,"opts":["think deeply about","ignore","rush","forget"],a:"think deeply about"},
      {q:`"Meticulous" means _____.`,"opts":["showing great attention to detail","careless","fast","loud"],a:"showing great attention to detail"},
      {q:`"Superfluous" means _____.`,"opts":["unnecessary and excessive","essential","scarce","perfect"],a:"unnecessary and excessive"},
      {q:`"Candid" means _____.`,"opts":["truthful and straightforward","dishonest","shy","confused"],a:"truthful and straightforward"},
      {q:`"Arduous" means _____.`,"opts":["difficult and tiring","easy","short","fun"],a:"difficult and tiring"},
      {q:`"Gregarious" means _____.`,"opts":["sociable and outgoing","shy","angry","bored"],a:"sociable and outgoing"},
    ],
    "Rhetoric & Appeals":[
      {q:"Ethos appeals to _____.","opts":["credibility/ethics","emotions","logic","humor"],a:"credibility/ethics"},
      {q:"Pathos appeals to _____.","opts":["emotions","logic","credibility","facts"],a:"emotions"},
      {q:"Logos appeals to _____.","opts":["logic and reason","emotions","ethics","authority"],a:"logic and reason"},
      {q:"A rhetorical question does NOT expect a _____.","opts":["real answer","reaction","thought","pause"],a:"real answer"},
      {q:"Repetition in rhetoric is used to _____.","opts":["emphasize a point","waste time","confuse","bore"],a:"emphasize a point"},
      {q:"An appeal to authority uses _____ to support a claim.","opts":["expert opinions","rumors","gossip","wishes"],a:"expert opinions"},
      {q:"Aristotle's three rhetorical appeals are ethos, pathos, and _____.","opts":["logos","kairos","mythos","chronos"],a:"logos"},
      {q:"'Nine out of ten dentists recommend...' is an example of _____ appeal.","opts":["logos (statistical/logical)","pathos","ethos","none"],a:"logos (statistical/logical)"},
      {q:"A tear-jerking story in an ad uses _____ appeal.","opts":["pathos","logos","ethos","kairos"],a:"pathos"},
      {q:"A doctor's recommendation in a medicine ad uses _____ appeal.","opts":["ethos","pathos","logos","none"],a:"ethos"},
      {q:"Kairos refers to _____ in rhetoric.","opts":["the right timing and context","the speaker's credibility","emotional appeals","logical evidence"],a:"the right timing and context"},
      {q:"Rhetoric is the art of _____ communication.","opts":["effective and persuasive","silent","random","decorative"],a:"effective and persuasive"},
      {q:"'You wouldn't want your family to suffer, would you?' uses _____ appeal.","opts":["pathos","logos","ethos","kairos"],a:"pathos"},
      {q:"Statistics and data are forms of _____ appeal.","opts":["logos","pathos","ethos","kairos"],a:"logos"},
      {q:"The rhetorical triangle consists of speaker, audience, and _____.","opts":["message/purpose","setting","font","page number"],a:"message/purpose"},
    ],
    "Poetry Analysis":[
      {q:"A stanza in poetry is like a _____ in prose.","opts":["paragraph","word","letter","period"],a:"paragraph"},
      {q:"Rhyme scheme is labeled using _____.","opts":["letters (ABAB)","numbers","symbols","colors"],a:"letters (ABAB)"},
      {q:"Free verse poetry has NO regular _____.","opts":["rhyme or meter","words","meaning","author"],a:"rhyme or meter"},
      {q:"A sonnet has _____ lines.","opts":["14","10","20","8"],a:"14"},
      {q:"Meter is the _____ pattern in poetry.","opts":["rhythmic","color","size","font"],a:"rhythmic"},
      {q:"A haiku has _____ syllables total (5-7-5).","opts":["17","10","20","12"],a:"17"},
      {q:"An ABAB rhyme scheme means _____.","opts":["lines 1&3 rhyme and lines 2&4 rhyme","all lines rhyme","no lines rhyme","only the last lines rhyme"],a:"lines 1&3 rhyme and lines 2&4 rhyme"},
      {q:"Iambic pentameter has _____ iambic feet per line.","opts":["5","10","14","7"],a:"5"},
      {q:"An iamb is a foot with _____ syllable pattern.","opts":["unstressed-STRESSED (da-DUM)","STRESSED-unstressed","two stressed","two unstressed"],a:"unstressed-STRESSED (da-DUM)"},
      {q:"An ode is a poem that _____.","opts":["praises or celebrates a subject","tells a story","lists facts","provides instructions"],a:"praises or celebrates a subject"},
      {q:"Enjambment means a sentence _____ into the next line without a break.","opts":["continues","stops","ends","restarts"],a:"continues"},
      {q:"The volta in a sonnet is _____.","opts":["a turning point or shift in thought","the final couplet","the opening line","the rhyme scheme"],a:"a turning point or shift in thought"},
      {q:"Assonance is the repetition of _____ sounds within words.","opts":["vowel","consonant","beginning","ending"],a:"vowel"},
      {q:"Consonance is the repetition of _____ sounds within words.","opts":["consonant","vowel","rhyming","silent"],a:"consonant"},
      {q:"The speaker in a poem is _____.","opts":["the voice or persona narrating the poem","always the author","the main character","the editor"],a:"the voice or persona narrating the poem"},
    ],
    "Semicolons & Colons":[
      {q:"A semicolon connects two _____ clauses.","opts":["independent","dependent","short","run-on"],a:"independent"},
      {q:"Use a colon before a _____.","opts":["list","period","comma","semicolon"],a:"list"},
      {q:`Which is correct? "I have three pets___ a dog, a cat, and a fish."`,"opts":["colon (:)","semicolon (;)","comma (,)","period (.)"],a:"colon (:)"},
      {q:`"She loves to read; he prefers to write." — The semicolon joins two _____ ideas.`,"opts":["related","unrelated","opposite","random"],a:"related"},
      {q:"A semicolon is _____ than a comma but _____ than a period.","opts":["stronger; weaker","weaker; stronger","the same","unrelated"],a:"stronger; weaker"},
      {q:"Do NOT use a semicolon before a _____ clause.","opts":["dependent","independent","main","complete"],a:"dependent"},
      {q:"A colon can also introduce a _____ or explanation.","opts":["quotation or explanation","question","new paragraph","title only"],a:"quotation or explanation"},
      {q:`"She had one goal: to win the championship." The colon introduces _____.`,"opts":["an explanation/appositive","a list","a question","a new topic"],a:"an explanation/appositive"},
      {q:"Semicolons can also separate items in a list when items _____.","opts":["contain commas themselves","are short","are nouns","are verbs"],a:"contain commas themselves"},
      {q:`Which is correct use of a semicolon?`,"opts":["I studied hard; I passed the test.","I studied hard; because I wanted to pass.","I studied; hard to pass.","I; studied hard."],a:"I studied hard; I passed the test."},
      {q:"A colon is used after a complete _____ before a list.","opts":["independent clause","dependent clause","question","fragment"],a:"independent clause"},
      {q:`"We visited three cities: Paris, London, and Rome." What punctuation is used?`,"opts":["colon","semicolon","comma","period"],a:"colon"},
      {q:"Time is written with a _____ (e.g., 3:30 PM).","opts":["colon","semicolon","comma","period"],a:"colon"},
      {q:"Which sentence correctly uses a semicolon to separate list items?","opts":["We visited Austin, Texas; Denver, Colorado; and Seattle, Washington.","We visited; Austin Texas Denver Colorado Seattle Washington.","We visited Austin Texas; Denver Colorado; Seattle Washington.","We visited; Austin; Denver; Seattle."],a:"We visited Austin, Texas; Denver, Colorado; and Seattle, Washington."},
      {q:"'Therefore,' 'however,' and 'consequently' used between independent clauses require a _____ before them.","opts":["semicolon","comma","colon","period"],a:"semicolon"},
    ],
    "Research Writing":[
      {q:"A research paper starts with a _____.","opts":["thesis statement","bibliography","conclusion","index"],a:"thesis statement"},
      {q:"Primary sources are _____ accounts.","opts":["firsthand","secondhand","thirdhand","fictional"],a:"firsthand"},
      {q:"Secondary sources _____ primary sources.","opts":["analyze or interpret","replace","ignore","copy"],a:"analyze or interpret"},
      {q:"Plagiarism is _____.","opts":["using someone's work without credit","good research","a type of citation","a writing style"],a:"using someone's work without credit"},
      {q:"A bibliography lists _____.","opts":["all sources consulted","only books","the author's friends","the page count"],a:"all sources consulted"},
      {q:"Paraphrasing means _____.","opts":["restating in your own words","copying exactly","deleting","ignoring"],a:"restating in your own words"},
      {q:"A credible source for research is _____.","opts":["peer-reviewed and authored by experts","any website","social media posts","anonymous blogs"],a:"peer-reviewed and authored by experts"},
      {q:"A direct quotation in research writing must be placed in _____.","opts":["quotation marks","parentheses","brackets","italics"],a:"quotation marks"},
      {q:"The CRAAP test helps evaluate sources by checking Currency, Relevance, Authority, Accuracy, and _____.","opts":["Purpose","Price","Popularity","Print quality"],a:"Purpose"},
      {q:"An annotated bibliography includes a citation AND a _____ of each source.","opts":["brief summary and evaluation","picture","graph","full copy"],a:"brief summary and evaluation"},
      {q:"Tertiary sources include _____.","opts":["encyclopedias and textbooks that summarize other sources","firsthand accounts","original research","personal journals"],a:"encyclopedias and textbooks that summarize other sources"},
      {q:"When integrating a quote, you should _____ it into your own sentence.","opts":["smoothly embed","randomly drop","copy without context","replace"],a:"smoothly embed"},
      {q:"A research question should be _____ enough to fully explore in your paper.","opts":["focused and specific","as broad as possible","unanswerable","already answered"],a:"focused and specific"},
      {q:"Taking notes in your own words while researching helps avoid _____.","opts":["plagiarism","citations","evidence","sources"],a:"plagiarism"},
      {q:"Peer-reviewed articles are reviewed by _____ before publication.","opts":["experts in the field","the general public","students","the author only"],a:"experts in the field"},
    ],
    "Literary Analysis":[
      {q:"Literary analysis examines _____.","opts":["how an author creates meaning","just the plot","only the ending","the book cover"],a:"how an author creates meaning"},
      {q:"A motif is a _____ element in a literary work.","opts":["recurring","one-time","hidden","deleted"],a:"recurring"},
      {q:"Symbolism uses objects to represent _____.","opts":["abstract ideas","nothing","other objects","prices"],a:"abstract ideas"},
      {q:"Characterization is how an author _____ characters.","opts":["develops","names","counts","draws"],a:"develops"},
      {q:"Theme differs from subject because theme is a _____ about the subject.","opts":["statement or message","single word","name","date"],a:"statement or message"},
      {q:"Conflict in literature can be internal or _____.","opts":["external","invisible","optional","imaginary"],a:"external"},
      {q:"Direct characterization is when the author _____ tells you about a character.","opts":["explicitly","never","indirectly","randomly"],a:"explicitly"},
      {q:"Indirect characterization shows character through _____.","opts":["actions, speech, and thoughts","direct statements","the author's notes","the title"],a:"actions, speech, and thoughts"},
      {q:"Dramatic irony in literature creates _____ between the audience and characters.","opts":["a knowledge gap","sympathy","conflict","symbolism"],a:"a knowledge gap"},
      {q:"An antagonist creates _____ for the protagonist.","opts":["conflict","resolution","theme","symbolism"],a:"conflict"},
      {q:"The denouement is the part of the plot _____ the climax where things resolve.","opts":["after","before","during","replacing"],a:"after"},
      {q:"Foreshadowing creates _____ by hinting at future events.","opts":["suspense or anticipation","confusion","humor","boredom"],a:"suspense or anticipation"},
      {q:"A static character _____ throughout the story.","opts":["does not change","changes dramatically","disappears","becomes the villain"],a:"does not change"},
      {q:"A dynamic character _____ as a result of events in the story.","opts":["changes significantly","stays the same","disappears","replaces the antagonist"],a:"changes significantly"},
      {q:"The narrative arc includes exposition, rising action, climax, falling action, and _____.","opts":["resolution/denouement","introduction","prologue","epilogue only"],a:"resolution/denouement"},
    ],
    "SAT Vocabulary":[
      {q:`"Arduous" means _____.`,"opts":["difficult and tiring","easy","fun","colorful"],a:"difficult and tiring"},
      {q:`"Candid" means _____.`,"opts":["truthful and straightforward","dishonest","shy","confused"],a:"truthful and straightforward"},
      {q:`"Diligent" means _____.`,"opts":["hardworking","lazy","careless","rude"],a:"hardworking"},
      {q:`"Gregarious" means _____.`,"opts":["sociable","shy","angry","bored"],a:"sociable"},
      {q:`"Meticulous" means _____.`,"opts":["showing great attention to detail","careless","fast","loud"],a:"showing great attention to detail"},
      {q:`"Pragmatic" means _____.`,"opts":["dealing with things practically","idealistic","dreamy","random"],a:"dealing with things practically"},
      {q:`"Ambivalent" means _____.`,"opts":["having mixed feelings","extremely happy","certain","angry"],a:"having mixed feelings"},
      {q:`"Benign" means _____.`,"opts":["harmless and gentle","dangerous","strict","loud"],a:"harmless and gentle"},
      {q:`"Conciliate" means _____.`,"opts":["to make peace or reconcile","to argue","to ignore","to confuse"],a:"to make peace or reconcile"},
      {q:`"Diffident" means _____.`,"opts":["modest and shy","confident","rude","careless"],a:"modest and shy"},
      {q:`"Equivocal" means _____.`,"opts":["ambiguous and open to multiple interpretations","clear","simple","definite"],a:"ambiguous and open to multiple interpretations"},
      {q:`"Frugal" means _____.`,"opts":["careful and economical with money","wasteful","generous","wealthy"],a:"careful and economical with money"},
      {q:`"Hackneyed" means _____.`,"opts":["overused and lacking originality","fresh","innovative","creative"],a:"overused and lacking originality"},
      {q:`"Indolent" means _____.`,"opts":["lazy","hardworking","energetic","cheerful"],a:"lazy"},
      {q:`"Loquacious" means _____.`,"opts":["tending to talk a great deal","quiet","shy","brief"],a:"tending to talk a great deal"},
    ],
    "Analyzing Arguments":[
      {q:"A valid argument has _____.","opts":["logical reasoning and evidence","only emotions","no evidence","personal attacks"],a:"logical reasoning and evidence"},
      {q:"A logical fallacy is _____.","opts":["a flaw in reasoning","strong evidence","a fact","good logic"],a:"a flaw in reasoning"},
      {q:"Ad hominem attacks the _____ instead of the argument.","opts":["person","evidence","logic","conclusion"],a:"person"},
      {q:"A straw man fallacy _____ the opponent's argument.","opts":["misrepresents","strengthens","supports","ignores"],a:"misrepresents"},
      {q:"Appeal to popularity assumes something is right because _____.","opts":["many people believe it","it is proven","experts agree","studies show it"],a:"many people believe it"},
      {q:"A red herring _____ from the main argument.","opts":["distracts","supports","proves","strengthens"],a:"distracts"},
      {q:"The slippery slope fallacy assumes one event will _____ lead to extreme consequences.","opts":["inevitably","never","rarely","randomly"],a:"inevitably"},
      {q:"False dichotomy presents _____ when more options exist.","opts":["only two choices","many options","no choices","random choices"],a:"only two choices"},
      {q:"Circular reasoning is when the conclusion _____ the premise.","opts":["restates rather than proves","contradicts","improves","ignores"],a:"restates rather than proves"},
      {q:"Hasty generalization draws a _____ conclusion from too little evidence.","opts":["broad","narrow","careful","valid"],a:"broad"},
      {q:"An appeal to emotion is weak when it _____.","opts":["substitutes feelings for logic and evidence","supports a logical claim","adds to valid evidence","reinforces a fact"],a:"substitutes feelings for logic and evidence"},
      {q:"A valid argument is _____ — the conclusion follows from the premises.","opts":["logically sound","emotionally strong","popular","brief"],a:"logically sound"},
      {q:"Bandwagon fallacy says you should do something because _____.","opts":["everyone else is doing it","experts recommend it","evidence supports it","logic requires it"],a:"everyone else is doing it"},
      {q:"A non sequitur is a conclusion that _____ follow from the premise.","opts":["does not logically","does logically","always","sometimes"],a:"does not logically"},
      {q:"Analyzing an argument requires evaluating both the _____ and the evidence.","opts":["claim/reasoning","author's name","publication date","font size"],a:"claim/reasoning"},
    ],
    "Shakespeare Basics":[
      {q:"Shakespeare wrote in _____ pentameter.","opts":["iambic","trochaic","anapestic","dactylic"],a:"iambic"},
      {q:"A soliloquy is when a character _____.","opts":["speaks thoughts aloud alone","sings","fights","dances"],a:"speaks thoughts aloud alone"},
      {q:`"Romeo and Juliet" is a _____.`,"opts":["tragedy","comedy","history","fairy tale"],a:"tragedy"},
      {q:"Shakespeare's plays were performed at the _____ Theatre.","opts":["Globe","Empire","Palace","Royal"],a:"Globe"},
      {q:`"To be, or not to be" is from _____.`,"opts":["Hamlet","Macbeth","Othello","King Lear"],a:"Hamlet"},
      {q:"Shakespeare wrote approximately _____ plays.","opts":["37","10","50","100"],a:"37"},
      {q:"Shakespeare wrote his plays in the _____ era.","opts":["Elizabethan","Victorian","Medieval","Renaissance (both Elizabethan/Jacobean)"],a:"Renaissance (both Elizabethan/Jacobean)"},
      {q:"An aside is when a character speaks to the _____ without other characters hearing.","opts":["audience","king","hero","villain"],a:"audience"},
      {q:"Shakespeare's tragedies typically end with _____.","opts":["the death of the protagonist","a wedding","a celebration","a happy resolution"],a:"the death of the protagonist"},
      {q:"Shakespeare's comedies typically end with _____.","opts":["marriage and reconciliation","death","war","betrayal"],a:"marriage and reconciliation"},
      {q:`"All the world's a stage" is from _____.`,"opts":["As You Like It","Hamlet","Macbeth","Romeo and Juliet"],a:"As You Like It"},
      {q:"The witches in Macbeth represent _____.","opts":["fate and temptation","comedy","romance","history"],a:"fate and temptation"},
      {q:"Blank verse in Shakespeare is _____.","opts":["unrhymed iambic pentameter","rhymed verse","free verse","prose"],a:"unrhymed iambic pentameter"},
      {q:"Shakespeare's sonnets typically follow the _____ form.","opts":["English (Shakespearean) sonnet — three quatrains and a couplet","Italian (Petrarchan) sonnet","free verse","haiku"],a:"English (Shakespearean) sonnet — three quatrains and a couplet"},
      {q:"A folio is _____.","opts":["a collected edition of Shakespeare's works","a type of stage","a character's speech","a theater company"],a:"a collected edition of Shakespeare's works"},
    ],
    "Essay Structure":[
      {q:"An essay has an introduction, body, and _____.","opts":["conclusion","appendix","glossary","index"],a:"conclusion"},
      {q:"The thesis statement is in the _____.","opts":["introduction","conclusion","body","title"],a:"introduction"},
      {q:"Body paragraphs support the _____.","opts":["thesis","title","author","date"],a:"thesis"},
      {q:"Each body paragraph needs a _____ sentence.","opts":["topic","random","final","first"],a:"topic"},
      {q:"The conclusion should _____ the thesis.","opts":["restate","contradict","ignore","delete"],a:"restate"},
      {q:"Transitions connect _____ between paragraphs.","opts":["ideas","pages","words","letters"],a:"ideas"},
      {q:"A hook in the introduction is designed to _____.","opts":["grab the reader's attention","state your conclusion","list evidence","name your sources"],a:"grab the reader's attention"},
      {q:"The thesis statement should appear _____ the introduction.","opts":["near the end of","in the middle of","at the start of","outside of"],a:"near the end of"},
      {q:"A strong body paragraph has a topic sentence, evidence, analysis, and _____.","opts":["a concluding/transition sentence","the thesis","another introduction","a title"],a:"a concluding/transition sentence"},
      {q:"How many body paragraphs does a standard 5-paragraph essay have?","opts":["3","2","4","5"],a:"3"},
      {q:"The conclusion should NOT _____.","opts":["introduce brand new arguments","restate the thesis","summarize key points","leave the reader with final thoughts"],a:"introduce brand new arguments"},
      {q:"Evidence in a body paragraph should be _____ with analysis.","opts":["followed","replaced","removed","started"],a:"followed"},
      {q:"A counterargument paragraph _____ and then refutes the opposing view.","opts":["acknowledges","ignores","copies","supports"],a:"acknowledges"},
      {q:"An outline helps you _____ before writing your essay.","opts":["organize your ideas","find your sources","write your conclusion","choose your font"],a:"organize your ideas"},
      {q:"The purpose of the introduction is to _____ the reader to the topic.","opts":["introduce","confuse","conclude","distract"],a:"introduce"},
    ],
    "Critical Reading":[
      {q:"Critical reading means _____.","opts":["analyzing and evaluating a text","reading fast","reading aloud","skimming"],a:"analyzing and evaluating a text"},
      {q:"When reading critically, question the author's _____.","opts":["assumptions and evidence","handwriting","spelling","age"],a:"assumptions and evidence"},
      {q:"Annotating a text means _____.","opts":["making notes and marking key passages","drawing pictures","erasing words","copying it"],a:"making notes and marking key passages"},
      {q:"Critical readers consider _____ perspectives.","opts":["multiple","only one","no","random"],a:"multiple"},
      {q:"Evaluating credibility means checking if a source is _____.","opts":["trustworthy","long","short","colorful"],a:"trustworthy"},
      {q:"Critical reading requires _____ engagement with the text.","opts":["active","passive","no","minimal"],a:"active"},
      {q:"Asking 'What is the author's purpose?' is part of _____ reading.","opts":["critical","passive","surface","lazy"],a:"critical"},
      {q:"Identifying the author's assumptions helps you evaluate _____.","opts":["the strength of their argument","their writing speed","their vocabulary","their grammar"],a:"the strength of their argument"},
      {q:"Making inferences while reading requires combining text clues with _____.","opts":["prior knowledge","random guesses","the title","the font"],a:"prior knowledge"},
      {q:"Evaluating an argument involves checking if the evidence _____ the claim.","opts":["actually supports","contradicts","replaces","is unrelated to"],a:"actually supports"},
      {q:"Distinguishing between fact and opinion is a key _____ skill.","opts":["critical reading","memorization","spelling","grammar"],a:"critical reading"},
      {q:"Questioning the text as you read is known as _____ reading.","opts":["active/critical","passive","silent","skimming"],a:"active/critical"},
      {q:"A critical reader asks: 'What does the author leave _____ from this argument?'","opts":["out / unsaid","in","above","below"],a:"out / unsaid"},
      {q:"Synthesis in critical reading means combining _____ from multiple texts.","opts":["ideas and insights","only quotes","random sentences","page numbers"],a:"ideas and insights"},
      {q:"Recognizing an author's bias helps you read _____.","opts":["more objectively","more emotionally","faster","backwards"],a:"more objectively"},
    ],
    "Complex Grammar":[
      {q:"A gerund is a verb form used as a _____.","opts":["noun","verb","adjective","adverb"],a:"noun"},
      {q:"A participle is a verb form used as an _____.","opts":["adjective","noun","adverb","conjunction"],a:"adjective"},
      {q:"An infinitive begins with _____.","opts":["to","for","by","at"],a:"to"},
      {q:"Parallel structure means using the same _____ pattern.","opts":["grammatical","color","size","font"],a:"grammatical"},
      {q:"A dangling modifier has no clear _____ to modify.","opts":["word","sentence","paragraph","book"],a:"word"},
      {q:"Subject-verb agreement means they must match in _____.","opts":["number","color","length","font"],a:"number"},
      {q:"'Swimming is fun.' — 'Swimming' is a _____.","opts":["gerund (noun)","participle (adjective)","infinitive","preposition"],a:"gerund (noun)"},
      {q:"'The swimming child' — 'swimming' is a _____.","opts":["participle (adjective)","gerund (noun)","infinitive","conjunction"],a:"participle (adjective)"},
      {q:"'To swim daily is healthy.' — 'To swim' is an _____.","opts":["infinitive","gerund","participle","preposition"],a:"infinitive"},
      {q:"Which sentence has faulty parallel structure?","opts":["She likes running, to swim, and dance.","She likes running, swimming, and dancing.","She likes to run, to swim, and to dance.","She ran, swam, and danced."],a:"She likes running, to swim, and dance."},
      {q:"A misplaced modifier is a modifier placed _____.","opts":["too far from the word it modifies","correctly","at the start","at the end"],a:"too far from the word it modifies"},
      {q:`"Running to catch the bus, his backpack fell off." — This has a _____ modifier.`,"opts":["dangling","parallel","correct","compound"],a:"dangling"},
      {q:"Collective nouns like 'team' or 'class' typically take _____ verbs.","opts":["singular","plural","no","compound"],a:"singular"},
      {q:"An appositive is a noun phrase that _____ another noun.","opts":["renames or explains","replaces","contradicts","modifies like an adjective only"],a:"renames or explains"},
      {q:"Which is correct? 'Each of the students ___ required to submit an essay.'","opts":["is","are","were","have"],a:"is"},
    ],
    "Advanced Grammar":[
      {q:"The subjunctive mood expresses _____.","opts":["wishes or hypotheticals","facts","commands","questions"],a:"wishes or hypotheticals"},
      {q:`"If I were rich" uses the _____ mood.`,"opts":["subjunctive","indicative","imperative","interrogative"],a:"subjunctive"},
      {q:"An appositive _____ a noun.","opts":["renames or describes","replaces","deletes","hides"],a:"renames or describes"},
      {q:"A relative clause begins with _____.","opts":["who, which, or that","and, but, or","because, since","for, to, by"],a:"who, which, or that"},
      {q:"Active voice: the subject _____ the action.","opts":["performs","receives","ignores","watches"],a:"performs"},
      {q:"Passive voice: the subject _____ the action.","opts":["receives","performs","ignores","creates"],a:"receives"},
      {q:"The indicative mood states _____.","opts":["facts or asks questions","wishes","commands","hypotheticals"],a:"facts or asks questions"},
      {q:"The imperative mood gives _____.","opts":["commands or requests","facts","questions","hypotheticals"],a:"commands or requests"},
      {q:"'She suggested that he _____ early.' — The correct subjunctive form is:","opts":["leave","leaves","left","leaving"],a:"leave"},
      {q:"A restrictive relative clause uses _____ (without commas).","opts":["'that'","'which'","'who' only","both with commas"],a:"'that'"},
      {q:"A non-restrictive relative clause uses _____ (with commas).","opts":["'which'","'that'","'what'","'when'"],a:"'which'"},
      {q:"Converting passive to active voice makes writing _____.","opts":["more direct and vigorous","longer","more formal","more passive"],a:"more direct and vigorous"},
      {q:"'The cake was eaten by the children.' — This is _____ voice.","opts":["passive","active","imperative","subjunctive"],a:"passive"},
      {q:"'The children ate the cake.' — This is _____ voice.","opts":["active","passive","imperative","subjunctive"],a:"active"},
      {q:"The future perfect tense ('will have done') expresses an action _____.","opts":["completed before a future point","happening now","completed in the past","ongoing in the future"],a:"completed before a future point"},
    ],
    "AP Vocabulary":[
      {q:`"Juxtaposition" means _____.`,"opts":["placing things side by side for comparison","separating","hiding","ignoring"],a:"placing things side by side for comparison"},
      {q:`"Didactic" means _____.`,"opts":["intended to teach","entertaining","confusing","boring"],a:"intended to teach"},
      {q:`"Pedantic" means _____.`,"opts":["excessively focused on minor details","relaxed","creative","emotional"],a:"excessively focused on minor details"},
      {q:`"Sardonic" means _____.`,"opts":["grimly mocking","kind","gentle","happy"],a:"grimly mocking"},
      {q:`"Verisimilitude" means _____.`,"opts":["appearance of being true","beauty","complexity","humor"],a:"appearance of being true"},
      {q:`"Anaphora" is the repetition of words at the _____ of successive clauses.`,"opts":["beginning","end","middle","random place"],a:"beginning"},
      {q:`"Solipsism" means _____.`,"opts":["the view that only one's own mind is certain to exist","generosity","realism","optimism"],a:"the view that only one's own mind is certain to exist"},
      {q:`"Hubris" means _____.`,"opts":["excessive pride or arrogance","humility","wisdom","bravery"],a:"excessive pride or arrogance"},
      {q:`"Catharsis" in literature means _____.`,"opts":["emotional release or purification felt by the audience","confusion","boredom","excitement"],a:"emotional release or purification felt by the audience"},
      {q:`"Denouement" refers to _____.`,"opts":["the resolution and untangling of plot after the climax","the climax","the exposition","the rising action"],a:"the resolution and untangling of plot after the climax"},
      {q:`"Elegy" is a poem written to _____.`,"opts":["mourn the dead","celebrate a wedding","criticize government","tell an adventure story"],a:"mourn the dead"},
      {q:`"Polemic" is a piece of writing that _____.`,"opts":["strongly argues one side of a controversial issue","presents balanced views","entertains without argument","informs without opinion"],a:"strongly argues one side of a controversial issue"},
      {q:`"Hubris" often leads to _____ in classical tragedies.`,"opts":["the hero's downfall","victory","wisdom","harmony"],a:"the hero's downfall"},
      {q:`"Epithet" is a descriptive _____ attached to a name.`,"opts":["phrase or adjective","verb","preposition","conjunction"],a:"phrase or adjective"},
      {q:`"Invective" means _____.`,"opts":["insulting or abusive language","praise","neutral description","formal address"],a:"insulting or abusive language"},
    ],
    "Comparative Literature":[
      {q:"Comparative literature studies _____.","opts":["literature across cultures and languages","only English texts","only poetry","only novels"],a:"literature across cultures and languages"},
      {q:"An archetype is a _____ pattern.","opts":["universal","rare","modern","artificial"],a:"universal"},
      {q:"The Hero's Journey is a common _____.","opts":["narrative archetype","poem type","essay format","grammar rule"],a:"narrative archetype"},
      {q:"Intertextuality is when texts _____ each other.","opts":["reference","ignore","contradict","copy"],a:"reference"},
      {q:"A universal theme is understood across _____.","opts":["cultures","one country only","one school","one classroom"],a:"cultures"},
      {q:"Genre means _____ of literature.","opts":["category or type","length","age","color"],a:"category or type"},
      {q:"The Hero's Journey begins with the hero in the _____.","opts":["ordinary world","special world","climax","return"],a:"ordinary world"},
      {q:"The 'Call to Adventure' stage in the Hero's Journey is when _____.","opts":["the hero is challenged to leave their comfort zone","the hero returns home","the hero defeats the villain","the hero finds a mentor"],a:"the hero is challenged to leave their comfort zone"},
      {q:"Comparing literature across cultures often reveals _____ themes.","opts":["shared universal","unique and isolated","unrelated","historical"],a:"shared universal"},
      {q:"A trickster archetype is a character who _____.","opts":["uses cunning and humor to challenge the status quo","follows all rules","is always the villain","never speaks"],a:"uses cunning and humor to challenge the status quo"},
      {q:"Magical realism blends _____ elements with realistic settings.","opts":["fantastical or magical","historical","scientific","grammatical"],a:"fantastical or magical"},
      {q:"Gabriel García Márquez is a famous author of _____.","opts":["magical realism","science fiction","romance","mystery"],a:"magical realism"},
      {q:"Comparative literature often examines how _____ shapes literary themes.","opts":["cultural context","page length","author's age","publication format"],a:"cultural context"},
      {q:"An epic hero is characterized by _____.","opts":["superhuman strength, bravery, and a long journey","cowardice","small scope of adventure","modern setting"],a:"superhuman strength, bravery, and a long journey"},
      {q:"Dystopian literature often critiques _____.","opts":["society and political systems","mathematics","grammar rules","cooking techniques"],a:"society and political systems"},
    ],
    "Rhetorical Analysis":[
      {q:"Rhetorical analysis examines HOW an author _____.","opts":["makes an argument","tells a joke","draws a picture","sings a song"],a:"makes an argument"},
      {q:"The rhetorical triangle includes speaker, audience, and _____.","opts":["message","setting","time","weather"],a:"message"},
      {q:"SOAPSTone stands for Speaker, Occasion, Audience, Purpose, Subject, _____.","opts":["Tone","Time","Text","Title"],a:"Tone"},
      {q:"Kairos refers to the _____ context of an argument.","opts":["timeliness / right moment","color","length","font"],a:"timeliness / right moment"},
      {q:"A rhetorical strategy is a technique used to _____.","opts":["persuade the audience","confuse the audience","bore the audience","ignore the audience"],a:"persuade the audience"},
      {q:"Analyzing rhetoric requires examining both content and _____.","opts":["style/delivery","cover page","bibliography","index"],a:"style/delivery"},
      {q:"In rhetorical analysis, 'exigence' is _____.","opts":["the urgent problem or situation that prompted the text","the audience","the author","the tone"],a:"the urgent problem or situation that prompted the text"},
      {q:"Rhetorical analysis asks: HOW does the author achieve their _____ with their audience?","opts":["purpose/effect","grammar","spelling","page count"],a:"purpose/effect"},
      {q:"Analyzing syntax means examining _____.","opts":["sentence structure and how it creates effect","vocabulary alone","punctuation only","paragraph length"],a:"sentence structure and how it creates effect"},
      {q:"A rhetorical analysis thesis should name the _____, technique, and purpose.","opts":["author/text","publisher","date","font"],a:"author/text"},
      {q:"The 'occasion' in SOAPSTone refers to _____.","opts":["the context or event that prompted the text","the author","the theme","the genre"],a:"the context or event that prompted the text"},
      {q:"When analyzing pathos, look for language that _____.","opts":["evokes emotions in the audience","provides statistics","cites authorities","builds logical chains"],a:"evokes emotions in the audience"},
      {q:"Style in rhetoric includes diction, syntax, tone, and _____.","opts":["figurative language","page numbers","citations","bibliography"],a:"figurative language"},
      {q:"An effective rhetorical analysis moves beyond summary to discuss _____.","opts":["the impact and effectiveness of the techniques","what the author said only","the author's biography","the historical period only"],a:"the impact and effectiveness of the techniques"},
      {q:"Parallel structure in rhetoric creates a sense of _____.","opts":["rhythm and emphasis","confusion","randomness","informality"],a:"rhythm and emphasis"},
    ],
    "College Essay":[
      {q:"A college essay should showcase your _____.","opts":["unique voice and personality","test scores","GPA","class rank"],a:"unique voice and personality"},
      {q:"The best college essays are _____.","opts":["authentic and specific","generic","very long","copied"],a:"authentic and specific"},
      {q:"'Show, don't tell' means using _____ details.","opts":["vivid, specific","vague","general","boring"],a:"vivid, specific"},
      {q:"A college essay prompt asks you to _____.","opts":["reflect and share your perspective","list achievements","write a research paper","summarize a book"],a:"reflect and share your perspective"},
      {q:"The opening of a college essay should _____.","opts":["grab the reader's attention","be boring","restate the prompt","list your grades"],a:"grab the reader's attention"},
      {q:"Revision is _____ for a strong college essay.","opts":["essential","optional","unnecessary","harmful"],a:"essential"},
      {q:"A college essay is typically _____ words long.","opts":["250–650","1000–2000","50–100","2000–5000"],a:"250–650"},
      {q:"The Common App essay asks you to share a story that _____.","opts":["illustrates who you are","summarizes your GPA","lists your clubs","describes your school"],a:"illustrates who you are"},
      {q:"Successful college essays focus on _____ over general statements.","opts":["a specific, concrete experience","broad achievements","test scores","grades"],a:"a specific, concrete experience"},
      {q:"A narrative hook in a college essay might start with _____.","opts":["an action scene, question, or striking detail","'My name is...'","'This essay will discuss...'","a summary of achievements"],a:"an action scene, question, or striking detail"},
      {q:"The tone of a college essay should be _____.","opts":["genuine and thoughtful","overly formal","boastful","apologetic"],a:"genuine and thoughtful"},
      {q:"Proofreading a college essay is important because _____.","opts":["errors distract from your message","mistakes are fine","grammar doesn't matter","length is all that counts"],a:"errors distract from your message"},
      {q:"A college essay should reveal _____ about you that isn't clear from the rest of your application.","opts":["something meaningful","your GPA","your test scores","your class rank"],a:"something meaningful"},
      {q:"The best approach to a college essay topic is to _____.","opts":["write about something personally meaningful to you","pick the most impressive sounding topic","write what you think admissions wants to hear","copy a sample essay"],a:"write about something personally meaningful to you"},
      {q:"Feedback from trusted readers helps you _____ your college essay.","opts":["improve and refine","make longer","add more achievements","change your voice"],a:"improve and refine"},
    ],
    "Satire & Irony":[
      {q:"Satire uses humor to _____.","opts":["criticize or mock","praise","ignore","hide"],a:"criticize or mock"},
      {q:"Verbal irony is when someone says the _____ of what they mean.","opts":["opposite","same","more","less"],a:"opposite"},
      {q:"Situational irony is when the outcome is _____ what was expected.","opts":["opposite of","exactly","similar to","unrelated to"],a:"opposite of"},
      {q:"Dramatic irony is when the audience knows something the _____ does not.","opts":["character","author","narrator","reader"],a:"character"},
      {q:`"A Modest Proposal" by Jonathan Swift is an example of _____.`,"opts":["satire","romance","mystery","comedy"],a:"satire"},
      {q:"Sarcasm is a form of _____ irony.","opts":["verbal","situational","dramatic","cosmic"],a:"verbal"},
      {q:"The targets of satire are often _____.","opts":["powerful institutions or social behaviors","ordinary people","children","nature"],a:"powerful institutions or social behaviors"},
      {q:"Parody imitates a work's style for _____ effect.","opts":["humorous or satirical","dramatic","serious","educational"],a:"humorous or satirical"},
      {q:"Cosmic irony suggests that _____ is indifferent or cruel to human desires.","opts":["fate or the universe","the author","the villain","the narrator"],a:"fate or the universe"},
      {q:"In 'Animal Farm,' the pigs represent _____.","opts":["corrupt political leaders","friendly farmers","honest workers","loyal citizens"],a:"corrupt political leaders"},
      {q:"Satire differs from comedy because satire _____.","opts":["has a critical purpose beyond just making people laugh","only seeks to entertain","avoids politics","uses no humor"],a:"has a critical purpose beyond just making people laugh"},
      {q:"Swift's 'A Modest Proposal' ironically suggests eating babies to _____.","opts":["expose the cruelty of English policies toward Ireland","literally solve poverty","entertain children","study cooking"],a:"expose the cruelty of English policies toward Ireland"},
      {q:"Understatement is the opposite of _____.","opts":["hyperbole","simile","metaphor","alliteration"],a:"hyperbole"},
      {q:"'The Simpsons' and 'South Park' are modern examples of _____ satire.","opts":["social/political","romantic","historical","academic"],a:"social/political"},
      {q:"Irony creates a gap between _____ and reality.","opts":["expectation/surface meaning","grammar","punctuation","page numbers"],a:"expectation/surface meaning"},
    ],
    "AP Lang Terms":[
      {q:"An antithesis presents _____ ideas in parallel structure.","opts":["contrasting","similar","random","unrelated"],a:"contrasting"},
      {q:"Chiasmus is a _____ of grammatical structures.","opts":["reversal","repetition","deletion","combination"],a:"reversal"},
      {q:"Synecdoche uses a _____ to represent the whole.","opts":["part","color","sound","shape"],a:"part"},
      {q:"Metonymy replaces a name with something _____ associated.","opts":["closely","loosely","never","rarely"],a:"closely"},
      {q:`"The pen is mightier than the sword" — "pen" is _____ for writing.`,"opts":["metonymy","simile","alliteration","onomatopoeia"],a:"metonymy"},
      {q:"Epistrophe is repetition at the _____ of successive clauses.","opts":["end","beginning","middle","random point"],a:"end"},
      {q:"Anaphora is repetition at the _____ of successive clauses.","opts":["beginning","end","middle","random point"],a:"beginning"},
      {q:`"Ask not what your country can do for you — ask what you can do for your country" is an example of _____.`,"opts":["chiasmus","anaphora","epistrophe","synecdoche"],a:"chiasmus"},
      {q:"Asyndeton is the omission of _____ between words or clauses.","opts":["conjunctions","commas","periods","nouns"],a:"conjunctions"},
      {q:"Polysyndeton is the use of _____ conjunctions than usual.","opts":["more","fewer","no","different"],a:"more"},
      {q:"Zeugma uses one word to _____ two or more other words.","opts":["govern or modify","replace","contradict","define"],a:"govern or modify"},
      {q:"Anadiplosis repeats the _____ word(s) of one clause at the _____ of the next.","opts":["last; beginning","first; end","middle; beginning","first; middle"],a:"last; beginning"},
      {q:"Litotes is a form of _____ that affirms by negating the opposite.","opts":["understatement","hyperbole","metaphor","simile"],a:"understatement"},
      {q:"'All hands on deck' — 'hands' is an example of _____.","opts":["synecdoche","metaphor","alliteration","metonymy"],a:"synecdoche"},
      {q:"Amplification _____ a previous statement for emphasis.","opts":["restates and expands","contradicts","removes","summarizes"],a:"restates and expands"},
    ],
    "Advanced Rhetoric":[
      {q:"Aristotle identified three rhetorical appeals: ethos, pathos, and _____.","opts":["logos","kairos","mythos","chronos"],a:"logos"},
      {q:"The Toulmin model of argument includes claim, evidence, and _____.","opts":["warrant","thesis","topic","theme"],a:"warrant"},
      {q:"A warrant connects the evidence to the _____.","opts":["claim","title","author","conclusion only"],a:"claim"},
      {q:"Rogerian argument seeks _____ ground.","opts":["common","higher","lower","no"],a:"common"},
      {q:"A concession acknowledges the _____ of the opposing view.","opts":["validity","weakness","irrelevance","humor"],a:"validity"},
      {q:"Effective rhetoric considers the audience's _____.","opts":["values and beliefs","age only","name","height"],a:"values and beliefs"},
      {q:"The Toulmin model's 'backing' provides _____ for the warrant.","opts":["support and foundation","contradiction","alternative claim","conclusion"],a:"support and foundation"},
      {q:"Rogerian argument was developed as a method for _____.","opts":["reducing conflict and finding mutual understanding","winning debates","defeating opponents","proving one side is right"],a:"reducing conflict and finding mutual understanding"},
      {q:"Classical rhetoric follows the structure: introduction, narration, partition, proof, refutation, and _____.","opts":["conclusion (peroration)","bibliography","appendix","abstract"],a:"conclusion (peroration)"},
      {q:"Dispositio in classical rhetoric refers to _____.","opts":["the arrangement/organization of arguments","the choice of words","the delivery","the content"],a:"the arrangement/organization of arguments"},
      {q:"Elocutio in classical rhetoric refers to _____.","opts":["style and word choice","arrangement","invention (finding arguments)","delivery"],a:"style and word choice"},
      {q:"A reductio ad absurdum argument shows that _____.","opts":["a premise leads to an absurd conclusion","evidence is strong","the claim is valid","the audience agrees"],a:"a premise leads to an absurd conclusion"},
      {q:"Kairos in rhetoric means using _____ to maximum rhetorical effect.","opts":["the right moment/context","emotional appeals","logical evidence","ethos"],a:"the right moment/context"},
      {q:"A strong rebuttal _____ the counterargument and then presents your counter.","opts":["acknowledges","ignores","copies","rewrites"],a:"acknowledges"},
      {q:"Rhetoric's 'five canons' include invention, arrangement, style, memory, and _____.","opts":["delivery","logic","evidence","conclusion"],a:"delivery"},
    ],
    "Research Paper":[
      {q:"A research paper requires _____ sources.","opts":["credible","any","no","fictional"],a:"credible"},
      {q:"An annotated bibliography includes a _____ of each source.","opts":["summary and evaluation","picture","graph","song"],a:"summary and evaluation"},
      {q:"A literature review surveys _____.","opts":["existing research on a topic","fiction books","newspapers only","magazines only"],a:"existing research on a topic"},
      {q:"Peer-reviewed articles are reviewed by _____.","opts":["experts in the field","the public","students","anyone"],a:"experts in the field"},
      {q:"APA and MLA are types of _____ styles.","opts":["citation","writing","reading","speaking"],a:"citation"},
      {q:"A counterargument _____ your paper when addressed effectively.","opts":["strengthens","weakens","destroys","ignores"],a:"strengthens"},
      {q:"APA format is commonly used in _____ fields.","opts":["social sciences and psychology","humanities and literature","business only","mathematics only"],a:"social sciences and psychology"},
      {q:"A research paper's introduction should include a _____ statement.","opts":["thesis","bibliography","conclusion","counterargument"],a:"thesis"},
      {q:"Synthesis in a research paper means _____.","opts":["combining information from multiple sources around your argument","copying from one source","listing quotes without analysis","summarizing only one text"],a:"combining information from multiple sources around your argument"},
      {q:"The IMRAD structure (Introduction, Methods, Results, Discussion) is used in _____ research papers.","opts":["scientific","literary","historical","creative"],a:"scientific"},
      {q:"Avoiding plagiarism requires _____ all sources.","opts":["citing","ignoring","deleting","copying"],a:"citing"},
      {q:"A research question should be _____.","opts":["specific and answerable through research","as broad as possible","already answered everywhere","purely opinion-based"],a:"specific and answerable through research"},
      {q:"The body of a research paper presents _____.","opts":["evidence and analysis supporting the thesis","only summaries","the author's personal opinions only","random facts"],a:"evidence and analysis supporting the thesis"},
      {q:"Paraphrasing requires _____.","opts":["restating in your own words AND citing the source","only restating in your own words","only citing the source","copying word for word"],a:"restating in your own words AND citing the source"},
      {q:"A strong conclusion in a research paper _____.","opts":["synthesizes the argument and suggests implications","introduces new evidence","repeats the introduction","lists all sources"],a:"synthesizes the argument and suggests implications"},
    ],
    "Literary Theory":[
      {q:"Feminist criticism examines _____.","opts":["gender roles and power","only female authors","only poetry","only novels"],a:"gender roles and power"},
      {q:"Marxist criticism focuses on _____.","opts":["social class and economics","grammar","rhythm","rhyme"],a:"social class and economics"},
      {q:"Psychoanalytic criticism explores characters' _____.","opts":["unconscious motivations","clothes","names","ages"],a:"unconscious motivations"},
      {q:"New Historicism considers the _____ context of literature.","opts":["historical and cultural","grammatical","numerical","visual"],a:"historical and cultural"},
      {q:"Reader-response theory focuses on the _____ interpretation.","opts":["reader's","author's","editor's","publisher's"],a:"reader's"},
      {q:"Formalism focuses on the text's _____ elements.","opts":["structural and literary","historical","biographical","cultural"],a:"structural and literary"},
      {q:"Postcolonial criticism examines _____.","opts":["the effects of colonialism on literature and culture","grammar rules","mathematical patterns","only European texts"],a:"the effects of colonialism on literature and culture"},
      {q:"Deconstruction challenges the idea that texts have _____ meaning.","opts":["fixed or stable","no","poetic","grammatical"],a:"fixed or stable"},
      {q:"The New Criticism approach focuses on _____.","opts":["close reading of the text itself (ignoring outside context)","biography","history","sociology"],a:"close reading of the text itself (ignoring outside context)"},
      {q:"Queer theory examines _____ in literature.","opts":["sexuality, gender identity, and non-normative experiences","only grammar","only plot","only setting"],a:"sexuality, gender identity, and non-normative experiences"},
      {q:"Archetypal criticism draws on _____ theory of universal patterns.","opts":["Carl Jung's","Sigmund Freud's","Karl Marx's","Jacques Derrida's"],a:"Carl Jung's"},
      {q:"Ecocriticism examines the relationship between _____ in literature.","opts":["nature/environment and human culture","class and economics","gender and power","colonization and resistance"],a:"nature/environment and human culture"},
      {q:"The Death of the Author (Barthes) argues that the _____ controls meaning.","opts":["reader","author","publisher","character"],a:"reader"},
      {q:"Structuralism analyzes literature by looking at _____.","opts":["underlying patterns and systems (like language structures)","individual emotions","historical context","biographical details"],a:"underlying patterns and systems (like language structures)"},
      {q:"Biographical criticism interprets literature through the lens of the _____.","opts":["author's life and experiences","reader's emotions","grammatical structure","market value"],a:"author's life and experiences"},
    ],
    "SAT Reading":[
      {q:"SAT Reading passages test your ability to _____.","opts":["comprehend and analyze texts","write essays","do math","draw pictures"],a:"comprehend and analyze texts"},
      {q:"Evidence-based questions ask you to _____ your answer.","opts":["support with text evidence","guess","skip","imagine"],a:"support with text evidence"},
      {q:"In SAT Reading, 'best evidence' means the lines that _____ your answer.","opts":["most directly support","contradict","are unrelated to","repeat"],a:"most directly support"},
      {q:"Paired passages require you to _____ two texts.","opts":["compare and analyze","ignore one","only read one","combine into one"],a:"compare and analyze"},
      {q:"Vocabulary in context questions ask for the meaning _____ used in the passage.","opts":["as","always","never","sometimes"],a:"as"},
      {q:"The main purpose question asks WHY the author _____.","opts":["wrote the passage","chose the title","used that font","lived there"],a:"wrote the passage"},
      {q:"SAT Reading passage types include literature, history/social studies, and _____.","opts":["science","math","art","music"],a:"science"},
      {q:"When answering SAT Reading questions, you should always _____ your answer in the passage.","opts":["find textual support for","guess from experience","infer from the title","copy from memory"],a:"find textual support for"},
      {q:"Command of evidence questions on the SAT ask which lines _____ the previous answer.","opts":["best support","contradict","are longest","use the most vocabulary"],a:"best support"},
      {q:"Informational graphics on the SAT Reading section should be read _____.","opts":["in conjunction with the passage text","instead of the passage","separately from the passage","after answering all questions"],a:"in conjunction with the passage text"},
      {q:"SAT Reading 'Words in Context' questions ask for the _____ meaning of a word.","opts":["contextual (how it's used in the passage)","dictionary definition always","most common meaning","literal meaning only"],a:"contextual (how it's used in the passage)"},
      {q:"When comparing paired passages on the SAT, look for _____.","opts":["agreements, disagreements, and different perspectives","only agreements","only differences","just summaries of each"],a:"agreements, disagreements, and different perspectives"},
      {q:"Process of elimination on SAT Reading means _____.","opts":["ruling out wrong answers to narrow your choices","guessing randomly","skipping hard questions","reading only the questions"],a:"ruling out wrong answers to narrow your choices"},
      {q:"The SAT Reading section rewards careful _____ of the passage.","opts":["analysis","memorization","copying","skipping"],a:"analysis"},
      {q:"For 'big picture' questions, read the _____ and first/last sentences of each paragraph.","opts":["introduction and conclusion","middle only","footnotes","title only"],a:"introduction and conclusion"},
    ],
    "College-Level Writing":[
      {q:"College-level writing requires _____ thinking.","opts":["critical","basic","no","simple"],a:"critical"},
      {q:"A strong thesis is _____ and arguable.","opts":["specific","vague","obvious","broad"],a:"specific"},
      {q:"Academic writing uses _____ person.","opts":["third","first","second","no"],a:"third"},
      {q:"Synthesis means combining _____ sources.","opts":["multiple","zero","one","fictional"],a:"multiple"},
      {q:"Proper citation avoids _____.","opts":["plagiarism","creativity","research","reading"],a:"plagiarism"},
      {q:"Revision focuses on _____ while proofreading focuses on _____.","opts":["content/structure; grammar/spelling","spelling; content","nothing; everything","grammar; ideas"],a:"content/structure; grammar/spelling"},
      {q:"Hedging language in academic writing (e.g., 'may,' 'suggests') shows _____.","opts":["appropriate academic caution","weakness","poor word choice","lack of knowledge"],a:"appropriate academic caution"},
      {q:"Integrating sources in college writing requires _____.","opts":["citation, context, and analysis — not just quotation dropping","only quotation marks","only a bibliography","just paraphrasing"],a:"citation, context, and analysis — not just quotation dropping"},
      {q:"A 'they say / I say' structure in academic writing means _____.","opts":["presenting an existing view, then responding with your own","only summarizing others","only stating your opinion","avoiding sources"],a:"presenting an existing view, then responding with your own"},
      {q:"Avoiding first-person in academic writing helps maintain _____.","opts":["objectivity and formality","a personal tone","creative expression","informality"],a:"objectivity and formality"},
      {q:"The purpose of a literature review in a college paper is to _____.","opts":["survey what scholars have already said about the topic","repeat your thesis","list your sources alphabetically","summarize only one article"],a:"survey what scholars have already said about the topic"},
      {q:"A college-level argument should move from evidence to _____ to conclusion.","opts":["analysis/interpretation","another quote","more evidence","the bibliography"],a:"analysis/interpretation"},
      {q:"Transitions between paragraphs show _____.","opts":["logical connections between ideas","page breaks","new topics","unrelated thoughts"],a:"logical connections between ideas"},
      {q:"College writing values _____ over length.","opts":["clarity, precision, and depth","length and volume","vocabulary complexity alone","number of sources"],a:"clarity, precision, and depth"},
      {q:"Peer review in college writing means _____.","opts":["getting feedback from classmates to improve your draft","reviewing peers' grades","submitting for a grade","proofreading for spelling only"],a:"getting feedback from classmates to improve your draft"},
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
// 4. QUESTION GENERATOR  (varied, high-quality questions per level)
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
  // Rotate through template arrays to vary phrasing
  const pick = (arr, i) => arr[Math.abs(i) % arr.length];

  if (level === "A") {
    const names=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"];
    const countEmojis = ["🍎","🌟","🐸","🦆","🎈","🐱","🍊","⭐","🌸","🐶"];
    const countTpls = [
      (n,e) => `How many ${e} do you see? ${e.repeat(n)}`,
      (n,e) => `Count the objects: ${e.repeat(n)}`,
      (n,e) => `${e.repeat(n)} — how many are there?`,
    ];
    for (let count = 1; count <= 20; count++) {
      const e = countEmojis[count % countEmojis.length];
      add("Counting 1-20","easy", pick(countTpls,count)(count,e), "input", null, count,
        `Say one number for each ${e}.`, `There are ${count} ${e}.`);
      const after = Math.min(count+1, 20);
      add("Counting 1-20","easy", `What number comes after ${count}?`, "multiple",
        shuffle([...new Set([after, Math.max(1,count-1), Math.min(20,count+2), count])].map(String)),
        String(after), `Count forward from ${count}.`, `After ${count} comes ${count+1}.`);
      if (count > 1) add("Counting 1-20","easy", `What number comes before ${count}?`, "multiple",
        shuffle([...new Set([count-1, count, Math.min(20,count+1), Math.max(1,count-2)])].map(String)),
        String(count-1), `Count backward from ${count}.`, `Before ${count} is ${count-1}.`);
    }

    const addTpls = [
      (a,b) => `${a} + ${b} = ?`,
      (a,b) => `You have ${a} apples and get ${b} more. How many in all?`,
      (a,b) => `${a} birds sit on a branch. ${b} more land. How many birds?`,
      (a,b) => `A bowl has ${a} oranges. Someone adds ${b} more. Total?`,
      (a,b) => `What is the sum of ${a} and ${b}?`,
    ];
    for (let a = 0; a <= 5; a++) for (let b = 0; b <= 5; b++) {
      if (a+b <= 10) {
        add("Simple Addition","easy", pick(addTpls, a+b*3)(a,b), "input", null, a+b,
          `Start at ${a}, count up ${b}.`, `${a} + ${b} = ${a+b}.`);
        if (a+b > 0) add("Simple Addition","medium", pick(addTpls, a*2+b)(a,b), "multiple",
          shuffle([...new Set([a+b, Math.max(0,a+b-1), a+b+1, a+b+2])].map(String)),
          String(a+b), `${a} + ${b} = ?`, `${a} + ${b} = ${a+b}.`);
      }
    }

    const subTpls = [
      (a,b) => `${a} - ${b} = ?`,
      (a,b) => `There are ${a} cookies. You eat ${b}. How many are left?`,
      (a,b) => `${a} kids play outside. ${b} go inside. How many stay?`,
      (a,b) => `You have ${a} stickers. You give ${b} away. How many remain?`,
      (a,b) => `What is ${a} minus ${b}?`,
    ];
    for (let a = 0; a <= 10; a++) for (let b = 0; b <= a; b++) {
      add("Simple Subtraction","easy", pick(subTpls, a+b*2)(a,b), "input", null, a-b,
        `Start at ${a}, count back ${b}.`, `${a} - ${b} = ${a-b}.`);
      if (a > 0 && b > 0) add("Simple Subtraction","medium", pick(subTpls, a*3+b)(a,b), "multiple",
        shuffle([...new Set([a-b, a+b, Math.max(0,a-b-1), a-b+1])].map(String)),
        String(a-b), `${a} - ${b} = ?`, `${a} - ${b} = ${a-b}.`);
    }

    for (let i = 1; i <= 20; i++) {
      add("Number Recognition","easy", `Which number is spelled "${names[i]}"?`, "multiple",
        shuffle([i, i>1?i-1:i+3, i<20?i+1:i-2, i<19?i+2:i-3].filter((v,_,s)=>v>=0&&v<=20&&s.indexOf(v)===s.indexOf(v)).slice(0,4).map(String)),
        String(i), `"${names[i]}" = ${i}`, `${names[i]} = ${i}.`);
      add("Number Recognition","easy", `How do you write ${i} in words?`, "multiple",
        shuffle([names[i], names[Math.max(0,i-1)], names[Math.min(20,i+1)], names[Math.max(0,i-2)]].filter((v,idx,s)=>s.indexOf(v)===idx)),
        names[i], `The number ${i} in words.`, `${i} = "${names[i]}".`);
    }

    const cmpTpls = [
      (a,b) => `${a} __ ${b}  (pick <, >, or =)`,
      (a,b) => `Compare ${a} and ${b}: choose <, >, or =`,
      (a,b) => `Which symbol fits between ${a} and ${b}?`,
    ];
    for (let a = 1; a <= 10; a++) for (let b = 1; b <= 10; b++) {
      const sym = a<b?"<":a>b?">":"=";
      add("Comparing Quantities","medium", pick(cmpTpls, a+b)(a,b), "multiple", ["<",">","="], sym,
        `${a} is ${a<b?"less than":a>b?"greater than":"equal to"} ${b}.`, `${a} ${sym} ${b}.`);
    }

    const patColors = ["🔴","🔵","🟡","🟢","🟠","🟣"];
    for (let i = 0; i < 20; i++) {
      const c1=patColors[i%6], c2=patColors[(i+2)%6], c3=patColors[(i+4)%6];
      add("Patterns","easy", `What comes next? ${c1}${c2}${c1}${c2}${c1}__`, "multiple",
        shuffle([c2,c1,c3,"⚫"]), c2, `Pattern: ${c1}${c2} repeating.`, `${c1}${c2} repeats → next is ${c2}.`);
      add("Patterns","medium", `What comes next? ${c1}${c2}${c3}${c1}${c2}__`, "multiple",
        shuffle([c3,c1,c2,"⚫"]), c3, `Pattern: ${c1}${c2}${c3} repeating.`, `Three-part pattern → next is ${c3}.`);
      add("Patterns","medium", `${c1}${c1}${c2}${c1}${c1}${c2}${c1}${c1}__ What's next?`, "multiple",
        shuffle([c2,c1,c3,"⚫"]), c2, `Double ${c1} then ${c2}.`, `Pattern: ${c1}${c1}${c2} → next is ${c2}.`);
    }

    const shapeData=[["triangle","3","3 sides"],["square","4","4 equal sides"],["rectangle","4","2 long and 2 short sides"],["circle","0","no sides, perfectly round"],["pentagon","5","5 sides"],["hexagon","6","6 sides"]];
    const shapeTpls = [
      ([name,sides]) => [`How many sides does a ${name} have?`, sides],
      ([name,sides]) => [`A ${name} has how many sides?`, sides],
      ([name,sides,desc]) => [`Which shape has ${sides==="0"?"no":sides} sides and is ${desc}?`, name],
    ];
    shapeData.forEach((shape, si) => {
      for (let ti = 0; ti < 3; ti++) {
        const [q, ans] = shapeTpls[ti](shape);
        const numOpts = ["0","3","4","5","6"];
        const nameOpts = shapeData.map(s=>s[0]);
        const opts = ti < 2 ? shuffle(numOpts).slice(0,4) : shuffle(nameOpts).slice(0,4);
        if (!opts.includes(String(ans))) opts[0] = String(ans);
        add("Basic Shapes","easy", q, "multiple", shuffle(opts), String(ans),
          `A ${shape[0]} has ${shape[1]} sides.`, `${shape[0]} → ${shape[1]} sides.`);
      }
    });

    const ordinals=["first","second","third","fourth","fifth"];
    const letters=["A","B","C","D","E"];
    for (let i=1; i<=5; i++) {
      add("Ordinal Numbers","easy", `Which letter is ${ordinals[i-1]}? A  B  C  D  E`, "multiple",
        ["A","B","C","D","E"], letters[i-1], `Count to position ${i}.`, `${ordinals[i-1]} = position ${i} → ${letters[i-1]}.`);
      add("Ordinal Numbers","easy", `What position is letter ${letters[i-1]} in: A B C D E?`, "multiple",
        ordinals.slice(0,5), ordinals[i-1], `Count from the left.`, `${letters[i-1]} is ${ordinals[i-1]}.`);
    }
  }

  if (level === "B") {
    const pvTpls = [
      (t,o,num) => `In the number ${num}, what is the tens digit?`,
      (t,o,num) => `${num} has ___ tens. How many?`,
      (t,o,num) => `What digit is in the tens place of ${num}?`,
      (t,o,num) => `Break apart ${num}: ___ tens and ${o} ones.`,
    ];
    for (let t=1; t<=9; t++) for (let o=0; o<=9; o++) {
      const num = t*10+o;
      add("Place Value Tens & Ones","easy", pick(pvTpls, t+o)(t,o,num), "input", null, t,
        `${num} = ${t} tens + ${o} ones.`, `Tens digit = ${t}.`);
      add("Place Value Tens & Ones","easy", `In ${num}, what is the ones digit?`, "input", null, o,
        `${num} = ${t} tens + ${o} ones.`, `Ones digit = ${o}.`);
      add("Place Value Tens & Ones","medium", `${t} tens and ${o} ones = what number?`, "input", null, num,
        `Tens × 10 + ones.`, `${t}×10 + ${o} = ${num}.`);
    }

    const addFTpls = [
      (a,b) => `${a} + ${b} = ?`,
      (a,b) => `What is the sum of ${a} and ${b}?`,
      (a,b) => `? + ${b} = ${a+b}`,
      (a,b) => `${a} + ? = ${a+b}`,
    ];
    const addWordB = [
      (a,b) => `A library has ${a} picture books and ${b} chapter books. How many books total?`,
      (a,b) => `${a} children play inside and ${b} play outside. How many children in all?`,
      (a,b) => `You score ${a} points in game 1 and ${b} points in game 2. Total points?`,
      (a,b) => `There are ${a} red crayons and ${b} blue crayons. How many crayons altogether?`,
      (a,b) => `${a} frogs sit on a log. ${b} more hop on. How many frogs?`,
    ];
    for (let a=0; a<=10; a++) for (let b=0; b<=10; b++) {
      if (a+b<=20) {
        add("Addition Facts to 20","easy", pick(addFTpls, a+b)(a,b), "input", null, a+b,
          a===9 ? `Make ten: 9+1=10, then add ${b-1} more.` : b===0 ? `${a}+0=${a}` : `Start at ${a}, count up ${b}.`,
          `${a} + ${b} = ${a+b}.`);
        if (a > 0 && b > 0) add("Addition Facts to 20","medium", pick(addWordB, a+b)(a,b), "input", null, a+b,
          `${a} + ${b} = ?`, `${a}+${b}=${a+b}.`);
      }
      if (a>=b) {
        add("Subtraction Facts to 20","easy", `${a} - ${b} = ?`, "input", null, a-b,
          `Think: ${b} + ? = ${a}.`, `${a} - ${b} = ${a-b}.`);
        add("Subtraction Facts to 20","medium", `${a} - ? = ${a-b}`, "input", null, b,
          `Reverse: ${a-b} + ? = ${a}.`, `${a} - ${b} = ${a-b}.`);
      }
    }

    for (let s=2; s<=18; s+=2) add("Skip Counting","easy",`Count by 2s: ${s}, ${s+2}, ${s+4}, ___, ${s+8}`,"input",null,s+6,"Add 2 each step.",`${s+6}.`);
    for (let s=5; s<=45; s+=5) add("Skip Counting","easy",`Count by 5s: ${s}, ${s+5}, ___, ${s+15}`,"input",null,s+10,"Add 5 each step.",`${s+10}.`);
    for (let s=10; s<=80; s+=10) add("Skip Counting","easy",`Count by 10s: ${s}, ___, ${s+20}`,"input",null,s+10,"Add 10 each step.",`${s+10}.`);
    add("Skip Counting","medium","Count by 2s: 2, 4, 6, 8, ___","multiple",shuffle(["10","12","9","11"]),"10","Add 2 each time.","Next is 10.");
    add("Skip Counting","medium","Count by 5s: 5, 10, 15, ___, 25","multiple",shuffle(["20","15","25","18"]),"20","Add 5 each time.","Missing is 20.");
    add("Skip Counting","medium","Count by 10s: 10, 20, 30, ___, 50","multiple",shuffle(["40","35","45","30"]),"40","Add 10 each time.","Missing is 40.");

    const cmpBTpls = [
      (a,b) => `${a} vs ${b}: <, >, or =?`,
      (a,b) => `Which symbol fits: ${a} ___ ${b}?`,
      (a,b) => `Compare: ${a} and ${b}. Use <, >, or =.`,
    ];
    for (let a=10; a<=99; a+=11) for (let b=10; b<=99; b+=13) {
      add("Comparing Numbers","medium", pick(cmpBTpls, a+b)(a,b), "multiple", ["<",">","="],
        a<b?"<":a>b?">":"=", `Compare tens digits first.`, `${a} ${a<b?"<":a>b?">":"="} ${b}.`);
    }

    const timeTpls = [
      (h) => `Hour hand on ${h}, minute hand on 12. Time?`,
      (h) => `The clock shows the hour hand at ${h} and minute hand at 12. What time?`,
    ];
    const halfTpls = [
      (h) => `Hour hand between ${h} and ${h===12?1:h+1}, minute hand at 6. Time?`,
      (h) => `It is half past ${h}. Write the time.`,
    ];
    for (let h=1; h<=12; h++) {
      add("Time","medium", pick(timeTpls, h)(h), "multiple",
        shuffle([`${h}:00`,`${h}:30`,`${h===12?1:h+1}:00`,`${h>1?h-1:12}:30`]),
        `${h}:00`, "Minute hand at 12 = on the hour.", `${h}:00.`);
      add("Time","medium", pick(halfTpls, h)(h), "multiple",
        shuffle([`${h}:30`,`${h}:00`,`${h===12?1:h+1}:00`,`${h>1?h-1:12}:30`]),
        `${h}:30`, "Minute hand at 6 = half past (:30).", `${h}:30.`);
    }
    add("Time","easy","How many minutes are in one hour?","multiple",["60","30","100","45"],"60","There are 60 minutes per hour.","60 minutes = 1 hour.");
    add("Time","easy","How many hours are in one day?","multiple",["24","12","48","7"],"24","Day + night together.","24 hours in a day.");
    add("Time","easy","How many days are in one week?","multiple",["7","5","14","10"],"7","Monday through Sunday.","7 days in a week.");

    const fracTpls = [
      (num,d) => `A shape has ${d} equal parts. ${num} part${num>1?"s are":" is"} shaded. Write the fraction.`,
      (num,d) => `A pizza is cut into ${d} equal slices. You eat ${num}. What fraction did you eat?`,
      (num,d) => `${num} out of ${d} equal parts are colored. Write this as a fraction.`,
    ];
    for (let d=2; d<=8; d++) for (let num=1; num<d; num++) {
      add("Basic Fractions","easy", pick(fracTpls, num+d)(num,d), "input", null, `${num}/${d}`,
        "Shaded ÷ Total.", `${num}/${d}.`);
      add("Basic Fractions","medium", `Which fraction is LARGER: 1/${d} or 1/${d+1}?`, "multiple",
        [`1/${d}`,`1/${d+1}`,"They are equal"], `1/${d}`,
        "Larger denominator = smaller pieces.", `1/${d} > 1/${d+1}.`);
    }

    const wpB = [
      [10,4,"A baker bakes 10 muffins, then 4 more. Total muffins?",14,"add"],
      [15,6,"15 birds are on a wire. 6 fly off. How many remain?",9,"sub"],
      [8,7,"8 boys and 7 girls play soccer. Players total?",15,"add"],
      [12,5,"You have $12 and spend $5. How much is left?",7,"sub"],
      [9,6,"9 cats and 6 dogs are at the shelter. Animals total?",15,"add"],
      [20,8,"20 balloons at a party. 8 pop. How many are left?",12,"sub"],
      [6,4,"6 oranges in a bowl, 4 more added. How many now?",10,"add"],
      [13,7,"13 players on a team. 7 sit out. How many play?",6,"sub"],
      [5,3,"A shelf has 5 books. 3 more are placed on it. Total?",8,"add"],
      [11,4,"11 ducks on a pond. 4 swim away. How many left?",7,"sub"],
    ];
    wpB.forEach(([a,b,q,ans,op]) => {
      add("Word Problems","medium", q, "input", null, ans,
        `${a} ${op==="add"?"+":"-"} ${b} = ?`, `${ans}.`);
    });
  }

  if (level === "C") {
    const pv3Tpls = [
      (h,t,o,num) => `What is the hundreds digit in ${num}?`,
      (h,t,o,num) => `In ${num}, how many complete hundreds are there?`,
      (h,t,o,num) => `${num} = ___ hundreds + ${t} tens + ${o} ones.`,
      (h,t,o,num) => `What digit is in the hundreds place of ${num}?`,
    ];
    let pv3Count = 0;
    for (let h=1; h<=9; h++) for (let t=0; t<=9; t++) for (let o=0; o<=9; o++) {
      const num=h*100+t*10+o;
      if (pv3Count < 200) {
        add("Place Value to 1000","easy", pick(pv3Tpls, pv3Count)(h,t,o,num), "input", null, h,
          `H|T|O = ${h}|${t}|${o}.`, `Hundreds digit = ${h}.`);
        add("Place Value to 1000","medium", `${h} hundreds + ${t} tens + ${o} ones = ?`, "input", null, num,
          `${h*100} + ${t*10} + ${o}.`, `${num}.`);
        add("Place Value to 1000","medium", `What is the value of the tens digit in ${num}?`, "input", null, t*10,
          `Tens digit × 10.`, `${t} × 10 = ${t*10}.`);
        pv3Count++;
      }
    }

    const addRTpls = [
      (a,b) => `${a} + ${b} = ?`,
      (a,b) => `What is ${a} + ${b}?`,
      (a,b) => `A store has ${a} red shirts and ${b} blue shirts. How many shirts total?`,
      (a,b) => `Day 1: ${a} visitors. Day 2: ${b} visitors. Total visitors?`,
      (a,b) => `Add ${a} and ${b}.`,
    ];
    for (let a=11; a<=99; a+=6) for (let b=11; b<=99; b+=8) {
      if (pool.filter(q=>q.theme==="Addition with Regrouping").length < 150)
        add("Addition with Regrouping","medium", pick(addRTpls, a+b)(a,b), "input", null, a+b,
          `Add ones (${a%10}+${b%10}), carry if needed. Then add tens.`, `${a+b}.`);
    }

    const subBTpls = [
      (a,b) => `${a} - ${b} = ?`,
      (a,b) => `What is ${a} minus ${b}?`,
      (a,b) => `A school has ${a} students. ${b} are absent. How many are present?`,
      (a,b) => `You start with $${a} and spend $${b}. How much do you have left?`,
    ];
    for (let a=20; a<=99; a+=7) for (let b=10; b<a; b+=9) {
      if (pool.filter(q=>q.theme==="Subtraction with Borrowing").length < 150)
        add("Subtraction with Borrowing","medium", pick(subBTpls, a+b)(a,b), "input", null, a-b,
          `Borrow from the tens column if needed.`, `${a-b}.`);
    }

    const mulCTpls = [
      (a,b) => `${a} × ${b} = ?`,
      (a,b) => `${a} groups of ${b} equals?`,
      (a,b) => `${a} bags each have ${b} apples. Total apples?`,
      (a,b) => `${a} children each have ${b} crayons. How many crayons in all?`,
      (a,b) => `A rectangle has ${a} rows and ${b} columns. Total squares?`,
    ];
    for (let a=2; a<=5; a++) for (let b=2; b<=12; b++) {
      add("Intro Multiplication","easy", pick(mulCTpls, a+b)(a,b), "input", null, a*b,
        `${a} groups of ${b}: ${Array(a).fill(b).join("+")} = ?`, `${a*b}.`);
      add("Intro Multiplication","medium", `? × ${b} = ${a*b}`, "input", null, a,
        `How many groups of ${b} make ${a*b}?`, `${a} × ${b} = ${a*b}.`);
    }

    const eoTpls = [
      (n) => `Is ${n} even or odd?`,
      (n) => `${n} — even or odd?`,
      (n) => `Can ${n} objects be split into two equal groups with none left over?`,
    ];
    for (let n=1; n<=50; n++) {
      const isEven = n%2===0;
      add("Even and Odd","easy", pick(eoTpls, n)(n), "multiple", ["Even","Odd"], isEven?"Even":"Odd",
        `Even: ends in 0,2,4,6,8. Odd: ends in 1,3,5,7,9.`, `${n} ends in ${n%10} → ${isEven?"even":"odd"}.`);
    }
    add("Even and Odd","medium","What is the sum of two even numbers — even or odd?","multiple",["Even","Odd","Can be either"],"Even","Even + Even = Even.","Even (e.g., 4+6=10).");
    add("Even and Odd","medium","What is the sum of two odd numbers — even or odd?","multiple",["Even","Odd","Can be either"],"Even","Odd + Odd = Even.","Even (e.g., 3+5=8).");

    const coinVals=[["penny",1],["nickel",5],["dime",10],["quarter",25]];
    const coinTpls = [
      (c,name,val) => `${c} ${name}${c>1?"s":""} = how many cents?`,
      (c,name,val) => `You have ${c} ${name}${c>1?"s":""}. What is the total value in cents?`,
      (c,name,val) => `Count: ${c} ${name}${c>1?"s":""}. Total value?`,
    ];
    coinVals.forEach(([name,val]) => {
      for (let c=1; c<=8; c++)
        add("Money","easy", pick(coinTpls, c)(c,name,val), "input", null, c*val,
          `1 ${name} = ${val}¢.`, `${c}×${val} = ${c*val}¢.`);
    });
    const moneyWordC = [
      [25,10,"A quarter plus a dime equals how many cents?",35],
      [10,5,"A dime plus a nickel equals how many cents?",15],
      [25,5,"A quarter plus a nickel. Total cents?",30],
      [25,25,"Two quarters. How many cents?",50],
      [50,25,"You have 50¢ and receive a quarter. Total?",75],
      [100,75,"You pay $1.00 for something that costs 75¢. Change?",25],
    ];
    moneyWordC.forEach(([a,b,q,ans]) => {
      add("Money","medium", q, "input", null, ans, "Add or subtract coins.", `${ans}¢.`);
    });
    for (let a=10; a<=99; a+=11) for (let b=5; b<a; b+=13) {
      if (pool.filter(q=>q.theme==="Money"&&q.difficulty==="medium").length < 80)
        add("Money","medium", `You have ${a}¢ and spend ${b}¢. How much change?`, "input", null, a-b,
          `${a} − ${b} = ?`, `${a-b}¢.`);
    }

    const rndCTpls = [
      (n,r) => `Round ${n} to the nearest 10.`,
      (n,r) => `What is ${n} rounded to the nearest 10?`,
      (n,r) => `Estimate ${n} by rounding to the nearest 10.`,
    ];
    for (let a=5; a<=95; a+=5) {
      const r=Math.round(a/10)*10;
      add("Rounding","easy", pick(rndCTpls, a)(a,r), "input", null, r,
        `Ones digit is ${a%10}. ${a%10>=5?"≥5 → round up":"<5 → round down"}.`, `${r}.`);
    }

    for (let a=2; a<=9; a++) for (let b=1; b<=a; b++) {
      add("Fractions","easy", `Write ${b} out of ${a} equal parts as a fraction.`, "input", null, `${b}/${a}`,
        "Parts shaded / Total equal parts.", `${b}/${a}.`);
      if (b < a) add("Fractions","medium", `Which is greater: ${b}/${a} or ${b}/${a+1}?`, "multiple",
        [`${b}/${a}`, `${b}/${a+1}`, "They are equal"], `${b}/${a}`,
        "Same numerator — smaller denominator = bigger piece.", `${b}/${a} > ${b}/${a+1}.`);
    }
  }

  if (level === "D") {
    const mulTTpls = [
      (a,b) => `${a} × ${b} = ?`,
      (a,b) => `What is ${a} times ${b}?`,
      (a,b) => `Multiply: ${a} × ${b}`,
      (a,b) => `${b} added ${a} times equals?`,
    ];
    const mulWordD = [
      (a,b) => `${a} students each have ${b} pencils. How many pencils in all?`,
      (a,b) => `A carton holds ${b} eggs. How many eggs in ${a} cartons?`,
      (a,b) => `${a} shelves each hold ${b} books. Total books?`,
      (a,b) => `${a} bags each contain ${b} marbles. Total marbles?`,
    ];
    for (let a=1; a<=10; a++) for (let b=1; b<=10; b++) {
      add("Multiplication Tables","easy", pick(mulTTpls, a+b)(a,b), "input", null, a*b,
        `Skip count by ${b}, ${a} times.`, `${a*b}.`);
      add("Multiplication Tables","medium", `? × ${b} = ${a*b}`, "input", null, a,
        `${b} × ? = ${a*b}.`, `${a}.`);
      if (a > 1 && b > 1 && pool.filter(q=>q.theme==="Multiplication Tables"&&q.type==="multiple").length < 80)
        add("Multiplication Tables","medium", pick(mulWordD, a+b)(a,b), "multiple",
          shuffle([...new Set([a*b, a*b+b, Math.max(1,a*b-b), a*b+a])].map(String)),
          String(a*b), `${a} × ${b} = ?`, `${a*b}.`);
    }

    const divTpls = [
      (a,b) => `${a*b} ÷ ${b} = ?`,
      (a,b) => `Divide ${a*b} by ${b}.`,
      (a,b) => `Share ${a*b} items equally among ${b} people. Each gets?`,
      (a,b) => `${a*b} cookies split into groups of ${b}. How many groups?`,
      (a,b) => `${b} friends share ${a*b} stickers equally. How many each?`,
    ];
    for (let a=1; a<=10; a++) for (let b=2; b<=10; b++) {
      add("Division Basics","easy", pick(divTpls, a+b)(a,b), "input", null, a,
        `${b} × ? = ${a*b}.`, `${a*b} ÷ ${b} = ${a}.`);
      if (pool.filter(q=>q.theme==="Division Basics"&&q.difficulty==="medium").length < 100)
        add("Division Basics","medium", `${a*b} ÷ ? = ${a}`, "input", null, b,
          `What number × ${a} = ${a*b}?`, `${a*b} ÷ ${b} = ${a}.`);
    }

    const areaTpls = [
      (l,w) => `Rectangle: length ${l}, width ${w}. Find the area.`,
      (l,w) => `A room is ${l} m long and ${w} m wide. What is the area?`,
      (l,w) => `A garden measures ${l} by ${w} feet. Area?`,
    ];
    const periTpls = [
      (l,w) => `Rectangle: length ${l}, width ${w}. Find the perimeter.`,
      (l,w) => `A fence surrounds a ${l}×${w} yard. How much fencing is needed?`,
      (l,w) => `A picture frame is ${l} in. by ${w} in. Perimeter?`,
    ];
    for (let l=2; l<=15; l++) for (let w=2; w<=10; w++) {
      if (pool.filter(q=>q.theme==="Area and Perimeter").length < 300) {
        add("Area and Perimeter","easy", pick(areaTpls, l+w)(l,w), "input", null, l*w,
          "A = length × width.", `${l}×${w} = ${l*w} sq units.`);
        add("Area and Perimeter","easy", pick(periTpls, l+w)(l,w), "input", null, 2*(l+w),
          "P = 2×(length + width).", `2×(${l}+${w}) = ${2*(l+w)}.`);
      }
    }
    add("Area and Perimeter","medium","A square has side 7. Find its area.","input",null,49,"Area = side × side.","7² = 49 sq units.");
    add("Area and Perimeter","medium","A square has side 6. Find its perimeter.","input",null,24,"P = 4 × side.","4×6 = 24 units.");

    const rndDTpls = [
      (n,r) => `Round ${n} to the nearest 10.`,
      (n,r) => `What is ${n} rounded to the nearest 10?`,
    ];
    for (let n=5; n<=995; n+=8) {
      const r10=Math.round(n/10)*10, r100=Math.round(n/100)*100;
      if (pool.filter(q=>q.theme==="Rounding").length < 150) {
        add("Rounding","easy", pick(rndDTpls, n)(n, r10), "input", null, r10,
          `Ones digit (${n%10}): ${n%10>=5?"≥5 → round up":"<5 → round down"}.`, `${r10}.`);
        add("Rounding","medium", `Round ${n} to the nearest 100.`, "input", null, r100,
          `Tens digit (${Math.floor(n/10)%10}): ${Math.floor(n/10)%10>=5?"≥5 → round up":"<5 → round down"}.`, `${r100}.`);
      }
    }

    for (let d=2; d<=12; d++) for (let num=1; num<d; num++) {
      const g=gcd(num,d);
      add("Fractions","easy", `Write a fraction: ${num} shaded out of ${d} total.`, "input", null, `${num}/${d}`,
        "Shaded ÷ Total.", `${num}/${d}.`);
      if (g>1) add("Equivalent Fractions","medium", `Simplify ${num}/${d}.`, "input", null, `${num/g}/${d/g}`,
        `GCF(${num},${d}) = ${g}. Divide numerator and denominator by ${g}.`, `${num/g}/${d/g}.`);
      add("Equivalent Fractions","easy", `Is ${num}/${d} equal to ${num*2}/${d*2}?`, "multiple", ["Yes","No"], "Yes",
        "Multiply top and bottom by 2 — same value.", `${num}/${d} = ${num*2}/${d*2}. Yes.`);
      if (num < d-1)
        add("Fractions","medium", `Which is bigger: ${num}/${d} or ${num+1}/${d}?`, "multiple",
          [`${num}/${d}`, `${num+1}/${d}`, "They are equal"], `${num+1}/${d}`,
          "Same denominator: larger numerator = larger fraction.", `${num+1}/${d} > ${num}/${d}.`);
    }
  }

  if (level === "E") {
    const mulMDTpls = [
      (a,b) => `${a} × ${b} = ?`,
      (a,b) => `Multiply ${a} by ${b}.`,
      (a,b) => `${a} boxes each hold ${b} items. Total items?`,
      (a,b) => `${b} packs of ${a} cards. How many cards?`,
    ];
    for (let a=10; a<=99; a+=11) for (let b=2; b<=9; b++) {
      if (pool.filter(q=>q.theme==="Multi-Digit Multiplication").length < 200)
        add("Multi-Digit Multiplication","medium", pick(mulMDTpls, a+b)(a,b), "input", null, a*b,
          "Multiply ones digit first, then tens. Carry if needed.", `${a*b}.`);
    }
    for (let a=100; a<=999; a+=37) for (let b=2; b<=9; b++) {
      if (pool.filter(q=>q.theme==="Multi-Digit Multiplication").length < 350)
        add("Multi-Digit Multiplication","hard", `${a} × ${b} = ?`, "input", null, a*b,
          "Work column by column from right to left.", `${a*b}.`);
    }

    const ldTpls = [
      (d,q) => `${d*q} ÷ ${d} = ?`,
      (d,q) => `Divide ${d*q} by ${d}.`,
      (d,q) => `${d*q} students split into groups of ${d}. How many groups?`,
      (d,q) => `${d} friends share ${d*q} marbles equally. How many each?`,
    ];
    for (let divisor=2; divisor<=9; divisor++) for (let quotient=10; quotient<=99; quotient+=7) {
      if (pool.filter(q=>q.theme==="Long Division").length < 200)
        add("Long Division","medium", pick(ldTpls, divisor+quotient)(divisor,quotient), "input", null, quotient,
          `${divisor} × ? = ${divisor*quotient}.`, `${quotient}.`);
    }

    const primeTpls = [
      (n,ip) => `Is ${n} prime or composite?`,
      (n,ip) => `Does ${n} have factors other than 1 and itself?`,
      (n,ip) => `Can ${n} be divided evenly by any number besides 1 and ${n}?`,
    ];
    for (let n=2; n<=60; n++) {
      const isPrime = n>1 && !Array.from({length:n-2},(_,i)=>i+2).some(f=>n%f===0);
      add("Prime and Composite","easy", pick(primeTpls, n)(n, isPrime), "multiple", ["Prime","Composite"],
        isPrime?"Prime":"Composite",
        isPrime ? `Only divisible by 1 and ${n}.` : `Can be divided by other numbers too.`,
        isPrime ? `${n} is prime.` : `${n} is composite.`);
    }
    add("Prime and Composite","medium","Which of these is prime?","multiple",["9","15","17","21"],"17","Try dividing 17 by 2, 3, 5... none work.","17 has no factors besides 1 and 17.");
    add("Prime and Composite","medium","Which of these is composite?","multiple",["2","3","5","9"],"9","9 = 3 × 3.","9 is divisible by 3.");
    add("Prime and Composite","medium","How many primes are between 1 and 10?","multiple",["3","4","5","6"],"4","List: 2, 3, 5, 7.","4 primes: 2, 3, 5, 7.");
    add("Prime and Composite","medium","Is 1 a prime number?","multiple",["Yes","No"],"No","Primes must have exactly 2 distinct factors.","1 has only one factor. It is neither prime nor composite.");

    for (let d=2; d<=12; d++) for (let n=1; n<d; n++) {
      if (pool.filter(q=>q.theme==="Fraction Operations").length < 200) {
        const s2=2*n, g2=gcd(s2,d);
        const sumStr = s2<d ? `${s2}/${d}` : s2===d ? "1" : `${s2/g2}/${d/g2}`;
        add("Fraction Operations","easy", `${n}/${d} + ${n}/${d} = ?`, "input", null, sumStr,
          "Same denominator: add numerators.", `${sumStr}.`);
        if (n<d-1) add("Fraction Operations","easy", `${n+1}/${d} - ${n}/${d} = ?`, "input", null, `1/${d}`,
          "Same denominator: subtract numerators.", `1/${d}.`);
        add("Fraction Operations","medium", `${n}/${d} + 1/${d} = ?`, "input", null,
          (()=>{const s=n+1,g=gcd(s,d);return s<d?`${s}/${d}`:s===d?"1":`${s/g}/${d/g}`;})(),
          "Add the numerators.", "Simplified result.");
      }
    }

    const decTpls = [
      (num,d) => `Write ${num}/${d} as a decimal.`,
      (num,d) => `Convert the fraction ${num}/${d} to a decimal.`,
      (num,d) => `${num} divided by ${d} as a decimal?`,
    ];
    for (let d of [10,100]) for (let num=1; num<d; num+=d===10?1:7) {
      if (pool.filter(q=>q.theme==="Decimals").length < 200)
        add("Decimals","easy", pick(decTpls, num)(num,d), "input", null, (num/d).toFixed(d===10?1:2),
          `${d===10?"Tenths":"Hundredths"}: divide by ${d}.`, `${(num/d).toFixed(d===10?1:2)}.`);
    }
    for (let a=1.0; a<=9.9; a+=0.4) {
      const b=parseFloat((a+1.2).toFixed(1));
      if (pool.filter(q=>q.theme==="Decimals"&&q.difficulty==="medium").length < 80)
        add("Decimals","medium", `${a.toFixed(1)} + ${b.toFixed(1)} = ?`, "input", null,
          (a+b).toFixed(1).replace(/\.0$/,""), "Line up the decimal points and add.", `${(a+b).toFixed(1)}.`);
    }
    add("Decimals","medium","Which is greater: 0.6 or 0.59?","multiple",["0.6","0.59","They are equal"],"0.6","0.6 = 0.60. Compare: 0.60 > 0.59.","0.6.");
    add("Decimals","medium","Round 4.67 to the nearest tenth.","input",null,"4.7","Hundredths digit 7 ≥ 5, round up.","4.7.");
    add("Decimals","easy","Round 3.14 to the nearest tenth.","input",null,"3.1","Hundredths digit 4 < 5, round down.","3.1.");
    add("Decimals","medium","Order least to greatest: 0.5, 0.25, 0.75, 0.1","input",null,"0.1, 0.25, 0.5, 0.75","Compare digits after the decimal.","0.1 < 0.25 < 0.5 < 0.75.");
  }

  if (level === "F") {
    const mulFTpls = [
      (a,b,c,d) => `${a}/${b} × ${c}/${d} = ?`,
      (a,b,c,d) => `Multiply: ${a}/${b} × ${c}/${d}`,
      (a,b,c,d) => `A recipe needs ${a}/${b} cup. You make ${c}/${d} of the recipe. How much do you need?`,
    ];
    for (let a=1; a<=9; a++) for (let b=1; b<=9; b++) for (let c=1; c<=5; c++) for (let d=1; d<=5; d++) {
      if (pool.filter(q=>q.theme==="Multiply Fractions").length < 250) {
        const n2=a*c, d2=b*d, g=gcd(n2,d2);
        add("Multiply Fractions","medium", pick(mulFTpls, a+b+c+d)(a,b,c,d), "input", null,
          g>1?`${n2/g}/${d2/g}`:`${n2}/${d2}`,
          "Multiply tops together, multiply bottoms together. Then simplify.", "Simplified result.");
      }
    }

    const divFTpls = [
      (a,b,c,d) => `${a}/${b} ÷ ${c}/${d} = ?`,
      (a,b,c,d) => `Divide: ${a}/${b} ÷ ${c}/${d}`,
      (a,b,c,d) => `How many ${c}/${d}s fit into ${a}/${b}?`,
    ];
    for (let a=1; a<=9; a++) for (let b=1; b<=9; b++) for (let c=1; c<=5; c++) for (let d=1; d<=5; d++) {
      if (pool.filter(q=>q.theme==="Divide Fractions").length < 250) {
        const n2=a*d, d2=b*c, g=gcd(n2,d2);
        add("Divide Fractions","medium", pick(divFTpls, a+b+c+d)(a,b,c,d), "input", null,
          g>1?`${n2/g}/${d2/g}`:`${n2}/${d2}`,
          "Keep-Change-Flip: multiply by the reciprocal.", "Simplified result.");
      }
    }

    const pairs=[[1.5,2.3],[4.7,2.1],[8.25,3.14],[0.6,0.4],[12.5,3.5],[7.1,2.9],[5.55,1.45],[3.75,1.25],[9.0,1.5],[6.4,2.6]];
    const decOpTpls = [
      (a,b,op) => `${a} ${op} ${b} = ?`,
      (a,b,op) => op==="+"?`A rope is ${a}m. Another is ${b}m. Total length?`:op==="-"?`You have $${a}. You spend $${b}. How much is left?`:`A ${a} kg bag costs $${b} per kg. Total cost?`,
    ];
    pairs.forEach(([a,b],i) => {
      add("Decimal Operations","easy", pick(decOpTpls, i)(a,b,"+"), "input", null, parseFloat((a+b).toFixed(3)).toString(), "Line up decimal points and add.", `${parseFloat((a+b).toFixed(3))}.`);
      add("Decimal Operations","easy", pick(decOpTpls, i+1)(a,b,"-"), "input", null, parseFloat((a-b).toFixed(3)).toString(), "Line up decimal points and subtract.", `${parseFloat((a-b).toFixed(3))}.`);
      add("Decimal Operations","medium", `${a} × ${b} = ?`, "input", null, parseFloat((a*b).toFixed(4)).toString(), "Multiply as whole numbers, then count decimal places.", `${parseFloat((a*b).toFixed(4))}.`);
    });

    const pow10Tpls = [
      (m,e) => `${m} × 10^${e} = ?`,
      (m,e) => `Multiply ${m} by 10 to the power of ${e}.`,
      (m,e) => `Move the decimal ${e} place${e>1?"s":""} right from ${m}.`,
    ];
    for (let exp=1; exp<=6; exp++) for (let m=1; m<=9; m++) {
      if (pool.filter(q=>q.theme==="Powers of 10").length < 100) {
        add("Powers of 10","easy", pick(pow10Tpls, exp+m)(m,exp), "input", null, m*Math.pow(10,exp),
          `Move decimal ${exp} place${exp>1?"s":""} right.`, `${m*Math.pow(10,exp)}.`);
        add("Powers of 10","medium", `${m*Math.pow(10,exp)} ÷ 10^${exp} = ?`, "input", null, m,
          `Move decimal ${exp} place${exp>1?"s":""} left.`, `${m}.`);
      }
    }

    const opsQ=[
      ["2+3×4",14,"Multiply before adding: 2+(3×4)=2+12."],
      ["(5+3)×2",16,"Parentheses first: 8×2."],
      ["20÷4+3×2",11,"Divide and multiply first: 5+6."],
      ["10-(2+3)",5,"Parentheses first: 10-5."],
      ["(8-3)×4",20,"Parentheses first: 5×4."],
      ["6+2×(4-1)",12,"Parentheses first: 6+2×3=6+6."],
      ["18÷(2+1)+5",11,"Parentheses first: 18÷3+5=6+5."],
      ["4²-3×2",10,"Exponents first: 16-6."],
      ["5×(2+3)-4",21,"Parentheses first: 5×5-4=25-4."],
      ["3²+4÷2",11,"Exponents first: 9+2."],
      ["(12-4)÷(2+2)",2,"Both parentheses: 8÷4."],
      ["7+3×(5-2)",16,"Parentheses first: 7+3×3=7+9."],
    ];
    opsQ.forEach(([expr,ans,exp]) => {
      add("Order of Operations","medium", `${expr} = ?`, "input", null, ans, "PEMDAS: Parentheses → Exponents → Multiply/Divide → Add/Subtract.", exp);
    });

    const volTpls = [
      (l,w,h) => `Rectangular box: ${l}×${w}×${h}. Find the volume.`,
      (l,w,h) => `A fish tank: length ${l}, width ${w}, height ${h}. Volume?`,
      (l,w,h) => `A box holds items in a ${l}×${w}×${h} space. How many cubic units?`,
    ];
    for (let l=1; l<=8; l++) for (let w=1; w<=8; w++) for (let h=1; h<=6; h++) {
      if (pool.filter(q=>q.theme==="Volume").length < 150)
        add("Volume","medium", pick(volTpls, l+w+h)(l,w,h), "input", null, l*w*h,
          "V = length × width × height.", `${l*w*h} cubic units.`);
    }

    const negTpls = [
      (n) => `Which is greater: ${n} or ${n+1}?`,
      (n) => `On a number line, which is farther right: ${n} or ${n+1}?`,
    ];
    for (let n=-10; n<=10; n++) {
      add("Negative Numbers","easy", pick(negTpls, n+11)(n), "multiple", [String(n), String(n+1)], String(n+1),
        "Numbers increase going right on a number line.", `${n+1} > ${n}.`);
      if (n!==0) add("Negative Numbers","easy", `What is the opposite of ${n}?`, "input", null, -n,
        "Same distance from 0, opposite side.", `Opposite of ${n} is ${-n}.`);
    }
    add("Negative Numbers","medium","The temperature is -5°C. It drops 3 more degrees. New temperature?","input",null,-8,"−5 + (−3) = ?","−8°C.");
    add("Negative Numbers","medium","What is -4 + 7?","input",null,3,"Start at -4, move 7 right on the number line.","3.");
    add("Negative Numbers","medium","What is 3 - 8?","input",null,-5,"3 - 8 goes into negatives.","−5.");
  }

  if (level === "G") {
    const ratioTpls = [
      (a,b) => `Simplify the ratio ${a}:${b}.`,
      (a,b) => `A recipe uses ${a} cups of flour and ${b} cups of sugar. Simplest form of flour:sugar?`,
      (a,b) => `For every ${a} boys there are ${b} girls. Simplest form of the ratio?`,
      (a,b) => `Reduce the ratio ${a} to ${b}.`,
    ];
    for (let a=1; a<=20; a++) for (let b=1; b<=20; b++) {
      if (pool.filter(q=>q.theme==="Ratios and Rates").length < 200) {
        const g=gcd(a,b);
        add("Ratios and Rates","easy", pick(ratioTpls, a+b)(a,b), "input", null, `${a/g}:${b/g}`,
          `GCF(${a},${b}) = ${g}. Divide both sides.`, `${a/g}:${b/g}.`);
      }
    }
    const rateTpls = [
      (d,t) => `A car travels ${d} miles in ${t} hours. Speed in mph?`,
      (d,t) => `${d} km in ${t} hours. Average speed?`,
      (d,t) => `A runner covers ${d} meters in ${t} seconds. Speed?`,
    ];
    for (let dist of [60,90,120,150,200,250,300]) for (let time of [2,3,4,5,6]) {
      if (pool.filter(q=>q.theme==="Ratios and Rates"&&q.difficulty==="medium").length < 80)
        add("Ratios and Rates","medium", pick(rateTpls, dist+time)(dist,time), "input", null, dist/time,
          "Speed = distance ÷ time.", `${dist/time} units per time.`);
    }
    add("Ratios and Rates","medium","If 4 apples cost $2, how much do 10 apples cost?","input",null,5,"Unit rate: $2÷4=$0.50 per apple. 10×$0.50=?","$5.");
    add("Ratios and Rates","medium","A car uses 2 gallons per 50 miles. Gallons for 150 miles?","input",null,6,"50 miles = 2 gal → 150 miles = 6 gal.","6 gallons.");

    const pctTpls = [
      (p,w) => `${p}% of ${w} = ?`,
      (p,w) => `Find ${p}% of ${w}.`,
      (p,w) => `A store discounts a $${w} item by ${p}%. How much is the discount?`,
      (p,w) => `${p}% of ${w} students passed the test. How many students?`,
    ];
    for (let p=5; p<=95; p+=5) for (let w of [20,40,50,60,80,100,120,200]) {
      if (pool.filter(q=>q.theme==="Percent").length < 300) {
        const part=Math.round(p/100*w);
        add("Percent","easy", pick(pctTpls, p+w)(p,w), "input", null, part,
          `${p}% = ${p/100}. Multiply: ${p/100} × ${w}.`, `${part}.`);
      }
    }
    for (let part=5; part<=60; part+=5) for (let whole of [20,25,50,60,80,100]) {
      if (part<whole && pool.filter(q=>q.theme==="Percent"&&q.difficulty==="medium").length < 120)
        add("Percent","medium", `${part} is what percent of ${whole}?`, "input", null, Math.round(part/whole*100),
          `(${part} ÷ ${whole}) × 100.`, `${Math.round(part/whole*100)}%.`);
    }
    add("Percent","medium","A jacket costs $80. It's 25% off. Sale price?","input",null,60,"Discount = 25% × $80 = $20. Price = $80 - $20.","$60.");
    add("Percent","medium","You answer 17 of 20 questions correctly. Percent correct?","input",null,85,"(17÷20)×100.","85%.");
    add("Percent","medium","Sales tax is 8% on a $50 purchase. Total cost?","input",null,54,"Tax = 8% × $50 = $4. Total = $50 + $4.","$54.");

    for (let x=-10; x<=10; x++) {
      add("Absolute Value","easy", `|${x}| = ?`, "input", null, Math.abs(x),
        "Absolute value = distance from 0 on the number line.", `|${x}| = ${Math.abs(x)}.`);
    }
    add("Absolute Value","medium","Which is greater: |-8| or |5|?","multiple",["|−8|","|5|","They are equal"],"|−8|","|-8| = 8, |5| = 5.","|-8| = 8 > 5.");
    add("Absolute Value","medium","Solve: |x| = 6","input",null,"6 or -6","Both 6 and -6 are 6 units from 0.","x = 6 or x = -6.");

    const eq1Tpls = [
      (b,x) => `x + ${b} = ${x+b}. Solve for x.`,
      (b,x) => `A number plus ${b} equals ${x+b}. Find the number.`,
      (m,x) => `${m}x = ${m*x}. Solve.`,
      (b,x) => `x - ${b} = ${x-b}. Solve.`,
    ];
    for (let m=1; m<=10; m++) for (let b=1; b<=20; b++) {
      const x=Math.floor(Math.random()*8)+1;
      if (pool.filter(q=>q.theme==="One-Step Equations").length < 150) {
        add("One-Step Equations","medium", pick(eq1Tpls, m+b)(b,x), "input", null, x,
          `Subtract ${b} from both sides.`, `x = ${x}.`);
        add("One-Step Equations","medium", `${m}x = ${m*x}. Solve.`, "input", null, x,
          `Divide both sides by ${m}.`, `x = ${x}.`);
        add("One-Step Equations","medium", `x - ${b} = ${x-b}. Solve.`, "input", null, x,
          `Add ${b} to both sides.`, `x = ${x}.`);
      }
    }

    const statTpls = [
      (data) => `Quiz scores: ${data.join(", ")}. Find the mean.`,
      (data) => `Heights (cm): ${data.join(", ")}. Mean?`,
      (data) => `Temperatures: ${data.join(", ")}°. Mean temperature?`,
      (data) => `Data set: ${data.join(", ")}. Find the average.`,
    ];
    for (let i=0; i<30; i++) {
      const data=Array.from({length:5},()=>Math.floor(Math.random()*20)+1);
      const sorted=[...data].sort((a,b)=>a-b);
      const sum=data.reduce((s,v)=>s+v,0);
      add("Statistics","medium", pick(statTpls, i)(data), "input", null, (sum/5).toFixed(1),
        `Sum all values (${sum}), divide by ${data.length}.`, `${sum}÷5=${(sum/5).toFixed(1)}.`);
      add("Statistics","medium", `Median of: ${data.join(", ")}`, "input", null, sorted[2],
        "Sort first, then pick the middle value.", `Sorted: ${sorted.join(", ")}. Middle = ${sorted[2]}.`);
      add("Statistics","easy", `Range of: ${data.join(", ")}`, "input", null, sorted[4]-sorted[0],
        "Range = max − min.", `${sorted[4]} − ${sorted[0]} = ${sorted[4]-sorted[0]}.`);
    }
    add("Statistics","medium","The mean of 4 numbers is 10. Three are 8, 12, 10. What is the 4th?","input",null,10,"Sum = 4×10 = 40. 40 - 8 - 12 - 10 = ?","10.");
    add("Statistics","medium","Data: 3, 7, 7, 9, 14. What is the mode?","input",null,7,"Mode = value that appears most often.","7 appears twice.");
  }

  if (level === "H") {
    const propTpls = [
      (k,x) => `y = kx. If k=${k} and x=${x}, find y.`,
      (k,x) => `A car travels at ${k} mph. How far in ${x} hours?`,
      (k,x) => `Constant of proportionality is ${k}. When x=${x}, y=?`,
    ];
    for (let k=1; k<=10; k++) for (let x=1; x<=10; x++) {
      const y=k*x;
      if (pool.filter(q=>q.theme==="Proportional Relationships").length < 150) {
        add("Proportional Relationships","easy", pick(propTpls, k+x)(k,x), "input", null, y,
          `y = ${k} × ${x}.`, `y = ${y}.`);
        if (x<10) add("Proportional Relationships","medium",
          `y/x is constant. y=${y} when x=${x}. Find y when x=${x+1}.`, "input", null, k*(x+1),
          `k = ${y}/${x} = ${k}. y = ${k} × ${x+1}.`, `${k*(x+1)}.`);
      }
    }

    const pctChgTpls = [
      (orig,pct) => `A price increases ${pct}% from $${orig}. New price?`,
      (orig,pct) => `A population of ${orig} grows by ${pct}%. New population?`,
      (orig,pct) => `$${orig} earns ${pct}% interest. New total?`,
    ];
    for (let orig=10; orig<=200; orig+=10) for (let chgPct=10; chgPct<=50; chgPct+=10) {
      const newV=Math.round(orig*(1+chgPct/100));
      const decV=Math.round(orig*(1-chgPct/100));
      if (pool.filter(q=>q.theme==="Percent Change").length < 150) {
        add("Percent Change","medium", pick(pctChgTpls, orig+chgPct)(orig,chgPct), "input", null, newV,
          `New = original × (1 + ${chgPct/100}).`, `$${newV}.`);
        add("Percent Change","medium", `$${orig} decreases to $${decV}. Percent decrease?`, "input", null, chgPct,
          `(${orig} − ${decV}) ÷ ${orig} × 100.`, `${chgPct}%.`);
      }
    }
    add("Percent Change","medium","A shirt was $40, now $30. Percent decrease?","input",null,25,"(40-30)/40 × 100.","25%.");
    add("Percent Change","medium","A stock rises from $50 to $65. Percent increase?","input",null,30,"(65-50)/50 × 100.","30%.");

    const ratNumTpls = [
      (a,b) => `${a} + (${b}) = ?`,
      (a,b) => `What is ${a} + ${b}?`,
      (a,b) => b<0 ? `Temperature is ${a}°. It drops ${Math.abs(b)}°. New temp?` : `Start at ${a} on a number line, move ${b} right. Result?`,
    ];
    for (let a=-10; a<=10; a++) for (let b=-10; b<=10; b++) {
      if (pool.filter(q=>q.theme==="Rational Numbers").length < 200) {
        add("Rational Numbers","easy", pick(ratNumTpls, a+b+20)(a,b), "input", null, a+b,
          "Use number line: right=+, left=−.", `${a+b}.`);
        add("Rational Numbers","easy", `${a} × (${b}) = ?`, "input", null, a*b,
          "Same signs → positive. Different signs → negative.", `${a*b}.`);
      }
    }
    add("Rational Numbers","medium","(-3) × (-4) = ?","input",null,12,"Negative × Negative = Positive.","12.");
    add("Rational Numbers","medium","-18 ÷ 3 = ?","input",null,-6,"Negative ÷ Positive = Negative.","-6.");
    add("Rational Numbers","medium","-2/3 + 1/3 = ?","input",null,"-1/3","Same denominator: −2+1 = −1.","-1/3.");

    for (let m=1; m<=8; m++) for (let b2=1; b2<=15; b2++) {
      const x=Math.floor(Math.random()*9)+1;
      if (pool.filter(q=>q.theme==="Two-Step Equations").length < 200) {
        add("Two-Step Equations","medium", `${m}x + ${b2} = ${m*x+b2}. Solve.`, "input", null, x,
          `Subtract ${b2}: ${m}x=${m*x}. Divide by ${m}.`, `x = ${x}.`);
        add("Two-Step Equations","medium", `${m}x - ${b2} = ${m*x-b2}. Solve.`, "input", null, x,
          `Add ${b2}: ${m}x=${m*x}. Divide by ${m}.`, `x = ${x}.`);
        add("Two-Step Equations","hard", `A number doubled and then reduced by ${b2} gives ${2*x-b2}. Find the number.`, "input", null, x,
          `2x - ${b2} = ${2*x-b2}. Add ${b2}, then divide by 2.`, `x = ${x}.`);
      }
    }

    const circTpls = [
      (r) => `Circle, radius=${r}. Find the circumference. (π≈3.14)`,
      (r) => `A circular track has radius ${r} m. One lap distance? (π≈3.14)`,
    ];
    const circATpls = [
      (r) => `Circle, radius=${r}. Find the area. (π≈3.14)`,
      (r) => `A circular garden: radius=${r} m. Area? (π≈3.14)`,
    ];
    for (let r=1; r<=20; r++) {
      add("Circles","easy", pick(circTpls, r)(r), "input", null, (2*3.14*r).toFixed(2), "C = 2πr.", `2×3.14×${r}=${(2*3.14*r).toFixed(2)}.`);
      add("Circles","easy", pick(circATpls, r)(r), "input", null, (3.14*r*r).toFixed(2), "A = πr².", `3.14×${r}²=${(3.14*r*r).toFixed(2)}.`);
    }
    add("Circles","medium","A circle has diameter 10. What is its radius?","input",null,5,"radius = diameter ÷ 2.","5.");
    add("Circles","medium","A circle has circumference ≈ 31.4. Radius? (π≈3.14)","input",null,5,"r = C ÷ (2π) = 31.4 ÷ 6.28.","5.");

    for (let i=0; i<30; i++) {
      const outcomes=[4,6,8,10,12];
      const total=outcomes[i%outcomes.length];
      const fav=(i%total)+1;
      const g=gcd(fav,total);
      add("Probability","medium", `A bag has ${total} marbles; ${fav} are red. P(red)?`, "input", null, `${fav/g}/${total/g}`,
        "P = favorable ÷ total.", `${fav}/${total} = ${fav/g}/${total/g}.`);
    }
    add("Probability","medium","A coin is flipped. P(heads)?","multiple",["1/2","1/4","1","0"],"1/2","1 outcome of 2 total.","1/2.");
    add("Probability","medium","Roll a 6-sided die. P(even)?","multiple",["1/2","1/3","2/3","1/6"],"1/2","Even: {2,4,6} = 3 out of 6.","1/2.");
    add("Probability","medium","P(impossible event) = ?","multiple",["0","1","1/2","0.5"],"0","An impossible event never occurs.","0.");
    add("Probability","medium","P(certain event) = ?","multiple",["0","1","1/2","0.5"],"1","A certain event always occurs.","1.");
  }

  if (level === "I") {
    for (let a=1; a<=8; a++) for (let b=1; b<=15; b++) {
      const x=Math.floor(Math.random()*7)+2;
      if (pool.filter(q=>q.theme==="Multi-Step Equations").length < 250) {
        add("Multi-Step Equations","medium", `${a}x + ${b} = ${a*x+b}. Solve.`, "input", null, x,
          `Subtract ${b}, then divide by ${a}.`, `x = ${x}.`);
        add("Multi-Step Equations","hard", `${a}(x + ${b}) = ${a*(x+b)}. Solve.`, "input", null, x,
          `Divide by ${a}: x + ${b} = ${x+b}. Subtract ${b}.`, `x = ${x}.`);
        if (a > 1) add("Multi-Step Equations","hard", `${a}x + ${b} = ${a*(x-1)+b} + ${a}. Solve.`, "input", null, x,
          "Simplify right side first, then solve.", `x = ${x}.`);
      }
    }

    const pts=[[0,0,4,8],[1,2,3,6],[0,1,5,6],[2,3,6,8],[0,-2,3,4],[-1,0,2,3],[1,3,4,9],[0,0,3,-6],[2,5,6,13]];
    const slopeTpls = [
      ([x1,y1,x2,y2]) => `Find the slope between (${x1},${y1}) and (${x2},${y2}).`,
      ([x1,y1,x2,y2]) => `A line passes through (${x1},${y1}) and (${x2},${y2}). What is its slope?`,
      ([x1,y1,x2,y2]) => `Rise over run from (${x1},${y1}) to (${x2},${y2})?`,
    ];
    pts.forEach(([x1,y1,x2,y2],i) => {
      const rise=y2-y1, run=x2-x1;
      if (run!==0) {
        const g=gcd(Math.abs(rise),Math.abs(run));
        const slopeStr = rise%run===0 ? String(rise/run) : `${rise/g}/${run/g}`;
        add("Slope","medium", pick(slopeTpls, i)([x1,y1,x2,y2]), "input", null, slopeStr,
          `m = (y₂−y₁)/(x₂−x₁) = (${y2}−${y1})/(${x2}−${x1}).`, `m = ${slopeStr}.`);
        add("Slope-Intercept Form","medium",
          `Line through (${x1},${y1}), slope = ${slopeStr}. Find y-intercept.`, "input", null,
          y1-parseFloat(slopeStr)*x1, `y=mx+b → ${y1}=${slopeStr}×${x1}+b.`, `b = ${y1-parseFloat(slopeStr)*x1}.`);
      }
    });
    add("Slope","medium","A line through (0,0) and (3,6). Slope?","input",null,2,"m = (6-0)/(3-0).","m = 2.");
    add("Slope","medium","A horizontal line has slope ___?","input",null,0,"No rise → slope = 0.","0.");
    add("Slope","medium","A vertical line has slope that is ___?","multiple",["undefined","0","1","-1"],"undefined","Vertical lines have no defined slope.","undefined.");

    for (let x=1; x<=6; x++) for (let y=1; y<=6; y++) {
      if (pool.filter(q=>q.theme==="Systems of Equations").length < 120) {
        add("Systems of Equations","hard", `x + y = ${x+y} and x − y = ${x-y}. Find x.`, "input", null, x,
          "Add equations: 2x = ? Divide by 2.", `x = ${x}.`);
        add("Systems of Equations","hard", `x + y = ${x+y} and x − y = ${x-y}. Find y.`, "input", null, y,
          "Once you have x, substitute back.", `y = ${y}.`);
        add("Systems of Equations","hard", `2x + y = ${2*x+y} and x + y = ${x+y}. Find x.`, "input", null, x,
          "Subtract second eq from first: x = ?", `x = ${x}.`);
      }
    }

    const pythTriples=[[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15],[7,24,25],[20,21,29]];
    const pythTpls = [
      ([a,b,c]) => `Right triangle, legs ${a} and ${b}. Hypotenuse?`,
      ([a,b,c]) => `A ladder ${c} ft long leans against a wall. Its base is ${a} ft away. How high does it reach?`,
    ];
    pythTriples.forEach(([a,b,c],i) => {
      for (let j=0; j<3; j++) {
        add("Pythagorean Theorem","easy", pick(pythTpls, j)([a,b,c]), "input", null, j===1?b:c,
          `a²+b²=c²: ${a}²+${b}²=${a*a+b*b}.`, j===1?`b = ${b}.`:`c = ${c}.`);
        add("Pythagorean Theorem","medium", `Hypotenuse ${c}, one leg ${a}. Find the other leg.`, "input", null, b,
          `b²=c²−a²=${c*c}−${a*a}=${c*c-a*a}.`, `b = ${b}.`);
      }
    });
    add("Pythagorean Theorem","medium","Is a triangle with sides 5, 5, 7 a right triangle?","multiple",["Yes","No"],"No","5²+5²=50 ≠ 7²=49.","No — not exactly equal.");

    const funcTpls = [
      (m,b2,x) => `f(x) = ${m}x + ${b2}. Find f(${x}).`,
      (m,b2,x) => `If f(x) = ${m}x + ${b2}, what is f(${x})?`,
      (m,b2,x) => `Evaluate f(${x}) where f(x) = ${m}x + ${b2}.`,
    ];
    for (let m=1; m<=5; m++) for (let b2=0; b2<=8; b2++) for (let x=0; x<=10; x++) {
      if (pool.filter(q=>q.theme==="Functions").length < 120)
        add("Functions","easy", pick(funcTpls, m+b2+x)(m,b2,x), "input", null, m*x+b2,
          `Substitute x = ${x}.`, `${m}(${x})+${b2} = ${m*x+b2}.`);
    }
    add("Functions","medium","Is {(1,2),(2,4),(3,4)} a function?","multiple",["Yes","No"],"Yes","Each x has exactly one y value.","Yes.");
    add("Functions","medium","Is {(1,2),(1,3),(2,4)} a function?","multiple",["Yes","No"],"No","x=1 maps to both 2 and 3.","No — one input has two outputs.");

    const sciTpls = [
      (m,e,big) => `Write ${big.toLocaleString()} in scientific notation.`,
      (m,e,big) => `Express ${big.toLocaleString()} as m × 10ⁿ where 1 ≤ m < 10.`,
    ];
    for (let e=1; e<=6; e++) for (let m2=1; m2<=9; m2++) {
      if (pool.filter(q=>q.theme==="Scientific Notation").length < 80) {
        const big=m2*Math.pow(10,e);
        add("Scientific Notation","medium", pick(sciTpls, e+m2)(m2,e,big), "input", null, `${m2}×10^${e}`,
          "Move decimal until 1 ≤ m < 10.", `${m2}×10^${e}.`);
      }
    }
    add("Scientific Notation","medium","3.2×10^4 = ?","input",null,32000,"Move decimal 4 places right.","32,000.");
    add("Scientific Notation","medium","0.00056 in scientific notation?","input",null,"5.6×10^-4","Move decimal right until 1≤m<10.","5.6×10^−4.");
  }

  if (level === "J") {
    const linTpls = [
      (m,b2,x,rhs) => `${m}x + ${b2} = ${rhs}. Solve for x.`,
      (m,b2,x,rhs) => `Solve: ${m}x + ${b2} = ${rhs}`,
      (m,b2,x,rhs) => `A number times ${m}, plus ${b2}, equals ${rhs}. Find it.`,
    ];
    for (let m=1; m<=10; m++) for (let b2=1; b2<=20; b2++) {
      const x=Math.floor(Math.random()*10)+1;
      if (pool.filter(q=>q.theme==="Linear Equations").length < 250) {
        add("Linear Equations","medium", pick(linTpls, m+b2)(m,b2,x,m*x+b2), "input", null, x,
          `Subtract ${b2}, divide by ${m}.`, `x = ${x}.`);
        add("Linear Equations","medium", `${m}x − ${b2} = ${m*x-b2}. Solve.`, "input", null, x,
          `Add ${b2}, divide by ${m}.`, `x = ${x}.`);
        add("Linear Equations","hard", `${m}(x + ${b2}) = ${m*(x+b2)}. Solve.`, "input", null, x,
          `Divide by ${m}: x+${b2}=${x+b2}.`, `x = ${x}.`);
      }
    }

    const graphTpls = [
      (m,b2) => `y = ${m}x + ${b2}. What is the slope?`,
      (m,b2) => `For the line y = ${m}x ${b2>=0?`+ ${b2}`:`− ${Math.abs(b2)}`}, identify the slope.`,
      (m,b2) => `y = ${m}x + ${b2}. What is the y-intercept?`,
    ];
    for (let m=1; m<=8; m++) for (let b2=-10; b2<=10; b2++) {
      if (pool.filter(q=>q.theme==="Graphing Lines").length < 150) {
        add("Graphing Lines","easy", `y = ${m}x + ${b2}. Slope?`, "input", null, m,
          "y=mx+b: m is the slope.", `Slope = ${m}.`);
        add("Graphing Lines","easy", `y = ${m}x + ${b2}. y-intercept?`, "input", null, b2,
          "y=mx+b: b is the y-intercept.", `y-intercept = ${b2}.`);
        add("Graphing Lines","medium", `Write the equation of a line: slope=${m}, y-intercept=${b2}.`, "input", null, `y=${m}x+${b2}`,
          "Use y = mx + b form.", `y=${m}x+${b2}.`);
      }
    }
    add("Graphing Lines","medium","Parallel lines have ___ slopes.","multiple",["equal","different","opposite","undefined"],"equal","Parallel lines never intersect.","Equal slopes.");
    add("Graphing Lines","medium","A line has slope 2. A perpendicular line has slope ___?","input",null,"-1/2","Perpendicular: m₁×m₂ = −1.","−1/2.");

    const quadTpls = [
      (b3,c3) => `Solve: x² ${b3>=0?`+ ${b3}`:b3}x ${c3>=0?`+ ${c3}`:c3} = 0.`,
      (b3,c3) => `Find the roots: x² ${b3>=0?`+ ${b3}`:b3}x ${c3>=0?`+ ${c3}`:c3} = 0.`,
      (b3,c3) => `Factor and solve: x² ${b3>=0?`+ ${b3}`:b3}x ${c3>=0?`+ ${c3}`:c3} = 0.`,
    ];
    for (let r1=-5; r1<=5; r1++) for (let r2=-5; r2<=5; r2++) {
      if (pool.filter(q=>q.theme==="Quadratics").length < 200 && r1<=r2) {
        const b3=-(r1+r2), c3=r1*r2;
        if (Math.abs(b3)<=10 && Math.abs(c3)<=20)
          add("Quadratics","hard", pick(quadTpls, r1+r2+10)(b3,c3), "input", null,
            r1===r2?`${r1}`:`${Math.min(r1,r2)} and ${Math.max(r1,r2)}`,
            `Factor: find two numbers ×to ${c3} and +to ${b3}.`,
            r1===r2?`x = ${r1}.`:`x = ${r1} or x = ${r2}.`);
      }
    }
    add("Quadratics","hard","What is the vertex of y = x² - 4x + 3?","input",null,"(2,-1)","x = -b/(2a) = 2. y = 4-8+3.","(2, -1).");
    add("Quadratics","medium","The parabola y = x² opens which way?","multiple",["Upward","Downward"],"Upward","Positive leading coefficient.","Upward.");

    const polyTpls = [
      (a,b2,c,d) => `(${a}x + ${b2}) + (${c}x + ${d}) = ?`,
      (a,b2,c,d) => `Add the polynomials: (${a}x + ${b2}) + (${c}x + ${d})`,
    ];
    for (let a=1; a<=5; a++) for (let b2=0; b2<=8; b2++) for (let c=0; c<=5; c++) for (let d=0; d<=8; d++) {
      if (pool.filter(q=>q.theme==="Polynomials").length < 100) {
        add("Polynomials","medium", pick(polyTpls, a+b2+c+d)(a,b2,c,d), "input", null,
          `${a+c}x + ${b2+d}`, "Combine like terms.", `${a+c}x + ${b2+d}.`);
        if (a > c) add("Polynomials","medium", `(${a}x + ${b2}) - (${c}x + ${d}) = ?`, "input", null,
          `${a-c}x + ${b2-d}`.replace("+ -","- "), "Subtract like terms.", `${a-c}x + ${b2-d}.`);
      }
    }

    for (let r=-4; r<=4; r++) for (let s=-4; s<=4; s++) {
      if (pool.filter(q=>q.theme==="Factoring").length < 100 && r!==s && r!==0 && s!==0) {
        const b3=r+s, c3=r*s;
        if (Math.abs(b3)<=8 && Math.abs(c3)<=16)
          add("Factoring","medium", `Factor: x² ${b3>=0?`+ ${b3}x`:b3+"x"} ${c3>=0?`+ ${c3}`:c3}.`, "input", null,
            `(x${r>=0?"+"+r:r})(x${s>=0?"+"+s:s})`,
            `Find two numbers that multiply to ${c3} and add to ${b3}.`, `(x+${r})(x+${s}).`);
      }
    }

    const expFTpls = [
      (base,x) => `y = ${base}^x. When x = ${x}, y = ?`,
      (base,x) => `Evaluate ${base}^${x}.`,
      (base,x) => `A population starts at 1 and multiplies by ${base} each year. After ${x} years?`,
    ];
    for (let base=2; base<=4; base++) for (let x=0; x<=6; x++) {
      if (pool.filter(q=>q.theme==="Exponential Functions").length < 80)
        add("Exponential Functions","medium", pick(expFTpls, base+x)(base,x), "input", null, Math.pow(base,x),
          `${base}^${x}.`, `${Math.pow(base,x)}.`);
    }
    add("Exponential Functions","medium","Bacteria doubles every hour. Start: 100. After 3 hours?","input",null,800,"100 × 2³ = 100 × 8.","800.");
    add("Exponential Functions","medium","A car worth $20,000 loses 10% per year. Value after 1 year?","input",null,18000,"$20,000 × 0.9.","$18,000.");
  }

  if (level === "K") {
    const specAngles=[{deg:30,sin:"1/2",cos:"√3/2",tan:"1/√3"},{deg:45,sin:"√2/2",cos:"√2/2",tan:"1"},{deg:60,sin:"√3/2",cos:"1/2",tan:"√3"}];
    const sinTpls = [
      ({deg}) => `sin(${deg}°) = ?`,
      ({deg}) => `In a right triangle, the sine of ${deg}° equals?`,
    ];
    const cosTpls = [
      ({deg}) => `cos(${deg}°) = ?`,
      ({deg}) => `What is the cosine of ${deg}°?`,
    ];
    const tanTpls = [
      ({deg}) => `tan(${deg}°) = ?`,
      ({deg}) => `The tangent of ${deg}° equals?`,
    ];
    specAngles.forEach((angle,ai) => {
      const {deg,sin,cos,tan} = angle;
      for (let i=0; i<12; i++) {
        add("Trig Ratios","medium", pick(sinTpls, i)(angle), "multiple", shuffle([sin,cos,tan,"2/3"]), sin,
          "SOH: sin = opposite/hypotenuse.", `sin(${deg}°) = ${sin}.`);
        add("Trig Ratios","medium", pick(cosTpls, i)(angle), "multiple", shuffle([sin,cos,tan,"1/3"]), cos,
          "CAH: cos = adjacent/hypotenuse.", `cos(${deg}°) = ${cos}.`);
        add("Trig Ratios","medium", pick(tanTpls, i)(angle), "multiple", shuffle([sin,cos,tan,"2"]), tan,
          "TOA: tan = opposite/adjacent.", `tan(${deg}°) = ${tan}.`);
      }
    });
    add("Trig Ratios","hard","Right triangle: opposite=3, hypotenuse=5. sin(θ)?","input",null,"3/5","sin = opp/hyp.","3/5.");
    add("Trig Ratios","hard","Right triangle: adjacent=4, hypotenuse=5. cos(θ)?","input",null,"4/5","cos = adj/hyp.","4/5.");
    add("Trig Ratios","hard","Right triangle: opposite=3, adjacent=4. tan(θ)?","input",null,"3/4","tan = opp/adj.","3/4.");
    add("Trig Ratios","medium","sin²(x) + cos²(x) = ?","input",null,"1","Pythagorean identity.","Always 1.");

    const tripleK=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41],[20,21,29]];
    const rtTpls = [
      ([a,b,c]) => `Right triangle, legs ${a} & ${b}. Hypotenuse?`,
      ([a,b,c]) => `45-45-90 triangle, leg = ${a}. Hypotenuse?`,
      ([a,b,c]) => `30-60-90 triangle, short leg = ${a}. Hypotenuse?`,
      ([a,b,c]) => `30-60-90 triangle, short leg = ${a}. Long leg?`,
    ];
    tripleK.forEach(([a,b,c]) => {
      for (let i=0; i<4; i++) {
        const [q,ans,hint,exp] = [
          [`Right triangle, legs ${a} & ${b}. Hypotenuse?`, c, "a²+b²=c²", `c = ${c}.`],
          [`45-45-90 triangle, leg = ${a}. Hypotenuse?`, `${a}√2`, "Hyp = leg × √2.", `${a}√2.`],
          [`30-60-90 triangle, short leg = ${a}. Hypotenuse?`, 2*a, "Hyp = 2 × short leg.", `${2*a}.`],
          [`30-60-90 triangle, short leg = ${a}. Long leg?`, `${a}√3`, "Long leg = short leg × √3.", `${a}√3.`],
        ][i];
        add("Special Right Triangles","medium", q, "input", null, ans, hint, exp);
      }
    });

    const volTpls = [
      (r) => `Sphere, r=${r}. Volume? (π≈3.14)`,
      (r) => `A ball with radius ${r} cm. Volume? (π≈3.14)`,
    ];
    for (let r=1; r<=15; r++) {
      add("Volume and Surface Area","easy", pick(volTpls, r)(r), "input", null,
        parseFloat((4/3*3.14*r*r*r).toFixed(2)), "V = 4/3 × π × r³.", `${(4/3*3.14*r*r*r).toFixed(2)}.`);
      add("Volume and Surface Area","medium", `Cylinder: r=${r}, h=${r+2}. Volume? (π≈3.14)`, "input", null,
        parseFloat((3.14*r*r*(r+2)).toFixed(2)), "V = πr²h.", `${(3.14*r*r*(r+2)).toFixed(2)}.`);
      add("Volume and Surface Area","hard", `Cone: r=${r}, h=${r+2}. Volume? (π≈3.14)`, "input", null,
        parseFloat((1/3*3.14*r*r*(r+2)).toFixed(2)), "V = (1/3)πr²h.", `${(1/3*3.14*r*r*(r+2)).toFixed(2)}.`);
    }

    const congRules=[["SSS","all 3 sides equal"],["SAS","two sides and the included angle"],["ASA","two angles and the included side"],["AAS","two angles and a non-included side"]];
    const congTpls = [
      ([rule,desc]) => `Two triangles have ${desc}. Congruence rule?`,
      ([rule,desc]) => `Which postulate proves congruence when ${desc}?`,
    ];
    congRules.forEach(rule => {
      for (let i=0; i<10; i++)
        add("Triangle Congruence","medium", pick(congTpls, i)(rule), "multiple", ["SSS","SAS","ASA","AAS"],
          rule[0], "Memorize: SSS, SAS, ASA, AAS.", `${rule[0]}.`);
    });

    const midPts=[[0,0,4,6],[1,2,5,8],[2,3,8,7],[-2,1,4,5],[3,4,9,10],[-3,-1,5,7],[0,2,6,8]];
    midPts.forEach(([x1,y1,x2,y2]) => {
      add("Coordinate Geometry","medium", `Midpoint of (${x1},${y1}) and (${x2},${y2})?`, "input", null,
        `(${(x1+x2)/2},${(y1+y2)/2})`, "Average each coordinate.", `(${(x1+x2)/2}, ${(y1+y2)/2}).`);
      const d=Math.sqrt((x2-x1)**2+(y2-y1)**2);
      add("Coordinate Geometry","medium", `Distance from (${x1},${y1}) to (${x2},${y2})?`, "input", null,
        parseFloat(d.toFixed(2)), "d = √((x₂−x₁)² + (y₂−y₁)²).", `${d.toFixed(2)}.`);
    });
    add("Coordinate Geometry","medium","Distance from (0,0) to (3,4)?","input",null,5,"d = √(9+16) = √25.","5.");
    add("Coordinate Geometry","medium","What quadrant is (-3, 5) in?","multiple",["I","II","III","IV"],"II","Negative x, positive y → Quadrant II.","Quadrant II.");
  }

  if (level === "L") {
    const logTpls = [
      (base,exp,val) => `log_${base}(${val}) = ?`,
      (base,exp,val) => `Solve: ${base}^x = ${val}.`,
      (base,exp,val) => `What exponent gives ${base}^x = ${val}?`,
      (base,exp,val) => `Evaluate: log base ${base} of ${val}.`,
    ];
    for (let base=2; base<=10; base++) for (let exp=1; exp<=6; exp++) {
      const val=Math.pow(base,exp);
      if (pool.filter(q=>q.theme==="Logarithms").length < 200) {
        add("Logarithms","medium", pick(logTpls, base+exp)(base,exp,val), "input", null, exp,
          `${base}^? = ${val}.`, `${base}^${exp} = ${val}, so answer is ${exp}.`);
      }
    }
    add("Logarithms","hard","log₁₀(100) = ?","input",null,2,"10^? = 100.","2.");
    add("Logarithms","hard","ln(e²) = ?","input",null,2,"ln(eⁿ) = n.","2.");
    add("Logarithms","hard","log₂(32) = ?","input",null,5,"2^? = 32.","5.");

    const arithTpls = [
      (a1,d,n,an) => `Arithmetic: a₁=${a1}, d=${d}. Find a_${n}.`,
      (a1,d,n,an) => `Sequence: ${a1}, ${a1+d}, ${a1+2*d}, ... What is the ${n}th term?`,
      (a1,d,n,an) => `First term ${a1}, common difference ${d}. Find a_${n}.`,
    ];
    for (let a1=1; a1<=8; a1++) for (let d=1; d<=8; d++) for (let n=3; n<=10; n++) {
      if (pool.filter(q=>q.theme==="Sequences and Series").length < 200) {
        const an=a1+(n-1)*d;
        add("Sequences and Series","easy", pick(arithTpls, a1+d+n)(a1,d,n,an), "input", null, an,
          "a_n = a₁ + (n−1)d.", `${a1}+(${n-1})×${d} = ${an}.`);
      }
    }
    for (let a1=1; a1<=5; a1++) for (let r=2; r<=4; r++) for (let n=2; n<=7; n++) {
      if (pool.filter(q=>q.theme==="Sequences and Series"&&q.difficulty==="medium").length < 120)
        add("Sequences and Series","medium", `Geometric: a₁=${a1}, r=${r}. Find a_${n}.`, "input", null,
          a1*Math.pow(r,n-1), "a_n = a₁ × r^(n−1).", `${a1}×${r}^${n-1} = ${a1*Math.pow(r,n-1)}.`);
    }
    add("Sequences and Series","medium","Sum of 1+2+3+...+10?","input",null,55,"S = n(a₁+aₙ)/2 = 10(11)/2.","55.");
    add("Sequences and Series","hard","Geometric series: 2+6+18+54. Sum?","input",null,80,"Just add or use S=a(rⁿ-1)/(r-1).","80.");

    const trigIds=[
      ["sin²(x)+cos²(x)","1","Pythagorean identity."],
      ["1+tan²(x)","sec²(x)","Derived from Pythagorean identity."],
      ["cos(2x)","cos²x−sin²x","Double-angle formula."],
      ["sin(2x)","2sin(x)cos(x)","Double-angle formula."],
      ["tan(x)","sin(x)/cos(x)","Definition of tangent."],
      ["1+cot²(x)","csc²(x)","Derived from Pythagorean identity."],
    ];
    trigIds.forEach(([lhs,rhs,hint]) => {
      for (let i=0; i<12; i++)
        add("Trig Identities","hard", `Simplify: ${lhs}`, "input", null, rhs, hint, `${lhs} = ${rhs}.`);
    });

    const combTpls = [
      (n,k,p,c) => `P(${n},${k}) = n!/(n−k)! = ?`,
      (n,k,p,c) => `How many ways to arrange ${k} items chosen from ${n}?`,
      (n,k,p,c) => `C(${n},${k}) = ?`,
      (n,k,p,c) => `How many ways to choose ${k} from ${n}? (Order doesn't matter)`,
    ];
    for (let n=3; n<=10; n++) for (let k=1; k<n; k++) {
      if (pool.filter(q=>q.theme==="Combinatorics").length < 150) {
        const p=factorial(n)/factorial(n-k);
        const c=factorial(n)/(factorial(k)*factorial(n-k));
        add("Combinatorics","medium", pick(combTpls, n+k)(n,k,p,c), "input", null, k%2===0?c:p,
          k%2===0 ? `C(n,k) = n!/(k!×(n−k)!)` : `P(n,k) = n!/(n−k)!`,
          k%2===0 ? `${c}.` : `${p}.`);
      }
    }
    add("Combinatorics","medium","How many ways can 5 people line up?","input",null,120,"5! = 5×4×3×2×1.","120.");
    add("Combinatorics","medium","Choose 2 from 6 people. How many ways?","input",null,15,"C(6,2) = 6!/(2!×4!).","15.");

    for (let i=0; i<40; i++) {
      const a=Math.floor(Math.random()*4)+1, b2=Math.floor(Math.random()*5),
            c=Math.floor(Math.random()*4)+1, d2=Math.floor(Math.random()*5)+1;
      add("Matrices","medium", `Det of [[${a},${b2}],[${c},${d2}]] = ?`, "input", null, a*d2-b2*c,
        "det = ad − bc.", `${a}×${d2} − ${b2}×${c} = ${a*d2-b2*c}.`);
    }
    add("Matrices","medium","If A = [[1,2],[3,4]], what is 2A?","input",null,"[[2,4],[6,8]]","Multiply every element by 2.","[[2,4],[6,8]].");
    add("Matrices","medium","Can a 2×3 matrix multiply a 3×2 matrix?","multiple",["Yes","No"],"Yes","Columns of first = rows of second.","Yes — result is 2×2.");

    for (let base=2; base<=5; base++) for (let x=0; x<=5; x++) {
      if (pool.filter(q=>q.theme==="Exponential Equations").length < 80)
        add("Exponential Equations","medium", `Solve: ${base}^x = ${Math.pow(base,x)}.`, "input", null, x,
          `Take log base ${base} of both sides.`, `x = ${x}.`);
    }
    add("Exponential Equations","hard","Solve: 2^x = 32","input",null,5,"2^5 = 32.","x = 5.");
    add("Exponential Equations","hard","Solve: 3^(x-1) = 27","input",null,4,"27 = 3³, so x-1=3.","x = 4.");
    add("Exponential Equations","hard","Solve: e^x = 1","input",null,0,"e^0 = 1.","x = 0.");
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

      // Log session for admin analytics
      fetch("/api/sessions/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childId,
          durationMins: sessionMins,
          correctCount: correct,
          totalCount: worksheetQ.length,
          level: progress.currentLevel,
        }),
      }).catch(() => {});
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
  // Client-side canonical domain guard: localStorage is origin-scoped, so
  // e-skillora.com and www.e-skillora.com have completely separate storage.
  // Force www before any localStorage is touched so user data never splits.
  if (typeof window !== "undefined" && window.location.hostname === "e-skillora.com") {
    window.location.replace(
      `https://www.e-skillora.com${window.location.pathname}${window.location.search}${window.location.hash}`
    );
    return null;
  }

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
  const handlePlacementDone = (level, ageAdjusted) => {
    const appData = getApp();
    if (appData && activeChild) {
      const levelNote = ageAdjusted
        ? "We adjusted your child's starting level based on their age. They'll move up quickly if the content feels easy."
        : null;
      appData.children = appData.children.map(c =>
        c.id === activeChild.id ? { ...c, level, placementDone: true, levelNote } : c
      );
      setApp(appData);
      // Init progress
      LS.set(`skillora-progress-${activeChild.id}`, {
        currentLevel: level, dayNumber: 1,
        completedDays: {}, levelAttempt: {}, levelQuestions: {},
        pendingRetry: {}, seenThemes: {},
      });
      setActiveChild({ ...activeChild, level, placementDone: true });

      // Persist placement to DB (fire-and-forget)
      fetch("/api/children/placement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: activeChild.name,
          age: activeChild.age,
          placedLevel: level,
          floorOverrideApplied: !!ageAdjusted,
        }),
      }).catch(err => console.error("Failed to persist child placement:", err));
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
