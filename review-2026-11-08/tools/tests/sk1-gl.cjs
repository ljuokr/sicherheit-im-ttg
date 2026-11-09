// Skeptiker 1 Glossar: Popup-Links, SVG-Links, DT-Links, Häufigkeit b-ghs/b-hsaetze/Bundesgericht
const L = require(process.env.ST_LIB);
(async () => {
  for (const mobile of [false, true]) {
    const tag = mobile ? '375' : '1280';
    const { page, errors, close } = await L.open({ mobile });
    // 01: Obhut-Popup in Recht, internen Link klicken
    await page.click('#t-recht'); await page.waitForTimeout(200);
    const ok = await page.evaluate(() => { const a = document.querySelector('#recht a.b-wort[data-b="b-obhut"]'); if (!a) return false; let x = a; while ((x = x.parentElement)) if (x.tagName === 'DETAILS') x.open = true; a.scrollIntoView({ block: 'center' }); return true; });
    console.log(tag, 'obhut-link', ok);
    if (ok) {
      await page.waitForTimeout(300);
      await page.locator('#recht a.b-wort[data-b="b-obhut"]').first().click(); await page.waitForTimeout(300);
      const l = await page.evaluate(() => [...document.querySelectorAll('#b-pop .b-pop-inhalt a')].map(a => a.getAttribute('href')));
      console.log(tag, 'links im popup', l);
      await page.locator('#b-pop .b-pop-inhalt a[href^="#"]').first().click(); await page.waitForTimeout(1000);
      console.log(tag, 'nach klick', await page.evaluate(() => ({ popOffen: !document.getElementById('b-pop').hidden, exp: [...document.querySelectorAll('a.b-wort[aria-expanded=true]')].map(x => x.textContent), hash: location.hash, popTop: Math.round(document.getElementById('b-pop').getBoundingClientRect().top) })));
      await page.keyboard.press('Escape');
    }
    if (!mobile) {
      // 02: Links in SVG
      console.log('SVG-LINKS', await page.evaluate(() => [...document.querySelectorAll('svg a.b-wort, svg .b-wort')].map(a => a.dataset.b + ' in ' + a.parentNode.tagName + '#' + a.parentNode.id + ' ns=' + a.namespaceURI)));
      console.log('FACHRAUM-ZYKLUS', await page.evaluate(() => [...document.querySelectorAll('#fachraum a.b-wort[data-b="b-zyklus"]')].map(a => a.parentNode.tagName + ' ' + a.closest('svg')?.tagName)));
      console.log('SVG-TEXT Zyklus', await page.evaluate(() => [...document.querySelectorAll('#fachraum svg text')].filter(t => /Zyklus/.test(t.textContent)).map(t => t.textContent)));
      console.log('DESC', await page.evaluate(() => { const d = document.getElementById('ra-d'); return d ? d.innerHTML.slice(0, 400) : null; }));
      // 03: DT-Links im Plakat
      console.log('PLAKAT-LINKS', await page.evaluate(() => [...document.querySelectorAll('#plakat a.b-wort, #plakat-ziel a.b-wort')].map(a => a.dataset.b + ' ' + a.parentNode.tagName + ' «' + a.parentNode.textContent.slice(0, 40) + '» karte-hidden=' + (a.closest('.karte') ? a.closest('.karte').hidden : '-'))));
      console.log('DT Zyklus Anzahl', await page.evaluate(() => [...document.querySelectorAll('dt')].filter(d => /Zyklus/.test(d.textContent)).length));
      console.log('p-zyklen', await page.evaluate(() => [...document.querySelectorAll('.p-zyklen')].map(p => p.textContent.slice(0, 200) + ' links=' + p.querySelectorAll('a.b-wort').length)));
      // 04-06
      for (const id of ['b-ghs', 'b-hsaetze', 'b-bger1996']) {
        console.log(id, await page.evaluate((id) => [...document.querySelectorAll('a.b-wort[data-b="' + id + '"]')].map(a => (a.closest('[id]') || {}).id + ' <' + a.parentNode.tagName + '> «' + a.textContent + '» … ' + a.parentNode.textContent.replace(/\s+/g, ' ').slice(0, 110)), id));
      }
      console.log('AMPEL figcaption', await page.evaluate(() => [...document.querySelectorAll('figure.ampel figcaption')].map(f => f.textContent.replace(/\s+/g, ' ').slice(0, 200))));
      console.log('Bundesgericht im recht', await page.evaluate(() => [...document.querySelectorAll('#recht li')].filter(l => /Bundesgericht/.test(l.textContent)).map(l => l.textContent.replace(/\s+/g, ' ').slice(0, 160))));
    }
    console.log(tag, 'Fehler', errors);
    await close();
  }
})();
