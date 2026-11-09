// Ergänzung: geprüfte Kombinationen 375, Popup als Blatt, neue Bilder in Popups, Fenster mit Bild
const L = require(process.env.ST_LIB);
(async () => {
  for (const dark of [false, true]) {
    const { page, errors, close } = await L.open({ mobile: true, dark });
    const r = await page.evaluate(async () => {
      const kombi = [];
      for (const t of document.querySelectorAll('#tl-haupt [role=tab]')) {
        t.click();
        const l = document.querySelector('#reg2 [data-haupt="' + t.getAttribute('aria-controls') + '"]');
        const subs = l ? [...l.querySelectorAll('[role=tab]')] : [null];
        for (const s of subs) { if (s) s.click(); kombi.push(t.textContent.trim() + (s ? '/' + s.textContent.trim() : '') + ' sw=' + document.documentElement.scrollWidth); }
      }
      // Glossar-Popups mit Bild auf 375
      const pr = [];
      const ids = ['b-ffp', 'b-3d', 'b-absaugung', 'b-fi', 'b-schluessel', 'b-spritz', 'b-glasur', 'b-bindemittel', 'b-ce'];
      for (const id of ids) {
        const a = [...document.querySelectorAll('a.b-wort')].find(x => x.dataset.b === id); if (!a) { pr.push(id + ' kein Link'); continue; }
        const panel = a.closest('.panel'); document.querySelector('[aria-controls="' + panel.id + '"]')?.click();
        const sub = a.closest('.sub'); if (sub) document.querySelector('[aria-controls="' + sub.id + '"]')?.click();
        let d = a.closest('details'); while (d) { d.open = true; d = d.parentElement.closest('details'); }
        a.click();
        const pop = document.getElementById('b-pop'); const img = pop.querySelector('img'); if (img) await img.decode().catch(() => null);
        const pr0 = pop.getBoundingClientRect(), ir = img && img.getBoundingClientRect();
        pr.push({ id, pop: [Math.round(pr0.left), Math.round(pr0.right), Math.round(pr0.top), Math.round(pr0.bottom)], popScroll: pop.scrollHeight > pop.clientHeight, img: ir && [Math.round(ir.width), Math.round(ir.height), img.naturalWidth, img.naturalHeight] });
        pop.querySelector('.b-zu').click();
      }
      return { kombi, pr };
    });
    console.log(dark ? 'DUNKEL' : 'HELL', JSON.stringify(r, null, 0));
    // Screenshot eines Popups mit Hochformatbild
    await page.evaluate(() => { const a = [...document.querySelectorAll('a.b-wort')].find(x => x.dataset.b === 'b-ffp'); const panel = a.closest('.panel'); document.querySelector('[aria-controls="' + panel.id + '"]')?.click(); const sub = a.closest('.sub'); if (sub) document.querySelector('[aria-controls="' + sub.id + '"]')?.click(); let d = a.closest('details'); while (d) { d.open = true; d = d.parentElement.closest('details'); } a.scrollIntoView({ block: 'center' }); a.click(); });
    await page.waitForTimeout(300);
    await L.shot(page, 'regr-pop-ffp-375' + (dark ? 'd' : 'h'));
    console.log('Fehler', errors);
    await close();
  }
  // Bilder im Fliesstext 1280: gerenderte Grössen
  const { page, close } = await L.open({ width: 1280 });
  const b = await page.evaluate(async () => {
    const out = [];
    for (const t of document.querySelectorAll('#tl-haupt [role=tab]')) {
      t.click(); document.querySelectorAll('.panel:not([hidden]) details').forEach(d => d.open = true);
      for (const i of document.querySelectorAll('.panel:not([hidden]) img')) { if (i.src.startsWith('data:image/svg')) continue; await i.decode().catch(() => null); const r = i.getBoundingClientRect(); if (r.width > 0 && (r.height > 400 || r.width > 700)) out.push(t.textContent + ' ' + (i.alt || '').slice(0, 40) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); }
    }
    return out;
  });
  console.log('grosse Bilder', JSON.stringify(b));
  await close();
})();
