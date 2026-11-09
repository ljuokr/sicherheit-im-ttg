# Runde 6: Umsetzung A und B (2026-11-09)

Grundlage: `r6-entscheid.md`. Nur mit Edit geändert, jeder alt-Wortlaut vorher mit grep auf genau einen Treffer geprüft (Ausnahmen mit replace_all: WEITERE-03 7 Treffer, WEITERE-05 2 Treffer, wie verlangt). Nicht gebaut, nicht committet. C und D nicht angefasst.
Wo der Entscheid auf «wie im Befund» verweist (ZAHLEN-03, -04, -05, -08, CHEMSUISSE-A-01, CHECKLISTEN-04, -05), stammen alt und neu aus den Befunden und Korrekturen im Workflow-Journal.

## bau/app.js
- GLOSSAR-01: erledigt. Capture-Listener nach dem Bubble-Listener eingefügt.
- GLOSSAR-02/03 (B): erledigt. NICHT um 'DT','svg' ergänzt, p-zyklen in der Ausschluss-Bedingung.
- NAVIGATION-01/06: erledigt. zu('knopf') mit history.back() bzw. replaceState auf das aktive Register. Popstate mit TTG_OHNE_SPRUNG-Zweig. Fokus-setTimeout nicht umgesetzt.
- NAVIGATION-01, Teil nav5-test.cjs: übersprungen. Die Datei liegt ausserhalb der vier erlaubten Dateien. Die Erwartung «6 Zurück nach Schliessen» muss noch auf das Register vor der Matrix umgestellt werden.
- NAVIGATION-02: erledigt.
- NAVIGATION-03: erledigt (Register aus history.state.vor).
- NAVIGATION-04: erledigt, schonDa gestrichen.
- NAVIGATION-05: erledigt, gehe(id,true).

## bau/stil.css
- LAYOUT-01: erledigt (63.99rem, Kommentar «Handy und Tablet»).
- LAYOUT-02 (B): erledigt, dazu tabindex="0" an figure.raumplan in inhalt.html.
- LAYOUT-03: erledigt (margin-top statt min-height, align-items:stretch, margin-top:0!important im 44rem-Block).
- LAYOUT-04: erledigt (input::placeholder).

## bau/bau.py
- BAU-02 (B), BAU-05, BAU-06, BAU-09, BAU-13, BAU-14: erledigt. einleitung_verf kam nur einmal vor, also ohne Verwendung.
- KURZFASSUNG-01, -02 (B), -03, -10: erledigt.
- KONSISTENZ-ZAHLEN-06, KONSISTENZ-BEGRIFFE-15: erledigt.
- QUELLEN-BFU-04, QUELLEN-BFU-08, QUELLEN-CHECKLISTEN-01: erledigt.
- QUELLEN-CHECKLISTEN-03 (Teil A): erledigt, beide Winkelschleifer-Karten über den Kartenschlüssel eindeutig gemacht. Gehörschutz (C) nicht angefasst.

## inhalt.html
- GLOSSAR-04: erledigt. Statisch: «GHS-Piktogramme» steht in der Lagerung im Text («Gefahrenkennzeichnung (GHS-Piktogramme, H-Sätze)»), «Piktogrammen» in Fachraum betreiben wird nicht mehr verlinkt. Ob der Link zur Laufzeit dort sitzt, ist ungeprüft (kein Testlauf erlaubt).
- GLOSSAR-05: erledigt (beide Teile).
- RECHT-07 + GELASSENHEIT-05 (B): erledigt.
- KURZFASSUNG-04: erledigt.
- KONSISTENZ-ZAHLEN-01 (B), -02, -03, -04, -05, -07 (beide Teile), -08, -10, -11: erledigt.
- KONSISTENZ-BEGRIFFE-01 (2 Stellen), -03, -04 (B), -07, -08, -09, -10 (2 Stellen), -12, -14: erledigt.
- KONSISTENZ-REGELN-02 (B), -04 (B): erledigt.
- KONSISTENZ-REGELN-11 (B): erledigt. Aufsicht-Punkt gestrichen, Verweis an den Kategorie-B-Punkt angehängt.
- KONSISTENZ-REGISTER-05 (B), -12, -13 (B): erledigt.
- KONSISTENZ-REGISTER-10 (B): erledigt. Medikamente-Punkt in eigener Liste. VERBOTE unverändert. Statisch: Der Eintrag «Lehrpersonen dürfen nach eigenem Ermessen keine» trifft weiter genau einen Punkt (keine «VERBOT OHNE TREFFER» zu erwarten), die erste Liste hat keinen Verbotspunkt mehr, «Vorgehen» bleibt vorne. Bau-Ausgabe nicht geprüft.
- GELASSENHEIT-06 (B): erledigt. Erste-Hilfe-Punkt mit unverändertem Wortlaut direkt hinter «Vorgehen» verschoben.
- QUELLEN-CHEMSUISSE-A-01: erledigt, alle fünf Ersetzungen.
- QUELLEN-CHEMSUISSE-A-07 (B), -A-08, -A-09, -B-05, -B-07, -B-08: erledigt.
- QUELLEN-BFU-06, -07: erledigt.
- QUELLEN-CHECKLISTEN-04, -05: erledigt.
- QUELLEN-WEITERE-03: erledigt, 7 Vorkommen ersetzt.
- QUELLEN-WEITERE-05: erledigt, 2 Vorkommen ersetzt.
- QUELLEN-WEITERE-06, -08, -10: erledigt.
- VERWEISE-1, -3, -5: erledigt. Ziel #schweissen wird schon an 4 anderen Stellen verlinkt, #fuer-jeden-fachraum wird in bau.py erzeugt.
- GELASSENHEIT-08 (B): erledigt.

## Offen nach dem Umbau
- bau.py, pruefe.py, nav5-test und zurueck-test laufen lassen. nav5-test.cjs vorher anpassen (siehe oben).
- Lead Maschinen («im Zyklus 1 noch nicht») und Treppe (Ständerbohrmaschine als Beispiel in Zyklus 2) nebeneinander lesen.
- Die 19 C-Fragen warten auf Lukas.
