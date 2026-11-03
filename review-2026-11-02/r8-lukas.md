# R8 Entscheid «Lukas» über R1 bis R7 (2026-11-02)

Grundlage: r1 bis r7, kontext.md, Memory «sicherheit-im-gestalten-seite», «sensible-formulierungen», «ttg-fachbegriffe», gezielte Prüfung in inhalt.html (Zeilennummern = inhalt.html), bau/bau.py und bau/stil.css.

Arbeitsregel für alle Aufträge: Inhalte nur in inhalt.html ändern (Matrix-Daten, KERN, KURZ, VERBOTEN in bau/bau.py), danach `python3 bau/bau.py` und `bau/pruefe.py`. Bei umbenannten Titeln die bisherige `id` beibehalten, damit Links nicht brechen.

Zählung: 25 A · 28 B · 8 C · 36 D (Cluster, Original-IDs je Eintrag). C-Anteil rund 8 %, die Vorsortierung war brauchbar.

---

## A · ohne Rückfrage umsetzen

**A1 · Warum wiederholt die Regel** (R1-01, S07, S08, S09)
- Z. 387: «Keine mechanische Bearbeitung von Kunststoffen mit Carbonfasern, weil dabei lungengängige Carbonpartikel entstehen können.» → «Keine mechanische Bearbeitung von Kunststoffen mit Carbonfasern.» (Warum-Span bleibt)
- Z. 432: «Acrylglas: Kanten nicht mit dem Brenner abflammen, dabei entstehen schädliche Dämpfe und Rauch.» → «Acrylglas: Kanten nicht mit dem Brenner abflammen.» (Warum bleibt)
- Z. 710: «… mit Filtermatten versprühen, es besteht Brandgefahr.» → «… mit Filtermatten versprühen.» Warum: «… kann sich selbst entzünden, an Filtermatten besteht deshalb Brandgefahr» → «… kann sich in den Filtermatten selbst entzünden»

**A2 · «krebserzeugend» einheitlich** (R1-07 Begriffsteil, S17)
- Z. 177: «gilt als krebserregend» → «gilt als krebserzeugend»
- Z. 958 (GHS08-Legende): «Gesundheitsgefahr: krebserregend, …» → «Gesundheitsgefahr: krebserzeugend, …»
- Z. 1195: «erbgutverändernd, krebserregend, fortpflanzungsgefährdend» → «erbgutverändernd, krebserzeugend, fortpflanzungsgefährdend»

**A3 · Schülerinnen und Schüler statt «Lernende», «Kinder»** (S06, K10, S16)
- Z. 304: «hält Lärm von den Lernenden fern» → «hält Lärm von den Schülerinnen und Schülern fern»
- Z. 818: «informiert Hausdienst, Lehrpersonen und Lernende» → «informiert Hausdienst, Lehrpersonen sowie Schülerinnen und Schüler»
- Z. 890: «hält Staub und Lärm von den Lernenden fern» → «hält Staub und Lärm von den Schülerinnen und Schülern fern»
- Z. 1204 (Aargau): «Räume für 16 Lernende» → «Räume für 16 Schülerinnen und Schüler»
- Z. 1207 (Bern): «dass Lehrpersonen und Lernende über Erste Hilfe» → «dass Lehrpersonen sowie Schülerinnen und Schüler über Erste Hilfe»
- Z. 1186: «Verhalten der Kinder» → «Verhalten der Schülerinnen und Schüler»
- Z. 575: «Für jüngere Kinder gibt es Niedertemperatur-Schmelzkleber.» → «Für jüngere Schülerinnen und Schüler gibt es Niedertemperatur-Schmelzkleber.»
- Z. 793 bleibt (bfu-Zitat «für die Lernenden»).

**A4 · Fachraum statt Werkstatt, Werkraum** (K11)
- Z. 409: «beim Verlassen der Werkstatt abgelegt wird» → «beim Verlassen des Fachraums abgelegt wird»
- Z. 929: «im Werkraum etwa bei Holzstaub» → «im Fachraum etwa bei Holzstaub»

**A5 · Ein Stoffname** (R1-14)
- Z. 647: «Gummikleber mit Trichlorethylen» → «Gummikleber mit Trichlorethen (Trichlorethylen)», im Warum: «Chloroform und Trichlorethylen gelten als krebserzeugend» → «Chloroform und Trichlorethen gelten als krebserzeugend». Z. 720 bleibt.

**A6 · «Gesetz»-Marke läuft in den nächsten Satz** (S24)
- Z. 876: nach `<span class="ges">Gesetz: NIV Art. 36</span>` das `</li>` schliessen und «Defekte Maschinen rechtzeitig erkennen, kennzeichnen und entfernen oder reparieren.» als eigenes `<li>`.
- Z. 897: nach `<span class="ges">Gesetz: NIN, bei neuen Installationen</span>` ebenso trennen, «Die Stromversorgung der Maschinen über einen zentralen Schlüsselschalter …» als eigenes `<li>`.

**A7 · Glossar FI-Schutzschalter, belegter Fehler** (K24 Teil 2)
- Z. 1032: «die bfu prüft ihn in Checkliste 1» → «Checkliste 1 der bfu fragt nach ihm»

**A8 · Abbeizen, doppelter Doppelpunkt** (S19)
- Z. 735: «Warum: Diese Inhaltsstoffe sind besonders gefährlich: Flusssäure ist …» → «Warum: Flusssäure ist …»

**A9 · Gasflaschen, unklares Subjekt** (S20)
- Z. 627: «Gasflaschen und Druckreduzierstationen bedienen Lehrpersonen oder es geschieht unter ihrer Aufsicht.» → «Gasflaschen und Druckreduzierstationen bedienen Lehrpersonen selbst oder Schülerinnen und Schüler unter ihrer Aufsicht.»

**A10 · Lasercutten, «Was gilt:»** (S21, K16 Teil)
- Z. 454: «Was gilt: Schülerinnen und Schüler bedienen den Lasercutter nur unter Aufsicht einer Lehrperson. Auf dem Plakat 4.301 fehlt er. Massgebend ist zudem die Vorgabe des Kantons.» → «Schülerinnen und Schüler bedienen den Lasercutter nur unter Aufsicht einer Lehrperson. Das bfu-Plakat 4.301 führt ihn nicht auf. Massgebend ist zudem die Vorgabe des Kantons.»

**A11 · Satz ohne Subjekt** (S22, K16 Teil)
- Z. 267: «Dürfen sichtbar und griffbereit bleiben.» → «Sie dürfen sichtbar und griffbereit bleiben.»

**A12 · «Belastung» statt «Exposition»** (S18)
- Z. 586: «bei richtiger Materialwahl und kurzer Exposition reicht» → «… und kurzer Belastung reicht»
- Z. 599: «kurzer Exposition genügt» → «kurzer Belastung genügt»
- Z. 1085: «wiederholte Expositionen häufig Auslöser» → «wiederholter Kontakt häufig Auslöser»
- Z. 1133: «zu den höchsten Expositionen gegenüber gefährlichen Stoffen» → «zu den höchsten Belastungen mit gefährlichen Stoffen»
- Z. 1165 (H372, amtlicher Wortlaut) bleibt.

**A13 · Rhythmus aus der Tabelle auch am Ort** (R1-17, K23)
- Z. 876: «… durch ein unabhängiges Kontrollorgan.» → «… durch ein unabhängiges Kontrollorgan, bei Schulhäusern alle 5 Jahre.»
- Z. 827: «Ein Notfallblatt mit Ansprechpersonen und Notfallnummern, gut sichtbar aufgehängt.» → «… gut sichtbar aufgehängt und halbjährlich überprüft.» (beides belegt in Z. 920, 921)

**A14 · Linktext Ständerbohrmaschine** (K22, T18 Teil)
- Z. 224: «Siehe Bohrmaschine, Schweissen.» → «Siehe Ständerbohrmaschine, Schweissen.»
- Z. 249: «Siehe Kleben, Bohrmaschine.» → «Siehe Kleben, Ständerbohrmaschine.»

**A15 · Schweissen, Doppelung im selben Punkt** (R1-08 Teil)
- Z. 615: Satz «Auch andere Personen im Gefahrenbereich brauchen Augenschutz.» streichen (Z. 616 «Stellwände oder Vorhänge schützen Umstehende» bleibt).

**A16 · Aargau ergänzen, Quelle steht schon da** (R1-03 Teil)
- Z. 1185: «z. B. Bern LAV Art. 52 bis 60, Luzern VBG § 24.» → «z. B. Bern LAV Art. 52 bis 60, Aargau GAL § 25, Luzern VBG § 24.» (Quelle GAL Aargau in Z. 1188, Wortlaut wie Glossar Z. 1097)

**A17 · «2K» erklären** (S03)
- Z. 708: «Keine isocyanathaltigen Polyurethanlacke (2K)» → «Keine isocyanathaltigen Zweikomponenten-Polyurethanlacke (2K)»
- bau.py VERBOTEN 'alle': «2K-Polyurethanlacke» → «Zweikomponenten-Polyurethanlacke (2K)»

**A18 · Matrix «galvanisiert»** (S04 Matrixteil)
- bau.py VERBOTEN 'metall': «Rostfreie und galvanisierte Stähle schweissen» → «Rostfreie und galvanisch beschichtete Stähle schweissen»

**A19 · Emissionen, falsche Verweise** (K14)
- Z. 303: «Siehe Hartlöten, Glasieren und Brennen und Gasflaschen und Gasanlagen.» → «Siehe Heissgeräte, Hartlöten, Schweissen, Glasieren und Brennen, Gasflaschen und Gasanlagen und Räume.» (Links auf die bestehenden Anker)

**A20 · Quellenzeilen nach Schema** (K18 Teil)
- Z. 400: «(chemsuisse, S. V, S. 6, 15)» → «(chemsuisse, S. V, 6, 15)»
- Z. 654: «chemsuisse, S. 22, 23, 16» → «chemsuisse, S. 16, 22, 23»
- Z. 1176: «bfu-Rechtsfrage» → «bfu Rechtsfrage»

**A21 · «drei Dinge»** (S11 Teil)
- Z. 128: «desto wichtiger sind drei Dinge:» → «desto wichtiger sind drei Punkte:»

**A22 · griffbereit statt greifbar** (R1-12, S23 Teil)
- Z. 1271: «sichtbar und greifbar sein» → «sichtbar und griffbereit sein»

**A23 · Leere Matrixfelder** (D4)
- bau.py Z. 292: `'<span class="mx-leer" aria-label="kein Thema">·</span>'` → `'<span class="mx-leer"><span class="sr">kein Thema</span></span>'` (bzw. die vorhandene Klasse für Screenreader-Text), sichtbarer Mittelpunkt entfällt.

**A24 · Kursiv nur bei «Alle Materialien»** (D6 Teil)
- stil.css Z. 442: `.mx tr.z-alle th{font-weight:400;font-style:italic}` → `.mx tr.z-alle th{font-weight:400}`

**A25 · Tippziele Matrix auf dem Handy** (D9)
- stil.css nach Z. 443 ergänzen: `@media (max-width:700px){.mchip{min-height:2.5rem;display:flex;align-items:center}}`

---

## B · umsetzen und Lukas in einer Zeile melden

**B1 · Mutterschutz am Arbeitsplatz festmachen** (S01, T08) · Melderegel «sensible-formulierungen» verlangt das ausdrücklich, Rechtsinhalt unverändert.
- Z. 1194: «Schwangere und stillende Lehrpersonen» → «Mutterschutz am Arbeitsplatz»
- Z. 1195, Satz 2 und 3: «Schwangere und Stillende dürfen damit nur arbeiten, wenn eine Risikobeurteilung zeigt, dass keine Belastung besteht oder Schutzmassnahmen sie ausschalten. Die Risikobeurteilung veranlasst der Arbeitgeber vorsorglich durch eine fachkundige Person, unabhängig von einer konkreten Schwangerschaft, und informiert die Lehrpersonen.» → «Für Arbeitsplätze, an denen solche Stoffe vorkommen, veranlasst der Arbeitgeber vorsorglich eine Risikobeurteilung durch eine fachkundige Person, unabhängig von einer konkreten Schwangerschaft, und informiert die Lehrpersonen. Sie zeigt, ob eine Belastung besteht und mit welchen Schutzmassnahmen sie ausgeschlossen wird. Erst dann ist die Arbeit dort auch während Schwangerschaft und Stillzeit zulässig.»
- bau.py KERN: Schlüssel «Schwangere und stillende Lehrpersonen» → «Mutterschutz am Arbeitsplatz», Wert → «Arbeitsplätze mit bestimmten Stoffen vorsorglich beurteilen»

**B2 · «zum Arzt» geschlechtsneutral** (S05)
- Z. 650: «Bei Augenkontakt zum Arzt.» → «Bei Augenkontakt ärztlich untersuchen lassen.»
- Z. 725: «muss zum Arzt» → «muss ärztlich untersucht werden»
- Z. 851: «Danach zum Arzt, bei Laugen in jedem Fall.» → «Danach ärztlich untersuchen lassen, bei Laugen in jedem Fall.»
- Z. 853: «keine Neutralisationsversuche, Arzt. Bei anderen Stoffen nur nach Anweisung von Arzt oder Tox Info Suisse handeln.» → «keine Neutralisationsversuche, dann ärztlich abklären lassen. Bei anderen Stoffen nur nach ärztlicher Anweisung oder nach Anweisung von Tox Info Suisse handeln.»
- Z. 1079: «und einen Arzt kontaktieren» → «und ärztlichen Rat einholen»

**B3 · Ein Begriff für A, B, C: «Kategorie»** (T19, K09) · bfu-Plakat und Seite sagen «Gefahrenkategorien» (Z. 309, 1271, bau.py Z. 350), Lukas hat «Gruppe» aus der Legende entfernt.
- Z. 137: «Gruppe A, B oder C im eigenen Zyklus nachsehen» → «Kategorie A, B oder C im eigenen Zyklus nachsehen»
- Z. 151: «bei den Gruppen A, B, C» → «bei den Kategorien A, B, C»
- Z. 158: «An Maschinen der Gruppe B» → «An Maschinen der Kategorie B»
- Kantone Bern («Gefahrengruppen der bfu», Wiedergabe des Merkblatts) bleibt.

**B4 · Zyklus in Klassen** (T03 Teil) · in die bestehende Legende unter dem Plakat, keine Änderung an Spaltenköpfen oder Plakattitel.
- Legende (app.js/bau.py `#p-legende`) am Schluss ergänzen: «Zyklus 1: Kindergarten bis 2. Klasse, Zyklus 2: 3. bis 6. Klasse, Zyklus 3: 7. bis 9. Klasse.»

**B5 · Drei Kernpunkte parallel** (T25, S11 Teil)
- Z. 131: «Instruktion und Klassenführung so organisieren, dass die Klasse Selbstverantwortung übernehmen kann» → «Instruieren und begleiten, bis die Klasse Selbstverantwortung übernehmen kann»
- Z. 132: «Klare Ordnung und Grundregeln im Fachraum» → «Klare Ordnung und Grundregeln im Fachraum festlegen»

**B6 · Grundlage, Satz zu Warnpunkt und «Gesetz»** (S10)
- Z. 117: «markiert: Ein Warnpunkt steht, wo die Quellen etwas an Schulen ausschliessen, «Gesetz» bei ausgewählten gesetzlichen Pflichten, nicht vollständig.» → «markiert: Ein Warnpunkt zeigt, was die Quellen an Schulen ausschliessen. «Gesetz» kennzeichnet ausgewählte gesetzliche Pflichten, nicht alle.»

**B7 · «Unbefugt» ohne Personengruppe** (S15)
- Z. 795: «Unbefugt sind neben den Schülerinnen und Schülern alle ohne die nötigen Fachkenntnisse.» → «Zugang haben nur Personen mit den nötigen Fachkenntnissen, Schülerinnen und Schüler nicht.»

**B8 · feuerhemmend** (K21)
- Z. 796: «in einem feuerfesten, abschliessbaren Schrank» → «in einem feuerhemmenden, abschliessbaren Schrank» (wie Z. 806)

**B9 · Fachraumordnung und Zutritt nicht doppelt** (R1-11) · Unterricht behält das Handeln in der Lektion, Fachraum den Betrieb (Lukas' Gruppierung nach «wann»).
- Z. 867: «Eine Fachraumordnung mit Bekleidungs- und Verhaltensregeln. Ihre Einhaltung wird thematisiert und eingefordert.» → «Eine Fachraumordnung mit Bekleidungs- und Verhaltensregeln.»
- Z. 869: «Bei Mehrfachnutzung empfiehlt die bfu ein Zutrittsmanagement, z. B. Zutritt erst nach der Einweisung in Fachraum und Maschinen.» → «Bei Mehrfachnutzung empfiehlt die bfu ein Zutrittsmanagement.» (Z. 157 bleibt)

**B10 · Schweissen, Brennbares zweimal im selben Thema** (R1-09) · Quellenangaben unverändert übernehmen, keine neue Seitenzahl zuordnen.
- Z. 614 → «In der Umgebung keine brennbaren Flüssigkeiten oder Materialien, genügend Löschgeräte bereithalten und nach der Arbeit auf Schwelbrände kontrollieren. Zu Gasflaschen und Flammenrückschlagventilen siehe Gasflaschen und Gasanlagen. Warum: Funken und Flammen sind Zündquellen (chemsuisse, S. 37). Funken und Schlacke fliegen weit und können unbemerkt weiterglimmen.»
- Z. 617 streichen.

**B11 · Glossar Flammenrückschlagventil** (R1-04 Teil)
- Z. 1046: «chemsuisse verlangt mindestens drei Funktionen: Gasrücktrittventil, Flammensperre und Nachströmsperre.» → «Welche Funktionen es braucht, steht bei Gasflaschen und Gasanlagen.» (Regel bleibt in Z. 633)

**B12 · Atemschutz gegen Dämpfe** (K13) · belegt im Glossar FFP (Z. 980) und Z. 709.
- Z. 238: «Welche Maske, steht bei Staub.» → «Welche Maske gegen Staub, steht bei Staub. Gegen Lösungsmitteldämpfe schützen FFP-Masken nicht, dafür braucht es einen Aktivkohlefilter (Typ A).»

**B13 · Stoffe auswählen ↔ Lagerung** (N5)
- unter «Ersatz prüfen, sonst schützen» (Z. 269 ff.) als letzten Punkt: «Gekennzeichnete Produkte abgeschlossen lagern, siehe Lagerung.»
- Z. 793 am Ende: «Ob ein Produkt eingesetzt werden darf, steht unter Stoffe auswählen.»

**B14 · Recht ↔ Was festhalten, Notfälle ↔ Warten** (N6, N7)
- Z. 1180: «Es hilft, wenn die Schule das belegen kann.» → «Es hilft, wenn die Schule das belegen kann, siehe Was festhalten.» (Anker für «Was festhalten» vergeben)
- Anker `id="maschinen-warten"` und `id="checklisten"` an die beiden Zeilen im Fachraum. Keine weiteren neuen Sätze.

**B15 · Praktikum ↔ Kantone** (N14)
- Z. 162: «welche Maschinen sie einführen und beaufsichtigen dürfen.» → «welche Maschinen sie einführen und beaufsichtigen dürfen und welche Vorgaben des Kantons gelten, siehe Kantone.»

**B16 · Schulleitungs-Überblick erreichbar** (N9 Teil)
- Z. 1173: «Die Schule bezeichnet eine Chemikalien-Ansprechperson.» → «… Chemikalien-Ansprechperson. Siehe Überblick für Schulleitungen.» (Randkasten Grundlage bleibt unverändert)

**B17 · Brennofen im Fachraum auffindbar** (N13) · nur Verweis, keine neue Regel.
- Zeile «Räume» (nach Z. 890) als letzten Punkt: «Zum Aufstellen des Keramikbrennofens siehe Glasieren und Brennen.»

**B18 · Kernaussagen, die nur Unterzeilen aufzählen oder irreführen** (T06, T07, T09, T24) · bau.py KERN
- «Brennbare Flüssigkeiten, Säuren, Gas»: «Höchstmengen, getrennt lagern» → «höchstens 100 Liter pro Fachraum, Säuren und Laugen getrennt» (Z. 806)
- «Entsorgung»: «nie in Kehricht oder Abwasser» → «gefährliche Chemikalien als Sonderabfall, nie in Kehricht oder Abwasser» (Z. 815). Z. 820: «steht beim jeweiligen Thema, z. B. Leinöl.» → «steht beim jeweiligen Thema, z. B. Leinöl, Glasieren und Brennen.»
- «Sicher unterrichten»: «Fachkompetenz, Instruktion, Aufsicht, so sieht es konkret aus, was festhalten» → «Lehrperson wählt Maschinen, führt ein, beaufsichtigt und hält fest»
- «Vom Produktions- zum Erschliessungshandeln»: «was sich mit dem Lehrplan 21 ändert» → «selbstständiger Arbeiten verändert Raum und Aufsicht»

**B19 · Heissgeräte** (T17, R4-16)
- Z. 572: `<h3>Heissgeräte</h3>` → «Heissgeräte: Heissleimpistole, Lötkolben, Heissluftföhn, Bügeleisen» (id beibehalten), bau.py KURZ ergänzen: `'Heissgeräte: Heissleimpistole, Lötkolben, Heissluftföhn, Bügeleisen': 'Heissgeräte'`
- Matrix: Thema zusätzlich im Feld Alle Materialien × Umformen (Heissluftföhn steht auf dem Plakat unter Umformen).

**B20 · Matrix-Kurztitel mit Suchwort** (T14 Teil)
- bau.py KURZ: `'Lösungsmittel, Verdünner, Pinselreiniger': 'Lösungsmittel'` → `'Lösungsmittel, Verdünner'`

**B21 · Spalte «Nicht verwenden», zwei Kurzformen an Thema angleichen** (R1-10 Holz, N19)
- VERBOTEN 'holz': «Holzschutzmittel mit Bioziden» → «Holzschutzmittel (innen generell)» (Z. 708)
- VERBOTEN 'kunststoff': «PVC, Teflon, Polyurethan lasern» → «PVC, Teflon, Polyurethan, bromierte Kunststoffe lasern» (Z. 459)

**B22 · Abkürzungen beim ersten Vorkommen ausschreiben** (S02) · nur Bundeserlasse und Organisationen, kantonale Erlasstitel nur, wenn am verlinkten Erlass geprüft.
- NIV → «Niederspannungs-Installationsverordnung (NIV)», NIN → «Niederspannungs-Installationsnorm (NIN)», VUV → «Verordnung über die Unfallverhütung (VUV)», ChemRRV → «Chemikalien-Risikoreduktions-Verordnung (ChemRRV)», ArG → «Arbeitsgesetz (ArG)», ChemG → «Chemikaliengesetz (ChemG)», ChemV → «Chemikalienverordnung (ChemV)», StGB → «Strafgesetzbuch (StGB)», OR → «Obligationenrecht (OR)», LCH → «Dachverband Lehrerinnen und Lehrer Schweiz (LCH)», je beim ersten Vorkommen pro Register.

**B23 · Verständlichere Sätze, Inhalt gleich** (S13, S14, S23 Teil, S25 Teil, S04 Text)
- S13 (Recht, «Warum Gesetze offen formuliert sind»): Schachtelsatz in drei Sätze teilen wie in r5 S13, Artikel und Inhalt unverändert.
- S14: zweites «Voraussetzung» ersetzen wie in r5 S14.
- S23 Z. 450: «nennt der Lehrplan Geräte, in Zyklus 3 ausdrücklich als Beispiele» → «nennt der Lehrplan in Klammern Werkzeuge und Geräte, in Zyklus 3 mit «z. B.» ausdrücklich als Beispiele»
- S25 Z. 401: «Industriesauger der Staubklasse H oder M.» → «Industriesauger der Staubklasse M oder H (für mittel bzw. hoch gefährliche Stäube).»
- S04 Schweissen: «rostfreien Stählen (Cr-/Ni-Stähle)» → «rostfreien Stählen (Chrom-Nickel-Stähle)», «Galvaniküberzügen» → «galvanischen Überzügen»

**B24 · Kennzeichnung eigener Inhalte vereinheitlichen** (K17)
- Z. 141 «Eigene Gliederung:», Z. 1176 «Eigene Übersicht nach …», Z. 1182 «Einordnung dieser Seite, gestützt auf:», Z. 925 «Zusammenstellung dieser Seite aus:», Z. 306 «Zusammenfassung der verlinkten Themen ·» → jeweils «Zusammenstellung dieser Seite, gestützt auf: …». «Hinweis dieser Seite» und «Eigene Darstellung nach …» bleiben.

**B25 · Quellenliste einheitlich** (K25)
- Einträge nach Z. 1282 (Merkblatt Bern, Lehrplan 21, Technik und Design usw.) ins Format «Herausgeber (Jahr): Titel. Reihe, Umfang.» bringen, nur mit Angaben, die am Dokument stehen.

**B26 · Toten Code entfernen** (N17, N21) · Instruktionsliste hat Lukas als «krud» entfernt, Zyklus-Knöpfe gibt es nicht.
- app.js: Block um `$('#instr-liste')` (Z. 28 ff.) und `$$('.z-hl button')` (Z. 145 ff.) entfernen, `#instr-liste` in Z. 293 aus dem Selektor nehmen. Sichtbar ändert sich nichts.

**B27 · Darstellung Matrix** (D2, D5, N20)
- D2: Panel `#matrix` von `.text.breit` auf die Breite des Plakats (72rem), Text unter der Matrix bleibt schmal.
- D5: bau.py Ecke `Material ↓ · Verfahren →` → leere Zelle mit Screenreader-Text «Material und Verfahren».
- N20: Tabellenzeile Z. 352 «Dekupiersäge» als Suchsynonym «Decoupiersäge» hinterlegen (unsichtbar, z. B. `data-such`), Anzeige unverändert.

**B28 · Linktexte der drei Fragen** (K03) · nach Entscheid C8, bei «nein» mit den heutigen Registernamen.
- Z. 137: Link «Plakat» → «Maschinen (Plakat)»
- Z. 138: Link «Material» → «Verfahren und Material»

---

## C · Lukas vorher fragen

**C1 · Recht und Zuständigkeiten straffen** (R1-02, T01, T02, T20, K05, K24 Teil 1, R1-04 Sonderabfall)
Befund trifft zu: Ansprechperson, Schulträger-Haftung und «keine Arbeitnehmenden» stehen drei- bis viermal, «Rechtlicher Rahmen» zeigt eigentlich die Zuständigkeiten, Entsorgung nennt «Sicherheitsbeauftragte» statt der rechtlich geforderten Chemikalien-Ansprechperson (Z. 818, 1103 vs. 938), Glossar Schulträger «haftet in der Regel zuerst sie» (Z. 1109) weicht von «Haftung» ab.
Frage: Darf ich im Register Recht die Karten auf je einen Satz kürzen, die Titel klären («Wer wofür zuständig ist», «Pflichten und Empfehlungen») und bei Entsorgung und Glossar «Chemikalien-Ansprechperson» statt «Sicherheitsbeauftragte» schreiben?
Empfehlung: ja. Rechtsinhalt bleibt, nur Doppelungen und Begriffe.

**C2 · Plakat vernetzen** (N1, N2, N3)
Befund trifft zu: Maschinenkarten verlinken nur Material-Themen (Bandschleifmaschine nur «Staub»), vom Plakat führt kein Weg zu Kantonen mit eigenen Listen (LU, ZH), Legende A «selbstständig» lässt sich als «ohne Lehrperson» lesen.
Frage: Soll unter der Plakat-Legende ein Satz stehen «Einige Kantone haben eigene Maschinenlisten (Luzern, Zürich), massgebend ist die Vorgabe des Kantons, siehe Kantone»?
Empfehlung: ja, nur dieser Satz. Feste Linkzeile auf jeder Karte (N1) und Zusatz zur Obhutspflicht bei A (N3) nein, das sind neue Elemente und Hinweise, die du eben vom Plakat entfernt hast.

**C3 · «verboten» nur mit Rechtsgrundlage** (K02, K16 Kleben)
Befund trifft zu: «Verboten sind Beizmittel mit Flusssäure …» (Z. 735), «Ätzmittel mit Flusssäure … sind verboten» (Z. 763), «Improvisierte Anschlüsse … sind verboten» (Z. 626, Suva) stehen ohne «Gesetz», während «Gesetz» sonst Pflicht markiert. Ob Flusssäure-Produkte unter die ChemRRV fallen, kann ich nicht prüfen.
Frage: Soll ich «verboten» ohne «Gesetz»-Marke durch «Nicht verwenden: …» ersetzen (Abbeizen, Emaillieren, Gasflaschen)?
Empfehlung: ja, ausser du weisst, dass das Flusssäure-Verbot gesetzlich ist, dann dort «Gesetz» ergänzen.

**C4 · Textil und Papier in der Matrix nicht leer lassen** (R4-02, R4-05, R4-07, R4-17, N12)
Befund trifft zu: Zeile Textil zeigt nur Lasercutten, obwohl Nähmaschine, Stickcomputer, Overlock (Plakat) und Bügeleisen (Heissgeräte) auf der Seite stehen. Keramik × Umformen leer, Brennofen nicht auffindbar. Papier hat keine Zeile.
Frage: Darf ich in der Zeile Textil vorhandene Themen und Plakat-Maschinen eintragen (Verbinden: Nähmaschine, Heissgeräte · Oberfläche: Stickcomputer, Overlock) und bei Keramik × Umformen «Glasieren und Brennen» verlinken?
Empfehlung: ja, ohne neue Regeln und ohne neue Zeile Papier.

**C5 · Elektrizität und andere Lücken benennen** (R4-01, R4-06, N15, R4-03, R4-04, R4-09)
Befund trifft zu: LP21 TTG.2.B.1 verlangt Sicherheitsregeln zu Haushalt- und Schwachstrom, die Seite hat dazu nichts, «Elektronik» findet die Suche nicht. Handwerkzeuge, Gips, Wachs fehlen ebenfalls. Keine Quelle der Seite belegt Regeln dazu.
Frage: Soll unter «Was der Lehrplan 21 verlangt» ein Satz stehen, dass der Lehrplan Sicherheitsregeln zu Strom und Batterie verlangt, die Quellen dieser Seite aber keine eigenen Regeln dazu enthalten?
Empfehlung: ja, nur dieser Satz plus bei Weichlöten «Material: Metall, auch Lötstellen in der Elektronik». Keine eigenen Regeln zu Batterien, Gips, Wachs, Handwerkzeugen, solange keine Quelle vorliegt.

**C6 · Kernaussage je Thema statt «Metall · 1 Warnpunkt»** (T05)
Befund trifft zu: Bei allen 23 Themen ist die Kernaussage nur Material und Zähler, in Recht, Fachraum, Unterricht sind es echte Aussagen.
Frage: Sollen die 23 Themenzeilen eine kurze Kernaussage aus den Warnpunkten bekommen (z. B. «Weichlöten: nur bleifreies Lot, Rauch absaugen»), Material und Zähler dahinter?
Empfehlung: ja, zuerst an drei Themen zur Ansicht.

**C7 · Matrix auf dem Handy als Liste** (D1)
Befund trifft zu: Auf 375 px sieht man eineinhalb Verfahren, die Spalte «Nicht verwenden» bestimmt die Zeilenhöhe.
Frage: Soll die Matrix unter etwa 700 px als Liste je Material erscheinen (Material als Kopf, darunter je Verfahren die Themen, «Nicht verwenden» grau am Schluss)?
Empfehlung: ja, gleiche Daten, Desktop unverändert. Als Variante zum Ansehen bauen.

**C8 · Register umbenennen** (T04, T21, K03 Teil)
Vorschläge: «Maschinen» → «Maschinen nach Zyklus», «Verfahren und Material» → «Material und Verfahren», «Recht» → «Recht und Zuständigkeit».
Frage: Sollen die Registernamen so bleiben, wie du sie heute gesetzt hast?
Empfehlung: ja, bleiben. Der Nutzen ist klein, die Gruppierung nach «wann» ist frisch entschieden. Linktexte der drei Fragen werden in jedem Fall angeglichen (B28).

---

## D · verwerfen

- **R1-04 Rest** (Glossar FFP, Laserklasse, CE, Aerosol, Aspiration kürzen) · Popup erscheint am Ort des Handelns, dort ist die Wiederholung nützlich. Sonderabfall in C1.
- **R1-05, R1-06** (Emissionen und Lärm als reine Wegweiser) · Emissionen ist bewusst als Zusammenfassung der Themen angelegt (Quellenzeile Z. 306), Kacheln von Lukas gewählt. Nur Linkfehler in A19.
- **R1-08 Z. 395** (Schutzstufen in Schutzmassnahmen kürzen) · Übersicht Schutzausrüstung braucht die Stufen, Verlust am Ort.
- **R1-10 Keramik, Blei, Arsen** · Kurzform «für Geschirr» folgt Z. 293 und verlinkt auf Keramik-Eigenes, Blei verlinkt auf `mat-metall`. Trifft nicht zu. Kurzform darf kürzer sein.
- **R1-13, K15, S12, K06** (Fussnote Hartlöt- und Schweissanlagen umschreiben, «geschult» ergänzen, «reicht» statt «genügt») · Fussnote gibt bfu-Plakat wieder, Thema ergänzt bereits. Kein Widerspruch. K15 Verweis trifft nicht zu: Lagerung nennt Propan und Gaskartuschen (Z. 800, 809).
- **R1-15** (bfu-Zitat in Staub ersetzen) · Ersatzsatz enthält unbelegte Einschränkung.
- **R1-16** (Fusszeile kürzen) · Haftungstext nur auf Lukas' Initiative, Doppelung harmlos.
- **T10, K04** («Für jeden Fachraum» umbenennen oder verschieben) · Lukas hat den Abschnitt bei der Gruppierung nach «wann» bewusst ins Register Unterricht gesetzt.
- **T11** (Matrix-Untertitel «Ein Feld öffnet das Thema») · Erklärtext zur Bedienung, bewusst nicht.
- **T12** (Spaltenkopf «Ausgeschlossen») · Spaltenname von Lukas heute gesetzt.
- **T13, K12, R4-14** (Zeile «Keramik, Glas, Stein», Speckstein, Gips) · Lukas: «Keramik» statt «Keramik, Glas, Stein», Speckstein raus.
- **T15, T16, T18 Rest, T22** (Thementitel und Fachraum-Zeilentitel durchgehend umformulieren) · Umbau ohne belegten Nutzen, Titel sind Suchwörter. Einzelfälle in B19, A14.
- **T23** (Registerbeschreibungen als Untertitel) · Erklärtext, Lukas will keine.
- **T03 Überschrift** («Welche Maschine in welchem Zyklus») · Titel des Originalplakats, Wiedererkennung. Klassen in B4.
- **K01** (thermisch trennen rostfreier Stähle) · Wortlaut aus chemsuisse S. 12, Trennen ist nicht Schweissen. Nicht prüfbar ohne Original, kein belegter Widerspruch. Beim nächsten Quellendurchgang prüfen.
- **K07, R4-13** (Spalte «Nicht verwenden» vervollständigen, «Gesetz» in der Spalte) · Spalte ist bewusst knappe Kurzfassung, «zurückhaltend» (Lukas). Mehr Vollständigkeit auf Kosten der Übersicht.
- **K08** (Warnpunkt-Definition erweitern) · trifft nicht zu: «nie mit Pressluft», «keine brennbaren Flüssigkeiten» sind Ausschlüsse.
- **K16 Rest** (Infinitiv-Regel für alle Regeln) · seitenweite Stilregel ohne Nutzen für Lesende. Einzelfälle in A10, A11, C3.
- **K19** (Warum-Klammern vereinheitlichen, fehlende Quellen markieren) · Quellenzeile des Themas deckt ab, «unverifiziert» beschriften will Lukas nicht.
- **K20** (Overlock unter Verbinden) · trifft nicht zu: bfu Anhang 1 führt sie unter Oberfläche (R4-15).
- **K22 Not-Aus** · «Notausschalter» steht im bfu-Text (Z. 309).
- **R4-08** (Brennprobe an Textilfasern) · Übertragung der Regel ohne Quelle.
- **R4-10** (Allergien einzelner Schülerinnen und Schüler) · keine Quelle, personenbezogen, Zusatzinfo.
- **R4-11, N11** (Hinweise «nicht auf dem Plakat» für Emaillierofen, Lasercutter, 3D-Drucker) · Lukas hat genau diesen Plakat-Hinweis heute gelöscht.
- **R4-12** (Gewichtung Zyklus 1 im Randkasten) · Randkasten muss ganz ins Fenster passen, Zusatzinfo.
- **R4-15** (Fussnote LP21 ordnet Feilen anders) · verwirrt Einsteigende.
- **D3** (Einträge «Nicht verwenden» stark kürzen, Fliesstext) · Kurzformen tragen die Tätigkeit («lasern», «schweissen»), Spalte heute gestaltet.
- **D6 Pfeil** (Pfeil statt Unterstreichung) · Unterstreichung ist das Linkzeichen der Seite. Kursiv in A24.
- **D7, D8** (Randkasten Grundlage, Springen beim Fenster) · bewusster Entscheid bzw. akzeptabel laut Befund.
- **N4, N8** (Spalte «Wer» und vier neue Zeilen in der Schulleitungstabelle) · neue Spalte und Zeilen, Vollständigkeit vor Übersicht.
- **N9 Randkasten** (Zeile für Schulleitungen im Randkasten) · Randkasten muss ins Fenster passen. Verweis in B16.
- **N10** (Lappen Leinöl vs. Lösungsmittel) · verschiedene Stoffe, beide Regeln belegt (Z. 681, 722).
- **N16** (Zürcher Liste mit bfu vergleichen) · nicht prüfbar, Vollständigkeit.
- **N18** (Lasercutter: «keine Zyklusangabe in den Quellen») · Zusatzsatz ohne Nutzen.
- **N22** (nach dem Unfall) · keine Quelle, Lukas: «im Notfall öffnet niemand diese Seite».
- **S25 H-Sätze** (Strichpunkt in H201 bis H203) · amtlicher Wortlaut bleibt.

---

## C-Fragen einzeln

1. Darf ich Recht und Zuständigkeiten straffen (Karten auf je einen Satz, Titel «Wer wofür zuständig ist» und «Pflichten und Empfehlungen», «Chemikalien-Ansprechperson» statt «Sicherheitsbeauftragte»)? Empfehlung ja.
2. Soll unter der Plakat-Legende ein Satz zu kantonalen Maschinenlisten (Luzern, Zürich) mit Link auf Kantone stehen? Empfehlung ja, ohne weitere Kartenzeilen.
3. Soll «verboten» ohne «Gesetz»-Marke durch «Nicht verwenden» ersetzt werden (Abbeizen, Emaillieren, Gasflaschen)? Empfehlung ja.
4. Darf ich die Matrixzeile Textil mit vorhandenen Themen und Plakat-Maschinen füllen und Keramik × Umformen auf «Glasieren und Brennen» verlinken? Empfehlung ja, ohne neue Regeln.
5. Soll unter «Was der Lehrplan 21 verlangt» ein Satz stehen, dass der Lehrplan Regeln zu Strom und Batterie verlangt, die Quellen aber keine enthalten? Empfehlung ja, keine eigenen Regeln.
6. Sollen die 23 Themenzeilen eine echte Kernaussage statt «Material · n Warnpunkte» bekommen? Empfehlung ja, zuerst drei zur Ansicht.
7. Soll die Matrix auf dem Handy als Liste je Material erscheinen? Empfehlung ja, als Variante.
8. Sollen die Registernamen bleiben, wie du sie heute gesetzt hast? Empfehlung ja.

Gesamteindruck: 25 A, 28 B, 8 C, 36 D. Übersehen hat die Kette: (B) Matrix-Daten (VERBOTEN, KURZ, KERN) stehen in bau.py, nicht in inhalt.html, Änderungen dort mitziehen. (A) Nach den Änderungen `bau/pruefe.py` laufen lassen, weil B19 und C1 Titel betreffen, an denen Anker hängen.
