# A4-Blatt «Sicherheit im TTG auf einen Blick»: Prüfung nach Zielgruppen (2026-11-08)

Geprüft: `a4/bau-a4.py`, `a4/vorschau.png`, Abgleich mit `review-2026-11-08/seite-text.md`.
Alle «alt»-Stellen kommen in `a4/bau-a4.py` genau einmal vor.

Schreibregeln: keine Verstösse gefunden. Kein «ß», keine Ausrufezeichen, keine langen Gedankenstriche, keine Strichpunkte. «Etikette», «Kehricht», «Schulträger» sind Schweizer Begriffe. «Erste-Hilfe-Kasten» steht so auch auf der Website.

Kurzbefund: Die Schülerinnen und Schüler finden ihren Teil oben und verstehen ihn grösstenteils. Schwierig sind einzelne Fachwörter und zwei Piktogramme. Die Schulleitung erkennt ihre Pflichten nicht in 30 Sekunden, weil das Etikett «Schule» unscharf ist und die Punkte meist ohne Verb stehen. Am schwersten wiegt ein Widerspruch zur Website bei der Notrufnummer.

---

## A4Z-01 Notrufnummer beim Stromunfall widerspricht der Website, Sanität 144 fehlt
- **Stelle:** NOTFALL, Punkt «Stromunfall», und Nummernblock links im Notfallkasten.
- **Befund:** Das Blatt sagt «dann 112», die Website (Register Unterricht, Im Notfall) sagt «Zuerst Stecker ziehen oder Sicherung ausschalten, dann 144». Auf dem Blatt fehlen 144 (Sanität) und 118 (Feuerwehr) ganz, obwohl Löschdecke und Feuerlöscher aufgezählt sind. «Strom aus» sagt Schülerinnen und Schülern nicht, was sie tun sollen.
- **Vorschlag:**
  - alt: `<b>Stromunfall:</b> Person nicht berühren, zuerst Strom aus, dann 112.`
  - neu: `<b>Stromunfall:</b> Person nicht berühren, zuerst Stecker ziehen oder Sicherung ausschalten, dann 144.`
  - alt: `<b class="gross">112</b><span>Notruf</span>`
  - neu: `<b class="gross">144</b><span>Sanität</span><b>118</b><span>Feuerwehr</span><b>112</b><span>Allgemeiner Notruf</span>`
- **Gewicht:** hoch

## A4Z-02 Notfall steht zuunterst, Pflichten von Lehrperson und Schulleitung in der Mitte
- **Stelle:** Reihenfolge der Sections: alle, Lehrperson/Schule, Stoffe, Notfall.
- **Befund:** Das Blatt hängt im Fachraum. Für Schülerinnen und Schüler zählen der Block «alle» und der Notfall, beide sollten ohne Suchen sichtbar sein. Heute trennt der Textblock für Lehrperson und Schulleitung die beiden. In der Vorschau steht zudem eine Leerfläche über der Ampel.
- **Vorschlag:** Reihenfolge im HTML ändern zu: `<section class="alle">`, `<section class="notfall">`, `<section class="ampel">`, `<section class="zwei">`. Damit liegt oben, was im Raum gilt und im Notfall zählt, unten, was Erwachsene vorbereiten. Die Leerfläche fällt durch die Grid-Zeile `1fr` dann unten an.
- **Gewicht:** mittel

## A4Z-03 «Wenig Staub» mit Atemschutz-Piktogramm widerspricht dem Text
- **Stelle:** ALLE, Eintrag mit `iso-M017.svg`.
- **Befund:** Das Piktogramm zeigt eine Atemschutzmaske, der Text sagt «Atemschutz erst, wenn das nicht reicht». Wer nur das Bild sieht, liest «Maske tragen». «Wenig Staub» ist zudem kein Auftrag, und ob Absaugen reicht, entscheidet nicht die Schülerin.
- **Vorschlag:**
  - alt: `'Wenig Staub', 'absaugen oder lüften, Atemschutz erst, wenn das nicht reicht'`
  - neu: `'Staub vermeiden', 'Absaugung einschalten oder lüften, Staubmaske, wenn die Lehrperson es sagt'`
- **Gewicht:** mittel

## A4Z-04 Gehörschutz: «85 dB(A)» und «Suva» helfen Schülerinnen und Schülern nicht
- **Stelle:** ALLE, Eintrag «Gehörschutz».
- **Befund:** Niemand im Raum kann Dezibel ablesen. Der Satzteil «verlangt ihn die Suva» ist eine Quellenangabe, keine Handlungsregel. In der Vorschau bricht «85 / dB(A)» zudem über zwei Zeilen.
- **Vorschlag:**
  - alt: `'an lauten Maschinen, ab 85 dB(A) verlangt ihn die Suva'`
  - neu: `'an lauten Maschinen, wenn man sich nur noch schreiend verständigen kann'`
  - Beleg vor Übernahme prüfen: Faustregel der Suva, «Lärm am Arbeitsplatz» (auf der Website bereits verlinkt). Falls nicht belegt: `'an lauten Maschinen, wenn die Lehrperson es sagt'`.
- **Gewicht:** mittel

## A4Z-05 Geschlossene Schuhe: Text wiederholt nur die Überschrift «alle»
- **Stelle:** ALLE, Eintrag «Geschlossene Schuhe».
- **Befund:** «für Schülerinnen, Schüler und Lehrpersonen» steht schon im Blocktitel «Im Fachraum gilt für alle» und belegt drei Zeilen. Alle anderen Einträge sagen wann oder warum, dieser nicht.
- **Vorschlag:**
  - alt: `'für Schülerinnen, Schüler und Lehrpersonen'`
  - neu: `'auch für Lehrpersonen, gegen Funken, Hitze und herabfallende Teile'`
  - «herabfallende Teile» ist auf der Website nicht belegt (dort: «Gegen: Staub, Funken, Hitze, drehende Teile»). Ohne Beleg: `'auch für Lehrpersonen, gegen Funken und Hitze'`.
- **Gewicht:** niedrig

## A4Z-06 Allgemeines Warndreieck W001 bei «Maschinen nur nach Einführung»
- **Stelle:** ALLE, Eintrag mit `iso-W001.svg`.
- **Befund:** Das Ausrufezeichen im Dreieck heisst «Achtung», nicht «erst Einführung». Als einziges gelbes Warnzeichen unter blauen Gebotszeichen wirkt es wie eine allgemeine Gefahrenmeldung. Passend wäre ISO 7010 M002 «Anleitung beachten», das fehlt in `bau/bilder/`.
- **Vorschlag:** `iso-W001.svg` durch ein neues `iso-M002.svg` ersetzen (Lizenzzeile in `bau/bilder/nachweis.json` nachführen). Wenn kein neues Bild: so lassen, aber den Titel schärfen.
  - alt: `'Maschinen nur nach Einführung', 'und mit Freigabe der Lehrperson'`
  - neu: `'Maschinen erst nach Einführung', 'und nur, wenn die Lehrperson sie freigibt'`
- **Gewicht:** niedrig

## A4Z-07 Ampel ohne Adressat, Fachwörter für Kinder zu schwer
- **Stelle:** `<section class="ampel">`, gelbes Feld.
- **Befund:** Alle anderen Blöcke tragen ein Etikett, die Ampel nicht. Schülerinnen und Schüler können «Ersatz prüfen, sonst schützen» nicht umsetzen, die Auswahl der Stoffe ist Sache der Lehrperson. «hautsensibilisierend» versteht im Zyklus 2 niemand.
- **Vorschlag:**
  - alt: `<h2>Stoffe:<br>Etikette lesen</h2>`
  - neu: `<h2><span class="tag">Lehrperson</span><br>Stoffe:<br>Etikette lesen</h2>`
  - alt: `ätzend, hautsensibilisierend, giftig`
  - neu: `ätzend, kann Allergien auslösen, giftig`
- **Gewicht:** mittel

## A4Z-08 Gleiche GHS-Piktogramme im gelben und im roten Feld
- **Stelle:** Ampel, Aufrufe `ghs(...)` für gelb und rot.
- **Befund:** Totenkopf (GHS06) und Gesundheitsgefahr (GHS08) stehen in «Ersatz prüfen» und in «Nicht verwenden». Der Titel «Etikette lesen» legt nahe, dass das Piktogramm entscheidet. Tatsächlich entscheiden Gefahrenklasse und H-Satz (gelb «Verdacht auf Krebs», rot «krebserzeugend»). Ohne Hinweis widersprechen sich die beiden Felder für den Leser.
- **Vorschlag:**
  - alt: `<h2>Stoffe:<br>Etikette lesen</h2>` (zusammen mit A4Z-07 umsetzen)
  - neu: `<h2><span class="tag">Lehrperson</span><br>Stoffe:<br>H-Sätze lesen</h2>`
  - und im roten Feld ergänzen, alt: `fortpflanzungsgefährdend%(rot)s`
  - neu: `fortpflanzungsgefährdend. Gleiches Piktogramm wie gelb möglich, der H-Satz entscheidet.%(rot)s`
- **Gewicht:** mittel

## A4Z-09 Etikett «Schule» ist für die Schulleitung nicht eindeutig
- **Stelle:** `<span class="tag">Schule</span>Schulleitung und Schulträger`.
- **Befund:** Die anderen Etiketten nennen Personen («alle», «Lehrperson»), dieses eine Institution. Schülerinnen und Schüler lesen «Schule» als «gilt in der Schule», also für sich. Eine Schulleitung sucht ihr Wort und findet es erst im Titel daneben. Im Kopf steht zudem «Schulleitung», der Block nennt auch den Schulträger.
- **Vorschlag:**
  - alt: `<span class="tag">Schule</span>Schulleitung und Schulträger`
  - neu: `<span class="tag">Schulleitung</span>Mit dem Schulträger sorgen für`
- **Gewicht:** mittel

## A4Z-10 Pflichten der Schulleitung stehen meist ohne Verb
- **Stelle:** SCHULE, Punkte 1, 2 und 6.
- **Befund:** «FI-Schutzschalter 30 mA, Schlüsselschalter, Not-Aus, wirksame Absaugung» ist eine Liste, keine Pflicht. «Notfallblatt halbjährlich» bricht ab, es fehlt was zu tun ist. Im Lehrpersonen-Block beginnen die Punkte mit einer Handlung, hier nicht. So erkennt die Schulleitung ihre Pflicht nicht in 30 Sekunden.
- **Vorschlag:**
  - alt: `'Fachraumordnung mit Bekleidungs- und Verhaltensregeln, gemeinsam im Team getragen.'`
  - neu: `'Fachraumordnung mit Bekleidungs- und Verhaltensregeln festlegen, vom Team gemeinsam getragen.'`
  - alt: `'FI-Schutzschalter 30 mA, Schlüsselschalter, Not-Aus, wirksame Absaugung.'`
  - neu: `'Fachraum ausrüsten mit FI-Schutzschalter 30 mA, Schlüsselschalter, Not-Aus und wirksamer Absaugung.'`
  - alt: `Notfallblatt halbjährlich.'`
  - neu: `Notfallblatt halbjährlich überprüfen.'`
- **Gewicht:** mittel

## A4Z-11 Doppelungen zwischen Lehrperson, Schule und Notfall
- **Stelle:** LP «Über Schlüsselschalter und Not-Aus …», SCHULE «… Schlüsselschalter, Not-Aus …». SCHULE «Notfallblatt halbjährlich» und NOTFALL «Bereit im Raum: … Notfallblatt …».
- **Befund:** Inhaltlich ergänzen sich die Stellen (einbauen gegenüber bedienen, prüfen gegenüber bereithalten), sie widersprechen sich nicht. Der LP-Satz liest sich aber wie eine Einrichtungspflicht und wiederholt so den Schulleitungs-Punkt.
- **Vorschlag:**
  - alt: `'Über Schlüsselschalter und Not-Aus Maschinen freigeben und zentral stoppen.'`
  - neu: `'Maschinen mit dem Schlüsselschalter freigeben, im Notfall mit Not-Aus alle stoppen.'`
- **Gewicht:** niedrig

## A4Z-12 Schutzbrille: «immer» am Satzende schwächt den Rest
- **Stelle:** ALLE, Eintrag «Schutzbrille».
- **Befund:** «an Maschinen …, an der Bohrmaschine immer» lässt Kinder schliessen, an anderen Maschinen sei die Brille nicht immer nötig. Die Website sagt «Schutzbrille ist an der Bohrmaschine obligatorisch», das Wichtigste gehört nach vorn.
- **Vorschlag:**
  - alt: `'an Maschinen und bei Spritzern, an der Bohrmaschine immer'`
  - neu: `'an der Bohrmaschine immer, ebenso an anderen Maschinen und bei Spritzern'`
- **Gewicht:** niedrig
