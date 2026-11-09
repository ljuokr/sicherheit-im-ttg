// Zurück-Taste: führt zum vorherigen Abschnitt, Fenster schliesst und öffnet passend
const L = require(process.env.ST_LIB);
(async () => {
  const fehler = [];
  const zustand = p => p.evaluate(() => ({ hash: location.hash, reg: (document.querySelector('#tl-haupt [aria-selected=true]')||{}).id, fenster: !document.getElementById('fenster')?.hidden, len: history.length }));
  const pruef = (n, z, soll) => { for (const k in soll) if (z[k] !== soll[k]) fehler.push(n + ': ' + k + '=' + z[k] + ' statt ' + soll[k]); console.log(n, JSON.stringify(z)); };
  let { page, errors, close } = await L.open({ width: 1280 });
  const z0 = await zustand(page);
  await page.click('#t-recht'); await page.waitForTimeout(150);
  await page.click('#t-matrix'); await page.waitForTimeout(150);
  const chip = await page.evaluateHandle(() => [...document.querySelectorAll('#matrix a.mchip')].find(a => a.getClientRects().length)); const ziel = await chip.getAttribute('href');
  await chip.click(); await page.waitForTimeout(200);
  pruef('Fenster offen', await zustand(page), { hash: ziel, fenster: true });
  await page.goBack(); await page.waitForTimeout(200);
  pruef('zurück 1', await zustand(page), { reg: 't-matrix', fenster: false });
  await page.goBack(); await page.waitForTimeout(200);
  pruef('zurück 2', await zustand(page), { reg: 't-recht' });
  await page.goBack(); await page.waitForTimeout(200);
  pruef('zurück 3', await zustand(page), { reg: 't-grundlage' });
  await page.goForward(); await page.goForward(); await page.goForward(); await page.waitForTimeout(250);
  pruef('vorwärts 3', await zustand(page), { hash: ziel, fenster: true });
  // Textlink in ein anderes Register und zurück
  await page.goBack(); await page.waitForTimeout(150);
  await page.click('#t-grundlage'); await page.waitForTimeout(150);
  const vorher = await zustand(page);
  const link = await page.evaluateHandle(() => [...document.querySelectorAll('#grundlage a[href^="#"]')].find(a => a.getClientRects().length && !a.closest('.rand')));
  const lz = await link.evaluate(a => a.getAttribute('href'));
  await link.click(); await page.waitForTimeout(200);
  const nach = await zustand(page);
  await page.goBack(); await page.waitForTimeout(200);
  pruef('Textlink ' + lz + ' zurück', await zustand(page), { hash: vorher.hash, reg: vorher.reg });
  if (nach.hash === vorher.hash) fehler.push('Textlink hat Hash nicht geändert');
  console.log('Konsole:', errors.length); errors.forEach(e => fehler.push('Konsole ' + e));
  await close();
  // Laden mit Thema: keine zusätzlichen Einträge
  ({ page, errors, close } = await L.open({ width: 1280, hash: ziel.slice(1) }));
  await page.waitForTimeout(200);
  pruef('Laden mit Thema', await zustand(page), { hash: ziel, fenster: true, len: 2 });
  await close();
  console.log(fehler.length ? 'FEHLER\n' + fehler.join('\n') : 'alles gut');
})();
