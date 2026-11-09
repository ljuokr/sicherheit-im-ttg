// R5 Navigation: Struktur erfassen (Register, Unterregister, Linkarten)
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  const r = await page.evaluate(() => {
    const tabs = [...document.querySelectorAll('[role=tab]')].map(t => ({ id: t.id, ctl: t.getAttribute('aria-controls'), txt: t.textContent.trim(), sub: !!t.closest('#reg2'), haupt: t.closest('[data-haupt]') ? t.closest('[data-haupt]').getAttribute('data-haupt') : null }));
    const ls = [...document.querySelectorAll('a[href^="#"]')];
    const art = {};
    const fehlend = [];
    ls.forEach(a => {
      const id = decodeURIComponent(a.getAttribute('href').slice(1));
      const z = document.getElementById(id);
      let k = 'abschnitt';
      if (a.hasAttribute('data-maschine')) k = 'maschine';
      else if (a.classList.contains('b-wort')) k = 'begriff';
      else if (!z) { k = 'FEHLT'; fehlend.push(a.getAttribute('href') + ' | ' + a.textContent.trim().slice(0, 40)); }
      else if (z.matches('section.thema')) k = 'thema';
      else if (z.matches('section.verfahren')) k = 'verfahren';
      else if (z.matches('th.mx-zeile')) k = 'material';
      else if (z.matches('.panel')) k = 'panel';
      else if (z.matches('.sub')) k = 'sub';
      if (a.querySelector('.reg-hin')) k += '+reghin';
      if (a.closest('.karte')) k += '@karte';
      if (a.closest('.mchip') || a.classList.contains('mchip')) k += '@chip';
      art[k] = (art[k] || 0) + 1;
    });
    const tpl = [...document.querySelectorAll('template')].map(t => ({ id: t.id, links: [...t.content.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href') + ' ' + a.textContent.trim().slice(0, 30)) }));
    return { tabs, n: ls.length, art, fehlend, tpl, hash: location.hash };
  });
  console.log(JSON.stringify(r, null, 1));
  console.log('Fehler:', JSON.stringify(errors));
  await close();
})();
