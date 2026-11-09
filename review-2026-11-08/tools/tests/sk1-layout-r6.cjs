// Skeptiker 1, Layout r6: Register 641-1023, Raumplan 375, Treppe, Platzhalter, mit eingespritzten Korrekturen
const L = require(process.env.ST_LIB);
const FIX1 = `@media (max-width:63.99rem){.reg-zeile{flex-wrap:wrap;gap:0 .75rem}.reg-zeile .tabs{flex-wrap:wrap;overflow-x:visible}.reg-zeile [role=tab]{padding:.45rem .4rem .35rem;min-height:2.5rem;font-size:.9375rem}.suche-klein{flex:1 1 6rem;padding-bottom:.35rem}.suche-klein input,.suche-klein input:focus{width:100%}}`;
const FIX3 = `.treppe li:nth-child(n){min-height:0}.treppe ol{align-items:stretch}.treppe li:nth-child(1){margin-top:4rem}.treppe li:nth-child(2){margin-top:2rem}@media (max-width:44rem){.treppe li{margin-top:0!important}}`;
(async () => {
  const reg = async (page) => page.evaluate(() => { const tl = document.querySelector('#tl-haupt'); const lr = tl.getBoundingClientRect(); const ls = document.querySelector('#leiste').getBoundingClientRect(); return { sw: tl.scrollWidth, cw: tl.clientWidth, leisteH: Math.round(ls.height), versteckt: [...tl.querySelectorAll('[role=tab]')].filter(t => t.getBoundingClientRect().right > lr.right + 1).map(t => t.textContent.trim()), zeilen: new Set([...tl.querySelectorAll('[role=tab]')].map(t => Math.round(t.getBoundingClientRect().top))).size, such: Math.round(document.querySelector('#f-q').getBoundingClientRect().width) }; });
  for (const w of [641, 700, 768, 834, 900, 1000, 1023, 1024]) {
    const { page, close } = await L.open({ width: w });
    const a = await reg(page);
    await page.focus('#t-fachraum'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(800);
    const f = await page.evaluate(() => { const tl = document.querySelector('#tl-haupt'); const lr = tl.getBoundingClientRect(); const r = document.activeElement.getBoundingClientRect(); return document.activeElement.id + ' sichtbar ' + Math.max(0, Math.round(Math.min(r.right, lr.right) - Math.max(r.left, lr.left))) + '/' + Math.round(r.width); });
    await page.addStyleTag({ content: FIX1 }); await page.waitForTimeout(200);
    const b = await reg(page);
    console.log(w, 'vorher', JSON.stringify(a), 'Pfeil', f, '| mitFix', JSON.stringify(b));
    if (w === 768) await L.shot(page, 'sk1-r6-768-regfix');
    await close();
  }
  // Raumplan
  for (const w of [375, 768]) {
    const { page, close } = await L.open({ width: w, mobile: w === 375 });
    const r = await page.evaluate(() => { const s = document.querySelector('figure.raumplan svg'); if (!s) return 'kein'; const vb = s.viewBox.baseVal.width; const sw = s.getBoundingClientRect().width; const fs = [...s.querySelectorAll('text')].map(t => parseFloat(getComputedStyle(t).fontSize)); return { sw: Math.round(sw), vb, minPx: +(Math.min(...fs) * sw / vb).toFixed(1), maxPx: +(Math.max(...fs) * sw / vb).toFixed(1), n: fs.length }; });
    console.log('raumplan', w, JSON.stringify(r));
    await close();
  }
  // Treppe
  for (const w of [700, 768, 834, 900, 1024, 1280]) {
    const { page, close } = await L.open({ width: w });
    await page.evaluate(() => { const t = document.querySelector('#t-unterricht'); t && t.click(); });
    await page.waitForTimeout(300);
    const m = () => page.evaluate(() => [...document.querySelectorAll('.treppe li')].map(li => { const r = li.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.height)]; }));
    const a = await m();
    await page.addStyleTag({ content: FIX3 }); await page.waitForTimeout(100);
    console.log('treppe', w, JSON.stringify(a), 'mitFix', JSON.stringify(await m()));
    await close();
  }
  { const { page, close } = await L.open({ width: 375, mobile: true });
    await page.evaluate(() => { const t = document.querySelector('#t-unterricht'); t && t.click(); }); await page.waitForTimeout(300);
    await page.addStyleTag({ content: FIX3 });
    console.log('treppe 375 mitFix', JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.treppe li')].map(li => { const r = li.getBoundingClientRect(); return [Math.round(r.top), Math.round(r.height), Math.round(r.left)]; }))));
    await close(); }
  // Platzhalter
  for (const dark of [false, true]) {
    const { page, close } = await L.open({ width: 1280, dark });
    const r = await page.evaluate(() => ['#f-q', '#filter'].map(s => { const i = document.querySelector(s); if (!i) return s + ' fehlt'; return s + ' ' + getComputedStyle(i, '::placeholder').color + ' op ' + getComputedStyle(i, '::placeholder').opacity + ' auf ' + getComputedStyle(i).backgroundColor; }));
    await page.addStyleTag({ content: 'input::placeholder{color:var(--muted);opacity:1}' });
    const r2 = await page.evaluate(() => ['#f-q', '#filter'].map(s => { const i = document.querySelector(s); return i ? getComputedStyle(i, '::placeholder').color : ''; }));
    console.log('ph dark=' + dark, JSON.stringify(r), 'mitFix', JSON.stringify(r2));
    await close();
  }
})();
