// R5 Navigation: Links aus Suchergebnissen, Laden mit #hash, Zurück-Taste, Begriffskarte Klick nach Hover
const L = require(process.env.ST_LIB);
const WOERTER = ['Staub', 'Haftung', 'Metall', 'Gehörschutz', 'Notfall', 'Lötkolben', 'Lagerung', 'Bern', 'Schutzbrille', 'Brand'];

async function suche(vp) {
  const { page, errors, close } = await L.open(vp);
  const abw = []; let n = 0, ok = 0;
  for (const w of WOERTER) {
    await page.fill('#f-q', w); await page.waitForTimeout(1200);
    const links = await page.evaluate(() => [...document.querySelectorAll('#erg-inhalt a[href^="#"]')].map(a => a.getAttribute('href')));
    for (let i = 0; i < links.length; i++) {
      await page.evaluate(() => { const f = document.getElementById('fenster'); if (!f.hidden) document.getElementById('f-zu').click(); const p = document.getElementById('b-pop'); if (!p.hidden) p.querySelector('.b-zu').click(); });
      if (await page.evaluate(() => document.getElementById('ergebnis').hidden)) { await page.fill('#f-q', ''); await page.fill('#f-q', w); await page.waitForTimeout(1200); }
      const sel = await page.evaluate((i) => { const a = [...document.querySelectorAll('#erg-inhalt a[href^="#"]')][i]; if (!a) return null; a.setAttribute('data-sl', i); a.scrollIntoView({ block: 'center', behavior: 'instant' }); return { href: a.getAttribute('href'), text: a.textContent.trim().slice(0, 40), b: a.classList.contains('b-wort'), m: a.getAttribute('data-maschine') }; }, i);
      if (!sel) continue; n++;
      const e0 = errors.length;
      try { await page.click('[data-sl="' + i + '"]', { timeout: 1500 }); } catch (e) { abw.push([w, sel.href, sel.text, 'Klick ' + e.message.split('\n')[0].slice(0, 80)]); continue; }
      await page.evaluate(() => new Promise(res => { let y = -1, n = 0, t = 0; const f = () => { t++; if (scrollY === y) n++; else { n = 0; y = scrollY; } if (n >= 6 || t > 180) res(); else requestAnimationFrame(f); }; requestAnimationFrame(f); }));
      const st = await page.evaluate((href) => {
        const z = document.getElementById(decodeURIComponent(href.slice(1))), f = document.getElementById('fenster');
        const tab = document.querySelector('#tl-haupt [aria-selected=true]'), lh = document.getElementById('leiste').getBoundingClientRect().bottom;
        const r = z && z.getBoundingClientRect(), ae = document.activeElement;
        return { hash: decodeURIComponent(location.hash), erg: !document.getElementById('ergebnis').hidden, tl: !document.getElementById('tl-haupt').hidden, tab: tab && tab.getAttribute('aria-controls'), zp: z && (z.closest('.panel') || {}).id, fz: !!(z && z.matches('section.thema,section.verfahren,th.mx-zeile')), fenster: !f.hidden, top: r && Math.round(r.top), lh: Math.round(lh), ih: innerHeight, vis: z && z.getClientRects().length > 0, fokusZiel: z && (ae === z || z.contains(ae)), fokusF: f.contains(ae), fokus: ae.id || ae.tagName + ':' + (ae.textContent || '').trim().slice(0, 25), pop: !document.getElementById('b-pop').hidden };
      }, sel.href);
      const p = [];
      if (errors.length > e0) p.push('Fehler ' + errors.slice(e0).join('/'));
      if (sel.b) { if (!st.pop) p.push('Begriffskarte zu'); }
      else if (st.fz) { if (!st.fenster) p.push('Fenster zu'); if (!st.fokusF) p.push('Fokus ' + st.fokus); p.push('INFO nach Fenster: Suchergebnis ' + (st.erg ? 'bleibt' : 'weg')); }
      else {
        if (st.erg) p.push('Suchergebnis bleibt');
        if (st.tab !== st.zp) p.push('Register ' + st.tab + ' statt ' + st.zp);
        if (!st.vis || st.top < st.lh - 3 || st.top > st.ih - 20) p.push('Ziel nicht im Bild top=' + st.top + ' leiste=' + st.lh);
        if (!st.fokusZiel) p.push('Fokus ' + st.fokus);
      }
      if (p.length) abw.push([w, sel.href, sel.text, p.join('; ')]); else ok++;
    }
  }
  await close();
  return { n, ok, abw };
}

async function hashLaden(vp, ids) {
  const abw = []; let ok = 0;
  const { page, errors, close } = await L.open(vp);
  for (const id of ids) {
    const e0 = errors.length;
    await page.goto('about:blank');
    await page.goto('file://' + process.env.ST_SEITE + '#' + encodeURIComponent(id).replace(/%2D/g, '-'));
    await page.waitForTimeout(1000);
    const st = await page.evaluate((id) => {
      const z = document.getElementById(id), f = document.getElementById('fenster');
      const tab = document.querySelector('#tl-haupt [aria-selected=true]'), lh = document.getElementById('leiste').getBoundingClientRect().bottom;
      const r = z && z.getBoundingClientRect();
      return { hash: decodeURIComponent(location.hash), tab: tab && tab.getAttribute('aria-controls'), zp: z && (z.closest('.panel') || {}).id, fz: !!(z && z.matches('section.thema,section.verfahren,th.mx-zeile')), fenster: !f.hidden, ft: document.getElementById('f-titel').textContent, top: r && Math.round(r.top), lh: Math.round(lh), ih: innerHeight, vis: z && z.getClientRects().length > 0, fokus: document.activeElement.id || document.activeElement.tagName, inert: document.getElementById('inhalt').inert };
    }, id);
    const p = [];
    if (errors.length > e0) p.push('Fehler ' + errors.slice(e0).join('/'));
    if (st.fz) { if (!st.fenster) p.push('Fenster zu'); if (st.hash !== '#' + id) p.push('Hash ' + st.hash); p.push('INFO Register ' + st.tab + ', Fokus ' + st.fokus); }
    else {
      if (st.fenster) p.push('Fenster offen');
      if (st.tab !== st.zp) p.push('Register ' + st.tab + ' statt ' + st.zp);
      if (!st.vis || st.top < st.lh - 3 || st.top > st.ih - 20) p.push('Ziel nicht im Bild top=' + st.top + ' leiste=' + st.lh);
      if (st.hash !== '#' + id) p.push('Hash ' + st.hash);
    }
    const echt = p.filter(x => !x.startsWith('INFO'));
    if (echt.length) abw.push(id + ' :: ' + p.join('; ')); else { ok++; if (p.length) abw.push('(ok) ' + id + ' :: ' + p.join('; ')); }
  }
  await close();
  return { ok, abw };
}

async function zurueck(vp) {
  const { page, close } = await L.open(vp);
  const log = [];
  const hl = () => page.evaluate(() => history.length);
  log.push('Start ' + page.url().split('#')[1] + ' history=' + await hl());
  await page.click('#t-unterricht'); await page.waitForTimeout(50);
  log.push('Tab Unterricht: ' + page.url().split('#')[1] + ' history=' + await hl());
  await page.evaluate(() => { const a = [...document.querySelectorAll('#unterricht a[href^="#"]:not(.b-wort)')].find(x => { const z = document.getElementById(x.getAttribute('href').slice(1)); return z && z.closest('.panel') && z.closest('.panel').id === 'fachraum'; }); a.setAttribute('data-zl', 1); let d = a.closest('details'); while (d) { d.open = true; d = d.parentElement.closest('details'); } a.scrollIntoView({ block: 'center' }); });
  await page.click('[data-zl]'); await page.waitForTimeout(50);
  log.push('Link nach Fachraum: ' + page.url().split('#')[1] + ' history=' + await hl());
  await page.click('#t-matrix'); await page.waitForTimeout(800);
  await page.evaluate(() => { const c = [...document.querySelectorAll('#matrix .mchip[href^="#"]:not([data-maschine])')].find(x => x.getClientRects().length); c.setAttribute('data-zc', 1); c.scrollIntoView({ block: 'center', behavior: 'instant' }); });
  await page.click('[data-zc]'); await page.waitForTimeout(50);
  log.push('Chip -> Fenster: ' + page.url().split('#')[1] + ' history=' + await hl() + ' fenster=' + await page.evaluate(() => !document.getElementById('fenster').hidden));
  // Begriff anklicken (ein b-wort lässt den Hash stehen?)
  await page.goBack({ timeout: 3000 }).catch(e => log.push('goBack Fehler ' + e.message.split('\n')[0]));
  await page.waitForTimeout(300);
  log.push('nach Zurück: url=' + page.url().slice(0, 60) + ' ' + (page.url().startsWith('file') ? 'tab=' + await page.evaluate(() => document.querySelector('#tl-haupt [aria-selected=true]').id) : ''));
  // Variante: Seite wird aus einer anderen Seite heraus geöffnet (Verlauf vorhanden)
  await page.goto('about:blank'); await page.goto('file://' + process.env.ST_SEITE + '#haftung'); await page.waitForTimeout(300);
  await page.evaluate(() => { const a = document.querySelector('#recht a[href="#sorgfalt"]'); a.scrollIntoView({ block: 'center' }); a.setAttribute('data-zl2', 1); });
  await page.click('[data-zl2]'); await page.waitForTimeout(50);
  log.push('2: #haftung geladen, Klick #sorgfalt -> ' + page.url().split('#')[1]);
  await page.goBack().catch(() => {}); await page.waitForTimeout(300);
  log.push('2: nach Zurück url=' + page.url().slice(0, 40));
  await close();
  return log;
}

async function hoverKlick() {
  const { page, close } = await L.open({ width: 1280 });
  const log = [];
  await page.click('#t-unterricht');
  await page.evaluate(() => { const b = [...document.querySelectorAll('#unterricht .b-wort')].find(x => x.getClientRects().length); b.setAttribute('data-hk', 1); b.scrollIntoView({ block: 'center', behavior: 'instant' }); });
  const r = await page.locator('[data-hk]').boundingBox();
  await page.mouse.move(r.x + 3, r.y + r.height / 2); await page.waitForTimeout(100);
  await page.mouse.down(); await page.mouse.up();
  await page.waitForTimeout(100);
  log.push('nach Klick: ' + JSON.stringify(await page.evaluate(() => ({ pop: !document.getElementById('b-pop').hidden, fokus: document.activeElement.className }))));
  await page.waitForTimeout(700);
  log.push('nach 700 ms Maus ruhig: ' + JSON.stringify(await page.evaluate(() => ({ pop: !document.getElementById('b-pop').hidden, fokus: document.activeElement.className }))));
  await page.mouse.move(5, 600); await page.waitForTimeout(600);
  log.push('Maus weg: ' + JSON.stringify(await page.evaluate(() => ({ pop: !document.getElementById('b-pop').hidden, fokus: document.activeElement.className || document.activeElement.tagName }))));
  // zweiter Klick auf den Begriff schliesst?
  await page.mouse.move(r.x + 3, r.y + r.height / 2); await page.waitForTimeout(100); await page.mouse.down(); await page.mouse.up(); await page.waitForTimeout(700);
  await page.mouse.down(); await page.mouse.up(); await page.waitForTimeout(100);
  log.push('Klick, 700 ms, Klick: ' + JSON.stringify(await page.evaluate(() => ({ pop: !document.getElementById('b-pop').hidden }))));
  await close();
  return log;
}

(async () => {
  // zweiter Lauf: Suche 1280 und Hash-Laden schon geprüft, nur noch Suche 375, Zurück, Hover
  const NUR2 = true;
  for (const vp of NUR2 ? [{ mobile: true }] : [{ width: 1280 }, { mobile: true }]) {
    const s = await suche(vp);
    console.log('=== Suche', vp.width || 375, 'Links', s.n, 'ok', s.ok);
    const g = {}; s.abw.forEach(a => { const k = a[3].replace(/top=-?\d+ leiste=\d+/, 'top=…').replace(/Fokus [^;]*/, 'Fokus …'); (g[k] = g[k] || []).push(a.join(' | ')); });
    Object.keys(g).forEach(k => { console.log('--', g[k].length + 'x', k); g[k].slice(0, 4).forEach(x => console.log('     ', x)); });
  }
  // eindeutige Ziele aller internen Links
  const { page, close } = await L.open({});
  const ids = await page.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="#"]:not(.b-wort)')].filter(a => !a.hasAttribute('data-maschine')).map(a => decodeURIComponent(a.getAttribute('href').slice(1))))]);
  await close();
  for (const vp of NUR2 ? [] : [{ width: 1280 }, { mobile: true }]) {
    const h = await hashLaden(vp, ids);
    console.log('=== Hash laden', vp.width || 375, 'Ziele', ids.length, 'ok', h.ok);
    h.abw.slice(0, 25).forEach(x => console.log('     ', x));
    if (h.abw.length > 25) console.log('      … weitere', h.abw.length - 25);
  }
  for (const vp of NUR2 ? [] : [{ width: 1280 }, { mobile: true }]) console.log('=== Zurück', vp.width || 375, '\n  ' + (await zurueck(vp)).join('\n  '));
  console.log('=== Hover/Klick Begriff\n  ' + (await hoverKlick()).join('\n  '));
})();
