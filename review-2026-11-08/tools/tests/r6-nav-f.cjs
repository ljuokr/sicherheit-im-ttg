// Runde 6 Navigation F: zweiter Klick auf Chip und Materialkopf schliesst, Zustand der Adresse
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
const s = p => p.evaluate(() => location.hash + ' state=' + JSON.stringify(history.state) + ' fenster=' + !document.getElementById('fenster').hidden + ' len=' + history.length + ' fokus=' + document.activeElement.tagName + '.' + String(document.activeElement.className).slice(0, 12));
(async () => {
  const { page, errors, close } = await L.open({ width: 1280, hash: 'matrix' });
  for (const sel of ['a.mchip', 'a.mx-mat']) {
    await page.evaluate(() => scrollTo(0, 0));
    const h = await page.evaluate(sel => { const a = [...document.querySelectorAll('#matrix ' + sel)].find(a => a.getClientRects().length); a.setAttribute('data-t', sel); return a.getAttribute('href'); }, sel);
    await page.click('[data-t="' + sel + '"]'); await W(400);
    console.log(sel, h, 'offen:', await s(page));
    await page.click('[data-t="' + sel + '"]'); await W(400);
    console.log(sel, 'zweiter Klick:', await s(page));
    await page.goBack(); await W(500);
    console.log(sel, 'zurück:', await s(page));
    await page.goForward(); await W(500);
    console.log(sel, 'vorwärts:', await s(page));
    await page.click('#f-zu').catch(() => {}); await W(300);
  }
  await page.reload(); await W(500);
  console.log('neu laden:', await s(page));
  console.log('Konsole', JSON.stringify(errors));
  await close();
})();
