// Runde 7: seitliches Überlaufen bei 320 und 375 px, alle Klapptexte offen, auch Suchergebnis und Fenster
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
const MESS = () => { const dw = document.documentElement.scrollWidth, vw = innerWidth; const zu = []; if (dw > vw) document.querySelectorAll('body *').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.right > vw + 1 && !e.closest('.wrap,.mx-wrap,figure.raumplan,[style*=overflow]') && getComputedStyle(e.parentElement).overflowX === 'visible') zu.push(e.tagName + '.' + String(e.className).slice(0, 20) + ' r=' + Math.round(r.right)); }); return { dw, vw, zu: zu.slice(0, 6) }; };
(async () => {
  for (const w of [320, 375]) {
    const { page, close } = await L.open({ mobile: true, width: w, height: 700 });
    for (const reg of ['grundlage', 'verfahren', 'matrix', 'unterricht', 'fachraum', 'kantone', 'recht', 'quellen']) {
      await page.click('#t-' + reg); await W(150);
      await page.evaluate(() => { document.querySelectorAll('.panel:not([hidden]) details').forEach(d => d.open = true); document.querySelectorAll('.panel:not([hidden]) .m-zeile[aria-expanded=false]').forEach(b => b.click()); });
      await W(150);
      const r = await page.evaluate(MESS); if (r.dw > r.vw) console.log(w, reg, JSON.stringify(r));
    }
    await page.fill('#f-q', 'Schutzbrille'); await W(500);
    let r = await page.evaluate(MESS); if (r.dw > r.vw) console.log(w, 'suche', JSON.stringify(r));
    await page.fill('#f-q', 'Bandsäge'); await W(500);
    r = await page.evaluate(MESS); if (r.dw > r.vw) console.log(w, 'suche-tabelle', JSON.stringify(r));
    await page.fill('#f-q', ''); await W(500);
    console.log(w, 'fertig');
    await close();
  }
})();
