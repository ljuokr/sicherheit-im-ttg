// R5: Wann öffnet sich die Begriffskarte auf 375 px unerwartet?
const L = require(process.env.ST_LIB);
(async () => {
  for (const vp of [{ mobile: true }, { width: 1280 }]) {
    const { page, close } = await L.open(vp);
    const pop = () => page.evaluate(() => { const p = document.getElementById('b-pop'); return p.hidden ? 'zu' : 'OFFEN:' + p.querySelector('.b-pop-titel').textContent; });
    const log = [];
    log.push('Start ' + await pop());
    await page.fill('#f-q', 'Staub'); await page.waitForTimeout(400); log.push('nach Suche ' + await pop());
    await page.evaluate(() => { const a = [...document.querySelectorAll('#erg-inhalt a[href^="#"]')].find(x => x.getAttribute('href') === '#lehrplan'); a.setAttribute('data-x', 1); a.scrollIntoView({ block: 'center', behavior: 'instant' }); });
    await page.click('[data-x]'); await page.waitForTimeout(400);
    log.push('nach Klick #lehrplan ' + await pop() + ' Fokus ' + await page.evaluate(() => document.activeElement.tagName + '.' + document.activeElement.className + ' ' + document.activeElement.textContent.slice(0, 30)));
    // gleicher Ablauf, aber Klick auf ein Element, das nach dem Sprung unter dem Finger liegt?
    const unter = await page.evaluate(() => { const p = document.getElementById('b-pop'); return p.hidden ? null : 'offenVon sichtbar'; });
    log.push('unter=' + unter);
    // Weiteres Szenario: Suche, Klick auf Abschnitt-Link #installationen
    await page.fill('#f-q', ''); await page.fill('#f-q', 'Staub'); await page.waitForTimeout(400);
    await page.evaluate(() => { const p = document.getElementById('b-pop'); if (!p.hidden) p.querySelector('.b-zu').click(); const a = [...document.querySelectorAll('#erg-inhalt a[href^="#"]')].find(x => x.getAttribute('href') === '#installationen'); a.setAttribute('data-x2', 1); a.scrollIntoView({ block: 'center', behavior: 'instant' }); });
    await page.click('[data-x2]'); await page.waitForTimeout(400);
    log.push('nach Klick #installationen ' + await pop());
    await L.shot(page, 'r5-pop-' + (vp.width || 375));
    console.log('=== ' + (vp.width || 375) + '\n  ' + log.join('\n  '));
    await close();
  }
})();
