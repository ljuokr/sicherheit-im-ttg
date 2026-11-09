# Fachliche Prüfung A4-Blatt «Sicherheit im TTG auf einen Blick»

Geprüft: `a4/bau-a4.py` (Listen ALLE, LP, SCHULE, NOTFALL, Ampel im HTML-Text), `a4/vorschau.png`. Abgeglichen mit `review-2026-11-08/seite-text.md` (Seitentext aus `inhalt.html`) und den Quelltexten in `review-2026-11-08/quellen-txt/`. Stand 2026-11-08.

Alle «alt»-Wortlaute stehen in `a4/bau-a4.py` genau einmal.

## Geprüft und stimmig (kein Befund)

- **Augenspülzeiten** «bei Säuren mindestens 15, bei Laugen 20 Minuten, dann ärztlich untersuchen lassen»: deckt sich mit chemsuisse TTG S. 44 («mindestens fünfzehn Minuten für Säuren, mindestens zwanzig Minuten für Laugen», «rasche Nachbehandlung durch Arzt/Ärztin») und mit der Website (Unterricht, Im Notfall). Das Suva-Plakat in chemsuisse S. 45 nennt 10 Minuten, das strengere chemsuisse-Mass ist richtig gewählt.
- **Verbrennung** «mindestens 10 Minuten mit fliessendem Wasser kühlen»: wie Website («sofort mindestens zehn Minuten», Quelle Samariter).
- **145 Tox Info Suisse, bei Vergiftung oder Verätzung**: chemsuisse S. 42, Tabelle 5 («bei Vergiftungen, Verätzungen»).
- **Keine Handschuhe an drehenden Maschinen**: Suva 67036 Frage 14 «Handschuhverbot bei laufender Maschine», Hauptgefahr «Erfassung von Handschuhen, Kleidung, Haar, Schmuck durch rotierenden Bohrer oder Spindel». Die Verallgemeinerung auf drehende Maschinen steht gleich auf der Website (Schutzmassnahmen, Hände). Nicht schärfer als die Seite.
- **Kleidung, Haare, Schmuck**, **Nicht essen und trinken, Hände waschen**, **Wenig Staub, Atemschutz erst wenn nötig**: chemsuisse S. V («Kein Essen und Trinken in Fachräumen», «Waschen der Hände vor Pausen und am Ende des Unterrichts»), Suva 67036 Frage 14, Website.
- **bfu-Kategorien A, B, C**: Wortlaut nach bfu 4.301/4.302.
- **FI 30 mA, NIV alle 5 Jahre, Chemikalien-Ansprechperson**: wie Website (Fachraum, Pflichten und Empfehlungen).
- **Ampel rot** (explosiv, akut stark giftig, krebserzeugend, erbgutverändernd, fortpflanzungsgefährdend; GHS01, GHS06, GHS08): entspricht chemsuisse Tabelle 3, S. 34.

## A4F-01 Stromunfall: falsche Nummer und verkürzte Regel

- **Stelle:** NOTFALL, dritter Punkt.
- **Befund:** A4: «Person nicht berühren, zuerst Strom aus, dann 112.» Die Website sagt: «die Person nicht berühren, solange sie unter Spannung stehen könnte. Zuerst Stecker ziehen oder Sicherung ausschalten, dann 144. Danach immer ärztlich untersuchen lassen.» Zwei Darstellungen desselben mit verschiedener Nummer. Ausserdem fehlt «danach immer ärztlich untersuchen lassen», das bei Stromunfällen wegen verzögerter Herzrhythmusstörungen der wichtigste Satz für Laien ist.
- **Beleg:** Website, Unterricht, Im Notfall (Quelle Suva, Stromschlag). chemsuisse S. 42, Tabelle 5: «Sanitätsnotruf 144», «allgemeiner Notruf 112». Für einen medizinischen Notfall ist in der Schweiz 144 die direkte Nummer.
- **Vorschlag:**
  - alt: `'<b>Stromunfall:</b> Person nicht berühren, zuerst Strom aus, dann 112.'`
  - neu: `'<b>Stromunfall:</b> Person nicht berühren, zuerst Stecker ziehen oder Sicherung aus, dann 144. Danach immer ärztlich untersuchen lassen.'`
- **Gewicht:** hoch.

## A4F-02 Notrufnummern: 144 und 118 fehlen

- **Stelle:** Notfallkasten, Spalte mit den Nummern.
- **Befund:** Das Blatt nennt nur «112 Notruf» und «145». Im TTG sind Verletzungen (Sanität 144) und Brand (Feuerwehr 118) die häufigsten Notfälle. Die Website und chemsuisse führen beide. 112 funktioniert, wird aber je nach Kanton über die Polizei vermittelt, das kostet Zeit.
- **Beleg:** chemsuisse S. 42, Tabelle 5 (144, 118, 145, 117, 112). Website, Im Notfall, Tabelle «Notruf Nummer»; Brand: «118 anrufen», Starke Blutung: «144 wählen».
- **Vorschlag:**
  - alt: `<b class="gross">112</b><span>Notruf</span><b>145</b>`
  - neu: `<b class="gross">144</b><span>Sanität</span><b>118</b><span>Feuerwehr</span><b>112</b><span>allgemeiner Notruf</span><b>145</b>`
  - Platz: die Spalte ist 44 mm breit und hat unten Luft, zwei Zeilen à 13 pt passen.
- **Gewicht:** hoch.

## A4F-03 Leinöl: «nie in den normalen Kehricht» widerspricht chemsuisse

- **Stelle:** LP, sechster Punkt.
- **Befund:** A4: «ausgebreitet trocknen lassen, nie in den normalen Kehricht.» chemsuisse erlaubt genau das nach dem Trocknen: «Nur gut ausgewaschene und trockene Materialien mit vollständig ausgehärteten Rückständen können aufbewahrt oder mit dem Hauskehricht entsorgt werden.» Verboten ist der feuchte Lappen im Kehrichteimer. Der A4-Satz ist schärfer als die Quelle und in sich widersprüchlich (wohin dann mit dem getrockneten Lappen?). Die Website sagt korrekt «nie lose in den Abfalleimer».
- **Beleg:** chemsuisse TTG, Abschnitt 2.1.2 «Ölen von Holz», S. 7: Entsorgung «in einem zugeknoteten Plastikbeutel» oder «zum Trocknen aufhängen oder auf nicht brennbarer Unterlage ausbreiten (48 h)».
- **Vorschlag:**
  - alt: `ausgebreitet trocknen lassen, nie in den normalen Kehricht.`
  - neu: `nie feucht in den Abfalleimer, erst 48 Stunden ausgebreitet trocknen lassen.`
- **Gewicht:** mittel.

## A4F-04 100 Liter: falscher Schranktyp, 25-Liter-Regel fehlt

- **Stelle:** SCHULE, fünfter Punkt.
- **Befund:** A4: «höchstens 100 Liter brennbare Flüssigkeiten pro Fachraum im Sicherheitsschrank.» chemsuisse spricht für den Fachraum von «feuerhemmenden Schränken» mit nicht brennbarer Auffangwanne und Warnzeichen «Flamme». «Spezielle Sicherheitsschränke oder Lagerräume» verlangt chemsuisse erst «für Mengen ab 100 Liter». Das A4 vermischt die beiden Stufen und kann so gelesen werden, als brauche schon jede kleine Menge einen Sicherheitsschrank, oder als dürften 100 Liter irgendwo im Raum stehen. Die Grenze für die Arbeitsplätze (25 Liter, Gebinde bis 3 Liter) fehlt, sie ist für den Unterrichtsalltag die relevantere.
- **Beleg:** chemsuisse TTG, 3.3.2 «Brennbare Flüssigkeiten», S. 37. Website, Fachraum, Lagerung: «Pro Fachraum höchstens 100 Liter brennbare Flüssigkeiten, in feuerhemmenden Schränken … Ausserhalb der Schränke, an den Arbeitsplätzen, höchstens 25 Liter, in Gebinden bis 3 Liter.»
- **Vorschlag:**
  - alt: `'Gefährliche Stoffe abgeschlossen, höchstens 100 Liter brennbare Flüssigkeiten pro Fachraum im Sicherheitsschrank.'`
  - neu: `'Gefährliche Stoffe abgeschlossen. Brennbare Flüssigkeiten pro Fachraum höchstens 100 Liter im feuerhemmenden Schrank, an den Arbeitsplätzen höchstens 25 Liter.'`
- **Gewicht:** mittel.

## A4F-05 bfu-Checklisten: «jährlich» zu pauschal

- **Stelle:** SCHULE, sechster Punkt.
- **Befund:** A4: «Fachraum jährlich mit den bfu-Checklisten 4.323 prüfen, Notfallblatt halbjährlich.» bfu 4.323 hinterlegt pro Frage ein eigenes Intervall, von der täglichen Sichtkontrolle (z. B. Notausgänge, Zirkulationswege) über jährlich bis «alle 2–3 Jahre» und situativ. Die Website sagt darum «je Punkt, von täglich bis alle paar Jahre». Das A4 ist für die täglichen Punkte weicher, für die mehrjährigen schärfer und widerspricht der Seite. «Notfallblatt halbjährlich» stimmt (bfu 4.323, Abschnitt 6: «Halbjährlich … z. B. 2 × pro Jahr»).
- **Beleg:** bfu 4.323, S. 3 «Prüfintervall»: «tägliche Sichtkontrolle, eine monatliche, halbjährliche oder jährliche Überprüfung … oder situativ … Eine Empfehlung pro Frage ist jeweils hinterlegt.» Website, Recht, Pflichten und Empfehlungen: «Fachräume mit den bfu-Checklisten prüfen | Empfehlung bfu | je Punkt, von täglich bis alle paar Jahre».
- **Vorschlag:**
  - alt: `'Fachraum jährlich mit den bfu-Checklisten 4.323 prüfen, Notfallblatt halbjährlich.'`
  - neu: `'Fachraum mit den bfu-Checklisten 4.323 prüfen, je Punkt im dort empfohlenen Intervall, Notfallblatt halbjährlich.'`
- **Gewicht:** mittel.

## A4F-06 Ampel gelb: kürzer als die Website, GHS09 fehlt

- **Stelle:** Ampel, gelbes Feld (Text und `gelb=ghs(...)`).
- **Befund:** A4: «ätzend, hautsensibilisierend, giftig, extrem entzündbar, Verdacht auf Krebs» mit GHS05, 07, 06, 02, 08. Die Website führt im selben Feld zusätzlich «Verdacht auf … Erbgut- oder Fortpflanzungsschäden, organschädigend, atemwegssensibilisierend» und «sehr giftig für Wasserorganismen» und zeigt dazu GHS09. Auf dem A4 fehlen damit H334 (atemwegssensibilisierend, etwa Isocyanate), H370/H372 und H400/H410, und ein Produkt mit GHS09 lässt sich keinem Feld zuordnen. Zudem steht «giftig» ohne «Kategorie 3», während rot «akut stark giftig» sagt: der Totenkopf steht in beiden Feldern ohne Unterscheidungsmerkmal.
- **Beleg:** chemsuisse TTG, Tabelle 4, S. 35 (u. a. H334, H341, H361, H370, H372, H400, H410). Website, Verfahren und Material, Stoffe auswählen.
- **Vorschlag:**
  - alt: `ätzend, hautsensibilisierend, giftig, extrem entzündbar, Verdacht auf Krebs%(gelb)s`
  - neu: `ätzend, sensibilisierend, giftig (Kat. 3), extrem entzündbar, organschädigend, Verdacht auf Krebs, Erbgut- oder Fortpflanzungsschäden, sehr giftig für Wasserorganismen%(gelb)s`
  - und in der `ghs`-Zeile für gelb `'ghs09-pollu.svg'` anhängen.
  - Im roten Feld analog: alt `<b>Nicht verwenden</b>explosiv, akut stark giftig,` neu `<b>Nicht verwenden</b>explosiv, akut stark giftig (Kat. 1 und 2),`
- **Gewicht:** mittel.

## A4F-07 Ampel: Piktogramm allein entscheidet nicht, auch nicht «ohne Piktogramm»

- **Stelle:** Ampel, Titel und grünes Feld.
- **Befund:** Das Blatt legt nahe, die Einstufung lasse sich am Piktogramm ablesen. Flamme (GHS02) und Ausrufezeichen (GHS07) stehen aber auch auf Produkten, die nicht ins gelbe Feld gehören, etwa Brennsprit (H225) oder bloss reizende Stoffe. Die Website hält das ausdrücklich fest («Dasselbe Piktogramm kann für verschiedene Stufen stehen … Entscheidend sind die H-Sätze») und nennt für Brennsprit einen eigenen Weg («nach Etikette und Sicherheitsdatenblatt verwenden und lagern»). Grün «Einsetzen ohne Gefahrenpiktogramm» ist weicher als chemsuisse: «Auch Chemikalien ohne Gefahrenpiktogramm können gefährliche Eigenschaften aufweisen und erfordern einen sorgfältigen Umgang.»
- **Beleg:** chemsuisse TTG, Anhang C, S. 66: «Das Gefahrenpiktogramm macht nur summarische Aussagen. Zur genaueren Information sind immer die einzelnen Gefahrenhinweise (H-Sätze) … zu lesen». Website, Stoffe auswählen, Satz unter der Ampel.
- **Vorschlag:**
  - alt: `<section class="ampel"><h2>Stoffe:<br>Etikette lesen</h2>`
  - neu: `<section class="ampel"><h2>Stoffe:<br>Etikette und H-Sätze lesen</h2>`
  - alt: `<b>Einsetzen</b>ohne Gefahrenpiktogramm, z. B. Weissleim, Acryl- und Dispersionsfarben`
  - neu: `<b>Einsetzen</b>ohne Gefahrenpiktogramm, z. B. Weissleim, Acryl- und Dispersionsfarben. Hinweise auf der Etikette trotzdem beachten.`
- **Gewicht:** mittel.

## A4F-08 Schutzbrille «an Maschinen»: schärfer als die Quelle

- **Stelle:** ALLE, Schutzbrille.
- **Befund:** A4: «an Maschinen und bei Spritzern, an der Bohrmaschine immer». «An Maschinen» umfasst auch Nähmaschine, Laminiergerät oder Stickcomputer, für die keine Quelle eine Schutzbrille verlangt. Die Website sagt: «bei Gefahr für die Augen, etwa am Brenner oder an schnell laufenden Maschinen, an der Bohrmaschine immer. Bei Splittern oder Spritzern auch für alle im Gefahrenbereich.» Eine Regel, die im Raum sichtbar nicht eingehalten wird (Nähmaschine ohne Brille), schwächt die übrigen.
- **Beleg:** Website, Schutzmassnahmen, Augen. Suva 67036 Frage 14 «Schutzbrille tragen obligatorisch» (Bohrmaschine).
- **Vorschlag:**
  - alt: `'an Maschinen und bei Spritzern, an der Bohrmaschine immer'`
  - neu: `'bei Spänen, Splittern und Spritzern, an der Bohrmaschine immer'`
- **Gewicht:** niedrig.

## A4F-09 Gehörschutz 85 dB(A): stimmt, Bezugsgrösse unscharf (Frage)

- **Stelle:** ALLE, Gehörschutz.
- **Befund:** A4: «an lauten Maschinen, ab 85 dB(A) verlangt ihn die Suva». Wortgleich mit der Website («Ab einem Schallpegel von 85 dB(A) verlangt die Suva Gehörschutz»), also kein Widerspruch. Die Suva-Grenze bezieht sich nach meinem Kenntnisstand auf den Lärmexpositionspegel über den Arbeitstag (LEX), nicht auf den momentanen Pegel einer Maschine, und gilt als Arbeitgeberpflicht für Beschäftigte. Das liegt in den Quelltexten nicht vor (Suva-Seite «Gehörschutz» nur verlinkt), darum nur als Frage: Soll das A4 die Zahl weglassen und bei «an lauten Maschinen» bleiben? Für Lehrpersonen ist die Zahl ohne Messgerät ohnehin nicht anwendbar.
- **Beleg:** Website, Schutzmassnahmen, Gehör. Kein Quelltext in `quellen-txt/`.
- **Vorschlag (falls gewünscht):**
  - alt: `'an lauten Maschinen, ab 85 dB(A) verlangt ihn die Suva'`
  - neu: `'an lauten Maschinen, technischer Lärmschutz hat Vorrang'`
- **Gewicht:** niedrig.

## A4F-10 Ergänzung: Schutzeinrichtungen nie entfernen, Defekte melden

- **Stelle:** ALLE (Piktogrammraster).
- **Befund:** Für alle an der Maschine fehlt die Regel, die nach Suva am häufigsten zu schweren Unfällen führt: Schutzhauben und Anschläge nicht entfernen, nicht hintergreifen, Defekte sofort melden. Die Website führt sie (Fachraum, Warten und prüfen).
- **Beleg:** Suva 67036 Frage 13/15: «Die Schutzeinrichtungen dürfen niemals ausser Funktion gesetzt werden», «Schutzeinrichtungen niemals hintergreifen». Website: «Manipulierte Schutzeinrichtungen führen oft zu schweren Unfällen» (Suva 67146), «Defekte Maschinen rechtzeitig erkennen, kennzeichnen».
- **Vorschlag:** Den Punkt «Maschinen nur nach Einführung» erweitern, statt ein neuntes Feld anzulegen:
  - alt: `'Maschinen nur nach Einführung', 'und mit Freigabe der Lehrperson'`
  - neu: `'Maschinen nur nach Einführung', 'mit Freigabe der Lehrperson, Schutzhauben nie entfernen, Defekte sofort melden'`
- **Was weichen könnte:** LP, vierter Punkt «Über Schlüsselschalter und Not-Aus Maschinen freigeben und zentral stoppen.» doppelt sich mit SCHULE, zweiter Punkt (Schlüsselschalter, Not-Aus) und mit «Freigabe der Lehrperson» in ALLE. Er könnte entfallen.
- **Gewicht:** mittel.

## A4F-11 Ergänzung: Originalgebinde, nie Getränkeflaschen

- **Stelle:** LP (oder Ampel).
- **Befund:** Das Blatt sagt nichts zum Umfüllen. Verwechslung mit Getränken ist bei Kindern das typische Vergiftungsszenario und betrifft alle im Raum. chemsuisse und Website führen die Regel.
- **Beleg:** chemsuisse TTG, 3.3.1, S. 36: «im Originalgebinde aufzubewahren … keine Lebensmittelgebinde wie Getränkeflaschen, Konfitürengläser …». Website, Lagerung: «Nie Getränkeflaschen, Konfitürengläser oder Konservendosen verwenden, sondern Originalgebinde.»
- **Vorschlag:**
  - alt: `'Gefährliche Stoffe nie unbeaufsichtigt stehen lassen, auch nicht in der Pause.'`
  - neu: `'Gefährliche Stoffe nie unbeaufsichtigt stehen lassen, auch nicht in der Pause. Nur im Originalgebinde, nie in Getränkeflaschen umfüllen.'`
- **Was weichen könnte:** wie A4F-10 der LP-Punkt zu Schlüsselschalter und Not-Aus. Laut `a4-gestaltung.md` (A4G-04) ist unter den Textspalten ohnehin Leerraum.
- **Gewicht:** mittel.

## A4F-12 Piktogramm M008 zeigt Sicherheitsschuhe, Text sagt geschlossene Schuhe

- **Stelle:** ALLE, Geschlossene Schuhe (`iso-M008.svg`).
- **Befund:** ISO 7010 M008 bedeutet «Fussschutz benutzen», also Sicherheitsschuhe. Die Quellen verlangen im TTG geschlossene Schuhe, keine Sicherheitsschuhe (Website: «Geschlossene Schuhe, auch für Lehrpersonen»). Wer das Blatt aus Distanz liest, sieht nur das Zeichen und versteht es schärfer als gemeint. Kein Wortlautproblem, aber eine Unschärfe zwischen Zeichen und Regel.
- **Beleg:** ISO 7010 M008 «Wear safety footwear». Website, Schutzmassnahmen, Körper und Füsse.
- **Vorschlag:** Text so lassen, das Zeichen bewusst behalten (es gibt kein ISO-Zeichen für «geschlossene Schuhe») oder in der Fusszeile ergänzen:
  - alt: `ausgenommen die Piktogramme nach ISO 7010 und GHS.`
  - neu: `ausgenommen die Piktogramme nach ISO 7010 und GHS. Die Piktogramme stehen sinngemäss, massgebend ist der Text.`
- **Gewicht:** niedrig.
