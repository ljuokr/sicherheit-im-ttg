// Was liegt bei offenem Seitenfenster (ab 64rem) unter dem Fenster
const L = require(process.env.ST_LIB);
(async () => {
  for (const w of [1024, 1280, 1440]) {
    const { page, close } = await L.open({ width: w });
    await page.click('#t-matrix'); await page.waitForTimeout(150);
    await page.evaluate(() => [...document.querySelectorAll('#matrix .mchip')].find(c => /Weichl/.test(c.textContent) && c.getBoundingClientRect().width > 0).click());
    await page.waitForTimeout(200);
    const r = await page.evaluate(() => {
      const fl = document.getElementById('fenster').getBoundingClientRect().left;
      const tab = document.querySelector('#matrix table');
      const wrap = tab.closest('.wrap,[class*=wrap]');
      const unter = [...document.querySelectorAll('#tl-haupt [role=tab], #matrix thead th, #finder input, .suche-klein input')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.right > fl + 2; }).map(e => e.textContent.trim().slice(0, 20) || e.tagName);
      return { fensterLinks: Math.round(fl), tabRechts: Math.round(tab.getBoundingClientRect().right), wrap: wrap ? [wrap.className, wrap.scrollWidth, wrap.clientWidth, getComputedStyle(wrap).overflowX] : null, unterFenster: unter, docQuer: document.documentElement.scrollWidth - document.documentElement.clientWidth };
    });
    console.log(w, JSON.stringify(r));
    if (w === 1280) await L.shot(page, 'layout-unter-fenster-1280');
    await close();
  }
})();
