// Runde 7: Matrix-Tabelle (breit) gegen Matrix-Liste (Handy): gleiche Chips je Material? Fenster aus der Liste
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const { page, errors, close } = await L.open({ mobile: true, hash: 'matrix' });
  const r = await page.evaluate(() => {
    const tab = {}, lis = {};
    document.querySelectorAll('.mx-wrap tbody tr').forEach(tr => { const th = tr.querySelector('th'); if (!th) return; const k = th.id || th.textContent.trim().slice(0, 20); tab[k] = [...tr.querySelectorAll('a.mchip')].map(a => a.getAttribute('href') + '|' + a.textContent.trim()); });
    document.querySelectorAll('.mx-liste .mxl').forEach(m => { const k = '#mat-' + m.className.match(/z-(\w+)/)[1]; lis[k] = [...m.querySelectorAll('a.mchip')].map(a => a.getAttribute('href') + '|' + a.textContent.trim()); });
    const diff = {};
    Object.keys(tab).forEach(k => { const l = lis['#' + k] || []; const nurTab = tab[k].filter(x => !l.includes(x)), nurList = l.filter(x => !tab[k].includes(x)); if (nurTab.length || nurList.length) diff[k] = { nurTab, nurList }; });
    return { tabKeys: Object.keys(tab), listKeys: Object.keys(lis), diff, sichtTab: !!document.querySelector('.mx-wrap').getClientRects().length, nListe: document.querySelectorAll('.mx-liste a.mchip').length, nTab: document.querySelectorAll('.mx-wrap a.mchip').length };
  });
  console.log(JSON.stringify(r, null, 1));
  // Fenster aus der Liste öffnen, zweiter Klick schliesst? aria-current?
  await page.evaluate(() => document.querySelector('.mx-liste a.mchip').scrollIntoView({ block: 'center' }));
  const h = await page.evaluate(() => document.querySelector('.mx-liste a.mchip').getAttribute('href'));
  await page.click('.mx-liste a.mchip'); await W(400);
  console.log('offen', h, await page.evaluate(() => ({ f: !document.getElementById('fenster').hidden, cur: [...document.querySelectorAll('.mchip[aria-current=true]')].map(c => c.closest('.mx-liste') ? 'liste' : 'tab') })));
  await page.click('#f-zu'); await W(500);
  console.log('zu', await page.evaluate(() => ({ f: !document.getElementById('fenster').hidden, hash: location.hash, fokus: document.activeElement.className + ' ' + (document.activeElement.closest('.mx-liste') ? 'liste' : 'anders'), sicht: document.activeElement.getClientRects().length > 0 })));
  console.log('Fehler', errors);
  await close();
})();
