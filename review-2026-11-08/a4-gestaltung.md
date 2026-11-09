# Review Gestaltung A4-Blatt «Sicherheit im TTG auf einen Blick»

Geprüft: a4/sicherheit-ttg-a4.pdf (Seite 1), a4/vorschau.png, CSS in a4/bau-a4.py. Stand 2026-11-08. PDF und Vorschau stimmen überein.

Gewicht: hoch = vor dem Aushang beheben, mittel = deutlich besser, tief = Feinschliff.

Vorbemerkung zur Distanz: Für 2 m Lesedistanz braucht Text etwa 6 bis 7 mm Versalhöhe (rund 24 pt und mehr), Sicherheitszeichen nach ISO 3864-1 (Distanzfaktor z = 40) etwa 50 mm. Auf A4 ist das nur für Titel, Piktogramme und Notrufnummer erreichbar. Das Blatt sollte darum bewusst zweistufig gebaut sein: aus 2 m erkennbar sind Titel, die acht Piktogramme, «Im Notfall» mit 112. Alles andere ist Nahlesetext (50 bis 80 cm).

---

## A4G-01 Piktogramme zu klein für den Aushang

- **Stelle:** `.p img{width:10mm;height:10mm}`, `.p{grid-template-columns:10mm 1fr}`
- **Befund:** 10 mm Zeichen sind nach ISO 3864-1 nur bis etwa 0,4 m sicher erkennbar. Aus 2 m sieht man blaue und rote Punkte, aber nicht, was sie zeigen. Gerade die Piktogramme sind das Element, das im Fachraum auf Distanz wirken muss.
- **Vorschlag:** `.p{grid-template-columns:17mm 1fr;gap:2.5mm;align-items:start}` und `.p img{width:17mm;height:17mm}`. Platz dafür kommt aus der leeren Fläche unter den Spalten (A4G-04). 17 mm reicht für etwa 0,7 m sicher und für 2 m als Wiedererkennung der bekannten Zeichen.
- **Gewicht:** hoch

## A4G-02 Hierarchie: Abschnittstitel kaum grösser als Fliesstext

- **Stelle:** `h2{font-size:10.5pt}`, `body{font-size:9pt}`, `.ampel h2{font-size:10pt}`, `.amp{font-size:8pt}`, `.tag{font-size:7pt}`
- **Befund:** h2 ist nur 1,5 pt grösser als der Text. Aus 2 m sind nur h1 (19 pt) und «112» (22 pt) lesbar. Die Gliederung «alle / Lehrperson / Schule / Stoffe / Notfall» löst sich auf Distanz nicht auf. Die Ampel-Felder mit 8 pt sind kleiner als der übrige Text, obwohl sie Schülerinnen und Schüler betreffen.
- **Vorschlag:** `h1{font-size:24pt}`, `h2{font-size:13pt;margin:0 0 2.5mm}`, `.tag{font-size:8pt;padding:.5mm 2mm}`, `.amp{font-size:8.8pt}`, `.amp b{font-size:10pt}`, Fliesstext `body{font-size:9.2pt}` belassen oder leicht anheben. Die Lehrperson- und Schulspalte dürfen klein bleiben, sie sind Nahlesetext.
- **Gewicht:** hoch

## A4G-03 Ampel in Schwarzweiss nicht unterscheidbar

- **Stelle:** `.g{background:#dcefdc}.y{background:#fbefc8}.r{background:#f6d9d6}`
- **Befund:** Relative Helligkeit etwa 0,82 / 0,86 / 0,74. Im Graustufendruck und Kopierer entstehen drei fast gleiche Hellgrau-Flächen. Die Unterscheidung hängt nur noch an den Überschriften. Auch für Rot-Grün-Sehschwäche ist Grün und Rot hier kaum trennbar.
- **Vorschlag:** Farbe zusätzlich durch Form codieren, z. B. dicke linke Randlinie mit unterschiedlichem Stil und abgestufter Dunkelheit: `.amp{border-left:2mm solid}` `.g{border-left-color:#2e7d32}` `.y{border-left:2mm dashed #b8860b}` `.r{border-left:2mm double #b3261e}`. Oder Zeichen vor den Titel: «✓ Einsetzen», «! Ersatz prüfen», «✕ Nicht verwenden» (`.amp b::before`). Hintergründe stärker spreizen: `.r{background:#efc4bf}` (dunkler) und `.g{background:#e6f3e6}` (heller).
- **Gewicht:** hoch

## A4G-04 Leerraum unter den Textspalten, Fläche ungenutzt

- **Stelle:** `.blatt{grid-template-rows:auto auto 1fr auto auto auto}`, Zeile `.zwei`
- **Befund:** Die `1fr`-Zeile geht an `.zwei`. Darunter bleiben rund 12 bis 14 mm leer, bevor die Ampel kommt. Die beiden Spalten sind gleich hoch (je 6 Punkte, enden auf gleicher Höhe), das ist gut. Der Leerraum wirkt aber wie ein Loch zwischen Text und Ampel.
- **Vorschlag:** Den Platz für A4G-01 und A4G-02 verwenden. Danach `grid-template-rows:auto auto auto auto auto 1fr` setzen, damit ein allfälliger Rest über der Fusszeile landet, oder `.zwei{align-content:start}` lassen und den Rest mit `gap:5.5mm` gleichmässig verteilen.
- **Gewicht:** mittel

## A4G-05 Umbrüche in den Piktogramm-Texten

- **Stelle:** `.pgrid{grid-template-columns:repeat(4,1fr)}`, Textspalte rund 30 mm
- **Befund:** Vier Titel brechen um («Kleidung, Haare, / Schmuck», «Geschlossene / Schuhe», «Nicht essen und / trinken», «Maschinen nur nach / Einführung»). «ab 85 / dB(A)» wird getrennt. Die Beschreibungen laufen auf 4 Zeilen, was in der schmalen Spalte unruhig wirkt. Mit `align-items:center` stehen die Piktogramme dadurch auf verschiedenen Höhen.
- **Vorschlag:** Raster auf 2 Zeilen à 4 mit grösserem Bild beibehalten, aber Beschreibungen kürzen (je höchstens 2 Zeilen) oder Text unter das Bild setzen: `.p{grid-template-columns:1fr;justify-items:start}`. Mindestens `align-items:start` und geschütztes Leerzeichen `85&nbsp;dB(A)`. Titel ggf. kürzen: «Schmuck ab, Haare binden», «Feste Schuhe», «Nicht essen, nicht trinken».
- **Gewicht:** mittel

## A4G-06 Piktogramm «Wenig Staub» widerspricht dem Text

- **Stelle:** `('iso-M017.svg', 'Wenig Staub', 'absaugen oder lüften, Atemschutz erst, wenn das nicht reicht')`
- **Befund:** M017 heisst «Atemschutz benutzen». Das Zeichen sagt auf Distanz das Gegenteil der Aussage (Atemschutz erst als letzte Massnahme). Wer nur das Bild sieht, liest «Maske an».
- **Vorschlag:** Entweder Aussage an das Zeichen anpassen («Atemschutz bei Staub, wenn Absaugen nicht reicht») oder kein ISO-Zeichen verwenden und eine neutrale Grafik (Absaugung) ohne ISO-Rahmen setzen. ISO 7010 hat kein Zeichen für «absaugen».
- **Gewicht:** hoch

## A4G-07 Weitere Zeichenwahl: W001, M010, M008

- **Stelle:** `iso-W001.svg` «Maschinen nur nach Einführung», `iso-M010.svg` «Kleidung, Haare, Schmuck», `iso-M008.svg` «Geschlossene Schuhe»
- **Befund:** W001 (allgemeines Warnzeichen) sagt «Gefahr», nicht «Einführung nötig». Es fällt als einziges gelbes Dreieck aus der Reihe und zieht den Blick auf die schwächste Aussage. M010 zeigt einen Schutzanzug, gemeint ist eng anliegende Kleidung ohne Schmuck. M008 heisst «Fussschutz benutzen» (Sicherheitsschuhe), gemeint sind geschlossene Alltagsschuhe. P028 (keine Handschuhe), P022 (nicht essen und trinken), M003 und M004 sind passend.
- **Vorschlag:** Für «Maschinen nur nach Einführung» M002 «Anleitung beachten» oder M001 «Allgemeines Gebotszeichen» verwenden, damit die Reihe einheitlich Gebot/Verbot bleibt. M010 und M008 können bleiben, wenn der Text die Abweichung klärt (ist der Fall). Für «Schmuck ablegen» existiert ISO P031 nicht, darum nur Text.
- **Gewicht:** mittel

## A4G-08 Notfallrahmen in Schwarzweiss schwach, Notrufnummer gut

- **Stelle:** `.notfall{border:2px solid #b3261e}`, `.notfall h2{color:#b3261e}`, `.nr b.gross{font-size:22pt}`
- **Befund:** 2 px (rund 0,5 mm) Rot wird im Graustufendruck zu einer mittelgrauen Linie, die Überschrift zu Grau in normaler Grösse. Der Notfall ist dann nicht stärker betont als die grauen Flächen darüber. «112» mit 22 pt (Ziffernhöhe rund 7,5 mm) ist aus 2 bis 3 m lesbar, das ist richtig. «145» mit 13 pt nur aus etwa 1 m.
- **Vorschlag:** Kopfbalken invertieren, damit er auch schwarz druckt: `.notfall{border:1mm solid #b3261e}` und `.notfall h2{background:#b3261e;color:#fff;padding:1mm 2.5mm;border-radius:1mm;display:inline-block;font-size:13pt}`. `.nr b{font-size:16pt}` für 145, `.nr b.gross{font-size:28pt}`. Spalte dafür `grid-template-columns:50mm 1fr`.
- **Gewicht:** mittel

## A4G-09 QR-Code unter 2 cm und dicht

- **Stelle:** `.fuss img{width:19mm;height:19mm}`, URL mit 64 Zeichen, `border=0`
- **Befund:** 19 mm liegt knapp unter der Mindestgrösse. Die lange URL ergibt rund 33 bis 37 Module, also etwa 0,5 mm pro Modul. Auf Laserdruck geht das, auf Kopien vom Kopierer und bei Aushang hinter Folie wird es unsicher. Ohne Ruhezone (`border=0`) hängt die Erkennung zudem am Weissraum des Layouts. Beschriftung «Website» mit 6,5 pt sagt nicht, was man bekommt.
- **Vorschlag:** `.fuss img{width:25mm;height:25mm}` und im Python `border=2` (Ruhezone), wenn möglich kürzere URL (z. B. Verzeichnis-URL ohne Dateinamen), Fehlerkorrektur M belassen. Beschriftung `.fuss .qr{font-size:7.5pt}` mit «Alle Regeln mit Quellen».
- **Gewicht:** mittel

## A4G-10 Ampelzeile: GHS-Zeichen klein und doppelt, Titel ohne Tag

- **Stelle:** `.ghs img{width:8mm;height:8mm}`, `.ampel h2` «Stoffe: Etikette lesen»
- **Befund:** GHS06 und GHS08 stehen in Gelb und in Rot. Ohne Lesen des Textes wirkt das widersprüchlich, das Etikett allein entscheidet hier nicht. 8 mm reicht für Nahlesen. Die Abschnittsüberschrift hat als einzige keinen Tag und steht vertikal mittig neben den Feldern statt darüber, das bricht das Raster der anderen Abschnitte.
- **Vorschlag:** Überschrift wie die anderen über die Felder setzen: `.ampel{grid-template-columns:1fr 1fr 1fr}` und h2 mit `grid-column:1/-1;margin:0 0 2mm` plus `<span class="tag">alle</span>`. GHS-Zeichen auf `9mm` und im gelben Feld einen kurzen Hinweis «Kategorie auf dem Sicherheitsdatenblatt prüfen» oder die doppelten Zeichen im roten Feld weglassen.
- **Gewicht:** tief

---

Kontrast insgesamt in Ordnung: #111 und #333 auf Weiss sowie #555 im Kopf (etwa 7,5:1) erfüllen WCAG AA. Fusszeile mit 7 pt Grau ist für das Schulleitungsexemplar ausreichend.
