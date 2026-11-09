// Runde 7: Seite direkt mit jedem verlinkten Anker laden (geteilter Link), Ziel sichtbar und im Bild?
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const a = await L.open({ width: 1280 });
  const ziele = await a.page.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="#"]')].map(x => decodeURIComponent(x.getAttribute('href').slice(1))).filter(Boolean))]);
  await a.close();
  console.log('Ziele', ziele.length);
  const b = await L.open({ width: 1280 });
  const prob = [];
  for (const z of ziele) {
    await b.page.goto('file://' + process.env.ST_SEITE + '#' + encodeURIComponent(z)); await b.page.reload(); await W(900);
    const r = await b.page.evaluate(id => {
      const e = document.getElementById(id), f = document.getElementById('fenster');
      const sicht = !!(e && e.getClientRects().length); let top = null; if (sicht) top = Math.round(e.getBoundingClientRect().top);
      const leiste = document.getElementById('leiste').getBoundingClientRect().bottom;
      return { sicht, top, leiste: Math.round(leiste), fenster: !f.hidden, fTitel: f.hidden ? '' : document.getElementById('f-titel').textContent, reg: (document.querySelector('#tl-haupt [aria-selected=true]') || {}).id, hash: location.hash };
    }, z);
    const ok = r.fenster || (r.sicht && r.top !== null && r.top >= r.leiste - 4 && r.top < 900);
    if (!ok) prob.push({ z, ...r });
  }
  console.log(JSON.stringify(prob, null, 0).replace(/\},\{/g, '},\n{'));
  console.log('Fehler', b.errors);
  await b.close();
})();
