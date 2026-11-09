// Struktur: alt, Tabellenköpfe, Aufklapp-Namen, Bedienelemente ohne Namen, Fokusrahmen, Escape, Fenster mobil
const L = require(process.env.ST_LIB);
(async () => {
  let { page, errors, close } = await L.open({ width: 1280 });
  const s = await page.evaluate(() => {
    const out = {};
    const name = el => (el.getAttribute('aria-label') || (el.getAttribute('aria-labelledby') && (document.getElementById(el.getAttribute('aria-labelledby')) || {}).textContent) || el.textContent || el.title || '').trim();
    out.imgOhneAlt = [...document.querySelectorAll('img')].filter(i => !i.hasAttribute('alt')).map(i => i.src.slice(0, 60));
    out.imgAltLeer = [...document.querySelectorAll('img')].filter(i => i.getAttribute('alt') === '').map(i => (i.closest('figure,a,button,section') || {}).className + ' ' + (i.getAttribute('src') || '').slice(0, 40));
    out.imgAlle = document.querySelectorAll('img').length;
    out.svgOhne = [...document.querySelectorAll('svg')].filter(v => !v.closest('[aria-hidden=true]') && v.getAttribute('aria-hidden') !== 'true' && !v.getAttribute('role') && !v.querySelector('title') && !v.getAttribute('aria-label')).map(v => (v.parentElement.tagName + '.' + v.parentElement.className)).slice(0, 10);
    out.tabellen = [...document.querySelectorAll('table')].map(t => ({ cls: t.className, id: (t.closest('[id]') || {}).id, th: t.querySelectorAll('th').length, thead: !!t.tHead, scope: t.querySelectorAll('th[scope]').length, cap: !!t.caption || !!t.getAttribute('aria-label') || !!t.getAttribute('aria-labelledby') })).filter(t => !t.th || !t.thead || !t.cap);
    out.summaryKurz = [...document.querySelectorAll('summary')].map(s => ({ t: s.textContent.trim().replace(/\s+/g, ' '), id: (s.closest('section[id],[id]') || {}).id })).filter(x => x.t.length < 4 || /^(mehr|details|weiter|anzeigen|öffnen|zeile|liste|\+|›)$/i.test(x.t));
    const sums = [...document.querySelectorAll('summary')].map(s => s.textContent.trim().replace(/\s+/g, ' '));
    const z = {}; sums.forEach(t => z[t] = (z[t] || 0) + 1); out.summaryDoppelt = Object.entries(z).filter(([, n]) => n > 2).slice(0, 15);
    out.summaryMitLink = [...document.querySelectorAll('summary a, summary button')].map(a => a.closest('summary').textContent.trim().slice(0, 60));
    out.ohneName = [...document.querySelectorAll('a[href],button,input,select,textarea,[role=button],[tabindex="0"]')].filter(e => !name(e) && !(e.labels && e.labels.length) && !e.placeholder).map(e => e.outerHTML.slice(0, 120)).slice(0, 10);
    out.inputOhneLabel = [...document.querySelectorAll('input,select,textarea')].filter(e => e.type !== 'hidden' && !(e.labels && e.labels.length) && !e.getAttribute('aria-label') && !e.getAttribute('aria-labelledby')).map(e => e.outerHTML.slice(0, 120));
    out.leereLinks = [...document.querySelectorAll('a')].filter(a => !a.textContent.trim() && !a.querySelector('img[alt]:not([alt=""])') && !a.getAttribute('aria-label')).map(a => a.outerHTML.slice(0, 100)).slice(0, 10);
    out.blank = [...document.querySelectorAll('a[target=_blank]')].length;
    out.lang = document.documentElement.lang;
    out.hdr = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].length;
    return out;
  });
  console.log(JSON.stringify(s, null, 1).slice(0, 6000));

  // Fokusrahmen: Tab durch die ersten 80 Ziele, Rahmen prüfen
  await page.keyboard.press('Tab');
  const ohneRing = [];
  for (let i = 0; i < 80; i++) {
    const r = await page.evaluate(() => {
      const e = document.activeElement; if (!e || e === document.body) return null;
      const cs = getComputedStyle(e); const rr = e.getBoundingClientRect();
      const ring = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none';
      return { d: e.tagName + '.' + e.className + ' "' + (e.getAttribute('aria-label') || e.textContent).trim().slice(0, 30) + '"', ring, out: cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor, sicht: rr.width > 0 && rr.bottom > 0 && rr.top < innerHeight + 2000 };
    });
    if (r && !r.ring) ohneRing.push(r);
    if (r && !r.sicht) ohneRing.push(Object.assign({ unsichtbar: true }, r));
    await page.keyboard.press('Tab');
  }
  console.log('Fokus ohne Ring', JSON.stringify(ohneRing.slice(0, 10)));

  // Escape: Fenster über Matrix-Chip öffnen
  await page.click('#t-matrix');
  await page.waitForTimeout(150);
  const chip = await page.$('#matrix .mchip');
  await chip.focus(); await page.keyboard.press('Enter'); await page.waitForTimeout(200);
  let st = await page.evaluate(() => ({ offen: !document.getElementById('fenster').hidden, fokus: document.activeElement.id || document.activeElement.className, modal: document.getElementById('fenster').getAttribute('aria-modal') }));
  console.log('Fenster nach Enter', JSON.stringify(st));
  // Tab im Fenster: verlässt der Fokus das Fenster?
  for (let i = 0; i < 40; i++) await page.keyboard.press('Tab');
  st = await page.evaluate(() => ({ imFenster: document.getElementById('fenster').contains(document.activeElement), a: document.activeElement.tagName + ' ' + document.activeElement.textContent.trim().slice(0, 30) }));
  console.log('Nach 40 Tab im Fenster', JSON.stringify(st));
  await page.evaluate(() => document.getElementById('f-zu').focus());
  await page.keyboard.press('Escape'); await page.waitForTimeout(150);
  st = await page.evaluate(() => ({ offen: !document.getElementById('fenster').hidden, fokus: document.activeElement.className + ' ' + document.activeElement.textContent.trim().slice(0, 30) }));
  console.log('Nach Escape', JSON.stringify(st));

  // Glossar-Popup per Tastatur
  const bw = await page.evaluate(() => { const v = [...document.querySelectorAll('.b-wort')].find(b => b.offsetParent); return v ? true : false; });
  if (bw) {
    await page.evaluate(() => [...document.querySelectorAll('.b-wort')].find(b => b.offsetParent).focus());
    await page.keyboard.press('Enter'); await page.waitForTimeout(200);
    st = await page.evaluate(() => ({ pop: !document.getElementById('b-pop').hidden, fokus: document.activeElement.className }));
    console.log('Glossar nach Enter', JSON.stringify(st));
    await page.keyboard.press('Escape'); await page.waitForTimeout(150);
    st = await page.evaluate(() => ({ pop: !document.getElementById('b-pop').hidden, fokus: document.activeElement.className }));
    console.log('Glossar nach Escape', JSON.stringify(st));
  }
  await close();

  // Fenster auf 375 hell und dunkel
  for (const dark of [false, true]) {
    ({ page, errors, close } = await L.open({ mobile: true, dark, hash: 'matrix' }));
    await page.click('#t-matrix'); await page.waitForTimeout(150);
    const ids = await page.evaluate(() => [...document.querySelectorAll('#matrix .mchip, #matrix .mx-mat')].map(c => c.getAttribute('href')).filter((v, i, a) => v && a.indexOf(v) === i));
    const probleme = [];
    for (const id of ids) {
      await page.evaluate(h => { const f = document.getElementById('fenster'); if (!f.hidden) document.getElementById('f-zu').click(); document.querySelector('#matrix [href="' + h + '"]').click(); }, id);
      await page.waitForTimeout(80);
      const r = await page.evaluate(() => {
        const f = document.getElementById('fenster'); const W = innerWidth; const fr = f.getBoundingClientRect();
        const aus = [...f.querySelectorAll('*')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > fr.right + 1 || r.left < fr.left - 1) && !e.closest('[style*=overflow],table'); }).map(e => e.tagName + '.' + e.className + ' ' + Math.round(e.getBoundingClientRect().right)).slice(0, 4);
        return { fw: Math.round(fr.width), W, quer: f.scrollWidth - f.clientWidth, aus, docQuer: document.documentElement.scrollWidth - document.documentElement.clientWidth };
      });
      if (r.quer > 0 || r.aus.length || r.docQuer > 0 || r.fw > r.W) probleme.push([id, r]);
    }
    console.log('Fenster 375', dark ? 'dunkel' : 'hell', ids.length, JSON.stringify(probleme).slice(0, 2000));
    await page.evaluate(h => document.querySelector('#matrix [href="' + h + '"]').click(), ids[0]);
    await page.waitForTimeout(100);
    await L.shot(page, 'layout-fenster-375-' + (dark ? 'd' : 'h'));
    if (errors.length) console.log(errors);
    await close();
  }
})();
