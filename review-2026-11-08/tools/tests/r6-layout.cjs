// Prüfrunde r6 Layout: Querscrollen, Überlauf, Kontrast, alt, je Breite und Farbschema
const L = require(process.env.ST_LIB);
const TABS = ['t-grundlage','t-verfahren','t-matrix','t-unterricht','t-fachraum','t-kantone','t-recht','t-quellen'];
(async () => {
  for (const w of [375, 768, 1280]) for (const dark of [false, true]) {
    const tag = (dark ? 'd' : 'h') + w;
    const { page, errors, close } = await L.open({ width: w, mobile: w === 375, dark });
    for (const t of TABS) {
      await page.click('#' + t); await page.waitForTimeout(250);
      await page.evaluate(() => { document.querySelectorAll('[role=tabpanel]:not([hidden]) details').forEach(d => d.open = true); window.scrollTo(0,0); });
      await page.waitForTimeout(150);
      const r = await page.evaluate((vw) => {
        const out = { quer: document.documentElement.scrollWidth - document.documentElement.clientWidth, raus: [], kontrast: [], abgeschn: [], altfehlt: [] };
        const panel = document.querySelector('[role=tabpanel]:not([hidden])');
        const scrollAhn = e => { for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) { const s = getComputedStyle(p); if (/(auto|scroll|hidden)/.test(s.overflowX) && p.scrollWidth > p.clientWidth + 1) return true; } return false; };
        const sicht = e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden'; };
        const pc = c => { const m = c.match(/[\d.]+/g); if (!m) return [0,0,0,0]; const v = m.map(Number); if (c.startsWith("color(")) { return [v[0]*255,v[1]*255,v[2]*255,v[3]===undefined?1:v[3]]; } return v; };
        const lin = c => { c/=255; return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4); };
        const lum = a => 0.2126*lin(a[0])+0.7152*lin(a[1])+0.0722*lin(a[2]);
        const bgOf = e => { for (let p = e; p; p = p.parentElement) { const s = getComputedStyle(p); const c = pc(s.backgroundColor); if (s.backgroundImage !== 'none' && !/gradient/.test(s.backgroundImage)) return null; if ((c[3] === undefined ? 1 : c[3]) > 0.5) return c; } return pc(getComputedStyle(document.body).backgroundColor); };
        const gesehen = new Set();
        for (const e of panel.querySelectorAll('*')) {
          if (!sicht(e)) continue;
          const r = e.getBoundingClientRect();
          if ((r.right > vw + 1 || r.left < -1) && !scrollAhn(e) && !e.closest('svg') && out.raus.length < 6) out.raus.push(e.tagName + '.' + e.className + ' ' + Math.round(r.left) + '-' + Math.round(r.right) + ' ' + (e.textContent||'').trim().slice(0,30));
          const s = getComputedStyle(e);
          if (s.overflow === 'hidden' || s.overflowX === 'hidden' || s.textOverflow === 'ellipsis') { if (e.scrollWidth > e.clientWidth + 2 && out.abgeschn.length < 6) out.abgeschn.push(e.tagName + '.' + e.className + ' ' + e.scrollWidth + '>' + e.clientWidth + ' ' + (e.textContent||'').trim().slice(0,30)); }
          if (e.tagName === 'IMG' && !e.hasAttribute('alt')) out.altfehlt.push(e.src.slice(-40));
          const txt = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
          if (!txt || e.closest('svg')) continue;
          const fg = pc(s.color); const bg = bgOf(e); if (!bg) continue;
          const a = fg[3] === undefined ? 1 : fg[3];
          const f = [0,1,2].map(i => fg[i]*a + bg[i]*(1-a));
          const k = (Math.max(lum(f),lum(bg))+0.05)/(Math.min(lum(f),lum(bg))+0.05);
          const gross = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && +s.fontWeight >= 700);
          if (k < (gross ? 3 : 4.5)) { const key = e.className + s.color + bg.join(); if (!gesehen.has(key)) { gesehen.add(key); out.kontrast.push(e.tagName + '.' + e.className + ' ' + k.toFixed(2) + ' ' + s.color + ' auf ' + bg.slice(0,3).join(',') + ' «' + e.textContent.trim().slice(0,25) + '»'); } }
        }
        // Bilder global
        out.svgOhne = [...panel.querySelectorAll('svg')].filter(s => sicht(s) && !s.closest('[aria-hidden=true]') && s.getAttribute('aria-hidden') !== 'true' && !s.getAttribute('aria-label') && !s.getAttribute('aria-labelledby') && !s.querySelector('title')).length;
        return out;
      }, w);
      console.log(tag, t, JSON.stringify(r));
      if (t === 't-fachraum' || t === 't-unterricht') await L.shot(page, 'r6-' + tag + '-' + t);
    }
    if (errors.length) console.log(tag, 'Fehler', errors);
    await close();
  }
})();
