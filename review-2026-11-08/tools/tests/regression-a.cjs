// Regressionstest nach Umsetzung Runde 4: Matrix, Plakat, Links, Suche, Glossar, Layout, Fehler
const L = require(process.env.ST_LIB);
(async () => {
  const out = {}; const W = process.argv[2] || '123456';
  // 1 Matrix-Links
  if (W.includes('1')) {
    const { page, errors, close } = await L.open({});
    await page.click('#t-matrix'); await page.waitForTimeout(150);
    const n = await page.evaluate(() => document.querySelectorAll('#matrix a[href^="#"]:not(.b-wort)').length);
    const leer = [];
    for (let i = 0; i < n; i++) {
      const r = await page.evaluate(i => {
        const fz = document.getElementById('f-zu'); const f = document.getElementById('fenster');
        if (!f.hidden) fz.click();
        if (!document.getElementById('matrix').closest('.panel').hidden === false) document.getElementById('t-matrix').click();
        const a = document.querySelectorAll('#matrix a[href^="#"]:not(.b-wort)')[i];
        const href = a.getAttribute('href'), txt = a.textContent.trim().slice(0, 40), vis = a.getBoundingClientRect().width > 0;
        a.click();
        const fin = document.getElementById('f-in');
        const plakat = a.hasAttribute('data-maschine');
        const res = { href, txt, vis, plakat, offen: !f.hidden, titel: document.getElementById('f-titel').textContent, len: fin.textContent.trim().length };
        if (plakat) { const b = [...document.querySelectorAll('#plakat-ziel .m-zeile')].find(x => x.getAttribute('aria-expanded') === 'true'); res.karte = b ? b.querySelector('.m-name').textContent : null; }
        const zz = document.getElementById(decodeURIComponent(href.slice(1)));
        res.ziel = !!zz; res.fz = !!(zz && zz.matches('section.thema, section.verfahren, th.mx-zeile'));
        if (zz && !res.fz) { res.zielSichtbar = zz.getBoundingClientRect().height > 0; }
        return res;
      }, i);
      if (r.plakat ? !r.karte : (!r.ziel || (r.fz ? (!r.offen || r.len < 20) : (r.offen || !r.zielSichtbar)))) leer.push(r);
      else if (!r.plakat && !r.fz) out.normal = (out.normal || 0) + 1;
      // zurück auf Matrix
      await page.evaluate(() => { const f = document.getElementById('fenster'); if (!f.hidden) document.getElementById('f-zu').click(); document.getElementById('t-matrix').click(); document.querySelectorAll('#plakat-ziel .m-zeile[aria-expanded=true]').forEach(b => b.click()); });
    }
    out.matrix = { n, problem: leer };
    // Links im Fenster (Themenlisten, Einstufung) für alle Themen
    const tf = await page.evaluate(() => {
      const prob = []; const themen = [...document.querySelectorAll('section.thema, section.verfahren, th.mx-zeile')].map(z => z.id);
      for (const id of themen) {
        const a = document.createElement('a'); a.href = '#' + id; document.getElementById('matrix').appendChild(a); a.click(); a.remove();
        const f = document.getElementById('fenster'), fin = document.getElementById('f-in');
        if (f.hidden || fin.textContent.trim().length < 20) prob.push({ id, offen: !f.hidden, len: fin.textContent.trim().length });
        // interne Links im Fenster haben Ziel
        [...fin.querySelectorAll('a[href^="#"]')].forEach(l => { const h = decodeURIComponent(l.getAttribute('href').slice(1)); if (h && !document.getElementById(h)) prob.push({ id, toterLink: h, txt: l.textContent.trim().slice(0, 40) }); });
        document.getElementById('f-zu').click();
      }
      return { n: themen.length, prob };
    });
    out.fensterAlle = tf;
    out.err1 = errors.slice();
    await close();
  }
  // 2 Plakat-Karten
  if (W.includes('2')) {
    const { page, errors, close } = await L.open({});
    await page.click('#t-verfahren'); await page.waitForTimeout(150);
    out.plakat = await page.evaluate(() => {
      const bs = [...document.querySelectorAll('#plakat-ziel .m-zeile')], prob = [];
      bs.forEach(b => { b.click(); const k = b.nextElementSibling; const ok = b.getAttribute('aria-expanded') === 'true' && k && !k.hidden && k.getBoundingClientRect().height > 10 && k.textContent.trim().length > 10; if (!ok) prob.push(b.textContent.trim().slice(0, 40)); b.click(); });
      return { n: bs.length, prob };
    });
    // Links in Karten
    out.kartenLinks = await page.evaluate(() => [...document.querySelectorAll('#plakat-ziel a[href^="#"]')].filter(a => { const h = decodeURIComponent(a.getAttribute('href').slice(1)); return h && !document.getElementById(h); }).map(a => a.getAttribute('href')));
    out.err2 = errors.slice();
    await close();
  }
  // 3 interne Links überall, inkl. template
  if (W.includes('3')) {
    const { page, errors, close } = await L.open({});
    out.links = await page.evaluate(() => {
      const alle = [...document.querySelectorAll('a[href^="#"]')];
      [...document.querySelectorAll('template')].forEach(t => alle.push(...t.content.querySelectorAll('a[href^="#"]')));
      const tot = alle.filter(a => { const h = decodeURIComponent(a.getAttribute('href').slice(1)); return h && !document.getElementById(h); }).map(a => a.getAttribute('href') + ' «' + a.textContent.trim().slice(0, 40) + '»' + (a.closest('section[id]') ? ' in #' + a.closest('section[id]').id : ''));
      const ids = [...document.querySelectorAll('[id]')].map(e => e.id); const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
      return { n: alle.length, tot, dupIds: [...new Set(dup)] };
    });
    // Jeden Link klicken: Ziel sichtbar?
    const n = out.links.n;
    out.sprung = await page.evaluate(async () => {
      const prob = []; const alle = [...document.querySelectorAll('.panel a[href^="#"]:not(.b-wort)')];
      for (const a of alle) {
        const h = decodeURIComponent(a.getAttribute('href').slice(1)); const z = document.getElementById(h); if (!z) continue;
        const panel = a.closest('.panel'); const tab = document.getElementById('t-' + panel.id) || document.querySelector('[aria-controls="' + panel.id + '"]');
        // Register des Links öffnen
        const sub = a.closest('.sub');
        const ta = sub && document.querySelector('[aria-controls="' + sub.id + '"]');
        if (tab) tab.click(); if (ta) ta.click();
        let d = a.closest('details'); while (d) { d.open = true; d = d.parentElement.closest('details'); }
        a.click(); await new Promise(r => setTimeout(r, 5));
        const f = document.getElementById('fenster');
        const sichtbar = !f.hidden || z.getBoundingClientRect().height > 0 || (z.tagName === 'TEMPLATE');
        if (!sichtbar) prob.push(a.getAttribute('href') + ' «' + a.textContent.trim().slice(0, 30) + '» aus #' + panel.id);
        if (!f.hidden) document.getElementById('f-zu').click();
        const pop = document.getElementById('b-pop'); if (pop && !pop.hidden) pop.querySelector('.b-zu').click();
      }
      return { n: alle.length, prob };
    });
    out.err3 = errors.slice();
    await close();
  }
  // 4 Suche
  if (W.includes('4')) {
    const { page, errors, close } = await L.open({});
    out.suche = {};
    for (const w of ['Säge', 'Leinöl', 'Nickel', 'Gehörschutz']) {
      await page.fill('#f-q', w); await page.waitForTimeout(400);
      out.suche[w] = await page.evaluate(() => ({ status: document.getElementById('erg-status').textContent.trim().slice(0, 120), len: document.getElementById('erg-inhalt').textContent.trim().length, hidden: document.getElementById('ergebnis').hidden }));
      // Links im Ergebnis haben Ziel
      out.suche[w].tot = await page.evaluate(() => [...document.querySelectorAll('#erg-inhalt a[href^="#"]')].filter(a => { const h = decodeURIComponent(a.getAttribute('href').slice(1)); return h && !document.getElementById(h); }).map(a => a.getAttribute('href')).slice(0, 5));
    }
    await page.fill('#f-q', ''); await page.waitForTimeout(300);
    out.err4 = errors.slice();
    await close();
  }
  // 5 Glossar-Popups samt Bild
  if (W.includes('5')) {
    const { page, errors, close } = await L.open({ width: 1280 });
    out.glossar = await page.evaluate(async () => {
      const ids = [...new Set([...document.querySelectorAll('a.b-wort')].map(a => a.dataset.b))], prob = [], mitBild = [];
      for (const id of ids) {
        const a = [...document.querySelectorAll('a.b-wort')].find(x => x.dataset.b === id);
        const panel = a.closest('.panel'); const tab = panel && document.querySelector('[aria-controls="' + panel.id + '"]'); if (tab) tab.click();
        const sub = a.closest('.sub'); const ta = sub && document.querySelector('[aria-controls="' + sub.id + '"]'); if (ta) ta.click();
        a.click();
        const pop = document.getElementById('b-pop');
        const imgs = pop ? [...pop.querySelectorAll('img')] : [];
        await Promise.all(imgs.map(i => i.decode().catch(() => null)));
        imgs.forEach(i => { const r = i.getBoundingClientRect(); if (r.width < 10 || r.height < 10) prob.push(id + ' Bild unsichtbar ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
        const quelleImgs = document.getElementById(id).querySelectorAll('img').length;
        if (!pop || pop.hidden || pop.textContent.trim().length < 30) prob.push(id + ' öffnet nicht');
        if (quelleImgs && imgs.length !== quelleImgs) prob.push(id + ' Bild fehlt');
        imgs.forEach(i => { if (!i.complete || i.naturalWidth === 0) prob.push(id + ' Bild lädt nicht'); });
        if (imgs.length) mitBild.push(id);
        if (pop && !pop.hidden) pop.querySelector('.b-zu').click();
      }
      // Bilder in Glossar-Quelle insgesamt
      const brokenAll = [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => (i.alt || i.src.slice(0, 40)));
      return { n: ids.length, mitBild, prob, brokenAll };
    });
    // Bilder laden (alle, auch lazy) nach Scroll ins Bild
    out.bilderAlle = await page.evaluate(async () => {
      const imgs = [...document.images]; imgs.forEach(i => i.loading = 'eager');
      await new Promise(r => setTimeout(r, 1500));
      return { n: imgs.length, kaputt: imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.alt.slice(0, 50) || i.src.slice(0, 50)), offen: imgs.filter(i => !i.complete).length };
    });
    out.err5 = errors.slice();
    await close();
  }
  // 6 Register auf 375 ohne Querscrollen, Hell und Dunkel
  out.layout = [];
  if (W.includes('6')) for (const dark of [false, true]) {
    const { page, errors, close } = await L.open({ mobile: true, dark });
    const tabs = await page.evaluate(() => [...document.querySelectorAll('#tl-haupt [role=tab]')].map(t => t.id));
    for (const t of tabs) {
      await page.click('#' + t); await page.waitForTimeout(150);
      const subs = await page.evaluate(t => { const l = document.querySelector('#reg2 [data-haupt="' + document.getElementById(t).getAttribute('aria-controls') + '"]'); return l ? [...l.querySelectorAll('[role=tab]')].map(x => x.id) : [null]; }, t);
      for (const s of subs) {
        if (s) { await page.evaluate(s => document.getElementById(s).click(), s); await page.waitForTimeout(100); }
        const r = await page.evaluate(() => {
          // alle details öffnen
          document.querySelectorAll('.panel:not([hidden]) details').forEach(d => d.open = true);
          const sw = document.documentElement.scrollWidth, cw = document.documentElement.clientWidth;
          const breit = [...document.querySelectorAll('.panel:not([hidden]) *')].filter(e => { const r = e.getBoundingClientRect(); if (r.width === 0) return false; if (e.closest('.mx-wrap,.mtab-wrap,pre,.tab-wrap,[style*="overflow"]')) return false; let p = e.parentElement, scroll = false; while (p) { const o = getComputedStyle(p).overflowX; if (o === 'auto' || o === 'scroll') { scroll = true; break; } p = p.parentElement; } return !scroll && r.right > cw + 1; }).map(e => e.tagName + '.' + e.className + ' ' + Math.round(e.getBoundingClientRect().right) + ' «' + e.textContent.trim().slice(0, 30) + '»').slice(0, 4);
          return { sw, cw, breit };
        });
        if (r.sw > r.cw || r.breit.length) out.layout.push({ dark, t, s, ...r });
      }
    }
    // Fenster und Popup auf 375
    await page.click('#t-matrix'); await page.waitForTimeout(100);
    const fw = await page.evaluate(() => { const c = [...document.querySelectorAll('#matrix .mchip')].find(c => c.getBoundingClientRect().width > 0 && !c.hasAttribute('data-maschine')); c.click(); const f = document.getElementById('fenster'); const r = f.getBoundingClientRect(); const sw = f.scrollWidth, cw = f.clientWidth; document.getElementById('f-zu').click(); return { left: r.left, right: r.right, sw, cw }; });
    if (fw.right > 376 || fw.sw > fw.cw + 1) out.layout.push({ dark, fenster: fw });
    await L.shot(page, 'regr-375-' + (dark ? 'd' : 'h'));
    out['err6' + dark] = errors.slice();
    await close();
  }
  console.log(JSON.stringify(out, null, 1));
})();
