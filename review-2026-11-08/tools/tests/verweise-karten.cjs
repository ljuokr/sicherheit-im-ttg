// Maschinenkarten: Maschinenname und die Themen, auf die die Karte verweist
const L = require(process.env.ST_LIB);
(async () => {
  const { page, close } = await L.open({ hash: 'maschinen' });
  const r = await page.evaluate(() => [...document.querySelectorAll('.karte')].map(k => {
    const b = document.querySelector('[aria-controls="' + k.id + '"]');
    return k.id + ' | ' + (b ? b.textContent.trim().replace(/\s+/g, ' ').slice(0, 60) : '?') + ' -> ' + [...k.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).join(', ');
  }));
  console.log(r.join('\n'));
  await close();
})();
