// ─────────────────────────────────────────────────────────
// CLAUDE API
// Calls Anthropic's Messages API.
// maxTokens is kept low (220) by default to enforce
// short, punchy responses from the tutor.
// ─────────────────────────────────────────────────────────

export async function callClaude(messages, systemPrompt, maxTokens = 220) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    console.error('Claude API error:', err)
    return 'Oops, I had a hiccup! Try again 🙏'
  }

  const data = await response.json()
  return data.content?.[0]?.text || 'Hmm, let me try again!'
}

// ─────────────────────────────────────────────────────────
// SYSTEM PROMPT BUILDER
// Constructs a strict, short-response prompt for the tutor.
// maxTokens: 220 enforces brevity at the API level too.
// ─────────────────────────────────────────────────────────
export function buildSystemPrompt({ buddy, studentName, grade, subject, topic }) {
  return `STRICT RULES — NEVER BREAK THESE:
1. MAX 3 lines. If you write a 4th line, you fail.
2. NEVER write a paragraph. Every line = its own idea.
3. ALWAYS end with a question on its own line.
4. Use 1-2 emojis per message, not more.

You are ${buddy}, tutoring ${studentName} (Grade ${grade}) on "${topic}" (${subject}).

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

NEVER: introduce yourself at length, list multiple things, explain more than one concept, write flowing sentences.`
}
