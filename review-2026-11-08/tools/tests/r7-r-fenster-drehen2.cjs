// Runde 7: Fenster breit geöffnet, dann schmal (Tablet hochkant): Hintergrund erreichbar?
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const { page, close } = await L.open({ width: 1180, height: 820, hash: 'matrix' });
  await page.evaluate(() => [...document.querySelectorAll('a.mchip')].find(a => a.getClientRects().length).click()); await W(400);
  await page.setViewportSize({ width: 820, height: 1180 }); await W(400);
  const r = await page.evaluate(() => ({ fensterBreite: Math.round(document.getElementById('fenster').getBoundingClientRect().width), breite: innerWidth, inert: document.getElementById('inhalt').inert }));
  const stopps = []; await page.focus('#f-zu');
  for (let i = 0; i < 40; i++) { await page.keyboard.press('Tab'); const s = await page.evaluate(() => document.getElementById('fenster').contains(document.activeElement) ? 'F' : document.activeElement.tagName + '.' + String(document.activeElement.className).slice(0, 10)); if (s !== 'F') { stopps.push(s); if (stopps.length > 3) break; } }
  console.log(JSON.stringify(r), 'Tab ausserhalb des Fensters:', stopps);
  await close();
})();
