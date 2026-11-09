// Runde 7: Themenfenster aus der Trefferliste öffnen und schliessen
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
const zustand = p => p.evaluate(() => ({ erg: !document.getElementById('ergebnis').hidden, q: document.getElementById('f-q').value, fenster: !document.getElementById('fenster').hidden, hash: location.hash, reg: (document.querySelector('#tl-haupt [aria-selected=true]') || {}).id, tlHidden: document.getElementById('tl-haupt').hidden, fokus: document.activeElement.tagName + '#' + document.activeElement.id + '.' + String(document.activeElement.className).slice(0, 12), fokusSicht: document.activeElement.getClientRects().length > 0, y: Math.round(scrollY), len: history.length }));
(async () => {
  for (const art of ['knopf', 'esc', 'back', 'zweitklick']) {
    for (const mobil of [false, true]) {
      const { page, errors, close } = await L.open({ mobile: mobil });
      await page.fill('#f-q', 'Gehörschutz'); await W(500);
      const a = await page.$('#erg-inhalt a[href="#gasflaschen"]');
      await a.scrollIntoViewIfNeeded(); await a.click(); await W(500);
      const offen = await zustand(page);
      if (art === 'knopf') await page.click('#f-zu');
      if (art === 'esc') await page.keyboard.press('Escape');
      if (art === 'back') await page.goBack();
      if (art === 'zweitklick') await page.evaluate(() => document.querySelector('#erg-inhalt a[href="#gasflaschen"]').click());
      await W(700);
      console.log(art, mobil ? 'mobil' : 'breit', '\n  offen:', JSON.stringify(offen), '\n  danach:', JSON.stringify(await zustand(page)), errors.join(' '));
      await close();
    }
  }
})();
