// Prüft, ob das Ziel eines Verweises den angekündigten Inhalt enthält (auch in <template>)
const L = require(process.env.ST_LIB);
const PAARE = [
  ['holzstaub', 'Imprägn'], ['holzstaub', 'Carbon'], ['holzstaub', 'MDF'], ['holzstaub', 'E1'], ['holzstaub', 'Fichte'], ['holzstaub', 'Maske'], ['holzstaub', 'FFP'], ['holzstaub', 'Kunststoff'],
  ['farben-lacke-spruehen', 'Holzschutz'], ['farben-lacke-spruehen', 'Pigment'], ['farben-lacke-spruehen', '2K'], ['farben-lacke-spruehen', 'Lasur'], ['farben-lacke-spruehen', 'Dispersion'],
  ['wachsen', 'MEKO'], ['wachsen', 'Carnauba'], ['lasercutten', 'Chrom'], ['lasercutten', 'Leder'], ['lasercutten', 'bromiert'],
  ['glasieren-und-brennen', 'Pellet'], ['glasieren-und-brennen', 'Ofen'], ['glasieren-und-brennen', 'aufstell'], ['glasieren-und-brennen', 'Glasurreste'], ['glasieren-und-brennen', 'Reste'], ['glasieren-und-brennen', 'entsorg'],
  ['hartloeten', 'Paste'], ['hartloeten', 'blank'], ['hartloeten', 'bor'], ['3d-druck', 'Nano'], ['3d-druck', 'ABS'],
  ['giessen-und-formen-mit-fluessigen-kunststoffen', 'Montageschaum'], ['giessen-und-formen-mit-fluessigen-kunststoffen', 'styrolfrei'], ['giessen-und-formen-mit-fluessigen-kunststoffen', 'Reste'],
  ['mat-metall', 'Blei'], ['mat-metall', 'Hautkontakt'], ['mat-metall', 'Nickel'], ['mat-metall', 'Schmuck'],
  ['kleben', 'Acrylglas'], ['kleben', 'Handschuh'], ['kleben', 'Weissleim'], ['bohrmaschine', 'Handschuh'], ['bohrmaschine', 'Schutzbrille'],
  ['gasflaschen', 'Druckredu'], ['gasflaschen', 'Rückschlag'], ['gasflaschen', 'prüf'], ['gasflaschen', 'Funktion'],
  ['lagerung', 'Propan'], ['lagerung', 'Gaskartusche'], ['lagerung', 'Chemikalienliste'], ['lagerung', 'sichtbar'],
  ['installationen', 'Explosion'], ['installationen', 'explodieren'], ['installationen', 'Absaug'], ['installationen', 'Schlüsselschalter'], ['installationen', 'belüftet'], ['installationen', 'Schutzvorrichtung'],
  ['speckstein-und-asbest', 'Asbestteile'], ['speckstein-und-asbest', 'alte'], ['leinoel', 'Lappen'], ['leinoel', 'entsorg'],
  ['maschinen', 'Nähmaschine'], ['maschinen', 'Stickcomputer'], ['maschinen', 'Overlock'], ['maschinen', 'Aufsicht'], ['maschinen', 'Kategorie'],
  ['raeume', 'Sicherheitsglas'], ['raeume', 'verbunden'], ['lernort', 'Funktionsbereich'], ['festhalten', 'instruiert'],
  ['schweissen', 'Schutzstufe'], ['schweissen', 'Schürze'], ['schweissen', 'Rostfrei'], ['schweissen', 'rostfrei'],
  ['sicher-unterrichten', 'Fachraumordnung'], ['fachraum-betreiben', 'Fachraumordnung'], ['fuer-jeden-fachraum', 'Ordnung'],
  ['haftung', 'Werkeigent'], ['haftung', 'Art. 58'], ['schulleitung', 'Ansprechperson'], ['dokumentation', 'Wartung'], ['dokumentation', 'Checklist'],
  ['kantone', 'Bern'], ['heissgeraete', 'Bügeleisen'], ['metall-und-zinngiessen', 'Zierzinn'], ['weichloeten', 'bleihaltig'], ['emaillieren-und-glasaetzen', 'Flusssäure'], ['abbeizen-und-bruenieren', 'Chromsäure'],
];
(async () => {
  const { page, close } = await L.open({});
  const r = await page.evaluate((PAARE) => {
    const finde = (id) => document.getElementById(id) || [...document.querySelectorAll('template')].map(t => t.content.getElementById(id)).find(Boolean);
    const text = (id) => {
      let z = finde(id); if (!z) return null;
      // Bei Überschrift: Inhalt bis zur nächsten gleichrangigen Überschrift oder ganzes umgebendes details/section
      const box = z.closest('details,section.thema,.sub,section') || z;
      return (/^H[1-6]$/.test(z.tagName) && box === z.parentElement) ? box.textContent : (z.matches('details,section,th,tr,div,article') ? z.textContent + ' ' + (z.closest('details,section') || z).textContent : box.textContent);
    };
    return PAARE.map(([id, w]) => { const t = text(id); return id + ' / ' + w + ': ' + (t === null ? 'ZIEL FEHLT' : (t.includes(w) ? 'ja' : 'NEIN') + ' (' + t.length + ')'); });
  }, PAARE);
  console.log(r.join('\n'));
  await close();
})();
