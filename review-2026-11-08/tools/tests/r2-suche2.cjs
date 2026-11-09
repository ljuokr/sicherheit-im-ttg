// Zweite Suchrunde: Fehltreffer durch Registerhinweise, Kartenwörter, hashchange auf Thema
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  for (const q of ['Sägeblatt', 'Schraubstock', 'Mitdrehen', 'Einfädeln']) {
    await page.fill('#f-q', q); await page.waitForTimeout(350);
    console.log('Suche', q, '->', await page.evaluate(() => document.getElementById('erg-status').textContent));
  }
  for (const q of ['Fachraum', 'Unterricht', 'Recht', 'Register']) {
    await page.fill('#f-q', q); await page.waitForTimeout(350);
    const r = await page.evaluate(q => {
      const li = [...document.querySelectorAll('#erg-inhalt section.erg-v > ul > li')];
      const nurHinweis = li.filter(x => { const t = x.textContent.toLowerCase(); const ohne = t.replace(/\(register [^)]*\)/g, ''); return t.includes(q.toLowerCase()) && !ohne.includes(q.toLowerCase()); });
      return { status: document.getElementById('erg-status').textContent, zeilen: li.length, nurWegenHinweis: nurHinweis.length, bsp: nurHinweis.slice(0, 2).map(x => x.textContent.slice(0, 120)) };
    }, q);
    console.log('Suche', q, JSON.stringify(r));
  }
  await page.fill('#f-q', ''); await page.waitForTimeout(350);
  // hashchange auf ein Thema (z. B. Adresse von Hand geändert)
  await page.evaluate(() => { location.hash = 'holzstaub'; });
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    const sel = [...document.querySelectorAll('#tl-haupt [role=tab]')].find(t => t.getAttribute('aria-selected') === 'true');
    const z = document.getElementById('holzstaub');
    return { register: sel.textContent, fenster: !document.getElementById('fenster').hidden, zielSichtbar: z.getClientRects().length > 0, panelHidden: z.closest('.panel').hidden, y: scrollY };
  });
  console.log('hashchange #holzstaub', JSON.stringify(r));
  await L.shot(page, 'r2-hashchange-thema');
  console.log('Fehler', errors);
  await close();
})();
