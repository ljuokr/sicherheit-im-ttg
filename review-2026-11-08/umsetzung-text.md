# Umsetzung Runde 4, Text und Bau (2026-11-09)

Dateien: inhalt.html, bau/bau.py, bau/app.js, bau/stil.css. Alle Ersetzungen mit dem Edit-Tool, alter Wortlaut vorher per grep auf genau einen Treffer geprüft. Nicht gebaut. C und D nicht angefasst.

## bau/stil.css
- LAYOUT-03 (B): erledigt
- LAYOUT-05 (B): erledigt, Regel nach `.wrap{…}` eingefügt, gilt nicht für `.mtab-wrap`, die Matrix (`.mx-wrap`) ist nicht betroffen

## bau/app.js
- LAYOUT-02: erledigt, beide Stellen, inert-Rücksetzung steht vor `ausloeser.focus()`
- LAYOUT-06: erledigt, beide Stellen (aria-label Z. 63 und sr-Text Z. 39)

## bau/bau.py
- BAU-01 (B): erledigt
- BAU-03: erledigt, INSTR-Eintrag entfernt, Rest der Zeile bleibt
- BAU-04 (B): erledigt, Ziele #sorgfalt und #haftung existieren in inhalt.html
- BAU-05: erledigt
- BAU-10: erledigt
- BAU-11: erledigt, beide Ersetzungen entfernt (in inhalt.html kein `<h3>Schutzausrüstung</h3>` und kein `<h3>STOP-Prinzip</h3>`, also ohne Ziel). Beim Löschen hat das Edit-Tool den Zeilenumbruch nach `grund = zw(…)` mitgenommen, sofort korrigiert, Syntax mit ast.parse geprüft
- BAU-12: erledigt, Kommentar ersetzt, `def sprung(html)` gelöscht
- BAU-13: erledigt, Kommentar, `warn = ''`, `%s%s` und `warn,` angepasst
- BAU-14: erledigt
- BAU-15: erledigt, zweites `CHEM = …` vor EIGEN entfernt, `import os, base64` zu `import base64` (os ist in Z. 2 importiert)
- KURZFASSUNG-01, -05, -06, -07, -08, -12, -13, -14, -15: erledigt
- KONSISTENZ-BEGRIFFE-06: erledigt
- QUELLEN-WEITERE-07 (B): erledigt in bau.py, 9 Labels `'Technologiekarte, S. ` und Linktext Z. 158. Zusätzlich das Label der Bandsäge `… · Technologiekarte, S. 61` angeglichen (steht nicht am Anfang des Strings, gehört aber zur selben Vereinheitlichung). Beim replace_all hat das Edit-Tool das Leerzeichen nach «S.» verschluckt, sofort mit drei Ersetzungen («S.5/6/7» zu «S. 5/6/7») korrigiert und geprüft. In inhalt.html `Technologiekarten (PDF)` → `Lehrhilfen, Teil Technologiekarten (PDF)`: nur 1 Treffer vorhanden, ersetzt

## inhalt.html
- LAYOUT-04: erledigt
- LAYOUT-07: erledigt, beide Ampel-Piktogramme
- Z. 256 (KONSISTENZ-REGISTER-03, KONSISTENZ-REGELN-11, QUELLEN-CHEMSUISSE-B-10): erledigt
- RECHT-10 (B): erledigt
- RECHT-11: erledigt
- KURZFASSUNG-09: erledigt
- KURZFASSUNG-10 (B): erledigt
- KONSISTENZ-ZAHLEN-01, -03, -05: erledigt
- KONSISTENZ-BEGRIFFE-02, -03, -11: erledigt
- KONSISTENZ-REGELN-02: erledigt
- KONSISTENZ-REGELN-05 (B): erledigt
- Z. 594 (KONSISTENZ-REGELN-07, QUELLEN-CHECKLISTEN-12, B): erledigt, beide Teile (PSA-Zeile und Suva-67104-Fragen)
- KONSISTENZ-REGISTER-01: erledigt
- KONSISTENZ-REGISTER-07 (B): erledigt, Ziel #gasflaschen existiert
- QUELLEN-CHEMSUISSE-A-01, -A-02 (beide Teile), -A-03, -A-04, -A-06, -A-07, -A-08, -A-09, -A-11: erledigt
- QUELLEN-CHEMSUISSE-A-10 (B): erledigt, chemsuisse-Link der Quelle-Zeile am Ende jedes Themas: Weichlöten «S. 11, 33», Hartlöten «S. 10, 11, 33, 37» (eindeutig gemacht über die LP21-Zeile davor), Schweissen «S. 8, 9, 37» (eindeutig über den folgenden Suva-Lichtbogen-Link), Kleben «S. 16, 22, 23, 25, 33, 34», Wachsen «S. 8, 34»
- QUELLEN-CHEMSUISSE-B-03, -B-04, -B-05, -B-06 (beide Teile), -B-08, -B-11, -B-12 (B bzw. A): erledigt
- QUELLEN-BFU-01, -03 (B): erledigt
- QUELLEN-BFU-04, -05, -06, -07, -08: erledigt
- QUELLEN-CHECKLISTEN-01 bis -09: erledigt
- QUELLEN-CHECKLISTEN-14 (B): erledigt
- QUELLEN-WEITERE-01, -02, -04, -05 (Text und Linktext), -06, -09: erledigt. WEITERE-06 eindeutig gemacht über die folgende Zeile `<h3>Gesundheitsschutz bei Mutterschaft</h3>` (der BGE-Quellenlink steht zweimal)
- QUELLEN-WEITERE-03 (B): erledigt, beide Quellenangaben, dazu Eintrag in der Quellenliste vor den Lehrhilfen: «Stuber T. u. a. (2020): Technik und Design. Grundlagen. 3. Auflage. hep Verlag. ISBN 978-3-0355-1758-3.» Angaben aus dem Impressum (Fachsprache/25_TUD/Technik und Design. Grundlagen.pdf: «Thomas Stuber u. a.», 3. Auflage 2020, hep Verlag AG, Bern)
- QUELLEN-WEITERE-13 (B): erledigt, Text auf November 2026. edudoc konnte ich nicht von Hand öffnen, das bleibt vor der Veröffentlichung offen
- QUELLEN-WEITERE-14 (B): erledigt
- VERWEISE-1, -3, -4, -5: erledigt, Ziele #maschinen-warten, #installationen, #lagerung existieren

## Übersprungen
- keiner

## Hinweise für den Schluss
- Beim Bauen prüfen: Ausgabe «INSTR OHNE TREFFER» darf nicht mehr erscheinen, Sprungliste Recht zeigt drei Einträge.
- Die Zeilennummern in inhalt.html ab Z. 857 haben sich um eine Zeile verschoben (neuer Punkt Waschbecken), ab der Quellenliste um eine weitere.
