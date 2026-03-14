import { useState, useEffect } from "react";
import { Brain, Lock, RefreshCw, Trash2, Plus, Upload, Settings, BookOpen, ChevronLeft, Save, X, Check } from "lucide-react";

const ADMIN_KEY = "admin_secret";
const LEVELS = ["A","B","C","D","E","F","G","H","I","J","K","L"];
const SUBJECTS = ["math","ela"];

const G_FONT = `https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,800&family=Instrument+Sans:wght@400;500;600;700&display=swap`;

function adminFetch(path: string, method = "GET", body?: any) {
  const secret = sessionStorage.getItem(ADMIN_KEY) || "";
  return fetch(path, {
    method,
    headers: { "Content-Type": "application/json", "x-admin-secret": secret },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

interface Question {
  id: string;
  level: string;
  subject: string;
  theme: string | null;
  difficulty: string | null;
  type: string;
  question: string;
  options: string | null;
  answer: string;
  hint: string | null;
  explanation: string | null;
  overrideId: string | null;
}

function AdminGate({ onUnlock }: { onUnlock: () => void }) {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/config", {
      headers: { "x-admin-secret": secret },
    });
    setLoading(false);
    if (res.ok) {
      sessionStorage.setItem(ADMIN_KEY, secret);
      onUnlock();
    } else {
      setError("Invalid admin secret");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#F7F3ED", fontFamily: "'Instrument Sans', sans-serif",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <style>{`@import url('${G_FONT}'); *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`}</style>
      <div style={{
        background: "#fff", borderRadius: 24, padding: "40px 36px",
        maxWidth: 380, width: "100%", boxShadow: "0 8px 40px rgba(28,58,47,0.12)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <Brain size={24} color="#1C3A2F" />
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, color: "#1C3A2F" }}>e-Skillora Admin</span>
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#1C3A2F", marginBottom: 6 }}>Question Manager</h2>
        <p style={{ color: "#9A9A9A", fontSize: 14, marginBottom: 24 }}>Enter your admin secret to access this page.</p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="password"
            value={secret}
            onChange={e => setSecret(e.target.value)}
            placeholder="Admin secret"
            style={{
              width: "100%", fontSize: 15, color: "#1A1A1A", background: "#F7F3ED",
              border: "1.5px solid #E0D9CF", borderRadius: 12, padding: "13px 16px",
              fontFamily: "'Instrument Sans', sans-serif", outline: "none",
            }}
          />
          {error && <p style={{ color: "#E8604C", fontSize: 13 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading || !secret}
            style={{
              background: "#1C3A2F", color: "#fff", border: "none", borderRadius: 12,
              padding: "13px", fontSize: 15, fontWeight: 700, cursor: "pointer",
              opacity: loading || !secret ? 0.6 : 1, display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8, fontFamily: "'Instrument Sans', sans-serif",
            }}
          >
            <Lock size={16} /> {loading ? "Verifying..." : "Unlock"}
          </button>
        </form>
      </div>
    </div>
  );
}

function QuestionRow({ q, onDelete, onEdit }: { q: Question; onDelete: () => void; onEdit: () => void }) {
  return (
    <tr style={{ borderBottom: "1px solid #F0EBE3" }}>
      <td style={{ padding: "10px 12px", fontSize: 12, color: "#6B6B6B" }}>{q.level}</td>
      <td style={{ padding: "10px 12px", fontSize: 12, color: "#6B6B6B" }}>{q.subject}</td>
      <td style={{ padding: "10px 12px", fontSize: 13, color: "#1A1A1A", maxWidth: 320, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{q.question}</td>
      <td style={{ padding: "10px 12px", fontSize: 13, color: "#2A5240", fontWeight: 600 }}>{q.answer}</td>
      <td style={{ padding: "10px 12px", fontSize: 12, color: "#9A9A9A" }}>{q.type}</td>
      <td style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={onEdit} style={{ background: "#F0EBE3", border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#1C3A2F" }}>Edit</button>
          <button onClick={onDelete} style={{ background: "rgba(232,96,76,0.1)", border: "none", borderRadius: 8, padding: "5px 8px", cursor: "pointer", color: "#E8604C" }}>
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function QuestionForm({ initial, onSave, onCancel }: { initial?: Partial<Question>; onSave: (data: any) => Promise<void>; onCancel: () => void }) {
  const [form, setForm] = useState({
    level: initial?.level || "A",
    subject: initial?.subject || "math",
    theme: initial?.theme || "",
    difficulty: initial?.difficulty || "medium",
    type: initial?.type || "input",
    question: initial?.question || "",
    options: initial?.options || "",
    answer: initial?.answer || "",
    hint: initial?.hint || "",
    explanation: initial?.explanation || "",
    overrideId: initial?.overrideId || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) { setError("Question and answer are required"); return; }
    setSaving(true);
    try {
      await onSave(form);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%", fontSize: 14, color: "#1A1A1A", background: "#F7F3ED",
    border: "1.5px solid #E0D9CF", borderRadius: 10, padding: "10px 12px",
    fontFamily: "'Instrument Sans', sans-serif", outline: "none",
  };
  const label = (t: string) => <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#6B6B6B", marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{t}</label>;

  return (
    <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
        <div>
          {label("Level")}
          <select value={form.level} onChange={e => set("level", e.target.value)} style={inputStyle}>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          {label("Subject")}
          <select value={form.subject} onChange={e => set("subject", e.target.value)} style={inputStyle}>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          {label("Type")}
          <select value={form.type} onChange={e => set("type", e.target.value)} style={inputStyle}>
            <option value="input">Input</option>
            <option value="multiple">Multiple Choice</option>
          </select>
        </div>
        <div>
          {label("Difficulty")}
          <select value={form.difficulty} onChange={e => set("difficulty", e.target.value)} style={inputStyle}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <div>
        {label("Question")}
        <textarea value={form.question} onChange={e => set("question", e.target.value)} rows={3}
          style={{ ...inputStyle, resize: "vertical" }} placeholder="Enter the question..." />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          {label("Answer")}
          <input type="text" value={form.answer} onChange={e => set("answer", e.target.value)} style={inputStyle} placeholder="Correct answer" />
        </div>
        <div>
          {label("Theme (optional)")}
          <input type="text" value={form.theme} onChange={e => set("theme", e.target.value)} style={inputStyle} placeholder="e.g. space, animals" />
        </div>
      </div>
      {form.type === "multiple" && (
        <div>
          {label("Options (JSON array, e.g. [\"A\",\"B\",\"C\",\"D\"])")}
          <input type="text" value={form.options} onChange={e => set("options", e.target.value)} style={inputStyle} placeholder='["option1","option2","option3","option4"]' />
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          {label("Hint (optional)")}
          <input type="text" value={form.hint} onChange={e => set("hint", e.target.value)} style={inputStyle} placeholder="Hint for the student" />
        </div>
        <div>
          {label("Override ID (optional)")}
          <input type="text" value={form.overrideId} onChange={e => set("overrideId", e.target.value)} style={inputStyle} placeholder="Generated question ID to replace" />
        </div>
      </div>
      <div>
        {label("Explanation (optional)")}
        <textarea value={form.explanation} onChange={e => set("explanation", e.target.value)} rows={2}
          style={{ ...inputStyle, resize: "vertical" }} placeholder="Step-by-step explanation..." />
      </div>
      {error && <p style={{ color: "#E8604C", fontSize: 13 }}>{error}</p>}
      <div style={{ display: "flex", gap: 10 }}>
        <button type="submit" disabled={saving} style={{
          background: "#1C3A2F", color: "#fff", border: "none", borderRadius: 10,
          padding: "11px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6, fontFamily: "'Instrument Sans', sans-serif",
          opacity: saving ? 0.6 : 1,
        }}>
          <Save size={15} /> {saving ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel} style={{
          background: "#F0EBE3", color: "#6B6B6B", border: "none", borderRadius: 10,
          padding: "11px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer",
          fontFamily: "'Instrument Sans', sans-serif",
        }}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function QuestionsTab() {
  const [level, setLevel] = useState("A");
  const [subject, setSubject] = useState("math");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editQ, setEditQ] = useState<Question | null>(null);
  const [bulkJson, setBulkJson] = useState("");
  const [bulkError, setBulkError] = useState("");
  const [bulkSuccess, setBulkSuccess] = useState("");
  const [showBulk, setShowBulk] = useState(false);
  const [toast, setToast] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await adminFetch(`/api/admin/questions?level=${level}&subject=${subject}`);
    const data = await res.json();
    setQuestions(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [level, subject]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleAdd = async (form: any) => {
    const res = await adminFetch("/api/admin/questions", "POST", form);
    if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
    setShowAdd(false);
    showToast("Question added!");
    load();
  };

  const handleEdit = async (form: any) => {
    const res = await adminFetch(`/api/admin/questions/${editQ!.id}`, "PUT", form);
    if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
    setEditQ(null);
    showToast("Question updated!");
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this question?")) return;
    await adminFetch(`/api/admin/questions/${id}`, "DELETE");
    showToast("Deleted.");
    load();
  };

  const handleBulk = async () => {
    setBulkError(""); setBulkSuccess("");
    let parsed: any[];
    try { parsed = JSON.parse(bulkJson); } catch { setBulkError("Invalid JSON"); return; }
    if (!Array.isArray(parsed)) { setBulkError("Must be a JSON array"); return; }
    const res = await adminFetch("/api/admin/questions/bulk", "POST", parsed);
    const d = await res.json();
    if (!res.ok) { setBulkError(d.message); return; }
    setBulkSuccess(`Imported ${d.inserted} questions!`);
    setBulkJson("");
    load();
  };

  const inputStyle = {
    fontSize: 13, color: "#1A1A1A", background: "#F7F3ED",
    border: "1.5px solid #E0D9CF", borderRadius: 9, padding: "8px 12px",
    fontFamily: "'Instrument Sans', sans-serif", outline: "none",
  };

  return (
    <div>
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, background: "#1C3A2F", color: "#fff",
          borderRadius: 12, padding: "12px 20px", fontSize: 14, fontWeight: 600,
          zIndex: 999, display: "flex", alignItems: "center", gap: 8,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}>
          <Check size={15} /> {toast}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Level</label>
          <select value={level} onChange={e => setLevel(e.target.value)} style={inputStyle}>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "0.04em" }}>Subject</label>
          <select value={subject} onChange={e => setSubject(e.target.value)} style={inputStyle}>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <button onClick={load} style={{ background: "#F0EBE3", border: "none", borderRadius: 9, padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#1C3A2F", fontWeight: 600 }}>
          <RefreshCw size={13} /> Refresh
        </button>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={() => { setShowBulk(!showBulk); setShowAdd(false); }} style={{
            background: "#F0EBE3", border: "none", borderRadius: 9, padding: "8px 14px",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            fontSize: 13, color: "#1C3A2F", fontWeight: 600,
          }}>
            <Upload size={13} /> Bulk Import
          </button>
          <button onClick={() => { setShowAdd(!showAdd); setShowBulk(false); setEditQ(null); }} style={{
            background: "#1C3A2F", color: "#fff", border: "none", borderRadius: 9,
            padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center",
            gap: 6, fontSize: 13, fontWeight: 600,
          }}>
            <Plus size={13} /> Add Question
          </button>
        </div>
      </div>

      {showBulk && (
        <div style={{ background: "#F7F3ED", borderRadius: 14, padding: 20, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1C3A2F", marginBottom: 8 }}>Bulk Import (JSON Array)</h3>
          <p style={{ fontSize: 12, color: "#9A9A9A", marginBottom: 10 }}>
            Paste a JSON array of questions. Each object needs: level, question, answer. Optional: subject, theme, difficulty, type, options, hint, explanation, overrideId.
          </p>
          <textarea
            value={bulkJson}
            onChange={e => setBulkJson(e.target.value)}
            rows={8}
            placeholder={`[\n  {\n    "level": "A",\n    "subject": "math",\n    "question": "What is 2 + 3?",\n    "answer": "5"\n  }\n]`}
            style={{
              width: "100%", fontSize: 13, color: "#1A1A1A", background: "#fff",
              border: "1.5px solid #E0D9CF", borderRadius: 10, padding: "12px",
              fontFamily: "monospace", resize: "vertical", outline: "none", marginBottom: 10,
            }}
          />
          {bulkError && <p style={{ color: "#E8604C", fontSize: 13, marginBottom: 8 }}>{bulkError}</p>}
          {bulkSuccess && <p style={{ color: "#16A34A", fontSize: 13, marginBottom: 8 }}>{bulkSuccess}</p>}
          <button onClick={handleBulk} style={{
            background: "#2A5240", color: "#fff", border: "none", borderRadius: 9,
            padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <Upload size={14} /> Import
          </button>
        </div>
      )}

      {showAdd && !editQ && (
        <div style={{ background: "#F7F3ED", borderRadius: 14, padding: 20, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1C3A2F", marginBottom: 16 }}>Add New Question</h3>
          <QuestionForm initial={{ level, subject }} onSave={handleAdd} onCancel={() => setShowAdd(false)} />
        </div>
      )}

      {editQ && (
        <div style={{ background: "#F7F3ED", borderRadius: 14, padding: 20, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1C3A2F", marginBottom: 16 }}>Edit Question</h3>
          <QuestionForm initial={editQ} onSave={handleEdit} onCancel={() => setEditQ(null)} />
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: 40, color: "#9A9A9A" }}>Loading questions...</div>
      ) : questions.length === 0 ? (
        <div style={{
          textAlign: "center", padding: 48, background: "#F7F3ED", borderRadius: 14,
          color: "#9A9A9A", fontSize: 14,
        }}>
          No custom questions for Level {level} ({subject}) yet.<br />
          <span style={{ fontSize: 12 }}>Generated questions run automatically — add custom ones above.</span>
        </div>
      ) : (
        <div style={{ overflowX: "auto", borderRadius: 14, border: "1px solid #E0D9CF" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F7F3ED" }}>
                {["Level","Subject","Question","Answer","Type","Actions"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#6B6B6B", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.map(q => (
                <QuestionRow key={q.id} q={q} onDelete={() => handleDelete(q.id)} onEdit={() => { setEditQ(q); setShowAdd(false); setShowBulk(false); }} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ConfigTab() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  useEffect(() => {
    adminFetch("/api/admin/config").then(r => r.json()).then(d => {
      setConfig(d);
      setLoading(false);
    });
  }, []);

  const save = async (key: string, value: string) => {
    setSaving(key);
    const res = await adminFetch("/api/admin/config", "PUT", { key, value });
    if (res.ok) {
      setConfig(c => ({ ...c, [key]: value }));
      showToast(`Saved ${key} = ${value}`);
    }
    setSaving(null);
  };

  if (loading) return <div style={{ textAlign: "center", padding: 40, color: "#9A9A9A" }}>Loading config...</div>;

  const NumberConfig = ({ k, label, desc, min, max, step }: { k: string; label: string; desc: string; min: number; max: number; step?: number }) => {
    const [val, setVal] = useState(config[k] || "");
    return (
      <div style={{ background: "#F7F3ED", borderRadius: 14, padding: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1C3A2F", marginBottom: 4 }}>{label}</h3>
        <p style={{ fontSize: 13, color: "#9A9A9A", marginBottom: 16 }}>{desc}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input
            type="number" min={min} max={max} step={step || 1} value={val}
            onChange={e => setVal(e.target.value)}
            style={{
              width: 100, fontSize: 20, fontWeight: 700, color: "#1C3A2F", background: "#fff",
              border: "2px solid #E0D9CF", borderRadius: 10, padding: "8px 14px",
              fontFamily: "'Instrument Sans', sans-serif", outline: "none",
            }}
          />
          <span style={{ fontSize: 13, color: "#6B6B6B" }}>Current: <b>{config[k]}</b></span>
          <button
            onClick={() => save(k, val)}
            disabled={saving === k || val === config[k]}
            style={{
              background: "#1C3A2F", color: "#fff", border: "none", borderRadius: 10,
              padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer",
              opacity: saving === k || val === config[k] ? 0.5 : 1,
              display: "flex", alignItems: "center", gap: 6,
              fontFamily: "'Instrument Sans', sans-serif",
            }}
          >
            <Save size={14} /> {saving === k ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, background: "#1C3A2F", color: "#fff",
          borderRadius: 12, padding: "12px 20px", fontSize: 14, fontWeight: 600,
          zIndex: 999, display: "flex", alignItems: "center", gap: 8,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}>
          <Check size={15} /> {toast}
        </div>
      )}
      <NumberConfig
        k="daily_q" label="Questions Per Session"
        desc="Number of questions a child answers in a single daily practice session."
        min={5} max={200}
      />
      <NumberConfig
        k="days_per_level" label="Days Per Level"
        desc="Number of practice days required to advance to the next level."
        min={1} max={365}
      />
    </div>
  );
}

export default function QuestionsAdminPage() {
  const [unlocked, setUnlocked] = useState(() => !!sessionStorage.getItem(ADMIN_KEY));
  const [tab, setTab] = useState<"questions" | "config">("questions");

  if (!unlocked) return <AdminGate onUnlock={() => setUnlocked(true)} />;

  const tabStyle = (active: boolean) => ({
    padding: "10px 20px", border: "none", borderRadius: 10, cursor: "pointer",
    fontSize: 14, fontWeight: 700, fontFamily: "'Instrument Sans', sans-serif",
    background: active ? "#1C3A2F" : "#F0EBE3",
    color: active ? "#fff" : "#6B6B6B",
    display: "flex", alignItems: "center", gap: 7,
  });

  return (
    <div style={{ minHeight: "100vh", background: "#F7F3ED", fontFamily: "'Instrument Sans', sans-serif" }}>
      <style>{`@import url('${G_FONT}'); *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`}</style>

      {/* Header */}
      <div style={{ background: "#1C3A2F", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Brain size={22} color="#E5B96A" />
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>e-Skillora</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 16 }}>/</span>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 600 }}>Question Manager</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="/admin" style={{
            background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(255,255,255,0.2)", borderRadius: 9, padding: "7px 14px",
            fontSize: 13, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
          }}>
            Analytics Dashboard
          </a>
          <button
            onClick={() => { sessionStorage.removeItem(ADMIN_KEY); setUnlocked(false); }}
            style={{
              background: "rgba(232,96,76,0.15)", color: "#E8604C", border: "1px solid rgba(232,96,76,0.3)",
              borderRadius: 9, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            Lock
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          <button style={tabStyle(tab === "questions")} onClick={() => setTab("questions")}>
            <BookOpen size={16} /> Custom Questions
          </button>
          <button style={tabStyle(tab === "config")} onClick={() => setTab("config")}>
            <Settings size={16} /> Configuration
          </button>
        </div>

        {tab === "questions" && <QuestionsTab />}
        {tab === "config" && <ConfigTab />}
      </div>
    </div>
  );
}
