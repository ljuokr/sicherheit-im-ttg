// Runde 7: externe Links formal prüfen (kein Netz): Leerzeichen, Protokoll, page-Anker, gleiche Quelle mit verschiedenen URLs, target
const L = require(process.env.ST_LIB);
(async () => {
  const { page, close } = await L.open({ width: 1280 });
  const r = await page.evaluate(() => {
    const alle = [...document.querySelectorAll('a[href]')].concat([...document.querySelectorAll('template')].flatMap(t => [...t.content.querySelectorAll('a[href]')]));
    const ext = alle.filter(a => !a.getAttribute('href').startsWith('#'));
    const out = { anzahl: ext.length, formal: [], seitenAnker: [], ziele: {}, protokolle: {} };
    ext.forEach(a => {
      const h = a.getAttribute('href');
      if (/\s/.test(h) || /[«»]/.test(h)) out.formal.push(h);
      try { const u = new URL(h); out.protokolle[u.protocol] = (out.protokolle[u.protocol] || 0) + 1; if (u.hash && /page=/.test(u.hash)) out.seitenAnker.push(a.textContent.trim().slice(0, 40) + ' -> ' + u.hash); } catch (e) { out.formal.push('ungültig: ' + h); }
      const t = a.textContent.replace(/\s+/g, ' ').replace(/↗/g, '').trim();
      const key = h.split('#')[0];
      (out.ziele[key] = out.ziele[key] || new Set()).add(t.slice(0, 50));
    });
    // PDF-Links mit Seitenangabe im Text, aber ohne #page
    out.seiteOhneAnker = ext.filter(a => /S\. \d/.test(a.textContent) && /\.pdf/i.test(a.getAttribute('href')) && !/#page=/.test(a.getAttribute('href'))).length;
    // gleiche Quellenbezeichnung, verschiedene Ziele
    const nachText = {};
    ext.forEach(a => { const k = a.textContent.replace(/,? S\. .*$|,? Abschnitt.*$|,? Frage.*$|,? Art\..*$|↗|\s+/g, ' ').trim(); (nachText[k] = nachText[k] || new Set()).add(a.getAttribute('href').split('#')[0]); });
    out.textMehrereZiele = Object.entries(nachText).filter(([k, v]) => v.size > 1 && k.length > 2).map(([k, v]) => k + ' => ' + [...v].join(' | '));
    out.ziele = Object.keys(out.ziele).length;
    return out;
  });
  console.log(JSON.stringify(r, null, 1));
  await close();
})();
