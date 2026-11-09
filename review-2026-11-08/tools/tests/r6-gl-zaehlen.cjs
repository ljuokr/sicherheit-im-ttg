// R6 Glossar: alle a.b-wort mit Kontext, heikle Vorfahren, verfehlte Formen, Begriffe ohne Link
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  const r = await page.evaluate(() => {
    const cls = e => (typeof e.className === 'string' ? e.className : (e.getAttribute('class') || '')).replace(/ /g, '.');
    const ab = a => { const p = a.closest('.panel'); const s = a.parentElement.closest('.thema,.sub,section[id],details,figure,table,aside'); return (p ? p.id : '-') + (s && s !== p ? '/' + (s.id || s.tagName.toLowerCase() + '.' + cls(s)) : ''); };
    const links = [...document.querySelectorAll('a.b-wort')];
    const proId = {}, proPanel = {};
    links.forEach(a => { proId[a.dataset.b] = (proId[a.dataset.b] || 0) + 1; const p = (a.closest('.panel') || {}).id || '-'; proPanel[p] = (proPanel[p] || 0) + 1; });
    const SEL = 'a:not(.b-wort),button,[role],[tabindex],label,summary,.mchip,.m-zeile,.plakat,dt,th,caption,small,strong,b,em,h1,h2,h3,h4,h5,.t-meta,.lead,svg,[aria-hidden=true],.vw-t,.reg-hin,.sprung,nav,.rand,.f-stufe,ol.ablauf,.leiste';
    const heikel = links.filter(a => a.parentElement.closest(SEL) && !a.parentElement.closest(SEL).matches('.panel,[role=tabpanel]')).map(a => { const anc = a.parentElement.closest(SEL); return ab(a) + ' | <' + anc.tagName.toLowerCase() + '.' + cls(anc) + (anc.getAttribute('role') ? '[role=' + anc.getAttribute('role') + ']' : '') + '> ' + a.dataset.b + ' «' + a.textContent + '» in «' + anc.textContent.replace(/\s+/g, ' ').trim().slice(0, 100) + '»'; });
    const liste = links.filter(a => !a.dataset.b.startsWith('h-')).map(a => { const par = a.parentElement, txt = par.textContent.replace(/\s+/g, ' '), i = txt.indexOf(a.textContent); return ab(a) + ' <' + par.tagName.toLowerCase() + (cls(par) ? '.' + cls(par) : '') + '> ' + a.dataset.b + ' «' + a.textContent + '» … ' + txt.slice(Math.max(0, i - 50), i + a.textContent.length + 40); });
    // exakte Vorkommen ohne Link (pro Panel): wo bleibt ein Begriff unverlinkt, obwohl in diesem Panel kein Link darauf existiert?
    const woerter = []; document.querySelectorAll('section.begriff[data-wort]').forEach(b => b.dataset.wort.split('|').forEach(w => woerter.push([w, b.id])));
    const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const unverlinkt = [];
    const texte = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) { const pe = n.parentElement; if (!pe || pe.closest('section.begriff,script,style,#b-pop,a.b-wort')) continue; texte.push([n.nodeValue, pe]); }
    document.querySelectorAll('template').forEach(t => { const w2 = document.createTreeWalker(t.content, NodeFilter.SHOW_TEXT); let m; while ((m = w2.nextNode())) texte.push([m.nodeValue, m.parentElement, 'TPL:' + t.id]); });
    const verfehlt = {};
    woerter.forEach(([wort, id]) => {
      const re = new RegExp('(^|[^\\wäöüÄÖÜß-])(' + esc(wort) + ')(?![\\wäöüÄÖÜß-])', 'g');
      const re2 = new RegExp('([\\wäöüÄÖÜß-]*)(' + esc(wort) + ')([\\wäöüÄÖÜß-]*)', 'gi');
      texte.forEach(([t, pe, tpl]) => {
        let m; re.lastIndex = 0;
        while ((m = re.exec(t))) {
          const blk = pe.closest('.thema,.sub,.panel'); const hatLink = blk && blk.querySelector('a.b-wort[data-b="' + id + '"]');
          const ort = (tpl ? tpl : ((pe.closest('.panel') || {}).id || '-')) + '/' + (blk ? blk.id : '-') + ' <' + pe.tagName.toLowerCase() + (cls(pe) ? '.' + cls(pe) : '') + '>';
          unverlinkt.push((hatLink ? 'ok-im-block ' : 'KEIN-LINK-IM-BLOCK ') + id + ' «' + wort + '» ' + ort + ' … ' + t.slice(Math.max(0, m.index - 40), m.index + 50).replace(/\s+/g, ' '));
        }
        re2.lastIndex = 0;
        while ((m = re2.exec(t))) { if (m[1] === '' && m[3] === '' && m[2] === wort) continue; if ((m[1] + m[3]) === '' ) continue; const k = id + ' ' + wort; (verfehlt[k] = verfehlt[k] || []).push(((pe.closest('.panel') || {}).id || (tpl || '-')) + ' «' + m[0] + '»'); }
      });
    });
    const ohneLink = [...document.querySelectorAll('section.begriff[data-wort]')].filter(b => !proId[b.id]).map(b => b.id);
    const ohneWort = [...document.querySelectorAll('section.begriff:not([data-wort])')].filter(b => !b.id.startsWith('h-')).map(b => b.id + ' ' + b.querySelector('h3').textContent);
    return { anzahl: links.length, proPanel, proId, heikel, liste, unverlinkt, verfehlt, ohneLink, ohneWort };
  });
  console.log('ANZAHL', r.anzahl, JSON.stringify(r.proPanel)); console.log('ID', JSON.stringify(r.proId));
  console.log('OHNE LINK', r.ohneLink.join(' ')); console.log('OHNE data-wort', r.ohneWort.join(' | '));
  console.log('\n# HEIKEL'); r.heikel.forEach(x => console.log(x));
  console.log('\n# LISTE'); r.liste.forEach(x => console.log(x));
  console.log('\n# UNVERLINKT (exakte Treffer im Text ohne Link)'); r.unverlinkt.filter(x => x.startsWith('KEIN')).forEach(x => console.log(x));
  console.log('\n# VERFEHLT'); for (const [k, a] of Object.entries(r.verfehlt)) { const u = [...new Set(a)]; console.log('## ' + k + ': ' + u.slice(0, 10).join(' ; ')); }
  console.log('Fehler', errors);
  await close();
})();
