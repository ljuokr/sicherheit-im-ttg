// Runde 7: Suche, Trefferlinks anklicken, Ziel sichtbar?
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
const WOERTER = ['Lötkolben', 'Gehörschutz', 'Formaldehyd', 'Schutzbrille', 'Haftung', 'Woodsches', 'Bandsäge', 'Feuerlöscher', 'Zyklus 1', 'Nadelholz', 'Epoxid', 'Kanton Bern', 'Erste Hilfe', 'Spraydose', 'Overlock', 'Ständerbohrmaschine', 'Glasur', 'CE', 'H-Sätze', 'Mutterschutz'];
(async () => {
  const { page, errors, close } = await L.open({ width: 1280 });
  for (const w of WOERTER) {
    await page.fill('#f-q', w); await W(450);
    const info = await page.evaluate(() => ({ status: document.getElementById('erg-status').textContent, links: [...document.querySelectorAll('#erg-inhalt a[href^="#"]:not(.b-wort)')].map(a => ({ h: a.getAttribute('href'), m: a.getAttribute('data-maschine'), t: a.textContent.slice(0, 50) })) }));
    const probleme = [];
    for (let i = 0; i < info.links.length; i++) {
      await page.fill('#f-q', w); await W(450);
      const ok = await page.evaluate(i => { const a = [...document.querySelectorAll('#erg-inhalt a[href^="#"]:not(.b-wort)')][i]; if (!a) return 'fehlt'; a.click(); return 'ok'; }, i);
      await W(350);
      const r = await page.evaluate(h => {
        const id = decodeURIComponent(h.slice(1)), z = document.getElementById(id), f = document.getElementById('fenster');
        const sicht = z && z.getClientRects().length > 0;
        const erg = !document.getElementById('ergebnis').hidden;
        let imView = false; if (z && sicht) { const r = z.getBoundingClientRect(); imView = r.bottom > 0 && r.top < innerHeight; }
        return { id, sicht, erg, fenster: !f.hidden, imView, hash: location.hash, fokus: document.activeElement.tagName + '#' + document.activeElement.id + '.' + String(document.activeElement.className).slice(0, 12) };
      }, info.links[i].h);
      if (info.links[i].m) { if (r.erg) probleme.push({ l: info.links[i], r }); continue; }
      if (r.erg || !(r.sicht || r.fenster) || (!r.fenster && !r.imView)) probleme.push({ l: info.links[i], r });
    }
    console.log(w, '|', info.status, '| Links', info.links.length, '| Probleme', JSON.stringify(probleme));
  }
  // Leeren per Escape / Zurück-Knopf
  await page.fill('#f-q', 'Haftung'); await W(450);
  await page.click('#zurueck'); await W(200);
  console.log('nach Zurück-Knopf', await page.evaluate(() => ({ erg: !document.getElementById('ergebnis').hidden, q: document.getElementById('f-q').value, hash: location.hash, fokus: document.activeElement.id })));
  console.log('Fehler', errors);
  await close();
})();
