// Runde 7: Kontrast aller sichtbaren Texte je Register, hell und dunkel, auch Fenster, Karten und Suchergebnis
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
const PRUEF = () => {
  const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(',').map(x => parseFloat(x)); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
  const bg = e => { const st = []; for (let x = e; x; x = x.parentElement) { const s = getComputedStyle(x); if (s.backgroundImage !== 'none') return null; const c = parse(s.backgroundColor); if (c && c.a > 0) { st.push(c); if (c.a >= 1) break; } } let r = { r: 255, g: 255, b: 255 }; if (!st.length || st[st.length - 1].a < 1) r = parse(getComputedStyle(document.body).backgroundColor) || r; for (let i = st.length - 1; i >= 0; i--) { const c = st[i]; r = { r: c.r * c.a + r.r * (1 - c.a), g: c.g * c.a + r.g * (1 - c.a), b: c.b * c.a + r.b * (1 - c.a) }; } return r; };
  const out = {};
  document.querySelectorAll('body *').forEach(e => {
    if (!e.getClientRects().length) return;
    const txt = [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.nodeValue).join('').trim(); if (!txt) return;
    const s = getComputedStyle(e); if (s.visibility === 'hidden' || parseFloat(s.opacity) < 0.1) return;
    if (e.closest('.sr,[aria-hidden="true"]') && !e.closest('.dot')) return;
    const fg = parse(s.color); const b = bg(e); if (!fg || !b) return;
    const f2 = { r: fg.r * fg.a + b.r * (1 - fg.a), g: fg.g * fg.a + b.g * (1 - fg.a), b: fg.b * fg.a + b.b * (1 - fg.a) };
    const l1 = lum(f2), l2 = lum(b); const k = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const gross = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && parseInt(s.fontWeight) >= 700);
    if (k < (gross ? 3 : 4.5)) { const key = e.tagName + '.' + String(e.className).slice(0, 25) + ' ' + s.color + ' auf ' + `rgb(${Math.round(b.r)},${Math.round(b.g)},${Math.round(b.b)})`; if (!out[key]) out[key] = { k: Math.round(k * 100) / 100, n: 0, bsp: txt.slice(0, 40), wo: (e.closest('[id]') || {}).id }; out[key].n++; }
  });
  return out;
};
(async () => {
  for (const dark of [false, true]) {
    const { page, close } = await L.open({ width: 1280, dark });
    const alle = {};
    const merke = (wo, r) => Object.entries(r).forEach(([k, v]) => { if (!alle[k]) alle[k] = { ...v, wo: wo + ':' + v.wo }; });
    for (const reg of ['grundlage', 'verfahren', 'matrix', 'unterricht', 'fachraum', 'kantone', 'recht', 'quellen']) {
      await page.click('#t-' + reg); await W(200);
      await page.evaluate(() => { document.querySelectorAll('.panel:not([hidden]) details').forEach(d => d.open = true); document.querySelectorAll('.panel:not([hidden]) .m-zeile').forEach(b => b.click()); });
      merke(reg, await page.evaluate(PRUEF));
    }
    await page.click('#t-matrix'); await W(200);
    await page.evaluate(() => document.querySelector('#matrix a.mchip').click()); await W(300);
    merke('fenster', await page.evaluate(PRUEF));
    await page.evaluate(() => document.getElementById('f-zu').click()); await W(200);
    await page.evaluate(() => document.querySelector('#mat-metall .mx-mat').click()); await W(300);
    merke('fenster-metall', await page.evaluate(PRUEF));
    await page.evaluate(() => document.getElementById('f-zu').click()); await W(200);
    await page.fill('#f-q', 'Schutzbrille'); await W(500);
    merke('suche', await page.evaluate(PRUEF));
    await page.fill('#f-q', 'xyzq'); await W(500);
    merke('suche-leer', await page.evaluate(PRUEF));
    console.log(dark ? 'DUNKEL' : 'HELL', JSON.stringify(alle, null, 1));
    await close();
  }
})();
