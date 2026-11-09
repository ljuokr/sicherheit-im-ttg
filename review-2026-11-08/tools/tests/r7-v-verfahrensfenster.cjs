// Runde 7: Verfahrensfenster (Trennen, Verbinden, Umformen, Oberfläche): was ist versteckt oder zugeklappt?
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const { page, close } = await L.open({ width: 1280, hash: 'matrix' });
  for (const id of ['trennen', 'verbinden', 'umformen', 'oberflaeche']) {
    const r = await page.evaluate(id => {
      const a = document.createElement('a'); a.href = '#' + id; document.body.appendChild(a); a.click(); a.remove();
      const fin = document.getElementById('f-in');
      const kinder = [...fin.children].map(c => c.tagName + '.' + c.className + (c.hidden ? '[hidden]' : '') + ' ' + c.textContent.trim().replace(/\s+/g, ' ').slice(0, 60));
      const versteckt = [...fin.querySelectorAll('[hidden]')].map(c => c.tagName + '.' + c.className + ' ' + c.textContent.trim().slice(0, 60));
      const zu = [...fin.querySelectorAll('details:not([open])')].map(d => d.querySelector('summary').textContent.trim().slice(0, 50));
      const out = { id, kinder, versteckt, zu };
      document.getElementById('f-zu').click();
      return out;
    }, id);
    console.log(JSON.stringify(r, null, 1));
    await W(50);
  }
  await close();
})();
