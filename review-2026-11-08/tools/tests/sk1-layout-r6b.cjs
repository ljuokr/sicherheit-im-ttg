// Skeptiker 1, Layout r6b: Raumplan sichtbar machen, Treppe-Fix ohne !important bei 375
const L = require(process.env.ST_LIB);
(async () => {
  for (const w of [375, 768, 1280]) {
    const { page, close } = await L.open({ width: w, mobile: w === 375 });
    await page.evaluate(() => { document.querySelector('#t-fachraum').click(); });
    await page.waitForTimeout(300);
    await page.evaluate(() => { const s = document.querySelector('figure.raumplan'); let d = s && s.closest('details'); while (d) { d.open = true; d = d.parentElement.closest('details'); } });
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => { const s = document.querySelector('figure.raumplan svg'); if (!s) return 'kein'; const vb = s.viewBox.baseVal.width; const sw = s.getBoundingClientRect().width; const fs = [...s.querySelectorAll('text')].map(t => parseFloat(getComputedStyle(t).fontSize)); return { sw: Math.round(sw), vb, minPx: +(Math.min(...fs) * sw / vb).toFixed(1), maxPx: +(Math.max(...fs) * sw / vb).toFixed(1), fs: [...new Set(fs)], n: fs.length, figW: Math.round(document.querySelector('figure.raumplan').getBoundingClientRect().width) }; });
    console.log('raumplan', w, JSON.stringify(r));
    if (w === 375) {
      await page.addStyleTag({ content: '@media (max-width:40rem){figure.raumplan{overflow-x:auto} figure.raumplan svg{min-width:34rem}}' });
      const r2 = await page.evaluate(() => { const f = document.querySelector('figure.raumplan'); const s = f.querySelector('svg'); return { svgW: Math.round(s.getBoundingClientRect().width), fsw: f.scrollWidth, fcw: f.clientWidth, docSW: document.documentElement.scrollWidth, tabindex: f.getAttribute('tabindex') }; });
      console.log('raumplan 375 mitFix', JSON.stringify(r2));
    }
    await close();
  }
  { const { page, close } = await L.open({ width: 375, mobile: true });
    await page.evaluate(() => document.querySelector('#t-unterricht').click()); await page.waitForTimeout(300);
    await page.addStyleTag({ content: '.treppe li:nth-child(n){min-height:0}.treppe ol{align-items:stretch}.treppe li:nth-child(1){margin-top:4rem}.treppe li:nth-child(2){margin-top:2rem}@media (max-width:44rem){.treppe li{margin-top:0}}' });
    console.log('treppe 375 Fix wie vorgeschlagen', JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.treppe li')].map(li => getComputedStyle(li).marginTop))));
    await close(); }
})();
