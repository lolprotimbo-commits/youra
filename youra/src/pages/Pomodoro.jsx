// pages/Pomodoro.jsx
import React, { useState, useEffect, useRef } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const MODES = { focus: 25 * 60, short: 5 * 60, long: 20 * 60 }

const BREAK_TIPS = [
  '🚶 Geh 5 Minuten spazieren — Bewegung verbessert die Gedächtniskonsolidierung signifikant.',
  '💧 Trink ein Glas Wasser. Dehydration reduziert Konzentration um bis zu 20%.',
  '🧘 Probiere die 4-7-8 Atemübung: 4 Sek einatmen, 7 halten, 8 ausatmen.',
  '👀 Schau 20 Sek aus dem Fenster — die 20-20-20 Regel für Augen-Erholung.',
  '🤸 Strecke Rücken und Schultern. Langes Sitzen verkrampft den Nacken.',
  '🎵 Hör 1-2 Songs Musik. Kurze Musikpausen helfen beim Verarbeiten von Lernstoff.',
  '📵 Leg das Handy weg. Echter digitaler Detox, auch kurz.',
]

const LONG_TIPS = [
  '🍳 Koch dir etwas Warmes. Essen in der Pause, nicht am Schreibtisch.',
  '🏃 20-Minuten-Spaziergang. Bewegung boosted Neuroplastizität.',
  '😴 Power-Nap: 15-20 Minuten Schlaf — besser belegt als Kaffee.',
  '🗣️ Ruf jemanden an. Soziale Interaktion reduziert Lernstress.',
]

export default function Pomodoro() {
  const [mode, setMode]         = useState('focus')
  const [timeLeft, setTimeLeft] = useState(MODES.focus)
  const [running, setRunning]   = useState(false)
  const [tip, setTip]           = useState('')
  const [sessions, setSessions] = useLocalStorage('sessions', 0)
  const totalRef = useRef(MODES.focus)
  const intervalRef = useRef(null)

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  const changeMode = (m) => {
    clearInterval(intervalRef.current)
    setRunning(false)
    setMode(m)
    setTimeLeft(MODES[m])
    totalRef.current = MODES[m]
  }

  const toggle = () => {
    if (running) {
      clearInterval(intervalRef.current)
      setRunning(false)
    } else {
      setRunning(true)
      if (mode !== 'focus') showTip(mode)
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            if (mode === 'focus') {
              setSessions(s => s + 1)
              showTip('break')
              setTimeout(() => alert('🎉 Session abgeschlossen! Mach eine Pause.'), 100)
            } else {
              setTimeout(() => alert('Pause vorbei! Zeit wieder zu lernen 💪'), 100)
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  const reset = () => {
    clearInterval(intervalRef.current)
    setRunning(false)
    setTimeLeft(MODES[mode])
  }

  const showTip = (context) => {
    const pool = context === 'long' ? LONG_TIPS : BREAK_TIPS
    setTip(pool[Math.floor(Math.random() * pool.length)])
  }

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const ss = String(timeLeft % 60).padStart(2, '0')
  const circ = 2 * Math.PI * 88
  const progress = timeLeft / MODES[mode]

  return (
    <div>
      <div className="page-title">Timer & Pausen</div>
      <div className="page-sub">Fokussiert lernen mit klugen Pausen</div>

      <div className="grid-2">
        {/* Timer */}
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="timer-modes">
            {[['focus','Fokus (25 min)'],['short','Kurze Pause (5 min)'],['long','Lange Pause (20 min)']].map(([m, label]) => (
              <button key={m} className={`timer-mode${mode === m ? ' active' : ''}`} onClick={() => changeMode(m)}>{label}</button>
            ))}
          </div>

          {/* SVG Ring */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(212,185,120,0.1)" strokeWidth="8" />
              <circle
                cx="100" cy="100" r="88"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="8"
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - progress)}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.9s linear' }}
              />
            </svg>
            <div className="timer-num" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
              {mm}:{ss}
            </div>
          </div>

          <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: 8, marginBottom: 16 }}>
            {running ? (mode === 'focus' ? 'Fokus-Session läuft...' : 'Pause läuft ☕') : 'Bereit zum Starten'}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button className="btn" onClick={toggle}>{running ? '⏸ Pausieren' : '▶ Starten'}</button>
            <button className="btn-ghost" onClick={reset}>↺ Reset</button>
          </div>

          <div style={{ marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
            Sessions heute: <strong style={{ color: 'var(--gold2)' }}>{sessions}</strong>
          </div>
        </div>

        {/* Tips */}
        <div>
          <div className="card" style={{ marginBottom: '0.75rem' }}>
            <div className="card-label">🧠 Pausentipp</div>
            <div style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
              {tip || 'Starte den Timer, um einen personalisierten Pausentipp zu erhalten.'}
            </div>
          </div>

          <div className="card">
            <div className="card-label">📚 Lernmethoden für Jura</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
              {[
                ['Gutachtenstil', 'Obersatz → Definition → Subsumtion → Ergebnis — niemals mit dem Ergebnis beginnen.'],
                ['Subsumtion', 'Jeden Tatbestand sauber prüfen: Merkmal definieren, dann auf den Sachverhalt anwenden.'],
                ['Repetition', 'Definitionen täglich laut sprechen — juristisches Vokabular durch tägliche Wiederholung.'],
                ['Falltraining', '1 Fall pro Tag lösen — auch kurze Übungsfälle schulen das juristische Denken.'],
              ].map(([title, desc]) => (
                <div key={title} style={{ fontSize: '0.82rem' }}>
                  <strong style={{ color: 'var(--gold)' }}>{title}:</strong> {desc}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
