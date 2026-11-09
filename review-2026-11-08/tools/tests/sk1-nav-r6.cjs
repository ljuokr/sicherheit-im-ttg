// Skeptiker 1, Navigation Runde 6: Befunde 01 bis 06 nachprüfen, ungepatcht und mit vorgeschlagenen Korrekturen (Kopien in TMPDIR)
const fs = require('fs');
const path = require('path');
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
const ORIG = process.env.ST_SEITE;
const html = fs.readFileSync(ORIG, 'utf8');
function patch(src, paare) {
  for (const [a, n] of paare) { const c = src.split(a).length - 1; if (c !== 1) throw new Error('alt nicht eindeutig (' + c + '): ' + a.slice(0, 60)); src = src.replace(a, () => n); }
  return src;
}
const P1 = [
  ["history.replaceState(null,'',history.state.vor||location.pathname+location.search)", "window.TTG_OHNE_SPRUNG=true; history.back()"],
  ["var id=decodeURIComponent(location.hash.slice(1)), z=id&&document.getElementById(id);", "var id=decodeURIComponent(location.hash.slice(1)), z=id&&document.getElementById(id);\n    if(window.TTG_OHNE_SPRUNG){ window.TTG_OHNE_SPRUNG=false; var pz=z&&z.closest('.panel'); if(pz&&pz.hidden) gehe(id); still=false; return; }"],
];
const P2 = [["a===zuletzt)){ zu(); return; }", "a===zuletzt)){ zu('knopf'); return; }"]];
const P3 = [["if(!erg.hidden) beenden(); zeige('matrix',null,id); }", "if(!erg.hidden) beenden(); var vz=history.state&&history.state.vor&&document.getElementById(decodeURIComponent(history.state.vor.slice(1))), vp=vz&&vz.closest('.panel'); zeige(vp?vp.id:'matrix',null,id); }"]];
const P4 = [["if(z===panel||z===sub){ if(!schonDa) nachOben(); } else z.scrollIntoView();", "if(z===panel||z===sub) nachOben(); else z.scrollIntoView();"]];
const P4b = [["if(z===panel||z===sub){ if(!schonDa) nachOben(); } else z.scrollIntoView();", "var fe=document.getElementById('fenster'); if(z===panel||z===sub){ if(!schonDa||!fe||fe.hidden) nachOben(); } else z.scrollIntoView();"]];
const P5 = [["else if(!gehe(id)){ if(!erg.hidden) beenden(); if(!location.hash) zeige('grundlage'); }", "else if(!gehe(id,true)){ if(!erg.hidden) beenden(); if(!location.hash) zeige('grundlage'); }"]];
const P6 = [["document.getElementById('t-matrix').click(); oeffne(z,null); }", "document.getElementById('t-matrix').click(); oeffne(z,null); try{ history.replaceState(null,'','#matrix'); history.pushState({fenster:true,vor:'#matrix'},'','#'+h); }catch(e){} }"]];
// Alternative zu 01 und 06 zusammen: ohne Verlaufszustand auf das sichtbare Register setzen
const P16b = [
  ["if(ausVerlauf==='knopf' && history.state && history.state.fenster){ try{ history.replaceState(null,'',history.state.vor||location.pathname+location.search); }catch(e){} }",
   "if(ausVerlauf==='knopf'){ if(history.state && history.state.fenster){ window.TTG_OHNE_SPRUNG=true; history.back(); } else { try{ history.replaceState(null,'','#'+document.querySelector('#tl-haupt [aria-selected=true]').getAttribute('aria-controls')); }catch(e){} } }"],
  P1[1],
];
const VAR = {
  orig: null,
  alle: [...P1, ...P2, ...P3, ...P4, ...P5, ...P6],
  alt: [...P16b, ...P2, ...P3, ...P4b, ...P5],
};
const s = p => p.evaluate(() => { const ae = document.activeElement; return location.hash + ' reg=' + (document.querySelector('#tl-haupt [aria-selected=true]') || {}).id + ' f=' + !document.getElementById('fenster').hidden + ' st=' + JSON.stringify(history.state) + ' len=' + history.length + ' y=' + Math.round(scrollY) + ' fokus=' + ae.tagName + '#' + (ae.id || '') + '.' + String(ae.className).slice(0, 10); });
(async () => {
  const welche = (process.argv[2] || 'orig,alle,alt').split(',');
  for (const v of welche) {
    if (VAR[v]) { const f = path.join(process.env.TMPDIR, 'sk1-' + v + '.html'); fs.writeFileSync(f, patch(html, VAR[v])); process.env.ST_SEITE = f; } else process.env.ST_SEITE = ORIG;
    for (const mobile of [false, true]) {
      const B = v + ' ' + (mobile ? '375' : '1280');
      let { page, errors, close } = await L.open({ mobile, hash: 'recht' });
      // 01 Esc/Knopf
      for (const art of ['esc', 'knopf']) {
        await page.click('#t-recht'); await W(300); await page.click('#t-matrix'); await W(400);
        const chip = await page.evaluateHandle(() => [...document.querySelectorAll('#matrix a.mchip')].find(a => a.getClientRects().length));
        await chip.click(); await W(400); const o = await s(page);
        if (art === 'esc') await page.keyboard.press('Escape'); else await page.click('#f-zu');
        await W(500); const z = await s(page);
        await page.goBack(); await W(500); const b1 = await s(page);
        await page.goForward(); await W(500); const f1 = await s(page);
        if (f1.includes(' f=true')) { await page.keyboard.press('Escape'); await W(500); }
        console.log(B, '01', art, '| offen', o, '| zu', z, '| zurück', b1, '| vorwärts', f1);
      }
      // 02 zweiter Klick
      await page.click('#t-matrix'); await W(300);
      await page.evaluate(() => { const a = [...document.querySelectorAll('#matrix a.mchip')].find(a => a.getClientRects().length); a.setAttribute('data-k', '1'); });
      await page.evaluate(() => document.querySelector('[data-k="1"]').click()); await W(400);
      await page.evaluate(() => document.querySelector('[data-k="1"]').click()); await W(500); const k2 = await s(page);
      await page.goBack(); await W(500); const k3 = await s(page);
      console.log(B, '02 zweiter Klick', k2, '| zurück', k3);
      await close();
      // 03 Unterricht
      ({ page, errors, close } = await L.open({ mobile, hash: 'unterricht' }));
      await page.evaluate(() => { const a = [...document.querySelectorAll('#unterricht a[href^="#"]:not(.b-wort)')].find(a => { const z = document.getElementById(a.getAttribute('href').slice(1)); return z && z.matches('section.thema'); }); const d = a.closest('details'); if (d) d.open = true; a.setAttribute('data-t', '1'); a.scrollIntoView({ block: 'center' }); });
      await W(500); await page.click('[data-t="1"]'); await W(500); const u1 = await s(page);
      const innen = await page.evaluate(() => { const a = [...document.querySelectorAll('#fenster a[href^="#"]:not(.b-wort):not([data-maschine])')].find(a => { const z = document.getElementById(a.getAttribute('href').slice(1)); return z && !z.matches('section.thema, section.verfahren, th.mx-zeile'); }); if (a) a.setAttribute('data-t', '2'); return a && a.getAttribute('href'); });
      await page.click('#fenster [data-t="2"]'); await W(800); const u2 = await s(page);
      await page.goBack(); await W(700); const u3 = await s(page);
      await page.keyboard.press('Escape'); await W(600); const u4 = await s(page);
      console.log(B, '03', 'offen', u1, '| link', innen, u2, '| zurück', u3, '| esc', u4);
      // 04 Ablauf und Regression Zurück aus Fenster tief in der Matrix
      await page.evaluate(() => { location.hash = 'fachraum'; }); await W(700);
      await page.evaluate(() => document.querySelector('.ablauf a[href="#entsorgung"]').click()); await W(1000);
      const a1 = await s(page);
      await page.goBack(); await W(900);
      const top = await page.evaluate(() => Math.round(document.querySelector('.ablauf').getBoundingClientRect().top));
      console.log(B, '04 Ablauf', a1, '| zurück', await s(page), 'ablauf top', top);
      await page.click('#t-matrix'); await W(400);
      await page.evaluate(() => { const c = [...document.querySelectorAll('#matrix a.mchip')].filter(a => a.getClientRects().length); const a = c[c.length - 1]; a.setAttribute('data-t', '3'); a.scrollIntoView({ block: 'center' }); });
      await W(400); const y0 = await s(page);
      await page.evaluate(() => document.querySelector('[data-t="3"]').click()); await W(500);
      await page.goBack(); await W(700);
      console.log(B, '04 Regression Browser-Zurück aus Fenster tief', y0, '| nach Zurück', await s(page));
      // 05 Fokus Registerverlauf
      for (const t of ['t-kantone', 't-recht', 't-quellen']) { await page.click('#' + t); await W(300); }
      await page.goBack(); await W(500);
      console.log(B, '05 Register zurück', await s(page));
      await close();
      // 06 Laden mit Thema
      for (const h of ['holzstaub', 'mat-metall']) {
        ({ page, errors, close } = await L.open({ mobile, hash: h }));
        const l0 = await s(page);
        await page.keyboard.press('Escape'); await W(600); const l1 = await s(page);
        await page.reload(); await W(600); const l2 = await s(page);
        console.log(B, '06', h, 'geladen', l0, '| esc', l1, '| neu', l2);
        await close();
      }
      ({ page, errors, close } = await L.open({ mobile, hash: 'recht' }));
      await page.evaluate(() => { window.__ev = []; document.addEventListener('focusin', e => __ev.push('in:' + e.target.tagName + '#' + e.target.id)); document.addEventListener('focusout', e => __ev.push('out:' + e.target.tagName + '#' + e.target.id)); location.hash = 'holzstaub'; });
      await W(700); const e1 = await s(page); const ev = await page.evaluate(() => __ev.join(','));
      await page.keyboard.press('Escape'); await W(600);
      console.log(B, '06 aussen', e1, ev, '| esc', await s(page), 'Konsole', JSON.stringify(errors));
      await close();
    }
  }
})();
