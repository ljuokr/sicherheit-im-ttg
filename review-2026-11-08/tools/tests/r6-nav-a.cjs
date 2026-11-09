// Runde 6 Navigation: Ablaufleiste, Treppe, Zurück nach Escape/Schliessen, Hash von aussen, Laden mit Thema
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
const st = p => p.evaluate(() => {
  const ae = document.activeElement || {};
  return { hash: location.hash, reg: (document.querySelector('#tl-haupt [aria-selected=true]') || {}).id, fenster: !document.getElementById('fenster').hidden,
    ftitel: document.getElementById('f-titel').textContent, len: history.length, y: Math.round(scrollY), state: JSON.stringify(history.state),
    fokus: ae.tagName + '#' + (ae.id || '') + '.' + (ae.className || '') + ' «' + (ae.textContent || '').trim().slice(0, 30) + '»', erg: !document.getElementById('ergebnis').hidden };
});
const sicht = (p, id) => p.evaluate(id => {
  const z = document.getElementById(id); if (!z) return 'fehlt';
  const r = z.getBoundingClientRect(), lb = document.getElementById('leiste').getBoundingClientRect().bottom;
  const d = z.closest('details');
  return { top: Math.round(r.top), leiste: Math.round(lb), h: innerHeight, sichtbar: r.height > 0 && r.top >= lb - 3 && r.top < innerHeight - 20, details: d ? d.open : null };
}, id);
(async () => {
  for (const mobile of [false, true]) {
    const B = mobile ? '375' : '1280';
    let { page, errors, close } = await L.open({ mobile });
    // Ablaufleiste
    for (const id of ['planen', 'fachraum-betreiben', 'maschinen-warten', 'lagerung', 'entsorgung']) {
      await page.click('#t-fachraum'); await W(700);
      const v = await st(page);
      await page.click('.ablauf a[href="#' + id + '"]'); await W(900);
      const n = await st(page), s = await sicht(page, id);
      await page.goBack(); await W(700);
      const z = await st(page);
      console.log(B, 'Ablauf', id, JSON.stringify(s), 'nach', n.hash, n.reg, n.fokus, '| zurück', z.hash, z.reg, 'len', v.len, n.len, z.len);
    }
    // Treppe
    for (const id of ['lehrplan', 'plakat']) {
      await page.click('#t-unterricht'); await W(700);
      const v = await st(page);
      await page.click('.treppe a[href="#' + id + '"]'); await W(900);
      const n = await st(page), s = await sicht(page, id);
      const txt = await page.evaluate(id => document.querySelector('.treppe a[href="#' + id + '"]').textContent, id);
      await page.goBack(); await W(700);
      const z = await st(page);
      console.log(B, 'Treppe', id, '«' + txt + '»', JSON.stringify(s), 'nach', n.hash, n.reg, n.fokus, '| zurück', z.hash, z.reg, v.hash);
    }
    // Escape und Schliessen, dann Zurück
    for (const art of ['esc', 'knopf']) {
      await page.click('#t-recht'); await W(400);
      await page.click('#t-matrix'); await W(400);
      const a = await st(page);
      const chip = await page.evaluateHandle(() => [...document.querySelectorAll('#matrix a.mchip')].find(a => a.getClientRects().length));
      await chip.click(); await W(400);
      const b = await st(page);
      if (art === 'esc') await page.keyboard.press('Escape'); else await page.click('#f-zu');
      await W(400);
      const c = await st(page);
      await page.goBack(); await W(500);
      const d = await st(page);
      await page.goBack(); await W(500);
      const e = await st(page);
      console.log(B, art, 'vor', a.hash, a.len, '| offen', b.hash, b.len, '| zu', c.hash, c.len, c.fokus, '| zurück1', d.hash, d.reg, d.fenster, '| zurück2', e.hash, e.reg, e.fenster);
      await page.goForward(); await W(400); const f1 = await st(page);
      await page.goForward(); await W(400); const f2 = await st(page);
      console.log(B, art, 'vorwärts1', f1.hash, f1.fenster, 'vorwärts2', f2.hash, f2.fenster);
    }
    // Link aus dem Fenster auf gewöhnlichen Abschnitt, dann zurück
    await page.click('#t-matrix'); await W(400);
    const chip2 = await page.evaluateHandle(() => [...document.querySelectorAll('#matrix a.mchip')].filter(a => a.getClientRects().length)[3]);
    await chip2.click(); await W(400);
    const fl = await page.evaluate(() => {
      const a = [...document.querySelectorAll('#fenster a[href^="#"]')].find(a => { const z = document.getElementById(a.getAttribute('href').slice(1)); return z && !z.matches('section.thema, section.verfahren, th.mx-zeile') && !a.classList.contains('b-wort') && !a.hasAttribute('data-maschine'); });
      if (!a) return null; a.setAttribute('data-t', '1'); return a.getAttribute('href');
    });
    if (fl) {
      const o = await st(page);
      await page.click('#fenster a[data-t]'); await W(900);
      const n = await st(page), s = await sicht(page, fl.slice(1));
      await page.goBack(); await W(600); const z = await st(page);
      console.log(B, 'Fensterlink', fl, JSON.stringify(s), n.hash, n.reg, n.fenster, n.fokus, '| zurück', z.hash, z.fenster, z.ftitel, 'vorher', o.ftitel);
    }
    if ((await st(page)).fenster) { await page.click("#f-zu"); await W(300); }
    // data-maschine aus dem Fenster
    await page.click('#t-matrix'); await W(400);
    const dm = await page.evaluate(() => {
      for (const c of [...document.querySelectorAll('#matrix a.mchip')].filter(a => a.getClientRects().length)) { c.click(); const m = document.querySelector('#fenster a[data-maschine]'); if (m) return c.getAttribute('href'); }
      return null;
    });
    await W(400);
    if (dm) {
      const o = await st(page);
      await page.click('#fenster a[data-maschine]'); await W(900);
      const n = await st(page);
      const karte = await page.evaluate(() => { const b = document.activeElement; return b && b.classList.contains('m-zeile') ? b.getAttribute('aria-expanded') + ' ' + Math.round(b.getBoundingClientRect().top) : 'kein m-zeile'; });
      await page.goBack(); await W(600); const z = await st(page);
      console.log(B, 'data-maschine', dm, o.len, '->', n.hash, n.reg, n.fenster, karte, n.len, '| zurück', z.hash, z.fenster, z.reg);
    }
    if ((await st(page)).fenster) { await page.click("#f-zu"); await W(300); }
    // Hash von aussen (Fragment-Navigation)
    for (const h of ['haftung', 'holzstaub', 'mat-metall', 'lagerung', 'quellen', 'begriffe']) {
      await page.evaluate(h => { location.hash = h; }, h); await W(900);
      const s = await st(page), v = await sicht(page, h);
      console.log(B, 'aussen #' + h, s.reg, s.fenster, s.ftitel, JSON.stringify(v), s.fokus);
    }
    console.log(B, 'Konsole', JSON.stringify(errors));
    await close();
    // Laden mit Thema, Escape, Zustand der Adresse
    for (const h of ['holzstaub', 'mat-metall']) {
      ({ page, errors, close } = await L.open({ mobile, hash: h }));
      await W(300);
      const a = await st(page);
      await page.keyboard.press('Escape'); await W(400);
      const b = await st(page);
      await page.reload(); await W(500);
      const c = await st(page);
      console.log(B, 'Laden #' + h, a.fenster, a.len, '| Esc', b.hash, b.fenster, b.fokus, '| neu laden', c.hash, c.fenster, JSON.stringify(errors));
      await close();
    }
  }
})();
