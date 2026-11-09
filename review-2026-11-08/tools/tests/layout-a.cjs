// Layoutprüfung: Querscrollen, Überlauf, Kontrast, Struktur je Register, Breite und Farbschema
const L = require(process.env.ST_LIB);
const BREITEN = [375, 768, 1280];
(async () => {
  for (const dark of [false, true]) for (const w of BREITEN) {
    const { page, errors, close } = await L.open({ width: w, mobile: w === 375, dark });
    const tabs = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('#tl-haupt [role=tab]').forEach(t => {
        const hid = t.getAttribute('aria-controls');
        const sub = document.querySelector('#reg2 [role=tablist][data-haupt="' + hid + '"]');
        if (sub) sub.querySelectorAll('[role=tab]').forEach(s => out.push([t.id, s.id]));
        else out.push([t.id, null]);
      });
      return out;
    });
    if (w === 1280 && !dark) console.log('TABS', JSON.stringify(tabs));
    for (const [h, s] of tabs) {
      await page.click('#' + h).catch(e => console.log('klick fehlt', h, e.message.slice(0, 80)));
      if (s) await page.evaluate(id => document.getElementById(id).click(), s);
      await page.waitForTimeout(150);
      // alle details öffnen, damit verborgener Inhalt mitgeprüft wird
      const r = await page.evaluate(() => {
        document.querySelectorAll('details').forEach(d => d.open = true);
        const W = document.documentElement.clientWidth;
        const res = { quer: document.documentElement.scrollWidth - W, ueber: [], kontrast: [] };
        const sichtbar = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
        // Elemente, die rechts über den Rand ragen, ohne in einem scrollenden Behälter zu stecken
        document.querySelectorAll('body *').forEach(el => {
          if (!sichtbar(el)) return;
          const r = el.getBoundingClientRect();
          if (r.right > W + 1 || r.left < -1) {
            let p = el.parentElement, scroll = false;
            while (p && p !== document.body) { const o = getComputedStyle(p).overflowX; if (o === 'auto' || o === 'scroll' || o === 'hidden' || o === 'clip') { scroll = true; break; } p = p.parentElement; }
            if (!scroll && el.closest('[hidden]') === null && !el.closest('.vh,.sr-only')) res.ueber.push(el.tagName + '.' + el.className + ' ' + Math.round(r.left) + '-' + Math.round(r.right) + ' "' + (el.textContent || '').trim().slice(0, 40) + '"');
          }
        });
        // Kontrast Textknoten
        const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; };
        const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
        const bg = el => { let layers = []; let e = el; while (e) { const cs = getComputedStyle(e); if (cs.backgroundImage !== 'none' && !/gradient/.test(cs.backgroundImage)) return null; const c = parse(cs.backgroundColor); if (c && c[3] > 0) { layers.push(c); if (c[3] >= 1) break; } e = e.parentElement; } let b = [255, 255, 255]; if (!e) { b = parse(getComputedStyle(document.documentElement).backgroundColor) || b; } for (let i = layers.length - 1; i >= 0; i--) { const c = layers[i]; b = [0, 1, 2].map(k => c[k] * c[3] + b[k] * (1 - c[3])); } return b; };
        const gesehen = new Set();
        const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let n;
        while ((n = tw.nextNode())) {
          if (!n.textContent.trim()) continue;
          const el = n.parentElement; if (!el || !sichtbar(el) || el.closest('[hidden],[aria-hidden=true] svg,script,style,template')) continue;
          const cs = getComputedStyle(el);
          const fg = parse(cs.color); const b = bg(el); if (!fg || !b) continue;
          const f2 = [0, 1, 2].map(k => fg[k] * fg[3] * (+cs.opacity || 1) + b[k] * (1 - fg[3] * (+cs.opacity || 1)));
          const L1 = lum(f2), L2 = lum(b); const k = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
          const gross = parseFloat(cs.fontSize) >= 24 || (parseFloat(cs.fontSize) >= 18.66 && +cs.fontWeight >= 700);
          if (k < (gross ? 3 : 4.5)) { const key = el.tagName + '.' + el.className + cs.color + Math.round(k * 10); if (gesehen.has(key)) continue; gesehen.add(key); res.kontrast.push(k.toFixed(2) + ' ' + el.tagName + '.' + el.className + ' ' + cs.color + ' auf rgb(' + b.map(Math.round) + ') ' + cs.fontSize + ' "' + n.textContent.trim().slice(0, 40) + '"'); }
        }
        res.ueber = res.ueber.slice(0, 8); res.kontrast = res.kontrast.slice(0, 12);
        return res;
      });
      const tag = (dark ? 'D' : 'H') + w + ' ' + h + (s ? '/' + s : '');
      console.log(tag, JSON.stringify(r, null, 0));
      if (r.quer > 0 || r.ueber.length) await L.shot(page, 'layout-' + (dark ? 'd' : 'h') + w + '-' + (s || h));
      await page.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = false));
    }
    if (errors.length) console.log('Fehler', dark, w, errors);
    await close();
  }
})();
