# Design-Review «Sicherheit im TTG» (2026-10-26)

Grundlage: stil.css, app.js, gebaute Seite ohne Bilder, bfu-Plakat 4.301. Kontraste von Hand gerechnet (WCAG-Luminanz).

## Befunde, priorisiert

1. **Suchfeld `.suche-klein input`**: Rahmen `--line` #d9d9d9 auf #fff = **1,41:1** (1.4.11 verlangt 3:1), das Feld ist kaum als Feld erkennbar. Dazu `font-size:.875rem`: iOS zoomt beim Antippen hinein (unter 16px), Höhe 2rem = 32px. Vorschlag: `border-color:var(--muted)` (6,9:1 hell, 7,8:1 dunkel). Unter `@media (pointer:coarse)` `font-size:1rem; min-height:2.5rem`. Die Breite bleibt klein.

2. **Plakat-Punkte `.dot.A`, `.dot.C` (hell)**: #3dbfa3 auf Weiss **2,39:1**, #f08576 **2,52:1**. In der Legende `.p-leg` auf der eigenen Tönung sogar A **1,88:1**, C **1,79:1**. Die Form (Ring, Mittelpunkt) trägt die Unterscheidung zwar mit, aber der gefüllte A-Punkt ist das schwächste Zeichen. Vorschlag nur im hellen Modus: `--pa:#2a9d84` (3,36:1) und `--pc:#e0705f` (3,16:1). Der Farbton bleibt bfu-nah. Dunkel stimmt alles (A 7,7:1).

3. **Verbots-Streifen `li.verbot`**: `border-left` in `--c` auf `--tint`: hell **1,27:1**, dunkel **1,47:1**, praktisch unsichtbar. Vorschlag: `border-left-color:var(--pc)` (hell 2,3:1, dunkel 6,6:1). Die Marke `.vb` selbst ist gut lesbar (13,4:1 hell, 10,1:1 dunkel).

4. **Hinweiskästen dunkel `.hinweis`, `.karte`, `.leer`, `.mfilter`**: `--tint` #1e1e1e auf #141414 = **1,10:1**, die Kästen verschwinden. Vorschlag: dunkles `--tint:#242424` und für `.hinweis` zusätzlich `border-left:3px solid var(--line)` in beiden Modi, damit der Kasten ohne Flächenkontrast erkennbar bleibt.

5. **Touch-Ziele**: `.m-zeile` (Plakatzeile) ist 31px hoch, `.b-zu` (Schliessen im Popover) ca. 33px, `.sprung` hat nur `.2rem` Zeilenabstand zwischen umbrechenden Links. Vorschlag: `@media (pointer:coarse){ .m-zeile{padding:.5rem 0} .b-zu{min-height:2.5rem} .sprung{gap:.6rem 1.2rem} }`. Auf dem Desktop bleibt das Plakat dicht.

6. **Randkasten `.rand` (ab 64rem)**: `position:sticky` ohne Höhenbegrenzung. Ist die Liste höher als das Fenster minus Leiste, ist das Ende nie erreichbar. Vorschlag: `max-height:calc(100vh - var(--hh) - 2rem); overflow:auto`.

7. **Hierarchie**: `h2.p-titel` ist mit 2rem gleich gross wie `h1` und konkurriert mit dem Seitentitel. Vorschlag: `font-size:1.6rem`. In der Ergebnisansicht sind `.erg-kopf h2` und `.erg-v>h3` beide 1,25rem. Vorschlag: `.erg-kopf h2{font-size:1.6rem}`.

8. **Kleine Etiketten uneinheitlich**: `.blocktitel` (fett, grau, VERSALIEN, Sperrung), `.lo-k` (fett grau), `.vlabel`, `.k-titel`, `.mat` (normal grau), `.g-k` (fett schwarz). Vorschlag: zwei Muster genügen. Grau normal für Einordnungen (`.vlabel`, `.k-titel`, `.mat`, `.blocktitel` ohne `text-transform`/`letter-spacing`), fett schwarz für Zwischentitel (`.g-k`, `.lo-k`).

9. **Begriffskarten `.begriff`**: 29 Karten nur mit `margin-bottom:2rem` getrennt, die `.thema`-Blöcke haben dagegen eine Trennlinie. Vorschlag: `.begriff{padding-top:1rem;border-top:1px solid var(--line);margin-bottom:1.75rem}`. Das entspricht `.thema`.

10. **Register mobil `.tabs`**: `scrollbar-width:none` entfernt den einzigen Hinweis auf weitere Reiter («Recht», «Quellen» liegen rechts ausserhalb). Vorschlag: unter 40rem `flex-wrap:wrap` (zwei Zeilen) oder `scrollbar-width:thin`. Nebenbei: CSS-Altlasten ohne Markup (`.finder`, `.felder`, `.finden`, `.kurz`, `.z-hl`, `.plakat[data-z]`) entfernen.

## Was gut funktioniert

- Klare Tokens hell/dunkel, Textkontraste durchweg hoch: Text 18,9:1 bzw. 16,5:1, `--muted` 6,9:1 hell, 7,8:1 dunkel, auch auf Tönung über 6:1.
- Plakatlogik redundant codiert (Farbe, Form, Screenreader-Text). Die Einrückung `.p-kopf` passt exakt auf die Punktspalten.
- Textbreite 68ch, ruhiger Rhythmus, eine Schrift mit drei Grössen.
- Sichtbarer Fokus, Tastatursteuerung der Register, Popover auf schmalen Bildschirmen als Blatt unten mit Safe-Area.
- Quellenzeilen einheitlich `.quelle` und `.ql`, klein, aber kontrastreich.
