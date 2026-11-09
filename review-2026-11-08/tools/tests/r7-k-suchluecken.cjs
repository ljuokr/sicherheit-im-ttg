// Runde 7: Welche sichtbaren Texte erreicht die Suche nicht? (nicht in h2,h3,li,p,tr; Register Maschinen ausserhalb der Verfahren)
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const { page, close } = await L.open({ width: 1280 });
  const r = await page.evaluate(() => {
    const out = {};
    ['grundlage', 'matrix', 'fachraum', 'unterricht', 'kantone', 'recht', 'quellen', 'verfahren'].forEach(pid => {
      const p = document.getElementById(pid), w = document.createTreeWalker(p, NodeFilter.SHOW_TEXT), liste = [];
      while (w.nextNode()) {
        const n = w.currentNode, t = n.nodeValue.trim(); if (t.length < 4) continue;
        const e = n.parentElement;
        if (e.closest('script,style,template,.rand,.h-saetze,svg,[aria-hidden="true"],.sr,.reg-hin')) continue;
        if (pid === 'verfahren') { if (e.closest('section.verfahren,.karte,#plakat-ziel,#p-legende')) continue; }
        else if (e.closest('h2,h3,li,tr')) continue;
        else if (e.closest('p') && !e.closest('p.quelle,p.g-k,p.g-mehr')) continue;
        liste.push(e.tagName + '.' + String(e.className).slice(0, 15) + ': ' + t.slice(0, 70));
      }
      out[pid] = [...new Set(liste)];
    });
    return out;
  });
  for (const k in r) console.log(k, r[k].length, '\n  ' + r[k].slice(0, 25).join('\n  '));
  // Stichprobe: Wort aus der Lücke suchen
  await close();
})();
