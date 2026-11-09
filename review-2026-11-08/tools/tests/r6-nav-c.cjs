// Runde 6 Navigation C: Suche Schritt für Schritt mit Verlaufszustand
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
const st = p => p.evaluate(() => {
  const ae = document.activeElement || {};
  return { hash: location.hash, state: JSON.stringify(history.state), reg: (document.querySelector('#tl-haupt [aria-selected=true]') || {}).id, fenster: !document.getElementById('fenster').hidden,
    pop: !document.getElementById('b-pop').hidden, erg: !document.getElementById('ergebnis').hidden, len: history.length,
    fokus: ae.tagName + '#' + (ae.id || '') + '.' + String(ae.className || '').slice(0, 20) + ' «' + (ae.textContent || '').trim().slice(0, 25).replace(/\s+/g, ' ') + '»' };
});
const log = async (p, n) => console.log(n, JSON.stringify(await st(p)));
(async () => {
  for (const mobile of [false, true]) {
    const B = mobile ? '375' : '1280';
    let { page, errors, close } = await L.open({ mobile });
    await page.click('#t-recht'); await W(400); await log(page, B + ' recht');
    await page.fill('#f-q', 'Gehörschutz'); await W(600); await log(page, B + ' Suche');
    const info = await page.evaluate(() => {
      const a = document.querySelector('#erg-inhalt a[href="#b-schweissen"]'); if (!a) return 'kein Link';
      a.scrollIntoView({ block: 'center' });
      const r = a.getBoundingClientRect(), e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return { text: a.textContent, cls: a.className, treffer: e.tagName + '.' + e.className + ' ' + (e.closest('a') ? e.closest('a').getAttribute('href') : '') , imH3: !!a.closest('h3') };
    });
    console.log(B, 'Link #b-schweissen', JSON.stringify(info));
    await W(300);
    await page.evaluate(() => document.querySelector('#erg-inhalt a[href="#b-schweissen"]').click()); await W(900);
    await log(page, B + ' nach Klick b-schweissen (per JS)');
    const sicht = await page.evaluate(() => { const z = document.getElementById('b-schweissen'); const r = z.getBoundingClientRect(); return Math.round(r.top) + ' h' + Math.round(r.height); });
    console.log(B, 'Ziel', sicht);
    await page.goBack(); await W(700); await log(page, B + ' zurück');
    // Thema aus Suche
    await page.fill('#f-q', 'Staub'); await W(600); await log(page, B + ' Suche Staub');
    await page.evaluate(() => document.querySelector('#erg-inhalt a[href="#holzstaub"]').click()); await W(500);
    await log(page, B + ' Thema offen');
    await page.keyboard.press('Escape'); await W(400); await log(page, B + ' Esc');
    await page.goBack(); await W(600); await log(page, B + ' zurück');
    await page.goForward(); await W(600); await log(page, B + ' vorwärts');
    console.log(B, 'Konsole', JSON.stringify(errors));
    await close();
  }
})();
