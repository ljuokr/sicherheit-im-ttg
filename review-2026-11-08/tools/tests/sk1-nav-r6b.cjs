// Skeptiker 1: Fokusfolge bei Browser-Zurück aus dem Fenster (ungepatcht und Variante alle aus sk1-nav-r6.cjs)
const path = require('path');
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  for (const v of ['orig', 'alle']) {
    if (v !== 'orig') process.env.ST_SEITE = path.join(process.env.TMPDIR, 'sk1-' + v + '.html');
    for (const tief of [false, true]) {
      const { page, close } = await L.open({ width: 1280, hash: 'matrix' });
      await page.evaluate(tief => { const c = [...document.querySelectorAll('#matrix a.mchip')].filter(a => a.getClientRects().length); const a = tief ? c[c.length - 1] : c[0]; a.setAttribute('data-t', '1'); a.scrollIntoView({ block: 'center' }); }, tief);
      await W(300);
      await page.focus('[data-t="1"]'); await page.keyboard.press('Enter'); await W(500);
      await page.evaluate(() => { window.__ev = []; document.addEventListener('focusin', e => __ev.push('in:' + e.target.tagName + '#' + e.target.id + '.' + String(e.target.className).slice(0, 8))); window.addEventListener('scroll', () => { if (__ev[__ev.length - 1] !== 'scroll') __ev.push('scroll'); }); });
      const y0 = await page.evaluate(() => Math.round(scrollY));
      await page.goBack(); await W(700);
      console.log(v, tief ? 'tief' : 'oben', 'y vorher', y0, await page.evaluate(() => location.hash + ' y=' + Math.round(scrollY) + ' fenster=' + !document.getElementById('fenster').hidden + ' fokus=' + document.activeElement.tagName + '#' + document.activeElement.id + '.' + String(document.activeElement.className).slice(0, 8) + ' ev=' + __ev.join(',')));
      await close();
    }
  }
})();
