// Runde 7: Integrität nach dem Umbau (IDs, Anker, aria-Bezüge, leere Links, Bilder, Konsole)
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({ width: 1280 });
  const r = await page.evaluate(() => {
    const out = {};
    const ids = {}; document.querySelectorAll('[id]').forEach(e => { ids[e.id] = (ids[e.id] || 0) + 1; });
    out.doppelIds = Object.entries(ids).filter(([k, v]) => v > 1);
    out.toteAnker = [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(h => h.length > 1 && !document.getElementById(decodeURIComponent(h.slice(1))));
    out.toteAnker = [...new Set(out.toteAnker)];
    const aria = [];
    document.querySelectorAll('[aria-controls],[aria-labelledby],[aria-describedby],label[for]').forEach(e => {
      ['aria-controls', 'aria-labelledby', 'aria-describedby', 'for'].forEach(a => { const v = e.getAttribute(a); if (v) v.split(/\s+/).forEach(x => { if (!document.getElementById(x)) aria.push(a + '=' + x + ' an ' + e.tagName + '.' + e.className); }); });
    });
    out.ariaTot = aria;
    out.leereLinks = [...document.querySelectorAll('a')].filter(a => !a.textContent.trim() && !a.querySelector('img[alt]:not([alt=""]),svg[aria-label]') && !a.getAttribute('aria-label')).map(a => a.outerHTML.slice(0, 120));
    out.ohneHref = [...document.querySelectorAll('a:not([href])')].map(a => a.outerHTML.slice(0, 120));
    out.bilderOhneAlt = [...document.querySelectorAll('img:not([alt])')].map(i => i.src.slice(0, 60));
    out.extLinksOhneHttps = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => /^http:\/\//.test(h));
    out.leereHrefs = [...document.querySelectorAll('a[href=""],a[href="#"]')].map(a => a.outerHTML.slice(0, 120));
    out.tplAnker = [];
    document.querySelectorAll('template').forEach(t => t.content.querySelectorAll('a[href^="#"]').forEach(a => { const h = a.getAttribute('href'); if (!document.getElementById(decodeURIComponent(h.slice(1)))) out.tplAnker.push(t.id + ' -> ' + h); }));
    out.tplIds = []; document.querySelectorAll('template').forEach(t => t.content.querySelectorAll('[id]').forEach(x => out.tplIds.push(t.id + ':' + x.id)));
    out.buttonsOhneName = [...document.querySelectorAll('button')].filter(b => !b.textContent.trim() && !b.getAttribute('aria-label')).map(b => b.outerHTML.slice(0, 120));
    out.headingsLeer = [...document.querySelectorAll('h1,h2,h3,h4')].filter(h => !h.textContent.trim() && h.id !== 'f-titel').map(h => h.outerHTML.slice(0, 100));
    out.regHinDoppel = [...document.querySelectorAll('a')].filter(a => a.querySelectorAll('.reg-hin').length > 1).length;
    out.regHinOhneLeer = [...document.querySelectorAll('a')].filter(a => /\S\(Register/.test(a.textContent)).map(a => a.textContent.slice(0, 80));
    return out;
  });
  console.log(JSON.stringify(r, null, 1));
  console.log('Fehler', errors);
  await close();
})();
