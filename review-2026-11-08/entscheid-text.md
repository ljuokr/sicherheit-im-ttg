**Zählung: 70 A · 23 B · 20 C (13 Fragen) · 12 D, total 125 Befunde.** C liegt bei 16 %, die Kette hat also gut vorsortiert.

## 1. Entscheide

| Nr | Empfehlung (kurz) | Stufe | Begründung | Frage an Lukas (C) |
|---|---|---|---|---|
| LAYOUT-01 | Buchstaben A/B/C in die Plakatpunkte | C | WCAG-Befund nachgerechnet. Das Plakat ist aber bewusst im Original-Layout nachgebaut, und Ring und Mittelpunkt hast du am 2026-11-02 als «komisch» entfernt (Haltung 4) | Sollen die Plakatpunkte für Rot-grün-Schwache klein A/B/C zeigen, obwohl das vom Original abweicht? |
| LAYOUT-02 | Fenster unter 64rem modal (inert) | A | Tastaturfehler, nachgestellt bei 375 und 768 px, Darstellungsfehler | |
| LAYOUT-03 | Leiste rückt bei offenem Fenster mit | B | Behebt Register, die unter dem Fenster liegen. Die Registerzeile wird dabei zur Laufleiste, das ist sichtbar | |
| LAYOUT-04 | Vergleichstabelle fokussierbar | A | Tastaturzugang, technisch, geprüft | |
| LAYOUT-05 | Schattenrand bei Laufleisten | B | Nur in der korrigierten Fassung ohne Matrix und ohne Maschinentabellen. Gestaltungsverbesserung | |
| LAYOUT-06 | aria-label mit Klartext statt A/B/C | A | Bedeutung für Screenreader, KURZ liegt in app.js Z. 29 vor | |
| LAYOUT-07 | Doppelte alt-Texte GHS | A | Nur die zwei wörtlichen Doppelungen, mit Piktogrammnamen statt alt="" | |
| BAU-01 | Kurzzeile Haftung | B | Kurzzeile ist schärfer als der Text, den du in H8-02 bestätigt hast. Rechtsnah, darum sichtbar | |
| BAU-02 | INSTR/data-instr ohne Wirkung | C | Toter Code, vermutlich Rest des entfernten Zählers. Ob er bleibt, entscheidest du | Darf ich INSTR samt data-instr aus bau.py und pruefe.py entfernen? |
| BAU-03 | INSTR-Eintrag ohne Treffer | A | Kann nie treffen (bau.py Z. 62/219), harmlos in jedem Fall | |
| BAU-04 | Sprungliste Recht | B | Beide Einträge zeigen fast auf dieselbe Stelle. Neu in der Reihenfolge der Seite | |
| BAU-05 | Kernaussage Sorgfalt | A | Stammt heute aus dem Abschnitt Haftung (Z. 1206), belegter Fehler | |
| BAU-06 | «lösungsmittelfrei» | D | Doppelung, umgesetzt über KURZFASSUNG-13 | |
| BAU-07 | Weichlöten «absaugen» | D | Doppelung, umgesetzt über KURZFASSUNG-12 | |
| BAU-10 | Kurztitel Staub ohne Bohren | A | Karten der Bohrmaschinen verlinken darauf | |
| BAU-11 | Zwei Ersetzungen ohne Ziel | A | Toter Code, kein Inhalt betroffen | |
| BAU-12 | Kommentar Fachraum, sprung() | A | Veraltet, keine Wirkung | |
| BAU-13 | Kommentar und warn='' | A | Rest des Zählers, den du am 2026-11-03 entfernt hast | |
| BAU-14 | Kommentar Lernvideos | A | Falscher Kommentar | |
| BAU-15 | CHEM und import os doppelt | A | Ursache statt Flicken (Haltung 9) | |
| RECHT-01 | Karte Schulträger: dienstliche Tätigkeit, Werkeigentümer | C | Haftung (Haltung 10). Siehe Fragen 3 und 4 | siehe Fragen 3 und 4 |
| RECHT-02 | Haftung Absatz 1: dienstliche Tätigkeit | C | Haftung | siehe Frage 3 |
| RECHT-03 | Satz Werkeigentümerhaftung OR 58 | C | Neue rechtliche Aussage, Beleg OR Art. 58 und bfu 2.524 Kap. VI | siehe Frage 4 |
| RECHT-04 | Glossar Obhut: Pausen, ohne StGB als Quelle | C | Verantwortung der Lehrperson. Der StGB-Teil folgt C2 aus g10 | siehe Frage 5 |
| RECHT-05 | Obhut auch Pausen und schulische Aktivitäten | C | bfu 4.302 und Merkblatt Bern sagen «Unterrichtszeit», die bfu Rechtsfrage sagt mehr | siehe Frage 5 |
| RECHT-06 | Kurzzeile Haftung | D | Doppelung, umgesetzt über BAU-01 | |
| RECHT-07 | Glossar Schulträger angleichen | C | Teil dienstliche Tätigkeit und Werk. Der Rückgriff läuft über KONSISTENZ-REGELN-05 | siehe Fragen 3 und 4 |
| RECHT-08 | Karte Lehrperson: Obhut weiter | C | wie RECHT-05 | siehe Frage 5 |
| RECHT-10 | VUV: wesentliche Änderungen | B | VUV Art. 6 Abs. 1, Wortlaut nicht selbst abgerufen, darum sichtbar | |
| RECHT-11 | «gefährlichen Chemikalien» | A | Angleichung an Glossar und ChemG Art. 25 | |
| RECHT-12 | Heilmittelgesetz zu pauschal | C | Rechtliche Aussage, beide Prüfer formulieren anders | siehe Frage 6 |
| KURZFASSUNG-01 | Glasuren mit Schwermetallen allgemein | A | chemsuisse S. 20, Regel Z. 732, belegter Fehler | |
| KURZFASSUNG-02 | Kurzzeile Haftung | D | Doppelung, umgesetzt über BAU-01 | |
| KURZFASSUNG-05 | Holzschutzmittel mit Bioziden | A | chemsuisse S. 27, korrigierte Fassung | |
| KURZFASSUNG-06 | Emaille unbekannter Zusammensetzung | A | chemsuisse S. 21 | |
| KURZFASSUNG-07 | Brüniermittel mit Selen | A | chemsuisse S. 12, 13 | |
| KURZFASSUNG-08 | Pigmente Arsen, Barium | A | chemsuisse S. 27 | |
| KURZFASSUNG-09 | chemsuisse verbietet nicht selbst | A | Quelle S. 10, belegt | |
| KURZFASSUNG-10 | Ampel grün: Etikette trotzdem beachten | B | chemsuisse S. 39, kurze Fassung. Ein Zusatz für Einsteigende, darum sichtbar | |
| KURZFASSUNG-12 | Weichlöten «grundsätzlich absaugen» | A | chemsuisse S. 11, Regel Z. 562 | |
| KURZFASSUNG-13 | Regeln Klasse: lüften, bevorzugen | A | Kurzfassung schärfer als die Regel | |
| KURZFASSUNG-14 | cadmierte Stähle | A | chemsuisse S. 8 | |
| KURZFASSUNG-15 | Heissluftföhn: Ständer und feuerfeste Unterlage | A | Angleichung an das Thema auf derselben Karte | |
| KONSISTENZ-ZAHLEN-01 | Intervall je Punkt | A | bfu 4.323 S. 3 | |
| KONSISTENZ-ZAHLEN-02 | NIV 5 Jahre gegen bfu 5 bis 10 | D | erledigt: NIV Anhang Ziff. 2.3.8 am Erlass geprüft und von dir entschieden (2026-11-03) | |
| KONSISTENZ-ZAHLEN-03 | Chemikalienliste laufend nachführen | A | chemsuisse S. 36 (nicht S. 32) | |
| KONSISTENZ-ZAHLEN-05 | FI bfu 2.524 S. 13 | A | Seitenfehler belegt | |
| KONSISTENZ-ZAHLEN-06 | Weichlöten Kurzfassung | D | Doppelung zu KURZFASSUNG-12 | |
| KONSISTENZ-BEGRIFFE-01 | Karte Schulträger: Arbeitgeber, Eigentümer | D | Karten je ein Satz (r8). Die Zuordnung leistet KONSISTENZ-BEGRIFFE-02, das Glossar erklärt den Rest | |
| KONSISTENZ-BEGRIFFE-02 | «als Schulträger» | A | chemsuisse Kap. 1.1, verbindet Text und Zeile | |
| KONSISTENZ-BEGRIFFE-03 | Linktext «Im Notfall» | A | Linktext = Abschnittsname (B28) | |
| KONSISTENZ-BEGRIFFE-06 | «Chemikalien-Ansprechperson» | A | Begriff vereinheitlichen | |
| KONSISTENZ-BEGRIFFE-11 | «des Herstellers» | A | Begriff vereinheitlichen | |
| KONSISTENZ-REGELN-02 | «werden abgeschlossen gelagert» | A | chemsuisse S. 35, 37 | |
| KONSISTENZ-REGELN-03 | Hartlöten: Schweisserhandschuhe | C | Suva 67103 Frage 10 nennt sie nur als «mögliche Massnahme». Könnte deiner Werkraumpraxis widersprechen. Die Fragenummern laufen über QUELLEN-CHECKLISTEN-01 bis 03 | siehe Frage 7 |
| KONSISTENZ-REGELN-05 | Glossar Rückgriff wie Haftungstext | B | Gleicht an den Text an, den du in g10 C2 und H8-03 freigegeben hast | |
| KONSISTENZ-REGELN-06 | Chemikalienliste als Pflicht | C | Pflicht oder Empfehlung, das hast du in Runde 2 selbst entschieden | siehe Frage 8 |
| KONSISTENZ-REGELN-07 | Schweissen: Augenschutz nur einmal, Stulpenhandschuhe | B | Doppelung zu Z. 595, Begriff aus Suva 67104. Zusammen mit QUELLEN-CHECKLISTEN-12 | |
| KONSISTENZ-REGELN-11 | Sicherheitsdatenblatt nur unter Lagerung aufbewahren | A | Doppelung, zusammengelegt mit KONSISTENZ-REGISTER-03 und QUELLEN-CHEMSUISSE-B-10 | |
| KONSISTENZ-REGISTER-01 | Verweis auf Dokumentation | A | Ziel belegt, kurz | |
| KONSISTENZ-REGISTER-03 | Sicherheitsdatenblatt-Doppelung | A | zusammengelegt (siehe Auftrag Z. 256) | |
| KONSISTENZ-REGISTER-07 | Rückverweis Lagerung auf Gasflaschen | B | Nur ein Rückverweis, nichts verschieben (g10 G7-20, r8 K15) | |
| KONSISTENZ-REGISTER-10 | Gehör: Verweis auf Räume | D | trifft nicht zu: in Runde 3 bewusst entfernt (h10 B «Gehör ohne Verweis auf Räume», H6-04) | |
| QUELLEN-CHEMSUISSE-A-01 | Halbmaske: drei Fälle | A | chemsuisse S. 24 | |
| QUELLEN-CHEMSUISSE-A-02 | Asbest: leicht gebunden, kein «-papier» | A | chemsuisse S. 22, 81. Korrigierte Fassung ohne Doppelung | |
| QUELLEN-CHEMSUISSE-A-03 | Gasflaschen «einstellen» statt «bedienen» | A | chemsuisse S. 9, 10. Behebt den Widerspruch zur Inbetriebnahme | |
| QUELLEN-CHEMSUISSE-A-04 | Lasercutter: keine Erlaubnis daraus machen | A | chemsuisse S. 19 | |
| QUELLEN-CHEMSUISSE-A-06 | Flammenrückschlagventil S. 8, 10 | A | Seitenfehler | |
| QUELLEN-CHEMSUISSE-A-07 | 3D-Druck S. 17, 18 | A | Seite ergänzen | |
| QUELLEN-CHEMSUISSE-A-08 | Rostfreie Stähle beim Trennen | A | Unbelegte eigene Folgerung streichen, W3 steht im nächsten Punkt | |
| QUELLEN-CHEMSUISSE-A-09 | Laserklasse 1 | A | Unbelegter Teilsatz | |
| QUELLEN-CHEMSUISSE-A-10 | Quelle-Zeilen mit allen Warum-Seiten | B | Seiten ergänzen ist A, die alt-Stellen sind aber nicht eindeutig und müssen mit Kontext gebaut werden | |
| QUELLEN-CHEMSUISSE-A-11 | Sekundenkleber: Haut- und Augenkontakt | A | chemsuisse S. 23, Warum setzt es voraus | |
| QUELLEN-CHEMSUISSE-B-01 | Entsorgung: SiBe statt Chemikalien-Ansprechperson | C | Nimmt deinen Entscheid r8 Frage 1 zurück | siehe Frage 9 |
| QUELLEN-CHEMSUISSE-B-02 | Glossar Sonderabfall: SiBe | C | wie B-01 | siehe Frage 9 |
| QUELLEN-CHEMSUISSE-B-03 | ChemRRV «muss», Entsorgung | B | chemsuisse S. 34, Pflicht an der Schule festgemacht | |
| QUELLEN-CHEMSUISSE-B-04 | Waschbecken mit Brause | B | chemsuisse S. 40 «müssen», gekürzt auf einen Punkt | |
| QUELLEN-CHEMSUISSE-B-05 | Aussortieren nach Anhang H | B | chemsuisse S. 81, korrigierte Fassung (Asbest-Verweis bleibt am richtigen Ort) | |
| QUELLEN-CHEMSUISSE-B-06 | CE für alle Geräte | B | chemsuisse S. 59, kurze Fassung. «China Export» bleibt unberührt | |
| QUELLEN-CHEMSUISSE-B-07 | Gas-Notfall erweitern | D | «Im Notfall öffnet niemand diese Seite». «Explosives Gas» ist eine nicht belegte Umdeutung, giftige und ätzende Gase schliesst die Seite aus (Z. 796) | |
| QUELLEN-CHEMSUISSE-B-08 | Chemikalienliste S. 36 | A | Seitenfehler | |
| QUELLEN-CHEMSUISSE-B-09 | Chemikalienliste «erforderlich» | C | wie KONSISTENZ-REGELN-06 | siehe Frage 8 |
| QUELLEN-CHEMSUISSE-B-10 | «nach chemsuisse» statt «empfiehlt» | A | chemsuisse S. 31, zusammengelegt (Z. 256) | |
| QUELLEN-CHEMSUISSE-B-11 | Brand: Gebäude über Fluchtwege verlassen | A | Sprachlich unklar, chemsuisse S. 43 | |
| QUELLEN-CHEMSUISSE-B-12 | Absaugung läuft bei Not-Aus weiter | B | chemsuisse S. 40, ein Satz | |
| QUELLEN-CHEMSUISSE-B-13 | Betriebsnummer, Begleitschein | C | Verwaltungsdetail für die Schule, wenig Nutzen für Lehrpersonen (Haltung 5) | siehe Frage 10 |
| QUELLEN-BFU-01 | Gefahrenpotenzial nach Alter und Raum | B | bfu 4.302 S. 2, stützt die Beurteilung durch die Lehrperson | |
| QUELLEN-BFU-02 | Gasflaschen: bfu und chemsuisse | D | Mit QUELLEN-CHEMSUISSE-A-03 gelöst, der Zusatzsatz wiederholt den Satz davor | |
| QUELLEN-BFU-03 | Löschdecken in allen Räumen | B | bfu 2.524 S. 19, bfu 4.323. Die Regel wird strenger, darum sichtbar | |
| QUELLEN-BFU-04 | Quelle bfu 2.524 S. 22 | A | fehlende Quelle | |
| QUELLEN-BFU-05 | bfu 2.524 S. 16, 18 | A | Seitenfehler | |
| QUELLEN-BFU-06 | bfu 2.524 S. 8 | A | Seite ergänzen | |
| QUELLEN-BFU-07 | bfu 2.524 S. 19 | A | Seite ergänzen | |
| QUELLEN-BFU-08 | Abb. 34 mit S. 19 | A | Seite ergänzen | |
| QUELLEN-BFU-09 | Staubbeutel gegen bfu-Absaugvorrichtung | C | Staubbeutel ist entschieden (h10). Ein Zusatzsatz könnte Einsteigende verwirren | siehe Frage 11 |
| QUELLEN-CHECKLISTEN-01 | Suva 67103 Fragen 10, 12 | A | Falsche Fragenummern | |
| QUELLEN-CHECKLISTEN-02 | Handschuhe Flussmittel: chemsuisse S. 10 | A | Beleg am richtigen Ort | |
| QUELLEN-CHECKLISTEN-03 | Schweissen Suva 67103 Frage 12 | A | Falsche Fragenummer | |
| QUELLEN-CHECKLISTEN-04 | Gasflaschen Fragen 13 bis 16 | A | Falsche Fragenummern | |
| QUELLEN-CHECKLISTEN-05 | bfu 4.323 S. 3, 5, 13 | A | Seitenfehler | |
| QUELLEN-CHECKLISTEN-06 | bfu 4.323 S. 14, 15 | A | Seite ergänzen | |
| QUELLEN-CHECKLISTEN-07 | FI «muss vorhanden sein» | A | bfu 4.323 S. 8, korrigierte Fassung | |
| QUELLEN-CHECKLISTEN-08 | FI S. 8 | A | Seite ergänzen | |
| QUELLEN-CHECKLISTEN-09 | Schlüsselschalter S. 8 | A | Seite ergänzen | |
| QUELLEN-CHECKLISTEN-12 | Gehörschutz beim Schutzgasschweissen | B | Suva 67104 Frage 15, MIG/MAG steht im LP21-Bezug | |
| QUELLEN-CHECKLISTEN-13 | Bandsäge «etwa» statt «mindestens» Faustbreite | C | Weicht eine Sicherheitsregel auf, deren Wortlaut du in g10 freigegeben hast | siehe Frage 12 |
| QUELLEN-CHECKLISTEN-14 | Suva: Kontrolle alle 6 Monate | B | Suva 67036, ein Satz, grober Wert | |
| QUELLEN-WEITERE-01 | LP21 Bern verlinken, 8.1.2 und 8.1.4 | A | fehlende Quelle | |
| QUELLEN-WEITERE-02 | Merkblatt Bern Abschnitt 1, 3 | A | Verweisfehler | |
| QUELLEN-WEITERE-03 | TuD Grundlagen benennen und aufnehmen | B | Quelle ergänzen, dazu ein neuer Eintrag in der Quellenliste | |
| QUELLEN-WEITERE-04 | Zug: welcher chemsuisse-Leitfaden | A | zg.pdf Folien 13, 14 | |
| QUELLEN-WEITERE-05 | Geiser: Stellungnahme, UVG/VUV | A | Belegter Fehler, Linktext mitziehen | |
| QUELLEN-WEITERE-06 | AHB Bern 8.1.1 als Beleg Haftung | A | fehlender Beleg, kein neuer Text | |
| QUELLEN-WEITERE-07 | «Lehrhilfen» statt «Technologiekarte» | B | Vereinheitlichung über viele Labels, sichtbar | |
| QUELLEN-WEITERE-08 | Bandsäge: Link auf Lehrhilfe | D | bewusst entfernt (Version 51: Begleitmaterial widersprüchlich, Bandsäge 15 mm) | |
| QUELLEN-WEITERE-09 | Merkblatt Bern Abschnitt 3, 4 | A | korrigierte Fassung | |
| QUELLEN-WEITERE-10 | NIN ist kein Gesetz | C | Die Rechtsgrundlage (NIV-Artikel) ist nicht belegt | siehe Frage 13 |
| QUELLEN-WEITERE-13 | Links geprüft im November | B | 71 von 72 geprüft, edudoc vorher von Hand öffnen | |
| QUELLEN-WEITERE-14 | GAL § 25 wie im Glossar | B | Angleichung an das bestätigte Glossar (Z. 1101) | |
| VERWEISE-1 | STOP T: drei Ziele zuordnen | A | korrigierte Fassung | |
| VERWEISE-2 | Dokumentation verlinken | D | Doppelung zu KONSISTENZ-REGISTER-01 | |
| VERWEISE-3 | Fachraumordnung: Kreisverweis | A | korrigierte Fassung | |
| VERWEISE-4 | «und» zwischen den Links | A | Mehrdeutigkeit | |
| VERWEISE-5 | «in der Matrix» | A | Name des Ortes stimmt nicht | |
| VERWEISE-6 | Karte, Haftung und Glossar zusammen | C | Gehört zu Fragen 3 und 4 | siehe Fragen 3 und 4 |

## 2. Aufträge A und B

Die Dateien liegen unter `/Users/lukasjordi/Switchdirve/KI/sicherheit-im-gestalten/`. Wo zwei Befunde dieselbe Zeile betreffen, gilt der zusammengelegte Auftrag. Vor jeder Ersetzung mit Grep prüfen, dass alt genau einmal vorkommt.

**bau/stil.css**
- LAYOUT-03 · alt `body.f-offen #inhalt{padding-right:min(36rem,45vw)}` → neu `body.f-offen #inhalt,body.f-offen #leiste{padding-right:min(36rem,45vw)}`
- LAYOUT-05 · alt `.wrap{overflow-x:auto;margin:0 0 1rem}` → neu: dieselbe Regel unverändert und danach `.wrap:not(.mtab-wrap){background:linear-gradient(to right,var(--bg) 30%,transparent),linear-gradient(to left,var(--bg) 30%,transparent) 100% 0,radial-gradient(farthest-side at 0 50%,rgba(0,0,0,.25),transparent),radial-gradient(farthest-side at 100% 50%,rgba(0,0,0,.25),transparent) 100% 0;background-repeat:no-repeat;background-size:2rem 100%,2rem 100%,.75rem 100%,.75rem 100%;background-attachment:local,local,scroll,scroll}`. Die Matrix bleibt unverändert.

**bau/app.js**
- LAYOUT-02 · alt `f.hidden=false; document.body.classList.add('f-offen');` → neu `f.hidden=false; document.body.classList.add('f-offen'); var schmal=!window.matchMedia('(min-width:64rem)').matches; ['leiste','inhalt'].forEach(function(id){ var n=document.getElementById(id); if(n) n.inert=schmal; });`
- LAYOUT-02 · alt `f.hidden=true; document.body.classList.remove('f-offen');` → neu `f.hidden=true; document.body.classList.remove('f-offen'); ['leiste','inhalt'].forEach(function(id){ var n=document.getElementById(id); if(n) n.inert=false; });` (muss vor ausloeser.focus() stehen)
- LAYOUT-06 · alt `return 'Zyklus '+(i+1)+': '+K;}).join(', '));` → neu `return 'Zyklus '+(i+1)+': '+KURZ[K];}).join(', '));`
- LAYOUT-06 · alt `return 'Zyklus '+(i+1)+' '+K; }).join(', ')));` → neu `return 'Zyklus '+(i+1)+': '+KURZ[K]; }).join(', ')));`

**bau/bau.py**
- BAU-01 · alt `'Haftung': 'der Schulträger haftet, strafbar ist, wer die Sorgfalt verletzt',` → neu `'Haftung': 'in der Regel haftet der Schulträger, bestraft werden kann, wer fahrlässig jemanden verletzt oder tötet',`
- BAU-03 · alt `("* Inbetriebnahme, Ausserbetriebsetzung","selbst"),` → neu leer
- BAU-04 · alt `<li><a href="#zustaendig">Zuständigkeiten</a></li>\n<li><a href="#schulleitung">Pflichten und Empfehlungen</a></li>` → neu `<li><a href="#sorgfalt">Sorgfalts- und Obhutspflicht</a></li>\n<li><a href="#haftung">Haftung</a></li>\n<li><a href="#zustaendig">Zuständigkeiten</a></li>`
- BAU-05 · alt `'einteilen, instruieren, beaufsichtigen, laufend beurteilen'` → neu `'Aufsicht nach Alter und Tätigkeit, Lage laufend beurteilen, eingreifen oder abbrechen'`
- BAU-10 · alt `'Staub beim Sägen, Schleifen'` → neu `'Staub beim Sägen, Bohren, Schleifen'`
- BAU-11 · alt `.replace('<h3>Schutzausrüstung</h3>', '<h3 id="schutzausruestung">Schutzausrüstung</h3>')` → neu leer · alt `, '<h3>STOP-Prinzip</h3>': '<h3 id="stop">STOP-Prinzip</h3>'` → neu leer
- BAU-12 · alt `# Fachraum ohne Unterreiter: eine Sprungliste, darunter Betreiben und Planen` → neu `# Fachraum ohne Unterreiter: Planen, Betreiben, Warten, Lagerung, Entsorgung als Zeilen zum Aufklappen` · zusätzlich die ganze Zeile `def sprung(html): …` (Z. 186) löschen
- BAU-13 · alt `# Kernaussagen je Thema, vorerst drei zur Ansicht` → neu `# Kernaussagen je Thema, bisher für drei Themen` · die Zeile `    warn = ''` löschen · alt `<span class="t-meta">%s%s</span>` → neu `<span class="t-meta">%s</span>` · alt `+ m.group(3), warn, inhalt))` → neu `+ m.group(3), inhalt))`
- BAU-14 · alt `# Lernvideos auf tud.ch zeigen die Arbeitstechnik, die Sicherheitsregeln stehen auf der Karte` → neu `# Technologiekarte als Link auf der Karte, Seite aus 'tk'`
- BAU-15 · alt `CHEM = 'https://chemsuisse.ch/files/278/DE-Schulen-Leitfaden-TTG/1391/Leitfaden-Schulen-TTG.pdf'\nEIGEN = {` → neu `EIGEN = {` · alt `import os, base64` → neu `import base64`
- KURZFASSUNG-01 · alt `('Glasuren mit Schwermetallen für Geschirr', 'glasieren-und-brennen')` → neu `('Glasuren mit Schwermetallen', 'glasieren-und-brennen')`
- KURZFASSUNG-05 · alt `('Holzschutzmittel im Innenbereich', 'farben-lacke-spruehen')` → neu `('Holzschutzmittel mit Bioziden, innen gar keine', 'farben-lacke-spruehen')`
- KURZFASSUNG-06 · alt `('Bleihaltige Emaille', 'emaillieren-und-glasaetzen')` → neu `('Emaille mit Blei oder unbekannter Zusammensetzung', 'emaillieren-und-glasaetzen')`
- KURZFASSUNG-07 · alt `('Beizmittel mit Flusssäure oder Chromsäure', 'abbeizen-und-bruenieren')` → neu `('Beizmittel mit Flusssäure oder Chromsäure, Brüniermittel mit Selen', 'abbeizen-und-bruenieren')`
- KURZFASSUNG-08 · alt `('Pigmente mit Blei, Cadmium, Chromat, Quecksilber', 'farben-lacke-spruehen')` → neu `('Pigmente mit Arsen, Barium, Blei, Cadmium, Chromat, Quecksilber', 'farben-lacke-spruehen')`
- KURZFASSUNG-12 · alt `'nur bleifreies Lot, Lötkolben höchstens 300 °C, Rauch absaugen'` → neu `'nur bleifreies Lot, Lötkolben höchstens 300 °C, Rauch grundsätzlich absaugen'`
- KURZFASSUNG-13 · alt `'nicht essen, wenig Staub, absaugen, lösungsmittelfrei'` → neu `'nicht essen, wenig Staub, absaugen oder lüften, lösungsmittelfrei bevorzugen'`
- KURZFASSUNG-14 · alt `('Rostfreie, verchromte oder vernickelte Stähle schweissen', 'schweissen')` → neu `('Rostfreie, verchromte, vernickelte oder cadmierte Stähle schweissen', 'schweissen')`
- KURZFASSUNG-15 · alt `Die Düse wird heiss, nur mit Unterlage verwenden.` → neu `Die Düse wird heiss, nur mit Ständer und feuerfester Unterlage verwenden.`
- KONSISTENZ-BEGRIFFE-06 · alt `'Schulträger für Räume, Ansprechperson für Chemikalien, Aufgaben ins Pflichtenheft'` → neu `'Schulträger für Räume, Chemikalien-Ansprechperson, Aufgaben ins Pflichtenheft'`
- QUELLEN-WEITERE-07 (B) · alle Labels `'Technologiekarte, S. ` → `'Lehrhilfen Technik und Design, S. ` · Linktext Z. 158 `Technologiekarte Technik und Design` → `Lehrhilfen Technik und Design` · in inhalt.html den Linktext der Quellenliste `Technologiekarten (PDF)` → `Lehrhilfen, Teil Technologiekarten (PDF)` (mehrere Treffer, bewusst alle)

**inhalt.html**
- LAYOUT-04 · alt `<div class="wrap"><table class="vergleich">` → neu `<div class="wrap" tabindex="0" role="region" aria-label="Vergleich Produktions- und Erschliessungshandeln"><table class="vergleich">`
- LAYOUT-07 · alt `<li><img class="icon" data-icon="ghs05-acid.svg" alt="GHS ätzend"> ätzend</li>` → neu `… alt="GHS Ätzwirkung"> ätzend</li>` · alt `<li><img class="icon" data-icon="ghs01-explos.svg" alt="GHS explosiv"> explosiv</li>` → neu `… alt="GHS explodierende Bombe"> explosiv</li>`
- Z. 256 (KONSISTENZ-REGISTER-03, KONSISTENZ-REGELN-11, QUELLEN-CHEMSUISSE-B-10) · alt `<li>Zu jedem gefährlichen Produkt das Sicherheitsdatenblatt verlangen, aktuell halten (chemsuisse empfiehlt: nicht älter als zwei Jahre) und zugänglich aufbewahren. Vor dem Einsatz Etikette und Sicherheitsdatenblatt lesen.</li>` → neu `<li>Zu jedem gefährlichen Produkt das Sicherheitsdatenblatt verlangen und aktuell halten (nach chemsuisse nicht älter als zwei Jahre). Vor dem Einsatz Etikette und Sicherheitsdatenblatt lesen. Zum Aufbewahren siehe <a href="#lagerung">Lagerung</a>.</li>`
- RECHT-10 (B) · alt `<td>bei Stellenantritt und neuen Maschinen</td>` → neu `<td>bei Stellenantritt und wesentlichen Änderungen, etwa neuen Maschinen, nötigenfalls wiederholt</td>`
- RECHT-11 · alt `Schulen, in denen mit Chemikalien umgegangen wird, bezeichnen` → neu `Schulen, in denen mit gefährlichen Chemikalien umgegangen wird, bezeichnen`
- KURZFASSUNG-09 · alt `die chemsuisse nicht empfiehlt oder verbietet (Blei, Cadmium usw.)` → neu `von deren Verwendung chemsuisse abrät oder die verboten sind (Blei, Cadmium usw.)`
- KURZFASSUNG-10 (B) · alt `<li>ohne Gefahrenpiktogramm, z. B. Weissleim, Acryl- und Dispersionsfarben</li>` → neu `<li>ohne Gefahrenpiktogramm, z. B. Weissleim, Acryl- und Dispersionsfarben, Hinweise auf der Etikette trotzdem beachten</li>`
- KONSISTENZ-ZAHLEN-01 · alt `Intervalle nach bfu</td><td>je Checkliste` → neu `Intervalle nach bfu</td><td>je Punkt der bfu-Checklisten`
- KONSISTENZ-ZAHLEN-03 · alt `<td>Chemikalienliste führen</td><td>Empfehlung chemsuisse</td><td>periodisch</td>` → neu `<td>Chemikalienliste führen</td><td>Empfehlung chemsuisse</td><td>laufend nachführen, sonst periodisch erheben</td>`
- KONSISTENZ-ZAHLEN-05 · alt `bfu 2.524, S. 14)` → neu `bfu 2.524, S. 13)`
- KONSISTENZ-BEGRIFFE-02 · alt `<li>Kanton und Gemeinden sind in der Regel für die Verfügbarkeit` → neu `<li>Kanton und Gemeinden als Schulträger sind in der Regel für die Verfügbarkeit`
- KONSISTENZ-BEGRIFFE-03 · alt `<a href="#notfall">Notfälle</a>` → neu `<a href="#notfall">Im Notfall</a>`
- KONSISTENZ-BEGRIFFE-11 · alt `nach den Aufstellungshinweisen der Herstellerin` → neu `nach den Aufstellungshinweisen des Herstellers`
- KONSISTENZ-REGELN-02 · alt `Gekennzeichnete Stoffe bleiben abgeschlossen, siehe <a href="#lagerung">Lagerung</a>.` → neu `Gekennzeichnete Stoffe werden abgeschlossen gelagert, siehe <a href="#lagerung">Lagerung</a>.`
- KONSISTENZ-REGELN-05 (B) · alt `Bei Vorsatz oder grober Fahrlässigkeit kann sie auf die Lehrperson Rückgriff nehmen.` → neu `Rückgriff auf die Lehrperson kann sie nach kantonalem Recht meist nur bei Vorsatz oder grober Fahrlässigkeit nehmen.`
- Z. 594 (KONSISTENZ-REGELN-07, QUELLEN-CHECKLISTEN-12, B) · alt `<li>Helm, Schweisserschutzbrille oder Schutzschild, Brandschutzhandschuhe, Lederschürze und geschlossene Schuhe, keine synthetische Kleidung.</li>` → neu `<li>Stulpenhandschuhe, Lederschürze und geschlossene Schuhe, keine synthetische Kleidung. Beim Schutzgasschweissen und beim Verputzen Gehörschutz.</li>` · alt `Suva 67104, Fragen 4, 5, 8, 17, 18&nbsp;↗` → neu `Suva 67104, Fragen 2, 4, 5, 8, 15, 17, 18&nbsp;↗`
- KONSISTENZ-REGISTER-01 · alt `Es hilft, wenn die Schule das belegen kann, siehe <a href="#festhalten">Was festhalten</a>.` → neu `Es hilft, wenn die Schule das belegen kann, siehe <a href="#dokumentation">Dokumentation</a> und <a href="#festhalten">Was festhalten</a>.`
- KONSISTENZ-REGISTER-07 (B) · alt `<li>Keine Gasflaschen mit giftigen oder ätzenden Gasen. Gaskartuschen in Schränken` → neu `<li>Keine Gasflaschen mit giftigen oder ätzenden Gasen. Zu Sichern, Anzahl und leeren Flaschen siehe <a href="#gasflaschen">Gasflaschen und Gasanlagen</a>. Gaskartuschen in Schränken`
- QUELLEN-CHEMSUISSE-A-01 · alt `Bei grossflächigen oder längeren Arbeiten ohne besondere Lüftung Halbmaske mit Filter Typ A.` → neu `Bei grossflächigen oder längeren Arbeiten und in Räumen ohne besondere Lüftung Halbmaske mit Filter Typ A.`
- QUELLEN-CHEMSUISSE-A-02 · alt `Leicht gebundenen Asbest aus älteren Beständen sofort dicht in Plastik einpacken` → neu `Leicht gebundenen Asbest aus älteren Beständen, etwa Asbesthandschuhe, -schnüre und Platten älterer Elektroöfen, sofort dicht in Plastik einpacken` · alt `beschädigte Teile fachgerecht entsorgen. Asbest steckt in Altbeständen etwa in Asbesthandschuhen, -schnüren und -papier und in Platten älterer Elektroöfen.` → neu `beschädigte Teile als Inertstoff entsorgen.`
- QUELLEN-CHEMSUISSE-A-03 · alt `Gasflaschen und Druckreduzierstationen bedienen Lehrpersonen selbst oder Schülerinnen und Schüler unter ihrer Aufsicht.` → neu `Gasflaschen und Druckreduzierstationen stellen Lehrpersonen selbst ein oder Schülerinnen und Schüler unter ihrer Aufsicht.`
- QUELLEN-CHEMSUISSE-A-04 · alt `lässt die Bedienung durch Schülerinnen und Schüler unter Aufsicht einer Lehrperson zu (S. 19).` → neu `schreibt, die Bedienung solle nur unter Aufsicht einer Lehrperson stattfinden (S. 19).`
- QUELLEN-CHEMSUISSE-A-06 · alt `chemsuisse, S. 9, 10&nbsp;` → neu `chemsuisse, S. 8, 10&nbsp;`
- QUELLEN-CHEMSUISSE-A-07 · alt `chemsuisse, S. 17&nbsp;` → neu `chemsuisse, S. 17, 18&nbsp;`
- QUELLEN-CHEMSUISSE-A-08 · alt `(siehe <a href="#schweissen">Schweissen</a>). Rostfreie Stähle sind beim Trennen aber nicht ausgeschlossen, sie brauchen die Absaugung mit W3-Filter im nächsten Punkt.` → neu `(siehe <a href="#schweissen">Schweissen</a>).`
- QUELLEN-CHEMSUISSE-A-09 · alt `Bei Klasse 1 bleibt der Strahl im geschlossenen Gerät, sie hat das geringste Gefährdungspotenzial.` → neu `Klasse 1 hat das geringste Gefährdungspotenzial.`
- QUELLEN-CHEMSUISSE-A-10 (B) · Quelle-Zeilen auf diese Seiten ergänzen: Weichlöten «S. 11, 33», Hartlöten «S. 10, 11, 33, 37», Schweissen «S. 8, 9, 37», Kleben «S. 16, 22, 23, 25, 33, 34», Wachsen «S. 8, 34». alt jeweils mit dem umgebenden Abschnitt eindeutig machen.
- QUELLEN-CHEMSUISSE-A-11 · alt `Sekundenkleber: Schutzbrille, gute Belüftung.` → neu `Sekundenkleber: Schutzbrille, Haut- und Augenkontakt vermeiden, gute Belüftung.`
- QUELLEN-CHEMSUISSE-B-03 (B) · alt `chemsuisse empfiehlt, sie periodisch zu prüfen, z. B. jährlich.` → neu `Nach chemsuisse muss die Schule sie darum periodisch nachschlagen, z. B. jährlich, und vorhandene Produkte mit verbotenen Stoffen fachgerecht entsorgen.`
- QUELLEN-CHEMSUISSE-B-04 (B) · alt `<li>Eine Augendusche am Wassernetz oder sterile Spülpackungen` → neu `<li>Ein Waschbecken mit druckmindernder Brause, Seife und Einweg-Papiertüchern, es genügt für kleine Spritzer (chemsuisse, S. 40, 46).</li>\n<li>Eine Augendusche am Wassernetz oder sterile Spülpackungen`
- QUELLEN-CHEMSUISSE-B-05 (B) · alt `Chemikalien in Lebensmittelbehältern und alte Asbestteile, siehe <a href="#speckstein-und-asbest">Speckstein und Asbest</a>. Im Zweifel eine Fachfirma beiziehen.` → neu `Chemikalien in Lebensmittelbehältern, Glasuren unbekannter Zusammensetzung, verbotene Materialien wie bleihaltige Weichlote und cadmiumhaltige Hartlote sowie alte Asbestteile, siehe <a href="#speckstein-und-asbest">Speckstein und Asbest</a>. Beim Aussortieren Mantel, Schutzbrille und mindestens Einweghandschuhe tragen, im Zweifel eine Fachfirma beiziehen.`
- QUELLEN-CHEMSUISSE-B-06 (B) · alt `chemsuisse verlangt für Lasercutter eine gültige CE-Konformitätserklärung und eine Bedienungsanleitung.` → neu `chemsuisse verlangt für alle Geräte und Maschinen, auch für Lasercutter, eine gültige CE-Konformitätserklärung und eine Bedienungsanleitung und danach keine Änderungen, die die Sicherheit betreffen.` · Quellenzeile direkt darunter: alt `chemsuisse, S. 18, 19&nbsp;↗</a></p>\n<p>Ein ähnliches Zeichen` → neu `chemsuisse, S. 18, 19, 59&nbsp;↗</a></p>\n<p>Ein ähnliches Zeichen`
- QUELLEN-CHEMSUISSE-B-08 · alt `chemsuisse, S. 35&nbsp;` → neu `chemsuisse, S. 36&nbsp;`
- QUELLEN-CHEMSUISSE-B-11 · alt `Personen warnen und retten, über die Fluchtwege hinaus, nie mit dem Lift.` → neu `Personen warnen und retten, das Gebäude über die Fluchtwege verlassen, nie mit dem Lift.`
- QUELLEN-CHEMSUISSE-B-12 (B) · alt `allenfalls mit zentralem Not-Aus.` → neu `allenfalls mit zentralem Not-Aus. Die Absaugung soll dabei weiterlaufen (chemsuisse, S. 40).`
- QUELLEN-BFU-01 (B) · alt `Die bfu teilt Maschinen und Anlagen in drei Gefahrenkategorien ein und empfiehlt eine abgestufte Einführung über die drei Zyklen der Volksschule.` → neu `Die bfu teilt Maschinen und Anlagen in drei Gefahrenkategorien ein. Das Gefahrenpotenzial hängt vom Alter und den Voraussetzungen der Schülerinnen und Schüler und von der Fachraumeinrichtung ab. Die bfu empfiehlt eine abgestufte Einführung über die drei Zyklen der Volksschule.`
- QUELLEN-BFU-03 (B) · alt `Eine Löschdecke, wo mit offenem Feuer oder brennbaren Chemikalien gearbeitet wird.` → neu `Löschdecken gut sichtbar in allen Räumen.`
- QUELLEN-BFU-04 · alt `chemsuisse, S. 1, 54&nbsp;↗</a>` → neu `chemsuisse, S. 1, 54&nbsp;↗</a> · <a class="ql" href="https://www.bfu.ch/api/publications/bfu_2.524.01_Fachr%C3%A4ume%20Technisches%20und%20Textiles%20Gestalten%20einrichten%20%E2%80%93%20Ein%20Fokus%20auf%20die%20Sicherheit.pdf">bfu 2.524, S. 22&nbsp;↗</a>`
- QUELLEN-BFU-05 · alt `bfu 2.524, S. 18, 19&nbsp;↗` → neu `bfu 2.524, S. 16, 18&nbsp;↗`
- QUELLEN-BFU-06 · alt `bfu 2.524, S. 10, 14-17&nbsp;↗` → neu `bfu 2.524, S. 8, 10, 14-17&nbsp;↗`
- QUELLEN-BFU-07 · alt `bfu 2.524, S. 14, 18&nbsp;↗` → neu `bfu 2.524, S. 14, 18, 19&nbsp;↗`
- QUELLEN-BFU-08 · alt `bfu 2.524, Abb. 34&nbsp;↗` → neu `bfu 2.524, S. 19, Abb. 34&nbsp;↗`
- QUELLEN-CHECKLISTEN-01 · alt `Suva 67103, Fragen 9, 11&nbsp;↗` → neu `Suva 67103, Fragen 10, 12&nbsp;↗`
- QUELLEN-CHECKLISTEN-02 · alt `Bei ätzenden Flussmitteln zusätzlich Schutzhandschuhe.` → neu `Bei ätzenden Flussmitteln zusätzlich Schutzhandschuhe (chemsuisse, S. 10).`
- QUELLEN-CHECKLISTEN-03 · alt `Suva 67103, Frage 11&nbsp;↗` → neu `Suva 67103, Frage 12&nbsp;↗`
- QUELLEN-CHECKLISTEN-04 · alt `Suva 67103, Fragen 12, 13&nbsp;↗` → neu `Suva 67103, Fragen 13 bis 16&nbsp;↗`
- QUELLEN-CHECKLISTEN-05 · alt `bfu 4.323, S. 4, 13&nbsp;↗` → neu `bfu 4.323, S. 3, 5, 13&nbsp;↗`
- QUELLEN-CHECKLISTEN-06 · alt `bfu 4.323, S. 15&nbsp;↗` → neu `bfu 4.323, S. 14, 15&nbsp;↗`
- QUELLEN-CHECKLISTEN-07 · alt `Er gehört zur Elektroinstallation eines Fachraums, Checkliste 1 der bfu fragt nach ihm.` → neu `Er gehört zur Elektroinstallation eines Fachraums. Laut bfu muss er vorhanden sein, sonst ist er nachzurüsten.`
- QUELLEN-CHECKLISTEN-08 · alt `bfu 4.323, Checkliste 1, Punkt 7&nbsp;↗` → neu `bfu 4.323, S. 8, Checkliste 1, Punkt 7&nbsp;↗`
- QUELLEN-CHECKLISTEN-09 · alt `bfu 4.323, Checkliste 1, Punkt 8&nbsp;↗` → neu `bfu 4.323, S. 8, Checkliste 1, Punkt 8&nbsp;↗`
- QUELLEN-CHECKLISTEN-14 (B) · alt `Für die Bohrmaschine eignet sich zusätzlich die Suva-Checkliste 67036.` → neu `Für die Bohrmaschine eignet sich zusätzlich die Suva-Checkliste 67036. Die Suva empfiehlt, die Kontrolle alle 6 Monate zu wiederholen.`
- QUELLEN-WEITERE-01 · alt `Der Lehrplan 21 Bern (Allgemeine Hinweise und Bestimmungen, Kapitel 8.1)` → neu `Der Lehrplan 21 Bern (<a href="https://be.lehrplan.ch/lehrplan_printout.php?e=1&amp;fb_id=92">Allgemeine Hinweise und Bestimmungen</a>, Kapitel 8.1.2 und 8.1.4)`
- QUELLEN-WEITERE-02 · alt `Merkblatt Bern, Abschnitt 3&nbsp;↗</a></p>` → neu `Merkblatt Bern, Abschnitt 1, 3&nbsp;↗</a></p>`
- QUELLEN-WEITERE-03 (B) · alt `Technik und Design, S. 185` → neu `Technik und Design. Grundlagen, 3. Auflage 2020, S. 185` · alt `Technik und Design, S. 181, 182` → neu `Technik und Design. Grundlagen, 3. Auflage 2020, S. 181, 182` · in der Quellenliste den Band ergänzen, Autorinnen und Autoren nach dem Impressum, hep Verlag 2020
- QUELLEN-WEITERE-04 · alt `Stützt sich auf den chemsuisse-Leitfaden.` → neu `Stützt sich auf den chemsuisse-Leitfaden für Schulen zu Chemikalien, Mikroorganismen und Strahlenquellen, nicht auf den TTG-Leitfaden von 2024.`
- QUELLEN-WEITERE-05 · alt `Laut einem Gutachten im Auftrag des LCH von 2017 sind die Arbeitsinspektorate auch für öffentliche Schulen zuständig, kontrollieren dort aber selten.` → neu `Laut einer Stellungnahme im Auftrag des LCH von 2017 sind die Arbeitsinspektorate gestützt auf UVG und VUV auch für öffentliche Schulen zuständig. Nach Angaben des LCH sind sie dort aber kaum präsent.` · Linktext `Gutachten Geiser 2017 (LCH)` → `Stellungnahme Geiser 2017 (LCH)` (Eindeutigkeit prüfen)
- QUELLEN-WEITERE-06 · Quellenzeile Haftung (Z. 1207): direkt nach dem BGE-Link ` · <a class="ql" href="https://be.lehrplan.ch/lehrplan_printout.php?e=1&amp;fb_id=92">Lehrplan 21 Bern, AHB 8.1.1&nbsp;↗</a>` einfügen. alt mit dem BGE-Link eindeutig machen.
- QUELLEN-WEITERE-09 · alt `Merkblatt Bern, S. 1&nbsp;` → neu `Merkblatt Bern, Abschnitt 3, 4&nbsp;`
- QUELLEN-WEITERE-13 (B) · alt `Links geprüft im Oktober 2026` → neu `Links geprüft im November 2026` (edudoc vorher von Hand öffnen)
- QUELLEN-WEITERE-14 (B) · alt `z. B. Bern LAV Art. 52, Aargau GAL § 25, Luzern VBG § 24.` → neu `z. B. Bern LAV Art. 52, Luzern VBG § 24 (angemessene Aufsicht), im Aargau die allgemeine Sorgfaltspflicht nach GAL § 25.`
- VERWEISE-1 · alt `Schutzvorrichtungen, Absaugung, belüftete Schränke, siehe <a href="#installationen">Installationen und Bauteile</a>.` → neu `Schutzvorrichtungen (siehe <a href="#maschinen-warten">Warten und prüfen</a>), Absaugung (siehe <a href="#installationen">Installationen und Bauteile</a>), belüftete Schränke (siehe <a href="#lagerung">Lagerung</a>).`
- VERWEISE-3 · alt `Wie sie mit der Klasse besprochen wird, steht unter <a href="#sicher-unterrichten">Sicher unterrichten</a>.` → neu `Die Lehrperson bespricht sie mit der Klasse, siehe <a href="#sicher-unterrichten">Sicher unterrichten</a>.`
- VERWEISE-4 · alt `Siehe <a href="#holzstaub">Staub</a>, <a href="#farben-lacke-spruehen">Farben, Lacke, Sprühen</a>.` → neu `Siehe <a href="#holzstaub">Staub</a> und <a href="#farben-lacke-spruehen">Farben, Lacke, Sprühen</a>.`
- VERWEISE-5 · alt `siehe <a href="#mat-metall">Metall</a> in der Matrix.` → neu `siehe <a href="#mat-metall">Metall</a> im Register Verfahren und Material.`

B-Meldungen in je einer Zeile: Leiste rückt bei offenem Fenster mit · Schattenrand bei Laufleisten · Kurzzeile Haftung · Sprungliste Recht · VUV-Rhythmus · Ampel grün mit Etikette · Glossar Rückgriff · Schweissen PSA mit Gehörschutz · Rückverweis Gasflaschen · Quelle-Zeilen chemsuisse · ChemRRV «muss» · Waschbecken · Aussortieren Anhang H · CE für alle Geräte · Absaugung bei Not-Aus · Gefahrenpotenzial bfu · Löschdecken in allen Räumen · Suva 6 Monate · TuD Grundlagen · «Lehrhilfen» · Linkprüfung November · GAL § 25.

## 3. Fragen an Lukas (Stufe C)

1. Sollen die Plakatpunkte klein A/B/C zeigen, damit Rot-grün-Schwache die Kategorien unterscheiden, auch wenn das vom Original-Plakat abweicht? Empfehlung: ja, die Legende zeigt die Buchstaben schon.
2. Darf ich INSTR und data-instr (toter Code, ohne sichtbare Wirkung) aus bau.py und pruefe.py entfernen? Empfehlung: ja.
3. Soll die Haftung des Schulträgers an Karte, Haftungstext und Glossar «in ihrer dienstlichen Tätigkeit» statt «im Unterricht» heissen (bfu Rechtsfrage: auch Pausen, schulische Aktivitäten)? Empfehlung: ja.
4. Soll ein Satz zur Werkeigentümerhaftung dazukommen («kann … für Mängel an Gebäude und fest eingebauter Einrichtung haften», OR Art. 58, Beleg bfu 2.524 Kap. VI und Fedlex), mit Kurzfassung auf Karte und Glossar? Empfehlung: ja, nur dieser eine Satz plus Quelle.
5. Soll die Obhutspflicht an Glossar, Recht Punkt 1 und Karte Lehrperson «im Unterricht, in den Pausen und bei schulischen Aktivitäten» heissen, und im Glossar das Strafgesetzbuch nicht mehr als Quelle stehen (wie C2)? Empfehlung: ja, mit «Wird dadurch jemand verletzt oder getötet, kann sie strafrechtlich verantwortlich werden» statt «Wer sie verletzt …».
6. Soll der Medikamentensatz lauten «Nach dem Heilmittelgesetz dürfen nur Fachpersonen wie Ärztinnen, Apotheker oder Drogistinnen Arzneimittel abgeben, ausgenommen frei verkäufliche»? Empfehlung: ja, die Regel «keine Medikamente nach eigenem Ermessen» bleibt.
7. Sollen beim Hartlöten an der Flamme Schweisserhandschuhe stehen (Suva 67103 Frage 10 nennt sie als mögliche Massnahme), oder passt das nicht zu deiner Werkraumpraxis? Empfehlung: nein, nur Fragenummern und chemsuisse-Beleg korrigieren.
8. Soll die Chemikalienliste in der Pflichtentabelle «erforderlich nach chemsuisse, Teil der Sorgfaltspflicht (S. 36)» statt «Empfehlung chemsuisse» heissen, ohne Änderung an «neun Pflichten»? Empfehlung: ja.
9. Soll bei der Entsorgung (Fachraum und Glossar Sonderabfall) wieder «Sicherheitsbeauftragte» statt «Chemikalien-Ansprechperson» stehen, wie chemsuisse S. 48, obwohl das deinen Entscheid aus r8 zurücknimmt? Empfehlung: ja, die Quelle ist eindeutig.
10. Sollen Betriebsnummer und Begleitschein ab 50 kg unter Entsorgung dazukommen (chemsuisse S. 50)? Empfehlung: nein, die Entsorgungsfirma regelt das.
11. Soll bei den Handmaschinen offen stehen, dass chemsuisse den Staubbeutel als Mindestmass nennt und die bfu für Handschleifmaschinen eine wirksame Absaugvorrichtung verlangt? Empfehlung: nein, das verwirrt Einsteigende.
12. Soll es an der Bandsäge «etwa eine Faustbreite, wenn nötig mit Stossholz» heissen wie bei Suva 67057, statt «mindestens … sonst»? Empfehlung: nein, die strengere Fassung passt zum Werkraum.
13. Soll beim FI «Gesetz: Niederspannungs-Installationsverordnung (NIV), umgesetzt mit der Norm NIN 4.1.1.3.3» stehen, nachdem der NIV-Artikel auf Fedlex geprüft ist? Empfehlung: ja, vorher den Artikel prüfen.

## 4. Gesamteindruck

70 A · 23 B · 20 C · 12 D. Die Kette hat sauber gearbeitet. Übersehen hat sie:
1. Recht Z. 1199 «Wer sie verletzt, kann strafrechtlich verantwortlich werden» ist genauso verkürzt wie die Kurzzeile Haftung, und RECHT-04 würde den Satz ins Glossar kopieren (C, in Frage 5 aufgenommen).
2. Mehrere Aufträge treffen dieselben Zeilen (Z. 256, 579, 594, 1119 und die Chemikalienliste-Zeile). Nach den Antworten auf die Fragen 3, 4, 5 und 8 muss alt neu bestimmt werden, weil A und B dort schon ersetzt haben (A).
3. Kurzzeile Haftung (BAU-01) und Karte Schulträger müssen den Antworten auf die Fragen 3 und 4 folgen (B).

Runde 4: 70 A · 23 B · 13 Fragen · 12 D · Haftung und Obhut bei dir · Aufträge mit alt/neu

[inhalt.html](file:///Users/lukasjordi/Switchdirve/KI/sicherheit-im-gestalten/inhalt.html)