# NEXTLEVEL ACADEMY (Version 1)

Persönliche Lernplattform mit HTML5, CSS3 und Vanilla JavaScript. Kein Build, keine Installation, GitHub-Pages-tauglich.

## Funktionen
- Dashboard mit **CONTINUE LEARNING**, XP, Level, Fortschritt, letzten Lektionen, Projekten und Meilensteinen
- 6 Lernbereiche mit je mindestens einer vollständigen Lektion (Einführung, Grundlagen, Beispiel, Praxis, Zusammenfassung, Wissens-Check, Abschlussaufgabe)
- XP gibt es nur für abgeschlossene Lektionen (+50, Quiz muss richtig sein) und Challenges (+100)
- Challenges, Projekte (Idea, Planning, In Progress, Completed), Lernweg mit 6 Phasen
- Notizen, Favoriten, Lernhistorie, Suche, Dark/Light Mode, Zurücksetzen
- **AI Tutor nur im Demo-Modus**: vorgefertigte Antworten, keine echte KI

## Dateien
`index.html` (Seite) · `style.css` (Design) · `script.js` (Logik) · `courses.js` (Lerninhalte) · `challenges.js` · `projects.js`

## Veröffentlichen mit GitHub Pages (iPad)
1. In Safari auf github.com anmelden, **New repository** wählen (z. B. `nextlevel-academy`, Public).
2. **Add file, Upload files**: alle Dateien aus der Dateien-App hochladen, dann **Commit changes**.
3. **Settings, Pages**: Source = *Deploy from a branch*, Branch = `main`, Ordner `/ (root)`, dann Save.
4. Nach 1–2 Minuten ist die Seite unter `https://DEIN-NAME.github.io/nextlevel-academy/` erreichbar.
5. Tipp: In Safari „Zum Home-Bildschirm“ wählen.

## Erweitern
- Neue Lektionen: Block in `courses.js` kopieren und anpassen (`id` eindeutig). Für Lernweg-Phasen die ids in `PH` (`script.js`) ergänzen.
- Neue Challenges: `challenges.js`.

## Später: Backend und AI-API
`Tutor.endpoint` in `script.js` auf ein eigenes Backend setzen. **API-Schlüssel niemals im Frontend speichern**, sie gehören ins Backend.

## Hinweise
Lernmaterial, keine Rechts- oder Finanzberatung. Beispiele sind fiktiv. Daten liegen nur lokal im Browser (localStorage). Keine echten persönlichen Daten eingeben. Für echte Geschäfte als Minderjähriger: Eltern einbeziehen.
