// R5 Glossar: alle a.b-wort nach Elterntyp und Abschnitt zählen, heikle Orte, nicht verlinkte Vorkommen (Fall, Bindestrich, Plural)
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  const r = await page.evaluate(() => {
    const typ = a => {
      const c = (s) => a.closest(s);
      if (c('summary')) return 'summary';
      if (c('button,[role=button],[role=tab]')) return 'button';
      if (c('.mchip')) return 'Matrix-Chip';
      if (c('#matrix table, .matrix')) return 'Matrix';
      if (c('th')) return 'th';
      if (c('td')) return 'Tabellenzelle';
      if (c('.plakat, #plakat-ziel')) return 'Plakat';
      if (c('.karte')) return 'Karte';
      if (c('.quelle')) return 'Quellenzeile';
      if (c('figcaption')) return 'figcaption';
      if (c('dt')) return 'dt';
      if (c('dd')) return 'dd';
      if (c('li')) return 'li';
      if (c('p')) return 'p';
      return a.parentElement.tagName.toLowerCase();
    };
    const ab = a => { const p = a.closest('.panel'); const s = a.closest('.thema,.sub,section[id]'); return (p ? p.id : '-') + (s && s !== p ? '/' + s.id : ''); };
    const links = [...document.querySelectorAll('a.b-wort')];
    const proTyp = {}, proPanel = {}, proId = {};
    links.forEach(a => { const t = typ(a); proTyp[t] = (proTyp[t] || 0) + 1; const p = (a.closest('.panel') || {}).id || '-'; proPanel[p] = (proPanel[p] || 0) + 1; proId[a.dataset.b] = (proId[a.dataset.b] || 0) + 1; });
    // heikle Orte: in interaktiven oder klickbaren Vorfahren, in kurzen Etiketten, in Überschrift-artigen Elementen
    const heikel = links.filter(a => a.parentElement.closest('a,button,[role],[tabindex],label,summary,.mchip,.m-zeile,.karte,.plakat,dt,td,th,caption,small,strong,b,em,.t-meta,.lead,.f-stufe') ).map(a => {
      const anc = a.parentElement.closest('a,button,[role],[tabindex],label,summary,.mchip,.m-zeile,.karte,.plakat,dt,td,th,caption,small,strong,b,em,.t-meta,.lead,.f-stufe');
      return typ(a) + ' | ' + ab(a) + ' | <' + anc.tagName.toLowerCase() + (anc.className ? '.' + anc.className.replace(/ /g, '.') : '') + (anc.getAttribute('role') ? '[role=' + anc.getAttribute('role') + ']' : '') + '> ' + a.dataset.b + ' «' + a.textContent + '» in «' + anc.textContent.replace(/\s+/g, ' ').trim().slice(0, 90) + '»';
    });
    // Liste mit Kontext
    const liste = links.map(a => { const par = a.parentElement, txt = par.textContent.replace(/\s+/g, ' '), i = txt.indexOf(a.textContent); return typ(a) + ' | ' + ab(a) + ' | ' + a.dataset.b + ' «' + a.textContent + '» … ' + txt.slice(Math.max(0, i - 40), i + a.textContent.length + 30); });
    // Wörter, die mit anderer Schreibung oder mit Bindestrich/Endung vorkommen und deshalb nie greifen
    const woerter = []; document.querySelectorAll('section.begriff[data-wort]').forEach(b => b.dataset.wort.split('|').forEach(w => woerter.push([w, b.id])));
    const texte = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) { const pe = n.parentElement; if (!pe || pe.closest('section.begriff,script,style,#b-pop')) continue; texte.push([n.nodeValue, pe]); }
    document.querySelectorAll('template').forEach(t => { const w2 = document.createTreeWalker(t.content, NodeFilter.SHOW_TEXT); let m; while ((m = w2.nextNode())) texte.push([m.nodeValue, m.parentElement, 'TPL:' + t.id]); });
    const verfehlt = {};
    const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    woerter.forEach(([wort, id]) => {
      const re = new RegExp('(^|[^\\wäöüÄÖÜß])(' + esc(wort) + ')([\\wäöüÄÖÜß-]*)', 'gi');
      texte.forEach(([t, pe, tpl]) => { let m; re.lastIndex = 0; while ((m = re.exec(t))) {
        const exakt = m[2] === wort && !m[3];
        if (exakt) continue;
        const k = id + ' ' + wort; const s = (tpl ? tpl + ' ' : '') + ((pe.closest('.panel') || {}).id || '-') + ' «' + m[2] + m[3] + '» … ' + t.slice(Math.max(0, m.index - 30), m.index + 50).replace(/\s+/g, ' ');
        (verfehlt[k] = verfehlt[k] || []).push(s);
      } });
    });
    // Templates: wie viele exakte Treffer, wie viele Links
    const tpl = [...document.querySelectorAll('template')].map(t => ({ id: t.id, links: t.content.querySelectorAll('a.b-wort').length, text: t.content.textContent.length }));
    const ohneLink = [...document.querySelectorAll('section.begriff[data-wort]')].filter(b => !proId[b.id]).map(b => b.id);
    const ohneWort = [...document.querySelectorAll('section.begriff:not([data-wort])')].filter(b => !b.id.startsWith('h-')).map(b => b.id);
    return { anzahl: links.length, proTyp, proPanel, proId, heikel, liste, verfehlt, tpl, ohneLink, ohneWort };
  });
  console.log('ANZAHL', r.anzahl); console.log('TYP', JSON.stringify(r.proTyp)); console.log('PANEL', JSON.stringify(r.proPanel)); console.log('ID', JSON.stringify(r.proId));
  console.log('OHNE LINK', r.ohneLink.join(' '), '| OHNE data-wort', r.ohneWort.join(' '));
  console.log('TEMPLATES', JSON.stringify(r.tpl));
  console.log('\n# HEIKEL'); r.heikel.forEach(x => console.log(x));
  console.log('\n# LISTE'); r.liste.forEach(x => console.log(x));
  console.log('\n# VERFEHLT (andere Schreibung, Endung, Bindestrich)'); for (const [k, a] of Object.entries(r.verfehlt)) { console.log('## ' + k + ': ' + a.length); a.slice(0, 8).forEach(x => console.log('   ' + x)); }
  console.log('Fehler', errors);
  await close();
})();
