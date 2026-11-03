# Kontext für die Prüfung von «Sicherheit im TTG» (Stand 2026-11-03, dritte Runde)

Website von Lukas Jordi (Dozent TTG, PHBern) für Studierende, angehende und erfahrene Lehrpersonen Technisches und Textiles Gestalten (TTG), Volksschule Schweiz. Sie stellt bfu-, chemsuisse- und Suva-Dokumente zusammen, ersetzt sie aber nicht. Live: https://ljuokr.github.io/sicherheit-im-ttg/sicherheit-im-ttg.html

## Aufbau (8 Register oben)
1. **Grundlage**: Einstieg, drei Kernpunkte, «Drei Fragen vor jeder Arbeit», Randkasten «Diese Seite ist / ist nicht».
2. **Maschinen**: nachgebautes bfu-Plakat 4.301 (Maschinen mit Kategorie A/B/C je Zyklus 1-3). Maschine antippen öffnet eine Karte (Daten in `bau/bau.py`, Dictionary ZUORDNUNG: Themen, Hinweise mit Quelle, Videos tud.ch, Links, Suva-Checklisten SUVA_LINKS).
3. **Verfahren und Material**: Matrix, Zeilen = Material (Alle Materialien, Holz, Metall, Kunststoff, Keramik, Textil) mit «z. B.»-Beispielen und der Positivliste «Bevorzugen» (BEVORZUGT in bau.py), Spalten = Verfahren, dazu Spalte «Nicht verwenden» (VERBOTEN in bau.py). Ein Feld öffnet das Thema im Fenster. Metall und Keramik öffnen per Klick auf den Namen ein Materialfenster (Inhalt: inhalt.html ab `<h3 id="hergestellt">`, wird nur dort gezeigt). Darunter nur noch «Stoffe auswählen» (Etiketten-Ampel).
4. **Unterricht**: Sicher unterrichten, Grundregeln im Fachraum, Schutzmassnahmen (STOP, Schutzausrüstung), Notfälle, Erschliessungshandeln, Lehrplan 21.
5. **Fachraum**: Fachraum betreiben (inkl. Warten, Checklisten), Lagerung, Entsorgung, Planen und einrichten.
6. **Kantone**: Tabelle kantonaler Dokumente (Recherche Stand Oktober 2026).
7. **Recht**: Rechtlicher Rahmen, Zuständigkeiten, Überblick für Schulleitungen.
8. **Quellen**: Quellen und Downloads, Begriffe (Glossar, auch als Popup), Fusszeile (Haftungsausschluss, Kontakt, Lizenz CC BY-NC-SA 4.0).

Die 23 Themen (z. B. Weichlöten, Leinöl) stehen in der Textdatei unter «Maschinen», auf der Seite erscheinen sie im Fenster. Jedes Thema: Zeile «Material: …», Regeln, Warnpunkte mit «Warum: …», teils eine Zeile «Lehrplan 21: …», Quellenzeile.

## Was seit der zweiten Runde neu ist (Schwerpunkt dieser Runde)
- Jeder Hinweis braucht eine Quelle, das Etikett «Hinweis dieser Seite» gibt es nicht mehr (Lukas-Entscheid). Hinweise auf Maschinenkarten mit Herstellerquellen (Bernina, Rapesco, Seilnacht).
- Suva-Checklisten als Links auf Maschinenkarten und in den Quellen. tud.ch-Lernvideos auf den Karten und bei einzelnen Themen.
- Lehrplan-21-Zeilen bei 12 Themen.
- Matrix: «Bevorzugen» je Material, «z. B.» vor den Beispielen, «Was hergestellt wird» und «Emissionen» als eigene Abschnitte gestrichen (Doppelung zur Matrix).
- Neu belegt: Massekabel prüfen (Schweissen, Suva 67104), Bedienungsanleitungen bei den Maschinen (Fachraum betreiben, bfu 4.323), Stoffmerkblatt (Stoffe auswählen, chemsuisse S. 39), Keramikstaub aufnehmen (Glasieren, chemsuisse S. 20), Glossar H- und P-Sätze (hazard / precautionary).
- Fusszeile: «lediglich eine Zusammenstellung», Fragen an die zuständige Stelle (Schulleitung, Schulträger, kantonale Fachstellen wie Arbeitsinspektorat oder Chemikalienfachstelle), Kontakt nur für Rückmeldungen.
- Änderungen im Detail: `git -C /Users/lukasjordi/Switchdirve/KI/sicherheit-im-gestalten log -p c233e95..HEAD -- inhalt.html bau/bau.py` (nur lesen).

## Bewusste Entscheide (nicht erneut vorschlagen)
- Entscheide der ersten und zweiten Runde: `review-2026-11-02/r8-lukas.md` und `review-2026-11-02b/g10-lukas.md`. Dort als D verworfene Punkte nur mit neuem, belegbarem Grund erneut melden.
- Wenig «Bandwurm»: aufklappen und Fenster statt langer Listen. Nichts aufblähen, Doppelungen zur Matrix vermeiden.
- Regeln brauchen eine Begründung oder Quelle. Unbelegtes nicht vorschlagen, sondern als Frage melden.
- Maschinen ohne bfu-Kategorie (Sandstrahlanlage, Poliermaschine, Blechnager, Formatkreissäge) kommen nicht aufs Plakat.
- Textil-Lücke bei chemsuisse ist so. Aluminium schweissen und Keramik schleifen: keine Schulquelle gefunden.
- Kurze Wiederholungen je heissem Metallverfahren (Brandschutz) bleiben.
- Keine Ausrufezeichen, Schweizer Rechtschreibung (ss), keine langen Gedankenstriche, Strichpunkte nur wenn unumgänglich.
- Schweizer Begriffe (Schulträger, Volksschule, Lehrperson, Zyklus, Gesundheitsschutz bei Mutterschaft). Fachbegriffe nach LP21 TTG («Vorhaben» statt «Projekt», «Modell erstellen» statt «modellieren»).
- Sensible Formulierungen: Pflichten am Arbeitsplatz festmachen, nicht an Personengruppen.
- Keine Personennamen als Beispiele.

## Dateien
- Ganzer Seitentext nach Registern: `/Users/lukasjordi/Switchdirve/KI/sicherheit-im-gestalten/review-2026-11-03/seite-text.md` (Zeilen mit «> Zeile:» sind zuklappbare Abschnitte mit Kernaussage). Maschinenkarten und Materialfenster fehlen darin, siehe bau.py bzw. inhalt.html.
- Quelle aller Inhalte: `/Users/lukasjordi/Switchdirve/KI/sicherheit-im-gestalten/inhalt.html` (enthält eingebettete Bilder, darum nur gezielt mit grep oder Read mit offset lesen)
- Karten, Matrix, Kernaussagen: `/Users/lukasjordi/Switchdirve/KI/sicherheit-im-gestalten/bau/bau.py`
- Quelltexte als Text (für Seitenzahlen): `/private/tmp/claude-502/-Users-lukasjordi-Switchdirve-KI/7bd89706-5d06-4966-b7d6-c1efad8d1cfd/scratchpad/txt/` (z. B. «Leitfaden Chemsuisse Schulen TTG.txt», bfu-Dokumente, Suva-Checklisten). Die gedruckte chemsuisse-Seitenzahl steht in den Fusszeilen «Version 1.0   NN».

## Arbeitsregeln
- Nur lesen: Read, Grep, Glob, `sed -n`, `grep`, `git log`. **Keine Skripte schreiben oder ausführen.** Keine Dateien ausser deiner Ergebnisdatei schreiben.
- Ergebnis mit dem Write-Tool als Markdown in die genannte Datei schreiben.
- Zuerst ein kurzer Abschnitt «Geprüft» (was du mit welcher Quelle verglichen hast, was nicht prüfbar war).
- Dann Befunde, Format je Befund: `ID` · Register/Abschnitt · Befund (konkret, mit kurzem Zitat) · Vorschlag (konkreter neuer Wortlaut, wo möglich) · Gewicht (hoch/mittel/klein).
- Höchstens 15 Befunde, die wichtigsten zuerst. Keine Lobeshymnen, kein Füllmaterial. Wenn du nichts Wichtiges findest, schreib das.
- Fachliche Richtigkeit: Aussagen, Zahlen, Seitenzahlen gegen die Quelle prüfen (Textdateien oben, sonst WebFetch, nur lesen). Nichts erfinden.
- Schreibregeln für Vorschläge: Schweizer Rechtschreibung, keine Ausrufezeichen, keine langen Gedankenstriche, möglichst keine Strichpunkte.
