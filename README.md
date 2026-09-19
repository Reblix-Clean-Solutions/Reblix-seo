# 🚀 SEO-Text-Optimierer (Neon Edition)

Ein professioneller **SEO-Text-Optimierer** mit KI-gestützter Rechtschreibprüfung, Groß-/Kleinschreibung-Korrektur, Grammatik-Lektorat und Google-SERP-Ranker.
Vollständig vorbereitet für **Visual Studio / VS Code** und den direkten **Deploy auf Netlify**.

---

## ✨ Was die App kann

1. **Groß- und Kleinschreibung anpassen:**
   - Korrigiert alle Fehler bei Substantiven, Satzanfängen, Eigennamen und Nominalisie­rungen nach amtlicher Duden-Rechtschreibung.
2. **Rechtschreibfehler & Tippfehler beheben:**
   - Beseitigt Buchstabendreher, falsche Schreibweisen, fehlende Umlaute und Tippfehler.
3. **Grammatik & Satzbau optimieren:**
   - Bereinigt Satzkonstruktionen, Kommasetzung, Dativ-/Akkusativ-Fälle und steigert die Lesbarkeit durch aktive Sprache.
4. **Google SEO-Optimierung:**
   - Generiert strukturierte H1, H2 und H3 Überschriften.
   - Integriert Fokus-Keywords und semantische LSI-Keywords natürlich ohne Keyword-Stuffing.
   - Liefert optimierte **Meta-Titles** (50-60 Zeichen) und **Meta-Descriptions** (140-155 Zeichen) mit Live-SERP-Vorschau (Desktop & Mobile).
   - Berechnet einen **SEO-Score (0-100)** und zeigt Keyword-Dichten und Lesezeiten an.

---

## 💻 1. In Visual Studio / VS Code öffnen

1. Entpacke die heruntergeladene ZIP-Datei auf deinem Computer.
2. Öffne **Visual Studio Code** (oder Visual Studio).
3. Gehe auf **Datei** -> **Ordner öffnen...** (`File -> Open Folder...`) und wähle den entpackten Projektordner aus.
4. Öffne das Terminal (`Strg + Ö` oder `Strg + ` ` ` oder Menü: *Terminal* -> *Neues Terminal*).

---

## 🛠️ 2. Lokal ausführen

1. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```

2. **API-Key einrichten:**
   Erstelle im Hauptordner eine Datei mit dem Namen `.env` (oder kopiere `.env.example` zu `.env`) und trage deinen Google Gemini API-Key ein:
   ```env
   GEMINI_API_KEY=DEIN_GEMINI_API_KEY_HIER
   ```
   *(Kostenlosen API-Key erstellen unter [aistudio.google.com](https://aistudio.google.com/) -> "Get API key")*

3. **Entwicklungsserver starten:**
   ```bash
   npm run dev
   ```
   Öffne danach **http://localhost:3000** in deinem Browser.

---

## 🌐 3. Auf Netlify online stellen (Deploy)

Das Projekt enthält bereits die fertige `netlify.toml` und die Serverless Function in `netlify/functions/optimize-seo.ts`.

### Methode A: Über GitHub / GitLab (Empfohlen)
1. Lade das Projekt in dein GitHub-Repository hoch.
2. Gehe auf [netlify.com](https://www.netlify.com) und klicke auf **"Add new site"** -> **"Import an existing project"**.
3. Wähle dein Repository aus. Netlify liest die Build-Konfiguration automatisch aus `netlify.toml` aus:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
4. Füge unter **"Site configuration"** -> **"Environment variables"** deinen Key hinzu:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `Dein_Gemini_API_Key`
5. Klicke auf **"Deploy site"** – fertig!

### Methode B: Direkt über die Netlify CLI
1. Im Projekt-Terminal:
   ```bash
   npx netlify login
   npx netlify deploy --prod
   npx netlify env:set GEMINI_API_KEY DEIN_GEMINI_API_KEY_HIER
   ```
