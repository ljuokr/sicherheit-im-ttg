// Ansichten 375 für Sichtprüfung, Matrix mobil, Tabellen mit eigener Laufleiste
const L = require(process.env.ST_LIB);
(async () => {
  for (const dark of [false, true]) {
    const { page, close } = await L.open({ mobile: true, dark });
    for (const t of ['t-grundlage', 't-verfahren', 't-matrix', 't-unterricht', 't-kantone', 't-recht']) {
      await page.click('#' + t); await page.waitForTimeout(150);
      await L.shot(page, 'sicht-' + (dark ? 'd' : 'h') + '375-' + t);
    }
    await page.click('#t-matrix'); await page.waitForTimeout(150);
    const m = await page.evaluate(() => {
      const tab = document.querySelector('#matrix table') || document.querySelector('#matrix');
      const chips = [...document.querySelectorAll('#matrix .mchip')];
      const sichtbar = chips.filter(c => c.getBoundingClientRect().width > 0).length;
      const scrollers = [...document.querySelectorAll('*')].filter(e => { const cs = getComputedStyle(e); return /auto|scroll/.test(cs.overflowX) && e.scrollWidth > e.clientWidth + 1 && e.getBoundingClientRect().width > 0; }).map(e => ({ el: e.tagName + '.' + e.className + '#' + e.id, sw: e.scrollWidth, cw: e.clientWidth, tab: e.tabIndex, name: e.getAttribute('aria-label') || e.getAttribute('aria-labelledby') || '', role: e.getAttribute('role') }));
      const mxm = [...document.querySelectorAll('#matrix .mx-mat')].map(c => [c.textContent.trim(), Math.round(c.getBoundingClientRect().width)]);
      return { chips: chips.length, sichtbar, scrollers, mxm, html: (document.querySelector('#matrix .mx-zeile') || {}).outerHTML?.slice(0, 600) };
    });
    console.log(dark ? 'D' : 'H', JSON.stringify(m, null, 1).slice(0, 3000));
    for (const t of ['t-unterricht', 't-kantone', 't-recht', 't-verfahren', 't-fachraum', 't-quellen']) {
      await page.click('#' + t); await page.waitForTimeout(150);
      const s = await page.evaluate(() => { document.querySelectorAll('details').forEach(d => d.open = true); return [...document.querySelectorAll('*')].filter(e => { const cs = getComputedStyle(e); return /auto|scroll/.test(cs.overflowX) && e.scrollWidth > e.clientWidth + 1 && e.getBoundingClientRect().width > 0; }).map(e => ({ el: e.tagName + '.' + e.className + '#' + e.id, sw: e.scrollWidth, cw: e.clientWidth, tab: e.tabIndex, name: e.getAttribute('aria-label') || '', role: e.getAttribute('role') })); });
      if (s.length) console.log(dark ? 'D' : 'H', t, JSON.stringify(s));
      await page.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = false));
    }
    await close();
  }
})();
