// Verweise semantisch: Linktext, Satz um den Link, Ziel-Titel und Ziel-Register
const L = require(process.env.ST_LIB);
(async () => {
  const { page, close } = await L.open({});
  const out = await page.evaluate(() => {
    const titel = (z) => {
      if (!z) return null;
      if (z.dataset.titel) return 'data-titel:' + z.dataset.titel;
      const h = z.querySelector('h1,h2,h3,h4,summary,.p-titel,.k-titel,strong');
      if (/^H[1-6]$/.test(z.tagName) || z.tagName === 'SUMMARY') return z.tagName + ':' + z.textContent.trim().slice(0, 80);
      if (z.tagName === 'DETAILS') return 'details:' + (z.querySelector('summary') || {}).textContent.trim().slice(0, 80);
      return z.tagName + '.' + z.className + ' > ' + (h ? h.tagName + ':' + h.textContent.trim().replace(/\s+/g, ' ').slice(0, 80) : z.textContent.trim().replace(/\s+/g, ' ').slice(0, 80));
    };
    const reg = (el) => { const p = el && el.closest('.panel'); return p ? p.id : (el && el.closest('template') ? 'template' : '-'); };
    const res = [];
    const alle = [...document.querySelectorAll('a[href^="#"]')];
    document.querySelectorAll('template').forEach(t => alle.push(...t.content.querySelectorAll('a[href^="#"]')));
    for (const a of alle) {
      const href = a.getAttribute('href');
      if (/^#h-H/.test(href) || a.classList.contains('b-wort')) continue;
      const id = href.slice(1);
      const z = document.getElementById(id) || [...document.querySelectorAll('template')].map(t => t.content.getElementById(id)).find(Boolean);
      const blk = a.closest('p,li,td,dd,figcaption,div') || a.parentElement;
      const satz = (blk ? blk.textContent : '').replace(/\s+/g, ' ').trim().slice(0, 220);
      const sub = a.closest('.sub,[id]');
      res.push({ von: reg(a) + '/' + (sub ? sub.id : ''), text: a.textContent.trim().replace(/\s+/g, ' '), href, ziel: titel(z), zielReg: reg(z), satz });
    }
    return res;
  });
  for (const r of out) console.log(JSON.stringify(r));
  await close();
})();
