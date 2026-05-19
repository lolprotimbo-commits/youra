# YOUra ⚖️ — Dein Jura-Studium Dashboard

Ein modernes, KI-gestütztes Dashboard für Jurastudierende. Gebaut mit React + Vite, betrieben von Gemini 2.5 Flash.

## Features

- 📋 **Aufgaben** — To-Do Liste mit Jura-Tags (BGB, StGB, Klausur, Dringend...)
- 🗓 **Stundenplan** — Wochenübersicht mit farbigen Terminen
- 🃏 **Lernkarten** — Flip-Flashcards mit juristischen Definitionen
- 📝 **Notizen** — Zusammenfassungen & Mitschriften nach Fach
- ⏱ **Pomodoro-Timer** — 25/5/20-Minuten-Modi mit Pausentipps
- 🤖 **KI-Assistent** — Gemini 2.5 Flash für juristische Fragen

---

## Setup (lokal)

### 1. Repository klonen

```bash
git clone https://github.com/DEIN_USERNAME/youra.git
cd youra
```

### 2. Dependencies installieren

```bash
npm install
```

### 3. `.env` Datei erstellen

```bash
cp .env.example .env
```

Dann `.env` öffnen und deinen Gemini API Key eintragen:

```
VITE_GEMINI_API_KEY=dein_echter_key_hier
```

> Gemini API Key bekommst du kostenlos auf: https://aistudio.google.com/app/apikey

### 4. App starten

```bash
npm run dev
```

Die App läuft dann auf http://localhost:5173

---

## Deployment auf GitHub Pages

### Einmalig: `vite.config.js` anpassen

Öffne `vite.config.js` und setze `base` auf deinen Repo-Namen:

```js
base: '/youra/',   // ← dein GitHub Repo-Name
```

### Deployen

```bash
npm run build
npm run deploy
```

> Voraussetzung: `gh-pages` ist bereits in `package.json` enthalten.
> GitHub Pages muss im Repo unter Settings → Pages → Source: `gh-pages` Branch aktiviert sein.

---

## Projektstruktur

```
youra/
├── index.html               # HTML Entry Point
├── vite.config.js           # Vite Konfiguration
├── .env.example             # Vorlage für Umgebungsvariablen
├── .gitignore
├── package.json
└── src/
    ├── main.jsx             # React Entry Point
    ├── App.jsx              # Router & globaler State
    ├── components/
    │   └── Sidebar.jsx      # Navigation
    ├── pages/
    │   ├── Overview.jsx     # Übersichtsseite
    │   ├── Todo.jsx         # Aufgabenliste
    │   ├── Timetable.jsx    # Stundenplan
    │   ├── Flashcards.jsx   # Lernkarten
    │   ├── Notes.jsx        # Notizen
    │   ├── Pomodoro.jsx     # Timer & Pausen
    │   └── AIAssistant.jsx  # Gemini KI-Chat
    ├── hooks/
    │   └── useLocalStorage.js  # Persistenter State
    ├── utils/
    │   ├── gemini.js        # Gemini API Wrapper
    │   └── defaultData.js   # Starter-Daten
    └── styles/
        └── global.css       # Design System & globale Styles
```

---

## Daten

Alle Daten werden **lokal im Browser** gespeichert (localStorage). Es wird kein Backend benötigt. Deine Notizen, Aufgaben und Karten bleiben beim nächsten Öffnen erhalten.

---

## Tech Stack

- **React 18** + **Vite 5**
- **Gemini 2.5 Flash** (Google AI)
- **LocalStorage** für Persistenz
- Kein CSS-Framework — eigenes Design System
- **gh-pages** für Deployment
