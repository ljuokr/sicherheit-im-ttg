// R5: Materialfenster Metall auf 375 px erreichbar? Registerwechsel-Log 375
const L = require(process.env.ST_LIB);
(async () => {
  for (const vp of [{ mobile: true }, { width: 1280 }]) {
    const { page, close } = await L.open(vp);
    await page.click('#t-matrix');
    const r = await page.evaluate(() => {
      const th = document.getElementById('mat-metall');
      const a = th.querySelector('.mx-mat');
      const cs = getComputedStyle(a), ct = getComputedStyle(th);
      const links = [...document.querySelectorAll('a[href="#mat-metall"]')].map(x => ({ cls: x.className, txt: x.textContent.trim().slice(0, 30), vis: x.getClientRects().length > 0, wo: (x.closest('[id]') || {}).id }));
      let p = th, kette = []; while (p && p !== document.body) { const s = getComputedStyle(p); if (s.display === 'none' || s.visibility === 'hidden') kette.push(p.tagName + '#' + p.id + '.' + p.className + ' ' + s.display); p = p.parentElement; }
      return { aDisplay: cs.display, thDisplay: ct.display, kette, links, rect: a.getBoundingClientRect().width };
    });
    console.log((vp.width || 375), JSON.stringify(r));
    await close();
  }
})();
