// Skeptiker 1 Glossar: Erreicht ein Klick auf einen Popup-Link zu einem Thema die Bubble-Phase am document?
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  await page.evaluate(() => { window.__bub = []; window.__cap = []; document.addEventListener('click', e => window.__bub.push(e.target.getAttribute && e.target.getAttribute('href'))); document.addEventListener('click', e => window.__cap.push(e.target.getAttribute && e.target.getAttribute('href')), true); });
  for (const [reg, id] of [['fenster', 'b-rueckschlag'], ['recht', 'b-obhut']]) {
    if (reg === 'fenster') { await page.click('#t-verfahren'); await page.waitForTimeout(200); await page.evaluate(() => document.querySelector('a[href="#hartloeten"]').click()); await page.waitForTimeout(500); console.log('fenster offen', await page.evaluate(() => !document.getElementById('fenster').hidden)); }
    else { await page.click('#t-' + reg).catch(() => {}); await page.waitForTimeout(200); }
    const info = await page.evaluate((id) => { const a = document.querySelector('#fenster a.b-wort[data-b="' + id + '"]') || document.querySelector('a.b-wort[data-b="' + id + '"]'); if (!a) return null; let x = a; while ((x = x.parentElement)) if (x.tagName === 'DETAILS') x.open = true; a.scrollIntoView({ block: 'center' }); return (a.closest('[id]') || {}).id; }, id);
    console.log(reg, id, 'wort in', info);
    if (!info) continue;
    await page.waitForTimeout(300);
    const loc = page.locator('a.b-wort[data-b="' + id + '"]').filter({ visible: true }).first();
    try { await loc.click({ timeout: 3000 }); } catch (e) { console.log('klick fehlgeschlagen', e.message.slice(0, 100)); continue; }
    await page.waitForTimeout(300);
    await page.evaluate(() => { window.__bub = []; window.__cap = []; });
    const href = await page.evaluate(() => { const a = document.querySelector('#b-pop .b-pop-inhalt a[href^="#"]'); return a && a.getAttribute('href'); });
    const istThema = await page.evaluate((h) => { const z = h && document.getElementById(h.slice(1)); return z ? z.matches('section.thema, section.verfahren, th.mx-zeile') : null; }, href);
    await page.locator('#b-pop .b-pop-inhalt a[href^="#"]').first().click(); await page.waitForTimeout(800);
    console.log(id, 'link', href, 'istThema', istThema, JSON.stringify(await page.evaluate(() => ({ cap: window.__cap, bub: window.__bub, pop: !document.getElementById('b-pop').hidden, fenster: (document.querySelector('#fenster:not([hidden]) h2, .fenster:not([hidden]) h2') || {}).textContent }))));
    await page.keyboard.press('Escape'); await page.keyboard.press('Escape'); await page.waitForTimeout(200);
  }
  console.log('Fehler', errors);
  await close();
})();
