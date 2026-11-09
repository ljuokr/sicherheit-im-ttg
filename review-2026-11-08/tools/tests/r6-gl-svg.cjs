// R6 Glossar: was passiert, wenn die Verlinkung ein HTML-a in SVG-text setzt (Raumplan «Zyklus 3»)
const L = require(process.env.ST_LIB);
(async () => {
  const { page, errors, close } = await L.open({});
  await page.click('#t-fachraum'); await page.waitForTimeout(200);
  const r = await page.evaluate(() => {
    const t = [...document.querySelectorAll('figure.raumplan svg text')].find(x => x.textContent === 'Zyklus 3');
    const vorher = t.getBBox().width;
    const desc = document.querySelector('figure.raumplan desc'); const svg = desc.closest('svg');
    const info = { svgAttr: [...svg.attributes].map(a => a.name + '=' + a.value.slice(0, 40)).join(' '), descHtml: desc.innerHTML.slice(0, 260) };
    // gleiche DOM-Operation wie app.js: Textknoten splitten, HTML-a einsetzen
    const n = t.firstChild, tr = n.splitText(0); tr.splitText(6);
    const a = document.createElement('a'); a.className = 'b-wort'; a.href = '#b-zyklus'; a.textContent = 'Zyklus';
    tr.parentNode.replaceChild(a, tr);
    const nachher = t.getBBox().width;
    return { info, vorher, nachher, textJetzt: t.textContent, aRect: a.getBoundingClientRect().width };
  });
  console.log(JSON.stringify(r, null, 1));
  console.log('Fehler', errors);
  await close();
})();
