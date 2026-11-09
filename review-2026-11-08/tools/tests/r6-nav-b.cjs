// Runde 6 Navigation B: Scroll nach Zurück, Fokus nach Zurück, Suche, Plakat-Karten, Registerverlauf
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
const st = p => p.evaluate(() => {
  const ae = document.activeElement || {};
  return { hash: location.hash, reg: (document.querySelector('#tl-haupt [aria-selected=true]') || {}).id, fenster: !document.getElementById('fenster').hidden,
    ftitel: document.getElementById('f-titel').textContent, len: history.length, y: Math.round(scrollY),
    fokus: ae.tagName + '#' + (ae.id || '') + '.' + String(ae.className || '').slice(0, 20) + ' «' + (ae.textContent || '').trim().slice(0, 25).replace(/\s+/g, ' ') + '»', erg: !document.getElementById('ergebnis').hidden };
});
const top = (p, sel) => p.evaluate(sel => { const z = document.querySelector(sel); if (!z) return null; const r = z.getBoundingClientRect(); return Math.round(r.top) + '/' + Math.round(r.bottom) + ' leiste ' + Math.round(document.getElementById('leiste').getBoundingClientRect().bottom); }, sel);
(async () => {
  for (const mobile of [false, true]) {
    const B = mobile ? '375' : '1280';
    let { page, errors, close } = await L.open({ mobile });
    // 1 Ablauf: erster Klick genau messen, Scroll nach Zurück
    await page.click('#t-fachraum'); await W(800);
    const a0 = await st(page);
    await page.click('.ablauf a[href="#planen"]');
    for (const t of [300, 900, 1800]) { await W(t === 300 ? 300 : t - 300); console.log(B, 'planen nach', t, 'ms y', (await st(page)).y, 'top', await top(page, '#planen')); }
    await page.click('.ablauf a[href="#entsorgung"]').catch(e => console.log(B, 'Ablauf nicht klickbar (gescrollt)'));
    await page.evaluate(() => document.querySelector('.ablauf a[href="#entsorgung"]').click()); await W(1500);
    const a1 = await st(page);
    await page.goBack(); await W(1000);
    const a2 = await st(page);
    console.log(B, 'Ablauf Entsorgung: y vor', a0.y, 'nach', a1.y, a1.hash, '| zurück', a2.hash, 'y', a2.y, 'Ablaufleiste', await top(page, '.ablauf'), 'Fokus', a2.fokus);
    // 2 Fokus nach Zurück ins Fenster und aus dem Fenster
    await page.click('#t-matrix'); await W(500);
    const chip = await page.evaluateHandle(() => [...document.querySelectorAll('#matrix a.mchip')].filter(a => a.getClientRects().length)[2]);
    await chip.click(); await W(400);
    const inner = await page.evaluate(() => { const a = [...document.querySelectorAll('#fenster a[href^="#"]')].find(a => { const z = document.getElementById(a.getAttribute('href').slice(1)); return z && !z.matches('section.thema, section.verfahren, th.mx-zeile') && !a.classList.contains('b-wort') && !a.hasAttribute('data-maschine'); }); if (a) a.setAttribute('data-t', '1'); return a && a.getAttribute('href'); });
    if (inner) {
      await page.click('#fenster a[data-t]'); await W(900);
      await page.goBack(); await W(600);
      const b1 = await st(page);
      console.log(B, 'Zurück ins Fenster', b1.hash, b1.fenster, 'Fokus', b1.fokus);
      await page.goBack(); await W(600);
      const b2 = await st(page);
      console.log(B, 'Zurück aus Fenster', b2.hash, b2.fenster, 'Fokus', b2.fokus);
    }
    // 3 Suche: Ergebnis auf Abschnitt, dann Zurück
    if ((await st(page)).fenster) { await page.click('#f-zu'); await W(300); }
    await page.click('#t-recht'); await W(400);
    const s0 = await st(page);
    await page.fill('#f-q', 'Gehörschutz'); await W(500);
    const s1 = await st(page);
    const res = await page.evaluate(() => [...document.querySelectorAll('#erg-inhalt a[href^="#"]')].map(a => a.getAttribute('href') + (a.hasAttribute('data-maschine') ? '(m)' : '')));
    console.log(B, 'Suche Gehörschutz', s1.erg, s1.len, JSON.stringify(res));
    const normal = await page.evaluate(() => { const a = [...document.querySelectorAll('#erg-inhalt a[href^="#"]:not(.b-wort)')].find(a => { const z = document.getElementById(a.getAttribute('href').slice(1)); return z && !z.matches('section.thema, section.verfahren, th.mx-zeile') && !a.hasAttribute('data-maschine'); }); if (a) a.setAttribute('data-t', '2'); return a && a.getAttribute('href'); });
    if (normal) {
      await page.click('#erg-inhalt a[data-t="2"]'); await W(900);
      const s2 = await st(page);
      await page.goBack(); await W(600);
      const s3 = await st(page);
      console.log(B, 'Suchtreffer', normal, '->', s2.hash, s2.reg, s2.erg, s2.fokus, '| zurück', s3.hash, s3.reg, 'Suche offen', s3.erg, 'Feld', await page.inputValue('#f-q'));
    }
    // 3b Suche: Thema-Treffer, Escape, Zurück
    await page.fill('#f-q', 'Staub'); await W(500);
    const th = await page.evaluate(() => { const a = [...document.querySelectorAll('#erg-inhalt a[href^="#"]')].find(a => { const z = document.getElementById(a.getAttribute('href').slice(1)); return z && z.matches('section.thema, section.verfahren, th.mx-zeile') && a.getClientRects().length; }); if (a) a.setAttribute('data-t', '3'); return a && a.getAttribute('href'); });
    console.log(B, 'Suche Staub Thema-Link', th, (await page.evaluate(() => document.querySelectorAll('#erg-inhalt a[href^="#"]').length)));
    if (th) {
      const t0 = await st(page);
      await page.click('#erg-inhalt a[data-t="3"]'); await W(500);
      const t1 = await st(page);
      await page.keyboard.press('Escape'); await W(400);
      const t2 = await st(page);
      await page.goBack(); await W(600);
      const t3 = await st(page);
      console.log(B, 'Thema aus Suche', t0.len, '->', t1.hash, t1.fenster, t1.erg, t1.len, '| Esc', t2.hash, t2.erg, t2.fokus, '| zurück', t3.hash, t3.reg, t3.erg, t3.fenster);
    }
    await page.evaluate(() => { const z = document.getElementById('zurueck'); if (!document.getElementById('ergebnis').hidden) z.click(); });
    // 3c Suchtreffer Maschine
    await page.fill('#f-q', 'Gehörschutz'); await W(500);
    const mm = await page.evaluate(() => { const a = document.querySelector('#erg-inhalt a[data-maschine]'); if (a) a.setAttribute('data-t', '4'); return a && a.getAttribute('data-maschine'); });
    if (mm) {
      await page.click('#erg-inhalt a[data-t="4"]'); await W(900);
      const m1 = await st(page);
      const kz = await page.evaluate(() => { const b = document.activeElement; return b.classList.contains('m-zeile') ? b.getAttribute('aria-expanded') + ' top ' + Math.round(b.getBoundingClientRect().top) : 'Fokus ' + b.tagName; });
      await page.goBack(); await W(600);
      const m2 = await st(page);
      console.log(B, 'Suchtreffer Maschine', mm, '->', m1.hash, m1.reg, m1.erg, kz, '| zurück', m2.hash, m2.reg, m2.erg);
    } else console.log(B, 'kein Maschinentreffer');
    await page.evaluate(() => { if (!document.getElementById('ergebnis').hidden) document.getElementById('zurueck').click(); });
    // 4 Plakat-Karten: Gruppentitel und Regeln-Links
    if ((await st(page)).fenster) { await page.click('#f-zu'); await W(300); }
    await page.click('#t-verfahren'); await W(500);
    const gr = await page.evaluate(() => [...document.querySelectorAll('#plakat-ziel .p-kopf a')].map(a => a.getAttribute('href') + ' ' + a.getClientRects().length));
    console.log(B, 'Gruppentitel', JSON.stringify(gr));
    await page.click('#plakat-ziel .p-kopf a[href="#trennen"]'); await W(500);
    const g1 = await st(page);
    console.log(B, 'Gruppe Trennen ->', g1.hash, g1.fenster, g1.ftitel, g1.fokus);
    if (g1.fenster) { await page.click('#f-zu'); await W(400); }
    const g2 = await st(page);
    console.log(B, 'nach Schliessen', g2.hash, g2.reg, g2.fokus);
    // Karte öffnen, Regeln-Link
    const kb = await page.evaluateHandle(() => [...document.querySelectorAll('#plakat-ziel .m-zeile')].find(b => b.nextElementSibling.querySelector('.k-links a')));
    await kb.click(); await W(300);
    const kl = await page.evaluate(() => { const b = [...document.querySelectorAll('#plakat-ziel .m-zeile')].find(b => b.getAttribute('aria-expanded') === 'true'); const a = b.nextElementSibling.querySelector('.k-links a'); a.setAttribute('data-t', '5'); return b.querySelector('.m-name').textContent + ' -> ' + a.getAttribute('href'); });
    await page.click('a[data-t="5"]'); await W(500);
    const k1 = await st(page);
    await page.goBack(); await W(600);
    const k2 = await st(page);
    const kOffen = await page.evaluate(() => [...document.querySelectorAll('#plakat-ziel .m-zeile')].filter(b => b.getAttribute('aria-expanded') === 'true').length);
    console.log(B, 'Karte', kl, '->', k1.hash, k1.fenster, k1.reg, '| zurück', k2.hash, k2.fenster, k2.reg, 'Fokus', k2.fokus, 'offene Karten', kOffen);
    // 5 Plakat-Karten mit externen/sonstigen Links: Ziele prüfen
    const kz = await page.evaluate(() => {
      const out = {}; [...document.querySelectorAll('#plakat-ziel .karte a[href^="#"]')].forEach(a => { const h = a.getAttribute('href'); const z = document.getElementById(h.slice(1)); out[h] = z ? (z.matches('section.thema, section.verfahren, th.mx-zeile') ? 'fenster' : 'abschnitt') : 'FEHLT'; });
      return out;
    });
    console.log(B, 'Kartenziele', JSON.stringify(Object.entries(kz).filter(([k, v]) => v !== 'fenster')));
    // 6 Registerverlauf: drei Register, dreimal zurück
    if ((await st(page)).fenster) { await page.click('#f-zu'); await W(300); }
    await page.click('#t-grundlage'); await W(300);
    for (const t of ['t-kantone', 't-recht', 't-quellen']) { await page.click('#' + t); await W(300); }
    const r = [];
    for (let i = 0; i < 3; i++) { await page.goBack(); await W(400); const s = await st(page); r.push(s.hash + ' ' + s.reg + ' y' + s.y + ' ' + s.fokus); }
    console.log(B, 'Registerverlauf zurück', JSON.stringify(r));
    console.log(B, 'Konsole', JSON.stringify(errors));
    await close();
  }
})();
