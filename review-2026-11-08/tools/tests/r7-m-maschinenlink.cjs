// Runde 7: Maschinenlink aus dem Fenster (Einstufung bfu-Plakat) und aus der Suche, danach Zurück
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
const zst = p => p.evaluate(() => { const b = document.querySelector('.m-zeile[aria-expanded=true]'); return { hash: location.hash, reg: document.querySelector('#tl-haupt [aria-selected=true]').id, fenster: !document.getElementById('fenster').hidden, fTitel: document.getElementById('f-titel').textContent, karteOffen: b ? b.textContent.slice(0, 30) : null, fokus: document.activeElement.className + ' ' + document.activeElement.textContent.slice(0, 25), erg: !document.getElementById('ergebnis').hidden, q: document.getElementById('f-q').value, len: history.length, inert: document.getElementById('inhalt').inert }; });
(async () => {
  for (const mobil of [false, true]) {
    const { page, errors, close } = await L.open({ mobile: mobil, hash: 'matrix' });
    await page.evaluate(() => { const a = [...document.querySelectorAll('a.mchip[href="#bohrmaschine"]')].find(x => x.getClientRects().length); a.click(); }); await W(500);
    console.log(mobil ? 'MOBIL' : 'BREIT', 'Fenster', JSON.stringify(await zst(page)));
    const m = await page.$$eval('#fenster .f-stufe-m', as => as.map(a => a.textContent));
    console.log('  Maschinen im Fenster', m);
    await page.click('#fenster .f-stufe-m'); await W(700);
    console.log('  nach Maschinenlink', JSON.stringify(await zst(page)));
    await page.goBack(); await W(700);
    console.log('  nach Zurück', JSON.stringify(await zst(page)));
    await page.goBack(); await W(700);
    console.log('  nach 2x Zurück', JSON.stringify(await zst(page)));
    console.log('  Fehler', errors);
    await close();
  }
  // aus der Suche
  const { page, close } = await L.open({ width: 1280 });
  await page.fill('#f-q', 'Bandsäge'); await W(500);
  const l = await page.$$eval('#erg-inhalt a[data-maschine]', as => as.map(a => a.textContent));
  console.log('Suche Maschinenlinks', l);
  if (l.length) { await page.click('#erg-inhalt a[data-maschine]'); await W(700); console.log('  nach Klick', JSON.stringify(await zst(page))); await page.goBack(); await W(700); console.log('  nach Zurück', JSON.stringify(await zst(page))); }
  await close();
})();
