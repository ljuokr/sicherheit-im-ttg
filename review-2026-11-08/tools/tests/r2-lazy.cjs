// Zweite Suchrunde: erster Sprung auf frischer Seite zu Zielen unterhalb von Lazy-Bildern
const L = require(process.env.ST_LIB);
(async () => {
  const { page: p0, close: c0 } = await L.open({});
  const ziele = await p0.evaluate(() => {
    const lazy = [...document.querySelectorAll('img[loading=lazy]')];
    const out = [];
    document.querySelectorAll('.panel [id]').forEach(z => {
      if (z.closest('[hidden] [hidden]') || z.closest('.h-saetze') || z.closest('template')) return;
      const vor = lazy.filter(i => i.closest('.panel') === z.closest('.panel') && (i.compareDocumentPosition(z) & Node.DOCUMENT_POSITION_FOLLOWING) && !i.getAttribute('height'));
      if (vor.length >= 3 && (z.matches('section.begriff') || z.matches('h2,h3,section.sub'))) out.push({ id: z.id, vor: vor.length });
    });
    return out;
  });
  const lazyInfo = await p0.evaluate(() => [...document.querySelectorAll('img[loading=lazy]')].map(i => (i.closest('.panel') || {}).id).reduce((a, x) => (a[x] = (a[x] || 0) + 1, a), {}));
  await c0();
  console.log('Lazy-Bilder je Register', JSON.stringify(lazyInfo), 'Ziele mit >=3 Lazy-Bildern davor', ziele.length);
  const stich = ziele.filter((_, i) => i % Math.max(1, Math.floor(ziele.length / 8)) === 0).slice(0, 8);
  for (const reduce of [false, true]) {
    for (const z of stich) {
      const { page, close } = await L.open({});
      if (reduce) await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.evaluate(id => { const a = document.createElement('a'); a.href = '#' + id; document.querySelector('#grundlage .text').appendChild(a); a.click(); a.remove(); }, z.id);
      await page.waitForTimeout(3000);
      const top = await page.evaluate(id => Math.round(document.getElementById(id).getBoundingClientRect().top), z.id);
      console.log(reduce ? 'ohne Animation' : 'mit Animation', z.id, 'Lazy davor', z.vor, 'top nach 3 s', top, (top < 40 || top > 300) ? 'DANEBEN' : 'ok');
      if (z.id === 'b-schultraeger' && !reduce) await L.shot(page, 'r2-lazy-schultraeger');
      await close();
    }
  }
})();
