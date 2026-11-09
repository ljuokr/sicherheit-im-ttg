// Runde 7: Ablaufleiste Fachraum, Zielposition im Zeitverlauf
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  for (const mobil of [false, true]) {
    const { page, close } = await L.open({ mobile: mobil, hash: 'fachraum' });
    const ab = await page.$$eval('.ablauf a', as => as.map(a => a.getAttribute('href')));
    for (const h of ab) {
      await page.evaluate(() => { document.querySelectorAll('#fachraum details').forEach(d => d.open = false); scrollTo({ top: 0, behavior: 'instant' }); }); await W(200);
      await page.click('.ablauf a[href="' + h + '"]');
      const v = [];
      for (let i = 0; i < 8; i++) { v.push(await page.evaluate(h => { const z = document.getElementById(h.slice(1)); return Math.round(z.getBoundingClientRect().top) + '/y' + Math.round(scrollY) + '/max' + (document.documentElement.scrollHeight - innerHeight); }, h)); await W(250); }
      console.log(mobil ? 'mobil' : 'breit', h, v.join(' | '));
    }
    await close();
  }
})();
