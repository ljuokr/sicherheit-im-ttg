// Sichtprüfung Fenster, Plakatkarte, Kopfzeile bei 375, 768, 1280
const L = require(process.env.ST_LIB);
(async () => {
  for (const [w, dark] of [[375, false], [768, true], [1280, false], [1280, true]]) {
    const { page, close } = await L.open({ width: w, mobile: w === 375, dark });
    await page.click('#t-matrix'); await page.waitForTimeout(150);
    await page.evaluate(() => { const c = [...document.querySelectorAll('#matrix .mchip')].find(c => c.getBoundingClientRect().width > 0 && /schweiss|löten/i.test(c.textContent)) || [...document.querySelectorAll('#matrix .mchip')].find(c => c.getBoundingClientRect().width > 0 && !c.hasAttribute('data-maschine')); c.click(); });
    await page.waitForTimeout(200);
    await L.shot(page, 'sicht-fenster-' + w + (dark ? 'd' : 'h'));
    const r = await page.evaluate(() => { const f = document.getElementById('fenster'), k = document.querySelector('.f-kopf'); const zu = document.getElementById('f-zu').getBoundingClientRect(); const leiste = document.querySelector('header,#leiste,.leiste'); const lr = leiste && leiste.getBoundingClientRect(); return { titel: document.getElementById('f-titel').textContent, zu: [Math.round(zu.width), Math.round(zu.height)], fz: getComputedStyle(f).zIndex, leisteZ: leiste && getComputedStyle(leiste).zIndex, leisteUnten: lr && Math.round(lr.bottom), fTop: Math.round(f.getBoundingClientRect().top), kopfSticky: getComputedStyle(k).position }; });
    console.log(w, dark, JSON.stringify(r));
    await page.evaluate(() => document.getElementById('f-zu').click());
    await page.click('#t-verfahren'); await page.waitForTimeout(150);
    await page.evaluate(() => { const b = [...document.querySelectorAll('#plakat-ziel .m-zeile')].find(b => b.getBoundingClientRect().width > 0); b.click(); b.scrollIntoView({ block: 'start' }); window.scrollBy(0, -140); });
    await page.waitForTimeout(150);
    await L.shot(page, 'sicht-karte-' + w + (dark ? 'd' : 'h'));
    // Zielgrössen kleiner als 24 px
    const klein = await page.evaluate(() => [...document.querySelectorAll('a[href],button,summary,input')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 24 && !e.closest('p,li,td,dd') ; }).map(e => e.tagName + '.' + e.className + ' ' + Math.round(e.getBoundingClientRect().height) + ' "' + e.textContent.trim().slice(0, 25) + '"').slice(0, 8));
    console.log('klein', JSON.stringify(klein));
    await close();
  }
})();
