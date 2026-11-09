// Runde 7: Beispiele der Zyklus-Treppe gegen die Plakat-Einstufung; Links der Treppe und der Ablaufleiste anklicken
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const { page, errors, close } = await L.open({ width: 1280, hash: 'unterricht' });
  const r = await page.evaluate(() => {
    const rows = [...document.querySelectorAll('#verfahren table.mtab tbody tr:not(.gruppe)')].map(tr => [tr.cells[0].textContent.trim(), [1, 2, 3].map(i => tr.cells[i].textContent.trim()).join('')]);
    const tr = [...document.querySelectorAll('.treppe li')].map(li => [li.querySelector('.tr-z').textContent, li.querySelector('.tr-bsp').textContent]);
    const treffer = tr.map(([z, bsp]) => [z, bsp.replace(/^etwa /, '').split(/, /).map(m => m + ' -> ' + (rows.filter(r => r[0].toLowerCase().replace(/\*/g, '').includes(m.toLowerCase().slice(0, 7))).map(r => r[0] + ' ' + r[1]).join('; ') || 'nicht auf Plakat'))]);
    return treffer;
  });
  console.log(JSON.stringify(r, null, 1));
  for (const sel of ['.treppe a[href="#plakat"]', '.treppe a[href="#kantone"]', '.treppe a[href="#lehrplan"]']) {
    await page.click('#t-unterricht'); await W(300);
    await page.click(sel); await W(1200);
    console.log(sel, await page.evaluate(() => { const id = location.hash.slice(1), z = document.getElementById(id); return { hash: location.hash, reg: document.querySelector('#tl-haupt [aria-selected=true]').id, top: z && Math.round(z.getBoundingClientRect().top), sicht: !!(z && z.getClientRects().length), fokus: document.activeElement.tagName + '#' + document.activeElement.id }; }));
  }
  await page.click('#t-fachraum'); await W(300);
  const ab = await page.$$eval('.ablauf a', as => as.map(a => a.getAttribute('href')));
  for (const h of ab) {
    await page.click('#t-fachraum'); await page.evaluate(() => scrollTo(0, 0)); await W(300);
    await page.click('.ablauf a[href="' + h + '"]'); await W(1200);
    console.log('ablauf', h, await page.evaluate(h => { const z = document.getElementById(h.slice(1)); const d = z.closest('details'); return { top: Math.round(z.getBoundingClientRect().top), offen: d ? d.open : '-', hash: location.hash }; }, h));
  }
  console.log('Fehler', errors);
  await close();
})();
