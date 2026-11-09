// R5 Glossar: welche Begriffslinks sind nach dem Sprung auf ein Register sichtbar
const L = require(process.env.ST_LIB);
(async () => {
  for (const h of ['grundlage', 'maschinen', 'unterricht', 'fachraum', 'recht', 'kantone', 'quellen']) {
    const { page, close } = await L.open({ hash: h });
    const r = await page.evaluate(() => {
      const panel = (document.querySelector('.panel:not([hidden])') || {}).id;
      const sicht = [...document.querySelectorAll('a.b-wort')].filter(a => a.getClientRects().length).map(a => a.textContent + '@' + ((a.closest('.sub,.thema') || {}).id || ''));
      return { panel, sicht };
    });
    console.log(h, '→', r.panel, r.sicht.length, r.sicht.slice(0, 6).join(', '));
    await close();
  }
})();
