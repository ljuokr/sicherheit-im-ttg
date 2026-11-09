// Zweite Suchrunde: Link mit data-maschine bei aktiver Suche (für Vorschlag Kartenhinweise in der Suche)
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  await page.fill('#f-q', 'Bandsäge'); await page.waitForTimeout(400);
  const name = await page.evaluate(() => document.querySelector('#plakat-ziel .m-name').textContent);
  await page.evaluate(name => { const a = document.createElement('a'); a.href = '#plakat'; a.setAttribute('data-maschine', name); a.id = 'tm'; a.textContent = name; document.getElementById('erg-inhalt').appendChild(a); }, name);
  await page.click('#tm'); await page.waitForTimeout(1200);
  const r = await page.evaluate(() => {
    const b = [...document.querySelectorAll('#plakat-ziel .m-zeile')][0];
    return { ergOffen: !document.getElementById('ergebnis').hidden, registerSichtbar: !document.getElementById('register').hidden, karteOffen: b.getAttribute('aria-expanded'), sichtbar: b.getClientRects().length > 0 };
  });
  console.log('Maschine', name, JSON.stringify(r), errors);
  await close();
})();
