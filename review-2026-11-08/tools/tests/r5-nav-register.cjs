// R5 Navigation: Registerwechsel bei offenem Fenster, zweiter Klick auf Chip, Fokus nach Schliessen
const L = require(process.env.ST_LIB);
const still = (page) => page.evaluate(() => new Promise(res => { let y = -1, n = 0, t = 0; const f = () => { t++; if (scrollY === y) n++; else { n = 0; y = scrollY; } if (n >= 6 || t > 180) res(); else requestAnimationFrame(f); }; requestAnimationFrame(f); }));
const z = (page) => page.evaluate(() => { const ae = document.activeElement; return { fenster: !document.getElementById('fenster').hidden, tab: document.querySelector('#tl-haupt [aria-selected=true]').id, fokus: ae === document.body ? 'BODY' : (ae.id || ae.tagName + '.' + ae.className + ':' + ae.textContent.trim().slice(0, 25)), hash: location.hash, inert: document.getElementById('leiste').inert }; });

async function chipAuf(page) {
  await page.evaluate(() => { const f = document.getElementById('fenster'); if (!f.hidden) document.getElementById('f-zu').click(); document.getElementById('t-matrix').click(); const c = [...document.querySelectorAll('#matrix .mchip[href^="#"]:not([data-maschine])')].find(x => x.getClientRects().length); document.querySelectorAll('[data-rc]').forEach(x => x.removeAttribute('data-rc')); c.setAttribute('data-rc', 1); c.scrollIntoView({ block: 'center', behavior: 'instant' }); });
  await page.click('[data-rc]'); await still(page);
}

(async () => {
  for (const vp of [{ width: 1280 }, { mobile: true }]) {
    const { page, errors, close } = await L.open(vp);
    const log = [];
    for (const tab of ['t-grundlage', 't-verfahren', 't-unterricht', 't-fachraum', 't-kantone', 't-recht', 't-quellen', 't-matrix']) {
      await chipAuf(page);
      const vor = await z(page);
      let r;
      try { await page.click('#' + tab, { timeout: 1000 }); await still(page); r = await z(page); } catch (e) { r = 'nicht klickbar (' + e.message.split('\n').find(l => /intercept|inert|visible|stable/.test(l)) + ')'; }
      log.push(tab + ' vorher ' + JSON.stringify(vor) + ' nachher ' + JSON.stringify(r));
    }
    // zweiter Klick auf Chip
    await chipAuf(page);
    try { await page.click('[data-rc]', { timeout: 1000 }); await still(page); log.push('Chip zweiter Klick: ' + JSON.stringify(await z(page))); } catch (e) { log.push('Chip zweiter Klick nicht möglich'); }
    // Schliessen-Knopf: Fokus zurück
    await chipAuf(page); await page.click('#f-zu'); await still(page); log.push('Schliessen nach Chip: ' + JSON.stringify(await z(page)));
    // Escape: Fokus zurück
    await chipAuf(page); await page.keyboard.press('Escape'); await still(page); log.push('Escape nach Chip: ' + JSON.stringify(await z(page)));
    // Tab-Taste im Fenster bleibt im Fenster?
    await chipAuf(page);
    const wege = [];
    for (let i = 0; i < 60; i++) { await page.keyboard.press('Tab'); const w = await page.evaluate(() => document.getElementById('fenster').contains(document.activeElement) ? 'F' : (document.activeElement.id || document.activeElement.tagName)); wege.push(w); if (w !== 'F') break; }
    log.push('Tab aus Fenster nach ' + wege.length + ' Schritten: ' + wege[wege.length - 1]);
    // Laden mit Thema-Hash, dann schliessen
    await page.goto('about:blank'); await page.goto('file://' + process.env.ST_SEITE + '#holzstaub'); await page.waitForTimeout(800);
    log.push('Laden #holzstaub: ' + JSON.stringify(await z(page)));
    await page.click('#f-zu'); await still(page); log.push('  danach Schliessen: ' + JSON.stringify(await z(page)) + ' scrollY=' + await page.evaluate(() => Math.round(scrollY)));
    await page.goto('about:blank'); await page.goto('file://' + process.env.ST_SEITE + '#mat-metall'); await page.waitForTimeout(800);
    log.push('Laden #mat-metall: ' + JSON.stringify(await z(page)) + ' titel=' + await page.evaluate(() => document.getElementById('f-titel').textContent + ' / Inhalt li=' + document.querySelectorAll('#f-in li').length));
    await page.click('#f-zu'); await still(page); log.push('  danach Schliessen: ' + JSON.stringify(await z(page)));
    // Materialfenster per Klick auf Materialkopf, zweiter Klick
    await page.evaluate(() => { document.getElementById('t-matrix').click(); const a = [...document.querySelectorAll('a.mx-mat[href="#mat-metall"]')].find(x => x.getClientRects().length); a.setAttribute('data-mm', 1); a.scrollIntoView({ block: 'center', behavior: 'instant' }); });
    await page.click('[data-mm]'); await still(page);
    log.push('Klick Metall: ' + JSON.stringify(await z(page)) + ' titel=' + await page.evaluate(() => document.getElementById('f-titel').textContent + ' li=' + document.querySelectorAll('#f-in li').length + ' aria-current=' + document.querySelector('[data-mm]').getAttribute('aria-current')));
    try { await page.click('[data-mm]', { timeout: 1000 }); await still(page); log.push('  zweiter Klick Metall: ' + JSON.stringify(await z(page))); } catch (e) { log.push('  zweiter Klick Metall nicht möglich'); }
    if (vp.width === 1280) await L.shot(page, 'r5-metall-1280'); else await L.shot(page, 'r5-metall-375');
    // Plakat-Karte: Karte öffnen, Link auf Thema, Fenster deckt Karte?
    await page.evaluate(() => { const f = document.getElementById('fenster'); if (!f.hidden) document.getElementById('f-zu').click(); document.getElementById('t-verfahren').click(); const b = [...document.querySelectorAll('#plakat-ziel .m-zeile')].find(x => { const k = document.getElementById(x.getAttribute('aria-controls')); return k.querySelector('.k-links a'); }); if (b.getAttribute('aria-expanded') !== 'true') b.click(); const a = document.getElementById(b.getAttribute('aria-controls')).querySelector('.k-links a'); a.setAttribute('data-kl', 1); a.scrollIntoView({ block: 'center', behavior: 'instant' }); });
    await page.click('[data-kl]'); await still(page);
    log.push('Karte -> Thema: ' + JSON.stringify(await z(page)) + ' Link verdeckt=' + await page.evaluate(() => { const a = document.querySelector('[data-kl]'), r = a.getBoundingClientRect(); const e = document.elementFromPoint(r.left + 3, r.top + r.height / 2); return !(e === a || a.contains(e)); }) + ' plakatBreite=' + await page.evaluate(() => Math.round(document.getElementById('plakat-ziel').getBoundingClientRect().right) + '/' + innerWidth));
    if (vp.width === 1280) await L.shot(page, 'r5-karte-fenster-1280');
    log.push('Fehler: ' + JSON.stringify(errors));
    console.log('=== ' + (vp.width || 375) + '\n  ' + log.join('\n  '));
    await close();
  }
})();
