// Sprungziele unter der haftenden Leiste, 375 und 1280
const L = require(process.env.ST_LIB);
(async () => {
  for (const w of [375, 1280]) {
    const { page, close } = await L.open({ width: w, mobile: w === 375 });
    const ziele = await page.evaluate(() => [...new Set([...document.querySelectorAll('main a[href^="#"]:not(.b-wort), #inhalt a[href^="#"]:not(.b-wort)')].map(a => a.getAttribute('href')))].filter(h => { const z = document.getElementById(decodeURIComponent(h.slice(1))); return z && !z.matches('section.thema, section.verfahren, th.mx-zeile, .panel'); }).slice(0, 40));
    const schlecht = [];
    for (const h of ziele) {
      const r = await page.evaluate(h => {
        const a = [...document.querySelectorAll('a[href="' + h + '"]')][0];
        const f = document.getElementById('fenster'); if (f && !f.hidden) document.getElementById('f-zu').click();
        a.click();
        const z = document.getElementById(decodeURIComponent(h.slice(1)));
        const lb = document.getElementById('leiste').getBoundingClientRect().bottom;
        const zr = z.getBoundingClientRect();
        return { h, zTop: Math.round(zr.top), leiste: Math.round(lb), sichtbar: zr.height > 0 };
      }, h);
      await page.waitForTimeout(60);
      const r2 = await page.evaluate(h => { const z = document.getElementById(decodeURIComponent(h.slice(1))); return Math.round(z.getBoundingClientRect().top); }, h);
      r.zTop = r2;
      if (!r.sichtbar || r.zTop < r.leiste - 2) schlecht.push(r);
    }
    console.log(w, ziele.length, JSON.stringify(schlecht).slice(0, 1500));
    await close();
  }
})();
