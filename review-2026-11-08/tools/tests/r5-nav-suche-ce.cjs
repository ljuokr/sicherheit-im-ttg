// R5: Suchergebnis «Brand», Link #b-ce, und versteckte H-Sätze im Ergebnis
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({ width: 1280 });
  await page.fill('#f-q', 'Brand'); await page.waitForTimeout(400);
  const r = await page.evaluate(() => {
    const ls = [...document.querySelectorAll('#erg-inhalt a[href="#b-ce"]')];
    return ls.map(a => { a.scrollIntoView({ block: 'center', behavior: 'instant' }); const q = a.getBoundingClientRect(); const e = document.elementFromPoint(q.left + 3, q.top + q.height / 2); return { cls: a.className, txt: a.textContent, vis: a.getClientRects().length, w: Math.round(q.width), in: a.closest('h3') ? 'h3' : a.parentElement.tagName, oben: e && (e === a || a.contains(e) ? 'selbst' : e.tagName + '.' + e.className) }; });
  });
  console.log('b-ce Links im Ergebnis', JSON.stringify(r));
  const h = await page.evaluate(() => [...document.querySelectorAll('#erg-inhalt a[href^="#h-"]')].map(a => a.getAttribute('href') + ' ' + a.closest('section').textContent.replace(/\s+/g, ' ').slice(0, 90)));
  console.log('H-Links im Ergebnis «Brand»', JSON.stringify(h));
  await page.fill('#f-q', 'Bern'); await page.waitForTimeout(400);
  console.log('H-Links «Bern»', JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('#erg-inhalt a[href^="#h-"]')].map(a => a.closest('section').textContent.replace(/\s+/g, ' ').slice(0, 120)))));
  await page.fill('#f-q', 'giftig'); await page.waitForTimeout(400);
  console.log('«giftig»: Abschnitte mit #h-', await page.evaluate(() => document.querySelectorAll('#erg-inhalt a[href^="#h-"]').length), 'Status', await page.evaluate(() => document.getElementById('erg-status').textContent));
  await page.evaluate(() => { const a = document.querySelector('#erg-inhalt h3 a[href^="#h-"]'); a.setAttribute('data-hx', 1); a.scrollIntoView({ block: 'center', behavior: 'instant' }); });
  await page.click('[data-hx]'); await page.waitForTimeout(800);
  console.log('Klick H-Link:', JSON.stringify(await page.evaluate(() => ({ hash: location.hash, tab: document.querySelector('#tl-haupt [aria-selected=true]').id, erg: !document.getElementById('ergebnis').hidden, fokus: document.activeElement.tagName + '#' + document.activeElement.id, scrollY: Math.round(scrollY), pop: !document.getElementById('b-pop').hidden }))));
  await L.shot(page, 'r5-suche-h-satz-1280');
  console.log('Fehler', JSON.stringify(errors));
  await close();
})();
