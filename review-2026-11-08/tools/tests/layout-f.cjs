// Tabellen mit Laufleiste auf 375: Links darin, Screenshot, Hinweis auf Querscrollen
const L = require(process.env.ST_LIB);
(async () => {
  const { page, close } = await L.open({ mobile: true });
  for (const t of ['t-unterricht', 't-kantone', 't-recht']) {
    await page.click('#' + t); await page.waitForTimeout(150);
    const r = await page.evaluate(() => { document.querySelectorAll('details').forEach(d => d.open = true); return [...document.querySelectorAll('.wrap')].filter(e => e.getBoundingClientRect().width > 0 && e.scrollWidth > e.clientWidth + 1).map((e, i) => { e.setAttribute('data-w', i); const tb = e.querySelector('table'); const ths = [...tb.querySelectorAll('thead th')].map(th => th.textContent.trim().slice(0, 15)); const lastCol = [...tb.querySelectorAll('tr')].map(tr => tr.lastElementChild && tr.lastElementChild.getBoundingClientRect().right).filter(Boolean); return { cls: tb.className, sw: e.scrollWidth, cw: e.clientWidth, links: e.querySelectorAll('a,button').length, ths, versteckt: Math.round(Math.max(...lastCol) - e.getBoundingClientRect().right), naechsteH: (e.previousElementSibling || {}).textContent?.trim().slice(0, 60) }; }); });
    console.log(t, JSON.stringify(r));
    const w = await page.$('.wrap[data-w="0"]');
    if (w) { await w.scrollIntoViewIfNeeded(); await page.waitForTimeout(100); await L.shot(page, 'layout-wrap-375-' + t); }
    await page.evaluate(() => document.querySelectorAll('details').forEach(d => d.open = false));
  }
  await close();
})();
