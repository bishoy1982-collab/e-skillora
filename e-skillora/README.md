# e-Skillora 🎓

> AI-powered Math & Reading tutor for Grades 1–12 with a built-in behavioral data collection engine.

![e-Skillora](https://img.shields.io/badge/React-18-blue) ![Claude](https://img.shields.io/badge/Claude-Sonnet_4-purple) ![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ What is e-Skillora?

e-Skillora is an AI tutoring platform that:
- Teaches **Math & Reading** across all 12 grade levels
- Uses **Claude (Sonnet 4)** as the AI tutor with short, interactive, step-by-step responses
- Collects **behavioral training data** from every session to continuously improve the AI
- Provides a **Data Lab dashboard** for real-time analytics

---

## 🧠 Data Collection Engine

Every tutoring session automatically captures:

| Signal | What it captures | Why it matters |
|--------|-----------------|----------------|
| ⚡ **Breakthroughs** | The exact exchange when a student goes from wrong (2+ times) → correct | Most valuable training data — shows what explanation worked |
| 🧩 **Misconceptions** | Student's wrong mental model in their own words | Enables preemptive correction of wrong beliefs |
| 😤 **Frustration signals** | Explicit frustration + disengagement patterns with context | Trains the AI to detect and respond to student emotions |
| 📊 **Session logs** | Every exchange, accuracy, duration, topic | Full behavioral dataset per student |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/bishoy1982-collab/e-skillora.git
cd e-skillora
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Add your Anthropic API key to `.env`:
```
VITE_ANTHROPIC_API_KEY=your_key_here
```

> ⚠️ **Important:** For production, API calls should go through a backend proxy — never expose your API key in client-side code.

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 5. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```
e-skillora/
├── src/
│   ├── components/
│   │   ├── App.jsx              # Root component + routing
│   │   ├── SetupScreen.jsx      # Session setup (grade, subject, topic, buddy)
│   │   ├── ChatScreen.jsx       # AI tutor chat interface
│   │   └── AnalyticsDashboard.jsx  # Data Lab — breakthroughs, misconceptions, etc.
│   ├── engine/
│   │   ├── DataEngine.js        # Core data collection logic
│   │   ├── api.js               # Claude API + system prompt builder
│   │   └── storage.js           # Persistent storage abstraction
│   ├── data/
│   │   └── curriculum.js        # Grade 1–12 topics for Math & Reading
│   ├── styles/
│   │   └── globals.css          # Global styles
│   └── main.jsx                 # React entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🤖 How the AI Tutor Works

The tutor uses **Claude Sonnet 4** with a strict system prompt that enforces:
- **Max 3 lines per response** (enforced by `max_tokens: 220`)
- **Step-by-step teaching** — one micro-concept at a time
- **Always ends with a question** to keep the student engaged
- **Short quiz format** — A/B/C/D on separate lines, nothing else
- **Instant feedback** — one celebration or hint line, not paragraphs

---

## 📊 Data Lab

Navigate to **Data Lab** in the top nav to see:
- Session logs with accuracy, duration, breakthroughs
- Breakthrough moments table (exportable CSV)
- Misconception catalogue (gold training data)
- Frustration signal log with prior context
- Grade activity heatmap

All data can be exported as CSV for use in fine-tuning pipelines.

---

## 🗂️ CSV Question Bank

The `/data` folder contains pre-generated question banks:
- `math_questions_grades1_12.csv` — 2,400 Math questions
- `reading_questions_grades1_12.csv` — 2,400 Reading questions
- `all_questions_grades1_12.csv` — Combined 4,800 questions

Each question includes: `level`, `subject`, `topic`, `difficulty`, `question`, `option_a–d`, `correct_answer`, `explanation`.

---

## 🔮 Roadmap

- [ ] Spaced repetition / mastery tracking per student
- [ ] Dynamic prompts based on student profile (personalization)
- [ ] A/B testing for explanations
- [ ] RAG with question bank for grounded responses
- [ ] Fine-tuning pipeline on collected breakthrough data
- [ ] Parent dashboard
- [ ] Backend API + database (Supabase)

---

## 💰 API Cost Estimate

Using Claude Sonnet 4 at `$3/$15` per million tokens:

| Users / month | Est. cost (optimized) |
|---|---|
| 100 | ~$75 |
| 1,000 | ~$740 |
| 10,000 | ~$7,400 |

With model routing (Haiku for lower grades) costs drop ~60%.

---

## 📄 License

MIT © Bisho
