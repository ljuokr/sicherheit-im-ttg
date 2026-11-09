// R5: Welches Bild liegt auf 375 px über den Suchergebnis-Links?
const L = require(process.env.ST_LIB);
(async () => {
  const { page, close } = await L.open({ mobile: true });
  await page.fill('#f-q', 'Staub'); await page.waitForTimeout(1500);
  for (const i of [0, 1, 3]) {
    const d = await page.evaluate((i) => {
      const a = [...document.querySelectorAll('#erg-inhalt a[href^="#"]')][i];
      a.scrollIntoView({ block: 'center', behavior: 'instant' });
      const q = a.getBoundingClientRect(), x = q.left + Math.min(q.width / 2, 20), y = q.top + q.height / 2, e = document.elementFromPoint(x, y);
      const kette = []; let p = e; while (p && p !== document.body) { const s = getComputedStyle(p); kette.push(p.tagName + '#' + p.id + '.' + p.className + ' ' + s.position); p = p.parentElement; }
      const r = e.getBoundingClientRect();
      return { href: a.getAttribute('href'), linkRect: [q.left, q.top, q.width, q.height].map(Math.round), punkt: [Math.round(x), Math.round(y)], kette: kette.slice(0, 8), imgRect: [r.left, r.top, r.width, r.height].map(Math.round), alt: e.alt, scrollY: Math.round(scrollY), sw: document.documentElement.scrollWidth };
    }, i);
    console.log(JSON.stringify(d));
    if (i === 0) await L.shot(page, 'r5-img375');
  }
  await close();
})();
