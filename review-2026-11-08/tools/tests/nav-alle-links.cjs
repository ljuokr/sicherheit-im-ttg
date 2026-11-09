// Navigation: jeden internen Link einmal klicken und Zustand danach festhalten
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  // Links markieren
  const n = await page.evaluate(() => {
    const ls = [...document.querySelectorAll('a[href^="#"]')].filter(a => !a.closest('#ergebnis,#fenster,#b-pop'));
    ls.forEach((a, i) => a.setAttribute('data-tn', i));
    return ls.length;
  });
  console.log('Links:', n);
  const out = [];
  for (let i = 0; i < n; i++) {
    // Ausgangszustand: Fenster zu, Popover zu
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    const prep = await page.evaluate((i) => {
      const a = document.querySelector('[data-tn="' + i + '"]');
      const panel = a.closest('.panel'), sub = a.closest('.sub'), karte = a.closest('.karte');
      const info = { href: a.getAttribute('href'), text: a.textContent.trim().slice(0, 60), von: panel ? panel.id : (a.closest('[id]') || {}).id, sub: sub ? sub.id : null, b: a.classList.contains('b-wort'), m: a.getAttribute('data-maschine') };
      if (!panel) return info;
      // Register des Links zeigen
      document.getElementById('t-' + panel.id).click();
      if (sub) { const t = document.querySelector('[aria-controls="' + sub.id + '"]'); if (t) t.click(); }
      let d = a.closest('details'); while (d) { d.open = true; d = d.parentElement.closest('details'); }
      if (karte && karte.hidden) { const b = document.querySelector('[aria-controls="' + karte.id + '"]'); b.click(); }
      a.scrollIntoView({ block: 'center' });
      const r = a.getBoundingClientRect();
      info.sichtbar = r.width > 0 && r.height > 0;
      return info;
    }, i);
    if (!prep.sichtbar) { out.push(Object.assign(prep, { skip: 'unsichtbar' })); continue; }
    const e0 = errors.length;
    try { await page.click('[data-tn="' + i + '"]', { timeout: 1500 }); } catch (e) { out.push(Object.assign(prep, { skip: 'klick: ' + e.message.split('\n')[0] })); continue; }
    await page.waitForTimeout(80);
    const st = await page.evaluate((href) => {
      const id = decodeURIComponent(href.slice(1));
      const z = document.getElementById(id);
      const f = document.getElementById('fenster');
      const panel = [...document.querySelectorAll('.panel')].find(p => !p.hidden);
      const lh = document.getElementById('leiste').getBoundingClientRect().bottom;
      let zs = null;
      if (z) {
        const r = z.getBoundingClientRect();
        zs = { top: Math.round(r.top), h: Math.round(r.height), unterLeiste: r.top >= lh - 2, imFenster: r.top < innerHeight, hidden: !z.offsetParent && z.tagName !== 'BODY', panel: (z.closest('.panel') || {}).id };
      }
      const ae = document.activeElement;
      const pop = document.getElementById('b-pop');
      return { hash: location.hash, panel: panel && panel.id, fenster: !f.hidden, ftitel: f.hidden ? '' : document.getElementById('f-titel').textContent, ziel: zs, zielDa: !!z, fokus: ae ? (ae.id || ae.tagName + '.' + ae.className).slice(0, 50) : null, fokusIstZiel: z ? (ae === z || z.contains(ae)) : false, pop: pop ? !pop.hidden : false, erg: !document.getElementById('ergebnis').hidden, leiste: Math.round(lh) };
    }, prep.href);
    st.err = errors.slice(e0);
    out.push(Object.assign(prep, st));
  }
  console.log(JSON.stringify(out));
  console.log('Fehler gesamt:', JSON.stringify(errors));
  await close();
})();
