// Runde 7: Laden mit #planen, Zustand der Klapptexte über dem Raumplan im Zeitverlauf
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const { page, close } = await L.open({ width: 1280, hash: 'planen' });
  for (let i = 0; i < 5; i++) {
    console.log(i * 300, await page.evaluate(() => { const f = document.querySelector('figure.raumplan'); const ds = []; for (let d = f.closest('details'); d; d = d.parentElement.closest('details')) ds.push((d.querySelector('summary').textContent.trim().slice(0, 30)) + ':' + d.open); const pd = document.getElementById('planen').closest('details'); return { figDetails: ds, planenOffen: pd.open, gleich: pd === f.closest('details'), hash: location.hash, sicht: f.getClientRects().length }; }));
    await W(300);
  }
  await close();
})();
