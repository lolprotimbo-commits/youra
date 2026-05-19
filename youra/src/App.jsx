// App.jsx — Haupt-Router & State-Management
import React, { useState } from 'react'
import Sidebar      from './components/Sidebar'
import Overview     from './pages/Overview'
import Todo         from './pages/Todo'
import Timetable    from './pages/Timetable'
import Flashcards   from './pages/Flashcards'
import Notes        from './pages/Notes'
import Pomodoro     from './pages/Pomodoro'
import AIAssistant  from './pages/AIAssistant'
import { useLocalStorage } from './hooks/useLocalStorage'
import { DEFAULT_SLOTS, DEFAULT_FLASHCARDS } from './utils/defaultData'

export default function App() {
  const [page, setPage] = useState('overview')

  // Globaler State — persistiert in localStorage
  const [todos,       setTodos]       = useLocalStorage('todos',       [])
  const [slots,       setSlots]       = useLocalStorage('slots',       DEFAULT_SLOTS)
  const [flashcards,  setFlashcards]  = useLocalStorage('flashcards',  DEFAULT_FLASHCARDS)
  const [notes,       setNotes]       = useLocalStorage('notes',       [])

  // Gemeinsame Props für Seiten die State brauchen
  const sharedProps = { todos, setTodos, slots, setSlots, flashcards, setFlashcards, notes, setNotes }

  const renderPage = () => {
    switch (page) {
      case 'overview':   return <Overview    {...sharedProps} />
      case 'todo':       return <Todo        todos={todos}       setTodos={setTodos} />
      case 'timetable':  return <Timetable   slots={slots}       setSlots={setSlots} />
      case 'flashcards': return <Flashcards  flashcards={flashcards} setFlashcards={setFlashcards} />
      case 'notes':      return <Notes       notes={notes}       setNotes={setNotes} />
      case 'pomodoro':   return <Pomodoro />
      case 'ai':         return <AIAssistant />
      default:           return <Overview    {...sharedProps} />
    }
  }

  return (
    <div className="app-layout">
      <Sidebar active={page} onNavigate={setPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}
