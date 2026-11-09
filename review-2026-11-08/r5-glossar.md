# R5 Glossar-Verlinkung (2026-11-09)

## Geprüft

Gegenstand: `bau/app.js`, Abschnitt «Begriffe: erstes Vorkommen je Abschnitt antippbar» (Liste `NICHT`, TreeWalker, Popup `#b-pop`), geprüft an der gebauten Seite `sicherheit-im-ttg.html` (Stand 2026-11-09 00:09). `app.js` und `stil.css` wurden um 00:39 von anderer Seite geändert, der Glossar-Abschnitt ist im aktuellen `app.js` aber unverändert (Zeilen 334 bis 425). Die alten Codestellen unten kommen in `app.js` bzw. `inhalt.html` je genau einmal vor (mit `grep -c` geprüft).

Methode: Playwright headless (Chrome), file://, 1280 × 900 und 375 × 812 (mobile, touch). Testskripte in `review-2026-11-08/tools/tests/`:

- `r5-gl-zaehlen.cjs`: alle `a.b-wort` nach Elterntyp, Register und Abschnitt, heikle Vorfahren, Liste mit Kontext
- `r5-gl-details.cjs`: Glossartitel und `data-wort`, Links in kurzen Eltern, Plakat und Tabellen, nicht verlinkte Wortformen (Token-genau, Fall, Bindestrich, Komposita), Templates
- `r5-gl-sichtbar.cjs`: sichtbare Begriffslinks je Register nach Sprung
- `r5-gl-popup.cjs`: Öffnen, Schliessen per Klick, zweitem Klick, «Schliessen», Escape, Klick daneben, Klick ins Suchfeld, Tastatur (Enter, Tab), Hover nach Klick, im Themenfenster «Holzstaub», «Alle Begriffe», je 1280 und 375 px
- `r5-gl-alle.cjs`, `r5-gl-alle2.cjs`: Landeplatz von «Alle Begriffe» über die Zeit (smooth scroll)
- `r5-gl-orte.cjs`: Plakatkopf, Grafik «Wer wofür zuständig ist», Verfahrens-Einleitungen, Scrollen im Fenster bei offenem Popup

### Zählung

104 Links `a.b-wort`, davon 64 aus der automatischen Verlinkung (`b-…`) und 40 H-Satz-Links (`h-…`, statisch aus dem Bau). Keine Konsolenfehler.

| Elterntyp | Anzahl |
|---|---|
| li | 76 (davon 30 H-Sätze in der Ampel) |
| p | 19 (davon 3 in der Grafik Recht, 9 H-Sätze, 1 im Plakatkopf) |
| Tabellenzelle td | 7 (Kantone 5, Recht 2) |
| Karte (Plakat, `p.k-fuss`) | 1 |
| summary, button, th, Matrix-Chip, Quellenzeile, figcaption | 0 |
| Themenfenster | Klone, z. B. «Holzstaub» 2 Links |
| Materialfenster Metall (template) | 0, enthält aber auch kein Glossarwort |

| Register | Anzahl |
|---|---|
| Grundlage | 0 |
| Maschinen (Panel `verfahren`) | 35 |
| Verfahren und Material (`matrix`) | 33 (30 H-Sätze) |
| Unterricht | 4 |
| Fachraum | 9 |
| Kantone | 5 |
| Recht | 16 (9 H-Sätze) |
| Quellen | 2 |

### Was in Ordnung ist

- Keine Treffer mitten im Wort: Die Grenzklassen `(^|[^\wäöüÄÖÜß-])` und `(?![\wäöüÄÖÜß-])` verhindern Treffer in Komposita und vor Bindestrichen («MAG-», «PLA-Filament», «Abschnitt» bei ABS). Kein falscher Akronym-Treffer gefunden.
- Gross- und Kleinschreibung: Die Suche ist fallgenau, es gibt aber im heutigen Text keine Fundstelle, die nur wegen der Schreibung fehlt.
- Plural: Die Varianten in `data-wort` decken die vorkommenden Formen ab (Sicherheitsdatenblatts, Piktogrammen, Laserklassen, FI-Schaltern). Nicht erfasst sind nur Komposita, siehe GL-09.
- Summary, Matrix-Chips, th, figcaption, Buttons und Quellenzeilen sind frei von Links (frühere Fehler bleiben behoben).
- Themenfenster: Die Klone tragen `href` und `data-b`, Klick öffnet das Popup über dem Fenster (z-index 40 über 30, `elementFromPoint` trifft das Popup), «Schliessen» gibt den Fokus an das Wort im Fenster zurück, auch auf 375 px (Blatt unten, 525 px hoch).
- Escape ausserhalb des Fensters, zweiter Klick, «Schliessen», Tastatur Enter mit Fokus auf «Schliessen» und Rückgabe an das Wort: in Ordnung, auf beiden Breiten.
- «Alle Begriffe» landet aus Text und Fenster beim Glossar (1280: 64 px, 375: 143 px unter der Leiste wie beim direkten Sprung). Ein erster Messwert nach 600 ms täuschte, weil `scroll-behavior: smooth` länger läuft.

## Befunde

### GL-01 Escape im Themenfenster schliesst Popup und Fenster zugleich

- Stelle: `bau/app.js` Z. 408 (Glossar) und Fenster-Teil `document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !f.hidden && !document.querySelector('.b-pop:not([hidden])')) zu(); });`
- Befund: Der Fenster-Teil will bei offenem Popup nicht schliessen. Beide Listener hängen aber an `document`, der Glossar-Listener ist zuerst registriert und versteckt das Popup, bevor der Fenster-Listener prüft. Ein Escape schliesst so beides. Auf 375 px bleibt der Fokus danach auf dem Wort im versteckten Fenster.
- Beleg: `r5-gl-popup.cjs`
  `1280 Fenster: Escape (1x) {"pop":false,"fenster":false,"fokus":"A.mchip …"}`
  `375 Fenster: Escape (1x) {"pop":false,"fenster":false,"fokus":"A.b-wort «Quellenabsaugung»","fokusImFenster":true}`
- Vorschlag (`bau/app.js`):
  alt: `document.addEventListener('keydown',function(e){ if(e.key==='Escape') schliessen(); });`
  neu: `document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !pop.hidden){ schliessen(); e.stopImmediatePropagation(); } });`
  Danach schliesst das erste Escape das Popup, das zweite das Fenster. Nebenbefund für den Fenster-Teil: Auf 375 px ist der auslösende Matrix-Chip nicht sichtbar, `zu()` kann den Fokus dann nicht zurückgeben.
- Gewicht: mittel

### GL-02 Mit der Maus geöffnetes Popup wird nach 0,5 s zum Hover-Popup

- Stelle: `bau/app.js` Z. 403 bis 405 (Klick) und Z. 415 (`tAuf=setTimeout(function(){ oeffnen(b,true); },500)`)
- Befund: Beim Klick fährt die Maus zuerst über das Wort, der Hover-Timer läuft. Der Klick öffnet das Popup, der Timer wird nicht gelöscht und öffnet es 0,5 s später neu im Hover-Modus. Dabei wird der Inhalt ersetzt, der fokussierte Knopf «Schliessen» verschwindet, der Fokus fällt auf `body`. Fährt die Maus danach weg, schliesst das Popup von selbst, obwohl es angeklickt wurde.
- Beleg: `r5-gl-popup.cjs`
  `1280 Klick, 0,8 s warten {"pop":true,"fokus":"BODY …","fokusImPop":false}`
  `1280 … dann Maus weg {"pop":false,"fokus":"BODY …"}`
- Vorschlag (`bau/app.js`, `tAuf` ist per `var` in der ganzen Funktion bekannt, auf Touch ist es `undefined`, `clearTimeout` schadet nicht):
  alt: `if(b){ e.preventDefault(); e.stopImmediatePropagation(); if(offenVon===b && perHover)`
  neu: `if(b){ e.preventDefault(); e.stopImmediatePropagation(); clearTimeout(tAuf); if(offenVon===b && perHover)`
- Gewicht: mittel

### GL-03 Klick daneben holt den Fokus auf das Wort zurück

- Stelle: `bau/app.js` Z. 375 (`schliessen`) und Z. 406 (`if(!pop.hidden && !pop.contains(e.target)) schliessen();`)
- Befund: Wer bei offenem Popup in das Suchfeld oder auf einen anderen Link klickt, verliert den Fokus dort: `schliessen()` setzt ihn immer auf das auslösende Wort zurück. Im Suchfeld kann man dann nicht sofort tippen.
- Beleg: `r5-gl-popup.cjs`
  `1280 Klick, dann Klick ins Suchfeld {"pop":false,"fokus":"A.b-wort «Schulträger»"}`
- Vorschlag (`bau/app.js`, `=== true`, weil der Knopf «Schliessen» das Ereignis als Argument übergibt):
  alt: `function schliessen(){ if(pop.hidden) return; pop.hidden=true; if(offenVon){ offenVon.setAttribute('aria-expanded','false'); offenVon.focus({preventScroll:true}); } offenVon=null; }`
  neu: `function schliessen(ohneFokus){ if(pop.hidden) return; pop.hidden=true; if(offenVon){ offenVon.setAttribute('aria-expanded','false'); if(ohneFokus!==true) offenVon.focus({preventScroll:true}); } offenVon=null; }`
  alt: `if(!pop.hidden && !pop.contains(e.target)) schliessen();`
  neu: `if(!pop.hidden && !pop.contains(e.target)) schliessen(true);`
- Gewicht: mittel

### GL-04 Fokussierbarer Link im aria-hidden-Kopf des Plakats

- Stelle: Plakat, Spaltenkopf «Zyklus 1 2 3» (`bau/app.js` Z. 49: `zk.setAttribute('aria-hidden','true'); zk.appendChild(el('p',null,'Zyklus'));`)
- Befund: Das erste «Zyklus» im Abschnitt Plakat ist das Kopfetikett. Es wird verlinkt, obwohl der Kopf `aria-hidden="true"` trägt. Ergebnis: ein per Tab erreichbarer Link, den Screenreader nicht ansagen (WCAG 4.1.2, Regel «aria-hidden-focus»). Inhaltlich ist es dieselbe Art Fehler wie beim Aufklapp-Titel: ein Etikett, kein Fliesstext.
- Beleg: `r5-gl-orte.cjs`
  `<div class="p-zk" aria-hidden="true"><p><a class="b-wort" href="#b-zyklus" …>Zyklus</a></p>…`
  `r5-gl-sichtbar.cjs`: `maschinen → verfahren 1 Zyklus@plakat` (einziger sichtbarer Begriff im Register Maschinen)
- Vorschlag (`bau/app.js`, TreeWalker, nimmt auch GL-05 mit):
  alt: `p.classList.contains('lernort')))) return NodeFilter.FILTER_REJECT;`
  neu: `p.classList.contains('lernort')||p.classList.contains('vw-t'))) || (p.getAttribute && p.getAttribute('aria-hidden')==='true')) return NodeFilter.FILTER_REJECT;`
- Gewicht: mittel

### GL-05 Kastentitel «Schulträger» in der Grafik Recht verlinkt

- Stelle: Register Recht, Grafik «Wer wofür zuständig ist», `p.vw-t`
- Befund: Der Kastentitel «Schulträger» ist als Begriff unterstrichen und antippbar, die beiden anderen Kastentitel (Schule und Schulleitung, Lehrperson) nicht. Ein Titel als Link wirkt wie die bereits behobenen Aufklapp-Titel. Im Fliesstext von Recht kommt «Schulträger» mehrfach vor, dort wäre der Link richtig.
- Beleg: `r5-gl-details.cjs`: `b-schultraeger «Schulträger» … <figure.verantw> <div.vw> <p.vw-t> | Elterntext «Schulträger»`
- Vorschlag: mit der Änderung in GL-04 erledigt (`vw-t` in die Ausschlussliste).
- Gewicht: gering

### GL-06 Doppelter Link «Obhutspflicht» neben dem Abschnittslink

- Stelle: Recht, Grafik, Kasten Lehrperson: «Obhutspflicht im Unterricht, …, siehe [Sorgfalts- und Obhutspflicht]»
- Befund: Im selben Satz stehen ein Glossarlink «Obhutspflicht» und ein Abschnittslink auf denselben Begriff. Zwei Unterstreichungen mit verschiedenem Verhalten (Popup und Sprung) für eine Sache. Das Glossar wiederholt zudem nur, was der Abschnitt «Sorgfalts- und Obhutspflicht» ausführt.
- Beleg: `r5-gl-orte.cjs`: `<p><a class="b-wort" href="#b-obhut" …>Obhutspflicht</a> im Un…` mit `<a href="#sorgfalt">Sorgfalts- und Obhutspflicht</a>` im gleichen `<p>`
- Vorschlag (`bau/app.js`): Begriff überspringen, wenn im gleichen Element schon ein gewöhnlicher Link mit diesem Wort steht.
  alt: `if(gesehen[id] || blk.closest('#'+id)){`
  neu: `if(gesehen[id] || blk.closest('#'+id) || [].some.call(rest.parentNode.querySelectorAll('a:not(.b-wort)'),function(x){ return x.textContent.indexOf(wort)>-1; })){`
- Gewicht: gering

### GL-07 Popup bleibt beim Scrollen im Themenfenster stehen

- Stelle: `bau/app.js` Z. 387 (`pop.style.top=(top+window.pageYOffset)+'px'`), Breite ab 700 px
- Befund: Das Popup ist an der Seite ausgerichtet. Das Themenfenster scrollt in sich selbst, das Wort wandert weg, das Popup bleibt stehen und deckt dann anderen Text ab.
- Beleg: `r5-gl-orte.cjs`: `FENSTER-SCROLL wort.bottom/pop.top vorher [857, 446] nachher [607, 446, true]`
- Vorschlag (`bau/app.js`, zusammen mit GL-01 in einem Schritt, setzt GL-03 voraus):
  alt: `document.addEventListener('keydown',function(e){ if(e.key==='Escape') schliessen(); });`
  neu (zwei Zeilen):
  `document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !pop.hidden){ schliessen(); e.stopImmediatePropagation(); } });`
  `document.addEventListener('scroll',function(e){ if(!pop.hidden && offenVon && e.target!==document && e.target.contains && e.target.contains(offenVon)) schliessen(true); },true);`
- Gewicht: gering

### GL-08 Glossareintrag «Aerosol» wird nie verlinkt

- Stelle: `inhalt.html` Z. 1198, `section.begriff#b-aerosol`
- Befund: Keines der Wörter «Aerosole|Aerosolexposition|Aerosol» kommt ausserhalb des Glossars vor. Der Eintrag ist nur über die Glossarliste erreichbar. Der Seitentext spricht von «Sprühnebel» (Unterricht, Schutzmassnahmen, zweimal).
- Beleg: `r5-gl-zaehlen.cjs`: `OHNE LINK b-aerosol`. `grep -o Aerosol sicherheit-im-ttg.html`: 4 Treffer, alle im Glossareintrag.
- Vorschlag, als Frage an Lukas (Eintrag behalten und anbinden oder streichen):
  alt: `<section class="begriff" id="b-aerosol" data-wort="Aerosole|Aerosolexposition|Aerosol">`
  neu: `<section class="begriff" id="b-aerosol" data-wort="Aerosole|Aerosolexposition|Aerosol|Sprühnebel">`
- Gewicht: gering

### GL-09 Zusammengesetzte Formen von «sensibilisierend» fehlen

- Stelle: `inhalt.html`, `section.begriff#b-sensibilisierend`
- Befund: «hautsensibilisierend» und «atemwegssensibilisierend» (Stoffe auswählen, Ampel) sowie «hautsensibilisierende» (Unterricht, Schutzmassnahmen) werden nicht erkannt. Im Register Verfahren und Material und in Unterricht gibt es deshalb keinen Link auf den Begriff, gerade dort, wo die Einstufung zählt.
- Beleg: `r5-gl-details.cjs`:
  `b-sensibilisierend atemwegssensibilisierend ×1 :: matrix <li>`
  `b-sensibilisierend hautsensibilisierend ×1 :: matrix <li>`
  `b-sensibilisierend hautsensibilisierende ×1 :: unterricht <p.psa-bezug>`
- Vorschlag (`inhalt.html`):
  alt: `data-wort="sensibilisierend|sensibilisierende|sensibilisierenden|Sensibilisierung"`
  neu: `data-wort="sensibilisierend|sensibilisierende|sensibilisierenden|Sensibilisierung|hautsensibilisierend|hautsensibilisierende|atemwegssensibilisierend"`
- Gewicht: gering

## Fazit

Die Verlinkung trifft keine Wortteile und verschont Titel, Chips und Buttons. Wichtig sind drei Fehler im Verhalten des Popups: Escape im Themenfenster (GL-01), das Hover-Wiederöffnen nach einem Klick (GL-02) und der Fokus nach einem Klick daneben (GL-03). Dazu kommt ein Link im aria-hidden-Plakatkopf (GL-04). Alles Weitere ist gering.
