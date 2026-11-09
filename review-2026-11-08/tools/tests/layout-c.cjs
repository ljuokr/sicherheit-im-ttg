// Glossar per Tastatur, Fokusfalle im Fenster auf schmalen Breiten, Fenster mobil
const L = require(process.env.ST_LIB);
(async () => {
  let { page, errors, close } = await L.open({ width: 1280 });
  for (const t of ['#t-grundlage','#t-verfahren','#t-unterricht','#t-fachraum','#t-recht']) { await page.click(t); await page.waitForTimeout(100); if (await page.evaluate(() => [...document.querySelectorAll('.b-wort')].some(b => b.offsetParent))) { console.log('Register', t); break; } }
  const info = await page.evaluate(() => { const b = [...document.querySelectorAll('.b-wort')].find(b => b.offsetParent); return b ? { t: b.textContent, href: b.getAttribute('href'), in: (b.closest('[id]') || {}).id, parentA: !!b.parentElement.closest('a:not(.b-wort)') } : null; });
  console.log('erstes Glossarwort', JSON.stringify(info));
  await page.evaluate(() => [...document.querySelectorAll('.b-wort')].find(b => b.offsetParent).focus());
  await page.keyboard.press('Enter'); await page.waitForTimeout(200);
  let st = await page.evaluate(() => ({ pop: !document.getElementById('b-pop').hidden, fenster: !document.getElementById('fenster').hidden, fokus: document.activeElement.className + ' ' + document.activeElement.textContent.slice(0, 20) }));
  console.log('Glossar Enter', JSON.stringify(st));
  await page.keyboard.press('Escape'); await page.waitForTimeout(150);
  st = await page.evaluate(() => ({ pop: !document.getElementById('b-pop').hidden, fokus: document.activeElement.className + ' ' + document.activeElement.textContent.slice(0, 20) }));
  console.log('Glossar Escape', JSON.stringify(st));
  await close();

  for (const w of [375, 768]) for (const dark of [false, true]) {
    ({ page, errors, close } = await L.open({ width: w, mobile: w === 375, dark }));
    await page.click('#t-matrix'); await page.waitForTimeout(150);
    const n = await page.evaluate(() => document.querySelectorAll('#matrix .mchip, #matrix .mx-mat').length);
    const probleme = [];
    for (let i = 0; i < n; i++) {
      const r = await page.evaluate(i => {
        const f = document.getElementById('fenster'); if (!f.hidden) document.getElementById('f-zu').click();
        const c = document.querySelectorAll('#matrix .mchip, #matrix .mx-mat')[i]; c.click();
        const fr = f.getBoundingClientRect();
        const aus = [...f.querySelectorAll('*')].filter(e => { const r = e.getBoundingClientRect(); if (!r.width) return false; let p = e.parentElement, sc = false; while (p && p !== f) { if (/auto|scroll|hidden/.test(getComputedStyle(p).overflowX)) { sc = true; break; } p = p.parentElement; } return !sc && (r.right > fr.right + 1 || r.left < fr.left - 1); }).map(e => e.tagName + '.' + e.className + ' ' + Math.round(e.getBoundingClientRect().right) + ' "' + e.textContent.trim().slice(0, 30) + '"').slice(0, 4);
        return { c: c.textContent.trim().slice(0, 30), offen: !f.hidden, fw: Math.round(fr.width), W: innerWidth, quer: f.scrollWidth - f.clientWidth, aus };
      }, i);
      if (!r.offen || r.quer > 0 || r.aus.length || r.fw > r.W) probleme.push(r);
    }
    console.log('Fenster', w, dark ? 'D' : 'H', n, JSON.stringify(probleme).slice(0, 1500));
    // Fokusfalle
    await page.evaluate(() => { const f = document.getElementById('fenster'); if (!f.hidden) document.getElementById('f-zu').click(); });
    await page.focus('#matrix .mchip'); await page.keyboard.press('Enter'); await page.waitForTimeout(150);
    const k = await page.evaluate(() => document.getElementById('fenster').querySelectorAll('a[href],button').length);
    for (let i = 0; i < k + 2; i++) await page.keyboard.press('Tab');
    st = await page.evaluate(() => { const a = document.activeElement, f = document.getElementById('fenster'); const r = a.getBoundingClientRect(); const top = document.elementFromPoint(Math.max(1, r.left + 2), Math.max(1, Math.min(innerHeight - 2, r.top + 2))); return { imFenster: f.contains(a), a: a.tagName + ' ' + a.textContent.trim().slice(0, 30), verdeckt: !f.contains(a) && f.contains(top), bodyInert: document.querySelector('main') && document.querySelector('main').inert }; });
    console.log('Fokus nach allen Zielen', w, JSON.stringify(st));
    if (st.verdeckt && !dark) await L.shot(page, 'layout-fokus-hinter-fenster-' + w);
    if (errors.length) console.log(errors);
    await close();
  }
})();
