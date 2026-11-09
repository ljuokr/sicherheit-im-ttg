// R6 Glossar im Themenfenster: Escape-Reihenfolge, Popup-Link auf Thema, Zurück-Taste
const L = require(process.env.ST_LIB);
async function lauf(mobile) {
  const tag = mobile ? '375' : '1280';
  const { page, errors, close } = await L.open({ mobile });
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  const st = () => page.evaluate(() => { const p = document.getElementById('b-pop'), f = document.getElementById('fenster'), a = document.activeElement; return { pop: !p.hidden, popTitel: p.hidden ? '' : p.querySelector('.b-pop-titel').textContent, fenster: !f.hidden, fTitel: f.hidden ? '' : document.getElementById('f-titel').textContent, hash: location.hash, fokus: a.tagName + '.' + a.className + ' «' + (a.textContent || '').trim().slice(0, 25) + '»' }; });
  // Thema mit Flammenrückschlagventil öffnen (Hartlöten)
  const themen = await page.evaluate(() => [...document.querySelectorAll('section.thema')].filter(t => t.querySelector('a.b-wort[data-b="b-rueckschlag"]')).map(t => t.id));
  console.log(tag, 'Themen mit Rückschlag', themen);
  await page.click('#t-matrix'); await page.waitForTimeout(200);
  await page.evaluate((id) => { const a = document.createElement('a'); a.href = '#' + id; a.id = 'testlink'; a.textContent = 'x'; document.querySelector('#matrix .text').appendChild(a); }, themen[0]);
  await page.click('#testlink'); await page.waitForTimeout(300);
  console.log(tag, 'Fenster offen', JSON.stringify(await st()));
  const w = page.locator('#fenster a.b-wort[data-b="b-rueckschlag"]').first();
  await w.scrollIntoViewIfNeeded(); await w.click(); await page.waitForTimeout(300);
  console.log(tag, 'Popup im Fenster', JSON.stringify(await st()));
  await page.keyboard.press('Escape'); await page.waitForTimeout(150);
  console.log(tag, 'Escape 1', JSON.stringify(await st()));
  await w.click(); await page.waitForTimeout(300);
  // interner Link im Popup: Gasflaschen und Gasanlagen
  await page.locator('#b-pop .b-pop-inhalt a[href^="#"]').first().click(); await page.waitForTimeout(400);
  const s = await st();
  const ueber = await page.evaluate(() => { const p = document.getElementById('b-pop'), f = document.getElementById('fenster'); if (p.hidden) return null; const a = p.getBoundingClientRect(), b = f.getBoundingClientRect(); return { pop: [Math.round(a.top), Math.round(a.bottom)], fenster: [Math.round(b.top), Math.round(b.bottom)] }; });
  console.log(tag, 'Popup-Link → Thema', JSON.stringify(s), JSON.stringify(ueber));
  await L.shot(page, 'r6-gl-fenster-' + tag);
  await page.keyboard.press('Escape'); await page.waitForTimeout(150);
  await page.keyboard.press('Escape'); await page.waitForTimeout(150);
  console.log(tag, 'nach 2x Escape', JSON.stringify(await st()));
  // Zurück-Taste bei offenem Popup
  await page.click('#t-recht'); await page.waitForTimeout(200);
  await page.click('#t-unterricht'); await page.waitForTimeout(200);
  const z = page.locator('#unterricht a.b-wort').first(); await z.scrollIntoViewIfNeeded(); await z.click(); await page.waitForTimeout(250);
  const v = await st(); await page.goBack(); await page.waitForTimeout(400);
  console.log(tag, 'Zurück bei offenem Popup', JSON.stringify(v), '→', JSON.stringify(await st()));
  console.log(tag, 'Fehler', errors);
  await close();
}
(async () => { await lauf(false); await lauf(true); })();
