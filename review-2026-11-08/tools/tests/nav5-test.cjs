// Prüfrunde 5: Zurück-Taste mit Fenster, Suche, Glossar, Pfeiltasten, Schliessen-Knopf
const L = require(process.env.ST_LIB);
(async () => {
  const fehler = [], ok = (n, b, info) => { console.log((b ? 'ok   ' : 'FEHL ') + n, info === undefined ? '' : JSON.stringify(info)); if (!b) fehler.push(n); };
  const st = p => p.evaluate(() => ({ hash: location.hash, reg: (document.querySelector('#tl-haupt [aria-selected=true]')||{}).id, fenster: !document.getElementById('fenster').hidden, len: history.length, y: Math.round(scrollY), fokus: (document.activeElement||{}).className || (document.activeElement||{}).id, erg: !document.getElementById('ergebnis').hidden, pop: !!document.querySelector('.b-pop:not([hidden])') }));
  let { page, errors, close } = await L.open({ width: 1280 });
  // 1 und 2: Matrix gescrollt, Chip, Zurück, Vorwärts
  await page.click('#t-matrix'); await page.waitForTimeout(150);
  const chip = await page.evaluateHandle(() => [...document.querySelectorAll('#matrix a.mchip')].filter(a => a.getClientRects().length)[5]);
  await chip.evaluate(a => a.scrollIntoView({ block: 'center' })); await page.waitForTimeout(600);
  const y0 = (await st(page)).y;
  await chip.click(); await page.waitForTimeout(300);
  await page.goBack(); await page.waitForTimeout(600);
  let s = await st(page); ok('1 Zurück aus Fenster: Matrix bleibt gescrollt', !s.fenster && Math.abs(s.y - y0) < 5, { y0, ...s });
  ok('1 Fokus auf Chip', String(s.fokus).includes('mchip'), s.fokus);
  await page.goForward(); await page.waitForTimeout(400);
  s = await st(page); ok('2 Vorwärts: Fenster vor Matrix', s.fenster && s.reg === 't-matrix', s);
  // 6: Schliessen-Knopf geht einen Schritt zurück
  await page.click('#f-zu'); await page.waitForTimeout(400);
  s = await st(page); ok('6 Schliessen: Hash zurück auf Matrix', !s.fenster && s.hash === '#matrix', s);
  await page.goBack(); await page.waitForTimeout(400);
  s = await st(page); ok('6 Zurück nach Schliessen: Matrix, Fenster zu', !s.fenster && s.reg === 't-matrix', s);
  const chip3 = await page.evaluateHandle(() => [...document.querySelectorAll('#matrix a.mchip')].find(a => a.getClientRects().length));
  await chip3.click(); await page.waitForTimeout(300);
  await page.keyboard.press('Escape'); await page.waitForTimeout(400);
  s = await st(page); ok('6 Esc schliesst und geht zurück', !s.fenster && s.hash === '#matrix', s);
  // 3: Suche, Zurück
  await page.click('#t-recht'); await page.waitForTimeout(200);
  const feld = await page.$('#leiste input');
  await feld.fill('Säge'); await page.keyboard.press('Enter'); await page.waitForTimeout(300);
  const vorErg = (await st(page)).erg;
  await page.goBack(); await page.waitForTimeout(400);
  s = await st(page); ok('3 Suche schliesst bei Zurück', vorErg && !s.erg, { vorErg, ...s });
  // 4: Glossar-Popup, Zurück
  await page.click('#t-recht'); await page.waitForTimeout(200);
  const w = await page.evaluateHandle(() => [...document.querySelectorAll('#recht .b-wort')].find(b => b.getClientRects().length));
  await w.click(); await page.waitForTimeout(200);
  const vorPop = (await st(page)).pop;
  await page.goBack(); await page.waitForTimeout(400);
  s = await st(page); ok('4 Popup schliesst bei Zurück', vorPop && !s.pop, { vorPop, ...s });
  // 5: Pfeiltasten
  await page.click('#t-grundlage'); await page.waitForTimeout(150);
  const l0 = (await st(page)).len;
  for (let i = 0; i < 5; i++) { await page.keyboard.press('ArrowRight'); await page.waitForTimeout(80); }
  s = await st(page); ok('5 Fünf Pfeilschritte = ein Eintrag', s.len - l0 <= 1, { l0, len: s.len, reg: s.reg });
  ok('Konsole', errors.length === 0, errors);
  await close();
  // Laden mit Thema, Schliessen verlässt die Seite nicht
  ({ page, errors, close } = await L.open({ width: 1280, hash: 'bohrmaschine' }));
  await page.waitForTimeout(300);
  await page.click('#f-zu'); await page.waitForTimeout(400);
  s = await st(page); ok('Laden mit Thema, Schliessen bleibt auf der Seite', !s.fenster && s.hash !== '', s);
  // Thema zu Thema im Fenster, dann Schliessen
  await page.click('#t-matrix'); await page.waitForTimeout(150);
  const c2 = await page.evaluateHandle(() => [...document.querySelectorAll('#matrix a.mchip')].find(a => a.getClientRects().length));
  await c2.click(); await page.waitForTimeout(300);
  const innen = await page.evaluateHandle(() => [...document.querySelectorAll('#fenster a[href^="#"]')].find(a => { const z = document.getElementById(a.getAttribute('href').slice(1)); return z && z.matches('section.thema, section.verfahren') && a.getClientRects().length; }) || null);
  const hatInnen = await innen.evaluate(a => !!a);
  if (hatInnen) { await innen.click(); await page.waitForTimeout(300); }
  const l1 = (await st(page)).len;
  await page.click('#f-zu'); await page.waitForTimeout(400);
  s = await st(page); ok('Thema zu Thema, Schliessen: Fenster zu', !s.fenster, { hatInnen, l1, ...s });
  ok('Konsole 2', errors.length === 0, errors);
  await close();
  console.log(fehler.length ? 'FEHLER: ' + fehler.join(' | ') : 'alles gut');
})();
