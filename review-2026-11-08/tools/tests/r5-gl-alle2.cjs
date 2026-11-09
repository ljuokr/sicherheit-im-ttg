// R5 Glossar: «Alle Begriffe» auf 375 px, Lage des Ziels über die Zeit und Scroll-Ereignisse
const L = require(process.env.ST_LIB);
(async () => {
  for (const mobile of [true, false]) {
    const { page, close } = await L.open({ mobile, hash: 'recht' });
    await page.evaluate(() => [...document.querySelectorAll('#recht a.b-wort')].find(a => a.checkVisibility()).click());
    await page.evaluate(() => { window.__log = []; const b = document.getElementById('begriffe');
      const m = w => window.__log.push(w + ' t=' + Math.round(performance.now() % 100000) + ' top=' + Math.round(b.getBoundingClientRect().top) + ' y=' + Math.round(scrollY) + ' hDoc=' + document.documentElement.scrollHeight);
      window.__m = m; addEventListener('scroll', () => m('scroll'));
      new ResizeObserver(() => m('resize-body')).observe(document.body); });
    await page.evaluate(() => { document.querySelector('#b-pop .b-pop-alle a').click(); window.__m('nach click'); });
    for (const t of [50, 300, 1000]) { await page.waitForTimeout(t); await page.evaluate(t => window.__m('nach ' + t), t); }
    const r = await page.evaluate(() => ({ log: window.__log, leiste: Math.round(document.getElementById('leiste').getBoundingClientRect().bottom), smt: getComputedStyle(document.getElementById('begriffe')).scrollMarginTop, sb: getComputedStyle(document.documentElement).scrollBehavior }));
    console.log(mobile ? '375' : '1280', 'leiste unten', r.leiste, 'scroll-margin-top', r.smt, 'scroll-behavior', r.sb); r.log.slice(0, 25).forEach(x => console.log('  ' + x));
    await close();
  }
})();
