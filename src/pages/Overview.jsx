// pages/Overview.jsx
import React from 'react'

const TIPS = [
  '📌 Im Gutachtenstil immer mit dem Obersatz beginnen: „Es könnte sein, dass..." — niemals mit dem Ergebnis!',
  '📖 §§ 119 ff. BGB: Die Anfechtung wegen Irrtums muss unverzüglich erklärt werden (§ 121 BGB).',
  '⚖️ Merke: Schuld ≠ Rechtswidrigkeit. Rechtswidrig handelt, wer ohne Rechtfertigungsgrund einen Tatbestand erfüllt.',
  '🧠 Beim Lernen: erst Lesen → dann verdecken → dann selbst formulieren. Nur so haftet es.',
  '💡 Fallbearbeitung-Tipp: Lies den Sachverhalt dreimal — schnell, markierend, dann prüfend.',
  '🏛️ Normenhierarchie: GG → Bundesgesetz → Landesgesetz → Verordnung. Höherrangiges Recht geht vor.',
  '🔍 § 242 BGB (Treu und Glauben) ist das juristische Schweizer Taschenmesser.',
  '📋 Klausurrelevante Paragraphen haben Vorrang. Kommentare erst im zweiten Durchgang.',
]

const DAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']

export default function Overview({ todos, flashcards, notes, slots }) {
  const now = new Date()
  const dateStr = `${DAYS[now.getDay()]}, ${now.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}`
  const todayIdx = now.getDay() === 0 ? 6 : now.getDay() - 1
  const todaySlots = slots.filter(s => s.day === todayIdx)
  const openTodos = todos.filter(t => !t.done)
  const tip = TIPS[now.getDate() % TIPS.length]

  return (
    <div>
      <div className="page-title">Guten Tag ⚖️</div>
      <div className="page-sub">{dateStr}</div>

      {/* Stats */}
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-label">Offene Aufgaben</div><div className="stat-val">{openTodos.length}</div></div>
        <div className="stat-card"><div className="stat-label">Lernkarten</div><div className="stat-val">{flashcards.length}</div></div>
        <div className="stat-card"><div className="stat-label">Notizen</div><div className="stat-val">{notes.length}</div></div>
        <div className="stat-card"><div className="stat-label">Heute Termine</div><div className="stat-val">{todaySlots.length}</div></div>
      </div>

      {/* Upcoming + Today */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
        <div className="card">
          <div className="card-label">Nächste Aufgaben</div>
          {openTodos.length === 0
            ? <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Keine offenen Aufgaben 🎉</div>
            : openTodos.slice(0, 5).map(t => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.55rem 0', borderBottom: '1px solid var(--border)' }}>
                <i className="ti ti-circle" style={{ fontSize: 14, color: 'var(--gold)', flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: '0.875rem' }}>{t.text}</span>
                <span className={`tag ${t.tag === 'dringend' ? 'tag-red' : 'tag-gold'}`}>{t.tag}</span>
              </div>
            ))
          }
        </div>

        <div className="card">
          <div className="card-label">Heute</div>
          {todaySlots.length === 0
            ? <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Heute keine Termine.</div>
            : todaySlots.map((s, i) => (
              <div key={i} className={`slot ${s.color || ''}`} style={{ marginBottom: 6 }}>
                <div className="slot-name">{s.name}</div>
                <div className="slot-room">{s.start}–{s.end}{s.room ? ` · ${s.room}` : ''}</div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Daily tip */}
      <div className="card">
        <div className="card-label">💡 Juratipp des Tages</div>
        <div style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>{tip}</div>
      </div>
    </div>
  )
}
