// Skeptiker 1, Nachprüfung LAYOUT-01 bis 06
const L = require(process.env.ST_LIB);
function lin(c){ c/=255; return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4); }
function hex(h){ return [1,3,5].map(i=>parseInt(h.substr(i,2),16)); }
function lum(rgb){ const [r,g,b]=rgb.map(lin); return 0.2126*r+0.7152*g+0.0722*b; }
function kon(a,b){ const x=lum(a), y=lum(b); return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05); }
function deut(rgb){ // Machado 2009, Deuteranomalie Stärke 1.0
  const m=[[0.367322,0.860646,-0.227968],[0.280085,0.672501,0.047413],[-0.011820,0.042940,0.968881]];
  const l=rgb.map(lin); return m.map(r=>{ let v=r[0]*l[0]+r[1]*l[1]+r[2]*l[2]; v=Math.min(1,Math.max(0,v)); v=v<=0.0031308?v*12.92:1.055*Math.pow(v,1/2.4)-0.055; return Math.round(v*255); });
}
(async () => {
  const A=hex('#3dbfa3'), B=hex('#f7e57e'), C=hex('#f08576');
  console.log('01 Kontrast A/C', kon(A,C).toFixed(2), 'A/B', kon(A,B).toFixed(2), 'B/C', kon(B,C).toFixed(2));
  console.log('01 Deut A', deut(A), 'C', deut(C), 'Kontrast', kon(deut(A),deut(C)).toFixed(2), '#111 auf A', kon(hex('#111111'),A).toFixed(2), 'auf C', kon(hex('#111111'),C).toFixed(2));
  // 01: Punkte im Plakat, Patch
  { const { page, close } = await L.open({ width: 375, mobile: true });
    await page.click('#t-verfahren'); await page.waitForTimeout(150);
    const vor = await page.evaluate(() => { const d=document.querySelector('#plakat-ziel .dot'); return [getComputedStyle(d).fontSize, d.textContent, getComputedStyle(d,'::after').content]; });
    await page.addStyleTag({ content: '.dot::after{font-size:.6rem;font-weight:700;line-height:1;color:#111} .dot.A::after{content:"A"} .dot.B::after{content:"B"} .dot.C::after{content:"C"}' });
    const nach = await page.evaluate(() => { const d=document.querySelector('#plakat-ziel .dot'); const r=d.getBoundingClientRect(); return [getComputedStyle(d,'::after').content, getComputedStyle(d,'::after').fontSize, Math.round(r.width), Math.round(r.height), document.querySelectorAll('.dot').length]; });
    console.log('01 vor', JSON.stringify(vor), 'nach', JSON.stringify(nach));
    await page.evaluate(() => document.querySelector('#plakat-ziel').scrollIntoView());
    await L.shot(page, 'skeptiker1-dot-buchstaben-375');
    const aria = await page.evaluate(() => document.querySelector('#plakat-ziel .m-zeile').getAttribute('aria-label'));
    console.log('06 aria-label', aria);
    await close(); }
  // 02: Fokus hinter Fenster, mit und ohne inert
  for (const w of [375, 768]) for (const patch of [false, true]) {
    const { page, close } = await L.open({ width: w, mobile: w === 375 });
    await page.click('#t-matrix'); await page.waitForTimeout(150);
    await page.evaluate(() => { const c=[...document.querySelectorAll('#matrix .mchip')].find(c => !c.hasAttribute('data-maschine') && document.getElementById(c.getAttribute('href').slice(1))); c.setAttribute('data-test','1'); });
    await page.focus('[data-test="1"]'); await page.keyboard.press('Enter'); await page.waitForTimeout(200);
    if (patch) await page.evaluate(() => ['leiste','inhalt'].forEach(id => document.getElementById(id).inert = true));
    let raus = null;
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press('Tab');
      const r = await page.evaluate(() => { const a=document.activeElement, f=document.getElementById('fenster'); if (f.contains(a) || a===document.body) return null; return a.tagName+' '+(a.getAttribute('aria-label')||a.textContent).trim().slice(0,30); });
      if (r) { raus = (i+1)+' '+r; break; }
    }
    console.log('02', w, patch ? 'inert' : 'ohne', 'raus:', raus);
    await close();
  }
  // 03 und 05 (Matrix): Seitenfenster ab 64rem, mit und ohne Patch
  for (const w of [1024, 1280, 1440]) for (const patch of [false, true]) {
    const { page, close } = await L.open({ width: w });
    if (patch) await page.addStyleTag({ content: 'body.f-offen #inhalt,body.f-offen #leiste{padding-right:min(36rem,45vw)}' });
    await page.click('#t-matrix'); await page.waitForTimeout(150);
    await page.evaluate(() => [...document.querySelectorAll('#matrix .mchip')].find(c => /Weichl/.test(c.textContent) && c.getBoundingClientRect().width > 0).click());
    await page.waitForTimeout(200);
    const r = await page.evaluate(() => {
      const fl = document.getElementById('fenster').getBoundingClientRect().left;
      const unter = [...document.querySelectorAll('#leiste [role=tab], #leiste input, #leiste button')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.right > fl + 2; }).map(e => e.textContent.trim().slice(0, 14) || e.tagName);
      const mx = document.querySelector('.mx-wrap');
      const tl = document.querySelector('#tl-haupt');
      return { fl: Math.round(fl), unter, mx: [mx.scrollWidth, mx.clientWidth], tabsScroll: tl ? [tl.scrollWidth, tl.clientWidth] : null, quer: document.documentElement.scrollWidth - document.documentElement.clientWidth };
    });
    console.log('03', w, patch ? 'patch' : 'ohne', JSON.stringify(r));
    if (patch && w === 1024) await L.shot(page, 'skeptiker1-leiste-patch-1024');
    await close();
  }
  // 04 und 05: Tabellen bei 375
  { const { page, close } = await L.open({ width: 375, mobile: true });
    for (const t of ['t-unterricht', 't-kantone', 't-recht', 't-fachraum', 't-verfahren']) {
      await page.click('#' + t); await page.waitForTimeout(150);
      const r = await page.evaluate(() => { document.querySelectorAll('details').forEach(d => d.open = true); return [...document.querySelectorAll('.wrap')].filter(e => e.getBoundingClientRect().width > 0 && e.scrollWidth > e.clientWidth + 1).map(e => ({ cls: e.querySelector('table').className, sw: e.scrollWidth, cw: e.clientWidth, fokus: e.querySelectorAll('a[href],button,[tabindex]').length, tabindex: e.getAttribute('tabindex'), sb: e.offsetHeight - e.clientHeight, bgEltern: getComputedStyle(e.parentElement).backgroundColor })); });
      console.log('04/05', t, JSON.stringify(r));
    }
    // Patch 04: tabindex, Tastatur-Scroll
    await page.click('#t-unterricht'); await page.waitForTimeout(150);
    const s = await page.evaluate(() => { const w=document.querySelector('table.vergleich').parentElement; w.setAttribute('tabindex','0'); w.focus(); return w.scrollLeft; });
    await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(200);
    const s2 = await page.evaluate(() => document.querySelector('table.vergleich').parentElement.scrollLeft);
    console.log('04 Patch scrollLeft', s, '->', s2);
    await close(); }
})();
