// R6 Glossar: Popups in Recht, Unterricht, Fachraum öffnen und schliessen, 1280 und 375; interne Links im Popup
const L = require(process.env.ST_LIB);
async function lauf(mobile) {
  const tag = mobile ? '375' : '1280';
  const { page, errors, close } = await L.open({ mobile });
  const info = () => page.evaluate(() => {
    const p = document.getElementById('b-pop'), a = document.activeElement, r = p.getBoundingClientRect(), lh = document.getElementById('leiste').getBoundingClientRect().bottom;
    const ex = [...document.querySelectorAll('a.b-wort[aria-expanded=true]')].map(x => x.textContent);
    return { pop: !p.hidden, titel: p.hidden ? '' : (p.querySelector('.b-pop-titel') || {}).textContent, top: Math.round(r.top), bottom: Math.round(r.bottom), unterLeiste: r.top >= lh - 1, imFenster: r.bottom <= innerHeight + 1, fokus: a.tagName + '.' + a.className + ' «' + (a.textContent || '').slice(0, 30) + '»', expanded: ex, hash: location.hash, y: Math.round(scrollY) };
  });
  for (const reg of ['recht', 'unterricht', 'fachraum', 'kantone']) {
    await page.click('#t-' + reg); await page.waitForTimeout(150);
    const n = await page.evaluate((reg) => document.querySelectorAll('#' + reg + ' a.b-wort').length, reg);
    for (let i = 0; i < n; i++) {
      const d = await page.evaluate(({ reg, i }) => {
        const a = document.querySelectorAll('#' + reg + ' a.b-wort')[i];
        let x = a; while ((x = x.parentElement)) { if (x.tagName === 'DETAILS') x.open = true; }
        a.scrollIntoView({ block: 'center' });
        const r = a.getBoundingClientRect();
        return { t: a.textContent, b: a.dataset.b, sichtbar: r.width > 0 && r.height > 0, x: r.left + r.width / 2, y: r.top + r.height / 2, el: document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) === a };
      }, { reg, i });
      await page.waitForTimeout(400);
      if (!d.sichtbar) { console.log(tag, reg, i, d.b, '«' + d.t + '» NICHT SICHTBAR'); continue; }
      const loc = page.locator('#' + reg + ' a.b-wort').nth(i);
      await loc.click(); await page.waitForTimeout(250);
      const o = await info();
      await page.keyboard.press('Escape'); await page.waitForTimeout(150);
      const z = await info();
      const ok = o.pop && o.unterLeiste && o.imFenster && /b-zu/.test(o.fokus) && !z.pop && /b-wort/.test(z.fokus) && z.expanded.length === 0;
      console.log(tag, reg, i, d.b, '«' + d.t + '»', ok ? 'OK' : 'PROBLEM', ok ? '' : JSON.stringify({ d, o, z }));
    }
  }
  // interne Links im Popup: Obhut → Haftung, Ansprechperson → Pflichten, H-Satz → Was H-Sätze sind, Rückschlag → Gasflaschen
  for (const [reg, id] of [['recht', 'b-obhut'], ['recht', 'b-ansprechperson'], ['fachraum', 'b-hsaetze'], ['matrix', 'h-H360'], ['matrix', 'h-H304']]) {
    await page.click('#t-' + reg); await page.waitForTimeout(150);
    const da = await page.evaluate(({ reg, id }) => { const a = document.querySelector('#' + reg + ' a.b-wort[data-b="' + id + '"]'); if (!a) return false; let x = a; while ((x = x.parentElement)) { if (x.tagName === 'DETAILS') x.open = true; } a.scrollIntoView({ block: 'center' }); return true; }, { reg, id });
    if (!da) { console.log(tag, 'kein Link', reg, id); continue; }
    await page.waitForTimeout(300);
    await page.locator('#' + reg + ' a.b-wort[data-b="' + id + '"]').first().click(); await page.waitForTimeout(250);
    const links = await page.evaluate(() => [...document.querySelectorAll('#b-pop a[href^="#"]')].map(a => a.getAttribute('href') + ' ' + a.textContent));
    const intern = await page.evaluate(() => { const a = [...document.querySelectorAll('#b-pop .b-pop-inhalt a[href^="#"]')][0]; return a ? a.getAttribute('href') : null; });
    if (!intern) { console.log(tag, 'POPUP-LINK', id, 'keine internen Links', links); await page.keyboard.press('Escape'); continue; }
    await page.locator('#b-pop .b-pop-inhalt a[href^="#"]').first().click(); await page.waitForTimeout(1200);
    const n = await info();
    const ziel = await page.evaluate((h) => { const z = document.getElementById(h.slice(1)); if (!z) return 'fehlt'; const r = z.getBoundingClientRect(); const p = document.getElementById('b-pop'); const pr = p.getBoundingClientRect(); return { zielTop: Math.round(r.top), popDecktZiel: !p.hidden && pr.top < r.bottom && pr.bottom > r.top && pr.left < r.right && pr.right > r.left }; }, intern);
    console.log(tag, 'POPUP-LINK', id, '→', intern, n.pop ? 'POPUP BLEIBT OFFEN' : 'Popup zu', JSON.stringify({ n, ziel }));
    await page.keyboard.press('Escape'); await page.waitForTimeout(150);
  }
  if (mobile) await L.shot(page, 'r6-gl-popup-link-375');
  console.log(tag, 'Fehler', errors);
  await close();
}
(async () => { await lauf(false); await lauf(true); })();
