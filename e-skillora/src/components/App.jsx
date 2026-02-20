import { useState } from 'react'
import SetupScreen from './SetupScreen.jsx'
import ChatScreen from './ChatScreen.jsx'
import AnalyticsDashboard from './AnalyticsDashboard.jsx'
import '../styles/globals.css'

export default function App() {
  const [screen, setScreen] = useState('setup') // setup | chat | analytics
  const [config, setConfig] = useState(null)

  function handleStart(cfg) {
    setConfig(cfg)
    setScreen('chat')
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">e-<span>Skillora</span><sub>DATA ENGINE v2</sub></div>
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${screen === 'setup' || screen === 'chat' ? 'active' : ''}`}
            onClick={() => setScreen(config ? 'chat' : 'setup')}
          >
            🎓 Tutor
          </button>
          <button
            className={`nav-tab ${screen === 'analytics' ? 'active' : ''}`}
            onClick={() => setScreen('analytics')}
          >
            📊 Data Lab
          </button>
        </nav>
        <div className="live-badge">
          <div className="live-dot" />
          COLLECTING
        </div>
      </header>

      {screen === 'setup' && <SetupScreen onStart={handleStart} />}
      {screen === 'chat' && config && <ChatScreen config={config} onBack={() => setScreen('setup')} />}
      {screen === 'analytics' && <AnalyticsDashboard />}
    </div>
  )
}
