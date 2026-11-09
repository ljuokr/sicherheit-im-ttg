# Umsetzung Bilder, Prüfrunde 4 (2026-11-09)

Geändert nur in `bau/bilder/`: 8 JPG ersetzt, `nachweis.json` (9 Einträge), `ce-vergleich.svg`. Nicht neu gebaut, nichts in `inhalt.html` geändert.

## Bilder (Original von Commons, sips formatOptions 70)

| Nr | Datei | Quelle | Vorher | Nachher |
|---|---|---|---|---|
| 1 | fi-schalter.jpg | Residual_current_device_(RCD).jpg, Diermaier, CC0 | 280 × 280, 17 KB | 560 × 373, 41 KB |
| 2 | schluesselschalter.jpg | Key_switch.jpg, Karlo, gemeinfrei | 229 × 280, 15 KB | 464 × 568, 65 KB (Original ist 464 breit, nicht hochgerechnet) |
| 3 | absaugung.jpg | Lötrauchabsaugung.jpg, Jens Eickhoff, gemeinfrei | 107 × 280, 6 KB | 560 × 553, 81 KB |
| 4 | spritzkabine.jpg | Paint_booths.jpg, Cjp24, CC BY-SA 3.0 | 226 × 280, 14 KB | 560 × 435, 57 KB |
| 6 | bindemittel.jpg | Smear_of_oil.jpg, Flominator, CC BY-SA 3.0 | 280 × 216, 12 KB | 560 × 443, 64 KB |
| 7 | ffp-maske.jpg | Covid_Face_mask_FFP2_(50577264611).jpg, dronepicr, CC BY 2.0 | 280 × 258, 12 KB | 560 × 840, 52 KB |
| 8 | glasur.jpg | FrittenL1110809_(2).jpg, Oktobersonne, CC BY-SA 4.0 | 280 × 187, 13 KB | 560 × 373, 46 KB |
| nachgetragen | fdm-drucker.jpg | 3D_printer_in_a_school_workshop.jpg, Oleg Bor, CC BY-SA 4.0 | 280 × 280, 13 KB | 560 × 746, 56 KB |

Lizenz und Urheber je über die Commons-API (extmetadata) geprüft, stimmen mit dem Entscheid überein.

Summe der 8 Dateien: vorher rund 105 KB, nachher 464 KB. Eingebettet als base64 wird die Seite damit um rund 480 KB schwerer.

## Abweichung beim Zuschnitt (Nr. 3)
Entscheid: «rechte Hälfte zuschneiden». Die echte rechte Hälfte (ab x 465 von 929) enthält nur einen Absaugarm, das alt spricht aber von «Absaugarmen» (Mehrzahl). Zugeschnitten darum ab x 300 (629 × 622 vom Original): beide Absaugarme sichtbar, das Regal links fällt weg, das Absauggerät ist links angeschnitten. Bildzeile mit «Foto (Ausschnitt)».

## nachweis.json
- ffp-maske, absaugung, fi-schalter, fdm-drucker, spritzkabine, glasur, bindemittel: alt laut Entscheid, credit auf neue Quelle.
- etikett: alt ergänzt um «Signalwort sowie H- und P-Sätzen», credit unverändert.
- schluesselschalter: alt und credit unverändert.
- spritzkabine: Zusatz «Beispielbild» in alt und credit entfernt (neues alt laut Entscheid ohne «Beispielbild»).
- bindemittel: bleibt als Beispielbild gekennzeichnet («Beispielbild mit Ölbindemittel auf der Strasse.» unverändert).
- JSON gültig (json.tool).

## ce-vergleich.svg (Nr. 30)
Schrift 15 auf 23. Rechte Beschriftung «verwechselbar: Buchstaben eng» gekürzt zu «verwechselbar: zu eng». Links «CE-Kennzeichnung» bleibt. Beide passen in ihre Hälfte (Vorschau geprüft). Keine Hilfslinien (D).

## Nicht umgesetzt
- Nr. 11 bis 19 (GHS-alt): stehen in `inhalt.html`, nicht in meinen Dateien.
- industriesauger.jpg: kein Kandidat und kein Entscheid zum Ersatz, nur Hinweis «nicht geprüft». Bleibt.
- Nr. 10, 32 bis 35 (C) und 26, 29, 31 (D): wie entschieden nicht umgesetzt.
- Die alten Bilddateien sind überschrieben. Die vorherigen Commons-Quellen stehen in `bilder-kandidaten/` (teils als «heute») und im alten Nachweis (Kopie im Scratchpad der Session).

## Offen
- Seite neu bauen (`bau/bau.py`), damit Bilder und alt-Texte erscheinen.
- Hochformat-Bilder ffp-maske (560 × 840) und fdm-drucker (560 × 746) sind deutlich höher als bisher. In der gebauten Seite prüfen, ob die Darstellung (stil.css) die Höhe begrenzt.
