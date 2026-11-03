# Review Informationsarchitektur «Sicherheit im TTG»

Stand 2026-10-26, Rahmen design-critique, Fokus Struktur, Navigation, Scanbarkeit, Länge.

## 1) Urteil zum Versprechen

Das Versprechen «Einstieg, um die Originale zu finden» ist weitgehend eingelöst: Fast jeder Block endet mit einem direkten PDF-Link samt Seitenangabe (rund 50 chemsuisse- und 40 bfu-Verweise), und das Register Quellen bündelt die Dokumente. «Zusammenfassung der Merkblätter von chemsuisse, bfu, Suva und Kantonen» stimmt nur teilweise. Verfahren, Material, Fachraum und Notfall sind echte, verdichtete Regelauszüge, Recht und Kantonale Vorgaben sind dagegen eine Recherche-Sammlung (Gesetze, Lehrplan, Lehrbuch «Technik und Design», Wyss). Suva ist mit genau einem Dokument vertreten und steht im Randkasten trotzdem gleichrangig neben bfu und chemsuisse. Die grösste Lücke ist nicht der Inhalt, sondern die Suche, die nur Verfahren durchsucht.

## 2) Befunde, priorisiert

1. **Suche deckt nur Verfahren ab** (app.js `render()`, nur `verfahren` und `.thema`). «Feuerlöscher», «Entsorgung», «Haftung», «Augendusche» oder «bfu 4.323» finden nichts oder nur Themen, die die Quelle zitieren. Das Feld heisst sichtbar nur «Suchen», Novizinnen erwarten die ganze Seite. Vorschlag: Fachraum, Notfall, Recht, Quellen und Begriffe als Treffer einbeziehen (mindestens h2/h3 mit Link), sonst Platzhalter «Maschine oder Verfahren suchen».

2. **Randkasten verlinkt die Originale nicht** (Grundlage, `#geltung`). Er verspricht «Einstieg, um die Originale zu finden», verlinkt aber nur auf Rechtlicher Rahmen. Vorschlag: «Alle Originale unter Quellen» als Link ergänzen.

3. **Herausgeber-Gewichtung im Randkasten stimmt nicht** (Grundlage). Suva: nur Checkliste 67036. Kantone: v. a. Bern, Zürich, Aargau, Zug, Luzern. Zudem stammen Inhalte aus Gesetzen, Lehrplan 21 und Fachliteratur. Vorschlag: Formulierung präzisieren, etwa «vor allem bfu und chemsuisse, ergänzt um Suva, kantonale Merkblätter und Gesetze».

4. **Kantonale Abweichungen fehlen beim Plakat** (Verfahren, `#plakat`). Zürich hat eine eigene Maschinenliste in vier Gruppen, Luzern ebenfalls. Wer «Darf meine 5. Klasse die Stichsäge?» am Plakat beantwortet, erfährt das nicht. Vorschlag: ein Satz unter dem Plakat «Einzelne Kantone teilen anders ein, siehe Kantonale Vorgaben».

5. **Zyklus-Klassen-Zuordnung versteckt** (Plakat-Legende). «5. Klasse = Zyklus 2» steht nur in der Begriffskarte Zyklus (Register Quellen). Vorschlag: in der Plakat-Legende bzw. Spaltenköpfen «Zyklus 2 (3.-6. Kl.)».

6. **Aufsicht an drei Orten verteilt**: Definition B «Lehrperson im Fachraum anwesend» in Verfahren (`#aufsicht`), «wie viel Aufsicht» in Recht, Instruktionsstellen in Unterricht. Vorschlag: kein Umbau, aber in Unterricht/«Sicher unterrichten» einen Querverweis auf `#aufsicht` ergänzen, damit die A/B/C-Bedeutung von dort erreichbar ist.

7. **Erschliessungshandeln doppelt** (Grundlage-Einleitung und Unterricht `#erschliessen`). Das Register Unterricht beginnt mit Didaktik-Theorie statt mit dem, was Novizinnen dort suchen. Vorschlag: in Unterricht «Sicher unterrichten» und «Instruktion und Aufsicht» nach vorn, Erschliessungshandeln und Lehrplan danach.

8. **Quellen-Register beschreibt die Dokumente nicht nach Nutzen**. Die Titel sind vollständig, aber es fehlt pro Dokument eine Zeile «Worum es geht / hier verwendet in: Verfahren, Fachraum». Vorschlag: je eine kurze Zeile, damit das Register als Wegweiser zu den Originalen dient. Optional `#page=`-Anker in den bfu-Links (Achtung: PDF-Seite und gedruckte Seite können abweichen, chemsuisse lädt herunter).

## 3) Was gut funktioniert

- Quellenlink mit Seite unter jedem Block, sehr gute Rückverfolgbarkeit.
- Notfall als eigenes Register: Notrufnummern und Ausstattung in einem Klick.
- Plakat nach bfu 4.301 als Einstieg in Verfahren, vertraute Form für Lehrpersonen.
- Material-Register als zweite Sicht ohne doppelte Pflege.
- Entsorgung verweist auf die verfahrensbezogenen Regeln (Leinöl, Kunststoff, Glasur).
- «Diese Seite ist nicht» klärt Verbindlichkeit ehrlich.
- Kantonstabelle mit Liste «ohne Dokument gefunden», transparent.

## Testfragen (Klicks)

- Stichsäge 5. Klasse: Verfahren, Plakat-Karte (2 Klicks) oder Suche. Zyklus-Zuordnung muss man wissen.
- Leinöllappen: Suche «Leinöl» oder Fachraum, Entsorgung, Link Leinöl (3 Klicks). Gut.
- Notfall-Ausstattung: Register Notfall (1 Klick). Gut, aber im Register Fachraum kein Verweis darauf.
- bfu-Merkblatt: Register Quellen (1 Klick) oder jeder Quellenlink. Gut, Suche findet es nicht.

Reihenfolge der Register: sinnvoll vom Häufigen (Verfahren) zum Hintergrund (Recht, Quellen). Notfall in der Mitte ist vertretbar.
