// Fokus verlässt das ganzflächige Themenfenster auf schmalen Breiten
const L = require(process.env.ST_LIB);
(async () => {
  for (const w of [375, 768, 1280]) {
    const { page, close } = await L.open({ width: w, mobile: w === 375 });
    await page.click('#t-matrix'); await page.waitForTimeout(150);
    const h = await page.evaluate(() => { const c = [...document.querySelectorAll('#matrix .mchip')].find(c => !c.hasAttribute('data-maschine') && document.getElementById(c.getAttribute('href').slice(1))); c.setAttribute('data-test', '1'); return c.textContent.trim(); });
    console.log(await page.evaluate(() => { const c = document.querySelector('[data-test="1"]'); const r = c.getBoundingClientRect(); return [r.width, r.height, getComputedStyle(c).display, !!c.closest('details:not([open])'), !!c.closest('[hidden]')]; })); await page.focus('[data-test="1"]'); await page.keyboard.press('Enter'); await page.waitForTimeout(200);
    const k = await page.evaluate(() => ({ offen: !document.getElementById('fenster').hidden, n: [...document.getElementById('fenster').querySelectorAll('a[href],button,summary')].filter(e => e.offsetParent).length }));
    let raus = null;
    for (let i = 0; i < k.n + 6; i++) {
      await page.keyboard.press('Tab');
      const r = await page.evaluate(() => { const a = document.activeElement, f = document.getElementById('fenster'); if (f.contains(a)) return null; const rr = a.getBoundingClientRect(); const x = Math.min(innerWidth - 2, Math.max(1, rr.left + rr.width / 2)), y = Math.min(innerHeight - 2, Math.max(1, rr.top + rr.height / 2)); const top = document.elementFromPoint(x, y); return { a: a.tagName + ' ' + (a.getAttribute('aria-label') || a.textContent).trim().slice(0, 40), verdeckt: !!top && f.contains(top), imBild: rr.bottom > 0 && rr.top < innerHeight }; });
      if (r && !/^BODY/.test(r.a)) { raus = Object.assign({ nachTabs: i + 1 }, r); break; }
    }
    console.log(w, 'Chip', h, JSON.stringify(k), 'raus:', JSON.stringify(raus));
    if (raus && raus.verdeckt) await L.shot(page, 'layout-fokus-hinter-fenster-' + w);
    await close();
  }
})();
