// R5 Navigation: Links aus Fenstern heraus, Registerwechsel bei offenem Fenster, Materialfenster Metall
const L = require(process.env.ST_LIB);

async function lauf(vp) {
  const { page, errors, close } = await L.open(vp);
  // alle Fensterziele: Themen, Verfahren, Materialien
  const ziele = await page.evaluate(() => [...document.querySelectorAll('section.thema[id], section.verfahren[id], th.mx-zeile[id]')].map(z => z.id));
  const abw = []; let n = 0, ok = 0;
  const art = {};
  for (const zid of ziele) {
    // Fenster öffnen über einen Hilfslink (gleicher Weg wie Klick)
    const anzahl = await page.evaluate((zid) => {
      const f = document.getElementById('fenster'); if (!f.hidden) document.getElementById('f-zu').click();
      const a = document.createElement('a'); a.href = '#' + zid; a.id = 'r5-hilf'; a.textContent = 'x'; document.getElementById('inhalt').appendChild(a); a.click(); a.remove();
      const ls = [...document.querySelectorAll('#f-in a[href^="#"]')];
      return ls.length;
    }, zid);
    for (let i = 0; i < anzahl; i++) {
      const info = await page.evaluate(({ zid, i }) => {
        const f = document.getElementById('fenster');
        if (f.hidden || document.getElementById('f-titel').dataset.z !== zid) {
          if (!f.hidden) document.getElementById('f-zu').click();
          if (!document.getElementById('ergebnis').hidden) document.getElementById('zurueck').click();
          const a = document.createElement('a'); a.href = '#' + zid; document.getElementById('inhalt').appendChild(a); a.click(); a.remove();
          document.getElementById('f-titel').dataset.z = zid;
        }
        const pop = document.getElementById('b-pop'); if (!pop.hidden) pop.querySelector('.b-zu').click();
        const a = [...document.querySelectorAll('#f-in a[href^="#"]')][i];
        let d = a.closest('details'); while (d) { d.open = true; d = d.parentElement.closest('details'); }
        a.setAttribute('data-fl', '1');
        a.scrollIntoView({ block: 'center', behavior: 'instant' });
        const r = a.getBoundingClientRect();
        return { href: a.getAttribute('href'), text: a.textContent.trim().slice(0, 40), m: a.getAttribute('data-maschine'), b: a.classList.contains('b-wort'), sichtbar: r.width > 0, cls: a.className };
      }, { zid, i });
      n++;
      const k = info.m ? 'maschine' : info.b ? 'begriff' : 'andere'; art[k] = (art[k] || 0) + 1;
      if (!info.sichtbar) { abw.push([zid, info.href, info.text, 'unsichtbar']); continue; }
      const e0 = errors.length;
      try { await page.click('[data-fl="1"]', { timeout: 1500 }); } catch (e) { abw.push([zid, info.href, info.text, 'Klick: ' + e.message.split('\n')[0].slice(0, 100)]); await page.evaluate(() => { const x = document.querySelector('[data-fl]'); if (x) x.removeAttribute('data-fl'); }); continue; }
      await page.evaluate(() => new Promise(res => { let y = -1, n = 0, t = 0; const f = () => { t++; if (scrollY === y) n++; else { n = 0; y = scrollY; } if (n >= 6 || t > 180) res(); else requestAnimationFrame(f); }; requestAnimationFrame(f); }));
      const st = await page.evaluate((href) => {
        const x = document.querySelector('[data-fl]'); if (x) x.removeAttribute('data-fl');
        const id = decodeURIComponent(href.slice(1)), z = document.getElementById(id), f = document.getElementById('fenster');
        const tab = document.querySelector('#tl-haupt [aria-selected=true]').getAttribute('aria-controls');
        const lh = document.getElementById('leiste').getBoundingClientRect().bottom;
        const ae = document.activeElement, pop = document.getElementById('b-pop');
        const r = z && z.getBoundingClientRect();
        const fenster = !f.hidden;
        if (fenster) delete document.getElementById('f-titel').dataset.z; // erzwingt Neuöffnen
        return { hash: decodeURIComponent(location.hash), tab, fenster, ftitel: document.getElementById('f-titel').textContent, zielPanel: z && (z.closest('.panel') || {}).id, fensterZiel: !!(z && z.matches('section.thema,section.verfahren,th.mx-zeile')), sichtbar: z && z.getClientRects().length > 0, top: r && Math.round(r.top), lh: Math.round(lh), ih: innerHeight, fokusZiel: z && (ae === z || z.contains(ae)), fokusFenster: f.contains(ae), fokus: ae.id || ae.tagName + '.' + ae.className + ':' + (ae.textContent || '').trim().slice(0, 25), pop: !pop.hidden, mz: ae.classList.contains('m-zeile') ? ae.querySelector('.m-name').textContent : null, inert: document.getElementById('inhalt').inert };
      }, info.href);
      const p = [];
      if (errors.length > e0) p.push('Fehler ' + errors.slice(e0).join(' / '));
      if (info.b) { if (!st.pop) p.push('Begriffskarte zu'); }
      else if (info.m) { if (st.fenster) p.push('Fenster offen'); if (st.tab !== 'verfahren') p.push('Register ' + st.tab); if (st.mz !== info.m) p.push('Fokus ' + st.fokus); if (st.inert) p.push('Inhalt bleibt inert'); }
      else if (st.fensterZiel) { if (!st.fenster) p.push('Fenster zu'); if (!st.fokusFenster) p.push('Fokus ' + st.fokus); }
      else {
        if (st.fenster) p.push('Fenster offen');
        if (st.tab !== st.zielPanel) p.push('Register ' + st.tab + ' statt ' + st.zielPanel);
        if (!st.sichtbar || st.top < st.lh - 3 || st.top > st.ih - 20) p.push('Ziel nicht im Bild top=' + st.top + ' leiste=' + st.lh);
        if (!st.fokusZiel) p.push('Fokus ' + st.fokus);
        if (st.inert) p.push('Inhalt bleibt inert');
      }
      if (p.length) abw.push([zid, info.href, info.text, p.join('; ')]); else ok++;
    }
  }
  // Registerwechsel bei offenem Fenster
  const reg = [];
  for (const tab of ['t-grundlage', 't-verfahren', 't-unterricht', 't-quellen']) {
    await page.evaluate(() => { const f = document.getElementById('fenster'); if (!f.hidden) document.getElementById('f-zu').click(); document.getElementById('t-matrix').click(); });
    await page.click('#matrix .mchip[href^="#"]:not([data-maschine])', { timeout: 1500 }).catch(e => reg.push('Chip-Klick ' + e.message.split('\n')[0]));
    await page.waitForTimeout(50);
    let res;
    try { await page.click('#' + tab, { timeout: 1000 }); await page.waitForTimeout(50); res = await page.evaluate(() => ({ fenster: !document.getElementById('fenster').hidden, tab: document.querySelector('#tl-haupt [aria-selected=true]').id, fokus: document.activeElement.id || document.activeElement.tagName })); }
    catch (e) { res = 'nicht klickbar: ' + e.message.split('\n')[0].slice(0, 90); }
    reg.push(tab + ' ' + JSON.stringify(res));
  }
  // Tastatur: Registerwechsel mit Pfeiltaste bei offenem Fenster (nur breit, Leiste nicht inert)
  await page.evaluate(() => { const f = document.getElementById('fenster'); if (!f.hidden) document.getElementById('f-zu').click(); document.getElementById('t-matrix').click(); });
  await page.click('#matrix .mchip[href^="#"]:not([data-maschine])').catch(() => {});
  const pf = await page.evaluate(() => { document.getElementById('t-matrix').focus(); return !document.getElementById('fenster').hidden; });
  await page.keyboard.press('ArrowRight'); await page.waitForTimeout(50);
  reg.push('Pfeil rechts bei offenem Fenster (vorher offen=' + pf + '): ' + JSON.stringify(await page.evaluate(() => ({ fenster: !document.getElementById('fenster').hidden, tab: document.querySelector('#tl-haupt [aria-selected=true]').id }))));
  await close();
  return { ziele: ziele.length, n, ok, abw, art, reg, errs: errors };
}

(async () => {
  for (const vp of [{ width: 1280 }, { mobile: true }]) {
    const r = await lauf(vp);
    console.log('=== Viewport', vp.width || 375, 'Fensterziele', r.ziele, 'Links in Fenstern', r.n, JSON.stringify(r.art), 'ok', r.ok, 'Abw', r.abw.length);
    const g = {};
    r.abw.forEach(a => { const k = a[3].replace(/top=-?\d+ leiste=\d+/, 'top=…').replace(/Fokus .*/, 'Fokus …'); (g[k] = g[k] || []).push(a.join(' | ')); });
    Object.keys(g).forEach(k => { console.log('--', g[k].length + 'x', k); g[k].slice(0, 5).forEach(x => console.log('     ', x)); });
    r.reg.forEach(x => console.log('REG', x));
    console.log('Fehler gesamt', r.errs.length, JSON.stringify(r.errs.slice(0, 3)));
  }
})();
