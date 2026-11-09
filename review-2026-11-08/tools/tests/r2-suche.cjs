// Zweite Suchrunde: Suche gegen Inhalte, die nicht durchsucht werden
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  // Stichproben aus Bereichen sammeln
  const proben = await page.evaluate(() => {
    const p = [];
    const nimm = (art, el) => { if (!el) return; const t = el.textContent.replace(/\s+/g, ' ').trim(); const w = t.split(' ').filter(x => x.length > 8)[0]; if (w) p.push({ art, wort: w.replace(/[.,:;()«»]/g, ''), text: t.slice(0, 90) }); };
    document.querySelectorAll('#plakat > p, #plakat .text > p, #plakat p').forEach((x, i) => { if (i < 3 && !x.closest('.karte')) nimm('plakat-p', x); });
    document.querySelectorAll('.k-hinweise li').forEach((x, i) => { if (i < 4) nimm('karten-hinweis', x); });
    document.querySelectorAll('summary').forEach((x, i) => { if (i % 9 === 0) nimm('summary', x); });
    document.querySelectorAll('dd, dt').forEach((x, i) => { if (i < 3 && !x.closest('.karte')) nimm('dl', x); });
    document.querySelectorAll('figcaption').forEach((x, i) => { if (i < 2) nimm('figcaption', x); });
    document.querySelectorAll('.rand p, .rand li').forEach((x, i) => { if (i < 3) nimm('rand', x); });
    document.querySelectorAll('h4').forEach((x, i) => { if (i < 3) nimm('h4', x); });
    return p;
  });
  const fq = page.locator('#f-q');
  for (const pr of proben) {
    await fq.fill(pr.wort); await page.waitForTimeout(350);
    const r = await page.evaluate(w => ({ status: document.getElementById('erg-status').textContent, treffer: document.getElementById('erg-inhalt').textContent.toLowerCase().includes(w.toLowerCase()) }), pr.wort);
    // Wie oft kommt das Wort im sichtbaren Seitentext vor (ohne Ergebnis)?
    console.log(pr.art, '|', pr.wort, '|', r.status, '| im Ergebnis:', r.treffer, '|', pr.text);
  }
  // Doppelte Treffer: verschachtelte li
  await fq.fill('Schutzbrille'); await page.waitForTimeout(350);
  const dopp = await page.evaluate(() => { const li = [...document.querySelectorAll('#erg-inhalt section.erg-v > ul > li')].map(x => x.textContent); const d = li.filter((t, i) => li.some((u, j) => j !== i && u !== t && u.includes(t))); return { n: li.length, enthalten: d.slice(0, 3) }; });
  console.log('Schutzbrille verschachtelt:', JSON.stringify(dopp));
  await fq.fill('H-Sätze'); await page.waitForTimeout(350);
  console.log('H-Sätze:', await page.evaluate(() => document.getElementById('erg-status').textContent));
  console.log('Fehler', errors);
  await close();
})();
