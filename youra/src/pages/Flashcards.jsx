// pages/Flashcards.jsx
import React, { useState } from 'react'

const SUBJECTS = ['BGB AT','Schuldrecht','Sachenrecht','StGB AT','StGB BT','Öffentliches Recht','Verfassungsrecht','StPO','ZPO']

export default function Flashcards({ flashcards, setFlashcards }) {
  const [idx, setIdx]     = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [form, setForm]   = useState({ front: '', back: '', subject: SUBJECTS[0] })

  const add = () => {
    if (!form.front.trim() || !form.back.trim()) return alert('Bitte Frage und Antwort ausfüllen.')
    setFlashcards(prev => [...prev, { ...form }])
    setIdx(flashcards.length)
    setFlipped(false)
    setForm(f => ({ ...f, front: '', back: '' }))
  }

  const remove = () => {
    if (!confirm('Karte löschen?')) return
    setFlashcards(prev => prev.filter((_, i) => i !== idx))
    setIdx(i => Math.max(0, i - 1))
    setFlipped(false)
  }

  const move = (dir) => {
    setIdx(i => (i + dir + flashcards.length) % flashcards.length)
    setFlipped(false)
  }

  const fc = flashcards[idx]

  return (
    <div>
      <div className="page-title">Lernkarten</div>
      <div className="page-sub">Juristische Definitionen & Konzepte</div>

      <div className="grid-2">
        {/* Card viewer */}
        <div>
          {flashcards.length === 0
            ? <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>Erstelle deine erste Lernkarte!</div>
            : (
              <>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', marginBottom: '0.5rem' }}>
                  Klicken zum Umdrehen
                </div>

                <div className="flashcard-wrap" onClick={() => setFlipped(f => !f)}>
                  <div className={`flashcard-inner${flipped ? ' flipped' : ''}`}>
                    <div className="flashcard-face flashcard-front">
                      <div>
                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: '0.5rem' }}>
                          {fc.subject}
                        </div>
                        {fc.front}
                      </div>
                    </div>
                    <div className="flashcard-face flashcard-back">{fc.back}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                  <button className="btn-ghost" onClick={() => move(-1)}>← Zurück</button>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{idx + 1} / {flashcards.length}</span>
                  <button className="btn-ghost" onClick={() => move(1)}>Weiter →</button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                  <button className="btn-ghost btn-sm" onClick={remove} style={{ color: 'var(--red)', borderColor: 'var(--red)' }}>
                    Karte löschen
                  </button>
                </div>
              </>
            )
          }
        </div>

        {/* Add form */}
        <div className="card">
          <div className="card-label">Neue Lernkarte</div>
          <label>Frage / Begriff</label>
          <input type="text" placeholder="z.B. Was ist Vorsatz?" value={form.front} onChange={e => setForm(f => ({ ...f, front: e.target.value }))} />
          <label>Antwort / Definition</label>
          <textarea placeholder="Wissen und Wollen der Tatbestandsverwirklichung..." value={form.back} onChange={e => setForm(f => ({ ...f, back: e.target.value }))} />
          <label>Fach</label>
          <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
            {SUBJECTS.map(s => <option key={s}>{s}</option>)}
          </select>
          <br /><br />
          <button className="btn btn-full" onClick={add}>Karte erstellen</button>
        </div>
      </div>
    </div>
  )
}
