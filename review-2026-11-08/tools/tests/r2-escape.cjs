// Zweite Suchrunde: Escape mit offenem Begriffs-Popover im Themenfenster, Karten-Hinweise in der Suche, Sprung aus Suchergebnis
const L = require(process.env.ST_LIB);
(async () => {
  for (const w of [1280, 375]) {
    const { page, errors, close } = await L.open({ width: w, mobile: w < 700, hash: 'matrix' });
    // erstes Thema mit Begriff öffnen
    const id = await page.evaluate(() => { const t = [...document.querySelectorAll('section.thema')].find(t => t.querySelector('details.thema-d .b-wort')); return t && t.id; });
    await page.evaluate(id => { const a = document.createElement('a'); a.href = '#' + id; a.id = 'testlink'; document.querySelector('#matrix').appendChild(a); a.click(); }, id);
    await page.waitForTimeout(200);
    const vor = await page.evaluate(() => ({ fenster: !document.getElementById('fenster').hidden, begriffe: document.querySelectorAll('#f-in .b-wort').length }));
    await page.evaluate(() => document.querySelector('#f-in .b-wort').click());
    await page.waitForTimeout(150);
    const popAuf = await page.evaluate(() => !document.getElementById('b-pop').hidden);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);
    const nach = await page.evaluate(() => ({ pop: !document.getElementById('b-pop').hidden, fenster: !document.getElementById('fenster').hidden, fokus: document.activeElement && (document.activeElement.id || document.activeElement.className || document.activeElement.tagName) }));
    console.log(w, 'Thema', id, 'vorher', JSON.stringify(vor), 'Popover offen', popAuf, 'nach 1x Escape', JSON.stringify(nach));
    await close();
  }
  // Karten-Hinweise: Wörter, die nur in den Hinweisen der Maschinenkarten stehen
  const { page, errors, close } = await L.open({});
  const nur = await page.evaluate(() => {
    const rest = [...document.querySelectorAll('.panel')].map(p => { const c = p.cloneNode(true); c.querySelectorAll('.karte').forEach(k => k.remove()); return c.textContent; }).join(' ').toLowerCase();
    const out = [];
    document.querySelectorAll('.k-hinweise li').forEach(li => {
      const woerter = li.childNodes[0].textContent.toLowerCase().match(/[a-zäöüß-]{7,}/g) || [];
      const fehlt = woerter.filter(x => rest.indexOf(x) < 0);
      if (fehlt.length) out.push({ karte: li.closest('li:not(.k-hinweise li)') ? li.closest('.karte').previousElementSibling.textContent.trim().slice(0, 40) : '', fehlt: fehlt.slice(0, 4), text: li.textContent.slice(0, 80) });
    });
    return out;
  });
  console.log('Hinweise mit Wörtern nur auf der Karte:', nur.length);
  nur.slice(0, 8).forEach(x => console.log('  ', JSON.stringify(x)));
  for (const q of nur.slice(0, 3).map(x => x.fehlt[0])) {
    await page.fill('#f-q', q); await page.waitForTimeout(350);
    console.log('  Suche', q, '->', await page.evaluate(() => document.getElementById('erg-status').textContent));
  }
  console.log('Fehler', errors);
  await close();
})();
