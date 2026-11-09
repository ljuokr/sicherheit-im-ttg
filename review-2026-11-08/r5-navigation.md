# R5 Navigation und Fenster (2026-11-09)

Geprüft wurde die gebaute Seite `sicherheit-im-ttg.html` (Stand 00:09). Die Code-Zeilen stammen aus `bau/app.js` (Stand 00:45). Der Umsetzungs-Agent arbeitet bereits daran, die neue hashchange-Behandlung für Themen ist noch nicht gebaut. Alle «alt»-Stellen unten kommen in `bau/app.js` genau einmal vor.

## Geprüft

- **Interne Links:** 404 `a[href^="#"]` ausserhalb von Suche, Fenster und Begriffskarte, je auf 1280 und 375 px. Davon wurden 246 je Breite echt angeklickt: Register- und Abschnittslinks, Sprunglisten, Registerhinweise «(Register …)», Plakat-Gruppentitel, Links in Plakat-Karten, Matrix-Chips, Materialköpfe, Links mit `data-maschine` und Begriffe. 122 davon öffnen ein Fenster. Die übrigen 158 sind auf der jeweiligen Breite nicht sichtbar, nämlich Verfahrensinhalte im Register Maschinen, die nur im Fenster erscheinen, und die zweite Matrix-Darstellung für die andere Breite (verfahren 53, matrix 71, quellen 34). Sie sind über die Fenster und die andere Breite abgedeckt.
- **Links aus Fenstern:** alle 34 Fensterziele (Themen, Verfahren, Material Metall) geöffnet, darin 90 Links (43 Abschnitte oder Themen, 32 Begriffe, 15 `data-maschine`) je Breite angeklickt.
- **Links aus Suchergebnissen:** 10 Suchwörter (Staub, Haftung, Metall, Gehörschutz, Notfall, Lötkolben, Lagerung, Bern, Schutzbrille, Brand), 152 Ergebnislinks je Breite.
- **Laden mit #hash von aussen:** alle 57 eindeutigen Linkziele je Breite neu geladen.
- **Weitere Abläufe:** Zurück-Taste des Browsers (2 Abläufe je Breite), zweiter Klick auf Chip, Materialkopf und alle anderen fensteröffnenden Links, Registerwechsel bei offenem Fenster mit Maus (8 Register) und Pfeiltaste, Schliessen-Knopf und Escape mit Fokusrückgabe, Tab-Taste im Fenster.
- **Prüfung je Link:** Ziel sichtbar unter der Leiste, richtiges Register aktiv, Fenster offen oder zu, Fensterinhalt passt zum Ziel, Fokus, Hash, Konsolenfehler.
- **Testskripte** in `review-2026-11-08/tools/tests/`: `r5-nav-erkunden.cjs`, `r5-nav-links.cjs`, `r5-nav-fenster.cjs`, `r5-nav-suche-hash.cjs`, `r5-nav-register.cjs`, `r5-nav-metall375.cjs`, `r5-nav-suche-ce.cjs`, `r5-nav-suche375.cjs`, `r5-nav-pop375.cjs`, `r5-nav-img375.cjs`. Screenshots liegen in `runs/r5-*.png`.

**Gesamtbild:** Die Navigation hält. Es gab keine Konsolenfehler und keine toten Ziele. Alle 246 Klicks je Breite, alle 90 Fensterlinks und alle 57 Hash-Ladevorgänge landen im richtigen Register, mit dem richtigen Fenster und dem Fokus am Ziel. Ein Hinweis für spätere Tests: `html{scroll-behavior:smooth}` lässt Messungen direkt nach dem Klick falsch aussehen. Erst nach dem Ende des Scrollens messen. Die fünf Befunde unten betreffen Randfälle, keiner davon blockiert.

## Befunde

### NAV-01 Zurück-Taste verlässt die Seite
- **Stelle:** `bau/app.js`, `zeige()` (`history.replaceState`) und Klick-Handler der Sprungziele
- **Befund:** Register, Abschnitte und Fenster schreiben den Hash nur mit `replaceState`. Es entsteht kein einziger Verlaufseintrag. Wer drei Sprünge macht und dann «Zurück» drückt, verlässt die Seite ganz, statt zum vorherigen Register zu kommen. Das trifft vor allem Registerhinweise «(Register Fachraum)», nach denen man zurück will.
- **Beleg:** `r5-nav-suche-hash.cjs`, Abschnitt «Zurück», auf 1280 und 375 gleich: `Tab Unterricht: unterricht history=2`, `Link nach Fachraum: installationen history=2`, `Chip -> Fenster: bohrmaschine history=2`, `nach Zurück: url=about:blank`. Gleich beim zweiten Ablauf (Laden mit `#haftung`, Klick auf `#sorgfalt`, Zurück ergibt `about:blank`).
- **Vorschlag:** Nur Linksprünge sollen einen Eintrag erzeugen, Registerklicks nicht. Der neue hashchange-Handler im Fenster-Teil öffnet beim Zurückgehen Themen wieder.
  - alt: `    if(gehe(decodeURIComponent(a.getAttribute('href').slice(1)),true)) e.preventDefault();`
  - neu: `    var ziel=decodeURIComponent(a.getAttribute('href').slice(1));`
    `    if(location.hash!==a.getAttribute('href')){ try{ history.pushState(null,'',a.getAttribute('href')); }catch(x){} }`
    `    if(gehe(ziel,true)) e.preventDefault();`
  - Dazu soll ein offenes Fenster schliessen, wenn man zu einem gewöhnlichen Abschnitt zurückgeht:
  - alt: `if(z2 && z2.matches('section.thema, section.verfahren, th.mx-zeile') && f.hidden){ document.getElementById('t-matrix').click(); oeffne(z2,null); } });`
  - neu: `if(z2 && z2.matches('section.thema, section.verfahren, th.mx-zeile')){ if(f.hidden){ document.getElementById('t-matrix').click(); oeffne(z2,null); } } else zu(); });`
- **Gewicht:** mittel. Das ändert das Verhalten der ganzen Seite, darum zuerst Lukas fragen.

### NAV-02 Registerwechsel bei offenem Fenster: Fokus fällt ins Leere
- **Stelle:** `bau/app.js`, Capture-Listener «Registerwechsel schliesst das Fenster»
- **Befund:** Wird bei offenem Fenster ein anderes Register angeklickt (1280 px) oder mit der Pfeiltaste gewählt, ruft `zu()` zuerst `ausloeser.focus()` auf, also den Chip. Gleich danach blendet `zeige()` dessen Register aus. Der Fokus landet auf `body` statt auf dem gewählten Register. Mit der Tastatur geht damit die Position verloren (WCAG 2.4.3).
- **Beleg:** `r5-nav-register.cjs`, 1280: für alle 7 anderen Register `vorher {"fenster":true,…,"fokus":"fenster"} nachher {"fenster":false,"tab":"t-unterricht","fokus":"BODY"}`. Ohne Fenster bleibt der Fokus auf dem Register.
- **Vorschlag:**
  - alt: `if(t && t.getAttribute('aria-selected')!=='true') zu(); },true);`
  - neu: `if(t && t.getAttribute('aria-selected')!=='true'){ ausloeser=null; zu(); } },true);`
- **Gewicht:** mittel. Die Korrektur ist klein und ohne Nebenwirkung.

### NAV-03 Suche zeigt verborgene H-Sätze, Fusszeile erscheint als «H410»
- **Stelle:** `bau/app.js`, `render()`, Schleife «Suche auch in den übrigen Registern»
- **Befund:** Die H-Satz-Einträge stehen in `<div class="h-saetze" hidden>` im Register Quellen. Sie sind nur für die Begriffskarte da. Die Suche nimmt sie trotzdem auf:
  - Bei «giftig» erscheinen 5 Abschnitte H3xx, bei «Brand» erscheint H241.
  - Der Link führt ins Leere. Das Register Quellen öffnet sich oben (`scrollY 0`), nichts wird sichtbar, und der Fokus fällt auf `body`.
  - Weil H410 die letzte h3 vor der Fusszeile ist, werden Fusszeilen-Treffer unter dieser Überschrift gruppiert und dorthin verlinkt. Bei «Bern» steht als Ergebnis «H410» mit der Zeile «Lukas Jordi, in Co-Autorschaft …».
- **Beleg:** `r5-nav-suche-ce.cjs`: `H-Links «Bern» ["H410Lukas Jordi, in Co-Autorschaft mit Claude …"]`, `«giftig»: Abschnitte mit #h- 5`, `Klick H-Link: {"hash":"#h-H301","tab":"t-quellen","erg":false,"fokus":"BODY#","scrollY":0}`. `r5-nav-suche-hash.cjs` auf beiden Breiten: `Bern | #h-H410 … Ziel nicht im Bild top=0`, `Brand | #h-H241 …`.
- **Vorschlag:** Verborgene H-Sätze überspringen und die Fusszeile als eigene Gruppe ohne Überschrift-Link führen.
  - alt: `          if(x.closest('.rand')) return;`
  - neu: `          if(x.closest('.rand,.h-saetze')) return;`
    `          if(x.closest('footer') && kopf && !kopf.closest('footer')){ kopf=null; akt=null; }`
  - Der Treffer erscheint dann unter dem Registernamen «Quellen» ohne Link, nach der bestehenden Regel `g.kopf?…:document.getElementById('t-'+pid)`.
- **Gewicht:** mittel. Der Fehler fällt beim Suchen sichtbar auf.

### NAV-04 Zweiter Klick schliesst das Fenster nur bei Chips und Materialköpfen
- **Stelle:** `bau/app.js`, Fenster-Klick-Handler, Abfrage `aria-current`
- **Befund:** `aria-current` wird nur auf `.mchip` und `.mx-mat` gesetzt. Bei allen anderen Links, die ein Fenster öffnen, baut ein zweiter Klick das Fenster neu auf und springt dabei an seinen Anfang, statt es zu schliessen. Betroffen sind Plakat-Gruppentitel, Links in Plakat-Karten, Einträge in «Bevorzugen» und «Nicht verwenden» in der Matrix sowie Textlinks in Unterricht, Fachraum und Quellen. Auf 375 px stellt sich die Frage nicht, weil das Fenster den ganzen Bildschirm deckt.
- **Beleg:** `r5-nav-links.cjs`, 1280: 91 Fälle «Zweiter Klick: Fenster bleibt offen», etwa `verfahren #verbinden «Verbinden»` (6), Karten (33), `matrix #kleben «Weissleim»` (37), Fachraum (6), Unterricht (8), Quellen (1). Chip und Metall schliessen korrekt (`r5-nav-register.cjs`: `Chip zweiter Klick: {"fenster":false,…}`).
- **Vorschlag:** Den zuletzt benutzten Link merken.
  - alt: `  var fin=document.getElementById('f-in'), ausloeser=null;`
  - neu: `  var fin=document.getElementById('f-in'), ausloeser=null, zuletzt=null;`
  - alt: `      if(!f.hidden && a.getAttribute('aria-current')==='true'){ zu(); return; }`
    `      oeffne(z,a); return;`
  - neu: `      if(!f.hidden && (a.getAttribute('aria-current')==='true' || a===zuletzt)){ zu(); return; }`
    `      oeffne(z,a); zuletzt=a; return;`
  - alt (in `zu()`): `    ausloeser=null;`
  - neu: `    ausloeser=null; zuletzt=null;`
- **Gewicht:** gering. Das Verhalten ist uneinheitlich, aber nicht falsch.

### NAV-05 Fenster aus #hash: nach dem Schliessen kein Fokus
- **Stelle:** `bau/app.js`, letzte Zeile (`oeffne(z,null)` beim Laden) und `zu()`
- **Befund:** Öffnet sich das Fenster beim Laden mit `#holzstaub` oder `#mat-metall`, gibt es keinen Auslöser. Nach «Schliessen» oder Escape steht der Fokus auf `body`, oben im Register Verfahren und Material. Mit der Tastatur muss man von vorne beginnen. Mit dem neuen hashchange-Handler und NAV-01 kommt dieser Fall häufiger vor.
- **Beleg:** `r5-nav-register.cjs`, beide Breiten: `Laden #holzstaub … danach Schliessen: {"fenster":false,"tab":"t-matrix","fokus":"BODY"} scrollY=0`, gleich bei `#mat-metall`.
- **Vorschlag:** Ohne Auslöser den passenden Chip oder Materialkopf fokussieren, sonst das aktive Register.
  - alt: `    if(ausloeser && document.contains(ausloeser)) ausloeser.focus({preventScroll:true});`
  - neu: `    var ers=ausloeser&&document.contains(ausloeser)?ausloeser:([].filter.call(document.querySelectorAll('.mchip[aria-current="true"], .mx-mat[aria-current="true"]'),function(c){ return c.getClientRects().length; })[0]||document.querySelector('#tl-haupt [aria-selected=true]'));`
    `    if(ers) ers.focus({preventScroll:true});`
  - Die Zeile mit `aria-current="false"` für `.mchip` muss dann nach dieser Fokuszeile stehen. Sonst ist kein Chip mehr markiert.
- **Gewicht:** gering.

## Nicht als Befund gewertet
- Ein Suchergebnis, das ein Fenster öffnet, lässt die Ergebnisliste dahinter stehen (10 bis 11 Fälle je Breite). Nach dem Schliessen ist man wieder in der Ergebnisliste, das ist sinnvoll.
- Auf 375 px sind Leiste und Inhalt bei offenem Fenster `inert`. Registerwechsel und ein zweiter Klick sind dort nicht möglich, das ist so gewollt. Schliessen und Escape geben den Fokus korrekt an den Chip zurück.
- Ein offenes Fenster lässt sich auf 1280 px durch einen Klick auf das schon aktive Register «Verfahren und Material» nicht schliessen. Der Hash wechselt dabei auf `#matrix`, das Fenster bleibt aber offen. Das ist unauffällig.
