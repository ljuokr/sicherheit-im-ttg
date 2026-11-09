// Runde 7: Jedes Thema, Verfahren und Material im Fenster öffnen: Inhalt, Einstufung, Sterne, b-wort-Links, IDs
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const { page, errors, close } = await L.open({ width: 1280, hash: 'matrix' });
  const ziele = await page.evaluate(() => [...document.querySelectorAll('section.thema, section.verfahren, th.mx-zeile')].filter(z => !z.matches('th.mx-zeile') || document.getElementById('eigen-' + z.id.slice(4))).map(z => z.id));
  const prob = [];
  for (const id of ziele) {
    const r = await page.evaluate(id => {
      const a = document.createElement('a'); a.href = '#' + id; document.body.appendChild(a); a.click(); a.remove();
      const f = document.getElementById('fenster'), fin = document.getElementById('f-in');
      const stufen = [...fin.querySelectorAll('.f-stufe-m')].map(x => x.textContent);
      const stern = stufen.filter(n => /\*/.test(n));
      const fuss = [...fin.querySelectorAll('.f-stufe-l')].map(x => x.textContent.slice(0, 40));
      const ids = fin.querySelectorAll('[id]').length;
      const leer = fin.textContent.trim().length < 40;
      const bw = [...fin.querySelectorAll('a.b-wort')].filter(b => !document.getElementById(b.getAttribute('data-b'))).length;
      const deadLinks = [...fin.querySelectorAll('a[href^="#"]')].filter(x => !document.getElementById(decodeURIComponent(x.getAttribute('href').slice(1)))).map(x => x.getAttribute('href'));
      const roheSterne = (fin.textContent.match(/\S\*{1,2}(?=\s|$|,)/g) || []).length;
      const detailsZu = [...fin.querySelectorAll('details')].filter(d => !d.open).length;
      const titel = document.getElementById('f-titel').textContent;
      const hiddenKinder = [...fin.querySelectorAll('[hidden]')].length;
      return { id, offen: !f.hidden, titel, stufen, stern, fuss, ids, leer, bw, deadLinks, roheSterne, detailsZu, hiddenKinder };
    }, id);
    await W(30);
    if (!r.offen || r.leer || r.ids || r.bw || r.deadLinks.length || (r.stern.length && !r.fuss.some(x => /^\*/.test(x)))) prob.push(r);
    else if (r.roheSterne || r.hiddenKinder) prob.push({ hinweis: true, ...r });
    await page.evaluate(() => document.getElementById('f-zu').click()); await W(30);
  }
  console.log('geprüft', ziele.length, JSON.stringify(prob, null, 1));
  console.log('Fehler', errors);
  await close();
})();
