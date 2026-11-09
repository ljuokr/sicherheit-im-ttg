// Prüfrunde r6 Layout 2: Registerzeile, Treppe, Raumplan, Fokus, Leiste und Fenster
const L = require(process.env.ST_LIB);
(async () => {
  for (const w of [375, 768, 1024, 1280]) for (const dark of [false, true]) {
    const tag = (dark ? 'd' : 'h') + w;
    const { page, errors, close } = await L.open({ width: w, mobile: w === 375, dark });
    // Registerzeile
    const reg = await page.evaluate(() => {
      const tl = document.querySelector('#tl-haupt'); const lr = tl.getBoundingClientRect();
      const tabs = [...tl.querySelectorAll('[role=tab]')].map(t => { const r = t.getBoundingClientRect(); return t.textContent.trim().slice(0,10) + (r.right > lr.right + 1 || r.right > innerWidth ? ':AUSSERHALB' : ''); });
      const s = getComputedStyle(tl);
      return { sw: tl.scrollWidth, cw: tl.clientWidth, ox: s.overflowX, sb: tl.offsetHeight - tl.clientHeight, tabs, maskOderSchatten: s.maskImage + ' ' + s.backgroundImage };
    });
    console.log(tag, 'Register', JSON.stringify(reg));
    if (w === 768) {
      await page.focus('#t-fachraum'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(400);
      const k = await page.evaluate(() => { const a = document.activeElement; const r = a.getBoundingClientRect(); return a.id + ' ' + Math.round(r.left) + '-' + Math.round(r.right) + ' vw' + innerWidth; });
      console.log(tag, 'Pfeil nach Kantone', k);
      await L.shot(page, 'r6-' + tag + '-kantone-pfeil');
    }
    // Treppe
    await page.click('#t-unterricht'); await page.waitForTimeout(300);
    const tr = await page.evaluate(() => [...document.querySelectorAll('.treppe li')].map(li => { const r = li.getBoundingClientRect(); return { top: Math.round(r.top), h: Math.round(r.height), l: Math.round(r.left), r: Math.round(r.right), ueber: li.scrollWidth > li.clientWidth + 1 }; }));
    console.log(tag, 'Treppe', JSON.stringify(tr));
    // Ablauf und Raumplan
    await page.click('#t-fachraum'); await page.waitForTimeout(300);
    const ab = await page.evaluate(() => [...document.querySelectorAll('.ablauf a')].map(a => { const r = a.getBoundingClientRect(); return { h: Math.round(r.height), w: Math.round(r.width), ueber: a.scrollWidth > a.clientWidth + 1, b: [...a.querySelectorAll('b')].map(b => b.scrollWidth > b.clientWidth + 1) }; }));
    console.log(tag, 'Ablauf', JSON.stringify(ab));
    const rp = await page.evaluate(() => {
      const f = document.querySelector('figure.raumplan'); if (!f) return 'kein raumplan';
      const d = f.closest('details'); let o = []; for (let p = f.parentElement; p; p = p.parentElement) if (p.tagName === 'DETAILS') { o.push(p.open); p.open = true; }
      f.scrollIntoView({ block: 'start' });
      const svg = f.querySelector('svg'); const vb = svg.viewBox.baseVal; const sr = svg.getBoundingClientRect();
      const texte = [...svg.querySelectorAll('text')];
      const raus = texte.filter(t => { const b = t.getBBox(); return b.x < vb.x - 1 || b.y < vb.y - 1 || b.x + b.width > vb.x + vb.width + 1 || b.y + b.height > vb.y + vb.height + 1; }).map(t => t.textContent);
      // Texte, die sich gegenseitig überlappen
      const bb = texte.map(t => ({ t: t.textContent, b: t.getBoundingClientRect() }));
      const ueberl = []; for (let i = 0; i < bb.length; i++) for (let j = i + 1; j < bb.length; j++) { const a = bb[i].b, c = bb[j].b; if (a.left < c.right - 1 && c.left < a.right - 1 && a.top < c.bottom - 1 && c.top < a.bottom - 1) ueberl.push(bb[i].t + ' / ' + bb[j].t); }
      const fs = texte.map(t => parseFloat(getComputedStyle(t).fontSize) * sr.width / vb.width);
      return { offenVorher: o, svgW: Math.round(sr.width), vbW: vb.width, texte: texte.length, minPx: Math.min(...fs).toFixed(1), raus, ueberl: ueberl.slice(0, 8), role: svg.getAttribute('role'), label: svg.getAttribute('aria-label') || (svg.querySelector('title') || {}).textContent, cap: (f.querySelector('figcaption') || {}).textContent };
    });
    console.log(tag, 'Raumplan', JSON.stringify(rp));
    await page.waitForTimeout(500);
    await L.shot(page, 'r6-' + tag + '-raumplan');
    if (errors.length) console.log(tag, 'Fehler', errors);
    await close();
  }
})();
