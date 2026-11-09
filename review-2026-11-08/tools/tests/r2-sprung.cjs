// Zweite Suchrunde: Laden mit #hash (Thema, Material, Begriff, Karte), Links aus Suchergebnissen
const L = require(process.env.ST_LIB);
const sichtbar = () => {
  const vis = el => { if (!el) return false; const r = el.getBoundingClientRect(); return !!(el.offsetParent || el.getClientRects().length) && r.height > 0; };
  return vis;
};
(async () => {
  const { page: p0, close: c0 } = await L.open({});
  const ids = await p0.evaluate(() => ({
    thema: document.querySelector('section.thema').id,
    begriff: document.querySelector('section.begriff').id,
    mat: document.querySelector('th.mx-zeile').id,
    verf: document.querySelector('section.verfahren').id,
    sub: [...document.querySelectorAll('.sub')].map(s => s.id).slice(0, 30),
  }));
  await c0();
  console.log(JSON.stringify(ids));
  for (const h of [ids.thema, ids.verf, ids.mat, ids.begriff, 'begriffe', 'plakat']) {
    const { page, errors, close } = await L.open({ hash: h });
    await page.waitForTimeout(300);
    const r = await page.evaluate(h => {
      const z = document.getElementById(h), r = z.getBoundingClientRect();
      const sel = [...document.querySelectorAll('#tl-haupt [role=tab]')].find(t => t.getAttribute('aria-selected') === 'true');
      return { register: sel && sel.textContent, fenster: !document.getElementById('fenster').hidden, fTitel: document.getElementById('f-titel').textContent, zielSichtbar: z.getClientRects().length > 0, top: Math.round(r.top), hash: location.hash, panelOffen: !z.closest('.panel').hidden };
    }, h);
    console.log('#' + h, JSON.stringify(r), errors.join(' '));
    await close();
  }
  // Suchergebnis-Links: jeden h3-Link der Suche klicken
  const { page, errors, close } = await L.open({});
  const fehl = [];
  let n = 0;
  for (const q of ['Schutzbrille', 'Gehörschutz', 'Feuerlöscher', 'Haftung', 'Lagerung', 'Lösungsmittel', 'Erste Hilfe', 'Staub']) {
    await page.fill('#f-q', q); await page.waitForTimeout(350);
    const hrefs = await page.evaluate(() => [...document.querySelectorAll('#erg-inhalt h3 a')].map(a => a.getAttribute('href')));
    for (const href of hrefs) {
      await page.fill('#f-q', q); await page.waitForTimeout(350);
      const r0 = await page.evaluate(href => {
        const a =[...document.querySelectorAll('#erg-inhalt h3 a')].find(x => x.getAttribute('href') === href); if (!a) return { fehlt: true };
        a.click(); return {};
      }, href);
      await page.waitForTimeout(1500);
      const r = r0.fehlt ? r0 : await page.evaluate(href => {
        const z = document.getElementById(href.slice(1)); const fen = !document.getElementById('fenster').hidden;
        const r = z.getBoundingClientRect();
        return { ergOffen: !document.getElementById('ergebnis').hidden, fenster: fen, zielSichtbar: fen || (z.getClientRects().length > 0 && r.height > 0), top: Math.round(r.top) };
      }, href);
      await page.evaluate(() => { const b = document.getElementById('f-zu'); if (!document.getElementById('fenster').hidden) b.click(); });
      n++;
      if (r.fehlt || r.ergOffen || !r.zielSichtbar || (!r.fenster && (r.top < 0 || r.top > 900))) fehl.push(q + ' ' + href + ' ' + JSON.stringify(r));
    }
  }
  console.log('Suchlinks geklickt', n, 'auffällig', fehl.length); fehl.slice(0, 12).forEach(x => console.log('  ', x));
  console.log('Fehler', errors);
  await close();
})();
