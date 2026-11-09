// Glossar: alle verlinkten Begriffe mit Kontext auflisten
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  const r = await page.evaluate(() => {
    const pfad = el => { const t = []; let p = el.parentElement; while (p && p !== document.body) { let s = p.tagName.toLowerCase(); if (p.id) s += '#' + p.id; else if (p.classList.length) s += '.' + [...p.classList].join('.'); t.unshift(s); p = p.parentElement; } return t.slice(-5).join(' > '); };
    const links = [...document.querySelectorAll('a.b-wort')].map(a => {
      const par = a.parentElement; const txt = par.textContent; const i = txt.indexOf(a.textContent);
      return { w: a.textContent, id: a.dataset.b, pfad: pfad(a), ctx: txt.slice(Math.max(0, i - 50), i + a.textContent.length + 40).replace(/\s+/g, ' '),
        imTpl: !!a.closest('template'), imZu: !!a.closest('details:not([open])') };
    });
    const ids = [...document.querySelectorAll('section.begriff')].map(b => ({ id: b.id, wort: b.dataset.wort, n: links.filter(l => l.id === b.id).length }));
    // Text in template: nicht verlinkt, Vorkommen zählen
    const tplText = [...document.querySelectorAll('template')].map(t => t.content.textContent).join(' ');
    return { links, ids, tplCount: ids.map(b => ({ id: b.id, tpl: (b.wort||"").split('|').reduce((s, w) => s + (tplText.split(w).length - 1), 0) })).filter(x => x.tpl) };
  });
  console.log(JSON.stringify(r.ids));
  console.log('TPL', JSON.stringify(r.tplCount));
  r.links.forEach(l => console.log([l.id, l.w, l.pfad, '|', l.ctx].join('  ')));
  console.log('Fehler', errors);
  await close();
})();
