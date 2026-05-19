// utils/defaultData.js
// Starter-Daten für neue Nutzer

export const DEFAULT_SLOTS = [
  { name: 'BGB Vorlesung',        day: 0, start: '08:00', end: '10:00', room: 'HS 1',  color: ''      },
  { name: 'Strafrecht Übung',     day: 1, start: '12:00', end: '14:00', room: 'SR 3',  color: 'rot'   },
  { name: 'Öff. Recht Vorlesung', day: 2, start: '10:00', end: '12:00', room: 'HS 2',  color: 'gruen' },
  { name: 'Zivilrecht Tutorium',  day: 3, start: '16:00', end: '18:00', room: 'SR 7',  color: ''      },
  { name: 'Verfassungsrecht',     day: 4, start: '10:00', end: '12:00', room: 'HS 1',  color: 'gruen' },
]

export const DEFAULT_FLASHCARDS = [
  {
    front: 'Was ist Vorsatz?',
    back: 'Wissen und Wollen der Tatbestandsverwirklichung (§ 15 StGB). Es gibt dolus directus 1. und 2. Grades sowie dolus eventualis.',
    subject: 'StGB AT',
  },
  {
    front: 'Was ist der Unterschied zwischen Anfechtung und Rücktritt?',
    back: 'Anfechtung beseitigt das Rechtsgeschäft ex tunc (§§ 119 ff. BGB); Rücktritt wirkt ex nunc und wandelt den Vertrag in ein Rückgewährschuldverhältnis um (§§ 346 ff. BGB).',
    subject: 'BGB AT',
  },
  {
    front: 'Voraussetzungen der Eigentumsfreiheitsklage (§ 1004 BGB)',
    back: '1. Eigentum des Klägers, 2. Beeinträchtigung (keine Entziehung/Vorenthaltung), 3. Störereigenschaft des Beklagten, 4. kein Duldungsanspruch (Abs. 2).',
    subject: 'Sachenrecht',
  },
]
