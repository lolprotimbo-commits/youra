// components/Sidebar.jsx
import React from 'react'

const NAV_ITEMS = [
  { id: 'overview',    icon: 'ti-scale',        label: 'Übersicht'    },
  { id: 'todo',        icon: 'ti-checklist',     label: 'Aufgaben'     },
  { id: 'timetable',  icon: 'ti-calendar-week', label: 'Stundenplan'  },
  { id: 'flashcards', icon: 'ti-cards',         label: 'Lernkarten'   },
  { id: 'notes',      icon: 'ti-notes',         label: 'Notizen'      },
  { id: 'pomodoro',   icon: 'ti-hourglass',     label: 'Timer'        },
  { id: 'ai',         icon: 'ti-message-chatbot',label: 'KI-Assistent'},
]

export default function Sidebar({ active, onNavigate }) {
  return (
    <nav style={{
      width: 'var(--sidebar-w)',
      minHeight: '100vh',
      background: 'var(--bg2)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 0',
      position: 'fixed',
      top: 0, left: 0, bottom: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ padding: '0 1.5rem 2rem' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', color: 'var(--gold2)', letterSpacing: '0.04em' }}>
          YOUra
        </div>
        <div style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '2px' }}>
          Dein Jurastudium
        </div>
      </div>

      {/* Nav Items */}
      <div style={{ flex: 1 }}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '0.7rem 1.5rem',
              background: active === item.id ? 'var(--gold-soft)' : 'transparent',
              border: 'none',
              borderLeft: `2px solid ${active === item.id ? 'var(--gold)' : 'transparent'}`,
              color: active === item.id ? 'var(--gold2)' : 'var(--muted)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              textAlign: 'left',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (active !== item.id) { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--gold-soft)'; }}}
            onMouseLeave={e => { if (active !== item.id) { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'transparent'; }}}
          >
            <i className={`ti ${item.icon}`} style={{ fontSize: '1.1rem', width: 20 }} aria-hidden />
            {item.label}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: '1rem 1.5rem', fontSize: '0.7rem', color: 'var(--muted)' }}>
        YOUra v1.0 · Powered by Gemini
      </div>
    </nav>
  )
}
