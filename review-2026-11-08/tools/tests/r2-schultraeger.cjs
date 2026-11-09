// Zweite Suchrunde: Suchtreffer «Haftung» -> #b-schultraeger, Ziel sichtbar?
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  await page.fill('#f-q', 'Haftung'); await page.waitForTimeout(400);
  const info = await page.evaluate(() => {
    const a = [...document.querySelectorAll('#erg-inhalt h3 a')].find(x => x.getAttribute('href') === '#b-schultraeger');
    const z = document.getElementById('b-schultraeger');
    return { linkText: a && a.textContent, ziel: z.tagName + '.' + z.className, inDetails: !!z.closest('details'), details: z.closest('details') ? z.closest('details').open : null };
  });
  await page.evaluate(() => [...document.querySelectorAll('#erg-inhalt h3 a')].find(x => x.getAttribute('href') === '#b-schultraeger').click());
  for (const t of [500, 1500, 3000]) {
    await page.waitForTimeout(t === 500 ? 500 : t - 500);
    console.log(t, 'ms', JSON.stringify(await page.evaluate(() => { const z = document.getElementById('b-schultraeger'); return { top: Math.round(z.getBoundingClientRect().top), y: Math.round(scrollY), h: document.documentElement.scrollHeight }; })));
  }
  console.log(JSON.stringify(info), errors);
  await L.shot(page, 'r2-schultraeger-1280');
  await close();
})();
