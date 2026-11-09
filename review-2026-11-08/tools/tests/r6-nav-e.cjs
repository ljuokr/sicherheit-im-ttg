// Runde 6 Navigation E: Fokus nach Zurück ins Fenster und nach Hash von aussen
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
const fo = p => p.evaluate(() => { const ae = document.activeElement; return location.hash + ' fenster=' + !document.getElementById('fenster').hidden + ' fokus=' + ae.tagName + '#' + ae.id + '.' + String(ae.className).slice(0, 15) + ' hasFocus=' + document.hasFocus(); });
(async () => {
  for (const mobile of [false, true]) {
    const B = mobile ? '375' : '1280';
    const { page, errors, close } = await L.open({ mobile, hash: 'unterricht' });
    await page.evaluate(() => { window._f = []; document.addEventListener('focusin', e => window._f.push('in:' + e.target.tagName + '#' + e.target.id)); document.addEventListener('focusout', e => window._f.push('out:' + e.target.tagName + '#' + e.target.id)); });
    await page.evaluate(() => { location.hash = 'holzstaub'; }); await W(700);
    console.log(B, 'aussen #holzstaub', await fo(page), JSON.stringify(await page.evaluate(() => window._f.splice(0))));
    await page.keyboard.press('Escape'); await W(300);
    console.log(B, 'Esc', await fo(page));
    await page.goBack(); await W(600);
    console.log(B, 'zurück', await fo(page));
    await page.goForward(); await W(600);
    console.log(B, 'vorwärts', await fo(page), JSON.stringify(await page.evaluate(() => window._f.splice(0))));
    // Thema per Chip, Link aus dem Fenster in ein anderes Register, Zurück ins Fenster
    if (!(await page.evaluate(() => document.getElementById('fenster').hidden))) { await page.click('#f-zu'); await W(300); }
    await page.click('#t-matrix'); await W(400);
    await page.evaluate(() => [...document.querySelectorAll('#matrix a.mchip')].find(a => a.getClientRects().length && a.getAttribute('href') === '#kleben').click()); await W(400);
    console.log(B, 'Chip kleben', await fo(page));
    await page.evaluate(() => document.querySelector('#fenster a[href="#lehrplan"]').click()); await W(800);
    console.log(B, 'Link lehrplan', await fo(page));
    await page.goBack(); await W(700);
    console.log(B, 'zurück ins Fenster', await fo(page));
    await page.keyboard.press('Tab'); await W(100);
    console.log(B, 'Tab danach', await fo(page));
    console.log(B, 'Konsole', JSON.stringify(errors));
    await close();
  }
})();
