import { useState } from 'react'
import { GRADE_DATA, BUDDIES, GRADE_ICON } from '../data/curriculum.js'

export default function SetupScreen({ onStart }) {
  const [grade, setGrade] = useState(null)
  const [subject, setSubject] = useState(null)
  const [topic, setTopic] = useState(null)
  const [buddy, setBuddy] = useState(0)
  const [name, setName] = useState('')

  const topics = grade && subject ? GRADE_DATA[grade]?.[subject] ?? [] : []
  const ready = grade && subject && topic && name.trim()

  return (
    <div className="setup-wrap">
      <div className="setup-title">Start a Learning Session</div>
      <div className="setup-sub">
        Every session feeds the data engine. All interactions are logged anonymously.
      </div>

      <div className="card">
        <div className="card-label">Student Name</div>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter student name or nickname..."
          className="text-input"
        />
      </div>

      <div className="card">
        <div className="card-label">Grade Level</div>
        <div className="grade-grid">
          {Array.from({ length: 12 }, (_, i) => i + 1).map(g => (
            <button
              key={g}
              className={`g-btn${grade === g ? ' on' : ''}`}
              onClick={() => { setGrade(g); setTopic(null) }}
            >
              <span className="gi">{GRADE_ICON[g]}</span>
              G{g}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-label">Subject</div>
        <div className="subj-row">
          <button
            className={`subj-btn${subject === 'math' ? ' on' : ''}`}
            onClick={() => { setSubject('math'); setTopic(null) }}
          >
            🔢 Math
          </button>
          <button
            className={`subj-btn${subject === 'reading' ? ' on' : ''}`}
            onClick={() => { setSubject('reading'); setTopic(null) }}
          >
            📖 Reading
          </button>
        </div>
      </div>

      {topics.length > 0 && (
        <div className="card">
          <div className="card-label">Topic</div>
          <div className="topic-wrap">
            {topics.map(t => (
              <button
                key={t}
                className={`topic-btn${topic === t ? ' on' : ''}`}
                onClick={() => setTopic(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-label">Tutor Buddy</div>
        <div className="buddy-row">
          {BUDDIES.map((b, i) => (
            <button
              key={i}
              className={`buddy-btn${buddy === i ? ' on' : ''}`}
              onClick={() => setBuddy(i)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <button
        className="start-btn"
        disabled={!ready}
        onClick={() => onStart({
          grade, subject, topic, buddy,
          studentName: name.trim(),
          studentId: `s_${Date.now()}`
        })}
      >
        {ready
          ? `🚀 Begin Session — ${name}, Grade ${grade} ${GRADE_ICON[grade]}`
          : 'Fill in all fields to begin'}
      </button>
    </div>
  )
}
