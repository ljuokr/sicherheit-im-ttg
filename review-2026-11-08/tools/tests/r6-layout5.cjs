// Prüfrunde r6 Layout 5: Kontrast in Leiste, Fenster, Fusszeile; Fenster bei 375/768
const L = require(process.env.ST_LIB);
function pruef(root) {
  const pc = c => { const m = c.match(/[\d.]+/g); if (!m) return [0,0,0,0]; const v = m.map(Number); if (c.startsWith('color(')) return [v[0]*255,v[1]*255,v[2]*255,v[3]===undefined?1:v[3]]; return v; };
  const lin = c => { c/=255; return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4); };
  const lum = a => 0.2126*lin(a[0])+0.7152*lin(a[1])+0.0722*lin(a[2]);
  const bgOf = e => { for (let p = e; p; p = p.parentElement) { const s = getComputedStyle(p); const c = pc(s.backgroundColor); if ((c[3] === undefined ? 1 : c[3]) > 0.5) return c; } return pc(getComputedStyle(document.body).backgroundColor); };
  const out = []; const ges = new Set();
  for (const sel of root) { const r0 = document.querySelector(sel); if (!r0) continue;
    for (const e of [r0, ...r0.querySelectorAll('*')]) {
      const r = e.getBoundingClientRect(); if (!r.width || e.closest('svg') || e.classList.contains('sr')) continue;
      if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
      const s = getComputedStyle(e); const fg = pc(s.color); const bg = bgOf(e); const a = fg[3] === undefined ? 1 : fg[3];
      const f = [0,1,2].map(i => fg[i]*a + bg[i]*(1-a));
      const k = (Math.max(lum(f),lum(bg))+0.05)/(Math.min(lum(f),lum(bg))+0.05);
      if (k < 4.5) { const key = sel + e.className + s.color; if (!ges.has(key)) { ges.add(key); out.push(sel + ' ' + e.tagName + '.' + e.className + ' ' + k.toFixed(2) + ' «' + e.textContent.trim().slice(0, 25) + '»'); } }
    } }
  return out;
}
(async () => {
  for (const w of [375, 768, 1280]) for (const dark of [false, true]) {
    const tag = (dark ? 'd' : 'h') + w;
    const { page, close } = await L.open({ width: w, mobile: w === 375, dark });
    await page.click('#t-matrix'); await page.waitForTimeout(250);
    console.log(tag, 'Leiste/Fuss', JSON.stringify(await page.evaluate(pruef, ['#leiste', 'footer', '.fuss'])));
    await page.evaluate(() => [...document.querySelectorAll('#matrix .mchip')].find(c => /Weichl|Löten/.test(c.textContent) && c.getBoundingClientRect().width > 0)?.click());
    await page.waitForTimeout(600);
    const f = await page.evaluate(() => { const f = document.getElementById('fenster'); const r = f.getBoundingClientRect(); return { offen: !f.hidden, l: Math.round(r.left), r: Math.round(r.right), sw: f.scrollWidth, cw: f.clientWidth, quer: document.documentElement.scrollWidth - document.documentElement.clientWidth }; });
    console.log(tag, 'Fenster', JSON.stringify(f), JSON.stringify(await page.evaluate(pruef, ['#fenster'])));
    await L.shot(page, 'r6-' + tag + '-fenster');
    await close();
  }
})();
