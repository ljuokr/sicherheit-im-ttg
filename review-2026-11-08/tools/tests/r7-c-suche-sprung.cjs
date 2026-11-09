// Runde 7: Trefferlink aus der Suche, Ziel nicht im Bild? Verlauf von scrollY
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  for (const [w, h] of [['Haftung', '#b-obhut'], ['Erste Hilfe', '#notfall'], ['Overlock', '#lehrplan'], ['Kanton Bern', null]]) {
    const { page, close } = await L.open({ width: 1280 });
    await page.fill('#f-q', w); await W(450);
    const r = await page.evaluate(async h => {
      const a = h ? document.querySelector('#erg-inhalt a[href="' + h + '"]') : document.querySelector('#erg-inhalt a[href^="#"]:not(.b-wort)');
      const log = []; const hh = a.getAttribute('href');
      window.addEventListener('scroll', () => log.push(Math.round(scrollY)));
      const y0 = scrollY; a.click();
      const z = document.getElementById(hh.slice(1));
      const t1 = Math.round(z.getBoundingClientRect().top), y1 = Math.round(scrollY);
      await new Promise(r => setTimeout(r, 400));
      return { hh, y0, direkt: { top: t1, y: y1 }, spaeter: { top: Math.round(z.getBoundingClientRect().top), y: Math.round(scrollY), docH: document.documentElement.scrollHeight }, log: log.slice(0, 10) };
    }, h);
    console.log(w, JSON.stringify(r));
    await close();
  }
})();
