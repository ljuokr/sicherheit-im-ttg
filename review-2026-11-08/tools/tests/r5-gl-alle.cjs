// R5 Glossar: Link «Alle Begriffe» im Popup, landet man beim Glossar? Aus dem Text und aus dem Themenfenster, 1280 und 375
const L = require(process.env.ST_LIB);
const lage = page => page.evaluate(() => { const b = document.getElementById('begriffe'); const r = b.getBoundingClientRect();
  return { top: Math.round(r.top), h: innerHeight, scrollY: Math.round(scrollY), panel: (document.querySelector('.panel:not([hidden])') || {}).id, fokus: document.activeElement.id || document.activeElement.tagName,
    details: (() => { const d = b.closest('details'); return d ? 'in details open=' + d.open : 'kein details'; })(), fenster: !document.getElementById('fenster').hidden }; });
(async () => {
  for (const mobile of [false, true]) {
    const tag = mobile ? '375' : '1280';
    // aus dem Text (Register Recht)
    let o = await L.open({ mobile, hash: 'recht' });
    await o.page.evaluate(() => [...document.querySelectorAll('#recht a.b-wort')].find(a => a.checkVisibility()).click());
    await o.page.locator('#b-pop .b-pop-alle a').click(); await o.page.waitForTimeout(2500);
    console.log(tag, 'aus Text   ', JSON.stringify(await lage(o.page)));
    await L.shot(o.page, 'r5-gl-alle-text-' + tag);
    // direkter Sprung zum Vergleich
    await o.page.evaluate(() => { location.hash = ''; }); await o.page.evaluate(() => { location.hash = 'begriffe'; }); await o.page.waitForTimeout(2500);
    console.log(tag, 'per hash   ', JSON.stringify(await lage(o.page)));
    await o.close();
    // aus dem Themenfenster
    o = await L.open({ mobile, hash: 'holzstaub' }); await o.page.waitForTimeout(300);
    await o.page.locator('#fenster a.b-wort').first().click();
    await o.page.locator('#b-pop .b-pop-alle a').click(); await o.page.waitForTimeout(2500);
    console.log(tag, 'aus Fenster', JSON.stringify(await lage(o.page)));
    await L.shot(o.page, 'r5-gl-alle-fenster-' + tag);
    await o.close();
  }
})();
