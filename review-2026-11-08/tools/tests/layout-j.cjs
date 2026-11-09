// Sprung auf #raeume und #maschinen einzeln nachstellen
const L = require(process.env.ST_LIB);
(async () => {
  for (const w of [375, 1280]) for (const h of ['#raeume']) {
    const { page, close } = await L.open({ width: w, mobile: w === 375 });
    const info = await page.evaluate(h => { const a = document.querySelector('a[href="' + h + '"]'); const p = a.closest('.panel'); a.closest('.panel') && document.getElementById('t-' + p.id) && document.getElementById('t-' + p.id).click(); return { von: p && p.id, text: a.textContent.trim(), ziel: document.getElementById(h.slice(1)).tagName + '.' + document.getElementById(h.slice(1)).className }; }, h);
    await page.waitForTimeout(150);
    await page.evaluate(h => { const a = [...document.querySelectorAll('a[href="' + h + '"]')].find(x => x.getBoundingClientRect().width > 0); a.setAttribute('data-k','1'); a.scrollIntoView({ block: 'center' }); }, h);
    await page.waitForTimeout(100);
    await page.evaluate(() => document.querySelector('[data-k="1"]').click());
    await page.waitForTimeout(500);
    const r = await page.evaluate(h => { const z = document.getElementById(h.slice(1)); const lb = document.getElementById('leiste').getBoundingClientRect(); return { zTop: Math.round(z.getBoundingClientRect().top), zH: Math.round(z.getBoundingClientRect().height), leisteUnten: Math.round(lb.bottom), hh: getComputedStyle(document.documentElement).getPropertyValue('--hh'), y: Math.round(scrollY), hash: location.hash, fokus: document.activeElement.tagName + '#' + document.activeElement.id }; }, h);
    console.log(w, h, JSON.stringify(info), JSON.stringify(r));
    await L.shot(page, 'layout-sprung-' + w + '-' + h.slice(1));
    await close();
  }
})();
