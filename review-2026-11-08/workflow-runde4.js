export const meta = {
  name: 'sicherheit-ttg-runde4',
  description: 'Sicherheit im TTG: 20 Prüfagents (Technik, Recht, Konsistenz, Quellen, Bilder), Gegenprüfung, Entscheid, Umsetzung, Nachtest',
  phases: [
    { title: 'Finden', detail: '20 Agents: Technik 4, Recht 1, Kurzfassungen 1, Konsistenz 4, Quellen 5, Verweise 1, Bilder 4' },
    { title: 'Gegenprüfen', detail: 'je Prüfagent ein Skeptiker, Recht doppelt, Bilder ohne' },
    { title: 'Entscheiden', detail: 'Prüfagent lukas getrennt für Text und Bilder' },
    { title: 'Beheben', detail: 'ein Agent für Text und Code, einer für Bilder' },
    { title: 'Nachtesten', detail: 'Regressionstest headless und zweite Suchrunde Technik' },
  ],
}

const P = '/Users/lukasjordi/Switchdirve/KI/sicherheit-im-gestalten'
const R = P + '/review-2026-11-08'
const Q = R + '/quellen-txt'
const BASIS = `Lies zuerst ${R}/kontext.md und halte dich an die Arbeitsregeln dort. Projektordner: ${P}. Du änderst keine Projektdateien. Deine Antwort ist reine Daten im verlangten Schema.`

const BEFUNDE = {
  type: 'object',
  properties: {
    geprueft: { type: 'string', description: 'Was du mit welcher Methode geprüft hast, was nicht prüfbar war' },
    befunde: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          art: { type: 'string', enum: ['technisch', 'inhaltlich', 'widerspruch', 'quelle', 'verweis'] },
          stelle: { type: 'string', description: 'Register und Abschnitt' },
          befund: { type: 'string', description: 'Was falsch ist, mit kurzem Zitat' },
          beleg: { type: 'string', description: 'Code-Stelle, Testausgabe, Quelltext mit Seite oder Gesetz' },
          datei: { type: 'string', enum: ['inhalt.html', 'bau/bau.py', 'bau/app.js', 'bau/stil.css', 'mehrere'] },
          alt: { type: 'string', description: 'genauer alter Wortlaut, kommt in der Datei genau einmal vor, leer wenn nicht möglich' },
          neu: { type: 'string' },
          gewicht: { type: 'string', enum: ['hoch', 'mittel', 'klein'] },
        },
        required: ['id', 'art', 'stelle', 'befund', 'beleg', 'datei', 'gewicht'],
      },
    },
  },
  required: ['geprueft', 'befunde'],
}

const URTEIL = {
  type: 'object',
  properties: {
    urteile: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          echt: { type: 'boolean' },
          begruendung: { type: 'string' },
          korrektur: { type: 'string', description: 'besserer Vorschlag, falls der ursprüngliche falsch oder zu weit ist' },
        },
        required: ['id', 'echt', 'begruendung'],
      },
    },
  },
  required: ['urteile'],
}

const BILDER = {
  type: 'object',
  properties: {
    bilder: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Dateiname in bau/bilder, oder neu-<thema> für ein neues Bild' },
          urteil_heute: { type: 'string', description: 'Was am heutigen Bild gut oder schlecht ist' },
          kandidaten: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                seite: { type: 'string', description: 'Commons-Dateiseite' },
                lokal: { type: 'string', description: 'Pfad der heruntergeladenen Vorschau in bilder-kandidaten' },
                lizenz: { type: 'string' },
                urheber: { type: 'string' },
                bewertung: { type: 'string' },
              },
              required: ['seite', 'lizenz', 'urheber', 'bewertung'],
            },
          },
          empfehlung: { type: 'string', description: 'behalten oder Seite des besten Kandidaten' },
          alt: { type: 'string', description: 'vorgeschlagener alt-Text' },
          credit: { type: 'string', description: 'vorgeschlagene Bildzeile im Stil von nachweis.json' },
          gewicht: { type: 'string', enum: ['hoch', 'mittel', 'klein'] },
        },
        required: ['name', 'urteil_heute', 'kandidaten', 'empfehlung', 'gewicht'],
      },
    },
  },
  required: ['bilder'],
}

const TECHNIK = 'Arbeite mit Headless-Tests nach kontext.md.'
const QREGEL = `Suche alle Belegstellen dieser Quelle auf der Seite (grep in inhalt.html und bau/bau.py nach dem Kürzel, auch in «Warum: … (Quelle, S. x)»). Prüfe jede gegen den Quelltext in ${Q}: Steht die Aussage auf der genannten Seite oder bei der genannten Frage? Gibt die Seite die Quelle richtig wieder, nicht schärfer, nicht weicher? Fehlt eine Seitenzahl? Die gedruckte chemsuisse-Seitenzahl steht in der Fusszeile «Version 1.0   NN». Melde auch wichtige Aussagen der Quelle, die auf der Seite fehlen, aber nur, wenn sie zu einem bestehenden Thema gehören und nichts aufblähen.`

const PRUEFER = [
  // Technik
  { key: 'glossar', art: 'technisch', prompt: `Glossar-Verlinkung in bau/app.js (Abschnitt «Begriffe: erstes Vorkommen je Abschnitt antippbar»): Begriffe, die an störenden oder falschen Stellen verlinkt werden (Schalter, Aufklapp-Titel, Matrix, Karten, Fenster, Tabellenköpfe, Quellenzeilen, mitten in Wörtern, Plural oder Wortteile), doppelt oder nie, obwohl wichtig. Popups öffnen und schliessen richtig? ${TECHNIK}` },
  { key: 'navigation', art: 'technisch', prompt: `Register, Themenfenster, Materialfenster, Anker-Sprünge (auch von aussen mit #hash), Registerhinweise «(Register …)», Zurück-Taste, Suche, Plakat-Karten, Links mit data-maschine. Jeden internen Link einmal klicken: Ziel sichtbar, richtiges Register, Fenster offen oder zu, Fokus sinnvoll, keine Konsolenfehler. ${TECHNIK}` },
  { key: 'layout', art: 'technisch', prompt: `Darstellung bei 375, 768 und 1280 px, Hell und Dunkel: Querscrollen, abgeschnittene oder überlappende Elemente, Kontrast unter WCAG AA, Fokus sichtbar, Tastaturbedienung (Tab, Escape), Bilder ohne alt, Tabellen ohne Kopf, Aufklapp-Zeilen ohne verständlichen Namen. Screenshots von Auffälligem nach runs/. ${TECHNIK}` },
  { key: 'bau', art: 'technisch', prompt: `bau/bau.py gegen inhalt.html: Abschnittsgrenzen, doppelte oder fehlende ids, Kernaussagen (KERN, THEMA_KERN), die nicht zum Inhalt passen, Präfixlisten VERBOTE, INSTR, EIGEN (verwaist, falsche Treffer), KURZ-Titel, die den Sinn verändern, ZUORDNUNG mit unpassenden Themen, veraltete Kommentare.` },
  // Recht und Kurzfassungen
  { key: 'recht', art: 'inhaltlich', skeptiker: 2, prompt: `Register Recht, Rechtsaussagen in Unterricht und Fachraum, Glossarbegriffe mit Rechtsbezug, Fusszeile: Aussagen, die zu eng, zu weit oder ungenau sind (Beispiel Haftungskarte im Kontext). Gesetzesverweise am Wortlaut prüfen (Fedlex per WebFetch oder verlässliche Zweitquelle). Korrekturen vorsichtig formulieren, die Seite ist keine Rechtsberatung.` },
  { key: 'kurzfassung', art: 'widerspruch', prompt: `Jede Kurzfassung gegen die ausführliche Regel: Matrix «Bevorzugen» und «Nicht verwenden», Kernaussagen der Aufklapp-Zeilen und Themenköpfe, Hinweise auf den Maschinenkarten, Ampel (Spalten, H-Sätze, Beispiele), Materialfenster Metall, «Einstufung bfu-Plakat» im Fenster gegen das Plakat. Schärfer, weicher, anders, doppelt oder widersprüchlich?` },
  // Konsistenz, vier Blickwinkel
  { key: 'konsistenz-zahlen', art: 'widerspruch', prompt: `Konsistenz der Zahlen über die ganze Seite: Mengen (Liter), Masse (cm, m), Schallpegel, Fristen und Intervalle (täglich, halbjährlich, jährlich, 5 Jahre), Prozente, Schutzstufen, Filterklassen, Staubklassen, Temperaturen, Lux. Jede Zahl, die an zwei Stellen vorkommt, muss gleich sein und gleich begründet. Liste jede Zahl mit allen Fundstellen auf, bevor du urteilst.` },
  { key: 'konsistenz-begriffe', art: 'widerspruch', prompt: `Konsistenz der Begriffe: dieselbe Sache überall gleich benannt (z. B. Schutzausrüstung, Fachraum, Lehrperson, Kategorie A/B/C, Sicherheitsdatenblatt, Chemikalien-Ansprechperson, Schulträger, Absaugung, Quellenabsaugung), Abschnittsnamen in Verweisen gleich wie die Überschrift, Schweizer Begriffe statt deutscher, Fachbegriffe nach LP21. Auch Gross- und Kleinschreibung, Bindestriche, Abkürzungen.` },
  { key: 'konsistenz-regeln', art: 'widerspruch', prompt: `Konsistenz der Regeln: Regeln, die an mehreren Stellen stehen (Themen, Karten, Unterricht, Fachraum, Glossar, Recht, Pflichtentabelle), dürfen sich nicht widersprechen, nicht verschieden streng sein und nicht unnötig wiederholt werden. Beispiele: Handschuhe an Maschinen, Schutzbrille, Absaugung, Lagerung, Aufsicht nach Kategorie, Zugang Schülerinnen und Schüler zu Stoffen.` },
  { key: 'konsistenz-register', art: 'widerspruch', prompt: `Abgrenzung der Register: Steht jeder Punkt im richtigen Register nach den Regeln im Kontext (Unterricht mit der Klasse, Fachraum für den Raum, Material für Stoffe, Recht für Pflichten und Haftung, Grundlage für den Einstieg)? Doppelungen zwischen Registern, Punkte am falschen Ort, Verweise, die nach dem Umbau ins Leere oder an den falschen Ort führen.` },
  // Quellen, nach Dokumenten
  { key: 'quellen-chemsuisse-a', art: 'quelle', prompt: `Quelle: chemsuisse-Leitfaden TTG (2024), gedruckte Seiten V bis 25 (Verfahren, Materialien, Hilfsstoffe). Quelltext: «chemsuisse Leitfaden TTG Sicherer Umgang mit Materialien und Stoffen (Version 1.0, 2024).txt». ${QREGEL}` },
  { key: 'quellen-chemsuisse-b', art: 'quelle', prompt: `Quelle: chemsuisse-Leitfaden TTG (2024), gedruckte Seiten 26 bis Schluss (Lagerung, Entsorgung, Notfall, Recht, Anhänge, Abkürzungen, Checklisten). Quelltext wie oben. ${QREGEL}` },
  { key: 'quellen-bfu', art: 'quelle', prompt: `Quellen: bfu 2.524, bfu 4.301 (Plakat, auch die Kategorien jeder Maschine auf dem Nachbau), bfu 4.302. Quelltexte: die bfu-Dateien in ${Q}. ${QREGEL}` },
  { key: 'quellen-checklisten', art: 'quelle', prompt: `Quellen: bfu 4.323 (Checklisten, Prüfintervalle) und alle Suva-Checklisten (67002, 67016, 67036, 67057, 67092, 67103, 67104, 67106, 44014, 44053 und weitere auf der Seite). Quelltexte der vorhandenen in ${Q}, für die übrigen die verlinkte Suva-Seite per WebFetch. Fragenummern und Ausgaben besonders genau prüfen. ${QREGEL}` },
  { key: 'quellen-weitere', art: 'quelle', prompt: `Alle übrigen Quellen: Technologiekarten und Lehrhilfe Technik und Design (hep), Merkblatt Bern, kantonale Dokumente, Lehrplan 21, Gesetze (Fedlex), Hersteller (Bernina, Rapesco), Seilnacht, Samariter, LCH, Archiv. Dazu die Quellenliste im Register Quellen: vollständig (jede zitierte Quelle aufgeführt), einheitlich (Herausgeber, Jahr, Titel, Nummer), alle externen Links erreichbar (curl mit -o /dev/null -w '%{http_code}', kein E-Mail im User-Agent).` },
  // Verweise intern
  { key: 'verweise', art: 'verweis', prompt: `Jeder interne Verweis semantisch: Passt der Linktext zum Ziel, führt «siehe X» wirklich zu X, ist das Ziel nach den Umbauten noch richtig benannt und am richtigen Ort?` },
]

const BILDREGEL = `Bilder liegen in ${P}/bau/bilder, Bildzeilen und alt-Texte in bau/bilder/nachweis.json, eingebunden in Glossar-Einträgen von inhalt.html (data-bild). Angezeigt werden sie 280 px breit. Suche für jedes deiner Bilder mindestens fünf Kandidaten auf Wikimedia Commons (frei lizenziert, Lizenz und Urheber gesichert, Schul- oder Werkstattkontext bevorzugt, Schweizer oder europäische Normen, ohne Personen in unsicherer Haltung, keine Marken im Vordergrund). Lade eine Vorschau jedes Kandidaten mit curl (Commons-Thumb, 560 px breit, generischer User-Agent) nach ${R}/bilder-kandidaten/<bildname>/. Wäge ab und empfiehl den besten oder «behalten», wenn das heutige Bild das beste ist. Begründe kurz, was das Bild im Unterricht zeigen soll. Keine Projektdateien ändern.`
const BILDGRUPPEN = [
  { key: 'bilder-raum', namen: 'fi-schalter.jpg, schluesselschalter.jpg, absaugung.jpg, spritzkabine.jpg' },
  { key: 'bilder-stoffe', namen: 'etikett.jpg, bindemittel.jpg, ffp-maske.jpg, glasur.jpg' },
  { key: 'bilder-geraete', namen: 'mig-schweissen.jpg, flammenrueckschlag.jpg, fdm-drucker.jpg' },
  { key: 'bilder-luecken', namen: 'alle Piktogramme (ghs-*.svg, iso-*.svg, laser-warnzeichen.svg, ce-*.svg) und neue Bilder', extra: `Prüfe bei den Piktogrammen, ob Code und Bedeutung stimmen (ISO 7010, GHS) und ob alt-Texte und Bildzeilen vollständig sind. Suche danach Stellen auf der Seite, an denen ein Bild das Verständnis klar verbessern würde (höchstens drei, z. B. Spaltkeil, Schutzhaube, Augendusche, Sicherheitsschrank), und schlage dafür Kandidaten vor. Name dann neu-<thema>.` },
]

phase('Finden')
log(`Runde 4: ${PRUEFER.length} Prüfagents und ${BILDGRUPPEN.length} Bilder-Agents starten`)

const textLauf = pipeline(
  PRUEFER,
  p => agent(`${BASIS}\n\nDein Prüfauftrag (${p.key}):\n${p.prompt}\n\nHöchstens 15 Befunde, die wichtigsten zuerst. IDs mit Präfix ${p.key.toUpperCase()}-.`, { label: 'finden:' + p.key, phase: 'Finden', schema: BEFUNDE }),
  (r, p) => {
    if (!r || !r.befunde.length) return { p, befunde: [], urteile: [] }
    const n = p.skeptiker || 1
    return parallel(Array.from({ length: n }, (_, i) => () => agent(
      `${BASIS}\n\nDu bist Skeptiker ${i + 1} für den Prüfauftrag ${p.key}. Prüfe jeden Befund unabhängig nach. Technische Befunde mit eigenem Headless-Test reproduzieren, inhaltliche am Quelltext in ${Q} oder am Gesetz. Im Zweifel echt=false. Schlage eine bessere Korrektur vor, wenn der Vorschlag falsch, zu weit oder unbelegt ist.\n\nBefunde:\n${JSON.stringify(r.befunde, null, 1)}`,
      { label: 'pruefen:' + p.key + (n > 1 ? '-' + (i + 1) : ''), phase: 'Gegenprüfen', schema: URTEIL },
    ))).then(us => ({ p, befunde: r.befunde, urteile: us.filter(Boolean) }))
  },
)

const bildLauf = parallel(BILDGRUPPEN.map(g => () => agent(
  `${BASIS}\n\nBilder: ${g.namen}.\n${BILDREGEL}\n${g.extra || ''}`,
  { label: g.key, phase: 'Finden', schema: BILDER },
)))

const [gefunden, bildvorschlaege] = await Promise.all([textLauf, bildLauf])

const bestaetigt = []
for (const g of gefunden.filter(Boolean)) {
  for (const b of g.befunde) {
    const vs = g.urteile.map(u => (u.urteile || []).find(x => x.id === b.id)).filter(Boolean)
    const ja = vs.filter(v => v.echt).length
    if (vs.length && ja * 2 > vs.length) bestaetigt.push({ ...b, pruefung: vs.map(v => v.begruendung + (v.korrektur ? ' Korrektur: ' + v.korrektur : '')).join(' | ') })
  }
}
const total = gefunden.filter(Boolean).reduce((n, g) => n + g.befunde.length, 0)
const bilder = bildvorschlaege.filter(Boolean).flatMap(b => b.bilder)
log(`${bestaetigt.length} von ${total} Befunden bestätigt, ${bilder.length} Bilder bewertet`)

phase('Entscheiden')
const LUKAS = `Prüfrunde 4 der Website «Sicherheit im TTG». Kontext: ${R}/kontext.md, frühere Entscheide: review-2026-11-03/h10-lukas.md und die dort genannten. Entscheide nach Lukas' Massstäben: A = ohne Rückfrage umsetzen, B = umsetzen und melden, C = Lukas fragen, D = verwerfen. Gib das Ergebnis als Markdown zurück, beginnend mit der Zählung.`
const [entscheidText, entscheidBilder] = await parallel([
  () => bestaetigt.length ? agent(`${LUKAS}\nFür A und B den genauen Auftrag mit Datei, alt (genau einmal in der Datei, mit Grep geprüft) und neu. Für C eine kurze Frage mit Empfehlung.\n\nGegengeprüfte Befunde:\n${JSON.stringify(bestaetigt, null, 1)}`, { label: 'lukas:text', phase: 'Entscheiden', agentType: 'lukas' }) : Promise.resolve(''),
  () => bilder.length ? agent(`${LUKAS}\nEs geht um Bilder. Lukas hat früher entschieden: je Bild fünf Möglichkeiten abwägen und das beste nehmen, Bildnachweise müssen stimmen, keine Urheberangaben, die unpassend wirken. A und B nur, wenn der Kandidat klar besser ist und die Lizenz belegt. Neue Bilder an neuen Stellen sind C. Für A und B: Bildname, Commons-Seite, lokale Vorschau, alt-Text und Bildzeile.\n\nVorschläge:\n${JSON.stringify(bilder, null, 1)}`, { label: 'lukas:bilder', phase: 'Entscheiden', agentType: 'lukas' }) : Promise.resolve(''),
])

phase('Beheben')
const UMSETZER = BASIS.replace('Du änderst keine Projektdateien.', 'Du änderst nur die Dateien, die dir unten zugewiesen sind. Ein zweiter Agent arbeitet gleichzeitig an anderen Dateien.')
const [umsetzungText, umsetzungBilder] = await parallel([
  () => entscheidText ? agent(`${UMSETZER}\n\nDeine Dateien: inhalt.html, bau/bau.py, bau/app.js, bau/stil.css. Nicht anfassen: bau/bilder/ und nachweis.json. Setze alle Aufträge A und B aus dem Entscheid um, nur mit dem Edit-Tool, jeden alten Wortlaut vorher mit Grep auf genau einen Treffer prüfen. C und D nicht anfassen. Nicht bauen, das macht der Schluss. Protokoll mit dem Write-Tool nach ${R}/umsetzung-text.md (je Auftrag erledigt oder übersprungen mit Grund), Bilanz zurückgeben.\n\nEntscheid:\n${entscheidText}`, { label: 'beheben:text', phase: 'Beheben' }) : Promise.resolve('keine Aufträge'),
  () => entscheidBilder ? agent(`${UMSETZER}\n\nDeine Dateien: bau/bilder/ und bau/bilder/nachweis.json. Für jedes Bild mit A oder B: Datei in voller Auflösung von Commons laden (curl, generischer User-Agent), mit sips auf 560 px Breite verkleinern und komprimieren (sips --resampleWidth 560 -s formatOptions 70), damit die Seite nicht zu schwer wird, unter dem bisherigen Namen in bau/bilder speichern (bei neuen Bildern unter dem vorgeschlagenen Namen), alt und credit in nachweis.json im bestehenden Stil anpassen. Neue Bilder nur ablegen, nicht in inhalt.html einbinden. Protokoll nach ${R}/umsetzung-bilder.md, Bilanz zurückgeben.\n\nEntscheid:\n${entscheidBilder}`, { label: 'beheben:bilder', phase: 'Beheben' }) : Promise.resolve('keine Aufträge'),
])

const bauen = await agent(`${BASIS.replace('Du änderst keine Projektdateien.', 'Du darfst nur bauen und Fehler beheben, die das Bauen meldet.')}\n\nBaue und prüfe: \`cd ${P} && python3 bau/bau.py && python3 bau/pruefe.py\`. Meldet bau.py «VERBOT OHNE TREFFER» (ausser dem bekannten INSTR «* Inbetriebnahme») oder pruefe.py fehlende href-Ziele, behebe die Ursache mit dem Edit-Tool und baue erneut. Dann Rauchtest: \`source ${R}/tools/env.sh && node ${R}/tools/rauchtest.cjs\`. Gib die Ausgaben zurück.`, { label: 'bauen', phase: 'Beheben' })

phase('Nachtesten')
const nach = await parallel([
  () => agent(`${BASIS}\n\nRegressionstest nach der Umsetzung (Protokolle: ${R}/umsetzung-text.md, ${R}/umsetzung-bilder.md). Headless-Tests in tools/tests/: jeder Matrix-Link öffnet ein Fenster mit Inhalt, jede Plakat-Karte öffnet sich, jeder interne Link hat ein Ziel, Suche liefert Treffer für Säge, Leinöl, Nickel, Gehörschutz, Glossar-Popups öffnen samt Bild, Register auf 375 px ohne Querscrollen, Hell und Dunkel, keine Konsolenfehler. Melde nur, was jetzt kaputt ist.`, { label: 'regression', phase: 'Nachtesten', schema: BEFUNDE }),
  () => agent(`${BASIS}\n\nZweite Suchrunde, nur technische Fehler der Art aus dem Kontext. Die erste Runde ist umgesetzt, siehe ${R}/umsetzung-text.md. Suche gezielt dort, wo die erste Runde nicht war. Höchstens 10 Befunde, jeder mit Headless-Beleg.`, { label: 'nachsuche', phase: 'Nachtesten', schema: BEFUNDE }),
])

return { total, bestaetigt: bestaetigt.length, bilder: bilder.length, entscheidText, entscheidBilder, umsetzungText, umsetzungBilder, bauen, regression: nach[0], nachsuche: nach[1] }
