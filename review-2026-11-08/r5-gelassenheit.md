# R5 · Schlussprüfung Gelassenheit (2026-11-09)

Grundlage: `seite-text.md` (Stand 2026-11-08), `inhalt.html`, `bau/bau.py`, `a4/bau-a4.py`, Quelltexte in `quellen-txt/`. Alle «alt»-Wortlaute mit `grep -c -F` geprüft, sie kommen in der genannten Datei genau einmal vor.

## Gesamteinschätzung

Eine junge Lehrperson erlebt die Seite insgesamt als sachlich und gut gestützt. Die Leads von Matrix, Unterricht, Fachraum und Recht sind ermutigend («Für die meisten Vorhaben genügen gut gewählte Materialien und ein paar einfache Regeln», «Wer sorgfältig einführt, beaufsichtigt und festhält, handelt richtig»). Die Drohkulisse entsteht vor allem im Register Recht, wo Strafrecht, «tötet» und ein tödlicher Unfall dreimal hintereinander vorkommen, und an einigen Stellen, an denen die Gefahr ohne Einordnung steht und der Satz fehlt, wozu Sicherheit im TTG gut ist. Das A4-Blatt hat nur Regeln und kein einladendes Wort.

Nicht erneut vorgeschlagen: Einstieg und drei Fragen (g10 G1-04, G1-05, G1-08, G1-09), Warnpunkt-Logik (r8 K08).

---

### GE-01 · Haftung, Kopfzeile im Register Recht
- **Zitat:** «in der Regel haftet der Schulträger, bestraft werden kann, wer fahrlässig jemanden verletzt oder tötet»
- **Warum zu dramatisch:** Die Kopfzeile ist das, was man beim Überfliegen liest, ohne aufzuklappen. Sie endet mit «tötet». Die beruhigende Kernaussage der Karte (Rückgriff auf die Lehrperson nur bei grober Pflichtverletzung) fehlt, die Strafdrohung steht dafür im Vordergrund.
- **Vorschlag:** Datei `bau/bau.py`
  - alt: `'Haftung': 'in der Regel haftet der Schulträger, bestraft werden kann, wer fahrlässig jemanden verletzt oder tötet',`
  - neu: `'Haftung': 'in der Regel haftet der Schulträger, Rückgriff auf die Lehrperson meist nur bei grober Pflichtverletzung, Strafrecht getrennt',`
- **Beleg:** Haftungstext auf der Seite selbst (inhalt.html, Absatz «Verursacht eine Lehrperson …», «kann er nach dem kantonalen Recht meist nur bei grober Pflichtverletzung nehmen»), bfu Rechtsfrage.
- **Gewicht:** hoch. Hinweis: die heutige Fassung kommt aus BAU-01 dieser Runde, darum Lukas fragen.

### GE-02 · Sorgfalts- und Obhutspflicht, Punkt 1
- **Zitat:** «Wer sie verletzt, kann strafrechtlich verantwortlich werden.»
- **Warum zu dramatisch:** Der erste Punkt zur Obhutspflicht endet mit einer Strafdrohung, ohne zu sagen, wann. Das Strafrecht steht zwei Karten weiter unter Haftung genauer und eingeordnet. Hier wirkt der Satz als Drohung vor der eigentlichen Erklärung. entscheid-text.md (Bemerkung 1, Frage 5) nennt den Satz schon als verkürzt.
- **Vorschlag:** Datei `inhalt.html`
  - alt: ` Wer sie verletzt, kann strafrechtlich verantwortlich werden.`
  - neu: ` Was eine Verletzung rechtlich bedeutet, steht unter <a href="#haftung">Haftung</a>.` (oder ersatzlos streichen, Anker vor der Umsetzung prüfen)
- **Beleg:** keine neue Aussage, Verweis auf bestehenden Text.
- **Gewicht:** hoch.

### GE-03 · Recht, Lead: Einordnung «Verantwortung gross, Risiko klein»
- **Zitat:** «Wer sorgfältig einführt, beaufsichtigt und festhält, handelt richtig.»
- **Warum:** Der Lead ist gut, aber danach folgen Strafrecht, fahrlässige Tötung und ein Bundesgerichtsfall. Es fehlt die Einordnung, dass Verfahren gegen Lehrpersonen selten sind. Lukas nennt dafür den LCH-Leitfaden.
- **Vorschlag:** Datei `bau/bau.py`
  - alt: `Wer sorgfältig einführt, beaufsichtigt und festhält, handelt richtig.</p>`
  - neu: `Wer sorgfältig einführt, beaufsichtigt und festhält, handelt richtig. Der Leitfaden des LCH fasst es so zusammen: «Die Verantwortung ist gross, das Risiko klein.»</p>`
- **Beleg:** Merker, Sturm, Meyer (2025), Rechtliche Verantwortlichkeit von Lehrpersonen, LCH. Wortlaut und Seite liegen lokal nicht vor (kein Treffer in KI/), müssen vor der Umsetzung im Leitfaden geprüft und in die Quellen aufgenommen werden.
- **Gewicht:** hoch, aber Beleg offen, darum Lukas fragen.

### GE-04 · Haftung, Strafrecht-Absatz
- **Zitat:** «Einfache fahrlässige Körperverletzung wird nur auf Antrag verfolgt (StGB Art. 125 Abs. 1), schwere von Amtes wegen. Dazu können disziplinarische Massnahmen nach Personalrecht kommen, etwa ein Verweis.»
- **Warum zu dramatisch:** Nach «verletzt oder getötet» und «Fahrlässige Tötung … sind strafbar» folgen Verfahrensdetails und ein weiteres Sanktionsmittel. Für Lehrpersonen ohne Nutzen im Alltag, verstärkt aber die Drohkulisse. Lieber streichen als ergänzen.
- **Vorschlag:** Datei `inhalt.html`
  - alt: ` Einfache fahrlässige Körperverletzung wird nur auf Antrag verfolgt (StGB Art. 125 Abs. 1), schwere von Amtes wegen. Dazu können disziplinarische Massnahmen nach Personalrecht kommen, etwa ein Verweis.`
  - neu: `` (leer, beide Sätze streichen)
- **Beleg:** keine neue Aussage.
- **Gewicht:** mittel. Hinweis: in Runde 3 auf Wunsch «Recht präzisieren» (h10, Punkt 5) aufgenommen, darum Lukas fragen.

### GE-05 · Bundesgerichtsfall im Text
- **Zitat:** «so das Bundesgericht in einem Urteil vom 26. September 1996 zu einer Bergwanderung im Klassenlager, bei der ein Schüler tödlich verunglückte»
- **Warum zu dramatisch:** Der Fall betrifft keine TTG-Lektion, sondern eine Bergwanderung. Im Fliesstext zur Aufsicht im Fachraum steht so ein tödlicher Unfall ohne Bezug zum Fach. Das Popup (Glossar BGE 122 IV 303) erzählt den Fall ohnehin.
- **Vorschlag:** Datei `inhalt.html`
  - alt: `so das Bundesgericht in einem Urteil vom 26. September 1996 zu einer Bergwanderung im Klassenlager, bei der ein Schüler tödlich verunglückte`
  - neu: `so das Bundesgericht in einem Urteil vom 26. September 1996 zu einer Bergwanderung im Klassenlager`
  - Vor der Umsetzung prüfen, ob «Bundesgericht in einem Urteil vom 26. September 1996» als data-wort des Popups unverändert bleibt (bleibt es).
- **Beleg:** BGE 122 IV 303, Glossar bleibt unverändert.
- **Gewicht:** mittel. Hinweis: Zusatz stammt aus g10 B67, darum Lukas fragen.

### GE-06 · Unterricht, Lead: wozu Sicherheit gut ist
- **Zitat:** «Schon im Zyklus 1 lernen die Schülerinnen und Schüler, auf die Arbeitssicherheit zu achten, und übernehmen mit jeder Einführung mehr Verantwortung.»
- **Warum:** Der Lead sagt schon, dass Sicherheit Lerninhalt ist. Es fehlt der eine Satz, warum sich das lohnt, und den sagen bfu und chemsuisse beide ausdrücklich. Er stärkt die Haltung «Sicherheit lernen statt Erfahrungen verhindern».
- **Vorschlag:** Datei `bau/bau.py`
  - alt: `und übernehmen mit jeder Einführung mehr Verantwortung.</p>`
  - neu: `und übernehmen mit jeder Einführung mehr Verantwortung. Was sie dabei lernen, nützt ihnen auch beim Gestalten und Heimwerken in der Freizeit.</p>`
- **Beleg:** bfu 4.302, S. 4 («damit die erworbene sichere Arbeitsweise auch beim späteren Heimwerken angewendet wird»), chemsuisse, S. 1 (Vorwort, «auch beim Gestalten und Heimwerken in der Freizeit»).
- **Gewicht:** hoch.

### GE-07 · Staub beim Sägen, Bohren und Schleifen, Einleitung
- **Zitat:** «Feinstaub von Eichen- und Buchenholz ist krebserzeugend.»
- **Warum zu dramatisch:** Steht absolut und ohne Einordnung als erster Satz. chemsuisse ordnet ein: das Risiko betrifft vor allem, wer häufig solchen Staub einatmet, Lungenerkrankungen sind selten. Die Seite sagt an anderer Stelle selbst «gilt als krebserzeugend» (Regeln für die Klasse), hier also auch schärfer als dort.
- **Vorschlag:** Datei `inhalt.html`
  - alt: `Feinstaub von Eichen- und Buchenholz ist krebserzeugend.`
  - neu: `Feinstaub von Eichen- und Buchenholz gilt als krebserzeugend, ein erhöhtes Risiko hat, wer solchen Staub häufig einatmet.`
- **Beleg:** chemsuisse, S. 6 («Wer häufig solche Holzstäube über die Atemwege aufnimmt, hat ein erhöhtes Risiko …», «Erkrankungen der Lungen oder der Bronchien sind selten»).
- **Gewicht:** hoch.

### GE-08 · Maschinen, Lead: was Klassen dürfen
- **Zitat:** «Das bfu-Plakat teilt jede Maschine ein: A selbstständig nach Einführung, B unter Aufsicht der Lehrperson, C nur für Lehrpersonen.»
- **Warum:** Wer die Tabellen sieht, sieht viele C. Dabei können Schülerinnen und Schüler im Zyklus 3 die grosse Mehrheit der Plakat-Maschinen benützen. Ein Satz mit der Zahl zeigt, was möglich ist, ohne neue Regel.
- **Vorschlag:** Datei `bau/bau.py`
  - alt: ` Eine Maschine antippen öffnet ihre Karte mit Hinweisen, Checkliste und Lernvideo.</p>`
  - neu: ` Im Zyklus 3 können die Schülerinnen und Schüler 37 der 47 Maschinen auf dem Plakat benützen, 21 davon nach der Einführung selbstständig. Eine Maschine antippen öffnet ihre Karte mit Hinweisen, Checkliste und Lernvideo.</p>`
- **Beleg:** bfu-Plakat 4.301, gezählt nach den Tabellen der Seite: 21 A, 16 B, 10 C in Zyklus 3 (Zyklus 2: 11 A, 10 B). Zahl bei der Umsetzung nachzählen und bei Plakatänderungen mitführen.
- **Gewicht:** mittel.

### GE-09 · Gesundheitsschutz bei Mutterschaft, Einordnung
- **Zitat:** «… gelten für Mutter und Kind als besonders gefährlich (Verordnung …, SR 822.111.52).»
- **Warum:** Die Karte liest sich, als seien solche Stoffe im TTG-Alltag verbreitet. Die stärksten davon schliesst die Seite unter Stoffe auswählen ohnehin aus. Ein Halbsatz ordnet ein, ohne die Pflicht zu verwässern.
- **Vorschlag:** Datei `inhalt.html`
  - alt: `SR 822.111.52). Für Arbeitsplätze`
  - neu: `SR 822.111.52). Produkte mit H340, H350 und H360 setzt die Schule ohnehin nicht ein, siehe <a href="#einkauf">Stoffe auswählen</a>. Für Arbeitsplätze`
- **Beleg:** chemsuisse, S. 34 (Ampel «Nicht verwenden», auf der Seite unter Stoffe auswählen).
- **Gewicht:** mittel.

### GE-10 · A4-Blatt, Kopf
- **Zitat:** «Das Wichtigste für Schülerinnen und Schüler, Lehrpersonen und Schulleitung»
- **Warum:** Das Blatt besteht nur aus Geboten, Verboten und Notfall, mit rotem Kasten. Für den Aushang fehlt ein einziger einladender Satz.
- **Vorschlag:** Datei `a4/bau-a4.py`
  - alt: `<p>Das Wichtigste für Schülerinnen und Schüler, Lehrpersonen und Schulleitung</p>`
  - neu: `<p>Sicher arbeiten lernen gehört zum TTG. Das Wichtigste für Schülerinnen und Schüler, Lehrpersonen und Schulleitung</p>`
- **Beleg:** Lehrplan 21, TTG.2.E.1 («auf die Arbeitssicherheit achten»), bfu 4.302, S. 4.
- **Gewicht:** mittel. Platz im Kopf bei der Umsetzung prüfen.

### GE-11 · A4-Blatt, Leinöl strenger als die Seite
- **Zitat:** «Mit Leinöl getränkte Lappen können sich selbst entzünden: nie lose in den Abfalleimer, zuerst 48 Stunden ausgebreitet trocknen lassen.»
- **Warum zu dramatisch:** Gefahr und «nie» zuerst, und das A4 lässt die einfache Alternative weg, die Seite und chemsuisse nennen (zugeknoteter Plastikbeutel). Damit ist die Kurzfassung strenger als die Regel.
- **Vorschlag:** Datei `a4/bau-a4.py`
  - alt: `'Mit Leinöl getränkte Lappen können sich selbst entzünden: nie lose in den Abfalleimer, zuerst 48 Stunden ausgebreitet trocknen lassen.',`
  - neu: `'Mit Leinöl getränkte Lappen 48 Stunden ausgebreitet trocknen lassen oder zugeknotet im Plastikbeutel in den Kehricht geben, lose im Abfalleimer können sie sich selbst entzünden.',`
- **Beleg:** chemsuisse, S. 7, Thema Leinöl auf der Seite («Alternativ in einem zugeknoteten Plastikbeutel in den Kehricht geben»).
- **Gewicht:** mittel.

### GE-12 · Flusssäure, Warum-Satz beim Glasätzen
- **Zitat:** «eine handflächengrosse Verätzung mit 40%iger Flusssäure gilt als tödlich»
- **Warum zu dramatisch:** Der Stoff ist an dieser Stelle schon ausgeschlossen («eignet sich darum nicht für die Schule»). Das Todesbeispiel begründet nichts zusätzlich, es erschreckt nur.
- **Vorschlag:** Datei `inhalt.html`
  - alt: `, eine handflächengrosse Verätzung mit 40%iger Flusssäure gilt als tödlich`
  - neu: `` (leer, Halbsatz streichen)
- **Beleg:** chemsuisse, S. 21, der verbleibende Warum-Satz bleibt wörtlich belegt.
- **Gewicht:** mittel.

### GE-13 · A4-Blatt, doppeltes «nie»
- **Zitat:** «Gefährliche Stoffe nie unbeaufsichtigt stehen lassen, auch nicht in der Pause, und nie in Getränkeflaschen umfüllen.»
- **Warum zu dramatisch:** Zweimal «nie» in einem Satz, die Seite selbst sagt «nicht unbeaufsichtigt».
- **Vorschlag:** Datei `a4/bau-a4.py`
  - alt: `'Gefährliche Stoffe nie unbeaufsichtigt stehen lassen, auch nicht in der Pause, und nie in Getränkeflaschen umfüllen.',`
  - neu: `'Gefährliche Stoffe nicht unbeaufsichtigt stehen lassen, auch nicht in der Pause, und im Originalgebinde lassen, nicht in Getränkeflaschen umfüllen.',`
- **Beleg:** chemsuisse, S. 36, 39 (Regeln für die Klasse, Lagerung).
- **Gewicht:** niedrig.

### GE-14 · Lösungsmittel, Verschlucken
- **Zitat:** «Kein Erbrechen herbeiführen, es besteht Lebensgefahr durch Aspiration.»
- **Warum zu dramatisch:** Die Begründung ist richtig, aber als Schreckwort. Erklärend wirkt sie ruhiger und ist verständlicher, das Glossar Aspirationsgefahr erklärt den Rest.
- **Vorschlag:** Datei `inhalt.html`
  - alt: `Kein Erbrechen herbeiführen, es besteht Lebensgefahr durch Aspiration.`
  - neu: `Kein Erbrechen herbeiführen, sonst kann die Flüssigkeit in die Lunge gelangen (Aspiration).`
- **Beleg:** chemsuisse, S. 24, 25.
- **Gewicht:** niedrig.

### GE-15 · Ständerbohrmaschine, «Handschuhverbot»
- **Zitat:** «Handschuhverbot bei laufender Maschine.»
- **Warum:** Das Substantiv «Verbot» klingt nach Vorschrift von oben. Die Seite sagt dasselbe unter Hände ruhiger («Keine Handschuhe an drehenden Maschinen»).
- **Vorschlag:** Datei `inhalt.html`
  - alt: `Handschuhverbot bei laufender Maschine.`
  - neu: `Keine Handschuhe bei laufender Maschine.`
  - dazu Datei `bau/bau.py` (VERBOTE-Präfix), alt: `"Handschuhverbot",` neu: `"Keine Handschuhe bei laufender",`
- **Beleg:** Suva, Schutzhandschuhe, Suva 67036. Inhalt unverändert.
- **Gewicht:** niedrig.

### GE-16 · Lagerung, «Nie Getränkeflaschen»
- **Zitat:** «Nie Getränkeflaschen, Konfitürengläser oder Konservendosen verwenden, sondern Originalgebinde.»
- **Warum:** Beginnt mit «Nie», die eigentliche Regel (Originalgebinde) kommt erst am Schluss. Positiv zuerst ist leichter zu merken.
- **Vorschlag:** Datei `inhalt.html`
  - alt: `Nie Getränkeflaschen, Konfitürengläser oder Konservendosen verwenden, sondern Originalgebinde.`
  - neu: `Gefährliche Stoffe in Originalgebinden aufbewahren, nicht in Getränkeflaschen, Konfitürengläsern oder Konservendosen.`
  - dazu Datei `bau/bau.py` (VERBOTE-Präfix), alt: `"Nie Getränkeflaschen",` neu: `"Gefährliche Stoffe in Originalgebinden",`
- **Beleg:** chemsuisse, S. 36. Inhalt unverändert.
- **Gewicht:** niedrig.

### GE-17 · A4-Blatt, Stromunfall: 112 statt 144
- **Zitat:** A4 «dann 112», Seite «dann 144»
- **Warum:** Kein Ton-Befund, aber eine Abweichung zwischen Blatt und Seite. Beide Nummern funktionieren, im Ernstfall verunsichert die Abweichung.
- **Vorschlag:** keine Textänderung zwingend. Falls angleichen: Datei `a4/bau-a4.py`, alt: `dann 112. Danach immer` neu: `dann 144. Danach immer` (dann 144 auch im Nummernblock des Blatts nötig), oder auf der Seite bei 144 bleiben und das A4 bewusst nur mit 112 lassen.
- **Beleg:** Suva, Stromschlag (auf der Seite verlinkt).
- **Gewicht:** niedrig, Lukas fragen.
