import { useState, useRef, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────
// STORAGE HELPERS (persistent across sessions)
// ─────────────────────────────────────────────────────────
const DB = {
  async get(key) {
    try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; }
    catch { return null; }
  },
  async set(key, val) {
    try { await window.storage.set(key, JSON.stringify(val)); } catch {}
  },
  async list(prefix) {
    try { const r = await window.storage.list(prefix); return r?.keys || []; }
    catch { return []; }
  },
};

// ─────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────
const GRADE_DATA = {
  1:  { math:["Addition within 20","Subtraction within 20","Counting & Place Value","Basic Shapes","Comparing Numbers"], reading:["Phonics & Decoding","Sight Words","Story Comprehension","Vocabulary","Sequencing"] },
  2:  { math:["Addition within 100","Subtraction within 100","Place Value","Telling Time","Multiplication Intro"], reading:["Reading Comprehension","Vocabulary & Context Clues","Characters & Setting","Cause & Effect","Author's Purpose"] },
  3:  { math:["Multiplication ×1–×10","Division Basics","Fractions","Area & Perimeter","Rounding Numbers"], reading:["Story Elements","Vocabulary Building","Inference & Prediction","Non-fiction Comprehension","Point of View"] },
  4:  { math:["Multi-digit Multiplication","Long Division","Equivalent Fractions","Decimal Intro","Factors & Multiples"], reading:["Figurative Language","Author's Craft","Summarizing","Compare & Contrast","Informational Text"] },
  5:  { math:["Fraction Operations","Decimal Operations","Volume","Coordinate Plane","Order of Operations"], reading:["Literary Analysis","Theme & Moral","Author's Purpose","Text Structure","Drawing Conclusions"] },
  6:  { math:["Ratios & Proportions","Percent","Integer Operations","Expressions & Equations","Statistics"], reading:["Poetry & Figurative Language","Novel Comprehension","Argumentative Text","Analyzing Characters","Research Skills"] },
  7:  { math:["Proportional Relationships","Negative Numbers","Linear Equations","Inequalities","Probability"], reading:["Rhetoric & Persuasion","Literary Devices","Comparing Texts","Tone & Mood","Informational Analysis"] },
  8:  { math:["Systems of Equations","Pythagorean Theorem","Functions & Graphs","Scientific Notation","Transformations"], reading:["Advanced Literary Analysis","Argumentative Reading","Historical Text","Satire & Irony","Theme Analysis"] },
  9:  { math:["Linear Equations","Quadratic Equations","Polynomials","Factoring","Radical Expressions"], reading:["Classical Literature","Critical Reading","Symbolism & Allegory","Author's Bias","Essay Comprehension"] },
  10: { math:["Geometry Proofs","Trigonometry","Circles & Theorems","Coordinate Geometry","Similarity & Congruence"], reading:["Shakespearean Language","Modernist Literature","Rhetorical Analysis","Comparative Literature","Vocabulary"] },
  11: { math:["Quadratic Functions","Polynomial Functions","Exponential & Logs","Sequences & Series","Statistics"], reading:["AP-Level Comprehension","Advanced Rhetoric","World Literature","Critical Analysis","Research & Citations"] },
  12: { math:["Limits & Pre-Calculus","Derivatives","Integration","Vectors & Matrices","Combinatorics"], reading:["College-Level Reading","Philosophical Texts","Advanced Argumentation","Synthesis of Sources","Literary Criticism"] },
};

const BUDDIES = ["🦁","🐼","🦊","🐨","🐸","🦄","🐯","🐺"];
const GRADE_ICON = {1:"⭐",2:"🌟",3:"💫",4:"✨",5:"🔥",6:"⚡",7:"🚀",8:"🌙",9:"💎",10:"🏆",11:"🎓",12:"👑"};

// Frustration signal keywords
const FRUSTRATION_SIGNALS = ["stupid","hate","don't get","dont get","confused","hard","difficult","impossible","idk","i don't know","i dont know","give up","too hard","can't","cant","whatever","ugh","help","lost","???"];
const DISENGAGEMENT_SIGNALS = ["k","ok","okay","sure","yeah","no","nope","...", "lol","haha","bye","what","huh"];

// ─────────────────────────────────────────────────────────
// AI CALL
// ─────────────────────────────────────────────────────────
async function callClaude(messages, systemPrompt, maxTokens = 220) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages,
    }),
  });
  const d = await res.json();
  return d.content?.[0]?.text || "Hmm, let me try again!";
}

// ─────────────────────────────────────────────────────────
// DATA COLLECTION ENGINE
// ─────────────────────────────────────────────────────────
class DataEngine {
  constructor(sessionId, studentProfile) {
    this.sessionId = sessionId;
    this.student = studentProfile;
    this.session = {
      id: sessionId,
      studentId: studentProfile.id,
      grade: studentProfile.grade,
      subject: studentProfile.subject,
      topic: studentProfile.topic,
      startTime: Date.now(),
      exchanges: [],
      breakthroughs: [],
      misconceptions: [],
      frustrationSignals: [],
      questionAttempts: {},
    };
    this.consecutiveWrong = 0;
    this.lastQuestionId = null;
    this.lastQuestionText = null;
    this.messageStartTime = Date.now();
  }

  // ── Detect frustration from message text
  detectFrustration(text) {
    const lower = text.toLowerCase();
    const matched = FRUSTRATION_SIGNALS.filter(s => lower.includes(s));
    const isDisengaged = DISENGAGEMENT_SIGNALS.some(s => lower.trim() === s);
    const isVeryShort = text.trim().length < 8;
    if (matched.length > 0) return { type: "explicit_frustration", signals: matched };
    if (isDisengaged && isVeryShort) return { type: "disengagement", signals: [text.trim()] };
    return null;
  }

  // ── Detect if AI response contains a question
  extractQuestion(aiText) {
    const lines = aiText.split("\n");
    for (const line of lines) {
      if (line.includes("?") && line.length > 20) return line.trim();
    }
    return null;
  }

  // ── Detect if student answer is correct based on AI follow-up
  detectOutcome(aiResponse) {
    const lower = aiResponse.toLowerCase();
    const correctSignals = ["correct","right","exactly","perfect","well done","great job","yes!","that's it","you got it","nailed it","awesome","amazing","brilliant"];
    const wrongSignals = ["not quite","try again","almost","incorrect","actually","let me help","not exactly","close but","oops","hmm, not"];
    const isCorrect = correctSignals.some(s => lower.includes(s));
    const isWrong = wrongSignals.some(s => lower.includes(s));
    if (isCorrect) return "correct";
    if (isWrong) return "wrong";
    return "neutral";
  }

  // ── Log an exchange
  async logExchange(userMsg, aiResponse, metadata = {}) {
    const timeToRespond = Date.now() - this.messageStartTime;
    const frustration = this.detectFrustration(userMsg);
    const outcome = this.detectOutcome(aiResponse);
    const question = this.extractQuestion(aiResponse);

    const exchange = {
      id: `ex_${Date.now()}`,
      timestamp: Date.now(),
      userMessage: userMsg,
      aiResponse,
      timeToRespond,
      outcome,
      frustration,
      questionId: question ? `q_${Date.now()}` : null,
      questionText: question,
      attemptNumber: metadata.attemptNumber || 1,
      hintsUsed: metadata.hintsUsed || 0,
    };

    // Track consecutive wrong answers
    if (outcome === "wrong") {
      this.consecutiveWrong++;
      this.lastQuestionText = this.lastQuestionText || question;
    } else if (outcome === "correct") {
      // 🎯 BREAKTHROUGH DETECTION
      if (this.consecutiveWrong >= 2) {
        const breakthrough = {
          id: `bt_${Date.now()}`,
          sessionId: this.sessionId,
          grade: this.student.grade,
          subject: this.student.subject,
          topic: this.student.topic,
          timestamp: Date.now(),
          wrongAttempts: this.consecutiveWrong,
          questionText: this.lastQuestionText,
          breakingExchange: {
            studentMessage: userMsg,
            aiResponse,
          },
          previousExchanges: this.session.exchanges.slice(-this.consecutiveWrong - 1),
        };
        this.session.breakthroughs.push(breakthrough);
        await DB.set(`breakthrough:${breakthrough.id}`, breakthrough);
        exchange.isBreakthrough = true;
        exchange.breakthroughAfterAttempts = this.consecutiveWrong;
      }
      this.consecutiveWrong = 0;
      this.lastQuestionText = null;
    }

    // Log frustration signals
    if (frustration) {
      const signal = {
        id: `fr_${Date.now()}`,
        sessionId: this.sessionId,
        grade: this.student.grade,
        topic: this.student.topic,
        timestamp: Date.now(),
        type: frustration.type,
        signals: frustration.signals,
        studentMessage: userMsg,
        priorContext: this.session.exchanges.slice(-2).map(e => e.userMessage),
      };
      this.session.frustrationSignals.push(signal);
      await DB.set(`frustration:${signal.id}`, signal);
    }

    this.session.exchanges.push(exchange);
    this.messageStartTime = Date.now();
    return exchange;
  }

  // ── Log a misconception (called when student reveals wrong thinking)
  async logMisconception(wrongAnswer, studentThinking, correctAnswer, topic) {
    const misconception = {
      id: `mc_${Date.now()}`,
      sessionId: this.sessionId,
      grade: this.student.grade,
      subject: this.student.subject,
      topic,
      timestamp: Date.now(),
      wrongAnswer,
      studentThinking,
      correctAnswer,
      studentAge: this.student.grade + 5,
    };
    this.session.misconceptions.push(misconception);
    await DB.set(`misconception:${misconception.id}`, misconception);
    return misconception;
  }

  // ── Save full session on end
  async saveSession() {
    this.session.endTime = Date.now();
    this.session.duration = this.session.endTime - this.session.startTime;
    this.session.totalExchanges = this.session.exchanges.length;
    this.session.correctAnswers = this.session.exchanges.filter(e => e.outcome === "correct").length;
    this.session.wrongAnswers = this.session.exchanges.filter(e => e.outcome === "wrong").length;
    this.session.breakthroughCount = this.session.breakthroughs.length;
    this.session.frustrationCount = this.session.frustrationSignals.length;
    await DB.set(`session:${this.sessionId}`, this.session);
    return this.session;
  }

  resetTimer() { this.messageStartTime = Date.now(); }
}

// ─────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap');

  :root {
    --bg: #070b14;
    --surface: #0d1526;
    --surface2: #131f35;
    --border: rgba(100,160,255,0.1);
    --border2: rgba(100,160,255,0.18);
    --text: #e8eef8;
    --text2: rgba(232,238,248,0.55);
    --text3: rgba(232,238,248,0.3);
    --accent: #3b82f6;
    --accent2: #60a5fa;
    --green: #10b981;
    --yellow: #f59e0b;
    --red: #ef4444;
    --purple: #8b5cf6;
    --teal: #14b8a6;
    --glow: 0 0 40px rgba(59,130,246,0.15);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Grid background */
  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .app { position: relative; z-index: 1; min-height: 100vh; }

  /* ── HEADER ── */
  .app-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid var(--border);
    background: rgba(7,11,20,0.8); backdrop-filter: blur(20px);
    position: sticky; top: 0; z-index: 100;
  }
  .logo {
    font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800;
    color: var(--text); letter-spacing: -0.5px;
  }
  .logo span { color: var(--accent2); }
  .logo sub { font-size: 10px; color: var(--text3); font-family: 'DM Mono', monospace; font-weight: 400; vertical-align: baseline; margin-left: 4px; }
  .nav-tabs { display: flex; gap: 4px; }
  .nav-tab {
    padding: 7px 16px; border-radius: 8px; font-size: 13px; font-weight: 600;
    background: transparent; border: 1px solid transparent;
    color: var(--text2); cursor: pointer; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .nav-tab:hover { color: var(--text); background: var(--surface); }
  .nav-tab.active { background: var(--surface2); border-color: var(--border2); color: var(--accent2); }
  .live-badge {
    display: flex; align-items: center; gap: 6px;
    font-family: 'DM Mono', monospace; font-size: 11px; color: var(--green);
    background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25);
    padding: 5px 10px; border-radius: 20px;
  }
  .live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }

  /* ── SETUP ── */
  .setup-wrap { max-width: 700px; margin: 0 auto; padding: 40px 20px; }
  .setup-title { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 6px; }
  .setup-sub { color: var(--text2); font-size: 14px; margin-bottom: 32px; }

  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 24px; margin-bottom: 16px;
  }
  .card-label {
    font-family: 'DM Mono', monospace; font-size: 11px; font-weight: 500;
    color: var(--text3); letter-spacing: 1.5px; text-transform: uppercase;
    margin-bottom: 14px;
  }

  .grade-grid { display: grid; grid-template-columns: repeat(6,1fr); gap: 8px; }
  .g-btn {
    aspect-ratio: 1; border-radius: 10px; border: 1px solid var(--border);
    background: transparent; color: var(--text2); cursor: pointer;
    font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 500;
    transition: all 0.15s; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 3px;
  }
  .g-btn .gi { font-size: 14px; }
  .g-btn:hover { border-color: var(--border2); color: var(--text); background: var(--surface2); }
  .g-btn.on { border-color: var(--accent); background: rgba(59,130,246,0.12); color: var(--accent2); }

  .subj-row { display: flex; gap: 10px; }
  .subj-btn {
    flex: 1; padding: 14px; border-radius: 12px; border: 1px solid var(--border);
    background: transparent; color: var(--text2); cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 15px;
    transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .subj-btn:hover { border-color: var(--border2); background: var(--surface2); color: var(--text); }
  .subj-btn.on { border-color: var(--yellow); background: rgba(245,158,11,0.1); color: var(--yellow); }

  .topic-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
  .topic-btn {
    padding: 7px 14px; border-radius: 20px; border: 1px solid var(--border);
    background: transparent; color: var(--text2); cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 13px;
    transition: all 0.15s;
  }
  .topic-btn:hover { border-color: var(--border2); color: var(--text); }
  .topic-btn.on { border-color: var(--green); background: rgba(16,185,129,0.1); color: var(--green); }

  .buddy-row { display: flex; gap: 10px; }
  .buddy-btn {
    width: 48px; height: 48px; border-radius: 50%; border: 2px solid var(--border);
    background: transparent; font-size: 24px; cursor: pointer; transition: all 0.15s;
  }
  .buddy-btn:hover { transform: scale(1.12); border-color: var(--border2); }
  .buddy-btn.on { border-color: var(--yellow); background: rgba(245,158,11,0.1); transform: scale(1.08); }

  .start-btn {
    width: 100%; padding: 16px; border-radius: 12px; border: none;
    background: linear-gradient(135deg, var(--accent) 0%, var(--purple) 100%);
    color: #fff; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px;
    cursor: pointer; transition: all 0.2s; letter-spacing: 0.3px;
    box-shadow: 0 4px 24px rgba(59,130,246,0.3);
  }
  .start-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(59,130,246,0.4); }
  .start-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }

  /* ── CHAT ── */
  .chat-layout { display: flex; flex-direction: column; height: calc(100vh - 57px); max-width: 800px; margin: 0 auto; padding: 0 16px 16px; }

  .chat-bar {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 0; border-bottom: 1px solid var(--border); margin-bottom: 12px;
    flex-shrink: 0;
  }
  .chat-avatar {
    width: 42px; height: 42px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--purple));
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; flex-shrink: 0; position: relative;
    box-shadow: 0 0 16px rgba(59,130,246,0.3);
  }
  .online-dot { position:absolute; bottom:1px; right:1px; width:9px; height:9px; border-radius:50%; background:var(--green); border:2px solid var(--bg); }
  .chat-info h3 { font-weight: 700; font-size: 14px; }
  .chat-info p { color: var(--text2); font-size: 12px; font-family: 'DM Mono', monospace; }
  .chat-bar-right { margin-left: auto; display: flex; gap: 8px; align-items: center; }
  .chip {
    padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
    font-family: 'DM Mono', monospace;
  }
  .chip-blue { background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.25); color: var(--accent2); }
  .chip-green { background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25); color: var(--green); }
  .chip-yellow { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.25); color: var(--yellow); }
  .chip-red { background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.25); color: var(--red); }
  .back-btn {
    padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600;
    background: var(--surface); border: 1px solid var(--border);
    color: var(--text2); cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.15s;
  }
  .back-btn:hover { color: var(--text); border-color: var(--border2); }

  .msgs { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; padding: 4px 0 8px; scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.08) transparent; }

  .msg { display: flex; gap: 8px; align-items: flex-end; animation: fadeUp 0.25s ease; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .msg.user { flex-direction: row-reverse; }
  .msg-av { width: 30px; height: 30px; border-radius: 50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:16px; }
  .msg-av.ai { background: linear-gradient(135deg,var(--accent),var(--purple)); box-shadow: 0 0 10px rgba(59,130,246,0.2); }
  .msg-av.usr { background: linear-gradient(135deg,var(--yellow),var(--red)); }
  .bubble { max-width: 75%; padding: 10px 14px; border-radius: 16px; font-size: 14px; line-height: 1.6; }
  .msg.ai .bubble { background: var(--surface2); border: 1px solid var(--border); color: var(--text); border-bottom-left-radius: 4px; }
  .msg.user .bubble { background: linear-gradient(135deg,var(--accent),var(--purple)); color: #fff; border-bottom-right-radius: 4px; box-shadow: 0 2px 12px rgba(59,130,246,0.25); }
  .bubble strong { color: var(--accent2); }
  .bubble code { font-family: 'DM Mono',monospace; background: rgba(255,255,255,0.08); padding: 1px 5px; border-radius: 4px; font-size: 12px; }

  /* Breakthrough banner */
  .breakthrough-banner {
    display: flex; align-items: center; gap: 10px;
    background: linear-gradient(135deg,rgba(16,185,129,0.15),rgba(20,184,166,0.1));
    border: 1px solid rgba(16,185,129,0.3); border-radius: 12px;
    padding: 10px 14px; margin: 4px 0; animation: fadeUp 0.3s ease;
  }
  .breakthrough-banner .bt-icon { font-size: 20px; }
  .breakthrough-banner .bt-text { font-size: 13px; color: var(--green); font-weight: 600; }
  .breakthrough-banner .bt-sub { font-size: 11px; color: rgba(16,185,129,0.7); font-family: 'DM Mono', monospace; }

  /* Frustration detected */
  .frustration-notice {
    font-size: 11px; color: var(--yellow); font-family: 'DM Mono', monospace;
    padding: 4px 10px; background: rgba(245,158,11,0.08); border-radius: 6px;
    border-left: 2px solid var(--yellow); margin-left: 38px;
  }

  /* Typing */
  .typing { display:flex; gap:4px; align-items:center; padding:10px 14px; background:var(--surface2); border:1px solid var(--border); border-radius:16px; border-bottom-left-radius:4px; }
  .dot { width:6px; height:6px; border-radius:50%; background:var(--text3); animation:bounce 1.1s infinite; }
  .dot:nth-child(2){animation-delay:0.18s} .dot:nth-child(3){animation-delay:0.36s}
  @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}

  /* Quick prompts */
  .quick-row { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px; flex-shrink:0; }
  .qp { padding:6px 12px; border-radius:20px; font-size:12px; font-weight:600; background:var(--surface); border:1px solid var(--border); color:var(--text2); cursor:pointer; transition:all 0.15s; font-family:'DM Sans',sans-serif; }
  .qp:hover { border-color:var(--border2); color:var(--text); background:var(--surface2); }
  .qp-green { border-color:rgba(16,185,129,0.3); color:var(--green); background:rgba(16,185,129,0.06); }
  .qp-green:hover { background:rgba(16,185,129,0.12); }

  /* Input */
  .input-box {
    display:flex; gap:8px; align-items:flex-end;
    background:var(--surface); border:1px solid var(--border);
    border-radius:14px; padding:10px 10px 10px 14px; flex-shrink:0;
    transition:border-color 0.2s;
  }
  .input-box:focus-within { border-color:var(--border2); }
  .input-box textarea {
    flex:1; background:none; border:none; outline:none; resize:none;
    color:var(--text); font-family:'DM Sans',sans-serif; font-size:14px;
    line-height:1.5; max-height:90px; min-height:22px; scrollbar-width:thin;
  }
  .input-box textarea::placeholder { color:var(--text3); }
  .send {
    width:36px; height:36px; border-radius:10px; flex-shrink:0;
    background:var(--accent); border:none; color:#fff; font-size:16px;
    cursor:pointer; transition:all 0.15s; display:flex; align-items:center; justify-content:center;
  }
  .send:hover { background:var(--accent2); transform:scale(1.05); }
  .send:disabled { opacity:0.3; cursor:not-allowed; transform:none; }

  /* ── MISCONCEPTION MODAL ── */
  .modal-overlay {
    position:fixed; inset:0; z-index:200;
    background:rgba(7,11,20,0.85); backdrop-filter:blur(8px);
    display:flex; align-items:center; justify-content:center; padding:20px;
    animation:fadeIn 0.2s ease;
  }
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  .modal {
    background:var(--surface); border:1px solid var(--border2);
    border-radius:20px; padding:28px; max-width:480px; width:100%;
    box-shadow:0 24px 80px rgba(0,0,0,0.5), var(--glow);
    animation:slideUp 0.25s ease;
  }
  @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  .modal-icon { font-size:32px; margin-bottom:12px; }
  .modal h3 { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; margin-bottom:6px; }
  .modal p { color:var(--text2); font-size:14px; margin-bottom:18px; line-height:1.5; }
  .modal-q { background:var(--surface2); border-radius:10px; padding:12px 14px; margin-bottom:16px; font-size:13px; color:var(--text2); border-left:3px solid var(--accent); }
  .modal-input {
    width:100%; background:var(--surface2); border:1px solid var(--border);
    border-radius:10px; padding:12px 14px; color:var(--text); font-family:'DM Sans',sans-serif;
    font-size:14px; resize:vertical; min-height:70px; outline:none;
    transition:border-color 0.2s; margin-bottom:14px;
  }
  .modal-input:focus { border-color:var(--border2); }
  .modal-input::placeholder { color:var(--text3); }
  .modal-btns { display:flex; gap:8px; }
  .modal-submit {
    flex:1; padding:12px; border-radius:10px; border:none;
    background:var(--green); color:#fff; font-family:'Syne',sans-serif;
    font-weight:700; font-size:14px; cursor:pointer; transition:all 0.15s;
  }
  .modal-submit:hover { background:#059669; }
  .modal-skip {
    padding:12px 16px; border-radius:10px; border:1px solid var(--border);
    background:transparent; color:var(--text2); font-family:'DM Sans',sans-serif;
    font-weight:600; font-size:14px; cursor:pointer; transition:all 0.15s;
  }
  .modal-skip:hover { color:var(--text); border-color:var(--border2); }

  /* ── ANALYTICS ── */
  .analytics-wrap { max-width:1100px; margin:0 auto; padding:32px 20px; }
  .analytics-title { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; margin-bottom:4px; }
  .analytics-sub { color:var(--text2); font-size:14px; margin-bottom:28px; }

  .stats-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:12px; margin-bottom:24px; }
  .stat-card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:14px; padding:20px;
  }
  .stat-card .s-label { font-family:'DM Mono',monospace; font-size:10px; color:var(--text3); letter-spacing:1.5px; text-transform:uppercase; margin-bottom:10px; }
  .stat-card .s-val { font-family:'Syne',sans-serif; font-size:32px; font-weight:800; line-height:1; }
  .stat-card .s-sub { font-size:12px; color:var(--text2); margin-top:6px; }
  .s-blue { color:var(--accent2); }
  .s-green { color:var(--green); }
  .s-yellow { color:var(--yellow); }
  .s-purple { color:var(--purple); }
  .s-red { color:var(--red); }
  .s-teal { color:var(--teal); }

  .section-title { font-family:'Syne',sans-serif; font-size:16px; font-weight:700; margin-bottom:14px; display:flex; align-items:center; gap:8px; }
  .section-title span { font-size:11px; font-family:'DM Mono',monospace; color:var(--text3); font-weight:400; }

  .data-table { width:100%; border-collapse:collapse; font-size:13px; }
  .data-table th { text-align:left; padding:10px 14px; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:1.2px; text-transform:uppercase; color:var(--text3); border-bottom:1px solid var(--border); }
  .data-table td { padding:12px 14px; border-bottom:1px solid rgba(100,160,255,0.05); color:var(--text2); vertical-align:top; }
  .data-table tr:hover td { background:rgba(59,130,246,0.03); }
  .data-table .highlight { color:var(--text); font-weight:600; }

  .bt-row { background:rgba(16,185,129,0.04); }
  .bt-badge { display:inline-flex; align-items:center; gap:4px; padding:2px 8px; border-radius:20px; font-size:10px; font-family:'DM Mono',monospace; background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.25); color:var(--green); }

  .mc-badge { display:inline-flex; padding:2px 8px; border-radius:20px; font-size:10px; font-family:'DM Mono',monospace; background:rgba(139,92,246,0.12); border:1px solid rgba(139,92,246,0.25); color:var(--purple); }

  .fr-badge { display:inline-flex; padding:2px 8px; border-radius:20px; font-size:10px; font-family:'DM Mono',monospace; background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.25); color:var(--yellow); }

  .empty-state { text-align:center; padding:48px 24px; color:var(--text3); }
  .empty-state .e-icon { font-size:40px; margin-bottom:12px; }
  .empty-state p { font-size:14px; line-height:1.6; }

  .tabs-row { display:flex; gap:4px; margin-bottom:20px; border-bottom:1px solid var(--border); padding-bottom:0; }
  .atab { padding:10px 16px; font-size:13px; font-weight:600; color:var(--text2); cursor:pointer; border-bottom:2px solid transparent; transition:all 0.15s; font-family:'DM Sans',sans-serif; }
  .atab:hover { color:var(--text); }
  .atab.on { color:var(--accent2); border-bottom-color:var(--accent2); }

  .export-btn {
    padding:8px 16px; border-radius:8px; border:1px solid var(--border);
    background:var(--surface); color:var(--text2); font-family:'DM Mono',monospace;
    font-size:11px; cursor:pointer; transition:all 0.15s; letter-spacing:0.5px;
  }
  .export-btn:hover { border-color:var(--border2); color:var(--text); background:var(--surface2); }

  .refresh-btn {
    padding:6px 12px; border-radius:8px; border:1px solid rgba(16,185,129,0.3);
    background:rgba(16,185,129,0.06); color:var(--green); font-family:'DM Mono',monospace;
    font-size:11px; cursor:pointer; transition:all 0.15s;
  }
  .refresh-btn:hover { background:rgba(16,185,129,0.12); }

  .quote-block { background:var(--surface2); border-left:3px solid var(--accent); border-radius:0 8px 8px 0; padding:8px 12px; font-size:12px; color:var(--text2); font-style:italic; margin-top:6px; }

  .grade-pill { display:inline-block; padding:2px 8px; border-radius:20px; font-family:'DM Mono',monospace; font-size:10px; background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.2); color:var(--accent2); }

  .heatmap { display:grid; grid-template-columns:repeat(12,1fr); gap:4px; margin-top:10px; }
  .heat-cell { aspect-ratio:1; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:9px; font-family:'DM Mono',monospace; color:rgba(255,255,255,0.5); }
`;

// ─────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("setup"); // setup | chat | analytics
  const [config, setConfig] = useState(null);

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <header className="app-header">
          <div className="logo">e-<span>Skillora</span><sub>DATA ENGINE v2</sub></div>
          <nav className="nav-tabs">
            <button className={`nav-tab ${screen==="setup"||screen==="chat"?"active":""}`} onClick={()=>setScreen(config?"chat":"setup")}>🎓 Tutor</button>
            <button className={`nav-tab ${screen==="analytics"?"active":""}`} onClick={()=>setScreen("analytics")}>📊 Data Lab</button>
          </nav>
          <div className="live-badge"><div className="live-dot"/>COLLECTING</div>
        </header>

        {screen==="setup" && <SetupScreen onStart={cfg=>{setConfig(cfg);setScreen("chat");}} />}
        {screen==="chat" && config && <ChatScreen config={config} onBack={()=>setScreen("setup")} />}
        {screen==="analytics" && <AnalyticsScreen />}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────
// SETUP SCREEN
// ─────────────────────────────────────────────────────────
function SetupScreen({ onStart }) {
  const [grade, setGrade] = useState(null);
  const [subject, setSubject] = useState(null);
  const [topic, setTopic] = useState(null);
  const [buddy, setBuddy] = useState(0);
  const [name, setName] = useState("");
  const topics = grade && subject ? GRADE_DATA[grade]?.[subject.toLowerCase()] ?? [] : [];
  const ready = grade && subject && topic && name.trim();

  return (
    <div className="setup-wrap">
      <div className="setup-title">Start a Learning Session</div>
      <div className="setup-sub">Every session feeds the data engine. All interactions are logged anonymously.</div>

      <div className="card">
        <div className="card-label">Student Name (for session tracking)</div>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter student name or nickname..." style={{width:"100%",background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:"10px",padding:"10px 14px",color:"var(--text)",fontFamily:"'DM Sans',sans-serif",fontSize:"14px",outline:"none"}} />
      </div>

      <div className="card">
        <div className="card-label">Grade Level</div>
        <div className="grade-grid">
          {Array.from({length:12},(_,i)=>i+1).map(g=>(
            <button key={g} className={`g-btn${grade===g?" on":""}`} onClick={()=>{setGrade(g);setTopic(null);}}>
              <span className="gi">{GRADE_ICON[g]}</span>G{g}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-label">Subject</div>
        <div className="subj-row">
          <button className={`subj-btn${subject==="math"?" on":""}`} onClick={()=>{setSubject("math");setTopic(null);}}>🔢 Math</button>
          <button className={`subj-btn${subject==="reading"?" on":""}`} onClick={()=>{setSubject("reading");setTopic(null);}}>📖 Reading</button>
        </div>
      </div>

      {topics.length > 0 && (
        <div className="card">
          <div className="card-label">Topic</div>
          <div className="topic-wrap">
            {topics.map(t=>(
              <button key={t} className={`topic-btn${topic===t?" on":""}`} onClick={()=>setTopic(t)}>{t}</button>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-label">Tutor Buddy</div>
        <div className="buddy-row">
          {BUDDIES.map((b,i)=>(
            <button key={i} className={`buddy-btn${buddy===i?" on":""}`} onClick={()=>setBuddy(i)}>{b}</button>
          ))}
        </div>
      </div>

      <button className="start-btn" disabled={!ready}
        onClick={()=>onStart({grade,subject,topic,buddy,studentName:name.trim(),studentId:`s_${Date.now()}`})}>
        {ready ? `🚀 Begin Session — ${name}, Grade ${grade} ${GRADE_ICON[grade]}` : "Fill in all fields to begin"}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// CHAT SCREEN
// ─────────────────────────────────────────────────────────
function ChatScreen({ config, onBack }) {
  const { grade, subject, topic, buddy, studentName, studentId } = config;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionStats, setSessionStats] = useState({ breakthroughs:0, frustrations:0, exchanges:0 });
  const [showMisconceptionModal, setShowMisconceptionModal] = useState(false);
  const [pendingMisconception, setPendingMisconception] = useState(null);
  const [misconceptionInput, setMisconceptionInput] = useState("");
  const [lastBreakthrough, setLastBreakthrough] = useState(false);
  const [lastFrustration, setLastFrustration] = useState(false);
  const engineRef = useRef(null);
  const msgsEndRef = useRef(null);
  const taRef = useRef(null);
  const sessionId = useRef(`sess_${Date.now()}`);

  const systemPrompt = `STRICT RULES — NEVER BREAK THESE:
1. MAX 3 lines. If you write a 4th line, you fail.
2. NEVER write a paragraph. Every line = its own idea.
3. ALWAYS end with a question on its own line.
4. Use 1-2 emojis per message, not more.

You are ${BUDDIES[buddy]}, tutoring ${studentName} (Grade ${grade}) on "${topic}".

HOW TO TEACH — drip one idea at a time:
Line 1: One emoji + one fact or step
Line 2: Quick example (5 words max)
Line 3: Question to check understanding

QUIZ FORMAT (only when asked):
🧠 [question]
A) ...
B) ...
C) ...
D) ...
(nothing else — wait for answer)

FEEDBACK:
✅ Correct → "🎉 Yes! [one word why]" then next step
❌ Wrong → "Almost! Think about [tiny hint]" — ask again

NEVER: introduce yourself at length, list multiple things, explain more than one concept, write flowing sentences.`;

  useEffect(()=>{
    engineRef.current = new DataEngine(sessionId.current, {
      id: studentId, grade, subject, topic, name: studentName
    });
    startSession();
    return ()=>{ engineRef.current?.saveSession(); };
  }, []);

  useEffect(()=>{ msgsEndRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages, loading]);

  async function startSession() {
    setLoading(true);
    const intro = await callClaude(
      [{role:"user",content:`Reply in EXACTLY 2 lines then stop. Line 1: greet ${studentName} and name ONE fun fact about "${topic}" with an emoji. Line 2: ask "Want to learn step by step or get quizzed first? 🎯" — nothing else.`}],
      systemPrompt,
      120
    );
    setMessages([{role:"ai",text:intro,id:`m_${Date.now()}`}]);
    setLoading(false);
  }

  async function sendMessage(text) {
    if (!text.trim() || loading) return;
    const engine = engineRef.current;
    engine.resetTimer();
    const userMsg = {role:"user",text,id:`m_${Date.now()}`};
    setMessages(prev=>[...prev,userMsg]);
    setInput("");
    setLoading(true);
    setLastBreakthrough(false);
    setLastFrustration(false);

    const history = [...messages, userMsg].map(m=>({
      role: m.role==="ai"?"assistant":"user", content:m.text
    }));

    const aiText = await callClaude(history, systemPrompt);
    const exchange = await engine.logExchange(text, aiText);

    // Update stats
    setSessionStats(prev=>({
      breakthroughs: prev.breakthroughs + (exchange.isBreakthrough?1:0),
      frustrations: prev.frustrations + (exchange.frustration?1:0),
      exchanges: prev.exchanges + 1,
    }));

    // Trigger breakthrough UI
    if (exchange.isBreakthrough) {
      setLastBreakthrough({attempts: exchange.breakthroughAfterAttempts});
    }

    // Trigger frustration UI
    if (exchange.frustration) {
      setLastFrustration(exchange.frustration.type);
    }

    // Trigger misconception modal if wrong 2+ times
    if (exchange.outcome==="wrong" && engine.consecutiveWrong >= 2 && engine.consecutiveWrong % 2 === 0) {
      setPendingMisconception({
        wrongAnswer: text,
        correctTopic: topic,
        aiExplanation: aiText,
      });
      setShowMisconceptionModal(true);
    }

    setMessages(prev=>[...prev,{role:"ai",text:aiText,id:`m_${Date.now()}`,isBreakthrough:exchange.isBreakthrough}]);
    setLoading(false);
  }

  async function submitMisconception() {
    if (!misconceptionInput.trim()) { setShowMisconceptionModal(false); return; }
    await engineRef.current.logMisconception(
      pendingMisconception.wrongAnswer,
      misconceptionInput,
      pendingMisconception.aiExplanation,
      topic
    );
    setMisconceptionInput("");
    setShowMisconceptionModal(false);
    setPendingMisconception(null);
    // Send their thinking to the tutor for a tailored response
    sendMessage(`I was thinking: ${misconceptionInput}`);
  }

  const QUICK_PROMPTS = [
    {label:"👆 Step by step", val:"Teach me step by step, one step at a time"},
    {label:"💡 Different example", val:"Show me a different real-world example"},
    {label:"😕 I'm confused", val:"I'm confused, can you make it simpler?"},
    {label:"🔁 Say it again", val:"Can you explain that differently?"},
  ];

  function renderText(text) {
    return text.split("\n").map((line, i) => {
      if (!line.trim()) return <br key={i} />;

      // Step/bullet lines with emoji prefix → styled step card
      const isStep = /^[🔤🔢➕➖✅👆👉🎯💡🎉⭐🔥⚡🧩📝🌟💫✨🚀🏆🎓👑🐱🐼🦁🦊🐨🐸🦄🐯🐺]/.test(line.trim());

      // Bold **text**
      const parts = line.split(/(\*\*[^*]+\*\*)/).map((p, j) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={j} style={{color:"var(--accent2)"}}>{p.slice(2,-2)}</strong>
          : p
      );

      if (isStep) {
        return (
          <div key={i} style={{
            background:"rgba(59,130,246,0.07)",
            border:"1px solid rgba(59,130,246,0.15)",
            borderRadius:"8px",
            padding:"6px 10px",
            marginBottom:"5px",
            fontSize:"14px",
            lineHeight:"1.5",
          }}>{parts}</div>
        );
      }

      // A / B / C / D quiz options
      if (/^[A-D][).]\s/.test(line.trim())) {
        return (
          <div key={i} style={{
            background:"rgba(139,92,246,0.08)",
            border:"1px solid rgba(139,92,246,0.18)",
            borderRadius:"8px",
            padding:"6px 12px",
            marginBottom:"5px",
            fontSize:"14px",
            cursor:"pointer",
            fontWeight:"600",
          }}>{parts}</div>
        );
      }

      return <div key={i} style={{marginBottom:"3px",lineHeight:"1.6"}}>{parts}</div>;
    });
  }

  return (
    <div className="chat-layout">
      <div className="chat-bar">
        <div className="chat-avatar">
          {BUDDIES[buddy]}
          <div className="online-dot"/>
        </div>
        <div className="chat-info">
          <h3>AI Tutor {BUDDIES[buddy]} — {studentName}</h3>
          <p>{subject} · {topic} · G{grade} {GRADE_ICON[grade]}</p>
        </div>
        <div className="chat-bar-right">
          <span className="chip chip-blue">💬 {sessionStats.exchanges}</span>
          {sessionStats.breakthroughs>0 && <span className="chip chip-green">⚡ {sessionStats.breakthroughs} breakthrough{sessionStats.breakthroughs!==1?"s":""}</span>}
          {sessionStats.frustrations>0 && <span className="chip chip-yellow">😤 {sessionStats.frustrations} signal{sessionStats.frustrations!==1?"s":""}</span>}
          <button className="back-btn" onClick={()=>{engineRef.current?.saveSession();onBack();}}>← End Session</button>
        </div>
      </div>

      <div className="msgs">
        {messages.map((m,i)=>(
          <div key={m.id||i}>
            <div className={`msg ${m.role==="ai"?"ai":"user"}`}>
              <div className={`msg-av ${m.role==="ai"?"ai":"usr"}`}>{m.role==="ai"?BUDDIES[buddy]:"🧒"}</div>
              <div className="bubble">{renderText(m.text)}</div>
            </div>
          </div>
        ))}

        {/* Breakthrough banner */}
        {lastBreakthrough && (
          <div className="breakthrough-banner">
            <span className="bt-icon">⚡</span>
            <div>
              <div className="bt-text">Breakthrough moment detected!</div>
              <div className="bt-sub">Got it after {lastBreakthrough.attempts} attempts — logged for training data</div>
            </div>
          </div>
        )}

        {/* Frustration notice */}
        {lastFrustration && (
          <div className="frustration-notice">
            {lastFrustration==="explicit_frustration" ? "😤 Frustration signal detected & logged" : "⚠️ Disengagement signal detected & logged"}
          </div>
        )}

        {loading && (
          <div className="msg ai">
            <div className="msg-av ai">{BUDDIES[buddy]}</div>
            <div className="typing"><div className="dot"/><div className="dot"/><div className="dot"/></div>
          </div>
        )}
        <div ref={msgsEndRef}/>
      </div>

      <div className="quick-row">
        {QUICK_PROMPTS.map((qp,i)=>(
          <button key={i} className="qp" onClick={()=>sendMessage(qp.val)} disabled={loading}>{qp.label}</button>
        ))}
        <button className="qp qp-green" onClick={()=>sendMessage("Give me one quick quiz question with A B C D — keep it short!")} disabled={loading}>🎯 Quiz Me!</button>
      </div>

      <div className="input-box">
        <textarea
          ref={taRef}
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage(input);}}}
          placeholder={`Ask ${BUDDIES[buddy]} anything about ${topic}...`}
          rows={1}
          onInput={e=>{e.target.style.height="auto";e.target.style.height=e.target.scrollHeight+"px";}}
        />
        <button className="send" onClick={()=>sendMessage(input)} disabled={loading||!input.trim()}>➤</button>
      </div>

      {/* MISCONCEPTION MODAL */}
      {showMisconceptionModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">🧩</div>
            <h3>Help us understand your thinking!</h3>
            <p>It looks like this question is tricky. Before we explain, can you tell us what you were thinking when you answered? This helps make the tutor smarter for everyone!</p>
            <div className="modal-q">Topic: <strong>{topic}</strong> — What did you think the answer was, and why?</div>
            <textarea
              className="modal-input"
              value={misconceptionInput}
              onChange={e=>setMisconceptionInput(e.target.value)}
              placeholder='e.g. "I thought 1/4 was bigger than 1/2 because 4 is a bigger number..."'
            />
            <div className="modal-btns">
              <button className="modal-submit" onClick={submitMisconception}>💡 Submit & Get Help</button>
              <button className="modal-skip" onClick={()=>setShowMisconceptionModal(false)}>Skip</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// ANALYTICS DASHBOARD
// ─────────────────────────────────────────────────────────
function AnalyticsScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState({ sessions:[], breakthroughs:[], misconceptions:[], frustrations:[] });
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const [sKeys, bKeys, mKeys, fKeys] = await Promise.all([
        DB.list("session:"), DB.list("breakthrough:"), DB.list("misconception:"), DB.list("frustration:")
      ]);

      const [sessions, breakthroughs, misconceptions, frustrations] = await Promise.all([
        Promise.all(sKeys.map(k=>DB.get(k))),
        Promise.all(bKeys.map(k=>DB.get(k))),
        Promise.all(mKeys.map(k=>DB.get(k))),
        Promise.all(fKeys.map(k=>DB.get(k))),
      ]);

      setData({
        sessions: sessions.filter(Boolean).sort((a,b)=>b.startTime-a.startTime),
        breakthroughs: breakthroughs.filter(Boolean).sort((a,b)=>b.timestamp-a.timestamp),
        misconceptions: misconceptions.filter(Boolean).sort((a,b)=>b.timestamp-a.timestamp),
        frustrations: frustrations.filter(Boolean).sort((a,b)=>b.timestamp-a.timestamp),
      });
    } catch(e) { console.error(e); }
    setLoading(false);
  }

  useEffect(()=>{ loadData(); }, []);

  function exportCSV(type) {
    const items = data[type];
    if (!items.length) return;
    const keys = Object.keys(items[0]).filter(k=>typeof items[0][k]!=="object"||items[0][k]===null);
    const csv = [keys.join(","), ...items.map(r=>keys.map(k=>JSON.stringify(r[k]??"")||'""').join(","))].join("\n");
    const blob = new Blob([csv], {type:"text/csv"});
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `eskillora_${type}_${Date.now()}.csv`; a.click();
  }

  const totalExchanges = data.sessions.reduce((s,sess)=>s+(sess.totalExchanges||0),0);
  const totalCorrect = data.sessions.reduce((s,sess)=>s+(sess.correctAnswers||0),0);
  const avgAccuracy = totalExchanges ? Math.round((totalCorrect/totalExchanges)*100) : 0;
  const avgDuration = data.sessions.length ? Math.round(data.sessions.reduce((s,sess)=>s+((sess.duration||0)/60000),0)/data.sessions.length) : 0;

  // Grade heatmap data
  const gradeActivity = {};
  data.sessions.forEach(s=>{ if(s.grade) gradeActivity[s.grade]=(gradeActivity[s.grade]||0)+(s.totalExchanges||0); });
  const maxActivity = Math.max(...Object.values(gradeActivity),1);

  function fmt(ts) {
    if (!ts) return "—";
    return new Date(ts).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
  }

  if (loading) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"calc(100vh - 57px)",color:"var(--text2)",fontFamily:"'DM Mono',monospace",fontSize:"13px"}}>
      Loading data...
    </div>
  );

  return (
    <div className="analytics-wrap">
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"28px"}}>
        <div>
          <div className="analytics-title">📊 Data Lab</div>
          <div className="analytics-sub">Real-time behavioral data collected from every tutoring session</div>
        </div>
        <button className="refresh-btn" onClick={loadData}>⟳ Refresh</button>
      </div>

      {/* STATS GRID */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="s-label">Total Sessions</div>
          <div className="s-val s-blue">{data.sessions.length}</div>
          <div className="s-sub">unique learning sessions</div>
        </div>
        <div className="stat-card">
          <div className="s-label">Total Exchanges</div>
          <div className="s-val s-teal">{totalExchanges}</div>
          <div className="s-sub">student ↔ AI messages</div>
        </div>
        <div className="stat-card">
          <div className="s-label">Breakthroughs</div>
          <div className="s-val s-green">{data.breakthroughs.length}</div>
          <div className="s-sub">wrong→right moments captured</div>
        </div>
        <div className="stat-card">
          <div className="s-label">Misconceptions</div>
          <div className="s-val s-purple">{data.misconceptions.length}</div>
          <div className="s-sub">wrong mental models logged</div>
        </div>
        <div className="stat-card">
          <div className="s-label">Frustration Signals</div>
          <div className="s-val s-yellow">{data.frustrations.length}</div>
          <div className="s-sub">emotional states detected</div>
        </div>
        <div className="stat-card">
          <div className="s-label">Avg Accuracy</div>
          <div className="s-val s-blue">{avgAccuracy}%</div>
          <div className="s-sub">correct / total answers</div>
        </div>
        <div className="stat-card">
          <div className="s-label">Avg Session</div>
          <div className="s-val s-teal">{avgDuration}m</div>
          <div className="s-sub">minutes per session</div>
        </div>
      </div>

      {/* Grade Activity Heatmap */}
      <div className="card" style={{marginBottom:"20px"}}>
        <div className="card-label">Activity by Grade (exchanges logged)</div>
        <div className="heatmap">
          {Array.from({length:12},(_,i)=>i+1).map(g=>{
            const activity = gradeActivity[g]||0;
            const intensity = activity/maxActivity;
            const bg = activity===0 ? "rgba(59,130,246,0.04)" : `rgba(59,130,246,${0.1+intensity*0.7})`;
            return (
              <div key={g} className="heat-cell" style={{background:bg,border:"1px solid rgba(59,130,246,0.1)"}}>
                G{g}<br/>{activity}
              </div>
            );
          })}
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div className="tabs-row">
        {[["overview","🔍 Sessions"],["breakthroughs","⚡ Breakthroughs"],["misconceptions","🧩 Misconceptions"],["frustrations","😤 Frustration"]].map(([id,label])=>(
          <button key={id} className={`atab${activeTab===id?" on":""}`} onClick={()=>setActiveTab(id)}>{label}</button>
        ))}
      </div>

      {/* SESSIONS TAB */}
      {activeTab==="overview" && (
        <div className="card">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
            <div className="section-title">Session Log <span>{data.sessions.length} sessions</span></div>
            <button className="export-btn" onClick={()=>exportCSV("sessions")}>↓ Export CSV</button>
          </div>
          {data.sessions.length===0 ? (
            <div className="empty-state"><div className="e-icon">📭</div><p>No sessions yet.<br/>Start a tutoring session to begin collecting data.</p></div>
          ) : (
            <div style={{overflowX:"auto"}}>
              <table className="data-table">
                <thead><tr>
                  <th>Student</th><th>Grade</th><th>Subject / Topic</th><th>Exchanges</th><th>Correct</th><th>Breakthroughs</th><th>Frustrations</th><th>Duration</th><th>Time</th>
                </tr></thead>
                <tbody>
                  {data.sessions.map(s=>(
                    <tr key={s.id}>
                      <td className="highlight">{s.studentId?.split("_")[0]||"—"}</td>
                      <td><span className="grade-pill">G{s.grade}</span></td>
                      <td style={{fontSize:"12px"}}>{s.subject} / {s.topic}</td>
                      <td>{s.totalExchanges||0}</td>
                      <td style={{color:"var(--green)"}}>{s.correctAnswers||0}</td>
                      <td>{s.breakthroughCount>0?<span className="bt-badge">⚡ {s.breakthroughCount}</span>:"—"}</td>
                      <td>{s.frustrationCount>0?<span className="fr-badge">😤 {s.frustrationCount}</span>:"—"}</td>
                      <td style={{fontFamily:"'DM Mono',monospace",fontSize:"12px"}}>{s.duration?Math.round(s.duration/60000)+"m":"—"}</td>
                      <td style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"var(--text3)"}}>{fmt(s.startTime)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* BREAKTHROUGHS TAB */}
      {activeTab==="breakthroughs" && (
        <div className="card">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
            <div className="section-title">⚡ Breakthrough Moments <span>wrong→right transitions after 2+ attempts</span></div>
            <button className="export-btn" onClick={()=>exportCSV("breakthroughs")}>↓ Export CSV</button>
          </div>
          {data.breakthroughs.length===0 ? (
            <div className="empty-state"><div className="e-icon">⚡</div><p>No breakthroughs captured yet.<br/>Breakthroughs are detected when a student gets a question wrong 2+ times, then answers correctly. This is your most valuable training data.</p></div>
          ) : (
            <table className="data-table">
              <thead><tr>
                <th>Grade</th><th>Topic</th><th>Wrong Attempts</th><th>Breaking Message</th><th>Question</th><th>Time</th>
              </tr></thead>
              <tbody>
                {data.breakthroughs.map(b=>(
                  <tr key={b.id} className="bt-row">
                    <td><span className="grade-pill">G{b.grade}</span></td>
                    <td style={{fontSize:"12px"}}>{b.topic}</td>
                    <td><span className="bt-badge">⚡ {b.wrongAttempts} wrong</span></td>
                    <td style={{maxWidth:"200px"}}>
                      <div className="quote-block">"{b.breakingExchange?.studentMessage?.slice(0,80)}"</div>
                    </td>
                    <td style={{fontSize:"12px",color:"var(--text2)",maxWidth:"160px"}}>{b.questionText?.slice(0,80)||"—"}</td>
                    <td style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"var(--text3)"}}>{fmt(b.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* MISCONCEPTIONS TAB */}
      {activeTab==="misconceptions" && (
        <div className="card">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
            <div className="section-title">🧩 Misconceptions Catalogued <span>wrong mental models in students' own words</span></div>
            <button className="export-btn" onClick={()=>exportCSV("misconceptions")}>↓ Export CSV</button>
          </div>
          {data.misconceptions.length===0 ? (
            <div className="empty-state"><div className="e-icon">🧩</div><p>No misconceptions logged yet.<br/>When a student gets a question wrong 2+ times, they're asked "what were you thinking?" Their answer is captured here — this is your most unique dataset.</p></div>
          ) : (
            <table className="data-table">
              <thead><tr>
                <th>Grade</th><th>Subject</th><th>Topic</th><th>Wrong Answer</th><th>Student's Thinking (Gold Data)</th><th>Time</th>
              </tr></thead>
              <tbody>
                {data.misconceptions.map(m=>(
                  <tr key={m.id}>
                    <td><span className="grade-pill">G{m.grade}</span></td>
                    <td style={{fontSize:"12px"}}>{m.subject}</td>
                    <td style={{fontSize:"12px"}}>{m.topic}</td>
                    <td style={{maxWidth:"120px",fontSize:"12px",color:"var(--red)"}}>{m.wrongAnswer?.slice(0,60)}</td>
                    <td style={{maxWidth:"260px"}}>
                      <span className="mc-badge" style={{marginBottom:"6px",display:"inline-block"}}>student thinking</span>
                      <div className="quote-block">"{m.studentThinking}"</div>
                    </td>
                    <td style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"var(--text3)"}}>{fmt(m.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* FRUSTRATION TAB */}
      {activeTab==="frustrations" && (
        <div className="card">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
            <div className="section-title">😤 Frustration Signals <span>emotional & disengagement patterns</span></div>
            <button className="export-btn" onClick={()=>exportCSV("frustrations")}>↓ Export CSV</button>
          </div>
          {data.frustrations.length===0 ? (
            <div className="empty-state"><div className="e-icon">😤</div><p>No frustration signals detected yet.<br/>Words like "I don't get it", "this is stupid", or very short replies are automatically flagged and logged here with context.</p></div>
          ) : (
            <table className="data-table">
              <thead><tr>
                <th>Grade</th><th>Topic</th><th>Type</th><th>Trigger Message</th><th>Prior Context</th><th>Time</th>
              </tr></thead>
              <tbody>
                {data.frustrations.map(f=>(
                  <tr key={f.id}>
                    <td><span className="grade-pill">G{f.grade}</span></td>
                    <td style={{fontSize:"12px"}}>{f.topic}</td>
                    <td><span className="fr-badge">{f.type==="explicit_frustration"?"explicit":"disengagement"}</span></td>
                    <td style={{maxWidth:"160px"}}>
                      <div className="quote-block" style={{borderColor:"var(--yellow)"}}>"{f.studentMessage}"</div>
                    </td>
                    <td style={{fontSize:"12px",color:"var(--text3)",maxWidth:"160px"}}>{f.priorContext?.join(" → ")?.slice(0,80)||"—"}</td>
                    <td style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"var(--text3)"}}>{fmt(f.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
