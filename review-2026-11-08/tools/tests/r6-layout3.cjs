// Prüfrunde r6 Layout 3: Fokus sichtbar, Fokus unter der Leiste, Platzhalter, Fenster
const L = require(process.env.ST_LIB);
(async () => {
  for (const w of [375, 768, 1280]) for (const dark of [false, true]) {
    const tag = (dark ? 'd' : 'h') + w;
    const { page, errors, close } = await L.open({ width: w, mobile: w === 375, dark });
    const ph = await page.evaluate(() => { const i = document.querySelector('#leiste input[type=search], #leiste input'); return i ? getComputedStyle(i, '::placeholder').color + ' auf ' + getComputedStyle(i).backgroundColor + ' fs ' + getComputedStyle(i).fontSize : 'kein Feld'; });
    console.log(tag, 'Platzhalter', ph);
    for (const t of ['t-unterricht', 't-fachraum', 't-matrix', 't-quellen']) {
      await page.click('#' + t); await page.waitForTimeout(250);
      await page.evaluate(() => { window.scrollTo(0, 0); document.activeElement.blur(); });
      await page.focus('#' + t);
      const ohne = new Map(), verdeckt = new Map(); let n = 0;
      for (let i = 0; i < 120; i++) {
        await page.keyboard.press('Tab'); await page.waitForTimeout(30);
        const r = await page.evaluate(() => {
          const a = document.activeElement; if (!a || a === document.body) return null;
          const s = getComputedStyle(a); const r = a.getBoundingClientRect();
          const lb = document.getElementById('leiste').getBoundingClientRect().bottom;
          const sichtbar = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || (s.boxShadow !== 'none');
          let sp = null; if (a.tagName === 'INPUT') { const n = a.nextElementSibling; if (n) { const ns = getComputedStyle(n); sp = ns.outlineStyle !== 'none'; } }
          const name = a.tagName + '.' + a.className + ' ' + (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 30);
          return { name, sichtbar: sichtbar || sp, imLeiste: !!a.closest('#leiste'), verdeckt: !a.closest('#leiste') && r.bottom > 0 && r.top < lb - 2 ? Math.round(lb - r.top) : 0, aus: r.bottom < 0 || r.top > innerHeight };
        });
        if (!r) continue; n++;
        if (!r.sichtbar && !ohne.has(r.name.split(' ')[0])) ohne.set(r.name.split(' ')[0], r.name);
        if ((r.verdeckt || r.aus) && !verdeckt.has(r.name)) verdeckt.set(r.name, r.verdeckt + (r.aus ? ' ausserhalb' : ''));
      }
      console.log(tag, t, 'Stopps', n, 'ohne Fokusring', JSON.stringify([...ohne.values()]), 'verdeckt', JSON.stringify([...verdeckt.entries()].slice(0, 6)));
    }
    if (errors.length) console.log(tag, 'Fehler', errors);
    await close();
  }
})();
