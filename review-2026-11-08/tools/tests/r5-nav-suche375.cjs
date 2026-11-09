// R5: Warum lassen sich Suchergebnis-Links auf 375 px nicht anklicken?
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({ mobile: true });
  await page.fill('#f-q', 'Staub'); await page.waitForTimeout(400);
  const r = await page.evaluate(() => {
    const a = [...document.querySelectorAll('#erg-inhalt a[href^="#"]')][3];
    a.setAttribute('data-x', 1); a.scrollIntoView({ block: 'center', behavior: 'instant' });
    const q = a.getBoundingClientRect(), e = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2);
    const lr = document.getElementById('leiste').getBoundingClientRect();
    return { href: a.getAttribute('href'), rect: [Math.round(q.top), Math.round(q.height)], oben: e && (a.contains(e) ? 'selbst' : (e.id || e.tagName + '.' + e.className)), leiste: [Math.round(lr.top), Math.round(lr.bottom)], ih: innerHeight, inertInhalt: document.getElementById('inhalt').inert, fenster: !document.getElementById('fenster').hidden };
  });
  console.log(JSON.stringify(r));
  await L.shot(page, 'r5-suche-375');
  try { await page.click('[data-x]', { timeout: 2000 }); console.log('Klick ok', page.url().split('#')[1]); } catch (e) { console.log(e.message.split('\n').filter(l => /intercept|visible|stable|inert|outside/.test(l)).slice(0, 4).join(' | ')); }
  // Schleife wie im Haupttest, alle Links zu «Staub»
  let ok = 0, fail = [];
  const n = await page.evaluate(() => { document.getElementById('f-zu').click(); return 0; }).catch(() => 0);
  for (let i = 0; i < 20; i++) {
    await page.evaluate(() => { const f = document.getElementById('fenster'); if (!f.hidden) document.getElementById('f-zu').click(); });
    const p0 = () => page.evaluate(() => { const p = document.getElementById('b-pop'); return p.hidden ? 'zu' : 'OFFEN:' + p.querySelector('.b-pop-titel').textContent + ' ae=' + document.activeElement.className; });
    if (i < 2) console.log('i=' + i + ' vor Neusuche pop ' + await p0());
    if (await page.evaluate(() => document.getElementById('ergebnis').hidden)) { await page.fill('#f-q', ''); if (i < 2) console.log('  nach leeren ' + await p0()); await page.fill('#f-q', 'Staub'); await page.waitForTimeout(400); if (i < 2) console.log('  nach Staub ' + await p0()); }
    const d = await page.evaluate((i) => { document.querySelectorAll('[data-y]').forEach(x => x.removeAttribute('data-y')); const a = [...document.querySelectorAll('#erg-inhalt a[href^="#"]')][i]; if (!a) return null; a.setAttribute('data-y', 1); a.scrollIntoView({ block: 'center', behavior: 'instant' }); const q = a.getBoundingClientRect(), e = document.elementFromPoint(q.left + Math.min(q.width / 2, 20), q.top + q.height / 2); return { href: a.getAttribute('href'), oben: e && (a.contains(e) ? 'selbst' : (e.id || e.tagName + '.' + e.className)), inert: document.getElementById('inhalt').inert, aktiv: document.activeElement.id }; }, i);
    if (!d) break;
    try { await page.click('[data-y]', { timeout: 1500 }); ok++; await page.waitForTimeout(300); } catch (e) {
      fail.push(JSON.stringify(d));
      if (fail.length === 1) {
        console.log('Überdeckendes Bild:', JSON.stringify(await page.evaluate(() => { const a = document.querySelector('[data-y]'), q = a.getBoundingClientRect(), e = document.elementFromPoint(q.left + Math.min(q.width / 2, 20), q.top + q.height / 2); const kette = []; let p = e; while (p && p !== document.body) { const s = getComputedStyle(p); kette.push(p.tagName + '#' + p.id + '.' + p.className + ' pos=' + s.position + ' z=' + s.zIndex); p = p.parentElement; } const r = e.getBoundingClientRect(); return { kette, rect: [r.left, r.top, r.width, r.height].map(Math.round), alt: e.alt, scrollY: Math.round(scrollY), docH: document.documentElement.scrollHeight, erg: !document.getElementById('ergebnis').hidden, reg: !document.getElementById('register').hidden, hash: location.hash }; })));
        await L.shot(page, 'r5-suche-375-verdeckt');
      }
    }
  }
  console.log('Schleife ok', ok, 'fehl', fail.length, fail.slice(0, 3).join(' '));
  await close();
})();
