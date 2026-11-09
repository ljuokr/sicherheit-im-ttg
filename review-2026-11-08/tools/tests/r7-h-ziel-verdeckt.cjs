// Runde 7: Ziel nach Direktlink und nach Klick unter der haftenden Leiste? Zeitverlauf
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  for (const [z, w] of [['einkauf', 1280], ['b-sdb', 1280], ['maschinen', 1280], ['notfall', 1280], ['einkauf', 375], ['b-sdb', 375]]) {
    const { page, close } = await L.open({ width: w, mobile: w < 500, hash: z });
    const verlauf = [];
    for (let i = 0; i < 8; i++) { verlauf.push(await page.evaluate(id => { const e = document.getElementById(id); return Math.round(e.getBoundingClientRect().top) + '/' + Math.round(document.getElementById('leiste').getBoundingClientRect().bottom) + '/y' + Math.round(scrollY) + '/hh' + getComputedStyle(document.documentElement).getPropertyValue('--hh'); }, z)); await W(250); }
    const art = await page.evaluate(id => { const e = document.getElementById(id); return e.tagName + ' in ' + e.parentElement.tagName + ' details-offen=' + (e.closest('details') ? e.closest('details').open : '-'); }, z);
    console.log('Direktlink', z, w, art, verlauf.join(' | '));
    await close();
  }
  // Gleiches per Klick auf einen internen Link aus einem anderen Register
  for (const z of ['einkauf', 'b-sdb', 'notfall']) {
    const { page, close } = await L.open({ width: 1280, hash: 'grundlage' });
    await page.evaluate(id => { const a = document.createElement('a'); a.href = '#' + id; a.id = 'testlink'; a.textContent = 'x'; document.querySelector('#grundlage').prepend(a); }, z);
    await page.click('#testlink'); const verlauf = [];
    for (let i = 0; i < 8; i++) { verlauf.push(await page.evaluate(id => Math.round(document.getElementById(id).getBoundingClientRect().top) + '/' + Math.round(document.getElementById('leiste').getBoundingClientRect().bottom), z)); await W(250); }
    console.log('Klick', z, verlauf.join(' | '));
    await close();
  }
})();
