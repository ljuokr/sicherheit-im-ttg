# Umsetzung Stufe C, Prüfrunde 4 (2026-11-09)

Grundlage: entscheid-text.md, Abschnitt 3, Entscheid Lukas «alle wie empfohlen». Jeder alte Wortlaut vorher mit grep auf genau einen Treffer geprüft, alle mit dem Edit-Tool geändert. Gebaut in review-2026-11-08/eigene/test-seite.html, die echte Seite ist unverändert. Nicht committet.

## 1. Plakatpunkte mit A, B, C (LAYOUT-01): erledigt
- bau/app.js, Funktion punkte: der Punkt erhält den Buchstaben als Text (`el('span','dot '+K,K)`), weiterhin aria-hidden, der Screenreadertext bleibt.
- bau/stil.css: `.dots .dot{font-size:.6rem;font-weight:700;line-height:1;color:#111}`. Gilt nur für die Punkte der Plakatliste und des Themenfensters, Legende und Karte zeigen den Buchstaben schon daneben. #111 auf allen drei Punktfarben über 7:1. Kommentar «nur Farbe» angepasst.

## 2. INSTR und data-instr entfernen (BAU-02): erledigt
- bau/bau.py: Liste INSTR, itreffer, die Schleife in lists() und die Ausgabe «INSTR OHNE TREFFER»/«instr» entfernt. Die Ausgabe heisst jetzt nur «verbote 43».
- bau/pruefe.py: Zeile «data-instr:» entfernt.
- Zusätzlich bau/app.js, Funktion kopie: data-instr aus Selektor und removeAttribute-Liste entfernt (gleicher toter Code). Testseite enthält kein data-instr mehr.

## 3. Haftung «in ihrer dienstlichen Tätigkeit» (RECHT-01, -02, -07, VERWEISE-6): erledigt
- Karte Schulträger: «haftet in der Regel für Schäden, die Lehrpersonen in ihrer dienstlichen Tätigkeit widerrechtlich verursachen, und kann für Mängel an Gebäude und fest eingebauter Einrichtung haften, siehe Haftung.»
- Haftung, Absatz 1: «Verursacht eine Lehrperson in ihrer dienstlichen Tätigkeit widerrechtlich einen Schaden, etwa durch Verletzung der Sorgfaltspflicht, haftet …»
- Glossar Schulträger: «… und für Schäden, die eine Lehrperson in ihrer dienstlichen Tätigkeit widerrechtlich verursacht, haftet in der Regel sie.»
- Kurzzeile Haftung in bau.py («in der Regel haftet der Schulträger, bestraft werden kann, wer fahrlässig jemanden verletzt oder tötet») nennt den Unterricht nicht und blieb.

## 4. Werkeigentümerhaftung (RECHT-03): erledigt
- Haftung, Ende Absatz 1: «Unabhängig davon kann der Schulträger als Werkeigentümer für Mängel an Gebäude und fest eingebauter Einrichtung haften (Obligationenrecht, OR Art. 58).»
- Quellenzeile Haftung ergänzt: bfu 2.524, S. 22 (Kap. VI Rechtliche Grundlagen, nennt die Werkeigentümerhaftung, im Quelltext geprüft) und Fedlex OR Art. 58 (https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de#art_58).
- Karte: Kurzfassung siehe Frage 3.
- Glossar Schulträger: «Als Werkeigentümerin kann sie zudem für Mängel an Gebäude und fest eingebauter Einrichtung haften (OR Art. 58).» Quellenzeile um den Fedlex-Link OR Art. 58 ergänzt.

## 5. Obhutspflicht (RECHT-04, -05, -08, Gesamteindruck 1): erledigt
- Glossar: «Pflicht der Lehrperson, im Unterricht, in den Pausen und bei schulischen Aktivitäten für die Sicherheit der anvertrauten Schülerinnen und Schüler zu sorgen. Sie ergibt sich aus dem kantonalen Schulrecht, dem Arbeitsverhältnis und der übernommenen Aufsicht. In Bern … (VBG § 24). Verletzt eine Lehrperson diese Pflicht und wird dadurch jemand verletzt oder getötet, kann sie strafrechtlich verantwortlich werden.» Strafgesetzbuch als Quelle und «Laut bfu» gestrichen (die bfu nennt das StGB, darum nicht mehr der bfu zugeschrieben).
- Recht, Punkt 1: «Lehrpersonen haben im Unterricht, in den Pausen und bei schulischen Aktivitäten eine Sorgfalts- und Obhutspflicht. … GAL § 25. Verletzt eine Lehrperson diese Pflicht und wird dadurch jemand verletzt oder getötet, kann sie strafrechtlich verantwortlich werden.»
- Karte Lehrperson: «Obhutspflicht im Unterricht, in den Pausen und bei schulischen Aktivitäten, siehe Sorgfalts- und Obhutspflicht.»
- Hinweis: Der empfohlene Satz «Wird dadurch jemand verletzt …» braucht einen Bezug für «dadurch». Darum steht davor «Verletzt eine Lehrperson diese Pflicht und», der Rest ist wörtlich.

## 6. Medikamentensatz (RECHT-12): erledigt
- Unterricht, Im Notfall: «Warum: Nach dem Heilmittelgesetz dürfen nur Fachpersonen wie Ärztinnen, Apotheker oder Drogistinnen Arzneimittel abgeben, ausgenommen frei verkäufliche.» Die Regel «Lehrpersonen dürfen nach eigenem Ermessen keine Medikamente abgeben, auch keine rezeptfreien» und die Quelle Kantonsapotheker bleiben.

## 7. Hartlöten (KONSISTENZ-REGELN-03): keine Ergänzung, nichts mehr zu tun
- Keine Schweisserhandschuhe. Fragenummern und chemsuisse-Beleg waren schon in A/B korrigiert: Hartlöten «… Bei ätzenden Flussmitteln zusätzlich Schutzhandschuhe (chemsuisse, S. 10). Suva 67103, Fragen 10, 12», Schweissen «Suva 67103, Frage 12». Geprüft, keine Änderung nötig.

## 8. Chemikalienliste (KONSISTENZ-REGELN-06, QUELLEN-CHEMSUISSE-B-09): erledigt
- Pflichtentabelle: «<td>Chemikalienliste führen</td><td>erforderlich nach chemsuisse, Teil der Sorgfaltspflicht (S. 36)</td>». «neun Pflichten» in bau.py bleibt.

## 9. Entsorgung, Sicherheitsbeauftragte (QUELLEN-CHEMSUISSE-B-01, -02): erledigt
- Fachraum, Entsorgung: «Die Lehrperson entscheidet in Absprache mit der oder dem Sicherheitsbeauftragten der Schule über den Entsorgungsweg, im Zweifel fragt sie die kantonale Fachstelle.»
- Glossar Sonderabfall: «Die Lehrperson entscheidet in Absprache mit der oder dem Sicherheitsbeauftragten der Schule über den Entsorgungsweg, im Zweifel mit der kantonalen Fachstelle.»

## 10. Betriebsnummer, Begleitschein (QUELLEN-CHEMSUISSE-B-13): nicht umgesetzt
- Entscheid: nicht ergänzen.

## 11. Staubbeutel, Absaugung (QUELLEN-BFU-09): nicht umgesetzt
- Entscheid: nicht ergänzen.

## 12. Bandsäge (QUELLEN-CHECKLISTEN-13): nicht umgesetzt
- Entscheid: strengere Fassung bleibt.

## 13. FI-Schutzschalter (QUELLEN-WEITERE-10): erledigt
- NIV geprüft: Fedlex braucht JavaScript (WebFetch leer). Geprüft an der amtlichen Bundespublikation SR 734.27 (PDF, Stand am 31. Oktober 2025, res.cloudinary.com/adminch/…/734-27d.pdf). Art. 3 «Grundlegende Anforderungen an die Sicherheit», Abs. 1: Installationen müssen nach den anerkannten Regeln der Technik erstellt, geändert, in Stand gehalten und kontrolliert werden. Abs. 2: als solche gelten die Normen von IEC und CENELEC, sonst die schweizerischen Normen. Die NIN selbst nennt die NIV nicht namentlich, sie ist die Norm, über die Art. 3 verbindlich wird.
- Neu: «Gesetz: Niederspannungs-Installationsverordnung (NIV) Art. 3, umgesetzt mit der Norm NIN 4.1.1.3.3, bei neuen Installationen». Gegenüber der Empfehlung ist «Art. 3» ergänzt, weil der Artikel jetzt belegt ist.

## Bau und Prüfung
- `python3 bau/bau.py review-2026-11-08/eigene/test-seite.html`: verbote 43.
- `python3 bau/pruefe.py` ohne Argument vergleicht inhalt.html mit der echten, noch alten Seite und meldet darum die geänderten Absätze als fehlend. Mit der Testseite als Argument: Parserfehler keine, doppelte ids keine, Tabellenzeilen identisch True, Gedankenstriche/ß keine, Ausrufezeichen 0, node --check 0, href-Ziele fehlend keine. Die übrigen «fehlend»-Meldungen (Gebotszeichen, GHS-Icons, eine chemsuisse-Quelle) betreffen Stellen, die diese Runde nicht berührt hat.
- Nicht im Browser angesehen: Darstellung der Buchstaben in den Punkten.
