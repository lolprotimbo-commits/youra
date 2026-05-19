// pages/AIAssistant.jsx
import React, { useState, useRef, useEffect } from 'react'
import { sendToGemini } from '../utils/gemini'

const SUGGESTIONS = [
  'Was ist der Unterschied zwischen Anfechtung und Rücktritt?',
  'Erkläre mir den Gutachtenstil mit einem Beispiel.',
  'Was sind die Voraussetzungen von § 823 BGB?',
  'Wie prüfe ich Vorsatz im Strafrecht?',
  'Was ist das Abstraktionsprinzip im Sachenrecht?',
]

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: '⚖️ Hallo! Ich bin YOUra, dein KI-Assistent für das Jurastudium. Frag mich zu Paragraphen, Definitionen, Gutachtenstil oder Prüfungstechnik!' }
  ])
  const [input, setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text }])
    setLoading(true)

    try {
      // Build history (exclude first AI welcome message)
      const history = messages
        .slice(1)
        .map(m => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text }))

      const reply = await sendToGemini(history, text)
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: `❌ Fehler: ${err.message}` }])
    } finally {
      setLoading(false)
    }
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  return (
    <div>
      <div className="page-title">KI-Assistent</div>
      <div className="page-sub">Powered by Gemini 2.5 Flash — dein juristischer Lernbegleiter</div>

      {/* API Key Warning */}
      {(!apiKey || apiKey === 'dein_gemini_api_key_hier') && (
        <div style={{ background: 'rgba(181,74,60,0.1)', border: '1px solid rgba(181,74,60,0.3)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
          ⚠️ <strong style={{ color: 'var(--red-bright)' }}>API Key fehlt.</strong> Trage deinen Gemini API Key in die <code style={{ background: 'var(--bg3)', padding: '1px 5px', borderRadius: 3 }}>.env</code> Datei ein und starte die App neu.
        </div>
      )}

      <div className="card">
        {/* Messages */}
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`} style={{ whiteSpace: 'pre-wrap' }}>
              {m.text}
            </div>
          ))}
          {loading && (
            <div className="chat-msg ai loading">YOUra denkt nach...</div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vorschläge</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {SUGGESTIONS.map((s, i) => (
                <button key={i} className="btn-ghost btn-sm" onClick={() => setInput(s)} style={{ fontSize: '0.75rem' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="chat-input-row">
          <textarea
            placeholder="Frage stellen... (Enter zum Senden, Shift+Enter für neue Zeile)"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          />
          <button className="btn" onClick={send} disabled={loading} style={{ alignSelf: 'flex-end' }}>
            {loading ? '...' : 'Senden'}
          </button>
        </div>
      </div>
    </div>
  )
}
