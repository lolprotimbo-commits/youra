// pages/Timetable.jsx
import React, { useState } from 'react'

const DAYS = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']

export default function Timetable({ slots, setSlots }) {
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ name: '', day: 0, start: '', end: '', room: '', color: '' })

  const add = () => {
    if (!form.name || !form.start || !form.end) return alert('Bitte Name, Start und Ende ausfüllen.')
    setSlots(prev => [...prev, { ...form, day: parseInt(form.day) }])
    setModal(false)
    setForm({ name: '', day: 0, start: '', end: '', room: '', color: '' })
  }

  const remove = (idx) => setSlots(prev => prev.filter((_, i) => i !== idx))

  // Max rows needed
  const maxRows = Math.max(1, ...DAYS.map((_, i) => slots.filter(s => s.day === i).length))

  return (
    <div>
      <div className="page-title">Stundenplan</div>
      <div className="page-sub">Deine Wochenübersicht</div>

      <div style={{ marginBottom: '1rem' }}>
        <button className="btn" onClick={() => setModal(true)}>+ Termin hinzufügen</button>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table className="timetable">
          <thead>
            <tr>{DAYS.map(d => <th key={d}>{d}</th>)}</tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRows }).map((_, r) => (
              <tr key={r}>
                {DAYS.map((_, d) => {
                  const daySlots = slots
                    .map((s, i) => ({ ...s, _idx: i }))
                    .filter(s => s.day === d)
                    .sort((a, b) => a.start.localeCompare(b.start))
                  const s = daySlots[r]
                  return (
                    <td key={d}>
                      {s && (
                        <div>
                          <div className={`slot ${s.color || ''}`}>
                            <div className="slot-name">{s.name}</div>
                            <div className="slot-room">{s.start}–{s.end}{s.room ? ` · ${s.room}` : ''}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <button className="btn-ghost btn-sm" onClick={() => remove(s._idx)}>✕</button>
                          </div>
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal">
            <div className="modal-title">Termin hinzufügen</div>
            <label>Veranstaltung</label>
            <input type="text" placeholder="z.B. BGB Vorlesung" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <label>Tag</label>
            <select value={form.day} onChange={e => setForm(f => ({ ...f, day: e.target.value }))}>
              {DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}
            </select>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div><label>Von</label><input type="text" placeholder="08:00" value={form.start} onChange={e => setForm(f => ({ ...f, start: e.target.value }))} /></div>
              <div><label>Bis</label><input type="text" placeholder="10:00" value={form.end} onChange={e => setForm(f => ({ ...f, end: e.target.value }))} /></div>
            </div>
            <label>Raum (optional)</label>
            <input type="text" placeholder="z.B. HS 1" value={form.room} onChange={e => setForm(f => ({ ...f, room: e.target.value }))} />
            <label>Farbe</label>
            <select value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}>
              <option value="">Gold (Standard)</option>
              <option value="gruen">Grün</option>
              <option value="rot">Rot</option>
            </select>
            <div className="modal-footer">
              <button className="btn-ghost" onClick={() => setModal(false)}>Abbrechen</button>
              <button className="btn" onClick={add}>Hinzufügen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
