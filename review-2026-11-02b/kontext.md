# Kontext für die Prüfung von «Sicherheit im TTG» (Stand 2026-11-02, zweite Runde)

Website von Lukas Jordi (Dozent TTG, PHBern) für Studierende, angehende und erfahrene Lehrpersonen Technisches und Textiles Gestalten (TTG), Volksschule Schweiz. Sie fasst bfu-, chemsuisse- und Suva-Dokumente zusammen, ersetzt sie aber nicht. Live: https://ljuokr.github.io/sicherheit-im-ttg/sicherheit-im-ttg.html

## Aufbau (8 Register oben)
1. **Grundlage**: Einstieg, drei Kernpunkte, «Drei Fragen vor jeder Arbeit» (Verfahren, Material, Situation), Randkasten «Diese Seite ist / ist nicht».
2. **Maschinen**: nachgebautes bfu-Plakat (Maschinen mit Punkten A/B/C je Zyklus 1-3). Maschine antippen öffnet eine Karte, Gruppentitel öffnen das Verfahren im Fenster.
3. **Verfahren und Material**: Matrix, Zeilen = Material (Alle Materialien, Holz, Metall, Kunststoff, Keramik, Textil), Spalten = Verfahren (Trennen, Umformen, Verbinden, Oberfläche verändern) plus Spalte «Nicht verwenden». Ein Feld öffnet das Thema in einem Fenster rechts (Handy: Vollbild). Darunter: Stoffe auswählen (Ampel), Was hergestellt wird, Emissionen.
4. **Unterricht**: Zeilen zum Aufklappen: Sicher unterrichten, Für jeden Fachraum, Schutzmassnahmen (STOP, Schutzausrüstung), Notfälle vorbereiten, Erschliessungshandeln, Lehrplan 21.
5. **Fachraum**: Zeilen zum Aufklappen: Fachraum betreiben (inkl. Warten, Checklisten), Lagerung, Entsorgung, Planen und einrichten (inkl. Lernort).
6. **Kantone**: Tabelle kantonaler Dokumente.
7. **Recht**: Rechtlicher Rahmen, Zuständigkeiten, Übersicht für Schulleitungen.
8. **Quellen**: Quellen und Downloads, Begriffe (Glossar, erscheint auch als Popup beim Antippen eines Begriffs).

Die 23 Themen (z. B. Weichlöten, Leinöl) stehen in der Textdatei unter dem Register «Maschinen», sind auf der Seite aber nur über Plakat oder Matrix im Fenster sichtbar. Jedes Thema hat eine Zeile «Material: …», Regeln als Liste, Warnpunkte mit «Warum: …», eine Quellenzeile.

## Bewusste Entscheide (nicht erneut vorschlagen)
- Wenig «Bandwurm»: lieber aufklappen und Fenster als lange Listen.
- Regeln brauchen eine Begründung («Warum:») aus den Quellen. Eigene Hinweise sind als «Hinweis dieser Seite» markiert.
- Kurze Wiederholungen je heissem Metallverfahren (Brandschutz) sind bewusst stehen gelassen.
- Textil-Lücke: chemsuisse hat kein Textilkapitel, das ist so.
- Keine Ausrufezeichen, Schweizer Rechtschreibung (ss), keine langen Gedankenstriche, Strichpunkte nur wenn unumgänglich.
- Fachbegriffe nach LP21 TTG: «Vorhaben» statt «Projekt», «Modell erstellen» statt «modellieren».
- Sensible Formulierungen: Pflichten am Arbeitsplatz festmachen, nicht an Personengruppen.

## Dateien
- Ganzer Seitentext, nach Registern: `/Users/lukasjordi/Switchdirve/KI/sicherheit-im-gestalten/review-2026-11-02b/seite-text.md`
- Quelle aller Inhalte (lineare Fassung, HTML): `/Users/lukasjordi/Switchdirve/KI/sicherheit-im-gestalten/inhalt.html`
- Gebaute Seite: `/Users/lukasjordi/Switchdirve/KI/sicherheit-im-gestalten/sicherheit-im-ttg.html` (gross, nur gezielt mit grep lesen)

## Arbeitsregeln
- Nur lesen: Read, grep, sed -n. **Keine Skripte schreiben oder ausführen.**
- Ergebnis mit dem Write-Tool als Markdown in die genannte Datei schreiben.
- Format je Befund: `ID` · Register/Abschnitt · Befund (konkret, mit kurzem Zitat) · Vorschlag (konkreter neuer Wortlaut, wo möglich) · Gewicht (hoch/mittel/klein).
- Höchstens 25 Befunde, die wichtigsten zuerst. Keine Lobeshymnen, kein Füllmaterial.
- Nichts erfinden: fachliche Behauptungen nur, wenn sie aus der Seite selbst oder aus allgemein gesichertem Wissen stammen, sonst als Frage formulieren.
- Schreibregeln für deine Vorschläge: Schweizer Rechtschreibung, keine Ausrufezeichen, keine langen Gedankenstriche, möglichst keine Strichpunkte.

## Zweite Runde (vertieft, ein Agent pro Register oder Abschnitt)
- Die erste Runde ist umgesetzt (Ordner review-2026-11-02, Entscheide in r8-lukas.md). Dort als D verworfene Punkte nicht erneut vorschlagen, ausser du findest einen neuen, belegbaren Grund.
- Zusätzlich gilt: **Schweizer Begriffe**, keine deutschen (z. B. «Gesundheitsschutz bei Mutterschaft» statt «Mutterschutz», Schulträger, Volksschule, Lehrperson, Klasse, Zyklus). Melde Wörter, die in der Schweiz fremd klingen.
- **Fachliche Richtigkeit vertieft prüfen**: Stimmen Aussagen, Zahlen, Seitenzahlen und Zuordnungen mit der verlinkten Quelle überein? Bei Zweifel die Quelle mit WebFetch öffnen (nur lesen, nichts herunterladen). Melde, was du geprüft hast und was nicht prüfbar war.
- Prüfe in deinem Bereich alles: Richtigkeit, Vollständigkeit gegenüber der Quelle, Verständlichkeit für Studierende, Titel und Kernaussagen, Doppelungen innerhalb und zu anderen Registern, Sensibilität, Schreibregeln, Verweise.
- Seitenzahlen in seite-text.md: Die Zeilen mit «Zeile:» sind zuklappbare Abschnitte mit Kernaussage.
- Ergebnis höchstens 20 Befunde, die wichtigsten zuerst, gleiches Format wie oben.
