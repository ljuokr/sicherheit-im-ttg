// Runde 6 Navigation G: Fenster aus Unterricht/Fachraum, Zurück und Vorwärts, Register und Adresse; Scroll nach Zurück auf Register
const L = require(process.env.ST_LIB);
const W = ms => new Promise(r => setTimeout(r, ms));
const s = p => p.evaluate(() => location.hash + ' reg=' + (document.querySelector('#tl-haupt [aria-selected=true]') || {}).id + ' fenster=' + !document.getElementById('fenster').hidden + ' state=' + JSON.stringify(history.state) + ' y=' + Math.round(scrollY));
(async () => {
  for (const mobile of [false, true]) {
    const B = mobile ? '375' : '1280';
    const { page, errors, close } = await L.open({ mobile, hash: 'unterricht' });
    const l = await page.evaluate(() => {
      const a = [...document.querySelectorAll('#unterricht a[href^="#"]:not(.b-wort)')].find(a => { const z = document.getElementById(a.getAttribute('href').slice(1)); return z && z.matches('section.thema') ; });
      if (!a) return null; const d = a.closest('details'); if (d) d.open = true; a.setAttribute('data-t', '1'); a.scrollIntoView({ block: 'center' }); return a.getAttribute('href') + ' «' + a.textContent + '»';
    });
    await W(700);
    console.log(B, 'Link', l, await s(page));
    await page.click('[data-t="1"]'); await W(500);
    console.log(B, 'offen', await s(page));
    const innen = await page.evaluate(() => { const a = [...document.querySelectorAll('#fenster a[href^="#"]:not(.b-wort):not([data-maschine])')].find(a => { const z = document.getElementById(a.getAttribute('href').slice(1)); return z && !z.matches('section.thema, section.verfahren, th.mx-zeile'); }); if (a) a.setAttribute('data-t', '2'); return a && a.getAttribute('href'); });
    if (innen) {
      await page.click('#fenster [data-t="2"]'); await W(800);
      console.log(B, 'Fensterlink', innen, await s(page));
      await page.goBack(); await W(700);
      console.log(B, 'zurück ins Fenster', await s(page));
    } else {
      await page.click('#f-zu'); await W(300);
      await page.click('#t-recht'); await W(300);
      await page.goBack(); await W(700);
      console.log(B, 'zurück (über Recht) ins Fenster', await s(page));
    }
    await page.keyboard.press('Escape'); await W(400);
    console.log(B, 'Esc', await s(page));
    await page.reload(); await W(600);
    console.log(B, 'neu laden', await s(page));
    // Scroll nach Zurück auf Registereintrag
    await page.evaluate(() => { location.hash = 'fachraum'; }); await W(700);
    await page.evaluate(() => document.querySelector('.ablauf a[href="#entsorgung"]').click()); await W(1200);
    const y1 = await s(page);
    await page.goBack(); await W(900);
    const top = await page.evaluate(() => Math.round(document.querySelector('.ablauf').getBoundingClientRect().top));
    console.log(B, 'Ablauf Entsorgung', y1, '| zurück', await s(page), 'Ablaufleiste top', top);
    console.log(B, 'Konsole', JSON.stringify(errors));
    await close();
  }
})();
