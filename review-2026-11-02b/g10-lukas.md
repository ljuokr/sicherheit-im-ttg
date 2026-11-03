# G10 · Entscheid «Lukas» über G1 bis G9 (zweite Runde, 2026-11-02)

Grundlage: g1 bis g9, kontext.md, r8-lukas.md, Memory «sicherheit-im-gestalten-seite» (Einträge 2026-11-02), «sensible-formulierungen», «ttg-fachbegriffe», gezielte Prüfung in inhalt.html, bau/bau.py, bau/app.js. Jedes «alt»-Zitat ist mit grep geprüft und kommt in der genannten Datei genau einmal vor, Ausnahmen sind vermerkt.

Zählung nach Original-IDs (166): **30 A · 85 B · 14 C (in 6 Fragen) · 37 D**. C-Anteil rund 8 %, die Vorsortierung war brauchbar.

Arbeitsregeln für alle Aufträge
- Inhalte in inhalt.html, Kartenhinweise, Matrix, KERN, THEMA_KERN, VERBOTE und INSTR in bau/bau.py, Materialnamen der Fenster in bau/app.js. Danach `python3 bau/bau.py` und `bau/pruefe.py`. Meldung «VERBOT OHNE TREFFER» oder «INSTR OHNE TREFFER» heisst: Präfix in VERBOTE bzw. INSTR an den neuen Wortlaut anpassen.
- Warnpunkt = Eintrag in der Liste VERBOTE (bau.py Z. 15 bis 22, Präfix des li-Texts). Neue Warnpunkte unten immer mit dem genannten Präfix ergänzen.
- `[URL bfu 4.302]`, `[URL Merkblatt Bern]`, `[CHEM]` = die schon in inhalt.html verwendeten Links (z. B. Z. 141, 153, 182), nichts Neues erfinden.
- Bestehende ids nie ändern.

---

## A · ohne Rückfrage umsetzen

**A1 · Quelle Kernpunkte** (G1-13) · inhalt.html
- alt: `bfu 2.524, S. 6, 18&nbsp;↗</a></p>`
- neu: `bfu 2.524, S. 6, 18&nbsp;↗</a> · <a class="ql" href="[URL bfu 4.302]">bfu 4.302, S. 2&nbsp;↗</a></p>`

**A2 · Dekupiersäge, zwei Regeln** (G2-05) · bau.py
- alt: `Schutzbrille tragen, der Kopf ist höher als das Sägeblatt.`
- neu: `Schutzbrille tragen. Arbeitshöhe so wählen, dass der Kopf höher ist als das Sägeblatt.`

**A3 · Stichsäge als Regel** (G2-14) · bau.py
- alt: `Das Sägeblatt berührt beim Einschalten das Werkstück nicht.`
- neu: `Beim Einschalten darf das Sägeblatt das Werkstück nicht berühren.`

**A4 · Exzenter- und Winkelschleifer, Beleg passend** (G2-12) · bau.py
- alt: `Staubbeutel oder Staubsauger anschliessen, bei viel Staub Maske FFP2.` · neu: `Staubbeutel oder Staubsauger anschliessen.` (Maske steht im verlinkten Thema Staub)
- alt: `'Suva 67092, Fragen 10, 14'` (kommt genau zweimal vor, beide Winkelschleifer, beide ersetzen) · neu: `'Suva 67092, Fragen 4, 10, 14'`

**A5 · Toter Code KLEINGERAET** (G2-18) · bau.py
- Zeile 97, die mit `KLEINGERAET = [` beginnt, ganz löschen (wird nirgends verwendet).

**A6 · Suva-Link doppelt** (G2-19) · bau.py
- alt: `, 'suva': True}` · neu: `}` (Quelle steht im Thema Ständerbohrmaschine)

**A7 · Quellenzeile Giessen mit flüssigen Kunststoffen** (G3-12 Teil a) · inhalt.html
- alt: `chemsuisse, S. 14&nbsp;↗` · neu: `chemsuisse, S. 14, 15&nbsp;↗`

**A8 · Schweizer Wort Sagex** (G3-16) · inhalt.html
- alt: `(z. B. Styropor)` · neu: `(z. B. Sagex, Styropor)`

**A9 · Ein Wort: Druckluft** (G3-20)
- inhalt.html alt: `Nie mit Pressluft abblasen.` · neu: `Nie mit Druckluft abblasen.`
- bau.py VERBOTE alt: `"Nie mit Pressluft abblasen"` · neu: `"Nie mit Druckluft abblasen"`

**A10 · Kleben: «Nicht verwenden» wie alle Themen** (G4-19, folgt Entscheid C3 der ersten Runde)
- inhalt.html alt: `Verzichten auf: chlorierte` · neu: `Nicht verwenden: chlorierte`
- bau.py VERBOTE alt: `"Verzichten auf"` · neu: `"Nicht verwenden: chlorierte"`

**A11 · Emissionen: fehlender Link «Räume» aus r8 A19** (G5-12) · inhalt.html
- alt: `<h3>Räume</h3>` · neu: `<h3 id="raeume">Räume</h3>`
- alt: `Brennen</a> und <a href="#gasflaschen">Gasflaschen und Gasanlagen</a>.</li>` · neu: `Brennen</a>, <a href="#gasflaschen">Gasflaschen und Gasanlagen</a> und <a href="#raeume">Räume</a>.</li>`

**A12 · Emissionen: Verweise zu Rauch und Dämpfen vollständig** (G5-13) · inhalt.html
- alt: `<a href="#3d-druck">3D-Druck</a> und <a href="#loesungsmittel-verduenner-pinselreiniger">Lösungsmittel</a>.`
- neu: `<a href="#3d-druck">3D-Druck</a>, <a href="#hartloeten">Hartlöten</a>, <a href="#kunststoff-saegen-bohren-schleifen">Thermoschneiden</a>, <a href="#giessen-und-formen-mit-fluessigen-kunststoffen">Giessen mit flüssigen Kunststoffen</a>, <a href="#kleben">Kleben</a>, <a href="#farben-lacke-spruehen">Farben</a> und <a href="#loesungsmittel-verduenner-pinselreiniger">Lösungsmittel</a>.` (Anker nach dem Bau mit pruefe.py kontrollieren)

**A13 · Quellenzeile «Was hergestellt wird»** (G5-16) · inhalt.html
- alt: `chemsuisse, S. 10, 13, 20&nbsp;↗` · neu: `chemsuisse, S. 10, 13, 20, 21, 33&nbsp;↗`

**A14 · Verweis «wie viel Aufsicht»** (G6-02) · inhalt.html
- alt: `unter <a href="#recht">Rechtlicher Rahmen</a>.</li>` · neu: `unter <a href="#sorgfalt">Sorgfalts- und Obhutspflicht</a>.</li>`

**A15 · STOP-Quelle falsch** (G6-04) · inhalt.html
- alt: `bfu 2.524, S. 18&nbsp;↗</a> · <a class="ql" href="https://www.bfu.ch/api/publications/bfu_4.302.01_Technisch%20und%20Textiles%20Gestalten%20%E2%80%93%20Leitfaden%20f%C3%BCr%20Schulen.pdf">bfu 4.302, S. 3&nbsp;↗</a>`
- neu: `bfu 2.524, S. 18&nbsp;↗</a> · <a class="ql" href="[URL Merkblatt Bern]">Merkblatt Bern, Abschnitt 5&nbsp;↗</a>`

**A16 · «zum Augenarzt» wie B2 der ersten Runde** (G6-20 Teil) · inhalt.html
- alt: `Feststeckende stecken lassen und sofort zum Augenarzt.` · neu: `Feststeckende stecken lassen und sofort augenärztlich untersuchen lassen.`

**A17 · Prüfintervalle der Checklisten** (G7-01) · belegter Fehler, bfu 4.323 S. 4 bis 13
- inhalt.html alt: `von der täglichen Sichtkontrolle bis zur jährlichen Prüfung` · neu: `von der täglichen Sichtkontrolle bis zu Abständen von mehreren Jahren, dazu situativ, etwa bei einer neuen Lehrperson`
- inhalt.html alt: `je Punkt täglich bis jährlich` · neu: `je Punkt, von täglich bis alle paar Jahre`
- bau.py alt: `'Checklisten': 'bfu 4.323 von täglich bis jährlich'` · neu: `'Checklisten': 'bfu 4.323 mit Prüfintervall je Punkt'`

**A18 · 25 Liter ausserhalb der Schränke** (G7-08) · inhalt.html
- alt: `An den Arbeitsplätzen höchstens 25 Liter` · neu: `Ausserhalb der Schränke, an den Arbeitsplätzen, höchstens 25 Liter`

**A19 · Not-Aus zu schwach** (G7-10) · inhalt.html
- alt: `allenfalls mit zentralem Not-Aus. Maschinen mit grossem Gefährdungspotenzial separat freischalten.`
- neu: `allenfalls mit zentralem Not-Aus. Maschinen mit grossem Gefährdungspotenzial müssen separat freigeschaltet und bei Bedarf mit dem Not-Aus gestoppt werden können.`

**A20 · Absaugung wie bfu** (G7-12) · inhalt.html
- alt: `Alle stauberzeugenden Maschinen mit wirksamer Absaugung, Hartlöt- und Schutzgasschweissanlagen mit Absauganlage.`
- neu: `Alle stauberzeugenden Maschinen und Handschleifmaschinen mit wirksamer Absaugung. Hartlöt- und Schutzgasschweissanlagen mit Quellenabsaugung, Abluft möglichst ins Freie, bei Umluft mit Partikelfilter.`

**A21 · Quellenzeile Maschinen warten** (G7-20 Teil) · inhalt.html
- alt: `bfu 2.524, S. 10, 14, 16&nbsp;` · neu: `bfu 2.524, S. 10, 14, 15, 16&nbsp;`

**A22 · AKVB ausschreiben** (G8-15) · inhalt.html
- alt: `Bildungs- und Kulturdirektion, AKVB` · neu: `Bildungs- und Kulturdirektion, Amt für Kindergarten, Volksschule und Beratung (AKVB)` (kein Jahr, am Dokument steht keines)

**A23 · «Volksschulamt» nur in Zürich** (G8-16) · inhalt.html
- alt: `Im Zweifel beim Volksschulamt oder bei der Fachberatung des Kantons nachfragen.`
- neu: `Im Zweifel bei der für die Volksschule zuständigen Stelle des Kantons oder bei der Fachberatung nachfragen.`

**A24 · Seitenzahlen H-Sätze** (G9-01) · inhalt.html, je Abschnitt im Block `<div class="h-saetze" hidden>`
- In den Abschnitten id `h-H300`, `h-H310`, `h-H314`, `h-H317`, `h-H330`, `h-H334`, `h-H340`, `h-H341`, `h-H350`, `h-H351`, `h-H360`: `Anhang D, S. 68` → `Anhang D, S. 69`
- In `h-H361`, `h-H362`, `h-H370`, `h-H371`, `h-H372`: `Anhang D, S. 68` → `Anhang D, S. 70`
- In `h-H400`, `h-H410`: `Anhang D, S. 68` → `Anhang D, S. 71`
- alt: `chemsuisse, S. 66, 67, 68, 72` · neu: `chemsuisse, S. 66-72`

**A25 · Quelle FFP-Begriff** (G9-03) · inhalt.html
- alt: `chemsuisse, S. 7, 16, 25` · neu: `chemsuisse, S. 6, 16, 24`

**A26 · Grammatik aus A12 der ersten Runde** (G9-04) · inhalt.html
- alt: `Bei Isocyanaten sind wiederholter Kontakt` · neu: `Bei Isocyanaten ist wiederholter Kontakt`

**A27 · CE: «China Export» nicht schärfer als die Quelle** (G9-07) · inhalt.html · Absatz bleibt (Lukas' Wunsch), nur der zweite Satz
- alt: `Es ist ein unzulässiges, verwechselbares Zeichen, das Zeichen allein ist darum kein Beleg.`
- neu: `Das Zeichen auf dem Gerät allein belegt darum nichts, massgebend ist die Konformitätserklärung.`

**A28 · Seitenangaben im Glossar** (G9-12) · inhalt.html
- alt: `chemsuisse, S. 56&nbsp;` · neu: `chemsuisse, S. 56, 57&nbsp;`
- alt: `chemsuisse, Abschnitt 2.1.1, 2.2.2-2.2.5` · neu: `chemsuisse, S. 6, 8, 10, 11, 12`
- Im Abschnitt `id="b-3d"` die Quellenzeile `chemsuisse, S. 17` → `chemsuisse, S. 17, 18` (die gleiche Zeichenfolge steht auch beim Thema 3D-Druck, dort nicht ändern)

**A29 · Quellen-Einleitung stimmt nicht** (G9-15) · inhalt.html
- alt: `alle führen direkt auf das PDF, ausser wo vermerkt.` · neu: `Die Links zu den Dokumenten führen direkt auf das PDF, ausser wo vermerkt.`

**A30 · Petrol und Petroleum** (G9-17) · inhalt.html
- alt: `z. B. Petrol, Isocyanate` · neu: `z. B. Petroleum, Isocyanate`

---

## B · umsetzen und Lukas in einer Zeile melden

**B1 · Plakat-Legende B wie auf dem Plakat, «laufend beurteilen» an den Ort, auf den Recht verweist** (G2-01, G6-01, G6-03) · Legende geht über Plakat und 4.302 S. 2 hinaus, Recht verweist mit «die Lage laufend beurteilen, siehe Sicher unterrichten» auf eine Stelle, wo es fehlt.
- inhalt.html alt: `Nur unter Aufsicht der Lehrperson. Aufsicht heisst: Die Lehrperson ist im Fachraum anwesend, bei einem abgetrennten Maschinenraum mit Sichtkontakt, und beurteilt die Lage laufend.`
- neu: `Nur unter Aufsicht der Lehrperson. Aufsicht heisst: Die Lehrperson ist im Fachraum anwesend.`
- inhalt.html alt: `bei einem abgetrennten Maschinenraum mit Sichtkontakt durch Glaswände.`
- neu: `bei einem abgetrennten Maschinenraum mit Sichtkontakt durch Sicherheitsglas. Sie beurteilt die Lage laufend und greift ein oder bricht ab, wenn es nötig ist.`
- inhalt.html alt: `bfu 4.323, S. 4, 8, 12&nbsp;↗</a></p>` · neu: `bfu 4.323, S. 4, 8, 12&nbsp;↗</a> · <a class="ql" href="https://www.bfu.ch/de/services/rechtsfragen/was-genau-bedeutet-die-obhutspflicht-von-lehrpersonen-welche-verantwortung-tragen-lehrerinnen-und-lehrer">bfu Rechtsfrage&nbsp;↗</a></p>`
- bau.py alt: `'Sicher unterrichten': 'Lehrperson wählt Maschinen, führt ein, beaufsichtigt und hält fest'` · neu: `'Sicher unterrichten': 'Lehrperson wählt Maschinen, führt ein, beaufsichtigt laufend und hält fest'`

**B2 · Kernpunkt 3 führt zu Ordnung und Grundregeln** (G1-01) · inhalt.html
- alt: `<li><a href="#fuer-jeden-fachraum">Klare Ordnung und Grundregeln im Fachraum festlegen</a></li>`
- neu: `<li>Klare <a href="#fachraum-betreiben">Ordnung</a> und <a href="#fuer-jeden-fachraum">Grundregeln</a> im Fachraum festlegen</li>`

**B3 · Begleitung endet nicht** (G1-02) · inhalt.html, Wortlaut bfu 2.524 S. 6
- alt: `Instruieren und begleiten, bis die Klasse` · neu: `Instruieren und begleiten, damit die Klasse`

**B4 · Einteilung macht die bfu** (G1-03) · inhalt.html
- alt: `<li><a href="#maschinen">Maschinen nach Zyklus einteilen</a></li>` · neu: `<li><a href="#maschinen">Zugang zu Maschinen nach Zyklus regeln</a></li>`

**B5 · Frage Material führt auch zu Emissionen** (G1-06 Teil, nur Ergänzung, keine Änderung der Frage Situation) · inhalt.html
- alt: `<a href="#einkauf">Stoffe auswählen</a></li>` · neu: `<a href="#einkauf">Stoffe auswählen</a> · <a href="#emissionen">Emissionen</a></li>`

**B6 · Randkasten: Leitfäden statt Merkblätter** (G1-11) · inhalt.html
- alt: `eine Zusammenfassung der Merkblätter von bfu und chemsuisse, ergänzt um Suva, Kantone und Gesetze.`
- neu: `eine Zusammenfassung der Leitfäden von bfu und chemsuisse, ergänzt um Angaben von Suva, Kantonen und aus Gesetzen.`

**B7 · Tellerschleifmaschine: Hauptregel der zitierten Quelle** (G2-03) · bau.py · bestehender Kartenhinweis, kein neuer
- alt: `Schutzbrille tragen. Der Abstand zwischen Schleiftisch und Scheibe ist höchstens 3 mm.`
- neu: `Schutzbrille tragen. Nur auf der Seite schleifen, auf der sich die Scheibe nach unten bewegt, sonst kann das Werkstück weggeschleudert werden. Keine zu kleinen Stücke schleifen. Der Abstand zwischen Schleiftisch und Scheibe ist höchstens 3 mm.`

**B8 · Ersatztext der Karten ohne Eintrag stimmt nicht** (G2-04 Teil) · bau/app.js
- alt: `Zu dieser Maschine nennen die Quellen keine eigenen Regeln. Es gelten die Grundregeln im Fachraum.`
- neu: `Diese Seite nennt zu dieser Maschine keine eigenen Hinweise. Es gelten die Betriebsanleitung und die Grundregeln im Fachraum.`

**B9 · Bandsäge: Stossholz «wenn nötig», Beleg stimmig** (G2-06) · bau.py
- alt: `Verdeckung bis höchstens 10 mm über das Werkstück absenken, mit Stossholz arbeiten, Hände mindestens eine Faustbreite vom Sägeband.`
- neu: `Verdeckung bis höchstens 10 mm über das Werkstück absenken. Hände mindestens eine Faustbreite vom Sägeband, sonst mit Stossholz arbeiten.`
- alt: `'Suva 67057, Fragen 1, 3'` · neu: `'Suva 67057, Fragen 3, 15 · Technologiekarte, S. 61'`

**B10 · Heissgeräte-Karten: belegte statt eigene Hinweise** (G2-08, G2-09) · bau.py · gleiche Zahl Hinweise, nur mit Quelle
- alt: `heiss('Düse und Kleber werden heiss')` · neu: `['Verbrennungsgefahr an Düse und Kleber. Für jüngere Schülerinnen und Schüler gibt es Niedertemperatur-Schmelzkleber.', 'Technologiekarte, S. 67', TK + '13']`
- alt: `heiss('Die Düse wird heiss')` · neu: `['Die Düse wird heiss, nur mit Unterlage verwenden.', 'Technologiekarte, S. 65', TK + '11']`
- alt: `heiss('Heizstab und Werkstück werden heiss')` · neu: `['Heizdraht und Werkstück werden heiss, beim Warmbiegen Handschuhe tragen.', 'Technologiekarte, S. 65', TK + '11']`
- Abkantgerät bleibt (Handschuh-Zusatz D).

**B11 · Overlock: Quelle statt eigener Hinweis** (G2-10) · bau.py
- alt: `['Messer und Nadel: Finger vom Nähfuss fernhalten, beim Einfädeln den Motor ausschalten.', '', '']`
- neu: `['Die Maschine schneidet und näht zugleich: langsam nähen, Finger weg von Messer und Nadel, keine Stecknadeln im Nähgut. Das Einfädeln übernimmt mit Vorteil die Lehrperson.', 'Technologiekarte, S. 76', TK + '22']` (Seitenparameter 22 im PDF kurz prüfen)

**B12 · Dreieck-/Schwingschleifer: Beleg passt nicht** (G2-11) · bau.py · als eigener Hinweis kennzeichnen statt falsch belegen
- alt: `['Werkstück einspannen, Schutzbrille tragen.', 'Technologiekarte, S. 64', TK + '10']` · neu: `['Werkstück einspannen, Schutzbrille tragen.', '', '']`

**B13 · Gehrungskappsäge: zitierte Frage 12 umsetzen** (G2-13) · bau.py
- alt: `Keine kleinen, unfixierten Teile sägen. Gehörschutz tragen.` · neu: `Keine kleinen, unfixierten Teile sägen. Gehörschutz und Schutzbrille tragen.`
- alt: `'Suva 67125, S. 3, Fragen 11, 12'` · neu: `'Suva 67125, S. 3, Fragen 11 bis 13'`

**B14 · 3D-Druck: Nanomaterialien als Warnpunkt** (G3-02 Teil) · steht schon in der Spalte «Nicht verwenden», im Thema nur als Halbsatz
- inhalt.html alt: `als ABS. Keine Werkstoffe mit Nanomaterialien.` · neu: `als ABS.</li>\n<li>Keine Werkstoffe mit Nanomaterialien.` (eigener Punkt, chemsuisse S. 17 «ist zu verzichten», Zitat vorher mit grep prüfen)
- bau.py VERBOTE: `"Keine Werkstoffe mit Nanomaterialien"` ergänzen.

**B15 · Ständerbohrmaschine: Hauptgefahr der Suva-Checkliste** (G3-03 Teil) · inhalt.html
- alt: `Suva, Schutzhandschuhe&nbsp;↗</a></span></li>`
- neu: `Suva, Schutzhandschuhe&nbsp;↗</a></span></li>\n<li>Enganliegende Kleidung, lange Haare zusammenbinden oder verdecken, keinen Hals-, Hand- oder Armschmuck. Keine Lappen in der Nähe des drehenden Bohrers.</li>`

**B16 · Asbest: fest gebundener Asbest und Altbestände** (G3-04) · inhalt.html
- alt: `(chemsuisse, S. 22)</span></li>`
- neu: `(chemsuisse, S. 22)</span></li>\n<li>Fest gebundenen Asbest wie Faserzement («Eternit») nicht bearbeiten, beschädigte Teile fachgerecht entsorgen. Asbest steckt in Altbeständen etwa in Asbesthandschuhen, -schnüren und -papier und in Platten älterer Elektroöfen.</li>`

**B17 · Woodsches Metall als Warnpunkt** (G3-06 Teil) · gleich stark formuliert wie Montageschaum
- inhalt.html alt: `Auf Woodsches Metall verzichten: Es enthält Cadmium, dessen Dämpfe giftig sind.`
- neu: `Kein Woodsches Metall. <span class="warum">Warum: Es enthält Cadmium, dessen Dämpfe giftig sind (chemsuisse, S. 13)</span>`
- bau.py VERBOTE: `"Kein Woodsches Metall"` ergänzen. Matrix unverändert (D, Spalte bleibt knapp).

**B18 · Lasercutten: Laserklassen 3 und 4 als Warnpunkt** (G3-07) · inhalt.html
- alt: `Geräte der Laserklasse 1 bevorzugen. Klassen 3 und 4 kommen für Schulen nicht in Betracht. Geräte namhafter Hersteller mit CE-Konformitätserklärung und Bedienungsanleitung, keine Eingriffe oder Veränderungen.`
- neu: `Geräte der Laserklasse 1 bevorzugen, von namhaften Herstellern mit CE-Konformitätserklärung und Bedienungsanleitung.</li>\n<li>Keine Geräte der Laserklassen 3 und 4, keine Eingriffe oder Veränderungen am Gerät. <span class="warum">Warum: Laser der Klassen 3 und 4 brauchen zusätzliche Schutzmassnahmen gegen die Strahlung und kommen für Schulen nicht in Betracht (chemsuisse, S. 19)</span>`
- bau.py VERBOTE: `"Keine Geräte der Laserklassen"` ergänzen.

**B19 · Thermisch trennen: Widerspruch zum Schweissverbot auflösen** (G3-08, K01 der ersten Runde damit geklärt) · inhalt.html
- alt: `(siehe <a href="#schweissen">Schweissen</a>).</li>`
- neu: `(siehe <a href="#schweissen">Schweissen</a>). Rostfreie Stähle sind beim Trennen aber nicht ausgeschlossen, sie brauchen die Absaugung mit W3-Filter im nächsten Punkt.</li>`

**B20 · Sauger zündquellenfrei** (G3-09) · inhalt.html
- alt: `Die bfu nennt für Fachräume Staubsauger der Staubklasse M.` · neu: `Die bfu nennt für Fachräume Staubsauger der Staubklasse M. Sauger ab 50 Liter Volumen und 1 kW Leistung sollten zündquellenfrei gebaut sein.`

**B21 · Thermisch trennen: Gase** (G3-11) · inhalt.html
- alt: `bei rostfreien Stählen mit Abscheidegrad W3.` · neu: `bei rostfreien Stählen mit Abscheidegrad W3. Bei längerem Arbeiten den Raum zusätzlich gut lüften, Filter halten Gase nicht zurück.`

**B22 · Flüssige Kunststoffe lagern** (G3-12 Teil c) · inhalt.html
- alt: `In der Originalverpackung aufbewahren, abgefüllte Reste nicht zurückgiessen.` · neu: `In der Originalverpackung kühl, trocken und dunkel aufbewahren, abgefüllte Reste nicht zurückgiessen.`

**B23 · Separater Raum heisst nicht Unterrichtsraum, SLA-Handschuhe** (G3-13 Teil, G3-14 Teil) · inhalt.html
- alt: `Wenn möglich in einem separaten, gut belüfteten Raum.` · neu: `Wenn möglich in einem separaten, gut belüfteten Raum, nicht im Unterrichtsraum.`
- alt: `Wenn möglich in einem separaten Raum, gut belüftet.` · neu: `Wenn möglich in einem separaten Raum, gut belüftet, nicht im Unterrichtsraum.`
- alt: `Arbeitskleidung und Schutzbrille, auch beim Reinigen mit Lösungsmitteln.` · neu: `Arbeitskleidung und Schutzbrille, beim Reinigen mit Lösungsmitteln auch Schutzhandschuhe. Harzbehälter geschlossen halten.`

**B24 · Leder nur von vertrauenswürdigen Lieferanten** (G3-14 Teil, G5-11) · inhalt.html
- alt: `bei PVC zum Beispiel Salzsäure (chemsuisse, S. 16, 18)</span></li>`
- neu: `bei PVC zum Beispiel Salzsäure (chemsuisse, S. 16, 18)</span></li>\n<li>Leder nur von vertrauenswürdigen Lieferanten beziehen.</li>`

**B25 · Giessen: Verweis Schmuck** (G3-15 Teil a) · inhalt.html
- alt: `Giessen mit Reinzinn (95 bis 98 % Zinn) ist grundsätzlich unproblematisch.` · neu: `Giessen mit Reinzinn (95 bis 98 % Zinn) ist grundsätzlich unproblematisch. Für Schmuck und Gegenstände mit Hautkontakt siehe <a href="#hergestellt">Was hergestellt wird</a>.`

**B26 · Acrylglas kleben auffindbar** (G3-17) · inhalt.html
- alt: `mit lokaler Absaugung oder im Freien.</li>` · neu: `mit lokaler Absaugung oder im Freien.</li>\n<li>Acrylglas kleben: siehe <a href="#kleben">Kleben</a>.</li>`

**B27 · Tiefziehen mit Warum** (G3-18 Teil) · inhalt.html
- alt: `Zu hohe Temperaturen vermeiden.` · neu: `Zu hohe Temperaturen vermeiden. <span class="warum">Warum: Bei hohen Temperaturen können Zersetzungsprodukte entstehen, Dämpfe und Rauch (chemsuisse, S. 16)</span>`

**B28 · Material-Zeilen nach Entscheid «Keramik»** (G3-10, G4-16, G5-08) · Speckstein bleibt als Thema in der Zeile Keramik, nur die Beispiele sind ohne Speckstein (Memory 2026-11-02).
- inhalt.html alt: `<h3>Speckstein und Asbest</h3>\n<p class="mat">Material: Keramik, Glas, Stein</p>` · neu: `<h3>Speckstein und Asbest</h3>\n<p class="mat">Material: Speckstein, Altbestände</p>`
- inhalt.html alt: `<h3>Glasieren und Brennen</h3>\n<p class="mat">Material: Keramik, Glas, Stein</p>` · neu: `<h3>Glasieren und Brennen</h3>\n<p class="mat">Material: Keramik</p>`
- inhalt.html alt: `Material: Metall, Keramik, Glas, Stein` · neu: `Material: Metall, Glas`
- bau/app.js alt: `keramik:'Keramik, Glas, Stein'` · neu: `keramik:'Keramik'`

**B29 · Gasflaschen: Dichtheit und Gasaustritt, Quelle S. 79** (G4-01, G4-18 Teil) · inhalt.html
- alt: `<li>Flaschenventile von Hand und langsam öffnen, ohne Werkzeug.</li>`
- neu: `<li>Flaschenventile von Hand und langsam öffnen, ohne Werkzeug.</li>\n<li>Dichtheit nur mit Seifenwasser prüfen, nie mit einer Flamme. Bei Gasaustritt das Flaschenventil schliessen, wenn das gefahrlos geht, Zündquellen fernhalten und lüften.</li>`
- alt: `Öl und Fett können in reinem Sauerstoff in Brand geraten.` · neu: `Öl und Fett können in reinem Sauerstoff in Brand geraten (chemsuisse, S. 79).`
- alt: `chemsuisse, S. 9, 10, 78&nbsp;↗` · neu: `chemsuisse, S. 9, 10, 78, 79&nbsp;↗`

**B30 · Glasieren: Geschirr-Regel im Thema** (G4-02) · wer Tassen glasiert, öffnet dieses Thema
- inhalt.html alt: `Am Waschplatz einen Tonabscheider verwenden.` · neu: `Für Ess- und Trinkgeschirr nur Glasuren, die ausdrücklich dafür geeignet sind. <span class="warum">Warum: Schwermetalle wie Blei können sich aus der Glasur in Lebensmittel lösen (chemsuisse, S. 20, 21)</span></li>\n<li>Am Waschplatz einen Tonabscheider verwenden.`
- bau.py VERBOTE: `"Für Ess- und Trinkgeschirr nur Glasuren"` ergänzen.
- bau.py alt: `('Glasuren mit Schwermetallen für Geschirr', 'mat-keramik')` · neu: `('Glasuren mit Schwermetallen für Geschirr', 'glasieren-und-brennen')`

**B31 · Gasanlagen: Brenner einstellen wie bfu-Fussnote** (G4-03) · inhalt.html (INSTR-Präfix bleibt gültig)
- alt: `Gasanlagen für Hartlöten und Schweissen nehmen nur geschulte Lehrpersonen in und ausser Betrieb.` · neu: `Gasanlagen für Hartlöten und Schweissen nehmen nur geschulte Lehrpersonen in und ausser Betrieb und stellen die Brenner ein.`

**B32 · Brennofen als Regel** (G4-04 Teil) · inhalt.html
- alt: `Brennofen in einem gut durchlüfteten Raum mit Entlüftung ins Freie, regelmässig warten, keine brennbaren Materialien im Raum. Auf dem Plakat ist der Keramikbrennofen den Lehrpersonen vorbehalten.`
- neu: `Den Keramikbrennofen bedienen nur Lehrpersonen (bfu-Plakat 4.301). Ihn in einem gut durchlüfteten Raum mit Entlüftung ins Freie aufstellen, etwa mit Ablufthaube und Ventilator oder Abluftrohr, nach den Aufstellungshinweisen der Herstellerin. Regelmässig warten, keine brennbaren Materialien im Raum.`
- bau.py INSTR alt: `("Brennofen in einem gut durchlüfteten Raum","selbst")` · neu: `("Den Keramikbrennofen bedienen nur Lehrpersonen","selbst")`

**B33 · Glasieren: Muss und Warum** (G4-05) · inhalt.html
- alt: `Alte Glasuren unbekannter Zusammensetzung entsorgen.` · neu: `Alte Glasuren unbekannter Zusammensetzung müssen entsorgt werden.`
- alt: `möglichst auch mit Borverbindungen.</li>` · neu: `möglichst auch mit Borverbindungen. <span class="warum">Warum: Schwermetalle in Glasuren, Engoben und Farben können bei direktem Kontakt oder beim Verschlucken schwere Gesundheitsschäden verursachen (chemsuisse, S. 21)</span></li>`

**B34 · «Gesetz» bei generell verbotenen Stoffen** (G4-06) · nur einsetzen, wenn die Anhang-Nummern in chemsuisse Tabelle 2 (S. 33, 34) genau so stehen, sonst weglassen
- alt: `<span class="warum">Warum: Chlorierte Lösungsmittel` · neu: `<span class="ges">Gesetz: Chloroform und Trichlorethen generell verboten, ChemRRV Anhang 1.3 und 1.17</span> <span class="warum">Warum: Chlorierte Lösungsmittel`
- alt: `<span class="warum">Warum: Flusssäure ist stark giftig und dringt tief ins Gewebe` · neu: `<span class="ges">Gesetz: Chromsäure generell verboten, ChemRRV Anhang 1.17</span> <span class="warum">Warum: Flusssäure ist stark giftig und dringt tief ins Gewebe`
- alt: `<span class="warum">Warum: Dichlormethan steht im Verdacht` · neu: `<span class="ges">Gesetz: Trichlorethen generell verboten, ChemRRV Anhang 1.17</span> <span class="warum">Warum: Dichlormethan steht im Verdacht`

**B35 · Hartlöten: dritter Flussmittel-Ausschluss** (G4-08) · inhalt.html
- alt: `Keine hydrazinhaltigen.` · neu: `Keine hydrazinhaltigen und keine mit niedrigschmelzenden, modifizierten oder aktivierenden Harzen, stattdessen stabilisierte oder reine Harze.`

**B36 · Warum zur Quellenabsaugung** (G4-09) · inhalt.html
- alt: `Bei richtiger Materialwahl und kurzer Belastung reicht Raumlüftung oder ein gekipptes Fenster.` · neu: `Bei richtiger Materialwahl und kurzer Belastung reicht Raumlüftung oder ein gekipptes Fenster. <span class="warum">Warum: Die meisten Rauchpartikel beim Löten sind lungengängig, aus dem Flussmittel entstehen gesundheitsschädliche Zersetzungsprodukte (chemsuisse, S. 11)</span>`
- alt: `Nur für Autogenschweissen an unlegiertem Stahl genügt ein gekipptes Fenster.` · neu: `Nur für Autogenschweissen an unlegiertem Stahl genügt ein gekipptes Fenster. <span class="warum">Warum: Schweissrauch besteht aus feinsten Partikeln, die tief in die Lunge gelangen, dazu entstehen giftige Gase wie Ozon, Stickoxide und Kohlenmonoxid (chemsuisse, S. 9)</span>`

**B37 · Leinöl: Widerspruch Kehricht auflösen** (G4-10)
- inhalt.html alt: `Getränkte Lappen und Papiere nie in den normalen Kehricht.` · neu: `Getränkte Lappen und Papiere nie lose in den Abfalleimer.` (VERBOTE-Präfix bleibt gültig)
- inhalt.html alt: `Zum Trocknen aufhängen oder auf nicht brennbarer Unterlage ausbreiten, 48 Stunden. Alternativ in einem zugeknoteten Plastikbeutel entsorgen.` · neu: `Zum Trocknen 48 Stunden aufhängen oder auf nicht brennbarer Unterlage ausbreiten. Alternativ in einem zugeknoteten Plastikbeutel in den Kehricht geben.`
- inhalt.html alt: `auch für Arbeitskleidung und für Textilien, die nach dem Waschen in den Tumbler kommen.` · neu: `auch für Arbeitskleidung und für ungenügend ausgewaschene Textilien im Tumbler.`
- bau.py alt: `'getränkte Lappen können sich selbst entzünden, nie in den Kehricht'` · neu: `'getränkte Lappen können sich selbst entzünden, nie lose in den Abfall'`

**B38 · Kleben: Polyurethan ohne Ersatz, Warum bei Epoxy und Sekundenkleber** (G4-11) · inhalt.html
- alt: `Polyurethan-Klebstoffe durch lösungsmittelfreie oder -arme Dispersionsklebstoffe ersetzen.` · neu: `Polyurethan-Klebstoffe durch lösungsmittelfreie oder -arme Dispersionsklebstoffe ersetzen. Wo kein Ersatz möglich ist: Hautkontakt ausschliessen, Schutzhandschuhe nach Sicherheitsdatenblatt, gute Belüftung. <span class="warum">Warum: Isocyanate können Haut und Atemwege stark sensibilisieren (chemsuisse, S. 23)</span>`
- alt: `Raum gut lüften, danach Hände mit warmem Wasser und Seife waschen.` · neu: `Raum gut lüften, danach Hände mit warmem Wasser und Seife waschen. <span class="warum">Warum: Epoxyklebstoffe reizen und können Allergien auslösen (chemsuisse, S. 23)</span>`
- alt: `Bei Augenkontakt ärztlich untersuchen lassen.</li>` · neu: `Bei Augenkontakt ärztlich untersuchen lassen. <span class="warum">Warum: Sekundenkleber verklebt Haut und Augenlider in Sekunden (chemsuisse, S. 23)</span></li>`

**B39 · Pigmente: Ausnahme der Quelle** (G4-12) · inhalt.html, sonst wirken übliche Schulfarbkästen verboten
- alt: `z. B. Cadmiumrot, Chromgelb, Bleiweiss, Zinnober.` · neu: `z. B. Cadmiumrot, Chromgelb, Bleiweiss, Zinnober. Organische Ersatzpigmente mit gleichem Namen sind nicht gemeint.`

**B40 · Schweissen: hochlegiert, Überzüge aus Chrom, Nickel, Cadmium, Matrix nicht schärfer als die Quelle** (G4-14 Teil, G5-06)
- inhalt.html alt: `Keine Schweissarbeiten an rostfreien Stählen (Chrom-Nickel-Stähle) oder an Stählen mit galvanischen Überzügen.` · neu: `Keine Schweissarbeiten an hochlegierten, z. B. rostfreien Stählen (Chrom-Nickel-Stähle) oder an Stählen mit galvanischen Überzügen aus Chrom, Nickel oder Cadmium.` (VERBOTE-Präfix «Keine Schweissarbeiten» bleibt)
- bau.py alt: `'Rostfreie und galvanisch beschichtete Stähle schweissen'` · neu: `'Rostfreie, verchromte oder vernickelte Stähle schweissen'`

**B41 · Atemschutz-Filter am Ort** (G4-15 Teil, G6-17 Teil) · inhalt.html
- alt: `Nicht auf Flammen, elektrische Geräte oder heisse Flächen sprühen.` · neu: `Nicht auf Flammen, elektrische Geräte oder heisse Flächen sprühen. Lässt sich der Kontakt mit Sprühnebel trotzdem nicht vermeiden, Atemschutz mit Kombinationsfilter, z. B. A2P2.`
- alt: `Haut nie mit Benzin, Nitroverdünner oder Pinselreiniger reinigen.` · neu: `Haut nie mit Benzin, Nitroverdünner oder Pinselreiniger reinigen. Bei grossflächigen oder längeren Arbeiten ohne besondere Lüftung Halbmaske mit Filter Typ A.`
- alt: `einen Aktivkohlefilter (Typ A).</li>` · neu: `einen Aktivkohlefilter (Typ A). Welcher Filter nötig ist, steht in Abschnitt 8 des Sicherheitsdatenblatts.</li>`

**B42 · MEKO mit Schweizer Anker** (G4-17) · inhalt.html
- alt: `und kann Allergien auslösen.` · neu: `und kann Allergien auslösen. Stoffe mit H350 sollen an Schulen nicht eingesetzt werden (chemsuisse, S. 34).`

**B43 · Ampel Gelb: Totenkopf mit H-Sätzen, Rot mit Kategorie** (G5-01) · inhalt.html · Wortlaut der drei neuen H-Sätze vor dem Einsetzen an chemsuisse Anhang D, S. 69 abgleichen
- alt: `z. B. <a class="b-wort" href="#h-H314"` · neu: `z. B. <a class="b-wort" href="#h-H301" data-b="h-H301" aria-haspopup="dialog">H301</a>, <a class="b-wort" href="#h-H311" data-b="h-H311" aria-haspopup="dialog">H311</a>, <a class="b-wort" href="#h-H331" data-b="h-H331" aria-haspopup="dialog">H331</a>, <a class="b-wort" href="#h-H314"`
- alt: `akut stark giftig</li>` · neu: `akut stark giftig (Kategorie 1 und 2)</li>`
- Neue Abschnitte im Block `h-saetze`, Aufbau wie `h-H300`, Quelle «chemsuisse, Anhang D, S. 69»: vor `<section class="begriff" id="h-H310">` die Abschnitte `h-H301` «Giftig bei Verschlucken.» und `h-H304` (siehe B72), vor `<section class="begriff" id="h-H314">` `h-H311` «Giftig bei Hautkontakt.», vor `<section class="begriff" id="h-H334">` `h-H331` «Giftig bei Einatmen.»

**B44 · Ampel Gelb: Erbgut** (G5-02) · inhalt.html
- alt: `Verdacht auf Krebs oder Fortpflanzungsschäden` · neu: `Verdacht auf Krebs, Erbgut- oder Fortpflanzungsschäden`
- alt: `bei Verdacht auf Krebs- oder Fortpflanzungsschädigung` · neu: `bei Verdacht auf Krebs-, Erbgut- oder Fortpflanzungsschädigung`
- alt: `H334</a>, <a class="b-wort" href="#h-H351"` · neu: `H334</a>, <a class="b-wort" href="#h-H341" data-b="h-H341" aria-haspopup="dialog">H341</a>, <a class="b-wort" href="#h-H351"`

**B45 · Matrix Kunststoff: kein PVC als Beispiel** (G5-07) · bau.py
- alt: `'Acrylglas, PLA, ABS, PVC'` · neu: `'Acrylglas, Sagex, PLA, ABS'`

**B46 · Matrix Metall: Reinzinn** (G5-09 Teil) · bau.py
- alt: `'Stahl, Aluminium, Kupfer, Messing, Zinn'` · neu: `'Stahl, Aluminium, Kupfer, Messing, Reinzinn'`

**B47 · Emissionen: Glasurpulver** (G5-14) · inhalt.html
- alt: `Schleifen und bei Speckstein. Wenig Staub` · neu: `Schleifen, bei Speckstein und beim Anrühren von Glasurpulver. Wenig Staub`
- alt: `Staub</a> und <a href="#speckstein-und-asbest">Speckstein und Asbest</a>.` · neu: `Staub</a>, <a href="#speckstein-und-asbest">Speckstein und Asbest</a> und <a href="#glasieren-und-brennen">Glasieren und Brennen</a>.`

**B48 · Ampel Grün mit Beleg** (G5-17) · inhalt.html, bfu-Zitat steht unter Lagerung
- alt: `Sie dürfen sichtbar und griffbereit bleiben.` · neu: `Sie dürfen sichtbar und griffbereit bleiben, siehe <a href="#lagerung">Lagerung</a>.`

**B49 · STOP: Organisation wie Merkblatt Bern, Schmuck immer ablegen** (G6-05) · inhalt.html
- alt: `Dauer und Höhe der Belastung senken.` · neu: `Belastung zeitlich begrenzen, Arbeiten räumlich trennen, z. B. einzelne Schritte draussen, instruieren und begleiten.`
- alt: `An Maschinen mit drehenden Teilen enganliegende Kleidung, lange Haare zusammenbinden, Schmuck wie Ringe und Ketten ablegen.` · neu: `Schmuck wie Ringe und Ketten ablegen. An Maschinen mit drehenden Teilen enganliegende Kleidung, lange Haare zusammenbinden.`

**B50 · Abläufe: Einatmen** (G6-07) · inhalt.html, chemsuisse S. 44
- alt: `Bei Verätzungen und Verbrennungen keine Seife.</li>` · neu: `Bei Verätzungen und Verbrennungen keine Seife.</li>\n<li>Dämpfe oder Rauch eingeatmet: sich selbst schützen, lüften oder die Person aus dem Raum bringen, warm halten und ruhig stellen, ärztlich beraten lassen oder 145 anrufen.</li>`

**B51 · Kein Erbrechen, Tox Info im Popup** (G6-08, G9-14) · inhalt.html
- alt: `nach Anweisung von Tox Info Suisse handeln.` · neu: `nach Anweisung von Tox Info Suisse handeln. Kein Erbrechen auslösen.`
- alt: `Darum kein Erbrechen herbeiführen und ärztlichen Rat einholen. Gefahrenhinweis H304.` · neu: `Darum kein Erbrechen herbeiführen und sofort ärztlichen Rat einholen, etwa bei Tox Info Suisse, Telefon 145. Gefahrenhinweis <a class="b-wort" href="#h-H304" data-b="h-H304" aria-haspopup="dialog">H304</a>.`

**B52 · Lehrplan: was die Schülerinnen und Schüler können sollen** (G6-09) · inhalt.html, ein Satz aus bfu 4.302 S. 4, 5
- alt: `(TTG.2.E.1). In den Kompetenzstufen` · neu: `(TTG.2.E.1). Die bfu nennt dazu, was die Schülerinnen und Schüler können sollen, etwa Maschinen unter Anleitung sicher ein- und ausschalten, Warnhinweise und Piktogramme kennen, die eigenen Fähigkeiten einschätzen und bei Bedarf einen Prozess stoppen oder Hilfe holen. In den Kompetenzstufen`
- alt: `bfu 2.524, S. 20&nbsp;↗</a> · ` · neu: `bfu 2.524, S. 20&nbsp;↗</a> · <a class="ql" href="[URL bfu 4.302]">bfu 4.302, S. 4, 5&nbsp;↗</a> · `

**B53 · Erschliessungshandeln: welche Folgen** (G6-10) · inhalt.html
- alt: `Sie arbeiten dabei selbstständiger, und der Fachraum wird anders genutzt. Das hat Folgen für Einrichtung und Aufsicht.`
- neu: `Sie arbeiten dabei selbstständiger, oft in Gruppen an verschiedenen Vorhaben und werkstoffübergreifend. Damit die Aufsicht gewährleistet bleibt, empfiehlt die bfu verbundene Fachräume mit Sichtkontakt durch Sicherheitsglas, siehe <a href="#raeume">Räume</a>.`
- alt: `bfu 2.524, S. 6&nbsp;↗</a> · Technik und Design, S. 181, 182` · neu: `bfu 2.524, S. 6, 7&nbsp;↗</a> · Technik und Design, S. 181, 182`

**B54 · Erschliessungshandeln wie Grundlage** (G6-11) · inhalt.html
- alt: `Heute erschliessen die Schülerinnen und Schüler Themen aus Design und Technik, vom Herstellen über den Gebrauch bis zur Entsorgung, das ist Erschliessungshandeln.`
- neu: `Heute erschliessen die Schülerinnen und Schüler Themen aus Design und Technik, indem sie herstellen, gebrauchen, bewerten und reflektieren, bis hin zur Entsorgung. Das ist Erschliessungshandeln.`

**B55 · Gehörschutz wie Suva** (G6-15) · inhalt.html
- alt: `Ab 85 dB(A) gilt nach Suva eine Tragepflicht.` · neu: `Ab einem Schallpegel von 85 dB(A) verlangt die Suva Gehörschutz.`

**B56 · Handschuhe: SDB zuerst, Leder bis über den Unterarm** (G6-16) · inhalt.html
- alt: `Handschuhe aus Nitril oder Neopren gegen Säuren und Laugen, nach Abschnitt 8 des Sicherheitsdatenblatts.` · neu: `Welches Handschuhmaterial passt, steht in Abschnitt 8 des Sicherheitsdatenblatts. Gegen Säuren und Laugen eignen sich Nitril oder Neopren, gegen einzelne Spritzer genügen Einweghandschuhe.`
- alt: `<li>Lederhandschuhe gegen Hitze und Funken.</li>` · neu: `<li>Dicke Lederhandschuhe bis über den Unterarm gegen Hitze und Funken.</li>`

**B57 · Notfallausstattung: Unterhalt und Warum** (G6-18) · inhalt.html
- alt: `Keine nachfüllbaren Augenspülflaschen.` · neu: `Keine nachfüllbaren Augenspülflaschen. Augenduschen regelmässig spülen und prüfen.`
- alt: `auf die vorhandenen Stoffe abgestimmt.` · neu: `auf die vorhandenen Stoffe abgestimmt, gewartet und der Einsatz geübt.`
- alt: `Universalbindemittel für verschüttete Chemikalien, kein Sägemehl und kein Papier.` · neu: `Universalbindemittel für verschüttete Chemikalien, kein Sägemehl und kein Papier. <span class="warum">Warum: Sägemehl und Papier können mit Oxidationsmitteln wie Wasserstoffperoxid oder Salpetersäure gefährlich reagieren (chemsuisse, S. 47)</span>`

**B58 · Grundregeln: Stoffe nicht unbeaufsichtigt, Warum wie Quelle** (G6-19 Teil) · inhalt.html (Quellenzeile nennt S. 39 schon)
- alt: `und Verwechslungen sind ausgeschlossen.` · neu: `und Verwechslungen werden vermieden.`
- alt: `sind meist brennbar.</span></li>` · neu: `sind meist brennbar.</span></li>\n<li>Gefährliche Stoffe nicht unbeaufsichtigt stehen lassen, auch nicht in der Pause.</li>`

**B59 · Augenspülung: Kontaktlinsen** (G6-20 Teil) · inhalt.html
- alt: `Lider offen halten, das unverletzte Auge oben.` · neu: `Lider offen halten, das unverletzte Auge oben. Kontaktlinsen vorher entfernen, wenn das rasch geht.`

**B60 · Wartung und Elektrokontrolle trennen** (G7-03) · inhalt.html
- alt: `Fachfirmen bieten jährliche Kontrollen an. Elektrische Anlagen und Geräte periodisch prüfen lassen.`
- neu: `Maschinen und Anlagen nach der Betriebsanleitung warten, Fachfirmen bieten jährliche Kontrollen an.</li>\n<li>Elektrische Anlagen und Geräte periodisch prüfen lassen.`

**B61 · Asbest im Lager: Verweis** (G7-06 Teil) · inhalt.html
- alt: `und alte Asbestteile. Im Zweifel eine Fachfirma beiziehen.` · neu: `und alte Asbestteile, siehe <a href="#speckstein-und-asbest">Speckstein und Asbest</a>. Im Zweifel eine Fachfirma beiziehen.`

**B62 · Säureschränke lüften** (G7-09) · inhalt.html
- alt: `Säuren und Laugen getrennt in separaten, beständigen Kunststoffwannen lagern.` · neu: `Säuren und Laugen getrennt in separaten, beständigen Kunststoffwannen lagern. Schränke mit flüchtigen Säuren wie Salzsäure oder Ameisensäure oder mit Ammoniaklösung wirksam lüften, ausser es sind insgesamt höchstens 25 Liter in dichten Behältern.`

**B63 · FI-Schalter: 30 mA und Warum** (G7-11 Teil, G9-16) · inhalt.html · «Gesetz: NIN» bleibt vorerst
- alt: `FI-Schutzschalter in allen Fachräumen, bestehende nachrüsten.` · neu: `FI-Schutzschalter mit 30 mA in allen Fachräumen, bestehende nachrüsten.`
- alt: `Gesetz: Niederspannungs-Installationsnorm (NIN), bei neuen Installationen</span>` · neu: `Gesetz: Niederspannungs-Installationsnorm (NIN), bei neuen Installationen</span> <span class="warum">Warum: Er schaltet ab, wenn ein angeschlossenes Gerät, Kabel oder Stecker defekt sein könnte (bfu 2.524, S. 14)</span>`
- alt: `oder ein defektes Gerät zur Erde fliesst.` · neu: `oder ein defektes Gerät zur Erde fliesst. Für Fachräume nennt die bfu einen FI mit 30 mA (0,03 A).`

**B64 · Zusammenlagerung im SDB** (G7-14) · inhalt.html
- alt: `getrennt von anderen Produkten und von Lebensmitteln.</li>` · neu: `getrennt von anderen Produkten und von Lebensmitteln. Welche Stoffe nicht zusammen gelagert werden dürfen, steht im Sicherheitsdatenblatt, Abschnitte 7.2 und 10.3.</li>`

**B65 · Gasanlagen in der Wartung** (G7-17) · inhalt.html, bfu 2.524 S. 16 (schon zitiert)
- alt: `Den Zustand der Schutzausrüstung periodisch prüfen.</li>` · neu: `Den Zustand der Schutzausrüstung periodisch prüfen.</li>\n<li>Gasanlagen periodisch von Fachleuten oder vom Hersteller prüfen lassen, siehe <a href="#gasflaschen">Gasflaschen und Gasanlagen</a>.</li>`

**B66 · Toter Link Luzern** (G8-01) · inhalt.html · Ersatz-URL auf volksschulbildung.lu.ch (Schulrecht, Merkblätter, «merkblatt_haftung_schulalltag.pdf») vor dem Einsetzen öffnen und Inhalt prüfen. Findet sich das PDF nicht, den Link ganz entfernen.
- alt: `https://sport-beruf.lu.ch/-/media/sport_beruf/Dokumente/Merkblatt_Haftung_im_Schulalltag.pdf">Merkblatt Kanton Luzern, Haftung im Schulalltag`
- neu: `[geprüfte URL Volksschulbildung Luzern]">Merkblatt Luzern, Haftung im Schulalltag (Volksschule)`

**B67 · BGE 122 IV 303: worum es ging** (G8-03, G9-02 Teil BGE) · inhalt.html · der Textteil «Bundesgericht in einem Urteil vom 26. September 1996» bleibt wörtlich, er ist data-wort des Popups
- alt: `so das Bundesgericht in einem Urteil vom 26. September 1996 (` · neu: `so das Bundesgericht in einem Urteil vom 26. September 1996 zu einer Bergwanderung im Klassenlager, bei der ein Schüler tödlich verunglückte (`
- alt: `Auf einer Schulwanderung stürzte ein Schüler tödlich.` · neu: `Bei einer Bergwanderung im Klassenlager verunglückte ein Schüler auf einem Schneefeld tödlich.`

**B68 · LAV Bern: nur Art. 52 trägt die Aussage** (G8-08) · inhalt.html
- alt: `Bern LAV Art. 52 bis 60` · neu: `Bern LAV Art. 52`
- alt: `(LAV Art. 52 bis 60)` · neu: `(LAV Art. 52)`

**B69 · Gesetz-Marke Mutterschaft vollständig** (G8-10) · inhalt.html · Wort «Mutterschutz» bewusst vermieden (Memory)
- alt: `Gesetz: ArG Art. 35, SR 822.111.52` · neu: `Gesetz: ArG Art. 35, ArGV 1 Art. 62 und 63, SR 822.111.52 Art. 13`

**B70 · Ansprechperson «auf Anfrage»: Grundlage nennen** (G8-11) · inhalt.html
- alt: `Meldung nach Chemikalienverordnung ChemV Art. 59)` · neu: `Meldung nach Chemikalienverordnung ChemV Art. 59 und Verordnung des EDI über die Chemikalien-Ansprechperson)`

**B71 · Quellenliste einheitlich, offen aus r8 B25** (G9-05) · inhalt.html
- alt: `Kanton Bern, Bildungs- und Kulturdirektion, Amt für Kindergarten, Volksschule und Beratung: Merkblatt «Sicherheit im Textilen und Technischen Gestalten» (2019.ERZ.6383): ` · neu: `Kanton Bern, Bildungs- und Kulturdirektion, Amt für Kindergarten, Volksschule und Beratung (o. J.): Sicherheit im Textilen und Technischen Gestalten. Merkblatt 2019.ERZ.6383, 2 Seiten. `
- alt: `Lehrplan 21, Fachbereich Gestalten, Textiles und Technisches Gestalten: ` · neu: `D-EDK (2016): Lehrplan 21. Gestalten, Textiles und Technisches Gestalten. Online: `
- alt: `Stuber u. a., «Technik und Design. Lehrhilfen», Technologiekarten, hep Verlag 2023: ` · neu: `Stuber u. a. (2023): Technik und Design. Lehrhilfen, Technologiekarten. hep Verlag. `
- alt: `Leitfaden für Schulen. 4.302.01, 6 Seiten.` · neu: `Leitfaden für Schulen. Bern: bfu, 4.302, 6 Seiten.`
- alt: `Safety Tool 4.301.01` · neu: `Safety Tool 4.301`

**B72 · H304 als Popup** (G9-06) · inhalt.html · vor `<section class="begriff" id="h-H310">` (nach h-H301 aus B43): `<section class="begriff" id="h-H304"><h3>H304</h3><p>Kann bei Verschlucken und Eindringen in die Atemwege tödlich sein.</p><p class="quelle"><a class="ql" href="[CHEM]">chemsuisse, Anhang D, S. 69&nbsp;↗</a> · <a href="#b-hsaetze">Was H-Sätze sind</a></p></section>` (Wortlaut an S. 69 abgleichen). Link im Popup Aspiration siehe B51.

**B73 · Fritte: keine Entwarnung fürs Geschirr** (G9-08) · inhalt.html
- alt: `deshalb massiv tiefer als bei Pasten oder Pulvern.` · neu: `deshalb massiv tiefer als bei Pasten oder Pulvern. Für das fertige Stück, etwa Geschirr, gelten aber dieselben Regeln wie für andere Glasuren.`

**B74 · Begriff «Chemikalien-Ansprechperson»** (G9-09) · inhalt.html, gesetzliche Pflicht, kommt fünfmal vor
- vor `<section class="begriff" id="b-sonderabfall"` einfügen: `<section class="begriff" id="b-ansprechperson" data-wort="Chemikalien-Ansprechperson">\n<h3>Chemikalien-Ansprechperson</h3>\n<p>Person, die eine Schule für Fragen zu gefährlichen Chemikalien bezeichnen muss, etwa die verantwortliche Person für die Chemikalien oder die Schulleitung. Sie wird der kantonalen Fachstelle auf Anfrage gemeldet, siehe <a href="#schulleitung">Pflichten und Empfehlungen</a>.</p>\n<p class="quelle">ChemG Art. 25 Abs. 2, ChemV Art. 59 · <a class="ql" href="[CHEM]">chemsuisse, S. 1&nbsp;↗</a></p>\n</section>\n\n`

**B75 · H360 mit Buchstaben** (G9-10) · inhalt.html, Borsäure trägt H360FD (Hartlöten)
- alt: `<p>Kann die Fruchtbarkeit beeinträchtigen oder das Kind im Mutterleib schädigen.</p>` · neu: `<p>Kann die Fruchtbarkeit beeinträchtigen oder das Kind im Mutterleib schädigen.</p><p>Auf Etiketten oft mit Buchstaben: F betrifft die Fruchtbarkeit, D das Kind im Mutterleib, ein kleiner Buchstabe bedeutet Verdacht, z. B. H360Fd.</p>`

---

## C · Lukas vorher fragen

**C1 · Lasercutter: zwei Quellen widersprechen sich** (G3-01)
Befund: bfu 2.524 S. 21 führt den Lasercutter unter «Maschinen für Lehrpersonen», die Seite zitiert genau diese Stelle, schreibt aber nach chemsuisse S. 19 «Schülerinnen und Schüler bedienen den Lasercutter nur unter Aufsicht». THEMA_KERN sagt «nur unter Aufsicht».
Frage: Soll das Thema beide Quellen offen nennen: «Die bfu führt den Lasercutter unter den Maschinen für Lehrpersonen (bfu 2.524, S. 21), chemsuisse lässt die Bedienung unter Aufsicht einer Lehrperson zu (S. 19). Massgebend ist die Vorgabe des Kantons.»?
Empfehlung: ja, mit THEMA_KERN «bfu: nur Lehrpersonen, chemsuisse: unter Aufsicht, kein PVC, Teflon oder Polyurethan». Deine Werkraumpraxis entscheidet, ob du dich für eine Lesart aussprichst.

**C2 · Haftung juristisch präzisieren** (G8-02, G8-07, G8-09, G8-12, G8-13, G9-02 Teil Schulträger)
Befund trifft zu: «Für Schäden aus dem Unterricht haftet in der Regel der öffentliche Schulträger» und die Karte «haftet gegenüber Geschädigten» lassen die Voraussetzung (widerrechtlich verursachter Schaden) weg. «ArG Art. 6, das nach Art. 3a auch an öffentlichen Schulen anwendbar ist» klingt nach dem ganzen ArG, gilt aber nur für den Gesundheitsschutz. «schon bei einfacher Fahrlässigkeit strafbar» vermischt Begriffe. «Sie ergibt sich aus Strafrecht …» nennt das Strafrecht als Quelle der Pflicht. Glossar Schulträger «haftet in der Regel sie, nicht die Lehrperson» verschweigt Rückgriff und Strafrecht.
Frage: Darf ich diese fünf Stellen so präzisieren: Haftung «wenn eine Lehrperson im Unterricht widerrechtlich einen Schaden verursacht, etwa durch Verletzung der Sorgfaltspflicht», ArG «nur die Bestimmungen zum Gesundheitsschutz gelten nach Art. 3a auch für Kantone und Gemeinden», «Fahrlässige Tötung und fahrlässige Körperverletzung sind strafbar, grobe Fahrlässigkeit braucht es dafür nicht», Obhutspflicht «aus kantonalem Schulrecht, Arbeitsverhältnis und übernommener Aufsicht, wer sie verletzt, kann strafrechtlich verantwortlich werden», Glossar mit Rückgriff bei grober Pflichtverletzung?
Empfehlung: ja. Ohne den Satz zur Krankenversicherung (G8-04, unbelegt) und «Verweis» bleibt als bfu-Wortlaut (G8-13).

**C3 · Pflicht statt Empfehlung an drei Stellen** (G8-06, G7-04, G7-18)
Befund: Merkblatt Bern Abschnitt 1 nennt die Mitwirkungspflicht der Lehrpersonen (ArG Art. 6 Abs. 3), chemsuisse S. 38 versteht das Aufräumen alter Bestände als gesetzliche Pflicht (ChemV), chemsuisse S. 32 nennt das Aufbewahren der Sicherheitsdatenblätter eine Pflicht der Schule. Die Seite führt das als Empfehlung oder gar nicht.
Frage: Sollen diese drei Punkte als Pflicht erscheinen (ein Satz unter «Warum Gesetze offen formuliert sind», Tabelle «Pflichten und Empfehlungen» mit aufgeteilter Zeile Chemikalienliste/Aufräumen, Lagerung mit Satz zum Sicherheitsdatenblatt)?
Empfehlung: ja, jeweils mit der Quelle, die es so sagt. KERN «sieben Pflichten» danach nachzählen.

**C4 · Elektrokontrolle: 5 Jahre oder 5 bis 10 Jahre** (G7-02)
Befund: Seite und Recht-Tabelle «bei Schulhäusern alle 5 Jahre». bfu 4.323 S. 8 nennt «in der Regel alle 5 bis 10 Jahre, mindestens alle 20 Jahre». G8 stützt 5 Jahre für Schulhäuser über den NIV-Anhang, aber nur über eine Sekundärquelle.
Frage: Soll «bei Schulhäusern alle 5 Jahre» bleiben, ergänzt um den Verweis «NIV Anhang», sobald die Ziffer am Erlass geprüft ist?
Empfehlung: ja. Das Gesetz geht dem Merkblatt vor, die bfu-Angabe ist allgemein. Ist die Ziffer nicht prüfbar, «je nach Art der Anlage 5 bis 20 Jahre, bei Schulhäusern meist 5» schreiben.

**C5 · Ampel: Lücke zwischen Grün und Gelb** (G5-03, G5-04)
Befund: Grün heisst «ohne Gefahrenpiktogramm», Gelb nennt «reizend», was chemsuisse Tabelle 4 nicht enthält (zu scharf). Häufige Produkte wie Brennsprit oder Verdünner (Flamme, H225) fallen nirgends hin.
Frage: Soll Gelb «hautsensibilisierend» statt «reizend, hautsensibilisierend» heissen und unter der Ampel ein Satz stehen: «Produkte mit anderen Piktogrammen, etwa der Flamme bei Brennsprit: nach Etikette und Sicherheitsdatenblatt verwenden und lagern, siehe Lagerung.»?
Empfehlung: ja, ohne die zusätzlichen H-Sätze H250, H260, H261, EUH380, EUH381.

**C6 · Entsorgung: Sammeln und Abholung** (G7-05, G7-07)
Befund: Entsorgung sagt nur «nicht mischen». chemsuisse S. 48 bis 51 nennt dichte, beschriftete Behälter, nie Getränkeflaschen, Abholung durch eine Entsorgungsfirma, kein Selbsttransport.
Frage: Soll Entsorgung zwei kurze Punkte bekommen: «Abfälle getrennt in dichten, mit «Sonderabfall» beschrifteten Behältern sammeln, nie in Getränkeflaschen, in Auffangwannen und für Unbefugte unzugänglich.» und «Sonderabfälle holt eine Entsorgungsfirma ab, ob eine Sammelstelle sie annimmt, regelt der Kanton. Nicht selbst transportieren.»?
Empfehlung: ja, ohne die Gruppen A bis D und ohne Betriebsnummer und Begleitschein.

---

## D · verwerfen

- **G1-04** (neuer ermutigender Einstieg) · Einstieg ist Lukas' Wortlaut («Ausgangspunkt ist das Unterrichtsvorhaben»), ermutigender Einstieg wurde schon einmal gebaut und wieder entfernt.
- **G1-05** («Je selbstständiger …» ersetzen) · Einordnung der Seite, gestützt auf bfu 2.524 S. 6 (Erschliessungsfachraum, Selbstverantwortung), trifft nur teilweise zu.
- **G1-07** (Notfälle durch Räume ersetzen) · Link-Auswahl der drei Fragen heute von Lukas gesetzt, Notfälle gehören zur Situation.
- **G1-08, G1-09** (Frage Situation und Titel «vor jeder Arbeit» umformulieren) · Lukas' Grundsatz der drei Fragen, Wortlaut bleibt.
- **G1-10** (Symbole und «Hinweis dieser Seite» im Randkasten) · Randkasten muss ganz ins Fenster passen.
- **G1-12** (S. 14 aus der Quellenzeile) · breiter, aber nicht falsch («dieser Raum»).
- **G1-14** (Praktikumssatz im Einstieg) · steht in Sicher unterrichten, Einstieg bleibt schlank.
- **G2-02** (Plakatsätze unter die Legende) · Lukas hat Plakat-Hinweise heute gelöscht, Lernvoraussetzungen stehen in Sicher unterrichten.
- **G2-04 Rest, G2-07, G2-15, G2-16** (neue Hinweise auf Poliermaschine, CNC, Dübelfräse, Gruppe Lehrpersonen, Bandschleifmaschine) · Entscheid: Plakat ohne Zusatzhinweise auf den Karten. Schulungssatz steht im Verfahrenstext Nur für Lehrpersonen.
- **G2-17** (Heissgeräte-Link bei Laminier-, Folienschweissgerät, Thermoschneider) · Thementitel nennt vier Geräte, sonst Titelumbau.
- **G3-05** (Warnpunkt Schleifpapier entfernen) · «nicht ausklopfen» ist ein Ausschluss im Sinn der Legende (vgl. r8 K08).
- **G3-12 Teil b, G3-13 Rest, G3-15 Teil b** (Montageschaum-Details, Nachbearbeitung 3D-Druck, Hitze beim Giessen) · Vollständigkeit vor Übersicht bzw. ohne Quelle.
- **G3-19** (Einleitung Umformen) · Satz behauptet keine bfu-Aufzählung, 3D-Druck unter Umformen ist Lukas' Entscheid.
- **G4-04 Rest** (Verweis unter «Nur für Lehrpersonen») · Karte Keramikbrennofen verlinkt das Thema schon (ZUORDNUNG).
- **G4-07** (Titel «Metall beizen und brünieren», Einleitung «beizen») · Titel sind Suchwörter (r8 T15), «Material: Metall» steht in der Kopfzeile.
- **G4-13** (Hinweis Wasserstoff-Lötstation) · Zusatzinfo ohne Nutzen für Einsteigende.
- **G4-14 Rest, G4-18 Rest** (Warum für rostfreie Stähle, Acetylen-Beleg) · Quelle nennt keinen eigenen Grund, Suva 66122 steht in der Quellenzeile.
- **G4-20** (Doppelungen Toluol, Flusssäure) · Themen öffnen einzeln im Fenster, laut Befund selbst vertretbar.
- **G5-05** (Montageschaum aus der Spalte) · trifft nicht zu: Spalte ist Kurzform der Warnpunkte, das Thema nennt die Ausnahme.
- **G5-10** (Heissgeräte in Textil unter Umformen) · Lukas hat C4 der ersten Runde so entschieden (Verbinden: Nähmaschine, Heissgeräte).
- **G5-15** (Bleiruten, Altmetall) · Konkretisierung von «bleihaltige Materialien», keine neue Regel. Matrix-Kurzform bleibt.
- **G5-18** (Mutterschafts-Verweis in der Ampel) · Zusatzzeile, Ampel bleibt knapp.
- **G6-06** (Bewusstlosigkeit, Wiederbelebung) · allgemeine Erste Hilfe, gehört in den Kurs, «im Notfall öffnet niemand diese Seite».
- **G6-12** (Universalräume) · nicht prüfbar, Quelle angegeben, kein belegter Widerspruch.
- **G6-13** (Lehrplan-Folgerung als Hinweis markieren) · als Einordnung lesbar, bfu-Beleg steht unter Lagerung.
- **G6-14** (Lehrplan-Kennungen und Einzellinks) · Codes ungeprüft, Übersichtslink funktioniert.
- **G6-19 Rest, G6-20 Rest** (Klasse vor Stoffeinsatz informieren, Tox-Nummer nicht dringend, 145 bei Hautkontakt, homöopathische Mittel) · steht sinngemäss unter Sicher unterrichten bzw. Vollständigkeit.
- **G7-13** (80 m², 12 bis 14 Schülerinnen und Schüler, 500 Lux, Böden) · Lukas hat Raumgrössen, Lux und Böden in Version 31 gestrichen.
- **G7-15** (Schweissen nahe brennbarer Flüssigkeiten umformulieren) · bewusste Wiederholung Brandschutz.
- **G7-16** (Zuständigkeiten und Reinigung im Fachraum) · Zuständigkeiten stehen im Register Recht, Reinigung beim Thema Staub.
- **G7-19** (Textilräume sinngemäss) · Zusatzhinweis ohne Quelle.
- **G7-20 Rest** (Regale nach Lagerung, Vermerk Suva 44100) · Umbau ohne Nutzen.
- **G8-04** (Krankenversicherung zahlt zuerst) · Quelle fehlt.
- **G8-05** (Weiterbildung als Pflicht nach VUV Art. 8) · eigene Auslegung, laut Befund offen.
- **G8-14** (EKAS-Zeile) · trifft weitgehend nicht zu, Pflichtgrundlage VUV Art. 11a steht in der Spalte.
- **G8-17** (Finanzierung PH-FHNW-Kurs) · stimmt im Kern.
- **G9-11** (Klasse-1-Laser mit Klasse-4-Quelle) · nicht aus den Quellen der Seite.
- **G9-13** (EUH-Sätze) · Zusatzinfo.
- **G9-18** (Komma in H201) · r8 D, unverifiziert.

---

## C-Fragen einzeln

1. Soll das Thema Lasercutten beide Quellen offen nennen (bfu: nur Lehrpersonen, chemsuisse: unter Aufsicht, massgebend der Kanton)? Empfehlung ja.
2. Darf ich die Haftungsaussagen präzisieren (widerrechtlicher Schaden, ArG nur Gesundheitsschutz, Fahrlässigkeit, Obhutspflicht-Herkunft, Glossar Schulträger mit Rückgriff)? Empfehlung ja, ohne Krankenversicherungssatz.
3. Sollen Mitwirkungspflicht der Lehrpersonen, Aufräumen alter Bestände und Aufbewahren der Sicherheitsdatenblätter als Pflicht erscheinen? Empfehlung ja.
4. Soll «bei Schulhäusern alle 5 Jahre» bleiben und einen geprüften NIV-Verweis bekommen? Empfehlung ja.
5. Soll Gelb «hautsensibilisierend» statt «reizend» heissen und ein Satz die Produkte mit anderen Piktogrammen abdecken? Empfehlung ja, ohne neue H-Sätze.
6. Soll Entsorgung zwei kurze Punkte zu Sammelbehältern und Abholung bekommen? Empfehlung ja, ohne Gruppen A bis D.

Gesamteindruck: 30 A, 85 B, 14 C (6 Fragen), 37 D. Übersehen hat die Kette: (A) VERBOTE- und INSTR-Präfixe in bau.py müssen bei B14, B17, B18, B30, B32, A9, A10 mitgezogen werden, sonst verschwinden Warnpunkte still. (B) Nach B43 und B72 prüfen, dass die neuen H-Satz-Popups im Build erscheinen (Block `h-saetze` wird nur über data-b angesprochen). (B) THEMA_KERN Lasercutten hängt an C1.
