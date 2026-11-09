// R5 Glossar: Titel je Begriff, Kontext heikler Links, verfehlte Wortformen (Token-genau), Templates, statische Links
const L = require(process.env.ST_LIB);
(async () => {
  const { page, close } = await L.open({});
  const r = await page.evaluate(() => {
    const titel = [...document.querySelectorAll('section.begriff[data-wort]')].map(b => b.id + ' = ' + b.querySelector('h3').textContent + ' [' + b.dataset.wort + ']');
    const elt = e => '<' + e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().replace(/\s+/g, '.') : '') + '>';
    const pfad = a => { const t = []; let p = a.parentElement; for (let i = 0; p && i < 6; i++, p = p.parentElement) t.unshift(elt(p) + (p.id ? '#' + p.id : '')); return t.join(' '); };
    const genau = [...document.querySelectorAll('a.b-wort')].filter(a => a.closest('.plakat,#plakat-ziel,td') || (a.parentElement.textContent.trim().length < 40)).map(a => a.dataset.b + ' «' + a.textContent + '» ' + pfad(a) + ' | Elterntext «' + a.parentElement.textContent.replace(/\s+/g, ' ').trim().slice(0, 80) + '»');
    // Token-genaue Suche nach nicht verlinkten Formen
    const woerter = []; document.querySelectorAll('section.begriff[data-wort]').forEach(b => b.dataset.wort.split('|').forEach(w => woerter.push([w, b.id])));
    const alle = new Set(woerter.map(x => x[0]));
    const funde = {};
    const scan = (root, tag) => { const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) {
      const pe = n.parentElement; if (!pe || pe.closest('section.begriff,script,style,#b-pop,a.b-wort')) continue;
      const toks = n.nodeValue.match(/[A-Za-zÄÖÜäöüß0-9][A-Za-zÄÖÜäöüß0-9-]*/g) || [];
      toks.forEach(t => { t = t.replace(/-$/, '');
        if (alle.has(t)) { /* exakt, aber nicht verlinkt: zählt separat */ const k = 'EXAKT ' + t; (funde[k] = funde[k] || []).push(tag + ((pe.closest('.panel') || {}).id || '-') + ' ' + elt(pe)); return; }
        for (const [wort, id] of woerter) {
          const akro = /^[A-Z0-9]+$/.test(wort);
          const hit = akro ? new RegExp('(^|-)' + wort + '($|-)').test(t) : t.toLowerCase().includes(wort.toLowerCase());
          if (hit) { const k = id + ' ' + t; (funde[k] = funde[k] || []).push(tag + ((pe.closest('.panel') || {}).id || '-') + ' ' + elt(pe)); break; }
        } });
    } };
    scan(document.body, '');
    document.querySelectorAll('template').forEach(t => scan(t.content, 'TPL '));
    // Absaugung, Glasur, Schweissen, Aerosol als Stammwörter
    const stamm = { Absaugung: 0, Glasur: 0, Glasuren: 0, Aerosol: 0, Spraydose: 0, Sprühdose: 0, Schweissen: 0, schweissen: 0, Gefahrenpiktogramm: 0 };
    const ganz = document.body.innerText;
    Object.keys(stamm).forEach(k => stamm[k] = (ganz.match(new RegExp('\\b' + k, 'g')) || []).length);
    const statisch = [...document.querySelectorAll('a.b-wort')].filter(a => a.dataset.b.startsWith('h-')).map(a => (a.closest('.panel') || {}).id + ' ' + pfad(a).slice(-80));
    return { titel, genau, funde, stamm, statisch: statisch.slice(0, 5) };
  });
  console.log(r.titel.join('\n'));
  console.log('\n# KURZE ELTERN, PLAKAT, TD'); r.genau.forEach(x => console.log(x));
  console.log('\n# NICHT VERLINKTE FORMEN');
  Object.entries(r.funde).sort().forEach(([k, a]) => console.log(k + ' ×' + a.length + ' :: ' + [...new Set(a)].slice(0, 6).join(' ; ')));
  console.log('\nSTAMM', JSON.stringify(r.stamm));
  console.log('H-LINKS', r.statisch.join('\n'));
  await close();
})();
