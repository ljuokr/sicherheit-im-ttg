// Zweite Suchrunde: Ergebniszeilen aus Tabellenzeilen und verschachtelten Listen
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  const quellen = await page.evaluate(() => [...document.querySelectorAll('#grundlage tr, #matrix tr, #fachraum tr, #unterricht tr, #kantone tr, #recht tr, #quellen tr')].filter(r => r.cells.length > 1 && !r.closest('.rand')).map(r => ({ reg: r.closest('.panel').id, zellen: [...r.cells].map(c => c.textContent.trim()) })));
  console.log('Tabellenzeilen in durchsuchten Registern', quellen.length);
  const probe = quellen.filter(r => r.reg !== 'matrix').slice(0, 3);
  for (const r of probe) {
    const w = r.zellen[1].split(/\s+/).filter(x => x.length > 5)[0] || r.zellen[0];
    await page.fill('#f-q', w); await page.waitForTimeout(350);
    const z = await page.evaluate(w => [...document.querySelectorAll('#erg-inhalt section.erg-v li')].map(x => x.textContent).filter(t => t.toLowerCase().includes(w.toLowerCase())).slice(0, 2), w);
    console.log(r.reg, 'Zellen', JSON.stringify(r.zellen.map(c => c.slice(0, 30))), 'Suche', w, '->', JSON.stringify(z.map(t => t.slice(0, 120))));
  }
  // verschachtelte Listen: Zeile, die eine andere Zeile derselben Gruppe ganz enthält
  const dopp = [];
  for (const q of ['Lehrperson', 'Schutzbrille', 'Brand', 'Lagerung', 'Abfall', 'Absaugung', 'Aufsicht', 'Kanton']) {
    await page.fill('#f-q', q); await page.waitForTimeout(350);
    const d = await page.evaluate(() => { const out = []; document.querySelectorAll('#erg-inhalt section.erg-v > ul').forEach(ul => { const t = [...ul.children].map(x => x.textContent); t.forEach((a, i) => t.forEach((b, j) => { if (i !== j && a.length > b.length && a.includes(b)) out.push(b.slice(0, 70) + ' IN ' + a.slice(0, 50)); })); }); return out; });
    if (d.length) dopp.push(q + ': ' + d.length + ' z. B. ' + d[0]);
  }
  console.log('Doppelte Zeilen (verschachtelt):', dopp.length ? '\n  ' + dopp.join('\n  ') : 'keine');
  console.log('Fehler', errors);
  await close();
})();
