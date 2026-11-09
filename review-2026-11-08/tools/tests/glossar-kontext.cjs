// Glossar: Register je Link, nicht verlinkte Vorkommen je Begriff (auch Plural/Wortteile), Templates
const L = require(process.env.ST_LIB);
(async () => {
  const { page, close } = await L.open({});
  const r = await page.evaluate(() => {
    const reg = n => { const p = (n.nodeType === 3 ? n.parentElement : n).closest('.panel'); return p ? p.id : '-'; };
    const links = [...document.querySelectorAll('a.b-wort')].filter(a => a.dataset.b.startsWith('b-')).map(a => reg(a) + ' ' + a.dataset.b + ' ' + a.textContent);
    const stems = { 'b-ghs': /piktogramm/i, 'b-hsaetze': /H-S[aä]tz/, 'b-sdb': /sicherheitsdatenbl/i, 'b-ffp': /FFP\d|staub(schutz)?mask/i, 'b-absaugung': /absaug/i, 'b-schweissen': /schweiss|\bMAG\b|\bMIG\b/i,
      'b-flussmittel': /flussmittel|lötwasser|lötfett/i, 'b-glasur': /fritte|engobe/i, 'b-laserklasse': /laserklasse/i, 'b-ce': /konformitätserkl/i, 'b-fi': /FI-|fehlerstrom/i,
      'b-schluessel': /schlüsselschalt/i, 'b-rueckschlag': /rückschlag/i, 'b-spritz': /spritzwand|spritzstand|spritzkabine/i, 'b-3d': /\bFDM\b|\bSLA\b|\bPLA\b|\bABS\b|stereolith|schichtdruck/, 'b-tonabscheider': /tonabscheider/i,
      'b-bindemittel': /bindemittel/i, 'b-aspiration': /aspiration/i, 'b-sensibilisierend': /sensibilis/i, 'b-zyklus': /zykl/i, 'b-obhut': /obhut/i, 'b-ansprechperson': /ansprechperson/i,
      'b-sonderabfall': /sonderabf/i, 'b-schultraeger': /schulträger/i, 'b-bger1996': /bundesgericht/i, 'b-uvg': /\bUVG\b|unfallversicherungsgesetz/, 'b-ekas': /EKAS/, 'b-aerosol': /aerosol/i };
    const out = {};
    const walk = (root, tag) => { const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) {
      const pe = n.parentElement; if (!pe || pe.closest('section.begriff, script, style, #b-pop')) continue;
      for (const [id, re] of Object.entries(stems)) { const m = n.nodeValue.match(re); if (m) { const linked = pe.closest('a.b-wort'); if (linked) continue;
        const i = m.index; (out[id] = out[id] || []).push(tag + reg(n) + ' <' + pe.tagName + (pe.className ? '.' + pe.className : '') + '> ' + n.nodeValue.slice(Math.max(0, i - 35), i + 45).replace(/\s+/g, ' ')); } } } };
    walk(document.body, '');
    document.querySelectorAll('template').forEach(t => walk(t.content, 'TPL:' + t.id + ' '));
    return { links, out };
  });
  console.log(r.links.join('\n'));
  for (const [id, a] of Object.entries(r.out)) { console.log('\n## ' + id + ' nicht verlinkt: ' + a.length); a.slice(0, 14).forEach(x => console.log('  ' + x)); }
  await close();
})();
