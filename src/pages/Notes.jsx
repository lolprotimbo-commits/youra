// pages/Notes.jsx
import React, { useState } from 'react'

const SUBJECTS = ['BGB AT','Schuldrecht','Sachenrecht','StGB AT','Öffentliches Recht','Verfassungsrecht','Sonstiges']

export default function Notes({ notes, setNotes }) {
  const [form, setForm]   = useState({ title: '', subject: SUBJECTS[0], content: '' })
  const [viewing, setViewing] = useState(null)

  const save = () => {
    if (!form.title.trim() || !form.content.trim()) return alert('Bitte Titel und Inhalt ausfüllen.')
    setNotes(prev => [{
      id: Date.now().toString(),
      ...form,
      date: new Date().toLocaleDateString('de-DE'),
    }, ...prev])
    setForm(f => ({ ...f, title: '', content: '' }))
  }

  const remove = (id) => {
    if (!confirm('Notiz löschen?')) return
    setNotes(prev => prev.filter(n => n.id !== id))
    if (viewing?.id === id) setViewing(null)
  }

  return (
    <div>
      <div className="page-title">Notizen</div>
      <div className="page-sub">Zusammenfassungen & Mitschriften</div>

      <div className="grid-2">
        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {notes.length === 0
            ? <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Noch keine Notizen.</div>
            : notes.map(n => (
              <div key={n.id} className="note-item" onClick={() => setViewing(n)}>
                <button
                  style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.9rem' }}
                  onClick={e => { e.stopPropagation(); remove(n.id) }}
                >✕</button>
                <div className="note-item-title">{n.title}</div>
                <span className="tag">{n.subject}</span>
                <div className="note-preview">{n.content}</div>
                <div className="note-date">{n.date}</div>
              </div>
            ))
          }
        </div>

        {/* Form */}
        <div className="card">
          <div className="card-label">Neue Notiz</div>
          <label>Titel</label>
          <input type="text" placeholder="z.B. BGB § 242 Treu und Glauben" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <label>Fach</label>
          <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
            {SUBJECTS.map(s => <option key={s}>{s}</option>)}
          </select>
          <label>Inhalt</label>
          <textarea style={{ minHeight: 180 }} placeholder="Deine Zusammenfassung..." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} />
          <br />
          <button className="btn btn-full" onClick={save}>Notiz speichern</button>
        </div>
      </div>

      {/* View modal */}
      {viewing && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setViewing(null)}>
          <div className="modal" style={{ width: 620 }}>
            <div className="modal-title">{viewing.title}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '1rem' }}>{viewing.subject} · {viewing.date}</div>
            <div style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap', maxHeight: '60vh', overflowY: 'auto' }}>{viewing.content}</div>
            <div className="modal-footer">
              <button className="btn-ghost" onClick={() => setViewing(null)}>Schließen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
