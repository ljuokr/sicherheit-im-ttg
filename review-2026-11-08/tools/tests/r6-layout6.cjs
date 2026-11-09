// Prüfrunde r6 Layout 6: Registerzeile 641 bis 1023 px, Fokus per Pfeil und per Tab
const L = require(process.env.ST_LIB);
(async () => {
  for (const w of [700, 768, 834, 900, 1000]) {
    const { page, close } = await L.open({ width: w });
    const m = () => page.evaluate(() => { const tl = document.querySelector('#tl-haupt'); const lr = tl.getBoundingClientRect(); const a = document.activeElement; const r = a.getBoundingClientRect(); return { fokus: a.id, sl: Math.round(tl.scrollLeft), sw: tl.scrollWidth, cw: tl.clientWidth, sichtbarPx: Math.max(0, Math.round(Math.min(r.right, lr.right) - Math.max(r.left, lr.left))), breite: Math.round(r.width), versteckt: [...tl.querySelectorAll('[role=tab]')].filter(t => t.getBoundingClientRect().right > lr.right + 1).map(t => t.textContent.trim()) }; });
    console.log(w, 'start', JSON.stringify(await m()));
    await page.focus('#t-fachraum'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1200);
    console.log(w, 'Pfeil', JSON.stringify(await m()));
    await page.keyboard.press('ArrowRight'); await page.waitForTimeout(1200);
    console.log(w, 'Pfeil2', JSON.stringify(await m()));
    if (w === 834) await L.shot(page, 'r6-h834-register-pfeil2');
    await close();
  }
})();
