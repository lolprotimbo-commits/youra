// utils/gemini.js
// Wrapper für die Gemini 2.5 Flash API

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL   = 'gemini-2.5-flash'
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

const SYSTEM_PROMPT = `Du bist YOUra, ein freundlicher und kompetenter KI-Assistent für Jurastudierende.
Du hilfst bei:
- Juristischen Definitionen und Konzepten (BGB, StGB, Öffentliches Recht, Zivilrecht, etc.)
- Gutachtenstil und Klausurtechnik
- Fallanalysen und Subsumtion
- Lernstrategien für das Jurastudium
- Paragraphen-Erklärungen

Antworte immer auf Deutsch, präzise und strukturiert. Bei juristischen Fragen nutze korrekte Fachterminologie.
Wenn du Paragraphen nennst, nenne immer das Gesetz dazu (z.B. § 242 BGB).
Halte Antworten klar und verständlich – nicht zu lang, außer bei komplexen Themen.`

/**
 * Sendet eine Nachricht an Gemini und gibt die Antwort zurück.
 * @param {Array<{role: 'user'|'model', text: string}>} history
 * @param {string} newMessage
 * @returns {Promise<string>}
 */
export async function sendToGemini(history, newMessage) {
  if (!API_KEY || API_KEY === 'dein_gemini_api_key_hier') {
    return '⚠️ Kein Gemini API Key gefunden. Bitte trage deinen Key in die `.env` Datei ein (`VITE_GEMINI_API_KEY=...`) und starte die App neu.'
  }

  // Konversationsverlauf in Gemini-Format umwandeln
  const contents = [
    // System-Anweisung als erstes User-Turn
    {
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }],
    },
    {
      role: 'model',
      parts: [{ text: 'Verstanden. Ich bin YOUra, dein Jura-Studiumsassistent. Wie kann ich dir helfen?' }],
    },
    // Verlauf
    ...history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    })),
    // Neue Nachricht
    {
      role: 'user',
      parts: [{ text: newMessage }],
    },
  ]

  const res = await fetch(`${BASE_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `HTTP ${res.status}`)
  }

  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Keine Antwort erhalten.'
}
