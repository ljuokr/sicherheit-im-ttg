// Runde 7: Fenster offen, dann Breite ändern (Tablet drehen): bleibt der Inhalt inert?
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const { page, close } = await L.open({ width: 820, height: 1180, hash: 'matrix' });
  await page.evaluate(() => [...document.querySelectorAll('a.mchip')].find(a => a.getClientRects().length).click()); await W(400);
  const zst = () => page.evaluate(() => { const f = document.getElementById('fenster'); const r = f.getBoundingClientRect(); return { breite: innerWidth, fensterBreite: Math.round(r.width), inertInhalt: document.getElementById('inhalt').inert, inertLeiste: document.getElementById('leiste').inert, titel: document.getElementById('f-titel').textContent }; });
  console.log('hoch 820', JSON.stringify(await zst()));
  await page.setViewportSize({ width: 1180, height: 820 }); await W(400);
  console.log('quer 1180', JSON.stringify(await zst()));
  // Anderes Feld neben dem Fenster anklicken
  const ziel = await page.evaluate(() => { const c = [...document.querySelectorAll('.mx-wrap a.mchip')].filter(a => { const r = a.getBoundingClientRect(); return a.getClientRects().length && r.right < document.getElementById('fenster').getBoundingClientRect().left && r.top > 150 && r.bottom < innerHeight; }); return c.length ? (() => { const r = c[1].getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, t: c[1].textContent }; })() : null; });
  if (ziel) { await page.mouse.click(ziel.x, ziel.y); await W(400); console.log('Klick auf', ziel.t, 'neben dem Fenster ->', JSON.stringify(await zst())); }
  await page.keyboard.press('Tab'); console.log('Tab ->', await page.evaluate(() => document.activeElement.tagName + '.' + document.activeElement.className + ' ' + document.activeElement.textContent.slice(0, 20)));
  await L.shot(page, 'r7-fenster-gedreht');
  await close();
})();
