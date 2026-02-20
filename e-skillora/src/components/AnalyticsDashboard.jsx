import { useState, useEffect } from 'react'
import { DB } from '../engine/storage.js'

function fmt(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('en-US', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

function exportCSV(type, items) {
  if (!items.length) return
  const keys = Object.keys(items[0]).filter(k => typeof items[0][k] !== 'object' || items[0][k] === null)
  const csv = [
    keys.join(','),
    ...items.map(r => keys.map(k => JSON.stringify(r[k] ?? '') || '""').join(','))
  ].join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  a.download = `eskillora_${type}_${Date.now()}.csv`
  a.click()
}

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [data, setData] = useState({ sessions: [], breakthroughs: [], misconceptions: [], frustrations: [] })
  const [loading, setLoading] = useState(true)

  async function loadData() {
    setLoading(true)
    try {
      const [sKeys, bKeys, mKeys, fKeys] = await Promise.all([
        DB.list('session:'), DB.list('breakthrough:'),
        DB.list('misconception:'), DB.list('frustration:')
      ])
      const [sessions, breakthroughs, misconceptions, frustrations] = await Promise.all([
        Promise.all(sKeys.map(k => DB.get(k))),
        Promise.all(bKeys.map(k => DB.get(k))),
        Promise.all(mKeys.map(k => DB.get(k))),
        Promise.all(fKeys.map(k => DB.get(k))),
      ])
      setData({
        sessions: sessions.filter(Boolean).sort((a, b) => b.startTime - a.startTime),
        breakthroughs: breakthroughs.filter(Boolean).sort((a, b) => b.timestamp - a.timestamp),
        misconceptions: misconceptions.filter(Boolean).sort((a, b) => b.timestamp - a.timestamp),
        frustrations: frustrations.filter(Boolean).sort((a, b) => b.timestamp - a.timestamp),
      })
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const totalExchanges = data.sessions.reduce((s, sess) => s + (sess.totalExchanges || 0), 0)
  const totalCorrect = data.sessions.reduce((s, sess) => s + (sess.correctAnswers || 0), 0)
  const avgAccuracy = totalExchanges ? Math.round((totalCorrect / totalExchanges) * 100) : 0
  const avgDuration = data.sessions.length
    ? Math.round(data.sessions.reduce((s, sess) => s + ((sess.duration || 0) / 60000), 0) / data.sessions.length)
    : 0

  const gradeActivity = {}
  data.sessions.forEach(s => {
    if (s.grade) gradeActivity[s.grade] = (gradeActivity[s.grade] || 0) + (s.totalExchanges || 0)
  })
  const maxActivity = Math.max(...Object.values(gradeActivity), 1)

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 57px)', color: 'var(--text2)', fontFamily: "'DM Mono',monospace", fontSize: '13px' }}>
      Loading data...
    </div>
  )

  return (
    <div className="analytics-wrap">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <div className="analytics-title">📊 Data Lab</div>
          <div className="analytics-sub">Real-time behavioral data from every tutoring session</div>
        </div>
        <button className="refresh-btn" onClick={loadData}>⟳ Refresh</button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {[
          { label: 'Total Sessions', val: data.sessions.length, sub: 'unique sessions', cls: 's-blue' },
          { label: 'Total Exchanges', val: totalExchanges, sub: 'student ↔ AI messages', cls: 's-teal' },
          { label: 'Breakthroughs', val: data.breakthroughs.length, sub: 'wrong→right moments', cls: 's-green' },
          { label: 'Misconceptions', val: data.misconceptions.length, sub: 'wrong mental models', cls: 's-purple' },
          { label: 'Frustration Signals', val: data.frustrations.length, sub: 'emotional states', cls: 's-yellow' },
          { label: 'Avg Accuracy', val: `${avgAccuracy}%`, sub: 'correct / total', cls: 's-blue' },
          { label: 'Avg Session', val: `${avgDuration}m`, sub: 'minutes', cls: 's-teal' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="s-label">{s.label}</div>
            <div className={`s-val ${s.cls}`}>{s.val}</div>
            <div className="s-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Grade Heatmap */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-label">Activity by Grade</div>
        <div className="heatmap">
          {Array.from({ length: 12 }, (_, i) => i + 1).map(g => {
            const activity = gradeActivity[g] || 0
            const intensity = activity / maxActivity
            return (
              <div key={g} className="heat-cell" style={{
                background: activity === 0 ? 'rgba(59,130,246,0.04)' : `rgba(59,130,246,${0.1 + intensity * 0.7})`,
                border: '1px solid rgba(59,130,246,0.1)'
              }}>
                G{g}<br />{activity}
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-row">
        {[['overview', '🔍 Sessions'], ['breakthroughs', '⚡ Breakthroughs'], ['misconceptions', '🧩 Misconceptions'], ['frustrations', '😤 Frustration']].map(([id, label]) => (
          <button key={id} className={`atab${activeTab === id ? ' on' : ''}`} onClick={() => setActiveTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {/* Sessions Tab */}
      {activeTab === 'overview' && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div className="section-title">Session Log <span>{data.sessions.length} sessions</span></div>
            <button className="export-btn" onClick={() => exportCSV('sessions', data.sessions)}>↓ Export CSV</button>
          </div>
          {data.sessions.length === 0
            ? <div className="empty-state"><div className="e-icon">📭</div><p>No sessions yet.<br />Start a tutoring session to begin collecting data.</p></div>
            : (
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead><tr>
                    <th>Student</th><th>Grade</th><th>Subject / Topic</th>
                    <th>Exchanges</th><th>Correct</th><th>Breakthroughs</th>
                    <th>Frustrations</th><th>Duration</th><th>Time</th>
                  </tr></thead>
                  <tbody>
                    {data.sessions.map(s => (
                      <tr key={s.id}>
                        <td className="highlight">{s.studentName || '—'}</td>
                        <td><span className="grade-pill">G{s.grade}</span></td>
                        <td style={{ fontSize: '12px' }}>{s.subject} / {s.topic}</td>
                        <td>{s.totalExchanges || 0}</td>
                        <td style={{ color: 'var(--green)' }}>{s.correctAnswers || 0}</td>
                        <td>{s.breakthroughCount > 0 ? <span className="bt-badge">⚡ {s.breakthroughCount}</span> : '—'}</td>
                        <td>{s.frustrationCount > 0 ? <span className="fr-badge">😤 {s.frustrationCount}</span> : '—'}</td>
                        <td style={{ fontFamily: "'DM Mono',monospace", fontSize: '12px' }}>{s.duration ? Math.round(s.duration / 60000) + 'm' : '—'}</td>
                        <td style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', color: 'var(--text3)' }}>{fmt(s.startTime)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      )}

      {/* Breakthroughs Tab */}
      {activeTab === 'breakthroughs' && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div className="section-title">⚡ Breakthrough Moments <span>wrong→right after 2+ attempts</span></div>
            <button className="export-btn" onClick={() => exportCSV('breakthroughs', data.breakthroughs)}>↓ Export CSV</button>
          </div>
          {data.breakthroughs.length === 0
            ? <div className="empty-state"><div className="e-icon">⚡</div><p>No breakthroughs yet.<br />Detected when a student gets a question wrong 2+ times, then answers correctly.</p></div>
            : (
              <table className="data-table">
                <thead><tr><th>Grade</th><th>Topic</th><th>Wrong Attempts</th><th>Breaking Message</th><th>Time</th></tr></thead>
                <tbody>
                  {data.breakthroughs.map(b => (
                    <tr key={b.id} className="bt-row">
                      <td><span className="grade-pill">G{b.grade}</span></td>
                      <td style={{ fontSize: '12px' }}>{b.topic}</td>
                      <td><span className="bt-badge">⚡ {b.wrongAttempts} wrong</span></td>
                      <td><div className="quote-block">"{b.breakingExchange?.studentMessage?.slice(0, 80)}"</div></td>
                      <td style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', color: 'var(--text3)' }}>{fmt(b.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      )}

      {/* Misconceptions Tab */}
      {activeTab === 'misconceptions' && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div className="section-title">🧩 Misconceptions <span>wrong mental models in students' own words</span></div>
            <button className="export-btn" onClick={() => exportCSV('misconceptions', data.misconceptions)}>↓ Export CSV</button>
          </div>
          {data.misconceptions.length === 0
            ? <div className="empty-state"><div className="e-icon">🧩</div><p>No misconceptions yet.<br />Triggered when a student struggles 2+ times and explains their thinking.</p></div>
            : (
              <table className="data-table">
                <thead><tr><th>Grade</th><th>Subject</th><th>Topic</th><th>Wrong Answer</th><th>Student's Thinking (Gold Data)</th><th>Time</th></tr></thead>
                <tbody>
                  {data.misconceptions.map(m => (
                    <tr key={m.id}>
                      <td><span className="grade-pill">G{m.grade}</span></td>
                      <td style={{ fontSize: '12px' }}>{m.subject}</td>
                      <td style={{ fontSize: '12px' }}>{m.topic}</td>
                      <td style={{ fontSize: '12px', color: 'var(--red)' }}>{m.wrongAnswer?.slice(0, 60)}</td>
                      <td>
                        <span className="mc-badge" style={{ marginBottom: '6px', display: 'inline-block' }}>student thinking</span>
                        <div className="quote-block">"{m.studentThinking}"</div>
                      </td>
                      <td style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', color: 'var(--text3)' }}>{fmt(m.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      )}

      {/* Frustration Tab */}
      {activeTab === 'frustrations' && (
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div className="section-title">😤 Frustration Signals <span>emotional & disengagement patterns</span></div>
            <button className="export-btn" onClick={() => exportCSV('frustrations', data.frustrations)}>↓ Export CSV</button>
          </div>
          {data.frustrations.length === 0
            ? <div className="empty-state"><div className="e-icon">😤</div><p>No frustration signals yet.<br />Words like "I don't get it", very short replies, or "ugh" are flagged here with context.</p></div>
            : (
              <table className="data-table">
                <thead><tr><th>Grade</th><th>Topic</th><th>Type</th><th>Trigger Message</th><th>Prior Context</th><th>Time</th></tr></thead>
                <tbody>
                  {data.frustrations.map(f => (
                    <tr key={f.id}>
                      <td><span className="grade-pill">G{f.grade}</span></td>
                      <td style={{ fontSize: '12px' }}>{f.topic}</td>
                      <td><span className="fr-badge">{f.type === 'explicit_frustration' ? 'explicit' : 'disengagement'}</span></td>
                      <td><div className="quote-block" style={{ borderColor: 'var(--yellow)' }}>"{f.studentMessage}"</div></td>
                      <td style={{ fontSize: '12px', color: 'var(--text3)' }}>{f.priorContext?.join(' → ')?.slice(0, 80) || '—'}</td>
                      <td style={{ fontFamily: "'DM Mono',monospace", fontSize: '11px', color: 'var(--text3)' }}>{fmt(f.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      )}
    </div>
  )
}
