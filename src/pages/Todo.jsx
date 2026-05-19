// pages/Todo.jsx
import React, { useState } from 'react'

const TAGS = ['Allgemein','BGB','StGB','Öffentliches Recht','Zivilrecht','Klausur','dringend']

export default function Todo({ todos, setTodos }) {
  const [text, setText] = useState('')
  const [tag, setTag]   = useState('Allgemein')

  const add = () => {
    if (!text.trim()) return
    setTodos(prev => [...prev, { id: Date.now().toString(), text: text.trim(), tag, done: false }])
    setText('')
  }

  const toggle = (id) => setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const remove  = (id) => setTodos(prev => prev.filter(t => t.id !== id))

  const sorted = [...todos].sort((a, b) => a.done - b.done || (a.tag === 'dringend' ? -1 : 1))

  return (
    <div>
      <div className="page-title">Aufgaben</div>
      <div className="page-sub">To-Dos für dein Studium</div>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="input-row">
          <input
            type="text"
            placeholder="Neue Aufgabe..."
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
          />
          <select style={{ width: 160 }} value={tag} onChange={e => setTag(e.target.value)}>
            {TAGS.map(t => <option key={t}>{t}</option>)}
          </select>
          <button className="btn" onClick={add}>+ Hinzufügen</button>
        </div>
      </div>

      <div className="card">
        {sorted.length === 0
          ? <div style={{ color: 'var(--muted)', fontSize: '0.85rem', padding: '0.5rem 0' }}>Keine Aufgaben. Leg los!</div>
          : sorted.map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.65rem 0', borderBottom: '1px solid var(--border)' }}>
              {/* Checkbox */}
              <div
                onClick={() => toggle(t.id)}
                style={{
                  width: 18, height: 18,
                  border: `1.5px solid ${t.done ? 'var(--accent)' : 'var(--muted)'}`,
                  borderRadius: 4,
                  background: t.done ? 'var(--accent)' : 'transparent',
                  cursor: 'pointer',
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {t.done && <i className="ti ti-check" style={{ fontSize: 11, color: 'white' }} />}
              </div>
              <span style={{ flex: 1, fontSize: '0.875rem', textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--muted)' : 'var(--text)' }}>
                {t.text}
              </span>
              <span className={`tag ${t.tag === 'dringend' ? 'tag-red' : 'tag-gold'}`}>{t.tag}</span>
              <button className="btn-ghost btn-sm" onClick={() => remove(t.id)} style={{ marginLeft: 4 }}>✕</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}
