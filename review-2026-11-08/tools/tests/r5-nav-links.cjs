// R5 Navigation: jeden internen Link einmal klicken, auf 1280 und 375 px.
// Erwartung je Linkart prüfen, nur Abweichungen ausgeben.
const L = require(process.env.ST_LIB);

// warten, bis weiches Scrollen fertig ist
async function still(page) {
  await page.evaluate(() => new Promise(res => { let y = -1, n = 0, t = 0; const f = () => { t++; if (scrollY === y) n++; else { n = 0; y = scrollY; } if (n >= 6 || t > 180) res(); else requestAnimationFrame(f); }; requestAnimationFrame(f); }));
}
async function reset(page) {
  await page.evaluate(() => {
    const f = document.getElementById('fenster');
    if (f && !f.hidden) document.getElementById('f-zu').click();
    const p = document.getElementById('b-pop');
    if (p && !p.hidden) p.querySelector('.b-zu').click();
    if (!document.getElementById('ergebnis').hidden) document.getElementById('zurueck').click();
  });
}

// Link sichtbar machen wie eine Nutzerin: Register wählen, Aufklapper und Karte öffnen
async function vorbereiten(page, sel) {
  return page.evaluate((sel) => {
    const a = document.querySelector(sel);
    if (!a) return { fehlt: true };
    const panel = a.closest('.panel'), karte = a.closest('.karte');
    const info = { href: a.getAttribute('href'), text: a.textContent.trim().slice(0, 50), von: panel ? panel.id : null, b: a.classList.contains('b-wort'), m: a.getAttribute('data-maschine') };
    if (panel) {
      const t = document.getElementById('t-' + panel.id);
      if (t.getAttribute('aria-selected') !== 'true') t.click();
    }
    let d = a.closest('details'); while (d) { d.open = true; d = d.parentElement.closest('details'); }
    if (karte && karte.hidden) document.querySelector('[aria-controls="' + karte.id + '"]').click();
    a.scrollIntoView({ block: 'center', behavior: 'instant' });
    const r = a.getBoundingClientRect();
    info.sichtbar = r.width > 0 && r.height > 0;
    return info;
  }, sel);
}

async function zustand(page, href) {
  return page.evaluate((href) => {
    const id = decodeURIComponent(href.slice(1));
    const z = document.getElementById(id);
    const f = document.getElementById('fenster');
    const panel = [...document.querySelectorAll('#register > .panel')].find(p => !p.hidden);
    const tab = document.querySelector('#tl-haupt [aria-selected=true]');
    const lh = document.getElementById('leiste').getBoundingClientRect().bottom;
    let zs = null;
    if (z) {
      const r = z.getBoundingClientRect();
      zs = { top: Math.round(r.top), sichtbar: z.getClientRects().length > 0, unter: r.top >= lh - 3, imBild: r.top < innerHeight - 20, panel: (z.closest('.panel') || {}).id, art: z.matches('section.thema') ? 'thema' : z.matches('section.verfahren') ? 'verfahren' : z.matches('th.mx-zeile') ? 'material' : z.matches('.panel') ? 'panel' : 'abschnitt' };
      if (zs.art === 'material' || zs.art === 'verfahren') zs.titel = (z.querySelector('.mx-mat') || z.querySelector('h2') || {}).textContent;
      if (zs.art === 'thema') zs.titel = z.querySelector('h3').textContent;
    }
    const ae = document.activeElement;
    const pop = document.getElementById('b-pop');
    const offeneKarte = [...document.querySelectorAll('#plakat-ziel .m-zeile[aria-expanded=true]')].map(b => b.querySelector('.m-name').textContent);
    return {
      hash: decodeURIComponent(location.hash), panel: panel && panel.id, tab: tab && tab.getAttribute('aria-controls'),
      fenster: !f.hidden, ftitel: f.hidden ? '' : document.getElementById('f-titel').textContent,
      ziel: zs, fokus: ae === document.body ? 'BODY' : (ae.id || ae.tagName + '.' + (ae.className || '') + ':' + (ae.textContent || '').trim().slice(0, 30)),
      fokusZiel: z ? (ae === z || z.contains(ae)) : false, fokusFenster: f.contains(ae),
      fokusMaschine: ae.classList && ae.classList.contains('m-zeile') ? ae.querySelector('.m-name').textContent : null,
      pop: pop ? !pop.hidden : false, popFokus: pop ? pop.contains(ae) : false, erg: !document.getElementById('ergebnis').hidden,
      offeneKarte, scrollY: Math.round(scrollY), lh: Math.round(lh),
    };
  }, href);
}

function pruefe(info, st) {
  const p = [];
  if (st.err.length) p.push('Konsolenfehler ' + st.err.join(' / '));
  if (info.b) {
    if (!st.pop) p.push('Begriffskarte nicht offen');
    if (!st.popFokus) p.push('Fokus nicht in Begriffskarte: ' + st.fokus);
    return p;
  }
  if (info.m) {
    if (st.tab !== 'verfahren') p.push('Register ' + st.tab + ' statt verfahren');
    if (st.fenster) p.push('Fenster noch offen');
    if (st.fokusMaschine !== info.m) p.push('Fokus nicht auf Maschine ' + info.m + ' sondern ' + st.fokus);
    if (st.offeneKarte.indexOf(info.m) < 0) p.push('Karte ' + info.m + ' nicht offen');
    return p;
  }
  const z = st.ziel;
  if (!z) { p.push('Ziel fehlt'); return p; }
  if (z.art === 'thema' || z.art === 'verfahren' || z.art === 'material') {
    if (!st.fenster) p.push('Fenster zu');
    else if (z.titel && st.ftitel !== z.titel.trim()) p.push('Fenstertitel «' + st.ftitel + '» statt «' + z.titel + '»');
    if (!st.fokusFenster) p.push('Fokus nicht im Fenster: ' + st.fokus);
    if (st.hash !== info.href) p.push('Hash ' + st.hash);
    return p;
  }
  if (st.fenster) p.push('Fenster offen («' + st.ftitel + '»)');
  if (st.erg) p.push('Suchergebnis noch sichtbar');
  if (st.tab !== z.panel) p.push('Register ' + st.tab + ' statt ' + z.panel);
  if (!z.sichtbar) p.push('Ziel unsichtbar');
  else if (!z.unter || !z.imBild) p.push('Ziel nicht im Bild top=' + z.top + ' leiste=' + st.lh + ' später=' + st.spaet);
  else if (st.spaet != null && Math.abs(st.spaet - z.top) > 30) p.push('Ziel verschiebt sich danach top=' + z.top + ' später=' + st.spaet);
  if (!st.fokusZiel) p.push('Fokus ' + st.fokus);
  if (st.hash !== info.href) p.push('Hash ' + st.hash);
  return p;
}

async function lauf(vp) {
  const { page, errors, close } = await L.open(vp);
  const n = await page.evaluate(() => {
    const ls = [...document.querySelectorAll('a[href^="#"]')].filter(a => !a.closest('#ergebnis,#fenster,#b-pop'));
    ls.forEach((a, i) => a.setAttribute('data-tn', i));
    return ls.length;
  });
  const abw = [], skip = [];
  let ok = 0, fensterOeffner = [];
  for (let i = 0; i < n; i++) {
    await reset(page);
    const sel = '[data-tn="' + i + '"]';
    const info = await vorbereiten(page, sel);
    if (!info.sichtbar) { skip.push(info.von + ' ' + info.href + ' «' + info.text + '»'); continue; }
    const e0 = errors.length;
    try { await page.click(sel, { timeout: 1500 }); } catch (e) { abw.push([info.von, info.href, info.text, 'Klick: ' + e.message.split('\n')[0]]); continue; }
    await still(page);
    const st = await zustand(page, info.href); st.err = errors.slice(e0);
    // nach weiteren 800 ms nochmals messen (verschiebt sich das Ziel durch nachladende Bilder?)
    if (st.ziel && !st.fenster && !info.b && !info.m) { await page.waitForTimeout(800); const s2 = await zustand(page, info.href); st.spaet = s2.ziel.top; }
    const p = pruefe(info, st);
    if (p.length) abw.push([info.von, info.href, info.text, p.join('; ')]); else ok++;
    if (st.fenster && !info.m) {
      fensterOeffner.push(i);
      // zweiter Klick auf denselben Link (nur wo der Link erreichbar bleibt)
      if (vp.width === 1280) {
        let zweit;
        try { await page.click(sel, { timeout: 800 }); await page.waitForTimeout(40); zweit = await page.evaluate(() => !document.getElementById('fenster').hidden); }
        catch (e) { zweit = 'Klick nicht möglich: ' + e.message.split('\n')[0].slice(0, 80); }
        const cls = await page.evaluate((sel) => { const a = document.querySelector(sel); return a.className + (a.closest('.karte') ? ' @karte' : '') + ' @' + ((a.closest('.panel') || {}).id); }, sel);
        if (zweit !== false) abw.push([info.von, info.href, info.text, 'Zweiter Klick: Fenster ' + (zweit === true ? 'bleibt offen' : zweit) + ' [' + cls + ']']);
      }
    }
  }
  await close();
  return { n, ok, abw, skip, fensterOeffner: fensterOeffner.length };
}

(async () => {
  for (const vp of [{ width: 1280 }, { mobile: true }]) {
    const t0 = Date.now();
    const r = await lauf(vp);
    console.log('=== Viewport', vp.width || 375, 'Links', r.n, 'ok', r.ok, 'Abweichungen', r.abw.length, 'übersprungen', r.skip.length, 'Fensteröffner', r.fensterOeffner, 'Zeit', Math.round((Date.now() - t0) / 1000) + 's');
    // Abweichungen nach Befundtext gruppieren
    const g = {};
    r.abw.forEach(a => { const k = a[3].replace(/top=-?\d+/, 'top=…').replace(/«[^»]*»/g, '«…»').replace(/Fokus [^;]*/, m => m.slice(0, 60)); (g[k] = g[k] || []).push(a[0] + ' ' + a[1] + ' «' + a[2] + '» :: ' + a[3]); });
    Object.keys(g).forEach(k => { console.log('--', g[k].length + 'x', k); g[k].slice(0, 6).forEach(x => console.log('     ', x)); });
    if (r.skip.length) { const sp = {}; r.skip.forEach(x => { const k = x.split(' ')[0]; sp[k] = (sp[k] || 0) + 1; }); console.log('-- übersprungen nach Register', JSON.stringify(sp)); }
  }
})();
