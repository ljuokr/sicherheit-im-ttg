// Zweite Suchrunde: Bilder ohne feste Grösse (Layoutsprung bei Lazy-Load) und Sprung auf Glossareinträge
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  const imgs = await page.evaluate(() => [...document.querySelectorAll('img')].map(i => ({ panel: (i.closest('.panel') || {}).id || (i.closest('template') ? 'template' : 'sonst'), lazy: i.loading, w: i.getAttribute('width'), h: i.getAttribute('height'), ar: getComputedStyle(i).aspectRatio, src: (i.getAttribute('src') || '').slice(0, 30), in: (i.closest('[id]') || {}).id })));
  const ohne = imgs.filter(i => !i.w || !i.h);
  console.log('Bilder', imgs.length, 'ohne width/height', ohne.length, 'davon lazy', ohne.filter(i => i.lazy === 'lazy').length);
  console.log(JSON.stringify(ohne.slice(0, 40).map(i => i.panel + ':' + i.in + ':' + i.lazy + ':' + i.ar)));
  // Sprung auf jeden Glossareintrag über einen erzeugten Link, Ziel nach 2,5 s im Bild?
  const ids = await page.evaluate(() => [...document.querySelectorAll('section.begriff')].map(b => b.id));
  const daneben = [];
  for (const id of ids) {
    await page.evaluate(() => { document.getElementById('t-grundlage').click(); window.scrollTo(0, 0); });
    await page.waitForTimeout(100);
    await page.evaluate(id => { const a = document.createElement('a'); a.href = '#' + id; document.querySelector('#grundlage .text').appendChild(a); a.click(); a.remove(); }, id);
    await page.waitForTimeout(2500);
    const top = await page.evaluate(id => Math.round(document.getElementById(id).getBoundingClientRect().top), id);
    if (top < 40 || top > 300) daneben.push(id + ':' + top);
  }
  console.log('Glossar-Sprünge', ids.length, 'daneben', daneben.length, daneben.join(' '));
  const hInfo = await page.evaluate(() => { const z = document.getElementById('h-H200'); if (!z) return null; const d = z.closest('details'); return { tag: z.tagName, cls: z.className, details: d ? (d.open + ' ' + d.querySelector('summary').textContent.slice(0, 40)) : null, anzeigen: getComputedStyle(z).display, rects: z.getClientRects().length, eltern: z.parentElement.tagName + '.' + z.parentElement.className + ' hidden=' + z.parentElement.closest('[hidden]') }; });
  console.log('h-H200', JSON.stringify(hInfo));
  console.log('Fehler', errors);
  await close();
})();
