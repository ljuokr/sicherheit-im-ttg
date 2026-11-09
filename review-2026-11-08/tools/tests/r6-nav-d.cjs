// Runde 6 Navigation D: Ablaufleiste 1280, Scrollverlauf beim ersten Klick
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  for (const [width, height] of [[1280, 900], [1024, 768], [1440, 1000]]) {
    for (const id of ['planen', 'fachraum-betreiben', 'maschinen-warten', 'lagerung', 'entsorgung']) {
      const { page, errors, close } = await L.open({ width, height, hash: 'fachraum' });
      await W(300);
      await page.evaluate(() => { window._ys = []; addEventListener('scroll', () => window._ys.push(Math.round(scrollY))); });
      await page.click('.ablauf a[href="#' + id + '"]'); await W(1500);
      const r = await page.evaluate(id => {
        const z = document.getElementById(id), rr = z.getBoundingClientRect();
        return { y: Math.round(scrollY), max: document.documentElement.scrollHeight - innerHeight, top: Math.round(rr.top), leiste: Math.round(document.getElementById('leiste').getBoundingClientRect().bottom), ys: window._ys.filter((v, i, a) => i % 5 === 0 || i === a.length - 1).join(','), hh: getComputedStyle(document.documentElement).getPropertyValue('--hh') };
      }, id);
      console.log(width, id, JSON.stringify(r));
      await close();
    }
  }
})();
