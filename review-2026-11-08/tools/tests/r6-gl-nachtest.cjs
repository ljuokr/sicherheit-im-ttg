// R6 Glossar Nachtest: Problemfälle ohne smooth scroll, EKAS in Tabelle auf 375, Fokus-Scroll in .wrap
const L = require(process.env.ST_LIB);
async function lauf(mobile, faelle) {
  const tag = mobile ? '375' : '1280';
  const { page, errors, close } = await L.open({ mobile });
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  for (const [reg, id] of faelle) {
    await page.click('#t-' + reg); await page.waitForTimeout(150);
    const d = await page.evaluate(({ reg, id }) => {
      const a = document.querySelector('#' + reg + ' a.b-wort[data-b="' + id + '"]');
      let x = a; while ((x = x.parentElement)) { if (x.tagName === 'DETAILS') x.open = true; }
      a.scrollIntoView({ block: 'center' });
      const r = a.getBoundingClientRect();
      const wrap = a.closest('.wrap,[style*=overflow]') || (() => { let p = a.parentElement; while (p && p !== document.body) { const s = getComputedStyle(p); if (/auto|scroll/.test(s.overflowX)) return p; p = p.parentElement; } return null; })();
      const wr = wrap ? wrap.getBoundingClientRect() : null;
      return { rect: [Math.round(r.left), Math.round(r.top), Math.round(r.right), Math.round(r.bottom)], wrap: wrap ? (wrap.className + ' sw=' + wrap.scrollWidth + ' cw=' + wrap.clientWidth + ' sl=' + wrap.scrollLeft + ' wr=' + Math.round(wr.left) + '-' + Math.round(wr.right)) : null, el: document.elementFromPoint((r.left + r.right) / 2, (r.top + r.bottom) / 2) === a };
    }, { reg, id });
    await page.waitForTimeout(200);
    // echter Maus-/Touch-Klick auf die Mitte, ohne Playwright-Scroll
    const r = d.rect; const cx = (r[0] + r[2]) / 2, cy = (r[1] + r[3]) / 2;
    if (mobile) await page.touchscreen.tap(cx, cy); else await page.mouse.click(cx, cy);
    await page.waitForTimeout(400);
    const o = await page.evaluate(() => { const p = document.getElementById('b-pop'), pr = p.getBoundingClientRect(), a = document.activeElement; return { pop: !p.hidden, top: Math.round(pr.top), bottom: Math.round(pr.bottom), vh: innerHeight, fokus: a.tagName + '.' + a.className }; });
    console.log(tag, reg, id, JSON.stringify(d), '→', JSON.stringify(o));
    await page.keyboard.press('Escape'); await page.waitForTimeout(150);
  }
  console.log(tag, 'Fehler', errors);
  await close();
}
(async () => {
  const f = [['recht', 'h-H340'], ['recht', 'b-ekas'], ['unterricht', 'b-aerosol'], ['recht', 'b-sdb'], ['kantone', 'b-ekas'], ['kantone', 'b-zyklus']];
  await lauf(false, f); await lauf(true, f);
})();
