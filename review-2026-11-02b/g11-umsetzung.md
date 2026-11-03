# G11 · Umsetzung der Aufträge A und B aus g10-lukas.md (2026-11-03)

Alle Änderungen mit dem Edit-Tool, jeder alte Wortlaut vorher mit grep auf genau einen Treffer geprüft (Ausnahmen vermerkt). Nicht gebaut, bau.py und pruefe.py laufen in der Hauptsession.

Bilanz: 105 erledigt, 0 übersprungen, 0 teilweise.

## A

- A1 erledigt
- A2 erledigt
- A3 erledigt
- A4 erledigt (Suva 67092 zweimal ersetzt, wie vorgesehen)
- A5 erledigt (Zeile KLEINGERAET gelöscht, B4323 bleibt definiert)
- A6 erledigt
- A7 erledigt
- A8 erledigt
- A9 erledigt
- A10 erledigt
- A11 erledigt
- A12 erledigt (Anker hartloeten, kleben, farben-lacke-spruehen, giessen-und-formen-mit-fluessigen-kunststoffen entstehen erst beim Bau aus h3-Slug, mit pruefe.py kontrollieren)
- A13 erledigt
- A14 erledigt
- A15 erledigt
- A16 erledigt
- A17 erledigt
- A18 erledigt
- A19 erledigt
- A20 erledigt
- A21 erledigt
- A22 erledigt
- A23 erledigt
- A24 erledigt (Seitenzahlen am PDF geprüft: H300 bis H360 S. 69, H361 bis H372 S. 70, H400/H410 S. 71)
- A25 erledigt
- A26 erledigt
- A27 erledigt
- A28 erledigt (b-3d gezielt, Thema 3D-Druck unverändert)
- A29 erledigt
- A30 erledigt

## B

- B1 erledigt
- B2 erledigt (Anker fachraum-betreiben und fuer-jeden-fachraum werden in bau.py gesetzt)
- B3 erledigt
- B4 erledigt
- B5 erledigt
- B6 erledigt
- B7 erledigt
- B8 erledigt
- B9 erledigt
- B10 erledigt (Linearbiegegerät mit «Heizdraht» wie im Auftrag)
- B11 erledigt (Seitenparameter 22 nicht im hep-PDF geöffnet, passt aber zum Versatz S. 64 = 10)
- B12 erledigt
- B13 erledigt
- B14 erledigt
- B15 erledigt
- B16 erledigt
- B17 erledigt
- B18 erledigt
- B19 erledigt
- B20 erledigt
- B21 erledigt
- B22 erledigt
- B23 erledigt
- B24 erledigt
- B25 erledigt
- B26 erledigt
- B27 erledigt
- B28 erledigt
- B29 erledigt
- B30 erledigt
- B31 erledigt
- B32 erledigt
- B33 erledigt
- B34 erledigt (chemsuisse Tabelle 2, S. 33, 34 geprüft: Chloroform Anhang 1.3, Chromtrioxid/Chromsäure Anhang 1.17, Trichlorethen Anhang 1.17)
- B35 erledigt
- B36 erledigt
- B37 erledigt
- B38 erledigt
- B39 erledigt
- B40 erledigt
- B41 erledigt
- B42 erledigt
- B43 erledigt (Wortlaut H301, H311, H331 an chemsuisse Anhang D, S. 69 geprüft)
- B44 erledigt
- B45 erledigt
- B46 erledigt
- B47 erledigt
- B48 erledigt
- B49 erledigt
- B50 erledigt
- B51 erledigt
- B52 erledigt
- B53 erledigt
- B54 erledigt
- B55 erledigt
- B56 erledigt
- B57 erledigt
- B58 erledigt
- B59 erledigt
- B60 erledigt
- B61 erledigt
- B62 erledigt
- B63 erledigt
- B64 erledigt
- B65 erledigt
- B66 erledigt nach Ersatzregel: Ersatz-PDF nicht gefunden (volksschulbildung.lu.ch/.../merkblatt_haftung_schulalltag.pdf und lu.ch-Variante 404, Unterseiten Schulrecht/Umsetzungen 404), darum Link «Merkblatt Kanton Luzern, Haftung im Schulalltag» in der Quellenzeile Sorgfalt ganz entfernt
- B67 erledigt (data-wort-Teil wörtlich erhalten)
- B68 erledigt
- B69 erledigt
- B70 erledigt
- B71 erledigt
- B72 erledigt (Wortlaut H304 an S. 69 geprüft, Abschnitt nach h-H301 eingefügt)
- B73 erledigt
- B74 erledigt
- B75 erledigt (Beispiel H360Fd steht so in Anhang D)

## Geänderte Schlüssel in bau.py

VERBOTE
- «Nie mit Pressluft abblasen» → «Nie mit Druckluft abblasen» (A9)
- «Verzichten auf» → «Nicht verwenden: chlorierte» (A10)
- neu: «Keine Werkstoffe mit Nanomaterialien» (B14), «Kein Woodsches Metall» (B17), «Keine Geräte der Laserklassen» (B18), «Für Ess- und Trinkgeschirr nur Glasuren» (B30)
- unverändert gültig geprüft: «Getränkte Lappen und Papiere nie» (B37), «Keine Schweissarbeiten» (B40); alle VERBOTE-Präfixe stehen an einem li-Anfang

INSTR
- («Brennofen in einem gut durchlüfteten Raum»,«selbst») → («Den Keramikbrennofen bedienen nur Lehrpersonen»,«selbst») (B32)
- «Gasanlagen für Hartlöten und Schweissen nehmen nur geschulte» bleibt gültig (B31)

KERN
- 'Checklisten': Wert → 'bfu 4.323 mit Prüfintervall je Punkt' (A17)
- 'Sicher unterrichten': Wert → 'Lehrperson wählt Maschinen, führt ein, beaufsichtigt laufend und hält fest' (B1)
- keine Schlüssel (Titel) geändert

KURZ, THEMA_KERN: nicht geändert.

Weitere bau.py-Werte: Matrixzeilen Kunststoff (B45), Metall (B46), Schweissen (B40), Leinöl (B37), Ziel Glasuren-Geschirr → glasieren-und-brennen (B30), Kartenhinweise A2, A3, A4, A6, B7, B9, B10, B11, B12, B13.

app.js: MAT keramik → 'Keramik' (B28), Ersatztext Karten ohne Eintrag (B8).

## Nach dem Bau prüfen
- pruefe.py: neue Anker aus A12, B47, B2, B53 (#raeume), B25 (#hergestellt), B74 (#schulleitung)
- neue H-Satz-Popups h-H301, h-H304, h-H311, h-H331 und h-H341-Link erscheinen (Block h-saetze, Ansprache über data-b)
- Zeile Luzern in der Kantone-Tabelle (zebis-Link) ist von B66 nicht betroffen
