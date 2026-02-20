import { DB } from './storage.js'
import { FRUSTRATION_SIGNALS, DISENGAGEMENT_SIGNALS } from '../data/curriculum.js'

// ─────────────────────────────────────────────────────────
// DATA ENGINE
// Captures every meaningful behavioral signal per session:
//   • Breakthrough moments  (wrong × 2+ → correct)
//   • Misconceptions        (student's wrong mental model in their own words)
//   • Frustration signals   (explicit & disengagement patterns)
//   • Full session log      (exchanges, accuracy, duration)
// ─────────────────────────────────────────────────────────

export class DataEngine {
  constructor(sessionId, studentProfile) {
    this.sessionId = sessionId
    this.student = studentProfile
    this.session = {
      id: sessionId,
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      grade: studentProfile.grade,
      subject: studentProfile.subject,
      topic: studentProfile.topic,
      startTime: Date.now(),
      exchanges: [],
      breakthroughs: [],
      misconceptions: [],
      frustrationSignals: [],
    }
    this.consecutiveWrong = 0
    this.lastQuestionText = null
    this.messageStartTime = Date.now()
  }

  // ── Detect frustration from student message
  detectFrustration(text) {
    const lower = text.toLowerCase()
    const matched = FRUSTRATION_SIGNALS.filter(s => lower.includes(s))
    const isDisengaged = DISENGAGEMENT_SIGNALS.some(s => lower.trim() === s)
    const isVeryShort = text.trim().length < 8

    if (matched.length > 0) return { type: 'explicit_frustration', signals: matched }
    if (isDisengaged && isVeryShort) return { type: 'disengagement', signals: [text.trim()] }
    return null
  }

  // ── Detect question text from AI response
  extractQuestion(aiText) {
    const lines = aiText.split('\n')
    for (const line of lines) {
      if (line.includes('?') && line.length > 20) return line.trim()
    }
    return null
  }

  // ── Classify AI response outcome
  detectOutcome(aiResponse) {
    const lower = aiResponse.toLowerCase()
    const correctSignals = ['correct','right','exactly','perfect','well done','great job','yes!',
      "that's it","you got it","nailed it","awesome","amazing","brilliant","🎉"]
    const wrongSignals = ['not quite','try again','almost','incorrect','actually','let me help',
      'not exactly','close but','oops','hmm, not','almost!']
    if (correctSignals.some(s => lower.includes(s))) return 'correct'
    if (wrongSignals.some(s => lower.includes(s))) return 'wrong'
    return 'neutral'
  }

  // ── Log one exchange (call after every AI response)
  async logExchange(userMsg, aiResponse, metadata = {}) {
    const timeToRespond = Date.now() - this.messageStartTime
    const frustration = this.detectFrustration(userMsg)
    const outcome = this.detectOutcome(aiResponse)
    const question = this.extractQuestion(aiResponse)

    const exchange = {
      id: `ex_${Date.now()}`,
      timestamp: Date.now(),
      userMessage: userMsg,
      aiResponse,
      timeToRespond,
      outcome,
      frustration,
      questionText: question,
      attemptNumber: metadata.attemptNumber || 1,
      hintsUsed: metadata.hintsUsed || 0,
      isBreakthrough: false,
      breakthroughAfterAttempts: null,
    }

    if (outcome === 'wrong') {
      this.consecutiveWrong++
      if (!this.lastQuestionText) this.lastQuestionText = question
    } else if (outcome === 'correct') {
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
          breakingExchange: { studentMessage: userMsg, aiResponse },
          previousExchanges: this.session.exchanges.slice(-this.consecutiveWrong - 1),
        }
        this.session.breakthroughs.push(breakthrough)
        await DB.set(`breakthrough:${breakthrough.id}`, breakthrough)
        exchange.isBreakthrough = true
        exchange.breakthroughAfterAttempts = this.consecutiveWrong
      }
      this.consecutiveWrong = 0
      this.lastQuestionText = null
    }

    // Log frustration signals separately for analysis
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
      }
      this.session.frustrationSignals.push(signal)
      await DB.set(`frustration:${signal.id}`, signal)
    }

    this.session.exchanges.push(exchange)
    this.messageStartTime = Date.now()
    return exchange
  }

  // ── Log a misconception (student's wrong mental model in their own words)
  async logMisconception(wrongAnswer, studentThinking, correctAnswer, topic) {
    const misconception = {
      id: `mc_${Date.now()}`,
      sessionId: this.sessionId,
      grade: this.student.grade,
      subject: this.student.subject,
      topic,
      timestamp: Date.now(),
      wrongAnswer,
      studentThinking,   // ← gold data: what they THOUGHT was right
      correctAnswer,
    }
    this.session.misconceptions.push(misconception)
    await DB.set(`misconception:${misconception.id}`, misconception)
    return misconception
  }

  // ── Save completed session
  async saveSession() {
    this.session.endTime = Date.now()
    this.session.duration = this.session.endTime - this.session.startTime
    this.session.totalExchanges = this.session.exchanges.length
    this.session.correctAnswers = this.session.exchanges.filter(e => e.outcome === 'correct').length
    this.session.wrongAnswers = this.session.exchanges.filter(e => e.outcome === 'wrong').length
    this.session.breakthroughCount = this.session.breakthroughs.length
    this.session.frustrationCount = this.session.frustrationSignals.length
    await DB.set(`session:${this.sessionId}`, this.session)
    return this.session
  }

  resetTimer() {
    this.messageStartTime = Date.now()
  }
}
