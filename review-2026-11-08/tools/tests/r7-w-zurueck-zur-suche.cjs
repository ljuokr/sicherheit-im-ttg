// Runde 7: Trefferlink (gewöhnlicher Abschnitt) anklicken, dann Zurück-Taste: kommt die Trefferliste wieder?
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const { page, close } = await L.open({ width: 1280, hash: 'recht' });
  await page.fill('#f-q', 'Haftung'); await W(500);
  const vor = await page.evaluate(() => ({ hash: location.hash, len: history.length }));
  await page.click('#erg-inhalt a[href="#b-obhut"]'); await W(1500);
  const nach = await page.evaluate(() => ({ hash: location.hash, erg: !document.getElementById('ergebnis').hidden, q: document.getElementById('f-q').value, len: history.length }));
  await page.goBack(); await W(800);
  const zurueck = await page.evaluate(() => ({ hash: location.hash, erg: !document.getElementById('ergebnis').hidden, q: document.getElementById('f-q').value, reg: document.querySelector('#tl-haupt [aria-selected=true]').id }));
  console.log('Trefferliste', JSON.stringify(vor), '\nnach Klick', JSON.stringify(nach), '\nnach Zurück', JSON.stringify(zurueck));
  await close();
})();
