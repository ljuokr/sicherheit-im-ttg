// Runde 7: Raumplan als Tabstopp (tabindex=0): scrollbar? Fokusrahmen? Tabfolge
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
const akt = p => p.evaluate(() => { const e = document.activeElement; const s = getComputedStyle(e); return e.tagName + '.' + e.className + ' ' + (e.textContent || '').trim().slice(0, 25) + (e.matches('figure') ? ' fv=' + e.matches(':focus-visible') + ' outline=' + s.outlineStyle + ' ' + s.outlineWidth : ''); });
(async () => {
  for (const [w, m] of [[1280, false], [375, true]]) {
    const { page, close } = await L.open({ width: w, mobile: m, hash: 'planen' });
    await W(1200);
    await page.evaluate(() => { for (let d = document.querySelector('figure.raumplan').closest('details'); d; d = d.parentElement.closest('details')) d.open = true; }); await W(200);
    const info = await page.evaluate(() => { const f = document.querySelector('figure.raumplan'); return { ti: f.getAttribute('tabindex'), inDetails: !!f.closest('details'), offen: f.closest('details') && f.closest('details').open, ov: getComputedStyle(f).overflowX, sw: f.scrollWidth, cw: f.clientWidth }; });
    await page.focus('figure.raumplan');
    const a = await akt(page);
    await page.keyboard.press('Shift+Tab'); const b = await akt(page);
    await page.keyboard.press('Tab'); const c = await akt(page);
    console.log(w, JSON.stringify(info), '\n  focus():', a, '\n  Shift+Tab:', b, '\n  Tab:', c);
    await L.shot(page, 'r7-raumplan-fokus-' + w);
    await close();
  }
})();
