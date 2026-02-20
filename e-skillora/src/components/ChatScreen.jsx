import { useState, useRef, useEffect } from 'react'
import { BUDDIES, GRADE_ICON } from '../data/curriculum.js'
import { DataEngine } from '../engine/DataEngine.js'
import { callClaude, buildSystemPrompt } from '../engine/api.js'

// ── Render AI message text with visual step cards and quiz options
function renderText(text) {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <br key={i} />

    const isStep = /^[🔤🔢➕➖✅👆👉🎯💡🎉⭐🔥⚡🧩📝🌟💫✨🚀🏆🎓👑🧠]/.test(line.trim())
    const isOption = /^[A-D][).]\s/.test(line.trim())

    const parts = line.split(/(\*\*[^*]+\*\*)/).map((p, j) =>
      p.startsWith('**') && p.endsWith('**')
        ? <strong key={j} style={{ color: 'var(--accent2)' }}>{p.slice(2, -2)}</strong>
        : p
    )

    if (isStep) return (
      <div key={i} style={{
        background: 'rgba(59,130,246,0.07)',
        border: '1px solid rgba(59,130,246,0.15)',
        borderRadius: '8px', padding: '6px 10px',
        marginBottom: '5px', fontSize: '14px', lineHeight: '1.5',
      }}>{parts}</div>
    )

    if (isOption) return (
      <div key={i} style={{
        background: 'rgba(139,92,246,0.08)',
        border: '1px solid rgba(139,92,246,0.18)',
        borderRadius: '8px', padding: '6px 12px',
        marginBottom: '5px', fontSize: '14px', fontWeight: '600',
      }}>{parts}</div>
    )

    return <div key={i} style={{ marginBottom: '3px', lineHeight: '1.6' }}>{parts}</div>
  })
}

export default function ChatScreen({ config, onBack }) {
  const { grade, subject, topic, buddy, studentName, studentId } = config
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionStats, setSessionStats] = useState({ breakthroughs: 0, frustrations: 0, exchanges: 0 })
  const [showMisconceptionModal, setShowMisconceptionModal] = useState(false)
  const [pendingMisconception, setPendingMisconception] = useState(null)
  const [misconceptionInput, setMisconceptionInput] = useState('')
  const [lastBreakthrough, setLastBreakthrough] = useState(false)
  const [lastFrustration, setLastFrustration] = useState(false)
  const engineRef = useRef(null)
  const msgsEndRef = useRef(null)
  const taRef = useRef(null)
  const sessionId = useRef(`sess_${Date.now()}`)

  const systemPrompt = buildSystemPrompt({ buddy: BUDDIES[buddy], studentName, grade, subject, topic })

  useEffect(() => {
    engineRef.current = new DataEngine(sessionId.current, {
      id: studentId, grade, subject, topic, name: studentName
    })
    startSession()
    return () => { engineRef.current?.saveSession() }
  }, [])

  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function startSession() {
    setLoading(true)
    const intro = await callClaude(
      [{ role: 'user', content: `Reply in EXACTLY 2 lines then stop. Line 1: greet ${studentName} and name ONE fun fact about "${topic}" with an emoji. Line 2: ask "Want to learn step by step or get quizzed first? 🎯" — nothing else.` }],
      systemPrompt,
      120
    )
    setMessages([{ role: 'ai', text: intro, id: `m_${Date.now()}` }])
    setLoading(false)
  }

  async function sendMessage(text) {
    if (!text.trim() || loading) return
    const engine = engineRef.current
    engine.resetTimer()

    const userMsg = { role: 'user', text, id: `m_${Date.now()}` }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setLastBreakthrough(false)
    setLastFrustration(false)

    const history = [...messages, userMsg].map(m => ({
      role: m.role === 'ai' ? 'assistant' : 'user',
      content: m.text
    }))

    const aiText = await callClaude(history, systemPrompt)
    const exchange = await engine.logExchange(text, aiText)

    setSessionStats(prev => ({
      breakthroughs: prev.breakthroughs + (exchange.isBreakthrough ? 1 : 0),
      frustrations: prev.frustrations + (exchange.frustration ? 1 : 0),
      exchanges: prev.exchanges + 1,
    }))

    if (exchange.isBreakthrough) setLastBreakthrough({ attempts: exchange.breakthroughAfterAttempts })
    if (exchange.frustration) setLastFrustration(exchange.frustration.type)

    // Trigger misconception modal after 2+ consecutive wrong answers
    if (exchange.outcome === 'wrong' && engine.consecutiveWrong >= 2 && engine.consecutiveWrong % 2 === 0) {
      setPendingMisconception({ wrongAnswer: text, topic, aiExplanation: aiText })
      setShowMisconceptionModal(true)
    }

    setMessages(prev => [...prev, {
      role: 'ai', text: aiText, id: `m_${Date.now()}`,
      isBreakthrough: exchange.isBreakthrough
    }])
    setLoading(false)
  }

  async function submitMisconception() {
    if (!misconceptionInput.trim()) { setShowMisconceptionModal(false); return }
    await engineRef.current.logMisconception(
      pendingMisconception.wrongAnswer,
      misconceptionInput,
      pendingMisconception.aiExplanation,
      topic
    )
    const thinking = misconceptionInput
    setMisconceptionInput('')
    setShowMisconceptionModal(false)
    setPendingMisconception(null)
    sendMessage(`I was thinking: ${thinking}`)
  }

  const QUICK_PROMPTS = [
    { label: '👆 Step by step', val: 'Teach me step by step, one step at a time' },
    { label: '💡 Different example', val: 'Show me a different real-world example' },
    { label: '😕 I\'m confused', val: "I'm confused, can you make it simpler?" },
    { label: '🔁 Say it again', val: 'Can you explain that differently?' },
  ]

  return (
    <div className="chat-layout">
      {/* Top bar */}
      <div className="chat-bar">
        <div className="chat-avatar">
          {BUDDIES[buddy]}
          <div className="online-dot" />
        </div>
        <div className="chat-info">
          <h3>AI Tutor {BUDDIES[buddy]} · {studentName}</h3>
          <p>{subject} · {topic} · G{grade} {GRADE_ICON[grade]}</p>
        </div>
        <div className="chat-bar-right">
          <span className="chip chip-blue">💬 {sessionStats.exchanges}</span>
          {sessionStats.breakthroughs > 0 &&
            <span className="chip chip-green">⚡ {sessionStats.breakthroughs} breakthrough{sessionStats.breakthroughs !== 1 ? 's' : ''}</span>}
          {sessionStats.frustrations > 0 &&
            <span className="chip chip-yellow">😤 {sessionStats.frustrations} signal{sessionStats.frustrations !== 1 ? 's' : ''}</span>}
          <button className="back-btn" onClick={() => { engineRef.current?.saveSession(); onBack() }}>
            ← End Session
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="msgs">
        {messages.map((m, i) => (
          <div key={m.id || i} className={`msg ${m.role === 'ai' ? 'ai' : 'user'}`}>
            <div className={`msg-av ${m.role === 'ai' ? 'ai' : 'usr'}`}>
              {m.role === 'ai' ? BUDDIES[buddy] : '🧒'}
            </div>
            <div className="bubble">{renderText(m.text)}</div>
          </div>
        ))}

        {lastBreakthrough && (
          <div className="breakthrough-banner">
            <span className="bt-icon">⚡</span>
            <div>
              <div className="bt-text">Breakthrough moment detected!</div>
              <div className="bt-sub">Got it after {lastBreakthrough.attempts} attempts — logged for training data</div>
            </div>
          </div>
        )}

        {lastFrustration && (
          <div className="frustration-notice">
            {lastFrustration === 'explicit_frustration'
              ? '😤 Frustration signal detected & logged'
              : '⚠️ Disengagement signal detected & logged'}
          </div>
        )}

        {loading && (
          <div className="msg ai">
            <div className="msg-av ai">{BUDDIES[buddy]}</div>
            <div className="typing">
              <div className="dot" /><div className="dot" /><div className="dot" />
            </div>
          </div>
        )}
        <div ref={msgsEndRef} />
      </div>

      {/* Quick prompts */}
      <div className="quick-row">
        {QUICK_PROMPTS.map((qp, i) => (
          <button key={i} className="qp" onClick={() => sendMessage(qp.val)} disabled={loading}>
            {qp.label}
          </button>
        ))}
        <button
          className="qp qp-green"
          onClick={() => sendMessage('Give me one quick quiz question with A B C D — keep it short!')}
          disabled={loading}
        >
          🎯 Quiz Me!
        </button>
      </div>

      {/* Input */}
      <div className="input-box">
        <textarea
          ref={taRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }}
          placeholder={`Ask ${BUDDIES[buddy]} anything about ${topic}...`}
          rows={1}
          onInput={e => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px' }}
        />
        <button className="send" onClick={() => sendMessage(input)} disabled={loading || !input.trim()}>➤</button>
      </div>

      {/* Misconception Modal */}
      {showMisconceptionModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">🧩</div>
            <h3>Help us understand your thinking!</h3>
            <p>This question is tricky! Before we explain — what were you thinking when you answered? This helps make the tutor smarter for everyone!</p>
            <div className="modal-q">Topic: <strong>{topic}</strong></div>
            <textarea
              className="modal-input"
              value={misconceptionInput}
              onChange={e => setMisconceptionInput(e.target.value)}
              placeholder='e.g. "I thought 1/4 was bigger because 4 is a bigger number..."'
            />
            <div className="modal-btns">
              <button className="modal-submit" onClick={submitMisconception}>💡 Submit & Get Help</button>
              <button className="modal-skip" onClick={() => setShowMisconceptionModal(false)}>Skip</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
