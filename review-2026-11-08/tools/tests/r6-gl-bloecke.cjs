// R6 Glossar: Blockstruktur, Doppel-Links je Block (verschachtelte Blöcke), Leads, Recht-Aufbau
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  const r = await page.evaluate(() => {
    const out = [];
    const bloecke = [...document.querySelectorAll('#register .thema, #register .sub, #grundlage, #verfahren > .text > section:not(.verfahren), #matrix .mat-teil, #fachraum, #unterricht, #kantone, #recht, #quellen')];
    out.push('BLOECKE ' + bloecke.length);
    // verschachtelte Blöcke
    bloecke.forEach(b => { const inner = bloecke.filter(x => x !== b && b.contains(x)); if (inner.length) out.push('VERSCHACHTELT ' + (b.id || b.className) + ' enthält ' + inner.length + ': ' + inner.slice(0, 12).map(x => x.id || x.className).join(', ')); });
    // Doppel je kleinstem Block
    bloecke.forEach(b => {
      const innerste = !bloecke.some(x => x !== b && b.contains(x));
      const cnt = {};
      b.querySelectorAll('a.b-wort').forEach(a => { if (a.dataset.b.startsWith('h-')) return; cnt[a.dataset.b] = (cnt[a.dataset.b] || []); cnt[a.dataset.b].push(a.textContent); });
      Object.entries(cnt).forEach(([k, v]) => { if (v.length > 1) out.push('DOPPEL in ' + (b.id || b.className) + (innerste ? '' : ' (äusserer Block)') + ': ' + k + ' ×' + v.length + ' ' + v.join('/')); });
    });
    // Recht und Unterricht: Aufbau
    ['recht', 'unterricht', 'fachraum'].forEach(id => {
      const p = document.getElementById(id);
      out.push('\n## ' + id + ' Kinder: ' + [...p.querySelectorAll(':scope > *, :scope > .text > *')].map(c => c.tagName.toLowerCase() + (c.id ? '#' + c.id : '') + (c.className && typeof c.className === 'string' ? '.' + c.className.split(' ').join('.') : '')).join(' '));
      out.push('subs in ' + id + ': ' + [...p.querySelectorAll('.sub')].map(s => s.id).join(', '));
      out.push('thema in ' + id + ': ' + [...p.querySelectorAll('.thema')].map(s => s.id).join(', '));
    });
    // Leads mit Links
    document.querySelectorAll('.reg-lead, .einleitung').forEach(l => { const ws = [...l.querySelectorAll('a.b-wort')].map(a => a.textContent); out.push('LEAD ' + ((l.closest('.panel') || {}).id) + ' links=' + JSON.stringify(ws) + ' :: ' + l.textContent.replace(/\s+/g, ' ').slice(0, 300)); });
    // Bundesgericht und Schulträger-Vorkommen
    ['Bundesgericht', 'Schulträger', 'Obhutspflicht', 'Zyklus', 'UVG', 'EKAS', 'H-Sätze', 'Aerosol', 'Sprühnebel'].forEach(w => {
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n, k = 0; const ort = [];
      while ((n = tw.nextNode())) { if (n.nodeValue.indexOf(w) > -1 && !n.parentElement.closest('section.begriff,script,style')) { k++; const a = n.parentElement.closest('a'); ort.push(((n.parentElement.closest('.panel') || {}).id || '-') + '/' + ((n.parentElement.closest('.thema,.sub,[id]') || {}).id || '') + (a ? (a.classList.contains('b-wort') ? '[GLOSSAR]' : '[link]') : '') + '<' + n.parentElement.tagName.toLowerCase() + '>'); } }
      out.push('VORKOMMEN ' + w + ' ' + k + ': ' + ort.join(' '));
    });
    // Dt im Plakat
    const dt = document.querySelector('#plakat-ziel a.b-wort'); if (dt) { const li = dt.closest('li'); out.push('PLAKAT-LINK in Karte von ' + li.querySelector('.m-name').textContent + ', Karte hidden=' + li.querySelector('.karte').hidden); }
    const desc = document.querySelector('desc a.b-wort, svg a.b-wort'); if (desc) out.push('SVG-LINK ' + desc.parentElement.tagName + ' ns=' + desc.namespaceURI + ' rect=' + JSON.stringify(desc.getBoundingClientRect()) + ' focusable=' + (desc.tabIndex));
    return out;
  });
  r.forEach(x => console.log(x));
  console.log('Fehler', errors);
  await close();
})();
