// R5 Glossar: Popup öffnen und schliessen (Klick, Escape, daneben, Schliessen), Fokus, Hover-Falle, Themenfenster, 375 px
const L = require(process.env.ST_LIB);
const zustand = page => page.evaluate(() => {
  const p = document.getElementById('b-pop'), f = document.getElementById('fenster'), ae = document.activeElement;
  const r = p.getBoundingClientRect();
  const mitte = !p.hidden && document.elementFromPoint(r.left + r.width / 2, r.top + Math.min(r.height / 2, 30));
  return { pop: !p.hidden, titel: p.hidden ? '' : (p.querySelector('.b-pop-titel') || {}).textContent, fenster: f && !f.hidden,
    fokus: ae ? ae.tagName + (ae.className ? '.' + ae.className : '') + (ae.id ? '#' + ae.id : '') + ' «' + (ae.textContent || ae.value || '').trim().slice(0, 30) + '»' : '-',
    fokusImPop: p.contains(ae), fokusImFenster: !!(f && f.contains(ae)),
    rect: p.hidden ? null : [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height), innerWidth, innerHeight],
    obenAuf: mitte ? p.contains(mitte) : null, expanded: [...document.querySelectorAll('.b-wort[aria-expanded=true]')].length };
});
async function lauf(mobile) {
  const tag = mobile ? '375' : '1280';
  const { page, errors, close } = await L.open({ mobile, hash: 'recht' });
  const log = (s, z) => console.log(tag, s.padEnd(34), JSON.stringify(z));
  const info = await page.evaluate(() => { const a = [...document.querySelectorAll('.panel a.b-wort')].find(x => x.checkVisibility()); if (!a) return 'keins'; a.setAttribute('data-test', 'w1'); const r = a.getBoundingClientRect();
    return a.textContent + ' vis=' + a.checkVisibility() + ' rect=' + [r.left, r.top, r.width, r.height].map(Math.round) + ' disp=' + getComputedStyle(a).display + ' eltern=' + a.parentElement.tagName + ' ' + getComputedStyle(a.parentElement).display; });
  console.log(tag, 'Wort:', info);
  const wort = page.locator('[data-test=w1]');
  await wort.click(); log('Klick auf Wort', await zustand(page));
  await page.keyboard.press('Escape'); log('Escape', await zustand(page));
  await wort.click(); await wort.click(); log('Klick, nochmals Klick', await zustand(page));
  await wort.click(); await page.locator('#b-pop .b-zu').click(); log('Klick, Schliessen', await zustand(page));
  await wort.click(); await page.mouse.click(5, mobile ? 120 : (await page.viewportSize()).height - 5); log('Klick, Klick daneben', await zustand(page));
  // Hover-Falle (nur Maus): Klick öffnen, Maus bleibt 0,8 s, dann Maus weg
  if (!mobile) {
    await wort.click(); await page.waitForTimeout(800); const z1 = await zustand(page);
    await page.mouse.move(5, 500); await page.waitForTimeout(600); log('Klick, 0,8 s warten', z1); log('… dann Maus weg', await zustand(page));
  }
  // Fokus nach Klick daneben in ein Eingabefeld
  if (!mobile) {
    await wort.click(); await page.locator('#f-q').click(); log('Klick, dann Klick ins Suchfeld', await zustand(page));
    await page.keyboard.press('Escape');
  }
  // Tastatur: Tab zum Wort, Enter
  await wort.focus(); await page.keyboard.press('Enter'); log('Tastatur Enter', await zustand(page));
  await page.keyboard.press('Tab'); log('… Tab', await zustand(page));
  await page.keyboard.press('Escape'); log('… Escape', await zustand(page));
  // Themenfenster: ein Thema mit Begriff öffnen
  const thema = await page.evaluate(() => { const t = [...document.querySelectorAll('section.thema')].find(s => s.querySelector('a.b-wort') && document.querySelector('.mchip[href="#' + s.id + '"]')); return t && t.id; });
  await page.evaluate(() => document.getElementById('t-matrix').click());
  await page.waitForTimeout(200);
  const chip = page.locator('.mchip[href="#' + thema + '"]').first();
  if (mobile) await page.evaluate(t => document.querySelector('.mchip[href="#' + t + '"]').click(), thema); else { await chip.scrollIntoViewIfNeeded(); await chip.click(); }
  await page.waitForTimeout(200);
  const fw = page.locator('#fenster a.b-wort').first();
  const anz = await page.locator('#fenster a.b-wort').count();
  console.log(tag, 'Thema', thema, 'Links im Fenster', anz, 'Wort', anz ? await fw.textContent() : '-', 'href', anz ? await fw.getAttribute('href') : '-');
  if (anz) {
    await fw.scrollIntoViewIfNeeded(); await fw.click(); log('Fenster: Klick auf Wort', await zustand(page));
    await L.shot(page, 'r5-gl-fenster-pop-' + tag);
    await page.locator('#b-pop .b-zu').click(); log('Fenster: Schliessen', await zustand(page));
    await fw.click(); await page.locator('#fenster .f-in').click({ position: { x: 5, y: 5 } }); log('Fenster: Klick daneben im Fenster', await zustand(page));
    await fw.click(); await page.keyboard.press('Escape'); log('Fenster: Escape (1x)', await zustand(page));
    // «Alle Begriffe» aus dem Fenster
    if (!(await zustand(page)).fenster) { await page.evaluate(t => document.querySelector('.mchip[href="#' + t + '"]').click(), thema); await page.waitForTimeout(200); }
    await fw.click(); await page.locator('#b-pop .b-pop-alle a').click(); await page.waitForTimeout(300);
    log('Fenster: «Alle Begriffe»', { ...(await zustand(page)), hash: await page.evaluate(() => location.hash), panel: await page.evaluate(() => (document.querySelector('.panel:not([hidden])') || {}).id), ziel: await page.evaluate(() => { const b = document.getElementById('begriffe'); const r = b && b.getBoundingClientRect(); return r ? Math.round(r.top) : null; }) });
  }
  // Wort in einer Tabellenzelle der Kantone und im Plakat
  await page.evaluate(() => document.getElementById('t-kantone') && document.getElementById('t-kantone').click());
  console.log(tag, 'Fehler', errors);
  await close();
}
(async () => { await lauf(false); await lauf(true); })();
