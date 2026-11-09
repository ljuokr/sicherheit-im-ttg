// Prüfrunde r6 Layout 4: Fokus nach Ende des Scrollens unter der Leiste? Leistenhöhe
const L = require(process.env.ST_LIB);
(async () => {
  for (const w of [375, 1280]) {
    const { page, close } = await L.open({ width: w, mobile: w === 375 });
    await page.click('#t-matrix'); await page.waitForTimeout(300);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.focus('#t-matrix');
    const info = await page.evaluate(() => ({ leiste: Math.round(document.getElementById('leiste').getBoundingClientRect().height), vh: innerHeight, spt: getComputedStyle(document.documentElement).scrollPaddingTop, sb: getComputedStyle(document.documentElement).scrollBehavior }));
    console.log(w, 'Leiste', JSON.stringify(info));
    const probl = [];
    for (let i = 0; i < 80; i++) {
      await page.keyboard.press('Tab'); await page.waitForTimeout(450);
      const r = await page.evaluate(() => { const a = document.activeElement; const r = a.getBoundingClientRect(); const lb = document.getElementById('leiste').getBoundingClientRect().bottom; return { n: (a.textContent || '').trim().slice(0, 30), top: Math.round(r.top), bot: Math.round(r.bottom), lb: Math.round(lb), in: !!a.closest('#leiste,#fenster') }; });
      if (!r.in && (r.bot <= r.lb + 2 || r.top >= info.vh)) probl.push(r);
    }
    console.log(w, 'verdeckt nach Scrollende', probl.length, JSON.stringify(probl.slice(0, 5)));
    await close();
  }
})();
