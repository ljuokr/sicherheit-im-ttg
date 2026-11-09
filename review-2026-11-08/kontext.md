# Kontext Prüfrunde 4 «Sicherheit im TTG» (2026-11-08)

Website von Lukas Jordi (Dozent TTG, PHBern und PH Luzern) für Studierende und Lehrpersonen Technisches und Textiles Gestalten, Volksschule Schweiz. Sie gibt einen Überblick über die Leitfäden von bfu und chemsuisse, ergänzt um Suva, Kantone, Hersteller und Gesetze. Live: https://ljuokr.github.io/sicherheit-im-ttg/sicherheit-im-ttg.html

## Ziel dieser Runde
Fehler der Art finden und beheben, wie sie zuletzt aufgefallen sind:
- **Technisch:** Aufklapp-Titel «H-Sätze» wurde automatisch als Glossarbegriff verlinkt, ein Klick öffnete das Glossar statt die Liste. Matrix-Chips zeigten «(Register Maschinen)» ohne Leerzeichen. Ein offenes Themenfenster blieb beim Sprung auf einen Abschnitt liegen. Die Suche fand Inhalte in `<template>` nicht.
- **Inhaltlich zu eng oder zu weit:** Die Haftungskarte sagt «Schäden, die Lehrpersonen im Unterricht widerrechtlich verursachen». Das ist im Kern richtig, aber zu eng (gilt für die ganze dienstliche Tätigkeit, und der Schulträger haftet zusätzlich als Werkeigentümer, OR Art. 58).
- **Widersprüche und Doppelungen:** zwei Darstellungen desselben, Kurzfassungen, die schärfer oder weicher sind als die Regel, Zahlen oder Begriffe, die an zwei Stellen verschieden stehen.

## Aufbau (8 Register)
1. **Grundlage**: Einstieg, drei Kernpunkte, drei Fragen, Randkasten «Diese Seite ist / ist nicht».
2. **Maschinen**: Nachbau bfu-Plakat 4.301, Karten je Maschine (Daten: `bau/bau.py`, ZUORDNUNG, SUVA_LINKS).
3. **Verfahren und Material**: Matrix Material × Verfahren mit «Bevorzugen» (BEVORZUGT) und «Nicht verwenden» (VERBOTEN), Materialfenster Metall (EIGEN), darunter «Stoffe auswählen» (Ampel). Themen öffnen sich in einem Fenster, oben mit «Einstufung bfu-Plakat» (höchstens vier Maschinen).
4. **Unterricht**: was die Lehrperson mit der Klasse in der Lektion tut. Sicher unterrichten, Regeln für die Klasse, Schutzmassnahmen, Im Notfall (Abläufe), Erschliessungshandeln, Lehrplan 21.
5. **Fachraum**: was im Raum bereit sein muss und wer dafür sorgt. Planen und einrichten, Fachraum betreiben (mit Notfallausstattung, Dokumentation), Warten und prüfen, Lagerung, Entsorgung.
6. **Kantone**, 7. **Recht**, 8. **Quellen** (mit Glossar, Fusszeile, Archiv-Zeile).

## Bewusste Entscheide (nicht erneut vorschlagen)
- Frühere Entscheide: `review-2026-11-02/r8-lukas.md`, `review-2026-11-02b/g10-lukas.md`, `review-2026-11-03/h10-lukas.md`.
- Jeder Hinweis braucht eine Quelle. Nichts aufblähen. Keine Doppelungen zur Matrix.
- Kein Warnpunkt-Zähler, das Piktogramm im Kasten genügt. Kein Keramikfenster.
- Maschinen ohne bfu-Kategorie kommen nicht aufs Plakat. Aluminium schweissen und Keramik schleifen: keine Schulquelle.
- Abgrenzung Unterricht/Fachraum: Prüffrage «Tut das jemand mit der Klasse?».
- Eigene Rolle von Lukas steht nicht in der Fusszeile.
- Schreibregeln: Schweizer Rechtschreibung (ss), keine Ausrufezeichen, keine langen Gedankenstriche, Strichpunkte nur wenn unumgänglich, Schweizer Begriffe, Pflichten am Arbeitsplatz festmachen.

## Dateien
- Seitentext nach Registern: `review-2026-11-08/seite-text.md` (Zeilen «> Zeile:» sind Aufklapp-Zeilen)
- Quelle aller Inhalte: `inhalt.html` (eingebettete Bilder, nur gezielt mit grep oder Read mit offset lesen)
- Zusammenbau: `bau/bau.py`, Verhalten: `bau/app.js`, Gestaltung: `bau/stil.css`
- Gebaute Seite: `sicherheit-im-ttg.html` (gross, nicht ganz lesen)
- Quelltexte der Leitfäden als Text: `review-2026-11-08/quellen-txt/` (bfu 2.524, 4.301, 4.302, 4.323, chemsuisse TTG 2024 und Schulen, Suva-Checklisten), sonst WebFetch auf die verlinkten PDFs
- Bilder: `bau/bilder/` (11 Fotos, Piktogramme als SVG), Bildzeilen und alt-Texte in `bau/bilder/nachweis.json`. Kandidaten für neue Bilder nach `review-2026-11-08/bilder-kandidaten/<bildname>/`
- Alle Pfade relativ zu `/Users/lukasjordi/Switchdirve/KI/sicherheit-im-gestalten/`

## Headless-Tests (nur für technische Prüfungen)
- Gerüst: `review-2026-11-08/tools/lib.cjs`, Beispiel `tools/rauchtest.cjs`.
- Eigene Testskripte nur als `.cjs` mit dem Write-Tool in `review-2026-11-08/tools/tests/` anlegen und so ausführen: `source /Users/lukasjordi/Switchdirve/KI/sicherheit-im-gestalten/review-2026-11-08/tools/env.sh && node <voller Pfad zum Skript>`
- Kein Server, kein Browser-Pane, keine anderen Skriptsprachen. Screenshots mit `L.shot(page, name)` landen in `review-2026-11-08/runs/`.

## Arbeitsregeln
- Nichts committen, nichts pushen. Ausser dem Umsetzungs-Agenten ändert niemand Projektdateien.
- Keine Python- oder Shell-Skripte schreiben. Lesen mit Read, Grep, `sed -n`, `grep`.
- Fachliche Aussagen nur mit Beleg (Quelltext, Gesetz, Code-Stelle). Unbelegtes als Frage melden.
- Vorschläge mit genauem Wortlaut «alt» (kommt in der Datei genau einmal vor) und «neu».
