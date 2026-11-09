// H-Satz-Links aus der Matrix: wohin führen sie, ist das Ziel sichtbar
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  await page.click('#t-matrix'); await page.waitForTimeout(150);
  const r = await page.evaluate(async () => {
    const z = document.getElementById('h-H301');
    const kette = []; let p = z; while (p && p !== document.body) { kette.push(p.tagName + (p.id ? '#' + p.id : '') + (p.className ? '.' + String(p.className).split(' ').join('.') : '') + (p.tagName === 'DETAILS' ? (p.open ? '[open]' : '[zu]') : '') + (p.hidden ? '[hidden]' : '')); p = p.parentElement; }
    const a = document.querySelector('#matrix a[href="#h-H301"]');
    const herkunft = []; p = a; while (p && p !== document.body) { herkunft.push(p.tagName + (p.id ? '#' + p.id : '') + (p.className ? '.' + String(p.className).split(' ').join('.') : '')); p = p.parentElement; }
    a.click(); await new Promise(r => setTimeout(r, 300));
    const k2 = []; p = z; while (p && p !== document.body) { k2.push(p.tagName + (p.id ? '#' + p.id : '') + (p.tagName === 'DETAILS' ? (p.open ? '[open]' : '[zu]') : '') + (p.hidden ? '[hidden]' : '') + ' ' + getComputedStyle(p).display); p = p.parentElement; }
    const rr = z.getBoundingClientRect();
    return { vorher: kette, herkunft, nachher: k2, rect: [rr.top, rr.height], aktivTab: document.querySelector('#tl-haupt [aria-selected=true]').textContent, hash: location.hash, sichtbarInTpl: !!a.closest('template') };
  });
  console.log(JSON.stringify(r, null, 1), errors);
  await close();
})();
